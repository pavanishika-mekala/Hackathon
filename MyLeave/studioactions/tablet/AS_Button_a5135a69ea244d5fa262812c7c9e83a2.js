function AS_Button_a5135a69ea244d5fa262812c7c9e83a2(eventobject) {
    if ((!kony.string.equalsIgnoreCase(frmApplyLeave.lblLeaveBalanceCount.text, "0")) || kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType == "XABS") {
        if (kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType == "XABS") {
            var reasonComments = frmApplyLeave.txtComments.text;
            var attachmentHeight = frmApplyLeave.flxAddAtachment.height;
            kony.print("reasonComments::" + reasonComments + "    isVisible::" + frmApplyLeave.flxAddAtachment.isVisible);
            if (reasonComments == "" && (!frmApplyLeave.flxAddAtachment.isVisible || attachmentHeight == "0%")) {
                var messagetxt = kony.i18n.getLocalizedString("i18n.ess.frmApplyLeave.lblOtherabsenceError.valueKA");
                if (messagetxt == "") {
                    messagetxt = "Please justify your absence with a comment or attachment"
                }
                popupErrorAlert.lblMessage.text = messagetxt;
                popupErrorAlert.show();
                return;
            }
        }
        kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
    } else {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmApplyLeave.insufficientLeaveBalance"), 2000);
    }
    //kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
}