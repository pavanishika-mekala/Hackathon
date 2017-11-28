function actionOnSelectionOfLeaveTimeType(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_c1b480308311476eb469dd83275d1b5a(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_c1b480308311476eb469dd83275d1b5a(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfLeaveTimeTypeTab(frmTimeSheetCreateTab.segLeaveSelection.selectedRowItems[0]);
}