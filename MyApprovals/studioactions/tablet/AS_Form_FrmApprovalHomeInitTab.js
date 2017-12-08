function AS_Form_FrmApprovalHomeInitTab(eventobject) {
    return AS_Form_e85d336ed119436ea4bfc1419e180340(eventobject);
}

function AS_Form_e85d336ed119436ea4bfc1419e180340(eventobject) {
    var WidgetsArray = ["imgSelection", "imgEmployee", "imgRequestType", "lblEmployeeName", "lblShortName"];
    var SelectionBehaviourConfig = {
        "imageIdentifier": "imgSelection",
        "selectedStateImage": "select_green.png",
        "unselectedStateImage": "select.png"
    }
    kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 3, flxEmployeeSelection, function() {}, WidgetsArray);
    frmApprovalHome.flxScrlImages.add(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.getDynamicSegment());
    kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.WidgetDataMap = {
        "lblEmployeeName": "username",
        "lblShortName": "shortName"
    };
}