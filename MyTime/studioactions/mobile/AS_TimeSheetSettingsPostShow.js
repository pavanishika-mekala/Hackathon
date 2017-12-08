function AS_TimeSheetSettingsPostShow(eventobject) {
    return AS_Form_1b354197fa424ae3a5168d2d07237727(eventobject);
}

function AS_Form_1b354197fa424ae3a5168d2d07237727(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.ess.myTime.TimesheetSettingsUI()).showManualTimeEntry();
}