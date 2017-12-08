/**
 *  @author     Nandhini.Subramaniam
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
var kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.Reusable = kony.apps.coe.Reusable || {};

//%Region - Constructor
kony.apps.coe.Reusable.TimelineCreation = function() {
    var startTime;
    var XCoordinatesOfTimeLine = [];
    var leftOffsetX;
    var rightOffsetX;
    var frameValueOfTimeLine = [];
    var TimeSheetData = [];
    var isUnfixedTaskPresent = true;
    var editingFixedTaskModeOn;
    var id = 0;
    var editingFlexName = "";
    var parentWidgetName = "";
    var taskName = "";
    var defaultFrameValue;
    var startCallback;
    var endCallback;
    var selectionCallback;
    var deleteFlag = 0;
    var isTimeLineEmpty;
    var noofHours;
    var isSliderEmpty;
    var previousTimeLine;
};

kony.apps.coe.Reusable.TimelineCreation.createSliderCallback = function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = false;
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
};

kony.apps.coe.Reusable.TimelineCreation.removeSliderCallback = function() {
    kony.print("--In removeSliderCallback--");
};

kony.apps.coe.Reusable.TimelineCreation.deleteTimelineCallback = function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
};

kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback = function(data, completeDataSet) {
    function callback(isLeave, data) {
        if (isLeave) {
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateLeaveName(data.TimeType_Id);
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedLeave();
        } else {
            if (this.flxScrTimeTypeGestureId !== null) {
                frmTimeSheetCreate.flxScrTimeType.removeGestureRecognizer(kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.flxScrTimeTypeGestureId);
            }
            frmTimeSheetCreate.flxSelectedTask.setEnabled(false);
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.hideTimeType();
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollDownToShowSelectedTask();
            frmTimeSheetCreate.tbxSelectedTaskDescription.text = data.Desc;
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(data.Project_Task_Id);
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateTimeType(data.TimeType_Id);
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedTaskTimeType();
        }
    }
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data = data;
    kony.apps.coe.ess.myTime.TimesheetCreate.settingTaskSummary(completeDataSet, kony.apps.coe.ess.myTime.TimesheetCreate.updateSegment);
    //kony.apps.coe.ess.myTime.TimesheetCreate.viewTaskSummary();

};

kony.apps.coe.Reusable.TimelineCreation.editTimelineTaskCallback = function(data) {
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = false;
    frmTimeSheetCreate.lblCreateProjName.text = data.Task_Name === "" ? "-" : data.Task_Name;
    frmTimeSheetCreate.lblCreateTaskName.text = data.Project_Name === "" ? "-" : data.Project_Name;
    frmTimeSheetCreate.lblCreateNO.text = data.Task_Id === "" ? "-" : data.Task_Id;
    frmTimeSheetCreate.lblCreateAO.text = data.Project_Task_Id === "" ? "-" : data.Project_Task_Id;
    frmTimeSheetCreate.lblTimeTypeSelect.text = kony.apps.coe.ess.globalVariables.time_type_names[data.TimeType_Id];

    frmTimeSheetCreate.lblToSelectTask.setVisibility(false);
    frmTimeSheetCreate.lblCreateProjName.setVisibility(true);
    frmTimeSheetCreate.lblCreateTaskName.setVisibility(true);
    frmTimeSheetCreate.lblCreateNO.setVisibility(true);
    frmTimeSheetCreate.lblCreateAO.setVisibility(true);
    frmTimeSheetCreate.lblTimeTypeSelect.setVisibility(true);
    frmTimeSheetCreate.btnEditDone.setVisibility(true);
    frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(false);
    frmTimeSheetCreate.lblSummary.setVisibility(false);
    frmTimeSheetCreate.labPopupHeader.top = "30.5%";

    function callback(isLeave, data) {
        if (isLeave) {
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
            kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.onClickOfLeave(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.leaves());
        } else {
            frmTimeSheetCreate.flxSelectedTask.setEnabled(true);
            frmTimeSheetCreate.tbxSelectedTaskDescription.text = data.Desc;
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(data.Project_Task_Id);
            kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateTimeType(data.TimeType_Id);
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedTaskTimeType();
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
        }
    }
    //kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data = data;
};

kony.apps.coe.Reusable.TimelineCreation.fixTimelineTaskCallback = function() {
    //     alert("fixTimelineTaskCallback" + JSON.stringify(data));
};

/**
 * @class          TimelineCreation
 * @type           UI creation.
 * @param          {String}-Name of the Parent Widget
 * @param          {Number}-StartTime of TimeLine
 * @param          {Number}-EndTime of TimeLine
 * @return         None
 * @description    This method creates timeline UI.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.drawSliderUI = function(parent, startTime, endTime) {
    var leftValue = 0,
        noofHours,
        timeDuration,
        timeWithAMPM,
        hoursMin,
        roundTime,
        count = 0,
        time;
    kony.apps.coe.Reusable.TimelineCreation.parentWidgetName = parent;
    kony.apps.coe.Reusable.TimelineCreation.startTime = startTime;
    time = startTime;
    timeDuration = kony.store.getItem("minTaskDuration");
    if (timeDuration === "0:15") {
        noofHours = 24 * 4;
    } else {
        noofHours = 24;
    }
    kony.apps.coe.Reusable.TimelineCreation.noofHours = noofHours;
    var timeLineScrollFlex = new kony.ui.FlexScrollContainer({
        "id": "timeLineScrollFlex",
        "skin": "",
        "top": "0%",
        "left": "0%",
        "width": "preferred",
        "height": "100%",
        "zIndex": 1,
        "isVisible": true,
        "clipbounds": true,
        "enableScrolling": true,
        "scrollDirection": kony.flex.SCROLL_HORIZONTAL,
        "horizontalScrollIndicator": true,
        "bounces": false,
        "allowHorizontalBounce": false,
        "allowVerticalBounce": false,
        "pagingEnabled": false,
        "layoutType": kony.flex.FREE_FORM
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
    }, {});
    parent.add(timeLineScrollFlex);
    for (var hours = 0; hours < noofHours; hours++) {
        leftValue = kony.apps.generalizeWidthInDp(hours * 80);
        if (noofHours === 24) {
            if (hours === 0 && kony.apps.coe.Reusable.TimelineCreation.startTime === 12) {
                timeWithAMPM = "12 AM";
                time = 1;
            } else {
                timeWithAMPM = (new kony.apps.coe.Reusable.TimelineCreation()).getTimeFormatWithAMPM(time);
                time++;
                if (time > 24) {
                    time = 1;
                }
            }
        } else {
            if (hours === 0 && kony.apps.coe.Reusable.TimelineCreation.startTime === 12) {
                timeWithAMPM = "12 AM";
                time = 0;
                roundTime = timeWithAMPM;
                count++;
            } else if (hours % 4 === 0) {
                time++;
                if (time > 24) {
                    time = 1;
                }
                timeWithAMPM = (new kony.apps.coe.Reusable.TimelineCreation()).getTimeFormatWithAMPM(time);
                roundTime = timeWithAMPM;
                count = 1;
            } else {
                switch (count) {
                    case 1:
                        hoursMin = roundTime;
                        hoursMin = hoursMin.split(" ");
                        hoursMin[0] = hoursMin[0] + ".15";
                        timeWithAMPM = hoursMin[0] + " " + hoursMin[1];
                        count++;
                        break;
                    case 2:
                        hoursMin = roundTime;
                        hoursMin = hoursMin.split(" ");
                        hoursMin[0] = hoursMin[0] + ".30";
                        timeWithAMPM = hoursMin[0] + " " + hoursMin[1];
                        count++;
                        break;
                    case 3:
                        hoursMin = roundTime;
                        hoursMin = hoursMin.split(" ");
                        hoursMin[0] = hoursMin[0] + ".45";
                        timeWithAMPM = hoursMin[0] + " " + hoursMin[1];
                        count++;
                        break;
                }
            }
        }
        var flexTimeLine = new kony.ui.FlexContainer({
            "id": "flexTimeLine" + hours,
            "skin": "sknFlxMobD8F4FF100O",
            "top": "0dp",
            "left": leftValue + "dp",
            "width": kony.apps.generalizeWidthInDp(80) + "dp",
            "height": "50dp",
            "zIndex": 5,
            "isVisible": true,
            "clipbounds": true,
            "layoutType": kony.flex.FREE_FORM
        }, {
            "padding": [0, 0, 0, 0],
            "marginInPixel": false,
            "paddingInPixel": false
        }, {});
        var lblTime = new kony.ui.Label({
            id: "lblTime" + hours,
            skin: "sknLblMobFC333333Op100FS18px",
            "top": "0%",
            "left": "0%",
            "width": "100%",
            "height": "preferred",
            "text": timeWithAMPM,
            "zIndex": 7,
            "isVisible": true
        }, {
            "padding": [0, 0, 0, 0],
            "marginInPixel": false,
            "paddingInPixel": false,
            "contentAlignment": constants.CONTENT_ALIGN_CENTER
        }, {});
        var lblCenterLine = new kony.ui.Label({
            id: "lblCenterLine" + hours,
            skin: "sknFlxMobBG979797Op100",
            "top": "25%",
            "left": "0dp",
            "width": "1px",
            "height": "8dp",
            "centerX": "50%",
            "zIndex": 7,
            "isVisible": true
        }, {
            "padding": [0, 0, 0, 0],
            "marginInPixel": false,
            "paddingInPixel": false,
            "contentAlignment": constants.CONTENT_ALIGN_CENTER
        }, {});
        if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
            lblTime.isVisible = false;
            lblCenterLine.isVisible = false;
        }
        parent.timeLineScrollFlex.add(flexTimeLine);
        flexTimeLine.add(lblTime);
        flexTimeLine.add(lblCenterLine);
    }
    var flexSlider = new kony.ui.FlexContainer({
        "id": "flexSlider",
        "top": "55%",
        "left": "10dp",
        "width": "200dp",
        "height": "40dp",
        "zIndex": 8,
        "isVisible": false,
        "clipbounds": true,
        "layoutType": kony.flex.FREE_FORM
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
    }, {});
    var flexSliderLeftPin = new kony.ui.FlexContainer({
        "id": "flexSliderLeftPin",
        "top": "0dp",
        "left": "0dp",
        "width": "26dp",
        "height": "100%",
        "zIndex": 6,
        "isVisible": true,
        "clipbounds": true,
        "layoutType": kony.flex.FREE_FORM,
        "onTouchStart": onTouchStartOfLeftPin,
        "onTouchMove": onTouchMoveOfLeftPin

    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
    }, {});
    var flexSliderRightPin = new kony.ui.FlexContainer({
        "id": "flexSliderRightPin",
        "top": "0dp",
        "right": "0dp",
        "width": "26dp",
        "height": "100%",
        "zIndex": 6,
        "isVisible": true,
        "clipbounds": true,
        "layoutType": kony.flex.FREE_FORM,
        "onTouchStart": onTouchStartOfRightPin,
        "onTouchMove": onTouchMoveOfRightPin
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
    }, {});

    var flexSliderTask = new kony.ui.FlexContainer({
        "id": "flexSliderTask",
        "top": "32.5%",
        "left": "25dp",
        "width": "150dp",
        "height": "53%",
        "zIndex": 6,
        "isVisible": true,
        "clipbounds": true,

        "layoutType": kony.flex.FREE_FORM
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
    }, {});

    var imgLeftPin = new kony.ui.Image2({
        "height": "100%",
        "id": "imgLeftPin",
        "isVisible": true,
        "left": "0%",
        "top": "0%",
        "width": "50%",
        "zIndex": 1,
        "src": "slider.png"
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});

    var imgRightPin = new kony.ui.Image2({
        "height": "100%",
        "id": "imgRightPin",
        "isVisible": true,
        "right": "0%",
        "top": "0%",
        "width": "50%",
        "zIndex": 1,
        "src": "slider.png"
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var lblLeftPinTouchableArea = new kony.ui.Label({
        id: "lblLeftPinTouchableArea",
        skin: "sknLblPin",
        "top": "32.5%",
        "left": "6dp",
        "width": "80%",
        "height": "51.5%",
        "zIndex": 7,
        "isVisible": true
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER
    }, {});
    var lblRightPinTouchableArea = new kony.ui.Label({
        id: "lblRightPinTouchableArea",
        skin: "sknLblPin",
        "top": "32.5%",
        "right": "6dp",
        "width": "80%",
        "height": "51.5%",
        "zIndex": 7,
        "isVisible": true
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER
    }, {});
    var lblTaskName = new kony.ui.Label({
        id: "lblTaskName",
        skin: "sknLblPin",
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "100%",
        "text": kony.apps.coe.Reusable.TimelineCreation.taskName,
        "zIndex": 7,
        "isVisible": true
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER
    }, {});
    parent.timeLineScrollFlex.add(flexSlider);
    flexSlider.add(flexSliderLeftPin);
    flexSlider.add(flexSliderTask);
    flexSlider.add(flexSliderRightPin);
    flexSliderLeftPin.add(imgLeftPin);
    flexSliderLeftPin.add(lblLeftPinTouchableArea);
    flexSliderTask.add(lblTaskName);
    flexSliderRightPin.add(imgRightPin);
    flexSliderRightPin.add(lblRightPinTouchableArea);
    parent.timeLineScrollFlex.showFadingEdges = false;
    kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = [];
    (new kony.apps.coe.Reusable.TimelineCreation()).setDefaultValues();
};

/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method stores coordinates and frame values of TimeLine flexes.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.storeCoordinatesOfTimeLine = function() {
    var time = kony.apps.coe.Reusable.TimelineCreation.startTime;
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var left,
        ampmTime,
        min,
        hoursMinutes;
    var coordinates = [],
        sliderObj,
        timeDuration;
    sliderObj = (new kony.apps.coe.Reusable.TimelineCreation());
    timeDuration = kony.store.getItem("minTaskDuration");
    frmName.flexSlider.width = kony.apps.generalizeWidthInDp(155) + "dp";
    kony.print("---- left: " + frmName.flexSlider.left + " width: " + frmName.flexSlider.width);
    frmName.flexSlider.setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
        fingers: 1,
        taps: 1
    }, this.showManualTimeEntry.bind(this));
    for (var loop = 0; loop < kony.apps.coe.Reusable.TimelineCreation.noofHours; loop++) {
        var gestureHandle = frmName.timeLineScrollFlex["flexTimeLine" + loop].setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
            fingers: 1
        }, this.tapTimeToGetSlider.bind(this));
        if (timeDuration == "1:00" || timeDuration === null) {
            if (loop === 0 && kony.apps.coe.Reusable.TimelineCreation.startTime === 12) {
                ampmTime = "12 AM";
                time = 0;
            } else {
                ampmTime = sliderObj.getTimeFormatWithAMPM(time);
            }
            min = ampmTime.split(" ");
            if (parseInt(min[0]) !== 1) {
                min[0] = parseInt(min[0]) - 1;
            } else {
                min[0] = "12";
            }
            if (ampmTime == "12 AM" && loop === 0) {
                hoursMinutes = min[0] + ".45 PM";
            } else if (ampmTime == "12 PM") {
                hoursMinutes = min[0] + ".45 AM";
            } else {
                hoursMinutes = min[0] + ".45 " + min[1];
            }
            left = parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].left) + 18;
            coordinates.push([left, hoursMinutes, 0, ""]);
            left = parseInt(parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].width) / 2) + parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].left);
            coordinates.push([left, ampmTime, 0, "flexTimeLine" + loop]);
            min = ampmTime.split(" ");
            hoursMinutes = min[0] + ".15 " + min[1];
            left = parseInt(3 * parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].width) / 4) + parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].left);
            coordinates.push([left, hoursMinutes, 0, ""]);
            min = ampmTime.split(" ");
            hoursMinutes = min[0] + ".30 " + min[1];
            left = parseInt(parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].width)) + parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].left);
            coordinates.push([left, hoursMinutes, 0, ""]);
            time++;
            if (time > 24) {
                time = 1;
            }
        } else {
            left = parseInt(parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].width) / 2) + parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].left);
            ampmTime = frmName.timeLineScrollFlex["flexTimeLine" + loop]["lblTime" + loop].text;
            coordinates.push([left, ampmTime, 0, ""]);
        }
    }
    kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine = coordinates;
    kony.apps.coe.ess.globalVariables.currentTaskStartIndex = kony.apps.coe.ess.globalVariables.getTimeIndex(kony.apps.coe.ess.appconfig.defaultSliderStartTime);
    kony.apps.coe.ess.globalVariables.currentTaskEndIndex = kony.apps.coe.ess.globalVariables.getTimeIndex(kony.apps.coe.ess.appconfig.defaultSliderEndTime);

    kony.print("---- coordinates: " + JSON.stringify(coordinates));
    kony.print("---- XCoordinatesOfTimeLine: " + JSON.stringify(kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine));
    kony.apps.coe.ess.myTime.navigation.prototype.onClickOfDeleteMenu();
    sliderObj.scrollToDefaultTime();

};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {String}-time
 * @param          {Number}-Position/width
 * @return         time with snap value
 * @description    This method returns time with snap based on how much distance it moved.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.getHoursMinutes = function(time, dpValue) {
    var minTaskDuration = kony.store.getItem("minTaskDuration");
    var min = "",
        hoursMinutes,
        defaultWidth,
        addMin;
    defaultWidth = kony.apps.generalizeWidthInDp(80);
    dpValue = parseInt(dpValue % defaultWidth);
    if (minTaskDuration === "1:00" || minTaskDuration === "2:00" || minTaskDuration === "3:00") {
        if (dpValue === 0) {
            min = time.split(" ");
            return min[0] + ".30 " + min[1];
        } else if (dpValue <= defaultWidth / 2 && dpValue > defaultWidth / 4) {
            return time;
        } else if (dpValue <= ((3 * defaultWidth) / 4) && dpValue > defaultWidth / 2) {
            min = time.split(" ");
            return min[0] + ".15 " + min[1];
        } else if (dpValue <= defaultWidth / 4 && dpValue > 0) {
            min = time.split(" ");
            if (parseInt(min[0]) !== 1) {
                min[0] = parseInt(min[0]) - 1;
            } else {
                min[0] = "12";
            }
            return min[0] + ".45 " + min[1];
        } else {
            min = time.split(" ");
            return min[0] + ".30 " + min[1];
        }
    } else {
        return time;
    }

};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method resets all value to default value.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.setDefaultValues = function() {
    kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = false;
    kony.apps.coe.Reusable.TimelineCreation.isTimeLineEmpty = true;
    kony.apps.coe.Reusable.TimelineCreation.defaultFrameValue = "0";
    kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 0;
    kony.apps.coe.Reusable.TimelineCreation.taskName = "";
    kony.apps.coe.Reusable.TimelineCreation.id = 0;
    kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = true;
    kony.apps.coe.Reusable.TimelineCreation.previousTimeline = null;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method is used to scroll timeline to 8 am by default
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.scrollToDefaultTime = function() {
    var sliderObj = new kony.apps.coe.Reusable.TimelineCreation();
    sliderObj.storeFrameValuesOfTimeLine();

};
/**
 *  OnTouchStart Action of LeftPin of Slider
 */
