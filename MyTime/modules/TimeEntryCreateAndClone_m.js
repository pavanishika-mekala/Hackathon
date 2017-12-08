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


kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry = {

	AddIdInJSON : {
		Timesheet : function (data) {
			var timestamp = new Date().getUTCMilliseconds();
			data.Id = "MYTIME_V1_TMST_" + data.Start_Date + "_T_" + timestamp + "_1";
			return data;
		},
		TimeEntry : function (data) {
			var timestamp = new Date().getUTCMilliseconds();
			data.Id = "MYTIME_V1_" + data.Date + "_T_" + timestamp + "_1";
			return data;
		}
	},
  
    updateTimesheet : function(data, successCallback, errorCallback) {
        try {
            if(data.Id === null || data.Id === undefined) {
                throw "Error: Id Not Found. Please add Id in data, which is primary key.";
            }
            data.Id = String(data.Id);
            kony.apps.coe.ess.MVVM.update("MYTIME", "Timesheet", data, successCallback, errorCallback);
        } catch(err) {
            handleError(err);
        }
    },

	createTimesheet : function (date, successCallback, errorCallback) {
		var newtimesheet = {
			"Employee_Id" : kony.apps.coe.ess.globalVariables.employeeId,
			"End_Date" : "",
			"Id" : "",
			"Start_Date" : "",
			"Status_Id" : "5",
		};
		var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
		newtimesheet.Start_Date = interval[0].toYYYYMMDD("");
		newtimesheet.End_Date = interval[1].toYYYYMMDD("");
		newtimesheet = kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.AddIdInJSON.Timesheet(newtimesheet);
		kony.apps.coe.ess.MVVM.createRecord("MYTIME", "Timesheet", newtimesheet, successCallback, errorCallback);
	},
  
    cancelAllTimeEntriesInTimehseet : function(timesheetId, successCallback, errorCallback) {
        try {
            if(timesheetId === null || timesheetId  === undefined || String(timesheetId).trim() === "") {
                throw "Invalid Input in cancelAllTimeEntriesInTimehseet: timesheetId is passed  null | undefined | empty string";
            }
            var query = "select te.Id, te.StatusId from Time_Entry te where te.Timesheet_id = '" + timesheetId + "' AND te.StatusId !='3';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, function(timeEntryData) {
                for(var i in  timeEntryData) {
                    timeEntryData[i].StatusId = '3';
                }
                kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(timeEntryData, successCallback, errorCallback);
            }, errorCallback);
        } catch(err) {
            handleError(err);
        }
    },

	create : function (values, callback, errorCallback) {
		if (!Array.isArray(values)) {
			var x = [];
			x.push(values);
			values = x;
		}
		if (values.length <= 0) {
			if (callback !== null && callback !== undefined && typeof(callback) === "function") {
				callback();
			}
			return;
		}
		var successCallback = function (me, size, callback, i, res) {
			if (i >= size - 1) {
                var query = "select ts.Status_Id as Status_Id from Timesheet ts where ts.Id = '" + values[i].Timesheet_Id + "';";
		        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, function(timesheetData) {
                    if(timesheetData.length > 0 && String(timesheetData[0].Status_Id) !== "5") {
                        kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.updateTimesheet({"Id" : values[i].Timesheet_Id, "Status_Id" : "5"}, function() {
                            if (callback !== null && callback !== undefined && typeof(callback) === "function") {
					            callback();
				            }
                        }, errorCallback);
                        return;
                    }
                    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
					    callback();
				    }
                }, errorCallback);
				return;
			}
			me(i + 1);
		};
		var recCreate = function (me, values, size, callback, errorCallback, i) {
			me = me.bind(this, me, values, size, callback, errorCallback);
			var success = successCallback.bind(this, me, size, callback, i);
			var validation = kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.Validation.create(values[i]);
			if (validation.ValidationResult) {
				var date = new Date(values[i].Date.slice(0, 4), values[i].Date.slice(4, 6) - 1, values[i].Date.slice(6, 8));
				kony.apps.coe.ess.myTime.getTimesheetDataForADate(date, function (values, i, success, errorCallback, tsd) {
					if (tsd !== null) {
						values[i].Timesheet_Id = tsd.Id;
						var data = kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.AddIdInJSON.TimeEntry(values[i]);
						data.Actual_Hours = kony.apps.coe.ess.myTime.TimesheetCreate.timeEntryCreate.getTimeDiff(data.End_Time, data.Start_Time);
						kony.apps.coe.ess.MVVM.createRecord("MYTIME", "Time_Entry", data, success, errorCallback);
					} else {
						kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.createTimesheet(date, function (me, i) {
							me(i);
						}
							.bind(this, me, i), errorCallback);
					}
				}
					.bind(this, values, i, success, errorCallback), errorCallback);
			} else {
				kony.print(validation.ErrorMsg);
			}
		};
		recCreate = recCreate.bind(this, recCreate, values, values.length, callback, errorCallback);
		recCreate(0);
	},

	update : function (values, callback, errorCallback) {
		if (!Array.isArray(values)) {
			var x = [];
			x.push(values);
			values = x;
		}
		if (values.length <= 0) {
			if (callback !== null && callback !== undefined && typeof(callback) === "function") {
				callback();
			}
			return;
		}
		var successCallback = function (me, size, callback, i, res) {
			if (i >= size - 1) {
                var query = "select ts.Id as Timesheet_Id, ts.Status_Id as Status_Id from Time_Entry te left join Timesheet ts on te.Timesheet_Id = ts.Id where te.Id = '" + values[i].Id + "';";
		        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, function(timesheetData) {
                    if(timesheetData.length > 0 && String(timesheetData[0].Status_Id) !== "5") {
                        kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.updateTimesheet({"Id" : timesheetData[0].Timesheet_Id, "Status_Id" : "5"}, function() {
                            if (callback !== null && callback !== undefined && typeof(callback) === "function") {
					            callback();
				            }
                        }, errorCallback);
                        return;
                    }
                    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
					    callback();
				    }
                }, errorCallback);
				return;
			}
			me(i + 1);
		};
		var recCreate = function (me, values, size, callback, errorCallback, i) {
			me = me.bind(this, me, values, size, callback, errorCallback);
			var success = successCallback.bind(this, me, size, callback, i);
			var validation = kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.Validation.update(values[i]);
			if (validation.ValidationResult) {
				if (values[i].End_Time && values[i].Start_Time) {
					values[i].Actual_Hours = kony.apps.coe.ess.myTime.TimesheetCreate.timeEntryCreate.getTimeDiff(values[i].End_Time, values[i].Start_Time);
				}
				kony.apps.coe.ess.MVVM.update("MYTIME", "Time_Entry", values[i], success, errorCallback);
			} else {
				kony.print(validation.ErrorMsg);
			}
		};
		recCreate = recCreate.bind(this, recCreate, values, values.length, callback, errorCallback);
		recCreate(0);
	},

	Validation : {
		create : function (Time_entry_JSON) {
			if (!Time_entry_JSON instanceof Object) {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "Invalid arguments to the method expected Json arguments"
				};
			} else if (Time_entry_JSON.Date === undefined || Time_entry_JSON.Date === null || Time_entry_JSON.Date === "") {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "The time_entry json doesnot contain the Date key : " + Time_entry_JSON.Date
				};

			} else if (Time_entry_JSON.Employee_Id === undefined || Time_entry_JSON.Employee_Id === null || Time_entry_JSON.Employee_Id === "") {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "The time_entry json doesnot contain the Employeeid key :" + Time_entry_JSON.Employee_Id
				};

			} else if (Time_entry_JSON.StatusId === undefined || Time_entry_JSON.StatusId === null || Time_entry_JSON.StatusId === "") {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "The time_entry json doesnot contain the StatusId key " + Time_entry_JSON.StatusId
				};

			} else if (Time_entry_JSON.Start_Time === undefined || Time_entry_JSON.Start_Time === null || Time_entry_JSON.Start_Time === "") {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "The time_entry json doesnot contain the Start_Time key " + Time_entry_JSON.Start_Time
				};

			} else if (Time_entry_JSON.End_Time === undefined || Time_entry_JSON.End_Time === null || Time_entry_JSON.End_Time === "") {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "The time_entry json doesnot contain the End_Time key " + Time_entry_JSON.End_Time
				};

			} else {
				return {
					"ValidationResult" : true,
					"ErrorMsg" : "Json is valid"
				};
			}

		},

		update : function (Time_entry_JSON) {
			if (!Time_entry_JSON instanceof Object) {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "Invalid arguments to the method expected Json arguments"
				};
			} else if (Time_entry_JSON.Id === undefined || Time_entry_JSON.Id === null || Time_entry_JSON.Id === "") {
				return {
					"ValidationResult" : false,
					"ErrorMsg" : "The time_entry json doesnot contain the Id key " + JSON.stringify(Time_entry_JSON)
				};
			} else {
				return {
					"ValidationResult" : true,
					"ErrorMsg" : "Json is valid"
				};

			}
		}
	}
};

