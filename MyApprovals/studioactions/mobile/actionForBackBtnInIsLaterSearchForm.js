function actionForBackBtnInIsLaterSearchForm(eventobject) {
    return AS_Button_0305732d16b945aebe815d41b5a7b045(eventobject);
}

function AS_Button_0305732d16b945aebe815d41b5a7b045(eventobject) {
    frmApprovalHome.tbxLaterFilter.text = "";
    frmApprovalHome.tbxSearch.text = "";
    frmApprovalHome.show();
    frmRequestedList.destroy();
}