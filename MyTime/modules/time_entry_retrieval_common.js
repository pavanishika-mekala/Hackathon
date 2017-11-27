/**
 *  @author     Prabhjot Singh
 *  @category  Common functionality for retrieval of timeentry data
 *  @desc
 *  @ © 2017    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.time_entry_retrieval_common = function() {
  kony.print("-- Start time_entry_retrieval_common --");
  kony.print("-- End time_entry_retrieval_common --");
};

kony.apps.coe.ess.myTime.time_entry_retrieval_common.monthtoDay = {
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
kony.apps.coe.ess.myTime.time_entry_retrieval_common.checkForSubmit=false;
kony.apps.coe.ess.myTime.time_entry_retrieval_common.dayCounter=0;
kony.apps.coe.ess.myTime.time_entry_retrieval_fromSubmit=false;
/**
 * @function - showTimeSheetDetailsDaybyDay
 * @params	- takes date as param as 20171024
 * @returns	-none.
 * @desc	-This function is used to fetch the details for a particular day in timesheetTab
 */
kony.apps.coe.ess.myTime.time_entry_retrieval_common.prototype.showTimeSheetDetailsDaybyDay = function(fullDate) 
{
  try
    {
  var dayData =[]; 
  var combinedDate =fullDate;
  if(kony.apps.coe.ess.myTime.CalendarViewUI.storeData.length >0)
    {
  var wholeDataforTimeSheet = kony.apps.coe.ess.myTime.CalendarViewUI.storeData;
  for (i = 0; i < wholeDataforTimeSheet.length; i++) {
    if (String(wholeDataforTimeSheet[i].Project_Task_id).trim === "" || wholeDataforTimeSheet[i].Project_Task_id === null || wholeDataforTimeSheet[i].Project_Task_id === undefined) {
      wholeDataforTimeSheet[i].Project_Task_id = "";
    }
  }
  var groupedData = kony.apps.coe.makeGroups("Date", wholeDataforTimeSheet);
  for (var i = 0; i < groupedData.length; i++) {
    for (var j = 0; j < groupedData[i].length; j++) {
      if(groupedData[i][j].Date == combinedDate)
      {
        dayData.push(groupedData[i][j]) ;
      }         
    }
  }    
  this.processDaybyDayData(dayData,fullDate);
      
    }
    else
   return;
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
kony.apps.coe.ess.myTime.time_entry_retrieval_common.prototype.processDaybyDayData = function(dayData,fullDate) 
{
  try
    {
     
  var totalHours = 0;
  var overtimeHours = 0;
  var billableHours = 0;
  var sumOfHours = 0;
  var finalData =[];
  var timeentry = {};
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
      timeentry.lblProductiveHoursValue = parseFloat(hours).toFixed(2) + "h";
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

      timeentry.lblProductiveHoursValue = sumOfHours.toString() + 'h';
      timeentry.lblProductiveHours = dayData[i].time_type_name !== null ? dayData[i].time_type_name.toString() : "";
      timeentry.template = flxOuterOne;


    }
    finalData.push(timeentry);
  }
      
  if(kony.apps.coe.ess.myTime.time_entry_retrieval_common.checkForSubmit)
     {
       var fullDateDay =  new Date(""+fullDate.substr(0,4)+"-"+fullDate.substr(4,2)+"-"+fullDate.substr(6,2)).toUTCString().substr(0,3);
       
       if(fullDateDay=="Fri" && totalHours !=0)
         {
           (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).submitCheck(); 
            return;
         }
       if(totalHours==0)
         {
           var query = "select h.Holiday_Date as Date from Holiday h where date = '" + fullDate + "';";
           kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, holidaySuccessCallBack, holidayErrorCallBack);        
         }
       function holidaySuccessCallBack(response)
       {
         if(response.length==0)
           {
             kony.apps.coe.ess.myTime.time_entry_retrieval_common.dayCounter = kony.apps.coe.ess.myTime.time_entry_retrieval_common.dayCounter+1;    
           }
         
         if(fullDateDay=="Fri")
           {
           (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).submitCheck();  
           }
         return;
       }
       function holidayErrorCallBack(err)
       {
         alert("error while execuing holiday query"+err);
         return;
       }
       
     }
     
  kony.apps.coe.ess.myTime.CalendarViewUI.totalHours = totalHours;
  kony.apps.coe.ess.myTime.CalendarViewUI.overtimeHours = overtimeHours;
  kony.apps.coe.ess.myTime.CalendarViewUI.billableHours = billableHours;
  kony.apps.coe.ess.myTime.CalendarViewUI.status = kony.apps.coe.ess.myTime.CalendarViewUI.storeData[0].Status_Name;
      
  if(kony.apps.coe.ess.myTime.time_entry_retrieval_common.checkForSubmit ===false)
  kony.apps.coe.ess.myTime.CalendarViewUI.setDataToViewTimeSheet(finalData);
} 
  catch(err)
    {
      handleError(err);
    }
};


/**
 * @function - setSkins
 * @params	- takes data for the entire day  and selected day 
 * @returns	-none.
 * @desc	-This function is used to highlight  the particular day for which details are shown 
 */

kony.apps.coe.ess.myTime.time_entry_retrieval_common.prototype.setSkins = function(daySelected) 
{
  try
    {
  (new kony.apps.coe.ess.myTime.CalendarViewUI()).totalSkinRefresh();
  var skinHighlightflex="";
  var skinhighlightlabel ="sknHighlightedLabel";
  switch(kony.apps.coe.ess.myTime.CalendarViewUI.status.toLowerCase())
    {
      case "pending":
      skinHighlightflex = "sknFlxfab745";
      break;
        
      case "saved" :
      skinHighlightflex = "sknFlx1c7393B";
      break;
        
      case "error" :
      skinHighlightflex = "sknFlx222ebaee";
      break;  
        
      case "rejected" :
      skinHighlightflex = "sknFlxff6e5f";
      break;  
      
      case "approved" :
      skinHighlightflex = "sknFlx00c6ad";
      break;  
        
    }

  var flexToHighlight = "flx"+daySelected;
  var labelToHighlight ="lbl"+daySelected;
  frmCalendarView[flexToHighlight].skin =skinHighlightflex;
  frmCalendarView[labelToHighlight].skin =skinhighlightlabel;
  frmCalendarView.forceLayout(); 
    }
  catch(err)
    {
      handleError(err);
    }
};

kony.apps.coe.ess.myTime.time_entry_retrieval_common.prototype.checkForSubmitStatus = function() 
{
  try
  {
    var i;
    for(i =1;i<6;i++)
    { var flex = "flxDay" + i;
      var date_object = frmCalendarView[flex].dateobject;
     (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(date_object);
    }
    
      
  }

  catch(e)
  {
  alert("Exception in checkForSubmitStatus"+e);
  }
};

kony.apps.coe.ess.myTime.time_entry_retrieval_common.prototype.submitCheck = function() 
{
 if(kony.apps.coe.ess.myTime.time_entry_retrieval_common.dayCounter ===0)
      {
        kony.apps.coe.ess.myTime.time_entry_retrieval_fromSubmit=true;
        kony.apps.coe.ess.myTime.TimesheetReview.completeReview(kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId);
        (new kony.apps.coe.ess.myTime.CalendarViewUI()).monthRefresh();   
      }
    else
      {
        alert("Please fill time entries for all the working days of this particular week");
      }
};