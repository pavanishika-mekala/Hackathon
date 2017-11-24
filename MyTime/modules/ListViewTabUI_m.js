kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.ListViewTimesheet = kony.apps.coe.ess.myTime.ListViewTimesheet||{};
kony.apps.coe.ess.myTime.ListViewTimesheet.startTime = "";
kony.apps.coe.ess.myTime.ListViewTimesheet.endTime = "";
kony.apps.coe.ess.myTime.ListViewTimesheet.timeSheetId = "";
kony.apps.coe.ess.myTime.ListViewTimesheet.storeData = [];


kony.apps.coe.ess.myTime.ListViewTabUI = function() {
  kony.print("-- Start ListViewTabUI --");
  kony.print("-- End ListViewTabUI --");
};

kony.apps.coe.ess.myTime.ListViewTabUI.getInstance = function() {
  if(kony.apps.coe.ess.myTime.ListViewTabUI.singletonObj !== null && kony.apps.coe.ess.myTime.ListViewTabUI.singletonObj !== undefined) {
    return kony.apps.coe.ess.myTime.ListViewTabUI.singletonObj;
  }
  kony.apps.coe.ess.myTime.ListViewTabUI.singletonObj = new kony.apps.coe.ess.myTime.ListViewTabUI();
  return kony.apps.coe.ess.myTime.ListViewTabUI.singletonObj;
};

var timeSheetEntriesData = null;
var finalResponse = {};
var processedData = {};

/**
 * @function - listViewPreshow
 * @params	-none
 * @returns	-none.
 * @desc	-This function is used to populate the data before logging to the form
 */

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.listViewPreshow = function() {
  try {
    kony.print("-- Start listViewPreshow --");
    kony.apps.coe.ess.myTime.ListViewTabUI.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currDate = new Date();
    frmListView.lblMonth.text = kony.apps.coe.ess.myTime.ListViewTabUI.monthsArray[currDate.getMonth()];
    frmListView.lblYear.text = currDate.getFullYear().toString().trim(0, 4);
    kony.print("-- End listViewPreshow --");
  } 
  catch (err) {
    handleError(err);
  }
};


/**
 * @function - onClickOfSentBack
 * @params	-none
 * @returns	-none.
 * @desc	-This function is called on clicking on sentBack button in frmListView.
 */


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onClickOfSentBack = function() {
  try{
    frmListView.flxDeleteIcon.setVisibility(true);
    frmListView.lblApprovedDate.setVisibility(false);
    frmListView.lblApproved.setVisibility(false);
    frmListView.flxComments.setVisibility(false);
    frmListView.imgTimeSheet.src = "timesheet4.png";
    if (frmListView.btnRejected.skin == "sknBtnBgf4f4f4Fc526270Fs32px") {
      frmListView.btnRejected.skin = "sknBtnBg4a90e2FcffffffFs32px";
      frmListView.btnSaved.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
      frmListView.btnPastDues.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
    }
    //var query = "select sum(te.Actual_Hours) as totalHours,t.[Start_Date],t.[End_Date],t.[Id] from timesheet t left join time_entry te on te.[Timesheet_Id] = t.Id group by t.Id";
    var query = "select sum(te.Actual_Hours) as totalHours,te.[StatusId],t.[Start_Date],t.[End_Date],t.[Id] from timesheet t left join time_entry te on te.[Timesheet_Id] = t.Id where te.[StatusId] = '1' group by t.Id";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, errorCallback);
  }catch(err){
    handleError(err);
  } 

  function successCallback(response){
    if(response !== null && response !== undefined && response !== "" && response === []){
      var tempDataJson=[];
      for(var i in response){
        var startDate=response[i].Start_Date;
        startDate = new Date(parseInt(startDate.substring(0, 4), 10), parseInt(startDate.substring(4, 6), 10) - 1, parseInt(startDate.substring(6, 8), 10));
        var endDate=response[i].End_Date;
        endDate = new Date(parseInt(endDate.substring(0, 4), 10), parseInt(endDate.substring(4, 6), 10) - 1, parseInt(endDate.substring(6, 8), 10));      
        var totalDate=startDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[startDate.getMonth()] + "-" + endDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[endDate.getMonth()];
        var totalHours=response[i].totalHours + " " + kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
        var timesheetID=response[i].Id;
        tempDataJson.push({"totalDate":totalDate, "totalHours":totalHours, "timesheetID":timesheetID});
      }
      frmListView.segSentBackDates.widgetDataMap={
        "lblSentBackWeekDate":"totalDate",
        "lblTotalHours":"totalHours"
      };
      frmListView.segSentBackDates.selectedRowIndex = [0, 0];
      var selectIndex = frmListView.segSentBackDates.selectedRowIndex;
      frmListView.segSentBackDates.setData(tempDataJson);
      frmListView.segSentBackDates.selectedRowIndex = selectIndex;
      frmListView.flxSentBackDates.isVisible = true;
      frmListView.flxComments.isVisible=false;
      frmListView.btnSubmitTimeSheet.text="Review Timesheet";
      frmListView.flxViewDates.isVisible = false;
      var selectedItemtimesheetId=frmListView.segSentBackDates.selectedItems[0].timesheetID;
      if(selectIndex !== null && parseInt(0, 10) === parseInt(selectIndex[1], 10)) {
        (new kony.apps.coe.ess.myTime.ListViewTabDetails()).selectedRowDetailsData(selectedItemtimesheetId, false);
      }
    }
    else{
      frmListView.flxViewDates.setVisibility(false);
      frmListView.lblNoSentItems.setVisibility(true);
      frmListView.lblTimeSheetDate.text="";
      frmListView.lblTHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblBHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblOHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblApproved.text="";
      frmListView.lblNoResult.setVisibility(true);
      frmListView.segmentData.setVisibility(false);
      frmListView.flxComments.setVisibility(false);
    }
  }
  function errorCallback(err){
    handleError(err);
  }
};


/**
 * @function - onRowClickOfSentBackSegment
 * @params	-none
 * @returns	-none.
 * @desc	-This function is called onRowClick of SentBack tab in frmListView.
 */


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onRowClickOfSentBackSegment = function() {
  var selectedItemtimesheetId=frmListView.segSentBackDates.selectedItems[0].timesheetID;
  if(selectedItemtimesheetId !== null && selectedItemtimesheetId !== undefined && selectedItemtimesheetId !== ""){
    (new kony.apps.coe.ess.myTime.ListViewTabDetails()).selectedRowDetailsData(selectedItemtimesheetId, false);
  }
};

/**
 * @function - onClickOfSaved
 * @params	-none
 * @returns	-none.
 * @desc	-This function is called onClick of Saved tab in frmListView.
 */


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onClickOfSaved = function() {
  try{
    frmListView.lblApprovedDate.setVisibility(true);
    frmListView.lblApproved.setVisibility(true);
    if (frmListView.btnRejected.skin == "sknWBtnBlueborder") {
      frmListView.btnRejected.skin = "sknWbtnBl";
      frmListView.btnSaved.skin = "sknWBtnBlueborder";
      frmListView.flxSentBackDates.isVisible = false;
      frmListView.flxViewDates.isVisible = true;
    }
    //#ifndef windows8
    if (frmListView.btnSaved.skin == "sknBtnBgf4f4f4Fc526270Fs32px") {
      frmListView.btnSaved.skin = "sknBtnBg4a90e2FcffffffFs32px";
      frmListView.btnRejected.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
      frmListView.btnPastDues.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
      frmListView.flxSentBackDates.isVisible = false;
      frmListView.flxViewDates.isVisible = true;
    }
    //#endif 
    frmListView.lblNoSentItems.isVisible = false;
  }catch(err){
    handleError(err);
  }


};

