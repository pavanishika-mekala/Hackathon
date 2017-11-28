//@ Author
// @ Shanmukha

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.FilterHistory=function()
{
  kony.print("-- start Request type--");
  kony.print("-- end Request type--");
};

var flexids=[
"flexOverview",
"flexAttachments",
"flexfullDetails",
"flxAudit"
];

var btndata=[
"btnOverview",
"btnAttachment",
"btnDetails",
"btnTrail"
];

//(new kony.apps.coe.ess.FilterHistory()).updateApproval(frmViewFilterHistory.segfilterlist,"0");Approve
///(new kony.apps.coe.ess.FilterHistory()).updateApproval(frmViewFilterHistory.segfilterlist,"1");

kony.apps.coe.ess.FilterHistory.prototype.updateApproval = function(widget_id, status) {
  var approval_id=frmTabReqTypeView.segMentListView.selectedItems[0].id;
  var data=frmTabReqTypeView.segMentListView.data;
  var appr_id=data[kony.apps.coe.ess.RequestType.prevSegindex].id;
    com.kony.MYAPPROVALS.approval_request.update(
        "WHERE id = \'" + appr_id + "\' ", {
            "status_id": "" + status
        },
        function(res) {
            kony.print("------------ in update success response :" + JSON.stringify(res));
            frmTabReqTypeView.segMentListView.removeAt(kony.apps.coe.ess.RequestType.prevSegindex);
            kony.apps.coe.ess.Sync.syncAsynchronously();frmTabReqTypeView.show();
          
        },
        function(err) {
            kony.print("------------ in update failure response :" + JSON.stringify(err));
            alert("update failed");
        });
};
kony.apps.coe.ess.FilterHistory.prototype.onClickSegmentList=function()
{

};
kony.apps.coe.ess.FilterHistory.EmpSegData=[];
kony.apps.coe.ess.FilterHistory.prototype.onClickCancel=function()
{
frmViewFilterHistory.flexCriterisData.setVisiblility(false);
};
kony.apps.coe.ess.FilterHistory.employeeData=[];
kony.apps.coe.ess.FilterHistory.employeeDataPopup1=[];
kony.apps.coe.ess.FilterHistory.prototype.loadEmployees=function()
{
 kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
  function successCallback(response)
  {
    kony.apps.coe.ess.FilterHistory.employeeData=response;
    kony.apps.coe.ess.FilterHistory.empById=[];
    for(i=0;i<response.length;i++)
      {
        kony.apps.coe.ess.FilterHistory.employeeData[i].Name=response[i].First_Name+" "+response[i].Last_Name;
        kony.apps.coe.ess.FilterHistory.empById[response[i].id]=kony.apps.coe.ess.FilterHistory.employeeData[i];
      }
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    kony.print("--responseEmployee:"+JSON.stringify(response));
   //(new kony.apps.coe.ess.FilterHistory()).loadImages(response);
  }
  function errorCallback(error)
  {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    kony.print("-- error in Employee info.. call");
  }
  var query = "SELECT First_Name,Middle_Name,Last_Name, Id as id ,  Media_Id as media_id  from employee where IsEmployee = '0' Order By First_Name , Middle_Name , Last_Name;";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallback, errorCallback);
  
};
kony.apps.coe.ess.FilterHistory.prototype.CreateComment = function () {
  var frmobj=kony.application.getCurrentForm();
	var commenttxt = frmobj.txtareaComments.text;
	if (commenttxt !== null && commenttxt != "") {
		var currDate = new Date();
      var dateformat = "";
          try{
          dateformat = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Full_Date.Format");
          }catch(i18nerror)
            {
              handleError(i18nerror);
              kony.print("---------------------------i18nFetchError");
            }
		var rowData = {
			"comment" : commenttxt,
			"createdts" : currDate.getDateInFormat(dateformat),
			"employee_id" : kony.apps.coe.ess.globalVariables.EmployeeID,
			"id" : "NOTE_" + kony.apps.coe.ess.globalVariables.EmployeeID + currDate.getDateInFormat(dateformat),
			"request_id" : kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_id,
			"request_type_id" : kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_type_id,
		};
		kony.apps.coe.ess.MVVM.createRecord("MYAPPROVALS", "request_note", rowData, function () { kony.apps.coe.ess.Sync.syncAsynchronously();}, function (e) {
          handleError(e);
		});
    }
}
var ctppl=0;
kony.apps.coe.ess.FilterHistory.prototype.DynamicPplLayout=function()
{
  var i,j,flexset0;
  var dataEmp=kony.apps.coe.ess.ApprovalHistoryTab.employeeDataPopup1;
  if(dataEmp.length<1)dataEmp=[{"Name":"abc","id":"001"},{"Name":"abc","id":"002"},{"Name":"abc","id":"123"}];
  frmTabApprovalHistory.flexDynamicPplsLayout.setVisibility(true);
  frmTabApprovalHistory.flxbottomPplSelection.setVisibility(true);
  for(i=0;i<dataEmp.length;i++)
   {
     if(i%4===0)
     {
       j=i%4;
       flexset0 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "33%",
        "id": "flexset"+j,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "left": "0%",
        "skin": "sknFlxFFFFFFWhiteBg",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flexset0.setDefaultUnit(kony.flex.DP);
    frmTabApprovalHistory.flexDynamicPplsLayout.add(flexset0);
     }
    var flexper0 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "flexper"+i,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "onClick": AS_FlexContainer_baf92afa32b6437da30ce06a17a3ac26,
        "skin": "slFbox",
        "top": "5%",
        "width": "25%",
        "zIndex": 1
    }, {}, {});
    flexper0.setDefaultUnit(kony.flex.DP);
    var perimg0 = new kony.ui.Image2({
        "centerX": "50%",
        "centerY": "30%",
        "height": "55%",
        "id": "perimg"+i,
        "isVisible": true,
        "left": "18dp",
        "skin": "slImage",
        "src": "profile.png",
        "top": "6dp",
        "width": "40%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var pernamelbl0 = new kony.ui.Label({
        "id": "pernamelbl"+i,
        "isVisible": true,
        "left": "0%",
        "skin": "sknTablbl90",
        "text": dataEmp[i].Name,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "60%",
        "width": "100%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var selimgs0 = new kony.ui.Image2({
        "height": "15%",
        "id": "selimgs"+i,
        "isVisible": true,
        "left": "58%",
        "skin": "slImage",
        "src": "deselecttick.png",
        "top": "10%",
        "width": "20%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    flexper0.add(perimg0, pernamelbl0, selimgs0);
    flexset0.add(flexper0);
   }
};



