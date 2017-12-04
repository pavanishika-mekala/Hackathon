function AS_FlexContainer_e8133f3179944eacbe07c23b04d4098a(eventobject) {
    // if(kony.os.deviceInfo().name === "iPhone"){
    // frmTeamView.flxDayBar.removeAll();
    // }
    //kony.apps.coe.ess.myLeave.TeamViewUI.prototype.addDynamicHorzCalendar();
    var FormLoadObj = new kony.sdk.mvvm.NavigationObject();
    var qp = {
        "employeeId": kony.apps.coe.ess.globalVariables.employeeId
    };
    FormLoadObj.setQueryParams("segTeamView", qp);
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTeamView");
    formController.loadDataAndShowForm(FormLoadObj)
}