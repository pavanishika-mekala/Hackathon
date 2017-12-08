/**
 * @module codeTimesheetSettingsUI_m
 * @author Nakul Gupta
 * @category UI 
 * @description TimesheetSettingsUI class. 
 * © 2016 Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.settings = {
    settingsInstanceObject: null,
    /**
     * Returns Settings Object. 
     */
    getSettingsObject: function() {
        if (this.settingsInstanceObject === null)
            this.settingsInstanceObject = new Settings();
        return this.settingsInstanceObject;
    },
    destorySettingsObject: function() {
        this.settingsInstanceObject = null;
    }
};


//%Region - Constructor
kony.apps.coe.ess.myTime.
TimesheetSettingsUI = function() {};

// %Region - Methods in TimesheetSettingsUI
/**
 * @class       TimesheetSettingsUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called on the pre show to assign skin to the answer buttons
 */
kony.apps.coe.ess.myTime.
TimesheetSettingsUI.prototype.onFrmTimesheetSettingsUIPreShow = function() {
    try {
        kony.print("-- Start onFrmTimesheetSettingsUIPreShow --");
        var minTaskDuration = kony.store.getItem("minTaskDuration");
        var defaultTaskDuration = kony.store.getItem("defaultTaskDuration");
        if (minTaskDuration) {
            for (var j = 1; j <= 2; j++) {
                if (frmTimesheetSettings["btnOption1Answer" + j].text == minTaskDuration) {
                    frmTimesheetSettings["btnOption1Answer" + j].skin = "sknBtnMobBorder549CE5100O549CE5100O100S";
                } else {
                    frmTimesheetSettings["btnOption1Answer" + j].skin = "sknBtnMobBg0OpFC333333Op100S24px";
                }
            }
        } else {
            this.disableSkinOfTheSelectedOption("btnOption1");
            kony.store.setItem("minTaskDuration", frmTimesheetSettings.btnOption1Answer2.text);
            frmTimesheetSettings.btnOption1Answer2.skin = "sknBtnMobBorder549CE5100O549CE5100O100S";
        }

        if (defaultTaskDuration) {
            for (var j = 1; j <= 8; j++) {
                if (frmTimesheetSettings["btnOption2Answer" + j].text == defaultTaskDuration) {
                    frmTimesheetSettings["btnOption2Answer" + j].skin = "sknBtnMobBorder549CE5100O549CE5100O100S";
                } else {
                    frmTimesheetSettings["btnOption2Answer" + j].skin = "sknBtnMobBg0OpFC333333Op100S24px";
                }
            }
        } else {
            this.disableSkinOfTheSelectedOption("btnOption2");
            kony.store.setItem("defaultTaskDuration", frmTimesheetSettings.btnOption2Answer2.text);
            frmTimesheetSettings.btnOption2Answer2.skin = "sknBtnMobBorder549CE5100O549CE5100O100S";
        }
        kony.print("-- End onFrmTimesheetSettingsUIPreShow --");
    } catch (e) {
        handleError(e);
    }
};


/**
 * @class       TimesheetSettingsUI
 * @type        UI
 * @param       optionName {string} - contains the option name of the selected button, buttonName {string} - contains the button name of the selected button
 * return       None.
 * desc         This method assigns skin to the answer buttons
 */
