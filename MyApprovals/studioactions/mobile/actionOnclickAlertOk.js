function actionOnclickAlertOk(eventobject) {
    return AS_Button_d9e7b9206b1f49469f1b4b04ea9225fb(eventobject);
}

function AS_Button_d9e7b9206b1f49469f1b4b04ea9225fb(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta) {
        kony.apps.coe.ess.frmLogin.btnLoginOnclick();
    }
}