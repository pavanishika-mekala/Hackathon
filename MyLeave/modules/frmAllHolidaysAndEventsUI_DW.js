/** 
 *  @author     Shantam Agarwal
 *  @category   Business Logic.	
 *  @desc       Contains UI related code for frmAllHolidaysAndEvents
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmAllHolidaysAndEvents = kony.apps.coe.ess.myLeave.frmAllHolidaysAndEvents || {};

/**
 * @memberof       frmAllHolidaysAndEvents
 * @param          None.
 * @return         None.
 * @description    populates holidays in holidays segment
 */
kony.apps.coe.ess.myLeave.frmAllHolidaysAndEvents.populateHolidaysAndEvents = function(holidayData, eventData){
	var currDate = new Date();
	var successCallback = function(){
		kony.apps.coe.ess.myLeave.frmAllHolidaysAndEvents.removeLastConnectors()
	}
	kony.apps.coe.ess.myLeave.frmAllHolidaysAndEvents.filterHolidaysForCurrentMonth(holidayData, currDate, successCallback);
}

/**
 * @memberof       frmAllHolidaysAndEvents
 * @param          None.
 * @return         None.
 * @description    filters and populates holidays in holidays segment
 */
kony.apps.coe.ess.myLeave.frmAllHolidaysAndEvents.filterHolidaysForCurrentMonth = function(holidayData, dateObject){
	var segData =
	[	
		[
	        {
	            imgHolidayIcon:"holidayswhite.png",
	            lblHolidays: "Holidays",
	            lblLine:"",
	            lblYear: "2016",
	            template: flxSegAllHolidayListHeader
	        },
	        []
	    ]
	];
    frmAllHolidaysAndEventsDW.segHolidayList.widgetDataMap = {
        "flxDate": "flxDate",
        "flxHeaderHeader": "flxHeaderHeader",
        "flxHolidayIcon": "flxHolidayIcon",
        "flxLine": "flxLine",
        "flxSegAllHolidayListHeader": "flxSegAllHolidayListHeader",
        "flxSegAllHolidaysList": "flxSegAllHolidaysList",
        "imgHolidayIcon": "imgHolidayIcon",
        "lblDate": "lblDate",
        "lblHolidayName": "lblHolidayName",
        "lblHolidays": "lblHolidays",
        "lblLine": "lblLine",
        "lblMonth": "lblMonth",
        "lblYear": "lblYear"
    };
    segData[0][0].lblYear = dateObject.getFullYear().toString();
	for(var i=0; i<holidayData.length; i++){
		if(parseInt(holidayData[i].Holiday_Date.slice(0,4)) == dateObject.getFullYear()  && holidayData[i].Type === "1"){
			var holidayObj = {};
			holidayObj['lblDate'] = parseInt(holidayData[i].Holiday_Date.slice(6,8)).toString();
			holidayObj['lblHolidayName'] = holidayData[i].Name;
			holidayObj['lblLine'] = "";
			holidayObj['lblMonth'] = Date.getMonthMapNumberToMonth[holidayData[i].Holiday_Date.slice(4,6)];
			segData[0][1].push(holidayObj);
		}
	}
	frmAllHolidaysAndEventsDW.segHolidayList.setData(segData);
	frmAllHolidaysAndEventsDW.forceLayout();
}

/**
 * @memberof       frmAllHolidaysAndEvents
 * @param          None.
 * @return         None.
 * @description    Removes connectors for last row of segment
 */
kony.apps.coe.ess.myLeave.frmAllHolidaysAndEvents.removeLastConnectors = function(){
	var eventListObject = frmAllHolidaysAndEventsDW.segEventList.data[0][1];
  	var lastRowObjectEvent = eventListObject[eventListObject.length -1];
  	var holidayListObject = frmAllHolidaysAndEventsDW.segHolidayList.data[0][1];
 	var lastRowObjectHoliday = holidayListObject[holidayListObject.length -1];
  	lastRowObjectEvent.lblLine = {"isVisible": false};
  	lastRowObjectHoliday.lblLine = {"isVisible": false};
  	frmAllHolidaysAndEventsDW.segEventList.setDataAt(lastRowObjectEvent,eventListObject.length-1,0)
    frmAllHolidaysAndEventsDW.segHolidayList.setDataAt(lastRowObjectHoliday,holidayListObject.length-1,0)
}