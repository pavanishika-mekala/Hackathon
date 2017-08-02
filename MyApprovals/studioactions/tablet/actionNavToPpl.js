function actionNavToPpl(eventobject) {
    return AS_FlexContainer_c8e5fdc243b24bfcbec5c5ada879fd1c(eventobject);
}

function AS_FlexContainer_c8e5fdc243b24bfcbec5c5ada879fd1c(eventobject) {
    frmTabListView.flxLeftReqType.isVisible = false;
    frmTabListView.flxLeftReqPeople.isVisible = true;
    frmTabListView.flxRight.width = "51%";
    tabListViewShow();
}