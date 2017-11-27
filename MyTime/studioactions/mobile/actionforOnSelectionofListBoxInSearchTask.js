function actionforOnSelectionofListBoxInSearchTask(eventobject) {
    return AS_ListBox_93ad05697da74e1f9601cc63b75c77ac(eventobject);
}

function AS_ListBox_93ad05697da74e1f9601cc63b75c77ac(eventobject) {
    kony.apps.coe.ess.myTime.SearchTask.listBoxSelection(frmRecentTasks.listBoxCriteria.selectedKeyValue[1]);
}