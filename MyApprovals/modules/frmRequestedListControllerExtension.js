/*
 * Controller Extension class for frmRequestedList
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmRequestedListControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmRequestedListControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {

        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmRequestedListControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            

            var ContextData = this.getController().getContextData();
            if (isEmpty(ContextData)||ContextData.message == "Async") {
                var selectedItem = frmApprovalHome.segLaterApprovals.selectedRowItems[0];
                ContextData = {
                    "Type": "RequestType",
                    "selectedItem": selectedItem
                };
            }

			//query for the retrival of the Approval Requests
            if (kony.apps.coe.ess.globalVariables.EmployeeID && ContextData.selectedItem && ContextData.selectedItem.ID) {
                var Approval_request_ISlater_Type = "SELECT approval_request.id  AS ID," +
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
                    " LEFT JOIN translation t1 "+
            		" ON (request_category.name=t1.TEXT_DISPLAY)"+
					" LEFT JOIN translation t2 ON(t2.TEXT_CODE=t1.TEXT_CODE)"+
                    "       LEFT JOIN attribute" +
                    "              ON ( approval_request.id = attribute.approval_id )" +
                    "       LEFT JOIN attribute_def" +
                    "              ON ( attribute.attribute_def_id = attribute_def.id )" +
                    " WHERE  request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
                    " and  t2.SPRAS like '"+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' "+
                    " and request_approver.status_id = '2'" +
                    "and attribute_def.attribute_section_id='1'" +
                    " and approval_request.islater='1'" +
                    " and approval_request.type_id='" + ContextData.selectedItem.ID + "'" +
                    " GROUP  BY approval_request.id  ";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", Approval_request_ISlater_Type, success, error);

            } else {
                kony.print("error in retriving the employee or contextData for the form ");
                //creating the exception for the employee
                handleError(new appException("error in retriving the employee or contextData for the form"));
            }

        } catch (err) {
           	handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.FrmRequestedList.ErrorMessage.Formloading")));
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.getController().processData(response);
        }

        function error(err) {
            //Error fetching data
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
     * @memberof frmRequestedListControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedIslaterRequestData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement(data);
            this.getController().bindData(processedIslaterRequestData);
            // return data;
        } catch (err) {
          	handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.FrmRequestedList.ErrorMessage.Formloading")));
            kony.print("--error in processing the data " + err.message+"--");
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
     * @memberof frmRequestedListControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            var contextData = this.getController().getContextData();
            if (isEmpty(contextData)||contextData.message == "Async") {
                var selectedItem = frmApprovalHome.segLaterApprovals.selectedRowItems[0];
                contextData = {
                    "Type": "RequestType",
                    "selectedItem": selectedItem
                };
            }

            switch (contextData.selectedItem.TYPE) {
                case 'LEAVE':
                    frmRequestedList.lblHeader.text = kony.i18n.getLocalizedString("18n.ess.MyApprovals.frmRequestList.lblLeaveHeader.text");
                    frmRequestedList.flxLaterFilter.skin = "sknFlxMob7986cb1090";
                    frmRequestedList.flxHeader.skin = "sknFlxMob7986cb1090";
                    frmRequestedList.skin = "sknFrmMob7986CB100O";
                    break;
                case 'TIMESHEET':
                    frmRequestedList.lblHeader.text = kony.i18n.getLocalizedString("18n.ess.MyApprovals.frmRequestList.lblTimeHeader.text")
                    frmRequestedList.flxLaterFilter.skin = "sknflxBA68C8po100";
                    frmRequestedList.flxHeader.skin = "sknflxBA68C8po100";
                    frmRequestedList.skin = "sknfrmBA68C8";
                    break;
                case 'EXPENSES':
                    frmRequestedList.lblHeader.text = kony.i18n.getLocalizedString("18n.ess.MyApprovals.frmRequestList.lblExpenseHeader.text");
                    frmRequestedList.flxLaterFilter.skin = "sknflx47BDCCff";
                    frmRequestedList.flxHeader.skin = "sknflx47BDCCff";
                    frmRequestedList.skin = "sknFrmMob1DB6C9100O";
                    break;
                case 'PURCHASEORDER':
                    frmRequestedList.lblHeader.text = kony.i18n.getLocalizedString("18n.ess.MyApprovals.frmRequestList.lblPurchaseOrderHeader.text")
                    frmRequestedList.flxLaterFilter.skin = "sknFlxMob058594ff";
                    frmRequestedList.flxHeader.skin = "sknFlxMob058594ff";
                    frmRequestedList.skin = "sknFrmMob058594op100";
                    break;
                case 'WORKORDER':
                    frmRequestedList.lblHeader.text = kony.i18n.getLocalizedString("18n.ess.MyApprovals.frmRequestList.lblWorkOrderHeader.text");
                    frmRequestedList.flxLaterFilter.skin = "sknFlxMob0284B5ff";
                    frmRequestedList.flxHeader.skin = "sknFlxMob0284B5ff";
                    frmRequestedList.skin = "sknFrmMob0284B5OP100";
                    break;
                default:
                    if (contextData.selectedItem.NAME) {
                        frmRequestedList.lblHeader.text = contextData.selectedItem.NAME + " Requests";
                    } else {
                        frmRequestedList.lblHeader.text = contextData.selectedItem.TYPE + " Requests";
                    }
                    frmRequestedList.flxLaterFilter.skin = "sknFlxMob0284B5ff";
                    frmRequestedList.flxHeader.skin = "sknFlxMob0284B5ff";
                    frmRequestedList.skin = "sknFrmMob0284B5OP100";

            }


            //setting the data to the approval request Segement
            var WidgetDatamap = {
                "lblShortName": "CreatedUserShortName",
                //"imgCategory": "requestTypeImage",
                "lblUserName": "UserName",
                "lblCreateDate": "RequestDate",
                "lblDueDateValue": "dueDate",
                "lblRequestInfo": "RequestInfo",
                "btnAdditionalInfo": "AdditionalData",
                "flxTimer": "FlxTimerUi",
                "lblCategory": "category",
                //"flxBorder1": "requestTypeBorderSkin",
                //"flxBorder2": "requestTypeBorderSkin2",
                //"imgLeaveInfo": "requestTypeInfoImage",
                "lblRemainingHours": "remaingHours",
                "imgSelection": "imgSelection",              
              	"imgUser":"imgUser"
            };
            frmRequestedList.SegDetails.widgetDataMap = WidgetDatamap;
          	if(data.length != null && data.length >0){
               frmRequestedList.lblNoRecordsFound.setVisibility(false);
               frmRequestedList.SegDetails.setVisibility(true);
               frmRequestedList.SegDetails.setData(data);
            }else{
               frmRequestedList.lblNoRecordsFound.setVisibility(true);
               frmRequestedList.SegDetails.setVisibility(false);
            }
			//lazy loading 
          	var segmentConfiguration={
						"MediaKeyAttribute":"MediaID",
						"ImageWidgetName":"imgUser",
						"hideWidgetNames":[]
					};   
			kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_SEGMENT,  frmRequestedList.SegDetails, "Employee","mediaEmployee", "", segmentConfiguration);
				
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
        } catch (err) {
			handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.myApprovals.FrmRequestedList.ErrorMessage.Formloading")));
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmRequestedListControllerExtension#
     */
    saveData: function() {
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
     * @memberof frmRequestedListControllerExtension#
     */
    deleteData: function() {
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
     * @memberof frmRequestedListControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();

        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    }
});