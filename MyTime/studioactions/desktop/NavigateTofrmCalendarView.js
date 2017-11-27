function NavigateTofrmCalendarView(eventobject) {
    return AS_FlexContainer_9a2e99f6232d48b886d51bb0f7b3e1e8(eventobject);
}

function AS_FlexContainer_9a2e99f6232d48b886d51bb0f7b3e1e8(eventobject) {
    var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
    frmCreateViewDW.flxTimeLine.timeLineScrollFlex.flexSliderNew.isVisible = true;
    frmCreateViewDW.flxTimeLine.timeLineScrollFlex.flexSlider.isVisible = false;
    frmCalendarViewDW.show();
}