function tabWinsegMentListView(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_4c2d34a1f4224c1f8532ba5a9046dea9(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_4c2d34a1f4224c1f8532ba5a9046dea9(eventobject, sectionNumber, rowNumber) {
    frmTabListView.lblNoComments.setVisibility(false);
    frmTabListView.flxDecision.setVisibility(true);
    frmTabListView.txtComments.text = "";
    //#ifndef windows8
    frmTabListView.flxComments.height = "50%";
    //#endif
    SetDataToUI();
}