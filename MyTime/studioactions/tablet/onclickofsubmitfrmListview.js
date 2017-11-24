function onclickofsubmitfrmListview(eventobject) {
    return AS_Button_c10cd6cce5cf493dbfc036aef4416a49(eventobject);
}

function AS_Button_c10cd6cce5cf493dbfc036aef4416a49(eventobject) {
    kony.apps.coe.ess.myTime.ListViewTabDetails.checkForSubmit = true;
    kony.apps.coe.ess.myTime.ListViewTabDetails.dayCounter = 0;
    (new kony.apps.coe.ess.myTime.ListViewTabDetails()).checkForSubmitStatus();
}