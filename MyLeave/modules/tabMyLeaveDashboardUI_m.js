/**
 * @module tabMyLeaveDashboardUI
 * @author Ritika
 * @category UI 
 * @description MyLeaveDashboard class. 
 * © 2016 Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeaveTab = kony.apps.coe.ess.myLeaveTab || {};
//%Region - Constructor
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard = function()
{
	 try  {
    kony.print("-- Start MyLeaveDashboard --");
    ImageData = {};
    EmployeeData = [];
    kony.print("-- End MyLeaveDashboard --");
  } catch (e) {
    handleError(e);
    kony.print("------------------------------------------In kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard " + e);
  }
};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID = "";

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.
addCalendarOnLeaveHome = function()
{
  try{
    kony.print("-- Start addCalendarOnLeaveHome --");
  	var currDate = new Date();
	//#ifdef windows8
    	kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth() ,currDate.getFullYear().toString().trim(0,4),"flxCalendarWidget","sknFlxMobOp0","sknFlxFocus","sknFlxMobOp0","sknFlxMobOp100BgColD8F4FF","sknBtnMobBg0OpFC777777Op100S79","sknBtnMobOp100Bg2EBAEFFcFFFFFF","sknLblMobFC333333Op100FS90","sknBtnMobBg0OpFC333333Op100S24px","sknBtnMobBg0OpFCC3C4CCOp100S24px",this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender,this.onSwipeCallback,this.onTouchEndCallback,this.monthRefresh,this.totalCalenderRefresh);
    //#else
    kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth() ,currDate.getFullYear().toString().trim(0,4),"flxCalendarWidget","sknFlxMobOp0","sknFlxFocus","sknFlxMobOp0","sknFlxMobOp100BgColD8F4FF","sknBtnMobBg0OpFC777777Op100S79","sknBtnMobOp100Bg2EBAEFFcFFFFFF","sknLblMobFC333333Op100FS90","sknBtnMobBg0OpFC333333Op100S24px","sknBtnMobBg0OpFCC3C4CCOp100S24px",this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender,this.onSwipeCallback,this.onTouchEndCallback,this.monthRefresh,this.totalCalenderRefresh);
    //#endif
    frmTabLeaveDashboard.flxCalendar.add(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.getcalendar());
    kony.print("-- End addCalendarOnLeaveHome --");
    }  catch(e) {
      handleError(e);
  }
    var query = "select name from leave_type";
    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, leaveTypeSucess, error);
    function leaveTypeSucess(response) {
        kony.apps.coe.myLeave.leaveHistory.leaveTypeResponse = response;
      }
      query = "select Status_Name,Id from Status";
       kony.sync.single_select_execute(kony.sync.getDBName(), query, null, statusTypeSucess,error);
       function statusTypeSucess(response) {
       kony.apps.coe.myLeave.leaveHistory.statusTypeResponse = response;
       
    }

    function error(err) {
       // this.createDynamicSegment();
    }

};
/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       myWidget, gestureInfo, context
 * return       None.
 * desc         This method is a callback function for the calendar widget called on swipe.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.onSwipeCallback = function(myWidget, gestureInfo, context) {
  
};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.isValidMonthandYearforCalender = function(month,year) {
  try{
    kony.print("-- Start isValidMonthandYearforCalender --");
    var currDate = new Date();
  	if(year >= (currDate.getFullYear()-1).toString().trim(0,4) && year <= (currDate.getFullYear()+1).toString().trim(0,4)) {
      return true;
    }
    else { 
      return false;
    }
    kony.print("-- End isValidMonthandYearforCalender --");
  }  catch(e) {
    handleError(e);
  }
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is an error callback function for the calendar widget.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.errorIsValidMonthandYearforCalender = function(month,year) {
  
};
/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       month, year, index
 * return       None.
 * desc         This method is a callback function for the calendar widget called on month refresh.
 */

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.monthRefresh = function(month,year,index) {
     (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getLeaveDashboardData();
};
/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       month, year
 * return       None.
 * desc         This method is a callback function for the calendar widget called on total calendar refresh.
 */

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.totalCalenderRefresh = function(month,year) {
        (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getLeaveDashboardData();
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called on the preshow of the Home form.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.getLeaveDashboardData=function()
{
  try  {
      kony.print("-- Start leaveHomePreShow --");
      var currDate = new Date();
      var actualCurrYear = currDate.getFullYear().toString().trim(0, 4);
      var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.month)) + 1)).slice(-2));
      var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0,4);
      var getPendingRequestsQuery = "select count(id) as allPending from leave as l " +
      "where status_id = 2 and employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and ((l.start_date between '" + (parseInt(actualCurrYear)-1).toString() + "0101'" +
      " AND '" + (parseInt(actualCurrYear)+1).toString() + "1231') OR (l.end_date between '" + (parseInt(actualCurrYear)-1).toString() + "0101' AND '" + (parseInt(actualCurrYear)+1).toString() + "1231'))";
   	  kony.sync.single_select_execute(kony.sync.getDBName(), getPendingRequestsQuery, null, function(res) {
		//#ifndef windows8
        frmTabLeaveDashboard.lblPendingLeaveCount.text = res[0].allPending + "";
		//#endif
      }, function (err){handleError(err);}, false);
      var getHolidaysQuery = "select Holiday_Date as Date,Name from Holiday where Holiday_Date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31'";
   	  kony.sync.single_select_execute(kony.sync.getDBName(), getHolidaysQuery, null, this.onSuccessCallbackForHolidays.bind(this), function (err){handleError(err);}, false);
      kony.print("-- End leaveHomePreShow --");
  } catch (e) {
    handleError(e);
  }
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is success callback for get holidays query.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.onSuccessCallbackForHolidays = function(res)
{
	kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data = [];
    var monthsJSON = {"01":"January", "02":"February", "03":"March", "04":"April", "05":"May", "06":"June", "07":"July", "08":"August", "09":"September", "10":"October", "11":"November", "12":"December"};
  	for(var i = 0; i < res.length; i++){
      var tempJSON = {};
      if(res[i].Name !== "Non Working Day"){
        tempJSON = {"Type" : "Holiday",
                       "isValid" : true};
      }
      else {
        tempJSON = {"Type" : "Non Working Day",
                       "isValid" : true};
      }
      tempJSON.Name = res[i].Name;
      tempJSON.Date = res[i].Date.substring(6,8) + " " + (monthsJSON[res[i].Date.substring(4,6) + ""]).substring(0,3);
      tempJSON.FullDate = res[i].Date;
      kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.push(tempJSON);
    }
  
  	var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.month)) + 1)).slice(-2));
    var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0,4);
    var getEventsQuery = "select holiday_date as Date,name from event where (holiday_date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31')";
   	kony.sync.single_select_execute(kony.sync.getDBName(), getEventsQuery, null, this.onSuccessCallbackForEvents.bind(this), function (err){handleError(err);}, false);
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is success callback for get holidays query.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.onSuccessCallbackForEvents = function(res)
{
 	var monthsJSON = {"01":"January", "02":"February", "03":"March", "04":"April", "05":"May", "06":"June", "07":"July", "08":"August", "09":"September", "10":"October", "11":"November", "12":"December"};
  	for(var i = 0; i < res.length; i++){
      var tempJSON = {"Type" : "Event",
                     "isValid" : true};
      tempJSON.Name = res[i].Name;
      tempJSON.Date = res[i].Date.substring(6,8) + " " + (monthsJSON[res[i].Date.substring(4,6) + ""]).substring(0,3);
      tempJSON.FullDate = res[i].Date;
      kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.push(tempJSON);
    }
  	kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.sort(function(a,b){
      var x = new Date(a.FullDate.substring(0,4),a.FullDate.substring(4,6),a.FullDate.substring(6,8));
      var y = new Date(b.FullDate.substring(0,4),b.FullDate.substring(4,6),b.FullDate.substring(6,8));
      return x.compareOnlyDate(y);
    });
  	var formatedHolidayData = [];
    var formattedEventData = [];
  
    for(var i = 0; i<kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.length; i++ ) {
      var tempJSON = {
        "lblDate" : "",
        "lblHoliday" : "",
      };
      if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Type.toLowerCase() === "holiday" && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].isValid === true) {
        tempJSON.lblDate = {"text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Date};
        tempJSON.lblHoliday = {"skin":"sknlblFF72A9Op100S32pxRoman", "text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Name};
        formatedHolidayData.push(tempJSON);
      }
      else if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Type.toLowerCase() === "event") {
        tempJSON.lblDate = {"text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Date};
        tempJSON.lblHoliday = {"skin":"sknlblFA713BOp100S32pxRoman", "text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Name};
        formattedEventData.push(tempJSON);
      }
    }
    frmTabLeaveDashboard.segMonthHolidayList.setData(formatedHolidayData);
    frmTabLeaveDashboard.segMonthEventList.setData(formattedEventData);
  
  	var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.month)) + 1)).slice(-2));
    var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0,4);
    frmTabLeaveDashboard.lblHeaderYear.text=currYear;
  	var getLeavesQuery = "select l.id as LeaveID, lt.name as LeaveType, l.status_id as StatusID, l.start_date as StartDate, l.end_date as EndDate, l.no_of_hours as Hours, l.lastmodifiedts as LastModifiedDate, l.createdts as CreateDate " +
        "from leave l join leave_type lt on l.leave_type_id = lt.id " +
        "where l.employee_id = '" + kony.apps.coe.ess.globalVariables.employeeId + "' and ((l.start_date between '" + currYear + currMonth + "01'" +
        " AND '" + currYear + currMonth + "31') OR (l.end_date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31'))";
   	kony.sync.single_select_execute(kony.sync.getDBName(), getLeavesQuery, null, this.onSuccessCallbackForLeaves.bind(this), function (err){handleError(err);}, false);
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is success callback for get Leave query.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.onSuccessCallbackForLeaves = function(res)
{
  	for(var i = 0; i<kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.length; i++){
      for(var j = 0; j < res.length; j++){
        if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].FullDate >= res[j].StartDate && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].FullDate <= res[j].EndDate && (res[j].StatusID == "2" || res[j].StatusID == "0" || res[j].StatusID == "1" || res[j].StatusID == "7")){
          kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].isValid = false;
          break;
        }
      }
    }
  	var statusArray = ["ACCEPTED","REJECTED","PENDING","CANCEL","SENTBACK","SAVED","ERROR","Submitted"];
  	var statusCount = {"pending":0,"accepted":0,"rejected":0,"submitted":0};
	for(var i = 0; i < res.length; i++){
      res[i].Status = statusArray[parseInt(res[i].StatusID)];
      if(res[i].Status.toLowerCase() == "pending" || res[i].Status.toLowerCase() == "accepted" || res[i].Status.toLowerCase() == "rejected" || res[i].Status.toLowerCase() == "submitted"){
        statusCount[res[i].Status.toLowerCase()] = statusCount[res[i].Status.toLowerCase()] + 1;
      }
      var tempJSON = {"Type" : "Leave"};
      tempJSON.LeaveID = res[i].LeaveID;
      tempJSON.LeaveType = res[i].LeaveType;
      tempJSON.StartDate = res[i].StartDate;
      tempJSON.EndDate = res[i].EndDate;
      tempJSON.Hours = res[i].Hours;
      tempJSON.CreateDate = res[i].CreateDate;
      tempJSON.LastModifiedDate = res[i].LastModifiedDate;
      if(res[i].Status.toLowerCase() == "accepted")
      {
        tempJSON.Status = "APPROVED";
      }
      else
      {
        tempJSON.Status = res[i].Status;
      }
      kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.push(tempJSON);
    }
  	frmTabLeaveDashboard.lblLeaveMonthDetailsStatusApprovedCount.text = "" + statusCount.accepted;
  	frmTabLeaveDashboard.lblLeaveMonthDetailsStatusPendingCount.text = "" + statusCount.pending;
  	frmTabLeaveDashboard.lblLeaveMonthDetailsStatusRejectedCount.text = "" + statusCount.rejected;
    frmTabLeaveDashboard.lblLeaveMonthDetailsStatusSubmittedCount.text = "" + statusCount.submitted;
    this.mappingBackendDataToCalendar();
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called to map backend data to calendar widget.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.mappingBackendDataToCalendar = function()
{
    try  {
      kony.print("-- Start mappingBackendDataToCalendar --");
      //here 42 is the total number of cells in the calendar widget
      for (var i = 0; i < 42; i++) {
        for (var j= 0; j < kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.length; j++) {
          var cellData = null;
          var months = {"Jan" : "01", "Feb" : "02", "Mar" : "03", "Apr" : "04", "May" : "05", "Jun" : "06", "Jul" : "07", "Aug" : "08", "Sep" : "09", "Oct" : "10", "Nov" : "11", "Dec" : "12"};
          var currCellData = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.getCelldataAtIndex(i);
          var currCellDate = currCellData.LABEL.Date.split(' ');
          var currCellDateFormatted = currCellDate[3] + months["" + currCellDate[1]] + currCellDate[2];
          if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Type === "Holiday" && currCellDateFormatted == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].FullDate && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].isValid === true){
            cellData = {"CELL": {"skin": "sknFlxMobHoliday"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFC333333Op100S24px"}};
            kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
            break;
          }
          else if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Type === "Non Working Day" && currCellDateFormatted == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].FullDate && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].isValid === true){
            cellData = {"CELL": {"skin": "sknFlxMobOp0"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFC333333Op100S24px"}};
            kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
            break;
          }
          else if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Type === "Event" && currCellDateFormatted == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].FullDate && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].isValid === true){
            cellData = {"CELL": {"skin": "sknFlxMobEvent"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFC333333Op100S24px"}};
            kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
            break;
          }
          else if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Type === "Leave" && (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() == "pending" || kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() == "approved" || kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() == "rejected" || kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() == "submitted")){
            if(currCellDateFormatted == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].StartDate && currCellDateFormatted == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].EndDate ){
              if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].LeaveID){
                cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "Round"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFCFFFFFFOp100S24px"}};
              }
              else {
            	cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "RoundOutline"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase()}};
              }
              kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
              break;
          	}
            else if(currCellDateFormatted == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].StartDate && currCellDateFormatted != kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].EndDate) {
              if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].LeaveID){
                cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "LeftBar"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFCFFFFFFOp100S24px"}};
              }
              else{
              	cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "LeftBarOutline"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase()}};
              }
              kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
              break;
          	}

            else if(currCellDateFormatted != kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].StartDate && currCellDateFormatted == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].EndDate) {
              if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].LeaveID){
                cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "RightBar"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFCFFFFFFOp100S24px"}};
              }
              else {
              	cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "RightBarOutline"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase()}};
              }
              kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
              break;
          	}
            else if(currCellDateFormatted > kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].StartDate && currCellDateFormatted < kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].EndDate) {
              if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID == kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].LeaveID){
                cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "MiddleBar"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFCFFFFFFOp100S24px"}};
              }
              else {
              	cellData = {"CELL": {"skin": "sknFlxMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase() + "MiddleBarOutline"},"data": {"CellData": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j],"TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMob" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[j].Status.toLowerCase()}};
              }
              kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
              break;
            }
          }
          else {
            if(currCellData.LABEL.isMothDay){
              var currDate = new Date();
              var currYear = currDate.getFullYear().toString().trim(0,4);
              var currMonth = "0" + (currDate.getMonth()+1).toString();
              var formattedCurrDate = currYear + currMonth.slice(-2) + ("0" + currDate.getDate().toString()).slice(-2);
              if(formattedCurrDate == currCellDateFormatted){
                cellData = {"CELL": {"skin": "sknFlxMobOp0"},"data": {"CellData": "","TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMob2EBAEFS24Px"}};
              }
              else{
	         	  cellData = {"CELL": {"skin": "sknFlxMobOp0"},"data": {"CellData": "","TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFC333333Op100S24px"}};
              }
            }
            else {
              cellData = {"CELL": {"skin": "sknFlxMobOp0"},"data": {"CellData": "","TYPE":""},"IMAGE": {"isVisible": false,"src": ""}, "LABEL":{"skin":"sknBtnMobBg0OpFCC3C4CCOp100S24px"}};
            }
            kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.setDataAtIndex(1,i,cellData);
          }
        }
      }
      kony.print("-- End mappingBackendDataToCalendar --");
    } catch (e) {
    handleError(e);
    }
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       data
 * return       None.
 * desc         This method is a callback function for the calendar widget called on touch end.
 */
kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.onTouchEndCallback = function(data) {
  try  {
    kony.print("-- Start onTouchEndCallback --");
    frmTabLeaveDashboard.segChat.removeAll();
    if(data.LABEL.isMothDay){
      if(data.CELL.skin == "sknFlxMobOp0") {
        if(JSON.stringify(data.data.CellData) !== "" && data.data.CellData.Name == "Non Working Day"){
            toastMsg.showToastMsg(data.data.CellData.Name,2000);          
        	}
      }
      else {
        if(data.data.CellData.Type == "Holiday"){
          toastMsg.showToastMsg(data.data.CellData.Name,2000);
        }
        else if(data.data.CellData.Type == "Event"){
          toastMsg.showToastMsg(data.data.CellData.Name,2000);
        }
        else if(data.data.CellData.Type == "Leave"){
          var monthsJSON = {"01":"January", "02":"February", "03":"March", "04":"April", "05":"May", "06":"June", "07":"July", "08":"August", "09":"September", "10":"October", "11":"November", "12":"December"};
          kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID = data.data.CellData.LeaveID;
          (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).mappingBackendDataToCalendar();
          frmTabLeaveDashboard.lblLeaveType.text = data.data.CellData.LeaveType;
          var leaveNoteDataQuery = "select ln.comments, ln.employee_id, ln.createdts, e.First_Name, e.Last_Name, e.Media_Id " +
		  "from leave_note ln join Employee e on ln.employee_id=e.Id where ln.leave_id = '" + kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID + "' order by ln.createdts ASC";
          kony.sync.single_select_execute(kony.sync.getDBName(), leaveNoteDataQuery, null, function(res) {
            if(res.length <= 0){
              frmTabLeaveDashboard.segChat.isVisible = false;
            }
            else {
              kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.EmployeeData = res;
              kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImgIndex = 0;
              kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData = [];
              kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
              (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getEmployeeImages();
            }
          }, function (err){handleError(err);}, false);
          if(!isNaN(data.data.CellData.Hours) && data.data.CellData.Hours !== null && data.data.CellData.Hours !== ""){
            frmTabLeaveDashboard.lblLeaveTime.isVisible = true;
            if(parseFloat(data.data.CellData.Hours) >= 7.5){
              frmTabLeaveDashboard.lblFullDay.text = "Full Day";
            }
            else{
              frmTabLeaveDashboard.lblFullDay.text = "Partial";
            }

            if(data.data.CellData.StartDate == data.data.CellData.EndDate){
              frmTabLeaveDashboard.lblLeaveTime.text = parseFloat(data.data.CellData.Hours).toString() + " HOURS";
              frmTabLeaveDashboard.lblFromTo.text = data.data.CellData.StartDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4,6) + ""]).substring(0,3);
            }
            else{
              var diff = Math.ceil(parseInt(data.data.CellData.Hours)/7.5);
              frmTabLeaveDashboard.lblLeaveTime.text = diff.toString() + " DAYS";
              frmTabLeaveDashboard.lblFromTo.text = data.data.CellData.StartDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4,6) + ""]).substring(0,3) + " - " + data.data.CellData.EndDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.EndDate.substring(4,6) + ""]).substring(0,3);
            }
          }
          else {
            frmTabLeaveDashboard.lblLeaveTime.isVisible = false;
            frmTabLeaveDashboard.lblLeaveTime.text = " - ";
            if(data.data.CellData.StartDate == data.data.CellData.EndDate){
              frmTabLeaveDashboard.lblFullDay.text = " ";
              frmTabLeaveDashboard.lblFromTo.text = data.data.CellData.StartDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4,6) + ""]).substring(0,3);
            }
            else{
              frmTabLeaveDashboard.lblFullDay.text = "Full Day";
              frmTabLeaveDashboard.lblFromTo.text = data.data.CellData.StartDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4,6) + ""]).substring(0,3) + " - " + data.data.CellData.EndDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.EndDate.substring(4,6) + ""]).substring(0,3);
            }
          }
          
          if(!isNaN(data.data.CellData.CreateDate) && data.data.CellData.CreateDate !== null && data.data.CellData.CreateDate !== ""){
            var appliedTime = "";
            if(data.data.CellData.CreateDate.substring(8,10) >= "12"){
              appliedTime = (parseInt(data.data.CellData.CreateDate.substring(8,10)) - 12) + ":" + data.data.CellData.CreateDate.substring(10,12) + " PM";
            }
            else{
              appliedTime = data.data.CellData.CreateDate.substring(8,10) + ":" + data.data.CellData.CreateDate.substring(10,12) + " AM";
            }
            var appliedDate = data.data.CellData.CreateDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.CreateDate.substring(4,6) + ""]).substring(0,3) + " " + data.data.CellData.CreateDate.substring(0,4) + ", " + appliedTime;
            frmTabLeaveDashboard.lblLeaveDetailApplyDate.text = appliedDate;
          }
          else {
            frmTabLeaveDashboard.lblLeaveDetailApplyDate.text = " ";
          }
          if(data.data.CellData.Status.toLowerCase() == "pending"){
            frmTabLeaveDashboard.flxLeaveDetails.isVisible = true;
            frmTabLeaveDashboard.flxLeaveDetailHeader.skin="sknFlexTabfab745";
            frmTabLeaveDashboard.imgLeaveDetailHeaderBorder.src="dark_orange.png";
            frmTabLeaveDashboard.flxLeaveDetailsEdit.isVisible = true;
            frmTabLeaveDashboard.flxSelectedLeaveStatusPending.isVisible = true;
            frmTabLeaveDashboard.flxLeaveDetailsDelete.isVisible = true;
            frmTabLeaveDashboard.flxLeaveDetailsAdd.isVisible = false;
            frmTabLeaveDashboard.imgLeaveStatus.src = "backsmall.png";
            frmTabLeaveDashboard.flxSelectedLeaveStatusOther.isVisible=false;
            frmTabLeaveDashboard.lblSelectedLeaveStatusPending.text = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
            frmTabLeaveDashboard.lblSelectedLeaveStatusPending.skin = "sknLblMobFFAE2B28Px";
          }

          else if(data.data.CellData.Status.toLowerCase() == "submitted"){
		    frmTabLeaveDashboard.flxLeaveDetails.isVisible = true;
            frmTabLeaveDashboard.flxSelectedLeaveStatusOther.isVisible = false;
            frmTabLeaveDashboard.flxLeaveDetailHeader.skin="sknFlx1c7393Tab";
            frmTabLeaveDashboard.imgLeaveDetailHeaderBorder.src="bluedark.png";
            frmTabLeaveDashboard.flxLeaveDetailsAdd.isVisible = false;
            frmTabLeaveDashboard.flxSelectedLeaveStatusPending.isVisible = true;
            frmTabLeaveDashboard.imgLeaveStatus.src = "backsmall.png";
            frmTabLeaveDashboard.lblSelectedLeaveStatusPending.text = kony.i18n.getLocalizedString("i18n.ess.common.submitted.valueKA");
            frmTabLeaveDashboard.lblSelectedLeaveStatusPending.skin = "sknLblMob2EbAEF28Px";
          }

          else if(data.data.CellData.Status.toLowerCase() == "approved"){
            frmTabLeaveDashboard.flxLeaveDetails.isVisible = true;
            frmTabLeaveDashboard.flxLeaveDetailHeader.skin="sknFlx00c6adTab";
            frmTabLeaveDashboard.imgLeaveDetailHeaderBorder.src="green_approved.png";
            frmTabLeaveDashboard.flxLeaveDetailsAdd.isVisible = false;
            frmTabLeaveDashboard.flxLeaveDetailsEdit.isVisible = false;
            frmTabLeaveDashboard.flxLeaveDetailsDelete.isVisible = true;
            frmTabLeaveDashboard.flxSelectedLeaveStatusPending.isVisible = false;
            frmTabLeaveDashboard.flxSelectedLeaveStatusOther.isVisible = true;
            frmTabLeaveDashboard.imgLeaveStatus.src = "backsmall.png";
            frmTabLeaveDashboard.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA");
            frmTabLeaveDashboard.lblSelectedLeaveStatusOther.skin = "sknLblMob00C6AE28Px";            
            if(!isNaN(data.data.CellData.LastModifiedDate) && data.data.CellData.LastModifiedDate !== null && data.data.CellData.LastModifiedDate !== ""){
              var approvedTime = "";
              if(data.data.CellData.LastModifiedDate.substring(8,10) >= "12"){
                approvedTime = (parseInt(data.data.CellData.LastModifiedDate.substring(8,10)) - 12) + ":" + data.data.CellData.LastModifiedDate.substring(10,12) + " PM";
              }
              else{
                approvedTime = data.data.CellData.LastModifiedDate.substring(8,10) + ":" + data.data.CellData.LastModifiedDate.substring(10,12) + " AM";
              }
              var approvedDate = data.data.CellData.LastModifiedDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.LastModifiedDate.substring(4,6) + ""]).substring(0,3) + " " + data.data.CellData.LastModifiedDate.substring(0,4) + ", " + approvedTime;
              frmTabLeaveDashboard.lblSelectedLeaveStatusOtherDate.text = approvedDate;
            }
            else {
              frmTabLeaveDashboard.lblSelectedLeaveStatusOtherDate.text = " ";
            }
          }
          else if(data.data.CellData.Status.toLowerCase() == "rejected"){
            frmTabLeaveDashboard.flxLeaveDetails.isVisible = true;
            frmTabLeaveDashboard.flxSelectedLeaveStatusOther.isVisible = true;
            frmTabLeaveDashboard.flxSelectedLeaveStatusPending.isVisible = false;
            frmTabLeaveDashboard.flxLeaveDetailHeader.skin="sknFlxff6e5fTab";
            frmTabLeaveDashboard.imgLeaveDetailHeaderBorder.src="red_rejected.png";
            frmTabLeaveDashboard.flxLeaveDetailsEdit.isVisible = false;
            frmTabLeaveDashboard.flxLeaveDetailsDelete.isVisible = false;
            frmTabLeaveDashboard.imgLeaveStatus.src = "backsmall.png";
            frmTabLeaveDashboard.flxLeaveDetailsAdd.isVisible = true;
            frmTabLeaveDashboard.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA");
            frmTabLeaveDashboard.lblSelectedLeaveStatusOther.skin = "sknLblMobF74B4B28Px";
            if(!isNaN(data.data.CellData.LastModifiedDate) && data.data.CellData.LastModifiedDate !== null && data.data.CellData.LastModifiedDate !== ""){
              var rejectedTime = "";
              if(data.data.CellData.LastModifiedDate.substring(8,10) >= "12"){
                rejectedTime = (parseInt(data.data.CellData.LastModifiedDate.substring(8,10)) - 12) + ":" + data.data.CellData.LastModifiedDate.substring(10,12) + " PM";
              }
              else{
                rejectedTime = data.data.CellData.LastModifiedDate.substring(8,10) + ":" + data.data.CellData.LastModifiedDate.substring(10,12) + " AM";
              }
              var rejectedDate = data.data.CellData.LastModifiedDate.substring(6,8) + " " + (monthsJSON[data.data.CellData.LastModifiedDate.substring(4,6) + ""]).substring(0,3) + " " + data.data.CellData.LastModifiedDate.substring(0,4) + ", " + rejectedTime;
              frmTabLeaveDashboard.lblSelectedLeaveStatusOtherDate.text = rejectedDate;
            }
            else {
              frmTabLeaveDashboard.lblSelectedLeaveStatusOtherDate.text = " ";
            }
          }
        }
      }
    }
     kony.print("-- End onTouchEndCallback --");
}
   catch (e) {
    handleError(e);
  }
};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.getEmployeeImages = function() {
        var data = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.EmployeeData;
        if(data.length>0 && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImgIndex < kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.EmployeeData.length){
          var i = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImgIndex;
               if(data[i].Media_Id !== undefined && data[i].Media_Id !== null){
              (new kony.apps.coe.ess.myLeave.media()).fetchEmployeeImage({"mediaName":data[i].Media_Id},(new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getImageSuccess,(new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getImageError);
               }
        }else{
           (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).setComments();
        }
};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.getImageSuccess = function(response){
          kony.print("-------emp--------"+JSON.stringify(response));
           if(response !== undefined ){
           kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData.push({"base64" : response});
           kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImgIndex = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImgIndex +1;
           (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getEmployeeImages();
           }
};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.getImageError = function(error){
      (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).setComments();
};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.setComments = function() {
    var data = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.EmployeeData;
    var commentData = [];
    var monthsJSON = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    };
    for (var i = 0; i < data.length; i++) {
        var tempCommentData = {};
        var commentDate = "";
        if (!isNaN(data[i].createdts) && data[i].createdts !== null && data[i].createdts !== "") {
            var commentTime = "";
            if (data[i].createdts.substring(8, 10) >= "12") {
                commentTime = (parseInt(data[i].createdts.substring(8, 10)) - 12) + ":" + data[i].createdts.substring(10, 12) + " PM";
            } else {
                commentTime = data[i].createdts.substring(8, 10) + ":" + data[i].createdts.substring(10, 12) + " AM";
            }
            commentDate = data[i].createdts.substring(6, 8) + " " + (monthsJSON[data[i].createdts.substring(4, 6) + ""]).substring(0, 3) + "," + commentTime;
        } else {
            commentDate = " ";
        }
        if (data[i].employee_id === kony.apps.coe.ess.globalVariables.employeeId) {
            tempCommentData.template = flxChat;
            tempCommentData.lblNotes = " ";
            tempCommentData.lblApplier = "Me";
            tempCommentData.txtApplierComents = {
                "text": data[i].comments,
            };
            tempCommentData.lblAppliedDate = "Submitted on " + commentDate;
            if (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData !== undefined && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== null && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== undefined) {
                tempCommentData.imgUser = {
                    "base64": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i]
                };

            } else {
                tempCommentData.imgUser = "adduserpic.png";
            }
            commentData.push(tempCommentData);
        } else {
            tempCommentData.template = flxApproverNote;
            if (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData !== undefined && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== null && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== undefined) {
                tempCommentData.imgApprover = {
                    "base64": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i]
                };
            } else {
                tempCommentData.imgApprover = "adduserpic.png";
            }
            tempCommentData.lblNotes = " ";
            tempCommentData.lblApplier = data[i].First_Name;
            tempCommentData.txtApplierComents = {
                "text": data[i].comments,
            };
            tempCommentData.lblAppliedDate = "Submitted on " + commentDate;
            commentData.push(tempCommentData);
        }
    }
    frmTabLeaveDashboard.segChat.setData(commentData);
    if (commentData.length < 0) {
        frmTabLeaveDashboard.segChat.isVisible = false;
    }
    frmTabLeaveDashboard.segChat.isVisible = true;
    frmTabLeaveDashboard.forceLayout();
    kony.application.dismissLoadingScreen();
};

