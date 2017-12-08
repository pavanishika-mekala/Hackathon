function postshow_teamleavecalenar(eventobject) {
    return AS_Form_5ba8988539a848df8dfcc8bd0abbfc81(eventobject);
}

function AS_Form_5ba8988539a848df8dfcc8bd0abbfc81(eventobject) {
    //#ifdef windows8
    (new kony.apps.ess.myLeave.teamLeaveCalendarWin()).fillDays();
    (new kony.apps.ess.myLeave.teamLeaveCalendarWin()).createEmpLeaveCalendar1(teamMembers, kony.apps.ess.myLeave.teamLeaveData);
    //(new kony.apps.ess.myLeave.teamLeaveCalendarWin()).fetchImageValueByMediaId(teamMembers);
    //#else
    (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).fillDays1();
    (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).createEmpLeaveCalendar1(teamMembers, kony.apps.ess.myLeave.teamLeaveData);
    //#endif
}