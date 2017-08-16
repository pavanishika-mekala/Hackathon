function OnClickOfPEndingLeaveSegmentDW(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_20559e7108ca4058afef8d78ef66fb73(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_20559e7108ca4058afef8d78ef66fb73(eventobject, sectionNumber, rowNumber) {
    var ind = frmPendingLeaveRequestsDW.segPendingLeaves.selectedRowIndex[1];
    kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.OnClick(frmPendingLeaveRequestsDW.segPendingLeaves, 0, ind);
}