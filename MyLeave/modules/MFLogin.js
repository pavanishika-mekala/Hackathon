kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.constants["ENABLE_JSON_STRINGIFY_PRINTS"] = false;
kony.sdk.mvvm.constants["ENABLE_LAZY_LOADING"] = true;
kony.sdk.mvvm.constants["DYNAMIC_THEME_ENABLED"] = false;

kony.sdk.mvvm.LoginAction = function(status, successCallBack, errorCallback) {
    kony.print("---------------------In LoginAction MFLogin.js-------------");
    var options = {};
    var authConfig;
    var identityServiceName = kony.apps.coe.ess.appconfig.identityServiceSAP;
    if (kony.apps.coe.ess.globalVariables.isNative === true) {
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
        }
        else if (status == "ssoEnable") {
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                var unique_id = null;
                var sso_token = kony.sdk.util.getSSOToken();
                if (kony.apps.coe.ess.frmLogin.username === null || kony.apps.coe.ess.frmLogin.username === " " || kony.apps.coe.ess.frmLogin.username === undefined) {
                    unique_id = sso_token;
                }
                else {
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
            }
            else {

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
        }
        else {

            //#ifdef windows8
            var options = {
                "access": "online"
            };
            //#else
            var options = {
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
    }
    else if (kony.apps.coe.ess.globalVariables.isSPA === true) {
        options = {
            "access": "online"
        };
        var username = kony.apps.coe.ess.frmLogin.username;
        var password = kony.apps.coe.ess.frmLogin.password;
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
    }
    else if (kony.apps.coe.ess.globalVariables.isWebDesktop === true) {
        options = {
            "access": "online"
        };
        var username = kony.apps.coe.ess.frmLogin.username;
        var password = kony.apps.coe.ess.frmLogin.password;
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
    }

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
    // Set callbacks if they were not passed as arguments of the function
    if(successCallBack === undefined || successCallBack === null){
      successCallBack = applicationSuccessCallback;
    }
    if(errorCallback === undefined || errorCallback === null){
      errorCallback = applicationErrorCallback;
    }
    initManager.executeRegistedServices(successCallBack, errorCallback);

    kony.apps.coe.ess.Validation.setChannel();
};

function applicationSuccessCallback() {
    _removeTokenHeaders();

    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServiceSAP).getProfile(true, userDetailsSucess, userDetailsSucess);
    }
    else {
        userDetailsSucess();
    }
}

//Dynamic skinning success call back function
function dynamicSkinningSuccess(resp) {
    kony.print(resp);
}

