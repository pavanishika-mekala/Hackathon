function frmApprovalHomePostShowAction(eventobject) {
    return AS_Form_25de5ea699ff467781d9c22f7c1dd067(eventobject);
}

function AS_Form_25de5ea699ff467781d9c22f7c1dd067(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.Approvals.ApprovalsHome.PreShow();
}