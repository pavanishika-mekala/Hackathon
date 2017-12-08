function frmStartUpPostShowACtiontab1(eventobject) {
    return AS_Form_ef7b4f5011ad4783a18c38dde4d216ee(eventobject);
}

function AS_Form_ef7b4f5011ad4783a18c38dde4d216ee(eventobject) {
    new kony.apps.coe.ess.loginAnimations().animationQrScreen();
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}