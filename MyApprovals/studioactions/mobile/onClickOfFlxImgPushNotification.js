function onClickOfFlxImgPushNotification(eventobject) {
    return AS_FlexContainer_11143cc389d04cfdafddd73aff5ff31e(eventobject);
}

function AS_FlexContainer_11143cc389d04cfdafddd73aff5ff31e(eventobject) {
    kony.apps.coe.ess.settings.getSettingsObject().togglePushNotificationsStatus();
}