function AS_imgGpsLocation_onTouchEnd(eventobject, x, y) {
    return AS_Image_ead47af2dd084ec2bb6504fc1dd0a80b(eventobject, x, y);
}

function AS_Image_ead47af2dd084ec2bb6504fc1dd0a80b(eventobject, x, y) {
    (new kony.apps.coe.ess.myTime.TimesheetSettingsUI()).toggleGPSTracking();
}