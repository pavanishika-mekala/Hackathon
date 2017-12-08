function actionAppService(eventobject) {
    return AS_AppEvents_e939647136f0499cbf6451cdd0fce4d5(eventobject);
}

function AS_AppEvents_e939647136f0499cbf6451cdd0fce4d5(eventobject) {
    kony.net.setNetworkCallbacks(kony.apps.coe.ess.globalVariables.checkNetwork.config);
    return kony.apps.ess.deepLinkingSSO.appServicesAction(eventobject);
    //kony.apps.coe.ess.KMS.setPushNotificationCallbacks();
    //return kony.apps.ess.deepLinkingSSO.appServiceCallback(eventobject);
}