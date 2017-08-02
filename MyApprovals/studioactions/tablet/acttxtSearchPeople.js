function acttxtSearchPeople(eventobject, changedtext) {
    return AS_TextField_3556a23824984684a14ac75e20a4902c(eventobject, changedtext);
}

function AS_TextField_3556a23824984684a14ac75e20a4902c(eventobject, changedtext) {
    var searchText = frmTabListView.txtSearchPeople.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    frmTabListView.flxEmployeeSearch.setVisibility(true);
}