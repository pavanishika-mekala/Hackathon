function AS_FlexContainer_e1aee0ffb4b24b67921774bcac0b6ad7(eventobject) {
    try {
        kony.apps.coe.ess.Approvals.ApprovalsHome.onclickFilterIcon();
    } catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.FilterSearch")));
    }
}