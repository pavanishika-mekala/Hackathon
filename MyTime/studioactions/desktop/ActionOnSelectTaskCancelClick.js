function ActionOnSelectTaskCancelClick(eventobject, x, y) {
    return AS_Image_4dc2e73e1d3a4a299969ebbd215e7e08(eventobject, x, y);
}

function AS_Image_4dc2e73e1d3a4a299969ebbd215e7e08(eventobject, x, y) {
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.flxSelectId.setVisibility(false);
    frmCreateViewDW.lblAdd.setVisibility(false);
    frmCreateViewDW.flxSearchIconinAdvSearch.setVisibility(false);
    frmCreateViewDW.flxtbxSearch.setVisibility(true);
    frmCreateViewDW.flxSearchTypeId.setVisibility(false);
    frmCreateViewDW.flxSelectTask.setVisibility(false);
    frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
    frmCreateViewDW.imgDropDown.src = "dropbox.png";
    frmCreateViewDW.flxSelectId.skin = "sknflxBGf2f2f2B1PxdfdfdfDW";
    frmCreateViewDW.imgActiveInactive.src = "checkboxinactive.png";
    frmCreateViewDW.forceLayout();
}