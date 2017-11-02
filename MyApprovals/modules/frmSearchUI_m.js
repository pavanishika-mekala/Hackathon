kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
//kony.apps.coe.ess.Approvals.frmSearch = kony.apps.coe.ess.Approvals.frmSearch || {};

kony.apps.coe.ess.Approvals.frmSearch = function() {};

/*
 *@function
 *@class  : Search
 *@desc   : Preshow  of frmSearch
 */

kony.apps.coe.ess.Approvals.frmSearch.preShow = function() {
    kony.print("-- Start preShow -- ");
    frmSearch.segList.rowTemplate.flxExpense.highlightedSkin = "sknFlxMob2ebaee100OBor1pxR100px";
    frmSearch.segList.rowTemplate.flxExpense.highlightOnParentFocus = true;
    frmSearch.flxClear.onClick = function(){kony.apps.coe.ess.Approvals.frmSearch.onClickFilterDisable();};
    frmSearch.flxHide.onClick = function(){kony.apps.coe.ess.Approvals.frmSearch.onClickFilterEnable();};
    kony.print("-- End preShow -- ");
};
/*
 *@function
 *@class  : Search
 *@params : JSON array consisting of sql response
 *@returns: Processed data for the Search segment back to the Controller extension
 *@desc   : Data process is taken place here
 */

