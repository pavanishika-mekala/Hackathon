function closePopup(eventobject) {
    return AS_Button_cc7e4fd8b510499a9beb9bf7a64ecfbe(eventobject);
}

function AS_Button_cc7e4fd8b510499a9beb9bf7a64ecfbe(eventobject) {
    var currForm = kony.application.getCurrentForm();
    currForm.flxPopUp.isVisible = false;;
}