/**
 * @module media_m
 * @author Nandhini.Subramaniam
 * @category functionality
 * @description media  class. 
 * Â© 2016 Kony Inc. 
 */
// Region - namespaces. 
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps = kony.apps || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

/**
 * @class media
 * @description This class is used for media upload and download operations
 */
kony.apps.coe.ess.myLeave.media = function() {
  kony.print("-- media: Start --");	
  var imageList = [];
  var seq;
  kony.print("-- media: End --");
};

/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - Initiates the syncClient to get the status of the binary to be downloaded.
 **/
kony.apps.coe.ess.myLeave.media.prototype.
getImageData = function(mediaName, successCallback,errorCallback){
    var sdkInstance = kony.sdk.getCurrentInstance();
  	var syncClient = sdkInstance.getSyncService();
  	var obj = {};
  	obj["name"] = mediaName; 
  //	var scopeObj = kony.apps.ess.MyProfile.scopeObject;
    syncClient.getStatusForBinary("MyLeaveMedia", "url", obj, statusSuccCallback, statusErrorCallback);
  	
  	// if statusresponse == 0 , file not downloaded. == 100 , downloaded
    function statusSuccCallback(statusResponse){
       kony.print("-- StatusSuccCallback "+JSON.stringify(statusResponse));
            this.fetchBinaryContent(kony.apps.ess.MyProfile.scopeObject,mediaName,successCallback,errorCallback);
    }
    function statusErrorCallback(err){  
        kony.print("-- statusErrorCallback "+JSON.stringify(err));
        if(typeof errorCallback == 'function'){
            errorCallback();
        }
    }
}

/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - It fetches the image in base64 string format.
 **/
kony.apps.coe.ess.myLeave.media.prototype.
fetchBinaryContent = function(scopeObj, index){
  	kony.print("-- fetchBinaryContent: Start -- ");
  	var binaryList  = kony.apps.coe.ess.myLeave.media.imageList;
  	if (index > kony.apps.coe.ess.myLeave.media.imageList.length - 1){
      	return;
    }
  	else if ((binaryList[index].imgProof === "") || (binaryList[index].imgProof === null) || (binaryList[index].imgProof === undefined) || (binaryList[index].mediaName === "NULL")){
    	kony.apps.coe.ess.myLeave.media.imageList[index].imageBase64 = "";
      	index++;
      	(new kony.apps.coe.ess.myLeave.media()).fetchBinaryContent(scopeObj, index);
    }
  	else {
        var sdkInstance = kony.sdk.getCurrentInstance();
        var syncClient = sdkInstance.getSyncService();
        var obj = {};
        obj["name"] = binaryList[index].imgProof; 
        syncClient.getStatusForBinary("MyLeaveMedia", "url", obj, statusSuccCallback, statusErrorCallback);

        // if statusresponse == 0 , file not downloaded. == 100 , downloaded
        function statusSuccCallback(statusResponse){
            kony.print("-- StatusSuccCallback "+JSON.stringify(statusResponse));
            var dataObject = new kony.sdk.dto.DataObject("MyLeaveMedia");
            dataObject.addField("name", binaryList[index].imgProof);
            scopeObj = kony.apps.ess.myLeave.ScopeObject;
            var configOptions = kony.apps.coe.ess.myLeave.ScopeObject.getController().getConfig().getObjectServiceOptions();
            var serviceName = kony.apps.coe.ess.myLeave.ScopeObject.getController().getConfig().getObjectServiceName();
            var applicationContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var objSvc = applicationContext.getObjectService(configOptions, serviceName);      
            objSvc.getBinaryContent({
                "dataObject": dataObject,
                "binaryAttrName": "url",
                "responsetype" : "base64string"
            }, succ, err);

            function succ(binaryData){
              kony.print("Success in fetch Binary: "+JSON.stringify(binaryData));
              kony.sdk.mvvm.log.info("in successCallback of the fetchBinaryContent function");
              kony.apps.coe.ess.myLeave.media.imageList[index].imageBase64 = binaryData;
              index++;
              (new kony.apps.coe.ess.myLeave.media()).fetchBinaryContent(scopeObj, index);
              return;
            }  
            function err(errMsg){
              kony.print("Error in fetchBinary: "+JSON.stringify(errMsg));
            }
            //this.fetchBinaryContent(kony.apps.ess.MyProfile.scopeObject,mediaName,successCallback,errorCallback);
        }
        function statusErrorCallback(err){  
            kony.print("-- statusErrorCallback "+JSON.stringify(err));
        }
  	
    }
  	kony.print("-- fetchBinaryContent: End -- ");
 };

/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - updates the image in base64 string format.
 **/
