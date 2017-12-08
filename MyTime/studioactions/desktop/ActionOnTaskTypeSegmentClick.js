function ActionOnTaskTypeSegmentClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_3be24b4666714eea9f0593887a7b1858(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_3be24b4666714eea9f0593887a7b1858(eventobject, sectionNumber, rowNumber) {
    frmCreateViewDW.flxTaskTypeSelected.setVisibility(true);
    frmCreateViewDW.tbxDescription.setVisibility(true);
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.flxSelectType.setVisibility(false);
    var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
    frmCreateViewDW.flxTimeLine.timeLineScrollFlex.flexSlider.flexSliderTask.lblTaskName.text = "Research";
    frmCreateViewDW.forceLayout();
}