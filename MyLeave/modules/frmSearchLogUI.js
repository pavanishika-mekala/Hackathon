/*** @Author Rohit.Uppala@kony.com
 * @category Business Logic / Action  / UI data Binding
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.myLeave = kony.apps.coe.myLeave || {};

//%Region - Constructor
kony.apps.coe.myLeave.search = function () {};

// %Region - Methods in search
/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is onClick action for done button in frmSearchLeaveType which takes all selected leave types and populates it in the frmSearchLog .
 */

kony.apps.coe.myLeave.search.prototype.onDone = function () {
  kony.print("--------------- in onDone");

  var value = "";
  var selData = frmSearchLeaveType.segLeaveType.selectedItems;
  for (var i in selData) {
    if (value === "")
      value = selData[i].lblSearchTxt;
    else
      value = value + "," + selData[i].lblSearchTxt;
  }
  if (value === "") {
    frmSearchLog.lblLeaveTypes.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmSSearchLeaveType.lblTitle.valueKA");
    frmSearchLog.lblLeaveTypes.skin = "sknLblMob8d8faa100OFS36px";
  } else {
    frmSearchLog.lblLeaveTypes.text = value;
    frmSearchLog.lblLeaveTypes.skin = "sknlbl333333op100s36pxMedium";
  }
  frmSearchLog.show();
  kony.print("--------------- out onDone");
};

/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is onClick action for done button in frmStatusSearch which takes all selected status and populates it in the frmSearchLog .
 */

kony.apps.coe.myLeave.search.prototype.onDone2 = function () {
  kony.print("--------------- in onDone2");

  var value = "";
  var selData = frmStatusSearch.segStatus.selectedItems;

  for (var i in selData) {
    if (value === "") {
      value = selData[i].lblSearchTxt;
    }
    else {
      value = value + "," + selData[i].lblSearchTxt;
    }
  }

  if (value === "") {
    frmSearchLog.lblLeaveStatus.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmStatusSearch.lblTitle.valueKA");
    frmSearchLog.lblLeaveStatus.skin = "sknLblMob8d8faa100OFS36px";
  } else {
    frmSearchLog.lblLeaveStatus.text = value;
    frmSearchLog.lblLeaveStatus.skin = "sknlbl333333op100s36pxMedium";
  }
  frmSearchLog.show();
  kony.print("--------------- out onDone");
};

/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method clears all the selected filters and results in the frmsearchLog form
 */

kony.apps.coe.myLeave.search.prototype.clear = function () {
  kony.print("---------- in clear");

  var yyyy = parseInt(new Date().getFullYear() * 1);
  var sql = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,tr.TEXT_DISPLAY as leaveType,lt.name as leaveType1 from leave l LEFT JOIN translation tr ON ( l.leave_type_id = tr.TEXT_CODE),Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + yyyy + "0101 and " + yyyy + "1231 and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and tr.SPRAS like '"+ kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' order by l.start_date "; //desc;
  new kony.apps.coe.myLeave.search().execQuery(sql);
  frmSearchLog.calFromDate.dateComponents = [01, 01, new Date().getFullYear()];
  frmSearchLog.calFromDate.validStartDate = [01, 01, (new Date().getFullYear() - 1)];
  frmSearchLog.calFromDate.validEndDate = [31, 12, (new Date().getFullYear() + 1)];
  frmSearchLog.calToDate.dateComponents = [31, 12, new Date().getFullYear()];
  frmSearchLog.calToDate.validStartDate = [01, 01, (new Date().getFullYear() - 1)];
  frmSearchLog.calToDate.validEndDate = [31, 12, (new Date().getFullYear() + 1)];
  frmSearchLog.lblLeaveStatus.text = kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All");
  frmSearchLog.lblLeaveTypes.text = kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All");

  kony.print("----------out of clear");
};

/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method displays the reult in the segment based on the filters selected when apply is clicked.
 */

