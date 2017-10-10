/*** @Author Sumeet.bartha
   +      Modified By Malikarjuna
   * @category Business Logic / Action
   * @desc  Login class
   * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.frmLogin = kony.apps.coe.ess.frmLogin || {};
kony.apps.coe.ess.frmLoginDesk = kony.apps.coe.ess.frmLoginDesk || {};
// %Region - Methods in frmLogin
/**
 * @member of  frmLogin
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.frmLogin.username = "";
kony.apps.coe.ess.frmLogin.password = "";
kony.apps.coe.ess.frmLoginDesk.username = "";
kony.apps.coe.ess.frmLoginDesk.password = "";
//syncUse is used to indicate current sync state
var syncUse = false;
// %Region - Methods in frmLogin
/**
 * @member of  frmLogin
 * @return {void} - none.
 * @Desc - handle the validation of username and password.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.frmLogin.isValidInputs =
  function(username, password) {
  kony.print("-- start kony.apps.coe.ess.isValidInputs-- ");
  if (!(kony.apps.coe.ess.Validation.checkForNull(username) && kony.apps.coe.ess.Validation.checkForNull(password))) {
    return false;
  } else {
    return true;
  }
  kony.print("-- End kony.apps.coe.ess.isValidInputs-- ");
};
// %Region - Methods in frmLogin
/**
 * @member of  frmLogin
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
 kony.apps.coe.ess.frmLogin._errorCallback =
   function(error) {
     // Remove token headers, if present
     kony.sdk.getCurrentInstance().removeGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_token_header1, "headers");
     kony.sdk.getCurrentInstance().removeGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_token_header2, "headers");

     handleError(error);
   };

 /**
  * Invokes the service in MF to get the Axway access token plus session user and
  * security attributes
  */
 kony.apps.coe.ess.frmLogin._axwayAuth = function() {
   try {
     kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.Authenticating"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});

     var params = {
       "provider": kony.apps.coe.ess.appconfig.identityServicePreLogin
     };
     var axwayAuthService = kony.sdk.getCurrentInstance().getIntegrationService(kony.apps.coe.ess.appconfig.axwayAuthService);
     axwayAuthService.invokeOperation("login", {}, params, function(response) {
       // Use username obtained from pre login session details
       frmLogin.tbUsername.text = response.preferred_username;
       frmLogin.tbPassword.text = response.preferred_username;
       // Add headers to be sent with next login request
       kony.sdk.getCurrentInstance().setGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_token_header1, response.security_attributes_api.access_token_api, "headers");
       kony.sdk.getCurrentInstance().setGlobalRequestParam(kony.apps.coe.ess.globalVariables.login_token_header2, response.security_attributes_api.access_token_api, "headers");

       kony.application.dismissLoadingScreen();

       // Login on backend
       kony.apps.coe.ess.frmLogin._backendLogin();
     }, kony.apps.coe.ess.frmLogin._errorCallback);
   } catch (exception) {
     kony.apps.coe.ess.frmLogin._errorCallback(exception);
   }
 };

 /**
  * Performs the login on the SAP backend
  *
  * @param data JSON object with session attributes and axway token
  */
 kony.apps.coe.ess.frmLogin._backendLogin = function() {
   try {
     kony.print("-- start kony.apps.coe.ess.frmLogin.btnLoginOnclick -- ");
     //  kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.Authenticating"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
     //If wrong credentials are given previously, reset skins
     if (frmLogin.lblLoginErrorMessage.isVisible === true) {
       //We are checking above condition to avoid setting skins everytime.
       //Error message is visible only if wrong credentials entered previously
       frmLogin.lblLoginErrorMessage.isVisible = false; //Hide wrong message lable
       frmLogin.tbUsername.skin = "sknTbBgFFFBorE7EAECFc55555535Px"; //Change skin
       frmLogin.tbPassword.skin = "sknTbBgFFFBorE7EAECFc55555535Px"; //Change skin
     }

     var username = frmLogin.tbUsername.text;
     var password = frmLogin.tbPassword.text;

     if (kony.apps.coe.ess.frmLogin.isValidInputs(username, password)) {
       kony.apps.coe.ess.frmLogin.username = username.trim();
       kony.apps.coe.ess.frmLogin.password = password;
       //#ifdef windows8
       frmLogin.flxLogin.onClick = function() {};
       //#else
       frmLogin.btnLogin.onClick = function() {};
       //#endif
       kony.sdk.mvvm.LoginAction("");
     } else {
       frmLogin.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.validateCredentials");
       frmLogin.lblLoginErrorMessage.isVisible = true;
       kony.application.dismissLoadingScreen();
     }
     kony.print("-- End  kony.apps.coe.ess.frmLogin.btnLoginOnclick -- ");
   } catch (e) {
     kony.apps.coe.ess.frmLogin._errorCallback(e);
   }
 };

 kony.apps.coe.ess.frmLogin.btnLoginOnclick = function() {
   if (kony.apps.coe.ess.appconfig.useOkta) {
     // Do pre-login
     try {
       new kony.sdk().init(kony.apps.coe.ess.appconfig.appkey,kony.apps.coe.ess.appconfig.appsecret,kony.apps.coe.ess.appconfig.serviceurl, function(){
         var preLoginService = kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServicePreLogin);
         preLoginService.login({"browserWidget":frmLogin.browserOkta}, kony.apps.coe.ess.frmLogin._axwayAuth, kony.apps.coe.ess.frmLogin._errorCallback);
       }, kony.apps.coe.ess.frmLogin._errorCallback);
     } catch (exception) {
       kony.apps.coe.ess.frmLogin._errorCallback(exception);
     }
   } else {
     kony.apps.coe.ess.frmLogin._backendLogin();
   }
 };

