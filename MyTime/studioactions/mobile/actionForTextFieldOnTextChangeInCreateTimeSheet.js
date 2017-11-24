function actionForTextFieldOnTextChangeInCreateTimeSheet(eventobject, changedtext) {
    return AS_TextField_28c6f711fa794d2680c51985e50d2f10(eventobject, changedtext);
}

function AS_TextField_28c6f711fa794d2680c51985e50d2f10(eventobject, changedtext) {
    kony.apps.coe.ess.myTime.TimesheetCreate.onDoneInActivityDesc();
}