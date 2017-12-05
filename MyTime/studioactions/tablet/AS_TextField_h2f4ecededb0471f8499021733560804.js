function AS_TextField_h2f4ecededb0471f8499021733560804(eventobject, changedtext) {
    if (kony.apps.coe.ess.globalVariables.taskStartTime != "") {
        kony.apps.coe.ess.myTime.TimesheetCreate.manualTimeEntryOnDone(kony.apps.coe.ess.globalVariables.taskStartTime);
    } else {
        kony.apps.coe.ess.myTime.TimesheetCreate.manualTimeEntryOnDone();
    }
}