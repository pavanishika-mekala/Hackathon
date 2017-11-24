function ActionOnSubmitButtonCalendarClick(eventobject, x, y) {
    return AS_Button_1a71a37d9b9c41cca9632ac4f4e576ed(eventobject, x, y);
}

function AS_Button_1a71a37d9b9c41cca9632ac4f4e576ed(eventobject, x, y) {
    frmCalendarViewDW.flxBlank.setVisibility(true);
    frmCalendarViewDW.flxSubmitPopup.setVisibility(true);
    frmCalendarViewDW.forceLayout();
}