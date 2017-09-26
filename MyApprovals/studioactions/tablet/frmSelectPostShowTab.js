function frmSelectPostShowTab(eventobject) {
    return AS_Form_c16fce9c3c454c19863bc5287750016f(eventobject);
}

function AS_Form_c16fce9c3c454c19863bc5287750016f(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}