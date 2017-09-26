function AS_TextField_i5bb6eaccda24ba280276c8627c68294(eventobject, changedtext) {
    var searchText = frmEmployeeLookUp.txtSearchDelegate.text;
    kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().searchDataInList(searchText);
}