function onclickokinpopupalerttab(eventobject) {
    return AS_Button_bbe5fa4426394af0b07eb0560e6fe921(eventobject);
}

function AS_Button_bbe5fa4426394af0b07eb0560e6fe921(eventobject) {
    popupErrorAlert.dismiss();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true) {
        kony.sdk.mvvm.LogoutAction();
    }
}