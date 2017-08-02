function actionfrmEmployeeLookUpPostShow(eventobject) {
    return AS_Form_302d7b447ba443898e345b510096940a(eventobject);
}

function AS_Form_302d7b447ba443898e345b510096940a(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}