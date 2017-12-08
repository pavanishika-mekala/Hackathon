function frmPendingLeaveReqPostShow(eventobject) {
    return AS_Form_e14140e6d0eb4755acf970d6ce68c507(eventobject);
}

function AS_Form_e14140e6d0eb4755acf970d6ce68c507(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.globalVariables.previousFormForLeaveRequestDetails = kony.application.getCurrentForm().id;
}