kony.apps.coe.myLeave.search.prototype.done = function (filterIcon) {

  kony.print("----------- in Done");

  try {
    var statuses = frmSearchLog.lblLeaveStatus.text;
    //statuses = statuses.replace("Cancelled","Cancel");
    //statuses = statuses.replace("Approved","Accepted");
    statuses = statuses.replace(kony.i18n.getLocalizedString("i18n.ess.common.cancelled.valueKA"),"CANCEL");
    statuses = statuses.replace(kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA"),"ACCEPTED");
    statuses = statuses.replace(kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA"),"REJECTED");
    statuses = statuses.replace(kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA"),"PENDING");
    var sCondition = "";
    var status = statuses.split(",");
    var statusArray = {"ACCEPTED":0, "REJECTED":1, "PENDING":2, "CANCEL":3, "SENTBACK":4, "SAVED":5, "ERROR":6, "Submitted":7};
    for (var i in status) {
      if (sCondition === "")
        sCondition = statusArray[status[i].toUpperCase()];
      else
        sCondition = sCondition + " , " + statusArray[status[i].toUpperCase()];
    }
    kony.print("soumya s condition val : "+sCondition);
    var leaveTypes = frmSearchLog.lblLeaveTypes.text;
    var types = leaveTypes.split(",");
    var lCondition = "";
    for (var j in types) {
      if (lCondition === "")
        lCondition = "\"" + types[j] + "\" ";
      else
        lCondition = lCondition + " , " + "\"" + types[j] + "\" ";
    }
    var sqlquery = "select Group_Concat(t1.TEXT_DISPLAY) as leavesTypseVal from translation t1  left join translation  t2 on(t1.TEXT_CODE =t2.TEXT_CODE) where   t2.TEXT_DISPLAY in ( " +lCondition +" ) and t1.SPRAS like 'NL'";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null,function(response){
      kony.print("response success "+JSON.stringify(response)+" sCondition: "+sCondition);
      var res="";
      if(response[0].leavesTypseVal != null){
      res=response[0].leavesTypseVal;
      }
      var types1 = res.split(",");
      var lCondition1 = "";
      for (var z in types1) {
        if (lCondition1 === "")
          lCondition1 = "\"" + types1[z] + "\" ";
        else
          lCondition1 = lCondition1 + " , " + "\"" + types1[z] + "\" ";
      }
      var fromYear = frmSearchLog.calFromDate.year;
      var fromMonth = frmSearchLog.calFromDate.month;
      var fromDate = frmSearchLog.calFromDate.day;
      var from = "";
      if (fromMonth < 10) {
        fromMonth = "0" + fromMonth;
      }
      if (fromDate < 10)
        fromDate = "0" + fromDate;
      from = "" + fromYear + fromMonth + fromDate;
      var toYear = frmSearchLog.calToDate.year;
      var toMonth = frmSearchLog.calToDate.month;
      if (toMonth < 10)
        toMonth = "0" + toMonth;
      var toDate = frmSearchLog.calToDate.day;
      if (toDate < 10)
        toDate = "0" + toDate;
      var to = "" + toYear + toMonth + toDate;
      var sqlquery = "";
      if (statuses === kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All") || statuses === kony.i18n.getLocalizedString("i18n.ess.myLeave.frmStatusSearch.lblTitle.valueKA")) {
        if (leaveTypes === kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All") || leaveTypes === kony.i18n.getLocalizedString("i18n.ess.myLeave.frmSSearchLeaveType.lblTitle.valueKA"))
          sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,tr.TEXT_DISPLAY as leaveType,lt.name as leaveType1 from leave l LEFT JOIN translation tr ON ( l.leave_type_id = tr.TEXT_CODE),Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and tr.SPRAS like '"+ kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' order by l.start_date "; //desc
        else
          sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,tr.TEXT_DISPLAY as leaveType,lt.name as leaveType1 from leave l LEFT JOIN translation tr ON ( l.leave_type_id = tr.TEXT_CODE),Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and lt.name in (" + lCondition1 + ") and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and tr.SPRAS like '"+ kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' order by l.start_date "; //desc
      } else if (leaveTypes === kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All") || leaveTypes === kony.i18n.getLocalizedString("i18n.ess.myLeave.frmSSearchLeaveType.lblTitle.valueKA"))
        sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,tr.TEXT_DISPLAY as leaveType,lt.name as leaveType1 from leave l LEFT JOIN translation tr ON ( l.leave_type_id = tr.TEXT_CODE),Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and s.Id in (" + sCondition + ") and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and tr.SPRAS like '"+ kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' order by l.start_date "; //desc
      else
        sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,tr.TEXT_DISPLAY as leaveType,lt.name as leaveType1 from leave l LEFT JOIN translation tr ON ( l.leave_type_id = tr.TEXT_CODE),Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and s.Id in (" + sCondition + ") and lt.name in (" + lCondition1 + ") and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and tr.SPRAS like '"+ kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' order by l.start_date "; //desc
      kony.print("soumya abcd"+sqlquery);
      if (parseInt(from) <= parseInt(to))
        new kony.apps.coe.myLeave.search().execQuery(sqlquery,filterIcon);
      
    }, function(err) {
      handleError(err);
    }, false);
  } catch (err) {
    kony.print("-----------error: " + err);
    handleError(err);
  }

  kony.print("----------- out Done");
};
/**
 * @class       search
 * @type        UI
 * @param       SQL query
 * return       None.
 * desc         This method executes a query
 */

kony.apps.coe.myLeave.search.prototype.execQuery = function (sqlquery,filterIcon) {

  kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function (res) {

    var myData = [];

    for (var k in res) {

      var temp = {};
      temp.lblLeaveType = res[k].leaveType;

      /* Status id       Status
			0			Accepted
			1			Rejected
			2			Pending
			3			Cancel
			 */
      var statusLength = res[k].status.length;
      if (res[k].sid === "1" ) {
        temp.lblStatus = {
          "text" : kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA"),
          "skin" : "sknlblff3b2fop100s28Heavy"
        };
      } 
      else if (res[k].sid === "3") {
        temp.lblStatus = {
          "skin" : "sknlblff3b2fop100s28Heavy",
          "text" : kony.i18n.getLocalizedString("i18n.ess.common.cancelled.valueKA")
        };
      }
      else if (res[k].sid === "6" ) {
        temp.lblStatus = {
          "text" : kony.i18n.getLocalizedString("i18n.ess.common.error.valueKA"),
          "skin" : "sknlblff3b2fop100s28Heavy"
        };
      } 

      else if (res[k].sid === "0") {
        temp.lblStatus = {
          "skin" : "sknLbl00C6ADOp100S28px",
          "text" : kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA")
        };
      } else if (res[k].status.toLowerCase() === "submitted") {
        temp.lblStatus = {
          "skin" : "sknlbl2EBAEFop100s28pxHeavy",
          //"text" : res[k].status.slice(0, 1).toUpperCase() + "" + res[k].status.slice(1, statusLength).toLowerCase()
          "text" : kony.i18n.getLocalizedString("i18n.ess.common.submitted.valueKA")
        };
      } else
        temp.lblStatus = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
      var sdate = res[k].startDate;
      var ldate = res[k].endDate;
      temp.startDate = sdate;
      temp.endDate = ldate;
      var dates = parseInt(sdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(sdate.substring(4, 6) * 1) - 1).toString()] +
          " - " + parseInt(ldate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(ldate.substring(4, 6) * 1) - 1).toString()];
      temp.lblDates = dates;
      var mdate = res[k].modified;
      if (mdate === "") {
        temp.lblAppliedDate = "";
      } else {
        var sec = parseInt(mdate.substring(10, 12) * 1);
        if (sec < 10)
          sec = "0" + parseInt(mdate.substring(10, 12) * 1);
        var hrs = parseInt(mdate.substring(8, 10) * 1);
        var AP ="";
//         var AP = "AM";
//         if (hrs >= 12)
//           AP = "PM";
//         if (hrs > 12) {
//           hrs = hrs - 12;
//         }


        temp.lblAppliedDate = parseInt(mdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(mdate.substring(4, 6) * 1) - 1).toString()] +
          " " + parseInt(mdate.substring(0, 4) * 1) + " " + hrs + ":" + sec + " " + AP;
      }
      if (res[k].hrs < 7)
        temp.lblDays = (res[k].hrs+kony.i18n.getLocalizedString("i18n.ess.myLeave.frmLeaveHome.Hours")).replace(".", ",");
      else if(parseFloat(res[k].hrs)===7.5){
        temp.lblDays = "1 "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.day");
      }
      else
        temp.lblDays = ((parseInt(res[k].hrs) * 1) / 7.5).toFixed() + " "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
      temp.imgCal = "cal.png";
      temp.lblLine1 = " ";
      temp.lblLeaveId = res[k].id + "$" + sdate;
      if (res[k].sid === "0") {
        temp.flxDelete = {
          "skin" : "sknflxbgFF6E5Fop100",
          "left" : "0%",
          "width" : "100%"
        };
        temp.imgDelete = "cancel_white.png";
        temp.flxEdit = {
          "isVisible" : false
        };
      } else if (res[k].sid === "3"|| res[k].sid === "1") {
        temp.flxEdit = {
          "skin" : "sknflxbg1C7393op100",
          "width" : "100%"
        };
        temp.imgEdit = "add.png";
        temp.flxDelete = {
          "isVisible" : false
        };
      } else {
        temp.flxEdit = "sknflxbg1C7393op100";
        temp.flxDelete = "sknflxbgFF6E5Fop100";
        temp.imgEdit = "edit_white.png";
        temp.imgDelete = "cancel_white.png";
      }

      myData.push(temp);

    }
	if(myData.length != null && myData.length >0){
       frmSearchLog.segList.setData(myData);
       frmSearchLog.segList.setVisibility(true);
       frmSearchLog.lblNoRecords.setVisibility(false);
    }else{
       frmSearchLog.segList.setVisibility(false);
       frmSearchLog.lblNoRecords.setVisibility(true);
    }
    //frmSearchLog.segList.isVisible = true;
    frmSearchLog.flxSelection.isVisible = false;
    frmSearchLog.flxReqType.isVisible = false;
    frmSearchLog.flxStatus.isVisible = false;
    frmSearchLog.flxSearchLeaveType.isVisible = false;
    frmSearchLog.flxDoneButton.isVisible = false;
    frmSearchLog.segList.height="91%";
    if(filterIcon === "selectedFilterIcon"){
      frmSearchLog.imgFilter.src = "filter_selected.png";
    }else{
      frmSearchLog.imgFilter.src = "filter.png";
    }  
  }, function (err) {
    handleError(err);
  }, false);
};


