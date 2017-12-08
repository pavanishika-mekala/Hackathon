function AS_FlexContainer_fc7ce5d6636f4fcc8e4f1509d32b3de2(eventobject, x, y) {
    //used to enable the hamburger icon on leave home screen if it is invisible
    if (frmLeaveHome.flxHamburgerMenu.isVisible === false) {
        frmLeaveHome.flxHamburgerMenu.isVisible = true;
    }
    kony.application.getPreviousForm().show();
}