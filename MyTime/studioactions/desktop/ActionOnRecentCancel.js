function ActionOnRecentCancel(eventobject) {
    return AS_FlexContainer_c90a3cf06d4d419890094671c7f6ec7a(eventobject);
}

function AS_FlexContainer_c90a3cf06d4d419890094671c7f6ec7a(eventobject) {
    frmCreateViewDW.tbxSearch.width = "230px";
    frmCreateViewDW.tbxSearch.skin = "skntbxFb8b8b8R40Bd8d8d8DW";
    frmCreateViewDW.tbxSearch.text = "";
    frmCreateViewDW.flxCancel.setVisibility(false);
    frmCreateViewDW.flxTask.setVisibility(false);
    frmCreateViewDW.imgSearch.setVisibility(true);
    frmCreateViewDW.forceLayout();
}