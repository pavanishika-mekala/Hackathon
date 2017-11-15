kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.ApprovalsHome = kony.apps.coe.ess.Approvals.ApprovalsHome || {};

kony.apps.coe.ess.Approvals.ApprovalsHome.origin_data = "data";
kony.apps.coe.ess.Approvals.ApprovalsHome.prev = "All";
kony.apps.coe.ess.Approvals.ApprovalsHome.LaterPeople = "";

kony.apps.coe.ess.Approvals.ApprovalsHome.laterPeopleImages = [];

/*
 *@function
 *@class  : ApprovalsHome
 *@params : JSON array consisting of sql response
 *@returns: null
 *@desc   : Preshow for the Approvlas Home
 */

kony.apps.coe.ess.Approvals.ApprovalsHome.PreShow = function(response_data) {
  try {

    kony.print("---- approvals home preshow start ----");
    frmApprovalHome.segApprovalsList.rowTemplate.btnApprove.highlightedSkin = "sknBtnMob3EBEA3100OFSFFFFFF100O28px";
    frmApprovalHome.segApprovalsList.rowTemplate.btnApprove.highlightOnParentFocus = true;
    frmApprovalHome.segApprovalsList.rowTemplate.flxBorder.highlightedSkin = "sknFlxMobDDDDDD100O";
    frmApprovalHome.segApprovalsList.rowTemplate.flxBorder.highlightOnParentFocus = true;
    frmApprovalHome.segApprovalsList.rowTemplate.flexTimerInnerCircle.highlightedSkin = "sknFlxMobFD5147100OR100px";
    frmApprovalHome.segApprovalsList.rowTemplate.flexTimerInnerCircle.highlightOnParentFocus = true;
    kony.print("---- approvals home preshow end ----");
  } catch (error) {
    kony.print("---- Approvals home preshow error: " + JSON.stringify(error));
  }
};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : JSON array consisting of sql response
 *@returns: Processed data back to the Controller extension
 *@desc   : Data process is taken place here
 */

kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement = function(response_data) {

  kony.print("----------- Begining of the Process data in the frmapprovalhome --------");
  try {
    var processedData = [];
    if (response_data == null || response_data == undefined || response_data.length < 0 || response_data == '') {
      return [];
    }

    if (response_data && response_data.length > 0) {

      for (var index in response_data) {
        var processedRequest = kony.apps.coe.ess.Approvals.ApprovalsHome.process_ApprovalRequest(response_data[index]);

        if (isEmpty(processedRequest)) {
          //skip the request not to show in approval request queue
        } else {
          //Alternate Skins for the Row
          if (index % 2 == 0) {
            processedRequest.flxApprovalRequest = {
              "skin": "sknFlxMobF7F9FA100O"
            }
          } else {
            processedRequest.flxApprovalRequest = {
              "skin": "sknFlxMobFFFFFF100O"
            }
          }
          processedData.push(processedRequest);
        }

      }

    } else {
      //null handing when the data is empty


    }
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
kony.apps.coe.ess.Approvals.ApprovalsHome.process_ApprovalRequest = function(approvalRequest) {
  try {
    kony.print("in kony.apps.coe.ess.Approvals.ApprovalsHome.process_ApprovalRequest");
    var processedRequest = {};
    processedRequest = approvalRequest;
    //common segment values
  //  processedRequest.btnLaterSegment = {"skin" : "sknBtnMob0OBor1DB6C928px", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.later")};
  //  processedRequest.btnReject = {"skin" : "sknBtnMob0OBorFEADA81pxFSFEADA8", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Reject")};
  //  processedRequest.btnApprove = {"skin" : "sknBtnMob3EBEA3100OFSFFFFFF100O28px", "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Approve")};
    processedRequest.StatusId = approvalRequest.StatusId;
    processedRequest.StatusName = approvalRequest.StatusName;
    processedRequest.request_type = approvalRequest.Type;
    processedRequest.ID = approvalRequest.ID;
    processedRequest.Leave_hours = approvalRequest.Leave_hours;
    processedRequest.Leave_days = approvalRequest.Leave_days;
    processedRequest.remaingHours = 0;
    processedRequest.RequestDateObject = new Date().modifyByYYYYMMDDHHMMSS(approvalRequest.RequestDate);
    processedRequest.RequestDateString = processedRequest.RequestDateObject.toDateString();
    processedRequest.RequestDate = processedRequest.RequestDateObject.toDDmmmHHMMtt();
    if (isEmpty(approvalRequest.AttributeNAME) || isEmpty(approvalRequest.Attributevalue)) {
      processedRequest.attributejson = {};
    } else {
      processedRequest.attributesNames = approvalRequest.AttributeNAME;
      processedRequest.attributeValues = approvalRequest.Attributevalue;
      processedRequest.attributejson = processedRequest.attributesNames.returnCombinationInJsonFormat(processedRequest.attributeValues, ",");

    }
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
      "text": processedRequest.UserName + " "
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
          var hoursData = processedRequest.Leave_hours;
		  var hours = Number(hoursData).toFixed();
          var hourDataText=(hoursData+"").replace(".", ",");
          var duration = hourDataText + " " +kony.i18n.getLocalizedString("i18n.ess.myApprovals.hours"); // hours";
          if(hours == 1){
            duration = hourDataText + " " +kony.i18n.getLocalizedString("i18n.ess.myApprovals.hour");
          }
		  processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);
		  
          if(hours > 7){
            if(hours == 8){
              duration = "1 " + kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Day.text")+" ";  
            }else{
              var days = String(processedRequest.Leave_days).split(".");
              if(days[1] == "00"){
                days = days[0];
              }
              duration = days+" "+kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Day(s).text");
			  processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + " " + endDate.retriveMonthName().substring(0, 3);
            }
			
          }

            //commented as duration was calculted on start date and end date
          //var diff = (endDate - startdate) / (1000 * 3600 * 24); 
//           if (processedRequest.Leave_hours >= 1) {
//             //multiple days leave
//             processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + " " + endDate.retriveMonthName().substring(0, 3);
//             processedRequest.AdditionalData = {
//               "text": " " + Math.round(Number(diff) + 1).toString() + " Day(s) ",
//               "isVisible": true
//             };
//           } else {
//             //single Day leave
//             processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);
//             processedRequest.AdditionalData = {
//               "text": "1" + kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Day.text")+" ",
//               "isVisible": true                        };
//           }
          	         	
            processedRequest.AdditionalData = {
              "text": duration,
              "isVisible": true                        
            };
          

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
            //multiple days Timesheet
            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + " " + endDate.retriveMonthName().substring(0, 3);
            processedRequest.AdditionalData = {
              "text": " " + Math.round(Number(diff) + 1).toString() + " Day(s) ",
              "isVisible": true
            };
          } else {
            //single Day Timesheet
            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);
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
  } catch (e) {
    handleError(JSON.stringify(e));
  }

}

