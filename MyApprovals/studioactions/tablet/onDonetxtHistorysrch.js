function onDonetxtHistorysrch(eventobject, changedtext) {
    return AS_TextField_ec5b31094f7346908f240ab8e3cf0105(eventobject, changedtext);
}

function AS_TextField_ec5b31094f7346908f240ab8e3cf0105(eventobject, changedtext) {
    var text = frmTabApprovalHistory.txtsrchbox.text;
    (new kony.apps.coe.ess.ApprovalHistoryTab()).DynamicSegmentSetDatabyEmployeeSearch(text, kony.apps.coe.ess.globalVariables.FrmTabApprovalsPeopleSearch);
}