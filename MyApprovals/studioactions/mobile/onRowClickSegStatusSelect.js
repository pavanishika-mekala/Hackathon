function onRowClickSegStatusSelect(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_de436e6be3c14e659880c06aeab08283(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_de436e6be3c14e659880c06aeab08283(eventobject, sectionNumber, rowNumber) {
    var filterobj = new kony.apps.coe.ess.Approvals.frmSelectBackendLogic();
    filterobj.statusTypeDataRowClick()
    frmSelect.forceLayout();
}