/**
 * @module tabApprovalsDashboard
 * @author Poojitha.Ippili
 * @category actions (UI) 
 * @description approvalsDashboardWin_m class. 
 * © 2017 Kony Inc. 
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

// Region - Class / object constructor. 
/**
 * @class tabApprovalsDashboard
 * this class for frmTabDashboard
 * this class for UI operations in the frmTabDashboard
 */

kony.apps.coe.ess.Approvals.approvalsDashboardWin = function() {
  kony.print(":::Start approvalsDashboardWin:::");
};
/**
 * @function getApprovalsDetailsPreshow
 * this function is to set the data to the approval cards for recent and pending requests
 * this is called in frmTabDashboard preshow
 */
kony.apps.coe.ess.Approvals.approvalsDashboardWin.prototype.getApprovalsDetailsPreshow = function() {
  kony.print(":::Inside getApprovalsDetailsPreshow:::");
	//kony.print(":::Inside getApprovalsDetailsPreshow:::");
  try {
    var scopeObj = this;
    //kony.apps.coe.ess.globalVariables.EmployeeID = "910067"; //13000405 910067 13000002 13000387
    kony.apps.coe.ess.globalVariables.UserSortingKey="ESS_MYAPPROVALS_USERSETTING_SORTKEY";
    kony.print("---------Started execution of fetch data in the frmapproval Home controller extension----------");

    //query for the retrival of the Approval Requests
    if (kony.apps.coe.ess.globalVariables.EmployeeID) {
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
          "       employee.last_name                 AS LastName," +
          "       employee.Media_Id              	   AS MediaID," +
          "		CASE WHEN ([request_approver].[delegator_id] = '' OR  [request_approver].[delegator_id] ISNULL) THEN 0 ELSE 1 END AS [Delegated]," +
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
          "and attribute_def.attribute_section_id='1'" +
          "and request_approver.status_id='2' " +
          " and approval_request.islater='0'" +
          " GROUP  BY approval_request.id  ";
      kony.print("Approval_request_query-------------"+Approval_request_query);
     // kony.print("Approval_request_query-------------"+Approval_request_query);
      var userPriority = kony.store.getItem(kony.apps.coe.ess.globalVariables.UserSortingKey);
      if (isEmpty(userPriority)) {
        //Not selected the option to show first
        //DO nothing no changes in the query
      } else {
        Approval_request_query += " ORDER  BY  CASE WHEN [request_type].[name] = '" + userPriority + "' THEN 0 ELSE approval_request.request_date END ";
      }

      //query for the retrival of the Islater requests count
      var IsLaterRequests_query = "SELECT request_type.NAME AS TYPE, " +
          "        Count (IsLaterRequests.type_id) AS COUNT ," +
          "			request_type.id AS id " +
          " FROM   request_type " +
          "        LEFT JOIN (SELECT * " +
          "                   FROM   approval_request " +
          "                          LEFT JOIN request_approver " +
          "                                 ON ( request_approver.approval_id = " +
          "                                      approval_request.id " +
          "                                    ) " +
          "                   WHERE  approval_request.islater = 0 " +
          "                          AND request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
          "                          AND request_approver.status_id = '2') IsLaterRequests " +
          "               ON ( IsLaterRequests.type_id = request_type.id ) " +
          " GROUP  BY request_type.id ";

      kony.print("IsLaterRequests_query-------------"+IsLaterRequests_query);
      //kony.print("IsLaterRequests_query-------------"+IsLaterRequests_query);

      //retrving the approval requests whose islater value is 0
      var retriveApprovalRequestsData = function (ISLaterRequestsData) {

        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", Approval_request_query, function (ISLaterRequestsData, res) {
          //sending the control to the process data
          // filter records of only islater=0 && status=0
          var resultData = {
            "ISLaterRequestsData": ISLaterRequestsData,
            "ApprovalRequestData": res
          };
          kony.print("Result data is:::" +JSON.stringify(resultData));
         // kony.print("Result data is:::" +JSON.stringify(resultData));
          scopeObj.getApprovalsProcessData(resultData);                          							
        }
                                              .bind(this, ISLaterRequestsData),
                                              function (err) {
          kony.print(err);
          handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchApprovalRequest") + JSON.stringify(err)));
        });
      };

      // retriving the Islater requests and the request types

      kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", IsLaterRequests_query, function (retriveApprovalRequestsData, res) {
        //sending the control to the process data
        retriveApprovalRequestsData(res);
        kony.print("retriveApprovalRequestsData(res)"+JSON.stringify(retriveApprovalRequestsData(res)));
       // kony.print("retriveApprovalRequestsData(res)"+JSON.stringify(retriveApprovalRequestsData(res)));
      }
                                            .bind(this, retriveApprovalRequestsData),
                                            function (err) {
        kony.print("------------ error in the retriving of the islater request");
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest") + JSON.stringify(err)));
      });

    } else {
      kony.print("error in fetching the value of the employee id ");
      //creating the exception for the employee
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.EmployeeRetival")));
    }

    kony.print("---------End of fetch data in the frmapproval Home controller extension----------");

  } catch (err) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest")));
  }
};
/**
		 * This method processes fetched data. Developer can edit.
		 * Default implementation processes the provided data to required format for bind.
		 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
		 * @memberof frmApprovalHomeControllerExtension#
		 * @returns {Object} - processed data
		 */
