function ExpenseOnclick(eventobject, x, y) {
    return AS_Label_f21982dcb06b4259a0043f3d7cda38ed(eventobject, x, y);
}

function AS_Label_f21982dcb06b4259a0043f3d7cda38ed(eventobject, x, y) {
    var requestedListObj = new kony.apps.coe.ess.Approvals.RequestedList();
    requestedListObj.LoadFilterAndShowForm("Expense");
}