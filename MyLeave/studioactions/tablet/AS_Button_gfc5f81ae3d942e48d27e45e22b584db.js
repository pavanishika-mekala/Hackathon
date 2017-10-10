function AS_Button_gfc5f81ae3d942e48d27e45e22b584db(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta) {
        kony.apps.coe.ess.frmLogin.btnLoginOnclick();
    }
}