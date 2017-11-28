function AS_FlexContainer_a852bd3f0f154cbd96bb088f13cf5e90(eventobject) {
    if (kony.application.getPreviousForm().id == "frmTimesheetHome") {
        refreshAndShowTimesheetHomeForm();
    } else {
        kony.application.getPreviousForm().show();
    }
}