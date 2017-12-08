function AS_Form_910fc2f997de43e6be3dc64e1731007a(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.globalVariables.previousFormForLeaveRequestDetails = kony.application.getCurrentForm().id;
}