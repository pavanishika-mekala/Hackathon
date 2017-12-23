function onclickokinpopupalerttab(eventobject) {
    return AS_Button_bbe5fa4426394af0b07eb0560e6fe921(eventobject);
}

function AS_Button_bbe5fa4426394af0b07eb0560e6fe921(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true && kony.apps.coe.ess.globalVariables.loginFailedWithUnauthorized == 0) {
        kony.sdk.mvvm.LogoutAction();
    } else if (kony.apps.coe.ess.globalVariables.loginFailedWithUnauthorized == 1) {
        kony.store.removeItem("username");
        kony.store.removeItem("password");
        kony.store.removeItem("rememberme");
        kony.store.removeItem("oktaToken");
        kony.net.clearCookies();
        kony.apps.coe.ess.globalVariables.active_login_service = "";
        kony.apps.coe.ess.frmLogin.oktaLogin();
    } else {}
}