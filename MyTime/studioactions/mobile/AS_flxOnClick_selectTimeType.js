function AS_flxOnClick_selectTimeType(eventobject) {
    return AS_FlexContainer_3dfa5efb45db4e70bdefab53d0b808f8(eventobject);
}

function AS_FlexContainer_3dfa5efb45db4e70bdefab53d0b808f8(eventobject) {
    if (frmTimeSheetCreate.imgArrowDown.src == "arow_down.png") {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    } else if (frmTimeSheetCreate.imgArrowDown.src == "arow_up.png") {
        frmTimeSheetCreate.segTimeType.setVisibility(false);
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
    }
}