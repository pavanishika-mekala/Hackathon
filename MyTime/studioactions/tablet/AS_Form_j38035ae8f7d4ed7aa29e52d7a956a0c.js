function AS_Form_j38035ae8f7d4ed7aa29e52d7a956a0c(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.ess.myTime.TimesheetSettingsUI()).showManualTimeEntry();
}