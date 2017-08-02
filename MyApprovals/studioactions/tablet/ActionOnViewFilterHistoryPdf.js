function ActionOnViewFilterHistoryPdf(eventobject) {
    return AS_FlexContainer_0480af9588e74a52ad6a9300d635b623(eventobject);
}

function AS_FlexContainer_0480af9588e74a52ad6a9300d635b623(eventobject) {
    //if(systemGenResponseMediaId.length>0)
    //openPdfTab(systemGenResponseMediaId, true);
    //else
    //alert("Please select the record");
    //systemGenResponseMediaId
    try {
        openPdfTab(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab.systemGeneratedAttachments[0].Media, true);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}