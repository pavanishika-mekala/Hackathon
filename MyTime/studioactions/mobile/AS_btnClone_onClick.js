function AS_btnClone_onClick(eventobject) {
    return AS_Button_f9533865cb55463b8000ca6b56c15732(eventobject);
}

function AS_Button_f9533865cb55463b8000ca6b56c15732(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.settingDataToCopySegment();
    kony.apps.coe.ess.myTime.TimesheetCreate.onClickCloneButton();
}