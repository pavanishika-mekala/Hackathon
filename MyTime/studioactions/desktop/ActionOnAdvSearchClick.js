function ActionOnAdvSearchClick(eventobject, x, y) {
    return AS_Image_d5eb8bfefce9401d917c1d706b2e05e4(eventobject, x, y);
}

function AS_Image_d5eb8bfefce9401d917c1d706b2e05e4(eventobject, x, y) {
    if (frmCreateViewDW.imgActiveInactive.src == "checkboxinactive.png") {
        frmCreateViewDW.imgActiveInactive.src == "checkboxactive.png";
        frmCreateViewDW.flxSegSearch.setVisibility(false);
        frmCreateViewDW.flxSelectId.setVisibility(true);
        frmCreateViewDW.flxAdvSeg.setVisibility(true);
    } else {
        frmCreateViewDW.imgActiveInactive.src == "checkboxinactive.png";
        frmCreateViewDW.flxSegSearch.setVisibility(true);
    }
}