/**
 * @function - updateTimeSheetWithDuration
 * @params	-segment reference
 * @returns	-none.
 * @desc	-This function updates the segment data
 */

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.updateTimeSheetWithDuration = function(TimesheetListSegmentRef) {
  try {
    for(var i in TimesheetListSegmentRef.data) {
      kony.apps.coe.ess.myTime.getTimesheetDataForADate(new Date(TimesheetListSegmentRef.data[i].startDate), successCallbackOfTimesheetData.bind(this, TimesheetListSegmentRef, i), errorCallback);
    }
  } catch(err) {
    handleError(err);
  }
  function successCallbackOfTimesheetData(TimesheetListSegmentRef, index, timesheetData) {
    if(timesheetData !== null && timesheetData !== undefined && timesheetData !== ""){
      //var query = "select te.[Actual_Hours],te.[Date],s.[Status_Name] from Time_Entry te left join Status s on te.[StatusId] = s.[Id] where te.[Timesheet_Id] = '"+timesheetData.Id+"' AND s.[Id] != '3'";
      var query = "select actual_hours,Date from Time_Entry where Time_Entry.[Timesheet_Id] = '"+timesheetData.Id+"' AND StatusId != '3'";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, retrieveTimeEntryData.bind(this, TimesheetListSegmentRef, timesheetData.Id, index,timesheetData.Status_Id), errorCallback);
    }
    else{
      retrieveTimeEntryData(TimesheetListSegmentRef, null,index, []);
    }
  }

  function retrieveTimeEntryData(TimesheetListSegmentRef, timesheetId, index,timesheetStatusID,timeEntryData) {
    var startDate = new Date(TimesheetListSegmentRef.data[index].startDate);
    var endDate = new Date(TimesheetListSegmentRef.data[index].endDate);
    var weekDates=0;
    var dayWiseDuration = "";
    var totalDuration=0;
    var tempDataJson = TimesheetListSegmentRef.data[index];
    var rbTreeObj = new kony.apps.coe.RedBlackTree();
    for(var i in timeEntryData) {
      rbTreeObj.insert(timeEntryData[i].Date, timeEntryData[i]);
    }
    for(var date = startDate; date <= endDate; date = date.nextDay()) {
      var timeEntriesForADate = rbTreeObj.get(date.toYYYYMMDD(""));
      var  total= 0;
      if(timeEntriesForADate !== null && timeEntriesForADate !== undefined && timeEntriesForADate !== "" ) {
        for(var i in timeEntriesForADate) {
          var singleTimeEntryDuration =  parseFloat(timeEntriesForADate[i].Actual_Hours, 10);
          totalDuration += singleTimeEntryDuration;
          total += singleTimeEntryDuration;
        }
      }
      dayWiseDuration += date.getDate().toString()+ " " + kony.apps.coe.ess.myTime.nToStr.month[date.getMonth()] + "(" + total + kony.i18n.getLocalizedString("i18n.ess.frmListViewH")+")" + ",";
    }
    dayWiseDuration = dayWiseDuration.substring(0, dayWiseDuration.length - 1);
    var status=kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().getStatusUsingID(timesheetStatusID);
    tempDataJson.status = status;
    tempDataJson.dayWiseDuration = dayWiseDuration;
    tempDataJson.totalDuration = totalDuration + " " + kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
    tempDataJson.timesheetId = timesheetId;
    tempDataJson.imgViewDate = "openarrow.png";
    var selectedItemStatus = frmListView.segViewDates.selectedItems[0].status;
    if(selectedItemStatus === "Saved" || selectedItemStatus === "Rejected" || selectedItemStatus === "rejected" ||selectedItemStatus === "saved"){
      frmListView.flxDeleteIcon.setVisibility(true);
    }else{
      frmListView.flxDeleteIcon.setVisibility(false);
    }
    var selectIndex = frmListView.segViewDates.selectedRowIndex;
    TimesheetListSegmentRef.setDataAt(tempDataJson, parseInt(index, 10), 0);
    frmListView.segViewDates.selectedRowIndex = selectIndex;
    if(selectIndex !== null && parseInt(index, 10) === parseInt(selectIndex[1], 10)) {
      (new kony.apps.coe.ess.myTime.ListViewTabDetails()).selectedRowDetailsData(tempDataJson.timesheetId, false);
    }
  }
  function errorCallback(err) {
    handleError(err);
  }
};

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.getStatusUsingID = function(timesheetStatusID) {
  var status=""
  switch(timesheetStatusID){
    case "0":
      status = "approved";
      break;

    case "1":
      status = "rejected";
      break;

    case "2":
      status = "pending";
      break;

    case "3":
      status = "cancelled";
      break;

    case "4":
      status = "sentback";
      break;

    case "5":
      status = "saved";
      break;  

    case "6":
      status = "error";
      break;  

    case "7":
      status = "submitted";
      break;  
  }
  return status;
};

/**
 * @function - onRowClickofSegListView
 * @params	-none.
 * @returns	-none.
 * @desc	-This function will be called by clicking on a particular row in the segment to view details.
 */

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onRowClickofSegListView = function(operation_to_perform) {
  try{
    var selectedItemStatus = frmListView.segViewDates.selectedItems[0].status;
    kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().totalSkinRefresh(selectedItemStatus);
    if(selectedItemStatus.toLowerCase() === "pending" || selectedItemStatus.toLowerCase() === "submitted" || selectedItemStatus.toLowerCase() === "approved"){
      frmListView.flxDeleteIcon.setVisibility(false);
    }else{
      frmListView.flxDeleteIcon.setVisibility(true);
    }
    var segSelectItemID = "";
    if(operation_to_perform == "Delete"){
      segSelectItemID = null;
    }
    else{
      segSelectItemID = frmListView.segViewDates.selectedItems[0].timesheetId;
    }
    kony.apps.coe.ess.myTime.ListViewTimesheet.timeSheetId = segSelectItemID;
    if(segSelectItemID !== null && segSelectItemID !== undefined && segSelectItemID !== ""){
      (new kony.apps.coe.ess.myTime.ListViewTabDetails()).selectedRowDetailsData(segSelectItemID, false);
    }else{
      frmListView.lblTimeSheetDate.text=frmListView.segViewDates.selectedItems[0].displayValue;
      frmListView.lblTHours.text=frmListView.segViewDates.selectedItems[0].totalDuration;
      frmListView.lblBHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblOHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblApproved.text="";
      frmListView.lblNoResult.setVisibility(true);
      frmListView.segmentData.setVisibility(false);
      frmListView.flxComments.setVisibility(false);
    } 
  }catch(err){
    handleError(err);
  }   
};

/**
 * @function - isData
 * @params	-data: String.
 * @returns	-boolean.
 * @desc	-This function validates whether given string contains proper data or not
*/

kony.apps.coe.ess.myTime.ListViewTabUI.isData = function (data) {
  try{
    kony.print("-- Start isData --");
    if (data !== null || data !== undefined || data !== "") {
      kony.print("-- End isData --");
      return true;
    } else {
      kony.print("-- End isData --");
      return false;
    }
  }catch(err){
    handleError(err);
  } 
};

