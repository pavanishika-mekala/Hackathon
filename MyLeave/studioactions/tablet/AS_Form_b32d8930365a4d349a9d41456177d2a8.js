function AS_Form_b32d8930365a4d349a9d41456177d2a8(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveDataSPA();
}