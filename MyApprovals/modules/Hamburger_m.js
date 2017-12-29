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

kony.apps.coe.ess.isLogoutOptionSelected=false;

/**
 * @class          Hamburger
 * @type           Constructor
 * @param          {widgetRef} hamburgerButton - the button that will open/close the hamburger
 * @return         None.
 * @description    Create flexes and assign actions
 */
kony.apps.coe.ess.Hamburger = function(hamburgerButton) {
  try{
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
    if (hamburgerButton !== undefined) {
        hamburgerButton.onClick = function() {
            kony.print("-- Start hamburgerButton.onClick --");
          	this.hamburgerMenuItemsShow();
            kony.application.getCurrentForm().flxHamburger.lblUsername.text = kony.i18n.getLocalizedString("i18n.ess.myApprovals.frmHamburger.lblWelcome")+" \n"+kony.apps.coe.ess.globalVariables.employeeName;//kony.apps.coe.ess.frmLogin.username;
          	//bbe-101 menu sync
//           	kony.application.getCurrentForm().flxHamburger.lblSyncDate.text=formatDate(kony.apps.coe.ess.globalVariables.lastSyncDate);
// 		   	kony.application.getCurrentForm().flxHamburger.lblSyncTime.text=formatTime(kony.apps.coe.ess.globalVariables.lastSyncDate);
            // Disable clicking on Hamburger.
              if (kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.isVisible) {
                kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(true); // Enable clicking on Hamburger menu items.
                kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
                kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.syncHamburger = 0;
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
  }catch(err){
    kony.print("Error inside hammenu click::"+JSON.stringify(err));
  }
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
        callback()
    } else {
        kony.print("-- brgr already exists");
    }
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @return         None.
 * @description    applies actions to funcitions inside hamburger
 */
kony.apps.coe.ess.Hamburger.prototype.applyActions = function() {
    kony.print("-- Start applyActions --");
    /* Sync functionality modified for approvals app
     * For frmApprovalHome - will close hamburger and refresh the form
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
                kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress = true;
            }
            var successCallback = function() {
                if (kony.application.getCurrentForm().id === "frmApprovalHome") {
                    this.hideHamburger();
                    this.isHamburgerVisible = false;
                    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
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
      var swipeOnCard = {
          fingers : 1,
      };
	kony.application.getCurrentForm().flxOverlayContainer.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, swipeOnCard,function(widgetID, gestureInfo){
      if(gestureInfo.swipeDirection == 1)
  	  {
        kony.print("calling onswipe close menu");
      	this.isHamburgerVisible = false;
      	this.hideHamburger();
      }
    }.bind(this));
 
    kony.application.getCurrentForm().flxOverlayContainer.onClick = function() {
      	kony.print("calling onclick close menu");
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
    kony.print("---------- Hamburger close initiated::");
    /* Shows footer in Approvals App
     */
  	kony.print("current form is::"+kony.application.getCurrentForm().id);
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
    if (kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress == true) {
        // Enable clicking on Hamburger menu items
        kony.application.getCurrentForm().flxHamburger.flxMenuHamburger.setEnabled(true);
        popupOfflineAlert.dismiss();
        kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=false;
        kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress = false;
    } else {
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

    if (kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress == true) {
        kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress = false;
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
/**
 * @class          Hamburger
 * @type           Prototype
 * @param		   none
 * @return         None.
 * @description    setting data
 */
kony.apps.coe.ess.Hamburger.prototype.
setDataToDynamicSegment = function() {
  	kony.print("----Start setDataToDynamicSegment ---------");
  	var WidgetsArray=["flxRequestType","lblRequestType","imgRequestType"];
	kony.apps.coe.ess.globalVariables.SettingsSegments=new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR,{},3,flxTemplateSettingsCell,kony.apps.coe.ess.Approvals.frmSettings.onClick,WidgetsArray);
	kony.application.getCurrentForm().flxDynamicSegment.add(kony.apps.coe.ess.globalVariables.SettingsSegments.getDynamicSegment());
  	kony.apps.coe.ess.globalVariables.DynamicAppsSegment=new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR,{},3,flxDynamicApps,kony.apps.coe.ess.Approvals.btnAppStatus,WidgetsArray);
	kony.application.getCurrentForm().flxDynamicAppsSegment.add(kony.apps.coe.ess.globalVariables.DynamicAppsSegment.getDynamicSegment());
  	var query = "SELECT request_type.id, request_type.name FROM request_type";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(response) {
    var processedData = kony.apps.coe.ess.Approvals.frmSettings.ProcessData(response);
    kony.apps.coe.ess.globalVariables.SettingsSegments.setData(processedData);
    var processedAppData = new kony.apps.coe.ess.Approvals.ProcessData(listOfAvailableApps);
    kony.apps.coe.ess.globalVariables.DynamicAppsSegment.setData(processedAppData);
    }, function(err) {
      	handleError(err);
    });
  	kony.print("----End setDataToDynamicSegment ---------");
};
kony.apps.coe.ess.Approvals.btnAppStatus = function() {
	var status=kony.apps.coe.ess.globalVariables.DynamicAppsSegment.SelectedItems[0].request_type.id;
	if(status.toString().toLowerCase()!=="approvals")
	{
    kony.apps.ess.deepLinkingSSO.btnOtherAppsOnClick(status);
	}
};
