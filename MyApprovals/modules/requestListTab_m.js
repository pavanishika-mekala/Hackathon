kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

var systemGenResponse;
var systemGenResponseMediaId;


/**
 * Creates a new Form Controller Extension.
 * @class frmApprovalRequestDetailControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.apps.coe.ess.Approvals.getApprovalsRequestList = function() {
    kony.print("---Start getApprovalsRequestList----");
};

/**
 * This method is an entry point for all fetch related flows. Developer can edit.
 * Default implementation fetches data for the form based on form config
 * @memberof frmApprovalRequestDetailControllerExtension#
 */
kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.
getApprovalsRequestPreshow = function(frmObj) {
    kony.print("--Inside Comment----");
    try {
        if (isEmpty(selectedApprovalID)) {
            return;
        }
        else {
            var comments_qurey = "SELECT [request_note].[id] AS [ID], " +
                "       [request_note].[comment] AS [Comment], " +
                "       [request_note].[employee_id] AS [Employee_id], " +
                "       [request_note].[approval_id] ," +
                "       [request_note].[createdts]   ," +
                "       [Employee].[First_Name] AS [FirstName], " +
                "       [Employee].[Last_Name] AS [LastName]" +
                "       FROM   [request_note]" +
                "       LEFT JOIN [Employee] ON ([Employee].[Id] = [request_note].[employee_id])" +
                "       WHERE  [request_note].[approval_id] = '" + selectedApprovalID + "' ";

            var UserAttachmentsQuery = "SELECT [approval_attachment].[id] AS [ID],  " +
                "       [approval_attachment].[type_id] AS [TYPE],  " +
                "       [approval_attachment].[media_id] AS [Media],  " +
                "       [approval_attachment].[approval_id] " +
                "FROM   [approval_attachment] " +
                "WHERE  [approval_attachment].[type_id] = '1' " +
                "       AND [approval_attachment].[approval_id] = '" + selectedApprovalID + "' ";


            var SystemGeneratedAttachmentsQuery = "SELECT [approval_attachment].[id] AS [ID],  " +
                "       [approval_attachment].[type_id] AS [TYPE],  " +
                "       [approval_attachment].[media_id] AS [Media],  " +
                "       [approval_attachment].[approval_id] " +
                "FROM   [approval_attachment] " +
                "WHERE  [approval_attachment].[type_id] = '2' " +
                "       AND [approval_attachment].[approval_id] = '" + selectedApprovalID + "' ";
            var Approval_request_query = "SELECT approval_request.id  AS ID," +
                "	   approval_request.due_date 		  AS Due_Date ," +
                " 	   approval_request.employee_id 	  AS CreatedByEmployeeid ," +
                "       approval_request.category_id       AS CategoryID," +
                "       approval_request.type_id           AS TypeID," +
                "       approval_request.islater           AS ISLater," +
                "       approval_request.isread            AS ISRead," +
                "       approval_request.request_date      AS RequestDate," +
                "       approval_request.leave_hours       AS Leave_hours," +
              	"       approval_request.leave_days        AS Leave_days," +
                "       employee.first_name                AS FirstName," +
                "		employee.Media_Id				   AS MediaID,	" +
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
                "		FROM   approval_request" +
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
                " and  approval_request.id ='" + selectedApprovalID + "'" +
                " GROUP  BY approval_request.id  ";



            var ApprovalRequestDetailData = {
                "comments": [],
                "userAttachments": [],
                "systemGeneratedAttachments": [],
                "RequestDetails": null

            };

            var SystemGeneratedAttachmentsRetival = function(ApprovalRequestDetailData) {
                kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", SystemGeneratedAttachmentsQuery, function(ApprovalRequestDetailData, systemGeneratedAttachmentsresponse) {
                        if (systemGeneratedAttachmentsresponse) {
                            ApprovalRequestDetailData.systemGeneratedAttachments = systemGeneratedAttachmentsresponse;
                        }
                        kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData = ApprovalRequestDetailData;
                        ApprovalRequestDetailData = (new kony.apps.coe.ess.Approvals.getApprovalsRequestList()).processData(ApprovalRequestDetailData,frmObj);
                    }.bind(this, ApprovalRequestDetailData),
                    function(err) {
                        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Attachments")));
                    });
            };
            var userAttachmentsRetival = function(ApprovalRequestDetailData) {
                kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", UserAttachmentsQuery, function(ApprovalRequestDetailData, UserAttachmentsresponse) {
                        if (UserAttachmentsresponse) {
                            ApprovalRequestDetailData.userAttachments = UserAttachmentsresponse;
                        }
                        SystemGeneratedAttachmentsRetival(ApprovalRequestDetailData);
                    }.bind(this, ApprovalRequestDetailData),
                    function(err) {
                        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Attachments")));
                    });
            };
            var commentsRetival = function(ApprovalRequestDetailData) {
                kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", comments_qurey, function(ApprovalRequestDetailData, Comemntsresponse) {
                        if (Comemntsresponse) {
                            ApprovalRequestDetailData.comments = Comemntsresponse;
                        }
                        userAttachmentsRetival(ApprovalRequestDetailData);

                    }
                    .bind(this, ApprovalRequestDetailData),
                    function(err) {
                        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
                    });
            };

            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", Approval_request_query, function(ApprovalRequestDetailData, RequestDetailsResponse) {
                    if (isEmpty(RequestDetailsResponse[0])) {
                        //return the control and throw exception                          
                        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments")));
                        return;
                    }
                    else {
                        var processedRequest = kony.apps.coe.ess.Approvals.ApprovalsHome.process_ApprovalRequest(RequestDetailsResponse[0]);
                        ApprovalRequestDetailData.RequestDetails = processedRequest;
                    }
                    commentsRetival(ApprovalRequestDetailData);

                }
                .bind(this, ApprovalRequestDetailData),
                function(err) {
                    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
                });
        }

    }
    catch (err) {
        kony.print("Exception ocurred" + JSON.stringify(err));
    }
};

