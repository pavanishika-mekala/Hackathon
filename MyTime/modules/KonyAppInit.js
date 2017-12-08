kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
  try {

    if( kony.apps.coe.ess.globalVariables.isNativeTablet === false ){
      /**
			 * frmTimesheetHome
			 */
      var frmTimesheetHomeModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimesheetHomeConfig);
      var frmTimesheetHomeControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimesheetHomeController", appContext, frmTimesheetHomeModelConfigObj);
      var frmTimesheetHomeControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimesheetHomeControllerExtension", frmTimesheetHomeControllerObj);
      frmTimesheetHomeControllerObj.setControllerExtensionObject(frmTimesheetHomeControllerExtObj);
      var frmTimesheetHomeFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimesheetHomeFormModel", frmTimesheetHomeControllerObj);
      var frmTimesheetHomeFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimesheetHomeFormModelExtension", frmTimesheetHomeFormModelObj);
      frmTimesheetHomeFormModelObj.setFormModelExtensionObj(frmTimesheetHomeFormModelExtObj);
      appContext.setFormController("frmTimesheetHome", frmTimesheetHomeControllerObj);


      var frmTimeSheetCreateModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimeSheetCreateConfig);
      var frmTimeSheetCreateControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimeSheetCreateController", appContext, frmTimeSheetCreateModelConfigObj);
      var frmTimeSheetCreateControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimeSheetCreateControllerExtension", frmTimeSheetCreateControllerObj);
      frmTimeSheetCreateControllerObj.setControllerExtensionObject(frmTimeSheetCreateControllerExtObj);
      var frmTimeSheetCreateFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimeSheetCreateFormModel", frmTimeSheetCreateControllerObj);
      var frmTimeSheetCreateFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimeSheetCreateFormModelExtension", frmTimeSheetCreateFormModelObj);
      frmTimeSheetCreateFormModelObj.setFormModelExtensionObj(frmTimeSheetCreateFormModelExtObj);
      appContext.setFormController("frmTimeSheetCreate", frmTimeSheetCreateControllerObj);


      var frmViewTimeSheetModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmViewTimeSheetConfig);
      var frmViewTimeSheetControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmViewTimeSheetController", appContext, frmViewTimeSheetModelConfigObj);
      var frmViewTimeSheetControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmViewTimeSheetControllerExtension", frmViewTimeSheetControllerObj);
      frmViewTimeSheetControllerObj.setControllerExtensionObject(frmViewTimeSheetControllerExtObj);
      var frmViewTimeSheetFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmViewTimeSheetFormModel", frmViewTimeSheetControllerObj);
      var frmViewTimeSheetFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmViewTimeSheetFormModelExtension", frmViewTimeSheetFormModelObj);
      frmViewTimeSheetFormModelObj.setFormModelExtensionObj(frmViewTimeSheetFormModelExtObj);
      appContext.setFormController("frmViewTimeSheet", frmViewTimeSheetControllerObj);

      var frmTimesheetReviewModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimesheetReviewConfig);
      var frmTimesheetReviewControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimesheetReviewController", appContext, frmTimesheetReviewModelConfigObj);
      var frmTimesheetReviewControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimesheetReviewControllerExtension", frmTimesheetReviewControllerObj);
      frmTimesheetReviewControllerObj.setControllerExtensionObject(frmTimesheetReviewControllerExtObj);
      var frmTimesheetReviewFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimesheetReviewFormModel", frmTimesheetReviewControllerObj);
      var frmTimesheetReviewFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimesheetReviewFormModelExtension", frmTimesheetReviewFormModelObj);
      frmTimesheetReviewFormModelObj.setFormModelExtensionObj(frmTimesheetReviewFormModelExtObj);
      appContext.setFormController("frmTimesheetReview", frmTimesheetReviewControllerObj);

      var frmTimesheetHistoryModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimesheetHistoryConfig);
      var frmTimesheetHistoryControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimesheetHistoryController", appContext, frmTimesheetHistoryModelConfigObj);
      var frmTimesheetHistoryControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimesheetHistoryControllerExtension", frmTimesheetHistoryControllerObj);
      frmTimesheetHistoryControllerObj.setControllerExtensionObject(frmTimesheetHistoryControllerExtObj);
      var frmTimesheetHistoryFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimesheetHistoryFormModel", frmTimesheetHistoryControllerObj);
      var frmTimesheetHistoryFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimesheetHistoryFormModelExtension", frmTimesheetHistoryFormModelObj);
      frmTimesheetHistoryFormModelObj.setFormModelExtensionObj(frmTimesheetHistoryFormModelExtObj);
      appContext.setFormController("frmTimesheetHistory", frmTimesheetHistoryControllerObj);

      var frmSearchStatusModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchStatusConfig);
      var frmSearchStatusControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchStatusController", appContext, frmSearchStatusModelConfigObj);
      var frmSearchStatusControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchStatusControllerExtension", frmSearchStatusControllerObj);
      frmSearchStatusControllerObj.setControllerExtensionObject(frmSearchStatusControllerExtObj);
      var frmSearchStatusFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchStatusFormModel", frmSearchStatusControllerObj);
      var frmSearchStatusFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchStatusFormModelExtension", frmSearchStatusFormModelObj);
      frmSearchStatusFormModelObj.setFormModelExtensionObj(frmSearchStatusFormModelExtObj);
      appContext.setFormController("frmSearchStatus", frmSearchStatusControllerObj);

      var frmAuditTrailModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAuditTrailConfig);
      var frmAuditTrailControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAuditTrailController", appContext, frmAuditTrailModelConfigObj);
      var frmAuditTrailControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAuditTrailControllerExtension", frmAuditTrailControllerObj);
      frmAuditTrailControllerObj.setControllerExtensionObject(frmAuditTrailControllerExtObj);
      var frmAuditTrailFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAuditTrailFormModel", frmAuditTrailControllerObj);
      var frmAuditTrailFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAuditTrailFormModelExtension", frmAuditTrailFormModelObj);
      frmAuditTrailFormModelObj.setFormModelExtensionObj(frmAuditTrailFormModelExtObj);
      appContext.setFormController("frmAuditTrail", frmAuditTrailControllerObj);

      var frmRecentTasksModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmRecentTasksConfig);
      var frmRecentTasksControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmRecentTasksController", appContext, frmRecentTasksModelConfigObj);
      var frmRecentTasksControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmRecentTasksControllerExtension", frmRecentTasksControllerObj);
      frmRecentTasksControllerObj.setControllerExtensionObject(frmRecentTasksControllerExtObj);
      var frmRecentTasksFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmRecentTasksFormModel", frmRecentTasksControllerObj);
      var frmRecentTasksFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmRecentTasksFormModelExtension", frmRecentTasksFormModelObj);
      frmRecentTasksFormModelObj.setFormModelExtensionObj(frmRecentTasksFormModelExtObj);
      appContext.setFormController("frmRecentTasks", frmRecentTasksControllerObj);

      var frmTaskListModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTaskListConfig);
      var frmTaskListControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTaskListController", appContext, frmTaskListModelConfigObj);
      var frmTaskListControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTaskListControllerExtension", frmTaskListControllerObj);
      frmTaskListControllerObj.setControllerExtensionObject(frmTaskListControllerExtObj);
      var frmTaskListFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTaskListFormModel", frmTaskListControllerObj);
      var frmTaskListFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTaskListFormModelExtension", frmTaskListFormModelObj);
      frmTaskListFormModelObj.setFormModelExtensionObj(frmTaskListFormModelExtObj);
      appContext.setFormController("frmTaskList", frmTaskListControllerObj);

      var frmNotificationsListModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNotificationsListConfig);
      var frmNotificationsListControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNotificationsListController", appContext, frmNotificationsListModelConfigObj);
      var frmNotificationsListControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNotificationsListControllerExtension", frmNotificationsListControllerObj);
      frmNotificationsListControllerObj.setControllerExtensionObject(frmNotificationsListControllerExtObj);
      var frmNotificationsListFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNotificationsListFormModel", frmNotificationsListControllerObj);
      var frmNotificationsListFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNotificationsListFormModelExtension", frmNotificationsListFormModelObj);
      frmNotificationsListFormModelObj.setFormModelExtensionObj(frmNotificationsListFormModelExtObj);
      appContext.setFormController("frmNotificationsList", frmNotificationsListControllerObj);	
    }else{
      var frmTimeSheetCreateTabModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimeSheetCreateTabConfig);
      var frmTimeSheetCreateTabControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimeSheetCreateTabController", appContext, frmTimeSheetCreateTabModelConfigObj);
      var frmTimeSheetCreateTabControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimeSheetCreateTabControllerExtension", frmTimeSheetCreateTabControllerObj);
      frmTimeSheetCreateTabControllerObj.setControllerExtensionObject(frmTimeSheetCreateTabControllerExtObj);
      var frmTimeSheetCreateTabFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimeSheetCreateTabFormModel", frmTimeSheetCreateTabControllerObj);
      var frmTimeSheetCreateTabFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimeSheetCreateTabFormModelExtension", frmTimeSheetCreateTabFormModelObj);
      frmTimeSheetCreateTabFormModelObj.setFormModelExtensionObj(frmTimeSheetCreateTabFormModelExtObj);
      appContext.setFormController("frmTimeSheetCreateTab", frmTimeSheetCreateTabControllerObj);

      var frmListViewModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmListViewConfig);
      var frmListViewControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmListViewController", appContext, frmListViewModelConfigObj);
      var frmListViewControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmListViewControllerExtension", frmListViewControllerObj);
      frmListViewControllerObj.setControllerExtensionObject(frmListViewControllerExtObj);
      var frmListViewFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmListViewFormModel", frmListViewControllerObj);
      var frmListViewFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmListViewFormModelExtension", frmListViewFormModelObj);
      frmListViewFormModelObj.setFormModelExtensionObj(frmListViewFormModelExtObj);
      appContext.setFormController("frmListView", frmListViewControllerObj);

      var frmCalendarViewModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCalendarViewConfig);
      var frmCalendarViewControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCalendarViewController", appContext, frmCalendarViewModelConfigObj);
      var frmCalendarViewControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCalendarViewControllerExtension", frmCalendarViewControllerObj);
      frmCalendarViewControllerObj.setControllerExtensionObject(frmCalendarViewControllerExtObj);
      var frmCalendarViewFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCalendarViewFormModel", frmCalendarViewControllerObj);
      var frmCalendarViewFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCalendarViewFormModelExtension", frmCalendarViewFormModelObj);
      frmCalendarViewFormModelObj.setFormModelExtensionObj(frmCalendarViewFormModelExtObj);
      appContext.setFormController("frmCalendarView", frmCalendarViewControllerObj);


      var frmAuditTrailModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAuditTrailConfig);
      var frmAuditTrailControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAuditTrailController", appContext, frmAuditTrailModelConfigObj);
      var frmAuditTrailControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAuditTrailControllerExtension", frmAuditTrailControllerObj);
      frmAuditTrailControllerObj.setControllerExtensionObject(frmAuditTrailControllerExtObj);
      var frmAuditTrailFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAuditTrailFormModel", frmAuditTrailControllerObj);
      var frmAuditTrailFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAuditTrailFormModelExtension", frmAuditTrailFormModelObj);
      frmAuditTrailFormModelObj.setFormModelExtensionObj(frmAuditTrailFormModelExtObj);
      appContext.setFormController("frmAuditTrail", frmAuditTrailControllerObj);
    }
  } catch (err) {
    var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
    kony.sdk.mvvm.log.error(exception.toString()); 
    alert("in the kony appinit"+exception.toString());
    throw exception;
  }
};

