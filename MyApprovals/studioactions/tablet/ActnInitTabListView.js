function ActnInitTabListView(eventobject) {
    return AS_Form_a2904d74d48046f0909de03df3e42c4d(eventobject);
}

function AS_Form_a2904d74d48046f0909de03df3e42c4d(eventobject) {
    //kony.modules.loadFunctionalModule("librarymodules");
    //kony.modules.loadFunctionalModule("appjsmodules");
    var WidgetsArray = ["imgSelection", "imgEmployee", "imgRequestType", "lblEmployeeName", "lblShortName"];
    var SelectionBehaviourConfig = {
        "imageIdentifier": "imgSelection",
        "selectedStateImage": "selected.png",
        "unselectedStateImage": "select.png"
    }
    kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 3, flxEmployeeSelection, function() {}, WidgetsArray);
    frmTabListView.flxScrlImages.add(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.getDynamicSegment());
    kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.WidgetDataMap = {
        "lblEmployeeName": "username",
        "lblShortName": "shortName"
    };
}