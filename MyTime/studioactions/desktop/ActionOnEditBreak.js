function ActionOnEditBreak(eventobject, x, y) {
    return AS_Image_649d08bacf7e484bafa138f0e72a0a3a(eventobject, x, y);
}

function AS_Image_649d08bacf7e484bafa138f0e72a0a3a(eventobject, x, y) {
    frmCreateViewDW.flxBlank.setVisibility(true);
    frmCreateViewDW.flxSelectBreak.setVisibility(true);
    frmCreateViewDW.flxTask.setVisibility(false);
    frmCreateViewDW.forceLayout();
}