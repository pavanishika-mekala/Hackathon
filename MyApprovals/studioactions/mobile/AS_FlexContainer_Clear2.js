function AS_FlexContainer_Clear2(eventobject) {
    return AS_FlexContainer_3c39d29abe9b40f3b14d503bbb5a7700(eventobject);
}

function AS_FlexContainer_3c39d29abe9b40f3b14d503bbb5a7700(eventobject) {
    kony.apps.coe.ess.Approvals.Select.onDone2();
    if (countofticks2 == 0) {
        frmSearch.lblLeaveStatus.skin = "sknLblMobCCCCCC100OFS36px";
    } else {
        frmSearch.lblLeaveStatus.skin = "sknLblMobFC333333Op100FS100";
    }
}