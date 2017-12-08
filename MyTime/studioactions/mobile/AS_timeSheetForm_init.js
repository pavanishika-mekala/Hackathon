function AS_timeSheetForm_init(eventobject) {
    return AS_Form_15fc33cc288e432690c92e3f9639f82c(eventobject);
}

function AS_Form_15fc33cc288e432690c92e3f9639f82c(eventobject) {
    kony.apps.coe.ess.globalVariables.currentTaskStartIndex = kony.apps.coe.ess.globalVariables.getTimeIndex(kony.apps.coe.ess.appconfig.defaultSliderStartTime);
    kony.apps.coe.ess.globalVariables.currentTaskEndIndex = kony.apps.coe.ess.globalVariables.getTimeIndex(kony.apps.coe.ess.appconfig.defaultSliderEndTime);
}