/**
 * @function - mappingWeeklyData
 * @params	-data: JSON.
 * @returns	-data: JSON.
 * @desc	-This function used for mapping the timesheet details to the labels in the UI for a particular week
*/

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.mappingWeeklyData = function (data) {
  try{
    kony.print("-- Start getProcessedData --");
    kony.apps.coe.ess.myTime.ListViewTabUI.storeData = data;
    var finalData = [];
    if(data === null || data.length <= 0){
      return finalData;
    }

    if (kony.apps.coe.ess.myTime.ListViewTabUI.isData(data[0].Start_Date) && kony.apps.coe.ess.myTime.ListViewTabUI.isData(data[0].End_Date)) {
      var dateString = data[0].Start_Date.toString();
      var startDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
      kony.apps.coe.ess.myTime.ListViewTimesheet.startTime = startDate;
      var startDateFormat = startDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[startDate.getMonth()];
      dateString = data[0].End_Date.toString();
      var endDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
      kony.apps.coe.ess.myTime.ListViewTimesheet.endTime  = endDate;
      var endDateFormat = endDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[endDate.getMonth()];
      frmListView.lblTimeSheetDate.text=startDateFormat + " - " + endDateFormat;
    }
    kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabUI.billableHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabUI.totalHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabUI.empId = data[0].Employee_Id;
    for(i=0;i<data.length;i++)
    {
      if(data[i].Project_Task_id==="" || data[i].Project_Task_id === null || data[i].Project_Task_id=== undefined)
      {
        data[i].Project_Task_id="";
      }
    }

    var groupedData = kony.apps.coe.makeGroups("Project_Task_id", data);
    var finalGroupedData=[];
    for(var i=0;i<groupedData.length;i++){
      finalGroupedData.push(kony.apps.coe.makeGroups("Time_Type_Id",groupedData[i]));
    }
    var totalHours=0;
    var overtimeHours=0;
    var billableHours=0;
    var sumOfHours = 0;
    for(var i = 0; i<finalGroupedData.length; i++){
      for(var j = 0; j<finalGroupedData[i].length; j++){
        sumOfHours = 0;
        for(x = 0; x<finalGroupedData[i][j].length; x++){
          sumOfHours = sumOfHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours,10);
          if(parseInt(finalGroupedData[i][j][x].ISOVERTIME,10) == 1){
            overtimeHours = overtimeHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours,10);
          }
          if(parseInt(finalGroupedData[i][j][x].isBillable,10) == 1){
            billableHours = billableHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours,10);
          }
        }
        totalHours = totalHours + sumOfHours;
        var timeentry = {};
        if(finalGroupedData[i][j][0].Project_Task_id ==="")
        {
          var hours=0;
          for(k=0;k<finalGroupedData[i][j].length;k++)
          {
            hours+=parseFloat(finalGroupedData[i][j][0].Actual_Hours,10);
          }
          timeentry.lblTaskName=finalGroupedData[i][j][0].time_type_name;
          timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
          timeentry.lblProductiveHoursValue=parseFloat(hours).toFixed(2) +" h";
          timeentry.lblLine=" ";
          timeentry.template=flxOuterOne;
        }
        else

        {
          timeentry.lblProjectName = finalGroupedData[i][j][0].projectname !==null ? finalGroupedData[i][j][0].projectname.toString() : "";
          timeentry.lblTaskName = finalGroupedData[i][j][0].Task_Name !== null ? finalGroupedData[i][j][0].Task_Name.toString(): finalGroupedData[i][j][0].Project_Task_id;
          timeentry.lblDescription = finalGroupedData[i][j][0].Activity_Description.toString();
          if ((finalGroupedData[i][j][0].Type !== null && finalGroupedData[i][j][0].Type !== "" && finalGroupedData[i][j][0].Type !== undefined)) {
            var index = (finalGroupedData[i][j][0].Type).indexOf("|");
            var type1 = index !== -1 ? (finalGroupedData[i][j][0].Type).substring(0, index) : (finalGroupedData[i][j][0].Type);
            var type2 = index !== -1 ? ((finalGroupedData[i][j][0].Type).substring(index + 1, (finalGroupedData[i][j][0].Type).length)) : "";
            var type1Value = ((finalGroupedData[i][j][0].proid) !== null && (finalGroupedData[i][j][0].proid) !== undefined) ? (finalGroupedData[i][j][0].proid).replace(type1, "") : "";
            var type2Value = ((finalGroupedData[i][j][0].taskId) !== null && (finalGroupedData[i][j][0].taskId) !== undefined) ? (finalGroupedData[i][j][0].taskId).replace(type2, "") : "";
            timeentry.lblCostCenter = ((type1!=="")||(type1Value!==""))?(type1 + " - " + type1Value):"";
            timeentry.lblActivityId = ((type2!=="")||(type2Value!==""))?(type2 + " - " + type2Value):"";
            timeentry.lblLine=" ";
          }

          timeentry.lblProductiveHoursValue = sumOfHours.toString() + ' h';
          timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
          timeentry.template = flxOuterOne;
        }
        finalData.push(timeentry);
      }
    }
    kony.apps.coe.ess.myTime.ListViewTabUI.totalHours = totalHours;
    kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours = overtimeHours;
    kony.apps.coe.ess.myTime.ListViewTabUI.billableHours = billableHours;
    kony.apps.coe.ess.myTime.ListViewTabUI.status = data[0].Status_Name;

    return (finalData);

  }catch(err){
    handleError(err);
  }
};


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.getCurrentTimesheetDataTab = function(dateObj) {
  var startdate;
  var sd;
  var ed;
  var data;
  var hourDates=[];
  data = [];
  startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
  dd = new Date(Date.parse(startdate) + 604800000 + 86400000 + 86400000 + 86400000);
  sd = new Date(Date.parse(startdate) + 604800000);
  ed = new Date(Date.parse(sd) + 518400000);
  if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "weekly") {
    startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
    data = [];
    for (var i = 0; i <= 1; i++) {
      var weekDates="";
      sd = new Date(Date.parse(startdate) + i * 604800000);
      ed = new Date(Date.parse(sd) + 518400000);
      var sdMon=kony.apps.coe.ess.myTime.nToStr.month[sd.getMonth()];  
      var edMon=kony.apps.coe.ess.myTime.nToStr.month[ed.getMonth()];
      var sdDate=sd.getDate();
      var edDate=ed.getDate();
      data.push({
        displayValue: sd.getDate()+" "+sdMon + " - " + ed.getDate()+" "+edMon,
        startDate: sd.toString(),
        endDate: ed.toString(),
        timesheetId: null
      });
    }
    return data;
  } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "biweekly") {
    startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
    data = [];
    for (var i = 0; i < 2; i++) {
      sd = new Date(Date.parse(startdate) + i * 604800000);
      ed = new Date(Date.parse(sd) + 518400000);
      data.push({
        displayValue: sd.getDate() + " " + sd.toString().slice(4, 7) + "-" + ed.getDate() + " " + ed.toString().slice(4, 7),
        startDate: sd.toString(),
        endDate: ed.toString(),
        timesheetId: null
      });
    }

    return data;
  } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "monthly") {
    var sdedm = kony.apps.coe.ess.myTime.TimesheetDatesInterval.monthly(dateObj);
    startdate = sdedm[0].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
    var enddate = sdedm[1].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[1];
    var nweeks = (Date.parse(enddate) - Date.parse(startdate)) / 604800000;
    data = [];
    for (var i = 0; i < nweeks; i++) {
      sd = new Date(Date.parse(startdate) + i * 604800000);
      ed = new Date(Date.parse(sd) + 518400000);
      data.push({
        displayValue: "week " + (i + 1),
        startDate: sd,
        endDate: ed,
        timesheetId: null
      });
    }

    return data;
  }
  return data;
};
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.handleSearchOperation = function() {
  kony.print("-- Start handleSearchOperation --");
  //  var fromDateCldrWidget = frmSearchMyTime.cldrFromSearch;
  //  var toDateCldrWidget = frmSearchMyTime.cldrToSearch;
  var billableValue = 0;
  var searchQuery = "";
  //var selectedFromDate = new Date(fromDateCldrWidget.year, fromDateCldrWidget.month - 1, fromDateCldrWidget.day).toYYYYMMDD("");
  //  var selectedToDate = new Date(toDateCldrWidget.year, toDateCldrWidget.month - 1, toDateCldrWidget.day).toYYYYMMDD("");
  //var selectedStatusValues = kony.apps.coe.ess.myTime.Search.statusIdString;
  var selectedStatusValues = 5;
  var selectedFromDate = 20160601;
  var selectedToDate = 20170225;
  // june1 = new Date(rightNow.getFullYear(), selectedFromDate.slice(4,6), selectedFromDate.slice(6,8), 0, 0, 0, 0);
  //   june1 = new Date(selectedFromDate.slice(4,6), selectedFromDate.slice(4,6), selectedFromDate.slice(6,8), 0, 0, 0, 0);

  /*  if (frmSearchMyTime.lbShow.selectedKey === "lb1") {
          billableValue = 0;
      } else {
          billableValue = 1;
      }*/
  //   if (frmSearchMyTime.lbView.selectedKey === "lb1") {
  //Todo status is getting as not configured .Need to figure out it .
  if (selectedStatusValues === "") {
    searchQuery = "select ts.Id as timesheetID, ts.Start_Date as StartDate, ts.End_Date as EndDate, sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable, ts.Status_Id as Status,s.Status_Name as StatusName from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id left join Status s on s.Id = ts.Status_Id WHERE ((ts.Start_Date <= '" + selectedFromDate + "' and ts.End_Date >= '" + selectedFromDate + "') or (ts.Start_Date <= '" + selectedToDate + "' and ts.End_Date >= '" + selectedToDate + "') or (ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "')) and te.StatusId != '3' group by ts.Id having p.isBillable = '" + billableValue + "' ;";
  } else {
    searchQuery = "select ts.Id as timesheetID, ts.Start_Date as StartDate, ts.End_Date as EndDate, sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable, ts.Status_Id as Status,s.Status_Name as StatusName from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id left join Status s on s.Id = ts.Status_Id WHERE ((ts.Start_Date <= '" + selectedFromDate + "' and ts.End_Date >= '" + selectedFromDate + "') or (ts.Start_Date <= '" + selectedToDate + "' and ts.End_Date >= '" + selectedToDate + "') or (ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "')) and te.StatusId != '3' group by ts.Id having p.isBillable =  '" + billableValue + "' and ts.Status_Id  IN ( " + selectedStatusValues + ");";
  }
  /*
        } else {
            searchQuery = "select sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable,p.Project_Name as ProjectName  from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id group by p.Project_Name having p.isBillable =  '" + billableValue + "'  and ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "';";
        }*/
  kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", searchQuery, searchSuccessCallBack, searchFailureCallBack);
  /**
     * Suucess CallBack for search Operation
     */
  function searchSuccessCallBack(response) {
    kony.print("-- Start searchSuccessCallBack --");
    data = [];
    var sd;
    var ed;
    frmListView.lblTimeSheetDate.text = "";
    try {
      var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id='" + kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId + "' AND te.StatusId != '3';";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success1, error1);
    } catch (err) {
      kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");

    }

    function success1(response) {
      //  this.firstResponse = response;
      // var model = scopeObj.getController().getApplicationContext().getModel("Timesheet_Note", "MYTIME", {"access": "offline"});
      var query = "select tn.Added_On,tn.comments,tn.Employee_id,e.First_Name as name from Timesheet_note tn left join employee e on tn.employee_id=e.id where timesheet_id='" + kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId + "'";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, querySuccess.bind(this, response), queryFailure);
      kony.sdk.mvvm.log.info("success fetching data ", response);
    }

    function error1(err) {
      kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
    }

    function querySuccess(response1, response2) {
      finalResponse.timeSheetEntries = response1;
      //  finalResponse.timeSheetComments = response2;
      timeSheetEntriesData = finalResponse.timeSheetEntries;
      for (var i = 0; i < response.length; i++) {
        sd = new Date((response[i].StartDate).toString().slice(0, 4), ((response[i].StartDate).toString().slice(4, 6) - 1), (response[i].StartDate).toString().slice(6, 8), 0, 0, 0, 0);
        ed = new Date((response[i].EndDate).toString().slice(0, 4), ((response[i].EndDate).toString().slice(4, 6) - 1), (response[i].EndDate).toString().slice(6, 8), 0, 0, 0, 0);
        data.push({
          lblWeek: sd.getDate() + " " + sd.toString().slice(4, 7) + "-" + ed.getDate() + " " + ed.toString().slice(4, 7),
          lblViewdates: "View Dates",
          imgViewDate: "closearrow.png",
          lblHours: response[i].ActualHours + " H",
          lblDay1: getDateOfDay(1),
          lblDay2: getDateOfDay(2),
          lblDay3: getDateOfDay(3),
          lblDay4: getDateOfDay(4),
          lblDay5: getDateOfDay(5),

        });
      }
      //          lblDates:getDateOfDay(1)+"("+parseFloat(temp[0].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(2)+"("+parseFloat(temp[1].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(3)+"("+parseFloat(temp[2].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(4)+"("+parseFloat(temp[3].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(5)+"("+parseFloat(temp[4].Actual_Hours).toFixed(2)+" H),"

      frmListView.segViewDates.setData(data);
    }

    function queryFailure(err) {
      kony.print("Error in query Failure " + err);
    }

    function getDateOfDay(j) {
      dd = new Date(Date.parse(sd) + j * 86400000);
      return dd.getDate().toString().slice(0, 3) + " " + dd.toString().slice(4, 7);
    }
    /*    var data = response;
                    var widgetMap = null;
                    var rowTemplate = null;
                    if (data !== null && data !== undefined && data.length !== 0) {
                        frmSearchMyTime.segSearchResults.setVisibility(true);
                        frmSearchMyTime.noResultsLbl.setVisibility(false);
                        if (frmSearchMyTime.lbView.selectedKey === "lb1") {
                            for (var count = 0; count < data.length; count++) {
                                data[count].template = flxSegSearchTimesheets;
                                data[count].Definition = kony.apps.coe.ess.globalVariables.timesheetLengthConfig;
                                data[count].Duration = kony.apps.coe.ess.myTime.Search.toDDMON(data[count].StartDate.toString()) + "-" + kony.apps.coe.ess.myTime.Search.toDDMON(data[count].EndDate.toString());
                                data[count].StatusImg = kony.apps.coe.ess.myTime.Search.StatusImageInfo[data[count].Status];
                            }
                            //Todo Need to implement img for status 
                            widgetMap = {
                                "lblTime": "Duration",
                                "lblStat" :"Definition",
                                "lblDuration": "ActualHours",
                                "imgStat": "StatusImg"
                            };
                            rowTemplate = flxSegSearchTimesheets;
                        } else {
                            for (var projectCount = 0; projectCount < data.length; projectCount++) {
                                data[projectCount].template = flxSegSearchProjectsBig;
                                if (data[projectCount].Billable === "1") {
                                    data[projectCount].Billable = "Billable";
                                } else {
                                    data[projectCount].Billable = "Not Billable";
                                }
                            }
                            widgetMap = {
                                "lblProjectName": "ProjectName",
                                "lblTimeType": "Billable",
                                "lblDuration": "ActualHours"
                            };
                            rowTemplate = flxSegSearchProjects;
                        }
                        frmSearchMyTime.segSearchResults.rowTemplate = rowTemplate;
                        frmSearchMyTime.segSearchResults.widgetDataMap = widgetMap;
                        frmSearchMyTime.segSearchResults.setVisibility(true);
                        frmSearchMyTime.segSearchResults.setData(data);
                    } else {
                        frmSearchMyTime.segSearchResults.removeAll();
                        frmSearchMyTime.segSearchResults.setVisibility(false);
                        frmSearchMyTime.noResultsLbl.setVisibility(true);
                    }
                    frmSearchMyTime.segSearchResults.onRowClick = kony.apps.coe.ess.myTime.Search.viewTimesheetDetails;*/
    kony.print("-- End searchSuccessCallBack --");
  }
  /**
         * Failure CallBack for Search Operation
         */
  function searchFailureCallBack(response) {
    kony.print("-- Start searchSuccessCallBack --");
    handleError(response);
    kony.print("-- End searchSuccessCallBack --");
  }

  kony.print("-- End handleSearchOperation --");
};

