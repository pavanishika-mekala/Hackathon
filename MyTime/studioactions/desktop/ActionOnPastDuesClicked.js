function ActionOnPastDuesClicked(eventobject) {
    return AS_FlexContainer_c22fb5ce5aa749338beaeeb1b8c76adc(eventobject);
}

function AS_FlexContainer_c22fb5ce5aa749338beaeeb1b8c76adc(eventobject) {
    if (frmListViewDW.lblPastDues.skin == "sknlblF555555Px14AveRomanDW") {
        frmListViewDW.lblPastDues.skin = "sknlblF2ebaeePx14AveRomanDW";
        frmListViewDW.lblSaved.skin = "sknlblF555555Px14AveRomanDW";
        frmListViewDW.lblSentBack.skin = "sknlblF555555Px14AveRomanDW";
        frmListViewDW.flxHighlight.setVisibility(false);
        frmListViewDW.flxPD.setVisibility(true);
        frmListViewDW.imgPDArrow.setVisibility(true);
        frmListViewDW.flxImgNo.setVisibility(false);
    }
    frmListViewDW.forceLayout();
}