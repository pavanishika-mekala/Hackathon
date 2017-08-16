function actionfrmNotificationListPostShow(eventobject) {
    return AS_Form_8f7c36d7b07043b7a12f7bf45964a291(eventobject);
}

function AS_Form_8f7c36d7b07043b7a12f7bf45964a291(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}