kony.apps.coe.ess.Approvals.frmSearch.ProcessData = function(response_data) {
    kony.print("-- Start ProcessData -- ");
    try {
        var processedData = [];
        if ((isEmpty(response_data))) {
            kony.print("-- End ProcessData -- ");
            return [];
        }
        for (var index in response_data) {
            var processedRequest = response_data[index];
            //date format
            processedRequest.request_date = new Date().modifyByYYYYMMDDHHMMSS(response_data[index].RequestDate).toDDmmmHHMMtt();
            processedRequest.categoryName = response_data[index].Category;
            //attribute values
            processedRequest.attributesNames = response_data[index].AttributeNAME;
            processedRequest.attributeValues = response_data[index].Attributevalue;
          	//Request AttributeName
          	if(processedRequest.attributesNames != undefined) {
            	processedRequest.attributejson = processedRequest.attributesNames.returnCombinationInJsonFormat(processedRequest.attributeValues, ",");
            } else {
              processedRequest.attributejson = {};
            }
            processedRequest.separator = "Label";
            if (response_data[index].CreatedByEmployeeid && response_data[index].CreatedByEmployeeid != "" && response_data[index].CreatedByEmployeeid.toLowerCase() != null) {
                //employee id exsists
                if (response_data[index].FirstName && response_data[index].FirstName.toLowerCase() != null) {
                    processedRequest.UserName = response_data[index].FirstName;
                    processedRequest.CreatedUserShortName = response_data[index].FirstName.charAt(0);
                }
                if (response_data[index].LastName && response_data[index].LastName.toLowerCase() != null) {
                    processedRequest.UserName = processedRequest.UserName + " " + response_data[index].LastName;
                    if (response_data[index].LastName.charAt(0))
                        processedRequest.CreatedUserShortName = processedRequest.CreatedUserShortName + response_data[index].LastName.charAt(0);
                }
            } else {
                //employee id doesn't exsists
                if (processedRequest.attributejson.FirstName) {
                    processedRequest.UserName = processedRequest.attributejson.FirstName;
                    if (processedRequest.attributejson.FirstName.charAt(0))
                        processedRequest.CreatedUserShortName = processedRequest.attributejson.FirstName.charAt(0);
                }
                if (processedRequest.attributejson.LastName) {
                    processedRequest.UserName = processedRequest.UserName + " " + processedRequest.attributejson.LastName;
                    if (processedRequest.attributejson.LastName.charAt(0))
                        processedRequest.CreatedUserShortName = processedRequest.CreatedUserShortName + processedRequest.attributejson.LastName.charAt(0);
                }

            }
            // convert the CreatedUserShortName to ALL CAPS. It looks good.
            if (processedRequest.CreatedUserShortName != undefined) {
                processedRequest.CreatedUserShortName = processedRequest.CreatedUserShortName.toUpperCase();
            }

            //if (response_data[index].StatusName == "Pending") {
          if (response_data[index].StatusName == kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Pending")) {
                processedRequest.status_value = response_data[index].StatusName;
            } else {
                var approvedDate = new Date().modifyByYYYYMMDDHHMMSS(response_data[index].ApprovedDate).toDDmmmYY();
                if(response_data[index].StatusName == "Approved"){
                   processedRequest.status_value = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Approved")+" "+kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.On")+" "+approvedDate;
                }else if(response_data[index].StatusName == "Rejected"){
                   processedRequest.status_value = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Rejected")+" "+kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.On")+" "+approvedDate;
                }else
                processedRequest.status_value = response_data[index].StatusName +" "+ kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.On")+" "+ approvedDate;
            }

            // For informational leave types make sure there is a type defined
            if (response_data[index].Type == null && response_data[index].TypeID == "LEAVEINFO") {
                response_data[index].Type="LEAVE";
            }

            switch (response_data[index].Type) {
                case "LEAVE":
                    kony.print("---The request is of type LEAVE----");
                    //retriving the startDate and EndDate
                    processedRequest.imgPurpose = {
                        src: "leave_detail.png"
                    };
                    if (processedRequest.attributejson.StartDate && processedRequest.attributejson.EndDate) {
                        var startdate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.StartDate);
                        var endDate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.EndDate);
                        var diff = (endDate - startdate) / (1000 * 3600 * 24);
                        if (diff >= 1) {
                            //multiple days leave
                            processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + endDate.retriveMonthName().substring(0, 3);

                            //processedRequest.AdditionalData = " " + Math.floor(Number(diff)).toString() + " Day(s) ";
                        } else {
                            //single Day leave
                            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);
                        }

                    }
                    break;
                case "TIMESHEET":
                    kony.print("The request is of type TIMESHEET");
                    processedRequest.imgPurpose = {
                        src: "time_detail.png"
                    };

                    //retriving the startDate and EndDate
                    if (processedRequest.attributejson.StartDate && processedRequest.attributejson.EndDate) {
                        var startdate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.StartDate);
                        var endDate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.EndDate);
                        var diff = (endDate - startdate) / (1000 * 3600 * 24);

                        if (diff >= 1) {
                            //multiple days leave
                            processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + endDate.retriveMonthName().substring(0, 3);
                            //processedRequest.AdditionalData = " " + Math.floor(Number(diff)).toString() + " Day(s) ";
                        } else {
                            //single Day leave
                            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);

                        }

                    }
                    break;
                case "EXPENSES":
                    kony.print("The request is of type EXPENSES");

                    processedRequest.imgPurpose = {
                        src: "expense_details.png"
                    };

                    processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + processedRequest.attributejson.CLAIMED_AMT;
                    break;
                case "PURCHASEORDER":
                    kony.print("The request is of type PURCHORDER");

                    processedRequest.imgPurpose = {
                        src: "purchase_order_in_details.png"
                    };
                    if (processedRequest.attributejson.PurchaseOrderVendorName) {
                        processedRequest.RequestInfo = processedRequest.attributejson.PurchaseOrderVendorName;
                    }
                    break;
                case "WORKORDER":
                    kony.print("The request is of type WORKORDER");
                    processedRequest.imgPurpose = {
                        src: "work_order_details.png"
                    };
                    if (processedRequest.attributejson.BusinessUnit) {
                        processedRequest.RequestInfo = processedRequest.attributejson.BusinessUnit;
                    }
                    break;
                case 'PURCHASEREQUISITION':
                    kony.print("The request is of type Purchase Requistion");
                    processedRequest.imgPurpose = {
                        src: "purchase_request_in_detail.png"
                    };
                    if (processedRequest.attributejson.CURRENCY && processedRequest.attributejson.AMOUNT) {
                        processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + " " + currencyFormartting(processedRequest.attributejson.AMOUNT);
                    }
                    break;
                default:
                    continue;
            }
            if(processedRequest.RequestInfo ){
               processedRequest.requestVisible = {
                 "isVisible" : true
               };
            } else{
              processedRequest.requestVisible = {
                "isVisible" : false
              };
            }
            processedData.push(processedRequest);
        }

        kony.print("----------- End of the Process data in the frmapprovalhome --------");
        kony.print("-- End ProcessData -- ");
        return processedData;
    } catch (e) {
        handleError(e);
    }
};

/*
 *@function
 *@class  : Search
 *@desc   : modifies UI when filter is selected
 */
