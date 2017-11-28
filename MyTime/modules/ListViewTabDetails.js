kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.ListViewTabDetails = function(){
  kony.print("Constructing a new ListTabViewDetails object");
};
kony.apps.coe.ess.myTime.ListViewTabDetails.checkForSubmit = false;
kony.apps.coe.ess.myTime.ListViewTabDetails.dayCounter = 0;
kony.apps.coe.ess.myTime.ListViewTabDetails.fromSubmit = false;

/**
 * @function - selectedRowDetailsData
 * @params	-timesheetID: string, isIndividualBtn: boolean, dateObj.
 * @returns	-none.
 * @desc	-This function queries the data for selected day/week.
 */


kony.apps.coe.ess.myTime.ListViewTabDetails.prototype.selectedRowDetailsData = function(timesheetID, isIndividualBtn, dateObj) {
  kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId = timesheetID;
  kony.application.showLoadingScreen("", "Loading", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  if(timesheetID !== null && timesheetID !== undefined && timesheetID !== "" ){
    var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id='"+timesheetID+"' AND te.StatusId != '3';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallBack.bind(this,timesheetID,isIndividualBtn,dateObj), errorCallBack);
  }else{
    frmListView.lblTimeSheetDate.text=frmListView.segViewDates.selectedItems[0].displayValue;
    frmListView.lblTHours.text=frmListView.segViewDates.selectedItems[0].totalDuration;
    frmListView.lblBHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
    frmListView.lblOHours.text="0.00"+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
    frmListView.lblApproved.text="";
    frmListView.lblNoResult.setVisibility(true);
    frmListView.segmentData.setVisibility(false);
    frmListView.flxComments.setVisibility(false);
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }

  function successCallBack(timesheetID,isIndividualBtn,dateObj,response){
    if(timesheetID!==null && timesheetID!==undefined && timesheetID !== "" ){
      var query = "select tn.Added_On,tn.comments,tn.Employee_id,e.First_Name as name from Timesheet_note tn left join employee e on tn.employee_id=e.id where timesheet_id='" + timesheetID + "'";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, querySuccess.bind(this, response,isIndividualBtn,dateObj), queryFailure);
      kony.sdk.mvvm.log.info("success fetching data ", response);
    }

  }
  function errorCallBack(err){
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    handleError(err);
  }

  function querySuccess(response1,isIndividualBtn,dateObj, response2) {
    var finalResponse = {};
    finalResponse.timeSheetEntries = response1;
    finalResponse.timeSheetComments = response2;
    (new kony.apps.coe.ess.myTime.ListViewTabDetails()).getProcessedData(finalResponse,isIndividualBtn,dateObj);
  }

  function queryFailure(err) {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    handleError(err);
  }

};

