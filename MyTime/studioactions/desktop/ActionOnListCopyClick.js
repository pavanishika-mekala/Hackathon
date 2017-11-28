function ActionOnListCopyClick(eventobject, x, y) {
    return AS_Label_8ae9fecbe3d2435c900d3bd4e2289c42(eventobject, x, y);
}

function AS_Label_8ae9fecbe3d2435c900d3bd4e2289c42(eventobject, x, y) {
    frmListViewDW.flxSegCopy.setVisibility(false);
    frmListViewDW.imgCpy.src = "clone.png";
    frmListViewDW.imgCpy.width = "25dp";
    frmListViewDW.imgCpy.height = "25dp";
    frmListViewDW.forceLayout();
}