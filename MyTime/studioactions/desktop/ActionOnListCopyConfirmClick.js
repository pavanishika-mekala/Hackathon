function ActionOnListCopyConfirmClick(eventobject, x, y) {
    return AS_Label_6f2efd669e5c45e8b05bfe8fd505dd70(eventobject, x, y);
}

function AS_Label_6f2efd669e5c45e8b05bfe8fd505dd70(eventobject, x, y) {
    frmListViewDW.flxSegCopy.setVisibility(false);
    frmListViewDW.imgCpy.src = "clone.png";
    frmListViewDW.imgCpy.width = "25dp";
    frmListViewDW.imgCpy.height = "25dp";
    frmListViewDW.forceLayout();
}