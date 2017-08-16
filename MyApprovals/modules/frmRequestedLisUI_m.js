/*** @Author Sumeet.bartha@kony.com
 * @category UI data Binding
 * @desc  RequestedList class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.RequestedLists=kony.apps.coe.ess.Approvals.RequestedLists ||{};
kony.apps.coe.ess.Approvals.RequestedLists.MakeSegmentMultipleSelect=function(){
  try{
    
  //Navigate to the multi Select form
    
    var WidgetDatamap = {
					"lblShortName" : "CreatedUserShortName",
					//"imgCategory" : "requestTypeImage",
					"lblUserName" : "UserName",
					"lblCreateDate" : "RequestDate",
					"lblDueDateValue" : "dueDate",
					"lblRequestInfo" : "RequestInfo",
					"btnAdditionalInfo" : "AdditionalData",
					"flxTimer" : "FlxTimerUi",
					"lblCategory" : "category",
					//"flxBorder1" : "requestTypeBorderSkin",
					//"flxBorder2" : "requestTypeBorderSkin2",
					//"imgLeaveInfo" : "requestTypeInfoImage",
					"lblRemainingHours" : "remaingHours",
                  	"imgSelection":"imgSelection",
      				"imgUser" : "imgUser"
				};
				frmMultiSelection.SegDetails.widgetDataMap = WidgetDatamap;
    			var data=frmRequestedList.SegDetails.data;
    	
    			for(var index in data){
          			data [index] ["imgSelection"] ="select.png";
		        }    		
    			frmMultiSelection.SegDetails.setData(data);
  				frmMultiSelection.show();
  }catch(e){
    popupErrorAlert.lblMessage.text=e.message;
    popupErrorAlert.show();
    
  }
};




/*
 *@class	:	RequestedList
 */
