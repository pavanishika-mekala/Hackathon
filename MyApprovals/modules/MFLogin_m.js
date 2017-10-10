kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.constants["ENABLE_JSON_STRINGIFY_PRINTS"] = false;
kony.sdk.mvvm.constants["ENABLE_LAZY_LOADING"] = true;
kony.sdk.mvvm.constants["DYNAMIC_THEME_ENABLED"] = false;

kony.sdk.mvvm.LoginAction = function(status) {
    kony.print("---------------------In LoginAction MFLogin.js-------------");
    var options = {};
    var authConfig;
    var identityServiceName = kony.apps.coe.ess.appconfig.identityServiceName;
    if (kony.apps.coe.ess.globalVariables.isSPA === true || kony.apps.coe.ess.globalVariables.isWebDesktop === true) {
        options = {
            "access": "online"
        };
            if (kony.apps.coe.ess.globalVariables.isSPA === true) {
      var username = kony.apps.coe.ess.frmLogin.username;
      var password = kony.apps.coe.ess.frmLogin.password;
     } else {
      var username = kony.apps.coe.ess.frmLoginDesk.username;
      var password = kony.apps.coe.ess.frmLoginDesk.password;
       }
        authConfig = {
            "authParams": {
                "userid": username,
                "password": password,
                "callerId": username + kony.sdk.mvvm.Utils.getDeviceID(),
                "loginOptions": {
                    "isOfflineEnabled": false,
                    "isSSOEnabled": false,
                    "include_profile": true,
                }
            },
            "options": options,
            "identityServiceName": identityServiceName
        };
    } else {

        if (status == "DeepLink") {
            kony.apps.coe.ess.frmLogin.username = appserviceUsername;
            kony.apps.coe.ess.frmLogin.password = appservicePassword;
            options = {
                "access": "offline"
            };
            authConfig = {
                "authParams": {
                    "userid": appserviceUsername,
                    "password": appservicePassword,
                    "callerId": appserviceUsername + kony.sdk.mvvm.Utils.getDeviceID(),
                    "loginOptions": {
                        "isOfflineEnabled": true,
                        "isSSOEnabled": false,
                        "include_profile": true,
                    }
                },
                "options": options,
                "identityServiceName": identityServiceName
            };
        } else if (status == "ssoEnable") {
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                var unique_id = null;
                var sso_token = kony.sdk.util.getSSOToken();
                if (kony.apps.coe.ess.frmLogin.username === null || kony.apps.coe.ess.frmLogin.username === " " || kony.apps.coe.ess.frmLogin.username === undefined) {
                    unique_id = sso_token;
                } else {
                    unique_id = kony.apps.coe.ess.frmLogin.username;
                }
                options = {
                    "access": "online"
                };
                authConfig = {
                    "authParams": {
                        "callerId": unique_id + kony.sdk.mvvm.Utils.getDeviceID(),
                        "loginOptions": {
                            "isOfflineEnabled": false,
                            "isSSOEnabled": false,
                            "include_profile": true,
                        }
                    },
                    "options": options,
                    "identityServiceName": identityServiceName
                };
            } else {
                options = {
                    "access": "offline"
                };
                var username = kony.apps.coe.ess.frmLogin.username;
                var password = kony.apps.coe.ess.frmLogin.password;
                authConfig = {
                    "authParams": {
                        "userid": username,
                        "password": password,
                        "callerId": username + kony.sdk.mvvm.Utils.getDeviceID(),
                        "loginOptions": {
                            "isOfflineEnabled": true,
                            "isSSOEnabled": false,
                            "include_profile": true,
                        }
                    },
                    "options": options,
                    "identityServiceName": identityServiceName
                };
            }
        } else {
            //#ifdef windows8
            options = {
                "access": "online"
            };
            //#else
            options = {
                "access": "offline"
            };
            //#endif
            var username = kony.apps.coe.ess.frmLogin.username;
            var password = kony.apps.coe.ess.frmLogin.password;
            authConfig = {
                "authParams": {
                    "userid": username,
                    "password": password,
                    "callerId": username + kony.sdk.mvvm.Utils.getDeviceID(),
                    "loginOptions": {
                        //#ifdef windows8
                        "isOfflineEnabled": false,
                        "isSSOEnabled": false,
                        //#else
                        "isOfflineEnabled": true,
                        "isSSOEnabled": false,
                        //#endif
                        "include_profile": true,
                    }
                },
                "options": options,
                "identityServiceName": identityServiceName
            };
        }
    } // else block end of spa


    //--------------


    kony.sdk.mvvm.KonyApplicationContext.init();
    var appFactory = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
    var initManager = appFactory.createAppInitManagerObject();
    initManager.registerService("AuthenticationServiceManager", {
        "object": appFactory.createAuthManager(),
        "params": authConfig
    });
    initManager.registerService("MetadataServiceManager", {
        "object": appFactory.createMetadataServiceManagerObject(),
        "params": {
            "options": options
        }
    });
    initManager.executeRegistedServices(applicationSuccessCallback, applicationErrorCallback);
};

