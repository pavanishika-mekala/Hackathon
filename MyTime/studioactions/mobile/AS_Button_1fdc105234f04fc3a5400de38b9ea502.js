function AS_Button_1fdc105234f04fc3a5400de38b9ea502(eventobject) {
    if (kony.apps.coe.ess.syncFunctions.syncHamburger == 1) {
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.syncFunctions.syncHamburger = 0;
    } else kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    };
}