function onTouchStartOfLeftPin(eventobject, x, y) {
    getOnTouchCoordinatesOfLeft.call(this, eventobject, x, y);
}
/**
 *  OnTouchMove Action of LeftPin of Slider
 */
function onTouchMoveOfLeftPin(eventobject, x, y) {
    dragSliderLeft.call(this, eventobject, x, y);
}
/**
 *  OnTouchStart Action of RightPin of Slider
 */
function onTouchStartOfRightPin(eventobject, x, y) {
    getOnTouchCoordinatesOfRight.call(this, eventobject, x, y);
}
/**
 *  OnTouchMove Action of rightPin of Slider
 */
function onTouchMoveOfRightPin(eventobject, x, y) {
    dragSliderRight.call(this, eventobject, x, y);
}
/**
 *  This method stores x coordinate value of LeftPin of Slider
 */
getOnTouchCoordinatesOfLeft = function(eventobject, x, y) {
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    frmName.timeLineScrollFlex.enableScrolling = false;
    kony.apps.coe.Reusable.TimelineCreation.leftOffsetX = x;
};
/**
 *  This method stores x coordinate value of RightPin of Slider
 */
getOnTouchCoordinatesOfRight = function(eventobject, x, y) {
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    frmName.timeLineScrollFlex.enableScrolling = false;
    kony.apps.coe.Reusable.TimelineCreation.rightOffsetX = x;
};
/**
 *  This method increases/decreases the left value and width of the slider according to movement(on left side)
 */

