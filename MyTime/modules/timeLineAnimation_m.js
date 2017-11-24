/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Number}-searchElement
 * @param          Array to be searched
 * @return         Closest Index of search element
 * @description    This method searches the element in the array and returns closest index of that element.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.search = function(searchElement, searchArray) {
    var minIndex = 0;
    var maxIndex = searchArray.length - 1;
    var mid;
    while (maxIndex - minIndex > 1) {
        mid = Math.round((minIndex + maxIndex) / 2);
        if (searchArray[mid][0] <= searchElement) {
            minIndex = mid;
        } else {
            maxIndex = mid;
        }
    }
    if (searchElement - searchArray[minIndex][0] <= searchArray[maxIndex][0] - searchElement) {
        return minIndex;
    } else {
        return maxIndex;
    }

};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Number}-startTime
 * @return         Time with AM/PM
 * @description    This method returns time with am/pm.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.getTimeFormatWithAMPM = function(startTime) {
    var ampmtime = "";
    if (startTime === 0 || startTime === 24) {
        ampmtime = "12 AM";
    } else if (startTime < 12) {
        ampmtime = startTime + " AM";
    } else if (startTime > 12) {
        ampmtime = startTime % 12 + " PM";
    } else {
        ampmtime = "12 PM";
    }
    return ampmtime;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {String}-field based on which array to be sorted
 * @return         sorted Array
 * @description    This method sorts the array based on JSON field.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.sortTimeSheetData = function(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    };
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Number}-startIndex of Slider
 * @param          {Number}-endIndex of the Slider
 * @param          {Number}-value to be assigned
 * @return         None
 * @description    This method is used to change the flag value(unfixed index to fixed index and viceversa).
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.changeFixedIndex = function(startIndex, endIndex, value) {
    for (var i = startIndex; i < endIndex; i++) {
        kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[i][2] = value;
    }

};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          Array-TimeSheetData
 * @param          {Number}-starting Index
 * @param          {Number}-ending Index
 * @param          {String}-Name of the overriding flex
 * @return         None
 * @description    This method is used to check whether conflict is present in TimeLine or not and calls function to replace conflicts .
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.checkConflictsAndOverrideTimeLine = function(TimeSheetData, startIndex, endIndex, OverrideFlexName) {
    var sortedArray, startTime, endTime, frmName, flexId, flexLeft, coordinates = [];
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    coordinates = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    if ((TimeSheetData.length !== undefined) || (TimeSheetData.length !== 0)) {
        for (var loopValue = 0; loopValue < TimeSheetData.length; loopValue++) {
            if (TimeSheetData[loopValue] !== undefined && (TimeSheetData[loopValue] !== null)) {
                if (TimeSheetData[loopValue].flexName !== undefined && TimeSheetData[loopValue].flexName !== OverrideFlexName) {
                    if ((startIndex < TimeSheetData[loopValue].endIndex) && (TimeSheetData[loopValue].startIndex < startIndex)) {
                        flexId = TimeSheetData[loopValue].flexName;
                        flexLeft = coordinates[TimeSheetData[loopValue].startIndex][0];
                        frmName[flexId].width = (coordinates[startIndex][0] - flexLeft - 2) + "dp";
                        TimeSheetData[loopValue].endIndex = obj.search(parseInt(frmName[flexId].width) + flexLeft, coordinates);
                        startTime = coordinates[TimeSheetData[loopValue].startIndex][1];
                        endTime = coordinates[TimeSheetData[loopValue].endIndex][1];
                        id = flexId.split("flxSelectedTime");
                        frmName[flexId]["lblSelectedTime" + id[1]].text = startTime + "-" + endTime;
                        TimeSheetData[loopValue].startTime = startTime;
                        TimeSheetData[loopValue].endTime = endTime;
                        TimeSheetData[loopValue].data.Start_Time = startTime;
                        TimeSheetData[loopValue].data.End_Time = endTime;
                        if (TimeSheetData[loopValue].data.Time_Line_Status === null || TimeSheetData[loopValue].data.Time_Line_Status === "") {
                            TimeSheetData[loopValue].data.Time_Line_Status = "modified";
                        }
                    } else if ((endIndex > TimeSheetData[loopValue].startIndex) && (TimeSheetData[loopValue].endIndex > endIndex)) {
                        flexId = TimeSheetData[loopValue].flexName;
                        flexLeft = coordinates[endIndex][0];
                        frmName[flexId].left = flexLeft + "dp";
                        frmName[flexId].width = (coordinates[TimeSheetData[loopValue].endIndex][0] - flexLeft - 2) + "dp";
                        TimeSheetData[loopValue].startIndex = obj.search(flexLeft, coordinates);
                        TimeSheetData[loopValue].endIndex = obj.search(parseInt(frmName[flexId].width) + flexLeft, coordinates);
                        startTime = coordinates[TimeSheetData[loopValue].startIndex][1];
                        endTime = coordinates[TimeSheetData[loopValue].endIndex][1];
                        id = flexId.split("flxSelectedTime");
                        frmName[flexId]["lblSelectedTime" + id[1]].text = startTime + "-" + endTime;
                        TimeSheetData[loopValue].startTime = startTime;
                        TimeSheetData[loopValue].endTime = endTime;
                        TimeSheetData[loopValue].data.Start_Time = startTime;
                        TimeSheetData[loopValue].data.End_Time = endTime;
                        if (TimeSheetData[loopValue].data.Time_Line_Status === null || TimeSheetData[loopValue].data.Time_Line_Status === "") {
                            TimeSheetData[loopValue].data.Time_Line_Status = "modified";
                        }
                    } else if ((TimeSheetData[loopValue].startIndex < endIndex) && ((TimeSheetData[loopValue].endIndex == endIndex))) {
                        flexId = TimeSheetData[loopValue].flexName;
                        TimeSheetData[loopValue] = obj.removeConflictedTime(TimeSheetData[loopValue], flexId);
                    } else if ((TimeSheetData[loopValue].startIndex > startIndex) && ((TimeSheetData[loopValue].endIndex < endIndex))) {
                        flexId = TimeSheetData[loopValue].flexName;
                        TimeSheetData[loopValue] = obj.removeConflictedTime(TimeSheetData[loopValue], flexId);
                    } else if (startIndex === TimeSheetData[loopValue].startIndex && TimeSheetData[loopValue].endIndex < endIndex) {
                        flexId = TimeSheetData[loopValue].flexName;
                        TimeSheetData[loopValue] = obj.removeConflictedTime(TimeSheetData[loopValue], flexId);
                    }
                }
            }
        }
    }
    return TimeSheetData;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          Array-TimeSheetData
 * @param          {Number}-starting Index
 * @param          {Number}-ending Index
 * @param          {String}-Name of the overriding flex
 * @return         None
 * @description    This method is used to check whether conflict is present in TimeLine or not and calls function to replace conflicts.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.storeFrameValuesOfTimeLine = function() {
    kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var frameValues = [];
    for (var loop = 0; loop < kony.apps.coe.Reusable.TimelineCreation.noofHours; loop++) {
        if (frmName.timeLineScrollFlex["flexTimeLine" + loop]["lblTime" + loop].text === kony.apps.coe.Reusable.TimelineCreation.initialScrollHour) {
            kony.apps.coe.Reusable.TimelineCreation.defaultFrameValue = parseInt(JSON.stringify(frmName.timeLineScrollFlex["flexTimeLine" + loop].frame.x));
            var iphoneHack = loop;
            //#ifdef iphone
            iphoneHack = iphoneHack + 2;
            //#endif
            //#ifdef ipad
            iphoneHack = iphoneHack + 2;
            //#endif
            var x = frmName.timeLineScrollFlex["flexTimeLine" + iphoneHack];
        }
        frameValues.push([parseInt(JSON.stringify(frmName.timeLineScrollFlex["flexTimeLine" + loop].frame.x))]);
    }
    kony.apps.coe.Reusable.TimelineCreation.frameValueOfTimeLine = frameValues;
    kony.apps.coe.Reusable.TimelineCreation.parentWidgetName.timeLineScrollFlex.scrollToWidget(x);
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {JSON object}-commonWidget
 * @param          gestureInfo
 * @param          context
 * @return         None
 * @description    This method is the callback function of TimeLine tap gesture.On tap of Time in Timeline gets slider at that position.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.tapTimeToGetSlider = function(commonWidget, gestureInfo, context) {
    kony.print("---- I'm here in tapTimeToGetSlider");
    if(kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent === false){
        return;
    }
    if (kony.apps.coe.ess.globalVariables.prevSlider !== "") {
        this.TapSlidertoFixTask(kony.apps.coe.ess.globalVariables.prevSlider);
        //kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
    }
    kony.apps.coe.ess.globalVariables.notFirstTask = true;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
    kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    var leftPosition = 0,
        checkEndIndexFilled,
        length,
        endPosition = 0,
        checkStartIndexFilled = 0,
        XCoordinatesOfTimeLine = [],
        taskUnit,
        timeUnit;
    frmName.flexSliderTask.lblTaskName.text = kony.apps.coe.Reusable.TimelineCreation.taskName;
    frmName.flexSlider.isVisible = true;
    kony.apps.coe.ess.globalVariables.prevSlider = frmName.flexSlider;
    taskUnit = parseInt(kony.store.getItem("defaultTaskDuration"));
    timeUnit = kony.store.getItem("minTaskDuration");
    leftPosition = (commonWidget.frame.x + 45);
    XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    length = XCoordinatesOfTimeLine.length;
    checkStartIndexFilled = obj.search((parseInt(commonWidget.frame.x) + 45), XCoordinatesOfTimeLine);
    if (timeUnit === "1:00" || timeUnit === null || timeUnit === "") {
        if (isNaN(taskUnit)) {
            taskUnit = 2 * 80;
        } else {
            taskUnit = taskUnit * kony.apps.generalizeWidthInDp(80);
        }
    } else if (timeUnit === "0:15") {
        taskUnit = taskUnit * 4 * 80;
    }
    if ((XCoordinatesOfTimeLine[checkStartIndexFilled + 1][2] !== 1) || (XCoordinatesOfTimeLine[checkStartIndexFilled + 2][2] !== 1)) {
        if ((parseInt(commonWidget.frame.x)) == XCoordinatesOfTimeLine[length - 8][0] - 18) {
            if (XCoordinatesOfTimeLine[length - 12][2] !== 1) {
                leftPosition = XCoordinatesOfTimeLine[length - 12][0] + 45;
            } else {
                leftPosition = parseInt(commonWidget.frame.x) + 45;
            }
        } else if ((parseInt(commonWidget.frame.x)) == XCoordinatesOfTimeLine[length - 4][0] - 18) {
            if (XCoordinatesOfTimeLine[length - 12][2] !== 1) {
                leftPosition = XCoordinatesOfTimeLine[length - 12][0] + 45;
            } else if (XCoordinatesOfTimeLine[length - 8][2] !== 1) {
                leftPosition = XCoordinatesOfTimeLine[length - 8][0] + 45;
            } else {
                frmName.flexSlider.isVisible = false;
            }
        }
        checkEndIndexFilled = obj.search(leftPosition + kony.apps.generalizeWidthInDp(taskUnit), XCoordinatesOfTimeLine);
        if (checkEndIndexFilled === XCoordinatesOfTimeLine.length - 1) {
            endPosition = kony.apps.generalizeWidthInDp(XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length - 3][0] - leftPosition + 30);
        } else {
            for (var loop = checkStartIndexFilled; loop < checkEndIndexFilled; loop++) {
                if (XCoordinatesOfTimeLine[loop][2] === 1) {
                    break;
                }
            }
            endPosition = kony.apps.generalizeWidthInDp(XCoordinatesOfTimeLine[loop - 1][0] - leftPosition);
        }
        /*else {
				endPosition = kony.apps.generalizeWidthInDp(taskUnit);
			}*/
        frmName.flexSliderTask.width = (endPosition - 50) + "dp";
        (new kony.apps.coe.Reusable.TimelineCreation()).animateSlider(leftPosition, endPosition);
        kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = false;
        //#ifdef iphone
        var index = obj.search(commonWidget.frame.x, kony.apps.coe.Reusable.TimelineCreation.frameValueOfTimeLine);
        if ((index > 0) && (index < kony.apps.coe.Reusable.TimelineCreation.frameValueOfTimeLine.length - 3)) {
            var xOffset = kony.apps.coe.Reusable.TimelineCreation.frameValueOfTimeLine[index - 1][0];
            var contentOffset = {
                x: xOffset,
                y: "0"
            };
            frmName.timeLineScrollFlex.setContentOffset(contentOffset, true);
        }
        //#endif
    }
    if (kony.apps.coe.Reusable.TimelineCreation.previousTimeline !== null) {
        var selecteddata = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.filter(function(v) { return v["flexName"] == kony.apps.coe.Reusable.TimelineCreation.previousTimeline; });
        var skin;
        if (selecteddata[0].data.isBillabe === true || String(selecteddata[0].data.isBillable) === "1") {
            skin = "sknFlxMobBg2D86E2";
        } else {
            skin = "sknMobFlx8C98A2Op100";
        }
        frmName[kony.apps.coe.Reusable.TimelineCreation.previousTimeline].skin = skin;
    }
    if (!kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn) {
        frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblPin";
        frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblPin";
        frmName.flexSlider.lblTaskName.skin = "sknLblPin";
        kony.apps.coe.Reusable.TimelineCreation.updateTaskName("");
        kony.apps.coe.Reusable.TimelineCreation.createSliderCallback();
        kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
    } else {
        kony.apps.coe.Reusable.TimelineCreation.updateTaskName(kony.apps.coe.Reusable.TimelineCreation.taskName);
    }
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {JSON object}-TimeSheetData
 * @return         None
 * @description    This method creates a placeHolder called "Click here to add a timesheet" at the last
 * timesheet enter according to the end time of requests
 */
kony.apps.coe.Reusable.TimelineCreation.xCoordinatesBinarySearch = function(max_end_time, x_coords) {
    try {
        kony.print("---- start xCoordinatesBinarySearch ----");
        var start_index = 0;
        var last_index = x_coords.length - 1;
        var curr_index = Math.round((start_index + last_index) / 2);
        var ampm = { "AM": 0, "PM": 1 };
        var temp = [0, 0];
        var dist_from_left = "0dp";

        while (last_index - start_index > 1) {

            temp[0] = parseFloat(x_coords[curr_index][1].split(" ")[0]);
            temp[1] = ampm[x_coords[curr_index][1].split(" ")[1]];

            if (temp[1] > max_end_time[1]) {
                last_index = curr_index;
                curr_index = Math.round((start_index + last_index) / 2);
            } else if (temp[1] < max_end_time[1]) {
                start_index = curr_index;
                curr_index = Math.round((start_index + last_index) / 2);
            } else {
                if (temp[0] % 12 > max_end_time[0] % 12) {
                    last_index = curr_index;
                    curr_index = Math.round((start_index + last_index) / 2);
                } else if (temp[0] % 12 < max_end_time[0] % 12) {
                    start_index = curr_index;
                    curr_index = Math.round((start_index + last_index) / 2);
                } else if (temp[0] == max_end_time[0]) {
                    dist_from_left = x_coords[curr_index][0];
                    break;
                }
            }

        }

        return dist_from_left;
    } catch (error) {
        kony.print("---- error in xCoordinatesBinarySearch: " + error);
    }
};
kony.apps.coe.Reusable.TimelineCreation.getMaxEndTimeandIndex = function(timesheetData) {
    try {
        var ampm = { "AM": 0, "PM": 1 };
        var max_endTime;
        var max_endTime_index;
        var temp_endTime;
        var index;
        var maxEndTimeandIndex = [0, 0]

        kony.print("---- Timesheet data: " + JSON.stringify(timesheetData));
        for (index = 0; index < timesheetData.length; index++) {
            if (index == 0) {
                max_endTime = timesheetData[index].endTime;
                kony.print("---- max_endTime: " + JSON.stringify(max_endTime));
                max_endTime = max_endTime.split(" ");
                max_endTime[0] = parseFloat(max_endTime[0]);
                max_endTime[1] = ampm[max_endTime[1]];
                max_endTime_index = index;
                kony.print("---- max_endTime: " + timesheetData[index] + " " + max_endTime);
            } else {
                temp_endTime = timesheetData[index].endTime;
                kony.print("---- max_endTime: " + JSON.stringify(max_endTime));
                temp_endTime = temp_endTime.split(" ");
                temp_endTime[0] = parseFloat(temp_endTime[0]);
                temp_endTime[1] = ampm[temp_endTime[1]];
                kony.print("---- max_endTime: " + timesheetData[index] + " " + temp_endTime);
                if (temp_endTime[1] > max_endTime[1]) {
                    max_endTime = temp_endTime;
                    max_endTime_index = index;
                } else {
                    if (temp_endTime[0] % 12 > max_endTime[0] % 12) {
                        max_endTime = temp_endTime;
                        max_endTime_index = index;
                    }
                }
            }
        }
        maxEndTimeandIndex[0] = max_endTime;
        maxEndTimeandIndex[1] = max_endTime_index;
        kony.print("---- max end time: " + max_endTime);
        kony.print("---- max index: " + max_endTime_index);
        return maxEndTimeandIndex;
    } catch (error) {
        kony.print("---- getMaxEndTime error: " + error);
    }
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {JSON object}-TimeSheetData
 * @return         None
 * @description    This method creates a placeHolder called "Click here to add a timesheet" at the last
 * timesheet enter according to the end time of requests
 */
kony.apps.coe.Reusable.TimelineCreation.createTimeLinePlaceholder = function(timesheetData) {
    kony.print("---- start createTimeLinePlaceholder ----");
    try {
        var maxEndTimeandIndex = kony.apps.coe.Reusable.TimelineCreation.getMaxEndTimeandIndex(timesheetData);
        var dist_from_left = kony.apps.coe.Reusable.TimelineCreation.xCoordinatesBinarySearch(maxEndTimeandIndex[0], kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine);
        var clickLabel = new kony.ui.Label({
            id: "lblSelectedTaskName" + id,
            skin: "sknLblBG00000Op0Fbg3F4C50",
            "top": "0%",
            "left": dist_from_left + "%",
            "width": "100%",
            "height": "50%",
            "zIndex": 8,
            "text": kony.apps.coe.Reusable.TimelineCreation.taskName,
            "isVisible": true
        }, {
            "padding": [0, 0, 0, 0],
            "marginInPixel": false,
            "paddingInPixel": false,
            "contentAlignment": constants.CONTENT_ALIGN_CENTER
        }, {});
        frmTimeSheetCreate.flxTimeLine.timeLineScrollFlex.add(clickLabel);
        kony.print("---- end createTimeLinePlaceholder ----");
    } catch (error) {
        kony.print("---- error in createTimeLinePlaceholder: " + error);
    }
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {JSON object}-commonWidget
 * @param          gestureInfo
 * @param          context
 * @return         None
 * @description    This method is the callback function of slider tap gesture.
 * On tap of slider checks whether editing the fixed task or creating new task.
 * Based on condition it creates new task or edits the already existing task.
 */

kony.apps.coe.Reusable.TimelineCreation.prototype.TapSlidertoFixTask = function(commonWidget, gestureInfo, context) {
    function minutesToTimeFormat(min) {
        function makeItTwoDigit(x) {
            return x < 10 ? "0" + x : x;
        }
        return makeItTwoDigit(parseInt(min / 60)) + ":" + makeItTwoDigit(parseInt(min % 60));
    }
    if (!kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.isValidData()) {
        return;
    }
    var TimeSheetData = [],
        width, sortedArray, startPosition, flexId, flexLeft, startTime, endTime, data, len;
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    kony.print("---- XCoordinatesOfTimeLine: " + XCoordinatesOfTimeLine);
    var startIndex = obj.search(parseInt(commonWidget.left), XCoordinatesOfTimeLine);
    var endIndex = obj.search(parseInt(commonWidget.left) + parseInt(commonWidget.frame.width) - 5, XCoordinatesOfTimeLine);
    startPosition = XCoordinatesOfTimeLine[startIndex][0];
    width = (XCoordinatesOfTimeLine[endIndex][0] - startPosition);
    TimeSheetData = JSON.parse(JSON.stringify(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData));
    if (kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn === true) {
        var id = kony.apps.coe.Reusable.TimelineCreation.editingFlexName.split("flxSelectedTime");
        flexId = kony.apps.coe.Reusable.TimelineCreation.editingFlexName;
        for (var i = 0; i < TimeSheetData.length; i++) {
            if (TimeSheetData[i] !== null)
                if (TimeSheetData[i].flexName === kony.apps.coe.Reusable.TimelineCreation.editingFlexName) {
                    kony.apps.coe.ess.globalVariables.currentTaskIndex = i;
                    var teid = TimeSheetData[i].data.Time_Entry_Id;
                    data = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.get();
                    data.Time_Entry_Id = teid;
                    data.Time_Type_Name = frmTimeSheetCreate.lblTimeTypeSelect.text;
                    kony.apps.coe.Reusable.TimelineCreation.taskName = data.Task_Name;
                    TimeSheetData[i].startIndex = startIndex;
                    TimeSheetData[i].endIndex = endIndex;
                    TimeSheetData[i].startTime = XCoordinatesOfTimeLine[startIndex][1];
                    TimeSheetData[i].endTime = XCoordinatesOfTimeLine[endIndex][1];
                    TimeSheetData[i].taskName = kony.apps.coe.Reusable.TimelineCreation.taskName;
                    TimeSheetData[i].data = data;
                    TimeSheetData[i].data.Start_Time = XCoordinatesOfTimeLine[startIndex][1];
                    TimeSheetData[i].data.End_Time = XCoordinatesOfTimeLine[endIndex][1];

                    if (kony.apps.coe.ess.globalVariables.taskSelectedOnEdit == true) {
                        TimeSheetData[i].taskName = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name;
                        kony.apps.coe.ess.globalVariables.taskSelectedOnEdit = false;

                    }
                    len = i;
                    if (TimeSheetData[i].data.Time_Line_Status === null || TimeSheetData[i].data.Time_Line_Status === "") {
                        TimeSheetData[i].data.Time_Line_Status = "modified";
                    }
                }
        }
        var skin;
        startTime = XCoordinatesOfTimeLine[startIndex][1];
        endTime = XCoordinatesOfTimeLine[endIndex][1];
        flexId = kony.apps.coe.Reusable.TimelineCreation.editingFlexName;
        TimeSheetData = obj.checkConflictsAndOverrideTimeLine(TimeSheetData, startIndex, endIndex, kony.apps.coe.Reusable.TimelineCreation.editingFlexName);
        frmName[kony.apps.coe.Reusable.TimelineCreation.editingFlexName]["lblSelectedTaskName" + id[1]].text = kony.apps.coe.Reusable.TimelineCreation.taskName;
        frmName[kony.apps.coe.Reusable.TimelineCreation.editingFlexName]["lblSelectedTime" + id[1]].text = startTime + "-" + endTime;
        frmName[kony.apps.coe.Reusable.TimelineCreation.editingFlexName].left = startPosition + "dp";
        frmName[kony.apps.coe.Reusable.TimelineCreation.editingFlexName].width = (width - 2) + "dp";
        if (TimeSheetData[len].data.isBillabe === true || String(TimeSheetData[len].data.isBillable) === "1") {
            skin = "sknFlxMobBg2D86E2";
        } else {
            skin = "sknMobFlx8C98A2Op100";
        }
        frmName[kony.apps.coe.Reusable.TimelineCreation.editingFlexName].skin = skin;
        frmName[kony.apps.coe.Reusable.TimelineCreation.editingFlexName].isVisible = true;
        kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = false;
        kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
        kony.apps.coe.Reusable.TimelineCreation.editingFlexName = "";
    } else {
        if (startIndex != endIndex) {
            var Id = kony.apps.coe.Reusable.TimelineCreation.id;
            startTime = XCoordinatesOfTimeLine[startIndex][1];
            endTime = XCoordinatesOfTimeLine[endIndex][1];
            data = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.get();
            kony.apps.coe.Reusable.TimelineCreation.taskName = data.Task_Name;
            flexId = "flxSelectedTime" + Id;
            TimeSheetData.push({ "startIndex": startIndex, "endIndex": endIndex, "flexName": "flxSelectedTime" + Id, "startTime": startTime, "endTime": endTime, "taskName": kony.apps.coe.Reusable.TimelineCreation.taskName, "data": data });
            len = TimeSheetData.length - 1;
            TimeSheetData[len].data.Time_Line_Status = "added";
            TimeSheetData[len].data.Start_Time = startTime;
            TimeSheetData[len].data.End_Time = endTime;
            TimeSheetData[len].data.Time_Type_Name = frmTimeSheetCreate.lblTimeTypeSelect.text;
            TimeSheetData = obj.checkConflictsAndOverrideTimeLine(TimeSheetData, startIndex, endIndex, "flxSelectedTime" + Id);
            if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
                start_time = startTime.split(" ");
                end_time = endTime.split(" ");
                start_time[0] = parseFloat(start_time[0]);
                end_time[0] = parseFloat(end_time[0]);
                if (start_time[1].toUpperCase() === "PM") {
                    start_time[0] = start_time[0] % 12 + 12;
                }
                if (end_time[1].toUpperCase() === "PM") {
                    end_time[0] = end_time[0] % 12 + 12;
                }
                var start_hours = parseInt(start_time[0]);
                var start_minutes = (parseFloat(start_time[0]) - parseInt(start_time[0])) * 100;
                start_minutes = parseInt(start_minutes);
                var end_hours = parseInt(end_time[0]);
                var end_minutes = (parseFloat(end_time[0]) - parseInt(end_time[0])) * 100;
                end_minutes = parseInt(end_minutes);
                //First three parameters can be anything to create a date object only hours and minutes matters 
                //to find the duration 
                var startDate = new Date(2017, 2, 23, start_hours, start_minutes, 00);
                var endDate = new Date(2017, 2, 23, end_hours, end_minutes, 00);
                var duration = (Date.parse(endDate) - Date.parse(startDate)) / 60000;
                var time = minutesToTimeFormat(duration);
            } else {
                var time = startTime + "-" + endTime;
            }
            obj.createTemplate(Id, startPosition, width, time, TimeSheetData[len].data.isBillable);
            kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = false;
            kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
            kony.apps.coe.Reusable.TimelineCreation.id = ++Id;
        } else {
            kony.print("---Unwanted data---");
        }
    }
    if (flexId !== undefined && flexId !== null) {
        frmName[flexId].skin = "sknFlxMobBg1C7393Op80";
        kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 1;
        kony.apps.coe.Reusable.TimelineCreation.previousTimeline = flexId;
        kony.apps.coe.Reusable.TimelineCreation.selectedFlexName = flexId;
    }
    kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = TimeSheetData;
    //    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[len]);
    //    kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback(TimeSheetData[len], kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
    //    kony.apps.coe.Reusable.TimelineCreation.createTimeLinePlaceholder(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
    this.changeFixedIndex(startIndex, endIndex, 1);
    kony.apps.coe.Reusable.TimelineCreation.isTimeLineEmpty = false;
    frmName.timeLineScrollFlex.enableScrolling = true;
    //frmName.flexSlider.isVisible = false;
    kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = true;
    (new kony.apps.coe.Reusable.TimelineCreation()).animateSlider(XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length - 1][0], 155);
    kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTime();
};
kony.apps.coe.Reusable.TimelineCreation.prototype.showManualTimeEntry = function(commonWidget, gestureInfo) {
    try {
        kony.apps.coe.ess.myTime.TimesheetCreate.popluateTimePickerData();
        var startsAt = parseInt(frmTimeSheetCreate.flexSlider.left);
        var endsAt = startsAt + parseInt(frmTimeSheetCreate.flexSlider.width);
        startsAt = kony.apps.coe.Reusable.TimelineCreation.searchNearestCoordinate(startsAt);
        endsAt = kony.apps.coe.Reusable.TimelineCreation.searchNearestCoordinate(endsAt);
        startsAt = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[startsAt][0];
        endsAt = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[endsAt][0];
        startsAt = startsAt.toString();
        endsAt = endsAt.toString();
        frmTimeSheetCreate.timePicker.selectedKeys = [startsAt, endsAt];
        frmTimeSheetCreate.flxTimePicker.setVisibility(true);
    } catch (error) {
        kony.print("---- showManualTimeEntry error: " + error);
    }
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Number}- id appended to flexName
 * @param          {Number}- left
 * @param          {Number}- width
 * @param          {String}- start and end time
 * @return         None
 * @description    This method creates template to fix a new task .
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.createTemplate = function(id, left, width, startAndEndTime, isBillabe) {
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    var skin;
    if (isBillabe === true || String(isBillabe) === "1") {
        skin = "sknFlxMobBg2D86E2";
    } else {
        skin = "sknMobFlx8C98A2Op100";
    }
    var flxSelectedTime = new kony.ui.FlexContainer({
        "id": "flxSelectedTime" + id,
        "skin": skin,
        "top": "45%",
        "left": left + "dp",
        "width": (width - 2) + "dp",
        "height": "50%",
        "zIndex": 7,
        "isVisible": true,
        "clipbounds": true,
        "layoutType": kony.flex.FREE_FORM
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
    }, {});

    var lblSelectedTaskName = new kony.ui.Label({
        id: "lblSelectedTaskName" + id,
        skin: "sknLblMobFCFFFFFFFS71",
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "50%",
        "zIndex": 7,
        "text": kony.apps.coe.Reusable.TimelineCreation.taskName,
        "isVisible": true
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER
    }, {});
    var lblSelectedTime = new kony.ui.Label({
        id: "lblSelectedTime" + id,
        skin: "sknLblMobFCFFFFFFFS71",
        "left": "0%",
        "top": "50%",
        "width": "100%",
        "height": "50%",
        "zIndex": 7,
        "text": startAndEndTime,
        "isVisible": true
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER
    }, {});
    frmName.timeLineScrollFlex.add(flxSelectedTime);

    frmName["flxSelectedTime" + id].setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
        fingers: 1,
        taps: 2
    }, this.tapToEditFixedTask.bind(this));

    flxSelectedTime.add(lblSelectedTaskName);
    flxSelectedTime.add(lblSelectedTime);
    frmName.flexSlider.isVisible = false;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {JSON object}-commonWidget
 * @param          gestureInfo
 * @param          context
 * @return         None
 * @description    This method is the callback function for tap gesture of Fixed task in TimeLine.
 * On tap of fixed task it will make slider to be visible at that position for editing.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.tapToEditFixedTask = function(commonWidget, gestureInfo, context) {
    if (kony.apps.coe.Reusable.TimelineCreation.selectedFlexName === commonWidget.id) {
        frmTimeSheetCreate.flxProjectTaskSelection.setVisibility(true);
        frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
        frmTimeSheetCreate.flxTotalTime.setVisibility(false);
        frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.setVisibility(false);
        kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
        kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = true;
        kony.apps.coe.Reusable.TimelineCreation.editingFlexName = commonWidget.id;
        kony.apps.coe.ess.globalVariables.currentFixedFlex = commonWidget.id;
        var timeSheetData = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
        var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
        var startIndex = this.search(parseInt(commonWidget.frame.x), kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine);
        var endIndex = this.search(parseInt(commonWidget.frame.width) + 2 + parseInt(commonWidget.frame.x), kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine);
        this.changeFixedIndex(startIndex, endIndex, 0);
        var width = commonWidget.frame.width + "dp";
        var left = commonWidget.frame.x + "dp";
        frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
        var selectedItem = timeSheetData.filter(function(v) { return v["flexName"] == commonWidget.id; });
        if (selectedItem[0].data.isBillable === true || String(selectedItem[0].data.isBillable) === "1") {
            frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblPin2D86E2";
            frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblPin2D86E2";
            frmName.flexSlider.lblTaskName.skin = "sknLblPin2D86E2";
        } else {
            frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblPin";
            frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblPin";
            frmName.flexSlider.lblTaskName.skin = "sknLblPin";
        }
        //#ifdef iphone
        frmName.flexSlider.left = left;
        frmName.flexSlider.width = width;
        //#endif
        commonWidget.isVisible = false;
        frmName.flexSlider.isVisible = true;
        kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = false;
        //#ifdef android
        (new kony.apps.coe.Reusable.TimelineCreation()).animateSlider(parseInt(left), parseInt(width));
        //#endif
        kony.apps.coe.ess.globalVariables.currentTask = frmName.flexSlider;
        kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = true;
        //kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData = selectedItem[0];
        //kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Time_Line_Status = "modified";
        kony.apps.coe.Reusable.TimelineCreation.editTimelineTaskCallback(selectedItem[0].data);
        kony.apps.coe.Reusable.TimelineCreation.updateTaskName(selectedItem[0].taskName);
    }
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          Array-TimeSheetData
 * @param          {Number}-starting Index
 * @return         Array- changed TimeSheetData
 * @description    This method is called when conflict occured on right side of the Timeline and it moves the conflicted ones accordingly.
 */

kony.apps.coe.Reusable.TimelineCreation.prototype.replacingConflictsRight = function(TimeSheetData, startIndex) {
    var count = 0,
        startTime, endTime;
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    var length = TimeSheetData.length;
    for (var loop = 0; loop < length; loop++) {
        if (TimeSheetData[loop] !== null && TimeSheetData[loop].flexName !== "" && TimeSheetData[loop].endIndex !== 0) {
            if (TimeSheetData[loop].startIndex > startIndex && loop - 1 >= 0) {
                if (TimeSheetData[loop].startIndex < TimeSheetData[loop - 1].endIndex) {
                    var flexId = TimeSheetData[loop].flexName;
                    var id = flexId.split("flxSelectedTime");
                    count = TimeSheetData[loop].endIndex - TimeSheetData[loop].startIndex;
                    TimeSheetData[loop].startIndex = TimeSheetData[loop - 1].endIndex;
                    TimeSheetData[loop].endIndex = TimeSheetData[loop].startIndex + count;
                    if ((TimeSheetData[loop].startIndex > 92)) {
                        TimeSheetData[loop] = (new kony.apps.coe.Reusable.TimelineCreation()).removeConflictedTime(TimeSheetData[loop], flexId);
                    } else if ((TimeSheetData[loop].startIndex < 92) && (TimeSheetData[loop].endIndex > 92)) {
                        startTime = XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][1];
                        endTime = XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length - 1][1];
                        frmName[flexId].left = XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0] + "dp";
                        frmName[flexId].width = (XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length - 1][0] - XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0]) + "dp";
                        frmName[flexId]["lblSelectedTime" + id[1]].text = startTime + "-" + endTime;
                        TimeSheetData[loop].startTime = startTime;
                        TimeSheetData[loop].endTime = endTime;
                        TimeSheetData[loop].data.Start_Time = startTime;
                        TimeSheetData[loop].data.End_Time = endTime;
                        if (TimeSheetData[loop].data.Time_Line_Status === null || TimeSheetData[loop].data.Time_Line_Status === "") {
                            TimeSheetData[loop].data.Time_Line_Status = "modified";
                        }
                    } else {
                        startTime = XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][1];
                        endTime = XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][1];
                        frmName[flexId].left = XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0] + "dp";
                        frmName[flexId]["lblSelectedTime" + id[1]].text = startTime + "-" + endTime;
                        TimeSheetData[loop].startTime = startTime;
                        TimeSheetData[loop].endTime = endTime;
                        TimeSheetData[loop].data.Start_Time = startTime;
                        TimeSheetData[loop].data.End_Time = endTime;
                        if (TimeSheetData[loop].data.Time_Line_Status === null || TimeSheetData[loop].data.Time_Line_Status === "") {
                            TimeSheetData[loop].data.Time_Line_Status = "modified";
                        }
                    }
                }
            }
        }
    }
    frmName.forceLayout();
    TimeSheetData = obj.removeEmptyDataInTimeSheetData(TimeSheetData);
    return TimeSheetData;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          Array-TimeSheetData
 * @param          {Number}-ending Index
 * @return         Array- changed TimeSheetData
 * @description    This method is called when conflict occured on leftside of the Timeline and it moves the conflicted ones accordingly.
 */