kony.apps.coe.ess.myTime.ListViewTabUI.getProcessedData = function(data) {
  kony.print("-- Start getProcessedData --");
  var finalData = [];
  if (data === null || data.length <= 0) {
    return finalData;
  }
  /* if (kony.apps.coe.ess.myTime.CalendarViewUI.isData(data[0].Start_Date) && kony.apps.coe.ess.myTime.CalendarViewUI.isData(data[0].End_Date)) {
        var dateString = data[0].Start_Date.toString();
        var startDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
        kony.apps.coe.ess.myTime.CalendarViewUI.startTime = startDate;
        var startDateFormat = startDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[startDate.getMonth()];
        dateString = data[0].End_Date.toString();
        var endDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
        kony.apps.coe.ess.myTime.CalendarViewUI.endTime = endDate;
        var endDateFormat = endDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[endDate.getMonth()];
      // frmCalendarView.lblWeekDate.text = startDateFormat + " - " + endDateFormat;
        //  frmCalendarView.errordarkbackground.isVisible = false;
        switch(data[0].sheetStatus){
            case '5':
                frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg1C7393cFFFFFF";
                break;
            case '7':
                frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg2EBAEEcFFFFFF";
                break;
            case '2':
                frmCalendarView.lblWeekDate.skin = "sknLblMobOp100BgFAB745cFFFFFF";
                break;
            case '0':
                frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg00C6AEcFFFFFF";
                break;
            case '4':
                frmCalendarView.lblWeekDate.skin = "sknLblMobOp100BgFA713AcFFFFFF";
                break;
            case '1':
                frmCalendarView.lblWeekDate .skin = "sknLblMobOp100BgFF3B30cFFFFFF";
                break;
            case '6':
                frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg2EBAEEcFFFFFF";
            //  frmCalendarView.errordarkbackground.isVisible = true;
                break;

            default:
                handleError("Error in Status skin");
                break;
        }
    }*/
  //frmCalendarView.lblSubmittedDate.text = data[0].Created_On;
  kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours = 0;
  kony.apps.coe.ess.myTime.ListViewTabUI.billableHours = 0;
  kony.apps.coe.ess.myTime.ListViewTabUI.totalHours = 0;
  kony.apps.coe.ess.myTime.ListViewTabUI.empId = data[0].Employee_Id;
  for (i = 0; i < data.length; i++) {
    if (data[i].Project_Task_id === "" || data[i].Project_Task_id === null || data[i].Project_Task_id === undefined) {
      data[i].Project_Task_id = "";
    }
  }
  var groupedData = kony.apps.coe.makeGroups("Project_Task_id", data);
  var finalGroupedData = [];
  for (var i = 0; i < groupedData.length; i++) {
    finalGroupedData.push(kony.apps.coe.makeGroups("Time_Type_Id", groupedData[i]));
  }
  var totalHours = 0;
  var overtimeHours = 0;
  var billableHours = 0;
  var sumOfHours = 0;
  for (var i = 0; i < finalGroupedData.length; i++) {
    for (var j = 0; j < finalGroupedData[i].length; j++) {
      sumOfHours = 0;
      for (x = 0; x < finalGroupedData[i][j].length; x++) {
        sumOfHours = sumOfHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours,10);
        if (parseInt(finalGroupedData[i][j][x].ISOVERTIME) == 1) {
          overtimeHours = overtimeHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours,10);
        }
        if (parseInt(finalGroupedData[i][j][x].isBillable) == 1) {
          billableHours = billableHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours,10);
        }
      }
      totalHours = totalHours + sumOfHours;
      var timeentry = {};
      if (finalGroupedData[i][j][0].Project_Task_id == "") {
        var hours = 0;
        for (k = 0; k < finalGroupedData[i][j].length; k++) {
          hours += parseFloat(finalGroupedData[i][j][0].Actual_Hours);
        }
        timeentry.lblTaskName = finalGroupedData[i][j][0].time_type_name;
        timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
        timeentry.lblProductiveHoursValue = parseFloat(hours).toFixed(2) + " h";
        timeentry.lblLine = " ";
        timeentry.template = flxOuterList;
      } else

      {
        timeentry.lblProjectName = finalGroupedData[i][j][0].projectname !== null ? finalGroupedData[i][j][0].projectname.toString() : "";
        timeentry.lblTaskName = finalGroupedData[i][j][0].Task_Name !== null ? finalGroupedData[i][j][0].Task_Name.toString() : finalGroupedData[i][j][0].Project_Task_id;
        timeentry.lblDescription = finalGroupedData[i][j][0].Activity_Description.toString();
        if ((finalGroupedData[i][j][0].Type !== null && finalGroupedData[i][j][0].Type !== "" && finalGroupedData[i][j][0].Type !== undefined)) {
          var index = (finalGroupedData[i][j][0].Type).indexOf("|");
          var type1 = index !== -1 ? (finalGroupedData[i][j][0].Type).substring(0, index) : (finalGroupedData[i][j][0].Type);
          var type2 = index !== -1 ? ((finalGroupedData[i][j][0].Type).substring(index + 1, (finalGroupedData[i][j][0].Type).length)) : "";
          var type1Value = ((finalGroupedData[i][j][0].proid) !== null && (finalGroupedData[i][j][0].proid) !== undefined) ? (finalGroupedData[i][j][0].proid).replace(type1, "") : "-";
          var type2Value = ((finalGroupedData[i][j][0].taskId) !== null && (finalGroupedData[i][j][0].taskId) !== undefined) ? (finalGroupedData[i][j][0].taskId).replace(type2, "") : "";
          timeentry.lblCostCenter = type1 + " - " + type1Value;
          timeentry.lblActivityId = type2 + " - " + type2Value;
          timeentry.lblLine = " ";
        }

        timeentry.lblProductiveHoursValue = sumOfHours.toString() + ' h';
        timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
        timeentry.template = flxOuterList;
      }
      finalData.push(timeentry);
    }
  }
  kony.apps.coe.ess.myTime.ListViewTabUI.totalHours = totalHours;
  kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours = overtimeHours;
  kony.apps.coe.ess.myTime.ListViewTabUI.billableHours = billableHours;
  kony.apps.coe.ess.myTime.ListViewTabUI.status = data[0].Status_Name;

  //setting the cloneData to the picker View

  /*
    var SelectedTimesheetInfo = kony.apps.coe.ess.myTime.CalendarViewUI.selectedTimesheetData;

    var currentSelectedTimesheetStartDate = new Date();
    currentSelectedTimesheetStartDate.setDate(SelectedTimesheetInfo.startDate.substring(6, 8));
    currentSelectedTimesheetStartDate.setMonth(parseInt(SelectedTimesheetInfo.startDate.substring(4, 6)) - 1);
    currentSelectedTimesheetStartDate.setFullYear(SelectedTimesheetInfo.startDate.substring(0, 4));

    var currentSelectedTimesheetEndDate = new Date();
    currentSelectedTimesheetEndDate.setDate(SelectedTimesheetInfo.endDate.substring(6, 8));
    currentSelectedTimesheetEndDate.setMonth(parseInt(SelectedTimesheetInfo.endDate.substring(4, 6)) - 1);
    currentSelectedTimesheetEndDate.setFullYear(SelectedTimesheetInfo.endDate.substring(0, 4));

    var CloningTimesheetsData = kony.apps.coe.ess.myTime.cloning.getTimeSheetsDataForCloning(currentSelectedTimesheetStartDate, currentSelectedTimesheetEndDate);
*/
  //chainging Data to the pickerview Format
  /*   var CloningTimesheetsData = kony.apps.coe.ess.myTime.TimesheetCreate.Clone.pickerViewData(startDate);    
    CloningTimesheetsData.sort(function(a,b){
         return new Date(a.startDate)-new Date(b.startDate);
    });
    var outPickOuterArray = [];
    var pickerviewMasterData = [];
    for (var i = 0; i < CloningTimesheetsData.length; i++) {
        var startDateValue =  CloningTimesheetsData[i].startDate ;
        var endDateValue = CloningTimesheetsData[i].endDate;
        var key =  startDateValue + "-" + endDateValue;
        var value = startDateValue.substring(8, 10) +" "+ startDateValue.substring(4, 7) + " - " + endDateValue.substring(8, 10) +" "+ endDateValue.substring(4, 7) ;
        pickerviewMasterData.push([key, value]);

    }
    pickerviewMasterData.push(100);
    outPickOuterArray.push(pickerviewMasterData);
    kony.print(pickerviewMasterData);
    frmCalendarView.pickerViewDates.masterData=outPickOuterArray;*/
  kony.apps.coe.ess.myTime.ListViewTabUI.getSubmittedDate(data);
  kony.print("-- End getProcessedData --");
  return (finalData);
};

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.loadDataView = function() {
  processedData.timeEntries = kony.apps.coe.ess.myTime.ListViewTabUI.getProcessedData(finalResponse.timeSheetEntries);
  kony.apps.coe.ess.myTime.ListViewTabUI.setDataToViewTimeSheet(processedData.timeEntries);
  kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
};

