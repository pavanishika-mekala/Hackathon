function AS_Image_onTouchEndOfimgCancelFilter(eventobject, x, y) {
    return AS_Image_127da398aa454bb495ee972e9268aec9(eventobject, x, y);
}

function AS_Image_127da398aa454bb495ee972e9268aec9(eventobject, x, y) {
    try {
        if (kony.apps.coe.ess.globalVariables.isSPA) {
            kony.apps.coe.ess.Approvals.spa.formController.getController().bindData(kony.apps.coe.ess.Approvals.spa.totalRequests);
            kony.apps.coe.ess.Approvals.ApprovalsHome.onclickFilterIcon();
            frmApprovalHome.segApprovalsList.top = "0%";
            frmApprovalHome.forceLayout();
        } else {
            var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
            formController.loadDataAndShowForm();
        }
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.unableToLoadForm"));
    }
}