/**
 *  @author     Shantam Agarwal
 *  @category   UX/UI
 *  @desc       Hamburger Menu implementation for ESS
 *  @ ©2016    Kony Inc
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.isLogoutOptionSelected = false;

/**
 * @class          Hamburger
 * @type           Constructor
 * @param          {widgetRef} hamburgerButton - the button that will open/close the hamburger
 * @return         None.
 * @description    Create flexes and assign actions
 */
kony.apps.coe.ess.Hamburger = function(hamburgerButton) {
    kony.print("-- Start Hamburger constructor --");
    // Input validations.
    if (hamburgerButton == undefined) {
        kony.print("Ignoring Error: input hamburgerButton is undefined.");
    }
    this.isFirstClick = true;
    this.isHamburgerVisible = false;
    kony.application.getCurrentForm().enableScrolling = false;
    var succCallback = this.generateShadow;
    var callBackForHamburger = this.applyActions.bind(this);
    this.generateContainer(succCallback);
    this.generateHamburger(callBackForHamburger);
    var scopeObj = this;
    kony.application.getCurrentForm().flxHamburger.setEnabled(false);
    this.hamburgerMenuItemsShow();
    if (hamburgerButton != undefined) {
        hamburgerButton.onClick = function() {
          kony.application.getCurrentForm().flxHamburger.lblUsername.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmLeaveHome.lblWelcome")+" \n"+kony.apps.coe.ess.globalVariables.employeeName;//kony.apps.coe.ess.frmLogin.username;
        kony.print("-- Start hamburgerButton.onClick --");
			this.hamburgerMenuItemsShow();
            // Disable clicking on Hamburger.
              if (kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.isVisible) {
                kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(true); // Enable clicking on Hamburger menu items.
                kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
            }
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = kony.i18n.getLocalizedString("i18n.ess.Login.appOnline");//"APP ONLINE";
            } else {
                kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = kony.i18n.getLocalizedString("i18n.ess.Login.appOffline");//"APP OFFLINE";
            }
            if (scopeObj.isHamburgerVisible == false) {
                kony.application.getCurrentForm().flxHamburger.setEnabled(true);
                scopeObj.isHamburgerVisible = true;
                var showBrgr = scopeObj.showHamburger.bind(scopeObj);
                showBrgr();
                var settingButton = kony.application.getCurrentForm().flxSettings;
                settingButton.onClick = settingButton.onClick.bind(scopeObj);
            } else {
                kony.application.getCurrentForm().flxHamburger.setEnabled(false);
                scopeObj.isHamburgerVisible = false;
                var hideBrgr = scopeObj.hideHamburger;
                hideBrgr();
            }
            kony.print("-- End hamburgerButton.onClick --");
        }.bind(scopeObj);
         if (this.isFirstClick == true) {
             this.isFirstClick = false;
             kony.print("-- Hamburger menu is called first time --");
             hamburgerButton.onClick();
         }
    } // end of if hamburgerButton != undefined.
    kony.print("-- End Hamburger constructor --");
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          {function} callback - callback function to exectute
 * @return         None.
 * @description    generates hamburger's shadow
 */
