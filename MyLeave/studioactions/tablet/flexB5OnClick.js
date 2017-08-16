function flexB5OnClick(eventobject) {
    return AS_FlexContainer_ba78025246664a8d93119bac8e9860df(eventobject);
}

function AS_FlexContainer_ba78025246664a8d93119bac8e9860df(eventobject) {
    if (frmHistory.flexB5.skin == "sknFlxLeaveTypeSelected") {
        frmHistory.flexB5.skin = "sknFlxLeaveTypeUnselected";
        frmHistory.desc5.skin = "sknLblLeaveTypeUnselected";
        frmHistory.selectimg5.src = "selectblue.png";
    } else {
        frmHistory.flexB5.skin = "sknFlxLeaveTypeSelected";
        frmHistory.desc5.skin = "sknLblLeaveTypeSelected";
        frmHistory.selectimg5.src = "select_pendingcopy.png";
    }
}