function onRowClickSegPeopleSelect(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_a747e2e5178a4532b7e3ca669d3b8f54(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_a747e2e5178a4532b7e3ca669d3b8f54(eventobject, sectionNumber, rowNumber) {
    var filterobj = new kony.apps.coe.ess.Approvals.frmSelectBackendLogic();
    filterobj.peopleDataRowClick()
    frmSelect.forceLayout();
}