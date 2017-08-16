function onPostShowOfFrmSettings(eventobject) {
    return AS_Form_1b0a1bf2600a4eff9a7560f3655296bb(eventobject);
}

function AS_Form_1b0a1bf2600a4eff9a7560f3655296bb(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}