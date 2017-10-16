function AS_Form_b8e09de8146d4d8da093067007c13e2f(eventobject) {
    (new kony.apps.coe.ess.loginAnimations()).animationLoginScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.frmLogin.seti18nText();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true) {
        kony.apps.coe.ess.frmLogin.oktaLogin();
    }
}