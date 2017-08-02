function ActnOnDoneTBSearchTab(eventobject, changedtext) {
    return AS_TextField_b8aa17da717c4180b8bb5788948e33e9(eventobject, changedtext);
}

function AS_TextField_b8aa17da717c4180b8bb5788948e33e9(eventobject, changedtext) {
    var searchText = frmTabListView.txtSearchPeople.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    frmTabListView.flxEmployeeSearch.setVisibility(true);
}