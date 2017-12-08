function frmTimesheetSettingsPreshow(eventobject) {
    return AS_Form_d3a27aa1a4d94b5b8ae1dfb11cc87eba(eventobject);
}

function AS_Form_d3a27aa1a4d94b5b8ae1dfb11cc87eba(eventobject) {
    var onFrmTimesheetSettingsUIPreShowObj = new kony.apps.coe.ess.myTime.TimesheetSettingsUI();
    onFrmTimesheetSettingsUIPreShowObj.onFrmTimesheetSettingsUIPreShow();
    kony.apps.coe.ess.settings.getSettingsObject().preShow();
}