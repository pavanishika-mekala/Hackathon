function settingDataTOsegViewFilterHistory(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_87d9fd75c00241cdb3d1b65d08b6e81a(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_87d9fd75c00241cdb3d1b65d08b6e81a(eventobject, sectionNumber, rowNumber) {
    frmViewFilterHistory.lblNoComments.setVisibility(false);
    frmViewFilterHistory.flxDecision.setVisibility(true);
    frmViewFilterHistory.txtComments.text = "";
    frmViewFilterHistory.flxComments.height = "50%";
    SetDataToUI();
}