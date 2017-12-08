function frmStartUpPostShowACtion(eventobject) {
    return AS_Form_5945898cde7d4c4fa9cd298f854183ac(eventobject);
}

function AS_Form_5945898cde7d4c4fa9cd298f854183ac(eventobject) {
    new kony.apps.coe.ess.loginAnimations().animationQrScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}