/**
 * @class       ListViewTabUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method handles the navigation to view timesheet form
 */
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.navigateToViewTimesheetForm = function() {
  try {
    kony.print("-- Start navigateToViewTimesheetForm --");
    var currDate = new Date();
    // var currMonth=parseInt(currDate.getMonth())+1;
    var currMonth = "" + (("0" + (parseInt(currDate.getMonth()) + 1)).slice(-2));
    var currYear = currDate.getFullYear();

    var sqlQuery = "select ts.Start_Date as startDate,ts.End_Date as endDate,ts.Id as timesheetID,ts.Status_Id as statusID " +
        "from Timesheet ts where " +
        "(ts.Start_Date between '" + currYear + currMonth + "01'" +
        " AND '" + currYear + currMonth + "31') OR (ts.End_Date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31')";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, function(res) {
      kony.apps.coe.ess.myTime.ListViewTabUI.finalTimesheetData = res;

      if (kony.apps.coe.ess.myTime.ListViewTabUI.finalTimesheetData.length > 0) {
        kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId = kony.apps.coe.ess.myTime.ListViewTabUI.finalTimesheetData[0].timesheetID;

      }
      /*else {
                       kony.apps.coe.ess.myTime.CalendarViewUI.isSendBack = false;
                       kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId = null;
                   }*/

    }, function(err) {
      handleError(err);
    }, false);

    kony.print("-- End navigateToViewTimesheetForm --");
  } catch (e) {
    handleError(e);
  }
};

