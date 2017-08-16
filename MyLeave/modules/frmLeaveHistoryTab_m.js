kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.myLeave = kony.apps.coe.myLeave || {};

//%Region - Constructor
kony.apps.coe.myLeave.leaveHistory = function() {
  
};
/*
 *@function
 *@params : none
 *@returns: none
 *@desc   :code to be executed in init of History form
 */
kony.apps.coe.myLeave.leaveHistory.prototype.initLeaveHistory = function() {
    var WidgetsArray = ["lblRequestType", "imgRequestType"];
    var SelectionBehaviourConfig = {
        "imageIdentifier": "imgRequestType",
        "selectedStateImage": "selectedtick.png",
        "unselectedStateImage": "selectgreen.png"
    };
    kony.apps.coe.myLeave.leaveHistory.leaveTypeSegements = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 4, flxFilterFormat, function() {}, WidgetsArray);
    frmHistory.flxLeaveTypes.add(kony.apps.coe.myLeave.leaveHistory.leaveTypeSegements.getDynamicSegment());
    kony.apps.coe.myLeave.leaveHistory.leaveTypeSegements.WidgetDataMap = {
        "lblRequestType": "name",
        "imgRequestType": "imgRequestType"
    };
    kony.apps.coe.myLeave.leaveHistory.statusTypeSegments = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 4, flxFilterFormat, function() {}, WidgetsArray);
    frmHistory.flxStatusTypes.add(kony.apps.coe.myLeave.leaveHistory.statusTypeSegments.getDynamicSegment());
    kony.apps.coe.myLeave.leaveHistory.statusTypeSegments.WidgetDataMap = {
        "lblRequestType": "Status_Name",
        "imgRequestType": "imgRequestType"
    };
};
  
/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : set the data to Dynamicaly created segments.
 */
kony.apps.coe.myLeave.leaveHistory.prototype.setDataToDynamicSegments = function() {
    var Response = JSON.parse(JSON.stringify(kony.apps.coe.myLeave.leaveHistory.leaveTypeResponse));
    var index;
    for (index in Response) {
        Response[index].name = {
            "text": Response[index].name,
        };
        Response[index].imgRequestType = {
            "src": "selectedtick.png",
        };
    }
    kony.apps.coe.myLeave.leaveHistory.leaveTypeSegements.setData(Response);
    var statusResponse = JSON.parse(JSON.stringify(kony.apps.coe.myLeave.leaveHistory.statusTypeResponse));
    for (index in statusResponse) {
        statusResponse[index].Status_Name = {
            "text": statusResponse[index].Status_Name,
        };
        statusResponse[index].imgRequestType = {
            "src": "selectedtick.png",
        };
    }
    kony.apps.coe.myLeave.leaveHistory.statusTypeSegments.setData(statusResponse);
};

/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : process the history data for the Segement
 */
