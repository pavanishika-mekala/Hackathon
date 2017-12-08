function frmPDFReaderPostShow(eventobject) {
    return AS_Form_c6c1ee66575745d685c7d590043d8778(eventobject);
}

function AS_Form_c6c1ee66575745d685c7d590043d8778(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    //#ifdef iphone
    (new kony.apps.ess.myApprovals.pdfOperation()).postShowFrmPdfReader();
    //#endif
}