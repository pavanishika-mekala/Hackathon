function ActionOnAdvSearchCbxClick(eventobject) {
    return AS_FlexContainer_11d1d4dc65f24703aa1bf4111db6869e(eventobject);
}

function AS_FlexContainer_11d1d4dc65f24703aa1bf4111db6869e(eventobject) {
    if (frmCreateViewDW.imgActiveInactive.src == "checkboxinactive.png") {
        frmCreateViewDW.imgActiveInactive.src = "checkboxactive.png";
        frmCreateViewDW.flxSegSearch.setVisibility(false);
        frmCreateViewDW.flxSelectId.setVisibility(true);
        frmCreateViewDW.flxAdvSeg.setVisibility(true);
        frmCreateViewDW.flxSearchTypeId.setVisibility(false);
        frmCreateViewDW.lblAdd.setVisibility(false);
    } else {
        frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
        frmCreateViewDW.imgActiveInactive.src = "checkboxinactive.png";
        frmCreateViewDW.flxSegSearch.setVisibility(true);
        frmCreateViewDW.flxSelectId.setVisibility(false);
        frmCreateViewDW.flxAdvSeg.setVisibility(false);
        frmCreateViewDW.flxSearchTypeId.setVisibility(false);
        frmCreateViewDW.lblAdd.setVisibility(false);
        frmCreateViewDW.flxtbxSearch.setVisibility(true);
        frmCreateViewDW.flxSearchIconinAdvSearch.setVisibility(false);
    }
    frmCreateViewDW.forceLayout();
}