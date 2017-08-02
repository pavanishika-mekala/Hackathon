function tabWinNavToPeopleFromDash(eventobject) {
    return AS_FlexContainer_2421d1b2185d45578459f78f8f11b3e4(eventobject);
}

function AS_FlexContainer_2421d1b2185d45578459f78f8f11b3e4(eventobject) {
    frmTabListView.flxLeftReqType.isVisible = false;
    frmTabListView.flxLeftReqPeople.isVisible = true;
    frmTabListView.flxRight.width = "51%";
    tabListViewShow();
}