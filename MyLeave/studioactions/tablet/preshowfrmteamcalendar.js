function preshowfrmteamcalendar(eventobject) {
    return AS_Form_6f2d7b5698ac4f7182f2a5cff700e580(eventobject);
}

function AS_Form_6f2d7b5698ac4f7182f2a5cff700e580(eventobject) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("appjsmodules");
    (new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).applyGesture();
}