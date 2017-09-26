function OnClickOfHamburgerMenuInNotificationListTab(eventobject) {
    return AS_FlexContainer_bc313d07fcbe4c58b1cc0da2f184ef65(eventobject);
}

function AS_FlexContainer_bc313d07fcbe4c58b1cc0da2f184ef65(eventobject) {
    kony.apps.coe.ess.notifications.getNotificationHistoryInstance().exitNotificationsScreen();
}