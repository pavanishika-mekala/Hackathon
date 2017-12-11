/** Settings Screen Functionality
 * @author Dharma Teja Reddy K (KH2134)
 *          dharmateja.kasa@kony.com
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
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
    frmSettings.imgPushNotification.src = iconToSet;

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
    kony.application.showLoadingScreen("", "Applying Changes....", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    var isEnabled = kony.apps.coe.ess.KMS.isPushNotificationEnabled();
    if (isEnabled) {
      var success = function() {
        var iconToSet = this.OFF_ICON;
        frmSettings.imgPushNotification.src = iconToSet;
        kony.application.dismissLoadingScreen();
      };
      var failure = function() {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.common.errorOnDisableNotifications"), 3000);
        kony.application.dismissLoadingScreen();
      };
      kony.apps.coe.ess.KMS.disablePushNotifications(success.bind(this), failure);

    } else {
      var successEnablePushNotification = function() {
        var iconToSet = this.ON_ICON
        frmSettings.imgPushNotification.src = iconToSet;
        kony.application.dismissLoadingScreen();
      };
      var failureEnablePushNotification = function() {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.common.errorOnEnableNotifications"), 3000);
        kony.application.dismissLoadingScreen();
      };
      kony.apps.coe.ess.KMS.enablePushNotifications(successEnablePushNotification.bind(this), failureEnablePushNotification);
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
 * reset the Data after User Selects the Reset Option.
 */
Settings.prototype.resetData = function() {
  frmSettings.flxPopUp.isVisible = false;
  if (kony.sync.isSessionInProgress) {
    handleError("Session is in Progress");
  } else {
    kony.apps.coe.ess.frmLogin.manualSyncOnClick(this.resetLocalDB, this.resetLocalDB);
  }
};
/**
 * reset the Data after User Selects the Reset Option.
 */
Settings.prototype.resetLocalDB = function() {
  kony.print("Start --Settings.prototype.resetLocalDB");
  kony.application.showLoadingScreen("", "Resetting the Data", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.apps.coe.ess.Sync.resetSyncDb(resetLocalDBSucess, resetLocalDBError);

  function resetLocalDBSucess() {
    kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    kony.apps.coe.ess.Sync.doDownload = true;
    kony.apps.coe.ess.Sync.startSyncSession(syncSessionSuccess, syncSessionFailure);

    function syncSessionSuccess() {
      var sqlquery = "select Id, First_Name , Last_Name from Employee where IsEmployee = 1";
      kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
        if (data.length !== 0) {
          kony.apps.coe.ess.globalVariables.employeeId = data[0].Id;
          kony.apps.coe.ess.globalVariables.employeeName = data[0].First_Name + data[0].Last_Name;
          var currDate = new Date();
          var currYear = currDate.getFullYear().toString().trim(0, 4);
          if(kony.apps.coe.ess.globalVariables.isNativeTablet === false ){
            var getHolidaysQuery = "select count(Holiday_Date) as allHolidays from Holiday where Name !=\"Non Working Day\" and (Holiday_Date between '" + currYear + "0101' AND '" + currYear + "1231')";
            kony.sync.single_select_execute(kony.sync.getDBName(), getHolidaysQuery, null, function(res) {
              frmLeaveHome.lblAllHolidaysCount.text = res[0].allHolidays + "";
            }, function(err) {}, false);
            var getPendingRequestsQuery = "select count(l.id) as allPending from leave l join Status s on l.status_id = s.id " +
                "where s.Status_Name = 'PENDING' and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and ((l.start_date between '" + (parseInt(currYear) - 1).toString() + "0101'" +
                " AND '" + (parseInt(currYear) + 1).toString() + "1231') OR (l.end_date between '" + (parseInt(currYear) - 1).toString() + "0101' AND '" + (parseInt(currYear) + 1).toString() + "1231'))";
            kony.sync.single_select_execute(kony.sync.getDBName(), getPendingRequestsQuery, null, function(res) {
              frmLeaveHome.lblAllPendingRequestsCount.text = res[0].allPending + "";
              kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
            }, function(err) {}, false);
          }
          else{
            kony.application.dismissLoadingScreen();
          }
        } else {
          kony.apps.coe.ess.globalVariables.employeeId = "";
          kony.apps.coe.ess.globalVariables.employeeName = "";
          if(  kony.apps.coe.ess.globalVariables.isNativeTablet === false ){
            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
          }
        }
      }, function(err) {
        kony.print("-----Error in getting employee id----" + err);
      }, false);

    }

    function syncSessionFailure(error) {
      kony.print(JSON.stringify(error));
    }
  }

  function resetLocalDBError(error) {
    kony.print(JSON.stringify(error));
  }
  kony.print("Start --Settings.prototype.resetLocalDB");
};
/**
 * settings form preshow Tablet
 */
Settings.prototype.preShowTab = function() {
  var isEnabled = kony.apps.coe.ess.KMS.isPushNotificationEnabled();
  //var iconToSet = this.OFF_ICON
  if (isEnabled) {
    frmSettings.imgToggleButton.src = "on.png";
  } else {
    frmSettings.imgToggleButton.src = "off.png";
  }
};

