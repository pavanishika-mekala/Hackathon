function AS_Segment_onRowClickSeg_DelegationRequestListReceivedTab(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_i99d6fea8d52493eb58c0da269788c2c(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_i99d6fea8d52493eb58c0da269788c2c(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance().onRowClickOfReceivedList();
}