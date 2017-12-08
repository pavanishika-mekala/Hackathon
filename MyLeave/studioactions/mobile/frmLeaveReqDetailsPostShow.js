function frmLeaveReqDetailsPostShow(eventobject) {
    return AS_Form_5a57b046a73a47b7afbfa9c8815176f5(eventobject);
}

function AS_Form_5a57b046a73a47b7afbfa9c8815176f5(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.myLeave.search()).storePreviousForm();
}