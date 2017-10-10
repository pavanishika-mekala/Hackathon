function FrmLoginPostShowAction(eventobject) {
    return AS_Form_840920b29d3d440bb5bab5be07872a7d(eventobject);
}

function AS_Form_840920b29d3d440bb5bab5be07872a7d(eventobject) {
    (new kony.apps.coe.ess.loginAnimations()).animationLoginScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
    kony.apps.coe.ess.frmLogin.seti18nText();
    kony.apps.coe.ess.frmLogin.btnLoginOnclick();
}