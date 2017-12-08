function frmLoginFlxReconfigOnClick(eventobject) {
    return AS_FlexContainer_1f4b918e234f4d12bfa2857fb6cb9c92(eventobject);
}

function AS_FlexContainer_1f4b918e234f4d12bfa2857fb6cb9c92(eventobject) {
    frmLoginDesk.flxLoginMain.setVisibility(false);
    frmLoginDesk.flxReconfigure.setVisibility(true);
    frmLoginDesk.forceLayout();
}