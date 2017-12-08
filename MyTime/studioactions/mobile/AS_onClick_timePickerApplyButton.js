function AS_onClick_timePickerApplyButton(eventobject) {
    return AS_Button_15f05e6d57a44c38808c2f46d49d8048(eventobject);
}

function AS_Button_15f05e6d57a44c38808c2f46d49d8048(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.pickerViewOnClickApply();
    kony.apps.coe.ess.myTime.TimesheetCreate.popluateTimePickerData();
    frmTimeSheetCreate.timePicker.height = "100%";
    frmTimeSheetCreate.forceLayout();
}