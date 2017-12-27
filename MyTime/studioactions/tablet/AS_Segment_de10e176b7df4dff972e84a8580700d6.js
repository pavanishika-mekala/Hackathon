function AS_Segment_de10e176b7df4dff972e84a8580700d6(eventobject, sectionNumber, rowNumber) {
    if (frmTimeSheetCreateTab.flexSlider) {
        var selectTask = kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskTab(frmTimeSheetCreateTab.segTasks.selectedRowItems[0]);
        if (!selectTask) {
            frmTimeSheetCreateTab.btnStep1.skin = "btnTaskSelectedc3d9e1";
            frmTimeSheetCreateTab.btnStep1.text = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.TaskSelected");
            frmTimeSheetCreateTab.lblSelectTask.text = kony.i18n.getLocalizedString("i18n.ess.mytime.createtimesheet.selecttimetype.valueKA");
            frmTimeSheetCreateTab.btnStep2.skin = "sknBtn1c7393";
            frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.setVisibility(true);
            frmTimeSheetCreateTab.segTasks.setVisibility(false);
            frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
            frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(false);
            frmTimeSheetCreateTab.txtBoxSearch.setVisibility(false);
            frmTimeSheetCreateTab.imgCancel.setVisibility(false);
        } else {
            handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.mytime.createtimesheet.selecttimeInterval"));
        }
    } else {
        alert("Please Select any Day");
    }
}