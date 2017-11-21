/*
 * Controller Extension class for frmApprovalRequestDetail
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmApprovalRequestDetailControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmApprovalRequestDetailControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
		constructor: function (controllerObj) {
			this.$class.$super.call(this, controllerObj);
		},
		/**
		 * This method is an entry point for all fetch related flows. Developer can edit.
		 * Default implementation fetches data for the form based on form config
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 */
		fetchData: function () {
			try {
				var scopeObj = this;
				//input validation
				var selectedApprovalID = this.getController().getContextData();
				if (isEmpty(selectedApprovalID)) {
					return;
				}
				if (this.getController().getContextData().message == "Async") {
					//make no actions as of form is reloaded by the async operation
					selectedApprovalID=kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID;
                }
				//comemnts retrival query
				var comments_qurey = "SELECT [request_note].[id] AS [ID], " +
					"       [request_note].[comment] AS [Comment], " +
					"       [request_note].[employee_id] AS [Employee_id], " +
					"       [request_note].[approval_id] ," +
					"       [request_note].[createdts]   ," +
					"       [Employee].[First_Name] AS [FirstName], " +
					"       [Employee].[Last_Name] AS [LastName]," +
                    "		[Employee].[Media_Id]" +
					"       FROM   [request_note]" +
					"       LEFT JOIN [Employee] ON ([Employee].[Id] = [request_note].[employee_id])" +
					"       WHERE  [request_note].[approval_id] = '" + selectedApprovalID + "' " +
                	"       order by  [request_note].[createdts]";

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
                    "       t2.TEXT_DISPLAY	As	Category,"+
					"       request_category.NAME              AS Category1," +
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
					"              ON ( approval_request.status_id = status.id )" +
					"       LEFT JOIN request_approver" +
					"              ON ( approval_request.id = request_approver.approval_id )" +
					"       LEFT JOIN request_category" +
					"              ON ( approval_request.category_id = request_category.id )" +
					" LEFT JOIN translation t1 "+
            		" ON (request_category.name=t1.TEXT_DISPLAY)"+
					" LEFT JOIN translation t2 ON(t2.TEXT_CODE=t1.TEXT_CODE)"+
                    "       LEFT JOIN attribute" +
					"              ON ( approval_request.id = attribute.approval_id )" +
					"       LEFT JOIN attribute_def" +
					"              ON ( attribute.attribute_def_id = attribute_def.id )" +
					" WHERE  request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
					" and  t2.SPRAS like '"+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"'"+
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
						scopeObj.getController().processData(ApprovalRequestDetailData);

					}
						.bind(this, ApprovalRequestDetailData),
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

					}
						.bind(this, ApprovalRequestDetailData),
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

					}
						.bind(this, ApprovalRequestDetailData),
						function (err) {
						handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
					});
				};

				kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", Approval_request_query, function (ApprovalRequestDetailData, RequestDetailsResponse) {
                  if (isEmpty(RequestDetailsResponse[0])) {
							//return the control and throw exception
						handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments")));
                       return;
					} else {
                      var processedRequest = kony.apps.coe.ess.Approvals.ApprovalsHome.process_ApprovalRequest(RequestDetailsResponse[0]);
						ApprovalRequestDetailData.RequestDetials =processedRequest;
					}
					commentsRetival(ApprovalRequestDetailData);

				}
					.bind(this, ApprovalRequestDetailData),
					function (err) {
					handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.Comments") + JSON.stringify(err)));
				});

			} catch (err) {
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}

		},
		/**
		 * This method processes fetched data. Developer can edit.
		 * Default implementation processes the provided data to required format for bind.
		 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 * @returns {Object} - processed data
		 */
		processData: function (ApprovalRequestDetailData) {
			try {
				var scopeObj = this;
				if (ApprovalRequestDetailData && ApprovalRequestDetailData.RequestDetials && ApprovalRequestDetailData.RequestDetials.request_type) {
					var processedRequestDetail = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessData(ApprovalRequestDetailData.RequestDetials.request_type, ApprovalRequestDetailData.RequestDetials);
					ApprovalRequestDetailData.processedRequestDetail = processedRequestDetail;
					var ProcessedComments = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessCommentsData(ApprovalRequestDetailData.comments);
					ApprovalRequestDetailData.comments = ProcessedComments;
					this.getController().bindData(ApprovalRequestDetailData);
					return ApprovalRequestDetailData;
				} else {
					kony.print("----invalid input in the process data of the approvalrequest detail page");
				}

			} catch (err) {
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
				handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessage.ApprovalRequestDetail")));
			}
		},
		/**
		 * This method binds the processed data to the form. Developer can edit.
		 * Default implementation binds the data to widgets in the form.
		 * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 */
		bindData: function (ApprovalRequestDetailData) {
			try {
				var formmodel = this.getController().getFormModel();
				formmodel.clear();
				if (ApprovalRequestDetailData && ApprovalRequestDetailData.RequestDetials && ApprovalRequestDetailData.RequestDetials.request_type && ApprovalRequestDetailData.userAttachments) {
					//chainging the ui based on the request Type
					kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.changeSkins(ApprovalRequestDetailData.RequestDetials.request_type);
					//binding the approval request fields
					kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.bindApprovalRequestDetails(ApprovalRequestDetailData.processedRequestDetail);
					//Binding the comments to the segments
					var SegChatDataMap = {
						"lblShortName": "ShortName",
						"lblAppliedOn": "Appliedon",
						"lblName": "UserName",
						"lblChat": "Comment",
						"template": "template",
                      	"flxcomment" : "flxcomment",
                      	"imgUser" : "imgUser"
					};
                  	for(var index in ApprovalRequestDetailData.comments ){
                   		ApprovalRequestDetailData.comments [index].flxcomment ={
                          		"highlightedSkin" : "sknflxMob2ebaee" ,
                          		"highlightOnParentFocus" : true
                        };
                  	}
					frmApprovalRequestDetail.SegChat.widgetDataMap = SegChatDataMap;
					frmApprovalRequestDetail.SegChat.setData(ApprovalRequestDetailData.comments);
                  	//start lazy loading for iamges in the comments
                  	kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.startLazyloadingComments();
					//Making the visiblity to true or false based on the user Attachemnts
					if (ApprovalRequestDetailData.userAttachments && ApprovalRequestDetailData.userAttachments.length && ApprovalRequestDetailData.userAttachments.length > 0) {
						var WidgetDatamap = {
							"lblDetail": "Media"
						};
						frmApprovalRequestDetail.flxattachmentDetails.SegAttachments.widgetDataMap = WidgetDatamap;
						frmApprovalRequestDetail.flxattachmentDetails.SegAttachments.setData(ApprovalRequestDetailData.userAttachments);
						frmApprovalRequestDetail.flxHeaderSwitch.setVisibility(true);

					} else {
						frmApprovalRequestDetail.flxHeaderSwitch.setVisibility(false);
					}
                  //making the footer and the comments visiblity on or off based on the status of the request
                 if(ApprovalRequestDetailData.RequestDetials.StatusId==2){
									 //status of  the request is pending
                  	frmApprovalRequestDetail.flxBottomButtons.setVisibility(true);
										frmApprovalRequestDetail.lblApprove.isVisible = true;
										frmApprovalRequestDetail.btnReject.isVisible = true;
										frmApprovalRequestDetail.btnNotice.isVisible = false;
										frmApprovalRequestDetail.txtareaComments.setVisibility(true);
                 }else{
									 // If it is a leave information not yet read show the button to mark it as read
									 if(ApprovalRequestDetailData.RequestDetials.StatusId == 0 && ApprovalRequestDetailData.RequestDetials.ISRead != "1" && ApprovalRequestDetailData.RequestDetials.TypeID == "LEAVEINFO") {
										 frmApprovalRequestDetail.flxBottomButtons.setVisibility(true);
										 frmApprovalRequestDetail.lblApprove.isVisible = false;
										 frmApprovalRequestDetail.btnReject.isVisible = false;
										 frmApprovalRequestDetail.btnNotice.isVisible = true;
										 frmApprovalRequestDetail.txtareaComments.setVisibility(false); //true  to false as other absence leaves will be auto approved
									 } else {
										 //status of the request is not pending
                     	frmApprovalRequestDetail.flxBottomButtons.setVisibility(false);
                      frmApprovalRequestDetail.txtareaComments.setVisibility(false);
									 }
                 }

				} else {
					kony.print("invalid input in the bind data of approval request detail");
				}
				this.getController().getFormModel().formatUI();
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				this.getController().showForm();
              //lazy loading
              var mediaId=kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.MediaID;
              kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_NORMAL, frmApprovalRequestDetail.imguser, "Employee", "mediaEmployee", mediaId, {});
			} catch (err) {
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
				handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessage.ApprovalRequestDetail")));
			}

		},
		/**
		 * This method is entry point for save flow. Developer can edit.
		 * Default implementation saves the entity record from the data of widgets defined in form config
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 */
		saveData: function () {
			try {
				var scopeObj = this;
				this.$class.$superp.saveData.call(this, success, error);
			} catch (err) {
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}

			function success(res) {
				//Successfully created record
				kony.sdk.mvvm.log.info("success saving record ", res);
			}

			function error(err) {
				//Handle error case
				kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
				var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}

		},
		/**
		 * This method is entry point for delete/remove flow. Developer can edit.
		 * Default implementation deletes the entity record displayed in form (primary keys are needed)
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 */
		deleteData: function () {
			try {
				var scopeObj = this;
				this.$class.$superp.deleteData.call(this, success, error);
			} catch (err) {
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}

			function success(res) {
				//Successfully deleting record
				kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
			}

			function error(err) {
				//Handle error case
				kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
				var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}
		},
		/**
		 * This method shows form.
		 * @memberof frmApprovalRequestDetailControllerExtension#
		 */
		showForm: function () {
			try {
				var formmodel = this.getController().getFormModel();
				formmodel.showView();
			} catch (e) {
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}
		}
	});
