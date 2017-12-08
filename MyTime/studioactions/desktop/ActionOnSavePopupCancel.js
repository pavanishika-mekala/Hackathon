function ActionOnSavePopupCancel(eventobject, x, y) {
    return AS_Label_fdc6c36ab69447f2bf2f17cd9f04e443(eventobject, x, y);
}

function AS_Label_fdc6c36ab69447f2bf2f17cd9f04e443(eventobject, x, y) {
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.flxSavePopup.setVisibility(false);
    frmCreateViewDW.forceLayout();
}