kony.apps.coe.ess.myLeave.media.prototype.
updateBinaryContent = function(base64Image,successCallback,errorCallback){
    try{
        var scopeObj = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.ScopeObject;
        var configOptions = {"access":"offline", "mock": false};
        var serviceName = "MYLEAVE";
		var applicationContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var objSvc = applicationContext.getObjectService(configOptions, serviceName);
        var dataObject = new kony.sdk.dto.DataObject("MyLeaveMedia");
        var headers = {};
        dataObject.addField("type", "GRAPHICS");
        dataObject.addField("extension", "JPG");
        dataObject.addField("ondemand","false");
        dataObject.addField("description", "Image Preview");
        dataObject.addField("url",base64Image);

        var options = {"dataObject":dataObject, "headers":headers};
        objSvc.create(options,function(response){
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
          	kony.print("-- Binary content creation success response is " + JSON.stringify(response));
            var media_name = response["name"];
            kony.apps.coe.ess.myLeave.media.seq = kony.apps.coe.ess.myLeave.media.seq + 1;
            var seqNo = "00"+kony.apps.coe.ess.myLeave.media.seq;
            var dataObject = new kony.sdk.dto.DataObject("leave_attachments");
            dataObject.addField("leavel_id", kony.apps.coe.ess.myLeave.applyLeave.leave_id);
            dataObject.addField("media_id", media_name);
            dataObject.addField("LV_ATTCH_SEQNO", seqNo);
            var onSuccess = function(successResponse){
              	kony.print("Success in saving record");
                kony.application.dismissLoadingScreen();
              	successCallback(successResponse);
            };
            var onError = function(error){
              	kony.print("Error in saving record");
                kony.application.dismissLoadingScreen();
              	errorCallback(error);
            };
			var headers = {};
			var options = {"dataObject":dataObject, "headers":headers};
			var configOptions = {"access":"offline", "mock": false};
            var serviceName = "MYLEAVE";
		    var objSvc = applicationContext.getObjectService(configOptions, serviceName);
			objSvc.create(options, onSuccess, onError);
        },function(error){
          	  kony.print("Error in creating binary");
              errorCallback(error);
        });
    }catch(err){
      	kony.sdk.mvvm.log.error("error in Blogic updateBinaryContent action : " + err);
      	kony.print("Error in updating media : "+JSON.stringify(err));
    }
};

/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - It fetches the image in base64 string format.
 **/
kony.apps.coe.ess.myLeave.media.prototype.
fetchEmployeeImage = function(metaObject,successCallback,errorCallback){
	kony.print("-- fetchEmployeeImage : Start--");
  	var sdkInstance = kony.sdk.getCurrentInstance();
    var syncClient = sdkInstance.getSyncService();
    var obj = {};
    obj["name"] = metaObject.mediaName; 
    syncClient.getStatusForBinary("mediaEmployee", "url", obj, statusSuccCallback, statusErrorCallback);

    // if statusresponse == 0 , file not downloaded. == 100 , downloaded
    function statusSuccCallback(statusResponse){
        kony.print("-- StatusSuccCallback "+JSON.stringify(statusResponse));
        var dataObject = new kony.sdk.dto.DataObject("mediaEmployee");
        dataObject.addField("name", metaObject.mediaName);
        var scopeObject = "MyLeave2";//**kony.apps.coe.ess.myLeave.applyLeave.submitLeave.ScopeObject;
        var configOptions = {"access":"online", "mock": false};//**scopeObject.getController().getConfig().getObjectServiceOptions();
        var serviceName = "Employee";//scopeObject.getController().getConfig().getObjectServiceName();
        var applicationContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var objSvc = applicationContext.getObjectService(configOptions, serviceName); 
      	objSvc.getBinaryContent({
            "dataObject": dataObject,
            "binaryAttrName": "url",
            "responsetype" : "base64string"
        }, successCallback, errorCallback);
        //this.fetchBinaryContent(kony.apps.ess.MyProfile.scopeObject,mediaName,successCallback,errorCallback);
    }
    function statusErrorCallback(err){ 
        kony.print("-- statusErrorCallback "+JSON.stringify(err));
    }
  	kony.print("-- fetchEmployeeImage : End --");
};
/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - It fetches the image in base64 string format.
 **/
