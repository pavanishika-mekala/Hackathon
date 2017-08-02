function actionfrmNotificatioListPostShow(eventobject) {
    return AS_Form_b17d3643ac024f218c6c6d101c5f6d3a(eventobject);
}

function AS_Form_b17d3643ac024f218c6c6d101c5f6d3a(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}