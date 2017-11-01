function AS_Button_30deee6a0af344568ed634e603e4b2c2(eventobject) {
    if (frmApplyLeave.flxLeaveBalanceDetails.isVisible) {
        kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
    } else {
        toastMsg.showToastMsg("Requested leaves are insufficient", 2000);
    }
    //kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit();
}