function actionWinLoginPreshow(eventobject) {
    return AS_Form_dc56c29d404a41a0a10318e6a095097b(eventobject);
}

function AS_Form_dc56c29d404a41a0a10318e6a095097b(eventobject) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("appjsmodules");
    kony.apps.coe.ess.frmLogin.frmLoginPreshow();
}