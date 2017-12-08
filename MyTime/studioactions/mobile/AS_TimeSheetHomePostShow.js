function AS_TimeSheetHomePostShow(eventobject) {
    return AS_Form_951fb594672846e49bb25fb251524061(eventobject);
}

function AS_Form_951fb594672846e49bb25fb251524061(eventobject) {
    kony.print("perflogs time:  The time when list form is loaded is .......");
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.myTime.invokePostShowFunctions();
}