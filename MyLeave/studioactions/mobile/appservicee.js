function appservicee(eventobject) {
    return AS_AppEvents_694c12447eae4ee9a4e0703ba81b241f(eventobject);
}

function AS_AppEvents_694c12447eae4ee9a4e0703ba81b241f(eventobject) {
    kony.apps.coe.ess.KMS.setPushNotificationCallbacks();
    return kony.apps.ess.deepLinkingSSO.appServiceCallback(eventobject);
}