dragSliderLeft = function(eventobject, x, y) {
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    frmName.timeLineScrollFlex.enableScrolling = false;
    var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.TimelineCreation.leftOffsetX);
    var left = (parseInt(frmName.flexSlider.left) + newOffsetX) + "dp";
    var width = ((parseInt(frmName.flexSlider.width)) - newOffsetX) + "dp";
    var widthOfInnerFlex = parseInt(width) - 50;
    if ((parseInt(left) > 35) && (parseInt(width) > 30)) {
        frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
        //#ifdef iphone
        frmName.flexSlider.width = width;
        frmName.flexSlider.left = left;
        frmName.timeLineScrollFlex.enableScrolling = true;
        frmName.flexSliderLeftPin.onTouchEnd = function() {
            if (widthOfInnerFlex >= getFullDayWidth()) {
                frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
                frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
            } else {
                frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
                frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
            }
        };
        //#endif
        //#ifdef android
        (new kony.apps.coe.Reusable.TimelineCreation()).animateSlider(parseInt(left), parseInt(width));
        frmName.flexSliderLeftPin.onTouchEnd = function() {
            frmName.timeLineScrollFlex.enableScrolling = true;
            if (widthOfInnerFlex >= getFullDayWidth()) {
                frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
                frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
            } else {
                frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
                frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
            }
        };
        //#endif

    }
};
/**
 *  This method returns the witdth of flex for full day
 */