/**
 * @function - setDataToViewTimeSheet
 * @params	-data: json array.
 * @returns	-none.
 * @desc	-This function gets the processed data and bind that data to UI
 */

kony.apps.coe.ess.myTime.ListViewTabUI.setDataToViewTimeSheet = function(data) {

  kony.print("-- Start setDataToViewTimeSheet --");
  try {
    if (data !== null && data !== undefined && data.length > 0) {
      frmListView.lblNoResult.setVisibility(false);
      frmListView.segmentData.setVisibility(true);
      if(frmListView.btnRejected.skin === "sknBtnBg4a90e2FcffffffFs32px"){
        frmListView.flxComments.setVisibility(false); 
      }else{
        frmListView.flxComments.setVisibility(true);
      }
      frmListView.segmentData.setData(data);
      frmListView.lblOHours.text = kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours.toFixed(2)+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblTHours.text = kony.apps.coe.ess.myTime.ListViewTabUI.totalHours.toFixed(2)+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblBHours.text = kony.apps.coe.ess.myTime.ListViewTabUI.billableHours.toFixed(2)+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      var status = (kony.apps.coe.ess.myTime.ListViewTabUI.getStatus(kony.apps.coe.ess.myTime.ListViewTabUI.status));
      frmListView.lblApproved.skin = status.skin;
      frmListView.lblApproved.text = status.text;
      if(status.text === "Saved"){
        frmListView.btnSubmitTimeSheet.setVisibility(true);
      }else{
        frmListView.btnSubmitTimeSheet.setVisibility(false);
      }
      kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().totalSkinRefresh(status.text);
      if (status.centerY === "") {
        frmListView.lblApproved.centerY = status.centerY;
        frmListView.lblApprovedDate.isVisible = false;
      } else {
        frmListView.lblApproved.centerY = status.centerY;
        frmListView.lblApprovedDate.isVisible = true;
      }
    } else {
      frmListView.lblTimeSheetDate.text=frmListView.segViewDates.selectedItems[0].displayValue;
      frmListView.lblTHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblBHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblOHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblApproved.text="";
      frmListView.lblNoResult.setVisibility(true);
      frmListView.segmentData.setVisibility(false);
      frmListView.flxComments.setVisibility(false);
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    }
    var today = new Date();
    frmListView.lblMonth.text = kony.apps.coe.ess.myTime.nToStr.fullmonth[today.getMonth()];
    frmListView.lblYear.text = today.getFullYear().toFixed(0);
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

  } catch (err) {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }
  kony.print("-- End setDataToViewTimeSheet --");
};

/**
 * @function - getStatus
 * @params	-string.
 * @returns	-JSON.
 * @desc	-This function gets the status Properties
 */

kony.apps.coe.ess.myTime.ListViewTabUI.getStatus = function (status) {
  var Status = {};
  switch (status.toUpperCase()) {
    case "APPROVED":
      Status = {
        "skin" : "sknLblAccepted",
        "text" : status,
        "centerY" : ""
      };
      break;
    case "REJECTED":
      Status = {
        "skin" : "sknlblRejectedTab",
        "text" : status,
        "centerY" : ""
      };
      break;
    case "PENDING":
      Status = {
        "skin" : "sknLblApprovalPending",
        "text" : kony.i18n.getLocalizedString("i18n.ess.Status.ApprovalPending"),
        "centerY" : "50%"
      };
      break;
    case "SAVED":
      Status = {
        "skin" : "sknlblSavedTab",
        "text" : status,
        "centerY" : "50%"
      };
      break;
    case "ERROR":
      Status = {
        "skin" : "sknlblRejectedTab",
        "text" : status,
        "centerY" : "50%"
      };
      break;
    case "SUBMITTED":
      Status = {
        "skin" : "sknlblSubmitted",
        "text" : kony.i18n.getLocalizedString("i18n.ess.Status.Submitted"),
        "centerY" : "50%"
      };
  }
  return Status;
};


kony.apps.coe.ess.myTime.ListViewTabUI.getSubmittedDate = function(data) {
  if (data === null || data.length <= 0) {
    return;
  }
  var query = "select t.SubmittedOn from Timesheet t where Id='" + data[0].Timesheet_Id + "'";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query,
                                        kony.apps.coe.ess.myTime.ListViewTabUI.formattingdate,
                                        function(err) {
    handleError(err);
  });
};

/**
 * @function - formattingdate
 */
