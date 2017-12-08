function frmHolidayPostShow(eventobject) {
    return AS_Form_bf2872bbc9c6405c8ebd6f4f6620848e(eventobject);
}

function AS_Form_bf2872bbc9c6405c8ebd6f4f6620848e(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}