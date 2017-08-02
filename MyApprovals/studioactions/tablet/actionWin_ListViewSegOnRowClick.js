function actionWin_ListViewSegOnRowClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_968d608e031a4c15a9d4d40cc79340b7(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_968d608e031a4c15a9d4d40cc79340b7(eventobject, sectionNumber, rowNumber) {
    frmTabListView.lblNoComments.setVisibility(false);
    frmTabListView.flxDecision.setVisibility(true);
    frmTabListView.txtComments.text = "";
    frmTabListView.flxComments.height = "50%";
    SetDataToUI();
}