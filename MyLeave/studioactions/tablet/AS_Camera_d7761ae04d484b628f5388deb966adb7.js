function AS_Camera_d7761ae04d484b628f5388deb966adb7(eventobject) {
    frmApplyLeave.flxCameraOptions.isVisible = false;
    var base64Val = frmApplyLeave.camTakePicture.base64;
    //image size calculation
    var bytes = 2 * Math.ceil((parseFloat(base64Val.length / 3)));
    var sizeinkb = bytes / 1000;
    if (sizeinkb > 3072) {
        kony.apps.coe.ess.myLeave.applyLeave.Attachment.onClickOfCancel();
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myLeave.common.imagesize"), 3000);
    } else {
        kony.apps.coe.ess.myLeave.applyLeave.Attachment.onClickOfTakePicture(base64Val, "");
    }
}