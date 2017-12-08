function actions_TeamViewGoToday(eventobject) {
    return AS_FlexContainer_e1ec7c04fd554eb791b36d71113383d9(eventobject);
}

function AS_FlexContainer_e1ec7c04fd554eb791b36d71113383d9(eventobject) {
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
    formController.loadDataAndShowForm(FormLoadObj);
}