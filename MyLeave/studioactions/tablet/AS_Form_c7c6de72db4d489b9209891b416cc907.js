function AS_Form_c7c6de72db4d489b9209891b416cc907(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    frmSearchLeaveType.lblCancel.text = kony.i18n.getLocalizedString("i18n.ess.common.cancel.valueKA");
    frmSearchLeaveType.lblDone.text = kony.i18n.getLocalizedString("i18n.ess.common.done.valueKA");
    frmSearchLeaveType.lblTitle.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmSSearchLeaveType.lblTitle.valueKA");
}