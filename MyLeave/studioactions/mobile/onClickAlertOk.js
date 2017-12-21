function onClickAlertOk(eventobject) {
    return AS_Button_58ae6657fea44351876b6d890c52582a(eventobject);
}

function AS_Button_58ae6657fea44351876b6d890c52582a(eventobject) {
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