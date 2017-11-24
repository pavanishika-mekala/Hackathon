/*
 * Controller Extension class for frmFullDetails
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmFullDetailsControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmFullDetailsControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
		constructor: function (controllerObj) {
			this.$class.$super.call(this, controllerObj);
		},
		/**
		 * This method is an entry point for all fetch related flows. Developer can edit.
		 * Default implementation fetches data for the form based on form config
		 * @memberof frmFullDetailsControllerExtension#
		 */
		fetchData: function () {
			try {
				var scopeObj = this;
				kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.loadingForm"));
				//input validation
				if(isEmpty(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID)||isEmpty(kony.apps.coe.ess.globalVariables.EmployeeID )){
					//input validation failed
					handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.FrmFullDetails.ErrorMessage.Formloading")));
					return;
				}
				var selectedApprovalID = kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID;
				//query for the approval request full details
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
                    	"       t2.TEXT_DISPLAY	As	Category,"+
						"       [request_category].[NAME] AS [Category1], " +
						"       [attribute].[id] AS [attributeID], " +
						"       [attribute].[attribute_def_id] AS [Attribute_DEF], " +
						"       [attribute_def].[attribute_section_id] AS [AttributeSection], " +
						"       GROUP_CONCAT (CASE WHEN [attribute_def].[attribute_section_id] = '2' THEN ([attribute].[value]) ELSE NULL END) AS [Attributevalue], " +
						"       GROUP_CONCAT (CASE WHEN [attribute_def].[attribute_section_id] = '2' THEN ([attribute_def].[label]) ELSE NULL END) AS [AttributeNAME]" + 
						"FROM   [approval_request]" +
						"       LEFT JOIN [request_type] ON ([approval_request].[type_id] = [request_type].[id])" +
						"       LEFT JOIN [employee] ON ([approval_request].[employee_id] = [employee].[id])" +
						"       LEFT JOIN [status] ON ([approval_request].[status_id] = [status].[id])" +
						"       LEFT JOIN [request_approver] ON ([approval_request].[id] = [request_approver].[approval_id])" +
						"       LEFT JOIN [request_category] ON ([approval_request].[category_id] = [request_category].[id])" +
						" LEFT JOIN translation t1 "+
            			" ON (request_category.name=t1.TEXT_DISPLAY)"+
						" LEFT JOIN translation t2 ON(t2.TEXT_CODE=t1.TEXT_CODE)"+
                    	"       LEFT JOIN [attribute] ON ([approval_request].[id] = [attribute].[approval_id])" +
						"       LEFT JOIN [attribute_def] ON ([attribute].[attribute_def_id] = [attribute_def].[id])" +
						"WHERE  [request_approver].[approver_id] = '"+kony.apps.coe.ess.globalVariables.EmployeeID+"'" +
						"       AND [approval_request].[id] = '"+selectedApprovalID+"'" +
						 " and  t2.SPRAS like '"+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' "+
                    	"GROUP  BY [approval_request].[id];" ;
					kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", ApprovalRequestFullDetailsQuery,success,error);
			} catch (err) {
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}

			function success(response) {

				scopeObj.getController().processData(response[0]);
			}
			function error(err) {
				//Error fetching data
				handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.FrmFullDetails.ErrorMessage.Formloading")));
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
				var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}
		},
		/**
		 * This method processes fetched data. Developer can edit.
		 * Default implementation processes the provided data to required format for bind.
		 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
		 * @memberof frmFullDetailsControllerExtension#
		 * @returns {Object} - processed data
		 */
		processData: function (data) {
			try {
              	var scopeObj = this;
              	var processedRequestDetail = kony.apps.coe.ess.Approvals.ApprovalsHome.process_ApprovalRequest(data);
              	processedRequestDetail = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.ProcessData(processedRequestDetail.request_type, processedRequestDetail);
              	kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
              	this.getController().bindData(processedRequestDetail);
				return processedRequestDetail;
			} catch (err) {
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}
		},

		/**
		 * This method binds the processed data to the form. Developer can edit.
		 * Default implementation binds the data to widgets in the form.
		 * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
		 * @memberof frmFullDetailsControllerExtension#
		 */
		bindData: function (data) {
			try {
				this.getController().getFormModel().formatUI();

              	//chnage status flex color
              	kony.apps.coe.ess.WidgetPropertyBinding(frmFullDetails.flxStatusType,data.statusFlx);
              	//change status name
              	kony.apps.coe.ess.WidgetPropertyBinding(frmFullDetails.lblStatus, data.statusText);
                kony.apps.coe.ess.WidgetPropertyBinding(frmFullDetails.imgLogo, data.Titleicon);
              	frmFullDetails.lblTitle.text=frmApprovalRequestDetail.lblTitle.text;
                frmFullDetails.btnAdditionalInfo.text=frmApprovalRequestDetail.lblAdditonalInfo.text;
              	kony.apps.coe.ess.WidgetPropertyBinding(frmFullDetails.lblCategory, data.TitleDetail);
              	frmFullDetails.lblRequestedDate.text=data.RequestDate;
             	var fullDetailsWidgetDataMap = {
					"lblType" : "key",
                  	"lblValue" : "value",
				};
              	frmFullDetails.segFullDetails.widgetDataMap = fullDetailsWidgetDataMap;
              	var segData=jsonAttribtuesTOArray(data.attributejson);
              	frmFullDetails.segFullDetails.setData(segData);
             	kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
              	this.getController().showForm();
			} catch (err) {
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}

		},

		/**
		 * This method is entry point for save flow. Developer can edit.
		 * Default implementation saves the entity record from the data of widgets defined in form config
		 * @memberof frmFullDetailsControllerExtension#
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
		 * @memberof frmFullDetailsControllerExtension#
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
		 * @memberof frmFullDetailsControllerExtension#
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
