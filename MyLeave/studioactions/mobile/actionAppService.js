function actionAppService(eventobject) {
    return AS_AppEvents_ef196812339347c4b153a1083387d1be(eventobject);
}

function AS_AppEvents_ef196812339347c4b153a1083387d1be(eventobject) {
    kony.net.setNetworkCallbacks(kony.apps.coe.ess.globalVariables.checkNetwork.config);
    return kony.apps.ess.deepLinkingSSO.appServiceActions(eventobject);
}