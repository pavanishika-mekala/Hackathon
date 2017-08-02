function frmFullDetailsPostShow(eventobject) {
    return AS_Form_b190a87eb66c452e8c5676b72f5e1664(eventobject);
}

function AS_Form_b190a87eb66c452e8c5676b72f5e1664(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}