function frmExpenseReportDetailsPostShow(eventobject) {
    return AS_Form_6e6c00a160c64fd6aaa424d1fa415d39(eventobject);
}

function AS_Form_6e6c00a160c64fd6aaa424d1fa415d39(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}