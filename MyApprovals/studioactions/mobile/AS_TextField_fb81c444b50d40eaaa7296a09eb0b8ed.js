function AS_TextField_fb81c444b50d40eaaa7296a09eb0b8ed(eventobject, changedtext) {
    var searchText = frmEmployeeLookUp.txtSearchDelegate.text;
    kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().searchDataInList(searchText);
}