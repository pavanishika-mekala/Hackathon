function frmRequestedListSelectonClickTab(eventobject, x, y) {
    return AS_Label_a4a5424b5a9047229a060a2863fba517(eventobject, x, y);
}

function AS_Label_a4a5424b5a9047229a060a2863fba517(eventobject, x, y) {
    try {
        kony.apps.coe.ess.Approvals.RequestedLists.MakeSegmentMultipleSelect();
    } catch (e) {
        alert(e.message);
    }
}