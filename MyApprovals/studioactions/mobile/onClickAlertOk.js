function onClickAlertOk(eventobject) {
    return AS_Button_22e0015cd40240709d861f744485c16f(eventobject);
}

function AS_Button_22e0015cd40240709d861f744485c16f(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true) {
        kony.apps.coe.ess.frmLogin.oktaLogin();
    }
}