getFullDayWidth = function() {
    var startTime = kony.apps.coe.ess.appconfig.fullDayStartTime;
    var endTime = kony.apps.coe.ess.appconfig.fullDayEndTime;
    var coordinates = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    var startIndex = coordinates.map(function(el) {
        return el[1];
    }).indexOf(startTime);
    var endIndex = coordinates.map(function(el) {
        return el[1];
    }).indexOf(endTime);
    var widthOfFlex = coordinates[endIndex][0] - coordinates[startIndex][0];
    var flexWidth = (parseInt(widthOfFlex) - 50);
    return flexWidth;
};
/**
 *  This method increases and decreases width of the slider according to movement(on right side)
 */
dragSliderRight = function(eventobject, x, y) {
    var obj = new kony.apps.coe.Reusable.TimelineCreation();
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    frmName.timeLineScrollFlex.enableScrolling = false;
    var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.TimelineCreation.rightOffsetX);
    var totalwidth = ((parseInt(frmName.flexSlider.width)) + newOffsetX) + parseInt(frmName.flexSlider.left);
    var length = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine.length;
    var width = ((parseInt(frmName.flexSlider.width)) + newOffsetX) + "dp";
    if (parseInt(width) > 30) {
        if ((totalwidth <= (kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[length - 1][0]))) {
            var widthOfInnerFlex = parseInt(width) - 50;
            frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
            //#ifdef iphone
            frmName.flexSlider.width = width;
            frmName.timeLineScrollFlex.enableScrolling = true;
            frmName.flexSliderRightPin.onTouchEnd = function() {
                if (widthOfInnerFlex >= getFullDayWidth()) {
                    frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
                    frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
                } else {
                    frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
                    frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
                }
            };
            //#endif
            //#ifdef android
            (new kony.apps.coe.Reusable.TimelineCreation()).animateSlider(parseInt(frmName.flexSlider.left), parseInt(width));
            frmName.flexSliderRightPin.onTouchEnd = function() {
                frmName.timeLineScrollFlex.enableScrolling = true;
                if (widthOfInnerFlex >= getFullDayWidth()) {
                    frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
                    frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
                } else {
                    frmTimeSheetCreate.btnHours.skin = "sknBtnMobBgC1c7393Op100FCffffffBor1pxRad24";
                    frmTimeSheetCreate.btnFullDay.skin = "sknBtnMobBgC0000Op0FCffffffBor1pxRad24";
                }
            };
            //#endif
        }
    }

};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Number}-left value of Slider
 * @param          {Number}-width of the Slider
 * @return         None
 * @description    This method animates slider.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.animateSlider = function(left, width) {
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    frmName.flexSlider.animate(
        kony.ui.createAnimation({

            "100": {
                "left": left + "dp",
                "width": width + "dp",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0
        }, {
            "animationEnd": function() {}
        });
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          Callback functions
 * @return         None
 * @description    This method sets startCallback and endCallback for creating and editing task.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.setCallback = function(startCallback, endCallback) {
    kony.apps.coe.Reusable.TimelineCreation.startCallback = startCallback;
    kony.apps.coe.Reusable.TimelineCreation.endCallback = endCallback;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method deletes selected task in TimeLine.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.deleteTask = function(start_time) {
    kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var TimeSheetData = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
    var loop;
    var indexForDelete;
    if (TimeSheetData.length !== undefined) {
        for (loop = 0; loop < TimeSheetData.length; loop++) {
            if (TimeSheetData[loop] !== null) {
                if (TimeSheetData[loop].flexName !== "" && TimeSheetData[loop].flexName !== undefined) {
                    var id = TimeSheetData[loop].flexName;
                    if (frmName[id] !== null && start_time === TimeSheetData[loop].startTime) {
                        TimeSheetData[loop] = this.removeConflictedTime(TimeSheetData[loop], id);
                        indexForDelete = loop;
                        kony.apps.coe.Reusable.TimelineCreation.previousTimeline = null;
                    }
                }
            }
        }
        kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = (new kony.apps.coe.Reusable.TimelineCreation()).removeEmptyDataInTimeSheetData(TimeSheetData);
    }
    if (kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn === true) {
        if (TimeSheetData.length !== undefined) {
            for (loop = 0; loop < TimeSheetData.length; loop++) {
                if (TimeSheetData[loop].flexName !== "" && TimeSheetData[loop].flexName !== undefined && TimeSheetData[loop].flexName == kony.apps.coe.Reusable.TimelineCreation.editingFlexName) {
                    TimeSheetData[loop] = this.removeConflictedTime(TimeSheetData[loop], TimeSheetData[loop].flexName);
                    break;
                }
            }
        }
        kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = (new kony.apps.coe.Reusable.TimelineCreation()).removeEmptyDataInTimeSheetData(TimeSheetData);
    }
    if (kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length > 0) {
        var obj = new kony.apps.coe.Reusable.TimelineCreation();
        var flexId,
            index;
        var sortedArray = TimeSheetData.sort(obj.sortTimeSheetData("startIndex"));
        if (sortedArray[0].flexName !== "" && sortedArray[0].flexName !== undefined) {
            flexId = sortedArray[0].flexName;
            index = 0;
        } else {
            for (loop = 0; loop < TimeSheetData.length; loop++) {
                if (TimeSheetData[loop].flexName !== "" && TimeSheetData[loop].flexName !== undefined) {
                    flexId = sortedArray[loop].flexName;
                    index = loop;
                    break;
                }
            }
        }
        if (flexId !== undefined && flexId !== null) {
            frmName[flexId].skin = "sknFlxMobBg1C7393Op80";
            kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 1;
            kony.apps.coe.Reusable.TimelineCreation.previousTimeline = flexId;
            kony.apps.coe.Reusable.TimelineCreation.selectedFlexName = flexId;
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[indexForDelete]);
        } else {
            frmName.flexSlider.isVisible = true;
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[indexForDelete]);
            kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime);
            kony.apps.coe.ess.myTime.TimesheetCreate.popluateTimePickerData();
            frmTimeSheetCreate.timePicker.selectedKeys = [kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime];
            kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
            kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = false;
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
            kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
        }

    } else {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
        frmName.flexSlider.isVisible = false;
        kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = true;
    }
    kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 0;
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTime();
    kony.apps.coe.Reusable.TimelineCreation.removeSliderCallback();
    var delFlag = 0
    for(var i=0; i<kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length; i++){
        if(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[i].data.Time_Line_Status !== "deleted"){
            delFlag = 1;
        }

    }
    if(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length <= 0 || delFlag != 1){
        showTimesheetHomeForm(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.date);    
    }
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method deletes entire TimeSheet data in TimeLine.
 */
kony.apps.coe.Reusable.TimelineCreation.prototype.deleteTimeline = function() {
    kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
    var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
    var TimeSheetData = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
    if (TimeSheetData.length !== undefined) {
        for (var loop = 0; loop < TimeSheetData.length; loop++) {
            if (TimeSheetData[loop] !== null && TimeSheetData[loop] !== undefined) {
                if (TimeSheetData[loop].flexName !== "" && TimeSheetData[loop].flexName !== undefined) {
                    var id = TimeSheetData[loop].flexName;
                    TimeSheetData[loop] = this.removeConflictedTime(TimeSheetData[loop], id);
                }
            }
        }
    }
    this.changeFixedIndex(0, kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine.length - 1, 0);
    kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = this.removeEmptyDataInTimeSheetData(TimeSheetData);
    this.setDefaultValues();
    frmName.flexSlider.isVisible = true;
    kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime);
    kony.apps.coe.ess.myTime.TimesheetCreate.popluateTimePickerData();
    frmTimeSheetCreate.timePicker.selectedKeys = [kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime];
    kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = false;
    kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 0;
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    kony.apps.coe.Reusable.TimelineCreation.deleteTimelineCallback();
    kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTime();
};
kony.apps.coe.Reusable.TimelineCreation.prototype.fillTimeline = function(data) {
    function minutesToTimeFormat(min) {
        function makeItTwoDigit(x) {
            return x < 10 ? "0" + x : x;
        }
        return makeItTwoDigit(parseInt(min / 60)) + ":" + makeItTwoDigit(parseInt(min % 60));
    }
    try {
        var frmName = kony.apps.coe.Reusable.TimelineCreation.parentWidgetName;
        var startsAt,
            endsAt,
            TimeSheetData = [],
            time,
            obj,
            startPosition,
            width,
            XCoordinatesOfTimeLine,
            start_time,
            end_time,
            sortedArray = [];
        XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
        obj = new kony.apps.coe.Reusable.TimelineCreation();
        for (var loop = 0; loop < data.length; loop++) {
            start_time = kony.apps.coe.Reusable.TimelineCreation.isValidTime(data[loop].Start_Time);
            end_time = kony.apps.coe.Reusable.TimelineCreation.isValidTime(data[loop].End_Time);
            startsAt = XCoordinatesOfTimeLine.map(function(el) {
                return el[1];
            }).indexOf(start_time);
            endsAt = XCoordinatesOfTimeLine.map(function(el) {
                return el[1];
            }).indexOf(end_time);
            var Id = kony.apps.coe.Reusable.TimelineCreation.id;
            startPosition = XCoordinatesOfTimeLine[startsAt][0];
            width = XCoordinatesOfTimeLine[endsAt][0] - startPosition;
            obj.changeFixedIndex(startsAt, endsAt, 1);
            kony.apps.coe.Reusable.TimelineCreation.taskName = data[loop].Task_Name;
            TimeSheetData[Id] = {
                "startIndex": startsAt,
                "endIndex": endsAt,
                "flexName": "flxSelectedTime" + Id,
                "startTime": start_time,
                "endTime": end_time,
                "taskName": kony.apps.coe.Reusable.TimelineCreation.taskName,
                "data": data[loop]
            };
            if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
                start_time = start_time.split(" ");
                end_time = end_time.split(" ");
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
                time = minutesToTimeFormat(duration);
            } else {
                time = start_time + "-" + end_time;
            }
            obj.createTemplate(Id, startPosition, width, time);
            kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = false;
            kony.apps.coe.Reusable.TimelineCreation.id = ++Id;
            kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = TimeSheetData;
            kony.apps.coe.Reusable.TimelineCreation.isTimeLineEmpty = false;
        }
        if (data.length > 0) {
            sortedArray = TimeSheetData.sort(obj.sortTimeSheetData("startIndex"));
            var flexId = sortedArray[0].flexName;
            frmName[flexId].skin = "sknFlxMobBg1C7393Op80";
            kony.apps.coe.Reusable.TimelineCreation.deleteFlag = 1;
            kony.apps.coe.Reusable.TimelineCreation.previousTimeline = flexId;
            kony.apps.coe.Reusable.TimelineCreation.selectedFlexName = flexId;
            kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
            kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback(sortedArray[0].data, data);
        } else {

            if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
                frmTimeSheetCreate.flxManualTimeSelection.setVisibility(true);
                frmTimeSheetCreate.tbxManualEntryhours.text = String(kony.store.getItem("defaultTaskDuration"));
                frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
                frmTimeSheetCreate.flxTotalTime.setVisibility(true);
                frmTimeSheetCreate.flxCopy.setVisibility(false);
            }
            if (kony.apps.coe.ess.globalVariables.fullDayButtonisSelected === true || kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.selectedItem == 1) {
                kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(kony.apps.coe.ess.appconfig.fullDayStartTime, kony.apps.coe.ess.appconfig.fullDayEndTime);
                kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = false;
            } else {
                var startIndex = XCoordinatesOfTimeLine.map(function(el) {
                    return el[1];
                }).indexOf(kony.apps.coe.ess.appconfig.defaultSliderStartTime);
                var taskUnit = parseInt(kony.store.getItem("defaultTaskDuration"));
                var timeUnit = kony.store.getItem("minTaskDuration");
                if (timeUnit === "1:00" || timeUnit === null || timeUnit === "") {
                    if (isNaN(taskUnit)) {
                        taskUnit = 2 * 80;
                    } else {
                        taskUnit = taskUnit * 80;
                    }
                } else if (timeUnit === "0:15") {
                    taskUnit = taskUnit * 4 * 80;
                }
                width = kony.apps.generalizeWidthInDp(taskUnit);
                frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
                frmName.flexSlider.left = XCoordinatesOfTimeLine[startIndex][0] + "dp";
                frmName.flexSlider.width = width + "dp";
                frmName.flexSlider.isVisible = true;
                kony.apps.coe.ess.globalVariables.prevSlider = frmName.flexSlider; //Storing the default slider (incase this is the first task)
                kony.apps.coe.Reusable.TimelineCreation.isSliderEmpty = false;
                kony.apps.coe.Reusable.TimelineCreation.createSliderCallback();
            }

        }
        kony.apps.coe.Reusable.TimelineCreation.TimeSheetData = TimeSheetData;
        kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTime();
        if (kony.apps.coe.ess.globalVariables.sliderLeftValue !== undefined && kony.apps.coe.ess.globalVariables.sliderLeftValue !== null && kony.apps.coe.ess.globalVariables.sliderLeftValue !== "") {
            frmTimeSheetCreate.flexSlider.setVisibility(true);
            kony.apps.coe.Reusable.TimelineCreation.scrollTimelineFrameSearch();

        }
    } catch (error) {
        kony.print("---- error in fillTimeline: " + JSON.stringify(error));
    }
};


