function AS_flxSPAFilter_onClick(eventobject) {
    return AS_FlexContainer_d0b54d90eeb1451ea0ddf8a2c33152b4(eventobject);
}

function AS_FlexContainer_d0b54d90eeb1451ea0ddf8a2c33152b4(eventobject) {
    try {
        kony.apps.coe.ess.Approvals.ApprovalsHome.onclickFilterIcon();
    } catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.FilterSearch")));
    }
}