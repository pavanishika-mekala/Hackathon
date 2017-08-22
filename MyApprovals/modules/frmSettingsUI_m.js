/*
 *  @ Author  : Rajesh Chandolu
 *  @ Category : Settings
 *  @ Desc : Managing the priority of approvals over the dashborad
 *  @ © 2016 Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.Settings = kony.apps.coe.ess.Approvals.Settings || {};
kony.apps.coe.ess.Approvals.frmSettings = kony.apps.coe.ess.Approvals.frmSettings || {};

kony.apps.coe.ess.Approvals.frmSettings.onClick = function (Selecteditem) {
  try {
    //input Validation
    if (isEmpty(Selecteditem) || isEmpty(Selecteditem.request_type) || isEmpty(Selecteditem.request_type.name)) {
      kony.print("-- invalid input to the function kony.apps.coe.ess.Approvals.frmSettings.onClick");
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.internalError")));

    }
    kony.store.setItem(kony.apps.coe.ess.globalVariables.UserSortingKey, Selecteditem.request_type.name);
    var formController;
    if(kony.apps.coe.ess.globalVariables.isNativeTablet == true) {
      if(kony.application.getCurrentForm() == frmSettings) {
        formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabDashboard");
      } else {
        kony.apps.ess.Hamburger.prototype.hideHamburger();
        formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabDashboard");
      }

    }
    else {
      formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
    }
    formController.loadDataAndShowForm();
  } catch (e) {
    handleError(e);
  }
};

kony.apps.coe.ess.Approvals.frmSettings.ProcessData = function (res) {
  kony.print("--start kony.apps.coe.ess.Approvals.frmSettings.ProcessData --");
  if (isEmpty(res)) {
    throw {
      "message": kony.i18n.getLocalizedString("i18n.ess.frmSettigns.ErrorMessage.Process")
    };
  }

  var ProcessedRequests = [];
  for (var index in res) {
    var TypeSpecificUi = kony.apps.coe.ess.Approvals.frmSettings.retriveTypeUi(res[index].name);
    TypeSpecificUi.request_type = res[index];
    ProcessedRequests.push(TypeSpecificUi);
  }

  kony.print("--end kony.apps.coe.ess.Approvals.frmSettings.ProcessData --");
  return ProcessedRequests;
};

kony.apps.coe.ess.Approvals.frmSettings.retriveTypeUi = function (Type) {

  kony.print("--start kony.apps.coe.ess.Approvals.frmSettings.retriveTypeUi --");

  //input validations
  if (isEmpty(Type)) {
    throw {
      "message": kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation")
    };
  }
  //retrival of the UserSpecified order
  var selectedType = kony.store.getItem(kony.apps.coe.ess.globalVariables.UserSortingKey);
  if(selectedType === null || selectedType === undefined || String(selectedType).trim() === "") {
    kony.store.setItem(kony.apps.coe.ess.globalVariables.UserSortingKey, "LEAVE");
  }
  var userPriority = kony.store.getItem(kony.apps.coe.ess.globalVariables.UserSortingKey);
  var TypeSpecificSkin = {
    "flxRequestType": {
      "skin": "sknFlxMob0OBor12A1E61px",
      "width": "47dp",
      "height": "47dp"
    },
    "lblRequestType": {
      "text": Type,
      "skin": "sknLblMob8895DB100OFS22px",
      "isVisible": false
    },
    "imgRequestType": {
      "src": "default_item.png",
      "width": "25dp",
      "height": "25dp"
    }
  };

  switch (Type) {
    case 'LEAVE':
      if (userPriority == 'LEAVE') {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob7986CB100OR100";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = true;
        TypeSpecificSkin.imgRequestType.src = "leave_title.png";
      } else {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob0OBor12A1E61px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = false;
        TypeSpecificSkin.imgRequestType.src = "leave_item.png";
      }
      break;
    case 'TIMESHEET':
      if (userPriority == 'TIMESHEET') {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob2EBAEERound";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = true;
        TypeSpecificSkin.imgRequestType.src = "time_title.png";
      } else {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMobba68c8";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = false;
        TypeSpecificSkin.imgRequestType.src = "time_item.png";
      }
      break;
    case 'EXPENSES':
      if (userPriority == 'EXPENSES') {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob1DB6C9";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = true;
        TypeSpecificSkin.imgRequestType.src = "expense_title.png";
      } else {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob0OBor12A1E61px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = false;
        TypeSpecificSkin.imgRequestType.src = "expense_item.png";
      }
      break;
    case 'PURCHASEORDER':
      if (userPriority == 'PURCHASEORDER') {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob058594100OBorR100px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = true;
        TypeSpecificSkin.imgRequestType.src = "purchase_order_in_list.png";
      } else {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob058594100O1pxR100px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = false;
        TypeSpecificSkin.imgRequestType.src = "purchase_order_in_details.png";
      }
      break;
    case 'WORKORDER':
      if (userPriority == 'WORKORDER') {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob0284b5100OBorR100px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = true;
        TypeSpecificSkin.imgRequestType.src = "work_orde_in_list.png";
      } else {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob0284B5100OBor1pxR100px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = false;
        TypeSpecificSkin.imgRequestType.src = "work_order_details.png";
      }
      break;
    case 'PURCHASEREQUISITION':
      if (userPriority == 'PURCHASEREQUISITION') {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob4186D1100OR100";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = true;
        TypeSpecificSkin.imgRequestType.src = "purchase_request_in_list.png";
      } else {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob4186D1100OBor1pxR100px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = false;
        TypeSpecificSkin.imgRequestType.src = "purchase_request_in_detail.png";
      }
      break;
    default:
      if (userPriority == Type) {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob7986CB100OR100";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = true;
        TypeSpecificSkin.imgRequestType.src = "default_title.png";
      } else {
        TypeSpecificSkin.flxRequestType.skin = "sknFlxMob0OBor12A1E61px";
        TypeSpecificSkin.lblRequestType.skin = "sknLblMob8895DB100OFS22px";
        TypeSpecificSkin.lblRequestType.isVisible = false;
        TypeSpecificSkin.imgRequestType.src = "default_item.png";
      }
  }
  kony.print("--end kony.apps.coe.ess.Approvals.frmSettings.retriveTypeUi --");
  return TypeSpecificSkin;
};
kony.apps.coe.ess.Approvals.frmSettings.resetData = function() {
  frmSettings.flxPopUp.isVisible=false;
  if (kony.sync.isSessionInProgress) {
    handleError("Session is in Progress");
  } else {
    kony.apps.coe.ess.frmLogin.manualSyncOnClick(this.resetLocalDB, this.resetLocalDB);
  }
};
/**
 * reset the Data after User Selects the Reset Option.
 */
