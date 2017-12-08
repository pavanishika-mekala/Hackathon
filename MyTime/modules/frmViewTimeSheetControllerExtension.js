/*
 * Controller Extension class for frmViewTimeSheet
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmViewTimeSheetControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmViewTimeSheetControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmViewTimeSheetControllerExtension#
     */
    fetchData: function() {
        try {
            scopeObj = this;
            var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id='" + kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId + "' AND te.StatusId != '3';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            this.firstResponse = response;
            var configObj = scopeObj.getController().getConfig();
            var model = scopeObj.getController().getApplicationContext().getModel("Timesheet_Note", "MYTIME", { "access": "offline" });
            var query = "select tn.Added_On,tn.comments,tn.Employee_id,e.First_Name as name from Timesheet_note tn left join employee e on tn.employee_id=e.id where timesheet_id='" + kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId + "'";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, querySuccess.bind(this, response), queryFailure);
            kony.sdk.mvvm.log.info("success fetching data ", response);
        }

        function error(err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function querySuccess(response1, response2) {
            var finalResponse = {};
            finalResponse.timeSheetEntries = response1;
            finalResponse.timeSheetComments = response2;
            scopeObj.getController().processData(finalResponse);
        }

        function queryFailure(err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.print("Error in query Failure " + err);
        }
    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmViewTimeSheetControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig === "daily") {
                var refstartDate = new Date(data.timeSheetEntries[0].Start_Date.toString().substring(0, 4), (data.timeSheetEntries[0].Start_Date.toString().substring(4, 6)) - 1, data.timeSheetEntries[0].Start_Date.toString().substring(6, 8));
                interval = refstartDate.thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay);
                var dataToSet = [];
                var startDate = interval[0];
                var endDate = interval[1];
                var dateToProcess = new Date(startDate);
                var query = "select ts.Id, ts.Status_Id,ts.Start_Date from Timesheet ts where ts.Start_Date >='" + (startDate.toYYYYMMDD("")) + "' AND ts.End_Date <= '" + (endDate.toYYYYMMDD("")) + "';";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, assignStatus.bind(scopeObj, dataToSet), error);

                function assignStatus(dataToSet, res) {
                    var tempRes = {};
                    for (var i in res) {
                        tempRes[res[i].Start_Date] = res[i];
                    }
                    while ((dateToProcess.compareOnlyDate(endDate)) <= 0) {
                        var _dayName = kony.apps.coe.ess.myTime.nToStr.week[dateToProcess.getDay()].toUpperCase();
                        var _date = dateToProcess.getDate();
                        var _month = kony.apps.coe.ess.myTime.nToStr.month[dateToProcess.getMonth()].toUpperCase();
                        var status;
                        dataToSet.push({
                            "dayName": _dayName,
                            "date": String(parseInt(_date)),
                            "month": _month,
                            "completeDate": new Date(dateToProcess),
                            "status": "",
                            "timesheetId": "",
                        });
                        dateToProcess = dateToProcess.nextDay();
                    }
                    for (var i = 0; i < dataToSet.length; i++) {
                        if (tempRes[dataToSet[i].completeDate.toYYYYMMDD("")] === null || tempRes[dataToSet[i].completeDate.toYYYYMMDD("")] === undefined) {
                            dataToSet[i].status = "-1";
                            dataToSet[i].timesheetId = "";
                        } else {
                            dataToSet[i].status = tempRes[dataToSet[i].completeDate.toYYYYMMDD("")].Status_Id;
                            dataToSet[i].timesheetId = tempRes[dataToSet[i].completeDate.toYYYYMMDD("")].Id;
                        }
                    }
                    scopeObj.bindData.call(scopeObj, dataToSet);
                }

                function error(err) {
                    handleError(err);
                }

            } else {
                var processedData = {};
                processedData.timeEntries = kony.apps.coe.ess.myTime.ViewTimeSheetUI.getProcessedData(data.timeSheetEntries);
                processedData.commentsData = kony.apps.coe.ess.myTime.ViewTimeSheetUI.processTimesheetComments(data.timeSheetComments);
                scopeObj.bindData.call(scopeObj, processedData);
                return processedData;
            }
            //           	this.bindData.call(this, processedData,dataToSet);
        } catch (err) {
            alert(err);
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
     * @memberof frmViewTimeSheetControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

            if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig === "daily") {
                var weekDayListObj = kony.apps.coe.ess.myTime.ViewTimeSheetUI.weekDaysList.getInstance();
                weekDayListObj.widgetsDataMap = {
                    "lblDayName": "dayName",
                    "lblDate": "date",
                    "lblMonthName": "month"
                };
                weekDayListObj.propertiesToSet = {
                    "lblDayName": "text",
                    "lblDate": "text",
                    "lblMonthName": "text"
                };
                weekDayListObj.onSelectionCallback = function(res, index) {
                    if (index === null) {
                        var timesheetString = "IN(";
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].timesheetId !== "") {
                                timesheetString = timesheetString + "'" + String(res[i].timesheetId).trim() + "',";
                            }
                        }
                        timesheetString = timesheetString.substring(0, timesheetString.length - 1);
                        timesheetString = timesheetString + ")";
                        var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id " + timesheetString + "AND te.StatusId != '3';";
                        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successForAllData, error);

                        function successForAllData(res) {
                            var processedData;
                            processedData = kony.apps.coe.ess.myTime.ViewTimeSheetUI.getProcessedData(res);
                            kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToViewTimeSheet(processedData);
                        }

                        function error() {
                            handleError();
                        }
                    } else {
                        if (res.status === "1" || res.status === "6") {
                            kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = true;
                        } else {
                            kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = false;
                        }

                        if (res.status === "-1" || res.status === "5") {
                            showTimesheetHomeForm(res.completeDate);
                        }
                        var timesheetId;
                        timesheetId = res.timesheetId;
                        if (timesheetId === null || timesheetId === undefined || timesheetId === "") {
                            return;
                        } else {
                            var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id='" + timesheetId + "' AND te.StatusId != '3';";
                            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, error);
                        }

                        function success(res) {
                            var processedData;
                            processedData = kony.apps.coe.ess.myTime.ViewTimeSheetUI.getProcessedData(res);
                            kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToViewTimeSheet(processedData);
                        }

                        function error(err) {
                            handleError(err);
                        }
                    }
                };

                var selectedIndex;
                for (var i = 0; i < data.length; i++) {

                    if (data[i].timesheetId === kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId)
                        selectedIndex = i;
                }
                kony.print("---- setData in weekDayListObj");
                weekDayListObj.setData(data);
                frmViewTimeSheet.flxDatesSection.isVisible = false;
                frmViewTimeSheet.flxweekDays.isVisible = true;
                frmViewTimeSheet.segComments.isVisible = false;
                frmViewTimeSheet.flxCloneButtons.top = "-3%"
                weekDayListObj.setSelectedItem(selectedIndex);
            } else {
                kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToViewTimeSheet(data.timeEntries);
                kony.apps.coe.ess.myTime.ViewTimeSheetUI.setDataToTimesheetComments(data.commentsData);
                frmViewTimeSheet.flxDatesSection.isVisible = true;
                frmViewTimeSheet.flxweekDays.isVisible = false;
            }
            this.getController().showForm();
            frmViewTimeSheet.btnClone.width = (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected === true) ? "50%" : "100%";
            kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
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
     * @memberof frmViewTimeSheetControllerExtension#
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
     * @memberof frmViewTimeSheetControllerExtension#
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
     * @memberof frmViewTimeSheetControllerExtension#
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