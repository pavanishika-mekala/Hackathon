function ActionOnBreak(eventobject) {
    return AS_FlexContainer_cf819e917f5d463a87175f4ac845d061(eventobject);
}

function AS_FlexContainer_cf819e917f5d463a87175f4ac845d061(eventobject) {
    if (frmCreateViewDW.imgAddBreak.src == "addbreak.png") {
        frmCreateViewDW.imgAddBreak.src = "close_edit.png";
        frmCreateViewDW.imgDeleteBreak.setVisibility(true);
        frmCreateViewDW.imgEditBreak.setVisibility(true);
    } else {
        frmCreateViewDW.imgAddBreak.src = "addbreak.png";
        frmCreateViewDW.imgDeleteBreak.setVisibility(false);
        frmCreateViewDW.imgEditBreak.setVisibility(false);
    }
    frmCreateViewDW.forceLayout();
}