/**
 *  @author     Mehak Luthra
 *  @category   UX/UI
 *  @desc       frmLoginDesk UI
 *  @ © 2016    Kony Inc
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.frmLoginDesk = kony.apps.coe.ess.frmLoginDesk || {};

/**
 * @class          frmLoginDesk
 * @type           Prototype
 * @description    Validates Login details
 */
kony.apps.coe.ess.frmLoginDesk.validateLoginDetails =function() {
    kony.apps.coe.ess.frmLoginDesk.closeInvalidLoginAction();
    var username = frmLoginDeskDW.tbUsername.text;
    var password = frmLoginDeskDW.tbPassword.text;
    if (kony.apps.coe.ess.frmLogin.isValidInputs(username, password)) {
        kony.apps.coe.ess.frmLogin.username = username.trim();
        kony.apps.coe.ess.frmLogin.password = password;
        frmLoginDeskDW.flxLogin.onClick = function() {};
    }
    if(frmLoginDeskDW.imgRememberMe.src === "checkbox.png"){
        var secObj = new kony.apps.coe.ess.syncFunctions();
        var encryptedUser = secObj.encryptDataDW(kony.apps.coe.ess.frmLogin.username);
        var encryptedPass = secObj.encryptDataDW(kony.apps.coe.ess.frmLogin.password);
        kony.store.setItem("rememberMe", true);
        kony.store.setItem("username", encryptedUser);
        kony.store.setItem("password", encryptedPass);
    }else{
        kony.store.setItem("rememberMe", false);
    }
    initMbaasApp(kony.sdk.mvvm.LoginAction);
};


/**
 * @class          frmLoginDesk
 * @type           Prototype
 * @description    Resets Login Screen Layout
 */

kony.apps.coe.ess.frmLoginDesk.resetLoginScreen =
    function() {
  if(frmLoginDeskDW.flxLoginMain.height!=="500px")
  {
    frmLoginDeskDW.flxLoginMain.height="500px";
    frmLoginDeskDW.imgBackGround.src="headerbackground.png";
      frmLoginDeskDW.flxErrorSpace.setVisibility(false);
      frmLoginDeskDW.forceLayout();
  }
};

/**
 * @class          frmLoginDesk
 * @type           Method
 * @description    Shows invalid Login on login form
 */
kony.apps.coe.ess.frmLoginDesk.invalidLoginAction = function(error){
    if (error.mfcode == "Auth-4") {
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            frmLoginDeskDW.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.wrongCredentials");
        } else {
            frmLoginDeskDW.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.offlineLoginFailure");
        }
    } else {
        if (kony.sdk.isSessionOrTokenExpired(error.mfcode)) {
            frmLoginDeskDW.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.sessionExpiredError");
        } else {
            frmLoginDeskDW.lblLoginErrorMessage.text = kony.i18n.getLocalizedString("i18n.ess.Login.unknownError");
        }
    }
    frmLoginDeskDW.imgBackGround.src="backgroundreconfig.png";
    frmLoginDeskDW.flxLoginMain.height="600px";
    frmLoginDeskDW.flxErrorSpace.setVisibility(true);
    frmLoginDeskDW.flxLogin.onClick =  function() {
          kony.apps.coe.ess.frmLoginDesk.validateLoginDetails();
    };
    frmLoginDeskDW.forceLayout(); 
}

/**
 * @class          frmLoginDesk
 * @type           Method
 * @description    Closes login error flex
 */
kony.apps.coe.ess.frmLoginDesk.closeInvalidLoginAction = function(){
    frmLoginDeskDW.flxLoginMain.height="500px";
    frmLoginDeskDW.flxErrorSpace.setVisibility(false);
    frmLoginDeskDW.forceLayout(); 
}

/**
 * @class          frmLoginDesk
 * @type           Prototype
 * @description    Activates remember Me
 */
kony.apps.coe.ess.frmLoginDesk.rememberMeOn =function() {
    frmLoginDeskDW.imgRememberMe.src = "checkbox.png";
    frmLoginDeskDW.flxRemMe.onClick = kony.apps.coe.ess.frmLoginDesk.rememberMeOff;
}

/**
 * @class          frmLoginDesk
 * @type           Prototype
 * @description    Deactivates remember Me
 */
kony.apps.coe.ess.frmLoginDesk.rememberMeOff =function() {
    frmLoginDeskDW.imgRememberMe.src = "uncheckbox.png";
    frmLoginDeskDW.flxRemMe.onClick = kony.apps.coe.ess.frmLoginDesk.rememberMeOn;
}


/**
 * @class          frmLoginDesk
 * @type           Prototype
 * @description    frmLoginDW preshow
 */
kony.apps.coe.ess.frmLoginDesk.frmLoginPreShow = function(){
    if(kony.store.getItem("rememberMe") === true){
        var secObj = new kony.apps.coe.ess.syncFunctions();
        var decryptedUser = secObj.decryptDataDW(kony.store.getItem("username"));
        var decryptedPass = secObj.decryptDataDW(kony.store.getItem("password"));
        frmLoginDeskDW.tbUsername.text = decryptedUser;
        frmLoginDeskDW.tbPassword.text = decryptedPass;
        frmLoginDeskDW.imgRememberMe.src = "checkbox.png"
    }
    if(kony.apps.coe.ess.appconfig.isDemo === true){
        // frmLoginDeskDW.flxReconfig.isVisible = true;
    }
    else{
        frmLoginDeskDW.flxReconfig.isVisible = false;
    }
}

/**
 * @class          frmLoginDesk
 * @type           Prototype
 * @description    onClick Reconfig
 */
kony.apps.coe.ess.frmLoginDesk.showReconfigFlex = function(){
    frmLoginDeskDW.flxReconfigure.setVisibility(true);
    frmLoginDeskDW.flxLoginMain.setVisibility(false);
    frmLoginDeskDW.forceLayout();
}

/**
 * @class          frmLoginDesk
 * @type           Prototype
 * @description    accept Reconfig params
 */
kony.apps.coe.ess.frmLoginDesk.acceptReconfig = function(){
    kony.apps.coe.ess.appconfig.appkey = frmLoginDeskDW.txtAppKey.text;
    kony.apps.coe.ess.appconfig.appsecret = frmLoginDeskDW.txtAppSecret.text;
    kony.apps.coe.ess.appconfig.serviceurl = frmLoginDeskDW.txtServiceURL.text;
    kony.apps.coe.ess.frmLoginDesk.hideReconfigFlex();
}

/**
 * @class          frmLoginDesk
 * @type           function
 * @description    hide Reconfig
 */
kony.apps.coe.ess.frmLoginDesk.hideReconfigFlex = function(){
    frmLoginDeskDW.flxReconfigure.setVisibility(false);
    frmLoginDeskDW.flxLoginMain.setVisibility(true);
    frmLoginDeskDW.forceLayout();
}