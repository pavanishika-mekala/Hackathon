function actionfrmSearchStatusPostShow(eventobject) {
    return AS_Form_5ef8a58325554c2ea3a4ee15408a9eb2(eventobject);
}

function AS_Form_5ef8a58325554c2ea3a4ee15408a9eb2(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}