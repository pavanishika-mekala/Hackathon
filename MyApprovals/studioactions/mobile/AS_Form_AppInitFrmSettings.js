function AS_Form_AppInitFrmSettings(eventobject) {
    return AS_Form_a792efa861e847ba9d303b96818579c3(eventobject);
}

function AS_Form_a792efa861e847ba9d303b96818579c3(eventobject) {
    var WidgetsArray = ["flxRequestType", "lblRequestType", "imgRequestType"];
    kony.apps.coe.ess.globalVariables.SettingsSegments = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR, {}, 5, flxTemplateSettingsCell, kony.apps.coe.ess.Approvals.frmSettings.onClick, WidgetsArray);
    frmSettings.flxDynamicSegment.add(kony.apps.coe.ess.globalVariables.SettingsSegments.getDynamicSegment())
}