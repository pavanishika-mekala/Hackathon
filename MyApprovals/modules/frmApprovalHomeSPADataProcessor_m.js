kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.spa = kony.apps.coe.ess.Approvals.spa || {};

//Consists of variables used over the entire module of Approvals dashboard
kony.apps.coe.ess.Approvals.spa.requestTypes = "";
kony.apps.coe.ess.Approvals.spa.statusTypes = "";
kony.apps.coe.ess.Approvals.spa.totalRequests = "";
//kony.apps.coe.ess.Approvals.spa.totalDashboardRequests = "";
kony.apps.coe.ess.Approvals.spa.totalLaterRequests = "";
kony.apps.coe.ess.Approvals.spa.laterRequestsCount = "";
kony.apps.coe.ess.Approvals.spa.totalNumberOfRequests = "";
kony.apps.coe.ess.Approvals.spa.counter = "";
kony.apps.coe.ess.Approvals.spa.formController = "";
//Consists of miscelleneous functions used to fetch data from backend
kony.apps.coe.ess.Approvals.spa = {

  getRequestTypes: function(processedRequest, type_id, status_id) {
    try {
      //Object service for fetching request types
      var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {
        "access": "online"
      });
      var dataObject = new kony.sdk.dto.DataObject("request_type");
      var options = {
        "dataObject": dataObject
      };

      //If request types are already fetched it will be assigned tp that request
      if (kony.apps.coe.ess.Approvals.spa.requestTypes) {
        processedRequest.request_type = kony.apps.coe.ess.Approvals.spa.requestTypes[type_id];
        kony.apps.coe.ess.Approvals.spa.getStatusTypes(processedRequest, status_id); //Calling a function to assign status names
      } else { //Object service to fetch request types
        objSvc.fetch(options, function(res) {
          kony.apps.coe.ess.Approvals.spa.requestTypes = kony.apps.coe.ess.Approvals.spa.processIntoSingleJSON(res, "request_types");
          kony.apps.coe.ess.Approvals.spa.getRequestTypes(processedRequest, type_id, status_id); //Function calling itself to assign request types
        }, function(err) {
          kony.print("---- request_type fetching error: " + err);
        });
      }
    } catch (error) {
      kony.print("---- getRequestTypes error: " + error);
    }
  },

  getStatusTypes: function(processedRequest, status_id) {
    try {
      //Object service for fetching request types
      var objSvc = kony.sdk.getCurrentInstance().getObjectService("Employee", {
        "access": "online"
      });
      var dataObject = new kony.sdk.dto.DataObject("Status");
      var options = {
        "dataObject": dataObject
      };

      //If status types are already fetched they will be assigned to its respective requests
      if (kony.apps.coe.ess.Approvals.spa.statusTypes) {
        processedRequest.StatusId = status_id;
        processedRequest.StatusName = kony.apps.coe.ess.Approvals.spa.statusTypes[status_id];
        if (processedRequest.isLater == 1 && processedRequest.StatusId == 2) {
          processedRequest = kony.apps.coe.ess.Approvals.spa.beautifyEachRequest1(processedRequest);
          kony.apps.coe.ess.Approvals.spa.totalLaterRequests.push(processedRequest);
          kony.apps.coe.ess.Approvals.spa.laterRequestsCount[processedRequest.request_type]++; //Calculating number of later requests for each request type
        }   else {
          //  processedRequest = kony.apps.coe.ess.Approvals.spa.beautifyEachRequest(processedRequest);
          processedRequest = kony.apps.coe.ess.Approvals.spa.beautifyEachRequest1(processedRequest);
          kony.print("---- processed request after beautify: " + JSON.stringify(processedRequest));
          kony.apps.coe.ess.Approvals.spa.totalRequests.push(processedRequest);
          kony.print("---- totalRequests: " + JSON.stringify(kony.apps.coe.ess.Approvals.spa.totalRequests));
        }
        kony.apps.coe.ess.Approvals.spa.counter++;
        kony.print("---- counter: " + kony.apps.coe.ess.Approvals.spa.counter);
        kony.print("---- counter: " + kony.apps.coe.ess.Approvals.spa.totalNumberOfRequests);
        if (kony.apps.coe.ess.Approvals.spa.totalNumberOfRequests == kony.apps.coe.ess.Approvals.spa.counter) {
          kony.print("---- Later Request processing completed");
          kony.apps.coe.ess.Approvals.spa.processLaterRequests(kony.apps.coe.ess.Approvals.spa.totalLaterRequests);
          //   var laterRequests = kony.apps.coe.ess.Approvals.spa.beautifyEachLaterRequest(kony.apps.coe.ess.Approvals.spa.totalLaterRequests);
          //   var laterRequests = kony.apps.coe.ess.Approvals.spa.beautifyEachRequest1(kony.apps.coe.ess.Approvals.spa.totalLaterRequests);
          var laterRequests = kony.apps.coe.ess.Approvals.spa.totalLaterRequests;
          var laterCount = 0;
          for (var index in kony.apps.coe.ess.Approvals.spa.laterRequestsCount) {
            laterCount = laterCount + kony.apps.coe.ess.Approvals.spa.laterRequestsCount[index];
          }

          kony.apps.coe.ess.Approvals.spa.totalRequests = {
            "ISLaterRequestsData": laterRequests,
            "ApprovalRequestData": kony.apps.coe.ess.Approvals.spa.totalRequests,
            "IslaterRequestsCount": laterCount //kony.apps.coe.ess.Approvals.spa.totalLaterRequests.length
          };
          kony.print("---- result data: " + JSON.stringify(kony.apps.coe.ess.Approvals.spa.totalRequests));
          kony.print("---- formController: " + JSON.stringify(kony.apps.coe.ess.Approvals.spa.formController.getController()));
          kony.apps.coe.ess.Approvals.spa.formController.getController().bindData(kony.apps.coe.ess.Approvals.spa.totalRequests);
          //kony.sdk.mvvm.frmApprovalHomeControllerExtension.bindData(kony.apps.coe.ess.Approvals.spa.totalRequests);
        }

        //kony.apps.coe.ess.Approvals.spa.beautifyRequests();
      } else {
        objSvc.fetch(options, function(res) {
          kony.apps.coe.ess.Approvals.spa.statusTypes = kony.apps.coe.ess.Approvals.spa.processIntoSingleJSON(res, "status");
          kony.apps.coe.ess.Approvals.spa.getStatusTypes(processedRequest, status_id); //Calling a function to assign status names
        }, function(err) {
          kony.print("---- fetch error: " + JSON.stringify(err));
        });
      }
    } catch (error) {
      kony.print("---- error: " + error);
    }
  },
  getEmployeeId : function() {

    var EmployeeData;
    var objSvc = kony.sdk.getCurrentInstance().getObjectService("Employee", {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject("Employee");
    var options = {
      "dataObject": dataObject};
    objSvc.fetch(options, function(res) {
      EmployeeData = res.records;
      //Processing of fetched requests is done for SPA records
      kony.apps.coe.ess.Approvals.spa.getEmployeeId();
      kony.print("---------- Employee Data: " + JSON.stringify(res));
    }, function(err) {
      kony.print("---------- dataObject error: " + JSON.stringify(err));
    });
  },


  processLaterRequests: function(laterRequests) {
    try {
      kony.print("---- processLaterRequests start ----");
      for (var index in laterRequests) {
        kony.apps.coe.ess.Approvals.spa.laterRequestsCount[laterRequests[index].request_type] = 0;
      }
      for (var index in laterRequests) {
        kony.apps.coe.ess.Approvals.spa.laterRequestsCount[laterRequests[index].request_type]++;
      }
      kony.print("---- later requests count: " + JSON.stringify(kony.apps.coe.ess.Approvals.spa.laterRequestsCount));
      kony.print("---- processLaterRequests end ----");
    } catch (error) {
      kony.print("---- processLaterRequests error: " + JSON.stringify(error));
    }
  },

  //Fetched JSON is processed into a custom JSON to qucikly access the values like {"LEAVERQ":"LEAVEREQUEST","PURCHORDR":"PURCHASEORDER"}
  processIntoSingleJSON: function(data, type) {
    try {
      data = data.records;
      var result = {};
      if (type == "request_types") { //JSON processing for request types
        for (var i = 0; i < data.length; i++) {
          result[data[i].id] = data[i].name;
          kony.apps.coe.ess.Approvals.spa.laterRequestsCount[data[i].name] = 0; //To count number of requests under each category
        }
      } else if (type == "status") { //JSON processing for status
        for (var i = 0; i < data.length; i++) {
          result[data[i].Id] = data[i].Status_Name;
        }
      }
      return result;
    } catch (error) {
      kony.print("---- error in processIntoSingleJSON: " + error);
    }
  },

  //Attributes are processed in {label:value} format in a JSON
  processAttributesJSON: function(request_attribute, type) {
    var attributejson = {};
    try {
      kony.print("---- processAttributesJSON start ----");
      if (type == "SUMMARY") { //Incase of SUMMARY attributes
        for (var i = 0; i < request_attribute.length; i++) {
          kony.print("---- attributes: " + JSON.stringify(request_attribute[i].attribute_def));
          kony.print("---- attributes[0]: " + JSON.stringify(request_attribute[i].attribute_def[0].attribute_section_id));
          if (request_attribute[i].attribute_def[0].attribute_section_id == 1) {
            attributejson[request_attribute[i].attribute_def[0].label] = request_attribute[i].value;
          }
        }
      } //End of SUMMARY attributes collection
      else if (type == "EXTENDED") { //Incase of EXTENDED attributes
        for (var i = 0; i < request_attribute.length; i++) {
          if (request_attribute[i].attribute_def[0].attribute_section_id == 2) {
            attributejson.request_attribute[i].attribute_def[0].label = request_attribute[i];
          }
        }
      } //End of EXTENDED attributes collection
      kony.print("---- processAttributesJSON end ----");
      return attributejson;
    } catch (error) {
      kony.print("---- processAttributesJSON: " + error);
    }
  }
};
kony.apps.coe.ess.Approvals.spa.beautifyEachLaterRequest = function(processedRequests) {
  try {
    kony.print("---- beautifyEachLaterRequest start ----");
    var processed_data = [];
    if (processedRequests == null || processedRequests == undefined || processedRequests.length < 0 || processedRequests == '') {
      return [];
    }
    if (processedRequests) {
      for (var index in processedRequests) {

        var processed_request_type = {
          "COUNT": kony.apps.coe.ess.Approvals.spa.laterRequestsCount[processedRequests[index].request_type],
          "TYPE": processedRequests[index].request_type,
          //"ID": processedRequests[index].ID,

        };

        switch (processed_request_type.TYPE) {
          case 'LEAVE':
            processed_request_type.Image = "leave_list.png";
            processed_request_type.NAME = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.Leave");//"LEAVE";
            break;
          case 'TIMESHEET':
            processed_request_type.Image = "time_list.png";
            processed_request_type.NAME = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.Timesheet");//"TIMESHEET";
            break;
          case 'EXPENSES':
            processed_request_type.Image = "expense_list.png";
            processed_request_type.NAME = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.Expense");//"EXPENSE";
            break;
          case 'PURCHASEORDER':
            processed_request_type.Image = "po_list.png";
            processed_request_type.NAME = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.PurchaseOrder");//PURCHASE ORDER";
            break;
          case 'WORKORDER':
            processed_request_type.Image = "wo_list.png";
            processed_request_type.NAME = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.WorkOrder");//"WORK ORDER";
            break;
          case 'PURCHASEREQUISITION':
            processed_request_type.Image = "purchase_requisition.png";
            processed_request_type.NAME = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.PurchaseRequisition");//"PURCHASE REQUISITION";
            break;
          default:
            continue;
        }

        processed_data.push(processed_request_type);

      }
      var result = {};
      for (var index in processed_data) {
        result[processed_data[index].TYPE] = processed_data[index];
      }
      processed_data = [];
      for (var index in result) {
        processed_data.push(result[index]);
      }
    }
    kony.print("---- beautifyEachLaterRequest start ----");
    kony.print("---- processedLaterRequests: " + JSON.stringify(processed_data));
    return processed_data;
  } catch (error) {
    kony.print("---- beautifyEachLaterRequest error: " + error);
  }
};
kony.apps.coe.ess.Approvals.spa.beautifyEachRequest = function(processedRequest) {
  try {
    kony.print("---- beautifyEachRequest start ----");
    var btnNoticedvis = false,visibility= true;
    if(processedRequest.TypeID == "LEAVEINFO"){
      processedRequest.request_type = "LEAVE";
      visibility = false;
      btnNoticedvis = true;
    }
    processedRequest.btnLaterSegment =
      {"isVisible": visibility,
       "skin" : "sknBtnMob0OBor1DB6C928px",
       "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.later")
      };
    processedRequest.btnReject =
      {"isVisible": visibility,
       "skin" : "sknBtnMob0OBorFEADA81pxFSFEADA8",
       "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Reject"
                                           )};
    processedRequest.btnApprove =
      {"isVisible": visibility,
       "skin" : "sknBtnMob3EBEA3100OFSFFFFFF100O28px",
       "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Approve")
      };
    processedRequest.btnNoticed =
      {"isVisible": btnNoticedvis,
       "skin" : "sknBtnMob3EBEA3100OFSFFFFFF100O28px",
       "text": kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.Noticed")
      };

    processedRequest.lblBorder1 = {
      "text": "dummy"
    };
    processedRequest.lblBorder2 = {
      "text": "dummy"
    };

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
            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + " " + endDate.retriveMonthName().substring(0, 3);
            processedRequest.AdditionalData = {
              "text": " " + Math.round(Number(diff) + 1).toString() + " Day(s) ",
              "isVisible": true
            };
          } else {
            //single Day leave
            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);
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
        processedRequest.flxBorder1 = {
          "skin": "sknFlxMob7986cb100O"
        };
        processedRequest.flxBorder2 = {
          "skin": "sknFlxMob7986cb100O"
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
        processedRequest.flxBorder1 = {
          "skin": "sknFlxMob039be5100O"
        };
        processedRequest.flxBorder2 = {
          "skin": "sknFlxMob039be5100O"
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
        processedRequest.flxBorder1 = {
          "skin": "sknFlxMob1db6c9100O"
        };
        processedRequest.flxBorder2 = {
          "skin": "sknFlxMob1db6c9100O"
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
        processedRequest.flxBorder1 = {
          "skin": "sknFlxMob1db6c9100O"
        };
        processedRequest.flxBorder2 = {
          "skin": "sknFlxMob1db6c9100O"
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
        processedRequest.flxBorder1 = {
          "skin": "sknFlxMob7986cb100O"
        };
        processedRequest.flxBorder2 = {
          "skin": "sknFlxMob7986cb100O"
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
        processedRequest.flxBorder1 = {
          "skin": "sknFlxMob4186D1100O"
        };
        processedRequest.flxBorder2 = {
          "skin": "sknFlxMob4186D1100O"
        };

        break;
      default:
        kony.print("The request doesn't  match with any case setting the defalut segement and mappings ");
        // request type specific skin and images
        return null;
    }

    kony.print("---- beautifyEachRequest end ----");
    return processedRequest;
  } catch (error) {
    kony.print("---- beautifyEachRequest error: " + error);
  }
};

//Fuction used to beaytify the Response for Desktop web
kony.apps.coe.ess.Approvals.spa.beautifyEachRequest1 = function(processedRequest) {
  try {
    kony.print("---- beautifyEachRequest start ----");
    processedRequest.btnLaterSegment = {"text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.later")};//"Later"

    processedRequest.btnReject = {"text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.frmApprovalRequestDetail.btnReject")};//"Reject";

    processedRequest.btnSkip = "Skip";

    processedRequest.btnApprove = {"text" : kony.i18n.getLocalizedString("i18n.ess.MyApprovals.frmApprovalRequestDetail.btnApprove")};//"Approve";


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
            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + " " + endDate.retriveMonthName().substring(0, 3);
            processedRequest.AdditionalData = " " + Math.round(Number(diff) + 1).toString() + " Day(s) ";

          } else {
            //single Day leave
            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);
            processedRequest.AdditionalData = "1 Day";
          }

        }
        // request type specific skin and images and info images and border color changes
        requestTypeSkin = "sknlblMob7986CB100o";
        processedRequest.typeimage = {
          "src": "leaverequest.png",
        }
        processedRequest.typeskin = {
          "skin" : "sknFlx7986cbDW",
        }
        processedRequest.requestTypeImage = "leave.png";
        processedRequest.requestTypeInfoImage = "leave_info.png";
        processedRequest.requestTypeText = "Leave Request";
        //   processedRequest.Comments = "Applied Casual Leave on 19th April ";

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
            processedRequest.AdditionalData = " " + Math.round(Number(diff) + 1).toString() + " Day(s) ";

          } else {
            //single Day Timesheet
            processedRequest.RequestInfo = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3);
            processedRequest.AdditionalData = "1 Day";
          }

        }

        // request type specific skin and images
        requestTypeSkin = "sknLblMob039BE5100OFS";
        processedRequest.typeskin = {
          "skin" : "sknFlx4a90e2DW",
        }
        processedRequest.typeimage = {
          "src": "timerequests.png",
        }
        processedRequest.requestTypeImage = "timerequests.png";
        processedRequest.requestTypeInfoImage = "time_info.png";
        processedRequest.requestTypeText = "Time Request";
        //   processedRequest.Comments = "I have Applied Timesheet Request";
        break;
      case "EXPENSES":
        kony.print("The request is of type EXPENSES");
        if (processedRequest.attributejson.CURRENCY && processedRequest.attributejson.CLAIMED_AMT)
          processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + " " + currencyFormartting(processedRequest.attributejson.CLAIMED_AMT);


        // request type specific skin and images
        requestTypeSkin = "sknLblMob1DB6C9100OFS";

        processedRequest.typeimage = {
          "src": "expense.png",
        }
        processedRequest.typeskin = {
          "skin" : "sknFlxMob1db6c9100O",
        }
        processedRequest.requestTypeImage = "expense.png";
        processedRequest.requestTypeInfoImage = "expense_info.png";
        processedRequest.requestTypeText = "Expense Request";
        //   processedRequest.Comments = "I have Applied an Travel expense";
        break;
      case "PURCHASEORDER":
        kony.print("The request is of type PURCHORDER");
        if (processedRequest.attributejson.CURRENCY && processedRequest.attributejson.PurchaseOrderAmount) {
          processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + " " + currencyFormartting(processedRequest.attributejson.PurchaseOrderAmount);
        }



        // request type specific skin and images
        requestTypeSkin = "sknLblMob058594100OFS";



        processedRequest.requestTypeImage = "purchase_order_in_now.png";
        processedRequest.requestTypeInfoImage = "purchase_order_info_in_now.png";
        processedRequest.requestTypeText = "PurchaseOrder Request";
        break;
      case "WORKORDER":
        kony.print("The request is of type WORKORDER");
        if (processedRequest.attributejson.BusinessUnit) {
          processedRequest.RequestInfo = processedRequest.attributejson.BusinessUnit;
        }
        // request type specific skin and images
        requestTypeSkin = "sknLblMob0284B5100OFS";

        processedRequest.requestTypeImage = "work_order_in_now.png";
        processedRequest.requestTypeInfoImage = "work_order_info_in_now.png";
        processedRequest.requestTypeText = "WorkOrder Request";
        break;
      case 'PURCHASEREQUISITION':
        kony.print("--The request is of type Purchase Requisition--");
        if (processedRequest.attributejson.CURRENCY && processedRequest.attributejson.AMOUNT) {
          processedRequest.RequestInfo = processedRequest.attributejson.CURRENCY + " " + currencyFormartting(processedRequest.attributejson.AMOUNT);
        }

        // request type specific skin and images
        requestTypeSkin = "sknLblMob4186D1100OFS";
        processedRequest.requestTypeImage = "pr_now.png";
        processedRequest.requestTypeInfoImage = "pr_info_in_now.png";


        break;
      default:
        kony.print("The request doesn't  match with any case setting the defalut segement and mappings ");
        // request type specific skin and images
        return null;
    }

    kony.print("---- beautifyEachRequest end ----");
    return processedRequest;
  } catch (error) {
    kony.print("---- beautifyEachRequest error: " + error);
  }
};

