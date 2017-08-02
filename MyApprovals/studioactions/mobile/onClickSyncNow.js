function onClickSyncNow(eventobject) {
    return AS_Button_58b18f8a01c9466da64130c9960783f4(eventobject);
}

function AS_Button_58b18f8a01c9466da64130c9960783f4(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        popupOfflineAlert.dismiss();
        //kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);	
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}