function userDetailsSucess(response) {
    try {
        if (response != undefined) {
            kony.apps.coe.ess.frmLogin.username = response.userid;
        }
        var appInstance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        if (appInstance) {
            kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.initializing"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            //Initialize ApplicationForms
            kony.sdk.mvvm.initApplicationForms(appInstance);
            if (kony.apps.coe.ess.globalVariables.isNative === true) {
                kony.apps.coe.ess.Sync.initializeSync(function() {
                    //SyncInit Success
                    kony.apps.coe.ess.Sync.doDownload = true;
                    //Check if New User is loging in device and reset old users database
                    kony.apps.coe.ess.frmLogin.resetDbIncaseOfNewUser(function(isNewUser) {

                        var syncSessionSuccess = function() {
                            kony.apps.coe.ess.frmLogin.afterloginSuccess();
                            kony.apps.coe.ess.globalVariables.Status.updateStatus();
                            //After Sync Session is Successfully completed, Check for initialize & show landing form
                            var sqlquery = "select Id, Designation_Id, First_Name , Last_Name from Employee where IsEmployee = 1";
                            kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
                                if (data.length !== 0) {
                                    kony.apps.coe.ess.globalVariables.employeeId = data[0].Id;
                                    gblempId = data[0].Id;
                                    kony.apps.coe.ess.globalVariables.designation_id = data[0].Designation_Id;
                                    //Invoking Dynamic Skinning Configurations
                                    //If network is available
                                    if(kony.apps.coe.ess.globalVariables.isNativeTablet === false){
                                    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                                        kony.servicesapp.loadAndConfigureApp(kony.apps.coe.ess.appconfig.runtimeurl, dynamicSkinningSuccess);
                                    }
                                    //If network is not available
                                    else {
                                        var themeString = kony.store.getItem("dynamicSkinningTheme");
                                        var jsonObj1 = JSON.parse(themeString);
                                        kony.theme.createThemeFromJSONString(JSON.stringify(jsonObj1), "MyTheme1", onThemeSettingSuccessCallback, onThemeSettingErrorCallback);
                                        kony.theme.setCurrentTheme("MyTheme1", onThemeSettingSuccessCallback, onThemeSettingErrorCallback);
                                    }
                                    }
                                    kony.apps.coe.ess.globalVariables.employeeName = data[0].First_Name + data[0].Last_Name;
                                    var currDate = new Date();
                                    var currYear = currDate.getFullYear().toString().trim(0, 4);

                                    if (kony.apps.coe.ess.globalVariables.isNativeTablet === false) {

                                        var getHolidaysQuery = "select count(Holiday_Date) as allHolidays from Holiday where Name !=\"Non Working Day\" and (Holiday_Date between '" + currYear + "0101' AND '" + currYear + "1231')";
                                        kony.sync.single_select_execute(kony.sync.getDBName(), getHolidaysQuery, null, function(res) {
                                            frmLeaveHome.lblAllHolidaysCount.text = res[0].allHolidays + "";
                                        }, function(err) {}, false);
                                        var getPendingRequestsQuery = "select count(l.id) as allPending from leave l join Status s on l.status_id = s.id " +
                                            "where s.Status_Name = 'PENDING' and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and ((l.start_date between '" + (parseInt(currYear) - 1).toString() + "0101'" +
                                            " AND '" + (parseInt(currYear) + 1).toString() + "1231') OR (l.end_date between '" + (parseInt(currYear) - 1).toString() + "0101' AND '" + (parseInt(currYear) + 1).toString() + "1231'))";
                                        kony.sync.single_select_execute(kony.sync.getDBName(), getPendingRequestsQuery, null, function(res) {
                                            frmLeaveHome.lblAllPendingRequestsCount.text = res[0].allPending + "";
                                        }, function(err) {
                                          handleError(err);
                                        }, false);
                                    }
                                }
                                else {
                                    kony.apps.coe.ess.globalVariables.employeeId = "";
                                    kony.apps.coe.ess.globalVariables.employeeName = "";
                                }
                              var updateSyncDate = function() {
                                //commented as part of locale changes
                                //                                     var months = [
                                //                                         "Jan", "Feb", "Mar",
                                //                                         "Apr", "May", "Jun", "Jul",
                                //                                         "Aug", "Sep", "Oct",
                                //                                         "Nov", "Dec"
                                //                                     ];
                                var months = [kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jan"),kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.feb"),
                                              kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.mar"),kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.apr"),
                                              kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.may"),kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jun"),
                                              kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jul"),kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.aug"),
                                              kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.sep"),kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.oct"),
                                              kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.nov"),kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.dec")];

                                var currDate = new Date();
                                var currDay = currDate.getDate();
                                var currMonth = months[currDate.getMonth()];
                                var currYear = currDate.getFullYear();
                                var currTime = currDate.toHHMMSS(":");
                                var suffix;
                                if (parseInt(currDate.getHours(), 10) >= 12) {
                                  suffix = kony.i18n.getLocalizedString("i18n.ess.myLeave.PM");
                                }
                                else {
                                  suffix = kony.i18n.getLocalizedString("i18n.ess.myLeave.AM");
                                }
                                //#ifndef windows8
                                        frmHamburger.lblSyncDate.text = currDay + " " + currMonth + " " + currYear;
                                        frmHamburger.lblSyncTime.text = currTime.substring(0, 5);// + " " + suffix;

                                    //#endif

                                };
                                updateSyncDate();
                                  if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
                                    (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).getTeamData();
                                    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).addCalendarOnLeaveHome();
                                    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).isValidMonthandYearforCalender();
                                    showTabLeaveDashboardForm();
                                    }
                                if (isNewUser) {
                                    kony.apps.coe.ess.KMS.enablePushNotifications();
                                }
                                kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;


                            }, function(err) {
                                kony.print("-----Error in getting employee id----" + err);
                            }, false);

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
                            //As Login is success, Call afterloginSuccess
                            if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                                syncSessionSuccess();
                            }
                            else {
                                // //After Successfull verification of New user, Start Sync Session
                                kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                              	kony.apps.coe.ess.Sync.resetSyncDb(mfresetLocalDBSucess, mfresetLocalDBError);
                              //kony.apps.coe.ess.Sync.startSyncSession(syncSessionSuccess, syncSessionFailure);
                            }
                        };
                      	var mfresetLocalDBSucess = function() {
                         kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                         kony.apps.coe.ess.Sync.doDownload = true;
                         kony.apps.coe.ess.Sync.startSyncSession(syncSessionSuccess, syncSessionFailure);
                         };
                        var mfresetLocalDBError = function(error) {
                         kony.print(JSON.stringify(error));
                        };

                        try {
                            //#ifdef windows8
                            syncAndShowLandingForm();
                            //#else
                            if (isNewUser) {
                                if (kony.apps.coe.ess.TouchID.isTouchAuthenticationSupported()) {
                                    //Show ToucID enable popup only if it's not enabled
                                    if (applaunchMode == 3 || kony.apps.ess.deepLinkingSSO.ssotoken) {
                                        syncAndShowLandingForm();
                                        return;
                                    }
                                    else {
                                        if (kony.store.getItem("useTouchID") === null || kony.store.getItem("useTouchID") === false) {
                                            if (kony.application.getCurrentForm() === frmLogin) {
                                                kony.apps.coe.ess.frmLogin.showEnableTouchIDPopup(syncAndShowLandingForm);
                                                kony.application.dismissLoadingScreen();
                                                return;
                                            }
                                        }
                                    }
                                }
                                syncAndShowLandingForm();
                            }
                            else {
                                //kony.apps.coe.ess.Sync.syncAsynchronously();
                                kony.apps.coe.ess.Sync.syncOnLandingForm = true;
                                syncSessionSuccess();
                            }
                            //#endif
                        }
                        catch (e) { //In android, exceptio may be thrown for touchID functions
                            kony.print("Error occured while using touch_id functions : MFLogin.js : " + JSON.stringify(e));
                        }

                    });
                }, function(err) {
                    //Sync InitFailed
                    kony.sdk.mvvm.log.error("Sync is not initialized");
                    applicationErrorCallback(err);//"Application is not initialized");
                });
            }
            else if (kony.apps.coe.ess.globalVariables.isSPA == true) {
                frmLeaveHome.show();
            }
            else if (kony.apps.coe.ess.globalVariables.isWebDesktop == true) {
                var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveDashboardDW");
                formController.loadDataAndShowForm();
            }


        }
        else {
            //If appInstance is null/undefined, It means app is not initialized properly
            kony.sdk.mvvm.log.error("Application is not initialized");
            applicationErrorCallback(null);
        }
    }
    catch (excp) {
        kony.sdk.mvvm.log.error("Exception Occured in applicationSuccessCallback of LoginAction " + JSON.stringify(excp));
        handleError(excp);
    }
}