kony.apps.coe.ess.Approvals.approvalsDashboardWin.ISLaterRequestsData = [];
kony.apps.coe.ess.Approvals.approvalsDashboardWin.prototype.getApprovalsProcessData=function (data) {
  kony.print("Inside getApprovalsProcessData");
  kony.print("Data in getApprovalsProcessData:::" +JSON.stringify(data));
  try {
    var scopeObj = this;
    var processedData = this.process_data_ForSegement(data.ApprovalRequestData);
    kony.apps.coe.ess.Approvals.tabApprovalsListView.requestTypeData = data.ISLaterRequestsData;
    var ISLaterRequestsData = data.ISLaterRequestsData;
    kony.print("ISLaterRequestsData:::" +JSON.stringify(ISLaterRequestsData));
    var processedIslaterRequestData = this.process_data_ForISlaterSegment(ISLaterRequestsData);
    var pendingRequestsCount = this.setPendingRequestsCount(ISLaterRequestsData);
    kony.print("pendingRequestsCount:::" +JSON.stringify(ISLaterRequestsData));
    //kony.apps.coe.ess.Approvals.approvalsDashboardWin.ISLaterRequestsData =  data.ISLaterRequestsData;
    kony.print("kony.apps.coe.ess.Approvals.approvalsDashboardWin.ISLaterRequestsData:::" +JSON.stringify(kony.apps.coe.ess.Approvals.approvalsDashboardWin.ISLaterRequestsData));

    var IslaterRequestsCount = 0;
    for (var index in ISLaterRequestsData) {

      IslaterRequestsCount += parseInt(ISLaterRequestsData[index].COUNT);
    }

    var resultData = {
      "ISLaterRequestsData": processedIslaterRequestData,
      "ApprovalRequestData": processedData,
      "IslaterRequestsCount": IslaterRequestsCount
    }
    kony.print("Result data in getApprovalsProcessData:::" +JSON.stringify(resultData));
    //this.getController().bindData(resultData);

    //return processedData;
    if(dashWidAdded===false)
     addDashDynCards(processedData);
  } catch (err) {
    //kony.print(err.message);
    kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest")));
  }

  kony.print("End of getApprovalsProcessData");
};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : JSON array consisting of sql response
 *@returns: Processed data back to the Controller extension
 *@desc   : Data process is taken place here
 */
