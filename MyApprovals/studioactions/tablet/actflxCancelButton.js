function actflxCancelButton(eventobject) {
    return AS_FlexContainer_40758f56ed4742058d9351d6b65e94ff(eventobject);
}

function AS_FlexContainer_40758f56ed4742058d9351d6b65e94ff(eventobject) {
    kony.apps.coe.ess.Approvals.tabApprovalsListView.segPeopleOnClickCancelReset();
    frmTabListView.flxEmployeeSearch.setVisibility(false);
    frmTabListView.txtSearchPeople.text = null;
}