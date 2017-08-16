function onclicktodateintabapplyleave(eventobject, x, y) {
    return AS_Label_d89b57c1a8bc427cbe4274d8ab86f272(eventobject, x, y);
}

function AS_Label_d89b57c1a8bc427cbe4274d8ab86f272(eventobject, x, y) {
    frmTabApplyLeave.lblToCal.skin = sknlbldateselectfocus;
    frmTabApplyLeave.flxOverlay.setVisibility(false);
    frmTabApplyLeave.flxCalendar.setVisibility(true);
    (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblToCal)).addDynamicCalendar();
}