var approved_data=[[],[]],rejected_data=[[],[]],pending_data=[[],[]];
kony.apps.coe.ess.Approvals.approvalsDashboardWin.prototype.process_data_ForSegement = function (response_data) {

  kony.print("----------- Begining of the Process data in the frmapprovalhome --------");
  kony.print("process_data_ForSegement Response data :::" +JSON.stringify(response_data));
  try {
    var processedData = [];
    if (response_data == null || response_data == undefined || response_data.length < 0 || response_data == '') {
      return [];
    }
    kony.print("Empty processed data::" +JSON.stringify(processedData));
    kony.print(" processed data length::" +response_data.length);
    if (response_data && response_data.length > 0) {
      kony.print("Response data :::" +JSON.stringify(response_data));
      for (var index in response_data) {
        var processedRequest = this.process_ApprovalRequest(response_data[index]);

        if (isEmpty(processedRequest)) {
          //skip the request not to show in approval request queue
        } else {
          //Alternate Skins for the Row 					
          if(index%2===0){
            processedRequest.flxCard={
              "skin" : "sknFlxFAFAFA20pxBlur"
            }
          }else{
            processedRequest.flxCard={
              "skin" : "sknFlxMobFFFFFF100O"
            }
          }
          processedData.push(processedRequest);
        }

      }
      for(var i=0;i<processedData.length;i++){
        switch(processedData[i].StatusId)
        {
          case '0':approved_data[parseInt(processedData[i].ISLater)].push(processedData[i]);break;
          case '1':rejected_data[parseInt(processedData[i].ISLater)].push(processedData[i]);break;
          case '2':pending_data[parseInt(processedData[i].ISLater)].push(processedData[i]);break;
        }
      }

      kony.print("Data in processed request:::" +JSON.stringify(processedData));
      kony.print("Data in processed request:::" +processedData);
      //kony.print("--approved_data:"+JSON.stringify(approved_data));kony.print("approved_len:"+approved_data.length);
      //kony.print("--rejected_data:"+JSON.stringify(rejected_data));kony.print("rejected_len:"+rejected_data.length);
      //kony.print("pending_len:"+processedData.length);
      //kony.print("pending_data[0]" +JSON.stringify(pending_data[0]));
     // this.setApprovalsDataToUI(processedData);
   
    } else {
      //null handing when the data is empty


    }
    kony.print("Processed Data is :::" +JSON.stringify(processedData));
    kony.print("----------- End of the Process data in the frmapprovalhome --------");
    return processedData;
  } catch (e) {
    kony.print("--the error is due to " + JSON.stringify(e) + "--");
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest")));
  }
};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : JSON  consisting of single approval request
 *@returns: returns the processed approval request in case of request which is not configured it is returned as null
 *@desc   : Data process is taken place here for single request
 */
