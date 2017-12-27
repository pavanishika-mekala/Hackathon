function advOnlineSearch(eventobject) {
    return AS_FlexContainer_a4bf1ccbf4e74aca860a3d37a82385d9(eventobject);
}

function AS_FlexContainer_a4bf1ccbf4e74aca860a3d37a82385d9(eventobject) {
    try {
        kony.apps.coe.ess.myTime.Tab.SearchTask.onlineSearch(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam);
    } catch (e) {
        handleError("Error: " + e);
    }
}