/*
 *@function
 *@class  : ApprovalsHome
 *@params : JSON array consisting of sql response
 *@returns: Processed data for the islater segment back to the Controller extension
 *@desc   : Data process is taken place here
 */

kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForISlaterSegment = function(response_data) {

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
          processed_request_type.NAME = "PURCHASE REQUISITION";
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
 *@params : None
 *@returns: None
 *@desc   : Refreshes the islater part in the approval home ui
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.refreshISlaterSegment = function() {
  kony.print("-- Start kony.apps.coe.ess.Approvals.ApprovalsHome.refreshISlaterSegmen --");
  try {
    //query for the retrival of the Islater requests count
    var IsLaterRequests_query = "SELECT approval_request.leave_hours AS Leave_hours," +
          "       approval_request.leave_days AS Leave_days," +
        "request_type.NAME AS TYPE, " +
        "        Count (IsLaterRequests.type_id) AS COUNT ," +
        "			request_type.id AS id " +
        " FROM   request_type " +
        "        LEFT JOIN (SELECT * " +
        "                   FROM   approval_request " +
        "                          LEFT JOIN request_approver " +
        "                                 ON ( request_approver.approval_id = " +
        "                                      approval_request.id " +
        "                                    ) " +
        "                   WHERE  approval_request.islater = 1 " +
        "                          AND request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
        "                          AND request_approver.status_id = '2') IsLaterRequests " +
        "               ON ( IsLaterRequests.type_id = request_type.id ) " +
        " GROUP  BY request_type.id ";

    function setISlaterRequestDataToApprovalHome(ISLaterRequestsData) {
      //process data
      var processedIslaterRequestData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForISlaterSegment(ISLaterRequestsData);
      var IslaterRequestsCount = 0;
      for (var index in ISLaterRequestsData) {
        IslaterRequestsCount += parseInt(ISLaterRequestsData[index].COUNT);
      }
      //bind data to segment
      //setting the data to the islater segments
      var IslaterWidgetDataMap = {
        "imgApproval": "Image",
        "lblRequesType": "NAME",
        "lblRequestCount": "COUNT",

      };
      frmApprovalHome.segLaterApprovals.widgetDataMap = IslaterWidgetDataMap;
      frmApprovalHome.segLaterApprovals.setData(processedIslaterRequestData);
      //label count
      frmApprovalHome.lblLaterCount.text = IslaterRequestsCount.toFixed();
    }
    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", IsLaterRequests_query, setISlaterRequestDataToApprovalHome, function(err) {
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest") + JSON.stringify(err)));
    });
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest") + JSON.stringify(err)));
  }
  kony.print("-- End kony.apps.coe.ess.Approvals.ApprovalsHome.refreshISlaterSegmen --");
};
/*
 *@function
 *@class  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : Refreshes the cuurent approval request count
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.refreshNowCount = function() {
  //query for the retrival of the Approval Requests
  if (isEmpty(kony.apps.coe.ess.globalVariables.EmployeeID)) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.EmployeeRetival")));
    return;
  }

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
      " and (request_approver.status_id = '2' OR (request_approver.status_id = '0' AND approval_request.isRead = '0' AND approval_request.type_id='LEAVEINFO' and approval_request.category_id != 'NULL'))" +
      " and approval_request.islater='0'" +
      " GROUP  BY approval_request.id  ";

  function refreshApprovalHomeNowCount(approvalRequests) {
    if (isEmpty(approvalRequests) || isEmpty(approvalRequests.length)) {
      frmApprovalHome.lblNowCount.text = "0";
      flxNavigateFooter.lblNowCount.text = "0";
      frmApprovalHome.lblNotificationsCount.text = "0";
    } else {
      frmApprovalHome.lblNowCount.text = approvalRequests.length.toFixed();
      flxNavigateFooter.lblNowCount.text = approvalRequests.length.toFixed();
      frmApprovalHome.lblNotificationsCount.text = data.ApprovalRequestData.length.toFixed();
    }
  }
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", Approval_request_query, refreshApprovalHomeNowCount, function(err) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchApprovalRequest") + JSON.stringify(err)));
  });
};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : Animates the slider flex towards right
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.
sliderAnimationToLater = function() {
  try {
    frmApprovalHome.flxSlider.animate(
      kony.ui.createAnimation({
        100: {
          left: "58%",
          widht: "13%"
        }
      }), {
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.5
      });
    frmApprovalHome.btnNow.skin = "sknBtnMob0OFS313454100O32px";
    frmApprovalHome.flxNowCount.skin = "sknFlxMob313454100O32px";
    frmApprovalHome.lblNowCount.skin = "sknLblMob787A8F100O20px";
    frmApprovalHome.btnLater.skin = "sknBtn0OFFFFFFFs32px";
    frmApprovalHome.flxLaterCount.skin = "sknFlxMobFFFFFF100OR100px";
    frmApprovalHome.lblLaterCount.skin = "sknLblMob787A8F100OFS20px";
    //Updating the global variable for the content Type
    kony.apps.coe.ess.globalVariables.FrmApprovalsCurrentContentType = kony.apps.coe.ess.globalVariables.constants.FrmApprovalHome.LaterType
    this.animateApprovalHome(true);
  } catch (e) {
    kony.print("---- the error in retriving the later approval requests is" + e.message + "-----");
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest")));
  }

};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : Animates the slider flex towards left
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.
sliderAnimationToNow = function() {
  try {
    frmApprovalHome.flxSlider.animate(
      kony.ui.createAnimation({
        100: {
          left: "25%",
          widht: "12.5%"
        }
      }), {
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.5
      });
    frmApprovalHome.btnNow.skin = "sknBtn0OFFFFFFFs32px";
    frmApprovalHome.flxNowCount.skin = "sknFlxMobFFFFFF100OR100px";
    frmApprovalHome.lblNowCount.skin = "sknLblMob3EBEA3100OFS20px";
    frmApprovalHome.btnLater.skin = "sknBtnMob0OFS313454100O32px";
    frmApprovalHome.flxLaterCount.skin = "sknFlxMob313454100O32px";
    frmApprovalHome.lblLaterCount.skin = "sknLblMob787A8F100O20px";
    frmApprovalHome.imgFilter.src = "filter_unselected.png";
    //Updating the global variable for the content Type
    kony.apps.coe.ess.globalVariables.FrmApprovalsCurrentContentType = kony.apps.coe.ess.globalVariables.constants.FrmApprovalHome.NowType;
    this.animateApprovalHome(false);
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchApprovalRequest")));
  }
};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : Boolean flag either True or False
 *@returns: None
 *@desc   : Accoring to current flex present in homepage the background gets chaged
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.
animateApprovalHome = function(boolFlag) {
  if (boolFlag === true) {
    frmApprovalHome.flxFiter.isVisible = false;
    frmApprovalHome.flxApprovalList.isVisible = false;
    frmApprovalHome.flxLaterApprovals.isVisible = true;
    frmApprovalHome.flxLaterFilter.isVisible = true;

    frmApprovalHome.skin = "sknFrm787A8F100O";
    frmApprovalHome.flxHeader.skin = "sknFlx787A8F100O";

    frmApprovalHome.flxFilterButton.isVisible = false;
    frmApprovalHome.flxLaterApprovals.isVisible = true;
  } else {
    frmApprovalHome.flxApprovalList.isVisible = true;
    frmApprovalHome.flxLaterApprovals.isVisible = false;
    frmApprovalHome.flxLaterFilter.isVisible = false;

    frmApprovalHome.skin = "sknFrm3EBEA3100O";
    frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";

    frmApprovalHome.flxFilterButton.isVisible = true;
    frmApprovalHome.flxLaterApprovals.isVisible = false;
  }
};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : Invoked when flxFilterButton in clicked, it makes the search flex to be visible and adds a dummy flex at end
 */

