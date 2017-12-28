function searchOntextChange(eventobject, changedtext) {
    return AS_TextField_cb16ab3666c9477d9acd60bf9c7512e1(eventobject, changedtext);
}

function AS_TextField_cb16ab3666c9477d9acd60bf9c7512e1(eventobject, changedtext) {
    kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam = "Free Search";
    try {
        kony.apps.coe.ess.myTime.Tab.SearchTask.searchProjectTask(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam);
    } catch (e) {
        handleError("Error: " + e);
    }
}