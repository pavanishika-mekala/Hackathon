function frmRequestListPostShow(eventobject) {
    return AS_Form_d5b16be46c7045f4b772f8ce7ba0b823(eventobject);
}

function AS_Form_d5b16be46c7045f4b772f8ce7ba0b823(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}