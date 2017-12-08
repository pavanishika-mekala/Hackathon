function ActionOnChangeTaskClick(eventobject) {
    return AS_FlexContainer_f36f0429c08f449d8d9364636d715ea2(eventobject);
}

function AS_FlexContainer_f36f0429c08f449d8d9364636d715ea2(eventobject) {
    frmCreateViewDW.flxBlank.setVisibility(true);
    frmCreateViewDW.flxSelectTask.setVisibility(true);
    frmCreateViewDW.flxAdvSeg.setVisibility(false);
    frmCreateViewDW.flxSegSearch.setVisibility(true);
    frmCreateViewDW.flxSelectId.setVisibility(false);
    frmCreateViewDW.forceLayout();
}