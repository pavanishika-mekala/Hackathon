function AS_Segment_onRowClick_EmloyeeLookUp(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_48d58daf3e0d4f069ff5e610e9d6e953(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_48d58daf3e0d4f069ff5e610e9d6e953(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().onRowClickOfList();
}