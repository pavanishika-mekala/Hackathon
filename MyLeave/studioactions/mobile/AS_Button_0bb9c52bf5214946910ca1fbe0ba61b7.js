function AS_Button_0bb9c52bf5214946910ca1fbe0ba61b7(eventobject) {
    if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.syncHamburger == 1) {
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.syncHamburger = 0;
    } else kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
}