function applicationErrorCallback(error) {
    _removeTokenHeaders();
    kony.sdk.mvvm.log.error("failed to load app");
    error = error!==null && error.getRootErrorObj !== undefined && error.getRootErrorObj !== null ? error.getRootErrorObj() : error;
    if (kony.apps.coe.ess.globalVariables.isWebDesktop == true) {
        kony.apps.coe.ess.frmLoginDesk.invalidLoginAction(error);
        return;
    }
    frmLogin.lblLoginErrorMessage.isVisible = true;
    frmLogin.tbUsername.skin = "sknTbWrongCredentials";
    frmLogin.tbPassword.skin = "sknTbWrongCredentials";
    if (error !== null && error !== undefined && error.mfcode !== null && error.mfcode !== undefined && error.mfcode == "Auth-4") {
        error = error.getRootErrorObj();
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.wrongCredentials");
        }
        else {
            frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.offlineLoginFailure");
        }
    }
    else {
        //Clear SSO Cache
        //kony.sdk.resetCacheKeys(kony.sdk.getCurrentInstance());
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

function _removeTokenHeaders(){
  if(kony.sdk.getCurrentInstance() !== undefined && kony.sdk.getCurrentInstance() !== null ){
    // Remove token headers, if present
    kony.sdk.getCurrentInstance().removeGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_sap_spnego_token, "headers");
    kony.sdk.getCurrentInstance().removeGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_sap_access_token, "headers");
    kony.sdk.getCurrentInstance().removeGlobalRequestParam(Constants.AUTHORIZATION_HEADER, "headers");
  }
}


