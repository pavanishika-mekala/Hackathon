function AS_Form_dc9e880169734d3da6093b1175fd55f6(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveDataSPA();
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.setCurrentDate();
}