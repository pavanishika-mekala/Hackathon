function ActionOnCalendarViewEditIcon(eventobject, x, y) {
    return AS_Image_270cfd33a2f9463e95c64f0ec2056180(eventobject, x, y);
}

function AS_Image_270cfd33a2f9463e95c64f0ec2056180(eventobject, x, y) {
    frmCreateViewDW.flxEachTaskDetailsLeft.setVisibility(true);
    frmCreateViewDW.flxEachTaskDetailsRight.setVisibility(true);
    frmCreateViewDW.flxAddBreakLeft.setVisibility(true);
    frmCreateViewDW.show();
}