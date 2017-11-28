function AS_manualTime_onTextChange(eventobject, changedtext) {
    return AS_TextField_83f803410b61430e919913785db9e82a(eventobject, changedtext);
}

function AS_TextField_83f803410b61430e919913785db9e82a(eventobject, changedtext) {
    if (kony.apps.coe.ess.globalVariables.taskStartTime != "") {
        kony.apps.coe.ess.myTime.TimesheetCreate.manualTimeEntryOnDone(kony.apps.coe.ess.globalVariables.taskStartTime);
    } else {
        kony.apps.coe.ess.myTime.TimesheetCreate.manualTimeEntryOnDone();
    }
}