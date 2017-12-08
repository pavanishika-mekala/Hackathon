function AS_FlexContainer_cf340ad5c32c4bd097ed031bbc248120(eventobject) {
    try {
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSettings");
        formController.loadDataAndShowForm()
    } catch (e) {
        alert(e.message);
    }
}