kony.apps.coe.ess.Approvals.RequestedList = function () {};
// - @variables
kony.apps.coe.ess.Approvals.RequestedList.OnSearchClickData = "";
kony.apps.coe.ess.Approvals.requestedtype = "";
kony.apps.coe.ess.Approvals.formType = "";
kony.apps.coe.ess.Approvals.FilterData = "";
/*
 *@function
 * @class	 :  RequestedList
 * @param    :  {String} RequestType  -Leave / Expense / Time.
 * @param    :  {String} formType - Filter / Request
 * @returns	 :	None
 * @desc	 :	Load the data and shows form
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.ShowFormUsingMVVM = function (RequestType, formType) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.ShowFormUsingMVVM");
	if (isEmpty(RequestType) || isEmpty(formType)) {
		return;
	}
  var navType = "";
	var requestTypeObj = "";
	if (RequestType == "Leave") {
		requestTypeObj = "LEAVE";
      navType = "LEAVEREQ";
	} else if (RequestType == "Time") {
		requestTypeObj = "TIMESHEET";
      navType = "TIMESHEET";
	} else if (RequestType == "Expense") {
		requestTypeObj = "EXPENSES";
      navType = "EXPENSES";
	} else if (RequestType == "All") {
		requestTypeObj = "All";
      navType = "All";
	}else if(RequestType == "Purchase Order")
      {
        requestTypeObj = "PURCHORDER";
      navType = "PURCHORDER";
      }else if(RequestType == "Work Order")
      {
        requestTypeObj = "WORKORDER";
      navType = "WORKORDER";
      }
	kony.apps.coe.ess.Approvals.requestedtype = requestTypeObj;
	kony.apps.coe.ess.Approvals.formType = formType;
	kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedList.prototype.ShowFormUsingMVVM");
	if (formType != "Filter") {
       var navObj = new kony.sdk.mvvm.NavigationObject();
  var qp = {
    "requestType": navType
  };
  navObj.setQueryParams("SegDetails", qp);
		var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmRequestedList");
		formController.loadDataAndShowForm();
	}
};
/*
 *@function
 * @class	 :  RequestedList
 * @param    :  {JSON} Data  - Data of request.
 * @param    :  {JSON} skinObj - skins to be set to form. key : value :: widgetName : skinName
 * @returns	 :	None
 * @desc	 :	Load the request and shows form
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.LoadRequestAndShowForm = function (RequestType) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.LoadRequestAndShowForm");
	frmRequestedList.flxLaterFilter.isVisible = true;
	frmRequestedList.lblClear.isVisible = true;
	frmRequestedList.flxFilterBar.isVisible = false;
	frmRequestedList.forceLayout();
	var headerText = RequestType + " Request";
	frmRequestedList.lblHeader.text = headerText;
	this.ShowFormUsingMVVM(RequestType, "Request");
	frmRequestedList.txtbxLooseFocus.setFocus(true);
	this.OnChangeOfFilter(RequestType);
	frmRequestedList.tbxLaterFilter.onBeginEditing = this.OnSearchClick.bind(this);
	frmRequestedList.tbxLaterFilter.onTextChange = this.OnSearchtextChange.bind(this);

	kony.print("--------------EXIING - kony.apps.coe.ess.Approvals.RequestedList.prototype.LoadRequestAndShowForm");
};
/*
 *@function
 *@class	:	RequestedList
 * @param    :  {Array} data - Data to be set to segment.
 *@returns	:	None
 *@desc		:	Sets Data to the Segment.
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.applyDataToSegment = function (widgetDataMap, Data) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.applyDataToSegment");
	try {
		if (isEmpty(Data) || isEmpty(widgetDataMap)) {
			return;
		}
      for(var i = 0 ;i < Data.length ; i++)
        {
       var RequestType = kony.apps.coe.ess.Approvals.requestedtype;
          if (RequestType == "LEAVE") {
		Data[i].template = flxrequestleave;
			} else if (RequestType == "TIMESHEET") {
		Data[i].template = flxRequestsTimesheet;
			} else if (RequestType == "EXPENSES") {
		Data[i].template = flxContainer;
			} else if (RequestType == "WORKORDER") {
		Data[i].template = flxRequestsWO;
			} else if (RequestType == "PURCHASEORDER") {
		Data[i].template = flxRequestsPO;
			} 
          else {
		Data[i].template = flxContainer;
        }
          
	}
		frmRequestedList.SegDetails.widgetDataMap = widgetDataMap;
		frmRequestedList.SegDetails.setData(Data);
		frmRequestedList.SegDetails.onRowClick = this.onRowClickOfSegRequest.bind(this);
		kony.print("-------------------------Data set to frmRequestedList.segDetails" + JSON.stringify(Data));
		kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedList.prototype.applyDataToSegment");
	} catch (e) {
		handleError(e);
	}
};
/*
 *@function
 * @class	 :  RequestedList
 * @param    :  {JSON} Data  - Data of request.
 * @param    :  {JSON} skinObj - skins to be set to form. key : value :: widgetName : skinName
 * @returns	 :	None
 * @desc	 :	Load the Filter and shows form
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.LoadFilterAndShowForm = function (RequestType, Mydata) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.LoadFilterAndShowForm");
	var data = "";
	if (Mydata == undefined || Mydata == null) {
		data = kony.apps.coe.ess.Approvals.FilterData;
	} else {
		data = Mydata;
		kony.apps.coe.ess.Approvals.FilterData = Mydata;
	}
	var newData = [];
	var datatype = "All";
	frmRequestedList.flxFilterBar.isVisible = true;
	frmRequestedList.lblHeader.text = "Filter Request";
	frmRequestedList.lblClear.isVisible = false;
	frmRequestedList.flxLaterFilter.isVisible = false;
	this.ShowFormUsingMVVM(RequestType, "Filter"); //frmRequestedUI_Data_Leave);
	this.OnChangeOfFilter(RequestType);
	if (RequestType == "Leave") {
		datatype = "LEAVE";
	} else if (RequestType == "Time") {
		datatype = "TIMESHEET";
	} else if (RequestType == "Expenses"||RequestType=="Expense") {
		datatype = "EXPENSES";
	}else if(RequestType == "Purchase Order")
      {
        datatype = "PURCHORDER";
      }
    else if(RequestType == "Work Order")
      {
        datatype = "WORKORDER";
      }
	if (RequestType != "All") {
		for (var i = 0; i < data.length; i++) {
			if (data[i].request_type == datatype) {
				newData.push(data[i]);
			}
		}
		(new kony.apps.coe.ess.Approvals.RequestedListBackendlogic()).bindData(newData);
      	if(newData!=undefined && newData!=null && newData.length>0)
              {
                	(new kony.apps.coe.ess.MyApprovals.media()).fetchImage2(frmRequestedList.SegDetails,"imgSrcDet");
              }
	} else {
		(new kony.apps.coe.ess.Approvals.RequestedListBackendlogic()).bindData(data);
      if(data!=undefined && data!=null && data.length>0)
              {
                	(new kony.apps.coe.ess.MyApprovals.media()).fetchImage2(frmRequestedList.SegDetails,"imgSrcDet");
              }
	}
	if (isEmpty(RequestType) || data.length == 0) {
		return;
	}
	kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedList.prototype.LoadFilterAndShowForm");
};
/*
 *@function
 * @class	 :  RequestedList
 * @param    :  {JSON} Data  - Data of request.
 * @param    :  {JSON} skinObj - skins to be set to form. key : value :: widgetName : skinName
 * @returns	 :	None
 * @desc	 :	Load the Filter and shows form
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.onRowClickOfSegRequest = function () {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.onRowClickOfSegRequest");
	var obj = new kony.apps.coe.ess.Approvals.ExpenseReportDetail();
	kony.apps.coe.ess.globalVariables.prevForm = frmRequestedList;
	var data = frmRequestedList.SegDetails.selectedRowItems[0];
	kony.apps.coe.ess.Approvals.ExpenseReportDetail.Request_Id = data.id;
	kony.apps.coe.ess.Approvals.RequestedDetailBackend.Request_type = data.request_type;
	kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_id = data.Req_id;
	kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_type_id = data.type_id;
	if (data.request_type == "LEAVE") {
		data.HeaderText = "Leave Request Details";
		data.TypeOfRequest = "Leave";
		data.TypeIcon = "leave_item.png";
        frmExpenseReportDetail.lblDetail.isVisible = true;
		frmExpenseReportDetail.lblStatus.isVisible = false;
		obj.changeSkins("Leave");
	}
	else if (data.request_type == "TIMESHEET") {
		data.HeaderText = "Time Request Details";

		data.TypeOfRequest = "Timesheet";
		data.TypeIcon = "time_item.png";
        frmExpenseReportDetail.lblDetail.isVisible = true;
		frmExpenseReportDetail.lblStatus.isVisible = false;
		obj.changeSkins("Time");
	}
	else if (data.request_type == "EXPENSES") {
		data.HeaderText = "Expense Request Details";
		data.TypeOfRequest = "Expense";
		data.TypeIcon = "expense_item.png";
		data.lblStatus = "";
		frmExpenseReportDetail.lblDetail.isVisible = false;
		frmExpenseReportDetail.lblStatus.isVisible = false;
		obj.changeSkins("Expense");
	}else if(data.request_type == "PURCHORDER")
      { 
        data.HeaderText = "Purchase Order Details";
		data.TypeOfRequest = "Purchase Order";
		data.TypeIcon = "purchase_order_in_list.png";
		frmExpenseReportDetail.lblDetail.isVisible = false;
		frmExpenseReportDetail.lblStatus.isVisible = false;
		obj.changeSkins("Purchase Order");
      }else if(data.request_type == "WORKORDER")
      {
         data.HeaderText = "Work Order  Details";
		data.TypeOfRequest = "Work Order";
		data.TypeIcon = "work_order_details.png";
		frmExpenseReportDetail.lblDetail.isVisible = false;
		frmExpenseReportDetail.lblStatus.isVisible = false;
		obj.changeSkins("Work Order");
 
      }
	frmExpenseReportDetail.forceLayout();
	obj.showFormUsingMVVM(data);
	kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedList.prototype.onRowClickOfSegRequest");
};

/*
 *@function
 * @class	:	RequestedList
 * @param    :  {String} src - Name of Filter.
 * @returns	:	None
 * @desc		:	Changes the skins on Change of Filter
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.OnChangeOfFilter = function (src) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.OnChangeOfFilter");
	if (isEmpty(src)) {
		return;
	}
	if (src == "Leave") {
      frmRequestedList.lblWO.skin = "sknlbl0284B5ffpx32";
         frmRequestedList.lblPO.skin  = "sknlbl084A52ffpx32";
      	frmRequestedList.imgPeople.src = "search_leave.png";
        frmRequestedList.filterLaterImg.src = "search_leave.png";
		frmRequestedList.lblLeave.skin = "sknlbl08452FFPX32ROUND";
		frmRequestedList.lblTime.skin = "sknlbl1D2652ffpx32";
		frmRequestedList.lblAll.skin = "sknlbl084A52ffpx32";
		frmRequestedList.lblExpense.skin = "sknlbl1D2652ffpx32";
		frmRequestedList.flxFilterBar.skin = "sknFlxMob7986cb1090";
		frmRequestedList.flxLaterFilter.skin = "sknFlxMob7986cb1090";
		frmRequestedList.flxHeader.skin = "sknFlxMob7986cb1090";
        frmRequestedList.skin = "sknFrmMob7986CB100O";
	} else if (src == "Time") {
      frmRequestedList.lblWO.skin = "sknlbl0284B5ffpx32";
         frmRequestedList.lblPO.skin  = "sknlbl084A52ffpx32";
      	frmRequestedList.imgPeople.src = "search_time.png";
        frmRequestedList.filterLaterImg.src = "search_time.png";
		frmRequestedList.lblLeave.skin = "sknlbl0C4561ffpx32";
		frmRequestedList.lblExpense.skin = "sknlbl0C4561ffpx32";
		frmRequestedList.lblAll.skin = "sknlbl084A52ffpx32";
		frmRequestedList.lblTime.skin = "sknlbl08452FFPX32ROUND";
		frmRequestedList.flxFilterBar.skin = "sknflxBA68C8po100";
		frmRequestedList.flxLaterFilter.skin = "sknflxBA68C8po100";
		frmRequestedList.flxHeader.skin = "sknflxBA68C8po100";
      	frmRequestedList.skin = "sknfrmBA68C8";

	} else if (src == "Expense"||src =="Expenses") {
      frmRequestedList.lblWO.skin = "sknlbl0284B5ffpx32";
         frmRequestedList.lblPO.skin  = "sknlbl084A52ffpx32";
        frmRequestedList.imgPeople.src = "search_expense.png";
        frmRequestedList.filterLaterImg.src = "search_expense.png";
		frmRequestedList.lblLeave.skin = "sknlbl084A52ffpx32";
		frmRequestedList.lblTime.skin = "sknlbl084A52ffpx32";
		frmRequestedList.lblAll.skin = "sknlbl084A52ffpx32";
		frmRequestedList.lblExpense.skin = "sknlbl08452FFPX32ROUND";
		frmRequestedList.flxFilterBar.skin = "sknflx47BDCCff";
		frmRequestedList.flxLaterFilter.skin = "sknflx47BDCCff";
		frmRequestedList.flxHeader.skin = "sknflx47BDCCff";
    	frmRequestedList.skin = "sknFrmMob1DB6C9100O";
	} else if (src == "All") {
		frmRequestedList.lblWO.skin = "sknlbl0284B5ffpx32";
         frmRequestedList.lblPO.skin  = "sknlbl0284B5ffpx32";
      frmRequestedList.lblLeave.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.lblTime.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.lblAll.skin = "sknlbl08452FFPX32ROUND";
		frmRequestedList.lblExpense.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.flxFilterBar.skin = "sknFlxMob7986cb1090";
      frmRequestedList.flxLaterFilter.skin = "sknFlxMob7986cb1090";
		frmRequestedList.flxHeader.skin = "sknFlxMob7986cb1090";
      	frmRequestedList.skin = "sknFrmMob7986CB100O";
	}else if(src == "Purchase Order")
      {frmRequestedList.lblWO.skin = "sknlbl0284B5ffpx32";
         frmRequestedList.lblPO.skin  = "sknlbl08452FFPX32ROUND";
        frmRequestedList.lblLeave.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.lblTime.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.lblAll.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.lblExpense.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.flxFilterBar.skin = "sknFlxMob058594ff";
       frmRequestedList.flxLaterFilter.skin ="sknFlxMob058594ff";
		frmRequestedList.flxHeader.skin = "sknFlxMob058594ff";
      	frmRequestedList.skin = "sknFrmMob058594op100";     
      }else if(src == "Work Order")
        {frmRequestedList.lblLeave.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.lblTime.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.lblAll.skin = "sknlbl0284B5ffpx32";
        frmRequestedList.lblWO.skin = "sknlbl08452FFPX32ROUND";
         frmRequestedList.lblPO.skin  = "sknlbl0284B5ffpx32";
		frmRequestedList.lblExpense.skin = "sknlbl0284B5ffpx32";
		frmRequestedList.flxFilterBar.skin = "sknFlxMob0284B5ff";
         frmRequestedList.flxLaterFilter.skin  = "sknFlxMob0284B5ff";
		frmRequestedList.flxHeader.skin = "sknFlxMob0284B5ff";
      	frmRequestedList.skin = "sknFrmMob0284B5OP100";
          
        }
	kony.print("--------------EXiTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.OnChangeOfFilter");
};
/*
 *@function
 *@class	:	RequestedList
 * @param    :  {Array} data - Data to be set to segment.
 *@returns	:	None
 *@desc		:	shifts the skin of the selected button
 */
