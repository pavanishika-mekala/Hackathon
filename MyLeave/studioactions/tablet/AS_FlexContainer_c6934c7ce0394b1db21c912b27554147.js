function AS_FlexContainer_c6934c7ce0394b1db21c912b27554147(eventobject) {
    (new kony.apps.coe.ess.myLeave.TeamViewUI()).toggleSkin(frmLeaveHome, true);
    var FormLoadObj = new kony.sdk.mvvm.NavigationObject();
    var qp = {
        "employeeId": kony.apps.coe.ess.globalVariables.employeeId
    };
    FormLoadObj.setQueryParams("segTeamView", qp);
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTeamView");
    formController.loadDataAndShowForm(FormLoadObj);
}