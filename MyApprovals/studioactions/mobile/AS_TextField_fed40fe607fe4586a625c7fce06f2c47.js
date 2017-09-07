function AS_TextField_fed40fe607fe4586a625c7fce06f2c47(eventobject, changedtext) {
    var searchText = frmSelect.txtSearch.text;
    var filterobj = new kony.apps.coe.ess.Approvals.frmSelectBackendLogic();
    filterobj.searchDataInPeople(searchText);
    //kony.apps.coe.ess.Approvals.frmSelectBackendLogic.getPeopleInstance().searchDataInPeople(searchText);
}