kony.apps.coe.ess.Approvals.RequestedList.applyGestureandSwipeAnimation = function () {
    kony.print("-- Start applyGestureandSwipeAnimation --");
  try{
	var swipeOnCard = {
		fingers : 1,
		swipedistance : 50,
		swipeVelocity : 60
	};
	flxSegRequests.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, swipeOnCard, this.swipeCallback.bind(this));
  }catch(e){
    handleError(e);
  }
    kony.print("-- End applyGestureandSwipeAnimation --");
};
/*
 *@function
 *@class	:	RequestedList
 * @param    :  {Array} data - Data to be set to segment.
 *@returns	:	None
 *@desc		:	shifts the skin of the selected button
 */
kony.apps.coe.ess.Approvals.RequestedList.swipeCallback = function (commonWidget, gestureInfo) {
	kony.print("-- Start segmentRowSwipeCallBack --");
  try{
	var swipedDirection = gestureInfo.swipeDirection;
	if (swipedDirection === 1) {
		this.swipeanimation(commonWidget, -40.8);
	} else if (swipedDirection === 2) {
		this.swipeanimation(commonWidget, 0);
	}
  }catch(e){
    handleError(e);
  }
	kony.print("-- End segmentRowSwipeCallBack --");
};
/*
 *@function
 *@class	:	RequestedList
 * @param    :  {Array} data - Data to be set to segment.
 *@returns	:	None
 *@desc		:	shifts the skin of the selected button
 */
