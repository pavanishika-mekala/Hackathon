function PostShowOfLoginFormTab(eventobject) {
    return AS_Form_c13f24807678423ba1d60f23e6c9ced1(eventobject);
}

function AS_Form_c13f24807678423ba1d60f23e6c9ced1(eventobject) {
    new kony.apps.coe.ess.loginAnimations().animationLoginScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.Approvals.ApprovalsHome.DelegationShow();
    kony.apps.coe.ess.frmLogin.seti18nText();
    if (kony.application.getCurrentForm().id === "frmLogin" && kony.apps.coe.ess.appconfig.useOkta === true) {
        kony.apps.coe.ess.frmLogin.oktaLogin();
    }
}