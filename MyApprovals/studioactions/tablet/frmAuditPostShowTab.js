function frmAuditPostShowTab(eventobject) {
    return AS_Form_abec34a512b340a5bfbe36b2bd55d4cf(eventobject);
}

function AS_Form_abec34a512b340a5bfbe36b2bd55d4cf(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}