kony.apps.coe.ess.myTime.ListViewTabDetails.prototype.getProcessedData = function(data,isIndividualBtn,dateObj) {
  try {
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig === "daily") {
      var refstartDate = new Date(data.timeSheetEntries[0].Start_Date.toString().substring(0, 4), (data.timeSheetEntries[0].Start_Date.toString().substring(4, 6)) - 1, data.timeSheetEntries[0].Start_Date.toString().substring(6, 8));
      interval = refstartDate.thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay);
      var dataToSet = [];
      var startDate = interval[0];
      var endDate = interval[1];
      var dateToProcess = new Date(startDate);
      var query = "select ts.Id, ts.Status_Id,ts.Start_Date from Timesheet ts where ts.Start_Date >='" + (startDate.toYYYYMMDD("")) + "' AND ts.End_Date <= '" + (endDate.toYYYYMMDD("")) + "';";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, assignStatus.bind(scopeObj, dataToSet), error);

      function assignStatus(dataToSet, res) {
        var tempRes = {};
        for (var i in res) {
          tempRes[res[i].Start_Date] = res[i];
        }
        while ((dateToProcess.compareOnlyDate(endDate)) <= 0) {
          var _dayName = kony.apps.coe.ess.myTime.nToStr.week[dateToProcess.getDay()].toUpperCase();
          var _date = dateToProcess.getDate();
          var _month = kony.apps.coe.ess.myTime.nToStr.month[dateToProcess.getMonth()].toUpperCase();
          var status;
          dataToSet.push({
            "dayName": _dayName,
            "date": String(parseInt(_date)),
            "month": _month,
            "completeDate": new Date(dateToProcess),
            "status": "",
            "timesheetId": "",
          });
          dateToProcess = dateToProcess.nextDay();
        }
        for (var i = 0; i < dataToSet.length; i++) {
          if (tempRes[dataToSet[i].completeDate.toYYYYMMDD("")] === null || tempRes[dataToSet[i].completeDate.toYYYYMMDD("")] === undefined) {
            dataToSet[i].status = "-1";
            dataToSet[i].timesheetId = "";
          } else {
            dataToSet[i].status = tempRes[dataToSet[i].completeDate.toYYYYMMDD("")].Status_Id;
            dataToSet[i].timesheetId = tempRes[dataToSet[i].completeDate.toYYYYMMDD("")].Id;
          }
        }
        (new kony.apps.coe.ess.myTime.ListViewTabDetails()).bindingData(dataToSet);

      }

      function error(err) {
        handleError(err);
      }

    } else {
      var processedData = {};
      if(isIndividualBtn){
        var date=dateObj;
        processedData.timeEntries =(new kony.apps.coe.ess.myTime.ListViewTabDetails()).showTimeSheetDetailsDaybyDay(data.timeSheetEntries,date);
      }else{
        processedData.timeEntries =(new kony.apps.coe.ess.myTime.ListViewTabUI()).mappingWeeklyData(data.timeSheetEntries);
        processedData.commentsData = kony.apps.coe.ess.myTime.ViewTimeSheetUI.processTimesheetComments(data.timeSheetComments);
        (new kony.apps.coe.ess.myTime.ListViewTabDetails()).bindingData(processedData);
      }
      return processedData;
    }

  } catch (err) {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
    var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
    kony.sdk.mvvm.log.error(exception.toString());
  }
};



kony.apps.coe.ess.myTime.ListViewTabDetails.prototype.bindingData = function(data) {
  try {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig === "daily") {
      var weekDayListObj = kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.getInstance();
      weekDayListObj.widgetsDataMap = {
        "lblDayName": "dayName",
        "lblDate": "date",
        "lblMonthName": "month"
      };
      weekDayListObj.propertiesToSet = {
        "lblDayName": "text",
        "lblDate": "text",
        "lblMonthName": "text"
      };
      weekDayListObj.onSelectionCallback = function(res, index) {
        if (index === null) {
          var timesheetString = "IN(";
          for (var i = 0; i < res.length; i++) {
            if (res[i].timesheetId !== "") {
              timesheetString = timesheetString + "'" + String(res[i].timesheetId).trim() + "',";
            }
          }
          timesheetString = timesheetString.substring(0, timesheetString.length - 1);
          timesheetString = timesheetString + ")";
          var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id " + timesheetString + "AND te.StatusId != '3';";
          kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successForAllData, error);

          function successForAllData(res) {
            var processedData;
            processedData = kony.apps.coe.ess.myTime.ViewTimeSheetUI.getProcessedData(res);
            kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToViewTimeSheet(processedData);
          }

          function error() {
            handleError();
          }
        } else {
          if (res.status === "1" || res.status === "6") {
            kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = true;
          } else {
            kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = false;
          }

          if (res.status === "-1" || res.status === "5") {
            showTimesheetHomeForm(res.completeDate);
          }
          var timesheetId;
          timesheetId = res.timesheetId;
          if (timesheetId === null || timesheetId === undefined || timesheetId === "") {
            return;
          } else {
            var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id='" + timesheetId + "' AND te.StatusId != '3';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, error);
          }

          function success(res) {
            var processedData;
            processedData = kony.apps.coe.ess.myTime.ViewTimeSheetUI.getProcessedData(res);
            kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToViewTimeSheet(processedData);
          }

          function error(err) {
            handleError(err);
          }
        }
      };

      var selectedIndex;
      for (var i = 0; i < data.length; i++) {

        if (data[i].timesheetId === kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId)
          selectedIndex = i;
      }
      kony.print("---- setData in weekDayListObj");
      weekDayListObj.setData(data);
      frmViewTimeSheet.flxDatesSection.isVisible = false;
      frmViewTimeSheet.flxweekDays.isVisible = true;
      frmViewTimeSheet.segComments.isVisible = false;
      frmViewTimeSheet.flxCloneButtons.top = "-3%"
      weekDayListObj.setSelectedItem(selectedIndex);
    } else {
      kony.apps.coe.ess.myTime.ListViewTabUI.setDataToViewTimeSheet(data.timeEntries);
      //kony.apps.coe.ess.myTime.ListViewTabUI.setDataToTimesheetComments(data.commentsData);
      //frmListView.flxDatesSection.isVisible = true;
      //frmListView.flxweekDays.isVisible = false;
    }
  } catch (err) {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
  }

};


