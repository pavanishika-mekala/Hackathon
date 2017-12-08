function onClickOfFlxImgPushNotificationTab(eventobject) {
    return AS_FlexContainer_bc43187d26ce4f7aa1240bc3f781f686(eventobject);
}

function AS_FlexContainer_bc43187d26ce4f7aa1240bc3f781f686(eventobject) {
    kony.apps.coe.ess.settings.getSettingsObject().togglePushNotificationsStatus();
}