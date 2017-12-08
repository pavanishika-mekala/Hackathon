function OnClickOfHamburgerMenuInNotificationList(eventobject) {
    return AS_FlexContainer_9f43a5d774294fe3a91f8dae3162add5(eventobject);
}

function AS_FlexContainer_9f43a5d774294fe3a91f8dae3162add5(eventobject) {
    kony.apps.coe.ess.notifications.getNotificationHistoryInstance().exitNotificationsHistory();
}