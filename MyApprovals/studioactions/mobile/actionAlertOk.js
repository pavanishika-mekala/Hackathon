function actionAlertOk(eventobject) {
    return AS_Button_1ecc9c7c786443f5a259cc5fe39902b7(eventobject);
}

function AS_Button_1ecc9c7c786443f5a259cc5fe39902b7(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta) {
        kony.apps.coe.ess.frmLogin.btnLoginOnclick();
    }
}