kony.apps.coe.ess.myTime.ListViewTabDetails.monthtoDay = {
  "Jan": "1",
  "Feb": "2",
  "Mar": "3",
  "Apr": "4",
  "May": "5",
  "Jun": "6",
  "Jul": "7",
  "Aug": "8",
  "Sep": "9",
  "Oct": "10",
  "Nov": "11",
  "Dec": "12"
};


kony.apps.coe.ess.myTime.ListViewTabDetails.prototype.showTimeSheetDetailsDaybyDay = function(data,fullDate) 
{
  try
  {
    var dayData = []; 
    var combinedDate = fullDate;
    var wholeDataforTimeSheet = "" ;
    if(data !== null && data !== undefined && data !== ""){
      wholeDataforTimeSheet = data;
    }else{
      wholeDataforTimeSheet = kony.apps.coe.ess.myTime.ListViewTabUI.storeData;
    }
    for (i = 0; i < wholeDataforTimeSheet.length; i++) {
      if (String(wholeDataforTimeSheet[i].Project_Task_id).trim === "" || wholeDataforTimeSheet[i].Project_Task_id === null || wholeDataforTimeSheet[i].Project_Task_id === undefined) {
        wholeDataforTimeSheet[i].Project_Task_id = "";
      }
    }
    var groupedData = kony.apps.coe.makeGroups("Date", wholeDataforTimeSheet);
    var tempData = groupedData[0];
    var status_Name = "";
    if(tempData !== null && tempData !== undefined && tempData !== ""){
      status_Name = tempData[0].Status_Name;
    }
    for (var i = 0; i < groupedData.length; i++) {
      for (var j = 0; j < groupedData[i].length; j++) {
        if(groupedData[i][j].Date == combinedDate)
        {
          dayData.push(groupedData[i][j]) ;
        }         
      }
    }    
    this.processDaybyDayData(dayData,status_Name,fullDate);
  }
  catch(err)
  {
    handleError(err);
  }
};


/**
 * @function - processDaybyDayData
 * @params	- takes data for the entire day  as param 
 * @returns	-none.
 * @desc	-This function is used to process the details for a particular day in timesheetTab
 */
