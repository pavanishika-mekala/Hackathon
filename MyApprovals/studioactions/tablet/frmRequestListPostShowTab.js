function frmRequestListPostShowTab(eventobject) {
    return AS_Form_i40f65d6fa834e0089cd3cf153beaf1e(eventobject);
}

function AS_Form_i40f65d6fa834e0089cd3cf153beaf1e(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}