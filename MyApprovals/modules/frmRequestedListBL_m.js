/*** @Author Sumeet.bartha@kony.com
 * @category data Binding / Business Logic
 * @desc  RequestedList class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

/*
 *@class	:	RequestedListBackendlogic
 */
kony.apps.coe.ess.Approvals.RequestedListBackendlogic = function () {};
/*
 *@function
 * @class	 :  RequestedListBackendlogic
 * @param    :  [Array] - Array of JSON to map to widgetmap
 * @returns	 :	None
 * @desc	 :	Process the Data
 */
kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.ProcessData = function (data) {
	//try {
		kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.ProcessData");
		var newData = [];
		if (isEmpty(data)) {
			return;
		}
		for (var i = 0; i < data.SegDetails.length; i++) {
			if (data.SegDetails[i].status_id == "2" || data.SegDetails[i].status_name.toLocaleLowerCase() == "pending") {
				
              data.SegDetails[i]["imgSrcDet"] = {
					src : "people.png"
				};
              var dateformat = "";
              var reqstDateformat = ""
          try{
          dateformat = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Due_Date.Format");
          }catch(i18nerror)
            {
              handleError(i18nerror);
              kony.print("---------------------------i18nFetchError");
            }
				data.SegDetails[i].Request_date = this.FormatDate(data.SegDetails[i].request_date, kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Applied_Date.Format"));
				data.SegDetails[i].due_date = this.FormatDate(data.SegDetails[i].due_date, dateformat);
				var labels = (data.SegDetails[i].labels).split(",");
				var values = (data.SegDetails[i].values).split(",");

				for (var j = 0; j < labels.length; j++) {
					var templbl = labels[j].replace(/\s+/g, '-');
					data.SegDetails[i][templbl] = values[j];
				}

				if (kony.apps.coe.ess.Approvals.formType == "Request" || (kony.apps.coe.ess.Approvals.formType == "Filter" && kony.apps.coe.ess.Approvals.requestedtype != "All")) {
					if (data.SegDetails[i].request_type == kony.apps.coe.ess.Approvals.requestedtype) {
						var temp = this.CheckForExpenseOrDates(data.SegDetails[i]);

						newData.push(temp);
					}
				} else {
					newData.push(this.CheckForExpenseOrDates(data.SegDetails[i]));

				}
              
			}
		}
		kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.ProcessData");
		return newData;
/*	} catch (e) {
		handleError(e);
	}
    */
};
/*
 *@function
 * @class	 :  RequestedListBackendlogic
 * @param    :  [Array] - Array of JSON to map to widgetmap
 * @returns	 :	None
 * @desc	 :	Load the data and map it to Form
 */
kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.bindData = function (newdata) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.bindData");
	if (typeof newdata != "undefined" && newdata !== null && newdata.length !== null && newdata.length > 0) {
		frmRequestedList.SegDetails.isVisible = true;
		frmRequestedList.lblClear.isVisible = true;
     for(var i=0 ; i <newdata.length ; i++)
       {
      if(newdata[i].due_date == ""||newdata[i].due_date==null)
                {
                  newdata[i].lblDueDate = "";
                }
              else
                {
                  newdata[i].lblDueDate = "Due Date";
                }
       }
		var widgetDataMap = {
			imgPeople : "imgSrcDet",
			lblTopLeft : "fullName",
			lblTopRight : "Request_date",
			lblMidLeft : "MidLabel",
			lblBottomLeft : "FromTo",
			lblBottomRight : "due_date",
			lblMidBottom : "NoOfDays",
          	lblIntials:"lblIntials",
          	lblMidRight : "lblDueDate"
		};

		var objecttoapplyData = new kony.apps.coe.ess.Approvals.RequestedList();
		objecttoapplyData.applyDataToSegment(widgetDataMap, newdata);
	} else {
		// alert("No record Found");
		frmRequestedList.SegDetails.isVisible = false;
		frmRequestedList.lblClear.isVisible = false;
		return;
	}
	kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.bindData");
};
/*
 *@function
 * @class	 :  RequestedListBackendlogic
 * @param    :  [dateString] - Date String
 * @param    :  [returntype] - Date return type
 * @returns	 :	Date String
 * @desc	 :	format the Dates to your choice
 */
kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.FormatDate = function (dateString, returntype) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.FormatDate");
	if (isEmpty(dateString) || isEmpty(returntype) || dateString == "00000000") {
		return "";
	}
	var year = dateString.substring(0, 4);
	var month = dateString.substring(4, 6);
	var day = dateString.substring(6, 8);
	var date = new Date(Number(year), Number(month) - 1, Number(day));
    kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.FormatDate");
	return date.getDateInFormat(returntype);
  /*
  if (returntype == "dd/mm/yyyy") {
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	} else if (returntype == "dd mmm") {
		return date.getDate() + " " + date.getMonthNameShort("en");
	} else if (returntype == "dd mm, yyyy") {
		return date.getDate() + " " + date.getMonthNameShort("en") + ",  " + date.getFullYear();
	} 
    else {
		return kony.apps.coe.ess.globalVariables.ReturnInsteadOfNull;
	}*/
	
};
/*
 *@function
 * @class	 :  RequestedListBackendlogic
 * @param    :  [dateString] - Date String
 * @param    :  [dateString] - Date  String
 * @returns	 :	String difference
 * @desc	 :	difference between two dates
 */
kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.days_between = function (date1, date2) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.days_between");
	// The number of milliseconds in one day
	if (isEmpty(date1) || isEmpty(date2)) {
		return kony.apps.coe.ess.globalVariables.ReturnInsteadOfNull;
	}
	var ONE_DAY = 1000 * 60 * 60 * 24;

	//TempFunc to make Date object from string
	var tempFunc = function (dateString) {
		var year = dateString.substring(0, 4);
		var month = dateString.substring(4, 6);
		var day = dateString.substring(6, 8);
		var date = new Date(Number(year), Number(month - 1), Number(day));
		return date;
	};
	var newdate1 = tempFunc(date1);
	var newdate2 = tempFunc(date2);
	// Convert both dates to milliseconds
	var date1_ms = newdate1.getTime();
	var date2_ms = newdate2.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);

	// Convert back to days and return
	kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.days_between");
	return Number(Math.round(difference_ms / ONE_DAY).toFixed()) + 1;
};
/*
 *@function
 * @class	 :  RequestedListBackendlogic
 * @param    :  [dateString] - Date String
 * @returns	 :	Date String
 * @desc	 :	format the Dates to your choice
 */
kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.CheckForExpenseOrDates = function (data) {
	kony.print("--------------EXECUTING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.CheckForExpenseOrDates");
	if (isEmpty(data)) {
		return;
	}
  if(data.type_id =="WORKORDER")
    {
      data.fullName  = ((data.FirstName!=undefined)?data.FirstName : "" )+" "+((data.LastName!=undefined)?data.LastName : "" );
      data.MidLabel = data.RequestID;
      data.SecondaryInfo = data.WorkOrderType;
      data.FromTo = "";
      data.APPROVED_AMT = data.WorkOrderPriority;
      return data;
    }  
  else if(data.type_id=="PURCHORDER")
    {  data.SecondaryInfo = data.PurchaseOrderVendorName;
     	data.fullName  = ((data.FirstName!=undefined)?data.FirstName : "" )+" "+((data.LastName!=undefined)?data.LastName : "" );
      data.FromTo = data.CURRENCY + " " + Number(data.PurchaseOrderAmount).toFixed(2);
      data.MidLabel = data.RequestID ;
      data.APPROVED_AMT = data.BusinessUnit + " items";
      return data;
    }else if(data.type_id == "TIMESHEET")
      {
        if (data.StartDate != data.EndDate) {
			data.FromTo = this.FormatDate(data.StartDate, "dd mmm") + "-" + this.FormatDate(data.EndDate, "dd mmm");
            data.NoOfDays = this.days_between(data.StartDate, data.EndDate) + " "+kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Days.text");
		} else {
			data.FromTo = this.FormatDate(data.StartDate, "dd mmm");
            data.NoOfDays = this.days_between(data.StartDate, data.EndDate) + " "+kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Day.text");
		}
         data.SecondaryInfo = data.category_type;
        data.MidLabel = data.category_type;
        return data;
      }else if(data.type_id == "LEAVEREQ")
        {
          if (data.StartDate != data.EndDate) {
			data.FromTo = this.FormatDate(data.StartDate, "dd mmm") + "-" + this.FormatDate(data.EndDate, "dd mmm");
            data.NoOfDays = this.days_between(data.StartDate, data.EndDate) + " "+kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Days.text");
		} else {
			data.FromTo = this.FormatDate(data.StartDate, "dd mmm");
            data.NoOfDays = this.days_between(data.StartDate, data.EndDate) + " "+kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Day.text");
		}
          data.SecondaryInfo = data.category_type;
          data.MidLabel = data.category_type;
          return data;
        }else if(data.type_id == "EXPENSES")
          {
            data.APPROVED_AMT =data.CURRENCY+" "+ Number(data.APPROVED_AMT).toFixed(2);
			data.FromTo = data.CURRENCY + " " + Number(data.CLAIMED_AMT).toFixed(2);
			data.MidLabel = data.REPORT_NAME;
			data.NoOfDays = "";
             data.SecondaryInfo = data.category_type;
            data.MidLabel = data.category_type;
            return data;
          }
  /*
	if (data.CLAIMED_AMT !== undefined) {
	    data.APPROVED_AMT = Number(Data.APPROVED_AMT).toFixed(2);
		data.FromTo = data.CURRENCY + " " + Number(data.CLAIMED_AMT).toFixed(2);
		data.MidLabel = data.REPORT_NAME;
		data.NoOfDays = "";
	} else {
		if (data.StartDate != data.EndDate) {
			data.FromTo = this.FormatDate(data.StartDate, "dd mmm") + "-" + this.FormatDate(data.EndDate, "dd mmm");
            data.NoOfDays = this.days_between(data.StartDate, data.EndDate) + " "+kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Days.text");
		} else {
			data.FromTo = this.FormatDate(data.StartDate, "dd mmm");
            data.NoOfDays = this.days_between(data.StartDate, data.EndDate) + " "+kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Day.text");
		}
		
		if (data.TIMESHEETTYPE !== undefined) {
			data.MidLabel = data.TIMESHEETTYPE;
		} else {
			data.MidLabel = data.category_type;
		}
	}*/
	kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.CheckForExpenseOrDates");
	return data;
};