kony.apps.coe.myLeave.leaveHistory.prototype.processHistoryData = function(res) {
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
        if (res[k].sid === "1") {
          //#ifndef windows8
            temp.lblStatus = {
                "text": kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA"),
                "skin": "sknlblff3b2fop100s28Heavy"
            };
          //#else
          temp.lblStatus = {
                "text": "Rejected",
                "skin": "sknlblff3b2fop100s28Heavy"
            };
          //#endif
                    temp.flxPendingContainer={
        "skin" : "sknFlxB1Pxff3b2fR100"
      };
        }
        else if (res[k].sid === "3") {
          //#ifndef windows8
            temp.lblStatus = {
                "skin": "sknlblff3b2fop100s28Heavy",
                "text": kony.i18n.getLocalizedString("i18n.ess.common.cancelled.valueKA")
            };
          //#else
          temp.lblStatus = {
                "skin": "sknlblff3b2fop100s28Heavy",
                "text": "Calcelled"
            };
          //#endif
                 temp.flxPendingContainer={
        "skin" : "sknFlxB1Pxff3b2fR100"
      };
        }
        else if (res[k].sid === "0") {
          //#ifndef windows8
            temp.lblStatus = {
                "skin": "sknLbl00C6ADOp100S28px",
                "text": kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA")
            };
          //#else
          temp.lblStatus = {
                "skin": "sknLbl00C6ADOp100S28px",
                "text": "Approved"
            };
          //#endif
              temp.flxPendingContainer={
        "skin" : "slnFlx00C6ADB1R100"
      };
        }
        else if (res[k].status.toLowerCase() === "submitted") {
            temp.lblStatus = {
                "skin": "sknlbl2EBAEFop100s28pxHeavy",
                "text": res[k].status.slice(0, 1).toUpperCase() + "" + res[k].status.slice(1, statusLength).toLowerCase()
            };
            temp.flxPendingContainer={
        "skin" : "sknFlx2EBAEFB1R100"
      };
        }
        else
          {
        //#ifndef windows8
        	temp.lblStatus = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
            //#else
              temp.lblStatus="Pending";
            //#endif
              temp.flxPendingContainer={
        		"skin" : "sknFlxFCAF2BRoundBorder"
      			};
          }
    
        var sdate = res[k].startDate;
        var ldate = res[k].endDate;
        temp.start_date = sdate;
        temp.end_date = ldate;
        temp.no_of_hours = res[k].hrs;
     	temp.lastmodifiedts=res[k].modified;
        var dates = parseInt(sdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(sdate.substring(4, 6) * 1) - 1).toString()] +
            " - " + parseInt(ldate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(ldate.substring(4, 6) * 1) - 1).toString()];
        temp.lblDates = dates;
        var mdate = res[k].modified;
        if (mdate === "") {
            temp.lblAppliedDate = "";
        }
        else {
            var sec = parseInt(mdate.substring(10, 12) * 1);
            if (sec < 10)
                sec = "0" + parseInt(mdate.substring(10, 12) * 1);
            var hrs = parseInt(mdate.substring(8, 10) * 1);
            var AP = "AM";
            if (hrs >= 12)
                AP = "PM";
            if (hrs > 12) {
                hrs = hrs - 12;
            }


            temp.lblAppliedDate = parseInt(mdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(mdate.substring(4, 6) * 1) - 1).toString()] +
                " " + parseInt(mdate.substring(0, 4) * 1) + " " + hrs + ":" + sec + " " + AP;
        }
        if (res[k].hrs < 7)
            temp.lblDays = res[k].hrs + " HOURS";
        else if (parseFloat(res[k].hrs) === 7.5) {
            temp.lblDays = "1 DAY";
        }
        else
        temp.lblDays = ((parseInt(res[k].hrs) * 1) / 7.5).toFixed() + " DAYS";
        temp.imgCal = "cal.png";
        temp.lblLine1 = " ";
        temp.lblLeaveId = res[k].id + "$" + sdate;
      
        myData.push(temp);
    }
    return myData;
};
/*
 *@function
 *@params : None
 *@returns: None
 *@desc   : Clears filtered data and sets default data
 */
