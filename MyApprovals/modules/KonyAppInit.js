kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
    try {
        if ((kony.apps.coe.ess.globalVariables.isSPA === true || kony.apps.coe.ess.globalVariables.isNative === true)) {
            if (kony.apps.coe.ess.globalVariables.isNativeTablet === false) {
                var frmApprovalRequestDetailModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmApprovalRequestDetailConfig);
                var frmApprovalRequestDetailControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmApprovalRequestDetailController", appContext, frmApprovalRequestDetailModelConfigObj);
                var frmApprovalRequestDetailControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmApprovalRequestDetailControllerExtension", frmApprovalRequestDetailControllerObj);
                frmApprovalRequestDetailControllerObj.setControllerExtensionObject(frmApprovalRequestDetailControllerExtObj);
                var frmApprovalRequestDetailFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmApprovalRequestDetailFormModel", frmApprovalRequestDetailControllerObj);
                var frmApprovalRequestDetailFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmApprovalRequestDetailFormModelExtension", frmApprovalRequestDetailFormModelObj);
                frmApprovalRequestDetailFormModelObj.setFormModelExtensionObj(frmApprovalRequestDetailFormModelExtObj);
                appContext.setFormController("frmApprovalRequestDetail", frmApprovalRequestDetailControllerObj);

                var frmApprovalHomeModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmApprovalHomeConfig);
                var frmApprovalHomeControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmApprovalHomeController", appContext, frmApprovalHomeModelConfigObj);
                var frmApprovalHomeControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmApprovalHomeControllerExtension", frmApprovalHomeControllerObj);
                frmApprovalHomeControllerObj.setControllerExtensionObject(frmApprovalHomeControllerExtObj);
                var frmApprovalHomeFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmApprovalHomeFormModel", frmApprovalHomeControllerObj);
                var frmApprovalHomeFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmApprovalHomeFormModelExtension", frmApprovalHomeFormModelObj);
                frmApprovalHomeFormModelObj.setFormModelExtensionObj(frmApprovalHomeFormModelExtObj);
                appContext.setFormController("frmApprovalHome", frmApprovalHomeControllerObj);

                var frmRequestedListModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmRequestedListConfig);
                var frmRequestedListControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmRequestedListController", appContext, frmRequestedListModelConfigObj);
                var frmRequestedListControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmRequestedListControllerExtension", frmRequestedListControllerObj);
                frmRequestedListControllerObj.setControllerExtensionObject(frmRequestedListControllerExtObj);
                var frmRequestedListFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmRequestedListFormModel", frmRequestedListControllerObj);
                var frmRequestedListFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmRequestedListFormModelExtension", frmRequestedListFormModelObj);
                frmRequestedListFormModelObj.setFormModelExtensionObj(frmRequestedListFormModelExtObj);
                appContext.setFormController("frmRequestedList", frmRequestedListControllerObj);

                //added for full Details
                var frmFullDetailsModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmFullDetailsConfig);
                var frmFullDetailsControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmFullDetailsController", appContext, frmFullDetailsModelConfigObj);
                var frmFullDetailsControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmFullDetailsControllerExtension", frmFullDetailsControllerObj);
                frmFullDetailsControllerObj.setControllerExtensionObject(frmFullDetailsControllerExtObj);
                var frmFullDetailsFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmFullDetailsFormModel", frmFullDetailsControllerObj);
                var frmFullDetailsFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmFullDetailsFormModelExtension", frmFullDetailsFormModelObj);
                frmFullDetailsFormModelObj.setFormModelExtensionObj(frmFullDetailsFormModelExtObj);
                appContext.setFormController("frmFullDetails", frmFullDetailsControllerObj);
                //added for frmSearcg
                var frmSearchModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSearchConfig);
                var frmSearchControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSearchController", appContext, frmSearchModelConfigObj);
                var frmSearchControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSearchControllerExtension", frmSearchControllerObj);
                frmSearchControllerObj.setControllerExtensionObject(frmSearchControllerExtObj);
                var frmSearchFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSearchFormModel", frmSearchControllerObj);
                var frmSearchFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSearchFormModelExtension", frmSearchFormModelObj);
                frmSearchFormModelObj.setFormModelExtensionObj(frmSearchFormModelExtObj);
                appContext.setFormController("frmSearch", frmSearchControllerObj);

                //added the multi Select Form 
                var frmMultiSelectionModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMultiSelectionConfig);
                var frmMultiSelectionControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMultiSelectionController", appContext, frmMultiSelectionModelConfigObj);
                var frmMultiSelectionControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMultiSelectionControllerExtension", frmMultiSelectionControllerObj);
                frmMultiSelectionControllerObj.setControllerExtensionObject(frmMultiSelectionControllerExtObj);
                var frmMultiSelectionFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMultiSelectionFormModel", frmMultiSelectionControllerObj);
                var frmMultiSelectionFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMultiSelectionFormModelExtension", frmMultiSelectionFormModelObj);
                frmMultiSelectionFormModelObj.setFormModelExtensionObj(frmMultiSelectionFormModelExtObj);
                appContext.setFormController("frmMultiSelection", frmMultiSelectionControllerObj);

                //frmsettings
                var frmSettingsModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSettingsConfig);
                var frmSettingsControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSettingsController", appContext, frmSettingsModelConfigObj);
                var frmSettingsControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSettingsControllerExtension", frmSettingsControllerObj);
                frmSettingsControllerObj.setControllerExtensionObject(frmSettingsControllerExtObj);
                var frmSettingsFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSettingsFormModel", frmSettingsControllerObj);
                var frmSettingsFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSettingsFormModelExtension", frmSettingsFormModelObj);
                frmSettingsFormModelObj.setFormModelExtensionObj(frmSettingsFormModelExtObj);
                appContext.setFormController("frmSettings", frmSettingsControllerObj);

                //frmIsLaterSearch
                var frmIsLaterSearchModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmIsLaterSearchConfig);
                var frmIsLaterSearchControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmIsLaterSearchController", appContext, frmIsLaterSearchModelConfigObj);
                var frmIsLaterSearchControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmIsLaterSearchControllerExtension", frmIsLaterSearchControllerObj);
                frmIsLaterSearchControllerObj.setControllerExtensionObject(frmIsLaterSearchControllerExtObj);
                var frmIsLaterSearchFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmIsLaterSearchFormModel", frmIsLaterSearchControllerObj);
                var frmIsLaterSearchFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmIsLaterSearchFormModelExtension", frmIsLaterSearchFormModelObj);
                frmIsLaterSearchFormModelObj.setFormModelExtensionObj(frmIsLaterSearchFormModelExtObj);
                appContext.setFormController("frmIsLaterSearch", frmIsLaterSearchControllerObj);

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

                var frmDelegationRequestListModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDelegationRequestListConfig);
                var frmDelegationRequestListControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDelegationRequestListController", appContext, frmDelegationRequestListModelConfigObj);
                var frmDelegationRequestListControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDelegationRequestListControllerExtension", frmDelegationRequestListControllerObj);
                frmDelegationRequestListControllerObj.setControllerExtensionObject(frmDelegationRequestListControllerExtObj);
                var frmDelegationRequestListFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDelegationRequestListFormModel", frmDelegationRequestListControllerObj);
                var frmDelegationRequestListFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDelegationRequestListFormModelExtension", frmDelegationRequestListFormModelObj);
                frmDelegationRequestListFormModelObj.setFormModelExtensionObj(frmDelegationRequestListFormModelExtObj);
                appContext.setFormController("frmDelegationRequestList", frmDelegationRequestListControllerObj);

                var frmDelegationRequestCreateModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDelegationRequestCreateConfig);
                var frmDelegationRequestCreateControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDelegationRequestCreateController", appContext, frmDelegationRequestCreateModelConfigObj);
                var frmDelegationRequestCreateControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDelegationRequestCreateControllerExtension", frmDelegationRequestCreateControllerObj);
                frmDelegationRequestCreateControllerObj.setControllerExtensionObject(frmDelegationRequestCreateControllerExtObj);
                var frmDelegationRequestCreateFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDelegationRequestCreateFormModel", frmDelegationRequestCreateControllerObj);
                var frmDelegationRequestCreateFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDelegationRequestCreateFormModelExtension", frmDelegationRequestCreateFormModelObj);
                frmDelegationRequestCreateFormModelObj.setFormModelExtensionObj(frmDelegationRequestCreateFormModelExtObj);
                appContext.setFormController("frmDelegationRequestCreate", frmDelegationRequestCreateControllerObj);

                var frmDelegationRequestDetailsModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDelegationRequestDetailsConfig);
                var frmDelegationRequestDetailsControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDelegationRequestDetailsController", appContext, frmDelegationRequestDetailsModelConfigObj);
                var frmDelegationRequestDetailsControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDelegationRequestDetailsControllerExtension", frmDelegationRequestDetailsControllerObj);
                frmDelegationRequestDetailsControllerObj.setControllerExtensionObject(frmDelegationRequestDetailsControllerExtObj);
                var frmDelegationRequestDetailsFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDelegationRequestDetailsFormModel", frmDelegationRequestDetailsControllerObj);
                var frmDelegationRequestDetailsFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDelegationRequestDetailsFormModelExtension", frmDelegationRequestDetailsFormModelObj);
                frmDelegationRequestDetailsFormModelObj.setFormModelExtensionObj(frmDelegationRequestDetailsFormModelExtObj);
                appContext.setFormController("frmDelegationRequestDetails", frmDelegationRequestDetailsControllerObj);
            }
            else {
                var frmTabListViewModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTabListViewConfig);
                var frmTabListViewControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTabListViewController", appContext, frmTabListViewModelConfigObj);
                var frmTabListViewControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTabListViewControllerExtension", frmTabListViewControllerObj);
                frmTabListViewControllerObj.setControllerExtensionObject(frmTabListViewControllerExtObj);
                var frmTabListViewFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTabListViewFormModel", frmTabListViewControllerObj);
                var frmTabListViewFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTabListViewFormModelExtension", frmTabListViewFormModelObj);
                frmTabListViewFormModelObj.setFormModelExtensionObj(frmTabListViewFormModelExtObj);
                appContext.setFormController("frmTabListView", frmTabListViewControllerObj);

                var frmTabApprovalHistoryModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTabApprovalHistoryConfig);
                var frmTabApprovalHistoryControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTabApprovalHistoryController", appContext, frmTabApprovalHistoryModelConfigObj);
                var frmTabApprovalHistoryControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTabApprovalHistoryControllerExtension", frmTabApprovalHistoryControllerObj);
                frmTabApprovalHistoryControllerObj.setControllerExtensionObject(frmTabApprovalHistoryControllerExtObj);
                var frmTabApprovalHistoryFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTabApprovalHistoryFormModel", frmTabApprovalHistoryControllerObj);
                var frmTabApprovalHistoryFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTabApprovalHistoryFormModelExtension", frmTabApprovalHistoryFormModelObj);
                frmTabApprovalHistoryFormModelObj.setFormModelExtensionObj(frmTabApprovalHistoryFormModelExtObj);
                appContext.setFormController("frmTabApprovalHistory", frmTabApprovalHistoryControllerObj);
 
                var frmTabDashboardModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTabDashboardConfig);
				var frmTabDashboardControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTabDashboardController", appContext, frmTabDashboardModelConfigObj);
				var frmTabDashboardControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTabDashboardControllerExtension", frmTabDashboardControllerObj);
				frmTabDashboardControllerObj.setControllerExtensionObject(frmTabDashboardControllerExtObj);
				var frmTabDashboardFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTabDashboardFormModel", frmTabDashboardControllerObj);
				var frmTabDashboardFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTabDashboardFormModelExtension", frmTabDashboardFormModelObj);
				frmTabDashboardFormModelObj.setFormModelExtensionObj(frmTabDashboardFormModelExtObj);
				appContext.setFormController("frmTabDashboard", frmTabDashboardControllerObj);
            
            	var frmViewFilterHistoryModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmViewFilterHistoryConfig);
        		var frmViewFilterHistoryControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmViewFilterHistoryController", appContext, frmViewFilterHistoryModelConfigObj);
                var frmViewFilterHistoryControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmViewFilterHistoryControllerExtension", frmViewFilterHistoryControllerObj);
        		frmViewFilterHistoryControllerObj.setControllerExtensionObject(frmViewFilterHistoryControllerExtObj);
        		var frmViewFilterHistoryFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmViewFilterHistoryFormModel", frmViewFilterHistoryControllerObj);
        		var frmViewFilterHistoryFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmViewFilterHistoryFormModelExtension", frmViewFilterHistoryFormModelObj);
        		frmViewFilterHistoryFormModelObj.setFormModelExtensionObj(frmViewFilterHistoryFormModelExtObj);
        		appContext.setFormController("frmViewFilterHistory", frmViewFilterHistoryControllerObj);
            
                var frmDelegationTabModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDelegationTabConfig);
        		var frmDelegationTabControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDelegationTabController", appContext, frmDelegationTabModelConfigObj);
        		var frmDelegationTabControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDelegationTabControllerExtension", frmDelegationTabControllerObj);
        		frmDelegationTabControllerObj.setControllerExtensionObject(frmDelegationTabControllerExtObj);
        		var frmDelegationTabFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDelegationTabFormModel", frmDelegationTabControllerObj);
        		var frmDelegationTabFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDelegationTabFormModelExtension", frmDelegationTabFormModelObj);
        		frmDelegationTabFormModelObj.setFormModelExtensionObj(frmDelegationTabFormModelExtObj);
        		appContext.setFormController("frmDelegationTab", frmDelegationTabControllerObj);
            }
        }
        else if (kony.apps.coe.ess.globalVariables.isWebDesktop === true) {
            //frmApprovalsdashboardDesktop
            var frmApprovalsDashboardModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmApprovalsDashboardConfig);
            var frmApprovalsDashboardControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmApprovalsDashboardController", appContext, frmApprovalsDashboardModelConfigObj);
            var frmApprovalsDashboardControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmApprovalsDashboardControllerExtension", frmApprovalsDashboardControllerObj);
            frmApprovalsDashboardControllerObj.setControllerExtensionObject(frmApprovalsDashboardControllerExtObj);
            var frmApprovalsDashboardFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmApprovalsDashboardFormModel", frmApprovalsDashboardControllerObj);
            var frmApprovalsDashboardFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmApprovalsDashboardFormModelExtension", frmApprovalsDashboardFormModelObj);
            frmApprovalsDashboardFormModelObj.setFormModelExtensionObj(frmApprovalsDashboardFormModelExtObj);
            appContext.setFormController("frmApprovalsDashboard", frmApprovalsDashboardControllerObj);

            //frmPendingRequestDesktop
            var frmPendingRequestModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPendingRequestConfig);
            var frmPendingRequestControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPendingRequestController", appContext, frmPendingRequestModelConfigObj);
            var frmPendingRequestControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPendingRequestControllerExtension", frmPendingRequestControllerObj);
            frmPendingRequestControllerObj.setControllerExtensionObject(frmPendingRequestControllerExtObj);
            var frmPendingRequestFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPendingRequestFormModel", frmPendingRequestControllerObj);
            var frmPendingRequestFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPendingRequestFormModelExtension", frmPendingRequestFormModelObj);
            frmPendingRequestFormModelObj.setFormModelExtensionObj(frmPendingRequestFormModelExtObj);
            appContext.setFormController("frmPendingRequest", frmPendingRequestControllerObj);

            //frmHistoryDesktop
            var frmHistoryModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmHistoryConfig);
            var frmHistoryControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmHistoryController", appContext, frmHistoryModelConfigObj);
            var frmHistoryControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmHistoryControllerExtension", frmHistoryControllerObj);
            frmHistoryControllerObj.setControllerExtensionObject(frmHistoryControllerExtObj);
            var frmHistoryFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmHistoryFormModel", frmHistoryControllerObj);
            var frmHistoryFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmHistoryFormModelExtension", frmHistoryFormModelObj);
            frmHistoryFormModelObj.setFormModelExtensionObj(frmHistoryFormModelExtObj);
            appContext.setFormController("frmHistory", frmHistoryControllerObj);

            //frmDelegationRequestDW
            var frmDelegationRequestsModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDelegationRequetsDWConfig);
            var frmDelegationRequestsControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDelegationRequestsController", appContext, frmDelegationRequestsModelConfigObj);
            var frmDelegationRequestsControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDelegationRequestsControllerExtension", frmDelegationRequestsControllerObj);
            frmDelegationRequestsControllerObj.setControllerExtensionObject(frmDelegationRequestsControllerExtObj);
            var frmDelegationRequestsFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDelegationRequestsFormModel", frmDelegationRequestsControllerObj);
            var frmDelegationRequestsFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDelegationRequestsFormModelExtension", frmDelegationRequestsFormModelObj);
            frmDelegationRequestsFormModelObj.setFormModelExtensionObj(frmDelegationRequestsFormModelExtObj);
            appContext.setFormController("frmDelegationRequests", frmDelegationRequestsControllerObj);

        }

    }
    catch (err) {
        var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
        kony.sdk.mvvm.log.error(exception.toString());
        alert("in the kony appinit" + exception.toString());
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

function showDelegationRequestListForm(contextData) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationRequestList");
    formController.loadDataAndShowForm(contextData);
}

