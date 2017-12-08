function onActionWinBack(eventobject) {
    return AS_FlexContainer_c1486e321e7341e9a11cddaccbe49f14(eventobject);
}

function AS_FlexContainer_c1486e321e7341e9a11cddaccbe49f14(eventobject) {
    if (kony.application.getPreviousForm().id !== "frmHistory") showTabLeaveDashboardForm();
    else showTabHistoryForm();
}