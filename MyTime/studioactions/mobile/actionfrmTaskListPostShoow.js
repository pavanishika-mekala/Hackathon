function actionfrmTaskListPostShoow(eventobject) {
    return AS_Form_7aa5164c584749ed96c1994f54cf5414(eventobject);
}

function AS_Form_7aa5164c584749ed96c1994f54cf5414(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    var prevForm = kony.application.getPreviousForm();
    if (prevForm === frmTimeSheetCreate) {
        frmTaskList.lblSkip.setVisibility(false);
    } else {
        frmTaskList.lblSkip.setVisibility(true);
    }
}