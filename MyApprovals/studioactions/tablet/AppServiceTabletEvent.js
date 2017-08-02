function AppServiceTabletEvent(eventobject) {
    return AS_AppEvents_10cb6c7e701e40a3a3ac9f45419b8f44(eventobject);
}

function AS_AppEvents_10cb6c7e701e40a3a3ac9f45419b8f44(eventobject) {
    //#ifndef windows8
    kony.net.setNetworkCallbacks(kony.apps.coe.ess.globalVariables.checkNetwork.config);
    return kony.apps.ess.deepLinkingSSO.appServicesAction(eventobject);
    //#endif
}