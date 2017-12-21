function actionAlertOk(eventobject) {
    return AS_Button_1ecc9c7c786443f5a259cc5fe39902b7(eventobject);
}

function AS_Button_1ecc9c7c786443f5a259cc5fe39902b7(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true && kony.apps.coe.ess.globalVariables.loginFailedWithUnauthoraized == 0) {
        kony.sdk.mvvm.LogoutAction();
    } else if (kony.apps.coe.ess.globalVariables.loginFailedWithUnauthoraized == 1) {
        kony.store.removeItem("username");
        kony.store.removeItem("password");
        kony.store.removeItem("rememberme");
        kony.store.removeItem("oktaToken");
        kony.sdk.util.deleteSSOToken();
        kony.apps.coe.ess.globalVariables.active_login_service = "";
        kony.application.exit();
    } else {}
}