function applicationSuccessCallback() {
  _removeTokenHeaders();

  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServiceName).getProfile(true, userDetailsSucess, userDetailsSucess);
  }
  else{
    userDetailsSucess();
  }
}

//Dynamic skinning success callback function
function dynamicSkinningSuccess(resp) {
    kony.print(resp);
}

function userDetailsSucess(response) {
    try {
        if (response!=undefined) {
          kony.apps.coe.ess.frmLogin.username = response.userid;
        }
        var appInstance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        kony.print("------------ appInstance: " + JSON.stringify(appInstance));
        if (appInstance) {
            kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.initializing"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            //Initialize ApplicationForms
            kony.sdk.mvvm.initApplicationForms(appInstance);
           if (kony.apps.coe.ess.globalVariables.isSPA) {

              showApprovalHome();
                    return;
      			}
            else if(kony.apps.coe.ess.globalVariables.isWebDesktop === true){
              kony.apps.coe.ess.frmLogin.afterloginSuccess();
               var objSvc = kony.sdk.getCurrentInstance().getObjectService("Employee", {
                        "access": "online"
                    });
                    var dataObject= new kony.sdk.dto.DataObject("Employee");
                    //dataObject.setOdataUrl("$filter=IsEmployee eq '1'");
                    var options = {
                        "dataObject": dataObject
                    };
                    objSvc.fetch(options,
                        function(res) {
                         for (var i in res.records)
                           {
                             if(res.records[i].IsEmployee==="1")
                               {
                                 kony.apps.coe.ess.globalVariables.EmployeeID=res.records[i].Communication_Channel[1].Employee_Id;
                                 kony.print("----filtered employee id is "+ kony.apps.coe.ess.globalVariables.EmployeeID);
                                showApprovalsDashboard();
                               }
                           }

                        },
                        function(err) {
                            kony.print("---------- dataObject error: " + JSON.stringify(err));
                        });

                    return;
      			}
            //Initialize SyncLib
            else {// (kony.apps.coe.ess.globalVariables.isNative == true) {
                kony.apps.coe.ess.Sync.initializeSync(function() {
                    //SyncInit Success
                    kony.apps.coe.ess.Sync.doDownload = true;
                    //Check if New User is loging in device and reset old users database
                    kony.apps.coe.ess.frmLogin.resetDbIncaseOfNewUser(function(isNewUser) {

                        var syncSessionSuccess = function() {
                            kony.apps.coe.ess.frmLogin.afterloginSuccess();
                            //After Sync Session is Successfully completed, Check for initialize & show landing form
                            var updateSyncDate = function() {
                              kony.apps.coe.ess.globalVariables.lastSyncDate=new Date();
//                                 var months = [
//                                     "Jan", "Feb", "Mar",
//                                     "Apr", "May", "Jun", "Jul",
//                                     "Aug", "Sep", "Oct",
//                                     "Nov", "Dec"
//                                 ];

//                                 var currDate = new Date();
//                                 var currDay = currDate.getDate();
//                                 var currMonth = currDate.getMonthNameShort(kony.store.getItem("localeToBeSet"));//months[currDate.getMonth()];
//                                 var currYear = currDate.getFullYear();
//                                 var currTime = currDate.toHHMMSS(":");
//                                 var suffix;
//                                 if (parseInt(currDate.getHours()) >= 12) {
//                                     suffix = "PM";
//                                 } else {
//                                     suffix = "AM";
//                                 }
//                               	//bbe-101 menu sync
//                               	kony.apps.coe.ess.globalVariables.lastSyncDate=currDay + " " + currMonth + " " + currYear;
// 								kony.apps.coe.ess.globalVariables.lastSyncTime= currTime.substring(0, 5);// + " " + suffix;
//                                 //#ifndef windows8
//                                 if (kony.application.getCurrentForm().lblSyncDate !== null || kony.application.getCurrentForm().lblSyncTime !== null) {
//                                     kony.application.getCurrentForm().lblSyncDate.text = currDay + " " + currMonth + " " + currYear;
//                                     kony.application.getCurrentForm().lblSyncTime.text = currTime.substring(0, 5); //+ " " + suffix;
//                                 }
//                                 //#endif
                            }
                            updateSyncDate();
                            if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                                kony.apps.coe.ess.globalVariables.updateTabEmployeeID(); // open approvals dashboard form
                            } else {
                                kony.apps.coe.ess.Approvals.Footer.SetFocus(1);
                                var sqlquery = "select Id,Designation_Id from Employee where IsEmployee = 1";
                                kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
                                        kony.print("---Employee data: " + JSON.stringify(data));
                                        if (data.length > 0) {
                                            kony.print("---String: " + data[0].Designation_Id + "\nInteger: " + parseInt(data[0].Designation_Id));
                                            kony.apps.coe.ess.globalVariables.designation_id = data[0].Designation_Id;
                                            kony.apps.coe.ess.globalVariables.user_id = data[0].User_Id;
                                            //Invoking Dynamic Skinning Configurations
		                                    //If network is available
        		                          	if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                		                        kony.servicesapp.loadAndConfigureApp(kony.apps.coe.ess.appconfig.runtimeurl, dynamicSkinningSuccess);
                        		            }
                                		  	//If network is not available
                                    		else{
                                      			var themeString = kony.store.getItem("dynamicSkinningTheme");
	  											var jsonObj1 = JSON.parse(themeString);
      											kony.theme.createThemeFromJSONString(JSON.stringify(jsonObj1), "MyTheme1", onThemeSettingSuccessCallback, onThemeSettingErrorCallback);
      											kony.theme.setCurrentTheme("MyTheme1", onThemeSettingSuccessCallback, onThemeSettingErrorCallback);
      										}
                                  		}
                                    },
                                    function(err) {
                                        kony.print("--Error in getting Employee_id--");
                                    });
                                kony.apps.coe.ess.globalVariables.Status.updateStatus();
                                if (isNewUser) {
                                    kony.apps.coe.ess.KMS.enablePushNotifications();
                                }
                                kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;
                            }
                        };
                        var syncSessionFailure = function(err) {
                            //Incase of Any Sync Failure
                            //ToDo : What to show on Sync Failure
                            kony.application.dismissLoadingScreen();
                            kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;
                            //#ifdef windows8
                            frmLogin.flxLogin.onClick = function() {
                                kony.apps.coe.ess.frmLogin.btnLoginOnclick();
                            };
                            //#else
                            frmLogin.btnLogin.onClick = function() {
                                kony.apps.coe.ess.frmLogin.btnLoginOnclick();
                            };
                            //#endif
                            handleError(err);
                        };
                        var syncAndShowLandingForm = function() {
                            //Operations to be done after successful authentication
                            if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                                // we call syncSessionSuccess in case of offline mode
                                syncSessionSuccess();
                            } else {
                                // //After Successfull verification of New user, Start Sync Session
                                kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                                kony.apps.coe.ess.Sync.startSyncSession(syncSessionSuccess, syncSessionFailure);
                            }
                        };
                        try {
                            //#ifdef windows8
                            syncAndShowLandingForm();
                            //#else
                            if (isNewUser) {
                                //Show Enable TouchID Popup for new user - If TouchID is supported
                                if (kony.apps.coe.ess.TouchID.isTouchAuthenticationSupported()) {
                                    if (applaunchMode == 3 || kony.apps.ess.deepLinkingSSO.ssotoken) {
                                        syncAndShowLandingForm();
                                        return;
                                    } else {
                                        kony.application.dismissLoadingScreen();
                                        //Show ToucID enable popup only if it's not enabled
                                        if (kony.store.getItem("useTouchID") === null || kony.store.getItem("useTouchID") === false) {
                                            if (kony.application.getCurrentForm() === frmLogin) {
                                                kony.apps.coe.ess.frmLogin.showEnableTouchIDPopup(syncAndShowLandingForm);
                                                return;
                                            }
                                        }
                                    }
                                }
                                syncAndShowLandingForm();
                            } else {
                                kony.apps.coe.ess.Sync.syncOnLandingForm = true;
                                syncSessionSuccess();
                            }
                            //#endif
                        } catch (e) { //In android, exceptio may be thrown for touchID functions
                            handleError(e);
                            kony.print("Error occured while using touch_id functions : MFLogin.js : " + JSON.stringify(e));
                        }

                    });
                }, function(err) {
                    //Sync InitFailed
                    kony.sdk.mvvm.log.error("Sync is not initialized");
                    applicationErrorCallback("Application is not initialized");
                });
            }
        } else {
            //If appInstance is null/undefined, It means app is not initialized properly
            kony.sdk.mvvm.log.error("Application is not initialized");
            applicationErrorCallback("Application is not initialized");
        }
    } catch (excp) {
        kony.sdk.mvvm.log.error("Exception Occured in applicationSuccessCallback of LoginAction " + JSON.stringify(excp));
        kony.application.dismissLoadingScreen();
    }
}

