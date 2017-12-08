function AS_FlexContainer_491661396e0c425788bda9b8694b6194(eventobject) {
    var previousForm = kony.application.getPreviousForm();
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(previousForm.id);
    previousForm.destroy();
    formController.loadDataAndShowForm();
}