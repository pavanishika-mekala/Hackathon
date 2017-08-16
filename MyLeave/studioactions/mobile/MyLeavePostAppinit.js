function MyLeavePostAppinit(eventobject) {
    return AS_AppEvents_29d5d47d16484d538f9dd91c80536563(eventobject);
}

function AS_AppEvents_29d5d47d16484d538f9dd91c80536563(eventobject) {
    kony.application.setApplicationInitializationEvents({
        appservice: kony.apps.ess.deepLinkingSSO.appServiceCallback
    });
}