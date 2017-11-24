function FrmLoginPostShowAction(eventobject) {
    return AS_Form_f2b15f9e0d1d46ce91ebfde74e9c468b(eventobject);
}

function AS_Form_f2b15f9e0d1d46ce91ebfde74e9c468b(eventobject) {
    new kony.apps.coe.ess.loginAnimations().animationLoginScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}