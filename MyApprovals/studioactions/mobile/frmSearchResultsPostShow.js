function frmSearchResultsPostShow(eventobject) {
    return AS_Form_413dd8b256e74e07be4b16f8242a1f93(eventobject);
}

function AS_Form_413dd8b256e74e07be4b16f8242a1f93(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}