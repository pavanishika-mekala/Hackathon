function wimgtstart(eventobject, x, y) {
    return AS_Image_6000d56a134d43fe8db3b8b9529e392c(eventobject, x, y);
}

function AS_Image_6000d56a134d43fe8db3b8b9529e392c(eventobject, x, y) {
    if (frmTimeSheetCreateTab.advsrchsel.src == "uncheck2x.png") {
        frmTimeSheetCreateTab.advsrchsel.src = "checkblue2x.png";
        frmTimeSheetCreateTab.flsrchcriteria.setVisibility(true);
    } else {
        frmTimeSheetCreateTab.advsrchsel.src = "uncheck2x.png";
        frmTimeSheetCreateTab.flsrchcriteria.setVisibility(false);
    }
}