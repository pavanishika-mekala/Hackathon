function AS_FlexContainer_4b1a27a2a73140c29940e40b3eef3995(eventobject) {
    if (frmTimeSheetCreate.imgArrowDown.src == "arow_down.png") {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    } else if (frmTimeSheetCreate.imgArrowDown.src == "arow_up.png") {
        frmTimeSheetCreate.segTimeType.setVisibility(false);
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
    }
}