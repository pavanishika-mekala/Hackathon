function AS_FlexContainer_e8133f3179944eacbe07c23b04d4098a(eventobject) {
    if (kony.os.deviceInfo().name === "iPhone") {
        frmTeamView.flxDayBar.removeAll();
    }
    kony.apps.coe.ess.myLeave.TeamViewUI.prototype.addDynamicHorzCalendar();
}