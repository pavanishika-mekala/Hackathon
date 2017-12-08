function AS_Calendar_onSelectionFromClndDelegationRequestCreateTab(eventobject, isValidDateSelected) {
    return AS_Calendar_ba703cf6727c46788a1733afbeb8dd8d(eventobject, isValidDateSelected);
}

function AS_Calendar_ba703cf6727c46788a1733afbeb8dd8d(eventobject, isValidDateSelected) {
    kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.getInstance().onSelectionOfDateInFromCalendar();
}