/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method navigates to the frmLeaveRequestDetails
 */

kony.apps.coe.myLeave.search.prototype.rowClick = function () {

  kony.print("--------------- in rowClick");
  try{
    var leave_id = (frmSearchLog.segList.selectedRowItems[0].lblLeaveId).split("$")[0];
    kony.apps.coe.ess.myLeave.leaveRequestDetails.showForm(leave_id);
  }catch(err){
    handleError(err);
  }
  kony.print("--------------- out of rowClick");
};

/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method shows the filter options
 */

kony.apps.coe.myLeave.search.prototype.filter = function () {
  if(frmSearchLog.imgFilter.src === "filter_selected.png" && frmSearchLog.flxSelection.isVisible){
    frmSearchLog.flxSelection.isVisible = false;
    frmSearchLog.flxReqType.isVisible = false;
    frmSearchLog.flxStatus.isVisible = false;
    frmSearchLog.flxSearchLeaveType.isVisible = false;
    frmSearchLog.flxDoneButton.isVisible = false;
    frmSearchLog.imgFilter.src = "filter.png";
    frmSearchLog.segList.height="91%";
    (new kony.apps.coe.myLeave.search()).clear(); //clears all selection
  } else if((!frmSearchLog.flxSelection.isVisible && frmSearchLog.imgFilter.src === "filter_selected.png") ||
            frmSearchLog.imgFilter.src === "filter.png"){
    frmSearchLog.flxSelection.isVisible = true;
    frmSearchLog.flxReqType.isVisible = true;
    frmSearchLog.flxStatus.isVisible = true;
    frmSearchLog.flxSearchLeaveType.isVisible = true;
    frmSearchLog.flxDoneButton.isVisible = true;
    frmSearchLog.imgFilter.src = "filter_selected.png";
    frmSearchLog.segList.height="46%";
  }
};

