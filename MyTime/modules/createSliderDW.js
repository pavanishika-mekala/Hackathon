var kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.Reusable = kony.apps.coe.Reusable || {};
//%Region - Constructor
kony.apps.coe.Reusable.TimelineCreationDW = function () {
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
var flagToMove=0;
kony.apps.coe.Reusable.TimelineCreationDW.createSliderCallbackDW = function () {
  	kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = false;
};

kony.apps.coe.Reusable.TimelineCreationDW.removeSliderCallback = function () {
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.disableCloneTaskTo();
};

kony.apps.coe.Reusable.TimelineCreationDW.deleteTimelineCallback = function () {
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.disableCloneTaskTo();
	kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
	kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
};

kony.apps.coe.Reusable.TimelineCreationDW.selectTimelineTaskCallback = function (data,completeDataSet) {
  	kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = true;
	//kony.apps.coe.ess.myTime.TimesheetCreate.popups.enableCloneTaskTo();
	function callback(isLeave, data) {
		if (isLeave) {
			kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateLeaveName(data.TimeType_Id);
			kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedLeave();
		} else {
			if (this.flxScrTimeTypeGestureId !== null) {
				//frmTimeSheetCreate.flxScrTimeType.removeGestureRecognizer(kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.flxScrTimeTypeGestureId);
			}
			kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.hideTimeType();
		}
	}
	kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data = data;
	kony.apps.coe.ess.myTime.TimesheetCreate.isLeaveTimeType(data.TimeType_Id, callback, data);
};

kony.apps.coe.Reusable.TimelineCreationDW.editTimelineTaskCallback = function (data) {
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.disableCloneTaskTo();
  	kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = false;
	//     alert("editTimelineTaskCallback" + JSON.stringify(data));
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
	kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data = data;
	kony.apps.coe.ess.myTime.TimesheetCreate.isLeaveTimeType(data.TimeType_Id, callback, data);
};

kony.apps.coe.Reusable.TimelineCreationDW.fixTimelineTaskCallback = function () {
};

/**
 * @class          TimelineCreationDW
 * @type           UI creation.
 * @param          {String}-Name of the Parent Widget
 * @param          {Number}-StartTime of TimeLine
 * @param          {Number}-EndTime of TimeLine
 * @return         None
 * @description    This method creates timeline UI.
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.drawSliderUIDW = function (parent, startTime, endTime) {
	var leftValue = 0,
	noofHours,
	timeDuration,
	timeWithAMPM,
	hoursMin,
	roundTime,
	count = 0,
	time;
	kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName = parent;
	kony.apps.coe.Reusable.TimelineCreationDW.startTime = startTime;
	time = startTime;
	timeDuration = kony.store.getItem("minTaskDuration");
	if (timeDuration === "0:15") {
		noofHours = 24 * 4;
	} else {
		noofHours = 24;
	}
	kony.apps.coe.Reusable.TimelineCreationDW.noofHours = noofHours;
	var timeLineScrollFlex = new kony.ui.FlexScrollContainer({
			"id" : "timeLineScrollFlex",
			"skin" : "",
			"top" : "0%",
			"left" : "0%",
			"width" : "preferred",
			"height" : "100%",
			"zIndex" : 1,
			"isVisible" : true,
			"clipbounds" : true,
			"enableScrolling" : true,
			"scrollDirection" : kony.flex.SCROLL_HORIZONTAL,
			"horizontalScrollIndicator" : false,
			"bounces" : false,
			"allowHorizontalBounce" : false,
			"allowVerticalBounce" : false,
			"pagingEnabled" : false,
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
	parent.add(timeLineScrollFlex);
	for (var hours = 0; hours < noofHours; hours++) {
		leftValue = kony.apps.generalizeWidthInDp(hours * 20);
		if (noofHours === 24) {
			if (hours === 0 && kony.apps.coe.Reusable.TimelineCreationDW.startTime === 12) {
				timeWithAMPM = "12 AM";
				time = 1;
			} else {
				timeWithAMPM = (new kony.apps.coe.Reusable.TimelineCreationDW()).getTimeFormatWithAMPM(time);
				time++;
				if (time > 24) {
					time = 1;
				}
			}
		} else {
			if (hours === 0 && kony.apps.coe.Reusable.TimelineCreationDW.startTime === 12) {
				timeWithAMPM = "12 AM";
				time = 0;
				roundTime = timeWithAMPM;
				count++;
			} else if (hours % 4 === 0) {
				time++;
				if (time > 24) {
					time = 1;
				}
				timeWithAMPM = (new kony.apps.coe.Reusable.TimelineCreationDW()).getTimeFormatWithAMPM(time);
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
      var lblTime;
		var flexTimeLine = new kony.ui.FlexContainer({
				"id" : "flexTimeLine" + hours,
				"skin" : "sknflxBGffffffOP100DW",
				"top" : "0dp",
				"left" : leftValue + "dp",
				"width" : kony.apps.generalizeWidthInDp(20) + "dp",
				"height" : "50dp",
				"zIndex" : 9,
                 "onClick": this.tapTimeToGetSliderDW,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
			}, {
				"padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
			}, {});
      if(hours%2==0){
		 lblTime = new kony.ui.Label({
				id : "lblTime" + hours,
				skin : "sknlblF526270Px12AveRomanDW",
				"top" : "10px",
				"left" : "0%",
				"width" : "100%",
				"height" : "preferred",
				"text" : timeWithAMPM,
				"zIndex" : 7,
				"isVisible" : true
			}, {
				"padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false,
				"contentAlignment" : constants.CONTENT_ALIGN_CENTER
			}, {});
      }
      else{
         lblTime = new kony.ui.Label({
				id : "lblTime" + hours,
				skin : "sknlblF526270Px12AveRomanDW",
				"top" : "10px",
				"left" : "0%",
				"width" : "100%",
				"height" : "preferred",
				"text" : timeWithAMPM,
				"zIndex" : 7,
				"isVisible" : false
			}, {
				"padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false,
				"contentAlignment" : constants.CONTENT_ALIGN_CENTER
			}, {});
      }
		var lblCenterLine = new kony.ui.Label({
				id : "lblCenterLine" + hours,
				skin : "sknFlxMobBG979797Op100",
				"top" : "35px",
				"left" : "0dp",
				"width" : "2px",
				"height" : "12dp",
				"centerX" : "50%",
				"zIndex" : 8,
				"isVisible" : true
			}, {
				"padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false,
				"contentAlignment" : constants.CONTENT_ALIGN_CENTER
			}, {});
      	var lblCenterHorizontalLine = new kony.ui.Label({
				id : "lblCenterHorizontalLine" + hours,
				skin : "sknflxBGe6e6e6B2PxDW",
				"top" : "40dp",
				"left" : "0dp",
				"width" : "100%",
          		"centerX" : "50%",
				"height" : "2px",
				"zIndex" : 7,
				"isVisible" : true
			}, {
				"padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false,
				"contentAlignment" : constants.CONTENT_ALIGN_CENTER
			}, {});
        parent.timeLineScrollFlex.add(flexTimeLine);
        flexTimeLine.add(lblTime);
		flexTimeLine.add(lblCenterLine);
        flexTimeLine.add(lblCenterHorizontalLine);
		
	}
	var flexSlider = new kony.ui.FlexContainer({
			"id" : "flexSlider",
			"top" : "35dp",
			"left" : "900dp",
			"width" : "200dp",
            "height" : "53dp" ,
			"zIndex" : 9,
            "onClick": this.TapSlidertoFixTaskDW,
			"isVisible" : false,
			"clipbounds" : true,
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
  var flexSliderNew = new kony.ui.FlexContainer({
			"id" : "flexSliderNew",
			"top" : "35dp",
			"left" : "755dp",
			"width" : "555dp",
            "height" : "53dp" ,
			"zIndex" : 9,
            "onClick": this.TapSlidertoFixTaskDW,
			"isVisible" : false,
			"clipbounds" : true,
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
	var flexSliderLeftPin = new kony.ui.FlexContainer({
			"id" : "flexSliderLeftPin",
			"top" : "0dp",
			"left" : "0dp",
			"width" : "26dp",		
     		"height" : "100%",
			"zIndex" : 7,
			"isVisible" : true,
			"clipbounds" : true,
			"layoutType" : kony.flex.FREE_FORM,
			"onTouchStart" : onTouchStartOfLeftPinDW,
			"onTouchMove" : onTouchMoveOfLeftPinDW

		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
	var flexSliderRightPin = new kony.ui.FlexContainer({
			"id" : "flexSliderRightPin",
			"top" : "0dp",
			"right" : "0dp",
   			"width" : "26dp",
			"height" : "100%",
			"zIndex" : 7,
			"isVisible" : true,
			"clipbounds" : true,
			"layoutType" : kony.flex.FREE_FORM,
			"onTouchStart" : onTouchStartOfRightPinDW,
			"onTouchMove" : onTouchMoveOfRightPinDW
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
  
  var flexSliderLeftPinNew = new kony.ui.FlexContainer({
			"id" : "flexSliderLeftPinNew",
			"top" : "0dp",
			"left" : "157dp",
			"width" : "26dp",		
     		"height" : "100%",
			"zIndex" : 10,
			"isVisible" : true,
			"clipbounds" : true,
			"layoutType" : kony.flex.FREE_FORM,
			"onTouchStart" : onTouchStartOfLeftPinDW,
			"onTouchMove" : onTouchMoveOfLeftPinDW

		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
	var flexSliderRightPinNew = new kony.ui.FlexContainer({
			"id" : "flexSliderRightPinNew",
			"top" : "0dp",
			"right" : "202dp",
   			"width" : "26dp",
			"height" : "100%",
			"zIndex" : 10,
			"isVisible" : true,
			"clipbounds" : true,
			"layoutType" : kony.flex.FREE_FORM,
			"onTouchStart" : onTouchStartOfRightPinDW,
			"onTouchMove" : onTouchMoveOfRightPinDW
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});

	var flexSliderTask = new kony.ui.FlexContainer({
			"id" : "flexSliderTask",
			"top" : "5%",
			"left" : "13dp",
			"width" : "174dp",
			"height" : "53px",
			"zIndex" : 6,
			"isVisible" : true,
			"clipbounds" : true,
			"skin" :"sknflxBG66a6f1DW",
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
  
  var flexSliderTaskLeft = new kony.ui.FlexContainer({
			"id" : "flexSliderTaskLeft",
			"top" : "5%",
			"left" : "0dp",
			"width" : "170dp",
			"height" : "53px",
			"zIndex" : 6,
			"isVisible" : true,
			"clipbounds" : true,
			"skin" :"sknflxaebbc6DW",
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
  
  var flexSliderTaskCenter = new kony.ui.FlexContainer({
			"id" : "flexSliderTaskCenter",
			"top" : "5%",
			"left" : "170dp",
			"width" : "170dp",
			"height" : "53px",
			"zIndex" : 6,
			"isVisible" : true,
			"clipbounds" : true,
			"skin" :"sknflxBG66a6f1DW",
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
  
  var flexSliderTaskRight = new kony.ui.FlexContainer({
			"id" : "flexSliderTaskRight",
			"top" : "5%",
			"left" : "385dp",
			"width" : "170dp",
			"height" : "53px",
			"zIndex" : 6,
			"isVisible" : true,
			"clipbounds" : true,
			"skin" :"sknflxaebbc6DW",
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});

	var imgLeftPin = new kony.ui.Image2({
			"height" : "53dp",
			"id" : "imgLeftPin",
			"isVisible" : true,
			"left" : "0%",
			"top" : "0%",
			"width" : "26dp",
			"zIndex" : 1,
            "src" : "scroller.png"
		}, {
			"imageScaleMode" : constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
			"padding" : [0, 0, 0, 0],
			"paddingInPixel" : false
		}, {});
		
    var imgRightPin = new kony.ui.Image2({
			"height" : "53dp",
			"id" : "imgRightPin",
			"isVisible" : true,
			"right" : "0%",
			"top" : "0%",
			"width" : "26dp",
			"zIndex" : 1,
			"src" : "scroller.png"
		}, {
			"imageScaleMode" : constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
			"padding" : [0, 0, 0, 0],
			"paddingInPixel" : false
		}, {});
  var flexSliderBreak = new kony.ui.FlexContainer({
			"id" : "flexSliderBreak",
            "skin" : "sknflxff6e5fDW",
			"top" : "5%",
			"right" : "170dp",
   			"width" : "45dp",
			"height" : "100%",
			"zIndex" : 9,
			"isVisible" : true,
			"clipbounds" : true,
			"layoutType" : kony.flex.FREE_FORM,
			"onTouchStart" : onTouchStartOfRightPinDW,
			"onTouchMove" : onTouchMoveOfRightPinDW
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
  var imgBreak = new kony.ui.Image2({
			"height" : "30dp",
			"id" : "imgBreak",
			"isVisible" : true,
			"width" : "30dp",
			"zIndex" : 9,
   			"centerX": "50%",
     	    "centerY": "50%",
			"src" : "luch_white_icon.png"
		}, {
			"imageScaleMode" : constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
			"padding" : [0, 0, 0, 0],
			"paddingInPixel" : false
		}, {});
	var lblLeftPinTouchableArea = new kony.ui.Label({
			id : "lblLeftPinTouchableArea",
      		skin :"sknlblPx1298c8ffDW",
      		"top" : "32.5%",
			"left" : "6dp",
			"width" : "80%",
			"height" : "51.5%",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
	var lblRightPinTouchableArea = new kony.ui.Label({
			id : "lblRightPinTouchableArea",
      		skin :"sknlblPx1298c8ffDW",
            "top" : "32.5%",
			"right" : "6dp",
			"width" : "80%",
			"height" : "51.5%",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
	var lblTaskName = new kony.ui.Label({
			id : "lblTaskName",
			skin : "sknlblF4a90e2Px14AveMediumDW",
            "centerX" : "50%",
            "centerY" : "50%",
			"width" : "preferred",
			"height" : "preferred",
			"text" : kony.apps.coe.Reusable.TimelineCreationDW.taskName,
			"zIndex" : 10,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  
  var lblTaskNameLeft = new kony.ui.Label({
			id : "lblTaskNameLeft",
			skin : "sknLblffffffOp100DW",
            "centerX" : "50%",
            "centerY" : "65%",
			"width" : "100%",
			"height" : "100%",
			"text" : "Design",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  
 var lblTaskNameCenter = new kony.ui.Label({
			id : "lblTaskNameCenter",
			skin : "sknLblffffffOp100DW",
            "centerX" : "50%",
            "centerY" : "65%",
			"width" : "100%",
			"height" : "100%",
			"text" : "Research",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  var lblTaskNameRight = new kony.ui.Label({
			id : "lblTaskNameRight",
			skin : "sknLblffffffOp100DW",
            "centerX" : "50%",
            "centerY" : "65%",
			"width" : "100%",
			"height" : "100%",
			"text" : "Design",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  
   var lblTaskNameDownLeft = new kony.ui.Label({
			id : "lblTaskNameDownLeft",
			skin : "sknLblffffffOp100DW",
            "centerX" : "50%",
            "centerY" : "90%",
			"width" : "100%",
			"height" : "100%",
			"text" : "2:00",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  
 var lblTaskNameDownCenter = new kony.ui.Label({
			id : "lblTaskNameDownCenter",
			skin : "sknLblffffffOp100DW",
            "centerX" : "50%",
            "centerY" : "90%",
			"width" : "100%",
			"height" : "100%",
			"text" : "2:00",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  var lblTaskNameDownRight = new kony.ui.Label({
			id : "lblTaskNameDownRight",
			skin : "sknLblffffffOp100DW",
            "centerX" : "50%",
            "centerY" : "90%",
			"width" : "100%",
			"height" : "100%",
			"text" : "2:00",
			"zIndex" : 7,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  var lblAddTaskName = new kony.ui.Label({
			id : "lblAddTaskName",
			skin : "sknlblFe2e2e2DW",
            "left" : "555dp",
            "top" : "10%",
			"width" : "preferred",
			"height" : "preferred",
  			"text" : "Click to Add Task",
			"zIndex" : 10,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
  
    if(kony.apps.coe.Reusable.TimelineCreationDW.taskName===undefined || kony.apps.coe.Reusable.TimelineCreationDW.taskName===""){
      lblTaskName.text= kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.selectaTask");
    }
	parent.timeLineScrollFlex.add(flexSlider);
    parent.timeLineScrollFlex.add(flexSliderNew);
    flexSliderNew.add(flexSliderTaskLeft);
    flexSliderNew.add(flexSliderTaskCenter);
    flexSliderNew.add(flexSliderTaskRight);
	flexSliderNew.add(flexSliderLeftPinNew);
	flexSliderNew.add(flexSliderRightPinNew);
    flexSliderNew.add(flexSliderBreak);
    flexSliderNew.add(lblAddTaskName);
    flexSlider.add(flexSliderLeftPin);
	flexSlider.add(flexSliderRightPin);
	flexSlider.add(flexSliderTask);
  	flexSliderLeftPin.add(imgLeftPin);
    flexSliderLeftPinNew.add(imgLeftPin);
	flexSliderLeftPin.add(lblLeftPinTouchableArea);
	flexSliderTask.add(lblTaskName);
    flexSliderTaskLeft.add(lblTaskNameLeft);
    flexSliderTaskCenter.add(lblTaskNameCenter);
    flexSliderTaskRight.add(lblTaskNameRight);
    flexSliderTaskLeft.add(lblTaskNameDownLeft);
    flexSliderTaskCenter.add(lblTaskNameDownCenter);
    flexSliderTaskRight.add(lblTaskNameDownRight);
	flexSliderRightPin.add(imgRightPin);
    flexSliderRightPinNew.add(imgRightPin);
    flexSliderBreak.add(imgBreak);
	flexSliderRightPin.add(lblRightPinTouchableArea);
	parent.timeLineScrollFlex.showFadingEdges = false;
	kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData = [];
	(new kony.apps.coe.Reusable.TimelineCreationDW()).setDefaultValues();
};



/**
 * @class          TimelineCreationDW
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method stores coordinates and frame values of TimeLine flexes.
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.storeCoordinatesOfTimeLineDW = function () {
	var time = kony.apps.coe.Reusable.TimelineCreationDW.startTime;
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
	var left,
	ampmTime,
	min,
	hoursMinutes;
	var coordinates = [],
	sliderObj,
	timeDuration;
	sliderObj = (new kony.apps.coe.Reusable.TimelineCreationDW());
	timeDuration = kony.store.getItem("minTaskDuration");
	frmName.timeLineScrollFlex.flexSlider.width = kony.apps.generalizeWidthInDp(20) + "dp";
	for (var loop = 0; loop < kony.apps.coe.Reusable.TimelineCreationDW.noofHours; loop++) {
		if (timeDuration == "1:00" || timeDuration === null) {
			if (loop === 0 && kony.apps.coe.Reusable.TimelineCreationDW.startTime === 12) {
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
			left = parseInt(frmName.timeLineScrollFlex["flexTimeLine" + loop].left) + 20;
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

	kony.apps.coe.Reusable.TimelineCreationDW.XCoordinatesOfTimeLine = coordinates;
    sliderObj.scrollToDefaultTimeDW();
};

/**
 * @class          TimelineCreationDW
 * @type           prototype function
 * @param          {String}-time
 * @param          {Number}-Position/width
 * @return         time with snap value
 * @description    This method returns time with snap based on how much distance it moved.
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.getHoursMinutes = function (time, dpValue) {
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
 * @class          TimelineCreationDW
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method resets all value to default value.
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.setDefaultValues = function () {
	kony.apps.coe.Reusable.TimelineCreationDW.editingFixedTaskModeOn = false;
	kony.apps.coe.Reusable.TimelineCreationDW.isTimeLineEmpty = true;
	kony.apps.coe.Reusable.TimelineCreationDW.defaultFrameValue = "0";
	kony.apps.coe.Reusable.TimelineCreationDW.deleteFlag = 0;
	kony.apps.coe.Reusable.TimelineCreationDW.taskName = "";
	kony.apps.coe.Reusable.TimelineCreationDW.id = 0;
	kony.apps.coe.Reusable.TimelineCreationDW.isSliderEmpty = true;
	kony.apps.coe.Reusable.TimelineCreationDW.previousTimeline = null;
};
/**
 * @class          TimelineCreationDW
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method is used to scroll timeline to 8 am by default
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.scrollToDefaultTimeDW = function () {
	var sliderObj = new kony.apps.coe.Reusable.TimelineCreationDW();
	sliderObj.storeFrameValuesOfTimeLineDW();
                 for (var hours = 0; hours < kony.apps.coe.Reusable.TimelineCreationDW.noofHours; hours++) {
  }

};


/**
 *  OnTouchStart Action of LeftPin of Slider
 */
function onTouchStartOfLeftPinDW(eventobject, x, y) {
    flagToMove=1;
	getOnTouchCoordinatesOfLeftDW.call(this, eventobject, x, y);
}
/**
 *  OnTouchMove Action of LeftPin of Slider
 */
function onTouchMoveOfLeftPinDW(eventobject, x, y) {
    if(flagToMove===1){
	dragSliderLeftDW.call(this, eventobject, x, y);
    }
}
/**
 *  OnTouchStart Action of RightPin of Slider
 */
function onTouchStartOfRightPinDW(eventobject, x, y) {
    flagToMove=1;
	getOnTouchCoordinatesOfRightDW.call(this, eventobject, x, y);
}
/**
 *  OnTouchMove Action of rightPin of Slider
 */
function onTouchMoveOfRightPinDW(eventobject, x, y) {
    if(flagToMove===1){
	dragSliderRightDW.call(this, eventobject, x, y);
    }
}
/**
 *  This method stores x coordinate value of LeftPin of Slider
 */
getOnTouchCoordinatesOfLeftDW = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	kony.apps.coe.Reusable.TimelineCreationDW.leftOffsetX = x;
};
/**
 *  This method stores x coordinate value of RightPin of Slider
 */
