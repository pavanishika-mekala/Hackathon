function ActionOnListViewDeleteConfirm(eventobject, x, y) {
    return AS_Label_d6f92e714a5243718bbcb3ad0a5c4085(eventobject, x, y);
}

function AS_Label_d6f92e714a5243718bbcb3ad0a5c4085(eventobject, x, y) {
    frmListViewDW.flxBlank.setVisibility(false);
    frmListViewDW.flxDeleteTimesheetPopup.setVisibility(false);
    frmListViewDW.forceLayout();
}