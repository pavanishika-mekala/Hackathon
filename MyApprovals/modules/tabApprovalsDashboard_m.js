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

kony.apps.coe.ess.Approvals.tabApprovalsDashboard = function() {
  kony.print(":::Start tabApprovalsDashboard:::");
};
/**
 * This method processes fetched data. Developer can edit.
 * Default implementation processes the provided data to required format for bind.
 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
 * @memberof frmApprovalHomeControllerExtension#
 * @returns {Object} - processed data
 */
//kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ISLaterRequestsData = [];
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.getApprovalsProcessData = function(data) {
  try {
    var scopeObj = this;
    var processedData = this.process_data_ForSegement(data.ApprovalRequestData);
    kony.apps.coe.ess.Approvals.tabApprovalsListView.requestTypeData = data.ISLaterRequestsData;
    var ISLaterRequestsData = data.ISLaterRequestsData;
    kony.print("ISLaterRequestsData:::" + JSON.stringify(ISLaterRequestsData));
    var processedIslaterRequestData = this.process_data_ForISlaterSegment(ISLaterRequestsData);
    var pendingRequestsCount = this.setPendingRequestsCount(ISLaterRequestsData);
    kony.print("pendingRequestsCount:::" + JSON.stringify(ISLaterRequestsData));
    //kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ISLaterRequestsData = data.ISLaterRequestsData;
    //kony.print("kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ISLaterRequestsData:::" + JSON.stringify(kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ISLaterRequestsData));
    var IslaterRequestsCount = 0;
    for (var index in ISLaterRequestsData) {

      IslaterRequestsCount += parseInt(ISLaterRequestsData[index].COUNT);
    }

    var resultData = {
      "ISLaterRequestsData": processedIslaterRequestData,
      "ApprovalRequestData": processedData,
      "IslaterRequestsCount": IslaterRequestsCount
    }
    kony.print("Result data in getApprovalsProcessData:::" + JSON.stringify(resultData));
  }
  catch (err) {
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
var approved_data = [
  [],
  []
],
    rejected_data = [
      [],
      []
    ],
    pending_data = [
      [],
      []
    ];
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.process_data_ForSegement = function(response_data) {
  try {
    var processedData = [];
    if (response_data == null || response_data == undefined || response_data.length < 0 || response_data == '') {
      return [];
    }
    if (response_data && response_data.length > 0) {
      for (var index in response_data) {
        var processedRequest = this.process_ApprovalRequest(response_data[index]);

        if (isEmpty(processedRequest)) {
          //skip the request not to show in approval request queue
        }
        else {
          //Alternate Skins for the Row
          if (index % 2 === 0) {
            processedRequest.flxCard = {
              "skin": "sknFlxFAFAFA20pxBlur"
            }
          }
          else {
            processedRequest.flxCard = {
              "skin": "sknFlxMobFFFFFF100O"
            }
          }
          processedData.push(processedRequest);
        }

      }
      for (var i = 0; i < processedData.length; i++) {
        switch (processedData[i].StatusId) {
          case '0':
            approved_data[parseInt(processedData[i].ISLater)].push(processedData[i]);
            break;
          case '1':
            rejected_data[parseInt(processedData[i].ISLater)].push(processedData[i]);
            break;
          case '2':
            pending_data[parseInt(processedData[i].ISLater)].push(processedData[i]);
            break;
        }
      }


      this.setApprovalsDataToUI(pending_data[0]);
    }
    else {
      //null handing when the data is empty


    }

    return processedData;
  }
  catch (e) {
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
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.process_ApprovalRequest = function(approvalRequest) {
  kony.print("Inside process_ApprovalRequest");
  kony.print("Approval Request data is:::" + JSON.stringify(approvalRequest));
  try {
    var processedRequest = {};
    processedRequest = approvalRequest;
    kony.print("processedRequestt data is:::" + JSON.stringify(processedRequest));
    //common segment values
    //  processedRequest.btnLaterSegment = {"skin" : "sknBtnMob0OBor1DB6C928px", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.later")};
    //  processedRequest.btnReject = {"skin" : "sknBtnMob0OBorFEADA81pxFSFEADA8", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Reject")};
    // processedRequest.btnApprove = {"skin" : "sknBtnMob3EBEA3100OFSFFFFFF100O28px", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Approve")};
    processedRequest.StatusId = approvalRequest.StatusId;
    processedRequest.StatusName = approvalRequest.StatusName;
    processedRequest.ISLater = processedRequest.ISLater;
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
    processedRequest.due_date = approvalRequest.Due_Date;
    processedRequest.request_date = approvalRequest.RequestDate;
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
    var btnNoticedvis = false,visibility= true;
    processedRequest.category = approvalRequest.Category ? approvalRequest.Category : "";
    if(processedRequest.TypeID == "LEAVEINFO"){
      processedRequest.request_type = "LEAVE";
      visibility = false;
      btnNoticedvis = true;
    }

    processedRequest.btnLaterSegment = {"isVisible": visibility,"skin" : "sknBtnMob0OBor1DB6C928px", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.later")};
    processedRequest.btnReject = {"isVisible": visibility,"skin" : "sknBtnMob0OBorFEADA81pxFSFEADA8", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Reject")};
    processedRequest.btnApprove = {"isVisible": visibility,"skin" : "sknBtnMob3EBEA3100OFSFFFFFF100O28px", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Approve")};
    processedRequest.btnNoticed = {"isVisible": btnNoticedvis,"skin" : "sknBtnMob3EBEA3100OFSFFFFFF100O28px", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Noticed")};

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
        requestTypeSkin = "sknLbl7986CBHeavy40x";
        processedRequest.flxUserImg = {
          "skin": ""
        };
        processedRequest.requestTypeImage = "leavewhite.png";
        processedRequest.requestTypeInfoImage = "leave_oval.png";
        processedRequest.lblDueDateHeader = {
          "skin": "sknLbl888888Roman28p",
          "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
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
        requestTypeSkin = "sknlblTimeType4A90E2";
        processedRequest.flxUserImg = {
          "skin": ""
        };
        processedRequest.requestTypeImage = "time_title.png";
        processedRequest.requestTypeInfoImage = "time_oval.png";
        processedRequest.lblDueDateHeader = {
          "skin": "sknLbl888888Roman28px",
          "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
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
        processedRequest.flxUserImg = {
          "skin": "sknFlxMobffffffo0B1DB6C9"
        };
        processedRequest.requestTypeImage = "expense_title.png";
        processedRequest.requestTypeInfoImage = "expense_oval.png";
        processedRequest.lblDueDateHeader = {
          "skin": "sknLbl888888Roman28px",
          "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
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
        processedRequest.flxUserImg = {
          "skin": ""
        };
        processedRequest.requestTypeImage = "purchase_order_in_list.png";
        processedRequest.requestTypeInfoImage = "po_oval.png";
        processedRequest.lblDueDateHeader = {
          "skin": "sknLbl888888Roman28px",
          "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
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
        processedRequest.flxUserImg = {
          "skin": ""
        };
        processedRequest.requestTypeImage = "work_orde_in_list.png";
        processedRequest.requestTypeInfoImage = "wo_oval.png";
        processedRequest.lblDueDateHeader = {
          "skin": "sknLbl888888Roman28px",
          "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDueDateHeader")
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
    kony.print("Processed Request complete data is :::" + JSON.stringify(processedRequest));
    return processedRequest;
  }
  catch (e) {
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

kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.process_data_ForISlaterSegment = function(response_data) {
  kony.print("Inside process_data_ForISlaterSegment");
  kony.print(" process_data_ForISlaterSegment data:::" + JSON.stringify(response_data));
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

/*
 *@function
 *@class  : ApprovalsHome
 *@params : JSON  consisting of single approval request
 *@returns: returns the processed approval request in case of request which is not configured it is returned as null
 *@desc   : Data process is taken place here for single request
 */
var approvalID;
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.setApprovalsDataToUI = function(data) {
  kony.print("Inside setApprovalsDataToUI");
  kony.print("setApprovalsDataToUI data is:::" + JSON.stringify(data));
  try {
    kony.print(":::setApprovalsDataToUI data is:::" + JSON.stringify(data));
    kony.print(":::setApprovalsDataToUI data length is::: " + data.length);
    kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ApprovalsListData = data;
    if (data !== undefined && data !== "" && data !== null) {
      kony.print("Approvals List data:::" + JSON.stringify(kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ApprovalsListData));
      frmTabDashboard.flxNoPendingActions.isVisible = false;
      //var m = data.length >= 15 ? 15 : data.length;
      var m = data.length;
      if (dashTabAdded === false) {
        for (var i = 0; i < m; i++) {
          kony.print("Before addingFlxWithData");
          //frmTabDashboard.flxMiddle.removeAll();
          approvalID = data[i].ID;
          kony.print("Approval id :::" + approvalID);

          this.addingFlxWithData(i, data[i].ID);


          kony.print("Value of data[i].UserName.text " + data[i].UserName.text);
          kony.print("After addingFlxWithData");
          eval("frmTabDashboard.lblShortName" + i).isVisible = true;
          var mediaID = data[i].MediaID;
          kony.print("Media ID is::" + mediaID);
          if (data[i].MediaID !== undefined && data[i].MediaID !== "" && data[i].MediaID !== null && data[i].MediaID !== "NULL") {
            eval("frmTabDashboard.lblShortName" + i).isVisible = false;
            eval("frmTabDashboard.imgLeaveProfile" + i).isVisible = true;
            kony.print("Image Id::::" + eval("frmTabDashboard.imgLeaveProfile" + i));
            kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, eval("frmTabDashboard.imgLeaveProfile" + i), "Employee", "mediaEmployee", mediaID, {});
          }
          else {
            eval("frmTabDashboard.imgLeaveProfile" + i).isVisible = false;
            eval("frmTabDashboard.lblShortName" + i).isVisible = true;
          }
          if (data[i].request_type === "EXPENSES") {
            eval("frmTabDashboard.lblShortName" + i).text = data[i].CreatedUserShortName;
            eval("frmTabDashboard.lblShortName" + i).skin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblExpProfilePicBg
          }
          if (data[i].request_type === "WORKORDER") {
            eval("frmTabDashboard.lblShortName" + i).text = data[i].CreatedUserShortName;
            eval("frmTabDashboard.lblShortName" + i).skin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblWorkProfilePicBg
          }
          if (data[i].request_type === "LEAVE") {
            eval("frmTabDashboard.lblShortName" + i).text = data[i].CreatedUserShortName;
            eval("frmTabDashboard.lblShortName" + i).skin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknlblLeaveProfilePicBg
          }
          if (data[i].request_type === "TIMESHEET") {
            eval("frmTabDashboard.lblShortName" + i).text = data[i].CreatedUserShortName;
            eval("frmTabDashboard.lblShortName" + i).skin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblTimeProfilePicBg
          }
          if (data[i].request_type === "PURCHASEORDER") {
            eval("frmTabDashboard.lblShortName" + i).text = data[i].CreatedUserShortName;
            eval("frmTabDashboard.lblShortName" + i).skin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblPurProfilePicBg
          }

          if (data[i].UserName.text !== undefined && data[i].UserName.text !== "" && data[i].UserName.text !== null) {
            eval("frmTabDashboard.lblUserFullName" + i).text = data[i].UserName.text;
          }
          eval("frmTabDashboard.lblTimeDate" + i).text = data[i].RequestDate;
          if (data[i].dueDate.text !== undefined && data[i].dueDate.text !== "" && data[i].dueDate.text !== null) {
            eval("frmTabDashboard.lblDueDate" + i).text = data[i].dueDate.text;
          }
          if (data[i].FlxTimerUi.isVisible === true) {
            //eval("frmTabDashboard.lblExpiry" + i).text = "Expires in";
            eval("frmTabDashboard.lblExpiry" + i).isVisible = true;
            eval("frmTabDashboard.lblSkipReq" + i).isVisible = false;
            eval("frmTabDashboard.flxExpiry" + i).isVisible = true;
            eval("frmTabDashboard.lblHour" + i).text = data[i].remaingHours + "H";

          }
          else {
            //eval("frmTabDashboard.lblSkipReq" + i).text = "Skip";
            //eval( "frmTabDashboard.flxExpiry" + i).isVisible = false;
            eval("frmTabDashboard.lblExpiry" + i).isVisible = false;
            eval("frmTabDashboard.lblSkipReq" + i).isVisible = true;
            eval("frmTabDashboard.flxExpiry" + i).isVisible = false;
          }
          if (data[i].request_type === "EXPENSES") {
            eval("frmTabDashboard.imgLeaveOvalBg" + i).src = "expense_oval.png";
            eval("frmTabDashboard.imgLeaveIcon" + i).src = "expense_title.png";
            eval("frmTabDashboard.lblLeave" + i).skin = "lblExpSkn75E9F8";
            eval("frmTabDashboard.lblLeave" + i).text = "Expense";
            eval("frmTabDashboard.lblLeaveType" + i).skin = "lblExpTypeSkn1DB6C9";
            eval("frmTabDashboard.lblLeaveType" + i).text = data[i].Category;
            eval("frmTabDashboard.lblDateFrom" + i).skin = "lblExpAmountSkn1CB7C9";
            if (data[i].RequestInfo.text !== undefined && data[i].RequestInfo.text !== "" && data[i].RequestInfo.text !== null) {
              eval("frmTabDashboard.lblDateFrom" + i).text = data[i].RequestInfo.text;
            }
            eval("frmTabDashboard.lblDayCount" + i).skin = "sknLblA6A6A620px";
            eval("frmTabDashboard.lblDayCount" + i).text = data[i].TypeID;

            if (data[i].Delegated.isVisible === false) {
              eval("frmTabDashboard.flxStatus" + i).isVisible = false;
            }
            else {
              eval("frmTabDashboard.flxStatus" + i).isVisible = true;
            }
          }
          if (data[i].request_type === "WORKORDER") {
            eval("frmTabDashboard.imgLeaveOvalBg" + i).src = "wo_oval.png";
            eval("frmTabDashboard.imgLeaveIcon" + i).src = "work_orde_in_list.png";
            eval("frmTabDashboard.lblLeave" + i).skin = "lblTimeSkip";
            eval("frmTabDashboard.lblLeave" + i).text = "Work Order";
            eval("frmTabDashboard.lblLeaveType" + i).skin = "sknlblWONum0284B5";
            eval("frmTabDashboard.lblLeaveType" + i).text = data[i].Category;
            eval("frmTabDashboard.lblDateFrom" + i).skin = "sknlblWOName0284B5";
            if (data[i].RequestInfo.text !== undefined && data[i].RequestInfo.text !== "" && data[i].RequestInfo.text !== null) {
              eval("frmTabDashboard.lblDateFrom" + i).text = data[i].RequestInfo.text;
            }
            //eval("frmTabDashboard.lblDayCount" + i).skin = "";
            //eval("frmTabDashboard.lblDayCount" + i).text = data[i].TypeID;
            eval("frmTabDashboard.lblDayCount" + i).isVisible = false;
            if (data[i].Delegated.isVisible === false) {
              eval("frmTabDashboard.flxStatus" + i).isVisible = false;
            }
            else {
              eval("frmTabDashboard.flxStatus" + i).isVisible = true;
            }
          }
          if (data[i].request_type === "LEAVE") {
            eval("frmTabDashboard.imgLeaveOvalBg" + i).src = "leave_oval.png";
            eval("frmTabDashboard.imgLeaveIcon" + i).src = "leave_title.png";
            eval("frmTabDashboard.lblLeave" + i).skin = "lblTimeSkip";
            eval("frmTabDashboard.lblLeave" + i).text = "Leave";
            eval("frmTabDashboard.lblLeaveType" + i).skin = "sknLbl7986CBLight30px";
            eval("frmTabDashboard.lblLeaveType" + i).text = data[i].Category;
            eval("frmTabDashboard.lblDateFrom" + i).skin = "sknLblA6A6A620px";
            if (data[i].RequestInfo.text !== undefined && data[i].RequestInfo.text !== "" && data[i].RequestInfo.text !== null) {
              eval("frmTabDashboard.lblDateFrom" + i).text = data[i].RequestInfo.text;
            }

            if (data[i].AdditionalData.text !== undefined && data[i].AdditionalData.text !== "" && data[i].AdditionalData.text !== null && data[i].AdditionalData.isVisble === true) {
              eval("frmTabDashboard.lblDayCount" + i).skin = "sknLblA6A6A620px";
              eval("frmTabDashboard.lblDayCount" + i).isVisible = true;
              eval("frmTabDashboard.lblDayCount" + i).text = data[i].AdditionalData.text;
            }
            else {
              eval("frmTabDashboard.lblDayCount" + i).isVisible = false;
            }
            if (data[i].Delegated.isVisible === false) {
              eval("frmTabDashboard.flxStatus" + i).isVisible = false;
            }
            else {
              eval("frmTabDashboard.flxStatus" + i).isVisible = true;
            }
          }
          if (data[i].request_type === "TIMESHEET") {
            eval("frmTabDashboard.imgLeaveOvalBg" + i).src = "time_oval.png";
            eval("frmTabDashboard.imgLeaveIcon" + i).src = "time_title.png";
            eval("frmTabDashboard.lblLeave" + i).skin = "lblTimeSkip";
            eval("frmTabDashboard.lblLeave" + i).text = "Time";
            eval("frmTabDashboard.lblLeaveType" + i).skin = "sknlblTimeType4A90E2";
            eval("frmTabDashboard.lblLeaveType" + i).text = data[i].Category;
            eval("frmTabDashboard.lblDateFrom" + i).skin = "lblExpAmountSkn1CB7C9";
            if (data[i].RequestInfo.text !== undefined && data[i].RequestInfo.text !== "" && data[i].RequestInfo.text !== null) {
              eval("frmTabDashboard.lblDateFrom" + i).text = data[i].RequestInfo.text;
            }
            if (data[i].AdditionalData.text !== undefined && data[i].AdditionalData.text !== "" && data[i].AdditionalData.text !== null && data[i].AdditionalData.isVisble === true) {
              eval("frmTabDashboard.lblDayCount" + i).skin = "sknLblA6A6A620px";
              eval("frmTabDashboard.lblDayCount" + i).isVisible = true;
              eval("frmTabDashboard.lblDayCount" + i).text = data[i].AdditionalData.text;
            }
            else {
              eval("frmTabDashboard.lblDayCount" + i).isVisible = false;
            }
            if (data[i].Delegated.isVisible === false) {
              eval("frmTabDashboard.flxStatus" + i).isVisible = false;
            }
            else {
              eval("frmTabDashboard.flxStatus" + i).isVisible = true;
            }
          }
          if (data[i].request_type === "PURCHASEORDER") {
            eval("frmTabDashboard.imgLeaveOvalBg" + i).src = "po_oval.png";
            eval("frmTabDashboard.imgLeaveIcon" + i).src = "purchase_order_in_list.png";
            eval("frmTabDashboard.lblLeave" + i).skin = "lblTimeSkip";
            eval("frmTabDashboard.lblLeave" + i).text = "Purchase Order";
            eval("frmTabDashboard.lblLeaveType" + i).skin = "sknlblWONum0284B5";
            eval("frmTabDashboard.lblLeaveType" + i).text = data[i].Category;
            eval("frmTabDashboard.lblDateFrom" + i).skin = "sknlblPOName058594";
            if (data[i].RequestInfo.text !== undefined && data[i].RequestInfo.text !== "" && data[i].RequestInfo.text !== null) {
              eval("frmTabDashboard.lblDateFrom" + i).text = data[i].RequestInfo.text;
            }
            eval("frmTabDashboard.lblDayCount" + i).isVisible = false;
            if (data[i].Delegated.isVisible === false) {
              eval("frmTabDashboard.flxStatus" + i).isVisible = false;
            }
            else {
              eval("frmTabDashboard.flxStatus" + i).isVisible = true;
            }
          }
        }
      }

    }
  }
  catch (e) {
    handleError(e);
  }
  kony.print("End of setApprovalsDataToUI");

};
var dashTabAdded = false;
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.setPendingRequestsCount = function(data) {
  kony.print("Inside setPendingRequestsCount");
  kony.print("setPendingRequestsCount data is:::" + JSON.stringify(data));
  try {
    kony.print(":::setPendingRequestsCount data is:::" + JSON.stringify(data));
    kony.apps.coe.ess.Approvals.tabApprovalsDashboard.setPendingRequestsCount = data;
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
        if (processed_request_type.TYPE == "LEAVE") {
          frmTabDashboard.lblLeaveReqCount.text = data[index].COUNT.toFixed();
          leaveCount = data[index].COUNT;
        }
        if (processed_request_type.TYPE == "TIMESHEET") {
          frmTabDashboard.lblTimeCount.text = data[index].COUNT.toFixed();
          timeCount = data[index].COUNT;
        }
        if (processed_request_type.TYPE == "EXPENSES") {
          frmTabDashboard.lblExpenseCount.text = data[index].COUNT.toFixed();
          expenseCount = data[index].COUNT;
        }
        if (processed_request_type.TYPE == "PURCHASEORDER") {
          frmTabDashboard.lblPurCount.text = data[index].COUNT.toFixed();
          purchaseCount = data[index].COUNT;
        }
        if (processed_request_type.TYPE == "WORKORDER") {
          frmTabDashboard.lblWorkCount.text = data[index].COUNT.toFixed();
          workCount = data[index].COUNT;
        }
      }
      totalCount = leaveCount + timeCount + workCount + expenseCount + purchaseCount;
      kony.print("Total pending request count::" + totalCount);
      frmTabDashboard.lblPendingReqCnt.text = Math.round(totalCount).toFixed();
      frmTabDashboard.lblNewRequests.text = parseInt(totalCount) + " NEW REQUESTS";
    }
  }
  catch (e) {
    handleError(e);
  }
  kony.print("End of setPendingRequestsCount");

};
/**
 * @function
 * adding code for dynamic flexcards creation
 */
var selected = 0;
var unselected = 0;
var comId = 0;
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.addingFlxWithData = function(i, aid) {
  kony.print("Into addingFlxWithData");
  var flxCard = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "clipBounds": true,
    "height": "95%",
    "id": "flxCard" + i,
    "isVisible": true,
    "layoutType": kony.flex.FREE_FORM,
    "left": "1.50%",
    "skin": "sknFlxFAFAFA20pxBlur",
    "onClick": function() {
      var obj = new kony.apps.coe.ess.Approvals.tabApprovalsDashboard();
      frmTabDashboard.flxBottom.isVisible = false;
      unselected = selected;
      selected = i;
      comId = aid;
      eval("frmTabDashboard.flxDetailView" + unselected).isVisible = false;
      eval("frmTabDashboard.flxApprove" + unselected).isVisible = true;
      eval("frmTabDashboard.flxReject" + unselected).isVisible = true;
      eval("frmTabDashboard.flxDetailView" + selected).isVisible = true;
      eval("frmTabDashboard.flxApprove" + selected).isVisible = false;
      eval("frmTabDashboard.flxReject" + selected).isVisible = false;
      frmTabDashboard.lblNoComments.setVisibility(false);
      frmTabDashboard.flxDecisionTxtBox.setVisibility(true);
      frmTabDashboard.flxComments.height = "50%";
      frmTabDashboard.txtBxDecisionComment.text = "";
      frmTabDashboard.flxDecisionSegment.isVisible = true;
      obj.getCommentsDataPreshow(i, aid);
    },
    "top": "2%",
    "width": "45%",
    "zIndex": 1
  }, {}, {});
  flxCard.setDefaultUnit(kony.flex.DP);
  var imgLeaveOvalBg = new kony.ui.Image2({
    "height": "24%",
    "id": "imgLeaveOvalBg" + i,
    "isVisible": true,
    "left": "0%",
    "skin": "slImage",
    "src": "leave_oval.png",
    "top": "0%",
    "width": "100%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var imgLeaveIcon = new kony.ui.Image2({
    "height": "10%",
    "id": "imgLeaveIcon" + i,
    "isVisible": true,
    "left": "3%",
    "skin": "slImage",
    "src": "leavewhite.png",
    "top": "3%",
    "width": "10%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblLeave = new kony.ui.Label({
    "height": "10%",
    "id": "lblLeave" + i,
    "isVisible": true,
    "left": "13%",
    "skin": "lblTimeSkip",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "4%",
    "width": "20%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblExpiry = new kony.ui.Label({
    "height": "10%",
    "id": "lblExpiry" + i,
    "isVisible": true,
    "left": "75%",
    "right": "19.02%",
    "skin": "sknlblExpirySkipffffff",
    "text": "Expires in",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "3%",
    "width": "15%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblSkipReq = new kony.ui.Label({
    "height": "10%",
    "id": "lblSkipReq" + i,
    "isVisible": false,
    "left": "85%",
    "right": "19.02%",
    "skin": "sknlblExpirySkipffffff",
    "text": "Skip",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "onTouchStart": function() {
      kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.markAsLater(aid);
    },
    "top": "2%",
    "width": "15%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var flxExpiry = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "clipBounds": true,
    "height": "13.50%",
    "id": "flxExpiry" + i,
    "isVisible": true,
    "layoutType": kony.flex.FREE_FORM,
    "left": "89%",
    "skin": "slFbox",
    "top": "1%",
    "width": "9.50%",
    "zIndex": 1
  }, {}, {});
  flxExpiry.setDefaultUnit(kony.flex.DP);
  var lblHour = new kony.ui.Label({
    "height": "60%",
    "id": "lblHour" + i,
    "isVisible": true,
    "left": "30%",
    "skin": "sknLblFFFFFFFont44px",
    "text": "8 ",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "30%",
    "width": "100%",
    "zIndex": 2
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblHourUnit = new kony.ui.Label({
    "height": "51%",
    "id": "lblHourUnit" + i,
    "isVisible": true,
    "left": "52%",
    "skin": "sknLblFFFFFFFont20px",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "45%",
    "width": "33%",
    "zIndex": 2
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_BOTTOM_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var imgExp = new kony.ui.Image2({
    "height": "100%",
    "id": "imgExp" + i,
    "isVisible": true,
    "left": "0dp",
    "skin": "slImage",
    "src": "expmedtab.png",
    "top": "0dp",
    "width": "100%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  flxExpiry.add(lblHour, lblHourUnit, imgExp);
  var flxProfilePic = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "centerX": "50%",
    "clipBounds": true,
    "height": "25%",
    "id": "flxProfilePic" + i,
    "isVisible": true,
    "layoutType": kony.flex.FREE_FORM,
    "skin": "sknFlxMyPhoto",
    "top": "6%",
    "width": "16%",
    "zIndex": 1
  }, {}, {});
  flxProfilePic.setDefaultUnit(kony.flex.DP);
  var imgLeaveProfile = new kony.ui.Image2({
    "height": "100%",
    "id": "imgLeaveProfile" + i,
    "isVisible": true,
    "left": "0dp",
    "skin": "slImage",
    "src": "profile.png",
    "top": "0dp",
    "width": "100%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblShortName = new kony.ui.Label({
    "height": "100%",
    "id": "lblShortName" + i,
    "isVisible": false,
    "left": "0%",
    "skin": "CopyslLabel0f1f345a4971240",
    "text": "Label",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "0%",
    "width": "100%",
    "centerX": "50%",
    "centerY": "50%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  flxProfilePic.add(imgLeaveProfile, lblShortName);
  var flxStatus = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "clipBounds": true,
    "height": "8%",
    "id": "flxStatus" + i,
    "isVisible": true,
    "layoutType": kony.flex.FREE_FORM,
    "left": "5%",
    "skin": "sknFlxFAB745",
    "top": "35%",
    "width": "17%",
    "zIndex": 1
  }, {}, {});
  flxStatus.setDefaultUnit(kony.flex.DP);
  var lblStatus = new kony.ui.Label({
    "height": "100%",
    "id": "lblStatus" + i,
    "isVisible": true,
    "left": "0dp",
    "skin": "sknLblFFFFFF100O24px",
    "text": "DELEGATED",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "-1dp",
    "width": "100%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  flxStatus.add(lblStatus);
  var lblLeaveType = new kony.ui.Label({
    "height": "10%",
    "id": "lblLeaveType" + i,
    "isVisible": true,
    "left": "5%",
    "skin": "sknLbl7986CBHeavy40x",
    "text": "",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "53%",
    "width": "30%",
    "height": "10%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var flxDateRange = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "clipBounds": true,
    "height": "10%",
    "id": "flxDateRange" + i,
    "isVisible": true,
    "layoutType": kony.flex.FLOW_HORIZONTAL,
    "left": "5%",
    "skin": "slFbox",
    "top": "65%",
    "width": "30%",
    "zIndex": 1
  }, {}, {});
  flxDateRange.setDefaultUnit(kony.flex.DP);
  var lblDateFrom = new kony.ui.Label({
    "height": "100%",
    "id": "lblDateFrom" + i,
    "isVisible": true,
    "left": "0%",
    "skin": "sknLbl7986CBLight30px",
    "text": "",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "0%",
    "width": "100%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblMonthFrom = new kony.ui.Label({
    "height": "100%",
    "id": "lblMonthFrom" + i,
    "isVisible": false,
    "left": "0%",
    "skin": "sknLbl7986CBHeavy30px",
    "text": "May",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "0%",
    "width": "25%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblDash = new kony.ui.Label({
    "height": "100%",
    "id": "lblDash" + i,
    "isVisible": false,
    "left": "0.00%",
    "skin": "sknLbl7986CBLight30px",
    "text": "-",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "0.00%",
    "width": "10%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblDateTo = new kony.ui.Label({
    "height": "100%",
    "id": "lblDateTo" + i,
    "isVisible": false,
    "left": "0.00%",
    "skin": "sknLbl7986CBLight30px",
    "text": "29",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "0.00%",
    "width": "15%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblMonthTo = new kony.ui.Label({
    "height": "100%",
    "id": "lblMonthTo" + i,
    "isVisible": false,
    "left": "0.00%",
    "skin": "sknLbl7986CBHeavy30px",
    "text": "May",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "0.00%",
    "width": "25%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  flxDateRange.add(lblDateFrom, lblMonthFrom, lblDash, lblDateTo, lblMonthTo);
  var flxDayCount = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "clipBounds": true,
    "height": "8%",
    "id": "flxDayCount" + i,
    "isVisible": false,
    "layoutType": kony.flex.FREE_FORM,
    "left": "35%",
    "skin": "sknFlxA6A6A6GrayOutline",
    "top": "66%",
    "width": "12%",
    "zIndex": 1
  }, {}, {});
  flxDayCount.setDefaultUnit(kony.flex.DP);
  flxDayCount.add();
  var lblUserFullName = new kony.ui.Label({
    "centerX": "50%",
    "height": "10%",
    "id": "lblUserFullName" + i,
    "isVisible": true,
    "skin": "sknLbl777777Roman34px",
    "text": "",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "33%",
    "width": "50%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblTimeDate = new kony.ui.Label({
    "centerX": "82%",
    "height": "8%",
    "id": "lblTimeDate" + i,
    "isVisible": true,
    "skin": "sknLblAAAAAARoman24px",
    "text": "",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "36%",
    "width": "25%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblDueDateText = new kony.ui.Label({
    "centerX": "84%",
    "height": "8%",
    "id": "lblDueDateText" + i,
    "isVisible": true,
    "skin": "sknLbl1DB6C9Roman28px",
    "text": "Due date",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "56%",
    "width": "20%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblDueDate = new kony.ui.Label({
    "centerX": "82%",
    "height": "8%",
    "id": "lblDueDate" + i,
    "isVisible": true,
    "skin": "sknLbl888888Roman28px",
    "text": "",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "65%",
    "width": "25%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var lblDayCount = new kony.ui.Label({
    "height": "8%",
    "id": "lblDayCount" + i,
    "isVisible": true,
    "left": "33%",
    "skin": "sknLblA6A6A620px",
    "text": "",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "65%",
    "width": "30%",
    "height": "8%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  var flxReject = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "centerX": "35%",
    "clipBounds": true,
    "height": "10%",
    "id": "flxReject" + i,
    "isVisible": true,
    "layoutType": kony.flex.FREE_FORM,
    "skin": "sknFlxFD5147Border16",
    "onClick": function() {
      kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(aid);
    },
    "top": "85%",
    "width": "20%",
    "zIndex": 1
  }, {}, {});
  flxReject.setDefaultUnit(kony.flex.DP);
  var lblReject = new kony.ui.Label({
    "height": "100%",
    "id": "lblReject" + i,
    "isVisible": true,
    "left": "0dp",
    "skin": "sknLblFD5147Roman28px",
    "text": kony.i18n.getLocalizedString("i18n.ess.myApprovals.frmTabListview.Reject"),
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "-1dp",
    "width": "100%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  flxReject.add(lblReject);
  var flxApprove = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "centerX": "65%",
    "clipBounds": true,
    "height": "10%",
    "id": "flxApprove" + i,
    "isVisible": true,
    "layoutType": kony.flex.FREE_FORM,
    "skin": "sknFlx3EBEA3",
    "onClick": function() {
      kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(aid);
    },
    "top": "85%",
    "width": "20%",
    "zIndex": 1
  }, {}, {});
  flxApprove.setDefaultUnit(kony.flex.DP);
  var lblApprove = new kony.ui.Label({
    "height": "100%",
    "id": "lblApprove" + i,
    "isVisible": true,
    "left": "0dp",
    "skin": "sknLblFFFFFFRoman28px",
    "text": kony.i18n.getLocalizedString("i18n.ess.myApprovals.frmTabListview.Approve"),
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "-1dp",
    "width": "100%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  flxApprove.add(lblApprove);
  var flxDetailView = new kony.ui.FlexContainer({
    "autogrowMode": kony.flex.AUTOGROW_NONE,
    "centerX": "50%",
    "clipBounds": true,
    "height": "10%",
    "id": "flxDetailView" + i,
    "isVisible": false,
    "layoutType": kony.flex.FREE_FORM,
    "skin": "sknFlx2EBAEERound",
    "top": "85%",
    "width": "40%",
    "onClick": function() {
      kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex = aid;
      kony.apps.coe.ess.Approvals.Header.ItemOnClick(1);
    },
    "zIndex": 1
  }, {}, {});
  flxDetailView.setDefaultUnit(kony.flex.DP);
  var imgArrowRight = new kony.ui.Image2({
    "centerY": "50%",
    "height": "60%",
    "id": "imgArrowRight" + i,
    "isVisible": true,
    "right": "1%",
    "skin": "slImage",
    "src": "chevronbutton.png",
    "top": "0%",
    "width": "20%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblDetailView = new kony.ui.Label({
    "height": "100%",
    "id": "lblDetailView" + i,
    "isVisible": true,
    "left": "0%",
    "skin": "sknLbl2EBAEE40px",
    "text": "Go to detailed view",
    "textStyle": {
      "letterSpacing": 0,
      "strikeThrough": false
    },
    "top": "0%",
    "width": "80%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "textCopyable": false
  });
  flxDetailView.add(imgArrowRight, lblDetailView);
  flxCard.add(imgLeaveOvalBg, imgLeaveIcon, lblLeave, lblExpiry, lblSkipReq, flxExpiry, flxProfilePic, flxStatus, lblLeaveType, flxDateRange, flxDayCount, lblUserFullName, lblTimeDate, lblDueDateText, lblDueDate, lblDayCount, flxReject, flxApprove, flxDetailView);
  frmTabDashboard.flxMiddle.addAt(flxCard, i);
  dashTabAdded = true;
  kony.print("End of addingFlxWithData");
};
/**
 * This method is an entry point for all fetch related flows. Developer can edit.
 * Default implementation fetches data for the form based on form config
 * @memberof frmApprovalRequestDetailControllerExtension#
 */
var backIndex = 0;
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.getCommentsDataPreshow = function(i, approvalID) {
  kony.print(":::Inside getCommentsDataPreshow:::");
  backIndex = i;

  try {
    var scopeObj = this;
    if (isEmpty(approvalID)) {
      return;
    }
    else {
      //make no actions as of form is reloaded by the async operation
      //comemnts retrival query
      var comments_qurey = "SELECT [request_note].[id] AS [ID], " +
          "       [request_note].[comment] AS [Comment], " +
          "       [request_note].[employee_id] AS [Employee_id], " +
          "       [request_note].[approval_id] ," +
          "       [request_note].[createdts]   ," +
          "       [Employee].[First_Name] AS [FirstName], " +
          "       [Employee].[Last_Name] AS [LastName]" +
          "       FROM   [request_note]" +
          "       LEFT JOIN [Employee] ON ([Employee].[Id] = [request_note].[employee_id])" +
          "       WHERE  [request_note].[approval_id] = '" + approvalID + "' ";
      kony.print("Comments Query:::" + comments_qurey);
      //user attachments retrival query
      var UserAttachmentsQuery = "SELECT [approval_attachment].[id] AS [ID],  " +
          "       [approval_attachment].[type_id] AS [TYPE],  " +
          "       [approval_attachment].[media_id] AS [Media],  " +
          "       [approval_attachment].[approval_id] " +
          "FROM   [approval_attachment] " +
          "WHERE  [approval_attachment].[type_id] = '1' " +
          "       AND [approval_attachment].[approval_id] = '" + approvalID + "' ";
      kony.print("UserAttachmentsQuery Query:::" + UserAttachmentsQuery);
      //System Generated Attachemtns retrival query
      var SystemGeneratedAttachmentsQuery = "SELECT [approval_attachment].[id] AS [ID],  " +
          "       [approval_attachment].[type_id] AS [TYPE],  " +
          "       [approval_attachment].[media_id] AS [Media],  " +
          "       [approval_attachment].[approval_id] " +
          "FROM   [approval_attachment] " +
          "WHERE  [approval_attachment].[type_id] = '2' " +
          "       AND [approval_attachment].[approval_id] = '" + approvalID + "' ";
      kony.print("SystemGeneratedAttachmentsQuery Query:::" + SystemGeneratedAttachmentsQuery);
      // ApprovalRequestDetails retrival query
      var Approval_request_query = "SELECT approval_request.id  AS ID," +
          "	   approval_request.due_date 		  AS Due_Date ," +
          " 	   approval_request.employee_id 	  AS CreatedByEmployeeid ," +
          "       approval_request.category_id       AS CategoryID," +
          "       approval_request.type_id           AS TypeID," +
          "       approval_request.islater           AS ISLater," +
          "       approval_request.isread            AS ISRead," +
          "       approval_request.request_date      AS RequestDate," +
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
          " and  approval_request.id ='" + approvalID + "'" +
          " GROUP  BY approval_request.id  ";
      kony.print("Approval_request_query" + Approval_request_query);
      var ApprovalRequestDetailData = {
        "comments": [],
        "userAttachments": [],
        "systemGeneratedAttachments": [],
        "RequestDetials": null,
      };

      var SystemGeneratedAttachmentsRetival = function(ApprovalRequestDetailData) {
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", SystemGeneratedAttachmentsQuery, function(ApprovalRequestDetailData, systemGeneratedAttachmentsresponse) {
          if (systemGeneratedAttachmentsresponse) {
            ApprovalRequestDetailData.systemGeneratedAttachments = systemGeneratedAttachmentsresponse;
          }
          //assigning to the global variables
          kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab = ApprovalRequestDetailData;
          kony.print("kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab" + JSON.stringify(ApprovalRequestDetailData));
          (new kony.apps.coe.ess.Approvals.tabApprovalsDashboard()).processCommentsData(ApprovalRequestDetailData);
          //  this.processData(ApprovalRequestDetailData);
          kony.print("::::::::::::SystemGeneratedAttachmentsQuery:::::::" + JSON.stringify(ApprovalRequestDetailData.systemGeneratedAttachments));
        }
                                              .bind(this, ApprovalRequestDetailData),
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
          kony.print("::::::::UserAttachmentsQuery:::::" + JSON.stringify(ApprovalRequestDetailData.userAttachments));
        }
                                              .bind(this, ApprovalRequestDetailData),
                                              function(err) {
          handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Attachments")));
        });
      };
      var commentsRetival = function(ApprovalRequestDetailData) {
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", comments_qurey, function(ApprovalRequestDetailData, Comemntsresponse) {
          if (Comemntsresponse) {
            ApprovalRequestDetailData.comments = Comemntsresponse;

          }
          kony.print("::::::::UserAttachmentsQuery:::::" + JSON.stringify(ApprovalRequestDetailData.comments));
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
          kony.print(":::RequestDetailsResponse:::" + JSON.stringify(RequestDetailsResponse));
          var processedRequest = kony.apps.coe.ess.Approvals.getApprovalsRequestList.process_ApprovalRequest(RequestDetailsResponse[0]);
          ApprovalRequestDetailData.RequestDetials = processedRequest;
        }
        commentsRetival(ApprovalRequestDetailData);

      }
                                            .bind(this, ApprovalRequestDetailData),
                                            function(err) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
      });

    }
    kony.print("YES:::::::::::::::::::::::");
  }
  catch (err) {
    //kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
    //var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
    kony.sdk.mvvm.log.error(err);
  }
  kony.print("Succe::::::::::::::::::");
};
/**
		/**
		 * This method processes fetched data. Developer can edit.
		 * Default implementation processes the provided data to required format for bind.
		 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 * @returns {Object} - processed data
		 */
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.processCommentsData = function(ApprovalRequestDetailData) {
  try {
    kony.print("IN processCommentsData::::::::::::::::");
    kony.print("ApprovalRequestDetailData:::" + JSON.stringify(ApprovalRequestDetailData));
    var scopeObj = this;
    if (ApprovalRequestDetailData && ApprovalRequestDetailData.RequestDetials && ApprovalRequestDetailData.RequestDetials.request_type) {
      kony.print("Inside if");
      // var processedRequestDetail = kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ProcessDataa(ApprovalRequestDetailData.RequestDetials.request_type, ApprovalRequestDetailData.RequestDetials);
      //ApprovalRequestDetailData.processedRequestDetail = processedRequestDetail;
      kony.print("Calling ProcessCommentsData");
      var ProcessedComments = kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ProcessCommentsData(ApprovalRequestDetailData.comments);
      ApprovalRequestDetailData.comments = ProcessedComments;
      kony.print("Processed Comments:::" + JSON.stringify(ProcessedComments));
      this.bindDataCommentsSeg(ApprovalRequestDetailData);
      kony.print("ApprovalRequestDetailData::::::::::" + JSON.stringify(ApprovalRequestDetailData.comments));
      return ApprovalRequestDetailData;
    }
    else {
      kony.print("----invalid input in the process data of the approvalrequest detail page");
    }

  }
  catch (err) {

    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessage.ApprovalRequestDetail")));
  }
};

kony.apps.coe.ess.Approvals.tabApprovalsDashboard.ProcessCommentsData = function(ApprovalRequestComments) {
  //processing for the comments in the Approval Request
  kony.print(":::Inside ProcessCommentsData");
  kony.print("Approval Request comments:::" + JSON.stringify(ApprovalRequestComments));
  try {
    kony.print("Inside try:::");
    var processedApprovalComments = [];
    for (var index in ApprovalRequestComments) {
      var ProcessedComment = {};
      ProcessedComment = ApprovalRequestComments[index];
      var createdTime = new Date().modifyByYYYYMMDDHHMMSS(ApprovalRequestComments[index].createdts);
      kony.print("ProcessedComment created time::" + createdTime);
      ProcessedComment.Appliedon = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.AppliedOn.text") + " " + createdTime.toDDmmmHHMMtt();
      kony.print("ProcessedComment Appliedon::" + ProcessedComment.Appliedon);
      ProcessedComment.Comment = ApprovalRequestComments[index].Comment;
      kony.print("ProcessedComment Comment::" + ProcessedComment.Comment);
      if (ApprovalRequestComments[index].FirstName) {
        ProcessedComment.UserName = ApprovalRequestComments[index].FirstName
        ProcessedComment.ShortName = ApprovalRequestComments[index].FirstName.substring(0, 1);
      }
      if (ApprovalRequestComments[index].LastName) {
        ProcessedComment.UserName += " " + ApprovalRequestComments[index].LastName
        ProcessedComment.ShortName += ApprovalRequestComments[index].LastName.substring(0, 1);
      }
      kony.print("ProcessedComment user name::" + ProcessedComment.UserName);
      kony.print("ProcessedComment shoert name::" + ProcessedComment.ShortName);
      kony.print("kony.apps.coe.ess.globalVariables.EmployeeID:::" + kony.apps.coe.ess.globalVariables.EmployeeID);
      kony.print("ApprovalRequestComments[index].Employee_id:::" + parseInt(ApprovalRequestComments[index].Employee_id));
      var UserEmpId = parseInt(ApprovalRequestComments[index].Employee_id);
      //ApprovalRequestComments[index].Employee_id = UserEmpId ;
      if (kony.apps.coe.ess.globalVariables.EmployeeID === ApprovalRequestComments[index].Employee_id) {
        kony.print(" if kony.apps.coe.ess.globalVariables.EmployeeID:::" + kony.apps.coe.ess.globalVariables.EmployeeID);
        kony.print("if ApprovalRequestComments[index].Employee_id:::" + parseInt(ApprovalRequestComments[index].Employee_id));
        ProcessedComment.template = flxSelfComments;

      }
      else {
        ProcessedComment.template = flxRequesterComments;

      }
      kony.print("ProcessedComment template::" + JSON.stringify(ProcessedComment.template));
      kony.print("ProcessedComment template::" + JSON.stringify(ProcessedComment.template.id));
      kony.print("Processed Comment:::" + JSON.stringify(ProcessedComment));
      processedApprovalComments.push(ProcessedComment);
      kony.print("processedApprovalComments:::" + JSON.stringify(processedApprovalComments));
    }
    return processedApprovalComments;
  }
  catch (e) {
    popupErrorAlert.lblMessage.text = e.message;
    popupErrorAlert.show();
  }
}

kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.bindDataCommentsSeg = function(ApprovalRequestDetailData) {
  kony.print(":::Inside bindDataCommentsSeg:::")
  kony.print("ApprovalRequestDetailData Comments:::" + JSON.stringify(ApprovalRequestDetailData.comments))
  try {
    if (ApprovalRequestDetailData && ApprovalRequestDetailData.RequestDetials && ApprovalRequestDetailData.RequestDetials.request_type && ApprovalRequestDetailData.userAttachments) {
      //chainging the ui based on the request Type
      //kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.changeSkins(ApprovalRequestDetailData.RequestDetials.request_type);
      //binding the approavl request fields
      //kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.bindApprovalRequestDetails(ApprovalRequestDetailData.processedRequestDetail);
      //Binding the comments to the segments
      //Making the visiblity to true or false based on the user Attachemnts
      var WidgetDatamap;
      var SegChatDataMap;
      var arry = [];
      if (ApprovalRequestDetailData.comments.length === 0) {
        frmTabDashboard.lblNoComments.setVisibility(true);
        arry = [];

      }

      if (ApprovalRequestDetailData.comments !== null && ApprovalRequestDetailData.comments !== undefined && ApprovalRequestDetailData.comments.length > 0) {
        SegChatDataMap = {
          "lblName": "UserName",
          "lblDate": "Appliedon",
          "lblChat": "Comment",
          "lblShortName": "ShortName",
          "template" : "template"
        };
        frmTabDashboard.segtabComments.widgetDataMap = SegChatDataMap;
      }
      else {
        arry = [];
        kony.print("invalid input in the bind data of approval request detail");
      }
    }
    frmTabDashboard.segtabComments.setData(ApprovalRequestDetailData.comments);
  }
  catch (err) {
    kony.print("ERROR1");
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessage.ApprovalRequestDetail")));
  }

};

/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	null
 * @desc	 :	Approve the approval request and create comment if the user has given any comments
 */
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.onClickApprove = function() {
  kony.print("--Start onClickApprove--");
  kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment(comId, frmTabDashboard.txtBxDecisionComment.text);
  kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(comId);
  var obj = new kony.apps.coe.ess.Approvals.tabApprovalsDashboard();
  obj.getCommentsDataPreshow(selected, comId);
  frmTabDashboard.flxDecisionTxtBox.setVisibility(false);
  frmTabDashboard.lblNoComments.setVisibility(false);
  frmTabDashboard.flxComments.height = "100%";
  frmTabDashboard.segtabComments.height = "100%";
  frmTabDashboard.forceLayout();
  kony.print("--End onClickApprove--");
};
/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	null
 * @desc	 :	Approve the approval request and create comment if the user has given any comments
 */
kony.apps.coe.ess.Approvals.tabApprovalsDashboard.prototype.onClickReject = function() {
  kony.print("--onClickReject--");
  kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment(comId, frmTabDashboard.txtBxDecisionComment.text);
  kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(comId);
  var obj = new kony.apps.coe.ess.Approvals.tabApprovalsDashboard();
  obj.getCommentsDataPreshow(selected, comId);
  frmTabDashboard.flxDecisionTxtBox.setVisibility(false);
  frmTabDashboard.lblNoComments.setVisibility(false);
  frmTabDashboard.flxComments.height = "100%";
  frmTabDashboard.segtabComments.height = "100%";
  frmTabDashboard.forceLayout();
  kony.print("--End onClickReject--");
};
