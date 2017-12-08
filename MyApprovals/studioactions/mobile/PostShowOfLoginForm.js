function PostShowOfLoginForm(eventobject) {
    return AS_Form_7db7625fb19b4b1486c07ee5cd3cecfc(eventobject);
}

function AS_Form_7db7625fb19b4b1486c07ee5cd3cecfc(eventobject) {
    new kony.apps.coe.ess.loginAnimations().animationLoginScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.Approvals.ApprovalsHome.DelegationShow();
    kony.apps.coe.ess.frmLogin.seti18nText();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true) {
        kony.apps.coe.ess.frmLogin.oktaLogin();
    }
}