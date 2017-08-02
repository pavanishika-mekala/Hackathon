function actionPostAppinit(eventobject) {
    return AS_AppEvents_409239e47971492e8f583cdcb835a924(eventobject);
}

function AS_AppEvents_409239e47971492e8f583cdcb835a924(eventobject) {
    kony.application.setApplicationInitializationEvents({
        appservice: kony.apps.ess.deepLinkingSSO.appServiceCallback
    });
}