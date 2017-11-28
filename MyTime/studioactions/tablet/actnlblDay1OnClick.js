function actnlblDay1OnClick(eventobject, context) {
    return AS_Button_e75d053baf3f4d798dee065c6b75a07b(eventobject, context);
}

function AS_Button_e75d053baf3f4d798dee065c6b75a07b(eventobject, context) {
    (new kony.apps.coe.ess.myTime.ListViewTabUI()).onEachDaySelection(context, eventobject, 0);
}