kony.apps.coe.ess.Approvals.RequestedList.swipeanimation = function (widget, leftValue) {
	widget.flxForanimation.animate(
		kony.ui.createAnimation({
			"100" : {
				"left" : leftValue + "%",
				"stepConfig" : {
					"timingFunction" : kony.anim.EASE
				}
			}
		}), {
		"delay" : 0,
		"iterationCount" : 1,
		"fillMode" : kony.anim.FILL_MODE_FORWARDS,
		"duration" : 0.3
	}, {
		"animationEnd" : function () {}
	});

};

/*
 *@function
 *@class	:	RequestedList
 * @param    :  empNameSearch data - Text to be searched.
 *@returns	:	None
 *@desc		:	Shows requests which will match with search text
 */
kony.apps.coe.ess.Approvals.RequestedList.searchEmployee = function(empNameSearch) {
    try {
        var query = "SELECT approval_request.id  AS ID," +
            "	   approval_request.due_date 		  AS Due_Date ," +
            " 	   approval_request.employee_id 	  AS CreatedByEmployeeid ," +
            "       approval_request.category_id       AS CategoryID," +
            "       approval_request.type_id           AS TypeID," +
            "       approval_request.islater           AS ISLater," +
            "       approval_request.isread            AS ISRead," +
            "       approval_request.request_date      AS RequestDate," +
            "       employee.first_name                AS FirstName," +
            "       employee.last_name                 AS LastName," +
            "       request_type.NAME                  AS Type," +
            "       request_approver.status_id         AS StatusId," +
            "       status.status_name                 AS StatusName," +
            "       request_approver.approver_id       AS Employee_id," +
            "       request_category.NAME              AS Category," +
            "       attribute.id                       AS attributeID," +
            "       attribute.attribute_def_id         AS Attribute_DEF," +
            "       attribute_def.attribute_section_id AS AttributeSection," +
            "       Group_concat(attribute.value)      AS Attributevalue," +
            "       Group_concat(attribute_def.label)  AS AttributeNAME" +
            " FROM   approval_request" +
            "       LEFT JOIN request_type" +
            "              ON ( approval_request.type_id = request_type.id )" +
            "       LEFT JOIN employee" +
            "              ON ( approval_request.employee_id = employee.id )" +
            "       LEFT JOIN status" +
            "              ON ( request_approver.status_id = status.id )" +
            "       LEFT JOIN request_approver" +
            "              ON ( approval_request.id = request_approver.approval_id )" +
            "       LEFT JOIN request_category" +
            "              ON ( approval_request.category_id = request_category.id )" +
            "       LEFT JOIN attribute" +
            "              ON ( approval_request.id = attribute.approval_id )" +
            "       LEFT JOIN attribute_def" +
            "              ON ( attribute.attribute_def_id = attribute_def.id )" +
            " WHERE  request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
            " and request_approver.status_id = '2'" +
            "and attribute_def.attribute_section_id='1'" +
            " and approval_request.islater='1'" +
            " and approval_request.type_id='" + frmApprovalHome.segLaterApprovals.selectedRowItems[0].ID + "'" +
            "AND (employee.first_name LIKE '%" + empNameSearch + "%' " +
            " OR  employee.last_name LIKE '%" + empNameSearch + "%'  )" +
            " GROUP  BY approval_request.id ";

        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(response) {
            var processedData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement(response);
            //setting the data to the approval request Segement
            var WidgetDatamap = {
                "lblShortName": "CreatedUserShortName",
                //"imgCategory": "requestTypeImage",
                "lblUserName": "UserName",
                "lblCreateDate": "RequestDate",
                "lblDueDateValue": "dueDate",
                "lblRequestInfo": "RequestInfo",
                "btnAdditionalInfo": "AdditionalData",
                "flxTimer": "FlxTimerUi",
                "lblCategory": "category",
                //"flxBorder1": "requestTypeBorderSkin",
                //"flxBorder2": "requestTypeBorderSkin2",
                //"imgLeaveInfo": "requestTypeInfoImage",
                "lblRemainingHours": "remaingHours",
                "imgSelection": "imgSelection"
            };
            frmRequestedList.SegDetails.widgetDataMap = WidgetDatamap;
            frmRequestedList.SegDetails.setData(processedData);
        }, function(error) {
            kony.print("---Error in data retrieval" + error);
        });
    } catch (e) {
        handleError(e);
    }
};
/*
 *@function
 *@class	:	RequestedList
 *@returns	:	None
 *@desc		:	Called OnClick of Select Button when multiple Selection is required.
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.OnClickOfSelect = function () {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedList.prototype.OnClickOfSelect");
  frmSearchResults.flxHeader.skin = frmRequestedList.flxHeader.skin;
  frmSearchResults.skin = frmRequestedList.skin;
	var data = frmRequestedList.SegDetails.data;
	frmSearchResults.SegDetails.widgetDataMap = {
		imgPeople : "imgSrcDet",
		lblTopLeft : "fullName",
		lblTopRight : "Request_date",
		lblMidLeft : "MidLabel",
		lblBottomLeft : "FromTo",
		lblBottomRight : "due_date",
		lblMidBottom : "NoOfDays",
      	imgSelection : "imgSelection",
      	lblMidRight: "lblDueDate",
      lblIntials:"lblIntials",
      	template:"template"
	};
  if((data!=null && data!="")||data.length>0)
    {
      for(var i = 0 ; i <data.length;i++)
      {
         if(data[i].template == flxrequestleave)
           {
           data[i].template = flxSelectMultipleRequestLeave;
           }
           else if(data[i].template == flxRequestsTimesheet )
          {
            data[i].template = flxSelectMultipleRequestTimesheet;
          }
        else if(data[i].template == flxContainer)
          {
            data[i].template = flxMultipleSelect;
          }
        else
          {
            data[i].template = flxMultipleSelect;
          } 
        data[i].imgSelection = "select.png";
        }
	frmSearchResults.SegDetails.setData(data);
	frmSearchResults.show();
    }
	kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedList.prototype.OnClickOfSelect");
};
kony.apps.coe.ess.Approvals.RequestedList.prototype.OnSearchClick = function () {
	frmRequestedList.filterLaterImg.onTouchEnd = this.onImgPeopleClick.bind(this,frmRequestedList.filterLaterImg.src);
    frmRequestedList.filterLaterImg.src = "close_grey.png";
	this.OnSearchClickData = frmRequestedList.SegDetails.data;

};

kony.apps.coe.ess.Approvals.RequestedList.prototype.onImgPeopleClick = function (imgname) {
	frmRequestedList.SegDetails.setData(this.OnSearchClickData);
	frmRequestedList.filterLaterImg.src = imgname;
	frmRequestedList.tbxLaterFilter.text = "";
	frmRequestedList.filterLaterImg.onTouchEnd = function () {};
};

/*
 *@function
 *@class	:	RequestedList
 *@returns	:	None
 *@desc		:	Called OnClick of Search Box.
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.OnSearchtextChange = function () {
    frmRequestedList.filterLaterImg.onTouchEnd = this.onImgPeopleClick.bind(this,frmRequestedList.filterLaterImg.src);
	frmRequestedList.filterLaterImg.src = "close_grey.png";
	if (isEmpty(frmRequestedList.tbxLaterFilter.text)) {
		frmRequestedList.SegDetails.setData(this.OnSearchClickData);
		return;
	}
	var Data = this.OnSearchClickData;
	var newData = [];
	var find = function (key, array) {
		// The variable results needs var in this case (without 'var' a global variable is created)
		var results = [];
		for (var i = 0; i < array.length; i++) {
			if (!isEmpty(array[i].fullName)) {
				if ((array[i].fullName.toLowerCase()).indexOf(key.toLowerCase()) > -1) {
					results.push(array[i]);
				}
			}
		}
		return results;
	};
	newData = find(frmRequestedList.tbxLaterFilter.text, Data);
	frmRequestedList.SegDetails.setData(newData);
};
/*
 *@function
 *@class	:	RequestedList
 *@returns	:	None
 *@desc		:	Called OnClick of approvebutton.
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.OnApproveButtonClick = function () {
	var selectedField = frmRequestedList.SegDetails.selectedRowItems[0];
	var successcallback = function (e) {
		var selectedIndex = frmRequestedList.SegDetails.selectedRowIndex;
		frmRequestedList.SegDetails.removeAt(selectedIndex[1], 0);
		
        //kony.apps.coe.ess.frmLogin.manualSyncOnClick(success);
        kony.apps.coe.ess.Sync.syncAsynchronously();
        var msg = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.ToastMessage.Approved_Succesfully");  
			toastMsg.showToastMsg(msg,2000);
	};
	var errorcallback = function (e) {
		handleError(e);
	};
	var rowData = {
		"id" : selectedField.id,
		"status_id" : '0'
	};
	kony.apps.coe.ess.MVVM.update("MYAPPROVALS", "approval_request", rowData, successcallback,
		errorcallback);
};


/*
 *@function
 *@class	:	RequestedList
 *@param    :   {string} status
 *@returns	:	None
 *@desc		:	update multiple requests.
 */
