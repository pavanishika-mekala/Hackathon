/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Number}-searchElement
 * @param          Array to be searched
 * @return         Closest Index of search element
 * @description    This method searches the element in the array and returns closest index of that element.
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.searchTab = function (searchElement, searchArray) {
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.getTimeFormatWithAMPM = function (startTime) {
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.sortTimeSheetData = function (prop) {
	return function (a, b) {
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.changeFixedIndex = function (startIndex, endIndex, value) {
	for (var i = startIndex; i < endIndex; i++) {
		kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine[i][2] = value;
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.checkConflictsAndOverrideTimeLine = function (TimeSheetData, startIndex, endIndex, OverrideFlexName) {
	var sortedArray, startTime , endTime , frmName , flexId , flexLeft , coordinates = [];
	var obj = new kony.apps.coe.Reusable.TimelineCreationTab();
    frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
    coordinates = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
	if ((TimeSheetData.length !== undefined) || (TimeSheetData.length !== 0)) {
		for (var loopValue = 0; loopValue < TimeSheetData.length; loopValue++) {
			if (TimeSheetData[loopValue] !== undefined &&(TimeSheetData[loopValue] !== null)) {
				if (TimeSheetData[loopValue].flexName!==undefined&&TimeSheetData[loopValue].flexName !== OverrideFlexName) {
					  if((startIndex<TimeSheetData[loopValue].endIndex)&&(TimeSheetData[loopValue].startIndex<startIndex))
                      {
                           flexId=TimeSheetData[loopValue].flexName;
                           flexLeft=coordinates[TimeSheetData[loopValue].startIndex][0];
                           frmName[flexId].width=(coordinates[startIndex][0]-flexLeft - 2)+"dp";
                           TimeSheetData[loopValue].endIndex = obj.searchTab(parseInt(frmName[flexId].width)+flexLeft , coordinates);
                           startTime=coordinates[TimeSheetData[loopValue].startIndex][1];
                           endTime=coordinates[TimeSheetData[loopValue].endIndex][1];
                           id = flexId.split("flxSelectedTime");
                           frmName[flexId]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime;
                           TimeSheetData[loopValue].startTime=startTime;
                           TimeSheetData[loopValue].endTime=endTime;
                           TimeSheetData[loopValue].data.Start_Time=startTime;
                           TimeSheetData[loopValue].data.End_Time=endTime;
                           if(TimeSheetData[loopValue].data.Time_Line_Status===null||TimeSheetData[loopValue].data.Time_Line_Status===""){
                               TimeSheetData[loopValue].data.Time_Line_Status="modified";
                             }
                      }
                      else if((endIndex>TimeSheetData[loopValue].startIndex)&&(TimeSheetData[loopValue].endIndex>endIndex))
                      {        
                           flexId=TimeSheetData[loopValue].flexName;
                           flexLeft=coordinates[endIndex][0];
                           frmName[flexId].left  = flexLeft + "dp";
                           frmName[flexId].width=(coordinates[TimeSheetData[loopValue].endIndex][0]-flexLeft - 2)+"dp";
                           TimeSheetData[loopValue].startIndex = obj.searchTab(flexLeft , coordinates);
                           TimeSheetData[loopValue].endIndex = obj.searchTab(parseInt(frmName[flexId].width)+flexLeft , coordinates);
                           startTime=coordinates[TimeSheetData[loopValue].startIndex][1];
                           endTime=coordinates[TimeSheetData[loopValue].endIndex][1];
                           id = flexId.split("flxSelectedTime");
                           frmName[flexId]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime;
                           TimeSheetData[loopValue].startTime=startTime;
                           TimeSheetData[loopValue].endTime=endTime;
                           TimeSheetData[loopValue].data.Start_Time=startTime;
                           TimeSheetData[loopValue].data.End_Time=endTime;
                           if(TimeSheetData[loopValue].data.Time_Line_Status===null||TimeSheetData[loopValue].data.Time_Line_Status===""){
                               TimeSheetData[loopValue].data.Time_Line_Status="modified";
                             }
                      }
                      else if((TimeSheetData[loopValue].startIndex<endIndex)&&((TimeSheetData[loopValue].endIndex==endIndex)))
                      {            
                           flexId=TimeSheetData[loopValue].flexName;
                           TimeSheetData[loopValue]=obj.removeConflictedTime(TimeSheetData[loopValue],flexId);
                       }else if((TimeSheetData[loopValue].startIndex>startIndex)&&((TimeSheetData[loopValue].endIndex<endIndex))){
                           flexId=TimeSheetData[loopValue].flexName;
                           TimeSheetData[loopValue]=obj.removeConflictedTime(TimeSheetData[loopValue],flexId);
                       }else if(startIndex === TimeSheetData[loopValue].startIndex &&TimeSheetData[loopValue].endIndex < endIndex){
                           flexId=TimeSheetData[loopValue].flexName;
                           TimeSheetData[loopValue]=obj.removeConflictedTime(TimeSheetData[loopValue],flexId);
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.storeFrameValuesOfTimeLine = function () {
        var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
		kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = true;		
		var frameValues = [];
		for (var loop = 0; loop < kony.apps.coe.Reusable.TimelineCreationTab.noofHours; loop++) {
			if (frmName.timeLineScrollFlex["flexTimeLine" + loop]["lblTime" + loop].text === kony.apps.coe.Reusable.TimelineCreationTab.initialScrollHour) {
             
				kony.apps.coe.Reusable.TimelineCreationTab.defaultFrameValue = parseInt(JSON.stringify(frmName.timeLineScrollFlex["flexTimeLine" + loop].frame.x));
				var iphoneHack = loop;
				//#ifdef iphone
				iphoneHack = iphoneHack+2;
				//#endif
                //#ifdef ipad
                iphoneHack = iphoneHack+2;
                //#endif
				 var x = frmName.timeLineScrollFlex["flexTimeLine" + iphoneHack];
			}
           try{
			    frameValues.push([parseInt(JSON.stringify(frmName.timeLineScrollFlex["flexTimeLine" + loop].frame.x))]);
              }
          catch(err){alert(err.message);}
		}
		kony.apps.coe.Reusable.TimelineCreationTab.frameValueOfTimeLine = frameValues;
		kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName.timeLineScrollFlex.scrollToWidget(x);
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.tapTimeToGetSliderTab = function (commonWidget, gestureInfo, context) {
	kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = true;
   if (kony.apps.coe.ess.globalVariables.prevSlider !== "") {
        this.TapSlidertoFixTaskTab(kony.apps.coe.ess.globalVariables.prevSlider);
        //kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
    }
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	var obj = new kony.apps.coe.Reusable.TimelineCreationTab();
	var leftPosition = 0,
	checkEndIndexFilled,
	length,
	endPosition = 0,
	checkStartIndexFilled = 0,
	XCoordinatesOfTimeLine = [],
	taskUnit,
	timeUnit;
	frmName.flexSliderTask.lblTaskName.text = kony.apps.coe.Reusable.TimelineCreationTab.taskName;
    kony.apps.coe.ess.globalVariables.prevSlider = frmName.flexSlider;
	frmName.flexSlider.isVisible = true;
	taskUnit = parseInt(kony.store.getItem("defaultTaskDuration"));
	timeUnit = kony.store.getItem("minTaskDuration");
	leftPosition = (commonWidget.frame.x + 45);
	XCoordinatesOfTimeLine = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
	length = XCoordinatesOfTimeLine.length;
	checkStartIndexFilled = obj.searchTab((parseInt(commonWidget.frame.x) + 45), XCoordinatesOfTimeLine);
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
			checkEndIndexFilled = obj.searchTab(leftPosition + kony.apps.generalizeWidthInDp(taskUnit), XCoordinatesOfTimeLine);
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
			frmName.flexSliderTask.width = (endPosition - 50) + "dp";
			(new kony.apps.coe.Reusable.TimelineCreationTab()).animateSlider(leftPosition, endPosition);
            kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty=false;
			//#ifdef iphone
			var index = obj.searchTab(commonWidget.frame.x, kony.apps.coe.Reusable.TimelineCreationTab.frameValueOfTimeLine);
			if ((index > 0) && (index < kony.apps.coe.Reusable.TimelineCreationTab.frameValueOfTimeLine.length - 3)) {
				var xOffset = kony.apps.coe.Reusable.TimelineCreationTab.frameValueOfTimeLine[index - 1][0];
				var contentOffset = {
					x : xOffset,
					y : "0"
				};
				frmName.timeLineScrollFlex.setContentOffset(contentOffset, true);
			}
			//#endif
		}
     if(kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline!==null){
         var selecteddata = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData.filter(function(v){ return v["flexName"] == kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline; });
          var skin;
          if(selecteddata[0].data.isBillabe === true || String(selecteddata[0].data.isBillable) === "1"){
            skin = "sknFlxMobBg2D86E2";
          }else{
            skin = "sknMobFlx8C98A2Op100";
          }
	     frmName[kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline].skin= skin;
     }
     if(!kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn) {
      // frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblPin";
      // frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblPin";
      // frmName.flexSlider.lblTaskName.skin = "sknLblPin";
       frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblTask98c8ff";
       frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblTask98c8ff";
       frmName.flexSlider.lblTaskName.skin = "sknLblTask98c8ff";
       kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName("");
       kony.apps.coe.Reusable.TimelineCreationTab.createSliderCallbackTab();
     } else {
         kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName(kony.apps.coe.Reusable.TimelineCreationTab.taskName);
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

kony.apps.coe.Reusable.TimelineCreationTab.prototype.TapSlidertoFixTaskTab=function(commonWidget,gestureInfo,context)
{
	      if(!kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.isValidData()) {
       return;
    }
          var TimeSheetData=[],width,sortedArray,startPosition,flexId,flexLeft,startTime,endTime,data,len;
          var obj=new kony.apps.coe.Reusable.TimelineCreationTab();
          var frmName=kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
          var XCoordinatesOfTimeLine=kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
          var startIndex=obj.searchTab(parseInt(commonWidget.left),XCoordinatesOfTimeLine);
          var endIndex=obj.searchTab(parseInt(commonWidget.left)+parseInt(commonWidget.frame.width)-5,XCoordinatesOfTimeLine);
          startPosition=XCoordinatesOfTimeLine[startIndex][0];
          width=(XCoordinatesOfTimeLine[endIndex][0]-startPosition);
          TimeSheetData=kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData;
          if(kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn===true)
            {
                 var id=kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName.split("flxSelectedTime");
                 flexId=kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName;
                 for(var i=0;i<TimeSheetData.length;i++)
                  {
                     if(TimeSheetData[i]!==null)
                       if(TimeSheetData[i].flexName===kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName)
                     {
                         var teid = TimeSheetData[i].data.Time_Entry_Id;
                         data=kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.get();
                         data.Time_Entry_Id = teid;
                         kony.apps.coe.Reusable.TimelineCreationTab.taskName=data.Task_Name;
                         TimeSheetData[i].startIndex=startIndex;
                         TimeSheetData[i].endIndex=endIndex;
                         TimeSheetData[i].startTime=XCoordinatesOfTimeLine[startIndex][1];
                         TimeSheetData[i].endTime=XCoordinatesOfTimeLine[endIndex][1];
                         TimeSheetData[i].taskName=kony.apps.coe.Reusable.TimelineCreationTab.taskName;
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
                 flexId=kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName;
                 TimeSheetData=obj.checkConflictsAndOverrideTimeLine(TimeSheetData,startIndex,endIndex,kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName);  
                 frmName[kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName]["lblSelectedTaskName"+id[1]].text=kony.apps.coe.Reusable.TimelineCreationTab.taskName; 
                 frmName[kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime; 
                 frmName[kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName].left=startPosition+"dp";
                 frmName[kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName].width=(width-2)+"dp";
                 if(TimeSheetData[len].data.isBillabe === true || String(TimeSheetData[len].data.isBillable) === "1"){
                         skin = "sknFlxMobBg2D86E2";
                 }else{
                         skin = "sknMobFlx8C98A2Op100";
                 }
                 frmName[kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName].skin = skin;
                 frmName[kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName].isVisible=true;
                 kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn=false;
                 kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = false;
                 kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName="";
            }
          else
            {
              var Id=kony.apps.coe.Reusable.TimelineCreationTab.id;
              startTime=XCoordinatesOfTimeLine[startIndex][1];
              endTime=XCoordinatesOfTimeLine[endIndex][1];
              data=kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.get();
              kony.apps.coe.Reusable.TimelineCreationTab.taskName=data.Task_Name;
              flexId="flxSelectedTime"+Id;
              TimeSheetData.push({"startIndex":startIndex,"endIndex":endIndex,"flexName":"flxSelectedTime"+Id,"startTime":startTime,"endTime":endTime,"taskName":kony.apps.coe.Reusable.TimelineCreationTab.taskName,"data":data});
              len=TimeSheetData.length-1;
              TimeSheetData[len].data.Time_Line_Status="added";
              TimeSheetData[len].data.Start_Time=startTime;
              TimeSheetData[len].data.End_Time=endTime;
              TimeSheetData=obj.checkConflictsAndOverrideTimeLine(TimeSheetData,startIndex,endIndex,"flxSelectedTime"+Id);
              var time=startTime+"-"+endTime;
              obj.createTemplate(Id,startPosition,width,time,TimeSheetData[len].data.isBillable);
              kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn=false;
              kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = false;
              kony.apps.coe.Reusable.TimelineCreationTab.id=++Id;
            }  
         if(flexId!==undefined&&flexId!==null){
                frmName[flexId].skin="sknFlxMobBg1C7393Op80";
                kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 1;
                kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline=flexId;
                kony.apps.coe.Reusable.TimelineCreationTab.selectedFlexName=flexId;
                kony.apps.coe.Reusable.TimelineCreationTab.selectTimelineTaskCallback(TimeSheetData[len].data,TimeSheetData);
                } 
         kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData=TimeSheetData;
         this.changeFixedIndex(startIndex,endIndex,1);
         kony.apps.coe.Reusable.TimelineCreationTab.isTimeLineEmpty=false;
         frmName.timeLineScrollFlex.enableScrolling=true;  
         frmName.flexSlider.isVisible=false;
         kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty=true;
         (new kony.apps.coe.Reusable.TimelineCreationTab()).animateSlider(XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length-1][0],155);
         kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTimeTab();

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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.createTemplate = function (id, left, width, startAndEndTime,isBillabe) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
	var obj = new kony.apps.coe.Reusable.TimelineCreationTab();
    var skin;
    if(isBillabe === true || String(isBillabe) === "1"){
      skin = "sknFlxMobBg2D86E2";
    }else{
      skin = "sknMobFlx8C98A2Op100";
    }
	var flxSelectedTime = new kony.ui.FlexContainer({
			"id" : "flxSelectedTime" + id,
			"skin" : skin,
			"top" : "45%",
			"left" : left + "dp",
			"width" : (width - 2) + "dp",
			"height" : "50%",
			"zIndex" : 7,
			"isVisible" : true,
			"clipbounds" : true,
			"onClick" : function () {
				obj.changeSkin(this);
			},
			"layoutType" : kony.flex.FREE_FORM
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false
		}, {});
    
	var lblSelectedTaskName = new kony.ui.Label({
			id : "lblSelectedTaskName" + id,
			skin : "sknLblMobFCFFFFFFFS71",
			"top" : "0%",
			"left" : "0%",
			"width" : "100%",
			"height" : "50%",
			"zIndex" : 7,
			"text" : kony.apps.coe.Reusable.TimelineCreationTab.taskName,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
	var lblSelectedTime = new kony.ui.Label({
			id : "lblSelectedTime" + id,
			skin : "sknLblMobFCFFFFFFFS71",
			"left" : "0%",
			"top" : "50%",
			"width" : "100%",
			"height" : "50%",
			"zIndex" : 7,
			"text" : startAndEndTime,
			"isVisible" : true
		}, {
			"padding" : [0, 0, 0, 0],
			"marginInPixel" : false,
			"paddingInPixel" : false,
			"contentAlignment" : constants.CONTENT_ALIGN_CENTER
		}, {});
	frmName.timeLineScrollFlex.add(flxSelectedTime);
	flxSelectedTime.add(lblSelectedTaskName);
	flxSelectedTime.add(lblSelectedTime);
	frmName["flxSelectedTime" + id].setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
		fingers : 1,
		taps : 2
	}, this.tapToEditFixedTask.bind(this));
    frmName.flexSlider.isVisible=false;
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.tapToEditFixedTask = function (commonWidget, gestureInfo, context) {
	
  if (kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag === 1&&kony.apps.coe.Reusable.TimelineCreationTab.selectedFlexName===commonWidget.id) {
  		kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = true;
		kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn = true;
		kony.apps.coe.Reusable.TimelineCreationTab.editingFlexName = commonWidget.id;
        var timeSheetData=kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData;
		var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
		var startIndex = this.searchTab(parseInt(commonWidget.frame.x, 10), kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine);
		var endIndex = this.searchTab(parseInt(commonWidget.frame.width, 10) + 2 + parseInt(commonWidget.frame.x, 10), kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine);
		this.changeFixedIndex(startIndex, endIndex, 0);
		var width = commonWidget.frame.width + "dp";
		var left = commonWidget.frame.x + "dp";
		frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
        var selectedItem=timeSheetData.filter(function(v){ return v["flexName"] == commonWidget.id; });
        if(selectedItem[0].data.isBillable === true || String(selectedItem[0].data.isBillable) === "1"){
           frmName.flexSlider.lblLeftPinTouchableArea.skin = "sknLblPin2D86E2";
           frmName.flexSlider.lblRightPinTouchableArea.skin = "sknLblPin2D86E2";
           frmName.flexSlider.lblTaskName.skin = "sknLblPin2D86E2";
        } else{
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
        kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty=false;
		//#ifdef android
		(new kony.apps.coe.Reusable.TimelineCreationTab()).animateSlider(parseInt(left, 10), parseInt(width, 10));
		//#endif
		
        kony.apps.coe.Reusable.TimelineCreationTab.editTimelineTaskCallback(selectedItem[0].data);
        kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName(selectedItem[0].taskName);
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

kony.apps.coe.Reusable.TimelineCreationTab.prototype.replacingConflictsRight=function(TimeSheetData,startIndex)
{
      var count=0,startTime,endTime;
      var frmName=kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
      var XCoordinatesOfTimeLine=kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
      var obj=new kony.apps.coe.Reusable.TimelineCreationTab();
      var length=TimeSheetData.length;
      for(var loop=0;loop<length;loop++)
        {
          if(TimeSheetData[loop]!==null&&TimeSheetData[loop].flexName!==""&&TimeSheetData[loop].endIndex!==0){
              if(TimeSheetData[loop].startIndex>startIndex&&loop-1>=0){
                 if(TimeSheetData[loop].startIndex<TimeSheetData[loop-1].endIndex){
                        var flexId=TimeSheetData[loop].flexName;
                        var id=flexId.split("flxSelectedTime");
                        count=TimeSheetData[loop].endIndex-TimeSheetData[loop].startIndex ;
                        TimeSheetData[loop].startIndex=TimeSheetData[loop-1].endIndex;
                        TimeSheetData[loop].endIndex=TimeSheetData[loop].startIndex+count;
                        if((TimeSheetData[loop].startIndex>92)){
                             TimeSheetData[loop]=(new kony.apps.coe.Reusable.TimelineCreationTab()).removeConflictedTime(TimeSheetData[loop],flexId);
                        }
                        else if((TimeSheetData[loop].startIndex<92)&&(TimeSheetData[loop].endIndex>92)){
                             startTime=XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][1];
                             endTime=XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length-1][1];
                             frmName[flexId].left=XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0]+"dp";
                             frmName[flexId].width=(XCoordinatesOfTimeLine[XCoordinatesOfTimeLine.length-1][0]-XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0])+"dp";
                             frmName[flexId]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime;
                             TimeSheetData[loop].startTime=startTime;
                             TimeSheetData[loop].endTime=endTime;
                             TimeSheetData[loop].data.Start_Time=startTime;
                             TimeSheetData[loop].data.End_Time=endTime;
                             if(TimeSheetData[loop].data.Time_Line_Status===null||TimeSheetData[loop].data.Time_Line_Status===""){
                               TimeSheetData[loop].data.Time_Line_Status="modified";
                             }
                        }
                        else {
                             startTime=XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][1];
                             endTime=XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][1];
                             frmName[flexId].left=XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0]+"dp";
                             frmName[flexId]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime;
                             TimeSheetData[loop].startTime=startTime;
                             TimeSheetData[loop].endTime=endTime;
                             TimeSheetData[loop].data.Start_Time=startTime;
                             TimeSheetData[loop].data.End_Time=endTime;
                             if(TimeSheetData[loop].data.Time_Line_Status===null||TimeSheetData[loop].data.Time_Line_Status===""){
                               TimeSheetData[loop].data.Time_Line_Status="modified";
                             }
                        }
                  }
               }   
           }
        }
     frmName.forceLayout();
     TimeSheetData=obj.removeEmptyDataInTimeSheetData(TimeSheetData);
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

kony.apps.coe.Reusable.TimelineCreationTab.prototype.replacingConflictsLeft=function(TimeSheetData,endIndex)
{
      var count=0,startTime,endTime;
      var frmName=kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
      var XCoordinatesOfTimeLine=kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
      var obj=new kony.apps.coe.Reusable.TimelineCreationTab();
      for(var loop=TimeSheetData.length-1;loop>=0;loop--)
        {
          if(TimeSheetData[loop]!==undefined&&(TimeSheetData[loop].endIndex!==0)&&TimeSheetData[loop].flexName!==""){
              if(TimeSheetData[loop].endIndex<endIndex&&loop+1<TimeSheetData.length){
                   if(TimeSheetData[loop].endIndex>TimeSheetData[loop+1].startIndex)
                   {
                       var flexId=TimeSheetData[loop].flexName;
                       var id=flexId.split("flxSelectedTime");
                       count=TimeSheetData[loop].endIndex-TimeSheetData[loop].startIndex ;
                       TimeSheetData[loop].endIndex=TimeSheetData[loop+1].startIndex;
                       TimeSheetData[loop].startIndex=TimeSheetData[loop].endIndex-count;
                       if((TimeSheetData[loop].endIndex<3&&TimeSheetData[loop].startIndex<0)){
                          TimeSheetData[loop]=(new kony.apps.coe.Reusable.TimelineCreationTab()).removeConflictedTime(TimeSheetData[loop],flexId);
                       }
                       else if((TimeSheetData[loop].startIndex<0)&&(TimeSheetData[loop].endIndex>0)) {
                           startTime=XCoordinatesOfTimeLine[1][1];
                           endTime=XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][1];
                           frmName[flexId].width=XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][0]-XCoordinatesOfTimeLine[1][0]-2;
                           frmName[flexId]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime;
                           TimeSheetData[loop].startTime=startTime;
                           TimeSheetData[loop].endTime=endTime;
                           TimeSheetData[loop].data.Start_Time=startTime;
                           TimeSheetData[loop].data.End_Time=endTime;
                           if(TimeSheetData[loop].data.Time_Line_Status===null||TimeSheetData[loop].data.Time_Line_Status===""){
                               TimeSheetData[loop].data.Time_Line_Status="modified";
                             }
                       }
                       else{
                           startTime=XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][1];
                           endTime=XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][1];
                           frmName[flexId].left=XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0]+"dp";
                           frmName[flexId].width=(XCoordinatesOfTimeLine[TimeSheetData[loop].endIndex][0]-XCoordinatesOfTimeLine[TimeSheetData[loop].startIndex][0]-2)+"dp";
                           frmName[flexId]["lblSelectedTime"+id[1]].text=startTime+"-"+endTime;
                           TimeSheetData[loop].startTime=startTime;
                           TimeSheetData[loop].endTime=endTime;
                           TimeSheetData[loop].data.Start_Time=startTime;
                           TimeSheetData[loop].data.End_Time=endTime;
                           if(TimeSheetData[loop].data.Time_Line_Status===null||TimeSheetData[loop].data.Time_Line_Status===""){
                               TimeSheetData[loop].data.Time_Line_Status="modified";
                             }
                       }
                   }
               }   
           }
        }
     frmName.forceLayout();
     TimeSheetData=obj.removeEmptyDataInTimeSheetData(TimeSheetData);
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.removeConflictedTime = function (TimeSheetData, flexId) {
	var idIndex = flexId.split("flxSelectedTime")[1];
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
    var length=kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine.length;
    if(TimeSheetData.flexName!==undefined){
	frmName.timeLineScrollFlex.remove(frmName.timeLineScrollFlex["lblSelectedTaskName" + idIndex]);
	frmName.timeLineScrollFlex.remove(frmName.timeLineScrollFlex["lblSelectedTime" + idIndex]);
	frmName.timeLineScrollFlex.remove(frmName.timeLineScrollFlex[flexId]);
    if(TimeSheetData.startIndex>=0&&TimeSheetData.endIndex<length){
    (new kony.apps.coe.Reusable.TimelineCreationTab()).changeFixedIndex(TimeSheetData.startIndex,TimeSheetData.endIndex,0);
    }
    if((TimeSheetData.data.Time_Entry_Id!==undefined&& TimeSheetData.data.Time_Entry_Id !== null)){
     TimeSheetData.data.Time_Line_Status="deleted";
     TimeSheetData.flexName="";
     TimeSheetData.endIndex=0; 
     }
    else
      {
	  TimeSheetData = {
		"startIndex" : 0,
		"endIndex" : 0,
		"flexName" : "",
		"startTime" : "",
		"endTime" : "",
		"taskName" : "",
		"data" : {}
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.changeSkin = function (flexdata) {
	var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
    var id=flexdata.id;
    var timeSheetData=kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData;
    if(kony.apps.coe.Reusable.TimelineCreationTab.editingFixedTaskModeOn){
      return ;
    }
	if (frmName[id].skin === "sknMobFlx8C98A2Op100" || frmName[id].skin === "sknFlxMobBg2D86E2") {
        kony.apps.coe.Reusable.TimelineCreationTab.selectedFlexName=id;
		kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 1;
		frmName[id].skin = "sknFlxMobBg1C7393Op80";
        if(kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline!==null&&kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline!==undefined&&kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline!==id)
        {
          var prevId = kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline;
          var selecteddata = timeSheetData.filter(function(v){ return v["flexName"] == prevId; });
          var skin;
          if(selecteddata[0].data.isBillabe === true || String(selecteddata[0].data.isBillable) === "1"){
            skin = "sknFlxMobBg2D86E2";
          }else{
            skin = "sknMobFlx8C98A2Op100";
          }
          frmName[prevId].skin=skin;
        }
       var selectedItem=timeSheetData.filter(function(v){ return v["flexName"] == id; });
       kony.apps.coe.Reusable.TimelineCreationTab.selectTimelineTaskCallback(selectedItem[0].data);
	} else if (frmName[id].skin === "sknMobFlx1c7393Op30") {
// 		frmName[id].skin = "sknFlxMobBg1C7393Op80";
// 		kony.apps.coe.Reusable.TimelineCreationTab.deleteFlag = 0;
//         kony.apps.coe.Reusable.TimelineCreationTab.deselectTimelineTaskCallback();
	}
    frmName.flexSlider.isVisible=false;
    kony.apps.coe.Reusable.TimelineCreationTab.previousTimeline=id;
};
/**
 * @class          TimelineCreation
 * @type           prototype function
 * @param          {Array}-timeSheetData
 * @return         filteredArray
 * @description    This method removes deleted task from the array.
 */
kony.apps.coe.Reusable.TimelineCreationTab.prototype.removeEmptyDataInTimeSheetData = function (timeSheetData) {
	var filteredArray = [];
	if (timeSheetData.length !== undefined) {
		for (var loop = 0; loop < timeSheetData.length; loop++) {
			if (timeSheetData[loop] !== null &&((timeSheetData[loop].data.Time_Entry_Id!==undefined&& timeSheetData[loop].data.Time_Entry_Id !== null)||timeSheetData[loop].data.Time_Line_Status==="added")) {
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
kony.apps.coe.Reusable.TimelineCreationTab.prototype.fillFullDayTab = function (selectedItem,startTime, endTime) {
	if (kony.apps.coe.Reusable.TimelineCreationTab.isTimeLineEmpty === true||kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData.length<=0) {
		var TimeSheetData = [];
		var obj = new kony.apps.coe.Reusable.TimelineCreationTab();
		var coordinates = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
		var startIndex = coordinates.map(function (el) {
				return el[1];
			}).indexOf(startTime);
		var endIndex = coordinates.map(function (el) {
				return el[1];
			}).indexOf(endTime);
		var width = coordinates[endIndex][0] - coordinates[startIndex][0];
		var startAndEndTime = coordinates[startIndex][1] + "-" + coordinates[endIndex][1];
		var id = kony.apps.coe.Reusable.TimelineCreationTab.id;
		var frmName=kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
        frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
        (new kony.apps.coe.Reusable.TimelineCreationTab()).animateSlider(coordinates[startIndex][0], width);
        frmName.flexSlider.isVisible=true;
		TimeSheetData[id] = {
			"startIndex" : startIndex,
			"endIndex" : endIndex,
			"flexName" : "flxSelectedTime" + id,
			"startTime" : coordinates[startIndex][1],
			"endTime" : coordinates[endIndex][1],
			"taskName" : kony.apps.coe.Reusable.TimelineCreationTab.taskName,
			"data" : {}

		};
		kony.apps.coe.Reusable.TimelineCreationTab.id = ++id;
		kony.apps.coe.Reusable.TimelineCreationTab.isTimeLineEmpty = false;
		kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = false;
	}
};
kony.apps.coe.Reusable.TimelineCreationTab.onClickOfHoursTab=function()
{
    var frmName=kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
    kony.apps.coe.Reusable.TimelineCreationTab.revertSlider();

};
kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName=function(task_name)
{
  try{
    var frmName=kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
    frmName.flexSlider.lblTaskName.text=task_name;
    kony.apps.coe.Reusable.TimelineCreationTab.taskName=task_name;
  }
  catch(e){
    handleCustomAlert("Please select any day.");
  }
};

kony.apps.coe.Reusable.TimelineCreationTab.updateTaskNameTab=function(task_name)
{
   // var frmName=kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
   // frmTimeSheetCreateTab.flexSlider.lblTaskName.text=task_name;
    kony.apps.coe.Reusable.TimelineCreationTab.taskName=task_name;
};

kony.apps.coe.Reusable.TimelineCreationTab.setDefaultSlider = function(startTime,endTime){
        var sliderObj = new kony.apps.coe.Reusable.TimelineCreationTab();
	    var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
		var coordinates = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
		var startIndex = coordinates.map(function (el) {
				return el[1];
			}).indexOf(startTime);
		var endIndex = coordinates.map(function (el) {
				return el[1];
			}).indexOf(endTime);
		var width = coordinates[endIndex][0] - coordinates[startIndex][0];
        var left = coordinates[startIndex][0];
        kony.apps.coe.ess.globalVariables.sliderLeftValue = coordinates[startIndex][0];
        frmName.flexSliderTask.width = (parseInt(width, 10) - 50) + "dp";
        sliderObj.animateSlider(left,width);
        kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName("");
        
};