/*** @Author Sumeet.bartha@kony.com
 * @category UI data Binding
 * @desc  ExpenseReportDetail class
 * @ © 2016 kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail || {};


kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.preShow = function(){
	frmApprovalRequestDetail.SegChat.rowTemplate.flxcomment.highlightedSkin = "sknflxMob2ebaee";
  	frmApprovalRequestDetail.SegChat.rowTemplate.flxcomment.highlightOnParentFocus = true;
};

kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessData = function(requestType, ContextData) {
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
            };
        ApprovalrequestDetail=ContextData;
            //status Ui changes
        ApprovalrequestDetail.statusText = {
            "text": ContextData.StatusName
        };
        if (ContextData.StatusId == 0) {
            //approved approavl request
            ApprovalrequestDetail.statusFlx = {
                "skin": "sknflx3fbd00"
            }
        } else if (ContextData.StatusId == 1) {
            //rejected approval request
            ApprovalrequestDetail.statusFlx = {
                "skin": "sknflxf51d00"
            };
        } else {
            //pending Approval request
            ApprovalrequestDetail.statusFlx = {
                "skin": "sknflxfecc66"
            };
        }
        ApprovalrequestDetail.UserName = {
            "text": ContextData.UserName.text
        };
        ApprovalrequestDetail.TitleDetail = {
            "text": ContextData.category.text
        };
        ApprovalrequestDetail.RequestInfo = ContextData.RequestInfo;
        ApprovalrequestDetail.AdditonalInfo = ContextData.AdditionalData;
        var requestedDate = new Date(ContextData.RequestDateString);
        ApprovalrequestDetail.RequestedDate = {
            "text": requestedDate.toDDmmmYY()
        };
        var dueDateObject = new Date().modifyByYYYYMMDDHHMMSS(ContextData.dueDateString);
		ApprovalrequestDetail.DueOnDate = {
			"text": dueDateObject.toDDmmmYYYY()
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
                } else {
                    ApprovalrequestDetail.Title = {
                        "text": kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.Expense")
                    };
                }
                if (ContextData.attributejson && ContextData.attributejson.APPROVED_AMT && ContextData.attributejson.CURRENCY) {
                    ApprovalrequestDetail.RequesedInfoDetail = {
                        "text": ContextData.attributejson.CURRENCY + parseFloat(ContextData.attributejson.APPROVED_AMT).toFixed(2)
                    };
                } else {
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
        	    }else{
                  ApprovalrequestDetail.Title = {
	                    "text": ContextData.attributejson.RequestID
    	            };
                }
          		if (isEmpty(ContextData.attributejson.WorkOrderPriority) ) {
               		ApprovalrequestDetail.RequesedInfoDetail = {
               	     "text": ""
               	   };
           		}else{
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
            	if(isEmpty(ContextData.attributejson.RequestID)){
             		 ApprovalrequestDetail.Title = {
               		     "text": ""
                	};
            	}else{
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
                } else {
                    ApprovalrequestDetail.RequesedInfoDetail = {
                        "text": ""
                    };

                }
        }
        return ApprovalrequestDetail;
    } catch (e) {
        popupErrorAlert.lblMessage.text="Error in the Processing the data for the approval request" + e.message
        popupErrorAlert.show();
    }

};

/**
 * @function
 *
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.bindApprovalRequestDetails = function(ProcessedRequestDetail) {
  	kony.print("ProcessedRequestDetail"+JSON.stringify(ProcessedRequestDetail)+JSON.stringify(ProcessedRequestDetail.statusText));
  	var statusText = ProcessedRequestDetail.statusText["text"];
  	if(statusText == "Pending"){
      ProcessedRequestDetail.statusText = {"text":kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Pending")};
    }else if(statusText == "Approved"){
      ProcessedRequestDetail.statusText = {"text":kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Approved")};
    }else if(statusText == "Rejected"){
      ProcessedRequestDetail.statusText = {"text":kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Rejected")};
    }
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblUserName, ProcessedRequestDetail.UserName);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.imgTitleicon, ProcessedRequestDetail.Titleicon);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblTitle, ProcessedRequestDetail.Title);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblTitleDetail, ProcessedRequestDetail.TitleDetail);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblRequestInfo, ProcessedRequestDetail.RequestInfo);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblRequesedInfoDetail, ProcessedRequestDetail.RequesedInfoDetail);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblAdditonalInfo, ProcessedRequestDetail.AdditonalInfo);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblRequestedDate, ProcessedRequestDetail.RequestedDate);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblDueOnDate, ProcessedRequestDetail.DueOnDate);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.flxStatusicon, ProcessedRequestDetail.statusFlx);
    kony.apps.coe.ess.WidgetPropertyBinding(frmApprovalRequestDetail.lblStatus, ProcessedRequestDetail.statusText);
};

kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.changeSkins = function(request_type) {
    try {
        switch (request_type) {
            case "LEAVE":
                frmApprovalRequestDetail.skin = "sknFrmMob7986CB100O";
                frmApprovalRequestDetail.flxHeader.skin = "sknFlx7986CBff";
                frmApprovalRequestDetail.flxbgOval.skin = "sknflxOvalLeave";
                frmApprovalRequestDetail.lblRequestedOn.skin = "sknlbl7986CBffpx28";
                frmApprovalRequestDetail.lblTitle.skin = "sknlbl7986CBffpx34";
                frmApprovalRequestDetail.lblRequestInfo.skin = "sknlbl7986CBffpx34";
                frmApprovalRequestDetail.lblDueOn.skin = "sknlbl7986CBffpx28";
                frmApprovalRequestDetail.lblFullDesc.skin = "sknlbl7986CBffpx28";
                frmApprovalRequestDetail.lblHeader.text = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.lblHeader.LeaveHeader");
            	frmApprovalRequestDetail.lblRequestedOn.isVisible = false;
                break;
            case "TIMESHEET":
                frmApprovalRequestDetail.skin = "sknfrmBA68C8";
                frmApprovalRequestDetail.flxHeader.skin = "sknflxBA68C8po100";
                frmApprovalRequestDetail.flxbgOval.skin = "sknflxOvalTime";
                frmApprovalRequestDetail.lblRequestedOn.skin = "sknlblba68c8ffpx28";
                frmApprovalRequestDetail.lblTitle.skin = "sknlblba68c8ffpx34";
                frmApprovalRequestDetail.lblRequestInfo.skin = "sknlblba68c8ffpx34";
                frmApprovalRequestDetail.lblDueOn.skin = "sknlblba68c8ffpx28";
                frmApprovalRequestDetail.lblFullDesc.skin = "sknlblba68c8ffpx28";
                frmApprovalRequestDetail.lblHeader.text = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.lblHeader.TimeHeader");
            	frmApprovalRequestDetail.lblRequestedOn.isVisible = false;
                break;
            case "EXPENSES":
                frmApprovalRequestDetail.skin = "skn47BDCCffExpenseDetail";
                frmApprovalRequestDetail.flxHeader.skin = "skn1DB6C9ff";
                frmApprovalRequestDetail.flxbgOval.skin = "sknflxOvalExpense";
                frmApprovalRequestDetail.lblRequestedOn.skin = "sknlblMob1DB6C9ffpx28";
                frmApprovalRequestDetail.lblTitle.skin = "sknlblMob1DB6C9ffpx34";
                frmApprovalRequestDetail.lblRequestInfo.skin = "sknlblMob1DB6C9ffpx34";
                frmApprovalRequestDetail.lblDueOn.skin = "sknlblMob1DB6C9ffpx28";
                frmApprovalRequestDetail.lblFullDesc.skin = "sknlblMob1DB6C9ffpx28";
                frmApprovalRequestDetail.lblHeader.text = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.lblHeader.ExpenseHeader");
            	frmApprovalRequestDetail.lblRequestedOn.isVisible = true;
                break;
            case "PURCHASEORDER":
                frmApprovalRequestDetail.skin = "sknFrmMob058594op100";
                frmApprovalRequestDetail.flxHeader.skin = "sknFlxMob058594ff";
                frmApprovalRequestDetail.flxbgOval.skin = "sknflxOvalPO";
                frmApprovalRequestDetail.lblRequestedOn.skin = "sknlblMob058594ffpx28";
                frmApprovalRequestDetail.lblTitle.skin = "sknlblMob058594ffpx34";
                frmApprovalRequestDetail.lblRequestInfo.skin = "sknlblMob058594ffpx34";
                frmApprovalRequestDetail.lblDueOn.skin = "sknlblMob058594ffpx28";
                frmApprovalRequestDetail.lblFullDesc.skin = "sknlblMob058594ffpx28";
                frmApprovalRequestDetail.lblHeader.text = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.lblHeader.PurchaseOrderHeader");
            	frmApprovalRequestDetail.lblRequestedOn.isVisible = false;
                break;
            case "WORKORDER":
                frmApprovalRequestDetail.skin = "sknFrmMob0284B5OP100";
                frmApprovalRequestDetail.flxHeader.skin = "sknFlxMob0284B5ff";
                frmApprovalRequestDetail.flxbgOval.skin = "sknflxOvalWO";
                frmApprovalRequestDetail.lblRequestedOn.skin = "sknlblMob0284B5ffpx28";
                frmApprovalRequestDetail.lblTitle.skin = "sknlblMob0284B5ffpx34";
                frmApprovalRequestDetail.lblRequestInfo.skin = "sknlblMob0284B5ffpx34";
                frmApprovalRequestDetail.lblDueOn.skin = "sknlblMob0284B5ffpx28";
                frmApprovalRequestDetail.lblFullDesc.skin = "sknlblMob0284B5ffpx28";
                frmApprovalRequestDetail.lblHeader.text = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.lblHeader.WorkOrderHeader");
            	frmApprovalRequestDetail.lblRequestedOn.isVisible = false;
                break;
            case 'PURCHASEREQUISITION':
          		 frmApprovalRequestDetail.skin = "sknFrmMob4186D1100O";
                frmApprovalRequestDetail.flxHeader.skin = "sknFlx4186D1ff";
                frmApprovalRequestDetail.flxbgOval.skin = "sknflxOvalPR";
                frmApprovalRequestDetail.lblRequestedOn.skin = "sknlblMob4186D1ffpx28";
                frmApprovalRequestDetail.lblTitle.skin = "sknlblMob4186D1ffpx34";
                frmApprovalRequestDetail.lblRequestInfo.skin = "sknlblMob1DB6C9ffpx34";
                frmApprovalRequestDetail.lblDueOn.skin = "sknlblMob4186D1ffpx28";
                frmApprovalRequestDetail.lblFullDesc.skin = "sknlbl4186D1ffpx28";
                frmApprovalRequestDetail.lblHeader.text = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.lblHeader.PurchaseRequistionHeader");
            	frmApprovalRequestDetail.lblRequestedOn.isVisible = false;
                break;
            default:
                frmApprovalRequestDetail.skin = "sknFrmMob0284B5OP100";
                frmApprovalRequestDetail.flxHeader.skin = "sknFlxMob0284B5ff";
                frmApprovalRequestDetail.flxbgOval.skin = "sknflxOvalWO";
                frmApprovalRequestDetail.lblHeader.text = request_type + " Details"
                frmApprovalRequestDetail.lblRequestedOn.isVisible = false;
        }

    } catch (e) {
        throw e;
        kony.print("Error in the Processing the data for the approval request" + e.message);
    }
}

kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessCommentsData = function(ApprovalRequestComments) {
    //processing for the comments in the Approval Request
    try {
        var processedApprovalComments = [];
        for (var index in ApprovalRequestComments) {
            var ProcessedComment = {};
          	ProcessedComment = ApprovalRequestComments[index];
            var createdTime = new Date().modifyByYYYYMMDDHHMMSS(ApprovalRequestComments[index].createdts);
            ProcessedComment.Appliedon = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.AppliedOn.text") + " " + createdTime.toDDmmmHHMMtt();
            ProcessedComment.Comment = ApprovalRequestComments[index].Comment;
            if (ApprovalRequestComments[index].FirstName) {
                ProcessedComment.UserName = ApprovalRequestComments[index].FirstName
                ProcessedComment.ShortName = ApprovalRequestComments[index].FirstName.substring(0, 1);
            }
            if (ApprovalRequestComments[index].LastName) {
                ProcessedComment.UserName += " " + ApprovalRequestComments[index].LastName
                ProcessedComment.ShortName += ApprovalRequestComments[index].LastName.substring(0, 1);
            }
            if (kony.apps.coe.ess.globalVariables.EmployeeID == ApprovalRequestComments[index].Employee_id) {
                ProcessedComment.template = flxSelfComments;
            } else {
                ProcessedComment.template = flxRequesterComments;
            }
            processedApprovalComments.push(ProcessedComment);
        }

        return processedApprovalComments;
    } catch (e) {
        popupErrorAlert.lblMessage.text=e.message;
        popupErrorAlert.show();
    }
};
/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	null
 * @desc	 : This is used to set the images of the employee in the comments segment
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.startLazyloadingComments=function(){
  kony.print("-- Start kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.startLazyloadingComments --");
	//lazy loading for the segment
	var segmentConfiguration = {
		"MediaKeyAttribute": "Media_Id",
		"ImageWidgetName": "imgUser",
		"hideWidgetNames": []
	};
	kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_SEGMENT, frmApprovalRequestDetail.SegChat, "Employee", "mediaEmployee", "", segmentConfiguration);
	kony.print("-- End kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.startLazyloadingComments --");
};

/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	previous form Id
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID=function() {
	if(kony.application.getPreviousForm().id == 'frmPdfReader' || kony.application.getPreviousForm().id == 'frmFullDetails' || kony.application.getPreviousForm().id == 'frmAuditTrail') {
		return frmApprovalHome.id;
	}
	return kony.application.getPreviousForm().id;
}

/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	null
 * @desc	 :	Approve the approval request and create comment if the user has given any comments
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickApprove=function() {
  	kony.print("--Start kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickApprove--");
	kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.createComment(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID,frmApprovalRequestDetail.txtareaComments.text);
  	kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.approveRequest(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID);
  	var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID());
  	frmController.loadDataAndShowForm();
  	kony.print("--End kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickApprove--");
};
/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	null
 * @desc	 :	Approve the approval request and create comment if the user has given any comments
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickReject=function() {
  	kony.print("--Start kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickReject--");
  	kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.createComment(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID,frmApprovalRequestDetail.txtareaComments.text);
  	kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.rejectRequest(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID);
  	var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID());
  	frmController.loadDataAndShowForm();
  	kony.print("--End kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickReject--");
};
/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	null
 * @desc	 :	Mark as read the approval request and create comment if the user has given any comments
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickNotice=function() {
  	kony.print("--Start kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickNotice--");
	kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.createComment(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID,frmApprovalRequestDetail.txtareaComments.text);
  	kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.noticeRequest(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID);
  	var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID());
  	frmController.loadDataAndShowForm();
  	kony.print("--End kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickNotice--");
};

/**@function
 * @member	 :  frmApprovalRequestDetail
 * @returns	 :	None
 * @desc	 :	Fetched binary data for PDF.
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.openPdf = function(mediaId,isPDF) {
    if (isEmpty(mediaId)) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
    } else {
        try {
            kony.application.showLoadingScreen(" ", kony.i18n.getLocalizedString("i18n.ess.myApprovals.loadingPdfMsg"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.apps.coe.ess.MVVM.GetbinaryContent("MYAPPROVALS", "ApprovalMedia", mediaId,
                /**
                 * @function
                 *
                 */
                function(mediaId, response) {
                    kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.PdfFetchingSucessCallback(mediaId,isPDF, response);
                }.bind(this, mediaId),
                function(e) {
                    handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
                    kony.print("Error while fetching pdf " + e.message);
                });

        } catch (e) {
            handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
            kony.print("Error while fetching pdf " + e.message);
        }
    }
};

