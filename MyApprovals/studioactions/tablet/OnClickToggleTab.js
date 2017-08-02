function OnClickToggleTab(eventobject, x, y) {
    return AS_Image_c21d4dd1432f42ca89179497ad2f2af1(eventobject, x, y);
}

function AS_Image_c21d4dd1432f42ca89179497ad2f2af1(eventobject, x, y) {
    kony.apps.coe.ess.settings.getSettingsObject().togglePushNotificationsStatus();
}