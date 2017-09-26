function frmExpenseReportDetailsPostShowTab(eventobject) {
    return AS_Form_b78e823a8a8041f6bf98eaa4ada7510c(eventobject);
}

function AS_Form_b78e823a8a8041f6bf98eaa4ada7510c(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}