kony.apps.coe.myLeave.leaveHistory.prototype.clearFilterHistory = function() {
    kony.print("--Start clearFilterHistory function--");
    var leaveTypeSegements=[];
    var statusTypeSegments=[];
    var index,i,SelectedCellData;
	leaveTypeSegements=kony.apps.coe.myLeave.leaveHistory.leaveTypeSegements;
    statusTypeSegments=kony.apps.coe.myLeave.leaveHistory.statusTypeSegments;
    for(i=0;i<leaveTypeSegements.Data.length;i++){
	index = leaveTypeSegements.SelectedIndexs.indexOf(i);
	leaveTypeSegements.SelectedIndexs.push(i);
	leaveTypeSegements.SelectedItems.push(leaveTypeSegements.Data[i]);
	SelectedCellData = leaveTypeSegements.Data[i];
	SelectedCellData[leaveTypeSegements.selectionBehaviorConfig.imageIdentifier] = {
		"isVisible": true,
		"src": leaveTypeSegements.selectionBehaviorConfig.unselectedStateImage
    };	
	leaveTypeSegements.setDataAtIndex(i, SelectedCellData);
    }
    for(i=0;i<statusTypeSegments.Data.length;i++){
	index = statusTypeSegments.SelectedIndexs.indexOf(i);
	statusTypeSegments.SelectedIndexs.push(i);
	statusTypeSegments.SelectedItems.push(statusTypeSegments.Data[i]);
    SelectedCellData = statusTypeSegments.Data[i];
	SelectedCellData[statusTypeSegments.selectionBehaviorConfig.imageIdentifier] = {
		"isVisible": true,
		"src": statusTypeSegments.selectionBehaviorConfig.unselectedStateImage
	};		
	statusTypeSegments.setDataAtIndex(i, SelectedCellData);
    }
    kony.apps.coe.myLeave.leaveHistory.leaveTypeSegements.SelectedItems=[];
    kony.apps.coe.myLeave.leaveHistory.statusTypeSegments.SelectedItems=[];
    frmHistory.clearlbtn.skin = "sknApplyFilterBtn";
    frmHistory.filterbtn.skin = "sknClearBtn";
    kony.print("--End clearFilterHistory function--");
};


 
kony.apps.coe.myLeave.leaveHistory.prototype.done = function() {
    kony.print("----------- in Done");
    try {
        var statuses = "";
        var leaveTypes = "";
        var statusSelected = kony.apps.coe.myLeave.leaveHistory.statusTypeSegments.SelectedItems;
        for (var i = 0; i < statusSelected.length; i++) {
            statuses = statuses + statusSelected[i].Status_Name.text;
            if (i !== statusSelected.length - 1)
            {
                statuses = statuses + ",";
            }
        }
        statuses = statuses.replace("Cancelled","Cancel");
        statuses = statuses.replace("Approved","Accepted");
        var sCondition = "";
        var status = statuses.split(",");
      if(statuses==="")
        {
          statuses="All";
        }
        var statusArray = {
            "ACCEPTED": 0,
            "REJECTED": 1,
            "PENDING": 2,
            "CANCEL": 3,
            "SENTBACK": 4,
            "SAVED": 5,
            "ERROR": 6,
            "SUBMITTED": 7
        };
        for (var i in status) {
            if (sCondition === "") sCondition = statusArray[status[i].toUpperCase()];
            else sCondition = sCondition + " , " + statusArray[status[i].toUpperCase()];
        }
        var leaveSelected = kony.apps.coe.myLeave.leaveHistory.leaveTypeSegements.SelectedItems;
        for (var i = 0; i < leaveSelected.length; i++) {
            leaveTypes = leaveTypes + leaveSelected[i].name.text;
            if (i !== leaveSelected.length - 1) {
                leaveTypes = leaveTypes + ",";
            }
        }
        var types = leaveTypes.split(",");
      if(leaveTypes==="")
        {
          leaveTypes="All";
        }
        var lCondition = "";
        for (var j in types) {
            if (lCondition === "") lCondition = "\"" + types[j] + "\" ";
            else lCondition = lCondition + " , " + "\"" + types[j] + "\" ";
        }
        var date = (frmHistory.lblFromCal.text).split(" ");
        var from = ""+date[2] + kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.month_number[date[1].toLowerCase()] + date[0];
        date = (frmHistory.lblToCal.text).split(" ");
        var to = ""+date[2] + kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.month_number[date[1].toLowerCase()] + date[0];
        var sqlquery = "";
        if (statuses === "All" || statuses === "Select status") {
            if (leaveTypes === "All" || leaveTypes === "Select leave type") sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,lt.name as leaveType from leave l,Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " order by l.start_date desc";
            else sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,lt.name as leaveType from leave l,Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and lt.name in (" + lCondition + ") and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " order by l.start_date desc";
        } else if (leaveTypes === "All" || leaveTypes === "Select leave type") sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,lt.name as leaveType from leave l,Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and s.Id in (" + sCondition + ") and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " order by l.start_date desc";
        else sqlquery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,lt.name as leaveType from leave l,Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + from + " and " + to + " and s.Id in (" + sCondition + ") and lt.name in (" + lCondition + ") and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " order by l.start_date desc";
        if (parseInt(from) <= parseInt(to))
          new kony.apps.coe.myLeave.leaveHistory().execQuery(sqlquery);
        else
            alert("Please select valid range");
    } catch (err) {
        kony.print("-----------error: " + err);
        handleError(err);
    }
    kony.print("----------- out Done");
};

kony.apps.coe.myLeave.leaveHistory.prototype.execQuery = function (sqlquery) {
	kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function (res) {
      var processedData = (new kony.apps.coe.myLeave.leaveHistory()).processHistoryData(res);
      showTabPendingListForm(processedData);
	}, function (err) {
      	handleError(err);
	}, false);
};
kony.apps.coe.myLeave.leaveHistory.prototype.selectAllLeavevTypes = function() {
};

