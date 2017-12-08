function AS_Form_be51d4263f0d47e48b30dc0714bac61b(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.settings.getSettingsObject().setLanginPostShow();
}