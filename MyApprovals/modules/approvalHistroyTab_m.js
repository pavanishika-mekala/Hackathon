kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.ApprovalHistoryTab = function() {
    kony.print("--start Approval History--");
    kony.print("--end Approval History--");
};
/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : code to be executed on init of the Form  to create Dynamic Segments
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.
initApprovalHistory = function() {
    var WidgetsArray = ["lblRequestType", "imgRequestType"];
    var SelectionBehaviourConfig = {
        "imageIdentifier": "imgRequestType",
        "selectedStateImage": "select_green.png",
        "unselectedStateImage": "select.png"
    };
    kony.apps.coe.ess.globalVariables.requestTypeSegements = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 4, flxFilterFormat, function() {}, WidgetsArray);
    frmTabApprovalHistory.flxRequestTypes.add(kony.apps.coe.ess.globalVariables.requestTypeSegements.getDynamicSegment());
    kony.apps.coe.ess.globalVariables.requestTypeSegements.WidgetDataMap = {
        "lblRequestType": "TYPE",
        "imgRequestType": "imgRequestType"
    };

    kony.apps.coe.ess.globalVariables.statusTypeSegments = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 4, flxFilterFormat, function() {}, WidgetsArray);
    frmTabApprovalHistory.flxRequestStatusValues.add(kony.apps.coe.ess.globalVariables.statusTypeSegments.getDynamicSegment());
    kony.apps.coe.ess.globalVariables.statusTypeSegments.WidgetDataMap = {
        "lblRequestType": "Status_Name",
        "imgRequestType": "imgRequestType"
    };
    WidgetsArray = ["imgSelection", "imgEmployee", "lblEmployeeName", "lblShortName"];
    SelectionBehaviourConfig = {
        "imageIdentifier": "imgSelection",
        "selectedStateImage": "select_green.png",
        "unselectedStateImage": "select.png"
    };
    kony.apps.coe.ess.globalVariables.FrmTabApprovalsPeopleSearch = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 3, flxEmployeeSelection, function() {}, WidgetsArray);
    frmTabApprovalHistory.flexDynamicPplsLayout.add(kony.apps.coe.ess.globalVariables.FrmTabApprovalsPeopleSearch.getDynamicSegment());
    kony.apps.coe.ess.globalVariables.FrmTabApprovalsPeopleSearch.WidgetDataMap = {
        "lblEmployeeName": "username",
        "lblShortName": "shortName"
    };
};
/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : set the data to Dynamic segments
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.
setDataToDynamicFilters = function() {
   frmTabApprovalHistory.fromdate.dateComponents = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()];
   frmTabApprovalHistory.todate.dateComponents = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()];
    var Response = JSON.parse(JSON.stringify(kony.apps.coe.ess.Approvals.tabApprovalsListView.requestTypeData));
    var index;
    for (index in Response) {
        Response[index].TYPE = {
            "text": Response[index].TYPE,
        };
        Response[index].imgRequestType = {
            "src": "select.png",
        };
    }
    kony.apps.coe.ess.globalVariables.requestTypeSegements.setData(Response);
    var statusResponse = JSON.parse(JSON.stringify(kony.apps.coe.ess.globalVariables.statusResponse));
    for (index in statusResponse) {
        statusResponse[index].Status_Name = {
            "text": statusResponse[index].Status_Name,
        };
        statusResponse[index].imgRequestType = {
            "src": "select.png",
        };
    }
    kony.apps.coe.ess.globalVariables.statusTypeSegments.setData(statusResponse);
};

