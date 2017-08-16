function frmLeaveBalPostShow(eventobject) {
    return AS_Form_be570643b7ba4899abe8861db6bfa480(eventobject);
}

function AS_Form_be570643b7ba4899abe8861db6bfa480(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}