// %Region - Methods in frmLogin
/**
 * @member of  frmLogin
 * @return {void} - none.
 * @Desc - method is called after sync is done.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.frmLogin.afterloginSuccess =
  function() {
  if (kony.apps.coe.ess.globalVariables.isWebDesktop === true) {
    var isRememberMeChecked = (frmLoginDesk.imgRememberMe.src === 'checkactive_dw.png') ? (true) : (false);
    if (isRememberMeChecked) {
      kony.store.setItem("rememberme", true);
      var securityObj = new kony.apps.coe.ess.syncFunctions();
      var username = securityObj.encryptDataDW(kony.apps.coe.ess.frmLoginDesk.username);
      kony.store.setItem("username", username);
      var password = securityObj.encryptDataDW(kony.apps.coe.ess.frmLoginDesk.password);
      kony.store.setItem("password", password);
    } else {
      kony.store.setItem("rememberme", false);
    }

  }else{
    kony.print("-- start kony.apps.coe.ess.frmLogin.afterloginSuccess -- ");
    try {
      try {
        var metricsData = [{
          "UserName": kony.apps.coe.ess.frmLogin.username
        }];
        KNYMetricsService.sendCustomMetrics("currentUser", metricsData);
      } catch (m) {
        // Ignore error of metrics, we don't want to show alert to user for this.
        kony.print("ERROR: Unable to send metrics :" + m.message);
      }
      kony.application.dismissLoadingScreen();
      var securityObj = new kony.apps.coe.ess.syncFunctions();
      //securityObj.checkConnectivity();
      //kony.apps.coe.ess.frmLogin.setSyncState(false);
      var username = securityObj.encryptData(kony.apps.coe.ess.frmLogin.username);
      kony.store.setItem("username", username);
      var isRememberMeChecked = (frmLogin.imgRememberMe.src === 'on.png') ? (true) : (false);
      if (isRememberMeChecked || kony.apps.ess.deepLinkingSSO.isRememberMeEnabled) {
        kony.store.setItem("rememberme", true);
        var password = securityObj.encryptData(kony.apps.coe.ess.frmLogin.password);
        kony.store.setItem("password", password);
      } else {
        kony.store.setItem("rememberme", false);
        kony.store.setItem("useTouchID", false);
      }
      kony.print("-- End  kony.apps.coe.ess.afterloginSuccess --");
    } catch (e) {
      handleError(e);
    }

  }
};
// %Region - Methods in frmLogin
/**
 * @member of  frmLogin
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.frmLogin.Init =
  function() {
  kony.print("-- start kony.apps.coe.ess.frmLogin.Init-- ");
  try {
    if (kony.store.getItem("useTouchID") === true) { //If User Enabled TouchID for App
      if (kony.apps.coe.ess.QRCode.isReconfiguredClicked == true || applaunchMode == 3 || kony.apps.ess.deepLinkingSSO.ssotoken) {
        frmLogin.flxTouchIDPopup.isVisible = false;
      } else {
        kony.apps.coe.ess.TouchID.authenticateThroughTouch();
      }
    }
  } catch (e) {
    handleError(e);
  }
  kony.print("-- End kony.apps.coe.ess.frmLogin.Init-- ");
};
// %Region - Methods in frmLogin
/**
 * @member of  frmLogin
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.frmLogin.frmLoginPreshow =
  function() {
  kony.print("-- start kony.apps.coe.ess.frmLogin.frmLoginPreshow -- ");
  if(kony.apps.coe.ess.globalVariables.isNativeTablet === false && kony.apps.coe.ess.globalVariables.isWebDesktop === false){
    if(kony.apps.coe.ess.appconfig.isDemo === true){
      //frmLogin.flxReconfigure.isVisible = true;
    }
    else{
      //frmLogin.flxReconfigure.isVisible = false;
    }
  }
  if (kony.apps.coe.ess.globalVariables.isWebDesktop === true) {
    if (kony.store.getItem("rememberme") === true) {
      if(kony.store.getItem("username")!==null && kony.store.getItem("password")!==null){
        var securityObj = new kony.apps.coe.ess.syncFunctions();
        var username = securityObj.decryptDataDW(kony.store.getItem("username"));
        var password = securityObj.decryptDataDW(kony.store.getItem("password"));
        frmLoginDesk.imgRememberMe.src = "checkactive_dw.png";
        frmLoginDesk.tbUsername.text = username;
        frmLoginDesk.tbPassword.text = password;
      }
    } else {
      frmLoginDesk.imgRememberMe.src = "uncheck.png";
      frmLoginDesk.tbUsername.text = "";
      frmLoginDesk.tbPassword.text = "";
    }
    frmLoginDesk.imgLogin.onTouchStart = this.btnLoginOnclick.bind(this);
    return;
  }
  var securityObj = new kony.apps.coe.ess.syncFunctions();
  //#ifndef windows8
  if (kony.apps.coe.ess.QRCode.navigatingThroughQRCode === true) {
    frmLogin.imgRememberMe.src = "on.png";
    frmLogin.tbUsername.text = kony.apps.coe.ess.frmLogin.username;
    frmLogin.tbPassword.text = kony.apps.coe.ess.frmLogin.password;
  } else {
    if (kony.store.getItem("rememberme") === true) {
      var username = securityObj.decryptData(kony.store.getItem("username"));
      var password = securityObj.decryptData(kony.store.getItem("password"));
      frmLogin.imgRememberMe.src = "on.png";
      frmLogin.tbUsername.text = username;
      frmLogin.tbPassword.text = password;
    } else {
      frmLogin.imgRememberMe.src = "off.png";
      frmLogin.tbUsername.text = "";
      frmLogin.tbPassword.text = "";
      //     kony.store.setItem("rememberme", false);
    }
  }
  //#else
  if (kony.store.getItem("rememberme") === true) {
    var username = securityObj.decryptData(kony.store.getItem("username"));
    var password = securityObj.decryptData(kony.store.getItem("password"));
    frmLogin.imgRememberMe.src = "on.png";
    frmLogin.tbUsername.text = username;
    frmLogin.tbPassword.text = password;
  } else {
    frmLogin.imgRememberMe.src = "off.png";
    frmLogin.tbUsername.text = "";
    frmLogin.tbPassword.text = "";
    kony.store.setItem("rememberme", false);
  }
  //#endif
  frmLogin.lblLoginErrorMessage.isVisible = false;



  //#ifdef windows8
  frmLogin.flxLogin.onClick = this.btnLoginOnclick.bind(this);
  frmLogin.flxRemMe.onClick = function() {
    frmLogin.imgRememberMe.src = (frmLogin.imgRememberMe.src === "on.png") ? ("off.png") : ("on.png");
  }
  //#else
  frmLogin.btnLogin.onClick = this.btnLoginOnclick.bind(this);
  frmLogin.btnRememberMe.onClick = function() {
    frmLogin.imgRememberMe.src = (frmLogin.imgRememberMe.src === "on.png") ? ("off.png") : ("on.png");
    if (frmLogin.imgRememberMe.src === "off.png")
      kony.apps.ess.deepLinkingSSO.isRememberMeEnabled = false;
  };
  //#endif
  if (kony.apps.coe.ess.globalVariables.isSPA) //--added for spa--
  {
    return;
  }

  try {
    //#ifndef windows8
    //ToDo. Show TouchID buttons if it is supported
    if (kony.apps.coe.ess.TouchID.isTouchAuthenticationSupported()) {
      //Show TouchID Message & Icon
      frmLogin.flxTouchIDText.isVisible = true;
      frmLogin.imgTouchId.isVisible = true;
      frmLogin.imgTouchId.onTouchEnd = kony.apps.coe.ess.TouchID.authenticateThroughTouch;
      //#ifdef ipad
      frmLogin.imgOR.isVisible = true;
      frmLogin.flxLoginLeft.isVisible = true;
      frmLogin.flxBottomKonyLogo.isVisible = false;
      frmLogin.flxLoginRight.left = "0%";
      frmLogin.flxMain.skin = "sknTabFlxLognBg";
      //#endif
      //#ifdef tabrcandroid
      frmLogin.imgOR.isVisible = true;
      frmLogin.flxLoginLeft.isVisible = true;
      frmLogin.flxBottomKonyLogo.isVisible = false;
      frmLogin.flxLoginRight.left = "0%";
      frmLogin.flxMain.skin = "sknTabFlxLognBg";
      //#endif
    } else {

      //Hide TouchID Message & Icon
      frmLogin.flxTouchIDText.isVisible = false;
      frmLogin.imgTouchId.isVisible = false;
      //#ifdef ipad
      frmLogin.imgOR.isVisible = false;
      frmLogin.flxLoginLeft.isVisible = false;
      frmLogin.flxBottomKonyLogo.isVisible = true;
      frmLogin.flxLoginRight.left = "30%";
      frmLogin.flxMain.skin = "sknTabFlxLognBgWhite";
      //#endif
      //#ifdef tabrcandroid
      frmLogin.imgOR.isVisible = false;
      frmLogin.flxLoginLeft.isVisible = false;
      frmLogin.flxBottomKonyLogo.isVisible = true;
      frmLogin.flxLoginRight.left = "30%";
      frmLogin.flxMain.skin = "sknTabFlxLognBgWhite";
      //#endif
    }
    //#endif
    if (kony.apps.coe.ess.QRCode.navigatingThroughQRCode === true) {
      frmLogin.btnLogin.onClick = function() {};
    }
  } catch (e) { //In Android, Some exception may be thrown
    //Hide TouchID Message & Icon
    kony.apps.coe.ess.QRCode.navigatingThroughQRCode = false;
    frmLogin.btnLogin.onClick = function() {
      kony.apps.coe.ess.frmLogin.btnLoginOnclick();
    };
    frmLogin.flxTouchIDText.isVisible = false;
    frmLogin.imgTouchId.isVisible = false;
  }

  if (kony.apps.coe.ess.appconfig.useOkta) {
    frmLogin.flxFields.isVisible = false;
    frmLogin.flxRememberMe.isVisible = false;
    frmLogin.flxSignIn.isVisible = false;
    frmLogin.flxSignIn.top = "20%";
    frmLogin.flxBottom.top = "60%";
  } else {
    frmLogin.flxBrowserContainer.isVisible = false;
  }
  //ToDo : FInd appropriate place to InitializeSync

  kony.print("-- End kony.apps.coe.ess.frmLogin.frmLoginPreshow -- ");
};

kony.apps.coe.ess.frmLogin.confirmedLogout = function(response) {
  kony.print("-- start kony.apps.coe.ess.frmLogin.confirmedLogout -- ");

};
// %Region - Methods in frmLogin
/**
 * @member of  frmLogin
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.frmLogin.onLogout = function() {
  kony.print("-- start kony.apps.coe.ess.frmLogin.onLogout -- ");
  var alert = kony.ui.Alert({
    "message": "",
    "alertType": constants.ALERT_TYPE_CONFIRMATION,
    "alertTitle": "Are you sure you want to logout ?",
    "yesLabel": "Yes",
    "noLabel": "No",
    "alertIcon": "",
    "alertHandler": this.confirmedLogout
  }, {});
  kony.print("-- End kony.apps.coe.ess.frmLogin.onLogout -- ");
};

kony.apps.coe.ess.frmLogin.disableBackbutton = function() {
  return;
};

/**
 * Checks if new user is trying to login in same device. If true, Database related to old user is erased
 * @param {fn} $callback()
 *		Callback after performing new user check
 */
