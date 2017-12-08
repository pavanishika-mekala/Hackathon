function AS_onClick_selectTimeType(eventobject) {
    return AS_FlexContainer_3ef82538fc4b4db687577dbe43987b60(eventobject);
}

function AS_FlexContainer_3ef82538fc4b4db687577dbe43987b60(eventobject) {
    if (frmTimeSheetCreate.imgArrowDown.src == "arow_down.png") {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    } else if (frmTimeSheetCreate.imgArrowDown.src == "arow_up.png") {
        frmTimeSheetCreate.segTimeType.setVisibility(false);
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
    }
}