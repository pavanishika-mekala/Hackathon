function actionfrmDelegationRequestDetailsPostShowTab(eventobject) {
    return AS_Form_c9067ccb39354bbb9d088e883e5ce26e(eventobject);
}

function AS_Form_c9067ccb39354bbb9d088e883e5ce26e(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}