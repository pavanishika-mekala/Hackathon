function ActionOnCalendarCopyCancelClick(eventobject, x, y) {
    return AS_Label_0260683dc90c4db191cd8a70b30d1624(eventobject, x, y);
}

function AS_Label_0260683dc90c4db191cd8a70b30d1624(eventobject, x, y) {
    frmCalendarViewDW.flxSegCopy.setVisibility(false);
    frmCalendarViewDW.flxCopy.skin = "slFbox";
    frmCalendarViewDW.imgCopy.src = "clone.png";
    frmCalendarViewDW.imgCopy.width = "25dp";
    frmCalendarViewDW.imgCopy.height = "25dp";
    frmCalendarViewDW.forceLayout();
}