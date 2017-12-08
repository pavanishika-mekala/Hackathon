/*
 * Controller Extension class for frmTimesheetHome
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.timesheetHome = kony.apps.coe.ess.myTime.timesheetHome || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmTimesheetHomeControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmTimesheetHomeControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /**
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config
     * @memberof frmTimesheetHomeControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            //             this.$class.$superp.fetchData.call(this, success, error);
            //Fetch Timesheet Defination
            var extremeDates = kony.apps.coe.ess.myTime.TimesheetDatesSection.getCurrentTimesheetData(this.getController().getContextData());
            for (var i = 0; i < extremeDates.length; i++) {
                extremeDates[i].timesheetId = null;
                extremeDates[i].status = null;
            }
            //dateSectionData will be prepared by here. Passing it to Success
            success(extremeDates);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            //             kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            //             kony.sdk.mvvm.log.error(exception.toString());
            alert("Error in fetchData of controllerExtension" + err);
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
     * @memberof frmTimesheetHomeControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            //             var processedData = this.$class.$superp.processData.call(this, data);
            //             this.getController().bindData(processedData);
            //             return processedData;
            //We do not need to process data here.
            this.getController().bindData(data);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            //             kony.sdk.mvvm.log.error(exception.toString());
            alert("Error in procData of controllerExtension" + JSON.stringify(err));
        }
    },
    /**
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmTimesheetHomeControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            //             this.$class.$superp.bindData.call(this, data);
            //             this.getController().getFormModel().formatUI();
            //Bind data to UI here
            kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.getInstance().setHeaderConfiguration();
            kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj = new kony.apps.coe.ess.myTime.TimesheetRow();
            //kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj = new kony.apps.coe.ess.myTime.TimesheetDatesSection(frmTimesheetHome.flxDateInDateSection, frmTimesheetHome.flxScrlDatesSection);
            if (kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj === null || kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj === undefined) {
                kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj = new kony.apps.coe.ess.myTime.TimesheetDatesSection(frmTimesheetHome.flxDateInDateSection, frmTimesheetHome.flxScrlDatesSection);
            }
            kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.labelDataMap = "displayValue";
            kony.print("---- setData in TimesheetDatesSectionObj");
            kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.setData(data); //Setting Data
            kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.setOnSelectionCallback(kony.apps.coe.ess.myTime.timesheetHome.onDateSelection); //ToDo : Add Function Here

            var date = this.getController().getContextData();
            for (var i = 0; i < data.length; i++) {
                if (date.compareOnlyDate(data[i].startDate) >= 0 && date.compareOnlyDate(data[i].endDate) <= 0) {
                    kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.setSelectedItem(i);
                    break;
                }
            }
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
            if (kony.apps.coe.ess.Sync.syncOnLandingForm) {
                kony.apps.coe.ess.Sync.syncOnLandingForm = false;
                kony.apps.coe.ess.Sync.syncAsynchronously();
            }

            kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            alert(exception.toString());
        }

    },
    /**
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config
     * @memberof frmTimesheetHomeControllerExtension#
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
     * @memberof frmTimesheetHomeControllerExtension#
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
     * @memberof frmTimesheetHomeControllerExtension#
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

/**
 * Get timesheet_id for given dates string. Dates should be in DDDDMMYY format
 * @param {string} $fromDateString
 *		Timesheet start date stringShould be in DDDDMMYY format
 * @param {string} $toDateString
 *		Timesheet end date stringShould be in DDDDMMYY format
 * @param {function({string})} $successCall
 *		Success Callback. Id of timesheet is returned or passed as input param
 * @param {function({string})} $failureCall
 *		Failure or Error Callback. Error is passed as input param
 */

kony.apps.coe.ess.myTime.getTimesheetID = function(fromDateString, toDateString, successCall, failureCall) {
    var sqlQuery = "select id from timesheet where start_date >= \'" + fromDateString + "\' and end_date <= \'" + toDateString + "\'";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(res) {
        //Query Success
        if (res.length !== 0) {
            //Means, Timesheet is already in database
            successCall(res[0].Id);
            return;
        }
        kony.print("No timesheet id for the corresponding dates");
        // End of Create Part
    }, function(err) {
        //Query Failure
        failureCall(err);
    }, false);
};

/**
 * Fetch all Time Entries for given timesheet_id and dates
 * @param {string} $timesheetID
 *		Timesheet ID
 * @param {string} $fromDate
 *		Time sheet entries which are above this date. Should be in DDDDMMYY format
 * @param {string} $toDate
 *		Timesheet entries whihc are below this date. Should be in DDDDMMYY format
 * @param {function(Object[])} $successCall
 *		Success Callback. Array of Task Entries are returned/passed as input param
 * @param {function({Object})} $failureCall
 *		Failure Callback. Reason for falire is passed as input param
 */
