function flexB1OnClick(eventobject) {
    return AS_FlexContainer_e640b2a68a644d909fff09f5d16911e3(eventobject);
}

function AS_FlexContainer_e640b2a68a644d909fff09f5d16911e3(eventobject) {
    if (frmHistory.flexB1.skin == "sknFlxLeaveTypeSelected") {
        frmHistory.flexB1.skin = "sknFlxLeaveTypeUnselected";
        frmHistory.desc1.skin = "sknLblLeaveTypeUnselected";
        frmHistory.selectimg1.src = "selectblue.png";
        casualLve = "unselect";
    } else {
        frmHistory.flexB1.skin = "sknFlxLeaveTypeSelected";
        frmHistory.desc1.skin = "sknLblLeaveTypeSelected";
        frmHistory.selectimg1.src = "select_pendingcopy.png";
        casualLve = "select";
    }
}