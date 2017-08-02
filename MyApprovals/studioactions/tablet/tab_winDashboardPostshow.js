function tab_winDashboardPostshow(eventobject) {
    return AS_Form_68bfb8fbd3d24c029e77925b7e29ab02(eventobject);
}

function AS_Form_68bfb8fbd3d24c029e77925b7e29ab02(eventobject) {
    var obj = new kony.apps.coe.ess.Approvals.approvalsDashboardWin();
    obj.getApprovalsDetailsPreshow();
    (new kony.apps.coe.ess.FilterHistory()).loadEmployees();
}