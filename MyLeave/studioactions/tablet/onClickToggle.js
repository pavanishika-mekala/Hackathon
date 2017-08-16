function onClickToggle(eventobject, x, y) {
    return AS_Image_44daeb057cb7425cb247614483a8b2d5(eventobject, x, y);
}

function AS_Image_44daeb057cb7425cb247614483a8b2d5(eventobject, x, y) {
    kony.apps.coe.ess.settings.getSettingsObject().togglePushNotificationsStatus();
}