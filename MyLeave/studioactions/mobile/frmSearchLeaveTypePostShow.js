function frmSearchLeaveTypePostShow(eventobject) {
    return AS_Form_851b0fdd5c3043f19e7b6549651d99eb(eventobject);
}

function AS_Form_851b0fdd5c3043f19e7b6549651d99eb(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}