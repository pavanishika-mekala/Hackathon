function AS_FlexContainer_FooterSearchTab(eventobject) {
    return AS_FlexContainer_da0cad587f894d379359c8e99252bb40(eventobject);
}

function AS_FlexContainer_da0cad587f894d379359c8e99252bb40(eventobject) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSearch");
    formController.loadDataAndShowForm()
}