kony.apps.coe.ess.Approvals.frmSettings.resetLocalDB = function() {
  kony.print("Start --kony.apps.coe.ess.Approvals.frmSettings.resetLocalDB");
  kony.application.showLoadingScreen("", "Resetting the Data", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.apps.coe.ess.Sync.resetSyncDb(resetLocalDBSucess, resetLocalDBError);

  function resetLocalDBSucess() {
    kony.application.showLoadingScreen("", "Syncing the Data", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    kony.apps.coe.ess.Sync.doDownload = true;
    kony.apps.coe.ess.Sync.startSyncSession(syncSessionSuccess, syncSessionFailure);

    function syncSessionSuccess() {
      kony.application.showLoadingScreen("", "syncing the Data", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
      var navigateLandingPage=function(){ 
        var formController;
        if(kony.apps.coe.ess.globalVariables.isNativeTablet == true) {
          formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabDashboard");
        } else {
          formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
        }
        formController.loadDataAndShowForm();
      }
      kony.apps.coe.ess.globalVariables.updateEmployeeID(navigateLandingPage);
    }
    function syncSessionFailure(error) {
      kony.print(JSON.stringify(error));
    }
  }

  function resetLocalDBError(error) {
    kony.print(JSON.stringify(error));
  }
  kony.print("End--kony.apps.coe.ess.Approvals.frmSettings.resetLocalDB");
};
/** Settings Screen Functionality
 * @author Dharma Teja Reddy K (KH2134)
 *          dharmateja.kasa@kony.com
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.settings = {
  settingsInstanceObject : null,
  /**
   * Returns Settings Object. 
   */
  getSettingsObject : function() {
    if(this.settingsInstanceObject === null) 
      this.settingsInstanceObject = new Settings();
    return this.settingsInstanceObject;
  },
  destorySettingsObject : function() {
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
    if(isEnabled) {
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
Settings.prototype.togglePushNotificationsStatus = function () {
  kony.print("Start -- Settings.prototype.togglePushNotificationsStatus");
  try {
    kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.common.settings.applyChanges"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    var isEnabled = kony.apps.coe.ess.KMS.isPushNotificationEnabled();
    if (isEnabled) {
      var success = function () {
        var iconToSet = this.OFF_ICON;
        frmSettings.imgPushNotification.src = iconToSet;
        kony.application.dismissLoadingScreen();
      };
      var failure = function () {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.common.errorOnDisableNotifications"), 3000);
        kony.application.dismissLoadingScreen();
      };
      kony.apps.coe.ess.KMS.disablePushNotifications(success.bind(this), failure);

    } else {
      var success = function () {
        var iconToSet = this.ON_ICON
        frmSettings.imgPushNotification.src = iconToSet;
        kony.application.dismissLoadingScreen();
      };
      var failure = function () {
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
 * PreShow Of Settings Screen Tablet
 */
Settings.prototype.preShowSettingsTab = function() {
  kony.print("----Start preShowSettingsTab ---------");
  var isEnabled = kony.apps.coe.ess.KMS.isPushNotificationEnabled();
  if(isEnabled) {
    frmSettings.imgToggleButton.src = "on.png";
  } else {
    frmSettings.imgToggleButton.src = "off.png";
  }
  //kony.apps.ess.Hamburger.prototype.hideHamburger();
  var WidgetsArray=["flxRequestType","lblRequestType","imgRequestType"];
  kony.apps.coe.ess.globalVariables.SettingsSegments=new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR,{},3,flxTemplateSettingsCell,kony.apps.coe.ess.Approvals.frmSettings.onClick,WidgetsArray);
  frmSettings.flxDynamicSegment.add(kony.apps.coe.ess.globalVariables.SettingsSegments.getDynamicSegment());
  var query = "SELECT request_type.id, request_type.name FROM request_type";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(response) {
    var processedData = kony.apps.coe.ess.Approvals.frmSettings.ProcessData(response);
    kony.apps.coe.ess.globalVariables.SettingsSegments.setData(processedData);
  }, function(err) {
    handleError(err);
  });
  kony.print("----End preShowSettingsTab ---------");
};

/**
 *  @ Author  : Vaishali Kammeta
 *  @ Desc : changing application locale en,fr_BE and nl_BE
 */
Settings.prototype.languageSelection = function(src1,src2,src3,Sellocale){
  //set the selected language to all forms
  kony.i18n.setCurrentLocaleAsync(Sellocale,kony.apps.coe.ess.settings.getSettingsObject().destroyForms,kony.apps.coe.ess.settings.getSettingsObject().failureCallBack, null);
  //store the language selected in device storage
  kony.store.setItem("localeToBeSet",Sellocale);  
  frmSettings.imgEnglish.src = src1;
  frmSettings.imgFrench.src = src2;
  frmSettings.imgNederlands.src = src3;
};

/**
 * To destroy all the forms to refresh the locale when navigated to the screen
 */
Settings.prototype.destroyForms = function(){
  try{
    frmApprovalHome.destroy();
    frmApprovalRequestDetail.destroy();
    frmAudit.destroy();
    frmAuditTrail.destroy();
    frmDelegationRequestCreate.destroy();
    frmDelegationRequestDetails.destroy();
    frmDelegationRequestList.destroy();
    frmEmployeeLookUp.destroy();
    frmFullDetails.destroy();
    frmHamburger.destroy();
    frmIsLaterSearch.destroy();
    frmLogin.destroy();
    frmMultiSelection.destroy();
    frmNotificationsList.destroy();
    frmPdfReader.destroy();
    frmRequestedList.destroy();
    frmSearch.destroy();
    frmSelect.destroy();
    frmStartUp.destroy();
    frmSettings.lblHeader.text = kony.i18n.getLocalizedString("i18n.ess.common.Settings");
    frmSettings.lblShowFirst.text = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.frmSettings.lblShowFirst");
    frmSettings.lblPushNotification.text = kony.i18n.getLocalizedString("18n.ess.MyApprovals.frmSettings.lblPushNotification.text");
    frmSettings.lblLocalDBReset.text = kony.i18n.getLocalizedString("i18n.ess.common.settings.resetDBText");
    frmSettings.btnReset.text = kony.i18n.getLocalizedString("i18n.ess.common.settings.reset");
    frmSettings.lblSelectLang.text = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.frmSettings.SelectLang");
  	frmSettings.lblSyncDate.text =formatDate(kony.apps.coe.ess.globalVariables.lastSyncDate);
  }catch(e){
    kony.print("error"+e);
  }

};

/*
 * faliure in Setting of locale
 */
Settings.prototype.failureCallBack = function(errCode,errMsg){
  kony.print("Error in setting locale");
};

Settings.prototype.setLanginPostShow = function(){
  var selecLang = kony.store.getItem("localeToBeSet");
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
