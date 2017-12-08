function flexB4OnClick(eventobject) {
    return AS_FlexContainer_8dda0d886b864686a1c57370bdd360ef(eventobject);
}

function AS_FlexContainer_8dda0d886b864686a1c57370bdd360ef(eventobject) {
    if (frmHistory.flexB4.skin == "sknFlxLeaveTypeSelected") {
        frmHistory.flexB4.skin = "sknFlxLeaveTypeUnselected";
        frmHistory.desc4.skin = "sknLblLeaveTypeUnselected";
        frmHistory.selectimg4.src = "selectblue.png";
    } else {
        frmHistory.flexB4.skin = "sknFlxLeaveTypeSelected";
        frmHistory.desc4.skin = "sknLblLeaveTypeSelected";
        frmHistory.selectimg4.src = "select_pendingcopy.png";
    }
}