/**
 * @class       MyLeaveDashboard
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to delete a leave.
 */

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.deleteLeave = function()
{
  try  {
        kony.print("-- Start deleteLeave --");
    	var tempJSON = {"id": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID, "status_id" : "3", "employee_id" : kony.apps.coe.ess.globalVariables.employeeId};
        kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", tempJSON,  
        kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.deleteLeaveSuccess, function(err) {
        kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.getLeaveDashboardData();
        kony.print("------------------------------------------Error in kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.deleteLeave update " + err);
	  }); 

      kony.print("-- End deleteLeave --");
  	} catch (e) {
        kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.getLeaveDashboardData();
      	handleError(e);
    }
};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.deleteLeaveSuccess = function(response){
    var data = {};
		data.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
		data.leave_id = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID;
         var date = new Date();
    	    var timestamp = date.getFullYear().toString().trim(0,4)+""+getTimeHourswithZero(date.getMonth()+1)+""+getTimeHourswithZero(date.getDate())+""+getTimeHourswithZero(date.getHours())+""+getTimeHourswithZero(date.getMinutes())+""+getTimeHourswithZero(date.getSeconds());
        	data.createdts = timestamp;
	       alert("Leave deleted successfully");
			kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, function(res){(new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getLeaveDashboardData();}, function(err){handleError(err);} );
        
};