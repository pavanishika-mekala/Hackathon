function FrmLoginPreShowAction(eventobject) {
    return AS_Form_e775c8cc7d974a3c82c1a35a48dc09a6(eventobject);
}

function AS_Form_e775c8cc7d974a3c82c1a35a48dc09a6(eventobject) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("appjsmodules");
    kony.apps.coe.ess.frmLogin.frmLoginPreshow();
}