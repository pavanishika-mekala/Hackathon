function actionBtnYesOnCLick(eventobject) {
    return AS_Button_e61358f384cc4cbb82436eeb3fb0e46c(eventobject);
}

function AS_Button_e61358f384cc4cbb82436eeb3fb0e46c(eventobject) {
    kony.apps.coe.ess.settings.getSettingsObject().resetData();
}