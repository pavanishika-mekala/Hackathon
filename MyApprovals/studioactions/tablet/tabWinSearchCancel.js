function tabWinSearchCancel(eventobject) {
    return AS_FlexContainer_fd61c8d04c554100aeb095fc42a5beeb(eventobject);
}

function AS_FlexContainer_fd61c8d04c554100aeb095fc42a5beeb(eventobject) {
    kony.apps.coe.ess.Approvals.tabApprovalsListView.segPeopleOnClickCancelReset();
    frmTabListView.flxEmployeeSearch.setVisibility(false);
    frmTabListView.txtSearchPeople.text = null;
}