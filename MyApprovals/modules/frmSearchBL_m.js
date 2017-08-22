/***@Author Sumeet.bartha@kony.com
 * @category data Binding / Business Logic
 * @desc  RequestedList class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

/*
 *@class	:	frmSearchBackendLogic
 */
kony.apps.coe.ess.Approvals.frmSearchBackendLogic = function () {};
/*
 *@function
 * @class	 :  frmSearchBackendLogic
 * @param    :  [Array] - Array of JSON to map to widgetmap
 * @returns	 :	None
 * @desc	 :	Process the Data
 */
kony.apps.coe.ess.Approvals.frmSearchBackendLogic.prototype.ProcessData = function(data)
{
 kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.ProcessData");
		var newData = [];
		if (isEmpty(data)) {
			return;
		}
		for (var i = 0; i < data.length; i++) {
          if(data[i].type_id == "LEAVEREQ")
             {
             data[i].imgPurpose = {src:"leave_detail.png"};
             }else if(data[i].type_id == "EXPENSES")
             {
             data[i].imgPurpose = {src:"expense_details.png"};
             }else if(data[i].type_id == "TIMESHEET")
             {
             data[i].imgPurpose = "time_detail.png";
             }else if(data[i].type_id == "WORKORDER")
             {
                data[i].imgPurpose = {src:"work_order_details.png"};
             }else if(data[i].type_id == "PURCHORDER")
             {
                data[i].imgPurpose = {src:"purchase_order_in_details.png"};
             }
       			else{
                  data[i].imgPurpose = {src:"expense_details.png"};
                }
				data[i]["imgUser"] = {
					src : "people.png"
				};
          var formatDateObj = new kony.apps.coe.ess.Approvals.RequestedListBackendlogic();
          var dateformat = "";
          try{
          dateformat = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Due_Date.Format");
          }catch(i18nerror)
            {
              handleError(i18nerror);
              kony.print("---------------------------i18nFetchError ------frmRequestedListBL_m Line 40");
            }
				data[i].Request_date = formatDateObj.FormatDate(data[i].request_date,kony.i18n.getLocalizedString( "i18n.ess.MyApprovals.common.Applied_Date.Format"));
				data[i].due_date = formatDateObj.FormatDate(data[i].due_date, dateformat);
				var labels = (data[i].labels).split(",");
				var values = (data[i].values).split(",");

				for (var j = 0; j < labels.length; j++) {
					var templbl = labels[j].replace(/\s+/g, '-');
					data[i][templbl] = values[j];
				}
         
					newData.push(formatDateObj.CheckForExpenseOrDates(data[i]));
		}
		kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.ProcessData");
		return newData;
};
/*
 *@function
 * @class	 :  frmSearchBackendLogic
 * @param    :  [Array] - Array of JSON to map to widgetmap
 * @returns	 :	None
 * @desc	 :	bind the Data
 */
kony.apps.coe.ess.Approvals.frmSearchBackendLogic.prototype.bindData = function(data)
{
   var widgetDataMap = {
        "imgUser": "imgUser",
        "lblCreatedDate": "Request_date",
        "lblName": "fullName",
        "lblPurpose": "category_type",
        "lblApproved": "status_name",
     	"lblIntials":"lblIntials",
        "lblExpense": "FromTo",
     	"imgPurpose":"imgPurpose"
      };  
      frmSearch.segList.widgetDataMap = widgetDataMap;
  if(data!=="" && data!==null) {
      frmSearch.segList.setData(data);
  }
  else
    {
       frmSearch.segList.removeAll();
    }
     	var mediaobj = new kony.apps.coe.ess.MyApprovals.media();
        mediaobj.fetchImage2(frmSearch.segList,"imgUser");

};
/*
 *@function
 * @class	 :  frmSearchBackendLogic
 * @returns	 :	None
 * @desc	 :	expand the filter segment
 */
