function frmApprovalHomePostShowActionTab(eventobject) {
    return AS_Form_g5bcd63d65da43be8618921cbb42e79c(eventobject);
}

function AS_Form_g5bcd63d65da43be8618921cbb42e79c(eventobject) {
    kony.apps.coe.ess.globalVariables.prevFormFlow = "";
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.Approvals.ApprovalsHome.PreShow();
}