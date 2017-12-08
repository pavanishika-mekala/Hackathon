function actionfrmAuditTrailPostShowTab(eventobject) {
    return AS_Form_f78e74b5e7874e4abb97966658b7da08(eventobject);
}

function AS_Form_f78e74b5e7874e4abb97966658b7da08(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}