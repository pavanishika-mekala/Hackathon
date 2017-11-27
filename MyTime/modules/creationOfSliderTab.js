var kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.Reusable = kony.apps.coe.Reusable || {};
//%Region - Constructor
kony.apps.coe.Reusable.TimelineCreationTab = function () {
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
kony.apps.coe.Reusable.TimelineCreationTab.createSliderCallbackTab = function () {
  kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelectionTab.isBlocked = false;
	//kony.apps.coe.ess.myTime.TimesheetCreate.popups.disableCloneTaskTo();
	//kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
	kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.reset();
};

kony.apps.coe.Reusable.TimelineCreationTab.removeSliderCallback = function () {
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.disableCloneTaskTo();
};

kony.apps.coe.Reusable.TimelineCreationTab.deleteTimelineCallback = function () {
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.disableCloneTaskTo();
	kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
	kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
};

/**
 * @function
 *
 * @param data 
 * @param completeDataSet 
 */
kony.apps.coe.Reusable.TimelineCreationTab.selectTimelineTaskCallback = function (data,completeDataSet) {
  try{
  	kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelectionTab.isBlocked = true;
	function callback(isLeave, data) {
      try{
		if (isLeave) {
			kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateLeaveName(data.TimeType_Id);
			//kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfigTab.showSelectedLeave();
		} else {
			if (this.flxScrTimeTypeGestureId !== null) {
				//frmTimeSheetCreate.flxScrTimeType.removeGestureRecognizer(kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.flxScrTimeTypeGestureId);
			}
			//frmTimeSheetCreate.flxSelectedTask.setEnabled(false);
			//kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfigTab.hideTimeType();
			//kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollDownToShowSelectedTask();
			//frmTimeSheetCreate.tbxSelectedTaskDescription.text = data.Desc;
			//kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(data.Project_Task_Id);
			//kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateTimeType(data.TimeType_Id);
          	  kony.apps.coe.ess.myTime.TimesheetCreate.settingTaskSummaryTab(completeDataSet,kony.apps.coe.ess.myTime.TimesheetCreate.updateSegmentTab);
			//kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedTaskTimeType();
		}
      }
  	catch(e){
      handleCustomAlert(e.message);
      }
    }
	kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data = data;
	kony.apps.coe.ess.myTime.TimesheetCreate.isLeaveTimeTypeTab(data.TimeType_Id, callback, data);
  }
  catch(e){
    handleCustomAlert(e.message);
  }
};

kony.apps.coe.Reusable.TimelineCreationTab.editTimelineTaskCallback = function (data) {
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.disableCloneTaskTo();
  	kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelectionTab.isBlocked = false;
	//     alert("editTimelineTaskCallback" + JSON.stringify(data));
	function callback(isLeave, data) {
		if (isLeave) {
			kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
			kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggle.onClickOfLeave(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.leaves());
		} else {
			//frmTimeSheetCreate.flxSelectedTask.setEnabled(true);
			//frmTimeSheetCreate.tbxSelectedTaskDescription.text = data.Desc;
			kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateProjectTaskName(data.Project_Task_Id);
			kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateTimeType(data.TimeType_Id);
			kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedTaskTimeType();
			kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
		}
	}
	kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data = data;
	kony.apps.coe.ess.myTime.TimesheetCreate.isLeaveTimeType(data.TimeType_Id, callback, data);
};

kony.apps.coe.Reusable.TimelineCreationTab.fixTimelineTaskCallback = function () {
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.drawSliderUITab = function (parent, startTime, endTime) {
	var leftValue = 0,
	noofHours,
	timeDuration,
	timeWithAMPM,
	hoursMin,
	roundTime,
	count = 0,
	time;
	kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName = parent;
	kony.apps.coe.Reusable.TimelineCreationTab.startTime = startTime;
	time = startTime;
	timeDuration = kony.store.getItem("minTaskDuration");
	if (timeDuration === "0:15") {
		noofHours = 24 * 4;
	} else {
		noofHours = 24;
	}
	kony.apps.coe.Reusable.TimelineCreationTab.noofHours = noofHours;
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
			"horizontalScrollIndicator" : true,
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
			if (hours === 0 && kony.apps.coe.Reusable.TimelineCreationTab.startTime === 12) {
				timeWithAMPM = "12 AM";
				time = 1;
			} else {
				timeWithAMPM = (new kony.apps.coe.Reusable.TimelineCreationTab()).getTimeFormatWithAMPM(time);
				time++;
				if (time > 24) {
					time = 1;
				}
			}
		} else {
			if (hours === 0 && kony.apps.coe.Reusable.TimelineCreationTab.startTime === 12) {
				timeWithAMPM = "12 AM";
				time = 0;
				roundTime = timeWithAMPM;
				count++;
			} else if (hours % 4 === 0) {
				time++;
				if (time > 24) {
					time = 1;
				}
				timeWithAMPM = (new kony.apps.coe.Reusable.TimelineCreationTab()).getTimeFormatWithAMPM(time);
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
      	var lblCenterLine;
		var flexTimeLine = new kony.ui.FlexContainer({
				"id" : "flexTimeLine" + hours,
				"skin" : "sknflxBGffffffOP100Tab",
				"top" : "0dp",
				"left" : leftValue + "dp",
				"width" : kony.apps.generalizeWidthInDp(20) + "dp",
				"height" : "50dp",
				"zIndex" : 5,
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
				skin : "sknlblF526270Px18AveRomanTab",
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
      if(hours%2!=0){
		 lblCenterLine = new kony.ui.Label({
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
			}
			else
			{
	lblCenterLine = new kony.ui.Label({
				id : "lblCenterLine" + hours,
				skin : "sknflxBG979797Tab",
				"top" : "36.5px",
				"left" : "0dp",
				"width" : "8px",
				"height" : "8dp",
				"centerX" : "50%",
				"zIndex" : 8,
				"isVisible" : true
			}, {
				"padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false,
				"contentAlignment" : constants.CONTENT_ALIGN_CENTER
			}, {});
			}
            	var lblCenterHorizontalLine = new kony.ui.Label({
				id : "lblCenterHorizontalLine" + hours,
				skin : "sknflxBGe6e6e6B2PxTab",
				"top" : "41dp",
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
			"zIndex" : 8,
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
			"onTouchStart" : onTouchStartOfLeftPinTab,
			"onTouchMove" : onTouchMoveOfLeftPinTab

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
			"onTouchStart" : onTouchStartOfRightPinTab,
			"onTouchMove" : onTouchMoveOfRightPinTab
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});

	var flexSliderTask = new kony.ui.FlexContainer({
			"id" : "flexSliderTask",
			"top" : "5%",
             //"top" : "10%",
			"left" : "25dp",
			"width" : "150dp",
			"height" : "53%",
             //"height":"90%",
			"zIndex" : 6,
			"isVisible" : true,
			"clipbounds" : true,
			"skin" :"sknflxBG66a6f1Tab",
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
			"width" : "50%",
			"zIndex" : 11,
			//"src" : "lefthandle.png"
             "src" : "handle.png"
		}, {
			"imageScaleMode" : constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
			"padding" : [0, 0, 0, 0],
			"paddingInPixel" : false
		}, {});
		
    var imgRightPin = new kony.ui.Image2({
			"height" : "100%",
			"id" : "imgRightPin",
			"isVisible" : true,
			"right" : "0%",
			"top" : "0%",
			"width" : "50%",
			"zIndex" : 11,
			//"src" : "righthandle.png"
            "src" : "handle.png"
		}, {
			"imageScaleMode" : constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
			"padding" : [0, 0, 0, 0],
			"paddingInPixel" : false
		}, {});
	var lblLeftPinTouchableArea = new kony.ui.Label({
			id : "lblLeftPinTouchableArea",
			//skin : "sknLblPin",
            skin : "sknLblTask98c8ff",
			"top" : "7%",
			"left" : "6dp",
			"width" : "80%",
			"height" : "51.5%",
			"zIndex" : 5,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
	var lblRightPinTouchableArea = new kony.ui.Label({
			id : "lblRightPinTouchableArea",
			//skin : "sknLblPin",
			skin : "sknLblTask98c8ff",
            "top" : "7%",
			"right" : "6dp",
			"width" : "80%",
			"height" : "51.5%",
			"zIndex" : 5,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
	var lblTaskName = new kony.ui.Label({
			id : "lblTaskName",
			skin : "sknLblTask98c8ff",
			"centerX" : "50%",
            "top" : "5%",
			"width" : "100%",
			"height" : "95%",
			"text" : kony.apps.coe.Reusable.TimelineCreationTab.taskName,
			"zIndex" : 10,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
    if(kony.apps.coe.Reusable.TimelineCreationTab.taskName===undefined || kony.apps.coe.Reusable.TimelineCreationTab.taskName===""){
      lblTaskName.text= kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.selectaTask");
    }
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
	kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData = [];
	(new kony.apps.coe.Reusable.TimelineCreationTab()).setDefaultValues();
};



/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method stores coordinates and frame values of TimeLine flexes.
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.storeCoordinatesOfTimeLineTab = function () {
	var time = kony.apps.coe.Reusable.TimelineCreationTab.startTime;
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	var left,
	ampmTime,
	min,
	hoursMinutes;
	var coordinates = [],
	sliderObj,
	timeDuration;
	sliderObj = (new kony.apps.coe.Reusable.TimelineCreationTab());
	timeDuration = kony.store.getItem("minTaskDuration");
	frmName.flexSlider.width = kony.apps.generalizeWidthInDp(155) + "dp";
	frmName.flexSlider.setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
		fingers : 1,
		taps : 2
	}, this.TapSlidertoFixTaskTab.bind(this));
             /*  for (var hours = 0; hours < kony.apps.coe.Reusable.TimelineCreationTab.noofHours; hours++) {
     alert("At start of store "+JSON.stringify(frmTimeSheetCreateTab.flxTimeLine.timeLineScrollFlex["flexTimeLine" + hours].frame));
  }*/
	for (var loop = 0; loop < kony.apps.coe.Reusable.TimelineCreationTab.noofHours; loop++) {
		var gestureHandle = frmName.timeLineScrollFlex["flexTimeLine" + loop].setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
				fingers : 1
			}, this.tapTimeToGetSliderTab.bind(this));
		if (timeDuration == "1:00" || timeDuration === null) {
			if (loop === 0 && kony.apps.coe.Reusable.TimelineCreationTab.startTime === 12) {
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
                 for (var hours = 0; hours < kony.apps.coe.Reusable.TimelineCreationTab.noofHours; hours++) {
    // alert("At end of store "+JSON.stringify(frmTimeSheetCreateTab.flxTimeLine.timeLineScrollFlex["flexTimeLine" + hours].frame));
  }
	kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine = coordinates;
	//kony.apps.coe.ess.myTime.navigationTab.prototype.onClickOfDeleteMenuTab();
    sliderObj.scrollToDefaultTimeTab();
};

/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {String}-time
 * @param          {Number}-Position/width
 * @return         time with snap value
 * @description    This method returns time with snap based on how much distance it moved.
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.getHoursMinutes = function (time, dpValue) {
	var minTaskDuration = kony.store.getItem("minTaskDuration");
	var min = "",
	hoursMinutes,
	defaultWidth,
	addMin;
	defaultWidth = kony.apps.generalizeWidthInDp(20);
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.setDefaultValues = function () {
	kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn = false;
	kony.apps.coe.Reusable.TimelineCreationTab.isTimeLineEmpty = true;
	kony.apps.coe.Reusable.TimelineCreationTab.defaultFrameValue = "0";
	kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 0;
	kony.apps.coe.Reusable.TimelineCreationTab.taskName = "";
	kony.apps.coe.Reusable.TimelineCreationTab.id = 0;
	kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty = true;
	kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline = null;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method is used to scroll timeline to 8 am by default
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.scrollToDefaultTimeTab = function () {
	var sliderObj = new kony.apps.coe.Reusable.TimelineCreationTab();
	sliderObj.storeFrameValuesOfTimeLine();
                 for (var hours = 0; hours < kony.apps.coe.Reusable.TimelineCreationTab.noofHours; hours++) {
    // alert("before frame "+JSON.stringify(frmTimeSheetCreateTab.flxTimeLine.timeLineScrollFlex["flexTimeLine" + hours].frame));
  }

};


/**
 *  OnTouchStart Action of LeftPin of Slider
 */
function onTouchStartOfLeftPinTab(eventobject, x, y) {
	getOnTouchCoordinatesOfLeftTab.call(this, eventobject, x, y);
}
/**
 *  OnTouchMove Action of LeftPin of Slider
 */
function onTouchMoveOfLeftPinTab(eventobject, x, y) {
	dragSliderLeftTab.call(this, eventobject, x, y);
}
/**
 *  OnTouchStart Action of RightPin of Slider
 */
function onTouchStartOfRightPinTab(eventobject, x, y) {
	getOnTouchCoordinatesOfRightTab.call(this, eventobject, x, y);
}
/**
 *  OnTouchMove Action of rightPin of Slider
 */
function onTouchMoveOfRightPinTab(eventobject, x, y) {
	dragSliderRightTab.call(this, eventobject, x, y);
}
/**
 *  This method stores x coordinate value of LeftPin of Slider
 */
getOnTouchCoordinatesOfLeftTab = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	kony.apps.coe.Reusable.TimelineCreationTab.leftOffsetX = x;
};
/**
 *  This method stores x coordinate value of RightPin of Slider
 */
getOnTouchCoordinatesOfRightTab = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	kony.apps.coe.Reusable.TimelineCreationTab.rightOffsetX = x;
};
/**
 *  This method increases/decreases the left value and width of the slider according to movement(on left side)
 */
dragSliderLeftTab = function (eventobject, x, y) {
	var obj = new kony.apps.coe.Reusable.TimelineCreationTab();
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.TimelineCreationTab.leftOffsetX);
	var left = (parseInt(frmName.flexSlider.left) + newOffsetX) + "dp";
	var width = ((parseInt(frmName.flexSlider.width)) - newOffsetX) + "dp";
	var widthOfInnerFlex = parseInt(width) - 50;
	if ((parseInt(left) > 35) && (parseInt(width) > 30)) {
		frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
//		//#ifdef iphone
        //#ifdef ipad
		frmName.flexSlider.width = width;
		frmName.flexSlider.left = left;
		frmName.timeLineScrollFlex.enableScrolling = true;
		//#endif
//     //#ifdef android
		//#ifdef tabrcandroid
		(new kony.apps.coe.Reusable.TimelineCreationTab()).animateSlider(parseInt(left), parseInt(width));
		frmName.flexSliderLeftPin.onTouchEnd = function () {
			frmName.timeLineScrollFlex.enableScrolling = true;
		};
		//#endif

	}
};
/**
 *  This method increases and decreases width of the slider according to movement(on right side)
 */
dragSliderRightTab = function (eventobject, x, y) {
	var obj = new kony.apps.coe.Reusable.TimelineCreationTab();
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	frmName.timeLineScrollFlex.enableScrolling = false;
	var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.TimelineCreationTab.rightOffsetX);
	var totalwidth = ((parseInt(frmName.flexSlider.width)) + newOffsetX) + parseInt(frmName.flexSlider.left);
	var length = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine.length;
	var width = ((parseInt(frmName.flexSlider.width)) + newOffsetX) + "dp";
	if (parseInt(width) > 30) {
		if ((totalwidth <= (kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine[length - 1][0]))) {
			var widthOfInnerFlex = parseInt(width) - 50;
			frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
//			//#ifdef iphone
            //#ifdef ipad
			frmName.flexSlider.width = width;
			frmName.timeLineScrollFlex.enableScrolling = true;
			//#endif
//			//#ifdef android
            //#ifdef tabrcandroid
			(new kony.apps.coe.Reusable.TimelineCreationTab()).animateSlider(parseInt(frmName.flexSlider.left), parseInt(width));
			frmName.flexSliderRightPin.onTouchEnd = function () {
				frmName.timeLineScrollFlex.enableScrolling = true;
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.animateSlider = function (left, width) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	frmName.flexSlider.animate(
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
 * @class          TimelineCreation
 * @type           prototype function
 * @param          Callback functions
 * @return         None
 * @description    This method sets startCallback and endCallback for creating and editing task.
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.setCallback = function (startCallback, endCallback) {
	kony.apps.coe.Reusable.TimelineCreationTab.startCallback = startCallback;
	kony.apps.coe.Reusable.TimelineCreationTab.endCallback = endCallback;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method deletes selected task in TimeLine.
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.deleteTask = function () {
	kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = false;
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	var TimeSheetData = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData;
	var loop;
	if (TimeSheetData.length !== undefined) {
		for (loop = 0; loop < TimeSheetData.length; loop++) {
			if (TimeSheetData[loop] !== null) {
				if (TimeSheetData[loop].flexName !== "" && TimeSheetData[loop].flexName !== undefined) {
					var id = TimeSheetData[loop].flexName;
					if (frmName[id] !== null && kony.apps.coe.Reusable.TimelineCreationTab.selectedFlexName === TimeSheetData[loop].flexName) {
						TimeSheetData[loop] = this.removeConflictedTime(TimeSheetData[loop], id);
						kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline = null;
					}
				}
			}
		}
		kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData = (new kony.apps.coe.Reusable.TimelineCreationTab()).removeEmptyDataInTimeSheetData(TimeSheetData);
	}
	if (kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn === true) {
		if (TimeSheetData.length !== undefined) {
			for (loop = 0; loop < TimeSheetData.length; loop++) {
				if (TimeSheetData[loop].flexName !== "" && TimeSheetData[loop].flexName !== undefined && TimeSheetData[loop].flexName == kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName) {
					TimeSheetData[loop] = this.removeConflictedTime(TimeSheetData[loop], TimeSheetData[loop].flexName);
					break;
				}
			}
		}
		kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData = (new kony.apps.coe.Reusable.TimelineCreationTab()).removeEmptyDataInTimeSheetData(TimeSheetData);
	}
	if (kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData.length > 0) {
		var obj = new kony.apps.coe.Reusable.TimelineCreationTab();
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
			kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 1;
			kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline = flexId;
			kony.apps.coe.Reusable.TimelineCreationTab.selectedFlexName = flexId;
			kony.apps.coe.Reusable.TimelineCreationTab.selectTimelineTaskCallback(sortedArray[index].data);
		} else {
            frmName.flexSlider.isVisible = true;
            kony.apps.coe.Reusable.TimelineCreationTab.setDefaultSlider("9 AM", "11 AM");
	        kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty = false;
          	kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
			kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
		}

	} else {
		    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTasks();
            frmName.flexSlider.isVisible = false;
            kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty = true;
	}
	kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 0;
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
	kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTimeTab();
	kony.apps.coe.Reusable.TimelineCreationTab.removeSliderCallback();
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          None
 * @return         None
 * @description    This method deletes entire TimeSheet data in TimeLine.
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.deleteTimeline = function () {
	kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = false;
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	var TimeSheetData = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData;
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
	this.changeFixedIndex(0, kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine.length - 1, 0);
	kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData = this.removeEmptyDataInTimeSheetData(TimeSheetData);
	this.setDefaultValues();
	frmName.flexSlider.isVisible = true;
    kony.apps.coe.Reusable.TimelineCreationTab.setDefaultSlider("9 AM", "11 AM");
	kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty = false;
	kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 0;
	kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
	kony.apps.coe.Reusable.TimelineCreationTab.deleteTimelineCallback();
	kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTimeTab();
};
kony.apps.coe.Reusable.TimelineCreationTab.prototype.fillTimelineTab = function (data) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
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
	XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
	obj = new kony.apps.coe.Reusable.TimelineCreationTab();
	for (var loop = 0; loop < data.length; loop++) {
		start_time = kony.apps.coe.Reusable.TimelineCreationTab.isValidTime(data[loop].Start_Time);
		end_time = kony.apps.coe.Reusable.TimelineCreationTab.isValidTime(data[loop].End_Time);
		startsAt = XCoordinatesOfTimeLine.map(function (el) {
				return el[1];
			}).indexOf(start_time);
		endsAt = XCoordinatesOfTimeLine.map(function (el) {
				return el[1];
			}).indexOf(end_time);
		var Id = kony.apps.coe.Reusable.TimelineCreationTab.id;
		startPosition = XCoordinatesOfTimeLine[startsAt][0];
		width = XCoordinatesOfTimeLine[endsAt][0] - startPosition;
		obj.changeFixedIndex(startsAt, endsAt, 1);
		kony.apps.coe.Reusable.TimelineCreationTab.taskName = data[loop].Task_Name;
		TimeSheetData[Id] = {
			"startIndex" : startsAt,
			"endIndex" : endsAt,
			"flexName" : "flxSelectedTime" + Id,
			"startTime" : start_time,
			"endTime" : end_time,
			"taskName" : kony.apps.coe.Reusable.TimelineCreationTab.taskName,
			"data" : data[loop]
		};
		time = start_time + "-" + end_time;
		obj.createTemplate(Id, startPosition, width, time);
		kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn = false;
		kony.apps.coe.Reusable.TimelineCreationTab.id = ++Id;
		kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData = TimeSheetData;
		kony.apps.coe.Reusable.TimelineCreationTab.isTimeLineEmpty = false;
	}
	if (data.length > 0) {
		sortedArray = TimeSheetData.sort(obj.sortTimeSheetData("startIndex"));
		var flexId = sortedArray[0].flexName;
		frmName[flexId].skin = "sknFlxMobBg1C7393Op80";
		kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 1;
		kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline = flexId;
		kony.apps.coe.Reusable.TimelineCreationTab.selectedFlexName = flexId;
		kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = false;
		kony.apps.coe.Reusable.TimelineCreationTab.selectTimelineTaskCallback(sortedArray[0].data,data);
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
		frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
		frmName.flexSlider.left = XCoordinatesOfTimeLine[startIndex][0] + "dp";
		frmName.flexSlider.width = width + "dp";
		frmName.flexSlider.isVisible = true;
		kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty = false;
		kony.apps.coe.Reusable.TimelineCreationTab.createSliderCallbackTab();
	}
    kony.apps.coe.ess.globalVariables.prevSlider = frmName.flexSlider;
	kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData = TimeSheetData;
	kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTimeTab();
};


kony.apps.coe.Reusable.TimelineCreationTab.isValidTime = function (time) {
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

kony.apps.coe.Reusable.TimelineCreationTab.storeSlider = function() {
    try {
        kony.print("---- in store slider");
        if (kony.apps.coe.ess.globalVariables.fullDayButtonisSelected !== true) {
            kony.apps.coe.ess.globalVariables.prevSliderLeft = frmTimeSheetCreateTab.flexSlider.left;
            kony.apps.coe.ess.globalVariables.prevSliderWidth = frmTimeSheetCreateTab.flexSlider.width;
        }
    } catch (error) {
        handleError(error);
    }
};

kony.apps.coe.Reusable.TimelineCreationTab.revertSlider = function() {
    try {
        kony.print("---- in revert slider");
        var left = kony.apps.coe.ess.globalVariables.prevSliderLeft;
        var width = kony.apps.coe.ess.globalVariables.prevSliderWidth;
        kony.print("---- left: " + kony.apps.coe.ess.globalVariables.prevSliderLeft);
        kony.print("---- width" + kony.apps.coe.ess.globalVariables.prevSliderWidth);
        if (kony.apps.coe.ess.globalVariables.prevSliderLeft !== undefined && kony.apps.coe.ess.globalVariables.prevSliderWidth !== undefined && kony.apps.coe.ess.globalVariables.prevSliderLeft !== null && kony.apps.coe.ess.globalVariables.prevSliderWidth !== null && kony.apps.coe.ess.globalVariables.prevSliderLeft !== "" && kony.apps.coe.ess.globalVariables.prevSliderWidth !== "") {
            var slider = frmTimeSheetCreateTab.flexSlider;
            frmTimeSheetCreateTab.flexSlider.left = kony.apps.coe.ess.globalVariables.prevSliderLeft;
            frmTimeSheetCreateTab.flexSlider.width = kony.apps.coe.ess.globalVariables.prevSliderWidth;
            frmTimeSheetCreateTab.flexSliderTask.width = (parseInt(kony.apps.coe.ess.globalVariables.prevSliderWidth, 10) - 50) + "dp";
            frmTimeSheetCreateTab.flexSlider.forceLayout();

        } else //If incase there are no previous slider positions it will take up a default function
        {
            kony.apps.coe.Reusable.TimelineCreationTab.setDefaultSlider(kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime);
            kony.apps.coe.ess.globalVariables.prevSliderLeft = "";
            kony.apps.coe.ess.globalVariables.prevSliderWidth = "";
        }
    } catch (error) {
        handleError(error);
    }
};