/**@function
 * @class	 :  frmApprovalRequestDetail
 * @returns	 :	None
 * @desc	 :	Callbacck function : open the pdf if present.
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.PdfFetchingSucessCallback = function(selectedData,isPDF, response) {
    try {
        kony.application.dismissLoadingScreen();
        kony.apps.coe.ess.globalVariables.prevForm = kony.application.getPreviousForm();
        var returnedValue = kony.convertToRawBytes(response);
        var pdfObj = new kony.apps.ess.myApprovals.pdfOperation();
      	var filename;
      	if(isPDF) {
          filename = selectedData + ".pdf";
          kony.apps.ess.myApprovals.pdfOperation.type = "application/pdf";
        }
      	else {
          //#ifdef iphone
          kony.apps.ess.myApprovals.pdfOperation.type = "image/png";
          //kony.apps.ess.myApprovals.pdfOperation.prototype.postShowFrmPdfReader("image/png");
          //#else
          	//#ifdef android
          		filename = selectedData + ".png";
          	//#else
          		filename = selectedData + ".jpg";
          	//#endif
          //#endif
        }
        var filePath = pdfObj.writeRawBytesToFile(returnedValue, filename);
        var fileStatus = pdfObj.getFileStatus(filePath);
        kony.application.dismissLoadingScreen();
        pdfObj.openPdf(1, filePath);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
};

/**
 * @function
 *
 */
kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.displayPDFSegment = function() {
  frmApprovalRequestDetail.btnAttachments.skin = "sknbtnDetails";
  frmApprovalRequestDetail.btnDetails.skin = "sknbtn084A52ffpx32";
  frmApprovalRequestDetail.flxScrollBottom.setVisibility(false);
  frmApprovalRequestDetail.flxattachmentDetails.setVisibility(true);
  frmApprovalRequestDetail.imgPdf.setVisibility(false);
  frmApprovalRequestDetail.flxStatusicon.setVisibility(false);
  frmApprovalRequestDetail.lblStatus.setVisibility(false);
};


kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.displayApprovalDetails = function() {
  frmApprovalRequestDetail.btnAttachments.skin = "sknbtn084A52ffpx32";
  frmApprovalRequestDetail.btnDetails.skin = "sknbtnDetails";
  frmApprovalRequestDetail.flxScrollBottom.setVisibility(true);
  frmApprovalRequestDetail.flxattachmentDetails.setVisibility(false);
  frmApprovalRequestDetail.imgPdf.setVisibility(true);
  frmApprovalRequestDetail.flxStatusicon.setVisibility(true);
  frmApprovalRequestDetail.lblStatus.setVisibility(true);
};