kony.apps.coe.ess.myTime.timesheetHome.fetchTimeEntries = function(timesheetID, weekStart, weekEnd, successCall, failureCall) {
    var fromDate = weekStart.toYYYYMMDD("");
    var toDate = weekEnd.toYYYYMMDD("");
    // 	var sqlQuery = "select te.id, te.date, te.start_time, te.end_time, p.isBillable, case when pt.task_id='' then p.project_name else t.task_name  end as Name, s.status_name as status from time_entry te join project_task pt on pt.id = te.project_task_id join project p on p.id = pt.project_id left join task t on pt.task_id = t.id left join status s on te.statusid = s.id where te.timesheet_id = '" + timesheetID + "' and te.date >= " + fromDate + " and te.date <= " + toDate + " ;";
    var sqlQuery = "SELECT TE.Id, PT.Type as Project_Task_Type, TE.Date, TE.Start_Time, TE.StatusId as StatusId, TE.End_Time, TE.Project_Task_id, TE.Time_Type_Id, TE.Activity_Description," +
        " CASE WHEN P.isBillable IS NULL THEN 0 ELSE P.isBillable END as isBillable," +
        " CASE WHEN TE.Project_Task_Id IS NULL OR TE.Project_Task_Id IS 'NULL' OR TE.Project_Task_id IS '' THEN TT.Name" +
        " WHEN PT.Task_Id = '' THEN P.Project_Name" +
        " ELSE T.Task_Name END as Name, S.Status_Name as Status FROM Time_Entry TE" +
        " LEFT JOIN Project_Task PT on TE.Project_Task_Id = PT.Id" +
        " LEFT JOIN Project P on PT.Project_Id = P.Id" +
        " LEFT JOIN Task T on PT.Task_Id = T.id" +
        " LEFT JOIN Status S on TE.StatusId = S.Id" +
        " LEFT JOIN Time_Type TT on TE.Time_Type_Id = TT.Id" +
        //         " WHERE TE.Timesheet_Id = '"+timesheetID+"' "+
        " WHERE TE.Date >= '" + fromDate + "' " +
        " AND TE.Date <= '" + toDate + "' " +
        " AND TE.StatusId != '3'";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(res) {
        //Query Success
        kony.apps.coe.ess.myTime.timesheetHome.processTimesheetEntries(res, successCall);
    }, function(err) {
        //Query Failed
        failureCall(err);
    });
};

/**
 * Process timesheet entries data queries from SQLite
 * @param {Object} $res
 * 		Response : TimeEntry Data Array. Response will be {[Date,End_Time,Start_Time,Name,isBillable]} format
 * @param {function(Object[])} $successCall
 *		Success Callback. Array of Task Entries are returned/passed as input param
 */