function addVerticalContainerPpl(top,index)
{
    var flexset0 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
      //#ifndef windows8
        "height": "33%",
      //#else
         "height":"27%",
      //#endif
        "id": "flexset"+index,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "left": "0dp",
        "skin": "sknFlxFFFFFFWhiteBg",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flexset0.setDefaultUnit(kony.flex.DP);
    kony.application.getCurrentForm().flexpplDynamic.add(flexset0);
}	
function addHorizontalcontainerPpl(index,empname)
{	
	    var flexper0 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "flexper"+index,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "onClick": AS_FlexContainer_41a2e2dcb53d47af97fcd9b34dd3f34a,
        "skin": "slFbox",
        "top": "0dp",
        "width": "25%",
        "zIndex": 1
    }, {}, {});
    flexper0.setDefaultUnit(kony.flex.DP);
    var perimg0 = new kony.ui.Image2({
        "height": "50%",
        "id": "perimg"+index,
        "isVisible": true,
        "left": "30%",
        "skin": "slImage",
        "src": "imagedrag.png",
        "top": "10%",
        "width": "40%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var pernamelbl0 = new kony.ui.Label({
        "id": "pernamelbl"+index,
        "isVisible": true,
        "left": "0%",
        "skin": "sknTabblck100",
        "text": empname,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "70%",
        "width":"100%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var selimg0 = new kony.ui.Image2({
 
        "height": "15%",
        "id": "selimg"+index,
        "isVisible": true,
        "left": "63%",
        "skin": "slImage",
        "src": "deselecttick.png",
        "top": "10%",
        "width": "20%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    flexper0.add(perimg0, pernamelbl0, selimg0);
    return flexper0;
	}
	
	
	
	function addSelectionFooter(top)
	{
	    var selFlex = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "bottom": "0%",
        "clipBounds": true,
        "height": "7%",
        "id": "selFlex",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        //#ifdef windows8
          "left": "16%",
          //#endif
          //#ifndef windows8
          "left":"0%",
          //#endif
        "skin": "slFbox",
        "top":"64%",
        "width": "45%",
        "zIndex": 1
    }, {}, {});
    selFlex.setDefaultUnit(kony.flex.DP);
    var cancelflex = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "cancelflex",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "onClick": AS_FlexContainer_4bd7c67da11f45b599c694769bbde844,
        "skin": "CopyslFbox09d10ead7c0b14d",
        "top": "0dp",
        "width": "50%",
        "zIndex": 1
    }, {}, {});
    cancelflex.setDefaultUnit(kony.flex.DP);
    var imgcancelp = new kony.ui.Image2({
        "centerX": "50%",
        "height": "35%",
        "id": "imgcancelp",
        "isVisible": true,
        "left": "30%",
        "skin": "slImage",
        "src": "cancel.png",
        "top": "30%",
        "width": "10%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    cancelflex.add(imgcancelp);
    var doneflex = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "doneflex",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "onClick": AS_FlexContainer_2d539a0d50d7486abfc4eb1b997a6f5f,
        "skin": "CopyslFbox09d10ead7c0b14d",
        "top": "0dp",
        "width": "50%",
        "zIndex": 1
    }, {}, {});
    doneflex.setDefaultUnit(kony.flex.DP);
    var ingdonesel = new kony.ui.Image2({
        "centerX": "50%",
        "height": "35%",
        "id": "ingdonesel",
        "isVisible": true,
        "left": "30%",
        "skin": "slImage",
        "src": "ok.png",
        "top": "30%",
        "width": "10%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    doneflex.add(ingdonesel);
    selFlex.add(cancelflex, doneflex);
    var frmobj=kony.application.getCurrentForm();
    frmobj.add(selFlex);
	}
kony.apps.coe.ess.FilterHistory.prototype.getApprovalsRequestPreshow = function(selectedApprovalID) {
         kony.print(":::Inside Comment:::");

			try {
				var scopeObj = this;
				if (isEmpty(selectedApprovalID)) {
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
					"       WHERE  [request_note].[approval_id] = '" + selectedApprovalID + "' ";

				//user attachments retrival query
				var UserAttachmentsQuery = "SELECT [approval_attachment].[id] AS [ID],  " +
					"       [approval_attachment].[type_id] AS [TYPE],  " +
					"       [approval_attachment].[media_id] AS [Media],  " +
					"       [approval_attachment].[approval_id] " +
					"FROM   [approval_attachment] " +
					"WHERE  [approval_attachment].[type_id] = '1' " +
					"       AND [approval_attachment].[approval_id] = '" + selectedApprovalID + "' ";

				//System Generated Attachemtns retrival query
				var SystemGeneratedAttachmentsQuery = "SELECT [approval_attachment].[id] AS [ID],  " +
					"       [approval_attachment].[type_id] AS [TYPE],  " +
					"       [approval_attachment].[media_id] AS [Media],  " +
					"       [approval_attachment].[approval_id] " +
					"FROM   [approval_attachment] " +
					"WHERE  [approval_attachment].[type_id] = '2' " +
					"       AND [approval_attachment].[approval_id] = '" + selectedApprovalID + "' ";

				// ApprovalRequestDetails retrival query
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
                    "		employee.Media_Id				   AS MediaID,	"+
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
					"RequestDetials": null,
				};

				var SystemGeneratedAttachmentsRetival = function (ApprovalRequestDetailData) {
					kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", SystemGeneratedAttachmentsQuery, function (ApprovalRequestDetailData, systemGeneratedAttachmentsresponse) {
						if (systemGeneratedAttachmentsresponse) {
							ApprovalRequestDetailData.systemGeneratedAttachments = systemGeneratedAttachmentsresponse;
						}
						//assigning to the global variables
						kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData = ApprovalRequestDetailData;
                       kony.print("kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData"+ApprovalRequestDetailData);
					(new kony.apps.coe.ess.FilterHistory()).processData(ApprovalRequestDetailData);	
                    //  this.processData(ApprovalRequestDetailData);
                       kony.print("::::::::::::SystemGeneratedAttachmentsQuery:::::::"+SystemGeneratedAttachmentsQuery);
					},
						function (err) {
						handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Attachments")));
					});
				};

				var userAttachmentsRetival = function (ApprovalRequestDetailData) {
					kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", UserAttachmentsQuery, function (ApprovalRequestDetailData, UserAttachmentsresponse) {
						if (UserAttachmentsresponse) {
							ApprovalRequestDetailData.userAttachments = UserAttachmentsresponse;
						}
						SystemGeneratedAttachmentsRetival(ApprovalRequestDetailData);
                    kony.print("::::::::UserAttachmentsQuery:::::"+UserAttachmentsQuery);
					},
						function (err) {
						handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Attachments")));
					});
				};
				var commentsRetival = function (ApprovalRequestDetailData) {                  
					kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", comments_qurey, function (ApprovalRequestDetailData, Comemntsresponse) {
						if (Comemntsresponse) {
							ApprovalRequestDetailData.comments = Comemntsresponse;
						}
						userAttachmentsRetival(ApprovalRequestDetailData);

					},
						function (err) {                   
						handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
					});
				};

				kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", Approval_request_query, function (ApprovalRequestDetailData, RequestDetailsResponse) {				
                  if (isEmpty(RequestDetailsResponse) || isEmpty(RequestDetailsResponse[0])) {
							//return the control and throw exception                          
                    kony.print("--No records.. found..");
						handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments")));
                       return;						
					} else {                      
                      var processedRequest = kony.apps.coe.ess.Approvals.getApprovalsRequestList.process_ApprovalRequest(RequestDetailsResponse[0]);                     
						ApprovalRequestDetailData.RequestDetials =processedRequest;									
					}
					commentsRetival(ApprovalRequestDetailData);

				},
					function (err) {
					handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
				});

			} 
            kony.print("YES:::::::::::::::::::::::");
            }catch (err) {				
				//kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
				//var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(err);
			}
             kony.print("Succe::::::::::::::::::");
		};
		/**
		 * This method processes fetched data. Developer can edit.
		 * Default implementation processes the provided data to required format for bind.
		 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 * @returns {Object} - processed data
		 */
