
/**
 * TouchID Functionality
 * @author Dharma Teja Reddy K
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.TouchID = {
  /**
   * Check if Touch is supported or not
   * @return boolean
   */
  isTouchAuthenticationSupported : function() {
    var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);   
    if(status == 5000) {
      //Whihc means, Touch Authentication is supported
      //return true;
      return false;
    } 
    //Status other than 5000 means, There's no touch authentication supported/enabled
    return false;
  },
  /**
   * Callback of localAuthentication.authenticate function.
   * @param {Number} $statusId
   *		
   */
  touchAuthenticationCallback : function(statusId) {
    try {
//      var securityObj = new kony.apps.coe.ess.syncFunctions();
     if(statusId== 5000 ){
		 kony.print(" ==> No Error");
          var securityObj = new kony.apps.coe.ess.syncFunctions();
          kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});

          var username = securityObj.decryptData(kony.store.getItem("username"));
          var password = securityObj.decryptData(kony.store.getItem("password"));
          kony.apps.coe.ess.frmLogin.username = username;
          kony.apps.coe.ess.frmLogin.password = password;

          var isValid = kony.apps.coe.ess.frmLogin.isValidInputs(
          					kony.apps.coe.ess.frmLogin.username,
            				kony.apps.coe.ess.frmLogin.password
          				);
          if(isValid) {
          	kony.sdk.mvvm.LoginAction();
            kony.apps.coe.ess.frmLogin.hidePopups();
          } else {
            frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.registerUserForTouchId");
            kony.application.dismissLoadingScreen();
            kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          }
	 }else{
		  frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.unknownStatus") + " : " + statusId;
	 }
          
          
		  /*
        case 5001 :
          kony.print(" Authentication is not successful because a user fails to provide valid credentials");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5001");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
        case 5002 :
          kony.print(" ==> Authentication is canceled by a user. For example, a user taps Cancel in the dialog box");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5002");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
        case 5003 :
          kony.print(" ==> Authentication is canceled because a user taps the fallback button (Enter Password). This is applicable only for the iOS platform");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5003");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
        case 5004 :
          kony.print(" ==> Authentication is canceled by system. This is applicable only for the iOS platform");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5004");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
        case 5005 :
          kony.print(" ==> Authentication does not start because the passcode is not set on the device.");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5005");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
        case 5006 :
          kony.print(" ==> Authentication does not start because Touch ID is not available on the device");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5006");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
        case 5007 :
          kony.print(" ==> Authentication does not start because Touch ID has no enrolled fingerprints.");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5007");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
        case 5008 :
          kony.print(" ==> Authentication does not start because Target device's OS does not support local authentication with Touch ID");
          frmLogin.lblTouchIDPopupDescription.text = kony.i18n.getLocalizedString("i18n.ess.Login.TouchIdError5008");
          kony.apps.coe.ess.frmLogin.showTouchIdPopup();
          break;
		  */
       
         
        
      
    } catch (excp) {
      handleError(excp);
    }
  },
  /**
   * Initiate TouchID Authentication.
   */
  authenticateThroughTouch : function() {
    try {
      if(kony.store.getItem("useTouchID") === null || kony.store.getItem("useTouchID") === false) {
        //Show Popup to Enable TouchID
        kony.apps.coe.ess.frmLogin.showEnableTouchIDPopup();
        return;
      }
      var configMap = {
        "promptMessage": kony.i18n.getLocalizedString("i18n.ess.Login.useTouchId")
      };

      kony.localAuthentication.authenticate(
        constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID,
        kony.apps.coe.ess.TouchID.touchAuthenticationCallback,
        configMap
      );
     
      // show custom Popup for TouchID in the android
      
      //#ifdef android
      kony.apps.coe.ess.frmLogin.showTouchIdPopup();
      
      //#endif
      
    } catch (e) {
      handleError(e);
    }
  }
};