kony.apps.coe.ess.myTime.ListViewTabUI.formattingdate = function(resDate) {

  if (resDate === null || resDate.length <= 0) {
    frmListView.lblSubmittedDate.text = "-";
    return;
  }
  var date = resDate[0].SubmittedOn;
  if (date === null || date === undefined || isNaN(parseInt(date))) {
    frmListView.lblSubmittedDate.text = "-";
    return;
  }
  var day = date.substring(6, 8);
  var month = kony.apps.coe.ess.myTime.nToStr.fullmonth[(parseInt(date.substring(4, 6)) - 1)];
  var year = date.substring(0, 4);
  var hour = date.substring(8, 10);
  var min = date.substring(10, 12);
  var type;
  if (hour >= 12) {
    type = "PM";
  } else {
    type = "AM";
  }
  if (hour > 12) {
    hour -= 12;
  }
  var finalDate = day + " " + month + " " + year + ", " + hour + ":" + min + " " + type;
  frmListView.lblSubmittedDate.text = finalDate;
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       data set to set in segment
 * return       None.
 * desc         This method sets the data to segment
 */
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.updateSegment = function(i) {
  kony.print("--------------------start updateSegment--------------------");
  /*frmListView.lblTimeSheetDate.text="";

  if(temp[parseInt(i)]!= null || temp[parseInt(i)]!= undefined){
  var overtimeHours=0;
  var billableHours=0;

  var data=[];

    if ((temp[parseInt(i)].ISOVERTIME) == 1) {
       overtimeHours = overtimeHours + parseFloat(temp[i].Actual_Hours);
        }
        if ((temp[parseInt(i)].isBillable) == 1) {
      billableHours = billableHours + parseFloat(temp[i].Actual_Hours);
       }
  data.push({
      "lblProjectName" : temp[parseInt(i)].projectname,
      "lblProductiveHours" : temp[parseInt(i)].time_type_name,
      "lblDescription" : temp[parseInt(i)].Activity_Description,
      "lblProductiveHoursValue" : temp[parseInt(i)].Actual_Hours,
      "lblTaskName" : temp[parseInt(i)].Project_Task_id,
      "lblCostCenter" : temp[parseInt(i)].proid,
      "lblActivityId" : temp[parseInt(i)].StatusId
                    });

 if(data!==null||data!==undefined||data.length>0){
 frmListView.lblNoResult.setVisibility(false);
 frmListView.lblTHours.text = temp[parseInt(i)].Actual_Hours;
 frmListView.lblBHours.text = billableHours.toFixed(2);
 frmListView.lblOHours.text = overtimeHours.toFixed(2);
 frmListView.segmentData.setData(data);
}
    else
      {
      frmListView.lblNoResult.setVisibility(true);
      frmListView.lblTHours.text = "-";
      frmListView.lblBHours.text = "-";
      frmListView.lblOHours.text ="-";
      }
  }
  else{
    frmListView.lblNoResult.setVisibility(true);
  }
  */
  kony.print("--------------------end updateSegment--------------------");
};

/**
 * @function - onImgTempClick
 * @params	-eventobject.
 * @returns	-none.
 * @desc	-This function changes the template of the row in the segment.
 */

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onImgTempClick = function(context, eventobject) {
  try{

    var dateValArray=[];
    var selectedItem = frmListView.segViewDates.selectedItems[0];
    var selectedIndex = frmListView.segViewDates.selectedRowIndex;
    var selectedValue = frmListView.segViewDates.data[selectedIndex[1]];
    var skinStatus=kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().totalSkinRefresh(selectedValue.status);
    frmListView.segViewDates.widgetDataMap = {
      "lblWeek":"displayValue",
      "lblHours":"totalDuration",
      "lblDates":"dayWiseDuration",
      "lblDay1":"lblDay1",
      "lblDay2":"lblDay2",
      "lblDay3":"lblDay3",
      "lblDay4":"lblDay4",
      "lblDay5":"lblDay5",
      "lblDay6":"lblDay6",
      "lblDay7":"lblDay7"
    };

    var startDate = new Date(selectedItem.startDate);
    var endDate = new Date(selectedItem.endDate);
    kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions.getInstance().getWeekEndsDatesBetweenTwoDates(startDate, endDate, function(weekendRes) {
      var tempWeekEnd = {};
      for(var i in weekendRes) {
        tempWeekEnd[weekendRes[i].date] = true;
      }
      var weekDaysDateArray = [];
      for (var date = startDate; date <= endDate; date = date.nextDay()) {
        //if(!tempWeekEnd[date.toYYYYMMDD("")]) {
        weekDaysDateArray.push(date.toString());
        dateValArray.push("" + date.getDate().toString()+ " " + date.toString().slice(4, 7));

        //}
      }
      selectedValue.weekDaysDateArray = weekDaysDateArray;
      if(selectedItem.template!== undefined && selectedItem.template.id == "flxListTimesheetW") {
        selectedValue.template=flxListTimesheet;
        frmListView.segViewDates.setDataAt(selectedValue,selectedIndex[1],selectedIndex[0]);
      } else {
        selectedValue.template=flxListTimesheetW;
        selectedValue.template.skin="sknRFListview";
        for(var j=1;j<=dateValArray.length;j++) {
          selectedValue["lblDay" + j] ={
            "text":dateValArray[j-1],
            "skin":skinStatus
          };
        }
        frmListView.segViewDates.setDataAt(selectedValue,selectedIndex[1],selectedIndex[0]);
      }
    }, function(err) {
      handleError(err);
    });
  } catch(err){
    handleError(err);
  }
};

/**
 * @function - onEachDaySelection
 * @params	-context, eventobject, index
 * @returns	-none.
 * @desc	-This function is called onclick of each date in the segment
 */


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onEachDaySelection = function(context, eventobject, index) {
  try{
    frmListView.flxComments.setVisibility(false);
    frmListView.segViewDates.setVisibility(true);
    frmListView.lblTimeSheetDate.text=eventobject.text;
    var selectedIndex = frmListView.segViewDates.selectedRowIndex;
    var selectedItem = frmListView.segViewDates.selectedItems[0];
    var segSelectItemID = selectedItem.timesheetId;
    var dateValue = new Date(selectedItem.weekDaysDateArray[index]);
    var date=dateValue.toYYYYMMDD("");
    var skinStatus=kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().totalSkinRefresh(selectedItem.status);
    var sknFocusStatus = kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().setSkinOnEachDaySelectionRow(selectedItem.status);
    for(var i=1;i<=7;i++){
      if(eventobject.id == "lblDay" + i){
        selectedItem["lblDay" + i]={
          "skin":sknFocusStatus,
          "text":selectedItem["lblDay"+i].text
        };
      }else{
        selectedItem["lblDay" + i]={
          "skin":skinStatus,
          "text":selectedItem["lblDay"+i].text

        };
      }

    }
    frmListView.segViewDates.setDataAt(selectedItem,selectedIndex[1],selectedIndex[0]);
    if(segSelectItemID !== null && segSelectItemID !== undefined && segSelectItemID !== ""){
      (new kony.apps.coe.ess.myTime.ListViewTabDetails()).selectedRowDetailsData(segSelectItemID, true, date);
    }
    else{
      frmListView.lblTHours.text = "0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblBHours.text = "0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblOHours.text = "0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
      frmListView.lblApproved.text = "";
      frmListView.lblNoResult.setVisibility(true);
      frmListView.segmentData.setVisibility(false);
      frmListView.flxComments.setVisibility(false);
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    }
  } 
  catch(err){
    handleError(err);
  }
};

/**
 * @function - totalSkinRefresh
 * @params	-none.
 * @returns	-none.
 * @desc	-This function is used to set the default skins 
 */


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.totalSkinRefresh =function(status)
{
  try
  {
    var sknlblDays = "";
    var imgSource = "";
    switch(status)
    {
      case "pending":
        sknlblDays = "sknbtnPending";
        imgSource = "timesheet5.png";
        break;

      case "Approval Pending":
        sknlblDays = "sknbtnPending";
        imgSource = "timesheet5.png";
        break;

      case "saved" :
        sknlblDays = "sknbtnSaved";
        imgSource = "timesheet4.png";
        break;

      case "error" :
        sknlblDays = "sknbtnError";
        imgSource = "timesheet2.png";
        break;  

      case "rejected" :
        sknlblDays = "sknbtnRejected";
        imgSource = "timesheet3.png";
        break;  

      case "approved" :
        sknlblDays = "sknbtnApproved";
        imgSource = "timesheet1.png";
        break;  

      case "new" :
        sknlblDays = "sknbtnNew";
        imgSource = "timesheet2.png";
        break;

      default:
        sknlblDays = "sknWbtnTransBlueFont";
        imgSource = "timesheet2.png"; 
        break;

    }
    frmListView.imgTimeSheet.src = imgSource;
    return sknlblDays;
  }
  catch(err)
  {
    handleError(err);
  }
};


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.setSkinOnEachDaySelectionRow =function(status){
  try{
    kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().totalSkinRefresh();
    var focusSknOnEachDay="";
    var imgSource = "";
    switch(status)
    {
      case "pending":
        focusSknOnEachDay = "sknFocusbtnPending";
        imgSource = "timesheet5.png";
        break;

      case "Approval pending":
        focusSknOnEachDay = "sknFocusbtnPending";
        imgSource = "timesheet5.png";
        break;

      case "saved" :
        focusSknOnEachDay = "sknFocusbtnSaved";
        imgSource = "timesheet4.png";
        break;

      case "error" :
        focusSknOnEachDay = "sknFcsbtnError";
        imgSource = "timesheet2.png";
        break;  

      case "rejected" :
        focusSknOnEachDay = "sknFocusbtnRejected";
        imgSource = "timesheet3.png";
        break; 

      case "approved" :
        focusSknOnEachDay = "sknFocusbtnApproved";
        imgSource = "timesheet1.png";
        break;

      default:
        focusSknOnEachDay = "sknWbtnBluernd";
        imgSource = "timesheet2.png"; 
        break;
    }
    frmListView.imgTimeSheet.src = imgSource;
    return focusSknOnEachDay;
  }catch(err){
    handleError(err);
  }
};

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onClickPastDues = function(){
  var getTimesheetIntervalFunc = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates;
  var pastDuesArray = [];
  try{
    
    var currentDate = new Date();
    var startDate = kony.apps.coe.ess.appconfig.yearStartDate;
    var endDate = getTimesheetIntervalFunc(getTimesheetIntervalFunc(currentDate)[0].previousDay())[0];
    var query = "select Start_Date,Id, Status_Id from timesheet where Start_Date between '"+startDate.toYYYYMMDD("")+"' and '"+endDate.toYYYYMMDD("")+"'";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query,pastDuesSuccessCallback.bind(this,startDate,endDate),pastDuesErrorCallback);
  }catch(err){
    handleError(err);
  }
  function pastDuesSuccessCallback(startDate, endDate, response) {
    var tempJsonOfTimesheet = {};
    var tempJsonOfFullDateArray = {};
    for(var i in response) {
      tempJsonOfTimesheet[response[i].Start_Date] = response[i];
    }
    frmListView.segPDues.widgetDataMap = {
      "lblDues" : "fullDate"
    };
    var dateInterval = getTimesheetIntervalFunc(startDate);
    while(dateInterval[0] <= endDate) { 
      var fromDate = dateInterval[0].getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dateInterval[0].getMonth()];
      var toDate = dateInterval[1].getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dateInterval[1].getMonth()];
      var fullDate = fromDate + " - " + toDate;

      var startDateOfTimesheet = dateInterval[0].toYYYYMMDD("");
      var timesheet = tempJsonOfTimesheet[startDateOfTimesheet];
      if(timesheet !==  undefined) {
        if(timesheet.Status_Id !== "0" && timesheet.Status_Id !== "2") {
          pastDuesArray.push({"fullDate":fullDate});
        }
      } else {
        pastDuesArray.push({"fullDate":fullDate});
      }
      dateInterval = getTimesheetIntervalFunc(dateInterval[1].nextDay());
    }    
    frmListView.lblCount.text = parseInt(pastDuesArray.length,10).toString().split(".")[0];
    frmListView.segPDues.setData(pastDuesArray);
  }
  function pastDuesErrorCallback(err){
    handleError(err);
  }
};


