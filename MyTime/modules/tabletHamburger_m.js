/**
 *  @author     Rajeev Saxena moified by Prabhjot Singh
 *  @category   UX/UI
 *  @desc       Hamburger Menu implementation for ESS
 *  @ © 2016    Kony Inc
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
/**
 * @class          Hamburger
 * @type           Constructor
 * @param          {widgetRef} hamburgerButton - the button that will open/close the hamburger
 * @return         None.
 * @description    Create flexes and assign actions
 */
kony.apps.ess.Hamburger = function(hamburgerButton) {
        try {
			
          if (hamburgerButton == undefined) {
            kony.print("Ignoring Error: input hamburgerButton is undefined.");
          } 
          this.isFirstClick = true;
          this.isHamburgerVisible = false;
            this.buttonSwitch = 0;
            kony.application.getCurrentForm().enableScrolling = false;
            var succCallback = this.generateShadow;
            var callBackForHamburger = this.applyActions.bind(this);
            this.generateContainer(succCallback);
            this.generateHamburger(callBackForHamburger);
            var scopeObj = this;
            kony.application.getCurrentForm().flxHamburger.setEnabled(false);
            hamburgerButton.onClick = function() {
                if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))
                    kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP ONLINE";
                else
                    kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP OFFLINE";
                if (kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.isVisible) {
                    kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
                    kony.apps.coe.ess.syncFunctions.syncHamburger = 0;
                }
                if (scopeObj.buttonSwitch == 0) {
                    kony.application.getCurrentForm().flxHamburger.setEnabled(true);
                    scopeObj.buttonSwitch = 1;
                    var showBrgr = scopeObj.showHamburger.bind(scopeObj);
                    showBrgr();
                } else {
                    kony.application.getCurrentForm().flxHamburger.setEnabled(false);
                    scopeObj.buttonSwitch = 0;
                    var hideBrgr = scopeObj.hideHamburger;
                    hideBrgr();
                }
            }.bind(scopeObj);
           if (this.isFirstClick == true) {
             this.isFirstClick = false;
             kony.print("-- Hamburger menu is called first time --");
             hamburgerButton.onClick();
         }
        } catch (e) {
            kony.print(e);
        }
    }
    /**
     * @class          Hamburger
     * @type           Prototype
     * @param          {function} callback - callback function to exectute
     * @return         None.
     * @description    generates hamburger's shadow
     */
kony.apps.ess.Hamburger.prototype.generateShadow = function(callback) {
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
kony.apps.ess.Hamburger.prototype.generateContainer = function(callback) {
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
kony.apps.ess.Hamburger.prototype.generateHamburger = function(callback) {
        kony.print("---------generating brgr");
        if (kony.application.getCurrentForm().lblHamburgerCompanyName === null) {
            var flexContainer1 = frmHamburger.flxHamburger.clone("");
            kony.application.getCurrentForm().addAt(flexContainer1, 0);
            kony.application.getCurrentForm().lblVersionNo.text = "v" + kony.apps.coe.ess.appconfig.version;
            kony.print("------------ brgr generated");
            callback();
        } else {
            kony.print("------------ brgr already exists");
        }
    }
    /**
     * @class          Hamburger
     * @type           Prototype
     * @return         None.
     * @description    applies actions to funcitions inside hamburger
     */
kony.apps.ess.Hamburger.prototype.applyActions = function() {
    if (kony.application.getCurrentForm().flxSyncNow !== null || kony.application.getCurrentForm().flxSyncNow !== undefined) {
        kony.application.getCurrentForm().flxSyncNow.onClick = function() {
            kony.print("-----------------Initiate manual sync from Hamburger");
            if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))
                kony.apps.coe.ess.syncFunctions.syncHamburger = 1;
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))
                kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP ONLINE";
            else
                kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP OFFLINE";
            kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.apps.coe.ess.Sync.doDownload = true;
            var successCallback = function() {
                kony.print("-----------------Completed manual sync from Hamburger");
            };
            kony.apps.coe.ess.frmLogin.manualSyncOnClick(successCallback);
        };
    }
    if (kony.application.getCurrentForm().flxLogout !== null || kony.application.getCurrentForm().flxLogout !== undefined) {
        kony.application.getCurrentForm().flxLogout.onClick = function() {
            kony.print("-----------------Initiate logout from Hamburger");
            this.hideHamburger();
            this.buttonSwitch = 0;
            kony.sdk.mvvm.LogoutAction();
            kony.print("-----------------Completed logout from Hamburger");
        }.bind(this);
    }
   /* if (kony.application.getCurrentForm().flxHelp !== null || kony.application.getCurrentForm().flxHelp !== undefined) {
        kony.application.getCurrentForm().flxHelp.onClick = function() {
            kony.print("-----------------navigating to help form");
            this.hideHamburger();
            this.buttonSwitch = 0;
            frmTimesheetHelp.show();
            kony.print("-----------------navigation complete");
        }.bind(this);
    }*/
    kony.print("------------- actions applied");
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @return         None.
 * @description    show Hamburger menu flex
 */
kony.apps.ess.Hamburger.prototype.showHamburger = function() {
        kony.print("---------- Hamburger open initiated");
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
                "animationEnd": kony.print("---------Animated Shadow for Hamburger")
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
            this.buttonSwitch = 0;
            this.hideHamburger();
        }.bind(this);
        kony.print("---------- Hamburger open complete");
    }
    /**
     * @class          Hamburger
     * @type           Prototype
     * @param		   none
     * @return         None.
     * @description    close hamburger
     */
kony.apps.ess.Hamburger.prototype.hideHamburger = function() {
    kony.print("---------- Hamburger close initiated");
    kony.application.getCurrentForm().flxHamburger.setEnabled(false);
    kony.application.getCurrentForm().remove(kony.application.getCurrentForm().flxOverlayContainer);
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
            "animationEnd": kony.print("---------Closed Main Flex for Hamburger")
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
            "animationEnd": kony.print("---------Closed Shadow for Hamburger")
        });
    kony.print("---------- Hamburger close complete");
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @param		   none
 * @return         None.
 * @description    function to be executed on click of offline button on Hamburger Menu
 */
kony.apps.ess.Hamburger.prototype.btnOfflineOnClick = function() {
    if (kony.apps.coe.ess.syncFunctions.syncHamburger == 1) {
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.syncFunctions.syncHamburger = 0;
    } else
        kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
};