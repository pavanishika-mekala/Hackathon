function actionForTextFieldOnEndiPhoneInCreateTimeSheet(eventobject, changedtext) {
    return AS_TextField_fd6fe568b88b4804ab28909014f9e77a(eventobject, changedtext);
}

function AS_TextField_fd6fe568b88b4804ab28909014f9e77a(eventobject, changedtext) {
    kony.apps.coe.ess.myTime.TimesheetCreate.onDoneInActivityDesc();
}