function actionfrmDelegationRequestCreatePostShow(eventobject) {
    return AS_Form_326eef15068d416ebb4741822871a22c(eventobject);
}

function AS_Form_326eef15068d416ebb4741822871a22c(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}