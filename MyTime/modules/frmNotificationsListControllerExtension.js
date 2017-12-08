/*
 * Controller Extension class for frmNotificationsList
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmNotificationsListControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmNotificationsListControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
  constructor: function(controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /**
   * This method is an entry point for all fetch related flows. Developer can edit.
   * Default implementation fetches data for the form based on form config
   * @memberof frmNotificationsListControllerExtension#
   */
  fetchData: function() {
    try {
      var scopeObj = this;
      var sqlQuery = "SELECT n.title, n.description, n.notification_id, " +
        "GROUP_CONCAT(data_key) as dataKeys, GROUP_CONCAT(data_value) as dataValues, " +
        "n.createdts as notificationTime " +
        "FROM notification n " +
        "LEFT JOIN notification_data nd on n.notification_id = nd.notification_id " +
        "WHERE n.module = 'TIME' " +
        "GROUP BY nd.notification_id LIMIT 20";
      kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, success, error);
    } catch (err) {
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
   * @memberof frmNotificationsListControllerExtension#
   * @returns {Object} - processed data
   */
  processData: function(data) {
    try {
      var scopeObj = this;
      var processedData = [];
      if (!data && data.length === 0) {
        //There's No data to process
        return processedData;
      }

      data.forEach(function(item, index) {
        //var notificationTime = Date.getDateInStringFromString(item.notificationTime);
        var notificationTime;
        var datestr = String(item.notificationTime);
        if (datestr && datestr.toLowerCase() !== "null") {
          var date = new Date(datestr.substring(0, 4), parseInt(datestr.substring(4, 6)) - 1, datestr.substring(6, 8), datestr.substring(8, 10), datestr.substring(10, 12), datestr.substring(12, 16));
          notificationTime = date.toHHMMMHHmm();
        } else {
          notificationTime = "";
        }

        var preparedData = {
          "title": item.title,
          "description": item.description,
          "notificationTime": notificationTime,
          "timePeriod": "",
          "timeDuration": "",
          "notificationIcon" : "reminder.png"
        };

        //Find out which type of notification it is
        var dataKeys = item.dataKeys.split(",");
        var dataValues = item.dataValues.split(",");

        var moduleIndex = dataKeys.indexOf("module");
        var moduleType;
        if (moduleIndex !== -1) {
          moduleType = dataValues[moduleIndex];
        } else {
          //Whihc means there is no module information for Notification
          //It shouldn't happen
          moduleType = "default";
        }
        preparedData.moduleType = moduleType;

        //Context Data holds more data for deepdroping or fetchng information.
        var contextIndex = dataKeys.indexOf("contextData");
        var contextData;
        if (contextIndex !== -1) {
          var cData = dataValues[contextIndex];
          var cDataModified = cData.replaceAll("\\", "");
          contextData = JSON.parse(cDataModified);
        } else {
          contextData = null;
        }
        preparedData.contextData = contextData;

        processedData.push(preparedData);
      });
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
   * @memberof frmNotificationsListControllerExtension#
   */
  bindData: function(data) {
    try {
      var widgetDataMap = {
        "lblNotificationTitle": "title",
        "lblNotificationDescription": "description",
        "lblNotificationTime": "notificationTime",
        "imgNotificationIcon": "notificationIcon",
        "lblNotificationPeriod": "timePeriod",
        "lblNotificationDuration": "timeDuration"
      };
      frmNotificationsList.segNotificationList.widgetDataMap = widgetDataMap;
      frmNotificationsList.segNotificationList.setData(data);
      var notificationHistoryObject = kony.apps.coe.ess.notifications.getNotificationHistoryInstance();
      for (var i in data) {
        var eachData = data[i];
        if(eachData && eachData.contextData) {
          switch(eachData.moduleType) {
            case "MYTIME_INFO" : 
              notificationHistoryObject.fetchTimeSheetDetails(i,contextData.id);
              break;
            default :
              kony.print("Default case of bindData is executed : " + eachData.moduleType);
              break;
          }
        }
      }
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
   * @memberof frmNotificationsListControllerExtension#
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
   * @memberof frmNotificationsListControllerExtension#
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
   * @memberof frmNotificationsListControllerExtension#
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
