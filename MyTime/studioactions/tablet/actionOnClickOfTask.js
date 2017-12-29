function actionOnClickOfTask(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_bd222c980701453b8be558e85c5ab2aa(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_bd222c980701453b8be558e85c5ab2aa(eventobject, sectionNumber, rowNumber) {
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
            frmTimeSheetCreateTab.flxSearchPopup.setVisibility(false);
            frmTimeSheetCreateTab.flxOnlineSearch.setVisibility(false);
        } else {
            handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.mytime.createtimesheet.selecttimeInterval"));
        }
    } else {
        alert("Please Select any Day");
    }
}