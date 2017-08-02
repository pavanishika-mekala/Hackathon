function tabWinSegSentByMe(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_ade51ffab4be45afb74b644d843c7877(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_ade51ffab4be45afb74b644d843c7877(eventobject, sectionNumber, rowNumber) {
    var selectedItems = frmDelegationTab.segRequestsListSentByMe.selectedItems[0];
    kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().onRowClickOfSentByMeList(selectedItems);
}