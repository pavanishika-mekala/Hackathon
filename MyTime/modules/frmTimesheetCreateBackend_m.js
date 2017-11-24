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

kony.apps.coe.ess.myTime.TimesheetCreate.Backend = {

    RecentTasksIdForKonyStore: "mytimerecenttasks",

    contextData: null,

    CurrentTaskTimelineData: {

        data: {
            Project_Task_Id: null,
            TimeType_Id: null,
            Time_Entry_Id: null,
            Start_Time: null,
            End_Time: null,
            Task_Name: null,
            isBillable: null,
            Project_Task_Type: null,
            Desc: "",
            Time_Line_Status: null
        },

        get: function() {
            return this.data;
        },

        isTaskSelected: function() {
            return this.data.Project_Task_Id !== null;
        },

        isValidData: function() {
            return this.data.TimeType_Id !== null;
        },

        reset: function() {
            frmTimeSheetCreate.segTimeType.selectedRowIndex = null;
            frmTimeSheetCreate.segProjectTaskSelection.selectedRowIndex = null;
            frmTimeSheetCreate.segLeaveSelection.selectedRowIndex = null;
            kony.apps.coe.Reusable.TimelineCreation.updateTaskName("");
            this.data = {
                Project_Task_Id: null,
                TimeType_Id: null,
                Time_Entry_Id: null,
                Start_Time: null,
                End_Time: null,
                Task_Name: null,
                isBillable: null,
                Project_Task_Type: null,
                Desc: "",
                Time_Line_Status: null
            };
        }
    },

    addTimeEntriesInDB: function(timeEntryData) {
        if (timeEntryData === null || timeEntryData === undefined) {
            return;
        }
        if (!Array.isArray(timeEntryData)) {
            timeEntryData = [timeEntryData];
        }
        kony.application.showLoadingScreen("", "Loading Data...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        var successCallbackForDeletion = function(res) { kony.print("Succesfully deleted: Time_Entry : " + res); };
        var errorCallbackForDeletion = function(err) { handleError(err); };

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
            if (time.indexOf("PM") >= 0) {
                isPM = true;
            }
            var x = time.split(".");
            var hh = parseInt(x[0]);
            var mm;
            if (x.length < 2) {
                mm = "00";
            } else {
                mm = makeItTwoDigits(parseInt(x[1]));
            }
            if (isPM && hh === 12) {
                hh = 12;
            } else if (!isPM && hh === 12) {
                hh = "00";
            } else if (hh >= 1 && isPM) {
                hh += 12;
            }
            hh = makeItTwoDigits(hh);
            return hh + "" + mm + "00";
        }

        var added = [];
        var modified_deleted = [];
        for (var i = 0; i < timeEntryData.length; i++) {
            var date = kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData().date.toYYYYMMDD("");
            var temp = timeEntryData[i];
            var Time_entry_record;
            if (temp.data.Time_Line_Status === "added") {
                Time_entry_record = {};
                Time_entry_record.Employee_Id = kony.apps.coe.ess.globalVariables.employeeId;
                Time_entry_record.Date = date;
                Time_entry_record.End_Time = getHHMMSS(temp.endTime);
                Time_entry_record.Start_Time = getHHMMSS(temp.startTime);
                Time_entry_record.Time_Type_Id = temp.data.TimeType_Id;
                Time_entry_record.Activity_Description = temp.data.Desc;
                Time_entry_record.StatusId = "5";
                if (temp.data.Project_Task_Id !== null) {
                    Time_entry_record.Project_Task_id = temp.data.Project_Task_Id;
                }
                if (temp.data.Project_Task_Type !== null) {
                    Time_entry_record.Project_Task_Type = temp.data.Project_Task_Type;
                }
                added.push(Time_entry_record);
            } else if (temp.data.Time_Line_Status === "modified") {
                Time_entry_record = {};
                Time_entry_record.Id = temp.data.Time_Entry_Id;
                Time_entry_record.Employee_Id = kony.apps.coe.ess.globalVariables.employeeId;
                Time_entry_record.Date = date;
                Time_entry_record.End_Time = getHHMMSS(temp.endTime);
                Time_entry_record.Start_Time = getHHMMSS(temp.startTime);
                Time_entry_record.Time_Type_Id = temp.data.TimeType_Id;
                Time_entry_record.Activity_Description = temp.data.Desc;
                Time_entry_record.StatusId = "5";
                if (temp.data.Project_Task_Id !== null) {
                    Time_entry_record.Project_Task_id = temp.data.Project_Task_Id;
                }
                if (temp.data.Project_Task_Type !== null) {
                    Time_entry_record.Project_Task_Type = temp.data.Project_Task_Type;
                }
                modified_deleted.push(Time_entry_record);
            } else if (temp.data.Time_Line_Status === "deleted") {
                Time_entry_record = {};
                Time_entry_record.Id = temp.data.Time_Entry_Id;
                Time_entry_record.StatusId = "3";
                modified_deleted.push(Time_entry_record);
            }
        }
        if (modified_deleted.length > 0) {
            kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(modified_deleted, function() {
                if (added.length > 0) {
                    kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.create(added, function() {
                        kony.application.dismissLoadingScreen();
                        kony.apps.coe.ess.Sync.syncAsynchronously();
                    }, function(e) {
                        kony.application.dismissLoadingScreen();
                        handleError(e);
                    });
                } else {
                    kony.application.dismissLoadingScreen();
                }
            }, function(err) {
                kony.application.dismissLoadingScreen();
                handleError(err);
            });
        } else if (added.length > 0) {
            kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.create(added, function() {
                if (modified_deleted.length > 0) {
                    kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(modified_deleted, function() {
                        kony.application.dismissLoadingScreen();
                        kony.apps.coe.ess.Sync.syncAsynchronously();
                    }, function(err) {
                        kony.application.dismissLoadingScreen();
                        handleError(err);
                    });
                }else{
                    kony.application.dismissLoadingScreen();
                }
            }, function(e) {
                kony.application.dismissLoadingScreen();
                handleError(e);
            });
        } else {
            kony.application.dismissLoadingScreen();
        }
    },

    populateData: {
        projectTask: function() {
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.fetchData.projectTask();
        },

        leaves: function() {
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.fetchData.leaves();
        },

        timeType: function() {
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.fetchData.timeType();
        },

        search: function() {}
    },

    fetchData: {
        projectTask: function() {
            var query = "SELECT pt.id as Project_Task_Id, pt.Type as Project_Task_Type, pt.Project_Id as Project_Id, pt.Task_Id as Task_Id, t.Task_Name as Task_Name, p.Project_Name as Project_Name FROM Project_Task pt" +
                " LEFT JOIN Project p ON pt.Project_Id = p.id" +
                " LEFT JOIN Task t ON pt.Task_Id = t.id;";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, kony.apps.coe.ess.myTime.TimesheetCreate.Backend.processData.projectTask, function(res) { handleError(res); });
        },

        leaves: function() {
            var query = "select tt.ID, tt.Name, ttc.ID as Time_Type_Category_Id from Time_Type tt left join Time_Type_Category ttc on tt.Time_Type_Category_Id=ttc.id where ttc.Type='ABSENT';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, kony.apps.coe.ess.myTime.TimesheetCreate.Backend.processData.leaves, function(res) { handleError(res); });
        },

        timeType: function() {
            var query = "select tt.ID, tt.Name, ttc.ID as Time_Type_Category_Id from Time_Type tt left join Time_Type_Category ttc on tt.Time_Type_Category_Id=ttc.id where ttc.Type='WORKHOURS';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, kony.apps.coe.ess.myTime.TimesheetCreate.Backend.processData.timeType, function(res) { handleError(res); });
        },

        search: function() {}
    },

    processData: {
        projectTask: function(data) {
            for (var i = 0; i < data.length; i++) {
                data[i].Project_Name = data[i].Project_Name === null ? "" : data[i].Project_Name;
                data[i].Task_Name = data[i].Task_Name === null ? "" : data[i].Task_Name;
                if (data[i].Project_Name !== "" && data[i].Task_Name === "") {
                    var temp = data[i].Project_Name;
                    data[i].Project_Name = data[i].Task_Name;
                    data[i].Task_Name = temp;
                }
            }
            data = kony.apps.coe.makeGroups(
                "Project_Name",
                data,
                function(a, b) {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    return kony.string.compare(a, b);
                }
            );
            var segdata = [];
            for (var i = 0; i < data.length; i++) {
                var header = { "lblProjectNameHeader": data[i][0].Project_Name };
                var secdata = [];
                for (var j = 0; j < data[i].length; j++) {
                    secdata.push({
                        Project_Task_Id: data[i][j].Project_Task_Id,
                        Project_Id: data[i][j].Project_Id,
                        Task_Id: data[i][j].Task_Id,
                        Project_Task_Type: data[i][j].Project_Task_Type,
                        lblProjectName: data[i][j].Task_Name.toString().titleCase(),
                        template: flxSegProjectSelection
                    });
                }
                //                 if(header.lblProjectNameHeader === "") {
                //                     segdata.push(secdata);
                //                 } else {
                segdata.push([header, secdata]);
                //                 }
            }
            segdata.sort(function(a, b) {
                if (a[0].lblProjectNameHeader === "") {
                    return 1;
                }
                return 0;
            });

            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.processData.addRecentTasksAtTop(segdata, kony.apps.coe.ess.myTime.TimesheetCreate.Backend.bindData.projectTask);
        },

        addRecentTasksAtTop: function(data, callback) {
            var arr = kony.ds.read(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.RecentTasksIdForKonyStore);
            arr = arr === null ? [] : arr;
            arr.reverse();
            var allids = "";
            for (var i in arr) {
                allids += "'" + arr[i] + "',";
            }
            if (arr.length > 0) {
                allids = allids.substring(0, allids.length - 1);
            }
            var successCallback = function(data, callback, res) {
                if (res !== null && res.length > 0) {
                    var keyvalue = {};
                    for (var i = 0; i < res.length; i++) {
                        keyvalue[res[i].Project_Task_Id] = res[i];
                    }
                    var tempdata = [];
                    for (var i in arr) {
                        if (keyvalue[arr[i]] !== undefined) {
                            tempdata.push(keyvalue[arr[i]]);
                        }
                    }
                    var header = { "lblProjectNameHeader": "Recent Tasks" };
                    var secdata = [];
                    for (var i = 0; i < tempdata.length; i++) {
                        var projectname = tempdata[i].Project_Name === null ? "" : tempdata[i].Project_Name;
                        var taskname = tempdata[i].Task_Name === null ? "" : tempdata[i].Task_Name;
                        var templatename = "";
                        if (projectname === "" && taskname !== "") {
                            var temp = projectname;
                            projectname = taskname;
                            taskname = temp;
                            templatename = flxSegProjectSelection;
                        } else if (projectname !== "" && taskname === "") {
                            templatename = flxSegProjectSelection;
                        } else {
                            templatename = flxSegProjectTaskSelection;
                        }
                        secdata.push({
                            Project_Task_Id: tempdata[i].Project_Task_Id,
                            Project_Id: tempdata[i].Project_Id,
                            Task_Id: tempdata[i].Task_Id,
                            Project_Task_Type: tempdata[i].Project_Task_Type,
                            lblProjectName: projectname.toString().titleCase(),
                            lblTaskName: taskname.toString().titleCase(),
                            template: templatename,
                        });
                    }
                    data.unshift([header, secdata]);
                }
                if (callback !== null && callback !== undefined && typeof(callback) === "function") {
                    callback(data);
                }
            }.bind(this, data, callback);
            var query = "SELECT pt.id as Project_Task_Id, pt.Type as Project_Task_Type, pt.Project_Id as Project_Id, pt.Task_Id as Task_Id, t.Task_Name as Task_Name, p.Project_Name as Project_Name FROM Project_Task pt" +
                " LEFT JOIN Project p ON pt.Project_Id = p.id" +
                " LEFT JOIN Task t ON pt.Task_Id = t.id" +
                " where pt.id IN (" + allids + ")";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, function(res) { handleError(res); });
        },

        leaves: function(data) {
            for (var i = 0; i < data.length; i++) {
                data[i].imgSelection = "blankimage.png";
            }
            frmTimeSheetCreate.segLeaveSelection.widgetDataMap = { "lblProjectName": "Name", "imgSelection": "imgSelection" };
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.bindData.leaves(data);
        },

        timeType: function(data) {
            frmTimeSheetCreate.flexSlider.isVisible = true;
            for (var i = 0; i < data.length; i++) {
                data[i].imgSelection = "blankimage.png";
            }
            frmTimeSheetCreate.segTimeType.widgetDataMap = { "lblProjectName": "Name", "imgSelection": "imgSelection" };
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.bindData.timeType(data);
        },

        search: function() {}
    },

    bindData: {
        projectTask: function(data) {
            kony.print("---- setData in bindData projectTask");
            frmTimeSheetCreate.segProjectTaskSelection.setData(data);
        },

        leaves: function(data) {
            kony.print("---- setData in bindData leaves");
            frmTimeSheetCreate.segLeaveSelection.setData(data);
			frmTimeSheetCreate.segLeaveSelection.setVisibility(true);
            frmTimeSheetCreate.imgArrowDown.src = "arow_up.png";
        },

        timeType: function(data) {
            kony.print("---- setData in bindData timeType");
            frmTimeSheetCreate.segTimeType.setData(data);
            frmTimeSheetCreate.segTimeType.setVisibility(true);
            frmTimeSheetCreate.imgArrowDown.src = "arow_up.png";
        },

        search: function() {}
    }
};
/**
 * @class          TimelineCreation
 * @type           function
 * @param          None
 * @return         None
 * @description    This method currently alerts the geo-location on a time slot creation
 */
kony.apps.coe.ess.myTime.TimesheetCreate.getPosition = function() {
    try {
        kony.print("---- start getPosition");
        if (kony.store.getItem("GPSTracking") === false || kony.store.getItem("GPSTracking") === true) {
            kony.apps.coe.ess.appconfig.getCurrentLocation = kony.store.getItem("GPSTracking");
        }
        if (kony.apps.coe.ess.appconfig.getCurrentLocation) {
            kony.location.getCurrentPosition(
                function(position) {
                    var location = "latitude: " + position.coords.latitude;
                    location = location + " longitude: " + position.coords.longitude;
                    location = location + " timestamp: " + position.coords.timestamp;
                    //alert(location);
                },
                function(positionError) {
                    var errorMsg =kony.i18n.getLocalizedString("i18n.ess.common.turnOnLocationServices");
                    kony.print("---- getCurrentPosition errorcallback: " + errorMsg);
                    handleError(errorMsg);
                });
        }
    } catch (error) {
        kony.print("---- error in getPosition: " + error.message);
    }

    kony.print("---- end getPosition");

};