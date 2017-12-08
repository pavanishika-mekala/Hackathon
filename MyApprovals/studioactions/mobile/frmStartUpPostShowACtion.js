function frmStartUpPostShowACtion(eventobject) {
    return AS_Form_653bc7c7289143f6a54478e86b41aa79(eventobject);
}

function AS_Form_653bc7c7289143f6a54478e86b41aa79(eventobject) {
    new kony.apps.coe.ess.loginAnimations().animationQrScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}