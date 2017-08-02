function AS_FlexContainer_FooterSettings(eventobject) {
    return AS_FlexContainer_23dd7ebd253a46e0b18f4d3afd73b9bd(eventobject);
}

function AS_FlexContainer_23dd7ebd253a46e0b18f4d3afd73b9bd(eventobject) {
    try {
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSettings");
        formController.loadDataAndShowForm()
    } catch (e) {
        alert(e.message);
    }
}