function AS_Form_c06c59c29ebf477a8db8219628cbc0fb(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.ess.myTime.TimesheetSettingsUI()).showManualTimeEntry();
}