kony.apps.coe.ess.Approvals.ApprovalsHome.
onclickFilterIcon = function() {
  if (frmApprovalHome.imgFilter.src == "filter_selected.png") {
    frmApprovalHome.imgFilter.src = "filter_unselected.png";
    this.clearDataofFilter();
    frmApprovalHome.flxFiter.isVisible = false;
    frmApprovalHome.flxApprovalSegments.height = "100%";
    frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
  } else {
    frmApprovalHome.tbxSearch.text = "";
    frmApprovalHome.flxFiter.isVisible = true;
    frmApprovalHome.flxApprovalSegments.height = "82%";
    frmApprovalHome.imgFilter.src = "filter_selected.png";
    frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
    frmApprovalHome.flxFiter.skin = "sknFlx3EBEA3100O";

  }
  if(kony.apps.coe.ess.globalVariables.isSPA){
    kony.print("---- filter image: "+frmApprovalHome.imgSPAFilter.src);
    if(frmApprovalHome.imgSPAFilter.src == "filter_unselected.png"){
      frmApprovalHome.flxFiter.isVisible = true;
      frmApprovalHome.flxApprovalSegments.height = "82%";
      frmApprovalHome.imgFilter.src = "filter_selected.png";
      frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
      frmApprovalHome.flxFiter.skin = "sknFlx3EBEA3100O";
      frmApprovalHome.imgSPAFilter.src = "close.png";
      return;
    }
    if(frmApprovalHome.imgSPAFilter.src == "close.png") {
      this.clearDataofFilter();
      frmApprovalHome.flxFiter.isVisible = false;
      frmApprovalHome.flxApprovalSegments.height = "100%";
      frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
      frmApprovalHome.imgSPAFilter.src = "filter_unselected.png";
      return;
    }
  }
};

