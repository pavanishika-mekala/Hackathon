function actionPreShowFrmLoginDesk(eventobject) {
    return AS_Form_f50ba9e515414947b24805b89dd89ecc(eventobject);
}

function AS_Form_f50ba9e515414947b24805b89dd89ecc(eventobject) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("appjsmodules");
    kony.apps.coe.ess.frmLogin.frmLoginPreshow();
}