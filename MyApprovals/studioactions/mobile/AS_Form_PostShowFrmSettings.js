function AS_Form_PostShowFrmSettings(eventobject) {
    return AS_Form_607c78957e514b2494ac85a9254c8eaf(eventobject);
}

function AS_Form_607c78957e514b2494ac85a9254c8eaf(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}