function showAuditTrailForm() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmAuditTrail");
  formController.loadDataAndShowForm();
}

function showTimesheetHomeForm(date) {
  if(date === null || date === undefined) {
    frmTimesheetHome.lblHeader.text="Timesheet";
    date = new Date();
  }
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTimesheetHome");
  formController.loadDataAndShowForm(date);
}

function refreshTimesheetHomeForm() {
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Refreshing Form");
  kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.invokeCallback();
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
}

function refreshAndShowTimesheetHomeForm() {
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
  kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.invokeCallback();
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmTimesheetHome.show();
}

function showTimesheetReviewForm(contextData) {
  if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
    (new kony.apps.coe.ess.myTime.CalendarViewUI()).loadDataReview(contextData);
  }else{
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTimesheetReview");
    formController.loadDataAndShowForm(contextData);
  }
}

showViewTimeSheetForm = function(date) {
  try{
    kony.print("-- Start showViewTimeSheetForm --");
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmViewTimeSheet");
    formController.loadDataAndShowForm(date);
    kony.print("-- End showViewTimeSheetForm --");
  }
  catch(e)
  {
    alert(JSON.stringify(e));
  }
};

function showTimesheetCreateForm(contextdata) {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTimeSheetCreate");
  formController.loadDataAndShowForm(contextdata);
}

