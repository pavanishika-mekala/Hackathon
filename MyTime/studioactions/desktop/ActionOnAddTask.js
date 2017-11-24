function ActionOnAddTask(eventobject, x, y) {
    return AS_Label_24dad40b6af94c4b93245b3d1e2b92a0(eventobject, x, y);
}

function AS_Label_24dad40b6af94c4b93245b3d1e2b92a0(eventobject, x, y) {
    frmCreateViewDW.flxAddTask.setVisibility(true);
    frmCreateViewDW.flxSelectTask.setVisibility(false);
    frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
    frmCreateViewDW.forceLayout();
}