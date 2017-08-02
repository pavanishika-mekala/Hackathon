function actionfrmTabListViewWininit(eventobject) {
    return AS_Form_0291d53fc6b34be7b3a7c694441a9679(eventobject);
}

function AS_Form_0291d53fc6b34be7b3a7c694441a9679(eventobject) {
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