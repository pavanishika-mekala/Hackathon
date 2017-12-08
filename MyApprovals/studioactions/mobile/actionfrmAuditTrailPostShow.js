function actionfrmAuditTrailPostShow(eventobject) {
    return AS_Form_099c2323c69740b4a12ad49c6ca7d6c4(eventobject);
}

function AS_Form_099c2323c69740b4a12ad49c6ca7d6c4(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}