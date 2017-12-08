function frmLoginflxNavigateToLoginOnClick(eventobject) {
    return AS_FlexContainer_2916e2397d4e447cbd705b1af2f6d360(eventobject);
}

function AS_FlexContainer_2916e2397d4e447cbd705b1af2f6d360(eventobject) {
    frmLoginDesk.flxReconfigure.setVisibility(false);
    frmLoginDesk.flxLoginMain.setVisibility(true);
    frmLoginDesk.forceLayout();
}