kony.apps.coe.ess.myTime.ListViewTabDetails.prototype.processDaybyDayData = function(dayData,status_Name,fullDate) 
{
  try
  {
    var totalHours = 0;
    var overtimeHours = 0;
    var billableHours = 0;
    var sumOfHours = 0;
    var finalData =[];
    var timeentry = {};
    kony.apps.coe.ess.myTime.ListViewTabDetails.overtimeHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabDetails.billableHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabDetails.totalHours = 0;

    for (i = 0; i < dayData.length; i++) {
      timeentry = {};
      sumOfHours = sumOfHours + parseFloat(dayData[i].Actual_Hours);
      if (parseInt(dayData[i].ISOVERTIME ,10) == 1) {
        overtimeHours = overtimeHours + parseFloat(dayData[i].Actual_Hours);
      }
      if (parseInt(dayData[i].isBillable,10) == 1) {
        billableHours = billableHours + parseFloat(dayData[i].Actual_Hours);
      }
      totalHours = totalHours + sumOfHours;

      if (String(dayData[i].Project_Task_id).trim === "" ||dayData[i].Project_Task_id === null ||dayData[i].Project_Task_id===undefined) {
        var hours = 0;
        for (k = 0; k < dayData[i].length; k++) {
          hours += parseFloat(dayData[k].Actual_Hours);
        }
        timeentry.lblTaskName = dayData[i].time_type_name;
        timeentry.lblProductiveHours = dayData[i].time_type_name !== null ? dayData[i].time_type_name.toString() : "";
        timeentry.lblProductiveHoursValue = parseFloat(hours).toFixed(2) + " " + kony.i18n.getLocalizedString("i18n.common.hoursSymbol"); 
        timeentry.lblLine = " ";
        timeentry.template = flxOuterOne;

      }
      else
      {
        timeentry.lblProjectName = dayData[i].projectname !== null ? dayData[i].projectname.toString() : "";
        timeentry.lblTaskName = dayData[i].Task_Name !== null ? dayData[i].Task_Name.toString() : dayData[i].Project_Task_id;
        timeentry.lblDescription = dayData[i].Activity_Description.toString();
        if ((dayData[i].Type !== null && dayData[i].Type !== "" && dayData[i].Type !== undefined)) {
          var index = (dayData[i].Type).indexOf("|");
          var type1 = index !== -1 ? (dayData[i].Type).substring(0, index) : (dayData[i].Type);
          var type2 = index !== -1 ? ((dayData[i].Type).substring(index + 1, (dayData[i].Type).length)) : "";
          var type1Value = ((dayData[i].proid) !== null && (dayData[i].proid) !== undefined) ? (dayData[i].proid).replace(type1, "") : "-";
          var type2Value = ((dayData[i].taskId) !== null && (dayData[i].taskId) !== undefined) ? (dayData[i].taskId).replace(type2, "") : "";
          timeentry.lblCostCenter = type1 + " - " + type1Value;
          timeentry.lblActivityId = type2 + " - " + type2Value;
          timeentry.lblLine = " ";
        }
        timeentry.lblProductiveHoursValue = sumOfHours.toString() + " " + kony.i18n.getLocalizedString("i18n.common.hoursSymbol");
        timeentry.lblProductiveHours = dayData[i].time_type_name !== null ? dayData[i].time_type_name.toString() : "";
        timeentry.template = flxOuterOne;
      }
      finalData.push(timeentry);
    }

    if(kony.apps.coe.ess.myTime.ListViewTabDetails.checkForSubmit)
    {
      var fullDateDay =  new Date(""+fullDate.substr(0,4)+"-"+fullDate.substr(4,2)+"-"+fullDate.substr(6,2)).toUTCString().substr(0,3);

      if(fullDateDay === "Fri" && totalHours !== 0)
      {
        (new kony.apps.coe.ess.myTime.ListViewTabDetails()).submitCheck(); 
        return;
      }
      if(totalHours === 0)
      {
        var query = "select h.Holiday_Date as Date from Holiday h where date = '" + fullDate + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, holidaySuccessCallBack, holidayErrorCallBack);        
      }
      function holidaySuccessCallBack(response)
      {
        if(response.length === 0)
        {
          kony.apps.coe.ess.myTime.ListViewTabDetails.dayCounter++;    
        }

        if(fullDateDay=="Fri")
        {
          (new kony.apps.coe.ess.myTime.ListViewTabDetails()).submitCheck();  
        }
        return;
      }
      function holidayErrorCallBack(err)
      {
        alert("error while execuing holiday query"+err);
        return;
      }

    }


    kony.apps.coe.ess.myTime.ListViewTabDetails.totalHours = totalHours;
    kony.apps.coe.ess.myTime.ListViewTabDetails.overtimeHours = overtimeHours;
    kony.apps.coe.ess.myTime.ListViewTabDetails.billableHours = billableHours;
    kony.apps.coe.ess.myTime.ListViewTabDetails.status = status_Name;
    if(kony.apps.coe.ess.myTime.ListViewTabDetails.checkForSubmit ===false){
      kony.apps.coe.ess.myTime.ListViewTabDetails.setDataToViewTimeSheet(finalData); 
    }
  } 
  catch(err)
  {
    handleError(err);
  }
};

