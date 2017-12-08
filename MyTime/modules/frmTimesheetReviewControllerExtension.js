/*
 * Controller Extension class for frmTimesheetReview
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.TimesheetReview = kony.apps.coe.ess.myTime.TimesheetReview || {};

kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.TimesheetReview = kony.apps.coe.ess.myTime.TimesheetReview || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmTimesheetReviewControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmTimesheetReviewControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
  constructor: function(controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /**
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config
     * @memberof frmTimesheetReviewControllerExtension#
     */
  fetchData: function() {
    try {
      var scopeObj = this;
      //                 var timesheetID = "TIMESHEET1"; //
      var timesheetID = scopeObj.getController().getContextData().timesheetId;
      var sqlQuery = "select te.date as date,pt.type, te.actual_hours as hours,te.Activity_Description,tt.isovertime,te.project_task_id as projecttaskID,te.time_type_id as timeTypeId,tt.name as time_type_name, p.project_name as projectname,t.task_name,p.id as proid,t.id as taskId, case when pt.task_id ='' then p.project_name else t.task_name end as task, p.isBillable from time_entry te left join project_task pt on pt.id = te.project_task_id left join project p on p.id = pt.project_id left join task t on pt.task_id = t.id left join time_type tt on te.time_type_id=tt.id where te.timesheet_id = '" + timesheetID + "' AND te.StatusId != '3';";
      kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, success, error);
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
      alert(exception.toString());
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
      // 				kony.sdk.mvvm.log.error(exception.toString());
      alert("Err  : " + JSON.stringify(err));
    }
  },
  /**
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmTimesheetReviewControllerExtension#
     * @returns {Object} - processed data
     */
  processData: function(res) {
    try {

      var scopeObj = this;
      // 				var processedData; // = this.$class.$superp.processData.call(this, data);
      if (res === null || res.length === 0) {
        //It won't happen.
        var dataToBind = {
          "TotalHours": 0,
          "BillableHours": 0,
          "OvertimeHours": (0 - 0),
          "DisplayValue": scopeObj.getController().getContextData().displayValue
        };
        kony.apps.coe.ess.myTime.TimesheetReview.Data.set({});
        this.getController().bindData(dataToBind);
        return res;
      }
      //Group Data using Task/Project Name
      for (var i = 0; i < res.length; i++) {
        if (res[i].projecttaskID === null) {
          res[i].projecttaskID = "";
        }
      }
      var groupedData = kony.apps.coe.makeGroups("projecttaskID", res);
      var finalGroupedData = [];
      for (var i = 0; i < groupedData.length; i++) {
        finalGroupedData.push(kony.apps.coe.makeGroups("timeTypeId", groupedData[i]));
      }
      var processedSegmentData = kony.apps.coe.ess.myTime.TimesheetReview.getProcessedSegmentData(finalGroupedData);
      var groupParams = {};
      var totalHours = 0;
      var billableHours = 0;
      //Process & Prepare require JSON
      for (var k = 0; k < res.length; k++) {
        res[k].totalhours = groupParams[res[k].task] + " Hrs";
        res[k].hours = res[k].hours + " Hrs";
        var dateObj = kony.apps.coe.ess.myTime.dbDateStringToDateObj(res[k].date);
        var dateString = dateObj.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dateObj.getMonth()];
        res[k].date = dateString;
      }
      var contextData = scopeObj.getController().getContextData();
      //Set Review Data
      kony.apps.coe.ess.myTime.TimesheetReview.Data.set(res);
      // 				Call initial function of ReviewTimesheet. Header data is set to null be default in initial call
      // 				kony.apps.coe.ess.myTime.TimesheetReview.setData(null);
      var bindData = {
        "DisplayValue": scopeObj.getController().getContextData().displayValue,
        "segmentData": processedSegmentData
      };
      this.getController().bindData(bindData);
      return res;
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
      alert(exception.toString());
      //               alert("Proc  : " + JSON.stringify(err) );
    }
  },
  /**
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmTimesheetReviewControllerExtension#
     */
  bindData: function(data) {
    try {
      var formmodel = this.getController().getFormModel();
      formmodel.clear();
      this.$class.$superp.bindData.call(this, data);
      this.getController().getFormModel().formatUI();
      //Call initial function of ReviewTimesheet. Header data is set to null be default in initial call
      //Bind data here
      kony.print("---- setData in segTimesheet bind");
      frmTimesheetReview.segTimesheet.setData(data.segmentData);
      frmTimesheetReview.lblDuration.text = data.DisplayValue;
      kony.print("---- setData in TimesheetReview bind");
      kony.apps.coe.ess.myTime.TimesheetReview.setData(null);
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      this.getController().showForm();
      kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
      alert("Err Bind : " + JSON.stringify(err));
    }

  },
  /**
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config
     * @memberof frmTimesheetReviewControllerExtension#
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
     * @memberof frmTimesheetReviewControllerExtension#
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
     * @memberof frmTimesheetReviewControllerExtension#
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



kony.apps.coe.ess.myTime.TimesheetReview.Data = {
  _data: {},
  set: function(data) {
    this._data = data;
  },
  get: function() {
    return this._data;
  }
};
/**
 * Complete Review of Time Entries. There will be no validations here as submit button is visible only after all successfull validations.
 */
