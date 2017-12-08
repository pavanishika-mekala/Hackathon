function ActnLeaveWalletPostShow(eventobject) {
    return AS_Form_43b76bc4f68c46b2ad8cbbf89c8650c9(eventobject);
}

function AS_Form_43b76bc4f68c46b2ad8cbbf89c8650c9(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveDataSPA();
}