kony.apps.coe.Reusable.TimelineCreation.isValidTime = function(time) {
    var validTime = time.split(" ");
    var checkMinutes;
    if (validTime[0].indexOf(".") !== -1) {
        checkMinutes = validTime[0].split(".");
        if (parseInt(checkMinutes[1]) !== 15 && parseInt(checkMinutes[1]) !== 30 && parseInt(checkMinutes[1]) !== 45) {
            time = checkMinutes[0] + " " + validTime[1];
        } else {
            time = validTime[0] + " " + validTime[1];
        }
    } else {
        time = validTime[0] + " " + validTime[1];
    }
    return time;
};
/**
 * @class          TimelineCreation
 * @type           Function
 * @param          Current timeSheet data
 * @return         Highest end time in timeline
 * @description    This method returns the highest end time given to a task in the current timeline
 */
kony.apps.coe.Reusable.TimelineCreation.getHighestEndTime = function(data) {
    var highest = [12, "AM"];
    var ampm = { "AM": 0, "PM": 1 };
    highest[1] = ampm[highest[1]];
    for (var index = 0; index < data.length; index++) {
        var temp = data[index].endTime.split(" ");
        temp[0] = parseFloat(temp[0]);
        temp[1] = ampm[temp[1]];
        if (temp[1] > highest[1]) {
            highest = temp;
        } else {
            if (temp[0] % 12 > highest[0] % 12) {
                highest = temp;
            }
        }
    }
    if (highest[1] === 0) {
        highest[1] = "AM";
    } else {
        highest[1] = "PM";
    }
    return highest;
};
/**
 * @class          TimelineCreation
 * @type           Function
 * @param          None
 * @return         None
 * @description    This method creates a slider over the timeline depending on the highest end time in the current timeline
 */
