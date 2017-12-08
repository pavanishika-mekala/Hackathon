function actionToHideFlxDesc(eventobject) {
    return AS_FlexContainer_f56cce7d3d8d4704a16a832a1fc46990(eventobject);
}

function AS_FlexContainer_f56cce7d3d8d4704a16a832a1fc46990(eventobject) {
    frmTimeSheetCreateTab.txtAreaDesc.text = "";
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Desc = "";
    frmTimeSheetCreateTab.flxAddDesc.setVisibility(false);
}