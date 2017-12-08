kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.MyTime = kony.apps.coe.ess.MyTime || {};
kony.apps.coe.ess.MyTime.Footer = kony.apps.coe.ess.MyTime.Footer || {};

kony.apps.coe.ess.MyTime.Footer.SetFooterNavigation = function(indexSelected, contextData) {
    kony.print("-- start kony.apps.coe.ess.MyTime.Footer.SetFooterNavigation--");

    //active indicator Reset
    outerFlexFooterNavigation.flxBlueLine1Footer.isVisible = false;
    outerFlexFooterNavigation.flxBlueLine2Footer.isVisible = false;
    outerFlexFooterNavigation.flxBlueLine3Footer.isVisible = false;
    outerFlexFooterNavigation.flxBlueLine4Footer.isVisible = false;
    //Background skin Reset
    outerFlexFooterNavigation.InnerFlex1Footer.skin = "sknFlxMobBgF8F7F5Op100BorCCCCCCC";
    outerFlexFooterNavigation.InnerFlex2Footer.skin = "sknFlxMobBgF8F7F5Op100BorCCCCCCC";
    outerFlexFooterNavigation.InnerFlex3Footer.skin = "sknFlxMobBgF8F7F5Op100BorCCCCCCC";
    outerFlexFooterNavigation.InnerFlex4Footer.skin = "sknFlxMobBgF8F7F5Op100BorCCCCCCC";
    //image Reset
    outerFlexFooterNavigation.imgTimesheetActiveFooter.src = "cal.png";
    outerFlexFooterNavigation.imgTimeSheetHistoryFooter.src = "history_normal.png";
    outerFlexFooterNavigation.imgSearchFooter.src = "search.png";
    outerFlexFooterNavigation.imgSettingsFooter.src = "settings.png";
    switch (indexSelected) {
        case 1:
            outerFlexFooterNavigation.flxBlueLine1Footer.isVisible = true;
            outerFlexFooterNavigation.InnerFlex1Footer.skin = "sknFlxMobBgFFFFFFOp100BorCCCCCCC";
            outerFlexFooterNavigation.imgTimesheetActiveFooter.src = "cal_active.png";
            showTimesheetHomeForm(contextData);
            break;
        case 2:
            outerFlexFooterNavigation.flxBlueLine2Footer.isVisible = true;
            outerFlexFooterNavigation.InnerFlex2Footer.skin = "sknFlxMobBgFFFFFFOp100BorCCCCCCC";
            outerFlexFooterNavigation.imgTimeSheetHistoryFooter.src = "history_active.png";
            showTimesheetHistoryForm();
            break;
        case 3:
            outerFlexFooterNavigation.flxBlueLine3Footer.isVisible = true;
            outerFlexFooterNavigation.InnerFlex3Footer.skin = "sknFlxMobBgFFFFFFOp100BorCCCCCCC";
            outerFlexFooterNavigation.imgSearchFooter.src = "search_selected.png";
            frmSearchMyTime.show();
            break;
        case 4:
            outerFlexFooterNavigation.flxBlueLine4Footer.isVisible = true;
            outerFlexFooterNavigation.InnerFlex4Footer.skin = "sknFlxMobBgFFFFFFOp100BorCCCCCCC";
            outerFlexFooterNavigation.imgSettingsFooter.src = "settings_selected.png";
            frmTimesheetSettings.show();
            break;
        default:
            kony.print("--wrong input given--");
    }
    kony.print("-- end kony.apps.coe.ess.MyTime.Footer.SetFooterNavigation--");
};