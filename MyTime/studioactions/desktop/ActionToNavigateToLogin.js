function ActionToNavigateToLogin(eventobject) {
    return AS_FlexContainer_76deb1c3bebe4827848cbbed3ede7805(eventobject);
}

function AS_FlexContainer_76deb1c3bebe4827848cbbed3ede7805(eventobject) {
    frmLoginDesk.flxReconfigure.setVisibility(false);
    frmLoginDesk.flxLoginMain.setVisibility(true);
    frmLoginDesk.forceLayout();
}