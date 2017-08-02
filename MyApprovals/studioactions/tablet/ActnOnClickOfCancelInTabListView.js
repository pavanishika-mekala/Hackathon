function ActnOnClickOfCancelInTabListView(eventobject) {
    return AS_FlexContainer_5ce928b8ca6443ec87350f9abd47dc24(eventobject);
}

function AS_FlexContainer_5ce928b8ca6443ec87350f9abd47dc24(eventobject) {
    kony.apps.coe.ess.Approvals.tabApprovalsListView.segPeopleOnClickCancelReset();
    frmTabListView.flxEmployeeSearch.setVisibility(false);
    frmTabListView.txtSearchPeople.text = null;
}