kony.apps.coe.ess.Approvals.frmSearch.onClickFilterEnable = function() {
  kony.print("-- Start onClickFilterEnable -- ");
  frmSearch.flxClear.setVisibility(true);
  frmSearch.flxHide.setVisibility(false);
  frmSearch.flxSearchContainer.setVisibility(true);
  kony.print("-- End onClickFilterEnable -- ");
};

/*
 *@function
 *@class  : Search
 *@desc   : clears the filter onClick of filetr icon
 */
kony.apps.coe.ess.Approvals.frmSearch.onClickFilterDisable = function() {
  kony.print("-- Start onClickFilterDisable -- ");
  frmSearch.flxClear.setVisibility(false);
  frmSearch.flxHide.setVisibility(true);
  frmSearch.flxSearchContainer.setVisibility(false);
  kony.apps.coe.ess.Approvals.frmSearch.refreshData();
  kony.print("-- End onClickFilterDisable -- ");
};
/*
 *@function
 *@class  : Search
 *@desc   : modifies UI when filter is deselected and also clears data
 */
kony.apps.coe.ess.Approvals.frmSearch.refreshData = function() {
    kony.print("-- Start refreshData -- ");
    frmSearch.flxClear.setVisibility(false);
    frmSearch.flxHide.setVisibility(true);
    kony.apps.coe.ess.Approvals.frmSearch.onClickFilterClearSearch();
    frmSearch.flxSearchContainer.setVisibility(false);
    var query_data = {}
    query_data.fromDate = null;
    query_data.toDate = null;
    query_data.requestType = [];
    query_data.statusType = [];
    query_data.totalPeoples = [];
    query_data.count = kony.apps.coe.ess.globalVariables.PaginationRecordLength;
    query_data.offset = 0;
    kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(query_data, kony.apps.coe.ess.Approvals.frmSearch.filterApplyQuerySuccess);
    kony.print("-- End refreshData -- ");
}

/*
 *@function
 *@class  : Search
 *@returns: forms query as JSON
 *@desc   : Query is formed here
 */
kony.apps.coe.ess.Approvals.frmSearch.onClickFilterApplySearch = function() {
    kony.print("-- Start onClickFilterApplySearch -- ");
    try {
        frmSearch.flxSearchContainer.setVisibility(false);
        frmSearch.flxClear.setVisibility(true);
        frmSearch.flxHide.setVisibility(false);
		var query_data = {}
        query_data.fromDate = new Date(frmSearch.calFromDate.year, frmSearch.calFromDate.month - 1, frmSearch.calFromDate.day);
        query_data.fromDate = query_data.fromDate.getDateInFormat("yyyymmdd");
        query_data.toDate = new Date(frmSearch.calToDate.year, frmSearch.calToDate.month - 1, frmSearch.calToDate.day);
        query_data.toDate = query_data.toDate.getDateInFormat("yyyymmdd");
        query_data.selectedRequestType = frmSelect.SegRequestsType.selectedRowItems;
        query_data.selectedStatusType = frmSelect.SegStatusType.selectedRowItems;
        query_data.SelectedTotalPeoples = frmSelect.segSearchPeople.selectedRowItems;
        query_data.requestType = [];
        query_data.statusType = [];
        query_data.totalPeoples = [];
        if (query_data.selectedRequestType != null) {
            if (query_data.selectedRequestType[0].id != 'All') {
                for (var i = 0; i < query_data.selectedRequestType.length; i++) {
                    query_data.requestType.push(query_data.selectedRequestType[i].id);
                }
            }
        }
        if (query_data.selectedStatusType != null) {
            if (query_data.selectedStatusType[0].id != 'All') {
                for (var i = 0; i < query_data.selectedStatusType.length; i++) {
                    query_data.statusType.push(query_data.selectedStatusType[i].id);
                }
            }
        }
        if (query_data.SelectedTotalPeoples != null) {
            if (query_data.SelectedTotalPeoples[0].id != 'All') {
                for (var i = 0; i < query_data.SelectedTotalPeoples.length; i++) {
                    query_data.totalPeoples.push(query_data.SelectedTotalPeoples[i].id);
                }
            }
        }
        kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(query_data, kony.apps.coe.ess.Approvals.frmSearch.filterApplyQuerySuccess);
    } catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.Filter")));
    }
    kony.print("-- End onClickFilterApplySearch -- ");
}
/*
 *@function
 *@class  : Search
 *@desc   : Setting the limit and offset
 */

