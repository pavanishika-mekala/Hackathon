function AS_Form_d0972014f5754a86b15ab3bbf701df2a(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    frmStatusSearch.lblCancel.text = kony.i18n.getLocalizedString("i18n.ess.common.cancel.valueKA");
    frmStatusSearch.lblDone.text = kony.i18n.getLocalizedString("i18n.ess.common.done.valueKA");
    frmStatusSearch.lblTitle.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmStatusSearch.lblTitle.valueKA");
}