function actsegMentListView(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_8ff33cf8a45749ea83951a0867eb2c3a(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_8ff33cf8a45749ea83951a0867eb2c3a(eventobject, sectionNumber, rowNumber) {
    frmTabListView.lblNoComments.setVisibility(false);
    frmTabListView.flxDecision.setVisibility(true);
    frmTabListView.txtComments.text = "";
    frmTabListView.flxComments.height = "50%";
    SetDataToUI();
}