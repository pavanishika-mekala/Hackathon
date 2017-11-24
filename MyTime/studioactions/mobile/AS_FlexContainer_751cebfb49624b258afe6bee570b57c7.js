function AS_FlexContainer_751cebfb49624b258afe6bee570b57c7(eventobject) {
    if (frmTimeSheetCreate.imgArrowDown.src == "arow_down.png") {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    } else if (frmTimeSheetCreate.imgArrowDown.src == "arow_up.png") {
        frmTimeSheetCreate.segTimeType.setVisibility(false);
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
    }
}