kony.apps.coe.ess.Hamburger.prototype.generateShadow = function(callback) {
    kony.print("---------generating shadow");
    if (kony.application.getCurrentForm().flxHamburgerShadow === null) {
        var shadowContainer = new kony.ui.FlexContainer({
            "id": "flxHamburgerShadow",
            "top": "0%",
            "left": "0%",
            "width": "110%",
            "height": "110%",
            "zIndex": 3,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM,
            "skin": "sknFlxHamburgerShadow"
        }, {
            "padding": [0, 0, 0, 0]
        }, {});
        kony.application.getCurrentForm().addAt(shadowContainer, 0);
        kony.print("---------------shadow generated");
    } else {
        kony.print("---------------shadow already exists");
    }
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          {function} callback - callback function to exectute
 * @return         None.
 * @description    nest all form widgets in a container
 */
kony.apps.coe.ess.Hamburger.prototype.generateContainer = function(callback) {
    kony.print("---------generating container");
    var children = kony.application.getCurrentForm().widgets();
    if (kony.application.getCurrentForm().flxMainContainer === null) {
        var mainContainer = new kony.ui.FlexContainer({
            "id": "flxMainContainer",
            "top": "0%",
            "left": "0%",
            "width": "100%",
            "height": "100%",
            "zIndex": 1,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM,
        }, {
            "padding": [0, 0, 0, 0]
        }, {});
        while (kony.application.getCurrentForm().widgets().length > 0) {
            mainContainer.add(kony.application.getCurrentForm().widgets()[0]);
            kony.application.getCurrentForm().remove(kony.application.getCurrentForm().widgets()[0]);
        }
        mainContainer.zIndex = 4;
        kony.application.getCurrentForm().addAt(mainContainer, 0);
        kony.print("------------ Container generated");
    } else {
        kony.print("----------Container already exists");
    }
    callback()
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          {function} callback - callback function to exectute
 * @return         None.
 * @description    generates the hamburger
 */
kony.apps.coe.ess.Hamburger.prototype.generateHamburger = function(callback) {
    kony.print("-- Start generateHamburger --");
    if (kony.application.getCurrentForm().lblHamburgerCompanyName === null) {
        var flexContainer1 = frmHamburger.flxHamburger.clone("");
        kony.application.getCurrentForm().addAt(flexContainer1, 0);
        kony.application.getCurrentForm().lblAppVersion.text = kony.apps.coe.ess.appconfig.appversion;
        kony.print("-- brgr generated");
        callback();
    } else {
        kony.print("-- brgr already exists");
    }
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @return         None.
 * @description    applies actions to funcitions inside hamburger
 */
kony.apps.coe.ess.Hamburger.prototype.applyActions = function() {
    kony.print("-- Start applyActions --");
    /* Sync functionality modified for myleave app
     * For frmLeaveHome - will close hamburger and refresh the form
     * */
    if (kony.application.getCurrentForm().flxSyncNow !== null || kony.application.getCurrentForm().flxSyncNow !== undefined) {
        kony.application.getCurrentForm().flxSyncNow.onClick = function() {
            kony.print("-- Start flxSyncNow.onClick --");
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = kony.i18n.getLocalizedString("i18n.ess.Login.appOnline");//"APP ONLINE";
            } else {
                kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = kony.i18n.getLocalizedString("i18n.ess.Login.appOffline");//"APP OFFLINE";
            }
            kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.apps.coe.ess.Sync.doDownload = true;
            if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                kony.apps.coe.ess.globalVariables.isSyncInProgress = true;
            }
            var successCallback = function() {
                if (kony.application.getCurrentForm().id === "frmLeaveHome") {
                    this.hideHamburger();
                    this.isHamburgerVisible = false;
                    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveHome");
                    kony.application.showLoadingScreen("", "Refreshing..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                    formController.loadDataAndShowForm();
                }
                kony.print("-- Completed manual sync from Hamburger --");
            }.bind(this);
            kony.apps.coe.ess.frmLogin.manualSyncOnClick(successCallback);
            kony.print("-- End flxSyncNow.onClick --");
        }.bind(this);
    }
    if (kony.application.getCurrentForm().flxLogout !== null || kony.application.getCurrentForm().flxLogout !== undefined) {
        kony.application.getCurrentForm().flxLogout.onClick = function() {
            kony.print("-- Initiate logout from Hamburger --");
            this.hideHamburger();
            this.isHamburgerVisible = false;
            kony.print("-- Main flex closed --");
            kony.apps.coe.ess.isLogoutOptionSelected = true;
        }.bind(this);
        kony.print("-- actions applied --");
    }
    kony.print("-- End applyActions --");
    if (kony.application.getCurrentForm().flxMyNotifications !== null || kony.application.getCurrentForm().flxMyNotifications !== undefined) {
        kony.application.getCurrentForm().flxMyNotifications.onClick = function() {
            this.hideHamburger();
            showNotificationsListForm();
        }.bind(this)
    }
};
kony.apps.coe.ess.Hamburger.prototype.makeFooterDisapperWhenHamburgerisCalled = function(){
  //Also hides footer in Approvals App
    kony.print("--curr form" + kony.application.getCurrentForm());
    if (kony.application.getCurrentForm().footers[0] !== null ||
        kony.application.getCurrentForm().footers[0] !== undefined) {
        kony.application.getCurrentForm().footers[0].setVisibility(false);
    }
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @return         None.
 * @description    show Hamburger menu flex
 */
kony.apps.coe.ess.Hamburger.prototype.showHamburger = function() {
    kony.print("-- Start showHamburger --");
    kony.application.getCurrentForm().flxMainContainer.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "82.1%",
                "top": "10.3%",
                "height": "80.4%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": kony.print("---------Animated Main Flex for Hamburger")
        });
    kony.application.getCurrentForm().flxHamburgerShadow.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "77%",
                "top": "7%",
                "height": "87%",
                "width": "84%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": this.makeFooterDisapperWhenHamburgerisCalled()
        });
    if (kony.application.getCurrentForm().flxOverlayCOntainer === null) {
        var overlayContainer = new kony.ui.FlexContainer({
            "id": "flxOverlayContainer",
            "left": "82.1%",
            "top": "10.3%",
            "height": "80.4%",
            "width": "70%",
            "zIndex": 100,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM,
        }, {
            "padding": [0, 0, 0, 0]
        }, {});
        kony.application.getCurrentForm().add(overlayContainer);
    }
    kony.application.getCurrentForm().flxOverlayContainer.onClick = function() {
        this.isHamburgerVisible = false;
        this.hideHamburger();
    }.bind(this);
    // Enable clicking on Hamburger in case it was disabled previously
    kony.print("-- Enable clicking on Hamburger --");
    kony.application.getCurrentForm().flxHamburger.setEnabled(true);
    kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(true);
    kony.print("-- Hamburger open complete");
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          none
 * @return         None.
 * @description    close hamburger
 */
