function onClickOfHamburgerMenuInSettings(eventobject) {
    return AS_FlexContainer_d4322bf857dc4fc78fc29eb1c4fee9a4(eventobject);
}

function AS_FlexContainer_d4322bf857dc4fc78fc29eb1c4fee9a4(eventobject) {
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