kony.apps.coe.ess.frmLogin.resetDbIncaseOfNewUser = function(callback) {
  try {
    if (kony.apps.coe.ess.QRCode.navigatingThroughQRCode == true) {
      callback(true);
      kony.store.setItem("useTouchID", false);
    }
    //Read Previous Logged in Username
    else {
      var securityObj = new kony.apps.coe.ess.syncFunctions();
      var storedUsername = kony.store.getItem("username");
      if (storedUsername === null) {
        //Whihc means, No user logged-in before after app is installed. Hence, Current user becomes new user
        callback(true);
        return;
      }
      var previousUsername = securityObj.decryptData(storedUsername);
      //Check if Currenlty Authenticated & Previously Logged In user are same
      if (previousUsername === kony.apps.coe.ess.frmLogin.username) {
        //If same, Reset is Not Needed. Send false in callback as user is not new
        callback(false);
      } else {
        //If not same, Means New User is trying to Logging in. Disabl TouchID
        if (kony.apps.ess.deepLinkingSSO.isTouchIdEnabled != true) {
          kony.store.setItem("useTouchID", false);
        }
        //Reset Database & Call the callback on success with "true" as parameter to callback
        kony.apps.coe.ess.Sync.resetSyncDb(function() {
          //On Sync reset Success
          //pass true as parameter - as user is new
          callback(true);
        }, function() {
          //On Sync reset fail
          // some internal error occured & couldn't able to remove old user information. Still user is new. So pass "true" as parameter.
          callback(true);
        });
      }

    }
  } catch (e) {
    kony.print("Exception in resetDbIncaseOfNewUser :: " + JSON.stringify(e));
  }
};
/**
 * Show Enable TouchID Popup
 */