kony.apps.coe.ess.Approvals.frmSearchBackendLogic.prototype.onClickFilterIcon = function()
{
  frmSearch["flxSearchContainer"].animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "height": "0%"
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
    }, {
        "animationEnd": function(){
     frmSearch.lblHeader.text = "History";   
    frmSearch.flxClear.setVisibility(false);
    frmSearch.flxHide.setVisibility(true);
        }
    });
};
/*
 *@function
 * @class	 :  frmSearchBackendLogic
 * @returns	 :	None
 * @desc	 :	expand the filter segment
 */
kony.apps.coe.ess.Approvals.frmSearchBackendLogic.prototype.onClickofFilterLabel  = function()
{
  frmSearch["flxSearchContainer"].animate(
    kony.ui.createAnimation({
        "100": {
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            },
            "height": "46.9%"
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
    }, {
        "animationEnd": function(){
     frmSearch.lblHeader.text = "Search";    
    frmSearch.flxClear.setVisibility(true);
    frmSearch.flxHide.setVisibility(false);
        }
    });
  
};

kony.apps.coe.ess.Approvals.frmSearchBackendLogic.prototype.CreateQuery = function()
{
 try{ 
   frmSearch.flxSearchContainer.height=0;//docking the filter flex on click of search icon
    frmSearch.flxClear.setVisibility(false);
    frmSearch.flxHide.setVisibility(true);
  var fromDate = new Date(frmSearch.calFromDate.year , frmSearch.calFromDate.month -1 ,frmSearch.calFromDate.day);
  fromDate = fromDate.getDateInFormat("yyyymmdd"); 
  var toDate = new Date(frmSearch.calToDate.year , frmSearch.calToDate.month -1 ,frmSearch.calToDate.day);
  toDate = toDate.getDateInFormat("yyyymmdd");
  var query ="select e.Media_Id as media_id,ar.IsLater , ar.request_id as 'Req_id' ,ar.id, s.Status_Name as 'status_name', rc.name as 'category_type', ar.employee_id, ar.request_date, reqT.name AS 'request_type', (e.first_name || ' ' || e.Middle_Name || ' ' || e.Last_Name) as 'fullName', ar.status_id, ar.due_date, ar.type_id, group_concat(ad.label) as 'labels', group_concat(at.value) as 'values' from approval_request ar LEFT JOIN Employee e ON ar.employee_id = e.Id LEFT JOIN attribute at ON ar.id = at.approval_id LEFT JOIN attribute_def ad ON ad.id = at.attribute_def_id LEFT JOIN request_type reqT ON reqT.id = ar.type_id LEFT JOIN request_category rc ON ar.category_id = rc.id LEFT JOIN attribute_section aTs ON ad.attribute_section_id = aTs.id LEFT JOIN status s ON ar.status_id = s.id where aTs.TYPE = 'SUMMARY' AND (ar.request_date > '"+fromDate+"') AND (ar.request_date<= '"+toDate+"') ";
  var requestType =  frmSelect.SegRequestsType.selectedRowItems;
  var statusType = frmSelect.SegStatusType.selectedRowItems;
  var totalPeoples = frmSelect.segSearchPeople.selectedRowItems;
  //-------------Query addition for Request_Type
	if(requestType!=null && requestType!="" && requestType.length>0&&requestType[0].id!="All")
      {
        query += "AND (";
        for(var i = 0 ;i < requestType.length ; i++)
          {
            if(i==0)
            {
            query+= " ar.type_id = '"+requestType[i].id+"'";
            }
            else
              {
                query+=" OR ar.type_id='"+requestType[i].id+"'";
              }
          }
        query += ")";
      }
  //-------------Query addition for Status_type
  if(statusType!=null && statusType!="" && statusType.length>0&&statusType[0].id!="All")
      {
        query += "AND (";
        for(var i = 0 ;i < statusType.length ; i++)
          {
            if(i==0)
            {
            query+= " s.Id = '"+statusType[i].id+"'";
            }
            else
              {
                query+=" OR s.Id='"+statusType[i].id+"'";
              }
          }
        query += ")";
      }
  //-------------Query addition for Status_type
  if(totalPeoples!=null && totalPeoples!="" && totalPeoples.length>0&&totalPeoples[0].id!="All")
      {
        query += "AND (";
        for(var i = 0 ;i < totalPeoples.length ; i++)
          {
            if(i==0)
            {
            query+= " e.id = '"+totalPeoples[i].id+"'";
            }
            else
              {
                query+=" OR e.id='"+totalPeoples[i].id+"'";
              }
          }
        query += ")";
      }
  query+=" GROUP BY ar.id ORDER BY ar.request_date;";
  var successcallback = function(result)
  {
    //alert("SCBACK"+JSON.stringify(result));
    var data = this.ProcessData(result);
    this.bindData(data);
    
  }
  var errorCallback = function(resp)
  {
    handleError(resp);
  }
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS",query,successcallback.bind(this),errorCallback);
 }  catch(e)
    {
      handleError(e);
    }
};

/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on rowClick of segment in frmSearch
 */
kony.apps.coe.ess.Approvals.frmSearchBackendLogic.prototype.segmentRowClick = function()
{
  var data = frmSearch.segList.selectedRowItems[0];
   var obj = new kony.apps.coe.ess.Approvals.ExpenseReportDetail();
   var ObjBackend = new kony.apps.coe.ess.Approvals.RequestedDetailBackend();
  kony.apps.coe.ess.Approvals.ExpenseReportDetail.Request_Id = data.id;
  kony.apps.coe.ess.Approvals.RequestedDetailBackend.Request_type = data.request_type;
  kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_id = data.Req_id;
  kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_type_id = data.type_id;

  
  kony.print("----------------------- selected data ::" + JSON.stringify(data));
  if (data.request_type == "LEAVE") {
    data.HeaderText = "Leave Request Details";
    data.TypeOfRequest = "Leave";
    data.TypeIcon = "leave_item.png";
    frmExpenseReportDetail.lblStatus.isVisible = false;
    obj.changeSkins("Leave");
  }
  else if (data.request_type == "TIMESHEET") {
    data.HeaderText = "Time Request Details";

    data.TypeOfRequest = "Timesheet";
    data.TypeIcon = "time_item.png";
    frmExpenseReportDetail.lblStatus.isVisible = false;
      obj.changeSkins("Time");
  }
  else if (data.request_type == "EXPENSES") {
    data.HeaderText = "Expense Request Details";
    data.TypeOfRequest = "Expense";
    //data.requestedAmonut = data.value;
    data.TypeIcon = "expense_item.png";
    data.lblStatus = "";
    frmExpenseReportDetail.lblDetail.isVisible = true;
    frmExpenseReportDetail.lblStatus.isVisible = true;
    obj.changeSkins("Expense");
  }else if(data.request_type == "PURCHASEORDER")
    {
       data.HeaderText = "Purchase Order Details";
    data.TypeOfRequest = "PURCHASEORDER";
    //data.requestedAmonut = data.value;
    data.TypeIcon = "purchase_order_in_details.png";
    data.lblStatus = "";
    frmExpenseReportDetail.lblDetail.isVisible = true;
    obj.changeSkins("Purchase Order");
      frmExpenseReportDetail.lblStatus.isVisible = false;
    }else if(data.request_type == "WORKORDER")
  {
     data.HeaderText = "Work Order Details";
    data.TypeOfRequest = "WORKORDER";
    //data.requestedAmonut = data.value;
    data.TypeIcon = "work_order_details.png";
    data.lblStatus = "";
    frmExpenseReportDetail.lblDetail.isVisible = true;
    obj.changeSkins("Work Order");
    frmExpenseReportDetail.lblStatus.isVisible = false;
  }
  frmExpenseReportDetail.forceLayout();
  kony.apps.coe.ess.globalVariables.prevForm = frmSearch;
  obj.showFormUsingMVVM(data);
};