kony.sdk.mvvm.LogoutAction = function() {
  //commenting auto sync timer
  try {
    kony.timer.cancel("serviceDeltaSyncTimer");
  } catch (e) {
    kony.print(e);
  }
  sync.stopSession(function() {
    kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
  });
  options = {};
  options.slo = true;

  if (kony.apps.coe.ess.appconfig.useOkta === true) {
    // Clear login variables
    kony.store.removeItem("username");
    kony.store.removeItem("password");
    kony.store.removeItem("rememberme");
    kony.store.removeItem("oktaToken");
    kony.sdk.util.deleteSSOToken();
    kony.apps.coe.ess.globalVariables.active_login_service = "";

    kony.application.showLoadingScreen("", kony.i18n.getLocalizedString(""), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    // Destroy Okta session
    try {
      if (kony.apps.coe.ess.globalVariables.active_login_service == kony.apps.coe.ess.appconfig.identityServiceOktaRefresh) {
        var loginRefreshService = kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServiceOktaRefresh);
        loginRefreshService.logout(function() {
          kony.print("Logout of okta refresh completed");
        }, function(err) {
          kony.print("Error on logout of okta refresh service: " + JSON.stringify(err));
        }, {});
      }
      if (kony.apps.coe.ess.globalVariables.used_pre_login === true) {
        var loginService = kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServiceOkta);
        loginService.logout(function() {
          kony.print("Logout of okta login completed");
          kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
        }, function(err) {
          kony.print("Error on logout of okta login service: " + JSON.stringify(err));
          kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
        }, {"browserWidget": frmLogin.browserOkta});

      } else {
        kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
      }
    } catch (exception) {
      kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
    }
  } else {
    kony.sdk.mvvm.KonyApplicationContext.logout(sucCallback, errCallback, options);
  }

  function sucCallback() {
    kony.application.dismissLoadingScreen();
    frmLogin.show();
    frmLeaveHome.destroy();
  }

  function errCallback(err) {
    kony.application.dismissLoadingScreen();
    frmLogin.show();
    frmLeaveHome.destroy();
    kony.print(JSON.stringify(err));
  }
};

kony.sdk.mvvm.Logout_DW = function() {
    frmAllHolidaysAndEventsDW.destroy();
    frmApplyLeaveDW.destroy();
    frmCalendarTeamViewDW.destroy();
    frmHamburgerDW.destroy();
    frmHistoryLeaveRequestDW.destroy();
    frmLeaveDashboardDW.destroy();
    frmLeaveWalletDW.destroy();
    frmPendingLeaveRequestsDW.destroy();
    frmLoginDeskDW.destroy();
    frmLoginDeskDW.show();
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj = null;
};

//In case of offline it retains previous configurations and navigates to home screen
function onThemeSettingSuccessCallback(successresp) {
    //navigate to home page
    kony.apps.coe.ess.myLeave.applyLeave.preShow.getManagerName();
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
}

function onThemeSettingErrorCallback(errorresp) {
    kony.print(errorresp);
}

