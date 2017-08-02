function Tab_openPdf(eventobject) {
    return AS_FlexContainer_c9476f47836540c6b5b31d20fe56aecf(eventobject);
}

function AS_FlexContainer_c9476f47836540c6b5b31d20fe56aecf(eventobject) {
    //(new kony.apps.ess.myApprovals.pdfOperationTab()).downloadPDFToDevice(frmTabListView);
    openPdf(systemGenResponse[0].Media, true);
}