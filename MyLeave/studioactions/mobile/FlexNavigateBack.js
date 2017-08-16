function FlexNavigateBack(eventobject) {
    return AS_FlexContainer_7ed5bc6b040d4093af2d74e14c3cf5c2(eventobject);
}

function AS_FlexContainer_7ed5bc6b040d4093af2d74e14c3cf5c2(eventobject) {
    (new kony.apps.coe.myLeave.search()).clear();
    eval(String(kony.apps.coe.ess.globalVariables.previousFormForLeaveRequestDetails) + ".show();");
}