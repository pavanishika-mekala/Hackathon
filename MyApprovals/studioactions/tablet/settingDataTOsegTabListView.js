function settingDataTOsegTabListView(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_19e43486f0a84ed78fdcabfc4925e0f1(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_19e43486f0a84ed78fdcabfc4925e0f1(eventobject, sectionNumber, rowNumber) {
    frmTabListView.lblNoComments.setVisibility(false);
    frmTabListView.flxDecision.setVisibility(true);
    frmTabListView.txtComments.text = "";
    frmTabListView.flxComments.height = "50%";
    SetDataToUI();
}