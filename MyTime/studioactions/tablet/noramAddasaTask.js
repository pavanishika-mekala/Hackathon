function noramAddasaTask(eventobject) {
    return AS_FlexContainer_06d9049726b4494ca72748b994f52c08(eventobject);
}

function AS_FlexContainer_06d9049726b4494ca72748b994f52c08(eventobject) {
    try {
        kony.apps.coe.ess.myTime.Tab.SearchTask.addAsNewTask(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam);
    } catch (e) {
        handleError("Error: " + e);
    }
}