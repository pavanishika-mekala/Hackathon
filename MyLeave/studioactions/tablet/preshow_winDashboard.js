function preshow_winDashboard(eventobject) {
    return AS_Form_d2f06a9d1cae4b2a833c65a81a4f3ffa(eventobject);
}

function AS_Form_d2f06a9d1cae4b2a833c65a81a4f3ffa(eventobject) {
    var obj = new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard();
    obj.addCalendarOnLeaveHome();
    obj.isValidMonthandYearforCalender();
    obj.getLeaveDashboardData();
    //(new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).isValidMonthandYearforCalender();
}