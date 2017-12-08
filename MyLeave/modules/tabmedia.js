/**
 * @module media_m
 * @author Shweta.Dasari
 * @category functionality
 * @description media  class. 
 * © 2016 Kony Inc. 
 */
// Region - namespaces. 
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};

/**
 * @class media
 * @description This class is used for media upload and download operations
 */
kony.apps.ess.myLeave.tabmedia = function() {
  kony.print("-- media: Start --");	
  var imageList = [];
  var seq;
  kony.print("-- media: End --");
};
/**
 * @member of  media_m.js
 * @return {void} - none.
 * @description - It fetches the image in base64 string format.
 **/
kony.apps.ess.myLeave.tabmedia.prototype.
fetchEmployeeImage = function(metaObject,successCallback,errorCallback){
  alert("entered fetchEmployeeImage");
	kony.print("-- fetchEmployeeImage : Start--");
  try{
    //syncClient.getStatusForBinary("mediaEmployee", "url", obj, statusSuccCallback, statusErrorCallback);

    // if statusresponse == 0 , file not downloaded. == 100 , downloaded
    //function statusSuccCallback(statusResponse){
        kony.print("---------------------------------------------------------------------------------------------- fetchEmployeeImage ");
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
    //}
  }catch(error){
    alert("catch error:::"+error);
  }
  	
    function statusErrorCallback(err){ 
        kony.print("-- statusErrorCallback "+JSON.stringify(err));
    }
  	kony.print("-- fetchEmployeeImage : End --");
};
kony.apps.ess.myLeave.tabmedia.prototype.
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
            kony.apps.ess.myLeave.tabmedia.seq = kony.apps.ess.myLeave.tabmedia.seq + 1;
            var seqNo = "00"+kony.apps.ess.myLeave.tabmedia.seq;
            var dataObject = new kony.sdk.dto.DataObject("leave_attachments");
            dataObject.addField("leavel_id", kony.apps.ess.myLeave.tabApplyLeaveUI.leave_id);
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
