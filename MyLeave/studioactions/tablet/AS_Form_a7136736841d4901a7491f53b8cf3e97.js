function AS_Form_a7136736841d4901a7491f53b8cf3e97(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.myLeave.search()).storePreviousForm();
}