/*
 *@function
 *@class  : ApprovalsHome
 *@params : button
 *@returns: None
 *@desc   : shifts the skin of the selected button
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.
selectType = function(btn) {
  try {
    var prev_selection = "btnFilter" + this.prev;
    var btn_id = btn.id.slice(9, btn.id.length);
    frmApprovalHome[prev_selection].skin = "sknBtn0OFont00000028px";
    btn.skin = "sknBtn0OBor1pxFFFFFF100O";
    this.prev = btn_id;
    this.showCategory(btn_id);
  } catch (e) {
    handleError(e);
  }
};

kony.apps.coe.ess.Approvals.ApprovalsHome.
undockSearchList = function() {

  frmApprovalHome.flxSearch.animate(
    kony.ui.createAnimation({
      100: {
        height: "63.4%",
      }
    }), {
      fillMode: kony.anim.FILL_MODE_FORWARDS,
      duration: 0.5
    });
  frmApprovalHome.flxLaterApprovals.setVisibility(false);
};

kony.apps.coe.ess.Approvals.ApprovalsHome.
dockSearchList = function() {

  frmApprovalHome.flxSearch.animate(
    kony.ui.createAnimation({
      100: {
        height: "0%",
      }
    }), {
      fillMode: kony.anim.FILL_MODE_FORWARDS,
      duration: 0.5
    });

  frmApprovalHome.flxLaterApprovals.setVisibility(true);
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : button clicked
 *@returns: None
 *@desc   : Changes skin of button clicked and sets data accordingly.
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.filterApprovalDetails = function(buttonWidget, request_type) {
  kony.print("--Start filterApprovalDetails function--");
  try {
    var request_query = {}
    request_query.requestType = [];
    request_query.totalPeoples = [];
    request_query.attribute_section_id = "1";
    request_query.status_id = "2";
    request_query.show_auto_approved = "1";
    request_query.isLater = "0";
    if (kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems !== null) {
      var selectedPeople = kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems;
      for (var index in selectedPeople) {
        request_query.totalPeoples.push(selectedPeople[index].Id);
      }
    }
    var childWidgets = frmApprovalHome.flxScrlCategory.widgets();
    for (var x = 0; x < childWidgets.length; x++) {
      childWidgets[x].skin = "sknBtn0OFont00000028px";
    }
    buttonWidget.skin = "sknBtn0OBor1pxFFFFFF100O";
    if (buttonWidget.id != "btnFilterAll") {
      request_query.requestType.push(request_type);
    } else {
      //Nothing To DO
    }

    kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(request_query, kony.apps.coe.ess.Approvals.ApprovalsHome.set_data_ForNowSegment);
    kony.apps.coe.ess.Approvals.ApprovalsHome.changeSkinsForNowSegment(request_type);
    request_query.requestType = [];
  } catch (e) {
    handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.filterErrorMsg"));
    kony.print("Error while applying filter" + e.message);
  }
  kony.print("--End filterApprovalDetails function--");
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : leave type
 *@returns: None
 *@desc   : Skins will be assigned as per request type
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.changeSkinsForNowSegment = function(request_type) {
  kony.print("--start change Skins function--");
  try {
    switch (request_type) {
      case "LEAVE":
        frmApprovalHome.flxHeader.skin = "sknFlx7986CBff";
        frmApprovalHome.flxFiter.skin = "sknFlx7986CBff";
        frmApprovalHome.skin = "sknFlx7986CBff";
        break;
      case "TIMESHEET":
        frmApprovalHome.flxHeader.skin = "sknflxBA68C8po100";
        frmApprovalHome.flxFiter.skin = "sknflxBA68C8po100";
        frmApprovalHome.skin = "sknflxBA68C8po100";
        break;
      case "EXPENSES":
        frmApprovalHome.flxHeader.skin = "skn1DB6C9ff";
        frmApprovalHome.flxFiter.skin = "skn1DB6C9ff";
        frmApprovalHome.skin = "skn1DB6C9ff";
        break;
      case "PURCHASEORDER":
        frmApprovalHome.flxHeader.skin = "sknFlxMob058594ff";
        frmApprovalHome.flxFiter.skin = "sknFlxMob058594ff";
        frmApprovalHome.skin = "sknFlxMob058594ff";
        break;
      case "WORKORDER":
        frmApprovalHome.flxHeader.skin = "sknFlxMob0284B5ff";
        frmApprovalHome.flxFiter.skin = "sknFlxMob0284B5ff";
        frmApprovalHome.skin = "sknFlxMob0284B5ff";
        break;
      case 'PURCHASEREQUISITION':
        frmApprovalHome.flxHeader.skin = "sknFlxMob4186D1ff";
        frmApprovalHome.flxFiter.skin = "sknFlxMob4186D1ff";
        frmApprovalHome.skin = "sknFlxMob4186D1ff";
        break;
      default:
        frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
        frmApprovalHome.flxFiter.skin = "sknFlx3EBEA3100O";
        frmApprovalHome.skin = "sknFlx3EBEA3100O";
    }
  } catch (e) {
    handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.errorChangeSkin"));
    kony.print("Error while applying filter" + e.message);
  }
  kony.print("--End changeSkins function--");
}

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : sets data to Now segment
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.set_data_ForNowSegment = function(response) {
  try {
    kony.print("in kony.apps.coe.ess.Approvals.ApprovalsHome.set_data_ForNowSegment");
    var processedData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement(response);
    //setting the data to the approval request Segement
    if (processedData == null || processedData == undefined) {
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.peopleSearch.ErrorMessage.nullResponse")));
      return;
    }
    if (processedData.length <= 0 || isEmpty(processedData)) {
      frmApprovalHome.lblNoRecordsFound.setVisibility(true);
    } else {
      frmApprovalHome.lblNoRecordsFound.setVisibility(false);
    }
    var WidgetDatamap = {
      "lblShortName": "CreatedUserShortName",
      // "imgCategory": "requestTypeImage",
      "lblUserName": "UserName",
      "lblCreateDate": "RequestDate",
      "lblDueDateValue": "dueDate",
      "lblRequestInfo": "RequestInfo",
      "btnAdditionalInfo": "AdditionalData",
      "flxTimer": "FlxTimerUi",
      "lblCategory": "category",
      // "flxBorder1": "requestTypeBorderSkin",
      // "flxBorder2": "requestTypeBorderSkin2",
      // "imgLeaveInfo": "requestTypeInfoImage",
      "lblRemainingHours": "remaingHours",
      "lblDelegated": "Delegated",
      "imgUser": "imgUser",
      "flxApprovalRequest": "flxApprovalRequest",
      "flxUserImg": "flxUserImg",
      "btnLaterSegment" : "btnLaterSegment",
      "btnReject" : "btnReject",
      "btnApprove" : "btnApprove",
      "btnNoticed" : "btnNoticed"
    };
    frmApprovalHome.segApprovalsList.widgetDataMap = WidgetDatamap;
    frmApprovalHome.segApprovalsList.setData(processedData);
    // Start Lazy loading for the approvals list Segment
    kony.apps.coe.ess.Approvals.ApprovalsHome.lazyLoading();
  } catch (err) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.peopleSearch.ErrorMessage.bindData")));
  }
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : Clears filtered data and sets default data
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.clearDataofFilter = function() {
  kony.print("--Start clearDataofFilter function--");
  if (kony.apps.coe.ess.globalVariables.isNative) {
    kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems = null;
    kony.apps.coe.ess.Approvals.ApprovalsHome.filterApprovalDetails({
      id: "btnFilterAll"
    }, "All");
  } else {
    kony.print("---- clearDataofFilter SPA ----");
  }
  frmApprovalHome.btnFilterAll.skin = "sknBtn0OBor1pxFFFFFF100O";
  frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
  kony.print("--End clearDataofFilter function--");
};

/*
 *@function
 *@params : EmployeeSearchString - search string provided by the user
 *@returns: Processed data back to the Controller extension
 *@desc   : Data process is taken place here
 */
kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch = function(searchString, DynamicWidget) {
  try {
    //input validations
    if (isEmpty(DynamicWidget)) {
      handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.ErrorMessage.InvalidInput"));
      return;
    }
    var EmployeeSearchQuery = "SELECT ((CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE [employee].[First_Name] END) || ' ' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE [employee].[Last_Name] END)) AS [username]," +
        " (CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE substr([employee].[First_Name] ,1,1) END || '' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE substr([employee].[Last_Name],1,1) END)) AS [shortName]," +
        "       [employee].[Last_Name] as Last_Name,  " +
        "       [employee].[Manager_Id] as Manager_Id ,  " +
        "       [employee].[Id] as Id,  " +
        "       [employee].[Media_Id] as Media_Id " +
        "FROM   [employee] " +
        "WHERE   ([employee].[first_name] LIKE '%" + searchString + "%' " +
        "       OR  [employee].[Last_Name] LIKE '%" + searchString + "%'  ) " +
        "ORDER  BY username ";


    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", EmployeeSearchQuery, function(DynamicWidget, Response) {
      for (var index in Response) {
        Response[index].username = {
          "text": Response[index].username
        }
        Response[index].shortName = {
          "text": Response[index].shortName
        }
      }
      if(Response.length != null && Response.length >0){
          DynamicWidget.setData(Response);
          frmApprovalHome.lblNoRecordsFound1.setVisibility(false);
      }else{
          DynamicWidget.setData(Response);
          frmApprovalHome.lblNoRecordsFound1.setVisibility(true);
      }
      //lazy loading
      var segmentConfiguration = {
        "MediaKeyAttribute": "Media_Id",
        "ImageWidgetName": "imgEmployee",
        "hideWidgetNames": []
      };
      kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_DYNAMICSEGMENT, DynamicWidget, "Employee", "mediaEmployee", "", segmentConfiguration);
    }
                                          .bind(this, DynamicWidget),
                                          function(err) {
      handleError(err);
    });
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.ErrorMessage.dynamicData")));
  };

};

