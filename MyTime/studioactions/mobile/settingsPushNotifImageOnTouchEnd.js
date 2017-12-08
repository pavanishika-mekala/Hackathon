function settingsPushNotifImageOnTouchEnd(eventobject, x, y) {
    return AS_Image_6a28b2d455a749ae825661403a0a3e07(eventobject, x, y);
}

function AS_Image_6a28b2d455a749ae825661403a0a3e07(eventobject, x, y) {
    kony.apps.coe.ess.settings.getSettingsObject().togglePushNotificationsStatus();
}