/*
 *@function
 *@params{searchString}-string to be searched.
 @@param{DynamicWidegt}-Dynamically created Segment Object
 *@returns: none
 *@desc   : set the Data to Dynmically created People Segment Based on Search Values.
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.DynamicSegmentSetDatabyEmployeeSearch = function(searchString, DynamicWidget) {
    try {
          kony.print("----------- Start DynamicSegmentSetDatabyEmployeeSearch---");
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");

        //input validations
        var EmployeeSearchQuery = "";
        if (isEmpty(DynamicWidget)) {
            handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.ErrorMessage.InvalidInput"));
            return;
        }

        if (searchString !== "" && searchString !== null) {
            EmployeeSearchQuery = "SELECT ((CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE [employee].[First_Name] END) || ' ' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE [employee].[Last_Name] END)) AS [username]," +
                " (CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE substr([employee].[First_Name] ,1,1) END || '' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE substr([employee].[Last_Name],1,1) END)) AS [shortName]," +
                "       [employee].[Last_Name] as Last_Name,  " +
                "       [employee].[Manager_Id] as Manager_Id ,  " +
                "       [employee].[Id] as Id,  " +
                "       [employee].[Media_Id] as Media_Id " +
                "FROM   [employee] " +
                "WHERE   ([employee].[first_name] LIKE '%" + searchString + "%' " +
                "       OR  [employee].[Last_Name] LIKE '%" + searchString + "%'  ) " +
                "ORDER  BY username ";

        }
        else {
            EmployeeSearchQuery = "SELECT ((CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE [employee].[First_Name] END) || ' ' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE [employee].[Last_Name] END)) AS [username]," +
                " (CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE substr([employee].[First_Name] ,1,1) END || '' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE substr([employee].[Last_Name],1,1) END)) AS [shortName]," +
                "       [employee].[Last_Name] as Last_Name,  " +
                "       [employee].[Manager_Id] as Manager_Id ,  " +
                "       [employee].[Id] as Id,  " +
                "       [employee].[Media_Id] as Media_Id " +
                "FROM   [employee] " +
                "ORDER  BY username ";
        }
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", EmployeeSearchQuery, function(DynamicWidget, Response) {
          
                for (var index in Response) {
                    Response[index].username = {
                        "text": Response[index].username
                    };
                    Response[index].shortName = {
                        "text": Response[index].shortName
                    };
                }
                DynamicWidget.setData(Response);
                //lazy loading
                var segmentConfiguration = {
                    "MediaKeyAttribute": "Media_Id",
                    "ImageWidgetName": "imgEmployee",
                    "hideWidgetNames": []
                };
               
                //    kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_DYNAMICSEGMENT, DynamicWidget, "Employee", "mediaEmployee", "", segmentConfiguration);
            }
            .bind(this, DynamicWidget),
            function(err) {
                handleError(err);
            });
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

    }
    catch (e) {
                  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.ErrorMessage.dynamicData")));
    }
  kony.print("-----------End DynamicSegmentSetDatabyEmployeeSearch --------");
};
/*
 *@function
 *@params : EmployeeSearchString - search string provided by the user
 *@returns: Processed data back to the Controller extension
 *@desc   : Data process is taken place here
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.
DynamicSegmentSetDataEmployee = function(Response, DynamicWidget) {
    try {
        //input validations
        if (isEmpty(DynamicWidget)) {
            handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.ErrorMessage.InvalidInput"));
            return;
        }

        for (var index in Response) {
            Response[index].username = {
                "text": Response[index].username
            };
            Response[index].shortName = {
                "text": Response[index].shortName
            };
        }
        DynamicWidget.setData(Response);
        //lazy loading
        var segmentConfiguration = {
            "MediaKeyAttribute": "Media_Id",
            "ImageWidgetName": "imgEmployee",
            "hideWidgetNames": []
        };
        //  kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_DYNAMICSEGMENT, DynamicWidget, "Employee", "mediaEmployee", "", segmentConfiguration); 

    }
    catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.ErrorMessage.dynamicData")));
    }

};
/*
 *@function
 *@params : data-filter parameters values
 *@params:successCallBack-function to be executed on sucess of FilterApply.
 *@returns: none
 *@desc   : filter the Data Based on the Given Parameters.
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.filterData = function(data, successCallBack) {
    var i = 0;
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
            "	   Group_concat(attribute_def.label) AS AttributeNAME" +
            "      FROM approval_request" +
            "	   LEFT JOIN Employee ON (approval_request.employee_id = Employee.Id)" +
            "	   LEFT JOIN request_approver ON (approval_request.id = request_approver.approval_id)" +
            "	   LEFT JOIN attribute ON (approval_request.id = attribute.approval_id)" +
            "	   LEFT JOIN attribute_def ON (attribute.attribute_def_id = attribute_def.id) " +
            "	   LEFT JOIN Status ON (request_approver.status_id = Status.Id)" +
            "	   LEFT JOIN request_category ON (approval_request.category_id = request_category.id)" +
            "	   LEFT JOIN request_type ON (approval_request.type_id = request_type.id) " +
            " WHERE  request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'";
        //-------------Query addition for fromDate and toDate
         if (data.fromDate != null && data.fromDate != "" && data.fromDate.length > 0 && data.toDate != null && data.toDate != "" && data.toDate.length > 0) {
        	query += " AND approval_request.request_date BETWEEN '" + data.fromDate + "' AND '" + data.toDate + "'";
        }
        //-------------Query addition for Request_Type
        if (data.requestType != null && data.requestType != "" && data.requestType.length > 0) {
            query += " AND request_type.name IN (";
            for (var i = 0; i < data.requestType.length; i++) {
                if (i == (data.requestType.length - 1)) {
                    query += "'" + data.requestType[i] + "'";
                }
                else {
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
                }
                else {
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
                }
                else {
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
            query += " AND request_approver.status_id = '" + data.status_id + "'";
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
    }
    catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.Filter")));
    }
};
/*
 *@function
 *@params :none
 *@returns: none
 *@desc   : code to be exceuted when segment scrolling Reached to End.
 */

