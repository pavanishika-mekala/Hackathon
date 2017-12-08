function oncapturetabapplyleave(eventobject) {
    return AS_Camera_e4e090172d2d466ea4610dc06b87d035(eventobject);
}

function AS_Camera_e4e090172d2d466ea4610dc06b87d035(eventobject) {
    frmTabApplyLeave.flxCameraOptions.isVisible = false;
    kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.onClickOfTakePicture(frmTabApplyLeave.camTakePicture.base64);
}