kony.apps.coe.Reusable.TimelineCreation.prototype.replacingConflictsLeft = function(TimeSheetData, endIndex) {
    var count = 0,
        startTime, endTime;
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    for (var loop = TimeSheetData.length - 1; loop >= 0; loop--) {
        if (TimeSheetData[loop] !== undefined && (TimeSheetData[loop].endIndex !== 0) && TimeSheetData[loop].flexName !== "") {
            if (TimeSheetData[loop].endIndex < endIndex && loop + 1 < TimeSheetData.length) {
                if (TimeSheetData[loop].endIndex > TimeSheetData[loop + 1].startIndex) {
                    var flexId = TimeSheetData[loop].flexName;
                    var id = flexId.split("flxSelectedTime");
                    count = TimeSheetData[loop].endIndex - TimeSheetData[loop].startIndex;
                    TimeSheetData[loop].endIndex = TimeSheetData[loop + 1].startIndex;
                    TimeSheetData[loop].startIndex = TimeSheetData[loop].endIndex - count;
                    if ((TimeSheetData[loop].endIndex < 3 && TimeSheetData[loop].startIndex < 0)) {
                        TimeSheetData[loop] = (new kony.apps.coe.Reusable.TimelineCreation()).removeConflictedTime(TimeSheetData[loop], flexId);
                    } else if ((TimeSheetData[loop].startIndex < 0) && (TimeSheetData[loop].endIndex > 0)) {
                        startTime = XCoordinatesOfTimeLine[1][1];
                        endTime = XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][1];
                        frmName[flexId].width = XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][0] - XCoordinatesOfTimeLine[1][0] - 2;
                        frmName[flexId]["lblSelectedTime" + id[1]].text = startTime + "-" + endTime;
                        TimeSheetData[loop].startTime = startTime;
                        TimeSheetData[loop].endTime = endTime;
                        TimeSheetData[loop].data.Start_Time = startTime;
                        TimeSheetData[loop].data.End_Time = endTime;
                        if (TimeSheetData[loop].data.Time_Line_Status === null || TimeSheetData[loop].data.Time_Line_Status === "") {
                            TimeSheetData[loop].data.Time_Line_Status = "modified";
                        }
                    } else {
                        startTime = XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][1];
                        endTime = XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][1];
                        frmName[flexId].left = XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0] + "dp";
                        frmName[flexId].width = (XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][0] - XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0] - 2) + "dp";
                        frmName[flexId]["lblSelectedTime" + id[1]].text = startTime + "-" + endTime;
                        TimeSheetData[loop].startTime = startTime;
                        TimeSheetData[loop].endTime = endTime;
                        TimeSheetData[loop].data.Start_Time = startTime;
                        TimeSheetData[loop].data.End_Time = endTime;
                        if (TimeSheetData[loop].data.Time_Line_Status === null || TimeSheetData[loop].data.Time_Line_Status === "") {
                            TimeSheetData[loop].data.Time_Line_Status = "modified";
                        }
                    }
                }
            }
        }
    }
    frmName.forceLayout();
    TimeSheetData = obj.removeEmptyDataInTimeSheetData(TimeSheetData);
    return TimeSheetData;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          Array-TimeSheetData
 * @param          {String}-Flex Id
 * @return         None
 * @description    This method removes the task(flexes) that are out of TimeLine.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.removeConflictedTime = function(TimeSheetData, flexId) {
    var idIndex = flexId.split("flxSelectedTime")[1];
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var length = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine.length;
    if (TimeSheetData.flexName !== undefined) {
        frmName.timeLineScrollFlex.remove(frmName.timeLineScrollFlex["lblSelectedTaskName" + idIndex]);
        frmName.timeLineScrollFlex.remove(frmName.timeLineScrollFlex["lblSelectedTime" + idIndex]);
        frmName.timeLineScrollFlex.remove(frmName.timeLineScrollFlex[flexId]);
        if (TimeSheetData.startIndex >= 0 && TimeSheetData.endIndex < length) {
            (new kony.apps.coe.Reusable.TimelineCreation()).changeFixedIndex(TimeSheetData.startIndex, TimeSheetData.endIndex, 0);
        }
        if ((TimeSheetData.data.Time_Entry_Id !== undefined && TimeSheetData.data.Time_Entry_Id !== null)) {
            TimeSheetData.data.Time_Line_Status = "deleted";
            TimeSheetData.flexName = "";
            TimeSheetData.endIndex = 0;
        } else {
            TimeSheetData = {
                "startIndex": 0,
                "endIndex": 0,
                "flexName": "",
                "startTime": "",
                "endTime": "",
                "taskName": "",
                "data": {}
            };
        }
    }
    return TimeSheetData;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {String}-Flex Id
 * @return         None
 * @description    This method changes the skin of selected flex(task).
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.changeSkin = function(flexdata) {
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var id = flexdata.id;
    var timeSheetData = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
    if (kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn) {
        return;
    }
    if (frmName[id].skin === "sknMobFlx8C98A2Op100" || frmName[id].skin === "sknFlxMobBg2D86E2") {
        kony.apps.coe.Reusable.TimelineCreation.selectedFlexName = id;
        kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 1;
        frmName[id].skin = "sknFlxMobBg1C7393Op80";
        if (kony.apps.coe.Reusable.TimelineCreation.previousTimeline !== null && kony.apps.coe.Reusable.TimelineCreation.previousTimeline !== undefined && kony.apps.coe.Reusable.TimelineCreation.previousTimeline !== id) {
            var prevId = kony.apps.coe.Reusable.TimelineCreation.previousTimeline;
            var selecteddata = timeSheetData.filter(function(v) { return v["flexName"] == prevId; });
            var skin;
            if (selecteddata[0].data.isBillabe === true || String(selecteddata[0].data.isBillable) === "1") {
                skin = "sknFlxMobBg2D86E2";
            } else {
                skin = "sknMobFlx8C98A2Op100";
            }
            frmName[prevId].skin = skin;
        }
        var selectedItem = timeSheetData.filter(function(v) { return v["flexName"] == id; });
        kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback(selectedItem[0].data);
    } else if (frmName[id].skin === "sknMobFlx1c7393Op30") {
        // 		frmName[id].skin = "sknFlxMobBg1C7393Op80";
        // 		kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 0;
        //         kony.apps.coe.Reusable.TimelineCreation.deselectTimelineTaskCallback();
    }
    frmName.flexSlider.isVisible = true;
    kony.apps.coe.Reusable.TimelineCreation.previousTimeline = id;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Array}-timeSheetData
 * @return         filteredArray
 * @description    This method removes deleted task from the array.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.removeEmptyDataInTimeSheetData = function(timeSheetData) {
    var filteredArray = [];
    if (timeSheetData.length !== undefined) {
        for (var loop = 0; loop < timeSheetData.length; loop++) {
            if (timeSheetData[loop] !== null && ((timeSheetData[loop].data.Time_Entry_Id !== undefined && timeSheetData[loop].data.Time_Entry_Id !== null) || timeSheetData[loop].data.Time_Line_Status === "added")) {
                filteredArray.push(timeSheetData[loop]);
            }
        }
    }
    return filteredArray;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {String}- start time
 * @param          {String}- end time
 * @return         None
 * @description    This method fills timeline from given start time to end time.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.fillFullDay = function(selectedItem, startTime, endTime) {

    if (kony.apps.coe.Reusable.TimelineCreation.isTimeLineEmpty === true || kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length <= 1) {
        var TimeSheetData = [];
        var obj = new kony.apps.coe.Reusable.TimelineCreation();
        var coordinates = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
        var startIndex = coordinates.map(function(el) {
            return el[1];
        }).indexOf(startTime);
        var endIndex = coordinates.map(function(el) {
            return el[1];
        }).indexOf(endTime);
        var width = coordinates[endIndex][0] - coordinates[startIndex][0];
        var startAndEndTime = coordinates[startIndex][1] + "-" + coordinates[endIndex][1];
        var id = kony.apps.coe.Reusable.TimelineCreation.id;
        var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
        frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
        (new kony.apps.coe.Reusable.TimelineCreation()).animateSlider(coordinates[startIndex][0], width);
        frmName.flexSlider.isVisible = true;
        TimeSheetData[id] = {
            "startIndex": startIndex,
            "endIndex": endIndex,
            "flexName": "flxSelectedTime" + id,
            "startTime": coordinates[startIndex][1],
            "endTime": coordinates[endIndex][1],
            "taskName": kony.apps.coe.Reusable.TimelineCreation.taskName,
            "data": {}

        };
        kony.apps.coe.Reusable.TimelineCreation.id = ++id;
        kony.apps.coe.Reusable.TimelineCreation.isTimeLineEmpty = false;
        kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
    }
};
kony.apps.coe.Reusable.TimelineCreation.onClickOfHours = function() {
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    kony.apps.coe.ess.myTime.TimesheetCreate.revertSlider();
    kony.apps.coe.ess.myTime.TimesheetCreate.popluateTimePickerData();
    frmTimeSheetCreate.timePicker.selectedKeys = [kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime];

};
kony.apps.coe.Reusable.TimelineCreation.updateTaskName = function(task_name) {
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    frmName.flexSlider.lblTaskName.text = task_name;
    kony.apps.coe.Reusable.TimelineCreation.taskName = task_name;
};

kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider = function(startTime, endTime) {
    try {
        kony.print("---- start setDefaultSlider");
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
        kony.apps.coe.ess.globalVariables.sliderLeftValue = coordinates[startIndex][0]; //This helps to rettain the timeline scroll intact and keep the slider in user view
        frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
        sliderObj.animateSlider(left, width);
        kony.apps.coe.Reusable.TimelineCreation.updateTaskName("");
        kony.print("---- end setDefaultSlider");
    } catch (error) {
        kony.print("---- setDefaultSlider error: " + error);
    }
};

kony.apps.coe.Reusable.TimelineCreation.EditTask = function(startTime, endTime) {
    var loop;
    var TimeSheetData = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
    if (kony.apps.coe.Reusable.TimelineCreation.deleteFlag === 1) {
        kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
        kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = true;
        var sliderObj = new kony.apps.coe.Reusable.TimelineCreation();
        var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
        var coordinates = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
        var startIndex = coordinates.map(function(el) {
            return el[1];
        }).indexOf(startTime);
        var endIndex = coordinates.map(function(el) {
            return el[1];
        }).indexOf(endTime);
        for (var i = 0; i < TimeSheetData.length; i++) {
            if (TimeSheetData[i].startIndex == startIndex) {
                loop = i;
                break;
            }
        }
        kony.apps.coe.Reusable.TimelineCreation.editingFlexName = TimeSheetData[loop].flexName;
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data = TimeSheetData[loop].data;
        (new kony.apps.coe.Reusable.TimelineCreation()).changeFixedIndex(startIndex, endIndex, 0);
        var width = (coordinates[endIndex][0] - coordinates[startIndex][0]) + "dp";
        var left = coordinates[startIndex][0] + "dp";
        frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
        var selectedItem = TimeSheetData.filter(function(v) {
            return v["flexName"] == TimeSheetData[loop].flexName;
        });
        if (selectedItem[0].data.isBillable === true || String(selectedItem[0].data.isBillable) === "1") {
            frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblPin2D86E2";
            frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblPin2D86E2";
            frmName.flexSlider.lblTaskName.skin = "sknLblPin2D86E2";
        } else {
            frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblPin";
            frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblPin";
            frmName.flexSlider.lblTaskName.skin = "sknLblPin";
        }
        //#ifdef iphone
        frmName.flexSlider.left = left;
        frmName.flexSlider.width = width;
        //#endif
        frmName[TimeSheetData[loop].flexName].isVisible = false;
        frmName.flexSlider.isVisible = true;
        kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = false;
        //#ifdef android
        (new kony.apps.coe.Reusable.TimelineCreation()).animateSlider(parseInt(left), parseInt(width));
        //#endif
        kony.apps.coe.Reusable.TimelineCreation.editTimelineTaskCallback(selectedItem[0].data);
        kony.apps.coe.Reusable.TimelineCreation.updateTaskName(selectedItem[0].taskName);
        //   		kony.apps.coe.ess.myTime.TimesheetCreate.settingTaskSummary(TimeSheetData,kony.apps.coe.ess.myTime.TimesheetCreate.updateSegment);
    }
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    On taking the left of the slider this tries to rettain scroll flex position intact to the user.
 */
kony.apps.coe.Reusable.TimelineCreation.scrollTimelineFrameSearch = function() {
    try {
        kony.print("---- scrollTimelineFrameSearch start");
        var left = kony.apps.coe.ess.globalVariables.sliderLeftValue;
        var x;
        var coords = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
        var curr_iter = kony.apps.coe.Reusable.TimelineCreation.searchNearestCoordinate(left);
        //Searching for the nearest timeline flexid for a given hour
        if (curr_iter + 2 < coords.length) {
            while (coords[curr_iter][3].length < 1) {
                curr_iter++;
            }
            x = frmTimeSheetCreate.timeLineScrollFlex[coords[curr_iter][3].toString()];
            frmTimeSheetCreate.timeLineScrollFlex.scrollToWidget(x);

        } else {
            //Index 93 is an containing the last timeline flex id
            x = frmTimeSheetCreate.timeLineScrollFlex[coords[93][3].toString()];
            frmTimeSheetCreate.timeLineScrollFlex.scrollToWidget(x);
        }
        frmTimeSheetCreate.timeLineScrollFlex.forceLayout();
    } catch (error) {
        kony.print("---- error in scrollTimelineFrameSearch: " + error);
        handleError(error);
    }
    kony.print("---- scrollTimelineFrameSearch end");
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          left from the begining of timeLineScrollFlex
 * @return         index of a appropriate coordinate
 * @description    On taking the left of the slider it returns the index of coordinate stored.
 */
kony.apps.coe.Reusable.TimelineCreation.searchNearestCoordinate = function(left) {
    var coords = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    var iter = 0;
    //Taking up a huge number to find the minimum difference on left of slider and timelines
    var min_diff = 10000;
    var curr_diff;
    var curr_iter = 0;
    while (iter < coords.length) {
        //Subtracting the actual left of slider to its timeline left values stored in  XCoordinatesOfTimeLine reusable varaible
        curr_diff = coords[iter][0] - left;

        if (curr_diff < 0) {
            curr_diff = curr_diff * -1;
        }
        if (curr_diff < min_diff) {
            min_diff = curr_diff;
            curr_iter = iter;
        }
        iter++;
    }
    return curr_iter;
};