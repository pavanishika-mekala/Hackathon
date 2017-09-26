function action_selectEnglishTab(eventobject) {
    return AS_FlexContainer_e567eb70e99b421682102621d1f531e4(eventobject);
}

function AS_FlexContainer_e567eb70e99b421682102621d1f531e4(eventobject) {
    kony.apps.coe.ess.settings.getSettingsObject().languageSelection("selectit.png", "unselectit.png", "unselectit.png", "en");
}