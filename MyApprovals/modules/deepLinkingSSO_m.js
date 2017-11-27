/*** @Author Navya.Inampudi
 * @category Business Logic / Action
 * @desc  Login class.
 * In this class we handle deeplinking and sso (Single Sign On) related functionalities.
 * @  2016 Kony Inc.
 **/
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.deepLinkingSSO = kony.apps.ess.deepLinkingSSO || {};
kony.apps.ess.deepLinkingSSO.staticUrl = "com.engie.benelux.cofely.";//com.engie.eTimeSheetMyApprovals
var appserviceUsername;
var appservicePassword;
var appserviceRefreshToken;
var applaunchMode;
var appCheckerObject = null;
var listOfAvailableApps = [];

/**
 * @member of  deepLinkingSSO
 * @return {void} - frmtobeOpened
 * @Desc - check the Application Launch Mode.
 *
 */
kony.apps.ess.deepLinkingSSO.appServicesAction = function(eventobject) {
    var callback = kony.apps.ess.deepLinkingSSO.appServiceCallback(eventobject);
    if (kony.apps.coe.ess.globalVariables.isNative) {
        kony.apps.coe.ess.KMS.setPushNotificationCallbacks();
    }
    return callback;
};


kony.apps.ess.deepLinkingSSO.appServiceCallback = function(params) {
if (kony.apps.coe.ess.globalVariables.isSPA) //--added for spa--
  {
    kony.print("--returning from deepLinkingSSO_m.js file appServiceCallbackas it is spa--");
    return;
  }
  if (kony.apps.coe.ess.globalVariables.isNative === true) {
        if(kony.apps.ess.deepLinkingSSO.currentFormValue != null && params!==undefined && params!==null && params.launchparams!==undefined && params.launchparams!==null && params.launchparams.userName!==undefined & params.launchparams.userName!==null && kony.apps.coe.ess.frmLogin.username !==undefined && params.launchparams.userName != kony.apps.coe.ess.frmLogin.username){
            kony.store.removeItem("oktaToken");
            return frmLogin;
        }
        if (kony.apps.ess.deepLinkingSSO.currentFormValue === null || kony.apps.ess.deepLinkingSSO.currentFormValue === undefined || kony.apps.coe.ess.frmLogin.username == "") {
            //if (kony.os.deviceInfo().name === "android") {
            //    return frmLogin;
            //}
            if (params.launchparams != "" && params.launchparams != null && params.launchparams.length > 0) {
                if (params.launchparams.isTouchIdEnabled == "true") {
                    kony.apps.ess.deepLinkingSSO.isTouchIdEnabled = true;
                    kony.store.setItem("useTouchID", true);
                } else {
                    kony.apps.ess.deepLinkingSSO.isTouchIdEnabled = false;
                    kony.store.setItem("useTouchID", false);
                }
                if (params.launchparams.isRememberMeEnabled == "true") {
                    kony.apps.ess.deepLinkingSSO.isRememberMeEnabled = true;
                    kony.store.setItem("rememberme", true);
                } else {
                    kony.apps.ess.deepLinkingSSO.isRememberMeEnabled = false;
                    kony.store.setItem("rememberme", false);
                }
            }
            kony.apps.ess.deepLinkingSSO.ssotoken = kony.sdk.util.getSSOToken();
            if (kony.apps.ess.deepLinkingSSO.ssotoken) {
                if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                    return frmDummyTab;
                } else {
                    return frmDummy;
                }
            } else if (params.launchmode == 3) {
                if (params.launchparams.formToOpen == "frmDummy") {
                    appserviceUsername = params.launchparams.userName;
                    appservicePassword = params.launchparams.passWord;
                    appserviceRefreshToken = params.launchparams.refreshToken;
                    applaunchMode = params.launchmode;
                    kony.store.setItem("isMyApprovalsFirstTimeLaunch", false);
                    if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                        return frmDummyTab;
                    } else {
                        return frmDummy;
                    }
                }
            } else {
                return (new kony.apps.coe.ess.QRCode()).loadStartupForm();
            }


        } else {
            return kony.apps.ess.deepLinkingSSO.currentFormValue;
        }

    kony.print("---- appServiceCallback:End-------");
	}
};
/**
 * @member of  deepLinkingSSO
 * @return {void} - void
 * @Desc - function to be executed on post show of the form
 *
 */
