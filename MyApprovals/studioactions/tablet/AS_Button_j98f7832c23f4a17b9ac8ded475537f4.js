function AS_Button_j98f7832c23f4a17b9ac8ded475537f4(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}