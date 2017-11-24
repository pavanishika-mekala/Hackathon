function actionForSkipInFrmTasksListForm(eventobject, x, y) {
    return AS_Label_24df79635dbe41cca08dc718c909fcff(eventobject, x, y);
}

function AS_Label_24df79635dbe41cca08dc718c909fcff(eventobject, x, y) {
    showTimesheetCreateForm(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData());
    kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
}