kony.apps.ess.deepLinkingSSO.frmDummyPostShow =
  function() {
    if (kony.apps.coe.ess.globalVariables.isSPA) //added for spa
    {
      frmLogin.show();
      return;
    }
    if (kony.apps.ess.deepLinkingSSO.ssotoken) {
      if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        initMbaasApp(function() {
          if (kony.apps.coe.ess.appconfig.useOkta === true) {
            kony.apps.coe.ess.frmLogin.oktaRefresh(appserviceRefreshToken, "ssoEnable");
          } else {
            kony.sdk.mvvm.LoginAction("ssoEnable");
          }
        });
      } else {
        frmLogin.show();
      }
    } else if (applaunchMode == 3) {
      var result = this.checkNewUser();
      if (result === true) {
        frmLogin.show();
      } else {
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          initMbaasApp(function() {
            if (kony.apps.coe.ess.appconfig.useOkta === true) {
              kony.apps.coe.ess.frmLogin.oktaRefresh(appserviceRefreshToken, "DeepLink");
            } else {
              kony.sdk.mvvm.LoginAction("DeepLink");
            }
          });
        } else {
          kony.sdk.mvvm.LoginAction("DeepLink");
        }
      }
    }
    kony.print("---frmDummyPostShow:End--------");
  };


/**
 * @member of  deepLinkingSSO
 * @return {void} - return boolean value.
 * @Desc - its check the user is newUser or Not.
 *
 */
kony.apps.ess.deepLinkingSSO.checkNewUser = function() {
    kony.print("---- checkNewUser:Start-------");
    if (appserviceUsername !== kony.apps.coe.ess.frmLogin.username && kony.apps.coe.ess.frmLogin.username != "" && kony.apps.coe.ess.frmLogin.username !== null && kony.apps.coe.ess.frmLogin.username !== undefined) {
      return true;
    } else {
      return false;
    }
    kony.print("---- checkNewUser:End-------");
};
/**
 * @member of  deepLinkingSSO
 * @return {void} - void
 * @Desc - open the corresponding App based on button click.
 *
 */
kony.apps.ess.deepLinkingSSO.btnOtherAppsOnClick = function(status) {
    kony.print("---- btnOtherAppsOnClick:Start-------");
    var remembermeStatus, touchIdStatus;
    kony.apps.coe.ess.Hamburger.prototype.hideHamburger();
    var url = "";
    if (kony.store.getItem("rememberme") == false) {
        remembermeStatus = false;
    } else {
        remembermeStatus = true;
    }
    if (kony.store.getItem("useTouchID") == true) {
        touchIdStatus = true;
    } else {
        touchIdStatus = false;
    }
    if (status.length > 0) {
        if (kony.os.deviceInfo().name === "iPad" || kony.os.deviceInfo().name === "iPhone") {
            if ((appCheckerObject === null) || (appCheckerObject === undefined))
                appCheckerObject = new AppChecker.AppChecker();
            var returnedValue = false;
            returnedValue = appCheckerObject.isAppExist(status + "://");
            if (returnedValue === true) {
              // Check if it is possible to pass the refresh token to the new app
              if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                var loginService = kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.globalVariables.active_login_service);
                kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.Authenticating"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                loginService.getSecurityAttributes(function(res){
                  kony.application.dismissLoadingScreen();
                  // Pass the refresh token when opening new app
                  kony.application.openURL(status + "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus + "&refreshToken=" + res.refresh_token);
                }, function(){
                  kony.application.dismissLoadingScreen();
                  kony.application.openURL(status + "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus);
                });
              } else {
                kony.application.openURL(status+ "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus);
              }
            } else {
                if (status == "myPay") {
                    url = kony.apps.coe.ess.appconfig.myPayUrl;
                } else if (status == "myLeave") {
                    url = kony.apps.coe.ess.appconfig.myLeaveUrl;
                } else if (status == "myTime") {
                    url = kony.apps.coe.ess.appconfig.myTimeUrl;
                } else if (status == "myExpenses") {
                    url = kony.apps.coe.ess.appconfig.myExpenseUrl;
                } else if (status == "myProfile") {
                    url = kony.apps.coe.ess.appconfig.myProfileUrl;
                }
                kony.application.openURL(url);
            }
        } else if (kony.os.deviceInfo().name === "android") {
            var changeStatus = "" + status;
            changeStatus = changeStatus.toLowerCase();
          //  var modifiedAppName = "ess" + changeStatus + "mobile";
            //var appstoreUrl = kony.apps.ess.deepLinkingSSO.staticUrl + modifiedAppName;
            var verticalappsUrl = kony.apps.ess.deepLinkingSSO.staticUrl + status;
            //var checkifExistObject = new AppCheckerAndroid.checkifExist(appstoreUrl);
            //var appstoreReturnedValue = checkifExistObject.appInstalledOrNot();
            var checkifExistObject1 = new AppCheckerAndroid.checkifExist(verticalappsUrl);
            var verticalAppsReturnedValue = checkifExistObject1.appInstalledOrNot();
            if (/*appstoreReturnedValue === true ||*/ verticalAppsReturnedValue === true) {
               // Check if it is possible to pass the refresh token to the new app
               if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                 var loginService = kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.globalVariables.active_login_service);
                 kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.Authenticating"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                 loginService.getSecurityAttributes(function(res){
                   kony.application.dismissLoadingScreen();
                   // Pass the refresh token when opening new app
                   url = status + "://" + status + "." + "com";
                   kony.application.openURL(url + "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus + "&refreshToken=" + res.refresh_token);
                 }, function(){
                   kony.application.dismissLoadingScreen();
                   url = status + "://" + status + "." + "com";
                   kony.application.openURL(url + "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus);
                 });
               } else {
                url = status + "://" + status + "." + "com";
                kony.application.openURL(url + "://?formToOpen=frmDummy&userName=" + kony.apps.coe.ess.frmLogin.username + "&passWord=" + kony.apps.coe.ess.frmLogin.password + "&isTouchIdEnabled=" + touchIdStatus + "&isRememberMeEnabled=" + remembermeStatus);
              }
            } else {
                //kony.application.openURL("https://play.google.com/store/apps/details?id=" + appstoreUrl);
            }
            //checkifExistObject = null;
            checkifExistObject1 = null;
        }
    }
    kony.print("----- btnOtherAppsOnClick:End----------------");
};
/**
 * @member of  deepLinkingSSO
 * @return {void} - void
 * @Desc -check the Required Apps installed or Not.
 *
 */
