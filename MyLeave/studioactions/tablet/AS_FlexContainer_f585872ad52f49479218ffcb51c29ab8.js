function AS_FlexContainer_f585872ad52f49479218ffcb51c29ab8(eventobject) {
    //kony.application.getPreviousForm().show();
    var previousForm = kony.application.getPreviousForm();
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(previousForm.id);
    previousForm.destroy();
    if (previousForm.id == "frmSearchLog") {
        kony.apps.coe.ess.MyLeave.Footer.navigateFooter(3)
    } else if (previousForm.id == "frmTeamView") {
        (new kony.apps.coe.ess.myLeave.TeamViewUI()).toggleSkin(frmLeaveHome, true);
        var FormLoadObj = new kony.sdk.mvvm.NavigationObject();
        var qp = {
            "employeeId": kony.apps.coe.ess.globalVariables.employeeId
        };
        FormLoadObj.setQueryParams("segTeamView", qp);
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTeamView");
        formController.loadDataAndShowForm(FormLoadObj)
    } else {
        formController.loadDataAndShowForm();
    }
}