function actionFrmCreateViewCurrentWeekClicked(eventobject) {
    return AS_FlexContainer_93610f8281fc446d9d3cf2ea4d4ca673(eventobject);
}

function AS_FlexContainer_93610f8281fc446d9d3cf2ea4d4ca673(eventobject) {
    (new kony.apps.coe.ess.myTime.CreateViewUIDW()).addTimeLineDates(7);
    frmCreateViewDW.flxNextWeek.skin = "slFbox";
    frmCreateViewDW.flxDateInDateSection.skin = "sknflxB2ebaeeR40DW";
    frmCreateViewDW.lblSectionDate.skin = "sknlblF2ebaeePx14AveRomanDW";
    frmCreateViewDW.lblWeek.skin = "sknlblF526270Px14AveMediumDW";
}