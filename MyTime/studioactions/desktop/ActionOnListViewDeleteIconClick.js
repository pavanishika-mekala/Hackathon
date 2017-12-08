function ActionOnListViewDeleteIconClick(eventobject, x, y) {
    return AS_Image_ec253d0af1314340a4cb93a6e508a70a(eventobject, x, y);
}

function AS_Image_ec253d0af1314340a4cb93a6e508a70a(eventobject, x, y) {
    frmListViewDW.flxBlank.setVisibility(true);
    frmListViewDW.flxDeleteTimesheetPopup.setVisibility(true);
    frmListViewDW.forceLayout();
}