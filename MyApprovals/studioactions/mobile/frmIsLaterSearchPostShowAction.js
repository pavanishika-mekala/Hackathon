function frmIsLaterSearchPostShowAction(eventobject) {
    return AS_Form_398ac07a4a384c6da74008c997a5559b(eventobject);
}

function AS_Form_398ac07a4a384c6da74008c997a5559b(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}