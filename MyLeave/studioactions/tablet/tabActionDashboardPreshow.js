function tabActionDashboardPreshow(eventobject) {
    return AS_Form_568a9594a4f0483bb40fdb1a64103252(eventobject);
}

function AS_Form_568a9594a4f0483bb40fdb1a64103252(eventobject) {
    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).addCalendarOnLeaveHome();
    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).isValidMonthandYearforCalender();
    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getLeaveDashboardData();
}