/**
 *  @ Author  : Vaishali Kammeta
 *  @ Desc : changing application locale en,fr_BE and nl_BE
 */
Settings.prototype.languageSelection = function(src1,src2,src3,Sellocale){
  //set the selected language to all forms
  kony.i18n.setCurrentLocaleAsync(Sellocale,kony.apps.coe.ess.settings.getSettingsObject().destroyForms,kony.apps.coe.ess.settings.getSettingsObject().failureCallBack, null);
  //store the language selected in device storage
  kony.store.setItem("localeToBeSetLeave",Sellocale);
  frmSettings.imgEnglish.src = src1;
  frmSettings.imgFrench.src = src2;
  frmSettings.imgNederlands.src = src3;
  kony.print("username   :   "+kony.apps.coe.ess.frmLogin.username.toUpperCase());
  var date1= new Date();
  var timestamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());
  com.kony.NotificationsLanguageService.languageConfiguration.update("WHERE okta_user_id = \'" + kony.apps.coe.ess.frmLogin.username.toUpperCase() + "\' ", {
    "language": "" + kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase(),
    "lastmodifiedts":timestamp
  },
                                                                     function(res) {
    kony.print("------------ in update success response of notification language service:" + JSON.stringify(res));
  },
                                                                     function(err) {
    kony.print("------------  in update failure response  notification language service::" + JSON.stringify(err));
  },true);
};

/**
 * To destroy all the forms to refresh the locale when navigated to the screen
 */
Settings.prototype.destroyForms = function(){
  try{
    frmApplyForShiftChange.destroy();
    frmApplyLeave.destroy();
    frmAuditTrail.destroy();
    frmDummy.destroy();
    // storing last sync timestamp before hamburger is destroyed
    var dateText = frmHamburger.lblSyncDate.text;
    var timeText = frmHamburger.lblSyncTime.text;
    frmHamburger.destroy();
    //setting the timestamp to the one set befre destroying hamburger
    frmHamburger.lblSyncDate.text = dateText;
    frmHamburger.lblSyncTime.text = timeText;
    frmHolidays.destroy();
    frmLeaveBalance.destroy();
    frmLeaveHome.destroy();
    frmLeaveRequestDetails.destroy();
    frmLeaveWallet.destroy();
    frmLogin.destroy();
    frmNotificationsList.destroy();
    frmPendingLeaveRequest.destroy();
    frmSearchLog.destroy();
    frmShiftChangeRequestDetails.destroy();
    frmShiftManagement.destroy();
    frmStartUp.destroy();
    //bbe-111 Android_ ML_App crashes when search is done by selecting different status while switching the languages.
    if (kony.os.deviceInfo().name === "iPad" || kony.os.deviceInfo().name === "iPhone") {
      frmSearchLeaveType.destroy();
      frmStatusSearch.destroy();
      frmTeamView.destroy();
    }
    frmSettings.lblSettings.text = kony.i18n.getLocalizedString("i18n.ess.common.Settings");
    frmSettings.lblPushNotification.text = kony.i18n.getLocalizedString("i18n.ess.common.settings.pushNotificationsText");
    frmSettings.lblLocalDBReset.text = kony.i18n.getLocalizedString("i18n.ess.common.settings.resetDBText");
    frmSettings.btnReset.text = kony.i18n.getLocalizedString("i18n.ess.common.settings.reset");
    frmSettings.lblSelectLang.text = kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSettings.SelectLang");
	frmSettings.btnChangeLanguage.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmLeaveHome.ChangeLang");
  }catch(e){
    kony.print("Error : "+e);
  }

};

/*
 * faliure in Setting of locale
 */
Settings.prototype.failureCallBack = function(errCode,errMsg){
  kony.print("Error in setting locale"+JSON.stringify(errCode)+JSON.stringify(errMsg));
};

Settings.prototype.setLanginPostShow = function(){
  var selecLang = kony.store.getItem("localeToBeSetLeave");
  if(null !== selecLang){
    kony.apps.coe.ess.settings.getSettingsObject().getSelectedLocale(selecLang,true);
  }else{
    kony.apps.coe.ess.settings.getSettingsObject().getSelectedLocale(kony.i18n.getCurrentDeviceLocale(),false);
  }
};

Settings.prototype.getSelectedLocale = function(selecLang,flag){
  if(false === flag){
    selecLang = kony.apps.coe.ess.locale.getSelectedLocale(selecLang);
  }
  if(selecLang == "en"){
    kony.apps.coe.ess.settings.getSettingsObject().setImage("selectit.png","unselectit.png","unselectit.png");
  }else if(selecLang == "fr_BE"){
    kony.apps.coe.ess.settings.getSettingsObject().setImage("unselectit.png","selectit.png","unselectit.png");
  }else if(selecLang == "nl_BE"){
    kony.apps.coe.ess.settings.getSettingsObject().setImage("unselectit.png","unselectit.png","selectit.png");
  }else{
    kony.apps.coe.ess.settings.getSettingsObject().setImage("unselectit.png","unselectit.png","unselectit.png");
  }
};

Settings.prototype.setImage = function(src1,src2,src3){
  frmSettings.imgEnglish.src = src1;
  frmSettings.imgFrench.src = src2;
  frmSettings.imgNederlands.src = src3;
};