//Function is used to process all the data
kony.apps.coe.ess.Approvals.spa.ProcessEachSPARequest = function(request) {
  var processedRequest = {};
  try {
    kony.print("---- processEachSPARequest start ----");
    processedRequest.StatusId = request.request_approver[request.request_approver.length - 1].status_id; //The latest state on which the approver(manager/employeer) kept it
    processedRequest.RequestInfo = "";
    processedRequest.AdditionalData = "";
    processedRequest.requestTypeImage = "";
    processedRequest.requestTypeInfoImage = "";
    processedRequest.requestTypeBorderSkin = "";
    processedRequest.ID = request.id;
    processedRequest.isLater = request.IsLater;
    processedRequest.Audit = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Pending");
    processedRequest.Auditimage = "edit.png";


    var extendedjson = {}

    for (var i = 0; i < request.attribute.length; i++) {
      var def = request.attribute[i];
      if (def.attribute_def[0].attribute_section_id == 2) {
        extendedjson[def.attribute_def[0].label] = def.value;
      }
    }

    processedRequest.extended = extendedjson;

    processedRequest.dueDateObject = new Date().modifyByYYYYMMDDHHMMSS(request.Due_Date);
    processedRequest.dueDateString = processedRequest.dueDateObject.toDateString();
    processedRequest.dueDate = processedRequest.dueDateObject.toDDmmmYYYY();//toDDmmmHHMMtt
    processedRequest.RequestDateObject = new Date().modifyByYYYYMMDDHHMMSS(request.request_date);
    processedRequest.RequestDateString = processedRequest.RequestDateObject.toDateString();
    processedRequest.RequestDate = processedRequest.RequestDateObject.toDDmmmHHMMtt();
    processedRequest.attributejson = kony.apps.coe.ess.Approvals.spa.processAttributesJSON(request.attribute, "SUMMARY");
    processedRequest.CreatedByEmployeeid = request.employee_id;
    //         processedRequest.FlxTimerUi = {
    //             isVisible: false
    //         };
    processedRequest.attachments =  "pdf_icon.png";


    if (request.request_category) {
      processedRequest.category = request.request_category[0].name;
    } else {
      processedRequest.category = "";
    }
    if (request.request_approver) {
      processedRequest.lastDate = request.request_approver[0].lastmodifiedts;
    } else {
      processedRequest.category = "";
    }
    if (request.request_note) {
      processedRequest.Comments = request.request_note[0].comment;
    } else {
      processedRequest.Comments = "";
    }
    if (request.request_approver) {
      processedRequest.Delegated = request.request_approver[0].delegator_id;
      if(request.request_approver[0].delegator_id === "" || request.request_approver[0].delegator_id === null || request.request_approver[0].delegator_id === undefined){
        processedRequest.DelegateText = "";
      }else{
        processedRequest.DelegateText = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.tempSegApprovalRequest.lblDeligated");
      }

    } else {
      processedRequest.Delegated = "";
      processedRequest.DelegateText = "";
    }

    if (request.approval_attachment && request.approval_attachment[0].type_id == 2) {
      processedRequest.media_name = request.approval_attachment[0].media_id;
      // processedRequest.media_URL = request.approval_attachment[0].ApprovalMedia[0].url;
    }else {
      processedRequest.media_name = "";
    }
    processedRequest.UserName = "";
    processedRequest.CreatedUserShortName = "";
    processedRequest.employeeImg = "photo.png";


    if (processedRequest.CreatedByEmployeeid && processedRequest.CreatedByEmployeeid != "" && processedRequest.CreatedByEmployeeid.toLowerCase() != null) {
      //employee id exsists

      if (processedRequest.attributejson.FirstName && processedRequest.attributejson.FirstName.toLowerCase() != null) {
        processedRequest.UserName = processedRequest.attributejson.FirstName;
        processedRequest.CreatedUserShortName = processedRequest.attributejson.FirstName.charAt(0);
      }
      if (processedRequest.attributejson.LastName && processedRequest.attributejson.LastName.toLowerCase() != null) {
        processedRequest.UserName = processedRequest.UserName + " " + processedRequest.attributejson.LastName;
        if (processedRequest.attributejson.LastName.charAt(0))
          processedRequest.CreatedUserShortName = processedRequest.CreatedUserShortName + processedRequest.attributejson.LastName.charAt(0);
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
    }

    if (processedRequest.CreatedUserShortName != undefined) {
      // convert the CreatedUserShortName to ALL CAPS. It looks good.
      processedRequest.CreatedUserShortName = processedRequest.CreatedUserShortName.toUpperCase();
    }
    if (kony.apps.coe.ess.globalVariables.isSPA === true) {
      processedRequest.UserName = {
        "text": processedRequest.UserName
      };
    }
    processedRequest.DateDue = "Due Date";
    processedRequest.Separator = "Label";


    var remaningDueDays = (processedRequest.dueDateObject - new Date()) / (1000 * 3600 * 24);
    if (remaningDueDays > 1 || remaningDueDays < 0) {
      //show due date in DD mmm YYYY formatif (kony.apps.coe.ess.globalVariables.isSPA === true){
      if (kony.apps.coe.ess.globalVariables.isSPA === true) {
        processedRequest.dueDate = {
          "isVisible": true
        };
      }
      processedRequest.dueDate.text = processedRequest.dueDateObject.toDDmmmYYYY();
      //       processedRequest.FlxTimerUi.isVisible = false;

    } else {
      //show the timer ui in segment
      processedRequest.remaingHours = Math.floor(remaningDueDays * 24).toFixed();
      if (kony.apps.coe.ess.globalVariables.isSPA === true) {
        processedRequest.dueDate = {
          "isVisible": false
        };
      }
      //  processedRequest.FlxTimerUi.isVisible = true;
    }




    //To assign attributes fetched from different tables
    //Since the callbacks are async, on success callback of first table i.e request_type, function to assign attributes of second table i.e status starts
    kony.apps.coe.ess.Approvals.spa.getRequestTypes(processedRequest, request.type_id, processedRequest.StatusId);

    kony.print("---- processedRequest: " + JSON.stringify(processedRequest));
  } catch (error) {
    kony.print("---- ProcessEachSPARequest error: " + error);
  }
};

//Root function for processing of SPA records
kony.apps.coe.ess.Approvals.spa.ProcessSpaRecords = function(data) {
  kony.print("---- ProcessSpaRecords start ----");
  kony.apps.coe.ess.Approvals.spa.totalRequests = [];
  kony.apps.coe.ess.Approvals.spa.totalLaterRequests = [];
  kony.apps.coe.ess.Approvals.spa.laterRequestsCount = {};
  kony.apps.coe.ess.Approvals.spa.totalNumberOfRequests = data.length;
  kony.apps.coe.ess.Approvals.spa.counter = 0;

  try {
    //Function call to fetch request types and the response is stored in variable 'requestTypes'
    kony.print("---- data: " + JSON.stringify(data));
    for (var i = 0; i < data.length; i++) {
      kony.apps.coe.ess.Approvals.spa.ProcessEachSPARequest(data[i]);
    }


  } catch (e) {
    kony.print("---- ProcessSpaRecords error: " + JSON.stringify(e));
  }
  kony.print("---- ProcessSpaRecords end ----");
};
