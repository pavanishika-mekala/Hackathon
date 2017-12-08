function flexB3OnClick(eventobject) {
    return AS_FlexContainer_e61e40cc4185487ba345c8c8e05fe146(eventobject);
}

function AS_FlexContainer_e61e40cc4185487ba345c8c8e05fe146(eventobject) {
    if (frmHistory.flexB3.skin == "sknFlxLeaveTypeSelected") {
        frmHistory.flexB3.skin = "sknFlxLeaveTypeUnselected";
        frmHistory.desc3.skin = "sknLblLeaveTypeUnselected";
        frmHistory.selectimg3.src = "selectblue.png";
        personalLev = "unselect";
    } else {
        frmHistory.flexB3.skin = "sknFlxLeaveTypeSelected";
        frmHistory.desc3.skin = "sknLblLeaveTypeSelected";
        frmHistory.selectimg3.src = "select_pendingcopy.png";
        personalLev = "select";
    }
}