function applicationErrorCallback(error) {
  _removeTokenHeaders();

	kony.sdk.mvvm.log.error("failed to load app");
	error = error.getRootErrorObj();
	if(kony.apps.coe.ess.globalVariables.isWebDesktop){
    frmLoginDesk.flxLoginMain.flxErrorSpace.setVisibility(true);
    frmLoginDesk.forceLayout();
    frmLoginDesk.tbUsername.skin = "sknTbWrongCredentials";
    frmLoginDesk.tbPassword.skin = "sknTbWrongCredentials";
    if (error.mfcode == "Auth-7") {
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          frmLoginDesk.flxLoginMain.flxErrorSpace.setVisibility(true);
          frmLoginDesk.forceLayout();
         // frmLoginDesk.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.wrongCredentials");
        } else {
           frmLoginDesk.flxLoginMain.flxErrorSpace.setVisibility(true);
           frmLoginDesk.forceLayout();
           // frmLoginDesk.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.offlineLoginFailure");
        }
    }
    if (kony.application.getCurrentForm() !== frmLoginDesk) {
        frmLoginDesk.show();
    }
    kony.print("Error Occured on LoginAction : " + JSON.stringify(error));
    kony.application.dismissLoadingScreen();
	  frmLoginDesk.imgLogin.onClick = function() {
        kony.apps.coe.ess.frmLogin.btnLoginOnclick();
      };
	}
	else{
    frmLogin.lblLoginErrorMessage.isVisible = true;
    frmLogin.tbUsername.skin = "sknTbWrongCredentials";
    frmLogin.tbPassword.skin = "sknTbWrongCredentials";
    if (error !== null && error !== undefined && error.mfcode !== null && error.mfcode !== undefined && error.mfcode == "Auth-4") {
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.wrongCredentials");
        } else {
            frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.offlineLoginFailure");
        }
    } else {
        //Clear SSO Cache
       // kony.sdk.resetCacheKeys(kony.sdk.getCurrentInstance());
        kony.sdk.util.deleteSSOToken();
    }

    if (kony.application.getCurrentForm() !== frmLogin) {
        frmLogin.show();
    }
    kony.print("Error Occured on LoginAction : " + JSON.stringify(error));
    kony.application.dismissLoadingScreen();
    kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;
    //#ifdef windows8
    frmLogin.flxLogin.onClick = function() {
        kony.apps.coe.ess.frmLogin.btnLoginOnclick();
    };
    //#else
    frmLogin.btnLogin.onClick = function() {
        kony.apps.coe.ess.frmLogin.btnLoginOnclick();
    };
    //#endif

    handleError(error);
}
}

