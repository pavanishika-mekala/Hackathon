function AS_Button_e50b34a85015435d86c9afe8259667b8(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}