function AS_Form_AppInitFrmSettingsTab(eventobject) {
    return AS_Form_jc40b0c95e1e4fa697330f35f4332d91(eventobject);
}

function AS_Form_jc40b0c95e1e4fa697330f35f4332d91(eventobject) {
    var WidgetsArray = ["flxRequestType", "lblRequestType", "imgRequestType"];
    kony.apps.coe.ess.globalVariables.SettingsSegments = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR, {}, 5, flxTemplateSettingsCell, kony.apps.coe.ess.Approvals.frmSettings.onClick, WidgetsArray);
    frmSettings.flxDynamicSegment.add(kony.apps.coe.ess.globalVariables.SettingsSegments.getDynamicSegment())
}