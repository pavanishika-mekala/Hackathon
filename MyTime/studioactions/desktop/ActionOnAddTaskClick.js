function ActionOnAddTaskClick(eventobject) {
    return AS_FlexContainer_39963d07e0ea4b9db936f37deade3389(eventobject);
}

function AS_FlexContainer_39963d07e0ea4b9db936f37deade3389(eventobject) {
    frmCreateViewDW.flxBlank.setVisibility(true);
    frmCreateViewDW.flxSelectTask.setVisibility(true);
    frmCreateViewDW.flxAdvSeg.setVisibility(false);
    frmCreateViewDW.flxSegSearch.setVisibility(true);
    frmCreateViewDW.flxSelectId.setVisibility(false);
    frmCreateViewDW.flxTask.setVisibility(false);
    frmCreateViewDW.forceLayout();
}