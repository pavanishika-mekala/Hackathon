function frmTimesheetSettingsPostshow(eventobject) {
    return AS_Form_a084d822c1904857994bdd83607a90e1(eventobject);
}

function AS_Form_a084d822c1904857994bdd83607a90e1(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.ess.myTime.TimesheetSettingsUI()).showManualTimeEntry();
}