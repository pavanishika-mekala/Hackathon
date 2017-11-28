function ActionOnAddTaskConfirmClick(eventobject, x, y) {
    return AS_Label_791d6e7398ba425ab69f390fde768b2b(eventobject, x, y);
}

function AS_Label_791d6e7398ba425ab69f390fde768b2b(eventobject, x, y) {
    (new kony.apps.coe.ess.myTime.CreateViewUIDW()).onAddTaskConfirm();
    frmCreateViewDW.flxTaskSelected.setVisibility(true);
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.flxAddTask.setVisibility(false);
    frmCreateViewDW.flxTaskTypeData.setVisibility(true);
    frmCreateViewDW.forceLayout();
}