kony.apps.coe.ess.myTime.
TimesheetSettingsUI.prototype.onClickOfAnswerButton = function(optionName, buttonName) {
    try {
        kony.print("-- Start onClickOfAnswerButton --");
        this.disableSkinOfTheSelectedOption(optionName);
        if (optionName == "btnOption1") {
            kony.store.setItem("minTaskDuration", frmTimesheetSettings[optionName + buttonName].text);
        } else if (optionName == "btnOption2") {
            kony.store.setItem("defaultTaskDuration", frmTimesheetSettings[optionName + buttonName].text);
        }
        frmTimesheetSettings[optionName + buttonName].skin = "sknBtnMobBorder549CE5100O549CE5100O100S";
        kony.print("-- End onClickOfAnswerButton --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       TimesheetSettingsUI
 * @type        UI
 * @param       optionName {string} - contains the option name of the selected button
 * return       None.
 * desc         This method disables the skin for the selected option
 */
kony.apps.coe.ess.myTime.
TimesheetSettingsUI.prototype.disableSkinOfTheSelectedOption = function(optionName) {
    try {
        kony.print("-- Start disableSkinOfTheSelectedOption --");
        var i = 0;
        if (optionName == "btnOption1") {
            i = 2;
        } else if (optionName == "btnOption2") {
            i = 8;
        }
        for (var j = 1; j <= i; j++) {
            frmTimesheetSettings[optionName + "Answer" + j].skin = "sknBtnMobBg0OpFC333333Op100S24px";
        }
        kony.print("-- End disableSkinOfTheSelectedOption --");
    } catch (e) {
        handleError(e);
    }
};


//Construtor
var Settings = function() {
    this.ON_ICON = "on.png";
    this.OFF_ICON = "off.png";
};
/**
 * Should be called in pre-show of Settings form to initialize UI elements
 */
Settings.prototype.preShow = function() {
    kony.print("Start --Settings.prototype.preShow");
    try {
        //Set Push Notifications Icon 
        var isEnabled = kony.apps.coe.ess.KMS.isPushNotificationEnabled();
        var iconToSet = this.OFF_ICON
        if (isEnabled) {
            iconToSet = this.ON_ICON;
        }
        frmTimesheetSettings.imgPushNotificationsSettings.src = iconToSet;

    } catch (excp) {
        kony.print("Exception caught in Settings.prototype.preShow : " + JSON.stringify(excp));
    }
    kony.print("end --Settings.prototype.preShow");
};

/**
 * Toogles Push Notifications Subscription. If subscribed - it will unsubscribes and vice-versa
 */
Settings.prototype.togglePushNotificationsStatus = function() {
    kony.print("Start -- Settings.prototype.togglePushNotificationsStatus");
    try {
        kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.common.settings.applyChanges"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        var isEnabled = kony.apps.coe.ess.KMS.isPushNotificationEnabled();
        if (isEnabled) {
            var success = function() {
                var iconToSet = this.OFF_ICON;
                frmTimesheetSettings.imgPushNotificationsSettings.src = iconToSet;
                kony.application.dismissLoadingScreen();
            };
            var failure = function() {
                toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.common.errorOnDisableNotifications"), 3000);
                kony.application.dismissLoadingScreen();
            };
            kony.apps.coe.ess.KMS.disablePushNotifications(success.bind(this), failure);

        } else {
            var success = function() {
                var iconToSet = this.ON_ICON
                frmTimesheetSettings.imgPushNotificationsSettings.src = iconToSet;
                kony.application.dismissLoadingScreen();
            };
            var failure = function() {
                toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.common.errorOnEnableNotifications"), 3000);
                kony.application.dismissLoadingScreen();
            };
            kony.apps.coe.ess.KMS.enablePushNotifications(success.bind(this), failure);
        }

    } catch (excp) {
        kony.print("Exception occured at Settings.prototype.togglePushNotificationsStatus : " + JSON.stringify(excp));
    }
    kony.print("End -- Settings.prototype.togglePushNotificationsStatus");
};

/**
 * Exits from Settings screen after doing necessary changes.
 */
Settings.prototype.exitSettingsScreen = function() {
    kony.print("Start --Settings.prototype.exitSettingsScreen");
    try {
        var previousForm = kony.application.getPreviousForm();
        previousForm.show();

        //Finally, Destroy object to freeup memory
        kony.apps.coe.ess.settings.destorySettingsObject();
    } catch (excp) {
        kony.print("Exception occured at Settings.prototype.exitSettingsScreen : " + JSON.stringify(excp));
    }
    kony.print("End --Settings.prototype.exitSettingsScreen");
};
/**
 * function need to be executed on click of resetData Button in settings.
 */
Settings.prototype.resetData = function() {
    kony.print("Start --Settings.prototype.resetData");
    frmTimesheetSettings.flxPopUp.isVisible = false;
    if (kony.sync.isSessionInProgress) {
        handleError("Session is in Progress");
    } else {
        kony.apps.coe.ess.frmLogin.manualSyncOnClick(this.resetLocalDB, this.resetLocalDB);
    }
    kony.print("End --Settings.prototype.resetData");
};
/**
 * function need to be executed on sucess or error  of manual Sync OnClick.
 */
Settings.prototype.resetLocalDB = function() {
    kony.print("Start --Settings.prototype.resetLocalDB");
    kony.application.showLoadingScreen("", "Resetting the Data", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    kony.apps.coe.ess.Sync.resetSyncDb(resetLocalDBSucess, resetLocalDBError);

    function resetLocalDBSucess() {
        kony.apps.coe.ess.Sync.doDownload = true;
        kony.application.showLoadingScreen("", "Syncing the Data", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        kony.apps.coe.ess.Sync.startSyncSession(syncSessionSuccess, syncSessionFailure);

        function syncSessionSuccess() {
            InitailizeAllAppGloabalsOnSyncSuccess();
            kony.apps.coe.ess.MyTime.Footer.SetFooterNavigation(1);
        }

        function syncSessionFailure(error) {
            kony.print(JSON.stringify(error));
        }
    }

    function resetLocalDBError(error) {
        kony.print(JSON.stringify(error));
    }
    kony.print("End --Settings.prototype.resetLocalDB");
};
kony.apps.coe.ess.myTime.
TimesheetSettingsUI.prototype.toggleManualTimeEntry = function() {
    if (frmTimesheetSettings.imgManualTimeEntryToggle.src == "off.png") {
        frmTimesheetSettings.imgManualTimeEntryToggle.src = "on.png";
        kony.store.setItem("manualTimeEntry", true);
    } else if (frmTimesheetSettings.imgManualTimeEntryToggle.src == "on.png") {
        frmTimesheetSettings.imgManualTimeEntryToggle.src = "off.png";
        kony.store.setItem("manualTimeEntry", false);
    }
};
kony.apps.coe.ess.myTime.
TimesheetSettingsUI.prototype.toggleGPSTracking = function() {
    if(kony.store.getItem("GPSTracking") !== undefined && kony.store.getItem("GPSTracking") !== null){  
      if (kony.store.getItem("GPSTracking") === false) {
          frmTimesheetSettings.imgGpsLocation.src = "on.png";      	
          kony.store.setItem("GPSTracking", true);
          kony.apps.coe.ess.myTime.TimesheetCreate.getPosition();
      } else if (kony.store.getItem("GPSTracking") === true) {
          frmTimesheetSettings.imgGpsLocation.src = "off.png";
          kony.store.setItem("GPSTracking", false);
      }
    } else {
    	if (kony.apps.coe.ess.appconfig.getCurrentLocation === false) {        	
          	frmTimesheetSettings.imgGpsLocation.src = "on.png";      	
          	kony.store.setItem("GPSTracking", true);
        } else if(kony.apps.coe.ess.appconfig.getCurrentLocation === true) {
          	frmTimesheetSettings.imgGpsLocation.src = "off.png";
          	kony.store.setItem("GPSTracking", false);          
        }
    }
};
kony.apps.coe.ess.myTime.
TimesheetSettingsUI.prototype.showManualTimeEntry = function() {
    if (kony.apps.coe.ess.appconfig.isDemo === true) {
        frmTimesheetSettings.flxManualTimeEntryToggle.setVisibility(true);
        if (kony.store.getItem("manualTimeEntry") === false) {
            frmTimesheetSettings.imgManualTimeEntryToggle.src = "off.png";
        } else if (kony.store.getItem("manualTimeEntry") === true) {
            frmTimesheetSettings.imgManualTimeEntryToggle.src = "on.png";
        }
    } else {
        frmTimesheetSettings.flxManualTimeEntryToggle.setVisibility(false);
    }
};