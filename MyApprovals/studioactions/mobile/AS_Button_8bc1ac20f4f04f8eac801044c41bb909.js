function AS_Button_8bc1ac20f4f04f8eac801044c41bb909(eventobject) {
    if (kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress == true) {
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress = false;
    } else kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}