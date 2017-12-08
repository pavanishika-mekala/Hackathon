function actionfrmRecentTasksPostShow(eventobject) {
    return AS_Form_a5c921e8928642cd9ebce98828da786f(eventobject);
}

function AS_Form_a5c921e8928642cd9ebce98828da786f(eventobject) {
    kony.apps.ess.deepLinkingSSO.currentFormValue = kony.application.getCurrentForm().id;
}