// Override of the OAuth handler
function OAuthHandler(serviceUrl, providerName, appkey, callback, type, options) {
    var logger = new konyLogger();
	var urlType = "/" + type + "/";
    var isSuccess = true;
    var isLogout = false;
    var slo;
    if(options  && typeof (options["logout"]) == "boolean" && options["logout"]) {
        isLogout = true;
    }

    if(!kony.sdk.isNullOrUndefined(options) && (options["slo"] === true || options["slo"] === false)) {
        slo = options["slo"];
    }

	if (typeof(XMLHttpRequest) !== 'undefined') {
		var _window = window;
		var _popup = null;
		var _listener = function (event) {
			var _contents = event.data;
			_popup.close();
			_detachEvent();
			try {
				var headers = {};
				if (type == "oauth2" || type == "saml") {
					headers["Content-Type"] = "application/x-www-form-urlencoded"
				}
				callback(urlType + "token", {
					code: _contents
				}, headers);
			} catch (err) {
				logger.log("exception ::" + err);
				failureCallback();
			}
		};
		var _attachEvent = function () {
			if (_window.addEventListener) {
				_window.addEventListener('message', _listener, false);
			} else if (_window.attachEvent) {
				_window.attachEvent('message', _listener);
			} else {
				throw new Exception(Errors.INIT_FAILURE, "environment doesn't support event attaching");
			}
		};

		var _detachEvent = function () {
			if (_window.detachEvent) {
				_window.detachEvent('message', _listener);
			} else if (_window.removeEventListener) {
				_window.removeEventListener('message', _listener);
			} else {
				throw new Exception(Errors.INIT_FAILURE, "environment doesn't support detaching an event");
			}
		};
		_attachEvent();
        if(isLogout){
            _popup = _window.open(serviceUrl + urlType + "logout?provider=" + providerName + "&appkey=" + appkey + "&slo=" + slo);
        }else{
            _popup = _window.open(serviceUrl + urlType + "login?provider=" + providerName + "&appkey=" + appkey);
        }
	}
	else {
		var browserSF;
		var userDefined = false;
		if(options && options["browserWidget"] && kony.type(options["browserWidget"]) === "kony.ui.Browser"){
			browserSF = options["browserWidget"];
			userDefined = true;
		}else {
			var formBasic = {
				id: "popUp",
				skin: null,
				isModal: false,
				transparencyBehindThePopup: 80,
				"needAppMenu": false
			};
			var formLayout = {
				containerWeight: 100,
				padding: [5, 5, 5, 5],
				"paddingInPixel": true
			};
			var formPSP = {
				"titleBar": true,
				"titleBarConfig": {
					"renderTitleText": true,
					"prevFormTitle": false,
					"titleBarLeftSideView": "button",
					"labelLeftSideView": "Back",
					"titleBarRightSideView": "none"
				},
				"titleBarSkin": "slTitleBar"
			};
			//to do.. this is a workaround for android browser issue.. need to refactor this code
			browserSF = new kony.ui.Browser({
				"id": "browserSF",
				"text": "Browser",
				"isVisible": true,
				"detectTelNumber": true,
				"screenLevelWidget": true,
				"enableZoom": false
			}, {
				"margin": [0, 0, 0, 0],
				"marginInPixel": true,
				"paddingInPixel": true,
				"containerWeight": 100
			}, {});

			var prevForm = kony.application.getCurrentForm();
			var oauthForm = new kony.ui.Form2(formBasic, formLayout, formPSP);
			oauthForm.add(browserSF);
			oauthForm.show();
		}
		var urlConf;
		var headersConf = {};
        if(!kony.sdk.isNullOrUndefined(konyRef.currentClaimToken)){
            headersConf[Constants.APP_AUTHORIZATION_HEADER] = konyRef.currentClaimToken;
        }
        konyRef.appendGlobalHeaders(headersConf);
		if (isLogout) {
			browserSF.onSuccess = handleOAuthLogoutSuccessCallback;
			browserSF.onFailure = handleOAuthLogoutFailureCallback;
			urlConf = {
				URL: serviceUrl + urlType + "logout?provider=" + providerName + "&appkey=" + appkey + "&slo=" + slo,
				requestMethod: constants.BROWSER_REQUEST_METHOD_GET
			};
			if(Object.keys(headersConf).length > 0){
			    urlConf["headers"] = headersConf;
            }
			browserSF.requestURLConfig = urlConf;

      kony.timer.schedule("oauth2callbacklogouttimer", function () {
        return function () {
          callback(true);
        }
      }(), 2, false);

    } else {
            //#ifdef android
            browserSF.onPageStarted = handleRequestCallback;
            //#else
            browserSF.handleRequest = handleRequestCallback;
            //#endif
			urlConf = {
				URL: serviceUrl + urlType + "login?provider=" + providerName + "&appkey=" + appkey,
				requestMethod: constants.BROWSER_REQUEST_METHOD_GET
			};
            if(Object.keys(headersConf).length > 0){
                urlConf["headers"] = headersConf;
            }
			browserSF.requestURLConfig = urlConf;
		}

		function handleOAuthLogoutSuccessCallback(){
			if(!userDefined) {
				var prevFormPostShow = prevForm.postShow;
				function postShowOverride() {
					oauthForm.destroy();
					if (prevFormPostShow) {
						prevFormPostShow();
					}
					prevForm.postShow = prevFormPostShow;
				}

				prevForm.postShow = postShowOverride;
				prevForm.show();
			}
			callback(isSuccess);
		}

		function handleOAuthLogoutFailureCallback(){
			isSuccess = false;
		}

		function displayPrevForm(){
			var prevFormPostShow = prevForm.postShow;
			function postShowOverride() {
				oauthForm.destroy();
				if (prevFormPostShow) {
					prevFormPostShow();
				}
				prevForm.postShow = prevFormPostShow;
			}
			prevForm.postShow = postShowOverride;
			prevForm.show();
		}

		function handleRequestCallback(browserWidget, params) {

			var originalUrl = params["originalURL"];
			if (typeof(params.queryParams) !== "undefined" && typeof(params.queryParams.code) !== "undefined") {
				if(!userDefined) {
					displayPrevForm();
				}
				var headers = {};
				if (type == "oauth2" || type == "saml") {
					headers["Content-Type"] = "application/x-www-form-urlencoded"
				}
				// make request for tokens
				kony.timer.schedule("oauth2callbacktimer", function (url, callback, code, headers) {
					return function () {
						callback(url, {code: code}, headers);
					}
				}(urlType + "token", callback, decodeURIComponent(params.queryParams.code), headers), 1, false);
			} else if(typeof(params.queryParams) !== "undefined" && typeof(params.queryParams.error) !== "undefined"){
				if(!userDefined) {
					displayPrevForm();
				}
				callback(urlType + "token", {"error": params.queryParams.error}, headers, true);
			}
			return false;
		}
	}

}