/**
 * This method processes fetched data. Developer can edit.
 * Default implementation processes the provided data to required format for bind.
 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
 * @memberof frmApprovalRequestDetailControllerExtension#
 * @returns {Object} - processed data
 */
kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.processData = function(ApprovalRequestDetailData,frmObj) {
    try {
        kony.print("--------approvalRequestDetailData-----" + JSON.stringify(ApprovalRequestDetailData));
        var processedRequestDetail = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessData(ApprovalRequestDetailData.RequestDetails.request_type, ApprovalRequestDetailData.RequestDetails);
        ApprovalRequestDetailData.processedRequestDetail = processedRequestDetail;
        var frmobj = kony.application.getCurrentForm();
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblTitle, processedRequestDetail.Title);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblItemDet, processedRequestDetail.TitleDetail);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblPurchaseAmt, processedRequestDetail.RequestInfo);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblReqAmt, processedRequestDetail.RequesedInfoDetail);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblCardType, processedRequestDetail.AdditonalInfo);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblRequestOnDt, processedRequestDetail.RequestedDate);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblDueOnDate, processedRequestDetail.DueOnDate);
        systemGenResponse = ApprovalRequestDetailData.systemGeneratedAttachments;
        if (systemGenResponse.length > 0) {
            systemGenResponseMediaId = systemGenResponse[0].Media;
        }
        var processedComments = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessCommentsData(ApprovalRequestDetailData.comments);
        ApprovalRequestDetailData.comments = processedComments;
        this.getAuditTrailData();
		this.getFullDetails(frmObj);
		this.bindDataSeg(ApprovalRequestDetailData);
        return ApprovalRequestDetailData;
    }
    catch (err) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessage.ApprovalRequestDetail")));
    }
};

kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.getFullDetails = function(frmObj) {
    var ApprovalRequestFullDetailsQuery = "SELECT [approval_request].[id] AS [ID], " +
        "       [approval_request].[due_date] AS [Due_Date], " +
        "       [approval_request].[employee_id] AS [CreatedByEmployeeid], " +
        "       [approval_request].[category_id] AS [CategoryID], " +
        "       [approval_request].[type_id] AS [TypeID], " +
        "       [approval_request].[islater] AS [ISLater], " +
        "       [approval_request].[isread] AS [ISRead], " +
        "       [approval_request].[request_date] AS [RequestDate], " +
        "       [employee].[first_name] AS [FirstName], " +
        "       [employee].[Media_Id] AS [MediaID], " +
        "       [employee].[last_name] AS [LastName], " +
        "       [request_type].[NAME] AS [Type], " +
        "       [request_approver].[status_id] AS [StatusId], " +
        "       [status].[status_name] AS [StatusName], " +
        "       [request_approver].[approver_id] AS [Employee_id], " +
        "       [request_category].[NAME] AS [Category], " +
        "       [attribute].[id] AS [attributeID], " +
        "       [attribute].[attribute_def_id] AS [Attribute_DEF], " +
        "       [attribute_def].[attribute_section_id] AS [AttributeSection], " +
        "       GROUP_CONCAT (CASE WHEN [attribute_def].[attribute_section_id] = '2' THEN ([attribute].[value]) ELSE NULL END) AS [Attributevalue], " +
        "       GROUP_CONCAT (CASE WHEN [attribute_def].[attribute_section_id] = '2' THEN ([attribute_def].[label]) ELSE NULL END) AS [AttributeNAME]" +
        "FROM   [approval_request]" +
        "       LEFT JOIN [request_type] ON ([approval_request].[type_id] = [request_type].[id])" +
        "       LEFT JOIN [employee] ON ([approval_request].[employee_id] = [employee].[id])" +
        "       LEFT JOIN [status] ON ([request_approver].[status_id] = [status].[id])" +
        "       LEFT JOIN [request_approver] ON ([approval_request].[id] = [request_approver].[approval_id])" +
        "       LEFT JOIN [request_category] ON ([approval_request].[category_id] = [request_category].[id])" +
        "       LEFT JOIN [attribute] ON ([approval_request].[id] = [attribute].[approval_id])" +
        "       LEFT JOIN [attribute_def] ON ([attribute].[attribute_def_id] = [attribute_def].[id])" +
        "WHERE  [request_approver].[approver_id] = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
        "       AND [approval_request].[id] = '" + selectedApprovalID + "'" +
        "GROUP  BY [approval_request].[id];";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", ApprovalRequestFullDetailsQuery, function(response){getFullDetailSuccess(response,frmObj);},getFullDetailSuccess.bind(frmObj), getFullDetailError);

    function getFullDetailSuccess(response,frmObject) {
      
        kony.print("getFullDetailSuccess response"+response+"  frmObject"+frmObject );
        var frmobj = kony.application.getCurrentForm();
        kony.print("getFullDetailSuccess frmobj before"+  frmobj);
        frmobj=(frmobj===null ||frmobj===undefined)?frmObject:frmobj;
        kony.print("getFullDetailSuccess frmobj after"+  frmobj);
        var processedRequestDetail = kony.apps.coe.ess.Approvals.ApprovalsHome.process_ApprovalRequest(response[0]);
        var data = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessData(processedRequestDetail.request_type, processedRequestDetail);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblFullDetailsLabel, data.TitleDetail);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblExpenseType, data.statusText);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.lblExpenseDate, data.RequestDate);
        kony.apps.coe.ess.WidgetPropertyBinding(frmobj.imgExpenseDetails, data.Titleicon);
      
        var fullDetailsWidgetDataMap = {
            "lblType": "key",
            "lblValue": "value",
        };
        frmobj.segTabFullDetails.widgetDataMap = fullDetailsWidgetDataMap;
        var segData = jsonAttribtuesTOArray(data.attributejson);
        frmobj.segTabFullDetails.setData(segData);
    }

    function getFullDetailError(err) {

    }
};
/**
 * This method fetches and Process the Audit Trail data. Developer can edit.
 * @param {Object}-none
 * @memberof getApprovalsRequestList
 * @returns {Object} - ProcessesAuditTrailData
 */
kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.getAuditTrailData = function() {
    var auditTrailQuery = "select aa.*, emp.First_Name as First_Name from approval_audit aa left join Employee emp on aa.employee_id = emp.Id where aa.request_id = '" + selectedApprovalID + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", auditTrailQuery, auditTrailSucess, auditTrailError);

    function auditTrailSucess(auditTrailResponse) {
        for (var i in auditTrailResponse) {
            auditTrailResponse[i].templateType = 0;
        }
        var query = "select rn.comment as comments, rn.createdts as createdts, emp.First_Name as First_Name from request_note rn left join Employee emp on rn.employee_id = emp.Id where rn.approval_id = '" + selectedApprovalID + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallbackForComments.bind(this, auditTrailResponse), auditTrailError);

        function successCallbackForComments(data, commentResponse) {
            kony.print("---comment Response---" + commentResponse);
            for (var i in commentResponse) {
                commentResponse[i].templateType = 1;
                data.push(commentResponse[i]);
            }
            //quering data if timesheet is pending. 
            var query = "select ar.createdts as createdts, ra.status_id as status_id, emp.First_Name as First_Name from approval_request ar left join Employee emp on ra.approver_id = emp.Id left join request_approver ra on ra.approval_id = ar.id where ar.id = '" + selectedApprovalID + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallbackForPendingTimesheet.bind(this, data), auditTrailError);
        }

        function successCallbackForPendingTimesheet(data, timesheetResponse) {
            kony.print("--timesheet response--" + timesheetResponse);
            for (var i in timesheetResponse) {
                if (timesheetResponse[i].status_id === "2") {
                    data.push({
                        createdts: timesheetResponse[i].createdts,
                        status_id: timesheetResponse[i].status_id,
                        First_Name: timesheetResponse[i].First_Name,
                        description: "",
                        templateType: 0
                    });
                }
            }
            var ProcessedauditTrail = kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.processAuditTrailData(data);
            kony.print("---processedauditTrial is" + ProcessedauditTrail);
            var frmObj = kony.application.getCurrentForm();
            frmObj.segAudit.setData(ProcessedauditTrail);
        }
    }

    function auditTrailError(err) {
        kony.print("Exception ocurred" + JSON.stringify(err));
    }


};


/**
 * This method fetches and Process the Audit Trail data.
 * @param {Object}-Audit trail Data Response
 * @memberof getApprovalsRequestList
 * @returns {Object} - processed the Audit Trail Data.
 */
kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.processAuditTrailData = function(data) {
    var statusImages = {
        "0": "approved_audit.png",
        "1": "rejected_audit.png",
        "2": "pending_audit.png",
        "3": "canceled_audit.png",
        "4": "",
        "5": "saved_audit.png",
        "6": "system_error_audit.png",
        "7": "submitted_audit.png"
    };
    try {
        var scopeObj = this;
        var processedData = [];
        //sorting increasing order of created timestamp
        data.sort(function(a, b) {
            return a.createdts.localeCompare(b.createdts);
        });
        for (var i in data) {
            //parsing to string
            var dateStr = String(data[i].createdts);
            var date = "";
            //checking condition for invalid date
            if (dateStr !== null && dateStr !== undefined && dateStr !== "" && dateStr.toLowerCase() !== "null") {
                //converting from date string (e.g. 20170212020456) to date object
                date = new Date(dateStr.substring(0, 4), parseInt(dateStr.substring(4, 6)) - 1, dateStr.substring(6, 8), dateStr.substring(8, 10), dateStr.substring(10, 12), dateStr.substring(12, 16));
                //converting to required date format i.e. DD MMM HH mm am/pm.
                date = date.toHHMMMHHmm();
            }
            //assigning different template for comments and audit record.
            if (parseInt(data[i].templateType) === 0) {
                data[i].status_id = String(data[i].status_id);
                var status = "";
                if (data[i].status_id !== null && data[i].status_id !== undefined && data[i].status_id.toLowerCase() !== "null" && data[i].status_id !== "") {
                    // getting status value using status id
                    status = kony.apps.coe.ess.globalVariables.Status.idToStr[data[i].status_id];
                    status = status.charAt(0).toUpperCase() + status.substring(1, status.length).toLowerCase();
                }
                processedData.push({
                    lblEventName: status,
                    lblEventDesc: data[i].description,
                    lblPersonName: data[i].First_Name,
                    lblDate: date,
                    imgStatus: statusImages[data[i].status_id],
                    lblBottomLine: {
                        isVisible: true
                    },
                    lblVerticalLineTop: {
                        isVisible: true
                    },
                    lblVerticalLineBottom: {
                        text: "",
                        isVisible: (i >= data.length - 1 ? false : true)
                    }
                });
            }
            else if (parseInt(data[i].templateType) === 1) {
                processedData.push({
                    lblEventName: kony.i18n.getLocalizedString("i18n.ess.common.userComment"),
                    lblEventDesc: data[i].comments,
                    lblPersonName: data[i].First_Name,
                    lblDate: date,
                    imgStatus: "comment_audit.png",
                    lblVerticalLineTop: {
                        text: "",
                        isVisible: true
                    },
                    lblBottomLine: {
                        text: "",
                        isVisible: true
                    },
                    lblVerticalLineBottom: {
                        text: "",
                        isVisible: (i >= data.length - 1 ? false : true)
                    }
                });
            }

        }
        return processedData;
    }
    catch (err) {
        kony.print("Exception ocuured" + JSON.stringify(err));
    }
};

kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.bindDataSeg = function(ApprovalRequestDetailData) {
    try {
        var WidgetDatamap;
        var SegChatDataMap;
        var frmobj = kony.application.getCurrentForm();

        kony.print("---------------ApprovalRequestDetailData----" + ApprovalRequestDetailData);
        SegChatDataMap = {
            "lblShortName": "ShortName",
            "lblAppliedOn": "Appliedon",
            "lblName": "UserName",
            "lblChat": "Comment",
            "template": "template",
            "flxcomment": "flxcomment",
            "imgUser": "imgUser"
        };
        for (var index in ApprovalRequestDetailData.comments) {
            ApprovalRequestDetailData.comments[index].flxcomment = {
                "highlightedSkin": "sknflxMob2ebaee",
                "highlightOnParentFocus": true
            };
        }
        if (ApprovalRequestDetailData.comments.length === 0) {
            // frmTabListView.flxButtons.setVisibility(true);
            frmobj.lblNoComments.setVisibility(true);
        }
        frmobj.segtabComments.widgetDataMap = SegChatDataMap;
        frmobj.segtabComments.setData(ApprovalRequestDetailData.comments);
        //start lazy loading for images in the comments
        //kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.startLazyloadingComments();
        if (ApprovalRequestDetailData.userAttachments && ApprovalRequestDetailData.userAttachments.length && ApprovalRequestDetailData.userAttachments.length > 0) {
            WidgetDatamap = {
                "lblPeopleName": "Media"
            };
            frmobj.segAttach.widgetDataMap = WidgetDatamap;
            frmobj.segAttach.setData(ApprovalRequestDetailData.userAttachments);
            frmobj.lblNoAttachements.setVisibility(false);
            frmobj.segAttach.setVisibility(true);
        }
        else {
            frmobj.lblNoAttachements.setVisibility(true);
            frmobj.segAttach.setVisibility(false);
        }
        
        
    }
    catch (err) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessage.ApprovalRequestDetail")));
    }

};
kony.apps.coe.ess.Approvals.getApprovalsRequestList.ProcessDataa =
    function(requestType, ContextData, ApprovalRequestComments) {
        try {
            var ApprovalrequestDetail = {
                "UserName": "",
                "Titleicon": "",
                "Title": "",
                "TitleDetail": "",
                "RequestInfo": "",
                "RequesedInfoDetail": "",
                "AdditonalInfo": "",
                "RequestedDate": "",
                "DueOnDate": "",
                "statusText": "",
                "statusFlx": ""
            }
            //status Ui changes
            ApprovalrequestDetail.statusText = {
                "text": ContextData.StatusName
            }
            if (ContextData.StatusId == 0) {
                //approved approavl request
                ApprovalrequestDetail.statusFlx = {
                    "skin": "sknflx3fbd00"
                }
            }
            else if (ContextData.StatusId == 1) {
                //rejected approval request
                ApprovalrequestDetail.statusFlx = {
                    "skin": "sknflxf51d00"
                }
            }
            else {
                //pending Approval request
                ApprovalrequestDetail.statusFlx = {
                    "skin": "sknflxfecc66"
                }
            }

            ApprovalrequestDetail.UserName = {
                "text": ContextData.UserName.text
            };
            ApprovalrequestDetail.TitleDetail = {
                "text": ContextData.category.text
            };
            ApprovalrequestDetail.RequestInfo = ContextData.RequestInfo;
            ApprovalrequestDetail.AdditonalInfo = ContextData.AdditionalData;
            var requestedDate = new Date(ContextData.RequestDateString)
            ApprovalrequestDetail.RequestedDate = {
                "text": requestedDate.toDDmmmYY()
            };
            var dueDate = new Date(ContextData.dueDateString);
            ApprovalrequestDetail.DueOnDate = {
                "text": dueDate.toDDmmmYY()
            };

            switch (requestType) {
                case "LEAVE":
                    ApprovalrequestDetail.Titleicon = {
                        "src": "leave_item.png"
                    }
                    ApprovalrequestDetail.Title = {
                        "text": kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.Leave")
                    };
                    ApprovalrequestDetail.RequesedInfoDetail = {
                        "text": ""
                    };
                    break;
                case "TIMESHEET":
                    ApprovalrequestDetail.Titleicon = {
                        "src": "time_item.png"
                    }
                    ApprovalrequestDetail.Title = {
                        "text": kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.Timesheet")
                    };
                    ApprovalrequestDetail.RequesedInfoDetail = {
                        "text": ""
                    };
                    break;
                case "EXPENSES":
                    ApprovalrequestDetail.Titleicon = {
                        "src": "expense_item.png"
                    }
                    if (ContextData.attributejson && ContextData.attributejson.REPORT_NAME) {

                        ApprovalrequestDetail.Title = {
                            "text": ApprovalrequestDetail.attributejson.REPORT_NAME
                        };
                    }
                    else {
                        ApprovalrequestDetail.Title = {
                            "text": ""
                        };
                    }
                    if (ContextData.attributejson && ContextData.attributejson.APPROVED_AMT && ContextData.attributejson.CURRENCY) {
                        ApprovalrequestDetail.RequesedInfoDetail = {
                            "text": ContextData.attributejson.CURRENCY + ContextData.attributejson.APPROVED_AMT
                        };
                    }
                    else {
                        ApprovalrequestDetail.RequesedInfoDetail = {
                            "text": ""
                        };

                    }

                    break;
                case "PURCHASEORDER":
                    ApprovalrequestDetail.Titleicon = {
                        "src": "purchase_order_in_details.png"
                    };
                    ApprovalrequestDetail.Title = {
                        "text": ContextData.attributejson.RequestID
                    };

                    ApprovalrequestDetail.RequesedInfoDetail = {
                        "text": ""
                    };
                    if (ContextData.attributejson && ContextData.attributejson.RequestID) {
                        ApprovalrequestDetail.TitleDetail = {
                            "text": ContextData.category.text
                        };
                    }

                    break;
                case "WORKORDER":
                    ApprovalrequestDetail.Titleicon = {
                        "src": "work_order_details.png"
                    };
                    if (isEmpty(ContextData.attributejson.RequestID)) {
                        ApprovalrequestDetail.Title = {
                            "text": ""
                        };
                    }
                    else {
                        ApprovalrequestDetail.Title = {
                            "text": ContextData.attributejson.RequestID
                        };
                    }
                    if (isEmpty(ContextData.attributejson.WorkOrderPriority)) {
                        ApprovalrequestDetail.RequesedInfoDetail = {
                            "text": ""
                        };
                    }
                    else {
                        ApprovalrequestDetail.RequesedInfoDetail = {
                            "text": ContextData.attributejson.WorkOrderPriority + " " + kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.WorkOrderType.Priority")
                        };
                    }
                    ApprovalrequestDetail.TitleDetail = {
                        "text": ContextData.category.text
                    };
                    break;
                case 'PURCHASEREQUISITION':
                    ApprovalrequestDetail.Titleicon = {
                        "src": "purchase_request_in_detail.png"
                    };
                    if (isEmpty(ContextData.attributejson.RequestID)) {
                        ApprovalrequestDetail.Title = {
                            "text": ""
                        };
                    }
                    else {
                        ApprovalrequestDetail.Title = {
                            "text": ContextData.attributejson.RequestID
                        };
                    }
                    ApprovalrequestDetail.RequesedInfoDetail = {
                        "text": ""
                    };
                    ApprovalrequestDetail.TitleDetail = {
                        "text": ContextData.category.text
                    };
                    break;
                default:
                    ApprovalrequestDetail.Titleicon = {
                        "src": ""
                    }
                    ApprovalrequestDetail.Title = {
                        "text": kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.Timesheet")
                    };
                    if (ContextData.attributejson && ContextData.attributejson.RequestID) {

                        ApprovalrequestDetail.RequesedInfoDetail = {
                            "text": ContextData.attributejson.RequestID
                        };
                    }
                    else {
                        ApprovalrequestDetail.RequesedInfoDetail = {
                            "text": ""
                        };

                    }
            }
            return ApprovalrequestDetail;
        }
        catch (e) {
            popupErrorAlert.lblMessage.text = "Error in the Processing the data for the approval request" + e.message
            popupErrorAlert.show();
        }

    };
