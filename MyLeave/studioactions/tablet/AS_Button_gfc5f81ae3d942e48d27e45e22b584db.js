function AS_Button_gfc5f81ae3d942e48d27e45e22b584db(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true && kony.apps.coe.ess.globalVariables.loginFailedWithUnauthorized == 0) {
        kony.sdk.mvvm.LogoutAction();
    } else if (kony.apps.coe.ess.globalVariables.loginFailedWithUnauthorized == 1) {
        kony.store.removeItem("username");
        kony.store.removeItem("password");
        kony.store.removeItem("rememberme");
        kony.store.removeItem("oktaToken");
        kony.sdk.util.deleteSSOToken();
        kony.net.clearCookies();
        kony.apps.coe.ess.globalVariables.active_login_service = "";
        kony.apps.coe.ess.frmLogin.oktaLogin();
    } else {}
}