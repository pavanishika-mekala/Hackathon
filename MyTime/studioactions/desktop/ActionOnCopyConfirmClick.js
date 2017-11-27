function ActionOnCopyConfirmClick(eventobject, x, y) {
    return AS_Label_53a3ac53c64f4e2991b9c0b3c076aacc(eventobject, x, y);
}

function AS_Label_53a3ac53c64f4e2991b9c0b3c076aacc(eventobject, x, y) {
    frmCalendarViewDW.flxCopyWeek.setVisibility(false);
    frmCalendarViewDW.flxCopy.skin = "slFbox";
    frmCalendarViewDW.imgCopy.src = "clone.png";
    frmCalendarViewDW.imgCopy.width = "25dp";
    frmCalendarViewDW.imgCopy.height = "25dp";
    frmCalendarViewDW.forceLayout();
}