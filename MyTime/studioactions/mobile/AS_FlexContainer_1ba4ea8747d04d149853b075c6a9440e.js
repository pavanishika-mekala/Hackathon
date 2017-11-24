function AS_FlexContainer_1ba4ea8747d04d149853b075c6a9440e(eventobject) {
    if (frmTimeSheetCreate.imgArrowDown.src == "arow_down.png") {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    } else if (frmTimeSheetCreate.imgArrowDown.src == "arow_up.png") {
        frmTimeSheetCreate.segTimeType.setVisibility(false);
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
    }
}