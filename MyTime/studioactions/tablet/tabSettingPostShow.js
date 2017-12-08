function tabSettingPostShow(eventobject) {
    return AS_Form_e99298852c4648fdba154fd0715c9c39(eventobject);
}

function AS_Form_e99298852c4648fdba154fd0715c9c39(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.ess.myTime.TimesheetSettingsUI()).showManualTimeEntry();
}