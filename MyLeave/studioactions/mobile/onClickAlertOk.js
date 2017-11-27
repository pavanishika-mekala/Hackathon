function onClickAlertOk(eventobject) {
    return AS_Button_58ae6657fea44351876b6d890c52582a(eventobject);
}

function AS_Button_58ae6657fea44351876b6d890c52582a(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true) {
        kony.sdk.mvvm.LogoutAction();
    }
}