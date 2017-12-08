function ActnGetLeaveData(eventobject) {
    return AS_Form_8cad08b4392a4de197713eb6d4cb5d66(eventobject);
}

function AS_Form_8cad08b4392a4de197713eb6d4cb5d66(eventobject) {
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData();
    if (kony.apps.coe.ess.globalVariables.isSPA === true) {
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveDataSPA();
    }
}