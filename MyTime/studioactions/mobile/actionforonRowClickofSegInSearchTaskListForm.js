function actionforonRowClickofSegInSearchTaskListForm(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_d3b302dd467f4ac7a90a9c99fd3beed4(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_d3b302dd467f4ac7a90a9c99fd3beed4(eventobject, sectionNumber, rowNumber) {
    if (kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn == true) {
        kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskEditing(frmRecentTasks.segTasks.selectedRowItems[0]);
    } else {
        kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTask(frmRecentTasks.segTasks.selectedRowItems[0]);
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    }
}