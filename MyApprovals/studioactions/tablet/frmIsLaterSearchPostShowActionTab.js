function frmIsLaterSearchPostShowActionTab(eventobject) {
    return AS_Form_bb826d1082004c3fa84e504c7296a531(eventobject);
}

function AS_Form_bb826d1082004c3fa84e504c7296a531(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}