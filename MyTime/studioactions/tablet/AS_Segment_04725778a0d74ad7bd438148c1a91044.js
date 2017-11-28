function AS_Segment_04725778a0d74ad7bd438148c1a91044(eventobject, sectionNumber, rowNumber) {
    if (frmTimeSheetCreateTab.flexSlider) {
        kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskTab(frmTimeSheetCreateTab.segProjectTaskSelection.selectedRowItems[0]);
        frmTimeSheetCreateTab.btnStep1.skin = "btnTaskSelectedc3d9e1";
        frmTimeSheetCreateTab.btnStep1.text = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.TaskSelected");
        frmTimeSheetCreateTab.lblSelectTask.text = kony.i18n.getLocalizedString("i18n.ess.mytime.createtimesheet.selecttimetype.valueKA");
        frmTimeSheetCreateTab.btnStep2.skin = "sknBtn1c7393";
        frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.setVisibility(true);
        frmTimeSheetCreateTab.segProjectTaskSelection.setVisibility(false);
        frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
        frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(false);
        frmTimeSheetCreateTab.txtBoxSearch.setVisibility(false);
        frmTimeSheetCreateTab.imgCancel.setVisibility(false);
    } else {
        alert("Please Select any Day");
    }
}