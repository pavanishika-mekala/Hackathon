function actionForSegOnRowClickInTaskListForm(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_74616ca41adf40eaa586e4200f5e87ef(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_74616ca41adf40eaa586e4200f5e87ef(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTask(frmTaskList.segTasks.selectedRowItems[0]);
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
}