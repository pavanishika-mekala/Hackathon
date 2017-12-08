function AS_FlexContainer_FooterSearch(eventobject) {
    return AS_FlexContainer_7ef2de7ebc8d41b7b33a60e88de56588(eventobject);
}

function AS_FlexContainer_7ef2de7ebc8d41b7b33a60e88de56588(eventobject) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSearch");
    formController.loadDataAndShowForm()
}