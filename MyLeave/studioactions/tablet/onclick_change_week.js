function onclick_change_week(eventobject) {
    return AS_FlexContainer_0ee7fbda2ec6440683e92f76770f9e88(eventobject);
}

function AS_FlexContainer_0ee7fbda2ec6440683e92f76770f9e88(eventobject) {
    var showWeek2 = 0; //initially it is 0(showing week 1)
    if (frmTeamLeaveCalendar.imgDownWeek.src === "toggle_on.png") { //show week 1
        frmTeamLeaveCalendar.imgDownWeek.src = "toggle_off.png";
        showWeek2 = 0;
        (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).fillDays1();
        (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).createEmpLeaveCalendar1(teamMembers, kony.apps.ess.myLeave.teamLeaveData);
    } else { //show week 2
        frmTeamLeaveCalendar.imgDownWeek.src = "toggle_on.png"
        showWeek2 = 1;
        (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).fillDays2();
        (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).createEmpLeaveCalendar2(teamMembers, kony.apps.ess.myLeave.teamLeaveData);
    }
}