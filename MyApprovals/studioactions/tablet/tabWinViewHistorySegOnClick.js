function tabWinViewHistorySegOnClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_9ca759ee9e7b4b9182ee63586a4c5ea2(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_9ca759ee9e7b4b9182ee63586a4c5ea2(eventobject, sectionNumber, rowNumber) {
    frmViewFilterHistory.lblNoComments.setVisibility(false);
    frmViewFilterHistory.flxDecision.setVisibility(true);
    frmViewFilterHistory.txtComments.text = "";
    frmViewFilterHistory.flxComments.height = "50%";
    SetDataToUI();
}