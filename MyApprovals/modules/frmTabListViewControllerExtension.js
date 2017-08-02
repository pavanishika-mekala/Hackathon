/*
 * Controller Extension class for frmTabListView
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmTabListViewControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmTabListViewControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmTabListViewControllerExtension#
     */
    fetchData: function() {
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
        var scopeObj = this; 
        kony.apps.coe.ess.globalVariables.UserSortingKey = "ESS_MYAPPROVALS_USERSETTING_SORTKEY";
        try {
            if (kony.apps.coe.ess.globalVariables.EmployeeID) {
                var Approval_request_query = "SELECT approval_request.id  AS ID," +
                    "	   approval_request.due_date 		  AS Due_Date ," +
                    " 	   approval_request.employee_id 	  AS CreatedByEmployeeid ," +
                    "       approval_request.category_id       AS CategoryID," +
                    "       approval_request.type_id           AS TypeID," +
                    "       approval_request.islater           AS ISLater," +
                    "       approval_request.isread            AS ISRead," +
                    "       approval_request.request_date      AS RequestDate," +
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
                    "and request_approver.status_id = '2'" +
                    " GROUP  BY approval_request.id  ";

                var userPriority = kony.store.getItem(kony.apps.coe.ess.globalVariables.UserSortingKey);
                if (isEmpty(userPriority)) {
                    //Not selected the option to show first
                    //DO nothing no changes in the query
                }
                else {
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
                    "                   WHERE  approval_request.islater = 1 " +
                    "                          AND request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
                    "                          AND request_approver.status_id = '2') IsLaterRequests " +
                    "               ON ( IsLaterRequests.type_id = request_type.id ) " +
                    " GROUP  BY request_type.id ";

                //retrving the approval requests whose islater value is 0
                var retriveApprovalRequestsData = function(ISLaterRequestsData) {

                    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", Approval_request_query, function(ISLaterRequestsData, res) {
                            //sending the control to the process data
                            var resultData = {
                                "ISLaterRequestsData": ISLaterRequestsData,
                                "ApprovalRequestData": res
                            };
                            scopeObj.getController().processData(resultData);
                        }
                        .bind(this, ISLaterRequestsData),
                        function(err) {
                            kony.print(err);
                            handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchApprovalRequest") + JSON.stringify(err)));
                        });
                };

                // retriving the Islater requests and the request types

                kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", IsLaterRequests_query, function(retriveApprovalRequestsData, res) {
                        //sending the control to the process data
                        retriveApprovalRequestsData(res);
                    }
                    .bind(this, retriveApprovalRequestsData),
                    function(err) {
                        kony.print("------------ error in the retriving of the islater request");
                        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest") + JSON.stringify(err)));
                    });

            }
            else {
                kony.print("error in fetching the value of the employee id ");
                //creating the exception for the employee
                handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.errorMessages.EmployeeRetival")));
            }
            kony.print("---------End of fetch data in the frmapproval Home controller extension----------");

        }
        catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
            handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest")));
        }

    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmTabListViewControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            //this.$class.$superp.processData.call(this, data);
            kony.print("--ProcessData is--"+JSON.stringify(data));
            var processedData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement(data.ApprovalRequestData);
            var ISLaterRequestsData = data.ISLaterRequestsData;
            var processedIslaterRequestData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForISlaterSegment(ISLaterRequestsData);
			
            var IslaterRequestsCount = 0;
            for (var index in ISLaterRequestsData) {

                IslaterRequestsCount += parseInt(ISLaterRequestsData[index].COUNT);
            }

            var resultData = {
                "ISLaterRequestsData": processedIslaterRequestData,
                "ApprovalRequestData": processedData,
                "IslaterRequestsCount": IslaterRequestsCount
            }
            this.getController().bindData(resultData);
            return data;
        }
        catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmTabListViewControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            kony.print("--bindData is--"+JSON.stringify(data));
            formmodel.clear();
            this.getController().getFormModel().formatUI();
            kony.apps.coe.ess.Approvals.tabApprovalsListView.ApprovalsListData = data.ApprovalRequestData;
           
            var WidgetDatamap = {
                "lblPeopleName": "UserName",
                "lblShortName": "CreatedUserShortName",
                "lblSubmitDate": "RequestDate",
                "lblDate": "dueDate",
                "lblPeoplePosition": "request_type",
                "flxDelegated": "Delegated",
                "imgPeople": "imgPeople",
                "flxImage": "flxImage",
                "lblIname": "lblIname",
                "lblPeopleDate": "RequestInfo",
                "lblTotalDays": "AdditionalData",
                "flxTotalDays": "AdditionalData",
            };
            
            var newData = [{
                Image: "",
                TYPE: "All",
                
            }].concat(data.ISLaterRequestsData);
            var reqtypeDatamap={
              "imgType":"Image",
              "lblType":"TYPE"
              };
            frmTabListView.segReqtype.widgetDataMap=reqtypeDatamap;
            frmTabListView.segReqtype.setData(newData);
            for (var i = 0; i < data.ApprovalRequestData.length; i++) {
              if (data.ApprovalRequestData[i].MediaID === undefined)
            	data.ApprovalRequestData[i].MediaID = null;
             }
            frmTabListView.segMentListView.widgetDataMap = WidgetDatamap;
            frmTabListView.segMentListView.setData(data.ApprovalRequestData);
            var segmentConfiguration = {
                "MediaKeyAttribute": "MediaID",
                "ImageWidgetName": "imgPeople",
                "hideWidgetNames": ["CreatedUserShortName"]
            };
        
            kony.apps.coe.ess.Approvals.tabApprovalsListView.masterData = data.ApprovalRequestData;
            //#ifndef windows8 
          	
            kony.apps.coe.ess.MyApprovals.media.lazyLoading(1,
                frmTabListView.segMentListView, "Employee", "mediaEmployee", "", segmentConfiguration);
            //#endif
            kony.apps.coe.ess.Approvals.tabApprovalsListView.setDataToSegPeople();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
       this.getController().showForm();
        }
        catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmTabListViewControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        }
        catch (err) {
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
     * @memberof frmTabListViewControllerExtension#
     */
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        }
        catch (err) {
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
     * @memberof frmTabListViewControllerExtension#
     */
    showForm: function() {
        try {
          
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        }
        catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    }
});