kony.apps.coe.ess.myLeave.media.prototype.
fetchAttachment = function(metaObject,successCallback,errorCallback){
	kony.print("-- fetchEmployeeImage : Start--");
  	var sdkInstance = kony.sdk.getCurrentInstance();
    var syncClient = sdkInstance.getSyncService();
    var obj = {};
    obj["name"] = metaObject.mediaName; 
    syncClient.getStatusForBinary("MyLeaveMedia", "url", obj, statusSuccCallback, statusErrorCallback);

    // if statusresponse == 0 , file not downloaded. == 100 , downloaded
    function statusSuccCallback(statusResponse){
        kony.print("-- StatusSuccCallback "+JSON.stringify(statusResponse));
        var dataObject = new kony.sdk.dto.DataObject("MyLeaveMedia");
        dataObject.addField("name", metaObject.mediaName);
        var scopeObject = "MyLeave2";
        var configOptions = {"access":"offline", "mock": false};
        var serviceName = "MYLEAVE";
        var applicationContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var objSvc = applicationContext.getObjectService(configOptions, serviceName); 
      	objSvc.getBinaryContent({
            "dataObject": dataObject,
            "binaryAttrName": "url",
            "responsetype" : "base64string"
        }, successCallback, errorCallback);
    }
    function statusErrorCallback(err){ 
        kony.print("-- statusErrorCallback "+JSON.stringify(err));
    }
  	kony.print("-- fetchEmployeeImage : End --");
};


/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - It fetches the image in base64 string format for Desktop Web
 **/
kony.apps.coe.ess.myLeave.media.prototype.
fetchEmployeeImageDW = function(mediaName,successCallback,errorCallback){
    var dataObject = new kony.sdk.dto.DataObject("mediaEmployee");
    dataObject.addField("name", mediaName);
    var scopeObject = "MyLeave2";//**kony.apps.coe.ess.myLeave.applyLeave.submitLeave.ScopeObject;
    var configOptions = {"access":"online", "mock": false};//**scopeObject.getController().getConfig().getObjectServiceOptions();
    var serviceName = "Employee";//scopeObject.getController().getConfig().getObjectServiceName();
    var applicationContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var objSvc = applicationContext.getObjectService(configOptions, serviceName); 
    objSvc.getBinaryContent({
        "dataObject": dataObject,
        "binaryAttrName": "url",
        "responsetype" : "base64string"
    }, successCallback, errorCallback);
};
/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - It fetches the image in base64 string format for DesktopWeb
 **/
kony.apps.coe.ess.myLeave.media.prototype.
fetchAttachmentDW = function(mediaName,successCallback,errorCallback){
    var dataObject = new kony.sdk.dto.DataObject("MyLeaveMedia");
    dataObject.addField("name", mediaName);
    var scopeObject = "MyLeave2";
    var configOptions = {"access":"online", "mock": false};
    var serviceName = "MYLEAVE";
    var applicationContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var objSvc = applicationContext.getObjectService(configOptions, serviceName); 
    objSvc.getBinaryContent({
        "dataObject": dataObject,
        "binaryAttrName": "url",
        "responsetype" : "base64string"
    }, successCallback, errorCallback);
};

/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - updates the image in base64 string format.
 **/
kony.apps.coe.ess.myLeave.media.prototype.
updateBinaryContentDW = function(insertionData,successCallback,errorCallback){
    try{
        var scopeObj = "MyLeave2";
        var configOptions = {"access":"online", "mock": false};
        var serviceName = "MYLEAVE";
        var applicationContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var objSvc = applicationContext.getObjectService(configOptions, serviceName);
        var dataObject = new kony.sdk.dto.DataObject("MyLeaveMedia");
        var headers = {};
        dataObject.addField("type", "GRAPHICS");
        dataObject.addField("extension", "JPG");
        dataObject.addField("ondemand","false");
        dataObject.addField("description", "Image Preview");
        dataObject.addField("url",insertionData.imgBase64);
        var options = {"dataObject":dataObject, "headers":headers};
        var seq = insertionData.seq;
        objSvc.create(options,function(response){
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.print("-- Binary contentDW creation success response is " + JSON.stringify(response));
            var media_name = response["name"];
            seq = seq + 1;
            var seqNo = "00"+seq;
            var dataObject = new kony.sdk.dto.DataObject("leave_attachments");
            dataObject.addField("leavel_id", insertionData.leave_id);
            dataObject.addField("media_id", media_name);
            dataObject.addField("LV_ATTCH_SEQNO", seqNo);
            var onSuccess = function(successResponse){
                kony.print("Success in saving record");
                kony.application.dismissLoadingScreen();
                successCallback(successResponse);
            };
            var onError = function(error){
                kony.print("Error in saving record");
                kony.application.dismissLoadingScreen();
                errorCallback(error);
            };
            var headers = {};
            var options = {"dataObject":dataObject, "headers":headers};
            var configOptions = {"access":"online", "mock": false};
            var serviceName = "MYLEAVE";
            var objSvc = applicationContext.getObjectService(configOptions, serviceName);
            objSvc.create(options, onSuccess, onError);
        },function(error){
            kony.print("Error in creating binary");
            errorCallback(error);
        });
    }catch(err){
        kony.sdk.mvvm.log.error("error in Blogic updateBinaryContentDW action : " + err);
        kony.print("Error in updating media : "+JSON.stringify(err));
    }
};
