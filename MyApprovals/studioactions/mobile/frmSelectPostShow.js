function frmSelectPostShow(eventobject) {
    return AS_Form_faa4e97f614c4add9f39971b0e37a6f3(eventobject);
}

function AS_Form_faa4e97f614c4add9f39971b0e37a6f3(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}