/**
 * @function - setDataToViewTimeSheet
 * @params	-data: json array.
 * @returns	-none.
 * @desc	-This function gets the processed data and bind that data to UI
 */


kony.apps.coe.ess.myTime.ListViewTabDetails.setDataToViewTimeSheet = function(data) {

  kony.print("-- Start setDataToViewTimeSheet --");
  try {
    if (data !== null || data !== undefined || data.length > 0) {
      frmListView.lblNoResult.setVisibility(false);
      frmListView.segmentData.setData(data);
    } else {
      frmListView.lblNoResult.setVisibility(true);
    }
    var today = new Date();
    frmListView.lblMonth.text = kony.apps.coe.ess.myTime.nToStr.fullmonth[today.getMonth()];
    frmListView.lblYear.text = today.getFullYear().toFixed(0);

    frmListView.lblOHours.text = kony.apps.coe.ess.myTime.ListViewTabDetails.overtimeHours.toFixed(2)+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
    frmListView.lblTHours.text = kony.apps.coe.ess.myTime.ListViewTabDetails.totalHours.toFixed(2)+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
    frmListView.lblBHours.text = kony.apps.coe.ess.myTime.ListViewTabDetails.billableHours.toFixed(2)+kony.i18n.getLocalizedString("i18n.ess.frmListViewH");

    var status = (kony.apps.coe.ess.myTime.ListViewTabUI.getStatus(kony.apps.coe.ess.myTime.ListViewTabDetails.status));
    frmListView.lblApproved.skin = status.skin;
    frmListView.lblApproved.text = status.text;
    if (status.centerY === "") {
      frmListView.lblApproved.centerY = status.centerY;
      frmListView.lblApprovedDate.isVisible = false;
    } else {
      frmListView.lblApproved.centerY = status.centerY;
      frmListView.lblApprovedDate.isVisible = true;
    }
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

  } catch (err) {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  }
  kony.print("-- End setDataToViewTimeSheet --");
};

kony.apps.coe.ess.myTime.ListViewTabDetails.prototype.checkForSubmitStatus = function(){

  try{
    var dateObjectArray = [];
    var selectedItems = frmListView.segViewDates.selectedItems[0];
    var startDate = new Date(selectedItems.startDate);
    var endDate = new Date(selectedItems.endDate);
    for(var date = startDate;date <= endDate; date = date.nextDay()){
      var fullDate = date.toYYYYMMDD("");  
      dateObjectArray.push(fullDate);
    }
    for(var i = 1;i < 6;i++){
      var dateObject = dateObjectArray[i];
      (new kony.apps.coe.ess.myTime.ListViewTabDetails()).showTimeSheetDetailsDaybyDay("",dateObject);

    }
  }catch(e){
    alert("Exception in checkForSubmitStatus"+e);
  }
};



kony.apps.coe.ess.myTime.ListViewTabDetails.prototype.submitCheck = function() 
{
  if(kony.apps.coe.ess.myTime.ListViewTabDetails.dayCounter ===0)
  {
    kony.apps.coe.ess.myTime.ListViewTabDetails.fromSubmit = true;
    kony.apps.coe.ess.myTime.TimesheetReview.completeReview(kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId);
    kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().updateTimeSheetWithDuration(frmListView.segViewDates);
    kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().onRowClickofSegListView();
  }
  else
  {
    alert("Please fill time entries for all the working days of this particular week");
  }
}