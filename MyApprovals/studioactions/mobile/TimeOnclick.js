function TimeOnclick(eventobject, x, y) {
    return AS_Label_34f315fa898d42c6b44ce6282d7142ae(eventobject, x, y);
}

function AS_Label_34f315fa898d42c6b44ce6282d7142ae(eventobject, x, y) {
    var requestedListObj = new kony.apps.coe.ess.Approvals.RequestedList();
    requestedListObj.LoadFilterAndShowForm("Time");
}