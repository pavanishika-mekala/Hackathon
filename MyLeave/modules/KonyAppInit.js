kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {

  try {
	if(  kony.apps.coe.ess.globalVariables.isNativeTablet === false && kony.apps.coe.ess.globalVariables.isWebDesktop === false) {
		var frmPendingLeaveRequestModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPendingLeaveRequestConfig);
		var frmPendingLeaveRequestControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPendingLeaveRequestController", appContext, frmPendingLeaveRequestModelConfigObj);
		var frmPendingLeaveRequestControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPendingLeaveRequestControllerExtension", frmPendingLeaveRequestControllerObj);
		frmPendingLeaveRequestControllerObj.setControllerExtensionObject(frmPendingLeaveRequestControllerExtObj);
		var frmPendingLeaveRequestFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPendingLeaveRequestFormModel", frmPendingLeaveRequestControllerObj);
		var frmPendingLeaveRequestFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPendingLeaveRequestFormModelExtension", frmPendingLeaveRequestFormModelObj);
		frmPendingLeaveRequestFormModelObj.setFormModelExtensionObj(frmPendingLeaveRequestFormModelExtObj);
		appContext.setFormController("frmPendingLeaveRequest", frmPendingLeaveRequestControllerObj);


		var frmSearchLeaveTypeModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchLeaveTypeConfig);
		var frmSearchLeaveTypeControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchLeaveTypeController", appContext, frmSearchLeaveTypeModelConfigObj);
		var frmSearchLeaveTypeControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchLeaveTypeControllerExtension", frmSearchLeaveTypeControllerObj);
		frmSearchLeaveTypeControllerObj.setControllerExtensionObject(frmSearchLeaveTypeControllerExtObj);
		var frmSearchLeaveTypeFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchLeaveTypeFormModel", frmSearchLeaveTypeControllerObj);
		var frmSearchLeaveTypeFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchLeaveTypeFormModelExtension", frmSearchLeaveTypeFormModelObj);
		frmSearchLeaveTypeFormModelObj.setFormModelExtensionObj(frmSearchLeaveTypeFormModelExtObj);
		appContext.setFormController("frmSearchLeaveType", frmSearchLeaveTypeControllerObj);

		var frmStatusSearchModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmStatusSearchConfig);
		var frmStatusSearchControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmStatusSearchController", appContext, frmStatusSearchModelConfigObj);
		var frmStatusSearchControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmStatusSearchControllerExtension", frmStatusSearchControllerObj);
		frmStatusSearchControllerObj.setControllerExtensionObject(frmStatusSearchControllerExtObj);
		var frmStatusSearchFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmStatusSearchFormModel", frmStatusSearchControllerObj);
		var frmStatusSearchFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmStatusSearchFormModelExtension", frmStatusSearchFormModelObj);
		frmStatusSearchFormModelObj.setFormModelExtensionObj(frmStatusSearchFormModelExtObj);
		appContext.setFormController("frmStatusSearch", frmStatusSearchControllerObj);

		var frmHolidaysModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmHolidaysConfig);
		var frmHolidaysControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmHolidaysController", appContext, frmHolidaysModelConfigObj);
		var frmHolidaysControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmHolidaysControllerExtension", frmHolidaysControllerObj);
		frmHolidaysControllerObj.setControllerExtensionObject(frmHolidaysControllerExtObj);
		var frmHolidaysFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmHolidaysFormModel", frmHolidaysControllerObj);
		var frmHolidaysFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmHolidaysFormModelExtension", frmHolidaysFormModelObj);
		frmHolidaysFormModelObj.setFormModelExtensionObj(frmHolidaysFormModelExtObj);
		appContext.setFormController("frmHolidays", frmHolidaysControllerObj);

		var frmLeaveHomeModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmLeaveHomeConfig);
		var frmLeaveHomeControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmLeaveHomeController", appContext, frmLeaveHomeModelConfigObj);
		var frmLeaveHomeControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmLeaveHomeControllerExtension", frmLeaveHomeControllerObj);
		frmLeaveHomeControllerObj.setControllerExtensionObject(frmLeaveHomeControllerExtObj);
		var frmLeaveHomeFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmLeaveHomeFormModel", frmLeaveHomeControllerObj);
		var frmLeaveHomeFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmLeaveHomeFormModelExtension", frmLeaveHomeFormModelObj);
		frmLeaveHomeFormModelObj.setFormModelExtensionObj(frmLeaveHomeFormModelExtObj);
		appContext.setFormController("frmLeaveHome", frmLeaveHomeControllerObj);

		var frmApplyLeaveModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmApplyLeaveConfig);
		var frmApplyLeaveControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmApplyLeaveController", appContext, frmApplyLeaveModelConfigObj);
		var frmApplyLeaveControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmApplyLeaveControllerExtension", frmApplyLeaveControllerObj);
		frmApplyLeaveControllerObj.setControllerExtensionObject(frmApplyLeaveControllerExtObj);
		var frmApplyLeaveFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmApplyLeaveFormModel", frmApplyLeaveControllerObj);
		var frmApplyLeaveFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmApplyLeaveFormModelExtension", frmApplyLeaveFormModelObj);
		frmApplyLeaveFormModelObj.setFormModelExtensionObj(frmApplyLeaveFormModelExtObj);
		appContext.setFormController("frmApplyLeave", frmApplyLeaveControllerObj);



		var frmLeaveRequestDetailsModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmLeaveRequestDetailsConfig);
		var frmLeaveRequestDetailsControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmLeaveRequestDetailsController", appContext, frmLeaveRequestDetailsModelConfigObj);
		var frmLeaveRequestDetailsControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmLeaveRequestDetailsControllerExtension", frmLeaveRequestDetailsControllerObj);
		frmLeaveRequestDetailsControllerObj.setControllerExtensionObject(frmLeaveRequestDetailsControllerExtObj);
		var frmLeaveRequestDetailsFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmLeaveRequestDetailsFormModel", frmLeaveRequestDetailsControllerObj);
		var frmLeaveRequestDetailsFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmLeaveRequestDetailsFormModelExtension", frmLeaveRequestDetailsFormModelObj);
		frmLeaveRequestDetailsFormModelObj.setFormModelExtensionObj(frmLeaveRequestDetailsFormModelExtObj);
		appContext.setFormController("frmLeaveRequestDetails", frmLeaveRequestDetailsControllerObj);

		var frmLeaveWalletModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmLeaveWalletConfig);
		var frmLeaveWalletControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmLeaveWalletController", appContext, frmLeaveWalletModelConfigObj);
		var frmLeaveWalletControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmLeaveWalletControllerExtension", frmLeaveWalletControllerObj);
		frmLeaveWalletControllerObj.setControllerExtensionObject(frmLeaveWalletControllerExtObj);
		var frmLeaveWalletFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmLeaveWalletFormModel", frmLeaveWalletControllerObj);
		var frmLeaveWalletFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmLeaveWalletFormModelExtension", frmLeaveWalletFormModelObj);
		frmLeaveWalletFormModelObj.setFormModelExtensionObj(frmLeaveWalletFormModelExtObj);
		appContext.setFormController("frmLeaveWallet", frmLeaveWalletControllerObj);

		var frmSearchLogModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchLogConfig);
		var frmSearchLogControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchLogController", appContext, frmSearchLogModelConfigObj);
		var frmSearchLogControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchLogControllerExtension", frmSearchLogControllerObj);
		frmSearchLogControllerObj.setControllerExtensionObject(frmSearchLogControllerExtObj);
		var frmSearchLogFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchLogFormModel", frmSearchLogControllerObj);
		var frmSearchLogFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchLogFormModelExtension", frmSearchLogFormModelObj);
		frmSearchLogFormModelObj.setFormModelExtensionObj(frmSearchLogFormModelExtObj);
		appContext.setFormController("frmSearchLog", frmSearchLogControllerObj);

		var frmTeamViewModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTeamViewConfig);
		var frmTeamViewControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTeamViewController", appContext, frmTeamViewModelConfigObj);
		var frmTeamViewControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTeamViewControllerExtension", frmTeamViewControllerObj);
		frmTeamViewControllerObj.setControllerExtensionObject(frmTeamViewControllerExtObj);
		var frmTeamViewFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTeamViewFormModel", frmTeamViewControllerObj);
		var frmTeamViewFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTeamViewFormModelExtension", frmTeamViewFormModelObj);
		frmTeamViewFormModelObj.setFormModelExtensionObj(frmTeamViewFormModelExtObj);
		appContext.setFormController("frmTeamView", frmTeamViewControllerObj);

		var frmAuditTrailModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAuditTrailConfig);
		var frmAuditTrailControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAuditTrailController", appContext, frmAuditTrailModelConfigObj);
		var frmAuditTrailControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAuditTrailControllerExtension", frmAuditTrailControllerObj);
		frmAuditTrailControllerObj.setControllerExtensionObject(frmAuditTrailControllerExtObj);
		var frmAuditTrailFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAuditTrailFormModel", frmAuditTrailControllerObj);
		var frmAuditTrailFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAuditTrailFormModelExtension", frmAuditTrailFormModelObj);
		frmAuditTrailFormModelObj.setFormModelExtensionObj(frmAuditTrailFormModelExtObj);
		appContext.setFormController("frmAuditTrail", frmAuditTrailControllerObj);

		var frmNotificationsListModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNotificationsListConfig);
		var frmNotificationsListControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNotificationsListController", appContext, frmNotificationsListModelConfigObj);
		var frmNotificationsListControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNotificationsListControllerExtension", frmNotificationsListControllerObj);
		frmNotificationsListControllerObj.setControllerExtensionObject(frmNotificationsListControllerExtObj);
		var frmNotificationsListFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNotificationsListFormModel", frmNotificationsListControllerObj);
		var frmNotificationsListFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNotificationsListFormModelExtension", frmNotificationsListFormModelObj);
		frmNotificationsListFormModelObj.setFormModelExtensionObj(frmNotificationsListFormModelExtObj);
		appContext.setFormController("frmNotificationsList", frmNotificationsListControllerObj);
		
	}else if(kony.apps.coe.ess.globalVariables.isWebDesktop === true){
		var frmLeaveDashboardDWModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmLeaveDashboardDWConfig);
        var frmLeaveDashboardDWControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmLeaveDashboardDWController", appContext, frmLeaveDashboardDWModelConfigObj);
        var frmLeaveDashboardDWControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmLeaveDashboardDWControllerExtension", frmLeaveDashboardDWControllerObj);
        frmLeaveDashboardDWControllerObj.setControllerExtensionObject(frmLeaveDashboardDWControllerExtObj);
        var frmLeaveDashboardDWFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmLeaveDashboardDWFormModel", frmLeaveDashboardDWControllerObj);
        var frmLeaveDashboardDWFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmLeaveDashboardDWFormModelExtension", frmLeaveDashboardDWFormModelObj);
        frmLeaveDashboardDWFormModelObj.setFormModelExtensionObj(frmLeaveDashboardDWFormModelExtObj);
        appContext.setFormController("frmLeaveDashboardDW", frmLeaveDashboardDWControllerObj);

        var frmApplyLeaveDWModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmApplyLeaveDWConfig);
        var frmApplyLeaveDWControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmApplyLeaveDWController", appContext, frmApplyLeaveDWModelConfigObj);
        var frmApplyLeaveDWControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmApplyLeaveDWControllerExtension", frmApplyLeaveDWControllerObj);
        frmApplyLeaveDWControllerObj.setControllerExtensionObject(frmApplyLeaveDWControllerExtObj);
        var frmApplyLeaveDWFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmApplyLeaveDWFormModel", frmApplyLeaveDWControllerObj);
        var frmApplyLeaveDWFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmApplyLeaveDWFormModelExtension", frmApplyLeaveDWFormModelObj);
        frmApplyLeaveDWFormModelObj.setFormModelExtensionObj(frmApplyLeaveDWFormModelExtObj);
        appContext.setFormController("frmApplyLeaveDW", frmApplyLeaveDWControllerObj);

        var frmAllHolidaysAndEventsDWModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAllHolidaysAndEventsDWConfig);
        var frmAllHolidaysAndEventsDWControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAllHolidaysAndEventsDWController", appContext, frmAllHolidaysAndEventsDWModelConfigObj);
        var frmAllHolidaysAndEventsDWControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAllHolidaysAndEventsDWControllerExtension", frmAllHolidaysAndEventsDWControllerObj);
        frmAllHolidaysAndEventsDWControllerObj.setControllerExtensionObject(frmAllHolidaysAndEventsDWControllerExtObj);
        var frmAllHolidaysAndEventsDWFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAllHolidaysAndEventsDWFormModel", frmAllHolidaysAndEventsDWControllerObj);
        var frmAllHolidaysAndEventsDWFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAllHolidaysAndEventsDWFormModelExtension", frmAllHolidaysAndEventsDWFormModelObj);
        frmAllHolidaysAndEventsDWFormModelObj.setFormModelExtensionObj(frmAllHolidaysAndEventsDWFormModelExtObj);
        appContext.setFormController("frmAllHolidaysAndEventsDW", frmAllHolidaysAndEventsDWControllerObj);
        
		var frmCalendarTeamViewDWModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCalendarTeamViewDWConfig);
        var frmCalendarTeamViewDWControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCalendarTeamViewDWController", appContext, frmCalendarTeamViewDWModelConfigObj);
        var frmCalendarTeamViewDWControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCalendarTeamViewDWControllerExtension", frmCalendarTeamViewDWControllerObj);
        frmCalendarTeamViewDWControllerObj.setControllerExtensionObject(frmCalendarTeamViewDWControllerExtObj);
        var frmCalendarTeamViewDWFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCalendarTeamViewDWFormModel", frmCalendarTeamViewDWControllerObj);
        var frmCalendarTeamViewDWFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCalendarTeamViewDWFormModelExtension", frmCalendarTeamViewDWFormModelObj);
        frmCalendarTeamViewDWFormModelObj.setFormModelExtensionObj(frmCalendarTeamViewDWFormModelExtObj);
        appContext.setFormController("frmCalendarTeamViewDW", frmCalendarTeamViewDWControllerObj);
        var frmLeaveWalletDWModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmLeaveWalletDWConfig);
        var frmLeaveWalletDWControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmLeaveWalletDWController", appContext, frmLeaveWalletDWModelConfigObj);
        var frmLeaveWalletDWControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmLeaveWalletDWControllerExtension", frmLeaveWalletDWControllerObj);
        frmLeaveWalletDWControllerObj.setControllerExtensionObject(frmLeaveWalletDWControllerExtObj);
        var frmLeaveWalletDWFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmLeaveWalletDWFormModel", frmLeaveWalletDWControllerObj);
        var frmLeaveWalletDWFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmLeaveWalletDWFormModelExtension", frmLeaveWalletDWFormModelObj);
        frmLeaveWalletDWFormModelObj.setFormModelExtensionObj(frmLeaveWalletDWFormModelExtObj);
        appContext.setFormController("frmLeaveWalletDW", frmLeaveWalletDWControllerObj);

        var frmHistoryLeaveRequestDWModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmHistoryLeaveRequestDWConfig);
        var frmHistoryLeaveRequestDWControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmHistoryLeaveRequestDWController", appContext, frmHistoryLeaveRequestDWModelConfigObj);
        var frmHistoryLeaveRequestDWControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmHistoryLeaveRequestDWControllerExtension", frmHistoryLeaveRequestDWControllerObj);
        frmHistoryLeaveRequestDWControllerObj.setControllerExtensionObject(frmHistoryLeaveRequestDWControllerExtObj);
        var frmHistoryLeaveRequestDWFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmHistoryLeaveRequestDWFormModel", frmHistoryLeaveRequestDWControllerObj);
        var frmHistoryLeaveRequestDWFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmHistoryLeaveRequestDWFormModelExtension", frmHistoryLeaveRequestDWFormModelObj);
        frmHistoryLeaveRequestDWFormModelObj.setFormModelExtensionObj(frmHistoryLeaveRequestDWFormModelExtObj);
        appContext.setFormController("frmHistoryLeaveRequestDW", frmHistoryLeaveRequestDWControllerObj);

		var frmPendingLeaveRequestsDWModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPendingLeaveRequestsDWConfig);
        var frmPendingLeaveRequestsDWControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPendingLeaveRequestsDWController", appContext, frmPendingLeaveRequestsDWModelConfigObj);
        var frmPendingLeaveRequestsDWControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPendingLeaveRequestsDWControllerExtension", frmPendingLeaveRequestsDWControllerObj);
        frmPendingLeaveRequestsDWControllerObj.setControllerExtensionObject(frmPendingLeaveRequestsDWControllerExtObj);
        var frmPendingLeaveRequestsDWFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPendingLeaveRequestsDWFormModel", frmPendingLeaveRequestsDWControllerObj);
        var frmPendingLeaveRequestsDWFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPendingLeaveRequestsDWFormModelExtension", frmPendingLeaveRequestsDWFormModelObj);
        frmPendingLeaveRequestsDWFormModelObj.setFormModelExtensionObj(frmPendingLeaveRequestsDWFormModelExtObj);
        appContext.setFormController("frmPendingLeaveRequestsDW", frmPendingLeaveRequestsDWControllerObj);


	}
    else if (kony.apps.coe.ess.globalVariables.isNativeTablet===true){
        var frmTabHolidayListModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTabHolidayListConfig);
        var frmTabHolidayListControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTabHolidayListController", appContext, frmTabHolidayListModelConfigObj);
        var frmTabHolidayListControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTabHolidayListControllerExtension", frmTabHolidayListControllerObj);
        frmTabHolidayListControllerObj.setControllerExtensionObject(frmTabHolidayListControllerExtObj);
        var frmTabHolidayListFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTabHolidayListFormModel", frmTabHolidayListControllerObj);
        var frmTabHolidayListFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTabHolidayListFormModelExtension", frmTabHolidayListFormModelObj);
        frmTabHolidayListFormModelObj.setFormModelExtensionObj(frmTabHolidayListFormModelExtObj);
        appContext.setFormController("frmTabHolidayList", frmTabHolidayListControllerObj);
      
        var frmLeaveWalletTabModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmLeaveWalletTabConfig);
        var frmLeaveWalletTabControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmLeaveWalletTabController", appContext, frmLeaveWalletTabModelConfigObj);
        var frmLeaveWalletTabControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmLeaveWalletTabControllerExtension", frmLeaveWalletTabControllerObj);
        frmLeaveWalletTabControllerObj.setControllerExtensionObject(frmLeaveWalletTabControllerExtObj);
        var frmLeaveWalletTabFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmLeaveWalletTabFormModel", frmLeaveWalletTabControllerObj);
        var frmLeaveWalletTabFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmLeaveWalletTabFormModelExtension", frmLeaveWalletTabFormModelObj);
        frmLeaveWalletTabFormModelObj.setFormModelExtensionObj(frmLeaveWalletTabFormModelExtObj);
        appContext.setFormController("frmLeaveWalletTab", frmLeaveWalletTabControllerObj);
      
        var frmTabLeaveDashboardModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTabLeaveDashboardConfig);
        var frmTabLeaveDashboardControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTabLeaveDashboardController", appContext, frmTabLeaveDashboardModelConfigObj);
        var frmTabLeaveDashboardControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTabLeaveDashboardControllerExtension", frmTabLeaveDashboardControllerObj);
        frmTabLeaveDashboardControllerObj.setControllerExtensionObject(frmTabLeaveDashboardControllerExtObj);
        var frmTabLeaveDashboardFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTabLeaveDashboardFormModel", frmTabLeaveDashboardControllerObj);
        var frmTabLeaveDashboardFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTabLeaveDashboardFormModelExtension", frmTabLeaveDashboardFormModelObj);
        frmTabLeaveDashboardFormModelObj.setFormModelExtensionObj(frmTabLeaveDashboardFormModelExtObj);
        appContext.setFormController("frmTabLeaveDashboard", frmTabLeaveDashboardControllerObj);
      
		var frmHistoryModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmHistoryConfig);
        var frmHistoryControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmHistoryController", appContext, frmHistoryModelConfigObj);
        var frmHistoryControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmHistoryControllerExtension", frmHistoryControllerObj);
        frmHistoryControllerObj.setControllerExtensionObject(frmHistoryControllerExtObj);
        var frmHistoryFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmHistoryFormModel", frmHistoryControllerObj);
        var frmHistoryFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmHistoryFormModelExtension", frmHistoryFormModelObj);
        frmHistoryFormModelObj.setFormModelExtensionObj(frmHistoryFormModelExtObj);
        appContext.setFormController("frmHistory", frmHistoryControllerObj);
      
		var frmTabApplyLeaveModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTabApplyLeaveConfig);
        var frmTabApplyLeaveControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTabApplyLeaveController", appContext, frmTabApplyLeaveModelConfigObj);
        var frmTabApplyLeaveControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTabApplyLeaveControllerExtension", frmTabApplyLeaveControllerObj);
        frmTabApplyLeaveControllerObj.setControllerExtensionObject(frmTabApplyLeaveControllerExtObj);
        var frmTabApplyLeaveFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTabApplyLeaveFormModel", frmTabApplyLeaveControllerObj);
        var frmTabApplyLeaveFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTabApplyLeaveFormModelExtension", frmTabApplyLeaveFormModelObj);
        frmTabApplyLeaveFormModelObj.setFormModelExtensionObj(frmTabApplyLeaveFormModelExtObj);
        appContext.setFormController("frmTabApplyLeave", frmTabApplyLeaveControllerObj);
		
		var frmTabPendingListModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTabPendingListConfig);
        var frmTabPendingListControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTabPendingListController", appContext, frmTabPendingListModelConfigObj);
        var frmTabPendingListControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTabPendingListControllerExtension", frmTabPendingListControllerObj);
        frmTabPendingListControllerObj.setControllerExtensionObject(frmTabPendingListControllerExtObj);
        var frmTabPendingListFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTabPendingListFormModel", frmTabPendingListControllerObj);
        var frmTabPendingListFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTabPendingListFormModelExtension", frmTabPendingListFormModelObj);
        frmTabPendingListFormModelObj.setFormModelExtensionObj(frmTabPendingListFormModelExtObj);
        appContext.setFormController("frmTabPendingList", frmTabPendingListControllerObj);
      	
      	var frmTeamLeaveCalendarModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTeamLeaveCalendarConfig);
        var frmTeamLeaveCalendarControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTeamLeaveCalendarController", appContext, frmTeamLeaveCalendarModelConfigObj);
        var frmTeamLeaveCalendarControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTeamLeaveCalendarControllerExtension", frmTeamLeaveCalendarControllerObj);
        frmTeamLeaveCalendarControllerObj.setControllerExtensionObject(frmTeamLeaveCalendarControllerExtObj);
        var frmTeamLeaveCalendarFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTeamLeaveCalendarFormModel", frmTeamLeaveCalendarControllerObj);
        var frmTeamLeaveCalendarFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTeamLeaveCalendarFormModelExtension", frmTeamLeaveCalendarFormModelObj);
        frmTeamLeaveCalendarFormModelObj.setFormModelExtensionObj(frmTeamLeaveCalendarFormModelExtObj);
        appContext.setFormController("frmTeamLeaveCalendar", frmTeamLeaveCalendarControllerObj);
    }
  } catch (err) {
    var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
    kony.sdk.mvvm.log.error(exception.toString());
    alert(exception.toString());
    throw exception;
  }

};


function showAuditTrailForm() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmAuditTrail");
  formController.loadDataAndShowForm();
}

function showNotificationsListForm() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmNotificationsList");
  formController.loadDataAndShowForm();
}

function showTabHolidayListForm(){
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabHolidayList");
  formController.loadDataAndShowForm();
}


function showLeaveWalletTabForm() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveWalletTab");
  formController.loadDataAndShowForm();
}


function showTabLeaveDashboardForm(){

  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabLeaveDashboard");
  formController.loadDataAndShowForm();
}

function showTabHistoryForm(){
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmHistory");
  formController.loadDataAndShowForm();
}
	
function showTabApplyLeaveForm(){
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabApplyLeave");
  formController.loadDataAndShowForm();
}

function showTabPendingListForm(data){
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabPendingList");
  formController.loadDataAndShowForm(data);
}
function showTeamLeaveCalendarForm(){
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTeamLeaveCalendar");
  formController.loadDataAndShowForm();
}