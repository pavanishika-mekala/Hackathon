function AS_Button_30deee6a0af344568ed634e603e4b2c2(eventobject) {
    if ((!kony.string.equalsIgnoreCase(frmApplyLeave.lblLeaveBalanceCount.text, "0")) || kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType == "XABS") {
        kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
    } else {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmApplyLeave.insufficientLeaveBalance"), 2000);
    }
    //kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
}