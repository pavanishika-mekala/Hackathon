/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.TimesheetCreate = kony.apps.coe.ess.myTime.TimesheetCreate || {};
//Variables to store unqiue gesture ids
kony.apps.coe.ess.myTime.TimesheetCreate.timeEntryGesture = null;
kony.apps.coe.ess.myTime.TimesheetCreate.leaveEntryGesture = null;
kony.apps.coe.ess.myTime.TimesheetCreate.removeGestureAndSwipeAnimation = false;

kony.apps.coe.ess.myTime.TimesheetCreate.AddTimelineToForm = function() {
    try {
        var tasks = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.tasks;
        var oldestTaskHour = 24;

        function makeItTwoDigits(x) {
            x = parseInt(x);
            if (x < 10) {
                return "0" + x;
            } else {
                return "" + x;
            }
        }

        function convertHoursMinutesForTimeline(hour, min) {
            var isPM = false;
            if (hour >= 12) {
                isPM = true;
            }
            if (hour === 0) {
                hour = 12;
            }
            if (hour >= 13) {
                hour -= 12;
            }
            var finalTime = "" + hour;
            if (min > 0) {
                finalTime += "." + makeItTwoDigits(min);
            }
            if (isPM) {
                finalTime += " PM";
            } else {
                finalTime += " AM";
            }
            return finalTime;
        }
        var tempdata = [];
        for (var i = 0; i < tasks.length; i++) {
            tempdata.push({
                Project_Task_Id: tasks[i].Project_Task_Id,
                TimeType_Id: tasks[i].TimeType_Id,
                Time_Entry_Id: tasks[i].timeentry_id,
                Start_Time: convertHoursMinutesForTimeline(tasks[i].starttime.getHours(), tasks[i].starttime.getMinutes()),
                End_Time: convertHoursMinutesForTimeline(tasks[i].endtime.getHours(), tasks[i].endtime.getMinutes()),
                Task_Name: tasks[i].taskname,
                isBillable: tasks[i].isBillable,
                Project_Task_Type: tasks[i].Project_Task_Type,
                Desc: tasks[i].Desc,
                Time_Line_Status: null
            });

            if (oldestTaskHour > tasks[i].starttime.getHours()) {
                oldestTaskHour = tasks[i].starttime.getHours();
            }
        }

        if (oldestTaskHour == 24) {
            kony.apps.coe.Reusable.TimelineCreation.initialScrollHour = kony.apps.coe.ess.appconfig.defaultSliderStartTime;
        } else {
            kony.apps.coe.Reusable.TimelineCreation.initialScrollHour = convertHoursMinutesForTimeline(oldestTaskHour, 0);
        }
        preshowfrmhome();
        frmTimeSheetCreate.flxTimeLine.removeAll();
        var slider = new kony.apps.coe.Reusable.TimelineCreation();
        slider.drawSliderUI(frmTimeSheetCreate.flxTimeLine, 12, 12);
        slider.setCallback(kony.apps.coe.ess.myTime.TimesheetCreate.Slider.onStartEditing,
            kony.apps.coe.ess.myTime.TimesheetCreate.Slider.onDoneEditing);
        frmTimeSheetCreate.postShow = function() {
            try {
                kony.print("---- frmTimeSheetCreate postShow start ----");
                if (kony.apps.coe.ess.globalVariables.taskSelectedOnEdit == false) {
                    slider.storeCoordinatesOfTimeLine();
                }
                if (!kony.apps.coe.ess.globalVariables.notFirstTask) {
                    if (kony.apps.coe.ess.globalVariables.taskSelectedOnEdit == false) {
                        slider.fillTimeline(tempdata);
                        //The following two lines serves as a hack for deleting time entries for a day
                        kony.apps.coe.ess.myTime.TimesheetCreate.onClickCopyButton();
                        kony.apps.coe.ess.myTime.TimesheetCreate.onClickCopyButton();
                        if (frmTimeSheetCreate.btnDone.isVisible == false) {
                            frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(true);
                        } else {
                            frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(false);
                        }
                    }
                }
            } catch (error) {
                handleError(error);
            }
            kony.print("---- frmTimeSheetCreate postShow end ----");
        };
    } catch (error) {
        handleError(error);
    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.validateSubmitButtonVisibility = function(date) {
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig === "daily") {
        frmTimesheetHome.btnSubmit.isVisible = false;
        return;
    } else {
        frmTimesheetHome.btnSubmit.isVisible = true;
    }
    kony.apps.coe.ess.myTime.getTimesheetDataForADate(date, function(date, tsd) {
            if (tsd === null) {
                kony.apps.coe.ess.myTime.TimesheetHome.config.disableSubmitBtn();
                return;
            }
            if (tsd.Status_Id !== "5" && tsd.Status_Id !== "1" && tsd.Status_Id !== "6") {
                kony.apps.coe.ess.myTime.TimesheetHome.config.disableSubmitBtn(tsd.Status_Id);
                return;
            }
            var tsid = tsd.Id;
            var timesheetStatusCheckSuccessCallback = function(date, tsid, res) {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].Status_Id === "5" || res[i].Status_Id === "1" || res[i].Status_Id === "6") {
                            var status_Id = res[i].Status_Id;
                            var successCallbackTimeEntry = function(date, res) {
                                    var successCallbackHoliday = function(date, timeentryres, holires) {
                                            var timeentryset = {};
                                            var holidayset = {};
                                            var i;
                                            for (i = 0; i < timeentryres.length; i++) {
                                                timeentryset[timeentryres[i].Date] = "";
                                            }
                                            for (i = 0; i < holires.length; i++) {
                                                holidayset[holires[i].Date] = "";
                                            }
                                            var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
                                            for (var startdate = interval[0]; startdate.compareOnlyDate(interval[1]) <= 0; startdate = new Date(Date.parse(startdate) + 86400000)) {
                                                var temp = startdate.toYYYYMMDD("");
                                                if (timeentryset[temp] === undefined && holidayset[temp] === undefined) {
                                                    kony.apps.coe.ess.myTime.TimesheetHome.config.disableSubmitBtn(status_Id);
                                                    return;
                                                }
                                            }
                                            kony.apps.coe.ess.myTime.TimesheetHome.config.enableSubmitBtn();
                                        }
                                        .bind(this, date, res);
                                    var query = "select h.Holiday_Date as Date from Holiday h;";
                                    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallbackHoliday, function(err) {
                                        handleError(err);
                                    });
                                }
                                .bind(this, date);
                            var query = "select te.Date as Date from Time_Entry te where te.Timesheet_Id = '" + tsid + "' AND te.StatusId != '3';";
                            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallbackTimeEntry, function(err) {
                                handleError(err);
                            });

                        } else {
                            kony.apps.coe.ess.myTime.TimesheetHome.config.disableSubmitBtn(res[i].Status_Id);
                        }
                        break;
                    }
                }
                .bind(this, date, tsid);
            var query = "select t.Status_Id as Status_Id from Timesheet t where t.Id = '" + tsid + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, timesheetStatusCheckSuccessCallback, function(err) {
                handleError(err);
            });
        }
        .bind(this, date));
};

kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig = {
    onClickOfAddTaskInPopup: function() {
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = frmTimeSheetCreate.txtBoxSearch.text;
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = "CC";
        //         frmTimeSheetCreate.lblSelectedProjectName.text = frmTimeSheetCreate.txtBoxSearch.text;
        frmTimeSheetCreate.lblCostCenterId.text = "";
        frmTimeSheetCreate.lblSelectedTaskName.text = "";
        frmTimeSheetCreate.lblActivityId.text = "";
        frmTimeSheetCreate.lblSelectedTaskTimeType.text = "";
        frmTimeSheetCreate.tbxSelectedTaskDescription.text = "";
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedTaskTimeType();
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
        kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(frmTimeSheetCreate.txtBoxSearch.text);
        kony.apps.coe.ess.myTime.TimesheetCreate.Search.contractAnimation();
        frmTimeSheetCreate.flxSelectedTask.setEnabled(true);
    },

    showSearchButton: function() {
        frmTimeSheetCreate.flxOnlineSearch.setVisibility(true);
    },
    hideSearchButton: function() {
        frmTimeSheetCreate.flxOnlineSearch.setVisibility(false);
    },

    showSearchPopup: function() {
        frmTimeSheetCreate.lblSearchedTerm.text = frmTimeSheetCreate.txtBoxSearch.text;
        frmTimeSheetCreate.lblSearchOnlineSuggestion.text = "Search " + frmTimeSheetCreate.txtBoxSearch.text + " Online";
        frmTimeSheetCreate.lblSearcAddTaskSuggestion.text = "Add " + frmTimeSheetCreate.txtBoxSearch.text + " as Task";
        frmTimeSheetCreate.flxSearchPopup.setVisibility(true);
    },
    hideSearchPopup: function() {
        frmTimeSheetCreate.flxSearchPopup.setVisibility(false);
    },

    showCancelButton: function() {
        frmTimeSheetCreate.flxBtnCancel.setVisibility(true);
    },
    hideCancelButton: function() {
        kony.apps.coe.ess.globalVariables.isOnlineSearch = false;
        frmTimeSheetCreate.flxBtnCancel.setVisibility(false);
    }
};
kony.apps.coe.ess.myTime.TimesheetCreate.popups = {
    hideAllPopups: function() {
        frmTimeSheetCreate.flxBlank.isVisible = false;
        frmTimeSheetCreate.flxCloneTaskToPopup.isVisible = false;
        frmTimeSheetCreate.flxDeleteMenuPopup.isVisible = false;
        frmTimeSheetCreate.flxDiscardPopup.isVisible = false;
        frmTimeSheetCreate.flxSuccessPopup.isVisible = false;
        frmTimeSheetCreate.flxpopuptimeline.isVisible = false;
        frmTimeSheetCreate.flxpopuptask.isVisible = false;
        frmTimeSheetCreate.flxPopupCloneSuccessful.isVisible = false;
        frmTimeSheetCreate.flxPopupCloneError.isVisible = false;
        frmTimeSheetCreate.flxPopupClone.isVisible = false;
        frmTimeSheetCreate.flxPopupEmpty.isVisible = false;
    },
    btnPopupDeleteTimelineConfirmOnClick: function() {
        var sliderObj = new kony.apps.coe.Reusable.TimelineCreation();
        sliderObj.deleteTimeline();
    },
    btnPopupDeleteTimelineCancleOnClick: function() {
        frmTimeSheetCreate.flxpopuptimeline.isVisible = false;
        frmTimeSheetCreate.flxBlank.isVisible = false;
    },
    btnPopupDeleteTaskConfirmOnClick: function() {
        var sliderObj = new kony.apps.coe.Reusable.TimelineCreation();
        sliderObj.deleteTask();
    },
    btnPopupDeleteTaskCancleOnClick: function() {
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    },
    btnPopupSubmissionOkOnClick: function() {
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    },
    btnPopupEmptyConfirmOnClick: function() {
        kony.print("---- btnPopupEmpty on click");
        //kony.application.getPreviousForm().show();
        if (kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length > 0) {
            var prevNoOfTasks = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length;
            var startIndex = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length - prevNoOfTasks;
            var len = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length;
            for (var index = prevNoOfTasks; index < len; index++) { //Updating the DB with new added tasks
                kony.apps.coe.ess.myTime.TimesheetCreate.Backend.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[index]);
                kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[index], kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
            }

            kony.apps.coe.ess.globalVariables.taskSelectedOnEdit = false;
            //showTimesheetCreateForm(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
            frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
            frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = true;
            frmTimeSheetCreate.flxScrTimeEntrySummary.isVisible = true;
            frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
            frmTimeSheetCreate.flxTotalTime.setVisibility(true);
            frmTimeSheetCreate.btnDone.setVisibility(false);
            frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(true);
            frmTimeSheetCreate.flexSlider.setVisibility(false);
            frmTimeSheetCreate.lblSummary.setVisibility(true);

            //kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
            //refreshAndShowTimesheetHomeForm();
        }
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    },
    btnPopupEmptyCancelOnClick: function() {
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    },
    popupCloneRowOnClick: function() {
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
        frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
        frmTimeSheetCreate.flxBlank.isVisible = true;
        frmTimeSheetCreate.flxPopupClone.isVisible = true;
    },
    onClickOfCloneTaskTo: function() {
        var selectedItemDates = frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems[0].date;
        var displayValue = frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems[0].lblDate;
        var data = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data;
        var validationForExistingTimeEntry = function(selectedItemDate, data, res) {
            function getDateObj(time) {
                var isPM = false;
                if (time.indexOf("PM") >= 0) {
                    isPM = true;
                }
                var x = time.split(".");
                var hh = parseInt(x[0]);
                var mm;
                if (x.length < 2) {
                    mm = "00";
                } else {
                    mm = parseInt(x[1]);
                }
                if (isPM && hh === 12) {
                    hh = 12;
                } else if (!isPM && hh === 12) {
                    hh = 0;
                } else if (hh >= 1 && isPM) {
                    hh += 12;
                }
                var tempdate = new Date(2016, 1, 24);
                return (tempdate.setHours(hh), tempdate.setMinutes(mm), tempdate.setSeconds(0), tempdate);
            }

            function HHMMSSToDateObj(str) {
                var tempdate = new Date(2016, 1, 24);
                return (tempdate.setHours(str.substring(0, 2)), tempdate.setMinutes(str.substring(2, 4)), tempdate.setSeconds(0), tempdate);
            }

            function isDeletable(curr, temp) {
                return curr.Start_Time - temp.Start_Time <= 0 && curr.End_Time - temp.End_Time >= 0;
            }

            function isAffected(curr, temp) {
                return !((temp.Start_Time < curr.Start_Time && temp.End_Time <= curr.Start_Time) || (temp.End_Time > curr.End_Time && temp.Start_Time >= curr.End_Time));
            }

            var cancelTimeEntry = function(id) {
                var Time_entry_record = {};
                Time_entry_record.Id = id;
                Time_entry_record.StatusId = "3";
                kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
            };

            var updateStartTimeOfTimeEntry = function(id, starttime) {
                var Time_entry_record = {};
                Time_entry_record.Id = id;
                Time_entry_record.Start_Time = starttime.toHHMMSS("");
                kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
            };

            var updateEndTimeOfTimeEntry = function(id, endtime) {
                var Time_entry_record = {};
                Time_entry_record.Id = id;
                Time_entry_record.End_Time = endtime.toHHMMSS("");
                kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
            };
            var current = {
                Start_Time: getDateObj(data.Start_Time),
                End_Time: getDateObj(data.End_Time)
            };
            var addNewEntryInDB = function(selectedItemDate, data, current) {
                var Time_entry_record = {};
                Time_entry_record.Employee_Id = kony.apps.coe.ess.globalVariables.employeeId;
                Time_entry_record.Date = (new Date(selectedItemDate)).toYYYYMMDD("");
                Time_entry_record.End_Time = current.End_Time.toHHMMSS("");
                Time_entry_record.Start_Time = current.Start_Time.toHHMMSS("");
                Time_entry_record.Time_Type_Id = data.TimeType_Id;
                Time_entry_record.Activity_Description = data.Desc;
                Time_entry_record.StatusId = "5";
                Time_entry_record.Project_Task_id = data.Project_Task_Id;
                Time_entry_record.Project_Task_Type = data.Project_Task_Type;
                kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.create(Time_entry_record);
            }.bind(this, selectedItemDate, data, current);

            for (var i = 0; i < res.length; i++) {
                var temp = {
                    Start_Time: HHMMSSToDateObj(res[i].Start_Time),
                    End_Time: HHMMSSToDateObj(res[i].End_Time)
                };
                if (isDeletable(current, temp)) {
                    cancelTimeEntry(res[i].Id);
                } else if (isAffected(current, temp)) {
                    if (temp.Start_Time < current.Start_Time) {
                        updateEndTimeOfTimeEntry(res[i].Id, current.Start_Time);
                    } else {
                        updateStartTimeOfTimeEntry(res[i].Id, current.End_Time);
                    }
                }
            }
            addNewEntryInDB();
        };
        var errorCallback = function(err) {
            kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
            kony.apps.coe.ess.myTime.TimesheetCreate.popups.showErrorPopup();
            handleError(err);
        };
        for (var i = 0; i < selectedItemDates.length; i++) {
            var tempfunc = validationForExistingTimeEntry.bind(this, selectedItemDates[i], data);
            var query = "select te.Id, te.Start_Time as Start_Time, te.End_Time as End_Time from Time_Entry te where te.Date = '" + (new Date(selectedItemDates[i])).toYYYYMMDD("") + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, tempfunc, errorCallback);
        }
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.showSuccessPopup(displayValue);
    },

    showCloneTaskToPopup: function() {
        var currentdate = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.date;
        var startdate, enddate;
        var segDataSet = [];
        if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig !== "weekly") {
            var timesheetdates = [];
            var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(currentdate, new Date(currentdate.getFullYear(), 1, 1));
            startdate = interval[0];
            enddate = interval[1];
            for (var i = startdate; i <= enddate; i = i.nextDay()) {
                if (i.compareOnlyDate(currentdate) !== 0) {
                    timesheetdates.push(i.toString());
                }
            }
            segDataSet.push({
                lblDate: "All Timesheet entries",
                date: timesheetdates
            });
        }
        startdate = currentdate.thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        var allweekdays = [];
        for (var i = 0; i < 7; i++) {
            var td = new Date(Date.parse(startdate) + i * 86400000);
            if (td.getDate() !== currentdate.getDate()) {
                allweekdays.push(td.toString());
            }
        }
        segDataSet.push({
            lblDate: "All Dates in week",
            date: allweekdays
        });
        var newdate = new Date();
        for (var i = 0; i < allweekdays.length; i++) {
            if (newdate.getDate() !== (new Date(allweekdays[i])).getDate()) {
                segDataSet.push({
                    lblDate: (new Date(allweekdays[i])).getDate() + " " + kony.apps.coe.ess.myTime.nToStr.week[(new Date(allweekdays[i])).getDay()],
                    date: [allweekdays[i]]
                });
            } else {
                segDataSet.push({
                    lblDate: "Today",
                    date: [allweekdays[i]]
                });
            }
        }
        kony.print("---- setData in showCloneTaskToPopup");
        frmTimeSheetCreate.segCloneTaskToPopup.setData(segDataSet);
        frmTimeSheetCreate.segCopyTimeEntry.setData(segDataSet);
        frmTimeSheetCreate.flxBlank.skin = "sknFlxBg000000";
        frmTimeSheetCreate.flxBlank.isVisible = true;
        frmTimeSheetCreate.flxCloneTaskToPopup.isVisible = true;
    },

    showDeleteMenuPopup: function() {
        frmTimeSheetCreate.flxBlank.skin = "sknFlxBg000000";
        frmTimeSheetCreate.flxBlank.isVisible = true;
        frmTimeSheetCreate.flxDeleteMenuPopup.isVisible = true;
    },

    showDiscardPopup: function() {
        frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
        frmTimeSheetCreate.flxBlank.isVisible = true;
        frmTimeSheetCreate.flxDiscardPopup.isVisible = true;
    },

    showErrorPopup: function(e) {
        frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
        frmTimeSheetCreate.flxBlank.isVisible = true;
        frmTimeSheetCreate.flxPopupCloneError.isVisible = true;
    },
    showSuccessPopup: function(displayDate) {
        frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
        frmTimeSheetCreate.flxBlank.isVisible = true;
        frmTimeSheetCreate.lblPopupDetailsCloneSuccessful.text = "Task successfully cloned to " + displayDate + ".";
        frmTimeSheetCreate.flxPopupCloneSuccessful.isVisible = true;
    },
    showEmptyPopup: function() {
        frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
        frmTimeSheetCreate.flxBlank.isVisible = true;
        frmTimeSheetCreate.flxPopupEmpty.isVisible = true;
    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle = {

    isWork: true,

    onClickOfWork: function(callback) {
        frmTimeSheetCreate.flxWork.skin = "sknFlxBg1c7393Op100";
        frmTimeSheetCreate.flxLeave.skin = "slFbox";
        frmTimeSheetCreate.imgWork.src = "work_active.png";
        frmTimeSheetCreate.imgLeave.src = "leave.png";
        this.isWork = true;
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
        frmTimeSheetCreate.lblSelectTimeType.text = kony.i18n.getLocalizedString("i18n.ess.frmCreateTask.selectTimeType") 
        kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
        frmTimeSheetCreate.tbxSelectedTaskDescription.setVisibility(true);
        frmTimeSheetCreate.flxContainerSelectTimeType.setVisibility(true);
        frmTimeSheetCreate.flxContainerSelectTask.setVisibility(true);
        frmTimeSheetCreate.imgRecentTasks.setVisibility(true);
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
        frmTimeSheetCreate.segLeaveSelection.setVisibility(false);
        frmTimeSheetCreate.segTimeType.setVisibility(false);
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.projectTask();
        if (callback !== null && callback !== undefined && typeof(callback) === "function") {
            callback(this.isWork);
        }
    },

    onClickOfLeave: function(callback) {
        frmTimeSheetCreate.flxWork.skin = "slFbox";
        frmTimeSheetCreate.flxLeave.skin = "sknFlxBg1c7393Op100";
        frmTimeSheetCreate.imgWork.src = "work.png";
        frmTimeSheetCreate.imgLeave.src = "leave_active.png";
        this.isWork = false;
        frmTimeSheetCreate.imgArrowDown.src = "arow_down.png"
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
        frmTimeSheetCreate.lblSelectTimeType.text = kony.i18n.getLocalizedString("i18n.ess.frmCreateTask.selectLeaveType") 
        frmTimeSheetCreate.segLeaveSelection.setVisibility(true);
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.leaves();
        frmTimeSheetCreate.segTimeType.setVisibility(false);
        frmTimeSheetCreate.tbxSelectedTaskDescription.setVisibility(false);
        frmTimeSheetCreate.flxContainerSelectTimeType.setVisibility(false);
        frmTimeSheetCreate.flxContainerSelectTask.setVisibility(false);
        frmTimeSheetCreate.imgRecentTasks.setVisibility(false);
        if (callback !== null && callback !== undefined && typeof(callback) === "function") {
            callback(this.isWork);
        }
    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection = {

    isBlocked: false,

    selectedItem: 0,

    onClickOfHours: function(callback) {
        var data = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
        if (data.length <= 1) {
            this.selectedItem = 0;
            frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
            frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
            frmTimeSheetCreate.btnManualSelectionHours.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
            frmTimeSheetCreate.btnManualSelectionFullDay.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
            var taskName = frmTimeSheetCreate.flexSlider.lblTaskName.text;
            if (callback !== null && callback !== undefined && typeof(callback) === "function") {
                callback(this.selectedItem);
                frmTimeSheetCreate.flexSlider.lblTaskName.text = taskName;
            }
        }
    },

    onClickOfFullDay: function(callback) {
        var data = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
        var entryCount = 0;
        for(var i=0; i<kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length; i++){
            if(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[i].data.Time_Line_Status !== "deleted"){
                entryCount++;
            }
        }
        if (this.isBlocked === false && entryCount <= 1) {
            this.selectedItem = 1;
            frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
            frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
            frmTimeSheetCreate.btnManualSelectionHours.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
            frmTimeSheetCreate.btnManualSelectionFullDay.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
            if (callback !== null && callback !== undefined && typeof(callback) === "function") {
                callback(this.selectedItem, kony.apps.coe.ess.appconfig.fullDayStartTime, kony.apps.coe.ess.appconfig.fullDayEndTime);
            }
        } else {
            toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.tasksarealreadyavailable"), 2000);
        }
    }

};

kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfLeaveTimeType = function(selectedItem) {
    //Commented to maaintain the current flow while creation 
    //     if (kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty) {
    //         frmTimeSheetCreate.segLeaveSelection.selectedRowIndex = null;
    //         return;
    //     }
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateLeaveName(selectedItem.Id);
    kony.apps.coe.Reusable.TimelineCreation.updateTaskName(selectedItem.Name);
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = null;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = selectedItem.Name;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = null;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Desc = "";
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.TimeType_Id = selectedItem.Id;
};

kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskTimeType = function(selectedItem) {
    frmTimeSheetCreate.lblTimeTypeSelect.text = selectedItem.Name;
    frmTimeSheetCreate.imgSelectIcon.setVisibility(true);
    frmTimeSheetCreate.segTimeType.setVisibility(false);
    frmTimeSheetCreate.imgArrowDown.src = "arow_down.png";
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.TimeType_Id = selectedItem.Id;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Time_Type_Name = frmTimeSheetCreate.lblTimeTypeSelect.text;
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateTimeType(selectedItem.Id);
};

kony.apps.coe.ess.myTime.TimesheetCreate.onDoneInActivityDesc = function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Desc = frmTimeSheetCreate.tbxSelectedTaskDescription.text;
};
kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskEditing = function(selectedTask) {
    frmTimeSheetCreate.show();
    var currentSlider = kony.apps.coe.ess.globalVariables.currentTask;
    kony.print("---- currentSlider: " + JSON.stringify(currentSlider));
    frmTimeSheetCreate.lblTaskName.text = selectedTask.projectName;
    kony.apps.coe.ess.globalVariables.taskSelectedOnEdit = true;

    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = selectedTask.projectId;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = selectedTask.projectType;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = selectedTask.projectName;

    frmTimeSheetCreate.lblCreateProjName.text = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name;
    frmTimeSheetCreate.lblCreateTaskName.text = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Name;
    frmTimeSheetCreate.lblCreateNO.text = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Id === "" ? "-" : kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Id;
    frmTimeSheetCreate.lblCreateAO.text = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id === "" ? "-" : kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id;
    kony.apps.coe.Reusable.TimelineCreation.scrollTimelineFrameSearch();
    return;
};
kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTask = function(selectedTask) {
    if (kony.apps.coe.Reusable.TimelineCreation.TimeSheetData && kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length > 0) {
        if (kony.apps.coe.ess.globalVariables.notFirstTask) {
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
        }
    }

    function updateSelectedTask() {
        var arr = kony.ds.read(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.RecentTasksIdForKonyStore);
        if (arr === null) {
            arr = [selectedTask.projectId];
        } else if (arr.length < 5) {
            var ind = arr.indexOf(selectedTask.projectId);
            if (ind >= 0) {
                arr.splice(ind, 1);
            }
            arr.push(selectedTask.projectId);
        } else {
            var ind = arr.indexOf(selectedTask.projectId);
            if (ind >= 0) {
                arr.splice(ind, 1);
                arr.push(selectedTask.projectId);
            } else {
                arr.shift();
                arr.push(selectedTask.projectId);
            }
        }
        kony.ds.save(arr, kony.apps.coe.ess.myTime.TimesheetCreate.Backend.RecentTasksIdForKonyStore);
        if (kony.application.getPreviousForm().id == "frmTimesheetHome") {
            showTimesheetCreateForm(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData());
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = selectedTask.projectId;
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = selectedTask.projectType;
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(selectedTask.projectId);
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateTimeType(null);
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateActivityDesc(null);
        } else {
            frmTimeSheetCreate.show();
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = selectedTask.projectId;
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = selectedTask.projectType;
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = selectedTask.projectName;
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(selectedTask.projectId);
            kony.apps.coe.ess.myTime.TimesheetCreate.settingTaskSummary(null, kony.apps.coe.ess.myTime.TimesheetCreate.updateSegment);
            //showTimesheetCreateForm(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData());
            frmTimeSheetCreate.flexSlider.isVisible = true;
            var taskName = frmTimeSheetCreate.flexSlider.lblTaskName.text;
            var left_distance = parseInt(frmTimeSheetCreate.flexSlider.left);
            var startTimeIndex = (new kony.apps.coe.Reusable.TimelineCreation()).search(left_distance, kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine);
            var right_distance = parseInt(frmTimeSheetCreate.flexSlider.left) + parseInt(frmTimeSheetCreate.flexSlider.width);
            var endTimeIndex = (new kony.apps.coe.Reusable.TimelineCreation()).search(right_distance, kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine);
            var startTime = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[startTimeIndex][1];
            var endTime = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[endTimeIndex][1];
            var taskName = frmTimeSheetCreate.flexSlider.lblTaskName.text;
            kony.print("---- startTimeIndex: " + JSON.stringify(startTimeIndex));
            kony.print("---- endTimeIndex: " + JSON.stringify(endTimeIndex));
            kony.print("---- startTime: " + startTime);
            kony.print("---- endTime: " + endTime);

            //To retain the slider in the selected timeline 
            kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(startTime, endTime);
            frmTimeSheetCreate.flexSlider.lblTaskName.text = taskName;
            kony.apps.coe.ess.globalVariables.taskSelectedOnEdit = true;
            kony.apps.coe.Reusable.TimelineCreation.scrollTimelineFrameSearch();
            frmTimeSheetCreate.flxTotalTime.setVisibility(false);
            frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
            if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
                frmTimeSheetCreate.flxTotalTime.setVisibility(true);
                frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
                frmTimeSheetCreate.flxCopy.setVisibility(false);
            }
        }
    }
    updateSelectedTask();

};


kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTime = function() {
    kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.filter(function(x) { return x !== null })
    var data = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
    kony.print("---- updateTotalTime: " + JSON.stringify(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData));

    function makeItTwoDigits(x) {
        x = parseInt(x);
        if (x < 10) {
            return "0" + x;
        } else {
            return "" + x;
        }
    }

    function getHHMMSS(time) {
        var isPM = false;
        if (time === null || time === undefined || time === "") {
            return {
                hh: 0,
                mm: 0,
                ss: 0
            };
        } else {
            if (time.indexOf("PM") >= 0) {
                isPM = true;
            }
            var x = time.split(".");
            var hh = parseInt(x[0]);
            var mm;
            if (x.length < 2) {
                mm = "00";
            } else {
                mm = parseInt(x[1]);
            }
            if (isPM && hh === 12) {
                hh = 12;
            } else if (!isPM && hh === 12) {
                hh = "00";
            } else if (hh >= 1 && isPM) {
                hh += 12;
            }
            return {
                hh: hh,
                mm: mm,
                ss: 0
            };
        }
    }
    var totalmin = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].totalHours !== null && data[i].totalHours !== undefined && data[i].totalHours !== "") {
            totalmin += data[i].actual_Hours * 60;
        } else {
            if (data[i].data.Time_Line_Status !== "deleted") {
                var st = getHHMMSS(data[i].startTime);
                var ed = getHHMMSS(data[i].endTime);
                var h = parseInt(ed.hh) - parseInt(st.hh);
                var m = parseInt(ed.mm) - parseInt(st.mm);
                totalmin += (h * 60 + m);

            }
        }
    }
    frmTimeSheetCreate.lblTotalTime.text = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.TotalTimeFilled") + parseInt(totalmin / 60) + ":" + parseInt(totalmin % 60) + " hours";
};


kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry = {

    updateLeaveName: function(id) {
        frmTimeSheetCreate.lblSelectedLeave.text = "";
        if (id === null || id === undefined || id === "") {
            return;
        }

        function success(res) {
            for (var i = 0; i < res.length; i++) {
                frmTimeSheetCreate.lblSelectedLeave.text = res[i].Name;
                break;
            }
        }
        var query = "select tt.Name as Name from Time_Type tt where tt.ID = '" + id + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
            handleError(res);
        });
    },

    updateProjectTaskName: function(Project_Task_Id) {

        frmTimeSheetCreate.lblCreateProjName.text = "";
        frmTimeSheetCreate.lblCreateTaskName.text = "";
        frmTimeSheetCreate.lblCreateNO.text = "";
        frmTimeSheetCreate.lblCreateAO.text = "";

        frmTimeSheetCreate.lblToSelectTask.setVisibility(false);
        frmTimeSheetCreate.lblCreateProjName.setVisibility(true);
        frmTimeSheetCreate.lblCreateTaskName.setVisibility(true);
        frmTimeSheetCreate.lblCreateNO.setVisibility(true);
        frmTimeSheetCreate.lblCreateAO.setVisibility(true);

        if (Project_Task_Id === null || Project_Task_Id === undefined || Project_Task_Id === "") {
            return;
        }

        function successCallback(res) {
            if (res === null || res.length <= 0) {
                kony.apps.coe.Reusable.TimelineCreation.updateTaskName(Project_Task_Id);
                kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = Project_Task_Id;
                frmTimeSheetCreate.lblCreateProjName.text = "" + Project_Task_Id.toString().titleCase();
                return;
            }
            var Project_Id = "";
            var Task_Id = "";
            for (var i = 0; i < res.length; i++) {
                Project_Id = res[i].Project_Id;
                Task_Id = res[i].Task_Id;
            }

            if (Task_Id !== null && Task_Id !== undefined && Task_Id !== "") {
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", "select t.Task_Name as name, t.Type as type from Task t where t.Id = '" + Task_Id + "';",
                    function(res) {

                        for (var i in res) {
                            kony.apps.coe.Reusable.TimelineCreation.updateTaskName(res[i].name);
                            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = res[i].name;
                            frmTimeSheetCreate.lblCreateTaskName.text = res[i].name;
                            frmTimeSheetCreate.lblCreateAO.text = res[i].type + " - " + String(Task_Id).replace(res[i].type, "");
                            break;
                        }
                    },
                    function(res) {
                        handleError(res);
                    });
            } else {
                frmTimeSheetCreate.lblCreateTaskName.text = "";
                frmTimeSheetCreate.lblCreateAO.text = "";
                frmTimeSheetCreate.lblCreateTaskName.setVisibility(false);

            }
            if (Project_Id !== null && Project_Id !== undefined && Project_Id !== "") {
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME",
                    "select p.Project_Name as name, p.Project_Type as type from Project p where p.Id = '" + Project_Id + "';",
                    function(res) {
                        for (var i in res) {
                            if (Task_Id === null || Task_Id === undefined || Task_Id === "") {
                                kony.apps.coe.Reusable.TimelineCreation.updateTaskName(res[i].name);
                                kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = res[i].name;
                            }
                            frmTimeSheetCreate.lblCreateProjName.text = res[i].name.toString().titleCase();
                            frmTimeSheetCreate.lblCreateNO.text = res[i].type + " - " + String(Project_Id).replace(res[i].type, "");
                            break;
                        }
                    },
                    function(res) {
                        handleError(res);
                    });
            } else {
                frmTimeSheetCreate.lblCreateProjName.text = "";
                frmTimeSheetCreate.lblCreateNO.text = "";
            }
        }
        var query = "select pt.Project_Id as Project_Id, pt.Task_Id as Task_Id from Project_Task pt where pt.ID = '" + Project_Task_Id + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, function(res) {
            handleError(res);
        });

    },

    updateTimeType: function(id) {
        frmTimeSheetCreate.lblSelectedTaskTimeType.text = "";
        if (id === null || id === undefined || id === "") {
            return;
        }

        function success(res) {
            for (var i = 0; i < res.length; i++) {
                frmTimeSheetCreate.lblSelectedTaskTimeType.text = res[i].Name;
                break;
            }
        }
        var query = "select tt.Name as Name from Time_Type tt where tt.ID = '" + id + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
            handleError(res);
        });
    },

    updateActivityDesc: function(time_entry_id) {
        frmTimeSheetCreate.tbxSelectedTaskDescription.text = "";
        if (time_entry_id === null || time_entry_id === undefined || time_entry_id === "") {
            return;
        }

        function success(res) {
            for (var i = 0; i < res.length; i++) {
                frmTimeSheetCreate.tbxSelectedTaskDescription.text = res[i].Desc;
                break;
            }
        }
        var query = "select te.Project_Task_id as Project_Task_Id, te.Time_Type_Id as Time_Type_Id, te.Activity_Description as Desc from Time_Entry te where te.ID = '" + time_entry_id + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
            handleError(res);
        });
    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.isLeaveTimeType = function(time_type_id, callback, data) {
    if (time_type_id === null || time_type_id === undefined) {
        callback(false, data);
        return;
    }

    function success(res) {
        if (res === null || res === undefined || res.length <= 0) {
            callback(false, data);
            return;
        }
        callback(true, data);
    }
    var query = "select tt.ID, ttc.ID as Time_Type_Category_Id from Time_Type tt left join Time_Type_Category ttc on tt.Time_Type_Category_Id=ttc.id where ttc.Type='ABSENT' AND tt.ID='" + time_type_id + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
        handleError(res);
    });
};


kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig = {

    flxScrTimeTypeGestureId: null,

    showTasks: function(data) {
        frmTimeSheetCreate.flxSelectedLeave.isVisible = false;
        frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = false;
        frmTimeSheetCreate.flxProjectTaskSelection.isVisible = true;
        frmTimeSheetCreate.tbxSelectedTaskDescription.text = "";
        frmTimeSheetCreate.lblSummary.setVisibility(false);
        frmTimeSheetCreate.labPopupHeader.top = "30.5%";
    },

    showSelectedTaskTimeType: function(data) {
        frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
        frmTimeSheetCreate.flxSelectedLeave.isVisible = false;
        frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = true;
        frmTimeSheetCreate.lblSummary.setVisibility(true);
        frmTimeSheetCreate.labPopupHeader.top = "17.5%";
    },

    showSelectedLeave: function() {
        frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
        frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = false;
        frmTimeSheetCreate.flxSelectedLeave.isVisible = true;
        frmTimeSheetCreate.lblSummary.setVisibility(false);
        frmTimeSheetCreate.labPopupHeader.top = "30.5%";
    },

    OnClickFlxScrollUp: function() {
        kony.print("-- in OnClickFlxScrollUp--");
    },
    OnClickFlxScrollDown: function() {
        kony.print("-- in OnClickFlxScrollDown--");
    },
    scrollDownToShowSelectedTask: function() {
        kony.print("-- in scrollDownToShowSelectedTask--");

        //         //#ifdef iphone
        //         if (!frmTimeSheetCreate.flxTimeType.isVisible) {
        //             return;
        //         }
        //         if (this.flxScrTimeTypeGestureId !== null) {
        //             frmTimeSheetCreate.flxScrTimeType.removeGestureRecognizer(this.flxScrTimeTypeGestureId);
        //         }
        //         frmTimeSheetCreate.flxScrTimeType.contentOffset = {
        //             x: "0%",
        //             y: "0%"
        //         };
        //         this.flxScrTimeTypeGestureId = frmTimeSheetCreate.flxScrTimeType.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
        //             fingers: 1,
        //             swipedistance: 40,
        //             swipevelocity: 50
        //         }, function(commonWidget, gestureInfo, context) {
        //             if (gestureInfo.swipeDirection === 3) {
        //                 kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollUpToHideSelectedTask();
        //             }
        //         });
        //         //#endif
    },
    scrollUpToHideSelectedTask: function() {
        //         //#ifdef iphone
        //         if (!frmTimeSheetCreate.flxTimeType.isVisible) {
        //             return;
        //         }
        //         frmTimeSheetCreate.flxScrTimeType.contentOffset = {
        //             x: "0%",
        //             y: frmTimeSheetCreate.flxSelectedTask.height
        //         };
        //         if (this.flxScrTimeTypeGestureId !== null) {
        //             frmTimeSheetCreate.flxScrTimeType.removeGestureRecognizer(this.flxScrTimeTypeGestureId);
        //         }
        //         //#endif
    },
    onSegmentBeginnning: function() {
        //       //#ifdef iphone
        //       kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollDownToShowSelectedTask();
        //       //#endif
    },

    showTimeType: function() {
        if (kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.isWork) {
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.timeType();
        } else {
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.leaves();
        }
    },

    hideTimeType: function() {
        //frmTimeSheetCreate.flxTimeType.isVisible = false;
    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.Search = {
    searchOnline: function() {
        //Do online search
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        kony.apps.coe.ess.globalVariables.isOnlineSearch = true;
        var searchString = frmTimeSheetCreate.txtBoxSearch.text;
        Query = searchString;
        var modelName = "MYTIME";
        var dataObject = "Project_Task";
        var queryParams;
        if (searchString.indexOf(',') == -1) {
            queryParams = {
                "$top": "10",
                "$filter": "substringof(Project_Id,'" + searchString + "') or substringof(Task_Id,'" + searchString + "') or substringof(id,'" + searchString + "')"
            };
            kony.apps.coe.ess.MVVM.OnlineServiceCall(modelName, dataObject, queryParams, kony.apps.coe.ess.myTime.TimesheetCreate.onlineSuccess, kony.apps.coe.ess.myTime.TimesheetCreate.onlineError);
        } else {
            //Blocked with some Issue once the issue resolved then we have to implement this part of online search
            //var params = Query.split(",");
            //queryParams= {"$filter":"substringof(Project_Id,'"+params[0]+"') and substringof(Task_Id,'"+params[1]+"')"};
            //kony.apps.coe.ess.MVVM.OnlineServiceCall(modelName, dataObject,queryParams, onlineSuccess,onlineError);
        }
        frmTimeSheetCreate.flxSearchPopup.setVisibility(false);
        //this.contractAnimation();
    },
    searchFor: function(query) {
        Query = query;
        if (query.trim() === "") {
            //ToDo : What should be done incase of empty queries ?
            return;
        }
        var result = [];
        if (query.indexOf(',') == -1) {
            var sqlQuery = "select t.task_name, p.project_name,p.id as pid,t.id as tid, pt.type,pt.id as ptid from project_task pt left join project p on p.id=pt.project_id  left join task t on t.id=pt.task_id where p.Project_Name like '%" + query + "%' OR t.task_name like '%" + query + "%' OR pt.project_id like '%" + query + "%' OR pt.task_id like '%" + query + "%' OR pt.id like '%" + query + "%' order by p.id";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, kony.apps.coe.ess.myTime.TimesheetCreate.sqlSuccess, kony.apps.coe.ess.myTime.TimesheetCreate.sqlFailure);
        } else {
            var params = query.split(",");
            var sqlquery = "select t.task_name, p.project_name,p.id as pid,t.id as tid, pt.type,pt.id as ptid from project_task pt left join project p on p.id=pt.project_id  left join task t on t.id=pt.task_id where p.id like '%" + params[0] + "%' and t.id like'%" + params[1] + "%' OR p.Project_Name like '%" + params[0] + "%' and t.Task_Name like '%" + params[1] + "%'";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlquery, kony.apps.coe.ess.myTime.TimesheetCreate.sqlSuccess, kony.apps.coe.ess.myTime.TimesheetCreate.sqlFailure);
        }

    },

    expandAnimation: function() {
        var animObj = kony.ui.createAnimation({
            "100": {
                "width": "90.6%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE_OUT
                }
            }
        });

        var timingObj = {
            "duration": 0.5,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };

        var animCallbacks = {
            "animationEnd": function() {
                kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.showCancelButton();
                kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.showSearchButton();
                if (kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.isWork) {
                    //Work is active
                    frmTimeSheetCreate.segTasks.setVisibility(false);
                } else {
                    //Leaves is active
                    frmTimeSheetCreate.segLeaveSelection.setVisibility(false);
                }
            }
        };

    },

    contractAnimation: function() {
        var animObj = kony.ui.createAnimation({
            "100": {
                "width": "49.4%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE_OUT
                }
            }
        });

        var timingObj = {
            "duration": 0.5,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };

        var animCallbacks = {
            "animationEnd": function() {
                kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchButton();
                kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchPopup();
                kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideCancelButton();
                frmTimeSheetCreate.txtBoxSearch.text = "";
                if (kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.isWork) {
                    //Work is active
                    frmTimeSheetCreate.segTasks.setVisibility(true);
                } else {
                    //Leaves is active
                    frmTimeSheetCreate.segLeaveSelection.setVisibility(true);
                }
                frmTimeSheetCreate.segTasksSearchResults.setVisibility(false);

            }
        };

    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.Slider = {
    onStartEditing: function(data) {
        //     alert("Slider On Start Editing : " + JSON.stringify(data));
        //     data.start = Math.random(" Started : " + Math.random());
    },

    onDoneEditing: function(data) {
        //     alert("Slider On Done Editing : " + JSON.stringify(data));
        //     data.end = Math.random(" Ended : " + Math.random());
    }
};
kony.apps.coe.ess.myTime.TimesheetCreate.sqlSuccess = function(res) {
    if (res === null || res.length <= 0) {
        kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.showSearchPopup();
        return;
    } else {
        //kony.apps.coe.ess.myTime.TimesheetCreate.Search.contractAnimation();
        kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchButton();
        kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchPopup();
    }
    res = kony.apps.coe.makeGroups("pid", res);
    var finalData = [];
    var hSkin = "sknLblFc2d86E2Fs24";
    for (var i = 0; i < res.length; i++) {
        var sectionData = [];
        var rows = [];
        for (var j = 0; j < res[i].length; j++) {
            var projectTask = {};
            projectTask.ProjectId = (res[i][j].pid === "") ? "" : res[i][j].pid;
            projectTask.Project_Task_Id = (res[i][j].ptid === "") ? "" : res[i][j].ptid;
            projectTask.TaskId = (res[i][j].tid === "") ? "" : res[i][j].tid;
            projectTask.backendData = res[i][j].backendData;
            if (j === 0) {
                var ind = (res[i][j].Type).indexOf("|");
                var type1 = (ind !== -1) ? (res[i][j].Type).substring(0, ind) : (res[i][j].Type);
                var type1Value = res[i][j].pid.replace(type1, "");
                var head = {
                    lblProjectNameHeader: {
                        text: type1 + " - " + type1Value,
                        skin: hSkin
                    }
                };
                sectionData.push(head);
            }
            if (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Type)) {
                var index = (res[i][j].Type).indexOf("|");
                var type2 = (index !== -1) ? (res[i][j].Type).substring(0, index) : (res[i][j].Type);
                var type2Value = ((res[i][j].tid) !== null && (res[i][j].tid) !== undefined) ? (res[i][j].tid).replace(type2, "") : "";
                projectTask.lblProjectName = (res[i][j].Project_Name === "") ? "" : res[i][j].Project_Name;
                projectTask.lblTaskName = (res[i][j].Task_Name !== null) ? res[i][j].Task_Name : "";
                projectTask.Project_Task_Type = (res[i][j].Type === "") ? "" : res[i][j].Type;
                projectTask.lblActivityId = (type2 === "" && type2Value === "") ? "" : (type2 + " - " + type2Value);
                projectTask.template = flxSegProjectTaskActivityIdSelection;
            } else if (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Project_Name) && kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Task_Name)) {
                projectTask.lblProjectName = (res[i][j].Project_Name === "") ? "" : (res[i][j].Project_Name);
                projectTask.Project_Task_Type = (res[i][j].Type === "") ? "" : res[i][j].Type;
                projectTask.lblTaskName = (res[i][j].Task_Name !== null) ? res[i][j].Task_Name : "";
                projectTask.template = flxsegTasks;
            } else {
                projectTask.lblProjectName = (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Project_Name)) ? res[i][j].Project_Name : res[i][j].Task_Name;
                projectTask.Project_Task_Type = (res[i][j].Type === "") ? "" : res[i][j].Type;
                projectTask.template = flxTaskList;
            }
            rows.push(projectTask);
        }
        sectionData.push(rows);
        finalData.push(sectionData);
    }
    kony.print("---- setData in finalData");
    frmTimeSheetCreate.segTasksSearchResults.setData(finalData);
    frmTimeSheetCreate.segLeaveSelection.setVisibility(false);
    frmTimeSheetCreate.segTasks.setVisibility(false);
    frmTimeSheetCreate.segTasksSearchResults.setVisibility(true);
    frmTimeSheetCreate.lblNoResultsTask.setVisibility(false);
    kony.application.dismissLoadingScreen();
    kony.print(JSON.stringify(finalData));
};
kony.apps.coe.ess.myTime.TimesheetCreate.sqlFailure = function(res) {
    kony.application.dismissLoadingScreen();
    handleError(res);
};
kony.apps.coe.ess.myTime.TimesheetCreate.onlineSuccess = function(res) {

    if (res.records != '') {
        res = res.records;
        var projectTasks = [];
        for (var i = 0; i < res.length; i++) {
            var projectTask = {};
            projectTask.Project_Name = kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i].Project) ? res[i].Project[0].Project_Name : "";
            projectTask.pid = res[i].Project_Id;
            projectTask.ptid = res[i].id;
            projectTask.tid = res[i].Task_Id;
            projectTask.Type = res[i].Type;
            projectTask.Task_Name = (res[i].Task !== undefined) ? res[i].Task[0].Task_Name : "";
            projectTask.backendData = res[i];
            projectTasks.push(projectTask);
        }
        kony.apps.coe.ess.myTime.TimesheetCreate.sqlSuccess(projectTasks);
    } else {
        frmTimeSheetCreate.segLeaveSelection.setVisibility(false);
        frmTimeSheetCreate.segTasks.setVisibility(false);
        frmTimeSheetCreate.segTasksSearchResults.setVisibility(false);
        frmTimeSheetCreate.lblNoResultsTask.setVisibility(true);
        kony.application.dismissLoadingScreen();
        return;
    }
};
kony.apps.coe.ess.myTime.TimesheetCreate.onlineError = function(res) {
    kony.application.dismissLoadingScreen();
    kony.print(JSON.stringify(res));
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       data set to set in segment
 * return       None.
 * desc         This method sets the data to segment
 */
kony.apps.coe.ess.myTime.TimesheetCreate.updateSegment = function(data) {
    kony.print("--------------------start updateSegment--------------------");
    data = kony.apps.coe.ess.myTime.TimesheetCreate.addCheckBoxes(data);
    frmTimeSheetCreate.segTimeEntryDetails.widgetDataMap = {
        "lblProjectName": "project_Name",
        "lblTimeType": "time_Type_Name",
        "lblTaskName": "task_Name",
        "lblNO": "project_Task_Id",
        "lblAO": "task_Id",
        "lblDescription": "description",
        "lblTotalHours": "actual_Hours",
        "lblTimeSlot": "time_Slot",
        "isLeave": "false",
        "imgTaskSelected": "checkboxImg",
        "template": "template"
    };

    function taskIsLeaveOrNot(data, isLeave, index) {
        if (isLeave === true) {
            data[index].template = flxTimeEntryLeaveDetails;
            data[index].isLeave = true;
        } else {
            data[index].template = flxTimeEntryDetails;
            data[index].isLeave = false;
        }
        if (data.length - 1 === index) {
            kony.print("---- setData in taskIsLeaveOrNot");
            frmTimeSheetCreate.segTimeEntryDetails.setData(data);
        }
    }
    for (var i = 0; i < data.length; i++) {
        kony.apps.coe.ess.myTime.TimesheetCreate.isLeaveTimeType(data[i].timeType_Id, taskIsLeaveOrNot.bind(this, data), i);
    }

    kony.print("--------------------end updateSegment--------------------");
};


kony.apps.coe.ess.myTime.TimesheetCreate.viewTaskSummary = function() {
    frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
    frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = true;
    frmTimeSheetCreate.flxScrTimeEntrySummary.isVisible = true;
    frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
    frmTimeSheetCreate.flxTotalTime.setVisibility(true);
    frmTimeSheetCreate.lblSummary.setVisibility(true);
    frmTimeSheetCreate.labPopupHeader.top = "17.5%";
};
/**
 * @class       TimesheetCreate
 * @type        function
 * @param       data to be processed , successCallBack
 * return       None.
 * desc         this function process the data and pass it as a param to updateSegment function
 */
kony.apps.coe.ess.myTime.TimesheetCreate.settingTaskSummary = function(dataSetMain, successCallBack) {
    kony.print("--------------------start settingTaskSummary--------------------");
    kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.filter(function(x) { return x !== null });
    var dataSet = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
    if (dataSet === null || dataSet === undefined || dataSet.length <= 0) {
        return;
    }

    function getHHMMSS(time) {
        var isPM = false;
        if (time === null || time === undefined || time === "") {
            return {
                hh: 0,
                mm: 0,
                ss: 0
            };
        } else {
            if (time.indexOf("PM") >= 0) {
                isPM = true;
            }
            var x = time.split(".");
            var hh = parseInt(x[0]);
            var mm;
            if (x.length < 2) {
                mm = "00";
            } else {
                mm = parseInt(x[1]);
            }
            if (isPM && hh === 12) {
                hh = 12;
            } else if (!isPM && hh === 12) {
                hh = "00";
            } else if (hh >= 1 && isPM) {
                hh += 12;
            } else if (hh >= 1 && hh <= 9 && !isPM) {
                hh = "0" + hh;
            }
            return {
                hh: hh,
                mm: mm,
                ss: 0
            };
        }
    }
    var finalData = {};
    var generatedData = [];
    generatingEachRowData.call(this, 0);

    function generatingEachRowData(index) {

        if (dataSet[index].data.Time_Line_Status === "deleted") {
            if (index < (dataSet.length - 1)) {
                generatingEachRowData(index + 1);
            } else {
                successCallBack(generatedData);
            }
        } else {
            finalData = {};
            finalData.timeType_Id = dataSet[index].data.TimeType_Id;
            finalData.time_Entry_ID = dataSet[index].data.Time_Entry_Id;
            finalData.project_Task_Id = dataSet[index].data.Project_Task_Id;
            finalData.start_Time = dataSet[index].data.Start_Time;
            finalData.end_Time = dataSet[index].data.End_Time;
            finalData.description = (dataSet[index].data.Desc === "") ? "" : dataSet[index].data.Desc;
            finalData.time_Slot = finalData.start_Time + "  to " + finalData.end_Time;
            var endTimeForCal = getHHMMSS(finalData.end_Time);
            endTimeForCal = "" + endTimeForCal.hh + ((endTimeForCal.mm) * 60) / 100;
            var startTimeForCal = getHHMMSS(finalData.start_Time);
            startTimeForCal = "" + startTimeForCal.hh + ((startTimeForCal.mm) * 60) / 100;
            finalData.actual_Hours = kony.apps.coe.ess.myTime.TimesheetCreate.timeEntryCreate.getTimeDiff(endTimeForCal, startTimeForCal);
            if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
                finalData.time_Slot = kony.apps.coe.ess.myTime.TimesheetCreate.changingIntoHoursAndMinutes(finalData.actual_Hours);
            }
            if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
                finalData.actual_Hours = kony.apps.coe.ess.myTime.TimesheetCreate.changingIntoHoursAndMinutes(finalData.actual_Hours);
            } else {
                finalData.actual_Hours = finalData.actual_Hours + " h";
            }
            if (finalData.project_Task_Id !== null && finalData.project_Task_Id !== undefined && finalData.project_Task_Id !== "") {
                var query = "select pt.Project_Id as Project_Id, pt.Task_Id as Task_Id,tt.Name as timeTypeName from Project_Task pt join Time_Entry te on pt.id = te.Project_Task_id join Time_Type tt on te.Time_Type_Id = tt.Id where pt.ID = '" + finalData.project_Task_Id + "' AND tt.ID = '" + finalData.timeType_Id + "';";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successForProjectTaskId.bind(this, index), error);
            } else {
                var query = "select tt.Name as timeTypeName ,tt.Description as Desc from Time_Type tt where tt.ID = '" + finalData.timeType_Id + "';";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successForTimeType.bind(this, index), error);
            }
        }
    }

    function successForTimeType(index, res) {
        if (res === null) {
            return;
        }
        for (var i = 0; i < res.length; i++) {
            finalData.project_Name = res[i].timeTypeName;
        }
        generatedData.push(finalData);
        if (index < (dataSet.length - 1)) {
            generatingEachRowData(index + 1);
        } else {
            successCallBack(generatedData);
        }
    }

    function error(err) {
        handleError(err);
    }

    function successForProjectTaskId(index, res) {
        if (res === null) {
            return;
        }

        for (var i = 0; i < res.length; i++) {
            finalData.project_Id = res[i].Project_Id;
            finalData.task_Id = res[i].Task_Id;
            finalData.time_Type_Name = res[i].timeTypeName;
        }

        if (finalData.project_Id !== null && finalData.project_Id !== undefined && finalData.project_Id !== "") {
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", "select p.Project_Name as name, p.Project_Type as type from Project p where p.Id = '" + finalData.project_Id + "';", successForProjectQuery.bind(this, index), errorForProjectQuery);
        } else {
            finalData.project_Id = "";
            finalData.project_Name = finalData.project_Task_Id; // to give custom project name
            finalData.task_Id = "";
            finalData.task_Name = "";
            generatedData.push(finalData);
            if (index < (dataSet.length - 1)) {
                generatingEachRowData(index + 1);
            } else {
                successCallBack(generatedData);
            }
        }

        function errorForProjectQuery(err) {
            handleError(err);
        }

        function successForProjectQuery(index, res) {
            for (var i = 0; i < res.length; i++) {
                finalData.project_Name = res[i].name;
            }
            if (finalData.task_Id !== null && finalData.task_Id !== undefined && finalData.task_Id !== "") {
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", "select t.Task_Name as name, t.Type as type from Task t where t.Id = '" + finalData.task_Id + "';", successForTaskQuery.bind(this, index), errorForTaskQuery);
            } else {
                finalData.task_Id = "";
                finalData.task_Name = "";
                generatedData.push(finalData);
                if (index < (dataSet.length - 1)) {
                    generatingEachRowData(index + 1);
                } else {
                    successCallBack(generatedData);
                }
            }
        }

        function errorForTaskQuery(err) {
            handleError(err);
        }

        function successForTaskQuery(index, res) {
            for (var i = 0; i < res.length; i++) {
                finalData.task_Name = res[i].name;
            }
            generatedData.push(finalData);
            if (index < (dataSet.length - 1)) {
                generatingEachRowData(index + 1);
            } else {
                successCallBack(generatedData);
            }
        }
    }
    kony.print("--------------------end settingTaskSummary--------------------");
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None.
 * return       None.
 * desc         register swipe gesture on segTimeEntryDetails in Timesheet create
 				(called in preshow of timesheetcreate)
 */
