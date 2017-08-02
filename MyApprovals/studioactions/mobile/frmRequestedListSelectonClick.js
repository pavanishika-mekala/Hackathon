function frmRequestedListSelectonClick(eventobject, x, y) {
    return AS_Label_1d8c3f79c95c43a28408bd4f8f735a82(eventobject, x, y);
}

function AS_Label_1d8c3f79c95c43a28408bd4f8f735a82(eventobject, x, y) {
    try {
        kony.apps.coe.ess.Approvals.RequestedLists.MakeSegmentMultipleSelect();
    } catch (e) {
        alert(e.message);
    }
}