/*
 *@function
 *@params : DynamicWidget - Widget reference
 *@returns: null
 *@desc   : Sets data in the dynamic segment with the employees who has the approval requests
 */

kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests = function(DynamicWidget) {
  try {

    if (isEmpty(DynamicWidget)) {
      handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.ErrorMessage.InvalidInput"));
      return;
    }

    var employeewithApprovalRequest = "SELECT ((CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE [employee].[First_Name] END) || ' ' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE [employee].[Last_Name] END)) AS [username],  " +
        "       (CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE SUBSTR ([employee].[First_Name], 1, 1) END || '' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE SUBSTR ([employee].[Last_Name], 1, 1) END)) AS [shortName],  " +
        "       [employee].[Media_Id] AS [Media_Id] ," +
        "       [employee].[Id] as Id  " +
        "FROM   [approval_request] " +
        "       LEFT JOIN [request_type] ON ([approval_request].[type_id] = [request_type].[id]) " +
        "       LEFT JOIN [employee] ON ([approval_request].[employee_id] = [employee].[id]) " +
        "       LEFT JOIN [status] ON ([request_approver].[status_id] = [status].[id]) " +
        "       LEFT JOIN [request_approver] ON ([approval_request].[id] = [request_approver].[approval_id]) " +
        "WHERE  [request_approver].[status_id] = 2 AND [employee].[Id] NOT NULL " +
        "GROUP  BY [username] " +
        "ORDER  BY username ";

    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", employeewithApprovalRequest, function(DynamicWidget, Response) {
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
      kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_DYNAMICSEGMENT, DynamicWidget, "Employee", "mediaEmployee", "", segmentConfiguration);

    }
                                          .bind(this, DynamicWidget),
                                          function(err) {
      handleError(err);
    });
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.ErrorMessage.dynamicData")));
  }
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : this makes the employee search flex visible
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter = function() {

  if (kony.apps.coe.ess.globalVariables.FrmApprovalsCurrentContentType == kony.apps.coe.ess.globalVariables.constants.FrmApprovalHome.NowType) {
    //search is selected on the now Filter page
    //setting segments visibility to false
    frmApprovalHome.flxApprovalList.setVisibility(false);
    frmApprovalHome.flxLaterApprovals.setVisibility(false);
    //making islater search to false
    frmApprovalHome.flxLaterFilter.setVisibility(false);
    frmApprovalHome.flxFiter.setVisibility(true);

  } else {
    //search is selected on the later Filter page
    frmApprovalHome.flxLaterFilter.setVisibility(true);
    //setting segments visibility to false
    frmApprovalHome.flxApprovalList.setVisibility(false);
    frmApprovalHome.flxLaterApprovals.setVisibility(false);
    //making islater search to false
    frmApprovalHome.flxLaterFilter.setVisibility(true);
    frmApprovalHome.flxFiter.setVisibility(false);
  }
  frmApprovalHome.flxEmployeeSearch.setVisibility(true);
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : this makes the employee search flex in visible
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.hideEmployeeFilter = function() {
  if (kony.apps.coe.ess.globalVariables.FrmApprovalsCurrentContentType == kony.apps.coe.ess.globalVariables.constants.FrmApprovalHome.NowType) {
    //search is selected on the now Filter page
    //setting segments visibility to false
    frmApprovalHome.flxApprovalList.setVisibility(true);
    frmApprovalHome.flxLaterApprovals.setVisibility(false);
    //making islater search to false
    frmApprovalHome.flxLaterFilter.setVisibility(false);
    frmApprovalHome.flxFiter.setVisibility(false);
    frmApprovalHome.flxApprovalSegments.height = "100%";

  } else {
    //search is selected on the later Filter page
    frmApprovalHome.flxLaterFilter.setVisibility(true);
    //setting segments visibility to false
    frmApprovalHome.flxApprovalList.setVisibility(false);
    frmApprovalHome.flxLaterApprovals.setVisibility(true);
    //making islater search to false
    frmApprovalHome.flxLaterFilter.setVisibility(true);
    frmApprovalHome.flxFiter.setVisibility(false);
  }
  frmApprovalHome.flxEmployeeSearch.setVisibility(false);
  frmApprovalHome.imgFilter.src = "filter_unselected.png";
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : IsLater from will be displayed.
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.employeeFilter = function() {
  var query_data = {}
  query_data.requestType = [];
  query_data.totalPeoples = [];
  query_data.attribute_section_id = "1";
  query_data.status_id = "2";
  var selectedPeople = kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems;
  for (var index in selectedPeople) {
    query_data.totalPeoples.push(selectedPeople[index].Id);
  }
  if (kony.apps.coe.ess.globalVariables.FrmApprovalsCurrentContentType == kony.apps.coe.ess.globalVariables.constants.FrmApprovalHome.LaterType) {
    query_data.isLater = "1";
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmIsLaterSearch");
    formController.loadDataAndShowForm(selectedPeople);

  } else {
    query_data.isLater = "0";
    kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(query_data, kony.apps.coe.ess.Approvals.ApprovalsHome.set_data_ForNowSegment);
    kony.apps.coe.ess.Approvals.ApprovalsHome.hideEmployeeFilter();
    kony.apps.coe.ess.Approvals.ApprovalsHome.filterApprovalDetails({
      id: "btnFilterAll"
    }, "All");
    frmApprovalHome.btnFilterAll.skin = "sknBtn0OBor1pxFFFFFF100O";
    frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
  }
};

kony.apps.coe.ess.Approvals.ApprovalsHome.SPAPreshow = function() {
  try {
    kony.print("---- SPA preshow start ----");
    if (kony.apps.coe.ess.globalVariables.isSPA) {
      flxNavigateFooter.isVisible = false;
      frmApprovalHome.flxHamburgerButton.isVisible = false;
      frmApprovalHome.flxFilterButton.isVisible = false;
      frmApprovalHome.flxOptions.isVisible = true;
      frmApprovalHome.flxSPAFilter.isVisible = true;
      frmApprovalHome.flxFiter.isVisible = false;
      frmApprovalHome.imgSPAFilter.src = "filter_unselected.png";
      frmApprovalHome.segApprovalsList.top = "0%";
      frmApprovalHome.flxFooterOptions.isVisible = false;
      frmApprovalHome.imgOption1.src = "circleinactive.png";
      frmApprovalHome.imgOption2.src = "circleinactive.png";
      frmApprovalHome.imgOption3.src = "circleinactive.png";
      frmApprovalHome.forceLayout();
      kony.print("---- SPA preshow end ----");
    }
  } catch (error) {
    kony.print("---- SPA preshow error: " + JSON.stringify(error));
  }
}
kony.apps.coe.ess.Approvals.ApprovalsHome.onClickSPAOptions = function() {
  try {
    kony.print("---- onClickSPAOptions start ---");
    if (frmApprovalHome.flxFooterOptions.isVisible) {
      frmApprovalHome.flxFooterOptions.isVisible = false;
      frmApprovalHome.imgOption1.src = "circleinactive.png";
      frmApprovalHome.imgOption2.src = "circleinactive.png";
      frmApprovalHome.imgOption3.src = "circleinactive.png";
    } else {
      frmApprovalHome.flxFooterOptions.isVisible = true;
      frmApprovalHome.imgOption1.src = "circleactive.png";
      frmApprovalHome.imgOption2.src = "circleactive.png";
      frmApprovalHome.imgOption3.src = "circleactive.png";

    }
    kony.print("---- onClickSPAOptions end ----");
  } catch (error) {
    kony.print("---- onClickSPAOptions error: " + JSON.stringify(error));
  }
}
/*
     *@function
     *@member  : ApprovalsHome
     *@params : None
     *@returns: None
     *@desc   : This is to laod the images in the approvals home segment
     */
kony.apps.coe.ess.Approvals.ApprovalsHome.lazyLoading = function() {
  kony.print("-- Start kony.apps.coe.ess.Approvals.ApprovalsHome.lazyLoading --");
  //lazy loading for the segment
  var segmentConfiguration = {
    "MediaKeyAttribute": "MediaID",
    "ImageWidgetName": "imgUser",
    "hideWidgetNames": []
  };
  kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_SEGMENT, frmApprovalHome.segApprovalsList, "Employee", "mediaEmployee", "", segmentConfiguration);
  kony.print("-- End kony.apps.coe.ess.Approvals.ApprovalsHome.lazyLoading --");

};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : This to perform the later operation when the user clicks on the later button the segment
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.MarkAsLater = function(context) {
  try {
    kony.print("-- Start kony.apps.coe.ess.Approvals.ApprovalsHome.MarkAsLater --");
    //input validation
    if (isEmpty(context)) {
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.MarkAsLater")));
    }
    kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.markAsLater(context.widgetInfo.selectedRowItems[0].ID);
    kony.print("-- End kony.apps.coe.ess.Approvals.ApprovalsHome.MarkAsLater --");
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.MarkAsLater") + JSON.stringify(e)));
  }
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : This to perform the Approve operation when the user clicks on the later button the segment
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.approveRequest = function(context) {
  try {
    kony.print("-- Start kony.apps.coe.ess.Approvals.ApprovalsHome.approveRequest --");
    //input validation
    if (isEmpty(context)) {
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.ApproveRequest")));
    }
    kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.approveRequest(frmApprovalHome.segApprovalsList.selectedRowItems[0].ID);
    kony.print("-- End kony.apps.coe.ess.Approvals.ApprovalsHome.approveRequest --");
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.ApproveRequest") + JSON.stringify(e)));
  }
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : This to perform the Mark as Read operation when the user clicks on the notice button the segment
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.noticeRequest = function(context) {
  try {
    kony.print("-- Start kony.apps.coe.ess.Approvals.ApprovalsHome.noticeRequest --");
    //input validation
    if (isEmpty(context)) {
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.ApproveRequest")));
    }
    kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.noticeRequest(frmApprovalHome.segApprovalsList.selectedRowItems[0].ID);
    kony.print("-- End kony.apps.coe.ess.Approvals.ApprovalsHome.approveRequest --");
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.ApproveRequest") + JSON.stringify(e)));
  }
};

/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : This to perform the later operation when the user clicks on the later button the segment
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.rejectRequest = function(context) {
  try {
    kony.print("-- Start kony.apps.coe.ess.Approvals.ApprovalsHome.rejectRequest --");
    //input validation
    if (isEmpty(context)) {
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.RejectRequest")));
    }
    kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.rejectRequest(frmApprovalHome.segApprovalsList.selectedRowItems[0].ID);
    kony.print("-- End kony.apps.coe.ess.Approvals.ApprovalsHome.rejectRequest --");
  } catch (e) {
    handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.DataOperations.ErrorMessage.RejectRequest") + JSON.stringify(e)));
  }
};
/*
 *@function
 *@member  : ApprovalsHome
 *@params : None
 *@returns: None
 *@desc   : This to perform the Delegation Icon to Enable or Disable
 */
kony.apps.coe.ess.Approvals.ApprovalsHome.
DelegationShow = function() {
  //   var isShowDelegation = kony.apps.coe.ess.appconfig.isShowDelegation;
  if (kony.apps.coe.ess.appconfig.isShowDelegation === false) {
    flxNavigateFooter.flxDelegation.setVisibility(false);
    flxNavigateFooter.flxApprovals.left = "0%";
    flxNavigateFooter.flxApprovals.width = "50%";
    flxNavigateFooter.flxFilter.left = "0%";
    flxNavigateFooter.flxFilter.width = "50%";
  } else {
    flxNavigateFooter.flxDelegation.setVisibility(true);
    flxNavigateFooter.flxApprovals.left = "0%";
    flxNavigateFooter.flxApprovals.width = "33.3%";
    flxNavigateFooter.flxFilter.left = "0%";
    flxNavigateFooter.flxFilter.width = "33.3%";
    flxNavigateFooter.flxDelegation.left = "0%";
    flxNavigateFooter.flxDelegation.width = "33.3%";
  }
};
