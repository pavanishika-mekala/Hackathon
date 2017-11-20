function AS_Button_a5135a69ea244d5fa262812c7c9e83a2(eventobject) {
    if ((!kony.string.equalsIgnoreCase(frmApplyLeave.lblLeaveBalanceCount.text, "0.0")) || kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType == "XABS") {
        kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
    } else {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmApplyLeave.insufficientLeaveBalance"), 2000);
    }
    //kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
}