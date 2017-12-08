function actionPostAppinit(eventobject) {
    return AS_AppEvents_e9ba7b38bead437d916cebe4b06e638c(eventobject);
}

function AS_AppEvents_e9ba7b38bead437d916cebe4b06e638c(eventobject) {
    kony.application.setApplicationInitializationEvents({
        appservice: kony.apps.ess.deepLinkingSSO.appServiceCallback
    });
}