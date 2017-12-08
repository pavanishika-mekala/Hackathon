function actionfrmAuditTrailPostShow(eventobject) {
    return AS_Form_76ad21784a494d7686f106f973a4cd67(eventobject);
}

function AS_Form_76ad21784a494d7686f106f973a4cd67(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}