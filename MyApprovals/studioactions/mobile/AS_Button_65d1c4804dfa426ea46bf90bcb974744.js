function AS_Button_65d1c4804dfa426ea46bf90bcb974744(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}