function showDelegationRequestCreateForm(contextData) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationRequestCreate");
    formController.loadDataAndShowForm(contextData);
}

function showDelegationRequestDetailsForm(contextData) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationRequestDetails");
    formController.loadDataAndShowForm(contextData);
}

function showEmployeeLookUpForm() {
    kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().setDataInList();
    frmEmployeeLookUp.show();
}

function showApprovalRequestFullDetails() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmFullDetails");
    formController.loadDataAndShowForm();
}

function showHistory() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSearch");
    formController.loadDataAndShowForm();
}

function showApprovalHome() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
    formController.loadDataAndShowForm();
}

function showApprovalsDashboard() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalsDashboard");
    formController.loadDataAndShowForm();
}

function showPendingRequest() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmPendingRequest");
    formController.loadDataAndShowForm();
}

function showDeligationRequests() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationRequests");
    formController.loadDataAndShowForm();
}


function showHistory() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmHistory");
    formController.loadDataAndShowForm();
}

function tabListViewShow() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabListView");
    formController.loadDataAndShowForm();
}

function tabApprovalHistoryShow() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabApprovalHistory");
    formController.loadDataAndShowForm();
}

function tabDashboardShow() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabDashboard");
    formController.loadDataAndShowForm();
}

function showViewFilterHistory() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmViewFilterHistory");
    formController.loadDataAndShowForm(kony.apps.coe.ess.ApprovalHistoryTab.segHistoryData);
}

function showDelegationTabForm() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationTab");
    formController.loadDataAndShowForm();
}