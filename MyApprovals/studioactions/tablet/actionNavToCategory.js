function actionNavToCategory(eventobject) {
    return AS_FlexContainer_4d5e5f1f71144907b3c9c10f49b0a960(eventobject);
}

function AS_FlexContainer_4d5e5f1f71144907b3c9c10f49b0a960(eventobject) {
    frmTabListView.flxLeftReqType.isVisible = true;
    frmTabListView.flxLeftReqPeople.isVisible = false;
    frmTabListView.flxRight.width = "51%";
    tabListViewShow();
}