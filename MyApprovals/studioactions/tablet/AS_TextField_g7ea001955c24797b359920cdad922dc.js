function AS_TextField_g7ea001955c24797b359920cdad922dc(eventobject, changedtext) {
    var searchText = frmSelect.txtSearch.text;
    var filterobj = new kony.apps.coe.ess.Approvals.frmSelectBackendLogic();
    filterobj.searchDataInPeople(searchText);
}