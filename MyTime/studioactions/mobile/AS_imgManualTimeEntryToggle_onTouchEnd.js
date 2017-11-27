function AS_imgManualTimeEntryToggle_onTouchEnd(eventobject, x, y) {
    return AS_Image_4d7eeca9d50b4fa4a1ca61e3b86b8452(eventobject, x, y);
}

function AS_Image_4d7eeca9d50b4fa4a1ca61e3b86b8452(eventobject, x, y) {
    (new kony.apps.coe.ess.myTime.TimesheetSettingsUI()).toggleManualTimeEntry();
}