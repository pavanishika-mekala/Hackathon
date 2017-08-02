function AllOnclick(eventobject, x, y) {
    return AS_Label_644183081ec94884b02ca2f5af95e220(eventobject, x, y);
}

function AS_Label_644183081ec94884b02ca2f5af95e220(eventobject, x, y) {
    var requestedListObj = new kony.apps.coe.ess.Approvals.RequestedList();
    requestedListObj.LoadFilterAndShowForm("All");
}