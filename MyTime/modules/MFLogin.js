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
    var identityServiceName = kony.apps.coe.ess.appconfig.identityServiceName;

   if(kony.apps.coe.ess.globalVariables.isSPA)
   {
    options = {
      "access": "online"
    };
    var username = kony.apps.coe.ess.frmLogin.username;
    var password = kony.apps.coe.ess.frmLogin.password;
    authConfig = {
      "authParams": {
        "userid": username,
        "password": password,
        "callerId" :username+"xyz", //kony.sdk.mvvm.Utils.getDeviceID(),
        "loginOptions": {
          "isOfflineEnabled": false,
          "isSSOEnabled": false,
          "include_profile": true,
        }
      },
      "options": options,
      "identityServiceName": identityServiceName
    };
    // status="spa";
  }
  else
    {
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
                    "isSSOEnabled": true,
                    "include_profile": true,
                }
            },
            "options": options,
            "identityServiceName": identityServiceName
        };
    }

    else if (status == "ssoEnable") {
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
                        "isSSOEnabled": true,
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
                        "isSSOEnabled": true,
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
                  		"isSSOEnabled": true,
                  	//#endif
                    "include_profile": true,
                }
            },
            "options": options,
            "identityServiceName": identityServiceName
        };
    }


}// else part of native

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
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServiceName).getProfile(true, userDetailsSucess, userDetailsSucess);
  }
  else{
    userDetailsSucess();
  }
}

// Dynamic Skinning success call back function
function dynamicSkinningSuccess(resp){
  kony.print(resp);
}

