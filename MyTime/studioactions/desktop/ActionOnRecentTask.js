function ActionOnRecentTask(eventobject, changedtext) {
    return AS_TextField_a67757c19e474d2cab045293928d5ca5(eventobject, changedtext);
}

function AS_TextField_a67757c19e474d2cab045293928d5ca5(eventobject, changedtext) {
    frmCreateViewDW.tbxSearch.width = "400px";
    frmCreateViewDW.tbxSearch.skin = "sknTbxBGeaeaeaB1PxdfdfdfR5DW";
    frmCreateViewDW.flxCancel.setVisibility(true);
    frmCreateViewDW.flxTask.setVisibility(true);
    frmCreateViewDW.imgSearch.setVisibility(false);
    frmCreateViewDW.forceLayout();
}