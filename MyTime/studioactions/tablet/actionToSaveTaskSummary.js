function actionToSaveTaskSummary(eventobject) {
    return AS_FlexContainer_efe13f08aae54d679fee4050bfff56f4(eventobject);
}

function AS_FlexContainer_efe13f08aae54d679fee4050bfff56f4(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Desc = frmTimeSheetCreateTab.txtAreaDesc.text;
    frmTimeSheetCreateTab.flxDescOptions.setVisibility(false);
    frmTimeSheetCreateTab.flxEditSummary.setVisibility(true);
}