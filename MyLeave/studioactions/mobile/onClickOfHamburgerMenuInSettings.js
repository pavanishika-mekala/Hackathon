function onClickOfHamburgerMenuInSettings(eventobject) {
    return AS_FlexContainer_d4322bf857dc4fc78fc29eb1c4fee9a4(eventobject);
}

function AS_FlexContainer_d4322bf857dc4fc78fc29eb1c4fee9a4(eventobject) {
    //kony.application.getPreviousForm().show();
    var previousForm = kony.application.getPreviousForm();
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(previousForm.id);
    previousForm.destroy();
    formController.loadDataAndShowForm();
}