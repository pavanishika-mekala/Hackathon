function AS_FlexContainer_he44b34a742340ad9867a27255de85fe(eventobject) {
    var previousForm = kony.application.getPreviousForm();
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(previousForm.id);
    previousForm.destroy();
    formController.loadDataAndShowForm();
}