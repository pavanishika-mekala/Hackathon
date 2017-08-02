function actionFrmTabListViewInit(eventobject) {
    return AS_Form_1965b0856e5740b29697b7ea1632711a(eventobject);
}

function AS_Form_1965b0856e5740b29697b7ea1632711a(eventobject) {
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