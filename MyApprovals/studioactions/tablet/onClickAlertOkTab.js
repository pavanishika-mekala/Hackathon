function onClickAlertOkTab(eventobject) {
    return AS_Button_af0827f08b0145a18c5a417ab7b8c7c6(eventobject);
}

function AS_Button_af0827f08b0145a18c5a417ab7b8c7c6(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta) {
        kony.apps.coe.ess.frmLogin.btnLoginOnclick();
    }
}