kony.apps.coe.ess.frmLogin.showEnableTouchIDPopup = function(callback) {
  if (kony.apps.coe.ess.globalVariables.isNative) {
    //#ifdef iphone
    frmLogin.lblEnableTouchIdDescription.text = kony.i18n.getLocalizedString('i18n.ess.Login.enableTouchIDDescription');
    frmLogin.lblEnableTouchIdTitle.text = kony.i18n.getLocalizedString('i18n.ess.Login.useTouchId');
    //#endif
    //#ifdef android
    frmLogin.lblEnableTouchIdDescription.text = kony.i18n.getLocalizedString('i18n.ess.Login.enableTouchIDDescription_android');
    frmLogin.lblEnableTouchIdTitle.text = kony.i18n.getLocalizedString('i18n.ess.Login.useTouchId_android');
    //#endif
  }
  frmLogin.flxPopups.isVisible = true;
  frmLogin.flxEnableTouchIDPopup.isVisible = true;
  frmLogin.btnNotNow.onClick = function() {
    kony.store.setItem("useTouchID", false);
    kony.apps.coe.ess.frmLogin.hidePopups();
    if (callback)
      callback();
  };
  frmLogin.btnEnable.onClick = function() {
    kony.store.setItem("useTouchID", true);
    kony.apps.coe.ess.frmLogin.hidePopups();
    var username = kony.apps.coe.ess.frmLogin.username;
    var password = kony.apps.coe.ess.frmLogin.password;
    var isValid = kony.apps.coe.ess.frmLogin.isValidInputs(
      username,
      password
    );
    // Auto select RememberMe
    frmLogin.imgRememberMe.src = "on.png";
    if (isValid) { //This will be the case when User Enables TouchID after successful authentication.
      var securityObj = new kony.apps.coe.ess.syncFunctions();
      kony.store.setItem("username", securityObj.encryptData(username));
      kony.store.setItem("password", securityObj.encryptData(password));
    } else { //This is the case when user try to enable TouchID before authenticating
      frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.registerUserForTouchId");
      kony.apps.coe.ess.frmLogin.showTouchIdPopup(kony.i18n.getLocalizedString("i18n.ess.Login.loginNow"));
      //In this case, We have to show user Popup with Message
      return;
    }
    //Call the callback if provided
    if (callback)
      callback();
  };
};
/**
 * Hides popup on Login screen
 */
