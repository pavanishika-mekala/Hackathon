function actionPreShowOfTeamCal(eventobject) {
    return AS_Form_5a4be928f8ea445b94630ef99308407e(eventobject);
}

function AS_Form_5a4be928f8ea445b94630ef99308407e(eventobject) {
    frmTeamCalendar.flxSegEmployee.forceLayout();
    frmTeamCalendar.flxTeamCalendar.forceLayout();
    frmTeamCalendar.forceLayout();
    (new kony.apps.coe.ess.frmTeamCalUiDW()).fillDays();
}