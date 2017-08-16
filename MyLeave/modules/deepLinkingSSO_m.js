 /*** @Author Navya.Inampudi
  * @category Business Logic / Action
  * @desc  Login class
  * @  2016 Kony Inc. F
  **/
 kony = kony || {};
 kony.apps = kony.apps || {};
 kony.apps.ess = kony.apps.ess || {};
 kony.apps.ess.deepLinkingSSO = kony.apps.ess.deepLinkingSSO || {};
 kony.apps.ess.deepLinkingSSO.staticUrl = "com.kony.";
 var appserviceUsername;
 var appservicePassword;
 var applaunchMode;
 var AppCheckerObject = null;

 kony.apps.ess.deepLinkingSSO.appServiceActions = function(eventobject) {
     var callBack = kony.apps.ess.deepLinkingSSO.appServiceCallback(eventobject);
     if (kony.apps.coe.ess.globalVariables.isNative === true) {
         kony.apps.coe.ess.KMS.setPushNotificationCallbacks();
     }
     return callBack;
 };

 /**
  * @member of  frmDummy
  * @return {void} - frmtobeOpened
  * @Desc - check the Application Launch Mode.
  * 
  */
 kony.apps.ess.deepLinkingSSO.appServiceCallback = function(params) {
     kony.print("---- appServiceCallback:Start---------");
     if (kony.apps.coe.ess.globalVariables.isNative === true) {
         if (kony.apps.ess.deepLinkingSSO.currentFormValue === null || kony.apps.ess.deepLinkingSSO.currentFormValue === undefined) {
             if (params.launchparams !== "" && params.launchparams !== null && params.launchparams.length > 0) {
                 if (params.launchparams.isTouchIdEnabled == "true") {
                     kony.apps.ess.deepLinkingSSO.isTouchIdEnabled = true;
                     kony.store.setItem("useTouchID", true);
                 }
                 else {
                     kony.apps.ess.deepLinkingSSO.isTouchIdEnabled = false;
                     kony.store.setItem("useTouchID", false);
                 }
                 if (params.launchparams.isRememberMeEnabled == "true") {
                     kony.apps.ess.deepLinkingSSO.isRememberMeEnabled = true;
                     kony.store.setItem("rememberme", true);
                 }
                 else {
                     kony.apps.ess.deepLinkingSSO.isRememberMeEnabled = false;
                     kony.store.setItem("rememberme", false);
                 }
             }
             kony.apps.ess.deepLinkingSSO.ssotoken = kony.sdk.util.getSSOToken();
             if (kony.apps.ess.deepLinkingSSO.ssotoken) {
                 if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                     return frmDummyTab;
                 }
                 else {
                     return frmDummy;
                 }
             }

             else if (params.launchmode == 3) {
                 if (params.launchparams.formToOpen == "frmDummy") {
                     appserviceUsername = params.launchparams.userName;
                     appservicePassword = params.launchparams.passWord;
                     applaunchMode = params.launchmode;
                     kony.store.setItem("isMyLeaveFirstTimeLaunch", false);
                     if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                         return frmDummyTab;
                     }
                     else {
                         return frmDummy;
                     }
                 }
             }
             else {
                 return (new kony.apps.coe.ess.QRCode()).loadStartupForm();
             }
         }
         else {
             return kony.apps.ess.deepLinkingSSO.currentFormValue;
         }
     }
     else if (kony.apps.coe.ess.globalVariables.isSPA === true) {
         return frmLogin;
     }
 };
 /**
  * @member of  frmDummy
  * @return {void} - void
  * @Desc - function to be executed on post show of the form
  * 
  */
 kony.apps.ess.deepLinkingSSO.frmDummyPostShow =
     function() {
         if (kony.apps.ess.deepLinkingSSO.ssotoken) {
             if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                 initMbaasApp(function() {
                     kony.sdk.mvvm.LoginAction("ssoEnable");
                 });
             }
             else {
                 frmLogin.show();
             }
         }
         else if (applaunchMode == 3) {
             var result = this.checkNewUser();
             if ((!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))) {
                 if (result === true) {
                     frmLogin.show();
                 }
                 else {
                     initMbaasApp(function() {
                         kony.sdk.mvvm.LoginAction("DeepLink");
                     });
                 }
             }
             else {
                 initMbaasApp(function() {
                     kony.sdk.mvvm.LoginAction("DeepLink");
                 });
             }
         }
         kony.print("---frmDummyPostShow:End--------");
     };
 /**
  * @member of  frmDummy
  * @return {void} - return boolean value.
  * @Desc - its check the user is newUser or Not.
  * 
  */
 kony.apps.ess.deepLinkingSSO.checkNewUser = function() {
     kony.print("---- checkNewUser:Start------- ");
     if (appserviceUsername == kony.apps.coe.ess.frmLogin.username) {
         return true;
     }
     kony.print("---- checkNewUser:End------- ");
 };
 /**
  * @member of  frmDummy
  * @return {void} - void
  * @Desc - open the corresponding App based on button click.
  * 
  */
 kony.apps.ess.deepLinkingSSO.btnOtherAppsOnClick = function(status) {
     kony.print("---- btnOtherAppsOnClick:Start------- ");
     var remembermeStatus, touchIdStatus;
     kony.apps.coe.ess.Hamburger.prototype.hideHamburger();
     var url = "";
     if (kony.store.getItem("rememberme") === true) {
         remembermeStatus = true;
     }
     else {
         remembermeStatus = false;
     }
     if (kony.store.getItem("useTouchID") === true) {
         touchIdStatus = true;
     }
     else {
         touchIdStatus = false;
     }
     if (status.length > 0) {
         if (kony.os.deviceInfo().name === "iPad" || kony.os.deviceInfo().name === "iPhone") {

             if ((AppCheckerObject === null) || (AppCheckerObject === undefined))
                 AppCheckerObject = new AppChecker.AppChecker();
             var returnedValue = false;
             returnedValue = AppCheckerObject.isAppExist(status + "://");
             if (returnedValue === true) {

                 kony.application.openURL(status + "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus);
             }
             else {

                 if (status == "myPay") {
                     url = kony.apps.coe.ess.appconfig.myPayUrl;
                 }
                 else if (status == "myProfile") {
                     url = kony.apps.coe.ess.appconfig.myProfileUrl;
                 }
                 else if (status == "myTime") {
                     url = kony.apps.coe.ess.appconfig.myTimeUrl;
                 }
                 else if (status == "myExpenses") {
                     url = kony.apps.coe.ess.appconfig.myExpenseUrl;
                 }
                 else if (status == "myApprovals") {
                     url = kony.apps.coe.ess.appconfig.myApprovalUrl;
                 }
             }
             kony.application.openURL(url);
         }

         else if (kony.os.deviceInfo().name === "android") {
             var changeStatus = "" + status;
             changeStatus = changeStatus.toLowerCase();
             var modifiedAppName = "ess" + changeStatus + "mobile";
             var appstoreUrl = kony.apps.ess.deepLinkingSSO.staticUrl + modifiedAppName;
             var verticalappsUrl = kony.apps.ess.deepLinkingSSO.staticUrl + changeStatus;
             var checkifExistObject = new AppCheckerAndroid.checkifExist(appstoreUrl);
             var appstoreReturnedValue = checkifExistObject.appInstalledOrNot();
             var checkifExistObject1 = new AppCheckerAndroid.checkifExist(verticalappsUrl);
             var verticalAppsReturnedValue = checkifExistObject1.appInstalledOrNot();
             if (appstoreReturnedValue === true || verticalAppsReturnedValue === true) {
                 url = status + "://" + status + "." + "com";
                 kony.application.openURL(url + "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus);
             }
             else {
                 kony.application.openURL("https://play.google.com/store/apps/details?id=" + appstoreUrl);
             }
             checkifExistObject = null;
             checkifExistObject1 = null;

         }
     }
     kony.print("---- btnOtherAppsOnClick:End------- ");
 };
 /**
  * @member of  frmDummy
  * @return {void} - void
  * @Desc -check the Required Apps installed or Not.
  * 
  */



 kony.apps.ess.deepLinkingSSO.appExistedOrNot = function() {
     var noOfESSAppsPresentinDevice = 0;
     listOfAvailableApps = [];
     if (kony.os.deviceInfo().name === "iPad" || kony.os.deviceInfo().name === "iPhone") {

         if ((AppCheckerObject === null) || (AppCheckerObject === undefined)) {
             AppCheckerObject = new AppChecker.AppChecker();
         }

     }

     listOfAvailableApps.push({

         "id": "myLeave",
         "name": "LEAVE"

     });

     for (var i = 0; i < kony.apps.coe.ess.appconfig.listOfApps.length; i++) {
         var status = false;
         var playStoreAppReturnedValue = false;
         var verticalAppReturnedValue = false;
         if (kony.os.deviceInfo().name === "iPad" || kony.os.deviceInfo().name === "iPhone") {
             status = AppCheckerObject.isAppExist(kony.apps.coe.ess.appconfig.listOfApps[i] + "://");
         }
         else if (kony.os.deviceInfo().name === "android") {
             var changeUrl = "" + kony.apps.coe.ess.appconfig.listOfApps[i].toLowerCase();
             var playStoreUrl = kony.apps.ess.deepLinkingSSO.staticUrl + "ess" + changeUrl + "mobile";
             var verticalAppsUrl = kony.apps.ess.deepLinkingSSO.staticUrl + changeUrl;
             var checkifExistObject = new AppCheckerAndroid.checkifExist(playStoreUrl);
             playStoreAppReturnedValue = checkifExistObject.appInstalledOrNot();
             var checkifExistObject1 = new AppCheckerAndroid.checkifExist(verticalAppsUrl);
             verticalAppReturnedValue = checkifExistObject1.appInstalledOrNot();
         }
         switch (kony.apps.coe.ess.appconfig.listOfApps[i]) {
             case "myProfile":
                 if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         listOfAvailableApps.push({
                             "id": "myProfile",
                             "name": "PROFILE"
                         });
                         noOfESSAppsPresentinDevice++;
                     }
                 }
                 else {

                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         kony.application.getCurrentForm().flxHamburger.flxMyProfile.isVisible = true;
                     }
                     else {
                         kony.application.getCurrentForm().flxHamburger.flxMyProfile.isVisible = false;
                     }
                 }
                 break;
             case "myTime":
                 if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         listOfAvailableApps.push({
                             "id": "myTime",
                             "name": "TIME"
                         });
                         noOfESSAppsPresentinDevice++;
                     }
                 }
                 else {

                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         kony.application.getCurrentForm().flxHamburger.flxMyTime.isVisible = true;
                     }
                     else {
                         kony.application.getCurrentForm().flxHamburger.flxMyTime.isVisible = false;
                     }
                 }
                 break;
             case "myPay":
                 if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         listOfAvailableApps.push({
                             "id": "myPay",
                             "name": "PAY"
                         });
                         noOfESSAppsPresentinDevice++;
                     }
                 }
                 else {

                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         kony.application.getCurrentForm().flxHamburger.flxMyPay.isVisible = true;
                     }
                     else {
                         kony.application.getCurrentForm().flxHamburger.flxMyPay.isVisible = false;
                     }
                 }
                 break;
             case "myExpenses":
                 if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         listOfAvailableApps.push({
                             "id": "myExpenses",
                             "name": "EXPENSES"
                         });
                         noOfESSAppsPresentinDevice++;
                     }
                 }
                 else {

                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         kony.application.getCurrentForm().flxHamburger.flxMyExpenses.isVisible = true;
                     }
                     else {
                         kony.application.getCurrentForm().flxHamburger.flxMyExpenses.isVisible = false;
                     }
                 }

                 break;
             case "myApprovals":
                 if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         listOfAvailableApps.push({
                             "id": "myApprovals",
                             "name": "APPROVALS"
                         });
                         noOfESSAppsPresentinDevice++;
                     }
                 }
                 else {

                     if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                         kony.application.getCurrentForm().flxHamburger.flxMyApprovals.isVisible = true;
                     }
                     else {
                         kony.application.getCurrentForm().flxHamburger.flxMyApprovals.isVisible = false;
                     }
                 }

                 break;
             default:
                 break;
         }

     }
     if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
         if (noOfESSAppsPresentinDevice > 0) {
             kony.application.getCurrentForm().flxMenuForIntegratedMode.isVisible = true;
         }
         else if (noOfESSAppsPresentinDevice === 0) {
             kony.application.getCurrentForm().flxMenuForIntegratedMode.isVisible = false;
         }
     }


 };