kony.apps.coe.ess.Approvals.frmSearch.onReachingEndOfSegment = function() {
    kony.print("-- Start onReachingEndOfSegment -- ");
    if (frmSearch.segList.data.length !== 0) {
        var query_data = {}
        query_data.count = kony.apps.coe.ess.globalVariables.PaginationRecordLength;
        query_data.offset = frmSearch.segList.data.length;
        query_data.fromDate = new Date(frmSearch.calFromDate.year, frmSearch.calFromDate.month - 1, frmSearch.calFromDate.day);
        query_data.fromDate = query_data.fromDate.getDateInFormat("yyyymmdd");
        query_data.toDate = new Date(frmSearch.calToDate.year, frmSearch.calToDate.month - 1, frmSearch.calToDate.day);
        query_data.toDate = query_data.toDate.getDateInFormat("yyyymmdd");
        query_data.selectedRequestType = frmSelect.SegRequestsType.selectedRowItems;
        query_data.selectedStatusType = frmSelect.SegStatusType.selectedRowItems;
        query_data.SelectedTotalPeoples = frmSelect.segSearchPeople.selectedRowItems;
        query_data.requestType = [];
        query_data.statusType = [];
        query_data.totalPeoples = [];
        if (query_data.selectedRequestType != null) {
            if (query_data.selectedRequestType[0].id != 'All') {
                for (var i = 0; i < query_data.selectedRequestType.length; i++) {
                    query_data.requestType.push(query_data.selectedRequestType[i].id);
                }
            }
        }
        if (query_data.selectedStatusType != null) {
            if (query_data.selectedStatusType[0].id != 'All') {
                for (var i = 0; i < query_data.selectedStatusType.length; i++) {
                    query_data.statusType.push(query_data.selectedStatusType[i].id);
                }
            }
        }
        if (query_data.SelectedTotalPeoples != null) {
            if (query_data.SelectedTotalPeoples[0].id != 'All') {
                for (var i = 0; i < query_data.SelectedTotalPeoples.length; i++) {
                    query_data.totalPeoples.push(query_data.SelectedTotalPeoples[i].id);
                }
            }
        }
        kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(query_data, kony.apps.coe.ess.Approvals.frmSearch.onReachingEndOfSegmentQuerySuccess);
    }
    kony.print("-- End onReachingEndOfSegment -- ");
}
/*
 *@function
 *@class  : Search
 *@desc   : getting the data and adding to the segment
 */

kony.apps.coe.ess.Approvals.frmSearch.onReachingEndOfSegmentQuerySuccess = function(response) {
    kony.print("-- Start onReachingEndOfSegmentQuerySuccess -- ");
    var data = kony.apps.coe.ess.Approvals.frmSearch.ProcessData(response);
    for (var individualData in data) {
        frmSearch.segList.addDataAt(data[individualData], parseInt(frmSearch.segList.data.length), 0);
    }
    kony.print("-- End onReachingEndOfSegmentQuerySuccess -- ");
}
/*
 *@function
 *@class  : Search
 *@params : Query data,
 *@returns: Response data based on filter data
 *@desc   : Data is obtained from the Database here
 */

kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter = function(data, successCallBack) {
    kony.print("-- Start retrieveDataByFilter -- ");
    try {
        if (data === null || data === "") {
            return [];
        }
        var query = "SELECT Employee.First_Name AS FirstName," +
            "	   Employee.Last_Name AS LastName," +
            "	   approval_request.employee_id AS CreatedByEmployeeid," +
            "	   approval_request.request_date AS RequestDate," +
            "	   Status.Status_Name AS StatusName," +
            "	   request_category.name AS Category," +
            "	   approval_request.category_id AS CategoryID," +
            " 	   approval_request.id  AS ID," +
            "	   request_type.name AS Type," +
            "      employee.Media_Id              	   AS MediaID," +
            "	   approval_request.due_date 		  AS Due_Date," +
            "      approval_request.type_id           AS TypeID," +
            "      approval_request.islater           AS ISLater," +
            "      approval_request.isread            AS ISRead," +
            "      request_approver.status_id         AS StatusId," +
            "      request_approver.approver_id       AS Employee_id," +
            "      attribute.id                       AS attributeID," +
            "      attribute.attribute_def_id         AS Attribute_DEF," +
            "      attribute_def.attribute_section_id AS AttributeSection," +
            "	   request_approver.lastmodifiedts AS ApprovedDate," +
            "      Group_concat(attribute.value) AS Attributevalue," +
            "	   Group_concat(attribute_def.label) AS AttributeNAME," +
            "	   startDate" +
            "      FROM approval_request" +
            "	   LEFT JOIN Employee ON (approval_request.employee_id = Employee.Id)" +
            "	   LEFT JOIN request_approver ON (approval_request.id = request_approver.approval_id)" +
            "	   LEFT JOIN attribute ON (approval_request.id = attribute.approval_id)" +
            "	   LEFT JOIN attribute_def ON (attribute.attribute_def_id = attribute_def.id) " +
            "	   LEFT JOIN Status ON (request_approver.status_id = Status.Id)" +
            "	   LEFT JOIN request_category ON (approval_request.category_id = request_category.id)" +
            "	   LEFT JOIN request_type ON (approval_request.type_id = request_type.id) " +
            "    LEFT JOIN (select approval_id as appr_id, value as startDate from attribute where attribute_def_id='StartDateAttributeDef') ON (approval_request.id = appr_id)" +// Join to get leave start date
            " WHERE  request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'";
        //-------------Query addition for fromDate and toDate
        if (data.fromDate != null && data.fromDate != "" && data.fromDate.length > 0 && data.toDate != null && data.toDate != "" && data.toDate.length > 0) {
            query += " AND startDate BETWEEN '" + data.fromDate + "' AND '" + data.toDate + "'";
        }

        //-------------Query addition for Request_Type
        if (data.requestType != null && data.requestType != "" && data.requestType.length > 0) {
            query += " AND request_type.name IN (";
            for (var i = 0; i < data.requestType.length; i++) {
                if (i == (data.requestType.length - 1)) {
                    query += "'" + data.requestType[i] + "'";
                } else {
                    query += "'" + data.requestType[i] + "'" + ", ";
                }
            }
            query += ")";
        }
        //-------------Query addition for Status_type
        if (data.statusType != null && data.statusType != "" && data.statusType.length > 0) {
            query += " AND status.id IN (";
            for (var i = 0; i < data.statusType.length; i++) {
                if (i == (data.statusType.length - 1)) {
                    query += "'" + data.statusType[i] + "'";
                } else {
                    query += "'" + data.statusType[i] + "'" + ", ";
                }
            }
            query += ")";
        }
        //-------------Query addition for People
        if (data.totalPeoples != null && data.totalPeoples != "" && data.totalPeoples.length > 0) {
            query += " AND approval_request.employee_id IN(";
            for (var i = 0; i < data.totalPeoples.length; i++) {
                if (i == (data.totalPeoples.length - 1)) {
                    query += "'" + data.totalPeoples[i] + "'";
                } else {
                    query += "'" + data.totalPeoples[i] + "'" + ", ";
                }
            }
            query += ")";
        }
        //-------------Query addition for isLater
        if (data.isLater != null && data.isLater != "" && data.isLater.length > 0) {
            query += " AND approval_request.islater = '" + data.isLater + "'";
        }
        //-------------Query addition for attribute_section_id
        if (data.attribute_section_id != null && data.attribute_section_id != "" && data.attribute_section_id.length > 0) {
            query += " AND attribute_def.attribute_section_id = '" + data.attribute_section_id + "'";
        }
        //-------------Query addition for status_id
        if (data.status_id != null && data.status_id != "" && data.status_id.length > 0) {
          if (data.show_auto_approved != null && data.show_auto_approved != "" && data.show_auto_approved.length > 0 && data.show_auto_approved == "1") {
            query += " AND (request_approver.status_id = '" + data.status_id + "'  OR (request_approver.status_id = '0' AND approval_request.isRead = '0' AND approval_request.type_id='LEAVEINFO' and approval_request.category_id != 'NULL'))";
          } else {
            query += " AND request_approver.status_id = '" + data.status_id + "'";
          }
        }
        query += " GROUP BY approval_request.id";
        if (data.count != null && data.count != "") {
            query += " LIMIT " + data.count + " OFFSET " + data.offset + "";
        }
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(successCallBack, response) {
                successCallBack(response);
            }
            .bind(this, successCallBack),
            function(err) {
                handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.FilterError")))
            });
    } catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.Filter")));
    }
    kony.print("-- End retrieveDataByFilter -- ");
}