kony.apps.coe.ess.Hamburger.prototype.hideHamburger = function() {
    kony.print("---------- Hamburger close initiated");
    /* Shows footer
     */
    kony.application.getCurrentForm().remove(kony.application.getCurrentForm().flxOverlayContainer);
    kony.application.getCurrentForm().flxHamburger.setEnabled(false);
    kony.application.getCurrentForm().flxMainContainer.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "100%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": function() {}
        });
    kony.application.getCurrentForm().flxHamburgerShadow.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "100%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": function() {
                //Making foooter visiblity to true
                if (kony.application.getCurrentForm().footers && kony.application.getCurrentForm().footers[0]) {
                    kony.application.getCurrentForm().footers[0].setVisibility(true);
                }
                if(kony.apps.coe.ess.isLogoutOptionSelected === true){
                  kony.apps.coe.ess.isLogoutOptionSelected = false;
                  kony.sdk.mvvm.LogoutAction();
                  kony.print("-- Completed logout from Hamburger --");
                }
            }
        });
    this.isHamburgerVisible = false;
    kony.print("---------- Hamburger close complete");
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          none
 * @return         None.
 * @description    function to be executed on click of offline button on Hamburger Menu
 */
kony.apps.coe.ess.Hamburger.prototype.btnOfflineOnClick = function() {
    kony.print("-- Start btnOfflineOnClick --");
    if (kony.apps.coe.ess.globalVariables.isSyncInProgress == true) {
        popupOfflineAlert.dismiss();
        //Enable clicking on Hamburger menu items
        kony.application.getCurrentForm().flxHamburger.setEnabled(true);
        kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(true);
        kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=false;
        kony.apps.coe.ess.globalVariables.isSyncInProgress = false;
    } else {
      //Enable clicking on Hamburger menu items
        kony.application.getCurrentForm().flxHamburger.setEnabled(true);
        kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(true);
        kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=false;
        popupOfflineAlert.dismiss();
        kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=false;
    }
    kony.print("-- End btnOfflineOnClick --");
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          none
 * @return         None.
 * @description    function to be executed on click of sync button on Hamburger Menu
 */
kony.apps.coe.ess.Hamburger.prototype.btnSyncOnClick = function() {
    kony.print("-- Start btnSyncOnClick --");

    // Enable clicking on Hamburger menu items
    kony.application.getCurrentForm().flxHamburger.setEnabled(true);
    kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(true);
    popupOfflineAlert.dismiss();
    kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=false;

    if (kony.apps.coe.ess.globalVariables.isSyncInProgress == true) {
        kony.apps.coe.ess.globalVariables.isSyncInProgress = false;
    }
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    } else {
        // Continue to show the offline alert until network available or user clicks on Continue offline
        popupOfflineAlert.show();
        kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=true;
    }
    kony.print("-- End btnSyncOnClick --");
};

/**
 * @class          Hamburger
 * @type           Prototype
 * @param		   none
 * @return         None.
 * @description    function to be executed to show the list of hamburger Items on Menu.
 */
kony.apps.coe.ess.Hamburger.prototype.
hamburgerMenuItemsShow = function() {
    if (kony.apps.coe.ess.appconfig.isShowDeepLinkingAppBeforeInstall === false) {
        //#ifdef iphone
        kony.apps.ess.deepLinkingSSO.appExistedOrNot();
        //#else
        //#ifdef android
       kony.apps.ess.deepLinkingSSO.appExistedOrNot();
        //#else
		//#ifdef tabrcandroid
		kony.apps.ess.deepLinkingSSO.appExistedOrNot();
		//#else
		//#ifdef ipad
		kony.apps.ess.deepLinkingSSO.appExistedOrNot();
		//#else
        this.changeHamburgerMenuItemsVisibility();
        //#endif
        //#endif
      	//#endif
      	//#endif
    } else {
        this.changeHamburgerMenuItemsVisibility();
    }
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @param		   none
 * @return         None.
 * @description    function to make the list of items as visible on hamburger Menu.
 */
kony.apps.coe.ess.Hamburger.prototype.
changeHamburgerMenuItemsVisibility = function() {
    kony.application.getCurrentForm().flxHamburger.flxMyPay.isVisible = true;
    kony.application.getCurrentForm().flxHamburger.flxMyLeave.isVisible = true;
    kony.application.getCurrentForm().flxHamburger.flxMyTime.isVisible = true;
    kony.application.getCurrentForm().flxHamburger.flxMyExpenses.isVisible = true;
    kony.application.getCurrentForm().flxHamburger.flxMyProfile.isVisible = true;
};
