function actTabPendingPS(eventobject) {
    return AS_Form_01c1cf9025e24adcafcff43255d5dab2(eventobject);
}

function AS_Form_01c1cf9025e24adcafcff43255d5dab2(eventobject) {
    var data = frmTabPendingList.segPendingList.data;
    frmTabPendingList.segPendingList.selectedRowIndex = [0, 0];
    (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).setLeaveDetails(data[0]);
}