function ActionOnCalendarCopyConfirm(eventobject, x, y) {
    return AS_Label_4a07772889f24c6baa8e6b3029ca0722(eventobject, x, y);
}

function AS_Label_4a07772889f24c6baa8e6b3029ca0722(eventobject, x, y) {
    frmCalendarViewDW.flxSegCopy.setVisibility(false);
    frmCalendarViewDW.flxCopy.skin = "slFbox";
    frmCalendarViewDW.imgCopy.src = "clone.png";
    frmCalendarViewDW.imgCopy.width = "25dp";
    frmCalendarViewDW.imgCopy.height = "25dp";
    frmCalendarViewDW.forceLayout();
}