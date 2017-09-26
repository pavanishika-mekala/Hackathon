function AS_Segment_onRowClickSeg_DelegationRequestListSentByMeTab(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_ab3088d8119641528b360deb5b78b1ff(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_ab3088d8119641528b360deb5b78b1ff(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance().onRowClickOfSentByMeList();
}