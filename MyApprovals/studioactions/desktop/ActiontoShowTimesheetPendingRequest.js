function ActiontoShowTimesheetPendingRequest(eventobject) {
    return AS_FlexContainer_68a33f6e891947ab8932d38ce4a2e31d(eventobject);
}

function AS_FlexContainer_68a33f6e891947ab8932d38ce4a2e31d(eventobject) {
    (new kony.apps.coe.ess.frmPendingUIDW()).onClickOfTimeReq();
    (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest("TIMESHEET");
}