function actionFrmCreateViewNextWeekClicked(eventobject) {
    return AS_FlexContainer_299928246dc34e81a25b24f5ed5d68c8(eventobject);
}

function AS_FlexContainer_299928246dc34e81a25b24f5ed5d68c8(eventobject) {
    (new kony.apps.coe.ess.myTime.CreateViewUIDW()).addTimeLineDates(14);
    frmCreateViewDW.flxNextWeek.skin = "sknflxB2ebaeeR40DW";
    frmCreateViewDW.flxDateInDateSection.skin = "slFbox";
    frmCreateViewDW.lblSectionDate.skin = "sknlblF526270Px14AveMediumDW";
    frmCreateViewDW.lblWeek.skin = "sknlblF2ebaeePx14AveRomanDW";
}