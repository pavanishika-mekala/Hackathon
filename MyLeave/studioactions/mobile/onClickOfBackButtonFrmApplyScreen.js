function onClickOfBackButtonFrmApplyScreen(eventobject, x, y) {
    return AS_FlexContainer_290932d48a7643e78ec241145b3a813e(eventobject, x, y);
}

function AS_FlexContainer_290932d48a7643e78ec241145b3a813e(eventobject, x, y) {
    //used to enable the hamburger icon on leave home screen if it is invisible
    if (frmLeaveHome.flxHamburgerMenu.isVisible === false) {
        frmLeaveHome.flxHamburgerMenu.isVisible = true;
    }
    kony.application.getPreviousForm().show();
}