function AS_Button_1a771bfc286948d994c1b87df4f104b7(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        popupOfflineAlert.dismiss();
        //kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);	
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}