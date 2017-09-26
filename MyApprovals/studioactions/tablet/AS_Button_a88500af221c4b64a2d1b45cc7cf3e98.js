function AS_Button_a88500af221c4b64a2d1b45cc7cf3e98(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}