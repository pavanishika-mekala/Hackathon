function startAdvancedSearchWithParams(eventobject) {
    return AS_Button_e0033909dcf3429fb8bc373d55596182(eventobject);
}

function AS_Button_e0033909dcf3429fb8bc373d55596182(eventobject) {
    try {
        kony.apps.coe.ess.myTime.Tab.SearchTask.searchProjectTask(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam);
    } catch (e) {
        handleError("Error: " + e);
    }
}