getOnTouchCoordinatesOfRightDW = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	kony.apps.coe.Reusable.TimelineCreationDW.rightOffsetX = x;
};
/**
 *  This method increases/decreases the left value and width of the slider according to movement(on left side)
 */
dragSliderLeftDW = function (eventobject, x, y) {
	var obj = new kony.apps.coe.Reusable.TimelineCreationDW();
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.TimelineCreationDW.leftOffsetX);
	var left = (parseInt(frmName.timeLineScrollFlex.flexSlider.left) + newOffsetX) + "dp";
	var width = ((parseInt(frmName.timeLineScrollFlex.flexSlider.width)) - newOffsetX) + "dp";
	var widthOfInnerFlex = parseInt(width) - 50;
	if ((parseInt(left) > 35) && (parseInt(width) > 30)) {
	//	frmName.timeLineScrollFlex.flexSlider.flexSliderTask.width = widthOfInnerFlex + "dp";
//		//#ifdef iphone
        //#ifdef ipad
		frmName.timeLineScrollFlex.flexSlider.width = width;
		frmName.timeLineScrollFlex.flexSlider.left = left;
		frmName.timeLineScrollFlex.enableScrolling = true;
		//#endif
//     //#ifdef android
        //#ifdef desktopweb
		(new kony.apps.coe.Reusable.TimelineCreationDW()).animateSlider(parseInt(left), parseInt(width));
		frmName.timeLineScrollFlex.flexSlider.flexSliderLeftPin.onTouchEnd = function () {
		flagToMove=0;
			frmName.timeLineScrollFlex.enableScrolling = true;
		};
		//#endif

	}
};
/**
 *  This method increases and decreases width of the slider according to movement(on right side)
 */
