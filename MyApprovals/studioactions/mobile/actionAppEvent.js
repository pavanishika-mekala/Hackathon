function actionAppEvent(eventobject) {
    return AS_AppEvents_5054f528fc1b45198da18c345505312d(eventobject);
}

function AS_AppEvents_5054f528fc1b45198da18c345505312d(eventobject) {
    kony.net.setNetworkCallbacks(kony.apps.coe.ess.globalVariables.checkNetwork.config);
    return kony.apps.ess.deepLinkingSSO.appServicesAction(eventobject);
}