function actionflxSettingsOnClickTab(eventobject) {
    return AS_FlexContainer_f0a9032a7c4041a7ba4dd92e63cf3c09(eventobject);
}

function AS_FlexContainer_f0a9032a7c4041a7ba4dd92e63cf3c09(eventobject) {
    try {
        kony.apps.coe.ess.Hamburger.prototype.hideHamburger();
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSettings");
        formController.loadDataAndShowForm();
    } catch (e) {
        alert(e.message);
    }
}