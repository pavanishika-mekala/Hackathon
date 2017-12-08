function actionfrmNotificationsListPostShow(eventobject) {
    return AS_Form_477ddd3af40144a7a842f729793f1dfe(eventobject);
}

function AS_Form_477ddd3af40144a7a842f729793f1dfe(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}