function showTimesheetHistoryForm(contextdata) {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTimesheetHistory");
  formController.loadDataAndShowForm(contextdata);
}

function showTaskListForm() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTaskList");
  formController.loadDataAndShowForm();
}

function showSearchTaskListForm() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmRecentTasks");
  formController.loadDataAndShowForm();
}

function showNotificationsListForm() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmNotificationsList");
  formController.loadDataAndShowForm();
}

function showTimesheetCreateTab(date){
  if(date === null || date === undefined) {
    date = new Date();
  }
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTimeSheetCreateTab");
  formController.loadDataAndShowForm(date);
}

function refreshTimeSheetCreateTabForm(){
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Refreshing Form");
  kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObjTab.invokeCallback();
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
}

function refreshAndShowTimesheetCreateTabForm() {
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
  kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObjTab.invokeCallback();
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmTimeSheetCreateTab.show();
}

function showCreateViewForm(date) {
  if(date === null || date === undefined) {
    frmCreateView.lblFillTimesheets.text="Fill Timesheet";
    date = new Date();
  }
  frmCreateView.show();

}
function showCalendarViewForm(date) {
  if(date === null || date === undefined) {
    //  frmCreateView.lblFillTimesheets.text="Fill Timesheet";
    date = new Date();
  }
  (new kony.apps.coe.ess.myTime.CalendarViewUI()).onClickOfCalendarFlex(date);

}

function showCalendarFormInTab() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCalendarView");
  formController.loadDataAndShowForm();
}

function showListViewForm(contextData) {
  if(contextData === null || contextData === undefined) {
    contextData = new Date();
  } 
  frmListView.segViewDates.selectedRowIndex = [0, 0];
      kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().updateTimeSheetWithDuration(frmListView.segViewDates);
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmListView");
  formController.loadDataAndShowForm(contextData);

}
