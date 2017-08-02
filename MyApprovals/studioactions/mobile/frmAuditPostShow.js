function frmAuditPostShow(eventobject) {
    return AS_Form_5e46fce4d45949e9b89d5e950d441629(eventobject);
}

function AS_Form_5e46fce4d45949e9b89d5e950d441629(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}