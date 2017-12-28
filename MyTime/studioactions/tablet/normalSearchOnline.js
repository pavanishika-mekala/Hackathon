function normalSearchOnline(eventobject) {
    return AS_FlexContainer_1d66321f082f4fc2a285f540d63c0308(eventobject);
}

function AS_FlexContainer_1d66321f082f4fc2a285f540d63c0308(eventobject) {
    try {
        kony.apps.coe.ess.myTime.Tab.SearchTask.onlineSearch(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam);
    } catch (e) {
        handleError("Error: " + e);
    }
}