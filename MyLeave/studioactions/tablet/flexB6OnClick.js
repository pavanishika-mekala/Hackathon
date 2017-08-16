function flexB6OnClick(eventobject) {
    return AS_FlexContainer_04eade99a44d4051b75f45bc882fe365(eventobject);
}

function AS_FlexContainer_04eade99a44d4051b75f45bc882fe365(eventobject) {
    if (frmHistory.flexB6.skin == "sknFlxLeaveTypeSelected") {
        frmHistory.flexB6.skin = "sknFlxLeaveTypeUnselected";
        frmHistory.desc6.skin = "sknLblLeaveTypeUnselected";
        frmHistory.selectimg6.src = "selectblue.png";
    } else {
        frmHistory.flexB6.skin = "sknFlxLeaveTypeSelected";
        frmHistory.desc6.skin = "sknLblLeaveTypeSelected";
        frmHistory.selectimg6.src = "select_pendingcopy.png";
    }
}