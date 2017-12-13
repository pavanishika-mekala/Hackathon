function actionTabAppService(eventobject) {
    return AS_AppEvents_ca2a337bf95f4ca4a604b172903f99c4(eventobject);
}

function AS_AppEvents_ca2a337bf95f4ca4a604b172903f99c4(eventobject) {
    kony.apps.coe.ess.KMS.setPushNotificationCallbacks();
    return kony.apps.ess.deepLinkingSSO.appServiceCallback(eventobject);
}