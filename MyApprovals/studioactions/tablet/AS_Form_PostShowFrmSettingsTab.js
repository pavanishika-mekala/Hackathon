function AS_Form_PostShowFrmSettingsTab(eventobject) {
    return AS_Form_ccccb502ff9c4922bf1f782051019878(eventobject);
}

function AS_Form_ccccb502ff9c4922bf1f782051019878(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.settings.getSettingsObject().setLanginPostShow();
}