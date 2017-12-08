function ActionOnListViewDeleteCancel(eventobject, x, y) {
    return AS_Label_3bff7e4d82de4f009b8560a045f29712(eventobject, x, y);
}

function AS_Label_3bff7e4d82de4f009b8560a045f29712(eventobject, x, y) {
    frmListViewDW.flxBlank.setVisibility(false);
    frmListViewDW.flxDeleteTimesheetPopup.setVisibility(false);
    frmListViewDW.forceLayout();
}