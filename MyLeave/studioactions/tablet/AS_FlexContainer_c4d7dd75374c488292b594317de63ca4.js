function AS_FlexContainer_c4d7dd75374c488292b594317de63ca4(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    (new kony.apps.coe.myLeave.search()).storePreviousForm();
}