kony.apps.coe.ess.FilterHistory.prototype.processData=function (ApprovalRequestDetailData) {
			try {
              kony.print("INPROCESSDATA::::::::::::::::");
				var scopeObj = this;
				if (ApprovalRequestDetailData && ApprovalRequestDetailData.RequestDetials && ApprovalRequestDetailData.RequestDetials.request_type) {
					var processedRequestDetail = kony.apps.coe.ess.Approvals.getApprovalsRequestList.ProcessDataa(ApprovalRequestDetailData.RequestDetials.request_type, ApprovalRequestDetailData.RequestDetials);
					ApprovalRequestDetailData.processedRequestDetail = processedRequestDetail;
					var ProcessedComments = kony.apps.coe.ess.Approvals.getApprovalsRequestList.ProcessCommentsData(ApprovalRequestDetailData.comments);
					ApprovalRequestDetailData.comments = ProcessedComments;
					//bindDataSeg(ApprovalRequestDetailData);
                  
                    kony.print("ApprovalRequestDetailData::::::::::"+JSON.stringify(ApprovalRequestDetailData));
					//return ApprovalRequestDetailData;
                  new kony.apps.coe.ess.RequestType().setAttachmentdata(ApprovalRequestDetailData);
				} else {
					kony.print("----invalid input in the process data of the approvalrequest detail page");
				}

			} catch (err) {				
				
				handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessage.ApprovalRequestDetail")));
			}
		};

kony.apps.coe.ess.FilterHistory.prototype.onReachingEndOfSegment = function () {
  	if(frmViewFilterHistory.segMentListView.data.length !== 0) {
		var data = {};
		data.count = kony.apps.coe.ess.globalVariables.PaginationRecordLength;
		data.offset = frmViewFilterHistory.segMentListView.data.length;
		kony.apps.coe.ess.ApprovalHistoryTab.prototype.filterData(data, this.onReachingEndOfSegmentQuerySuccess);
    }
};
kony.apps.coe.ess.FilterHistory.prototype.onReachingEndOfSegmentQuerySuccess = function (response) {
	var data = (new kony.apps.coe.ess.ApprovalHistoryTab()).processHistoryData(response);
	for(var individualData in data) {
      	frmViewFilterHistory.segMentListView.addDataAt(data[individualData], parseInt(frmViewFilterHistory.segMentListView.data.length), 0);
	}
};