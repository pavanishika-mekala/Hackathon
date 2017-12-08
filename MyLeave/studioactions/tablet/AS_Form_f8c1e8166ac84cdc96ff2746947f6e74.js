function AS_Form_f8c1e8166ac84cdc96ff2746947f6e74(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.globalVariables.previousFormForLeaveRequestDetails = kony.application.getCurrentForm().id;
}