kony.apps.ess.deepLinkingSSO.appExistedOrNot = function() {
    var noOfESSAppsPresentinDevice = 0;
  	listOfAvailableApps = [];
    if (kony.os.deviceInfo().name === "iPad" || kony.os.deviceInfo().name === "iPhone") {
        if ((appCheckerObject === null) || (appCheckerObject === undefined))
            appCheckerObject = new AppChecker.AppChecker();
    }
 		listOfAvailableApps.push({
          "id": "myApprovals",
          "name": "APPROVALS"
      });
    for (var i = 0; i < kony.apps.coe.ess.appconfig.listOfApps.length; i++) {
        var status = false;
        var playStoreAppReturnedValue = false;
        var verticalAppReturnedValue = false;
        if (kony.os.deviceInfo().name === "iPad" || kony.os.deviceInfo().name === "iPhone") {
            status = appCheckerObject.isAppExist(kony.apps.coe.ess.appconfig.listOfApps[i] + "://");
        } else if (kony.os.deviceInfo().name === "android") {
            var changeUrl = "" + kony.apps.coe.ess.appconfig.listOfApps[i].toLowerCase();
           // var playStoreUrl = kony.apps.ess.deepLinkingSSO.staticUrl + "ess" + changeUrl + "mobile";
            var verticalAppsUrl = kony.apps.ess.deepLinkingSSO.staticUrl + kony.apps.coe.ess.appconfig.listOfApps[i];
           // var checkifExistObject = new AppCheckerAndroid.checkifExist(playStoreUrl);
           // playStoreAppReturnedValue = checkifExistObject.appInstalledOrNot();
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
                } else {
                    if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                        kony.application.getCurrentForm().flxHamburger.flxMyProfile.isVisible = true;
                    } else {
                        kony.application.getCurrentForm().flxHamburger.flxMyProfile.isVisible = false;
                    }
                }
                break;
            case "eTimeSheetMyTime":
                if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                    if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                        listOfAvailableApps.push({
                            "id": "myTime",
                            "name": "TIME"
                        });
                        noOfESSAppsPresentinDevice++;
                    }
                } else {
                    if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                        kony.application.getCurrentForm().flxHamburger.flxMyTime.isVisible = true;
                    } else {
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
                } else {
                    if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                        kony.application.getCurrentForm().flxHamburger.flxMyPay.isVisible = true;
                    } else {
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
                } else {
                    if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                        kony.application.getCurrentForm().flxHamburger.flxMyExpenses.isVisible = true;
                    } else {
                        kony.application.getCurrentForm().flxHamburger.flxMyExpenses.isVisible = false;
                    }
                }
                break;
            case "eTimeSheetMyLeave":
                if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                    if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                        listOfAvailableApps.push({
                            "id": "myLeave",
                            "name": "LEAVE"
                        });
                        noOfESSAppsPresentinDevice++;
                    }
                } else {
                    if (status === true || playStoreAppReturnedValue === true || verticalAppReturnedValue === true) {
                        kony.application.getCurrentForm().flxHamburger.flxMyLeave.isVisible = true;
                    } else {
                        kony.application.getCurrentForm().flxHamburger.flxMyLeave.isVisible = false;
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
        } else if (noOfESSAppsPresentinDevice === 0) {
            kony.application.getCurrentForm().flxMenuForIntegratedMode.isVisible = false;
        }
    }
};
