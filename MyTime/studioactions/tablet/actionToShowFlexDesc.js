function actionToShowFlexDesc(eventobject) {
    return AS_FlexContainer_h47233d49fd1436b92feafece1966a00(eventobject);
}

function AS_FlexContainer_h47233d49fd1436b92feafece1966a00(eventobject) {
    frmTimeSheetCreateTab.flxAddDesc.setVisibility(true);
    frmTimeSheetCreateTab.flxDescOptions.setVisibility(true);
    frmTimeSheetCreateTab.flxEditSummary.setVisibility(false);
    frmTimeSheetCreateTab.txtAreaDesc.text = "";
}