kony.apps.coe.ess.Approvals.RequestedList.prototype.UpdateMultiple = function (status) {
	var selectedData = frmSearchResults.SegDetails.selectedRowItems;
	var rowData = [];
  if(selectedData!=null && selectedData!= undefined && selectedData.length>0)
    {
	var i = 0;
	for (i = 0; i < selectedData.length; i++) {
		var temp = {
          "id" : selectedData[i].id,
			"status_id" : status
		};
		rowData.push(temp);
	}
var index = 0;
	function successCallback(data, index, status, res) {
		index++;
		if (data.length == index) {
          var successsync = function(status){
           var msg = "";
            if(status=='0'){
              msg = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.ToastMessage.Approved_Succesfully"); 
            }else
              {
                msg  = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.ToastMessage.Rejected_Succesfully"); ; 
              }
			toastMsg.showToastMsg(msg,2000);
						var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
			formController.loadDataAndShowForm();
			kony.apps.coe.ess.Approvals.ApprovalsHome.countTypes();
			return;
          }
           //kony.apps.coe.ess.frmLogin.manualSyncOnClick(successsync);
          kony.apps.coe.ess.Sync.syncAsynchronously();
          successsync(status);
		}
		else{
		kony.apps.coe.ess.MVVM.update("MYAPPROVALS", "approval_request", data[index],  successCallback.bind(this, data, index, status),
		function (e) {
		handleError(e);
		return;
	});
        }
	}
	kony.apps.coe.ess.MVVM.update("MYAPPROVALS", "approval_request", rowData[index],  successCallback.bind(this, rowData, index, status),
		function (e) {
		handleError(e);
		return;
	});
    }
};
