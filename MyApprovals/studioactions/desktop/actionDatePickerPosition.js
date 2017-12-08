function actionDatePickerPosition(eventobject) {
    return AS_Form_156a6820f0af4a978215a58eb98dfa48(eventobject);
}

function AS_Form_156a6820f0af4a978215a58eb98dfa48(eventobject) {
    var context1 = {
        "widget": frmDelegationRequests.flxCalendarRendererOne,
        "anchor": "bottom"
    };
    frmDelegationRequests.datePickerFrom.setContext(context1);
    var context2 = {
        "widget": frmDelegationRequests.flxCalendarRendererTwo,
        "anchor": "bottom"
    };
    frmDelegationRequests.datePickerTo.setContext(context2);
    frmDelegationRequests.flxNewDelegationRequests.setVisibility(false);
    frmDelegationRequests.forceLayout();
    frmDelegationRequests.flxMain.setVisibility(true);
    frmDelegationRequests.forceLayout();
}