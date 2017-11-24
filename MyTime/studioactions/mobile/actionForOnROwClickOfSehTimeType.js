function actionForOnROwClickOfSehTimeType(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_0547e192aa5c45e7b911b8ebb172efdb(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_0547e192aa5c45e7b911b8ebb172efdb(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskTimeType(frmTimeSheetCreate.segTimeType.selectedRowItems[0]);
}