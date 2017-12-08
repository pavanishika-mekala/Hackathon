function AS_Form_221b4880ea274db59be18f00787d7605(eventobject) {
    var dateObj = new Date();
    frmHistory.datePickerFrom.dateComponents = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    frmHistory.datePickerTo.dateComponents = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    (new kony.apps.coe.ess.ApprovalHistoryDW()).initApprovalHistory();
    (new kony.apps.coe.ess.ApprovalHistoryDW()).initApprovalStatusBasesHistory();
}