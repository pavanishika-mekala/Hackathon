function frmSearchLeaveTypePostShow(eventobject) {
    return AS_Form_851b0fdd5c3043f19e7b6549651d99eb(eventobject);
}

function AS_Form_851b0fdd5c3043f19e7b6549651d99eb(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    frmSearchLeaveType.lblCancel.text = kony.i18n.getLocalizedString("i18n.ess.common.cancel.valueKA");
    frmSearchLeaveType.lblDone.text = kony.i18n.getLocalizedString("i18n.ess.common.done.valueKA");
    frmSearchLeaveType.lblTitle.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmSSearchLeaveType.lblTitle.valueKA");
}