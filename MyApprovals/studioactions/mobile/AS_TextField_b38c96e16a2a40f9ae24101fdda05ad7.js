function AS_TextField_b38c96e16a2a40f9ae24101fdda05ad7(eventobject, changedtext) {
    var searchText = frmEmployeeLookUp.txtSearchDelegate.text;
    kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().searchDataInList(searchText);
}