kony.apps.coe.ess.frmLogin.hidePopups = function() {
  frmLogin.flxPopups.isVisible = false;
  frmLogin.flxEnableTouchIDPopup.isVisible = false;
  frmLogin.flxTouchIDPopup.isVisible = false;
};
/**
 * Shows TouchID Custom Design Popup
 */
kony.apps.coe.ess.frmLogin.showTouchIdPopup = function(okButtonText) {
  frmLogin.flxPopups.isVisible = true;
  frmLogin.flxTouchIDPopup.isVisible = true;
  frmLogin.btnTouchIDCancel.onClick = kony.apps.coe.ess.frmLogin.hidePopups;
  if (okButtonText) {
    frmLogin.btnTouchIDCancel.text = okButtonText;
  } else {
    frmLogin.btnTouchIDCancel.text = kony.i18n.getLocalizedString("i18n.ess.Login.Cancel");
  }
};

/**
 * @function manualSyncOnClick
 * @return {void} - none.
 * @Desc - function is used to sync manually
 * @throws Exception if something goes wrong,
 */

kony.apps.coe.ess.frmLogin.manualSyncOnClick = function(successCall, errorCall) {
  kony.print("--Start manualSyncOnClick--");
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    var syncSuccess = function(successCallback, res) {
      //Generally, background sync will do nothing after successful sync. In any special cases, You can specify actions to be performed after sync success in background
      var updateSyncDate = function() {
        kony.apps.coe.ess.globalVariables.lastSyncDate=new Date();
//         var months = [
//           "Jan", "Feb", "Mar",
//           "Apr", "May", "Jun", "Jul",
//           "Aug", "Sep", "Oct",
//           "Nov", "Dec"
//         ];

//         var currDate = new Date();
//         var currDay = currDate.getDate();
//         var currMonth =currDate.getMonthNameShort(kony.store.getItem("localeToBeSet"));// months[currDate.getMonth()];
//         var currYear = currDate.getFullYear();
//         var currTime = currDate.toHHMMSS(":");
//         var suffix;
//         if (parseInt(currDate.getHours()) >= 12) {
//           suffix = "PM";
//         } else {
//           suffix = "AM";
//         }
//         //bbe-101 menu sync
//         kony.apps.coe.ess.globalVariables.lastSyncDate=currDay + " " + currMonth + " " + currYear;
// 		kony.apps.coe.ess.globalVariables.lastSyncTime= currTime.substring(0, 5) + " "; //+ suffix;
        if (kony.application.getCurrentForm().lblSyncDate !== null || kony.application.getCurrentForm().lblSyncTime !== null) {
          kony.application.getCurrentForm().lblSyncDate.text =formatDate(kony.apps.coe.ess.globalVariables.lastSyncDate);
          kony.application.getCurrentForm().lblSyncTime.text = formatTime(kony.apps.coe.ess.globalVariables.lastSyncDate);
        }
      }
      updateSyncDate();
      successCallback();
      kony.application.dismissLoadingScreen();
    };
    var successcallback = function() {};
    if (successCall) { //If Successcall is provided, It will be executed immediately
      successcallback = successCall;
    }
    var errorcallback = function() {};
    if (errorCall) {
      errorcallback = errorCall;
    }
    kony.apps.coe.ess.Sync.startSyncSession(syncSuccess.bind(this, successcallback, errorcallback), function() {
      //Sync Session Failed
      kony.application.dismissLoadingScreen();
    });
  } else {
    // If there is no internet connections, What are the actions to be done ?
    kony.apps.coe.ess.frmLogin.offlinePopup();
    kony.application.dismissLoadingScreen();
  }
  kony.print("--End manualSyncOnClick--");
};



