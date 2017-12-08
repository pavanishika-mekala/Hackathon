function AS_Button_adad6b256a1e44b1bb5f6d80af43a5ed(eventobject, x, y) {
    frmCalendarView.flxCopyWeek.setVisibility(false);
    frmCalendarView.flxCopyIcon.skin = "sknFlxB1PxBGffffffOP100";
    frmCalendarView.imgCopy.src = "copyblue.png";
    (new kony.apps.coe.ess.myTime.CalendarViewUI()).CopyWeekTimesheetConfirm();
}