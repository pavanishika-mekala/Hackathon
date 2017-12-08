function AS_Button_c94abfb0d72e4a308973339d7655a262(eventobject) {
    if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.syncHamburger == 1) {
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.syncHamburger = 0;
    } else kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    };
}