function OnClickOfHamburgerMenuInNotificationList(eventobject) {
    return AS_FlexContainer_bae11c49aa56476f92517ba172b45ded(eventobject);
}

function AS_FlexContainer_bae11c49aa56476f92517ba172b45ded(eventobject) {
    kony.apps.coe.ess.notifications.getNotificationHistoryInstance().exitNotificationsScreen();
}