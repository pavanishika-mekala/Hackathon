function tab_onClickBAckBtn(eventobject) {
    return AS_FlexContainer_f650120701894fce84e747e4b8ecd648(eventobject);
}

function AS_FlexContainer_f650120701894fce84e747e4b8ecd648(eventobject) {
    frmTabDashboard.flxDecisionSegment.isVisible = false;
    frmTabDashboard.flxBottom.isVisible = true;
    eval("frmTabDashboard.flxApprove" + backIndex).isVisible = true;
    eval("frmTabDashboard.flxReject" + backIndex).isVisible = true;
    eval("frmTabDashboard.flxDetailView" + backIndex).isVisible = false;
}