/**
 * @function - showPopup
 * @params	-none.
 * @returns	-none.
 * @desc	-This function is used to  confirm the deletion/cloning of  the time Entries in the frmListView.
 */
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.showPopup = function(operation_to_perform){
  try{
    if(operation_to_perform =="Delete")
    {
      frmListView.lblConfirmationMsg.text = kony.i18n.getLocalizedString("i18n.frmCalendarView.deleteTimeEntries");
      kony.apps.coe.ess.globalVariables.flag_delete=true;
      frmListView.flxPopUp.isVisible=true;
    }
    else
    {
      frmListView.lblConfirmationMsg.text = kony.i18n.getLocalizedString("i18n.ess.CloneTimeEntry");
      kony.apps.coe.ess.globalVariables.flag_delete=false;
      frmListView.flxPopUp.isVisible=true;
    }  

  }catch(err){
    handleError(err);
  }
};


/**
 * @function - showPopup
 * @params	-none.
 * @returns	-none.
 * @desc - This function is used to decide the operation to perform in confirmation Popup in frmListView.
 */
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.performOperation = function(){
  try{
    if(kony.apps.coe.ess.globalVariables.flag_delete)
    {
      kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().deleteAllTimeEntries(); 
    }
    else
    {
      kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().cloneTimeEnrty();
    }

  }catch(err){
    handleError(err);
  }
};

/**
 * @function - deleteAllTimeEntries
 * @params	-none.
 * @returns	-none.
 * @desc	-This function sends the timesheetId to the cancelAllTimeEntriesInTimehseet 
   which is used to remove all the time entries of the week timesheet at once.
 */

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.deleteAllTimeEntries = function(){
  try{
    kony.print("-- Start deleteAllTimeEntry --");
    frmListView.flxPopUp.isVisible=false;
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading");
    kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.cancelAllTimeEntriesInTimehseet(kony.apps.coe.ess.myTime.ListViewTimesheet.timeSheetId, function() {
      kony.application.dismissLoadingScreen();
      frmListView.flxPopUp.isVisible=false;
      kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().updateTimeSheetWithDuration(frmListView.segViewDates);
      kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().onRowClickofSegListView("Delete");
      kony.apps.coe.ess.frmLogin.manualSyncOnClick();
    },
                                                                                       function(err) {
      kony.application.dismissLoadingScreen();
      frmListView.flxPopUp.isVisible=false;
      handleError(err);
    });
    kony.print("-- End deleteAllTimeEntry --");
  }catch(err){
    handleError(err);
  }
};



kony.apps.coe.ess.myTime.ListViewTabUI.prototype.cloneTimeEnrty = function(){
  try{
    frmListView.flxCopyWeek.setVisibility(false);
    frmListView.flxPopUp.isVisible=false;
    kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().CopyWeekTimesheetConfirm();
  }catch(err){
    handleError(err);
  }
};



kony.apps.coe.ess.myTime.ListViewTabUI.prototype.CopyWeekTimesheet = function() {
  kony.print("-- Start CopyWeekTimesheet --");

  var selectedIndex = frmListView.segCopy.selectedRowIndex;

  var selectedValue = frmListView.segCopy.data[selectedIndex[1]];

  if (selectedValue.imgActiveInactive === "checkboxinactive.png") {
    selectedValue.imgActiveInactive = "checkboxactive.png";
  } else {
    selectedValue.imgActiveInactive = "checkboxinactive.png";
  }
  frmListView.segCopy.setDataAt(selectedValue, selectedIndex[1], selectedIndex[0]);

  kony.print("-- End CopyWeekTimesheet --");

};

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.CopyWeekTimesheetConfirm = function() {

  var activeImg;
  var selectedWeeks = [];
  var date;
  var k = 0;

  for (var i = 0; i < frmListView.segCopy.data.length; i++) {
    activeImg = frmListView.segCopy.data[i].imgActiveInactive;
    if (activeImg == "checkboxactive.png") {
      selectedWeeks.push(frmListView.segCopy.data[i]);
      date = selectedWeeks[k].fullValue;
      kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().cloneAllSelectedWeeks(date, selectedWeeks[k].startDate);
      k++;
    }
  }
  kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().updateTimeSheetWithDuration(frmListView.segViewDates);
  //kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().onRowClickofSegListView();
  kony.apps.coe.ess.frmLogin.manualSyncOnClick();
};

/**
 * @function - cloneAllSelectedWeeks
 * @desc	-This function Clones the pending and submitted timesheets
 */

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.cloneAllSelectedWeeks = function(date, fullYear) {

  kony.application.showLoadingScreen("", "Cloning Timesheet", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.apps.coe.ess.myTime.getTimesheetDataForADate(new Date(date.split("-")[0]), function(response) {
    // alert((frmCalendarView.lblWeekDate.text).split("-")[0] + " " + globalDateObj);
    if (response === null || response.Status_Id === "1" || response.Status_Id === "5" || response.Status_Id === "6") {
      kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimesheet(new Date(kony.apps.coe.ess.myTime.CalendarViewUI.startTime), new Date(date.split("-")[0] + " " + fullYear),
                                                                    function(response) {
        //(new kony.apps.coe.ess.myTime.CalendarViewUI()).monthRefresh();
        kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().updateTimeSheetWithDuration(frmListView.segViewDates);
        kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().onRowClickofSegListView();

        kony.application.dismissLoadingScreen();
      },
                                                                    function(error) {
        handleError(error);
        kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().updateTimeSheetWithDuration(frmListView.segViewDates);
        kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().onRowClickofSegListView();

        //(new kony.apps.coe.ess.myTime.CalendarViewUI()).monthRefresh();
        kony.application.dismissLoadingScreen();
        kony.apps.coe.ess.frmLogin.manualSyncOnClick();
      });
    } else {
      kony.application.dismissLoadingScreen();
      alert(kony.i18n.getLocalizedString("i18n.ess.timeSheetNotEditable"));

    }
  }, function(error) {
    handleError(error);
    kony.application.dismissLoadingScreen();
  });

};


kony.apps.coe.ess.myTime.ListViewTabUI.prototype.populateSegmentData = function() {
  var currentDate = new Date();
  var presentYear = String(currentDate.getFullYear()).trim();
  var date = new Date(presentYear, currentDate.getMonth());
  var sd;
  var ed;
  var sdedm = kony.apps.coe.ess.myTime.TimesheetDatesInterval.monthly(date);
  startdate = sdedm[0].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
  var enddate = sdedm[1].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[1];
  var nweeks = (Date.parse(enddate) - Date.parse(startdate)) / 604800000;
  var data = [];
  frmListView.segCopy.widgetDataMap = {
    "imgSegCopy": "imgActiveInactive",
    "btnSegCopy": "displayValue"
  };
  for (var i = 0; i < nweeks; i++) {
    sd = new Date(Date.parse(startdate) + i * 604800000);
    ed = new Date(Date.parse(sd) + 518400000);
    data.push({
      displayValue: sd.getDate() + " " + sd.toString().slice(4, 7) + kony.i18n.getLocalizedString("i18n.common.hyphen") + ed.getDate() + " " + ed.toString().slice(4, 7),
      startDate: sd.getFullYear(),
      fullValue: sd.toString().substring(0, 15) + "-" + ed.toString().substring(0, 15),
      imgActiveInactive: "checkboxinactive.png"
    });
  }
  frmListView.segCopy.setData(data);
};
