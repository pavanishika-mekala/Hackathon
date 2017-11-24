function ActionOnCalendarEditCancel(eventobject, x, y) {
    return AS_Label_5e24a79243ef4b528e9f3750c3a91c11(eventobject, x, y);
}

function AS_Label_5e24a79243ef4b528e9f3750c3a91c11(eventobject, x, y) {
    frmCalendarViewDW.flxBlank.setVisibility(false);
    frmCalendarViewDW.flxDeleteTimesheetPopup.setVisibility(false);
    frmCalendarViewDW.forceLayout();
}