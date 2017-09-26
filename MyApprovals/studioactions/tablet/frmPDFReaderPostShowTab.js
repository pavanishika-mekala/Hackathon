function frmPDFReaderPostShowTab(eventobject) {
    return AS_Form_d3a0b2b12a0e44c8ab50439f4a834233(eventobject);
}

function AS_Form_d3a0b2b12a0e44c8ab50439f4a834233(eventobject) {
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    //#ifdef iphone
    (new kony.apps.ess.myApprovals.pdfOperation()).postShowFrmPdfReader();
    //#endif
}