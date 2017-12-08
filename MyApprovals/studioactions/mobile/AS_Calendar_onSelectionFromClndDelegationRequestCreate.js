function AS_Calendar_onSelectionFromClndDelegationRequestCreate(eventobject, isValidDateSelected) {
    return AS_Calendar_9daf735df7d14fb2ba589cb0e2382d3a(eventobject, isValidDateSelected);
}

function AS_Calendar_9daf735df7d14fb2ba589cb0e2382d3a(eventobject, isValidDateSelected) {
    kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.getInstance().onSelectionOfDateInFromCalendar();
}