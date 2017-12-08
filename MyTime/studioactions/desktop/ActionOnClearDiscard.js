function ActionOnClearDiscard(eventobject, x, y) {
    return AS_Label_2bd5793dc60c416a8b2ae5fb2ae11524(eventobject, x, y);
}

function AS_Label_2bd5793dc60c416a8b2ae5fb2ae11524(eventobject, x, y) {
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.flxDiscardTimesheetPopup.setVisibility(false);
    frmCreateViewDW.forceLayout();
}