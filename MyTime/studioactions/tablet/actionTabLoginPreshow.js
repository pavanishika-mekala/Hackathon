function actionTabLoginPreshow(eventobject) {
    return AS_Form_5edeadb597a848bf85155fb780c6358e(eventobject);
}

function AS_Form_5edeadb597a848bf85155fb780c6358e(eventobject) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("appjsmodules");
    kony.apps.coe.ess.frmLogin.frmLoginPreshow();
}