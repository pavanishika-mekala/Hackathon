function AS_Button_487e95a4535841a085a08c603dc661dd(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}