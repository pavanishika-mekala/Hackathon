function action_onEditLeave(eventobject) {
    return AS_FlexContainer_ce4d74b9c2f749a48498df9552f5c91b(eventobject);
}

function AS_FlexContainer_ce4d74b9c2f749a48498df9552f5c91b(eventobject) {
    kony.apps.ess.myLeave.tabApplyLeaveUI.checkIfEditLeaveMode.editMode = true;
    showTabApplyLeaveForm();
}