kony.apps.coe.ess.Approvals.approvalsDashboardWin.prototype.process_ApprovalRequest = function (approvalRequest) {
  kony.print("Inside process_ApprovalRequest");
  kony.print("Approval Request data is:::"+JSON.stringify(approvalRequest));
  try {
    var processedRequest = {};
    processedRequest = approvalRequest;
    kony.print("processedRequestt data is:::"+JSON.stringify(processedRequest));
    //common segment values
    processedRequest.StatusId = approvalRequest.StatusId;
    processedRequest.StatusName = approvalRequest.StatusName;
    processedRequest.ISLater=processedRequest.ISLater;
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
    processedRequest.due_date= approvalRequest.Due_Date;
    processedRequest.request_date=approvalRequest.RequestDate;
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
    } else {
      processedRequest.category = "";
    }
    //delegation
    if (approvalRequest.Delegated) {
      processedRequest.Delegated = {
        "isVisible": true
      };
    } else {
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

    } else {
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
          } else {
            //single Day leave
            processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3);
            processedRequest.AdditionalData = {
              isVisible: false
            };
          }

        }
        // request type specific skin and images and info images and border color changes
        requestTypeSkin = "sknLbl7986CBHeavy40x";
        processedRequest.flxUserImg={
          "skin": ""
        };
        processedRequest.requestTypeImage = "leavewhite.png";
        processedRequest.requestTypeInfoImage = "leave_oval.png";
        processedRequest.lblDueDateHeader={
          "skin" : "sknLbl888888Roman28p",
          "text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
        };
        processedRequest.requestTypeBorderSkin = {
          "skin": "sknLbl7986CBHeavy40"
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
          } else {
            //single Day leave
            processedRequest.RequestInfo = startdate.getDate() + startdate.retriveMonthName().substring(0, 3);
            processedRequest.AdditionalData = {
              isVisible: false
            };
          }

        }

        // request type specific skin and images
        requestTypeSkin = "sknlblTimeType4A90E2";
        processedRequest.flxUserImg={
          "skin": ""
        };
        processedRequest.requestTypeImage = "time_title.png";
        processedRequest.requestTypeInfoImage = "time_oval.png";
        processedRequest.lblDueDateHeader={
          "skin" : "sknLbl888888Roman28px",
          "text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
        };
        processedRequest.requestTypeBorderSkin = {
          "skin": "sknlblTimeType4A90E2"
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
        requestTypeSkin = "lblExpTypeSkn1DB6C9";
        processedRequest.flxUserImg={
          "skin": "sknFlxMobffffffo0B1DB6C9"
        };         
        processedRequest.requestTypeImage = "expense_title.png";
        processedRequest.requestTypeInfoImage = "expense_oval.png";
        processedRequest.lblDueDateHeader={
          "skin" : "sknLbl888888Roman28px",
          "text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
        };
        processedRequest.requestTypeBorderSkin = {
          "skin": "lblExpTypeSkn1DB6C9"
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
        requestTypeSkin = "sknlblWONum0284B5";
        processedRequest.flxUserImg={
          "skin": ""
        }; 
        processedRequest.requestTypeImage = "purchase_order_in_list.png";
        processedRequest.requestTypeInfoImage = "po_oval.png";
        processedRequest.lblDueDateHeader={
          "skin" : "sknLbl888888Roman28px",
          "text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
        };
        processedRequest.requestTypeBorderSkin = {
          "skin": "sknlblWONum0284B5"
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
        requestTypeSkin = "sknlblWOName0284B5";
        processedRequest.flxUserImg={
          "skin": ""
        }; 
        processedRequest.requestTypeImage = "work_orde_in_list.png";
        processedRequest.requestTypeInfoImage = "wo_oval.png";
        processedRequest.lblDueDateHeader={
          "skin" : "sknLbl888888Roman28px",
          "text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
        };
        processedRequest.requestTypeBorderSkin = {
          "skin": "sknlblWOName0284B5"
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
        processedRequest.flxUserImg={
          "skin": "sknFlxMobffffffo0B4186D1"
        }; 
        processedRequest.requestTypeImage = "pr_now.png";
        processedRequest.requestTypeInfoImage = "pr_info_in_now.png";
        processedRequest.lblDueDateHeader={
          "skin" : "sknLblMob4186D1100OFS28px",
          "text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
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
    kony.print("Processed Request complete data is :::"+JSON.stringify(processedRequest));
    return processedRequest;
  } catch (e) {
    handleError(e);
  }
  kony.print("End of process_ApprovalRequest");
}
/*
 *@function
 *@class  : ApprovalsHome
 *@params : JSON array consisting of sql response
 *@returns: Processed data for the islater segment back to the Controller extension
 *@desc   : Data process is taken place here
 */

kony.apps.coe.ess.Approvals.approvalsDashboardWin.prototype.process_data_ForISlaterSegment = function (response_data) {
  kony.print("Inside process_data_ForISlaterSegment");
  kony.print(" process_data_ForISlaterSegment data:::" +JSON.stringify(response_data)); 
  var processed_data = [];
  if (response_data == null || response_data == undefined || response_data.length < 0 || response_data == '') {
    return [];
  }
  if (response_data) {
    for (var index in response_data) {

      var processed_request_type = {
        "COUNT": response_data[index].COUNT.toFixed(),
        "TYPE": response_data[index].TYPE,
        "ID": response_data[index].id,

      };
      switch (processed_request_type.TYPE) {
        case 'LEAVE':
          processed_request_type.Image = "leave_list.png";
          processed_request_type.NAME = "LEAVE";

          break;
        case 'TIMESHEET':
          processed_request_type.Image = "time_list.png";
          processed_request_type.NAME = "TIMESHEET";
          break;
        case 'EXPENSES':
          processed_request_type.Image = "expense_list.png";
          processed_request_type.NAME = "EXPENSE";
          break;
        case 'PURCHASEORDER':
          processed_request_type.Image = "po_list.png";
          processed_request_type.NAME = "PURCHASE ORDER";
          break;
        case 'WORKORDER':
          processed_request_type.Image = "wo_list.png";
          processed_request_type.NAME = "WORK ORDER";
          break;
        case 'PURCHASEREQUISITION':
          processed_request_type.Image = "purchase_requisition.png";
          processed_request_type.NAME = "Purchase Requistion";
          break;
        default:
          continue;
      }

      processed_data.push(processed_request_type);

    }

  }
  return processed_data;
};
kony.apps.coe.ess.Approvals.approvalsDashboardWin.prototype.setPendingRequestsCount = function(data){
  kony.print("Inside setPendingRequestsCount");
  kony.print("setPendingRequestsCount data is:::" +JSON.stringify(data));
  try{
    kony.print(":::setPendingRequestsCount data is:::" + JSON.stringify(data));
    kony.apps.coe.ess.Approvals.approvalsDashboardWin.setPendingRequestsCount = data;
    if (data !== undefined && data !== "" && data !== null) {
      var leaveCount = 0;
      var timeCount = 0;
      var workCount = 0;
      var expenseCount = 0;
      var purchaseCount = 0;
      var purchaseReqCount = 0;
      var totalCount = 0;
      for (var index in data) {


        var processed_request_type = {
          "COUNT": data[index].COUNT.toFixed(),
          "TYPE": data[index].TYPE,
          "ID": data[index].id,

        };
        if(processed_request_type.TYPE == "LEAVE"){
          frmWinTabDashboard.lblLeaveReqCount.text = data[index].COUNT.toFixed();
          leaveCount = data[index].COUNT;
        }
        if(processed_request_type.TYPE == "TIMESHEET"){
          frmWinTabDashboard.lblTimeCount.text = data[index].COUNT.toFixed();
          timeCount = data[index].COUNT;
        }
        if(processed_request_type.TYPE == "EXPENSES"){
          frmWinTabDashboard.lblExpenseCount.text = data[index].COUNT.toFixed();
          expenseCount = data[index].COUNT;
        }
        if(processed_request_type.TYPE == "PURCHASEORDER"){
          frmWinTabDashboard.lblPurCount.text = data[index].COUNT.toFixed();
          purchaseCount = data[index].COUNT;
        }
        if(processed_request_type.TYPE == "WORKORDER"){
          frmWinTabDashboard.lblWorkCount.text = data[index].COUNT.toFixed();
          workCount = data[index].COUNT;
        }
      }
      totalCount = leaveCount + timeCount + workCount + expenseCount + purchaseCount;
      kony.print("Total pending request count::" + totalCount);
      frmWinTabDashboard.lblPendingReqCnt.text = Math.round(totalCount);
      //frmTabDashboard.lblNewRequests.text = parseInt(totalCount) + " NEW REQUESTS";
    }
  }


  catch(e){
    handleError(e);
  }
  kony.print("End of setPendingRequestsCount");

};
