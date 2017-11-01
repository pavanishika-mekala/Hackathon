function AS_Button_a5135a69ea244d5fa262812c7c9e83a2(eventobject) {
    if (frmApplyLeave.flxLeaveBalanceDetails.isVisible) {
        kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
    } else {
        toastMsg.showToastMsg("Requested leaves are insufficient", 2000);
    }
    //kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
}