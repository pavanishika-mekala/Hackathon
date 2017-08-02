function actOnsegRequestsListSentByMe(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_1dddcfd84f364767bd1527170737bb56(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_1dddcfd84f364767bd1527170737bb56(eventobject, sectionNumber, rowNumber) {
    var selectedItems = frmDelegationTab.segRequestsListSentByMe.selectedItems[0];
    kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().onRowClickOfSentByMeList(selectedItems);
}