function actnflxCopyIconFrmListViewOnClick(eventobject) {
    return AS_FlexContainer_e71a2d2d091b4e2d87e0771f659f3989(eventobject);
}

function AS_FlexContainer_e71a2d2d091b4e2d87e0771f659f3989(eventobject) {
    kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().populateSegmentData();
    frmListView.flxCopyWeek.setVisibility(true);
}