kony.apps.coe.ess.myTime.TimesheetCreate.applyGestureAndSwipeAnimation = function() {

    kony.print("--------------------start applyGestureAndSwipeAnimation--------------------");
    var swipeOnRow = {
        fingers: 1,
        swipeDistance: 50,
        swipeVelocity: 60
    };
    kony.apps.coe.ess.myTime.TimesheetCreate.timeEntryGesture = flxTimeEntryDetails.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, swipeOnRow, this.swipeCallback.bind(this));
    kony.apps.coe.ess.myTime.TimesheetCreate.leaveEntryGesture = flxTimeEntryLeaveDetails.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, swipeOnRow, this.swipeCallback.bind(this));
    kony.print("--------------------end applyGestureAndSwipeAnimation--------------------");
};
/**
 * @class       TimesheetCreate
 * @type        function
 * @param       commonWidget,gestureInfo
 * return       None.
 * desc         this function is the success call back for applyGestureAndSwipeAnimation function
 				it calls the swipeanimation function according to the conditions
 */
kony.apps.coe.ess.myTime.TimesheetCreate.swipeCallback = function(commonWidget, gestureInfo) {
    kony.print("--------------------start swipeCallback--------------------");
    var swipedDirection = gestureInfo.swipeDirection;

    if (swipedDirection === 1) {
        this.swipeanimation(commonWidget, "-20");
    } else if (swipedDirection === 2) {
        this.swipeanimation(commonWidget, 0);
    }
    kony.print("--------------------end swipeCallback--------------------");
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       widget on which animation is to be registered, left value to be changed by for the animation
 * return       None.
 * desc         this function is the success call back for applyGestureAndSwipeAnimation function
 */
kony.apps.coe.ess.myTime.TimesheetCreate.swipeanimation = function(widget, leftValue) {
    kony.print("--------------------start swipeanimation--------------------");
    if (kony.apps.coe.ess.myTime.TimesheetCreate.removeGestureAndSwipeAnimation === false) {
        widget.flxComplete.animate(
            kony.ui.createAnimation({
                "100": {
                    "left": leftValue + "%",
                    "stepConfig": {
                        "timingFunction": kony.anim.EASE
                    }
                }
            }), {
                "delay": 0,
                "iterationCount": 1,
                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                "duration": 0.3
            }, {
                "animationEnd": function() {}
            });
    } else {
        widget.flxComplete.animate(
            kony.ui.createAnimation({
                "100": {
                    "left": 0 + "%",
                    "stepConfig": {
                        "timingFunction": kony.anim.EASE
                    }
                }
            }), {
                "delay": 0,
                "iterationCount": 1,
                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                "duration": 0.3
            }, {
                "animationEnd": function() {}
            });
    }
    kony.print("--------------------end swipeanimation--------------------");
};

kony.apps.coe.ess.myTime.TimesheetCreate.timeSheetSummaryEdit = function() {
    try {
        var segData = frmTimeSheetCreate.segTimeEntryDetails.selectedItems[0];
        var start_time = segData.start_Time;
        var end_time = segData.end_Time;
        setVisibilty();
        kony.print("---- setData in timeSheetSummaryEdit");
        setData(segData);

        function setVisibilty() {
            if (segData.isLeave) {
                frmTimeSheetCreate.flxProjectTaskSelection.isVisible = true;
                frmTimeSheetCreate.segLeaveSelection.isVisible = true;
                kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
                kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.onClickOfLeave(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.leaves());
            } else {
                frmTimeSheetCreate.flxContainerSelectTask.isVisible = true;
                frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = false;
                frmTimeSheetCreate.flxProjectTaskSelection.isVisible = true;
                frmTimeSheetCreate.lblCreateProjName.setVisibility(true);
                frmTimeSheetCreate.lblCreateTaskName.setVisibility(true);
                frmTimeSheetCreate.lblCreateNO.setVisibility(true);
                frmTimeSheetCreate.lblCreateAO.setVisibility(true);
            }
            frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
            frmTimeSheetCreate.flxTotalTime.setVisibility(false);
        }
        kony.print("---- setData in function");

        function setData(data) {
            frmTimeSheetCreate.lblCreateProjName.text = data.project_Name === "" ? "" : data.project_Name;
            frmTimeSheetCreate.lblCreateTaskName.text = data.task_Name === "" ? "" : data.task_Name;
            frmTimeSheetCreate.lblCreateNO.text = data.project_Task_Id === "" ? "" : data.project_Task_Id;
            frmTimeSheetCreate.lblCreateAO.text = data.task_Id === "" ? "" : data.task_Id;
            frmTimeSheetCreate.lblTimeTypeSelect.text = (data.time_Type_Name === "") ? "" : data.time_Type_Name;
        }
        kony.apps.coe.Reusable.TimelineCreation.EditTask(start_time, end_time);
        kony.apps.coe.ess.globalVariables.taskStartTime = start_time;
        if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
            frmTimeSheetCreate.flxManualTimeSelection.setVisibility(true);
            frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
            frmTimeSheetCreate.flxTotalTime.setVisibility(true);
            frmTimeSheetCreate.flxCopy.setVisibility(false);
        }
        kony.apps.coe.ess.globalVariables.notFirstTask = true;
    } catch (error) {
        handleError(error);
    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.timeSheetSummaryDelete = function() {
    try {
        var segData = frmTimeSheetCreate.segTimeEntryDetails.selectedItems[0];
        var selected_index = frmTimeSheetCreate.segTimeEntryDetails.selectedIndex[1];
        start_time = segData.start_Time;
        frmTimeSheetCreate.segTimeEntryDetails.removeAt(selected_index);
        (new kony.apps.coe.Reusable.TimelineCreation()).deleteTask(start_time);
        kony.apps.coe.ess.globalVariables.notFirstTask = true;
        //If there are no more tasks to delete
        if (frmTimeSheetCreate.segTimeEntryDetails.data.length === undefined || frmTimeSheetCreate.segTimeEntryDetails.data.length < 1) {
            frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
            frmTimeSheetCreate.flxTotalTime.setVisibility(false);
        }

    } catch (error) {
        handleError(error);
    }
};

/**
 * @class       TimesheetCreate
 * @type        function
 * desc         this function is called on preshow of frmCreateTimesheet to reset UI
 */
kony.apps.coe.ess.myTime.TimesheetCreate.resetUI = function() {
    kony.print("-----Start of resetUI-----");
    frmTimeSheetCreate.lblCreateProjName.setVisibility(false);
    frmTimeSheetCreate.lblCreateTaskName.setVisibility(false);
    frmTimeSheetCreate.lblCreateNO.setVisibility(false);
    frmTimeSheetCreate.lblCreateAO.setVisibility(false);
    frmTimeSheetCreate.lblToSelectTask.setVisibility(true);
    frmTimeSheetCreate.segTimeType.setVisibility(false);
    frmTimeSheetCreate.lblTimeTypeSelect.text = kony.i18n.getLocalizedString("i18n.ess.frmCreateTask.select");
    frmTimeSheetCreate.imgSelectIcon.setVisibility(false);
    frmTimeSheetCreate.btnDone.setVisibility(true);
    frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(false);
    frmTimeSheetCreate.lblSummary.setVisibility(false);
    frmTimeSheetCreate.labPopupHeader.top = "30.5%";
    //frmTimeSheetCreate.tbxSelectedTaskDescription.text = "";
    frmTimeSheetCreate.tbxSelectedTaskDescription.placeholder = "Describe activity";
    frmTimeSheetCreate.tbxSelectedTaskDescription.padding = [0, 0, 0, 3];
    kony.print("-----End of resetUI-----");
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None.
 * return       None.
 * desc         set data to copy segement on time sheet create called in on click of copy button
 */
kony.apps.coe.ess.myTime.TimesheetCreate.settingDataToCopySegment = function() {
    kony.print("-----settingDataToCopySegment start-----");
    var copyData = kony.apps.coe.ess.myTime.TimesheetCreate.CloneDatesData;
    var selectedTimeSlots = [];
    var currentdate = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.date;
    var selectedTimeLineData = frmTimeSheetCreate.segTimeEntryDetails.data;
    var startdate, enddate;
    var segDataSet = [];
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig !== "weekly") {
        var timesheetdates = [];
        var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(currentdate, new Date(currentdate.getFullYear(), 1, 1));
        startdate = interval[0];
        enddate = interval[1];
        for (var i = startdate; i <= enddate; i = i.nextDay()) {
            timesheetdates.push(i.toString());
        }
    }
    startdate = currentdate.thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
    var allweekdays = [];
    for (var i = 0; i < 7; i++) {
        var td = new Date(Date.parse(startdate) + i * 86400000);
        allweekdays.push(td.toString());
    }
    var dateArray = []
    var newdate = new Date();
    for (var index = 0; index < selectedTimeLineData.length; index++) {
        if (selectedTimeLineData[index].checkboxImg.src == "tick_active.png") {
            selectedTimeSlots.push(selectedTimeLineData[index].time_Slot);
        }
    }

    for (var k = 0; k < selectedTimeSlots.length; k++) {
        for (var z = 0; z < copyData.length; z++) {
            if (selectedTimeSlots[k] == copyData[z].timeslot) {
                dateArray.push(copyData[z].date);
            }
        }
    }
    var newdate = new Date();
    segDataSet.push({
        lblDate: {
            "skin": "sknLblMob1C7393100OFS22px",
            text: "All dates in week"
        },
        date: allweekdays,
        onClick: function() {
            kony.apps.coe.ess.myTime.TimesheetCreate.segCloneTaskToPopupOnRowClick(this);
        }
    });

    var count = 0;
    for (var i = 0; i < allweekdays.length; i++) {
        count = 0;
        for (var j = 0; j < dateArray.length; j++) {
            if ((new Date(allweekdays[i])).getDate() === (new Date(dateArray[j])).getDate()) {
                segDataSet.push({
                    lblDate: {
                        "skin": "sknLblDisabledCurrentDate",
                        text: (new Date(allweekdays[i])).getDate() + " " + kony.apps.coe.ess.myTime.nToStr.week[(new Date(allweekdays[i])).getDay()]
                    },
                    date: allweekdays[i],
                    onClick: function() {}
                });
                break;
            } else {
                count++;

            }
        }
        if (count == dateArray.length) {
            segDataSet.push({
                lblDate: {
                    "skin": "sknLblMob1C7393100OFS22px",
                    text: (new Date(allweekdays[i])).getDate() + " " + kony.apps.coe.ess.myTime.nToStr.week[(new Date(allweekdays[i])).getDay()]
                },
                date: allweekdays[i],
                onClick: function() {
                    kony.apps.coe.ess.myTime.TimesheetCreate.segCloneTaskToPopupOnRowClick(this);
                }
            });
        }
    }
    kony.print("---- setData in segCloneTaskToPopup segDataSet");
    frmTimeSheetCreate.segCloneTaskToPopup.setData(segDataSet);

    kony.print("-----settingDataToCopySegment end-----");
};
/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None.
 * return       None.
 * desc         fucntion for row click for segCopyTimeEntry
 */
kony.apps.coe.ess.myTime.TimesheetCreate.onRowClickOfCopySegment = function() {
    kony.print("-----onRowClickOfCopySegment start-----");
    var index;
    if (frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems === undefined || frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems === null || frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems === []) {
        index = frmTimeSheetCreate.segCloneTaskToPopup.selectedIndicesArray[0][1][0];
    } else {
        index = frmTimeSheetCreate.segCloneTaskToPopup.selectedRowIndex[1];
    }
    var rowData = frmTimeSheetCreate.segCloneTaskToPopup.data[index];
    if (rowData === null || rowData === undefined || rowData === []) {
        return;
    }
    var currentdate = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.date;
    var selectedIndices = frmTimeSheetCreate.segCloneTaskToPopup.selectedRowIndices;
    if (rowData.date.localeCompare(currentdate) === 0) {
        //         frmTimeSheetCreate.segCloneTaskToPopup.selectedIndicesArray = selectedIndices;
        //         var indexOfRowToRemove = selectedIndices[0][1].indexOf(index);
        //         selectedIndices = [[0, selectedIndices[0][1].splice(indexOfRowToRemove, 1)]];
        //         frmTimeSheetCreate.segCloneTaskToPopup.selectedRowIndices = selectedIndices;
        return;
    } else {
        if (typeof rowData.lblDate !== 'object')
            rowData.lblDate = {
                "skin": "sknLblOnRowClickCopySegment",
                text: rowData.lblDate
            };
        else if (rowData.lblDate.skin !== "sknLblOnRowClickCopySegment") {
            rowData.lblDate = {
                "skin": "sknLblOnRowClickCopySegment",
                text: rowData.lblDate.text
            };
        } else {
            rowData.lblDate = {
                "skin": "sknLblRowUnselected",
                text: rowData.lblDate.text
            };
        }
    }

    frmTimeSheetCreate.segCloneTaskToPopup.setDataAt(rowData, index);
    frmTimeSheetCreate.segCloneTaskToPopup.selectedRowIndices = selectedIndices;
    frmTimeSheetCreate.segCloneTaskToPopup.selectedIndicesArray = selectedIndices;
    kony.print("-----onRowClickOfCopySegment end-----");
};


/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None.
 * return       None.
 * desc         on click fucntion for copy button
 */
kony.apps.coe.ess.myTime.TimesheetCreate.onClickCopyButton = function() {
    kony.print("-----onClickCopyButton start-----");
    //var segData = frmTimeSheetCreate.segTimeEntryDetails.data;
    var index;
    var segSelectionBehaviorConfig = {
        imageIdentifier: "imgTaskSelected",
        selectedStateImage: "tick_active.png",
        unselectedStateImage: "tick_oval.png"
    };

    if (frmTimeSheetCreate.btnClone.isVisible === false) {
        frmTimeSheetCreate.btnClone.isVisible = true;
        if(frmTimeSheetCreate.segTimeEntryDetails.data.length > 0){
            var newSegData = kony.apps.coe.ess.myTime.TimesheetCreate.showCheckBoxes(frmTimeSheetCreate.segTimeEntryDetails.data)
            frmTimeSheetCreate.segTimeEntryDetails.setData(newSegData);
        }        
        frmTimeSheetCreate.flxCopy.skin = "sknFlx468DA8100O";
        frmTimeSheetCreate.imgCopy.src = "clone_active.png";
        frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(false);
        kony.apps.coe.ess.myTime.TimesheetCreate.removeGestureAndSwipeAnimation = true;
        frmTimeSheetCreate.segTimeEntryDetails.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
        frmTimeSheetCreate.segTimeEntryDetails.selectionBehaviorConfig = segSelectionBehaviorConfig;
    } else {
        frmTimeSheetCreate.btnClone.isVisible = false;
        if(frmTimeSheetCreate.segTimeEntryDetails.data.length > 0){
            var newSegData = kony.apps.coe.ess.myTime.TimesheetCreate.addCheckBoxes(frmTimeSheetCreate.segTimeEntryDetails.data)
            frmTimeSheetCreate.segTimeEntryDetails.setData(newSegData);
        }  
        frmTimeSheetCreate.flxCopy.skin = "slFbox";
        frmTimeSheetCreate.imgCopy.src = "copy.png";
        frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(true);
        kony.apps.coe.ess.myTime.TimesheetCreate.removeGestureAndSwipeAnimation = false;
        frmTimeSheetCreate.segTimeEntryDetails.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    }
    kony.print("---- setData in segTimeEntryDetails");
    frmTimeSheetCreate.forceLayout();
    //frmTimeSheetCreate.segTimeEntryDetails.setData(segData);

    kony.print("-----onClickCopyButton end-----");
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None.
 * return       None.
 * desc         resetting the copy flow
 */
kony.apps.coe.ess.myTime.TimesheetCreate.resetCopyUI = function() {
    try {
        var segData = frmTimeSheetCreate.segTimeEntryDetails.data;
        var index;
        if (segData !== undefined && segData !== null) {
            for (index = 0; index < segData.length; index++) {
                segData[index].checkboxImg = { "isVisible": false, "src": "tick_oval.png" };
            }
        }
        frmTimeSheetCreate.btnClone.isVisible = false;
        frmTimeSheetCreate.flxCopy.skin = "slFbox";
        frmTimeSheetCreate.imgCopy.src = "copy.png";
        kony.print("---- setData in resetCopyUI");
        frmTimeSheetCreate.segTimeEntryDetails.setData(segData);
    } catch (error) {
        handleError(error);
    }
};
/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None.
 * return       None.
 * desc         on click of copy to button on flxCopyTimeEntry
 */
kony.apps.coe.ess.myTime.TimesheetCreate.onClickCopyToButton = function() {
    kony.print("-----onClickCopyToButton start-----");
    var selectedItems = frmTimeSheetCreate.segCopyTimeEntry.selectedItems;
    var selectedData = [];
    for (var i in selectedItems) {
        selectedData.push(selectedItems[i].date);
    }
    var currentdate = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.date;
    kony.apps.coe.ess.myTime.TimesheetCreate.Clone.cloneTimelineFromOneToMultipleDates(currentdate, selectedData, success, error);

    function success() {
        frmTimeSheetCreate.flxBlank.isvisible = false;
        frmTimeSheetCreate.flxCopyTimeEntry.isvisible = false;
        toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.TimeSheetCreate.cloneSuccess"), 2000);

    }

    function error(err) {
        handleError(err);
    }
    kony.print("-----onClickCopyToButton end-----");
};

kony.apps.coe.ess.myTime.TimesheetCreate.submitOneDayTimeSheet = function() {
    kony.apps.coe.ess.myTime.getTimesheetDataForADate(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.date, success, error);

    function success(res) {
        kony.apps.coe.ess.myTime.TimesheetReview.completeReview(res.Id);
    }

    function error(err) {
        handleError(err);
    }
};
kony.apps.coe.ess.myTime.TimesheetCreate.pickerViewOnClickApply = function() {
    kony.print("---- I'm here in pickerViewOnClickApply");
    var selectedValues = frmTimeSheetCreate.timePicker.selectedKeyValues;
    kony.print("---- timePicker selected values: " + JSON.stringify(selectedValues));
    // kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
    // kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.TimeType_Id = null;
    var leftPinDistFromLeft = parseInt(selectedValues[0][0]);
    var rightPinDistFromLeft = parseInt(selectedValues[1][0]);
    var startTime = selectedValues[0][1];
    var endTime = selectedValues[1][1];
    if (leftPinDistFromLeft < rightPinDistFromLeft) {
        var sliderObj = new kony.apps.coe.Reusable.TimelineCreation();
        var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
        var coordinates = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
        var startIndex = coordinates.map(function(el) {
            return el[1];
        }).indexOf(startTime);
        var endIndex = coordinates.map(function(el) {
            return el[1];
        }).indexOf(endTime);
        var width = coordinates[endIndex][0] - coordinates[startIndex][0];
        var left = coordinates[startIndex][0];
        frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
        sliderObj.animateSlider(left, width);
        kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(startTime, endTime);
        frmTimeSheetCreate.flxTimePicker.setVisibility(false);
        frmTimeSheetCreate.flexSlider.setVisibility(true);
        frmTimeSheetCreate.flxProjectTaskSelection.setVisibility(true);
        frmTimeSheetCreate.tbxSelectedTaskDescription.text = "";
        frmTimeSheetCreate.lblSummary.setVisibility(false);
        frmTimeSheetCreate.labPopupHeader.top = "30.5%";
        frmTimeSheetCreate.btnDone.setVisibility(true);
        frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(false);
        leftPinDistFromLeft = leftPinDistFromLeft.toString();
        rightPinDistFromLeft = rightPinDistFromLeft.toString();
        frmTimeSheetCreate.timePicker.selectedKeys = [leftPinDistFromLeft, rightPinDistFromLeft];
        kony.apps.coe.Reusable.TimelineCreation.scrollTimelineFrameSearch();
    } else {
        kony.print("---- start time should be less when compared to end time");
    }
    kony.print("---- values: " + leftPinDistFromLeft + " " + rightPinDistFromLeft);
};
kony.apps.coe.ess.myTime.TimesheetCreate.popluateTimePickerData = function() {
    kony.print("---- populateTimePickerData start");
    try {
        var coords = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
        var index = 0;
        var timeslots = [];
        var timeslotsArray = [];
        while (index < coords.length) {
            var temp = [0, 0];
            temp[0] = coords[index][0].toString(); //Storing the left values as keys so that sliding of time slider could be easy
            temp[1] = coords[index][1]; //Storing time slots from 11:45 PM to 11 PM
            timeslots.push(temp);
            index++;
        }
        timeslots.push(50);
        timeslotsArray.push(timeslots); //Start time
        timeslotsArray.push(timeslots); //End time

        frmTimeSheetCreate.timePicker.masterData = timeslotsArray;
        kony.print("---- populateTimePickerData end");
    } catch (error) {
        kony.print("---- populateTimePickerData error: " + error);
    }
};

kony.apps.coe.ess.myTime.TimesheetCreate.onRowClickofSummarySegment = function(segment) {
    kony.print("---- onRowClickofSummarySegment start");
    try {
        kony.print("---- segTimeEntryDetails: " + JSON.stringify(segment.selectedRowItems[0]));
        kony.print("---- segTimeEntryDetails: " + JSON.stringify(segment.selectedRowIndex));
        var segData = segment.selectedRowItems[0];

        if (segData.checkboxImg.isVisible === true) {
            if (segData.checkboxImg.src == "tick_oval.png") {
                segData.checkboxImg = { "isVisible": true, "src": "tick_active.png" };
            } else {
                segData.checkboxImg = { "isVisible": true, "src": "tick_oval.png" };
            }
        }
        segment.setDataAt(segData, segment.selectedRowIndex[1]);
    } catch (error) {
        kony.print("---- error in onRowClickofSummarySegment: " + error);
    }
    kony.print("---- onRowClickofSummarySegment end");
};

kony.apps.coe.ess.myTime.TimesheetCreate.addCheckBoxes = function(data) {
    kony.print("---- addCheckBoxes start");
    try {
        var index;
        for (index = 0; index < data.length; index++) {
            data[index].checkboxImg = { "isVisible": false, "src": "tick_oval.png" };
        }
        return data;
    } catch (error) {
        kony.print("---- addCheckBoxes error: " + error);
    }
    kony.print("---- addCheckBoxes end");
};
kony.apps.coe.ess.myTime.TimesheetCreate.showCheckBoxes = function(data) {
    kony.print("---- showCheckBoxes start");
    try {
        var index;
        for (index = 0; index < data.length; index++) {
            data[index].checkboxImg = { "isVisible": true, "src": "tick_oval.png" };
        }
        return data;
    } catch (error) {
        kony.print("---- showCheckBoxes error: " + error);
    }
    kony.print("---- showCheckBoxes end");
};
kony.apps.coe.ess.myTime.TimesheetCreate.isTaskSelected = function() {
    try {
        var index;
        var data = frmTimeSheetCreate.segTimeEntryDetails.selectedItems;
        if (data.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        kony.print("---- addCheckBoxes error: " + error);
    }
};
kony.apps.coe.ess.myTime.TimesheetCreate.onClickCloneButton = function() {
    if (frmTimeSheetCreate.flxBlank.isVisible === false) {
        if (kony.apps.coe.ess.myTime.TimesheetCreate.isTaskSelected()) {
            frmTimeSheetCreate.flxBlank.setVisibility(true);
            frmTimeSheetCreate.flxCloneTaskToPopup.setVisibility(true);

        } else {
            frmTimeSheetCreate.flxBlank.setVisibility(false);
            frmTimeSheetCreate.flxCloneTaskToPopup.setVisibility(false);
            toastMessage.showToastMsg("Select atleast one task to clone", 2000);
        }
    } else {
        frmTimeSheetCreate.flxBlank.setVisibility(false);
        frmTimeSheetCreate.flxCloneTaskToPopup.setVisibility(false);
    }
};
kony.apps.coe.ess.myTime.TimesheetCreate.segCloneTaskToPopupOnRowClick = function(segment) {
    var selectedItemDates = [];
    selectedItemDates.push(frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems[0].date);
    var displayValue = frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems[0].lblDate;
    var data = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data;
    var selectedTimeLineData = frmTimeSheetCreate.segTimeEntryDetails.selectedItems;
    var index;
    var tempData = [];
    var temp = {};
    for (index = 0; index < selectedTimeLineData.length; index++) {
        temp = {};
        temp["Project_Task_Id"] = selectedTimeLineData[index].project_Task_Id;
        temp["TimeType_Id"] = selectedTimeLineData[index].timeType_Id;
        temp["Time_Entry_Id"] = selectedTimeLineData[index].time_Entry_ID;
        temp["Start_Time"] = selectedTimeLineData[index].start_Time;
        temp["End_Time"] = selectedTimeLineData[index].end_Time;
        temp["Task_Name"] = selectedTimeLineData[index].project_Name;
        temp["isBillable"] = 0;
        if (selectedTimeLineData[index].project_Id !== undefined && selectedTimeLineData[index].project_Id !== null) {
            temp["Project_Task_Type"] = selectedTimeLineData[index].project_Id.split(selectedTimeLineData[index].project_Task_Id)[0];
        } else {
            temp["Project_Task_Type"] = "";
        }
        temp["Desc"] = selectedTimeLineData[index].description;
        temp["Time_Line_Status"] = null
        tempData.push(temp);
    }
    kony.print("---- data: " + JSON.stringify(data));
    kony.print("---- selectedTimeSheet tempData: " + JSON.stringify(tempData));
    var validationForExistingTimeEntry = function(selectedItemDate, data, res) {
        function getDateObj(time) {
            var isPM = false;
            if (time.indexOf("PM") >= 0) {
                isPM = true;
            }
            var x = time.split(".");
            var hh = parseInt(x[0]);
            var mm;
            if (x.length < 2) {
                mm = "00";
            } else {
                mm = parseInt(x[1]);
            }
            if (isPM && hh === 12) {
                hh = 12;
            } else if (!isPM && hh === 12) {
                hh = 0;
            } else if (hh >= 1 && isPM) {
                hh += 12;
            }
            var tempdate = new Date(2016, 1, 24);
            return (tempdate.setHours(hh), tempdate.setMinutes(mm), tempdate.setSeconds(0), tempdate);
        }

        function HHMMSSToDateObj(str) {
            var tempdate = new Date(2016, 1, 24);
            return (tempdate.setHours(str.substring(0, 2)), tempdate.setMinutes(str.substring(2, 4)), tempdate.setSeconds(0), tempdate);
        }

        function isDeletable(curr, temp) {
            return curr.Start_Time - temp.Start_Time <= 0 && curr.End_Time - temp.End_Time >= 0;
        }

        function isAffected(curr, temp) {
            return !((temp.Start_Time < curr.Start_Time && temp.End_Time <= curr.Start_Time) || (temp.End_Time > curr.End_Time && temp.Start_Time >= curr.End_Time));
        }

        var cancelTimeEntry = function(id) {
            var Time_entry_record = {};
            Time_entry_record.Id = id;
            Time_entry_record.StatusId = "3";
            kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
        };

        var updateStartTimeOfTimeEntry = function(id, starttime) {
            var Time_entry_record = {};
            Time_entry_record.Id = id;
            Time_entry_record.Start_Time = starttime.toHHMMSS("");
            kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
        };

        var updateEndTimeOfTimeEntry = function(id, endtime) {
            var Time_entry_record = {};
            Time_entry_record.Id = id;
            Time_entry_record.End_Time = endtime.toHHMMSS("");
            kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
        };
        var current = {
            Start_Time: getDateObj(data.Start_Time),
            End_Time: getDateObj(data.End_Time)
        };
        var addNewEntryInDB = function(selectedItemDate, data, current) {
                var Time_entry_record = {};
                Time_entry_record.Employee_Id = kony.apps.coe.ess.globalVariables.employeeId;
                Time_entry_record.Date = (new Date(selectedItemDate)).toYYYYMMDD("");
                Time_entry_record.End_Time = current.End_Time.toHHMMSS("");
                Time_entry_record.Start_Time = current.Start_Time.toHHMMSS("");
                Time_entry_record.Time_Type_Id = data.TimeType_Id;
                Time_entry_record.Activity_Description = data.Desc;
                Time_entry_record.StatusId = "5";
                Time_entry_record.Project_Task_id = data.Project_Task_Id;
                Time_entry_record.Project_Task_Type = data.Project_Task_Type;
                kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.create(Time_entry_record);
            }
            .bind(this, selectedItemDate, data, current);

        for (var i = 0; i < res.length; i++) {
            var temp = {
                Start_Time: HHMMSSToDateObj(res[i].Start_Time),
                End_Time: HHMMSSToDateObj(res[i].End_Time)
            };
            if (isDeletable(current, temp)) {
                cancelTimeEntry(res[i].Id);
            } else if (isAffected(current, temp)) {
                if (temp.Start_Time < current.Start_Time) {
                    updateEndTimeOfTimeEntry(res[i].Id, current.Start_Time);
                } else {
                    updateStartTimeOfTimeEntry(res[i].Id, current.End_Time);
                }
            }
        }
        addNewEntryInDB();
    };
    var errorCallback = function(err) {
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
        kony.apps.coe.ess.myTime.TimesheetCreate.popups.showErrorPopup();
        handleError(err);
    };

    if (tempData.length === 0) { //Atlease one time entry need to be selected to clone
        frmTimeSheetCreate.flxBlank.setVisibility(false);
        frmTimeSheetCreate.flxCloneTaskToPopup.setVisibility(false);
        return;
    }
    if (displayValue.text == "All dates in week") {
        for (var dataIndex = 0; dataIndex < selectedItemDates[0].length; dataIndex++) {
            for (var i = 0; i < tempData.length; i++) {
                var tempfunc = validationForExistingTimeEntry.bind(this, selectedItemDates[0][dataIndex], tempData[i]);
                var query = "select te.Id, te.Start_Time as Start_Time, te.End_Time as End_Time from Time_Entry te where te.Date = '" + (new Date(selectedItemDates[0][dataIndex])).toYYYYMMDD("") + "';";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, tempfunc, errorCallback);
            }
        }
    } else {
        for (var i = 0; i < tempData.length; i++) {
            var tempfunc = validationForExistingTimeEntry.bind(this, selectedItemDates[0], tempData[i]);
            var query = "select te.Id, te.Start_Time as Start_Time, te.End_Time as End_Time from Time_Entry te where te.Date = '" + (new Date(selectedItemDates[0])).toYYYYMMDD("") + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, tempfunc, errorCallback);
        }
    }
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    frmTimeSheetCreate.flxBlank.isVisible = false;
    kony.apps.coe.ess.myTime.TimesheetCreate.onClickCopyButton();

    //kony.apps.coe.ess.myTime.TimesheetCreate.popups.showSuccessPopup(displayValue);
    frmTimeSheetCreate.show();
    toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.TimeSheetCreate.cloneSuccess"), 2000);
    frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(true);

};
kony.apps.coe.ess.myTime.TimesheetCreate.manualTimeEntryOnDone = function(edit_StartTime) {
    try {
        var enteredTime = frmTimeSheetCreate.tbxManualEntryhours.text;
        var startTime = [];
        var endTime = [];
        if (enteredTime == "8") {
            var sliderObj = (new kony.apps.coe.Reusable.TimelineCreation());
            kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.onClickOfFullDay(sliderObj.fillFullDay);
            kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = true;
        } else {
            kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.onClickOfHours(kony.apps.coe.Reusable.TimelineCreation.onClickOfHours);
            kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = false;
        }
        var data = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
        if (data.length === 0) {
            kony.apps.coe.ess.globalVariables.currentTaskStartIndex = kony.apps.coe.ess.appconfig.defaultSliderStartTime;
            startTime = kony.apps.coe.ess.globalVariables.currentTaskStartIndex.split(" "); //Ex. "9 AM"
            startTime[0] = parseFloat(startTime[0]);
        } else {
            kony.apps.coe.ess.globalVariables.currentTaskStartIndex = kony.apps.coe.Reusable.TimelineCreation.getHighestEndTime(data);
            startTime = kony.apps.coe.ess.globalVariables.currentTaskStartIndex;
        }
        if (edit_StartTime) { //Incase of edting
            startTime = edit_StartTime.split(" ");
        }
        startTime[0] = parseFloat(startTime[0]);
        enteredTime = parseFloat(enteredTime);

        //Initially check for half an hours in user time entry
        enteredTime = parseFloat(enteredTime);
        if ((parseFloat(enteredTime) - parseInt(enteredTime)).toFixed(1) == 0.5) {
            enteredTime = parseInt(enteredTime) + 0.3;
        }

        endTime[0] = startTime[0] + enteredTime;

        if (endTime[0] >= 13) {
            endTime[0] = (endTime[0]) % 12; //Adjusting the time between AM and PM margins
            endTime[0] = parseFloat(endTime[0].toFixed(2));
        }
        //This case could appear when the start time is at quater past half and enter time contains half an hour
        if ((parseFloat(endTime[0]) - parseInt(endTime[0])) >= 0.75) {
            var temp = (parseFloat(endTime[0]) - parseInt(endTime[0])).toFixed(2);
            temp = parseFloat(temp);
            endTime[0] = endTime[0] + 1;
            if (endTime[0] >= 13) {
                endTime[0] = endTime[0] % 12;
            }
            temp = temp - 0.6;
            temp = parseFloat(temp.toFixed(2));
            endTime[0] = parseInt(endTime[0]) + temp;
        }

        //If the time consist an half an hour duration appending zero at last of '.3' in time
        if ((parseFloat(startTime[0]) - parseInt(startTime[0])).toFixed(1) === "0.3") {
            startTime[0] = startTime[0] + "0";
        }
        if ((parseFloat(endTime[0]) - parseInt(endTime[0])).toFixed(1) === "0.3") {
            endTime[0] = endTime[0] + "0";
        }
        //If the endTime consists quater past half appending the exact '.45' to time
        if ((parseFloat(startTime[0]) - parseInt(startTime[0])).toFixed(2) === "0.45") {
            startTime[0] = parseInt(startTime[0]) + ".45";
        }
        if ((parseFloat(endTime[0]) - parseInt(endTime[0])).toFixed(2) === "0.45") {
            endTime[0] = parseInt(endTime[0]) + ".45";
        }
        //If the start time consist an half an hour and entered time also does
        if ((parseFloat(endTime[0]) - parseInt(endTime[0])).toFixed(1) === "0.6") {
            endTime[0] = parseInt(endTime[0]) + 1;
            if (endTime[0] >= 13) {
                endTime[0] = endTime[0] % 12;
            }
        }
        if (endTime[0] % 12 < startTime[0] % 12) { //If start time is in morning and end time is in afternoon
            if (startTime[1] == "AM") {
                endTime[1] = "PM";
            } else {
                endTime[1] = "AM";
            }
        } else {
            endTime[1] = startTime[1]; //If start time and end time are both in same margin
        }
        startTime = startTime[0] + " " + startTime[1];
        endTime = endTime[0] + " " + endTime[1];
        kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(startTime, endTime);
        frmTimeSheetCreate.flexSlider.isVisible = true;
    } catch (error) {
        kony.print("---- onManual time entry error: " + error);
    }
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       time duration in a string like "2.2" for 2 hours 20 minutes
 * return       A string of duration consists number of hours and minutes.
 * desc         This method sets the duration to segment
 */
kony.apps.coe.ess.myTime.TimesheetCreate.changingIntoHoursAndMinutes = function(time) {
    kony.print("---- start changingIntoHoursAndMinutes");
    try {
        if (time !== null && time !== undefined) {
            time = String(time);
            time = time.split(".");
            if (parseInt(time[0], 10) > 0) {
                if (parseInt(time[0], 10) === 1) {
                    time[0] = time[0] + " " + kony.i18n.getLocalizedString("i18n.ess.common.hour.valueKA");
                } else {
                    time[0] = time[0] + " " + kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
                }
            }
            //If it consists minutes
            if (time.length > 1 && time[1] !== null && time[1] !== undefined) {
                time[1] = time[1] + "0";
                time[1] = time[1].slice(0, 2);
                if (parseInt(time[1], 10) > 0) {
                    if (parseInt(time[1], 10) < 2) {
                        time[1] = time[1] + " " + kony.i18n.getLocalizedString("i18n.ess.common.minute.valueKA");
                    } else {
                        time[1] = time[1] + " " + kony.i18n.getLocalizedString("i18n.ess.common.minutes.valueKA");
                    }
                }
                time = time[0] + " " + time[1];
            } else {
                time = time[0];
            }
            return time;
        }
    } catch (error) {
        kony.print("---- error in changingIntoHoursAndMinutes: " + error);
    }
    kony.print("---- end changingIntoHoursAndMinutes");
};
/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None
 * return       None
 * desc         This is used to store the slider position before changing to full so that it could revert back to orginal size and position
 */
kony.apps.coe.ess.myTime.TimesheetCreate.storeSlider = function() {
    try {
        kony.print("---- in store slider");
        kony.print("---- left: " + frmTimeSheetCreate.flexSlider.left);
        kony.print("---- width" + frmTimeSheetCreate.flexSlider.width);
        if (kony.apps.coe.ess.globalVariables.fullDayButtonisSelected !== true) {
            kony.apps.coe.ess.globalVariables.prevSliderLeft = frmTimeSheetCreate.flexSlider.left;
            kony.apps.coe.ess.globalVariables.prevSliderWidth = frmTimeSheetCreate.flexSlider.width;
        }
    } catch (error) {
        handleError(error);
    }
};
/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None
 * return       None
 * desc         This function helps the slider to revert it's previous state
 */
kony.apps.coe.ess.myTime.TimesheetCreate.revertSlider = function() {
    try {
        kony.print("---- in revert slider");
        var left = kony.apps.coe.ess.globalVariables.prevSliderLeft;
        var width = kony.apps.coe.ess.globalVariables.prevSliderWidth;
        kony.print("---- left: " + kony.apps.coe.ess.globalVariables.prevSliderLeft);
        kony.print("---- width" + kony.apps.coe.ess.globalVariables.prevSliderWidth);
        if (kony.apps.coe.ess.globalVariables.prevSliderLeft !== undefined && kony.apps.coe.ess.globalVariables.prevSliderWidth !== undefined && kony.apps.coe.ess.globalVariables.prevSliderLeft !== null && kony.apps.coe.ess.globalVariables.prevSliderWidth !== null && kony.apps.coe.ess.globalVariables.prevSliderLeft !== "" && kony.apps.coe.ess.globalVariables.prevSliderWidth !== "") {
            var slider = frmTimeSheetCreate.flexSlider;
            frmTimeSheetCreate.flexSlider.left = kony.apps.coe.ess.globalVariables.prevSliderLeft;
            frmTimeSheetCreate.flexSlider.width = kony.apps.coe.ess.globalVariables.prevSliderWidth;
            frmTimeSheetCreate.flexSliderTask.width = (parseInt(kony.apps.coe.ess.globalVariables.prevSliderWidth, 10) - 50) + "dp";
            frmTimeSheetCreate.flexSlider.forceLayout();

        } else //If incase there are no previous slider positions it will take up a default function
        {
            kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime);
            kony.apps.coe.ess.globalVariables.prevSliderLeft = "";
            kony.apps.coe.ess.globalVariables.prevSliderWidth = "";
        }
    } catch (error) {
        handleError(error);
    }
};
kony.apps.coe.ess.myTime.TimesheetCreate.retainSliderPosition = function() {
			var left_distance = parseInt(frmTimeSheetCreate.flexSlider.left);
            var startTimeIndex = (new kony.apps.coe.Reusable.TimelineCreation()).search(left_distance, kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine);
            var right_distance = parseInt(frmTimeSheetCreate.flexSlider.left) + parseInt(frmTimeSheetCreate.flexSlider.width);
            var endTimeIndex = (new kony.apps.coe.Reusable.TimelineCreation()).search(right_distance, kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine);
            var startTime = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[startTimeIndex][1];
            var endTime = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[endTimeIndex][1];
            kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(startTime, endTime);
};