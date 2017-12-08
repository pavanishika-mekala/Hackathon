function flexB8OnClick(eventobject) {
    return AS_FlexContainer_72a16018f6e94f64a216c0ca31b6d643(eventobject);
}

function AS_FlexContainer_72a16018f6e94f64a216c0ca31b6d643(eventobject) {
    if (frmHistory.flexB8.skin == "sknFlxLeaveTypeSelected") {
        frmHistory.flexB8.skin = "sknFlxLeaveTypeUnselected";
        frmHistory.desc8.skin = "sknLblLeaveTypeUnselected";
        frmHistory.selectimg8.src = "selectblue.png";
    } else {
        frmHistory.flexB8.skin = "sknFlxLeaveTypeSelected";
        frmHistory.desc8.skin = "sknLblLeaveTypeSelected";
        frmHistory.selectimg8.src = "select_pendingcopy.png";
    }
}