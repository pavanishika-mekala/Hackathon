function frmSearchStatusPostShow(eventobject) {
    return AS_Form_4598a896ab2d4b8584a2c32aa7727933(eventobject);
}

function AS_Form_4598a896ab2d4b8584a2c32aa7727933(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    frmStatusSearch.lblCancel.text = kony.i18n.getLocalizedString("i18n.ess.common.cancel.valueKA");
    frmStatusSearch.lblDone.text = kony.i18n.getLocalizedString("i18n.ess.common.done.valueKA");
    frmStatusSearch.lblTitle.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmStatusSearch.lblTitle.valueKA");
}