kony.apps.coe.ess.frmLogin.getSyncState = function() {
  return syncUse;
};

/**
 * Called when Session/Token expires in backend. It will ask user to re-login
 */
kony.apps.coe.ess.frmLogin.handleSessionExpairyError = function() {
  try {
    kony.print("kony.apps.coe.ess.frmLogin.handleSessionExpairyError - Start");
    var alertUI = kony.ui.Alert({
      "message": kony.i18n.getLocalizedString("i18n.ess.Login.sessionInvalidateErrorMessage"),
      "alertType": constants.ALERT_TYPE_ERROR,
      "alertTitle": kony.i18n.getLocalizedString("i18n.ess.Login.sessionInvalidateErrorTitle"),
      "yesLabel": kony.i18n.getLocalizedString("i18n.ess.Login.loginNow"),
      "alertHandler": function() {
        kony.print("kony.apps.coe.ess.frmLogin.handleSessionExpairyError - Aert Handler Executed.");
        kony.sdk.mvvm.LogoutAction();
      }
    }, {});
    kony.print("kony.apps.coe.ess.frmLogin.handleSessionExpairyError - End");
  } catch (e) {
    kony.sdk.mvvm.LogoutAction();
    kony.print("Exception occured : kony.apps.coe.ess.frmLogin.handleSessionExpairyError : " + JSON.stringify(e));
  }
};

