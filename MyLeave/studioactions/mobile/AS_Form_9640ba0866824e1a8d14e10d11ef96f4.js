function AS_Form_9640ba0866824e1a8d14e10d11ef96f4(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    frmTeamView.lblTitle.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmTeamView.lblTitle.valueKA");
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.myLeave.TeamView.prototype.setCurrentDate();
}