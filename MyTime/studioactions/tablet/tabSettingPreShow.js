function tabSettingPreShow(eventobject) {
    return AS_Form_e69d0adb340c45f789dfa1c2813d09d3(eventobject);
}

function AS_Form_e69d0adb340c45f789dfa1c2813d09d3(eventobject) {
    var onFrmTimesheetSettingsUIPreShowObj = new kony.apps.coe.ess.myTime.TimesheetSettingsUI();
    onFrmTimesheetSettingsUIPreShowObj.onFrmTimesheetSettingsUIPreShow();
    kony.apps.coe.ess.settings.getSettingsObject().preShow();
}