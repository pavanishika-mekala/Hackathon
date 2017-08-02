function AS_Segment_onRowClickSeg_DelegationRequestListReceived(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_ab83ab2542f84d5295247dfeba3e4ee0(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_ab83ab2542f84d5295247dfeba3e4ee0(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance().onRowClickOfReceivedList();
}