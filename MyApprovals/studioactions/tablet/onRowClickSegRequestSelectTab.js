function onRowClickSegRequestSelectTab(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_f83fab03133b42c7851223323289ddf4(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_f83fab03133b42c7851223323289ddf4(eventobject, sectionNumber, rowNumber) {
    var filterobj = new kony.apps.coe.ess.Approvals.frmSelectBackendLogic();
    filterobj.requesttypeDataRowClick();
    frmSelect.forceLayout();
}