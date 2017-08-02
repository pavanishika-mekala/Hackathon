function actsegReqtype(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_bbd12381f4094001bafb8fada3918f77(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_bbd12381f4094001bafb8fada3918f77(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.Approvals.tabApprovalsListView.segRequestTypeOnClick(frmTabListView.segReqtype.selectedItems[0]);
}