kony.apps.coe.ess.myTime.TimesheetReview.generateData = function() {
  var d = new Date();
  var data = {
    "Added_On": "",
    "Comments": "",
    "Employee_Id": kony.apps.coe.ess.globalVariables.employeeId,
    "Id": "",
    "Timesheet_Id": ""
  };
  data.Added_On = d.toYYYYMMDD("") + d.toHHMMSS("");
  data.Comments = frmTimesheetReview.txtAreaComments.text;
  data.Timesheet_Id = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.getSelectedItemData().timesheetId;
  data.Id = "MYTIME_V1_TMST_" + data.Added_On + "_T_" + d.getUTCMilliseconds() + "_1";
  return data;
};
kony.apps.coe.ess.myTime.TimesheetReview.onSubmitClick = function() {
  if (frmTimesheetReview.txtAreaComments.text === null || frmTimesheetReview.txtAreaComments.text === "") {
    kony.apps.coe.ess.myTime.TimesheetReview.completeReview(kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.getSelectedItemData().timesheetId);
  } else {
    kony.apps.coe.ess.MVVM.createRecord("MYTIME", "Timesheet_Note",
                                        kony.apps.coe.ess.myTime.TimesheetReview.generateData(),
                                        kony.apps.coe.ess.myTime.TimesheetReview.completeReview(kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.getSelectedItemData().timesheetId),
                                        function(err) {
      alert("Err : " + JSON.stringify(err));
    }
                                       );
  }
};
kony.apps.coe.ess.myTime.TimesheetReview.completeReview = function(timesheet_Id) {
  com.kony.ESS.MYTIME.Time_Entry.update("where timesheet_id = '" + timesheet_Id + "' AND StatusId != '3'", {
    StatusId: "7"
  }, function(timesheet_Id, res) {
    //Update Success
    var dateObj = new Date();
    if (kony.apps.coe.ess.appconfig.getCurrentLocation === true) {
      var options = { isAccessModeAlways: true };
      //To check whether the user had provided permission to access their location
      var result = kony.application.checkPermission(kony.os.RESOURCE_LOCATION, options);
      if (result.status == kony.application.PERMISSION_DENIED) {
        popupErrorAlert.lblMessage.text = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.activategps");
        popupErrorAlert.show();
        //Uncomment this when user needs permission while submitting timesheet
        //kony.apps.coe.ess.myTime.TimesheetCreate.getPosition();
      } else if (result.status == kony.application.PERMISSION_GRANTED) {
        kony.location.getCurrentPosition(
          function(position) {
            var location = [];
            location[0] = position.coords.latitude;
            location[1] = position.coords.longitude;
            kony.apps.coe.ess.MVVM.update("MYTIME", "Timesheet", {
              "Id": timesheet_Id,
              "Status_Id": "7",
              "latitude": location[0].toString(),
              "longitude": location[1].toString(),
              "SubmittedOn": dateObj.toYYYYMMDD("") + dateObj.toHHMMSS("")
            }, function(timesheet_Id, res) {
              //kony.application.showLoadingScreen("", "Syncing...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
              //kony.apps.coe.ess.frmLogin.manualSyncOnClick(kony.apps.coe.ess.myTime.TimesheetReview.submisionPopup());
              kony.apps.coe.ess.Sync.syncAsynchronously();
              kony.apps.coe.ess.myTime.TimesheetReview.onSubmisionDone();
              kony.print("successfully submitted for timesheet id = " + timesheet_Id);
            }.bind(this, timesheet_Id), function(err) {
              alert("error callback while update status value for timesheet table record for timesheetid = " + timesheet_Id + " : " + JSON.stringify(err));
            });
          },
          function(positionError) {
            var errorMsg = "Error code: " + positionError.code;
            errorMsg = errorMsg + " Message: " + positionError.message;
            kony.print("---- getCurrentPosition errorcallback: " + errorMsg);
            handleError(errorMsg);
          });
      }
    } else if (kony.apps.coe.ess.appconfig.getCurrentLocation === false) {
      kony.apps.coe.ess.MVVM.update("MYTIME", "Timesheet", {
        "Id": timesheet_Id,
        "Status_Id": "7",
        "SubmittedOn": dateObj.toYYYYMMDD("") + dateObj.toHHMMSS("")
      }, function(timesheet_Id, res) {
        //kony.application.showLoadingScreen("", "Syncing...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        //kony.apps.coe.ess.frmLogin.manualSyncOnClick(kony.apps.coe.ess.myTime.TimesheetReview.submisionPopup());
        kony.apps.coe.ess.Sync.syncAsynchronously();
        if(kony.apps.coe.ess.myTime.time_entry_retrieval_fromSubmit === true)  
        {
          (new kony.apps.coe.ess.myTime.CalendarViewUI()).monthRefresh();
          kony.apps.coe.ess.myTime.time_entry_retrieval_fromSubmit =false;
          
        }else if(kony.apps.coe.ess.myTime.ListViewTabDetails.fromSubmit === true){
          kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().updateTimeSheetWithDuration(frmListView.segViewDates);
          kony.apps.coe.ess.myTime.ListViewTabUI.getInstance().onRowClickofSegListView();
          kony.apps.coe.ess.myTime.ListViewTabDetails.fromSubmit = false;
          
        }
        else
          kony.apps.coe.ess.myTime.TimesheetReview.onSubmisionDone();
        kony.print("successfully submitted for timesheet id = " + timesheet_Id);
      }
                                    .bind(this, timesheet_Id),
                                    function(err) {
        alert("error callback while update status value for timesheet table record for timesheetid = " + timesheet_Id + " : " + JSON.stringify(err));
      });
    }
  }.bind(this, timesheet_Id), function(res) {
    //Update Failed
    alert("Err : " + JSON.stringify(res) + "TimesheetID : " + JSON.stringify(timesheet_Id));
  });
};
kony.apps.coe.ess.myTime.TimesheetReview.onSubmisionDone = function() {
  toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.timesheetsubmittedsuccessfully"), 2000);
  alert("timesheet submitted");
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = false;
  kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.getSelectedItemData().timesheetId;
  if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "daily") {
    kony.application.getPreviousForm().show();
  } else {
    showViewTimeSheetForm();
  }
};