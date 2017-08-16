function ActnLeaveHomePostShow(eventobject) {
    return AS_Form_8a14f8f279694d93a29ff2c05035ab7c(eventobject);
}

function AS_Form_8a14f8f279694d93a29ff2c05035ab7c(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveDataSPA();
}