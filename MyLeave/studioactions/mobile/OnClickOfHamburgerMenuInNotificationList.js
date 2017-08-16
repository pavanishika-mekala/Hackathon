function OnClickOfHamburgerMenuInNotificationList(eventobject) {
    return AS_FlexContainer_7eed8c96883444369cbb7f434cc3f8ef(eventobject);
}

function AS_FlexContainer_7eed8c96883444369cbb7f434cc3f8ef(eventobject) {
    kony.apps.coe.ess.notifications.getNotificationHistoryInstance().exitNotificationsScreen();
}