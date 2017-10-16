/*
 * Controller Extension class for frmSearch
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmSearchControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */

kony.sdk.mvvm.frmSearchControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
  constructor: function(controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /**
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config
     * @memberof frmSearchControllerExtension#
     */
  fetchData: function() {
    try {
      var scopeObj = this;
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
      var count = kony.apps.coe.ess.globalVariables.PaginationRecordLength;
      var offset = 0;
      if (kony.apps.coe.ess.globalVariables.isSPA) {
        kony.print("---- an SPA-----");
        scopeObj.getController().processData(kony.apps.coe.ess.Approvals.spa.totalRequests);
      } else {
        kony.print("---- a native ----");
        var search_query = "SELECT Employee.First_Name AS FirstName," +
            "	   Employee.Last_Name AS LastName," +
            "	   approval_request.employee_id AS CreatedByEmployeeid," +
            "	   approval_request.request_date AS RequestDate," +
            "	   Status.Status_Name AS StatusName," +
            "	   request_category.name AS Category," +
            "	   approval_request.category_id AS CategoryID," +
            " 	   approval_request.id  AS ID," +
            "	   request_type.name AS Type," +
            "      employee.Media_Id              	   AS MediaID," +
            "	   request_approver.lastmodifiedts AS ApprovedDate," +
            "      Group_concat(attribute.value) AS Attributevalue," +
            "	   Group_concat(attribute_def.label) AS AttributeNAME" +
            "      FROM approval_request" +
            "	   LEFT JOIN Employee ON (approval_request.employee_id = Employee.Id)" +
            "	   LEFT JOIN request_approver ON (approval_request.id = request_approver.approval_id)" +
            "	   LEFT JOIN attribute ON (approval_request.id = attribute.approval_id)" +
            "	   LEFT JOIN attribute_def ON (attribute.attribute_def_id = attribute_def.id) " +
            "	   LEFT JOIN Status ON (request_approver.status_id = Status.Id)" +
            "	   LEFT JOIN request_category ON (approval_request.category_id = request_category.id)" +
            "	   LEFT JOIN request_type ON (approval_request.type_id = request_type.id) " +
            " WHERE  request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
            " GROUP BY approval_request.id LIMIT " + count + "";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", search_query, success, error);
      }
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.Search")));
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
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.SearchQueryError")));
      kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
      var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }
  },
  /**
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmSearchControllerExtension#
     * @returns {Object} - processed data
     */
  processData: function(data) {
    try {
      kony.print("--start processData");
      var scopeObj = this;
      var processedData = [];
      if (kony.apps.coe.ess.globalVariables.isSPA) {
        kony.print("---- in frmSearchControllerExtension processData ----");
        processedData = kony.apps.coe.ess.Approvals.SPA.Search.processData(data);
      } else {
        processedData = kony.apps.coe.ess.Approvals.frmSearch.ProcessData(data);
      }
      scopeObj.getController().bindData(processedData);
      kony.print("--End processData")
      return processedData;
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      handleError(err);
      kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    };
  },
  /**
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmSearchControllerExtension#
     */
  bindData: function(data) {
    try {
      var formmodel = this.getController().getFormModel();
      formmodel.clear();
      this.getController().getFormModel().formatUI();
      var widgetDataMap = {
        "lblCreatedDate": "request_date",
        "lblName": "UserName",
        "lblPurpose": "categoryName",
        "lblApproved": "status_value",
        "lblIntials": "CreatedUserShortName",
        "lblRequestInfo": "RequestInfo",
        "imgType": "imgPurpose",
        "imgUser": "imgUser",
        "flxExpense":"requestVisible"
      };
      if(null !== data && undefined !== data && " !== data"){
        for(var i = 0;i<data.length;i++){
          var statusText = String(data[i].status_value);
          var status = statusText.indexOf(" ");
          var firstPart = statusText.substring(0, status);
          var secondPart = statusText.substring(status+1);
          if(firstPart === ""){
            firstPart = secondPart;
            secondPart = "";
          }
          if(firstPart == "Pending"){
            data[i].status_value = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Pending")+" "+secondPart;
          }else if(firstPart == "Approved"){
            data[i].status_value = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Approved")+" "+secondPart;
          }else if(firstPart == "Rejected"){
            data[i].status_value = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Rejected")+" "+secondPart;
          }
        }
      }
      frmSearch.segList.widgetDataMap = widgetDataMap;
      if(data!=="" && data!==null) {
        frmSearch.lblNorecords.setVisibility(false);
        frmSearch.segList.setVisibility(true);
        frmSearch.segList.setData(data);
        //start lazy  loadign for images in the segemtn
        kony.apps.coe.ess.Approvals.frmSearch.lazyLoading();
      }

      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      this.getController().showForm();

    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.bindDataSearch")));
    }

  },
  /**
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config
     * @memberof frmSearchControllerExtension#
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
     * @memberof frmSearchControllerExtension#
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
     * @memberof frmSearchControllerExtension#
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