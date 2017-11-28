function wonRClickseltask(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_f2726b5700294ae9b8581c1443d823de(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_f2726b5700294ae9b8581c1443d823de(eventobject, sectionNumber, rowNumber) {
    var si = frmTimeSheetCreateTab.segTaskCatg.selectedIndex[1];
    frmTimeSheetCreateTab.flxsrchCriteria.setVisibility(false);
    frmTimeSheetCreateTab.flxsrchmain.setVisibility(false);
    frmTimeSheetCreateTab.addtasklbl.setVisibility(true);
    frmTimeSheetCreateTab.fxsrch.setVisibility(true);
    frmTimeSheetCreateTab.flxoperations.setVisibility(true);
    frmTimeSheetCreateTab.flxop3.setVisibility(false);
    frmTimeSheetCreateTab.flxop1.setVisibility(false);
    frmTimeSheetCreateTab.flxop2.setVisibility(false);
    switch (si) {
        case 0:
            frmTimeSheetCreateTab.flxop3.setVisibility(true);
            break;
        case 1:
            frmTimeSheetCreateTab.flxop1.setVisibility(true);
            break;
        case 2:
            frmTimeSheetCreateTab.flxop2.setVisibility(true);
            break;
        case 3:
            frmTimeSheetCreateTab.flxop3.setVisibility(true);
            frmTimeSheetCreateTab.flxop2.setVisibility(true);
            break;
        case 4:
            frmTimeSheetCreateTab.flxop1.setVisibility(true);
            frmTimeSheetCreateTab.flxop2.setVisibility(true);
            break;
        case 5:
            frmTimeSheetCreateTab.flxop3.setVisibility(true);
            frmTimeSheetCreateTab.flxop2.setVisibility(true);
            frmTimeSheetCreateTab.flxop1.setVisibility(true);
            break;
    }
}