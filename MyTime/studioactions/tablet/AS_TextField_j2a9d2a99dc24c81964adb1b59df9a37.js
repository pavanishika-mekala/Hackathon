function AS_TextField_j2a9d2a99dc24c81964adb1b59df9a37(eventobject, changedtext) {
    kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam = "Free Search";
    try {
        kony.apps.coe.ess.myTime.Tab.SearchTask.searchProjectTask(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam);
    } catch (e) {
        handleError("Error: " + e);
    }
}