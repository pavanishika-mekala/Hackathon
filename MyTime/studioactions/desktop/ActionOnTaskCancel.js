function ActionOnTaskCancel(eventobject, x, y) {
    return AS_Label_59b50080a1d940a7a005aeddabb1ab32(eventobject, x, y);
}

function AS_Label_59b50080a1d940a7a005aeddabb1ab32(eventobject, x, y) {
    frmCreateViewDW.flxAddTask.setVisibility(false);
    frmCreateViewDW.flxSelectTask.setVisibility(true);
    frmCreateViewDW.forceLayout();
}