kony.apps.coe.ess.myTime.TimesheetCreate.Clone = {
  
    isTimeEntryExistForTimesheet : function (date, successCallback, errorCallback) {
		kony.apps.coe.ess.myTime.getTimesheetDataForADate(date, function (tsd) {
			function success(res) {
				if (res !== null && res.length > 0) {
					successCallback(true);
				} else {
                    successCallback(false);
                }
			}
			if (tsd !== null) {
				var query = "select te.Id from Time_Entry te where te.Timesheet_Id = '" + tsd.Id + "' AND te.StatusId != '3';";
				kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, errorCallback);
			} else {
				successCallback(false);
			}
		}, errorCallback);
	},
  
	isTimeEntryExistForDate : function (date, successCallback, errorCallback) {
		function success(res) {
			if (res !== null && res.length > 0) {
				successCallback(true);
				return;
			}
			successCallback(false);
		}
		var query = "select te.Id from Time_Entry te where te.Date = '" + date.toYYYYMMDD("") + "' AND te.StatusId != '3';";
		kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, errorCallback);
	},
  	CloneTimeline: function (fromTo, successCallback, errorCallback) {
		//It will overwrite existing.

		function makeSetOfValues(arr) {
			if (arr.length <= 0) {
				return "()";
			}
			var valuesSet = {};
			for (var i in arr) {
				valuesSet[arr[i]] = "";
			}
			var str = "(";
			for (var i in valuesSet) {
				str += "'" + i + "',";
			}
			str = str.substring(0, str.length - 1);
			str += ")";
			return str;
		}

		if (!Array.isArray(fromTo)) {
			var x = [];
			x.push(fromTo);
			fromTo = x;
		}
		if (fromTo.length <= 0) {
			if (successCallback !== null && successCallback !== undefined && typeof(successCallback) === "function") {
				successCallback();
			}
			return;
		}
		var toFromDates = {};
		var tempArrFrom = [];
		var tempArrTo = [];
		for (var i = 0; i < fromTo.length; i++) {
			toFromDates[fromTo[i].to.toYYYYMMDD("")] = fromTo[i].from.toYYYYMMDD("");
			tempArrFrom.push(fromTo[i].from.toYYYYMMDD(""));
			tempArrTo.push(fromTo[i].to.toYYYYMMDD(""));
		}
		tempArrFrom = makeSetOfValues(tempArrFrom);
		tempArrTo = makeSetOfValues(tempArrTo);
		function success_Cancel(res) {
			function addNewEntries() {
				function success_Add(res) {
					var rbTree = new kony.apps.coe.RedBlackTree();
					for (var i in res) {
						rbTree.insert(res[i].Date, res[i]);
					}
					var entriesCloneData = [];
					for (var i in toFromDates) {
						var tempArray = rbTree.get(toFromDates[i]);
						for (var j in tempArray) {
							var newRecord = JSON.parse(JSON.stringify(tempArray[j]));
							newRecord.StatusId = "5";
							newRecord.Date = i;
							entriesCloneData.push(newRecord);
						}
					}
					kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.create(entriesCloneData, successCallback, errorCallback);
				}
				var query = "select te.Employee_Id as Employee_Id, te.Date as Date, te.End_Time as End_Time, te.Start_Time as Start_Time, te.Time_Type_Id as Time_Type_Id, te.Activity_Description as Activity_Description, te.StatusId as StatusId, te.Project_Task_id as Project_Task_id, te.Project_Task_Type as Project_Task_Type from Time_Entry te where te.Date IN " + tempArrFrom + " AND te.StatusId != '3';";
				kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success_Add, errorCallback);
			}
			if (res !== null && res.length > 0) {
				for (var i in res) {
					res[i].StatusId = "3";
				}
				kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(res, addNewEntries, errorCallback);
			} else {
				addNewEntries();
			}
		}
		var query = "select te.Id as Id, te.StatusId as StatusId from Time_Entry te where te.Date IN " + tempArrTo + " AND te.StatusId != '3';";
		kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success_Cancel, errorCallback);
	},
    
    cloneTimelineFromOneToMultipleDates : function(fromDate, toDateArray, successCallback, errorCallback) {
        fromDate = new Date(fromDate.roundOfLocaleDate());
        var dateSetToClone = [];
        for(var i in toDateArray) {  	
            dateSetToClone.push({
			    "from" : fromDate,
			    "to" : new Date(toDateArray[i]).roundOfLocaleDate()
            });
        }
        kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimeline(dateSetToClone, successCallback, errorCallback);
    },

	CloneTimelineFromLastEntry : function (dateObj, successCallback, errorCallback) {
		dateObj = dateObj.roundOfLocaleDate();
		kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimeline({
			"from" : dateObj.previousDay(),
			"to" : dateObj
		}, successCallback, errorCallback);
	},
  
    CloneFromLastTimesheet : function (dateObj, successCallback, errorCallback) {
		dateObj = dateObj.roundOfLocaleDate();
		var from = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(dateObj, new Date(dateObj.getFullYear(), 1, 1))[0].previousDay();
        kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimesheet(from, dateObj, successCallback, errorCallback);
	},
    
	CloneTimesheet: function (fromDateObj, toDateObj, successCallback, errorCallback) {
      kony.print("fromDateObject" + fromDateObj);
      kony.print("toDateObject" + toDateObj);
		//fromDateObj and toDateObj are date which lies under two different timesheets.
		kony.apps.coe.ess.myTime.getTimesheetDataForADate(toDateObj, function (timesheetData) {
			if (timesheetData === null || timesheetData.Status_Id === "1" || timesheetData.Status_Id === "5" || timesheetData.Status_Id === "6") {
				var from_interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(fromDateObj, new Date(fromDateObj.getFullYear(), 1, 1));
				var to_interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(toDateObj, new Date(toDateObj.getFullYear(), 1, 1));
				var from_to_dates = [];
				for (var from = from_interval[0], to = to_interval[0]; from <= from_interval[1] && to <= to_interval[1]; ) {
					from_to_dates.push({
						"from": from,
						"to": to
					});
					from = from.nextDay();
					to = to.nextDay();
				}
				kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimeline(from_to_dates, successCallback, errorCallback);
			} else {
				errorCallback("Timesheet is not editable");
			}
		}, errorCallback);

	},
    
    pickerViewData: function (date) {
		try {
			if (!date instanceof Date) {
				throw "Invalid arguments: pickerViewData required Date Object as paramter";
			}
			var timesheetDef = kony.apps.coe.ess.globalVariables.timesheetLengthConfig;
			var futureTimesheet = kony.apps.coe.ess.globalVariables.futureTimesheets;
			if (timesheetDef !== null && timesheetDef !== undefined && futureTimesheet !== null && futureTimesheet !== undefined && date instanceof Date) {
				timesheetDef = timesheetDef.toLowerCase();
				futureTimesheet = parseInt(futureTimesheet);
				var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date);
				var fptr = interval[0];
				var rptr = interval[1];
				var finalData = [];
				var front = [];
				for (var i = 0; i < futureTimesheet; i++) {
					interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(fptr.previousDay());
					front.push({
						"startDate": interval[0].toDateString(),
						"endDate": interval[1].toDateString()
					});
					fptr = interval[0];
				}
				while (front.length > 0) {
					finalData.push(front.pop());
				}
				for (var i = 0; i < futureTimesheet; i++) {
					interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(rptr.nextDay());
					finalData.push({
						"startDate": interval[0].toDateString(),
						"endDate": interval[1].toDateString()
					});
					rptr = interval[1];
				}
				return finalData;
			}
			return [];
		} catch (err) {
			handleError(err);
		}
	}
};