/**
 * This method fetches and Process the Full Details of the Approval Request
 * @param {Object}-Approval Request Response
 * @memberof getApprovalsRequestList
 * @returns {Object} - processed Full Details
 */
kony.apps.coe.ess.Approvals.getApprovalsRequestList.
process_ApprovalRequest = function(approvalRequest) {
    try {
        var processedRequest = {};
        processedRequest = approvalRequest;
        //common segment values
        processedRequest.StatusId = approvalRequest.StatusId;
        processedRequest.StatusName = approvalRequest.StatusName;
        processedRequest.request_type = approvalRequest.Type;
        processedRequest.ID = approvalRequest.ID;
        processedRequest.remaingHours = 0;
        processedRequest.RequestDateObject = new Date().modifyByYYYYMMDDHHMMSS(approvalRequest.RequestDate);
        processedRequest.RequestDateString = processedRequest.RequestDateObject.toDateString();
        processedRequest.RequestDate = processedRequest.RequestDateObject.toDDmmmHHMMtt();
        processedRequest.attributesNames = approvalRequest.AttributeNAME;
        processedRequest.attributeValues = approvalRequest.Attributevalue;
        processedRequest.attributejson = processedRequest.attributesNames.returnCombinationInJsonFormat(processedRequest.attributeValues, ",");
        processedRequest.RequestInfo = "";
        processedRequest.AdditionalData = "";
        var requestTypeSkin = "";
        processedRequest.requestTypeImage = "";
        processedRequest.requestTypeInfoImage = "";
        processedRequest.requestTypeBorderSkin = "";
        processedRequest.dueDateObject = new Date().modifyByYYYYMMDDHHMMSS(approvalRequest.Due_Date);
        processedRequest.dueDateString = processedRequest.dueDateObject.toDateString();
        processedRequest.FlxTimerUi = {
            isVisible: false
        };
        if (approvalRequest.Category) {
            processedRequest.category = approvalRequest.Category;
        }
        else {
            processedRequest.category = "";
        }
        //delegation
        if (approvalRequest.Delegated) {
            processedRequest.Delegated = {
                "isVisible": true
            };
        }
        else {
            processedRequest.Delegated = {
                "isVisible": false
            };
        }
        //retriving the employee Name
        processedRequest.UserName = "";
        processedRequest.CreatedUserShortName = "";

        if (approvalRequest.CreatedByEmployeeid && approvalRequest.CreatedByEmployeeid != "" && approvalRequest.CreatedByEmployeeid.toLowerCase() != null) {
            //employee id exsists

            if (approvalRequest.FirstName && approvalRequest.FirstName.toLowerCase() != null) {
                processedRequest.UserName = approvalRequest.FirstName;
                processedRequest.CreatedUserShortName = approvalRequest.FirstName.charAt(0);
            }
            if (approvalRequest.LastName && approvalRequest.LastName.toLowerCase() != null) {
                processedRequest.UserName = processedRequest.UserName + " " + approvalRequest.LastName;
                if (approvalRequest.LastName.charAt(0))
                    processedRequest.CreatedUserShortName = processedRequest.CreatedUserShortName + approvalRequest.LastName.charAt(0);
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
        if (processedRequest.CreatedUserShortName != undefined) {
            // convert the CreatedUserShortName to ALL CAPS. It looks good.
            processedRequest.CreatedUserShortName = processedRequest.CreatedUserShortName.toUpperCase();
        }

        processedRequest.UserName = {
            "text": processedRequest.UserName
        };
        var remaningDueDays = (processedRequest.dueDateObject - new Date()) / (1000 * 3600 * 24);
        if (remaningDueDays > 1 || remaningDueDays < 0) {
            //show due date in DD mmm YYYY format
            processedRequest.dueDate = {
                "isVisible": true
            };
            processedRequest.dueDate.text = processedRequest.dueDateObject.toDDmmmYYYY();
            processedRequest.FlxTimerUi.isVisible = false;

        }
        else {
            //show the timer ui in segment
            processedRequest.remaingHours = Math.floor(remaningDueDays * 24).toFixed();
            processedRequest.dueDate = {
                "isVisible": false
            };
            processedRequest.FlxTimerUi.isVisible = true;
        }

        switch (processedRequest.request_type) {
            case "LEAVE":
                kony.print("---The request is of type LEAVE----");
                //retriving the startDate and EndDate
                if (processedRequest.attributejson.StartDate && processedRequest.attributejson.EndDate) {
                    var startdate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.StartDate);
                    var endDate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.EndDate);
                    var diff = (endDate - startdate) / (1000 * 3600 * 24);
                    if (diff >= 1) {
                        //multiple days leave
                        processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + endDate.retriveMonthName().substring(0, 3);
                        processedRequest.AdditionalData = {
                            "text": " " + Math.round(Number(diff) + 1).toString() + " Day(s) ",
                            "isVisible": true
                        };
                    }
                    else {
                        //single Day leave
                        processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3);
                        processedRequest.AdditionalData = {
                            isVisible: false
                        };
                    }

                }
                // request type specific skin and images and info images and border color changes
                requestTypeSkin = "sknlblMob7986CB100o";
                processedRequest.flxUserImg = {
                    "skin": "sknFlxMobffffffo0B7986CB"
                };
                processedRequest.requestTypeImage = "leave.png";
                processedRequest.requestTypeInfoImage = "leave_info.png";
                processedRequest.lblDueDateHeader = {
                    "skin": "sknLblMob7986CB100OFS28px",
                    "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
                };
                processedRequest.requestTypeBorderSkin = {
                    "skin": "sknFlxMob7986cb100O"
                };
                processedRequest.requestTypeBorderSkin2 = {
                    "skin": "sknFlxMob7986cb100O"
                };
                //modification of category and request Info for the segment ui
                processedRequest.category = {
                    "text": processedRequest.category,
                    skin: requestTypeSkin + "34px"
                };
                processedRequest.RequestInfo = {
                    "text": processedRequest.RequestInfo,
                    skin: requestTypeSkin + "32px"
                };

                break;
            case "TIMESHEET":
                kony.print("The request is of type TIMESHEET");

                //retriving the startDate and EndDate
                if (processedRequest.attributejson.StartDate && processedRequest.attributejson.EndDate) {
                    var startdate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.StartDate);
                    var endDate = new Date().modifyByYYYYMMDDHHMMSS(processedRequest.attributejson.EndDate);
                    var diff = (endDate - startdate) / (1000 * 3600 * 24);

                    if (diff >= 1) {
                        //multiple days leave
                        processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + endDate.retriveMonthName().substring(0, 3);
                        processedRequest.AdditionalData = {
                            "text": " " + Math.round(Number(diff) + 1).toString() + " Day(s) ",
                            "isVisible": true
                        };
                    }
                    else {
                        //single Day leave
                        processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3);
                        processedRequest.AdditionalData = {
                            isVisible: false
                        };
                    }

                }

                // request type specific skin and images
                requestTypeSkin = "sknLblMob039BE5100OFS";
                processedRequest.flxUserImg = {
                    "skin": "sknFlxMobffffffo0BBA68C8"
                };
                processedRequest.requestTypeImage = "time.png";
                processedRequest.requestTypeInfoImage = "time_info.png";
                processedRequest.lblDueDateHeader = {
                    "skin": "sknLblMobBA68C8100OFS28px",
                    "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
                };
                processedRequest.requestTypeBorderSkin = {
                    "skin": "sknFlxMob039be5100O"
                };
                processedRequest.requestTypeBorderSkin2 = {
                    "skin": "sknFlxMob039be5100O"
                };
                //modification of category and request Info for the segment ui
                processedRequest.category = {
                    "text": processedRequest.category,
                    "skin": requestTypeSkin + "34px"
                };
                processedRequest.RequestInfo = {
                    "text": processedRequest.RequestInfo,
                    "skin": requestTypeSkin + "32px"
                };

                break;
            case "EXPENSES":
                kony.print("The request is of type EXPENSES");
                if (processedRequest.attributejson.CURRENCY && processedRequest.attributejson.CLAIMED_AMT)
                    processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + " " + currencyFormartting(processedRequest.attributejson.CLAIMED_AMT);
                processedRequest.AdditionalData = {
                    isVisible: false
                };

                // request type specific skin and images
                requestTypeSkin = "sknLblMob1DB6C9100OFS";
                processedRequest.flxUserImg = {
                    "skin": "sknFlxMobffffffo0B1DB6C9"
                };
                processedRequest.requestTypeImage = "expense.png";
                processedRequest.requestTypeInfoImage = "expense_info.png";
                processedRequest.lblDueDateHeader = {
                    "skin": "sknLblMob1DB6C9100OFS28px",
                    "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
                };
                processedRequest.requestTypeBorderSkin = {
                    "skin": "sknFlxMob1db6c9100O"
                };
                processedRequest.requestTypeBorderSkin2 = {
                    "skin": "sknFlxMob1db6c9100O"
                };
                //modification of category and request Info for the segment ui
                processedRequest.category = {
                    "text": processedRequest.category,
                    skin: requestTypeSkin + "34px"
                };
                processedRequest.RequestInfo = {
                    "text": processedRequest.RequestInfo,
                    skin: requestTypeSkin + "32px"
                };
                break;
            case "PURCHASEORDER":
                kony.print("The request is of type PURCHORDER");
                if (processedRequest.attributejson.CURRENCY && processedRequest.attributejson.PurchaseOrderAmount) {
                    processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + " " + currencyFormartting(processedRequest.attributejson.PurchaseOrderAmount);
                }

                processedRequest.AdditionalData = {
                    isVisible: false
                };

                // request type specific skin and images
                requestTypeSkin = "sknLblMob058594100OFS";
                processedRequest.flxUserImg = {
                    "skin": "sknFlxMobffffffo0B058594"
                };
                processedRequest.requestTypeImage = "purchase_order_in_now.png";
                processedRequest.requestTypeInfoImage = "purchase_order_info_in_now.png";
                processedRequest.lblDueDateHeader = {
                    "skin": "sknLblMob058594100OFS28px",
                    "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
                };
                processedRequest.requestTypeBorderSkin = {
                    "skin": "sknFlxMob1db6c9100O"
                };
                processedRequest.requestTypeBorderSkin2 = {
                    "skin": "sknFlxMob1db6c9100O"
                };
                //modification of category and request Info for the segment ui
                processedRequest.category = {
                    "text": processedRequest.category,
                    skin: requestTypeSkin + "34px"
                };
                processedRequest.RequestInfo = {
                    "text": processedRequest.RequestInfo,
                    skin: requestTypeSkin + "32px"
                };
                break;
            case "WORKORDER":
                kony.print("The request is of type WORKORDER");
                if (processedRequest.attributejson.BusinessUnit) {
                    processedRequest.RequestInfo = processedRequest.attributejson.BusinessUnit;
                }
                processedRequest.AdditionalData = {
                    isVisible: false
                };

                // request type specific skin and images
                requestTypeSkin = "sknLblMob0284B5100OFS";
                processedRequest.flxUserImg = {
                    "skin": "sknFlxMobffffffo0B0284B5"
                };
                processedRequest.requestTypeImage = "work_order_in_now.png";
                processedRequest.requestTypeInfoImage = "work_order_info_in_now.png";
                processedRequest.lblDueDateHeader = {
                    "skin": "sknLblMob0284B5100OFS28px",
                    "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
                };
                processedRequest.requestTypeBorderSkin = {
                    "skin": "sknFlxMob7986cb100O"
                };
                processedRequest.requestTypeBorderSkin2 = {
                    "skin": "sknFlxMob7986cb100O"
                };
                //modification of category and request Info for the segment ui
                processedRequest.category = {
                    "text": processedRequest.category,
                    skin: requestTypeSkin + "34px"
                };
                processedRequest.RequestInfo = {
                    "text": processedRequest.RequestInfo,
                    skin: requestTypeSkin + "32px"
                };

                break;
            case 'PURCHASEREQUISITION':
                kony.print("--The request is of type Purchase Requisition--");
                if (processedRequest.attributejson.CURRENCY && processedRequest.attributejson.AMOUNT) {
                    processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + " " + currencyFormartting(processedRequest.attributejson.AMOUNT);
                }
                processedRequest.AdditionalData = {
                    isVisible: false
                };

                // request type specific skin and images
                requestTypeSkin = "sknLblMob4186D1100OFS";
                processedRequest.flxUserImg = {
                    "skin": "sknFlxMobffffffo0B4186D1"
                };
                processedRequest.requestTypeImage = "pr_now.png";
                processedRequest.requestTypeInfoImage = "pr_info_in_now.png";
                processedRequest.lblDueDateHeader = {
                    "skin": "sknLblMob4186D1100OFS28px",
                    "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
                };
                processedRequest.requestTypeBorderSkin = {
                    "skin": "sknFlxMob4186D1100O"
                };
                processedRequest.requestTypeBorderSkin2 = {
                    "skin": "sknFlxMob4186D1100O"
                };
                //modification of category and request Info for the segment ui
                processedRequest.category = {
                    "text": processedRequest.category,
                    skin: requestTypeSkin + "34px"
                };
                processedRequest.RequestInfo = {
                    "text": processedRequest.RequestInfo,
                    skin: requestTypeSkin + "32px"
                };

                break;
            default:
                kony.print("The request doesn't  match with any case setting the defalut segement and mappings ");
                // request type specific skin and images
                return null;
        }

        return processedRequest;
    }
    catch (e) {
        handleError(e);
    }

};
kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.getCommentsData = function() {
    try {
        if (isEmpty(selectedApprovalID)) {
            return;
        }
        else {
            var ApprovalRequestDetailData = {
                "comments": [],
                "userAttachments": [],
                "systemGeneratedAttachments": [],
                "RequestDetails": null

            };
            var comments_qurey = "SELECT [request_note].[id] AS [ID], " +
                "       [request_note].[comment] AS [Comment], " +
                "       [request_note].[employee_id] AS [Employee_id], " +
                "       [request_note].[approval_id] ," +
                "       [request_note].[createdts]   ," +
                "       [Employee].[First_Name] AS [FirstName], " +
                "       [Employee].[Last_Name] AS [LastName]" +
                "       FROM   [request_note]" +
                "       LEFT JOIN [Employee] ON ([Employee].[Id] = [request_note].[employee_id])" +
                "       WHERE  [request_note].[approval_id] = '" + selectedApprovalID + "' ";
            var commentsRetival = function(ApprovalRequestDetailData) {
                kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", comments_qurey, function(ApprovalRequestDetailData, Comemntsresponse) {
                        if (Comemntsresponse) {
                            ApprovalRequestDetailData.comments = Comemntsresponse;
                        }
                    }
                    .bind(this, ApprovalRequestDetailData),
                    function(err) {
                        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
                    });
            };
            commentsRetival(ApprovalRequestDetailData);
            var processedComments = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessCommentsData(ApprovalRequestDetailData.comments);
            ApprovalRequestDetailData.comments = processedComments;
            var WidgetDatamap;
            var SegChatDataMap;
            kony.print("---------------ApprovalRequestDetailData----" + ApprovalRequestDetailData);
            SegChatDataMap = {
                "lblShortName": "ShortName",
                "lblAppliedOn": "Appliedon",
                "lblName": "UserName",
                "lblChat": "Comment",
                "template": "template",
                "flxcomment": "flxcomment",
                "imgUser": "imgUser"
            };
            for (var index in ApprovalRequestDetailData.comments) {
                ApprovalRequestDetailData.comments[index].flxcomment = {
                    "highlightedSkin": "sknflxMob2ebaee",
                    "highlightOnParentFocus": true
                };
            }
            if (ApprovalRequestDetailData.comments.length === 0) {
                frmTabListView.lblNoComments.setVisibility(true);
            }
            frmTabListView.segtabComments.widgetDataMap = SegChatDataMap;
            frmTabListView.segtabComments.setData(ApprovalRequestDetailData.comments);
        }
    }
    catch (err) {
        kony.print("Exception ocurred" + JSON.stringify(err));
    }
};
kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.onClickApprove = function() {
    var frmobj = kony.application.getCurrentForm();
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment(selectedApprovalID, frmobj.txtComments.text);
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(selectedApprovalID);
    (new kony.apps.coe.ess.Approvals.getApprovalsRequestList()).getApprovalsRequestPreshow();
    frmobj.lblNoComments.setVisibility(false);
    frmobj.flxDecision.setVisibility(false);
  	//#ifndef windows8
    frmobj.flxComments.height = "100%";
    //#endif
    frmobj.segtabComments.height = "100%";
    frmobj.forceLayout();
};
kony.apps.coe.ess.Approvals.getApprovalsRequestList.prototype.onClickReject = function() {
    var frmobj = kony.application.getCurrentForm();
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment(selectedApprovalID, frmobj.txtComments.text);
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(selectedApprovalID);
    (new kony.apps.coe.ess.Approvals.getApprovalsRequestList()).getApprovalsRequestPreshow();
    frmobj.lblNoComments.setVisibility(false);
    frmobj.flxDecision.setVisibility(false);
	//#ifndef windows8
    frmobj.flxComments.height = "100%";
    //#endif    
    frmobj.segtabComments.height = "100%";
    frmobj.forceLayout();
};