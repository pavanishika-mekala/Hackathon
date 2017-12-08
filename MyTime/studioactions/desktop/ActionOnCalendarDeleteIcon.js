function ActionOnCalendarDeleteIcon(eventobject, x, y) {
    return AS_Image_9866c59c4d414899b6565e2683029f85(eventobject, x, y);
}

function AS_Image_9866c59c4d414899b6565e2683029f85(eventobject, x, y) {
    frmCalendarViewDW.flxBlank.setVisibility(true);
    frmCalendarViewDW.flxDeleteTimesheetPopup.setVisibility(true);
    frmCalendarViewDW.forceLayout();
}