function _removeTokenHeaders(){
  if(kony.sdk.getCurrentInstance() !== undefined && kony.sdk.getCurrentInstance() !== null ){
    // Remove token headers, if present
    kony.sdk.getCurrentInstance().removeGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_token_header1, "headers");
    kony.sdk.getCurrentInstance().removeGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_token_header2, "headers");
  }
}

kony.sdk.mvvm.LogoutAction = function() {
    options = {};
    options.slo = true;

    if (kony.apps.coe.ess.appconfig.useOkta) {
      // Clear login variables
      kony.store.removeItem("username");
      kony.store.removeItem("password");
      kony.store.removeItem("rememberme");
      kony.sdk.util.deleteSSOToken();

      kony.application.showLoadingScreen("", kony.i18n.getLocalizedString(""), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
      // Destroy Okta session
      try {
        var preLoginService = kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServicePreLogin);
        preLoginService.logout(function() {
          kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
        }, function() {
          kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
        }, {});
      } catch (exception) {
        kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
      }
    } else {
      kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
    }

    function sucCallback() {
      kony.application.dismissLoadingScreen();
      frmApprovalHome.destroy();
      frmLogin.show();
    }

    function errCallback(err) {
        kony.application.dismissLoadingScreen();
        frmLogin.show();
        frmApprovalHome.destroy();
        kony.print(JSON.stringify(err));
    }
};


//In case of offline it retains previous configurations and navigates to home screen
function onThemeSettingSuccessCallback(successresp){
  //Navigating to frmApprovalHome on applying the dynamic skins.
  var navigateLandingPage = function() {
  	var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
  	formController.loadDataAndShowForm();
  }
  kony.apps.coe.ess.globalVariables.updateEmployeeID(navigateLandingPage);
}

function onThemeSettingErrorCallback(errorresp){
  kony.print(errorresp);
}

kony.sdk.mvvm.Logout_DW=function()
{
  frmLoginDesk.flxErrorSpace.setVisibility(false);
  frmLoginDesk.forceLayout();
  frmLoginDesk.show();
  frmApprovalsDashboard.destroy();
  frmDelegationRequests.destroy();
  frmHamburgerDW.destroy();
  frmHistory.destroy();
  frmPendingRequest.destroy();
  frmTeamCalendar.destroy();

};
