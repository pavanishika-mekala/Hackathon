function flexB7OnClick(eventobject) {
    return AS_FlexContainer_64d5fce2e1804d8ab235952545337e69(eventobject);
}

function AS_FlexContainer_64d5fce2e1804d8ab235952545337e69(eventobject) {
    if (frmHistory.flexB7.skin == "sknFlxLeaveTypeSelected") {
        frmHistory.flexB7.skin = "sknFlxLeaveTypeUnselected";
        frmHistory.desc7.skin = "sknLblLeaveTypeUnselected";
        frmHistory.selectimg7.src = "selectblue.png";
    } else {
        frmHistory.flexB7.skin = "sknFlxLeaveTypeSelected";
        frmHistory.desc7.skin = "sknLblLeaveTypeSelected";
        frmHistory.selectimg7.src = "select_pendingcopy.png";
    }
}