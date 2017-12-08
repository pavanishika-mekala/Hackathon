function AS_FlexContainer_0e8495672c0e4aa6b2f1ce712c79532d(eventobject) {
    if (frmTimeSheetCreate.imgArrowDown.src == "arow_down.png") {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    } else if (frmTimeSheetCreate.imgArrowDown.src == "arow_up.png") {
        if (kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.isWork) {
            frmTimeSheetCreate.segTimeType.setVisibility(false);
        } else {
            frmTimeSheetCreate.segLeaveSelection.setVisibility(false);
        }
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
    }
}