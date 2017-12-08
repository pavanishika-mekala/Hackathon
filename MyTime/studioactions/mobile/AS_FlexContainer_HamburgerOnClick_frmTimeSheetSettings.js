function AS_FlexContainer_HamburgerOnClick_frmTimeSheetSettings(eventobject) {
    return AS_FlexContainer_190d7bc7e5b04b11b9055b608e10489a(eventobject);
}

function AS_FlexContainer_190d7bc7e5b04b11b9055b608e10489a(eventobject) {
    if (kony.application.getPreviousForm().id == "frmTimesheetHome") {
        refreshAndShowTimesheetHomeForm();
    } else {
        kony.application.getPreviousForm().show();
    }
}