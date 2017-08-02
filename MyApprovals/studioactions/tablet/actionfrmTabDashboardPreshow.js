function actionfrmTabDashboardPreshow(eventobject) {
    return AS_Form_7e6f348108fb4f0dbba54a7be603e77d(eventobject);
}

function AS_Form_7e6f348108fb4f0dbba54a7be603e77d(eventobject) {
    (new kony.apps.coe.ess.FilterHistory()).loadEmployees();
}