/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method sets valid start date
 */

kony.apps.coe.myLeave.search.prototype.setValidDate = function () {
  frmSearchLog.calToDate.validStartDate = [frmSearchLog.calFromDate.day, frmSearchLog.calFromDate.month, frmSearchLog.calFromDate.year];
  var dateDay = frmSearchLog.calFromDate.day <= 9 ? "0" + frmSearchLog.calFromDate.day : frmSearchLog.calFromDate.day;
  var dateMonth = frmSearchLog.calFromDate.month <= 9 ? "0" + frmSearchLog.calFromDate.month : frmSearchLog.calFromDate.month;

  from = "" + frmSearchLog.calFromDate.year + dateMonth + dateDay;

  dateDay = frmSearchLog.calToDate.day <= 9 ? "0" + frmSearchLog.calToDate.day : frmSearchLog.calToDate.day;
  dateMonth = frmSearchLog.calToDate.month <= 9 ? "0" + frmSearchLog.calToDate.month : frmSearchLog.calToDate.month;

  to = "" + frmSearchLog.calToDate.year + dateMonth + dateDay; 
  if (parseInt(from) > parseInt(to))
    frmSearchLog.calToDate.dateComponents = [frmSearchLog.calFromDate.day, frmSearchLog.calFromDate.month, frmSearchLog.calFromDate.year];
};

/**
 * @class       search
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method store the previous form value
 */

kony.apps.coe.myLeave.search.prototype.storePreviousForm = function () {
  var prevForm = kony.application.getPreviousForm();
  if(prevForm.id != "frmAuditTrail"){
    kony.apps.coe.myLeave.search.prevFormName = prevForm;
  }
};
