/*
 * Controller Extension class for frmAuditTrail
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmAuditTrailControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmAuditTrailControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
  constructor: function(controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmAuditTrailControllerExtension#
     */
  fetchData: function() {

    try {
      var scopeObj = this;

      var id_to_use ="";
      //#ifdef tabrcandroid
      id_to_use =kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId;
      //#endif

      //#ifdef ipad
      id_to_use =kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId;
      //#endif

      //#ifdef iphone
      id_to_use =kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId;
      //#endif

      //#ifdef android
      id_to_use =kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId;
      //#endif
      
      var query = "select ta.*, emp.First_Name as First_Name from Timesheet_Audit ta left join Employee emp on ta.employee_id = emp.Id where ta.Timesheet_Id = '" + id_to_use + "';";
      var queryForComments = "select tn.Comments as comments, tn.Added_On as Created_On, emp.First_Name as First_Name from Timesheet_Note tn left join Employee emp on tn.Employee_Id = emp.Id where tn.Timesheet_Id = '" + id_to_use + "';";	
      var queryIfPending="select ts.SubmittedOn as Created_On, ts.Status_Id as Status_Id, emp.First_Name as First_Name from Timesheet ts left join Employee emp on ts.Employee_Id = emp.Id where ts.Id = '" + id_to_use + "';";

      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallbackForAuditRecords, error);
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }

    function successCallbackForAuditRecords(res) {
      for(var i in res) {
        res[i].templateType = 0;
      }
      //quering comments data.
      //var query = "select tn.Comments as comments, tn.Added_On as Created_On, emp.First_Name as First_Name from Timesheet_Note tn left join Employee emp on tn.Employee_Id = emp.Id where tn.Timesheet_Id = '" + kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId + "';";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", queryForComments, successCallbackForComments.bind(scopeObj, res), error);
    }

    function successCallbackForComments(data, res) {
      for(var i in res) {
        res[i].templateType = 1;
        data.push(res[i]);
      }
      //quering data if timesheet is pending. 
      var query = "select ts.SubmittedOn as Created_On, ts.Status_Id as Status_Id, emp.First_Name as First_Name from Timesheet ts left join Employee emp on ts.Employee_Id = emp.Id where ts.Id = '" + kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId + "';";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", queryIfPending, successCallbackForPendingTimesheet.bind(scopeObj, data), error);
    }

    function successCallbackForPendingTimesheet(data, res) {
      for(var i in res) {
        if(res[i].Status_Id === "2") {
          data.push({
            Created_On : res[i].Created_On,
            Status_Id : res[i].Status_Id,
            First_Name : res[i].First_Name,
            Description : "",
            templateType : 0
          });
        }
        break;
      }
      success(data); 
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
     * @memberof frmAuditTrailControllerExtension#
     * @returns {Object} - processed data
     */
  processData: function(data) {
    var statusImages = {
      "0": "approved_audit.png",
      "1": "rejected_audit.png",
      "2": "pending_audit.png",
      "3": "canceled_audit.png",
      "4": "",
      "5": "saved_audit.png",
      "6": "system_error.png",
      "7": "submitted_audit.png"
    };
    try {
      var scopeObj = this;
      var processedData = [];
      //sorting increasing order of created timestamp
      data.sort(function(a, b) {
        return a.Created_On.localeCompare(b.Created_On);
      });
      for(var i in data) {
        //parsing to string
        var dateStr = String(data[i].Created_On);
        var date = "";
        //checking condition for invalid date
        if(dateStr !== null && dateStr !== undefined && dateStr !== "" && dateStr.toLowerCase() !== "null") {
          //converting from date string (e.g. 20170212020456) to date object
          date = new Date(dateStr.substring(0, 4), parseInt(dateStr.substring(4, 6)) - 1, dateStr.substring(6, 8), dateStr.substring(8, 10), dateStr.substring(10, 12), dateStr.substring(12, 16));
          //converting to required date format i.e. DD MMM HH mm am/pm.
          date = date.toHHMMMHHmm();
        }
        //assigning different template for comments and audit record.
        if(parseInt(data[i].templateType) === 0) {
          data[i].Status_Id = String(data[i].Status_Id);
          var status = "";
          if(data[i].Status_Id !== null && data[i].Status_Id !== undefined && data[i].Status_Id.toLowerCase() !== "null" && data[i].Status_Id !== "") {
            // getting status value using status id
            status = kony.apps.coe.ess.globalVariables.Status.nToStr[data[i].Status_Id];
            status = status.charAt(0).toUpperCase() + status.substring(1, status.length).toLowerCase();
          }
          processedData.push({
            lblEventName : status,
            lblEventDesc : data[i].Description,
            lblPersonName : data[i].First_Name,
            lblDate : date,
            imgStatus : statusImages[data[i].Status_Id],
            lblBottomLine : {isVisible : true},
            lblVerticalLineTop : {isVisible : true},
            lblVerticalLineBottom : {text : "", isVisible : (i >= data.length - 1 ? false : true)}
          });
        } else if(parseInt(data[i].templateType) === 1) {
          processedData.push({
            lblEventName : kony.i18n.getLocalizedString("i18n.ess.common.userComment"),
            lblEventDesc : data[i].comments,
            lblPersonName : data[i].First_Name,
            lblDate : date,
            imgStatus : "comment.png",
            lblVerticalLineTop : {text : "", isVisible : true},
            lblBottomLine : {text : "", isVisible : true},
            lblVerticalLineBottom : {text : "", isVisible : (i >= data.length - 1 ? false : true)}
          });
        }

      }
      this.getController().bindData(processedData);
      return processedData;
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
     * @memberof frmAuditTrailControllerExtension#
     */
  bindData: function(data) {
    try {
      var formmodel = this.getController().getFormModel();
      formmodel.clear();
      this.getController().getFormModel().formatUI();
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      //setting data to segement
      frmAuditTrail.segAuditTrailList.setData(data);
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
     * @memberof frmAuditTrailControllerExtension#
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
     * @memberof frmAuditTrailControllerExtension#
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
     * @memberof frmAuditTrailControllerExtension#
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