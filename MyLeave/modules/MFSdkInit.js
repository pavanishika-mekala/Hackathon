/*
 * This is generated file. Mobile Fabric sdk is initialized here
 *
 */

function initMbaasApp(successCallback){
 	var appkey = kony.apps.coe.ess.appconfig.appkey;
	var appsecret = kony.apps.coe.ess.appconfig.appsecret;
	var serviceurl = kony.apps.coe.ess.appconfig.serviceurl;
    kony.apps.coe.ess.globalVariables.clientObj = new kony.sdk();
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
    kony.apps.coe.ess.globalVariables.clientObj.init(appkey,appsecret,serviceurl,function(successcallback,response){
    kony.print("SDK init succcess");
    var serviceDoc = JSON.stringify(response.config);
    kony.store.setItem("serviceDoc", serviceDoc);
    successcallback();
	//Initialize PushNotifications
    //To-Do : Uncomment below method call once Notification Logic implemented.
	//kony.apps.ess.KMS.setPushNotificationCallbacks();
       }.bind(this,successCallback),function(error){
      kony.print("sdk init faliure"+JSON.stringify(error));
              //alert("Init failure "+JSON.stringify(error));
    });
    }
   else {
        if (kony.store.getItem("serviceDoc") !== null) {
            var serviceDoc = kony.store.getItem("serviceDoc");
            serviceDoc = JSON.parse(serviceDoc);
            kony.apps.coe.ess.globalVariables.clientObj.initWithServiceDoc(appkey, appsecret, serviceDoc);
            successCallback();
        } else {
            frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.offlineLoginFailure");
            frmLogin.lblLoginErrorMessage.isVisible = true;
        }
    }
}


function initMbaasAppTablet(){
 	kony.modules.loadFunctionalModule("librarymodules");
	kony.modules.loadFunctionalModule("appjsmodules");
	var appkey = kony.apps.coe.ess.appconfig.appkey;
	var appsecret = kony.apps.coe.ess.appconfig.appsecret;
	var serviceurl = kony.apps.coe.ess.appconfig.serviceurl;
    kony.apps.coe.ess.globalVariables.clientObj = new kony.sdk();
    kony.apps.coe.ess.globalVariables.clientObj.init(appkey,appsecret,serviceurl,function(response){
    
    kony.print("SDK init succcess");
	//Initialize PushNotifications
    //To-Do : Uncomment below method call once Notification Logic implemented.
	//kony.apps.ess.KMS.setPushNotificationCallbacks();
      
       },function(error){
      kony.print("sdk init faliure"+JSON.stringify(error));
              //alert("Init failure "+JSON.stringify(error));
    });
}