/**
 *@function
 * @class	 :  RequestedDetailBackend
 * @param    :  {function} succcessCallback function
 * @returns	 :	None
 * @desc	 :	get all the attachemnts .
 */

kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.getAllAttachments = function (successCallback) {
	kony.print("--------------in - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.getAllAttachments");
	var errorCallback = function (message) {
		handleError(message);
	};
  var successCallback1 = function(res)
  {
    if(isEmpty(res))
      {
        return;
      }
       if(res!=undefined&&res.length>0&&res[0].attri_count!=undefined)
      {
        frmExpenseReportDetail.flxFullDetail.isVisible = true;
        frmExpenseReportDetail.flxFullDetail.onClick = function(){  var obj = new kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic(); 
																									obj.callFrmFullDetails();
                                                                 };
      }else
        {
        	frmExpenseReportDetail.flxFullDetail.isVisible = false;
          frmExpenseReportDetail.flxFullDetail.onClick = function(){};
          
        }
  };
    var query1 =  "select group_concat(ad.label) as 'attri_count' from approval_request ar LEFT JOIN Employee e ON ar.employee_id = e.Id LEFT JOIN attribute at ON ar.id = at.approval_id LEFT JOIN attribute_def ad ON ad.id = at.attribute_def_id LEFT JOIN request_type reqT ON reqT.id = ar.type_id LEFT JOIN request_category rc ON ar.category_id = rc.id LEFT JOIN attribute_section aTs ON ad.attribute_section_id = aTs.id LEFT JOIN status s ON ar.status_id = s.id  where aTs.TYPE='EXTENDED' AND ar.id= '"+kony.apps.coe.ess.Approvals.ExpenseReportDetail.Request_Id+"';";
	kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query1, successCallback1, errorCallback);
	var query = "select at.media_id , at.type_id , at.approval_id from approval_attachment at where at.approval_id = '" + kony.apps.coe.ess.Approvals.ExpenseReportDetail.Request_Id + "' AND at.type_id = '1'";
	kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallback, errorCallback);
	kony.print("--------------exiting - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.getAllAttachments");
};
/**
 *@function
 * @class	 :  RequestedDetailBackend
 * @param    :  {function} succcessCallback function
 * @returns	 :	None
 * @desc	 :	get single attachment .
 */
kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.getOneAttachment = function (successCallback) {
	kony.print("--------------in - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.getOneAttachment");
	var errorCallback = function (message) {
		handleError(message);
	};
	var query = "select at.media_id , at.type_id , at.approval_id from approval_attachment at where at.approval_id = '" + kony.apps.coe.ess.Approvals.ExpenseReportDetail.Request_Id + "' AND at.type_id = '2'";
	kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallback, errorCallback);
	kony.print("--------------Exiting - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.getOneAttachment");
};