dragSliderRightDW = function (eventobject, x, y) {
	var obj = new kony.apps.coe.Reusable.TimelineCreationDW();
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.TimelineCreationDW.rightOffsetX);
	var totalwidth = ((parseInt(frmName.timeLineScrollFlex.flexSlider.width)) + newOffsetX) + parseInt(frmName.timeLineScrollFlex.flexSlider.left);
	var length = kony.apps.coe.Reusable.TimelineCreationDW.XCoordinatesOfTimeLine.length;
	var width = ((parseInt(frmName.timeLineScrollFlex.flexSlider.width)) + newOffsetX) + "dp";
	if (parseInt(width) > 30) {
		if ((totalwidth <= (kony.apps.coe.Reusable.TimelineCreationDW.XCoordinatesOfTimeLine[length - 1][0]))) {
			var widthOfInnerFlex = parseInt(width) - 26;
			frmName.timeLineScrollFlex.flexSlider.flexSliderTask.width = widthOfInnerFlex + "dp";
            //#ifdef desktopweb
			(new kony.apps.coe.Reusable.TimelineCreationDW()).animateSlider(parseInt(frmName.timeLineScrollFlex.flexSlider.left), parseInt(width));
			frmName.timeLineScrollFlex.flexSlider.flexSliderRightPin.onTouchEnd = function () {
			flagToMove=0;
				frmName.timeLineScrollFlex.enableScrolling = true;
			};
			//#endif
		}
	}

};
/**
 * @class          TimelineCreationDW
 * @type           prototype function
 * @param          {Number}-left value of Slider
 * @param          {Number}-width of the Slider
 * @return         None
 * @description    This method animates slider.
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.animateSlider = function (left, width) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
	frmName.timeLineScrollFlex.flexSlider.animate(
		kony.ui.createAnimation({

			"100" : {
				"left" : left + "dp",
				"width" : width + "dp",
				"stepConfig" : {
					"timingFunction" : kony.anim.EASE
				}
			}
		}), {
		"delay" : 0,
		"iterationCount" : 1,
		"fillMode" : kony.anim.FILL_MODE_FORWARDS,
		"duration" : 0
	}, {
		"animationEnd" : function () {}
	});
};
/**
 * @class          TimelineCreationDW
 * @type           prototype function
 * @param          Callback functions
 * @return         None
 * @description    This method sets startCallback and endCallback for creating and editing task.
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.setCallback = function (startCallback, endCallback) {
	kony.apps.coe.Reusable.TimelineCreationDW.startCallback = startCallback;
	kony.apps.coe.Reusable.TimelineCreationDW.endCallback = endCallback;
};
kony.apps.coe.Reusable.TimelineCreationDW.prototype.fillTimelineDW = function (data) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
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
	XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreationDW.XCoordinatesOfTimeLine;
	obj = new kony.apps.coe.Reusable.TimelineCreationDW();
	for (var loop = 0; loop < data.length; loop++) {
		start_time = kony.apps.coe.Reusable.TimelineCreationDW.isValidTime(data[loop].Start_Time);
		end_time = kony.apps.coe.Reusable.TimelineCreationDW.isValidTime(data[loop].End_Time);
		startsAt = XCoordinatesOfTimeLine.map(function (el) {
				return el[1];
			}).indexOf(start_time);
		endsAt = XCoordinatesOfTimeLine.map(function (el) {
				return el[1];
			}).indexOf(end_time);
		var Id = kony.apps.coe.Reusable.TimelineCreationDW.id;
		startPosition = XCoordinatesOfTimeLine[startsAt][0];
		width = XCoordinatesOfTimeLine[endsAt][0] - startPosition;
		obj.changeFixedIndex(startsAt, endsAt, 1);
		kony.apps.coe.Reusable.TimelineCreationDW.taskName = data[loop].Task_Name;
		TimeSheetData[Id] = {
			"startIndex" : startsAt,
			"endIndex" : endsAt,
			"flexName" : "flxSelectedTime" + Id,
			"startTime" : start_time,
			"endTime" : end_time,
			"taskName" : kony.apps.coe.Reusable.TimelineCreationDW.taskName,
			"data" : data[loop]
		};
		time = start_time + "-" + end_time;
		obj.createTemplate(Id, startPosition, width, time);
		kony.apps.coe.Reusable.TimelineCreationDW.editingFixedTaskModeOn = false;
		kony.apps.coe.Reusable.TimelineCreationDW.id = ++Id;
		kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData = TimeSheetData;
		kony.apps.coe.Reusable.TimelineCreationDW.isTimeLineEmpty = false;
	}
	if (data.length > 0) {
		sortedArray = TimeSheetData.sort(obj.sortTimeSheetData("startIndex"));
		var flexId = sortedArray[0].flexName;
		frmName[flexId].skin = "sknFlxMobBg1C7393Op80";
		kony.apps.coe.Reusable.TimelineCreationDW.deleteFlag = 1;
		kony.apps.coe.Reusable.TimelineCreationDW.previousTimeline = flexId;
		kony.apps.coe.Reusable.TimelineCreationDW.selectedFlexName = flexId;
		kony.apps.coe.Reusable.TimelineCreationDW.isUnfixedTaskPresent = false;
		kony.apps.coe.Reusable.TimelineCreationDW.selectTimelineTaskCallback(sortedArray[0].data,data);
	} else {
		var startIndex = XCoordinatesOfTimeLine.map(function (el) {
				return el[1];
			}).indexOf("9 AM");
		var taskUnit = parseInt(kony.store.getItem("defaultTaskDuration"));
		var timeUnit = kony.store.getItem("minTaskDuration");
		if (timeUnit === "1:00" || timeUnit === null || timeUnit === "") {
			if (isNaN(taskUnit)) {
				taskUnit = 2 * 20;
			} else {
				taskUnit = taskUnit * 20;
			}
		} else if (timeUnit === "0:15") {
			taskUnit = taskUnit * 4 * 20;
		}
		width = kony.apps.generalizeWidthInDp(taskUnit);
      width= "100p";
	//	frmName.timeLineScrollFlex.flexSlider.flexSliderTask.width = (parseInt(width) - 50) + "dp";
	//	frmName.timeLineScrollFlex.flexSlider.left = XCoordinatesOfTimeLine[startIndex][0] + "dp";
	//	frmName.timeLineScrollFlex.flexSlider.width = width + "dp";
		frmName.timeLineScrollFlex.flexSlider.isVisible = true;
		kony.apps.coe.Reusable.TimelineCreationDW.isSliderEmpty = false;
		kony.apps.coe.Reusable.TimelineCreationDW.createSliderCallbackDW();
	}
	kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData = TimeSheetData;
	//kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTimeDW();
};


kony.apps.coe.Reusable.TimelineCreationDW.isValidTime = function (time) {
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
kony.apps.coe.Reusable.TimelineCreationDW.prototype.storeFrameValuesOfTimeLineDW = function () {
		kony.apps.coe.Reusable.TimelineCreationDW.isUnfixedTaskPresent = true;
		var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
		var frameValues = [];
		for (var loop = 0; loop < kony.apps.coe.Reusable.TimelineCreationDW.noofHours; loop++) {
			if (frmName.timeLineScrollFlex["flexTimeLine" + loop]["lblTime" + loop].text === kony.apps.coe.Reusable.TimelineCreationDW.initialScrollHour) {
				kony.apps.coe.Reusable.TimelineCreationDW.defaultFrameValue = parseInt(JSON.stringify(frmName.timeLineScrollFlex["flexTimeLine" + loop].frame.x));
				var iphoneHack = loop;
				//#ifdef iphone
				iphoneHack = iphoneHack+2;
				//#endif
				var x = frmName.timeLineScrollFlex["flexTimeLine" + iphoneHack];
			}
			frameValues.push([parseInt(JSON.stringify(frmName.timeLineScrollFlex["flexTimeLine" + loop].frame.x))]);
		}
		kony.apps.coe.Reusable.TimelineCreationDW.frameValueOfTimeLine = frameValues;
		kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName.timeLineScrollFlex.scrollToWidget(x);
		frmCreateViewDW.forceLayout();
};

kony.apps.coe.Reusable.TimelineCreationDW.prototype.getTimeFormatWithAMPM = function (startTime) {
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


kony.apps.coe.Reusable.TimelineCreationDW.prototype.TapSlidertoFixTaskDW=function(commonWidget,gestureInfo,context)
{
  if(!kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.isValidData()) {
       return;
    }

          var TimeSheetData=[],width,sortedArray,startPosition,flexId,flexLeft,startTime,endTime,data,len;
          var obj=new kony.apps.coe.Reusable.TimelineCreationDW();
          var frmName=kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
          var XCoordinatesOfTimeLine=kony.apps.coe.Reusable.TimelineCreationDW.XCoordinatesOfTimeLine;
          var startIndex=obj.search(parseInt(commonWidget.left),XCoordinatesOfTimeLine);
          var endIndex=obj.search(parseInt(commonWidget.left)+parseInt(commonWidget.frame.width)-5,XCoordinatesOfTimeLine);
          startPosition=XCoordinatesOfTimeLine[startIndex][0];
          width=(XCoordinatesOfTimeLine[endIndex][0]-startPosition);
          TimeSheetData=kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData;
          if(kony.apps.coe.Reusable.TimelineCreationDW.editingFixedTaskModeOn===true)
            {
                 var id=kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName.split("flxSelectedTime");
                 flexId=kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName;
                 for(var i=0;i<TimeSheetData.length;i++)
                  {
                     if(TimeSheetData[i]!==null)
                       if(TimeSheetData[i].flexName===kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName)
                     {
                         var teid = TimeSheetData[i].data.Time_Entry_Id;
                         data=kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.get();
                         data.Time_Entry_Id = teid;
                         kony.apps.coe.Reusable.TimelineCreationDW.taskName=data.Task_Name;
                         TimeSheetData[i].startIndex=startIndex;
                         TimeSheetData[i].endIndex=endIndex;
                         TimeSheetData[i].startTime=XCoordinatesOfTimeLine[startIndex][1];
                         TimeSheetData[i].endTime=XCoordinatesOfTimeLine[endIndex][1];
                         TimeSheetData[i].taskName=kony.apps.coe.Reusable.TimelineCreationDW.taskName;
                         TimeSheetData[i].data=data;
                         TimeSheetData[i].data.Start_Time=XCoordinatesOfTimeLine[startIndex][1];
                         TimeSheetData[i].data.End_Time=XCoordinatesOfTimeLine[endIndex][1];
                         len=i;
                         if(TimeSheetData[i].data.Time_Line_Status===null||TimeSheetData[i].data.Time_Line_Status===""){
                           TimeSheetData[i].data.Time_Line_Status="modified";
                         }
                     }
                   }
                 var skin;
                 startTime=XCoordinatesOfTimeLine[startIndex][1];
                 endTime=XCoordinatesOfTimeLine[endIndex][1];
                 flexId=kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName;
                 TimeSheetData=obj.checkConflictsAndOverrideTimeLine(TimeSheetData,startIndex,endIndex,kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName);  
                 frmName[kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName]["lblSelectedTaskName"+id[1]].text=kony.apps.coe.Reusable.TimelineCreationDW.taskName; 
                 frmName[kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime; 
                 frmName[kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName].left=startPosition+"dp";
                 frmName[kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName].width=(width-2)+"dp";
                 if(TimeSheetData[len].data.isBillabe === true || String(TimeSheetData[len].data.isBillable) === "1"){
                         skin = "sknFlxMobBg2D86E2";
                 }else{
                         skin = "sknMobFlx8C98A2Op100";
                 }
                 frmName[kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName].skin = skin;
                 frmName[kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName].isVisible=true;
                 kony.apps.coe.Reusable.TimelineCreationDW.editingFixedTaskModeOn=false;
                 kony.apps.coe.Reusable.TimelineCreationDW.isUnfixedTaskPresent = false;
                 kony.apps.coe.Reusable.TimelineCreationDW.editingFlexName="";
            }
          else
            {
              if(startIndex != endIndex){
              var Id=kony.apps.coe.Reusable.TimelineCreationDW.id;
              startTime=XCoordinatesOfTimeLine[startIndex][1];
              endTime=XCoordinatesOfTimeLine[endIndex][1];
              data=kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.get();
              kony.apps.coe.Reusable.TimelineCreationDW.taskName=data.Task_Name;
              flexId="flxSelectedTime"+Id;
              TimeSheetData.push({"startIndex":startIndex,"endIndex":endIndex,"flexName":"flxSelectedTime"+Id,"startTime":startTime,"endTime":endTime,"taskName":kony.apps.coe.Reusable.TimelineCreationDW.taskName,"data":data});
              len=TimeSheetData.length-1;
              TimeSheetData[len].data.Time_Line_Status="added";
              TimeSheetData[len].data.Start_Time=startTime;
              TimeSheetData[len].data.End_Time=endTime;
              TimeSheetData=obj.checkConflictsAndOverrideTimeLine(TimeSheetData,startIndex,endIndex,"flxSelectedTime"+Id);
              var time=startTime+"-"+endTime;
              obj.createTemplate(Id,startPosition,width,time,TimeSheetData[len].data.isBillable);
              kony.apps.coe.Reusable.TimelineCreationDW.editingFixedTaskModeOn=false;
              kony.apps.coe.Reusable.TimelineCreationDW.isUnfixedTaskPresent = false;
              kony.apps.coe.Reusable.TimelineCreationDW.id=++Id;
              }else{
                kony.print("---Unwanted data---");
              }
            }  
         if(flexId!==undefined&&flexId!==null){
                frmName[flexId].skin="sknFlxMobBg1C7393Op80";
                kony.apps.coe.Reusable.TimelineCreationDW.deleteFlag = 1;
                kony.apps.coe.Reusable.TimelineCreationDW.previousTimeline=flexId;
                kony.apps.coe.Reusable.TimelineCreationDW.selectedFlexName=flexId;
                } 
  	     kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData=TimeSheetData;
  		 kony.apps.coe.ess.myTime.TimelineCreationDW.Backend.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData[len]);
         kony.apps.coe.Reusable.TimelineCreationDW.selectTimelineTaskCallback(TimeSheetData[len],kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData);
  		 this.changeFixedIndex(startIndex,endIndex,1);
         kony.apps.coe.Reusable.TimelineCreationDW.isTimeLineEmpty=false;
         frmName.timeLineScrollFlex.enableScrolling=true;  
         frmName.timeLineScrollFlex.flexSlider.isVisible=false;
         kony.apps.coe.Reusable.TimelineCreationDW.isSliderEmpty=true;
         (new kony.apps.coe.Reusable.TimelineCreationDW()).animateSlider(XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length-1][0],155);
         kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTime();
     
      
};

kony.apps.coe.Reusable.TimelineCreationDW.prototype.tapTimeToGetSliderDW = function (commonWidget, gestureInfo, context) {
	kony.apps.coe.Reusable.TimelineCreationDW.isUnfixedTaskPresent = true;
	var frmName = kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
	var obj = new kony.apps.coe.Reusable.TimelineCreationDW();
	var leftPosition = 0,
	checkEndIndexFilled,
	length,
	endPosition = 0,
	checkStartIndexFilled = 0,
	XCoordinatesOfTimeLine = [],
	taskUnit,
	timeUnit;
	//frmName.timeLineScrollFlex.flexSlider.flexSliderTask.lblTaskName.text = kony.apps.coe.Reusable.TimelineCreationDW.taskName;
  	frmName.timeLineScrollFlex.flexSlider.flexSliderTask.lblTaskName.text = "Select Task below";
	frmName.timeLineScrollFlex.flexSlider.isVisible = true;
	taskUnit = parseInt(kony.store.getItem("defaultTaskDuration"));
	timeUnit = kony.store.getItem("minTaskDuration");
	//leftPosition = (commonWidget.frame.x + 45);
	leftPosition = (commonWidget.frame.x + 30);
  	XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreationDW.XCoordinatesOfTimeLine;
	length = XCoordinatesOfTimeLine.length;
	//checkStartIndexFilled = obj.search((parseInt(commonWidget.frame.x) + 45), XCoordinatesOfTimeLine);
  	checkStartIndexFilled = obj.search((parseInt(commonWidget.frame.x) + 30), XCoordinatesOfTimeLine);
	if (timeUnit === "1:00"||timeUnit===null||timeUnit==="") {
        if(isNaN(taskUnit)){
          taskUnit=2*20;
        }else{
		taskUnit = taskUnit * kony.apps.generalizeWidthInDp(20);}
	} else if (timeUnit === "0:15") {
		taskUnit = taskUnit * 4 * 20;
	}
	if ((XCoordinatesOfTimeLine[checkStartIndexFilled + 1][2] !== 1) || (XCoordinatesOfTimeLine[checkStartIndexFilled + 2][2] !== 1)) {
			if ((parseInt(commonWidget.frame.x)) == XCoordinatesOfTimeLine[length - 8][0] - 18) {
				if (XCoordinatesOfTimeLine[length - 12][2] !== 1) {
				//	leftPosition = XCoordinatesOfTimeLine[length - 12][0] + 45;
					leftPosition = XCoordinatesOfTimeLine[length - 12][0] + 30;
                } else {
					//leftPosition = parseInt(commonWidget.frame.x) + 45;
					leftPosition = parseInt(commonWidget.frame.x) + 30;
                }
			} else if ((parseInt(commonWidget.frame.x)) == XCoordinatesOfTimeLine[length - 4][0] - 18) {
				if (XCoordinatesOfTimeLine[length - 12][2] !== 1) {
				leftPosition = XCoordinatesOfTimeLine[length - 12][0] + 30;
                  //leftPosition = XCoordinatesOfTimeLine[length - 12][0] + 45;
				} else if (XCoordinatesOfTimeLine[length - 8][2] !== 1) {
					//leftPosition = XCoordinatesOfTimeLine[length - 8][0] + 45;
   					leftPosition = XCoordinatesOfTimeLine[length - 8][0] + 30;
				} else {
					frmName.timeLineScrollFlex.flexSlider.isVisible = false;
				}
			}
			checkEndIndexFilled = obj.search(leftPosition + kony.apps.generalizeWidthInDp(taskUnit), XCoordinatesOfTimeLine);
			if (checkEndIndexFilled === XCoordinatesOfTimeLine.length - 1) {
				endPosition = kony.apps.generalizeWidthInDp(XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length - 3][0] - leftPosition + 30);
			} else  {
				for (var loop = checkStartIndexFilled; loop < checkEndIndexFilled; loop++) {
					if (XCoordinatesOfTimeLine[loop][2] === 1) {
						break;
					}
				}
				endPosition = kony.apps.generalizeWidthInDp(XCoordinatesOfTimeLine[loop - 1][0] - leftPosition);
			} /*else {
				endPosition = kony.apps.generalizeWidthInDp(taskUnit);
			}*/
      
	//	frmName.timeLineScrollFlex.flexSlider.flexSliderTask.width = (endPosition - 50) + "dp";
      		frmName.timeLineScrollFlex.flexSlider.flexSliderTask.width = ((commonWidget.frame.width*2) ) + "dp";
			(new kony.apps.coe.Reusable.TimelineCreationDW()).animateSlider(commonWidget.frame.x+(commonWidget.frame.width/2)-13, commonWidget.frame.width*2+26);
            kony.apps.coe.Reusable.TimelineCreationDW.isSliderEmpty=false;
			//#ifdef iphone
			var index = obj.search(commonWidget.frame.x, kony.apps.coe.Reusable.TimelineCreationDW.frameValueOfTimeLine);
			if ((index > 0) && (index < kony.apps.coe.Reusable.TimelineCreationDW.frameValueOfTimeLine.length - 3)) {
				var xOffset = kony.apps.coe.Reusable.TimelineCreationDW.frameValueOfTimeLine[index - 1][0];
				var contentOffset = {
					x : xOffset,
					y : "0"
				};
				frmName.timeLineScrollFlex.setContentOffset(contentOffset, true);
			}
			//#endif
		}
     if(kony.apps.coe.Reusable.TimelineCreationDW.previousTimeline!==null){
         var selecteddata = kony.apps.coe.Reusable.TimelineCreationDW.TimeSheetData.filter(function(v){ return v["flexName"] == kony.apps.coe.Reusable.TimelineCreationDW.previousTimeline; });
          var skin;
          if(selecteddata[0].data.isBillabe === true || String(selecteddata[0].data.isBillable) === "1"){
            skin = "sknFlxMobBg2D86E2";
          }else{
            skin = "sknMobFlx8C98A2Op100";
          }
	     frmName[kony.apps.coe.Reusable.TimelineCreationDW.previousTimeline].skin= skin;
     }
     if(!kony.apps.coe.Reusable.TimelineCreationDW.editingFixedTaskModeOn) {
       frmName.timeLineScrollFlex.flexSlider.flexSliderLeftPin.lblLeftPinTouchableArea.skin = "sknlblPx1298c8ffDW";              
       frmName.timeLineScrollFlex.flexSlider.flexSliderRightPin.lblRightPinTouchableArea.skin = "sknlblPx1298c8ffDW";
      // frmName.timeLineScrollFlex.flexSlider.flexSliderTask.lblTaskName.skin = "sknlblPx1298c8ffDW";
       //kony.apps.coe.Reusable.TimelineCreationDW.updateTaskName("");
       kony.apps.coe.Reusable.TimelineCreationDW.createSliderCallbackDW();
     } else {
         kony.apps.coe.Reusable.TimelineCreationDW.updateTaskName(kony.apps.coe.Reusable.TimelineCreationDW.taskName);
     }
     
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Number}-searchElement
 * @param          Array to be searched
 * @return         Closest Index of search element
 * @description    This method searches the element in the array and returns closest index of that element.
 */
kony.apps.coe.Reusable.TimelineCreationDW.prototype.search = function (searchElement, searchArray) {
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
kony.apps.coe.Reusable.TimelineCreationDW.updateTaskName=function(task_name)
{
    var frmName=kony.apps.coe.Reusable.TimelineCreationDW.parentWidgetName;
    frmName.timeLineScrollFlex.flexSlider.flexSliderTask.lblTaskName.text=task_name;
    kony.apps.coe.Reusable.TimelineCreationDW.taskName=task_name;
};