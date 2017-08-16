function frmStartUpPostShowACtion(eventobject) {
    return AS_Form_53ba5a834a7341f2872cdf92287228b7(eventobject);
}

function AS_Form_53ba5a834a7341f2872cdf92287228b7(eventobject) {
    new kony.apps.coe.ess.loginAnimations().animationQrScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}