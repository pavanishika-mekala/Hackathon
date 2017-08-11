function AS_TextField_b38c96e16a2a40f9ae24101fdda05ad7(eventobject, changedtext) {
    alert("1");
    var searchText = frmEmployeeLookUp.txtSearchDelegate.text;
    kony.print("soumya text" + searchText);
    kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.searchDataInList(searchText);
}