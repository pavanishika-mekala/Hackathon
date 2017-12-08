function frmFullDetailsPostShowTab(eventobject) {
    return AS_Form_ee3e328ab00e460eb0ead5d44b02026c(eventobject);
}

function AS_Form_ee3e328ab00e460eb0ead5d44b02026c(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}