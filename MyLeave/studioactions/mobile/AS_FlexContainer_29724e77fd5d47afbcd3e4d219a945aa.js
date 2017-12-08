function AS_FlexContainer_29724e77fd5d47afbcd3e4d219a945aa(eventobject) {
    (new kony.apps.coe.ess.myLeave.TeamViewUI()).toggleSkin(frmLeaveHome, true);
    var FormLoadObj = new kony.sdk.mvvm.NavigationObject();
    var qp = {
        "employeeId": kony.apps.coe.ess.globalVariables.employeeId
    };
    FormLoadObj.setQueryParams("segTeamView", qp);
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTeamView");
    formController.loadDataAndShowForm(FormLoadObj);
}