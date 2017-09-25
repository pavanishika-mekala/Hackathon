function onClickSyncNowTab(eventobject) {
    return AS_Button_i5b323fc680f47a4a895a48bbdd54bc7(eventobject);
}

function AS_Button_i5b323fc680f47a4a895a48bbdd54bc7(eventobject) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        popupOfflineAlert.dismiss();
        //kony.application.getCurrentForm().flxOfflineAlert.setVisibility(false);	
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    }
}