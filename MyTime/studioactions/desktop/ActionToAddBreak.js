function ActionToAddBreak(eventobject) {
    return AS_FlexContainer_f54c661e12ad42a09aa860eca76940f9(eventobject);
}

function AS_FlexContainer_f54c661e12ad42a09aa860eca76940f9(eventobject) {
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