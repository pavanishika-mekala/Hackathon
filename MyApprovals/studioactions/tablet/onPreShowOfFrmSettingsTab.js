function onPreShowOfFrmSettingsTab(eventobject) {
    return AS_Form_c642537812704d1383f2a3546be90daf(eventobject);
}

function AS_Form_c642537812704d1383f2a3546be90daf(eventobject) {
    kony.apps.coe.ess.settings.getSettingsObject().preShow();
}