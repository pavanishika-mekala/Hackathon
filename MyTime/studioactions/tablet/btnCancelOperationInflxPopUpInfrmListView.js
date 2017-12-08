function btnCancelOperationInflxPopUpInfrmListView(eventobject) {
    return AS_Button_dad8263e43ce4e97bd04e86b934d2ac3(eventobject);
}

function AS_Button_dad8263e43ce4e97bd04e86b934d2ac3(eventobject) {
    var currForm = kony.application.getCurrentForm();
    currForm.flxPopUp.isVisible = false;;
}