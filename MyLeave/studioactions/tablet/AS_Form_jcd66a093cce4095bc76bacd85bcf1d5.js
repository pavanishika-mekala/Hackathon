function AS_Form_jcd66a093cce4095bc76bacd85bcf1d5(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    frmTeamView.lblTitle.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmTeamView.lblTitle.valueKA");
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.myLeave.TeamView.prototype.setCurrentDate();
}