kony.apps.coe.ess.ApprovalHistoryTab.prototype.onReachingEndOfSegment = function() {
    if (frmTabApprovalHistory.segApprList.data.length !== 0) {
        var data = {};
        data.count = kony.apps.coe.ess.globalVariables.PaginationRecordLength;
        data.offset = frmTabApprovalHistory.segApprList.data.length;
        kony.apps.coe.ess.ApprovalHistoryTab.prototype.filterData(data, this.onReachingEndOfSegmentQuerySuccess);
    }
};
/*
 *@function
 *@params:respone from the History query
 *@returns: none
 *@desc   : getting the data and adding to the segment
 */

kony.apps.coe.ess.ApprovalHistoryTab.prototype.onReachingEndOfSegmentQuerySuccess = function(response) {
    var data = (new kony.apps.coe.ess.ApprovalHistoryTab()).processHistoryData(response);
    for (var individualData in data) {
        frmTabApprovalHistory.segApprList.addDataAt(data[individualData], parseInt(frmTabApprovalHistory.segApprList.data.length), 0);
    }
};
/*
 *@function
 *@params :response_data -Response from the History query
 *@returns:returns process Data
 *@desc   :process the Data for Required Format
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.processHistoryData = function(response_data) {
    kony.print("----------- Begining of the Process data in the frmapprovalhome --------");
    try {
        var processedData = [];
        if ((isEmpty(response_data))) {
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
            if (processedRequest.attributejson != undefined) {
                processedRequest.attributejson = processedRequest.attributesNames.returnCombinationInJsonFormat(processedRequest.attributeValues, ",");
            }
            else {
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
            }
            else {
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
            }
            else {
                var approvedDate = new Date().modifyByYYYYMMDDHHMMSS(response_data[index].ApprovedDate).toDDmmmYY();
                processedRequest.status_value = response_data[index].StatusName + " on " + approvedDate;
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
                        }
                        else {
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
                        }
                        else {
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
            processedData.push(processedRequest);
        }

        kony.print("----------- End of the Process data in the frmapprovalhome --------");
        return processedData;
    }
    catch (e) {
        handleError(e);
    }
};
/*
 *@function
 *@params :none
 *@returns: none
 *@desc   : code to be executed on click of Apply Filter
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.filterApplyOnClick = function() {
    try {
        var query_data = {};
        query_data.fromDate = new Date(frmTabApprovalHistory.fromdate.year, frmTabApprovalHistory.fromdate.month - 1, frmTabApprovalHistory.fromdate.day);
        query_data.fromDate = query_data.fromDate.getDateInFormat("yyyymmdd");
        query_data.toDate = new Date(frmTabApprovalHistory.todate.year, frmTabApprovalHistory.todate.month - 1, frmTabApprovalHistory.todate.day);
        query_data.toDate = query_data.toDate.getDateInFormat("yyyymmdd");
        query_data.selectedRequestType = kony.apps.coe.ess.globalVariables.requestTypeSegements.SelectedItems;
        query_data.selectedStatusType = kony.apps.coe.ess.globalVariables.statusTypeSegments.SelectedItems;
        query_data.SelectedTotalPeoples = kony.apps.coe.ess.globalVariables.FrmTabApprovalsPeopleSearch.SelectedItems;
        query_data.requestType = [];
        query_data.statusType = [];
        query_data.totalPeoples = [];
        if (query_data.selectedRequestType != null && query_data.selectedRequestType.length > 0) {
            if (query_data.selectedRequestType[0].TYPE != 'All') {
                for (var i = 0; i < query_data.selectedRequestType.length; i++) {
                    query_data.requestType.push(query_data.selectedRequestType[i].TYPE.text);
                }
            }
        }

        if (query_data.selectedStatusType != null && query_data.selectedStatusType.length > 0) {
            if (query_data.selectedStatusType[0].Id != 'All') {
                for (var i = 0; i < query_data.selectedStatusType.length; i++) {
                    query_data.statusType.push(query_data.selectedStatusType[i].Id);
                }
            }
        }

        if (query_data.SelectedTotalPeoples != null && query_data.SelectedTotalPeoples.length > 0) {
            if (query_data.SelectedTotalPeoples[0].Id != 'All') {
                for (var i = 0; i < query_data.SelectedTotalPeoples.length; i++) {
                    query_data.totalPeoples.push(query_data.SelectedTotalPeoples[i].Id);
                }
            }
        }

        (new kony.apps.coe.ess.ApprovalHistoryTab()).filterData(query_data, this.filterApplyQuerySuccess);
    }
    catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.Filter")));
    }
};

/*
 *@function
 *@params :response after filters applied
 *@returns: none
 *@desc   : set the Data to Segement Based on the Filters Applied.
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.filterApplyQuerySuccess = function(response) {

    var data = (new kony.apps.coe.ess.ApprovalHistoryTab()).processHistoryData(response);
    try {
        var widgetDataMap = {
            "lblCreatedDate": "request_date",
            "lblName": "UserName",
            "lblPurpose": "categoryName",
            "lblApproved": "status_value",
            "lblIntials": "CreatedUserShortName",
            "lblRequestInfo": "RequestInfo",
            "imgType": "imgPurpose",
            "imgUser": "imgUser"
        };
        frmTabApprovalHistory.segApprList.widgetDataMap = widgetDataMap;
        frmTabApprovalHistory.segApprList.setData(data);
        kony.apps.coe.ess.ApprovalHistoryTab.segHistoryData = data;
        //start lazy  loadign for images in the segemtn
        // kony.apps.coe.ess.Approvals.frmSearch.lazyLoading();
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    }
    catch (err) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.bindDataSearch")));
        kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");

    }

};
/*
 *@function
 *@member  : ApprovalHistoryTab
 *@params : None
 *@returns: None
 *@desc   : Clears filtered data and sets default data
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.clearData = function() {
    kony.print("--Start clearData function--");
    var query_data = {}
	query_data.fromDate = null;
	query_data.toDate = null;
	query_data.requestType = [];
	query_data.statusType = [];
	query_data.totalPeoples = [];
  	query_data.count = kony.apps.coe.ess.globalVariables.PaginationRecordLength;
	query_data.offset = 0;
     var requestTypeSegements=[];
    var statusTypeSegments=[];
    var SelectedTotalPeoples=[];
    var index,i,SelectedCellData;
    requestTypeSegements=kony.apps.coe.ess.globalVariables.requestTypeSegements;
    statusTypeSegments=kony.apps.coe.ess.globalVariables.statusTypeSegments;
    SelectedTotalPeoples=kony.apps.coe.ess.globalVariables.FrmTabApprovalsPeopleSearch;
    for(i=0;i<requestTypeSegements.Data.length;i++){
	index = requestTypeSegements.SelectedIndexs.indexOf(i);
	requestTypeSegements.SelectedIndexs.push(i);
	requestTypeSegements.SelectedItems.push(requestTypeSegements.Data[i]);
	SelectedCellData = requestTypeSegements.Data[i];
	SelectedCellData[requestTypeSegements.selectionBehaviorConfig.imageIdentifier] = {
		"isVisible": true,
		"src": requestTypeSegements.selectionBehaviorConfig.unselectedStateImage
    };	
	requestTypeSegements.setDataAtIndex(i, SelectedCellData);
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
     for(i=0;i<SelectedTotalPeoples.Data.length;i++){
	 index = SelectedTotalPeoples.SelectedIndexs.indexOf(i);
	SelectedTotalPeoples.SelectedIndexs.push(i);
	SelectedTotalPeoples.SelectedItems.push(SelectedTotalPeoples.Data[i]);
    SelectedCellData = SelectedTotalPeoples.Data[i];
	SelectedCellData[SelectedTotalPeoples.selectionBehaviorConfig.imageIdentifier] = {
		"isVisible": true,
		"src": SelectedTotalPeoples.selectionBehaviorConfig.unselectedStateImage
    };		
	SelectedTotalPeoples.setDataAtIndex(i, SelectedCellData);
    }
    frmTabApprovalHistory.clearlbtn.skin = "skinBtn2ebaee";
    frmTabApprovalHistory.filterbtn.skin = "sknbtnWhite";
	(new kony.apps.coe.ess.ApprovalHistoryTab()).filterData(query_data, this.filterApplyQuerySuccess);
    kony.print("--End clearData function--");
};
/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : code to be executed on row click of SegList */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.onClickSegList = function() {
    showViewFilterHistory();

};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called onSelection of FromCalendar
 */
kony.apps.coe.ess.ApprovalHistoryTab.prototype.onFromClick = function() {
    frmTabApprovalHistory.todate.validStartDate = [frmTabApprovalHistory.fromdate.day,  frmTabApprovalHistory.fromdate.month,  frmTabApprovalHistory.fromdate.year];
    var from = "" +  frmTabApprovalHistory.fromdate.year + frmTabApprovalHistory.fromdate.month + frmTabApprovalHistory.fromdate.day;
    var to = "" + frmTabApprovalHistory.todate.year + frmTabApprovalHistory.todate.month + frmTabApprovalHistory.todate.day;
    if (parseInt(from) > parseInt(to)) {
       frmTabApprovalHistory.todate.dateComponents = [frmTabApprovalHistory.fromdate.day, frmTabApprovalHistory.fromdate.month, frmTabApprovalHistory.fromdate.year];
    }

};