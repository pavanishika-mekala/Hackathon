function ActionOnTaskTypeRowSelected(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_5f87f1ddc3eb4488bb0b159feee86423(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_5f87f1ddc3eb4488bb0b159feee86423(eventobject, sectionNumber, rowNumber) {
    frmCreateViewDW.flxTaskTypeSelected.setVisibility(true);
    frmCreateViewDW.tbxDescription.setVisibility(true);
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.flxSelectType.setVisibility(false);
    frmCreateViewDW.forceLayout();
}