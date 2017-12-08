function leaveOnClick(eventobject, x, y) {
    return AS_Label_3e5f13ffd0214b559a1c4656f8a9a4ad(eventobject, x, y);
}

function AS_Label_3e5f13ffd0214b559a1c4656f8a9a4ad(eventobject, x, y) {
    var requestedListObj = new kony.apps.coe.ess.Approvals.RequestedList();
    requestedListObj.LoadFilterAndShowForm("Leave");
}