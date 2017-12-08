function frmSearchResultsPostShowTab(eventobject) {
    return AS_Form_e6b60f3694824f1aaabad545fd3cf172(eventobject);
}

function AS_Form_e6b60f3694824f1aaabad545fd3cf172(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}