function actionForTextFieldOnDoneInCreateTimeSheet(eventobject, changedtext) {
    return AS_TextField_b17c14d0850e4ed9b1e7254e60970a73(eventobject, changedtext);
}

function AS_TextField_b17c14d0850e4ed9b1e7254e60970a73(eventobject, changedtext) {
    kony.apps.coe.ess.myTime.TimesheetCreate.onDoneInActivityDesc();
}