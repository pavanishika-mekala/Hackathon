function AS_TextField_d7851692192f4afaa2602f611db15e32(eventobject, changedtext) {
    var searchText = frmEmployeeLookUp.txtSearchDelegate.text;
    kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().searchDataInList(searchText);
}