function userDetailsSucess(response) {
    try {
        if (response!=undefined) {
          kony.apps.coe.ess.frmLogin.username = response.userid;
          kony.print("userId is"+response.userid);
        }
        var appInstance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        if (appInstance) {
             // kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.initializing"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            //Initialize ApplicationForms
            kony.sdk.mvvm.initApplicationForms(appInstance);
          kony.print("After Applicatrion forms");
           if(kony.apps.coe.ess.globalVariables.isSPA)//added for spa block start
            {
               showTimesheetHomeForm();
               return;
            }

            kony.apps.coe.ess.Sync.initializeSync(function() {
                kony.apps.coe.ess.Sync.doDownload = true;
                //Check if New User is loging in device and reset old users database
                kony.apps.coe.ess.frmLogin.resetDbIncaseOfNewUser(function(isNewUser) {
                    var syncSessionSuccess = function() {
                        kony.apps.coe.ess.frmLogin.afterloginSuccess();
                        kony.print("perflogs time: The time when Intial sync is completed.......");
                        //After Sync Session is Successfully completed, Check for initialize & show landing form

                          if( kony.apps.coe.ess.globalVariables.isNativeTablet === false){
                          	//After Sync Session is Successfully completed, Check for initialize & show landing form
              				InitailizeAllAppGloabalsOnSyncSuccess(); 
                          }else{
                            InitailizeAllTabGloabalsOnSyncSuccess();
                            //frmListView.show();
                          }
						    var updateSyncDate = function() {
                            var months = [
                                "Jan", "Feb", "Mar",
                                "Apr", "May", "Jun", "Jul",
                                "Aug", "Sep", "Oct",
                                "Nov", "Dec"
                            ];
                            var currDate = new Date();
                            var currDay = currDate.getDate();
                            var currMonth = months[currDate.getMonth()];
                            var currYear = currDate.getFullYear();
                            var currTime = currDate.toHHMMSS(":");
                            var suffix;
                            if (parseInt(currDate.getHours()) >= 12) {
                                suffix = "PM";
                            } else {
                                suffix = "AM";
                            }
							if( kony.apps.coe.ess.globalVariables.isNativeTablet === false){
								if (kony.application.getCurrentForm().lblSyncDate !== null || kony.application.getCurrentForm().lblSyncTime !== null) {
									kony.application.getCurrentForm().lblSyncDate.text = currDay + " " + currMonth + " " + currYear;
									kony.application.getCurrentForm().lblSyncTime.text = currTime.substring(0, 5) + " " + suffix;
								}
								frmHamburger.lblSyncDate.text = currDay + " " + currMonth + " " + currYear;
								frmHamburger.lblSyncTime.text = currTime.substring(0, 5) + " " + suffix;
							}
                        }
                        updateSyncDate();
						if( kony.apps.coe.ess.globalVariables.isNativeTablet === false){
							kony.apps.coe.ess.MyTime.Footer.SetFooterNavigation(1);
							if (isNewUser) {
								kony.apps.coe.ess.KMS.enablePushNotifications();
							}
							kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;
						}
                        kony.application.dismissLoadingScreen();
                    };
                  var sqlquery = "select Id,Designation_Id from Employee where IsEmployee = 1";
                        kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
                          kony.print("---Employee data: "+JSON.stringify(data));
                          if(data.length > 0){
                            kony.print("---String: "+data[0].Designation_Id+"\nInteger: "+parseInt(data[0].Designation_Id));
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
                    var syncSessionFailure = function(err) {
                        //Incase of Any Sync Failure
                        //ToDo : What to show on Sync Failure
                        kony.application.dismissLoadingScreen();
                        kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;
                        //#ifdef windows8
							frmLogin.flxLogin.onClick =  function() {
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
                        if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                            //If no internet, skip sync
                            syncSessionSuccess();
                        } else {
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
								var ssotoken = kony.sdk.util.getSSOToken();
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
                        kony.print("Error occured while using touch_id functions : MFLogin.js : " + JSON.stringify(e));
                    }
                });
            });
        } else {
            //If appInstance is null/undefined, It means app is not initialized properly
            kony.sdk.mvvm.log.error("Application is not initialized");
            applicationErrorCallback("Application is not initialized");
        }
    } catch (excp) {
      kony.sdk.mvvm.log.error("---- Exception Occured in applicationSuccessCallback of LoginAction " + excp)
      kony.sdk.mvvm.log.error("---- Exception Occured in applicationSuccessCallback of LoginAction " + JSON.stringify(excp));
        kony.application.dismissLoadingScreen();
    }
}

function applicationErrorCallback(error) {
    kony.sdk.mvvm.log.error("failed to load app");
    error = error.getRootErrorObj();
    frmLogin.lblLoginErrorMessage.isVisible = true;
    frmLogin.tbUsername.skin = "sknTbWrongCredentials";
    frmLogin.tbPassword.skin = "sknTbWrongCredentials";
    if (error.mfcode == "Auth-4") {
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.wrongCredentials");
        } else {
            frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.offlineLoginFailure");
        }
    } else {
        //Clear SSO Cache
        kony.sdk.resetCacheKeys(kony.sdk.getCurrentInstance());
      	if( kony.apps.coe.ess.globalVariables.isNativeTablet === false ){
        	kony.sdk.util.deleteSSOToken();
        }
    }

    if (kony.application.getCurrentForm() !== frmLogin) {
        frmLogin.show();
    }
    kony.print("Error Occured on LoginAction : " + JSON.stringify(error));
    kony.application.dismissLoadingScreen();
    kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;
    //#ifdef windows8
		frmLogin.flxLogin.onClick =  function() {
			kony.apps.coe.ess.frmLogin.btnLoginOnclick();
		};
	//#else
		frmLogin.btnLogin.onClick = function() {
			kony.apps.coe.ess.frmLogin.btnLoginOnclick();
		};
	//#endif
}

kony.sdk.mvvm.LogoutAction = function() {
    sync.stopSession(function(){
     kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
    });
    options = {};
    options.slo = true;
    kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
    function sucCallback() {
        frmLogin.show();
     }
    function errCallback(err) {
        frmLogin.show();
        kony.print(JSON.stringify(err));
    }
};


//In case of offline it retains previous configurations and navigates to home screen
function onThemeSettingSuccessCallback(successresp){
	kony.print(successresp);
}

function onThemeSettingErrorCallback(errorresp){
	kony.print(errorresp);
}

