function actionForBackBtnInIsLaterSearchFormTab(eventobject) {
    return AS_Button_j72b67e6ef0f4c898ff557905987d08f(eventobject);
}

function AS_Button_j72b67e6ef0f4c898ff557905987d08f(eventobject) {
    frmApprovalHome.tbxLaterFilter.text = "";
    frmApprovalHome.tbxSearch.text = "";
    frmApprovalHome.show();
    frmRequestedList.destroy();
}