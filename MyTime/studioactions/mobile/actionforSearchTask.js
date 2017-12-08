function actionforSearchTask(eventobject, changedtext) {
    return AS_TextField_9d69692b1270402eb89483220fbce70c(eventobject, changedtext);
}

function AS_TextField_9d69692b1270402eb89483220fbce70c(eventobject, changedtext) {
    try {
        kony.apps.coe.ess.myTime.SearchTask.searchProjectTask(frmRecentTasks.listBoxCriteria.selectedKeyValue[1]);
    } catch (e) {
        handleError("Error: " + e);
    }
}