kony.apps.coe.Reusable.TimelineCreation.onAddingNewTimeEntry = function() {
    try {
        var data = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData;
        if(data.length >= 1){
            kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = true;
        }
        var highestEndTime = kony.apps.coe.Reusable.TimelineCreation.getHighestEndTime(data);
        var currentTaskStartTime = highestEndTime;
        var currentTaskEndTime = [];
        var defaultTime =  parseInt(kony.store.getItem("defaultTaskDuration"));
        currentTaskEndTime[0] = currentTaskStartTime[0] + defaultTime;  
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
        if (currentTaskEndTime[0] >= 13) {
            currentTaskEndTime[0] = currentTaskEndTime[0] % 12; //Adjusting the time between AM and PM margins
        }
        if (currentTaskEndTime[0] % 12 < currentTaskStartTime[0] % 12) { //If start time is in morning and end time is in afternoon
            if (currentTaskStartTime[1] == "AM") {
                currentTaskEndTime[1] = "PM";
            } else {
                currentTaskEndTime[1] = "AM";
            }
        } else {
            currentTaskEndTime[1] = currentTaskStartTime[1]; //If start time and end time are both in same margin
        }
        if ((parseFloat(currentTaskStartTime[0]) - parseInt(currentTaskStartTime[0], 10)) > 0) {
            currentTaskStartTime[0] = parseInt(currentTaskStartTime[0], 10) + (parseFloat(currentTaskStartTime[0]) - parseInt(currentTaskStartTime[0]));
            currentTaskStartTime[0] = currentTaskStartTime[0].toFixed(2);
        }
        if ((parseFloat(currentTaskEndTime[0]) - parseInt(currentTaskEndTime[0], 10)) > 0) {
            currentTaskEndTime[0] = parseInt(currentTaskEndTime[0], 10) + (parseFloat(currentTaskEndTime[0]) - parseInt(currentTaskEndTime[0]));
            currentTaskEndTime[0] = currentTaskEndTime[0].toFixed(2);
        }
        currentTaskStartTime = currentTaskStartTime[0] + " " + currentTaskStartTime[1];
        currentTaskEndTime = currentTaskEndTime[0] + " " + currentTaskEndTime[1];
        kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(currentTaskStartTime, currentTaskEndTime);
        frmTimeSheetCreate.flexSlider.isVisible = true;
        kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
        frmTimeSheetCreate.flxProjectTaskSelection.setVisibility(true);
        frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.setVisibility(false);
        frmTimeSheetCreate.flxTotalTime.setVisibility(false);
        frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
        kony.apps.coe.ess.myTime.TimesheetCreate.popluateTimePickerData();
        var startsAt = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine.map(function(el) {
            return el[1];
        }).indexOf(currentTaskStartTime);
        var endsAt = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine.map(function(el) {
            return el[1];
        }).indexOf(currentTaskEndTime);
        startsAt = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[startsAt][0].toString();
        endsAt = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine[endsAt][0].toString();
        frmTimeSheetCreate.timePicker.selectedKeys = [startsAt, endsAt];
        //        frmTimeSheetCreate.flxTimePicker.setVisibility(true);        
        frmTimeSheetCreate.flxTotalTime.setVisibility(false);
        frmTimeSheetCreate.flxSelectionBar.setVisibility(true);
        if (kony.apps.coe.ess.appconfig.isManualTimeEntry === true) {
            frmTimeSheetCreate.flxManualTimeSelection.setVisibility(true);
            frmTimeSheetCreate.flxTimePicker.setVisibility(false);
            frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
            frmTimeSheetCreate.flxTotalTime.setVisibility(true);
            frmTimeSheetCreate.flxCopy.setVisibility(false);
            //Default duration, will change it by taking duration from settings page in future
            frmTimeSheetCreate.tbxManualEntryhours.text = String(kony.store.getItem("defaultTaskDuration"));
        }
        kony.apps.coe.Reusable.TimelineCreation.scrollTimelineFrameSearch();
        kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.onClickOfWork();
        kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
    } catch (error) {
        kony.print("--- onAdding new task error: " + error);
    }
};