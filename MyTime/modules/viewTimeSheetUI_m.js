/**
 *  @author     Karthik.Cherukuri
 *  @category   UI design.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.viewTimesheet = kony.apps.coe.ess.myTime.viewTimesheet||{};
kony.apps.coe.ess.myTime.viewTimesheet.startTime = "";
kony.apps.coe.ess.myTime.viewTimesheet.endTime = "";
kony.apps.coe.ess.myTime.
ViewTimeSheetUI = function () {
  kony.print("-- Start ViewTimeSheetUI --");
  kony.print("-- End ViewTimeSheetUI --");
};


kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = false;
/**
 * @function - preShowViewTimesheet
 * @params	-void.
 * @returns	-void.
 * @desc	-This function will be executed at the preShow of the form.
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.preShowViewTimesheet = function () {
  kony.print("-- Start preShowViewTimesheet --");
  frmViewTimeSheet.btnClone.width = (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected) ? "50%" : "100%";
  kony.print("-- End preShowViewTimesheet --");
};

/**
 * @function - onClickBtnClone
 * @params	-void.
 * @returns	-void.
 * @desc	-This function displays the clone popup
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.prototype.
onClickBtnClone = function () {
  kony.print("-- Start onClickBtnClone --");
  frmViewTimeSheet.flxShadow.setVisibility(true);

  //addition of the data to the list view of the cloning


  kony.print("-- End onClickBtnClone --");
};

/**
 * @function - onClickBtnSubmitClonePopUp
 * @params	-void.
 * @returns	-void.
 * @desc	-This function will be executed on click of submit in the Clone Pop-Up
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.prototype.
onClickBtnSubmitClonePopUp = function () {
  kony.print("-- Start onClickBtnSubmitClonePopUp --");
  frmViewTimeSheet.flxShadow.setVisibility(false);
  kony.print("-- End onClickBtnSubmitClonePopUp --");
};

/**
 * @function - onClickBtnSubmitClonePopUp
 * @params	-void.
 * @returns	-void.
 * @desc	-This function will be executed on click of cancel in the Clone Pop-Up
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.prototype.
onClickBtnCancelClonePopUp = function () {
  kony.print("-- Start onClickBtnCancelClonePopUp --");
  frmViewTimeSheet.flxShadow.setVisibility(false);
  kony.print("-- End onClickBtnCancelClonePopUp --");
};

/**
 * @function - getProcessedData
 * @params	-data: json array.
 * @returns	-finalData:json array.
 * @desc	-This function gets the data from the fetch and processes that in the required format
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.
getProcessedData = function (data) {
  kony.print("-- Start getProcessedData --");
  var finalData = [];
  if(data === null || data.length <= 0){
    return finalData;
  }

  if (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(data[0].Start_Date) && kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(data[0].End_Date)) {
    var dateString = data[0].Start_Date.toString();
    var startDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
    kony.apps.coe.ess.myTime.viewTimesheet.startTime = startDate;
    var startDateFormat = startDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[startDate.getMonth()];
    dateString = data[0].End_Date.toString();
    var endDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
    kony.apps.coe.ess.myTime.viewTimesheet.endTime  = endDate;
    var endDateFormat = endDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[endDate.getMonth()];
    frmViewTimeSheet.lblSectionDate.text = startDateFormat + " - " + endDateFormat;
    frmViewTimeSheet.errordarkbackground.isVisible = false;
    switch(data[0].sheetStatus){
      case '5':
        frmViewTimeSheet.lblSectionDate.skin = "sknLblMobOp100Bg1C7393cFFFFFF";
        break;
      case '7':
        frmViewTimeSheet.lblSectionDate.skin = "sknLblMobOp100Bg2EBAEEcFFFFFF";
        break;
      case '2':
        frmViewTimeSheet.lblSectionDate.skin = "sknLblMobOp100BgFAB745cFFFFFF";
        break;
      case '0':
        frmViewTimeSheet.lblSectionDate.skin = "sknLblMobOp100Bg00C6AEcFFFFFF";
        break;
      case '4':
        frmViewTimeSheet.lblSectionDate.skin = "sknLblMobOp100BgFA713AcFFFFFF";
        break;
      case '1':
        frmViewTimeSheet.lblSectionDate.skin = "sknLblMobOp100BgFF3B30cFFFFFF";
        break;
      case '6':
        frmViewTimeSheet.lblSectionDate.skin = "sknLblMobOp100Bg2EBAEEcFFFFFF";
        frmViewTimeSheet.errordarkbackground.isVisible = true;
        break;

      default:
        handleError("Error in Status skin");
        break;
    }
  }
  frmViewTimeSheet.lblApprovedDate.text = (data[0].Created_On === null || data[0].Created_On === undefined || String(data[0].Created_On).toLowerCase()=="null")?"":data[0].Created_On;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.overtimeHours = 0;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.billableHours = 0;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.totalHours = 0;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.empId = data[0].Employee_Id;
  for(i=0;i<data.length;i++)
  {
    if(data[i].Project_Task_id=="" || data[i].Project_Task_id == null || data[i].Project_Task_id== undefined)
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
        sumOfHours = sumOfHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours)
        if(parseInt(finalGroupedData[i][j][x].ISOVERTIME) == 1){
          overtimeHours = overtimeHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours);
        }
        if(parseInt(finalGroupedData[i][j][x].isBillable) == 1){
          billableHours = billableHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours);
        }
      }
      totalHours = totalHours + sumOfHours;
      var timeentry = {};
      if(finalGroupedData[i][j][0].Project_Task_id =="")
      {
        var hours=0;
        for(k=0;k<finalGroupedData[i][j].length;k++)
        {
          hours+=parseFloat(finalGroupedData[i][j][0].Actual_Hours);
        }
        timeentry.lblTaskName=finalGroupedData[i][j][0].time_type_name;
        timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
        timeentry.lblProductiveHoursValue=parseFloat(hours).toFixed(2) +"h";
        timeentry.lblLine=" ";
        timeentry.template=flxTaskOuter;
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

        timeentry.lblProductiveHoursValue = sumOfHours.toString() + 'h';
        timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
        timeentry.template = flxOuterOne;
      }
      finalData.push(timeentry);
    }
  }
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.totalHours = totalHours;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.overtimeHours = overtimeHours;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.billableHours = billableHours;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.status = data[0].Status_Name;

  //chainging Data to the pickerview Format
  var CloningTimesheetsData = kony.apps.coe.ess.myTime.TimesheetCreate.Clone.pickerViewData(startDate);    
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
  frmViewTimeSheet.pickerViewDates.masterData=outPickOuterArray;
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.getSubmittedDate(data);
  kony.print("-- End getProcessedData --");
  return (finalData);
};

/**
 * @function - setDataToViewTimeSheet
 * @params	-data: json array.
 * @returns	-none.
 * @desc	-This function gets the processed data and bind that data to UI
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.formattingdate= function(resDate){

  if(resDate === null || resDate.length <= 0) {
    frmViewTimeSheet.lblSubmittedDate.text="-";
    return;
  }
  var date=resDate[0].SubmittedOn;
  if(date===null || date===undefined || isNaN(parseInt(date)))
  {
    frmViewTimeSheet.lblSubmittedDate.text="-";
    return;
  }
  var day = date.substring(6,8);
  var month =kony.apps.coe.ess.myTime.nToStr.fullmonth[(parseInt(date.substring(4,6))-1)];
  var year= date.substring(0,4);
  var hour=date.substring(8,10);
  var min=date.substring(10,12);
  var type;
  if(hour>=12) {
    type="PM";
  } else {
    type="AM";
  }
  if(hour > 12) {
    hour -= 12;
  }
  var finalDate=day+" "+month+" "+year+", "+hour+":"+min+" "+type;
  frmViewTimeSheet.lblSubmittedDate.text=finalDate;
};

kony.apps.coe.ess.myTime.ViewTimeSheetUI.getSubmittedDate = function(data){
  if (data === null || data.length <= 0) {
    return;
  }
  var query="select t.SubmittedOn from Timesheet t where Id='"+data[0].Timesheet_Id+"'";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME",query,
                                        kony.apps.coe.ess.myTime.ViewTimeSheetUI.formattingdate,
                                        function(err){handleError(err);});
};
kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToViewTimeSheet = function (data) {
  kony.print("-- Start setDataToViewTimeSheet --");
  frmViewTimeSheet.segTimesheet.setData(data);
  var today = new Date();
  frmViewTimeSheet.lblCurrentMonth.text = kony.apps.coe.ess.myTime.nToStr.fullmonth[today.getMonth()];
  frmViewTimeSheet.lblCurrentYear.text = today.getFullYear().toFixed(0);
  frmViewTimeSheet.lblOverTimeHoursValue.text = kony.apps.coe.ess.myTime.ViewTimeSheetUI.overtimeHours.toFixed(2);
  frmViewTimeSheet.lblTotalHoursValue.text = kony.apps.coe.ess.myTime.ViewTimeSheetUI.totalHours.toFixed(2);
  frmViewTimeSheet.lblBillableHoursValue.text = kony.apps.coe.ess.myTime.ViewTimeSheetUI.billableHours.toFixed(2);
  var status = (kony.apps.coe.ess.myTime.ViewTimeSheetUI.getStatus(kony.apps.coe.ess.myTime.ViewTimeSheetUI.status));
  frmViewTimeSheet.lblApproved.skin = status.skin;
  frmViewTimeSheet.lblApproved.text = status.text;
  if (status.centerY === "") {
    frmViewTimeSheet.lblApproved.centerY = status.centerY;
    frmViewTimeSheet.lblApprovedDate.isVisible = false;
  } else {
    frmViewTimeSheet.lblApproved.centerY = status.centerY;
    frmViewTimeSheet.lblApprovedDate.isVisible = true;
  }
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  kony.print("-- End setDataToViewTimeSheet --");
};

/**
 * @function - setDataToViewTimeSheet
 * @params	-data: json array.
 * @returns	-none.
 * @desc	-This function gets the data related to timesheet comments from fetch and processes the data into the required format.
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.
processTimesheetComments = function (commentsData) {
  function getNameInitials(name) {
    var arr=name.split(" ");
    var initials="";
    for(var i in arr) {
      var str = arr[i];
      str = str.trim();
      if(str.length > 0) {
        initials += str.charAt(0);
      }
    }
    return initials;
  }
  kony.print("-- Start processTimesheetComments --");
  var processedCommentsData = [];
  for (var i = 0; i < commentsData.length; i++) {
    var comment = {};
    var id_to_use ="";
    //#ifdef tabrcandroid
    id_to_use =kony.apps.coe.ess.myTime.CalendarViewUI.empId;
    //#endif

    //#ifdef ipad
    id_to_use =kony.apps.coe.ess.myTime.CalendarViewUI.empId;
    //#endif

    //#ifdef iphone
    id_to_use =kony.apps.coe.ess.myTime.ViewTimeSheet.empId;
    //#endif

    //#ifdef android
    id_to_use =kony.apps.coe.ess.myTime.ViewTimeSheet.empId;
    //#endif
    
    if (commentsData[i].Employee_Id === id_to_use) {
      comment.Employee_Id = commentsData[i].Employee_Id;
      comment.rtxApplier = commentsData[i].Comments;
      comment.lblCommentInitials = {isVisible : true, text : getNameInitials(commentsData[i].name)};
      comment.lblApplier = kony.i18n.getLocalizedString("i18n.ess.Comments.Applier");
      comment.imgUser = {isVisible : false};
      comment.lblApprovedDate = (commentsData[i].Added_On==="")?"":commentsData[i].Added_On;
      comment.template = flxUserComment;
    } else {
      comment.Employee_Id = commentsData[i].Employee_Id;
      comment.rtxApplier = commentsData[i].Comments;
      comment.lblApplier = commentsData[i].name;
      comment.lblCommentInitials = {isVisible : true, text : getNameInitials(commentsData[i].name)};
      comment.imgUser = {isVisible : false};
      comment.lblAppliedDate = commentsData[i].Added_On;
      comment.template = flxApproverComment;
    }
    processedCommentsData.push(comment);
  }
  kony.print("-- End processTimesheetComments --");
  return processedCommentsData;
};

/**
 * @function - setDataToTimesheetComments
 * @params	-data: json array.
 * @returns	-none.
 * @desc	-This function gets the processed data related to timesheet comments and bind that data to UI
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToTimesheetComments = function (data) {
  function success(index, base64) {
    if(base64 === null || base64 === undefined) {
      return;
    }
    var rowData = frmViewTimeSheet.segComments.data[index];
    rowData.lblCommentInitials = {isVisible : false};
    rowData.imgUser = {base64 : base64, isVisible : true};
    frmViewTimeSheet.segComments.setDataAt(rowData, index);
  }
  function error(err) {
    kony.print(err);
  }
  kony.print("-- Start setDataToTimesheetComments --");
  frmViewTimeSheet.segComments.setData(data);
  if(kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)){
    for(var i = 0; i < data.length; i++) {
      kony.apps.coe.ess.myTime.downloadEmployeeImage(data[i].Employee_Id, success.bind(this, i), error);
    }
  }
  kony.print("-- End setDataToTimesheetComments --");
};

kony.apps.coe.ess.myTime.ViewTimeSheetUI.getStatus = function (status) {
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
        "skin" : "sknlblRejected",
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
        "skin" : "sknlblSaved",
        "text" : status,
        "centerY" : "50%"
      };
      break;
    case "ERROR":
      Status = {
        "skin" : "sknlblRejected",
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
/**
 * @function - isData
 * @params	-data: String.
 * @returns	-boolean.
 * @desc	-This function validates whether given string contains proper data or not
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData = function (data) {
  kony.print("-- Start isData --");
  if (data !== null || data !== undefined || data !== "") {
    kony.print("-- End isData --");
    return true;
  } else {
    kony.print("-- End isData --");
    return false;
  }
};
/**
 * @function - cloneAllSelectedWeeks
 * @desc	-This function Clones the pending and submitted timesheets
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.cloneAllSelectedWeeks = function () {
  kony.application.showLoadingScreen("", "Cloning Timesheet", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.apps.coe.ess.myTime.getTimesheetDataForADate(new Date(frmViewTimeSheet.pickerViewDates.selectedKeyValues[0][0].split("-")[0]), function (response) {
    if (response === null || response.Status_Id === "1" || response.Status_Id === "5" || response.Status_Id === "6") {
      frmViewTimeSheet.flxShadow.setVisibility(false);
      kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimesheet(kony.apps.coe.ess.myTime.viewTimesheet.startTime, new Date(frmViewTimeSheet.pickerViewDates.selectedKeyValues[0][0].split("-")[0]),
                                                                    function (response) {
        kony.application.dismissLoadingScreen();
      }, function (error) {
        handleError(error);
        kony.application.dismissLoadingScreen();
      });
    } else {
      kony.application.dismissLoadingScreen();
      alert("Timesheet is not editable state.");
    }
  }, function (error) {
    handleError(error);
    kony.application.dismissLoadingScreen();
  });
};



/**
 * @function - onClickBackButton
 * @params	- none
 * @returns	-none
 * @desc	-This method checks where the user navigated from and which form should load on click of back button
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.
onClickBackButton = function () {
  var prevForm = kony.apps.coe.ess.myTime.ViewTimeSheet.PreviousForm.previousForm;
  if(prevForm === frmTimesheetHistory || prevForm === frmTimesheetReview){
    kony.apps.coe.ess.MyTime.Footer.SetFooterNavigation(2);
  }
  else{
    kony.apps.coe.ess.myTime.ViewTimeSheet.PreviousForm.show();
  }
};
/**
 * @function - class
 * @params	- template , parent
 * @returns	-none
 * @desc	-this method is a class for week day list for daily config on view form
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList = function (template, parent) {
  kony.print("--------start week day list class--------");
  this.data = null;
  this.template = template;
  this.parent = parent;
  this.selectedItem = null;
  this.widgetsDataMap = null;
  this.propertiesToSet = null;
  this.onSelectionCallback = null;
  kony.print("--------end week day list class--------");
};

/**
 * @function - kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList
 * @params	- none
 * @returns	-instance 
 * @desc	- returns instance of class kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.getInstance = function () {
  kony.print("--------start get instance--------");
  if(kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.singletonObj !== undefined) {
    return kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.singletonObj;
  }
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.singletonObj = new kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList(frmViewTimeSheet.flxOneDay,frmViewTimeSheet.flxweekDays);
  return kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.singletonObj;
  kony.print("--------end get instance--------");
};

/**
 * @function - call back for set skin
 * @params	- none
 * @returns	-skin data set 
 * @desc	- returns data set for skins respective status 
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.prototype.
getSkinForAStatus = function(status, isSelected) {
  kony.print("--------start getSkinForAStatus--------");
  switch(String(status)) {
    case "-1":
      return {
        "flxOneDay":"sknFlxBgfffffffOp100",
        "lblDayName" : "sknLblOp0Font777777size79",
        "lblDate" : "sknLblbgffffffOp0Font333333size114",
        "lblMonthName":"sknLblBgffffffOp0Font777777size79",
        "flxOver" : "sknFlxf8f8f8Op0",
      };
    case "1":
      return {
        "flxOneDay":isSelected === true ? "sknFlxBgfffffffOp100shadow": "sknFlxBgfffffffOp100",
        "lblDayName" : isSelected === true ? "sknLblBgff3b30Op100Fontffffffsize79" : "sknLblBgff3b30Op100Fontffffffsize79",
        "lblDate" : isSelected === true ? "sknLblBgff3b30Op100Fontffffffsize114" : "sknLblbgffffffOp0Font333333size114",
        "lblMonthName": isSelected === true ? "sknLblBgff3b30Op100Fontffffffsize79" : "sknLblBgffffffOp0Font777777size79",
        "flxOver" : "sknFlxf8f8f8Op0",
      };        
    case "0":
      return {
        "flxOneDay":isSelected === true ? "sknFlxBgfffffffOp100shadow": "sknFlxBgfffffffOp100",
        "lblDayName" : isSelected === true ? "sknLblBg00C6AEOp100Fontffffffsize79" :"sknLblBg00C6AEOp100Fontffffffsize79",
        "lblDate" : isSelected === true ? "sknLblbg00C6AEOp100Fontffffffsize114" : "sknLblbgffffffOp0Font333333size114",
        "lblMonthName": isSelected === true ? "sknLblBg00C6AEOp100Fontffffffsize79" : "sknLblBgffffffOp0Font777777size79",
        "flxOver" : "sknFlxf8f8f8Op0",
      };
    case "2":
      return {
        "flxOneDay":isSelected === true ? "sknFlxBgfffffffOp100shadow": "sknFlxBgfffffffOp100",
        "lblDayName" : isSelected === true ?  "sknLblBgfab745Op100Fontffffffsize79" :"sknLblBgfab745Op100Fontffffffsize79",
        "lblDate" : isSelected === true ?  "sknLblbgfab745Op100Fontffffffsize114" : "sknLblbgffffffOp0Font333333size114",
        "lblMonthName": isSelected === true ? "sknLblBgfab745Op100Fontffffffsize79" : "sknLblBgffffffOp0Font777777size79",
        "flxOver" : "sknFlxf8f8f8Op0",
      };
    case "5":
      return {
        "flxOneDay":isSelected === true ? "sknFlxBgfffffffOp100shadow": "sknFlxBgfffffffOp100",
        "lblDayName" :isSelected === true ? "sknLblBg1C7393Op100Fontffffffsize79" : "sknLblBg1C7393Op100Fontffffffsize79",
        "lblDate" :isSelected === true ? "sknLblbg1C7393Op100Fontffffffsize114": "sknLblbgffffffOp0Font333333size114",
        "lblMonthName":isSelected === true ? "sknLblBg1C7393Op100Fontffffffsize79" : "sknLblBgffffffOp0Font777777size79",
        "flxOver" : "sknFlxf8f8f8Op0",
      };
    case "6":
      return {
        "flxOneDay":isSelected === true ? "sknFlxBgfffffffOp100shadow": "sknFlxBgfffffffOp100",
        "lblDayName" : isSelected === true ? "sknLblBgff3b30Op100Fontffffffsize79" : "sknLblBgff3b30Op100Fontffffffsize79",
        "lblDate" : isSelected === true ? "sknLblBgff3b30Op100Fontffffffsize114" : "sknLblbgffffffOp0Font333333size114",
        "lblMonthName": isSelected === true ? "sknLblBgff3b30Op100Fontffffffsize79" : "sknLblBgffffffOp0Font777777size79",
        "flxOver" : "sknFlxf8f8f8Op0",
      };
    case "7":
      return {
        "flxOneDay":isSelected === true ? "sknFlxBgfffffffOp100shadow": "sknFlxBgfffffffOp100",
        "lblDayName" : isSelected === true ? "sknLblBg2EBAEEOp100Fontffffffsize79" : "sknLblBg2EBAEEOp100Fontffffffsize79",
        "lblDate" : isSelected === true ? "sknLblbg2EBAEEOp100Fontffffffsize114" : "sknLblbgffffffOp0Font333333size114",
        "lblMonthName": isSelected === true ? "sknLblBg2EBAEEOp100Fontffffffsize79" : "sknLblBgffffffOp0Font777777size79",
        "flxOver" : "sknFlxf8f8f8Op0",
      };
    default:
      return {};

  }
  kony.print("--------end getSkinForAStatus--------");
};

/**
 * @function - setting skins
 * @params	- status of timesheet , is selcted on view form or not 
 * @returns	-none 
 * @desc	- sets respective skin to all the label for week day list
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.prototype.
setSkinsAt = function(index, isSelected) {
  kony.print("--------start setSkinsAt--------");
  var tempData = this.data[index];
  var returnedDataForSkin = this.getSkinForAStatus(tempData.status, isSelected);
  frmViewTimeSheet[String(parseInt(index))+this.template.id].skin = returnedDataForSkin[this.template.id];
  for(i=0; i<(this.template.widgets()).length ;i++){
    frmViewTimeSheet[String(parseInt(index))+this.template.widgets()[i].id].skin = returnedDataForSkin[this.template.widgets()[i].id];
  }
  kony.print("--------end setSkinsAt--------");
};

/**
 * @function - setting data
 * @params	- data
 * @returns	-none 
 * @desc	- sets data to week day list
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.prototype.setData = function (data) {
  kony.print("--------start setData--------");
  if(data === null || data === undefined || data.length<=0){
    return ;
  }
  this.parent.removeAll();
  this.data = data;
  var tempcol;
  for (var index = 0; index < this.data.length; index++) {
    tempcol = this.template.clone(String(index));
    this.parent.add(tempcol);
    this.setSkinsAt(index, false);
    tempcol.onClick = function (index) {
      this.setSelectedItem(index);
    }
      .bind(this, index);
    var widgetlength = (tempcol.widgets()).length;
    for (var z = 0; z < widgetlength; z++) {
      tempcol.widgets()[z][this.propertiesToSet[this.template.widgets()[z].id]] = this.data[index][this.widgetsDataMap[this.template.widgets()[z].id]];
    }
  }
  this.selectedItem = null;
  kony.print("--------end setData--------");
};
/**
 * @function - set selected item
 * @params	- index
 * @returns	-none 
 * @desc	- set the given index as selected item
 */
kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.prototype.setSelectedItem = function (index){
  kony.print("--------start setSelectedItem--------");
  index = parseInt(index);
  var previousIndex = parseInt(this.selectedItem);
  if(isNaN(index) || index === previousIndex) {
    this.selectedItem = null;
  } else {
    this.selectedItem = index;
  }
  if(!isNaN(previousIndex) && previousIndex !== null) {
    this.setSkinsAt(previousIndex, false);
  }
  if(!isNaN(this.selectedItem) && this.selectedItem !== null) {
    this.setSkinsAt(this.selectedItem, true);
  }
  if(this.selectedItem === null){
    this.onSelectionCallback(this.data,this.selectedItem);
  }else{
    this.onSelectionCallback(this.data[this.selectedItem],this.selectedItem);
  }
  kony.print("--------end setSelectedItem--------");
};
