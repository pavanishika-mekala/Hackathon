function AS_Segment_10adf5dc2b6a4a9aad6f557a66a5f718(eventobject, sectionNumber, rowNumber) {
    if (frmTimeSheetCreateTab.flexSlider) {
        kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskTab(frmTimeSheetCreateTab.segTasks.selectedRowItems[0]);
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
        alert("Please Select any Day");
    }
}