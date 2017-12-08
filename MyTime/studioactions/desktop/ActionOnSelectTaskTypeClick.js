function ActionOnSelectTaskTypeClick(eventobject) {
    return AS_FlexContainer_a08ca10693a34a689a4736f375ac4da2(eventobject);
}

function AS_FlexContainer_a08ca10693a34a689a4736f375ac4da2(eventobject) {
    frmCreateViewDW.flxBlank.setVisibility(true);
    frmCreateViewDW.flxSelectType.setVisibility(true);
    frmCreateViewDW.flxTask.setVisibility(false);
    frmCreateViewDW.forceLayout();
}