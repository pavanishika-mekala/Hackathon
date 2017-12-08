function onClickOfFlxImgPushNotification(eventobject) {
    return AS_FlexContainer_4e722d2a22124bffae5a0958657630bb(eventobject);
}

function AS_FlexContainer_4e722d2a22124bffae5a0958657630bb(eventobject) {
    kony.apps.coe.ess.settings.getSettingsObject().togglePushNotificationsStatus();
}