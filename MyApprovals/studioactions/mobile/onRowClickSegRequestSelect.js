function onRowClickSegRequestSelect(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_d81705ee57e54f1baaa8ba810dfda43d(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_d81705ee57e54f1baaa8ba810dfda43d(eventobject, sectionNumber, rowNumber) {
    var filterobj = new kony.apps.coe.ess.Approvals.frmSelectBackendLogic();
    filterobj.requesttypeDataRowClick()
    frmSelect.forceLayout();
}