kony.apps.coe.ess.myTime.timesheetHome.processTimesheetEntries = function(res, successCall) {
    var stringToDate = function(dateString) {
        return new Date(dateString.substring(0, 4), parseInt(dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
    };
    var addTimeToDate = function(dateObj, timeString) {
        var result = new Date(dateObj);
        result.setHours(timeString.substring(0, 2));
        result.setMinutes(timeString.substring(2, 4));
        return result;
    };
    var tempstartdate = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.getSelectedItemData().startDate;
    //Array of all Week Data.
    var allweekdays = [];
    for (var i = 0; i < 7; i++) {
        var data = {
            date: (new Date(Date.parse(tempstartdate) + i * 86400000)).toYYYYMMDD(""),
            daystatus: "-1",
            tasks: []
        };
        allweekdays.push(data);
    }
    var datatree = new kony.apps.coe.RedBlackTree();
    for (var i = 0; i < res.length; i++) {
        datatree.insert(res[i].Date, res[i]);
    }

    for (var i = 0; i < allweekdays.length; i++) {

        var temptasks = datatree.get(allweekdays[i].date);
        if (temptasks !== null) {
            allweekdays[i].tasks = temptasks;
        }
    }

    for (var i = 0; i < allweekdays.length; i++) {
        kony.print("---- Before:" + allweekdays[i].date);
        var year = parseInt(allweekdays[i].date.substr(0, 4));
        var month;
        if (allweekdays[i].date[4] === '0') {
            month = parseInt(allweekdays[i].date[5]);
        } else {
            month = parseInt(allweekdays[i].date.substring(4, 6));
        }
        var date; // = parseInt(allweekdays[i].date.substring(6, 8));
        if (allweekdays[i].date[6] === '0') {
            date = parseInt(allweekdays[i].date[7]);
        } else {
            date = parseInt(allweekdays[i].date.substring(6, 8));
        }

        allweekdays[i].date = new Date(year, month - 1, date);
        kony.print("------------ date: " + allweekdays[i].date);
        //allweekdays[i].date = stringToDate(allweekdays[i].date);

        for (var j = 0; j < allweekdays[i].tasks.length; j++) {
            var temp = allweekdays[i].tasks[j];
            allweekdays[i].tasks[j] = {
                taskname: temp.Name === null || temp.Name === "" ? temp.Project_Task_id : temp.Name,
                starttime: addTimeToDate(allweekdays[i].date, temp.Start_Time),
                endtime: addTimeToDate(allweekdays[i].date, temp.End_Time),
                Project_Task_Id: temp.Project_Task_id,
                Project_Task_Type: temp.Project_Task_Type,
                TimeType_Id: temp.Time_Type_Id,
                Desc: temp.Activity_Description,
                isBillable: temp.isBillable,
                timeentry_id: temp.Id
            };
        }
    }

    successCall(allweekdays);
};

kony.apps.coe.ess.myTime.timesheetHome.updateStatusForAllRows = function(date, data) {
    kony.apps.coe.ess.myTime.getTimesheetDataForADate(date, function(data, tsd) {
        var timesheetinterval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
        if (tsd !== null) {
            for (var i = 0; i < data.length; i++) {
                data[i].daystatus = tsd.Status_Id;
            }
            kony.print("---- setData in TimesheetRowObj if");
            kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.setData(data, timesheetinterval[0], timesheetinterval[1]);
        } else {
            kony.print("---- setData in TimesheetRowObj else");
            kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.setData(data, timesheetinterval[0], timesheetinterval[1]);
        }
    }.bind(this, data));
};

kony.apps.coe.ess.myTime.timesheetHome.onDateSelection = function(weekData) {


    var date = null;
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "monthly" &&
        parseInt(kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj._selectedItem) === 0) {
        date = weekData.endDate;
    } else {
        date = weekData.startDate;
    }
    //Set UI Here
    var callback = function(weekData, tsd) {
            var tsid = null;
            if (tsd !== null) {
                tsid = tsd.Id;
            }
            kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj._data[kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj._selectedItem].timesheetId = tsid;
            frmTimesheetHome.lblCurrentDateMonth.text = kony.apps.coe.ess.myTime.nToStr.fullmonth[weekData.startDate.getMonth()];
            frmTimesheetHome.lblCurrentDateYear.text = weekData.startDate.getFullYear().toFixed(0);
            kony.apps.coe.ess.myTime.timesheetHome.fetchTimeEntries(weekData.timesheetId, weekData.startDate, weekData.endDate, function(res) {
                //FetchTimesheetEntries Success

                kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.setOnSelectionCallbackRight(function(data) {
                    var arr = kony.ds.read(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.RecentTasksIdForKonyStore);
                    kony.print("---Local storage: " + JSON.stringify(arr));
                    if (data.tasks !== undefined && data.tasks !== null && data.tasks.length > 0) {
                        showTimesheetCreateForm(data);
                        frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
                        frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = true;
                        frmTimeSheetCreate.lblSummary.setVisibility(true);
                        frmTimeSheetCreate.labPopupHeader.top = "17.5%";
                        frmTimeSheetCreate.flxScrTimeEntrySummary.isVisible = true;
                        frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
                        frmTimeSheetCreate.flxTotalTime.setVisibility(true);
                        frmTimeSheetCreate.btnDone.setVisibility(false);
                        frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(true);
                    } else if (arr !== undefined && (arr === null || arr.length < 0)) {
                        showTimesheetCreateForm(data);
                        kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
                        frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
                        frmTimeSheetCreate.flxTotalTime.setVisibility(false);
                    } else {
                        showTaskListForm();
                        frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
                        frmTimeSheetCreate.flxTotalTime.setVisibility(false);
                    }

                });
                if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "monthly" &&
                    parseInt(kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj._selectedItem) === 0) {
                    kony.apps.coe.ess.myTime.TimesheetCreate.validateSubmitButtonVisibility(weekData.endDate);
                    kony.apps.coe.ess.myTime.timesheetHome.updateStatusForAllRows(weekData.endDate, res);
                } else {
                    kony.apps.coe.ess.myTime.TimesheetCreate.validateSubmitButtonVisibility(weekData.startDate);
                    kony.apps.coe.ess.myTime.timesheetHome.updateStatusForAllRows(weekData.startDate, res);
                }
            }, function(err) {
                //fetchTimesheetEntries Error
                handleError(err);
            });
        }
        .bind(this, weekData);
    kony.apps.coe.ess.myTime.getTimesheetDataForADate(date, callback);
};