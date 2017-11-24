function ActionOnBreakCancelClick(eventobject, x, y) {
    return AS_Image_b8475087511c4053b094f6d1b2fa48a7(eventobject, x, y);
}

function AS_Image_b8475087511c4053b094f6d1b2fa48a7(eventobject, x, y) {
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.imgDeleteBreak.setVisibility(false);
    frmCreateViewDW.imgEditBreak.setVisibility(false);
    frmCreateViewDW.flxSelectBreak.setVisibility(false);
    frmCreateViewDW.forceLayout();
}