/**
 * @function offlinePopup
 * @return {void} - none.
 * @Desc - function to display popup
 */
kony.apps.coe.ess.frmLogin.offlinePopup = function() {
  kony.print("-- current form:" + kony.application.getCurrentForm().id + " --");
  kony.print("-- value " + kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress + " --");
  if (kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress == true) {
    // Disable clicking on Hamburger menu items.
    kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(false);
    // Show offline alert
    popupOfflineAlert.show();
    kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible = true;
  } else {
    popupOfflineAlert.show();
    kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible = true;
  }
};

/**
 * @function getUserDetails
 * @return {void} - none.
 * @Desc - return the UserName.
 */
kony.apps.coe.ess.frmLogin.getUserDetails = function() {
  kony.print("kony.apps.coe.ess.frmLogin.getUserDetails - Start");
  kony.sdk.getCurrentInstance().getIdentityService(kony.apps.coe.ess.appconfig.identityServiceName).getProfile(true, this.userDetailsSucess, this.userDetailsError);
  kony.print("kony.apps.coe.ess.frmLogin.getUserDetails - End");
};
/**
 * @function userDetailsSucess
 * @return {void} - none.
 * @Desc - function to be executed on sucess of getProfile Method.
 */
kony.apps.coe.ess.frmLogin.userDetailsSucess = function(response) {
  kony.print("-- Start kony.apps.coe.ess.frmLogin.userDetailsSucess  --");
  kony.apps.coe.ess.frmLogin.username = response.userid;
  kony.print("-- End kony.apps.coe.ess.frmLogin.userDetailsSucess  --");
};
/**
 * @function userDetailsSucess
 * @return {void} - none.
 * @Desc - function to be executed on Error of getProfile Method.
 */
kony.apps.coe.ess.frmLogin.userDetailsError = function(err) {
  kony.print("-- Start kony.apps.coe.ess.frmLogin.userDetailsError  --");
  kony.print(JSON.stringify(err));
  kony.print("-- End kony.apps.coe.ess.frmLogin.userDetailsError --");
};

kony.apps.coe.ess.frmLogin.seti18nText = function(){
  frmLogin.tbUsername.placeholder=kony.i18n.getLocalizedString("i18n.ess.Login.username");
  frmLogin.tbPassword.placeholder=kony.i18n.getLocalizedString("i18n.ess.Login.password");
  frmLogin.lblReconfigure.text=kony.i18n.getLocalizedString("i18n.ess.MyApprovals.frmIsLaterSearch.lblReconfigure");
  frmLogin.lblRememberMe.text=kony.i18n.getLocalizedString("i18n.ess.Login.rememberMe");
  frmLogin.btnLogin.text=kony.i18n.getLocalizedString("i18n.ess.Login.signin");
  frmLogin.lblTouchIdText.text=kony.i18n.getLocalizedString("i18n.ess.Login.loginWithTouchId");
};