/*
 *@function
 *@class  : Search
 *@params : Response data based on filter data
 *@desc   : Bind data to the segment
 */
kony.apps.coe.ess.Approvals.frmSearch.filterApplyQuerySuccess = function(response) {
    kony.print("-- Start filterApplyQuerySuccess -- ");
    var data = kony.apps.coe.ess.Approvals.frmSearch.ProcessData(response);
    try {
        var widgetDataMap = {
            "lblCreatedDate": "request_date",
            "lblName": "UserName",
            "lblPurpose": "categoryName",
            "lblApproved": "status_value",
            "lblIntials": "CreatedUserShortName",
            "lblRequestInfo": "RequestInfo",
            "imgType": "imgPurpose",
            "imgUser": "imgUser",
            "flxExpense":"requestVisible"
        };
        frmSearch.segList.widgetDataMap = widgetDataMap;

       if (data != "" && data != null && data.length > 0) {
            frmSearch.lblNorecords.setVisibility(false);
            frmSearch.segList.setVisibility(true);
            frmSearch.segList.setData(data);
        }
      else{
        data=[];
        frmSearch.segList.setData(data);
        frmSearch.lblNorecords.setVisibility(true);
        frmSearch.segList.setVisibility(false);
      }
        //start lazy  loadign for images in the segemtn
        kony.apps.coe.ess.Approvals.frmSearch.lazyLoading();
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    } catch (err) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.bindDataSearch")));
        kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");

    }

    kony.print("-- End filterApplyQuerySuccess -- ");
}

/*
 *@function
 *@class  : Search
 *@desc   : Clears all the data in the segment
 */

kony.apps.coe.ess.Approvals.frmSearch.onClickFilterClearSearch = function() {
    kony.print("-- Start onClickFilterClearSearch -- ");

    frmSearch.lblRequests.text = kony.i18n.getLocalizedString("i18n.ess.frmSearch.text.SelectRequestText");
    frmSearch.lblLeaveStatus.text = kony.i18n.getLocalizedString("i18n.ess.frmSearch.text.SelectStatusText");
    frmSearch.lblUsers.text = kony.i18n.getLocalizedString("i18n.ess.frmSearch.text.SelectPeopleText");;
    frmSearch.calFromDate.dateComponents = [01, 01, new Date().getFullYear()];
    frmSearch.calToDate.dateComponents = [31, 12, new Date().getFullYear()];
    frmSelect.segSearchPeople.selectedRowIndices = [[0,[0]]];
    frmSelect.SegStatusType.selectedRowIndices = [[0,[0]]];
    frmSelect.SegRequestsType.selectedRowIndices = [[0,[0]]];
    frmSearch.lblUsers.skin = "sknLblMobCCCCCC100OFS36px";
    frmSearch.lblRequests.skin = "sknLblMobCCCCCC100OFS36px";
    frmSearch.lblLeaveStatus.skin = "sknLblMobCCCCCC100OFS36px";
    kony.print("-- End onClickFilterClearSearch -- ");
}


/*
 *@function
 *@class  : Search
 *@desc   : Clears all the data in the segment
 */

kony.apps.coe.ess.Approvals.frmSearch.lazyLoading = function() {
    kony.print("-- Start  kony.apps.coe.ess.Approvals.frmSearch.lazyLoading  --");
    var segmentConfiguration = {
        "MediaKeyAttribute": "MediaID",
        "ImageWidgetName": "imgUser",
        "hideWidgetNames": []
    };
    kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_SEGMENT, frmSearch.segList, "Employee", "mediaEmployee", "", segmentConfiguration);
    kony.print("-- END  kony.apps.coe.ess.Approvals.frmSearch.lazyLoading  --");
};

kony.apps.coe.ess.Approvals.frmSearch.showFilteredData = function(){
  frmSearch.show();
  if(frmSearch.flxClear.isVisible == true && frmSearch.flxHide.isVisible == false){
   // frmSearch.flxClear.onClick = function(){kony.apps.coe.ess.Approvals.frmSearch.onClickFilterEnable();}
    // frmSearch.flxHide.onClick = function(){kony.apps.coe.ess.Approvals.frmSearch.onClickFilterDisable();}
    kony.apps.coe.ess.Approvals.frmSearch.onClickFilterApplySearch();
  }else{
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSearch");
    frmController.loadDataAndShowForm();
  }
};
