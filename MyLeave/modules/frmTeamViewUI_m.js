/** 
 *  @author     Abhishek Singh
 *  @category   Business Logic.	
 *  @desc       Contains the UI related functions of form frmTeamView.
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

//%Region - Constructor
kony.apps.coe.ess.myLeave.TeamViewUI = function() {

};

/**
 * This method define the actions to be invoked on preshow of frmTeamView
 * @memberof TeamViewUI
 * @param None
 * @returns Null
 */
kony.apps.coe.ess.myLeave.TeamViewUI.prototype.preShow = function()
{
    this.toggleSkin(frmTeamView,true);
    this.addDynamicHorzCalendar();
    return;
};

/**
 * This method dynamically add the calender 
 * @memberof TeamViewUI
 * @param None
 * @returns Null
 */
kony.apps.coe.ess.myLeave.TeamViewUI.prototype.addDynamicHorzCalendar = function()
{
    
    var date = new Date();
    var intervalStartDate = date.thisWeekInterval(0)[0];
    var intervalEndDate = date.thisWeekInterval(0)[1];
    (new kony.apps.coe.ess.myLeave.TeamView())
    .changeMonthText(intervalStartDate, intervalEndDate);
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();
    var widgetInfo = {
        "MONTH": currentMonth,
        "YEAR": currentYear,
        "noOfWeekstobedisplayed": 12,
        "previous": 1,
        "weekNamelength": 1
    };
    var DimensionInfo = {
        "weekLabelContainerHeight": "32%",
        "weekLabelPadding": "0%",
        "weekNameContainerheight": kony.flex.USE_PREFERED_SIZE,
        "weekNamePadding": "0%",
        "weekNameContainerWidth": "73.9%",
        "weekNameleft": "26.1%",
        "weekNameTop": "51%",
        "weekDayContainerheight": "40dp",
        "weekDayContainerWidth": "73.9%",
        "weekDayPadding": "0%",
        "weekDayleft": "26.1%",
        "weekDayTop": "64%"
    };
    var skininfo = {
        "WidgetSkin": "sknFlxD8F4FFOp100",
        "weeklabelContainerSkin": "sknFlxD8F4FFOp100",
        "weekLabelSkin": "sknBtnD8F4FFOp100S32pxALR",
        "weekLabelFocusSkin": "sknBtnFFFFFFOp100S32pxALR",
        "weekNameContainerSkin": "sknFlxD3F5FFOp100",
        "weekNameCurrentSkin": "sknBtn2EBAEFOp100S22pxALR",
        "weekDayCurrentSkin": "sknBtn2EBAEFOp100S30pxALR",
        "weekDaySkin": "sknBtnd8f4ffOp100S30pxALR",
        "weekNameSkin": "sknBtn666A81Op100s22pxALR"
    };
    var callBackFunctions = {
        "OnWeekLabelClick": call
    };
    var flexBasicConfig = {
        "id": "FlexTeamTextLabel",
        "top": "50%",
        "left": "0%",
        "width": "26.1%",
        "height": "40%",
        "zIndex": 10,
        "isVisible": true,
        "clipBounds": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "sknFlxD3F5FFOp100"
    };
    var labelBasicConfig = {
        "id": "lblTeamTextLabel",
        "centerX": "50%",
        "centerY": "50%",
        "zIndex": 1,
        "isVisible": true,
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE,
        //@TODO need to add i18n 
        "text": kony.i18n.getLocalizedString("i18n.ess.frmTeamView.team.valueKA") ,
        "skin": "sknLbl1C7393Op100S30pxALR"
    };
    var labelLayoutConfig = {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": false,
        "containerWeight": 80,
        "padding": [1, 1, 1, 1],
        "paddingInPixel": true,
        "margin": [1, 1, 1, 1],
        "marginInPixel": true,
        "displayText": true
    };
    var label = new kony.ui.Label(labelBasicConfig, labelLayoutConfig,
    {});
    var flexContainer = new kony.ui.FlexContainer(flexBasicConfig,
    {},
    {});
    flexContainer.add(label);
    frmTeamView.flxDayBar.add(flexContainer);
    var weekWidget = new kony.apps.coe.Reusable.WeekHeader(widgetInfo, DimensionInfo, skininfo, callBackFunctions);
    frmTeamView.flxDayBar.add(weekWidget.getWidget());

    function call(data)
    {
        (new kony.apps.coe.ess.myLeave.TeamView()).changeMonthText(data.startDate, data.endDate);
        var segData=frmTeamView.segTeamView.data;
        data.startDate = new Date(Date.parse(data.startDate));
        data.endDate = new Date(Date.parse(data.endDate));
        (new kony.apps.coe.ess.myLeave.TeamView()).generateFormattedData(segData,data.startDate,data.endDate,false,function(res) {
                (new kony.apps.coe.ess.myLeave.TeamView()).mapAndBindData(res);
            }.bind(this));
    }
};
/**
* This method process the segment Data to assign the alternate Skin
* @memberof TeamViewUI
* @param {JSON Array} data - Segment Data
		 {String} firstSkin - Alternate Skin 1
         {String} secondSkin - Alternate Skin 2
* @returns {JSON Array} Modified Data
*/
kony.apps.coe.ess.myLeave.TeamViewUI.prototype.addAlternateSkinToSegment = function(data, firstSkin, secondSkin)
{
    try
    {
        if(typeof data != "undefined" && data !== null && data.length !== null && data.length > 0)
        {
            for(var index = 0; index < data.length; index++)
            {
                if(index % 2 === 0)
                {
                    data[index].flxImage = {
                        "skin": firstSkin
                    };
                }
                else
                {
                    data[index].flxImage = {
                        "skin": secondSkin
                    };
                }
            }
        }
        return data;
    }
    catch(e)
    {
      handleError(e);
    }
};

/**
* This method toggles the skin of individual and Team View Button
* @memberof TeamViewUI
* @param Boolean - toggleValue
* @returns Null
*/
kony.apps.coe.ess.myLeave.TeamViewUI.prototype.toggleSkin = function(formWidget,toggleValue)
{
    if(toggleValue===true)
    {
      formWidget.flxIndividualView.skin="sknFlxMobOp0";
      formWidget.imgIndividualView.src = "me.png";
      formWidget.flxTeamView.skin="sknFlxMob1C7393Border1C7393S1Px";
      formWidget.imgTeamView.src = "team.png";
    }
    else
    {
      formWidget.flxIndividualView.skin="sknFlxMob1C7393Border1C7393S1Px";
      formWidget.imgIndividualView.src = "me_active.png";
      formWidget.flxTeamView.skin="sknFlxMobOp0";
      formWidget.imgTeamView.src = "team_active.png";
    } 
  return;
};