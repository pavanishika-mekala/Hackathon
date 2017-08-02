function actionflxSettingsOnClick(eventobject) {
    return AS_FlexContainer_3d10497d90fe4ecc8a3a1329abe67ea0(eventobject);
}

function AS_FlexContainer_3d10497d90fe4ecc8a3a1329abe67ea0(eventobject) {
    try {
        kony.apps.coe.ess.Hamburger.prototype.hideHamburger();
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSettings");
        formController.loadDataAndShowForm();
    } catch (e) {
        alert(e.message);
    }
}