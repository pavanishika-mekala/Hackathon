/** 
 *  @author     Shantam Agarwal
 *  @category   UI/UX	
 *  @desc       Contains UI related code for frmApplyLeaveDW on DesktopWeb
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmApplyLeaveDW = kony.apps.coe.ess.myLeave.frmApplyLeaveDW || {};
//User Leave data to check existing leaves from
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.leaveData = [];
//Setting Manager name here
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.managerName = "";
/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    This method is used to initialize UI for frmLeaveDashboard on desktopWeb.
 * 				   Also currently holds dummy data. Will Remove later.
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.initializeUI = function(leaveTypeData, leaveData, leaveDataToModify){
    frmApplyLeaveDW.destroy();
  	kony.apps.coe.ess.myLeave.frmApplyLeaveDW.populateScroller(leaveTypeData);
  	kony.apps.coe.ess.myLeave.frmApplyLeaveDW.generateRecurringDates();
    frmApplyLeaveDW.lblApproverName.text = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.managerName;
    //generate slider
    if(typeof frmApplyLeaveDW.timeLineScrollFlex === 'undefined'){
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
        if (oldestTaskHour == 24) {
            kony.apps.coe.Reusable.TimelineCreationDW.initialScrollHour = "9 AM";
        } else {
            kony.apps.coe.Reusable.TimelineCreationDW.initialScrollHour = convertHoursMinutesForTimeline(oldestTaskHour, 0);
        }
        frmApplyLeaveDW.flxTimeSliderContainer.removeAll();
        var slider = new kony.apps.coe.Reusable.TimelineCreationDW();
        slider.drawSliderUIDW(frmApplyLeaveDW.flxTimeSliderContainer, 12, 12);
        slider.storeCoordinatesOfTimeLineDW();
        frmApplyLeaveDW.timeLineScrollFlex.enableScrolling = true;
        frmApplyLeaveDW.timeLineScrollFlex.horizontalScrollIndicator = false;
        frmApplyLeaveDW.timeLineScrollFlex.scrollDirection = 2;
        var context1={"widget":frmApplyLeaveDW.flxDatePickerFrom,"anchor":"bottom"};       
        frmApplyLeaveDW.calFromDateFilter.setContext(context1);
        var context2={"widget":frmApplyLeaveDW.flxDatePickerTo,"anchor":"bottom"};       
        frmApplyLeaveDW.calToDateFilter.setContext(context2);
    }
    
    //end slider generation
    if(leaveDataToModify){
        var dataObject = new kony.apps.coe.ess.myLeave.frmApplyLeaveDW.dataController(leaveTypeData, leaveData,leaveDataToModify);
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.setActions(dataObject,leaveTypeData,leaveDataToModify);
    }else{
        var dataObject = new kony.apps.coe.ess.myLeave.frmApplyLeaveDW.dataController(leaveTypeData, leaveData);
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.setActions(dataObject,leaveTypeData);
        var currDate = new Date();
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.changeCalendarDates(currDate, currDate);
    }
}

kony.apps.coe.ess.myLeave.frmApplyLeaveDW.changeCalendarDates = function(fromDate, toDate){
    frmApplyLeaveDW.calFromDateFilter.dateComponents = [fromDate.getDate().toString(), (fromDate.getMonth()+1).toString(), fromDate.getFullYear().toString()];
    frmApplyLeaveDW.calToDateFilter.dateComponents = [toDate.getDate().toString(), (toDate.getMonth()+1).toString(), toDate.getFullYear().toString()];
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Populate leave type scroller with data from backend
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.populateScroller = function(leaveTypeData){
  	var numberOfLeaveTypes = leaveTypeData.length;
  	for(var i = 0; i<numberOfLeaveTypes; i++){
      	var basicconfig_Main = {
          "id": "flxLeaveType"+i,
          "top": "0%",
          "left": "10dp",
          "width": "100dp",
          "height": "35dp",
          "centerY": "50%",
          "zIndex": 1,
          "skin": "sknFlxBor1pxE6E6E6R2pxShadowDW",
          "isVisible": true,
    	};
  		var lblBasic = {
          "id" : "lblLeaveType"+i,
          "centerY" : "50%",
      	  "centerX" : "50%",
          "zIndex" : 1,
          "isVisible" : true,
          "skin" : "sknLbl77777712pxRomanDW",
          "text" : leaveTypeData[i].name
		};
      var labelLeaveType1 = new kony.ui.Label(lblBasic, {}, {});
      var leaveType1 = new kony.ui.FlexContainer(basicconfig_Main, {}, {});
      leaveType1.add(labelLeaveType1);
      if(typeof frmApplyLeaveDW['flxLeaveType'+i] === 'undefined'){
          frmApplyLeaveDW.flxLeaveTypeScroller.add(leaveType1);
      }else{
          frmApplyLeaveDW.flxLeaveTypeScroller.remove(frmApplyLeaveDW['flxLeaveType'+i]);
          frmApplyLeaveDW.flxLeaveTypeScroller.add(leaveType1);
      }
      
    }	
};

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    on Click action of leave type list
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.onClickLeaveType = function(num, totalLeaveTypes){
    for(var i=0; i<totalLeaveTypes; i++){
        frmApplyLeaveDW['flxLeaveType'+i].skin = "sknFlxBor1pxE6E6E6R2pxShadowDW";
        frmApplyLeaveDW['lblLeaveType'+i].skin = "sknLbl77777712pxRomanDW";
    }
    frmApplyLeaveDW['flxLeaveType'+num].skin = "sknFlx2ebaeeBor1pxR2pxDW";
    frmApplyLeaveDW['lblLeaveType'+num].skin = "sknLbLffffff12pxRomanDW";

}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Scrolls the leave type selection scroller right
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.leaveTypeRightScroll = function(){
  	var currLeft = frmApplyLeaveDW.flxLeaveTypeScroller.left;
	var newLeft = (parseFloat(currLeft.slice(0,-2)) - 200).toString() + "dp";
  	frmApplyLeaveDW.flxLeaveTypeScroller.animate(
        kony.ui.createAnimation({
            "100": {
                "left": newLeft,
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": kony.print("---------Animated Scroller")
        });
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Scrolls the leave type selection scroller left
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.leaveTypeLeftScroll = function(){
  	var currLeft = frmApplyLeaveDW.flxLeaveTypeScroller.left;
	var newLeft = (parseFloat(currLeft.slice(0,-2)) + 200).toString() + "dp";
  	frmApplyLeaveDW.flxLeaveTypeScroller.animate(
        kony.ui.createAnimation({
            "100": {
                "left": newLeft,
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": kony.print("---------Animated Scroller")
        });
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    generates the date selectors for recurring leaves
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.generateRecurringDates = function(){
    if(frmApplyLeaveDW["1flxRecurringDates1"] !== null && frmApplyLeaveDW["1flxRecurringDates1"] !== undefined && typeof(frmApplyLeaveDW["1flxRecurringDates1"]) !== "undefined"){
        return;
    }
    for(var i = 1; i<30; i++){
        var datePrefix = (i+1).toString();
        var newDateFlex = frmApplyLeaveDW.flxRecurringDates1.clone(datePrefix);
        var flexName = datePrefix + "flxRecurringDates1";
        var lblName = datePrefix + "lblRecurringDate1";
        newDateFlex.onClick = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdaySelectionOnclick;
        if(i<10){
            //generate in top row
            frmApplyLeaveDW.flxRecurringDatesTopRow.add(newDateFlex);
        }
        else if(i>=10 && i<20){
            //generate in mid row
            frmApplyLeaveDW.flxRecurringDatesMiddleRow.add(newDateFlex);
        }
        else if(i>=20){
            //generate in bottom row
            frmApplyLeaveDW.flxRecurringDatesBottomRow.add(newDateFlex);
        }
        frmApplyLeaveDW[lblName].text = datePrefix;
    }
    // frmApplyLeaveDW.remove(frmApplyLeaveDW.flxRecurringDates1);
    frmApplyLeaveDW.flxRecurringDates1.onClick = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdaySelectionOnclick;
    frmApplyLeaveDW.forceLayout();
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Scrolls the leave type selection scroller right
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.timeSliderRightScroll = function(){
  if(frmApplyLeaveDW.timeLineScrollFlex.contentOffset === undefined){
    var xCoord = 0;
  }else{
    var xCoord = parseInt(frmApplyLeaveDW.timeLineScrollFlex.contentOffset.x);
  }
  var updatedX = xCoord + 200;
  frmApplyLeaveDW.timeLineScrollFlex.setContentOffset({x:updatedX+"dp"},true);
  frmApplyLeaveDW.timeLineScrollFlex.contentOffset = {x:updatedX+"dp"};
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Scrolls the leave type selection scroller left
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.timeSliderLeftScroll = function(){
  if(frmApplyLeaveDW.timeLineScrollFlex.contentOffset === undefined){
    var xCoord = 0;
  }else{
    var xCoord = parseInt(frmApplyLeaveDW.timeLineScrollFlex.contentOffset.x);
  }
  var updatedX = xCoord - 200;
  frmApplyLeaveDW.timeLineScrollFlex.setContentOffset({x:updatedX+"dp"},true);
  frmApplyLeaveDW.timeLineScrollFlex.contentOffset = {x:updatedX+"dp"};
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Adds an attachment from gallery
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.addAttachment = function(dataObject){
    var queryContext = {
            mimetype: "image/jpeg"
    };
    kony.phone.openMediaGallery(kony.apps.coe.ess.myLeave.frmApplyLeaveDW.showAttachmentInThumbnail.bind(this,dataObject), queryContext);
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Show attachment thumbnail in form
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.showAttachmentInThumbnail = function(dataObject, rawBytes,permStatus){
    if(rawBytes != null){
    //kony.convertToBase64 API not available for DW    
    frmApplyLeaveDW.flxAttachments.setVisibility(true);
    frmApplyLeaveDW.flxNoAttachments.setVisibility(false);
    frmApplyLeaveDW.imgAttachmentScreenshot.base64 =window.btoa(rawBytes);
    dataObject.leaveAttachmentData[0] = {"base64": frmApplyLeaveDW.imgAttachmentScreenshot.base64};
    frmApplyLeaveDW.flxAttachmentScreenshot.setVisibility(true);
    frmApplyLeaveDW.forceLayout();
    }
    else if(permStatus == kony.application.PERMISSION_DENIED){
        alert("Permission Denied to Access the Photo Gallery");
    }

}
/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Weekday selection onclick event
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.recurringTypeSelector = function(typeName){
    if(typeName === "Weekly"){
        frmApplyLeaveDW.flxEveryWeek.skin = "sknFlxBG2ebaeeLeftRoundedDW";
        frmApplyLeaveDW.flxEveryTwoWeek.skin = "sknFlxBorBottomTop2ebaee1pxDW";
        frmApplyLeaveDW.flxEveryMonth.skin = "sknFlxBor2ebaeeRightRoundedDW";
        frmApplyLeaveDW.lblEveryWeek.skin = "sknLbLffffff12pxRomanDW";
        frmApplyLeaveDW.lblEveryTwoWeeks.skin = "sknLbl2ebaee12pxRomanDW";
        frmApplyLeaveDW.lblEveryMonth.skin = "sknLbl2ebaee12pxRomanDW";
        frmApplyLeaveDW.flxRecurringDays.setVisibility(true);
        frmApplyLeaveDW.flxDateSelector.setVisibility(false);
    }else if(typeName === "Bi-Weekly"){
        frmApplyLeaveDW.flxEveryWeek.skin = "sknFlxBor2ebaeeLeftRoundedDW";
        frmApplyLeaveDW.flxEveryTwoWeek.skin = "sknFlxBGBottomTop2ebaee1pxDW";
        frmApplyLeaveDW.flxEveryMonth.skin = "sknFlxBor2ebaeeRightRoundedDW";
        frmApplyLeaveDW.lblEveryWeek.skin = "sknLbl2ebaee12pxRomanDW";
        frmApplyLeaveDW.lblEveryTwoWeeks.skin = "sknLbLffffff12pxRomanDW";
        frmApplyLeaveDW.lblEveryMonth.skin = "sknLbl2ebaee12pxRomanDW";
        frmApplyLeaveDW.flxRecurringDays.setVisibility(true);
        frmApplyLeaveDW.flxDateSelector.setVisibility(false);
    }
    else if(typeName === "Monthly"){
        frmApplyLeaveDW.flxEveryWeek.skin = "sknFlxBor2ebaeeLeftRoundedDW";
        frmApplyLeaveDW.flxEveryTwoWeek.skin = "sknFlxBorBottomTop2ebaee1pxDW";
        frmApplyLeaveDW.flxEveryMonth.skin = "sknFlxBG2ebaeeRightRoundedDW";
        frmApplyLeaveDW.lblEveryWeek.skin = "sknLbl2ebaee12pxRomanDW";
        frmApplyLeaveDW.lblEveryTwoWeeks.skin = "sknLbl2ebaee12pxRomanDW";
        frmApplyLeaveDW.lblEveryMonth.skin = "sknLbLffffff12pxRomanDW";
        frmApplyLeaveDW.flxRecurringDays.setVisibility(false);
        frmApplyLeaveDW.flxDateSelector.setVisibility(true);
    }
    frmApplyLeaveDW.forceLayout();
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Weekday selection onclick event
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdaySelectionOnclick = function(dataObject,widgetRef){
    widgetRef.skin = "sknFlx2ebaeeCircularDW";
    frmApplyLeaveDW[widgetRef.children[0]].skin = "sknLbLffffff12pxRomanDW";
    if(frmApplyLeaveDW.flxEveryWeek.skin === "sknFlxBG2ebaeeLeftRoundedDW"){
        dataObject.calculateWeeklyLeave();
    }else if(frmApplyLeaveDW.flxEveryTwoWeek.skin === "sknFlxBGBottomTop2ebaee1pxDW"){
        dataObject.calculateBiWeeklyLeave();
    }else if(frmApplyLeaveDW.flxEveryMonth.skin === "sknFlxBG2ebaeeRightRoundedDW"){
        dataObject.calculateMonthlyLeave();
    }
    widgetRef.onClick = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdayDeselectionOnclick.bind(widgetRef, dataObject);
    frmApplyLeaveDW.forceLayout();
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Weekday selection onclick event
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdayDeselectionOnclick = function(dataObject,widgetRef){
    widgetRef.skin = "slFbox";
    frmApplyLeaveDW[widgetRef.children[0]].skin = "sknLbl00000012pxRomanDW";
    if(frmApplyLeaveDW.flxEveryWeek.skin === "sknFlxBG2ebaeeLeftRoundedDW"){
        dataObject.calculateWeeklyLeave();
    }else if(frmApplyLeaveDW.flxEveryTwoWeek.skin === "sknFlxBGBottomTop2ebaee1pxDW"){
        dataObject.calculateBiWeeklyLeave();
    }else if(frmApplyLeaveDW.flxEveryMonth.skin === "sknFlxBG2ebaeeRightRoundedDW"){
        dataObject.calculateMonthlyLeave();
    }
    widgetRef.onClick = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdaySelectionOnclick.bind(widgetRef, dataObject);
    frmApplyLeaveDW.forceLayout();
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Submits the leave request
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.submitRequest = function(){
    var fromDate = frmApplyLeaveDW.calFromDateFilter.Date;
    var toDate = frmApplyLeaveDW.calToDateFilter.Date;
    var timeObj = kony.apps.coe.Reusable.TimelineCreationDW.fetchSliderTime();
    var comment = frmApplyLeaveDW.txtAreaComments.text;
    kony.apps.coe.ess.myLeave.leaveData[kony.apps.coe.ess.myLeave.leaveData.length - 1]['timeObj'] = timeObj;
    kony.apps.coe.ess.myLeave.leaveData[kony.apps.coe.ess.myLeave.leaveData.length - 1]['comment'] = comment;
    kony.apps.coe.ess.myLeave.leaveData[kony.apps.coe.ess.myLeave.leaveData.length - 1]['toDate'] = toDate;
    kony.apps.coe.ess.myLeave.leaveData[kony.apps.coe.ess.myLeave.leaveData.length - 1]['fromDate'] = fromDate;
    kony.apps.coe.ess.myLeave.leaveData[kony.apps.coe.ess.myLeave.leaveData.length - 1]['submitDate'] = new Date();
    frmLeaveDashboard.show();
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    onClick action for the full day switch. Makes the timeline invisible
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.fullDayOnClick = function(){
    frmApplyLeaveDW.flxSliderScrollParent.setVisibility(false);
    frmApplyLeaveDW.lblHoursDuration.setVisibility(false);
    frmApplyLeaveDW.lblTimeDuration.setVisibility(false);
    frmApplyLeaveDW.flxFullDayContainer.skin = "sknFlxBor2EBAEE1PxR100DW";
    frmApplyLeaveDW.flxHoursContainer.skin = "";
    frmApplyLeaveDW.lblFullDay.skin = "sknLbl2ebaee14pxRomanDW";
    frmApplyLeaveDW.lblHours.skin = "sknLbl52627014pxRomanDW";
    frmApplyLeaveDW.forceLayout();
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    onClick action for hours switch. Makes the timeline visible.
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.hoursOnClick = function(){
    frmApplyLeaveDW.flxSliderScrollParent.setVisibility(true);
    frmApplyLeaveDW.lblHoursDuration.setVisibility(true);
    frmApplyLeaveDW.lblTimeDuration.setVisibility(true);
    frmApplyLeaveDW.flxHoursContainer.skin = "sknFlxBor2EBAEE1PxR100DW";
    frmApplyLeaveDW.flxFullDayContainer.skin = "";
    frmApplyLeaveDW.lblHours.skin = "sknLbl2ebaee14pxRomanDW";
    frmApplyLeaveDW.lblFullDay.skin = "sknLbl52627014pxRomanDW";
    frmApplyLeaveDW.forceLayout();
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    populates fields for modification of request
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.navigationMode = function(leaveData){
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApplyLeaveDW");
    if(leaveData){
        //set leave data in global
        //populate page with leave data
        formController.loadDataAndShowForm(leaveData);
    }
    else{
        formController.loadDataAndShowForm();
    }
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    leaveType class to store and retrieve leave type ids
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.leaveType = function(leaveTypeData){
    this.leaveTypeData = leaveTypeData;
    this.getTypeId = function(leaveNameStr){
        for(var i=0; i<=leaveTypeData.length; i++){
            if(leaveTypeData[i].name === leaveNameStr){
                return leaveTypeData[i].id;
            }
        }
    }
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    DataController class to control all form data and store
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.dataController = function(leaveTypeDataArg, leaveDataArg, leaveDataToModifyArg){
    this.end_date;
    this.end_time;
    this.leave_type_id;
    this.no_of_hours;
    this.start_time;
    this.status_id = 7;
    this.reason_desc;
    this.TIMESTAMP;
    this.employee_id;
    this.recurrence_id;
    this.id;
    this.start_date;
    this.isLeaveFullDay = true;
    this.isRecurringLeave = false;
    this.no_of_days;
    this.leaveDataToModify;
    this.leaveTypeData = leaveTypeDataArg;
    this.leaveData = leaveDataArg;
    this.allLeaveDatesForRecurring = [];
    this.leaveAttachmentData = [];
    this.onClickSetLeaveType = function(num){
        this.leave_type_id = this.leaveTypeData[num].id;
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.onClickLeaveType(num, this.leaveTypeData.length);
    }
    this.setLeaveTypeDataForModification = function(leave_type_idArg){
        for(var i=0; i<this.leaveTypeData.length; i++){
            if(this.leaveTypeData[i].id === leave_type_idArg){
                this.onClickSetLeaveType(i);
            }
        }
    }
    if(leaveDataToModifyArg){
        this.leaveDataToModify = leaveDataToModifyArg
        this.start_date = leaveDataToModifyArg.start_date;
        this.end_date = leaveDataToModifyArg.end_date;
        this.setLeaveTypeDataForModification(leaveDataToModifyArg.leave_type_id);
        var startDateArr = Date.breakBackendDate(this.start_date);
        var endDateArr = Date.breakBackendDate(this.end_date);
        var startDateObj = new Date(parseInt(startDateArr[2]),parseInt(startDateArr[1])-1,parseInt(startDateArr[0]))
        var endDateObj = new Date(parseInt(endDateArr[2]),parseInt(endDateArr[1])-1,parseInt(endDateArr[0]))
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.changeCalendarDates(startDateObj,endDateObj);
    }
    
    this.setLeaveToFullDay = function(){
        this.isLeaveFullDay = true;
    }
    this.setLeaveToPartial = function(){
        this.isLeaveFullDay = false;
    }
    this.leaveTypeNotSelected = function(){
        frmApplyLeaveDW.flxMain.top = "120dp";
        frmApplyLeaveDW.flxErrorDisplay.setVisibility(true);
        frmApplyLeaveDW.lblErrorMessage.text = "There was an error below. You have not selected Leave Type."
        frmApplyLeaveDW.forceLayout();
    }
    this.closeError = function(){
        frmApplyLeaveDW.flxMain.top = "90dp";
        frmApplyLeaveDW.flxErrorDisplay.setVisibility(false);
        frmApplyLeaveDW.forceLayout();
    }
    this.getDatesSelected = function(){
        var selectedDates = [];
        for(var i=1 ; i<31 ; i++){
            if(i==1){
                var flexName = "flxRecurringDates1";
            }else{
                var flexName = i+"flxRecurringDates1";
            }
            if(frmApplyLeaveDW[flexName].skin !== "slFbox"){
                selectedDates.push(i);
            }
        }
        return selectedDates;
    }
    this.getDaysSelected = function(){
        var selectedDays = [];
        for(var i=0 ; i<7 ; i++){
            var currDay = Date.getDayFromNum[i];
            if(frmApplyLeaveDW["flx"+currDay].skin !== "slFbox"){
                selectedDays.push(currDay);
            }
        }
        return selectedDays;
    }
    this.showRecurringDates = function(){
        var dateToShow = "";
        if(this.allLeaveDatesForRecurring.length === 0){
            dateToShow = "-";
        }
        for(var i=0; i<this.allLeaveDatesForRecurring.length; i++){
            dateToShow = dateToShow + Date.breakBackendDate(this.allLeaveDatesForRecurring[i])[0] + " "+ Date.getMonthMapNumberToMonth[Date.breakBackendDate(this.allLeaveDatesForRecurring[i])[1]].slice(0,3)+ ". ";
            
        }
        frmApplyLeaveDW.lblAllSelectedDates.text = dateToShow;
        frmApplyLeaveDW.forceLayout();
    }
    this.calculateWeeklyLeave = function(){
        this.allLeaveDatesForRecurring = [];
        var selectedDays = this.getDaysSelected();
        if(selectedDays.length!==0){
            var startDate = frmApplyLeaveDW.calFromDateFilter.Date;
            var endDate = frmApplyLeaveDW.calToDateFilter.Date;
            var startDateObj = new Date(parseInt(startDate[2]), parseInt(startDate[1]) - 1, parseInt(startDate[0]));
            var endDateObj = new Date(parseInt(endDate[2]), parseInt(endDate[1]) - 1, parseInt(endDate[0]));
            for(var i = startDateObj; i<=endDateObj; i.setDate(i.getDate()+1)){
                for(var j=0; j<selectedDays.length; j++ ){
                    if(Date.getDayFromNum[i.getDay()] === selectedDays[j]){
                        this.allLeaveDatesForRecurring.push(i.toYYYYMMDD(''));
                    }
                }
            }
            this.showRecurringDates();
        }
    }
    this.calculateBiWeeklyLeave = function(){
        this.allLeaveDatesForRecurring = [];
        var selectedDays = this.getDaysSelected();
        var biweeklyFlag = false;
        if(selectedDays.length!==0){
            var startDate = frmApplyLeaveDW.calFromDateFilter.Date;
            var endDate = frmApplyLeaveDW.calToDateFilter.Date;
            var startDateObj = new Date(parseInt(startDate[2]), parseInt(startDate[1]) - 1, parseInt(startDate[0]));
            var endDateObj = new Date(parseInt(endDate[2]), parseInt(endDate[1]) - 1, parseInt(endDate[0]));
            var initDate = startDateObj;
            var dayCounter = 0;
            for(var i = startDateObj; i<=endDateObj; i.setDate(i.getDate()+1)){
                for(var j=0; j<selectedDays.length; j++ ){
                    if(Date.getDayFromNum[i.getDay()] === selectedDays[j] && biweeklyFlag === false){
                            this.allLeaveDatesForRecurring.push(i.toYYYYMMDD(''));                        
                    }
                }
                if(Date.getDayFromNum[i.getDay()] === "Saturday"){
                    if(biweeklyFlag=== false){
                        biweeklyFlag = true;
                    }else{
                        biweeklyFlag = false;
                    }
                }
            }
            this.showRecurringDates();
        }
    }
    this.calculateMonthlyLeave = function(){
        this.allLeaveDatesForRecurring = [];
        var selectedDates = this.getDatesSelected();
        if(selectedDates.length!==0){
            var startDate = frmApplyLeaveDW.calFromDateFilter.Date;
            var endDate = frmApplyLeaveDW.calToDateFilter.Date;
            var startDateObj = new Date(parseInt(startDate[2]), parseInt(startDate[1]) - 1, parseInt(startDate[0]));
            var endDateObj = new Date(parseInt(endDate[2]), parseInt(endDate[1]) - 1, parseInt(endDate[0]));
            for(var i=new Date(startDateObj); i<endDateObj; i.setDate(i.getDate()+1)){
                for(var j = 0 ; j<selectedDates.length; j++){
                    if(i.getDate() === selectedDates[j]){
                        this.allLeaveDatesForRecurring.push(i.toYYYYMMDD(''));
                    }
                }
            }
            this.showRecurringDates();
        }
    }
    this.submitRecurringLeave = function(){
        var recurring_id = "RECUR_V3_" + currentDate.getTime();
        this.recurrence_id = recurring_id;
        if(frmApplyLeaveDW.flxEveryWeek.skin === "sknFlxBG2ebaeeLeftRoundedDW"){
            this.submitWeeklyLeave();
        }else if(frmApplyLeaveDW.flxEveryTwoWeek.skin == "sknFlxBGBottomTop2ebaee1pxDW"){
            this.submitBiWeeklyLeave();
        }else if(frmApplyLeaveDW.flxEveryMonth.skin == "sknFlxBG2ebaeeRightRoundedDW"){
            this.submitMonthlyLeave();
        }
    }
    this.onClickSubmit = function(){
        this.closeError();
        
        var startDate = frmApplyLeaveDW.calFromDateFilter.Date;
        var endDate = frmApplyLeaveDW.calToDateFilter.Date;
        if(this.leave_type_id){
            if(frmApplyLeaveDW.flxRecurringLeaveActive.isVisible === true){
                var recurring_id = "RECUR_V3_" + currentDate.getTime();
                this.recurrence_id = recurring_id;
                this.isRecurringLeave = true;
                this.no_of_days = this.allLeaveDatesForRecurring.length;
                this.checkExistingLeave();
                return;
            }
            this.no_of_days = this.getDayDiff(startDate,endDate) + 1;
            this.start_date = startDate[2] + (startDate[1]>9 ? startDate[1].toString() : '0'+startDate[1]) + (startDate[0]>9 ? startDate[0].toString() : '0'+startDate[0]);
            this.end_date = endDate[2] + (endDate[1]>9 ? endDate[1].toString() : '0'+endDate[1]) + (endDate[0]>9 ? endDate[0].toString() : '0'+endDate[0]);
            this.checkExistingLeave();
        }else{
            this.leaveTypeNotSelected();
        }
    }
    this.checkExistingLeave = function(){
        if(this.isRecurringLeave){
            var existingLeaves = this.leaveData;
            for(var j=0; j<this.allLeaveDatesForRecurring.length; j++){
                for(var i=0; i<existingLeaves.length; i++){
                    var fromDate = Date.getDateObject(existingLeaves[i].start_date);
                    var toDate = Date.getDateObject(existingLeaves[i].end_date);
                    var applyingFromDate = Date.getDateObject(this.allLeaveDatesForRecurring[j]);
                    var applyingtoDate = Date.getDateObject(this.allLeaveDatesForRecurring[j]);
                    if(applyingFromDate>fromDate && applyingFromDate<toDate && existingLeaves[i].status_id != '3'){
                        this.leaveSlotUnavailable();
                        return;
                    }  
                }
                if(j == this.allLeaveDatesForRecurring.length - 1 ){
                        this.leaveSlotAvailable();
                }
            }
            return;   
        }
        if(this.leaveDataToModify){
            //ToDo: check if new leave data overlaps with existing
            this.leaveSlotAvailable();
        }
        else{
            var existingLeaves = this.leaveData;
            for(var i=0; i<existingLeaves.length; i++){
                var fromDate = Date.getDateObject(existingLeaves[i].start_date);
                var toDate = Date.getDateObject(existingLeaves[i].end_date);
                var applyingFromDate = Date.getDateObject(this.start_date);
                var applyingtoDate = Date.getDateObject(this.end_date);
                if(applyingFromDate>fromDate && applyingFromDate<toDate && existingLeaves[i].status_id != '3'){
                    this.leaveSlotUnavailable();
                    return;
                }
                if(i == existingLeaves.length - 1 ){
                    this.leaveSlotAvailable();
                }
            }
        } 
    }
    this.submitAttachment = function(leave_id){
        if(frmApplyLeaveDW.flxAttachments.isVisible){
            var imgBase64 = this.leaveAttachmentData[0].base64;
            var successCallback = function(res){
                kony.print(JSON.stringify(res));
            }
            var failureCallback = function(err){
                kony.print(JSON.stringify(err));
            }
            var insertionData = {
                "imgBase64": imgBase64,
                "seq":0,
                "leave_id": leave_id
            }
            var mediaObject =  new kony.apps.coe.ess.myLeave.media()
            mediaObject.updateBinaryContentDW(insertionData, successCallback, failureCallback);
        }else{
            kony.print("No Attachments");
        }
    }
    this.leaveSlotAvailable = function(){
        var dateTemp = new Date();
        if(this.isLeaveFullDay === true){
            this.start_time = "080000";
            this.end_time = "170000";
            this.no_of_hours = (9*this.no_of_days).toString();
        }else{
            var timeObj = kony.apps.coe.Reusable.TimelineCreationDW.fetchSliderTime();
            this.start_time = this.get24HourTime(timeObj.start);
            this.end_time = this.get24HourTime(timeObj.end);
            this.no_of_hours = (timeObj.duration*this.no_of_days).toString();
        }
        this.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
        if(this.leaveDataToModify){
            this.TIMESTAMP = this.leaveDataToModify.TIMESTAMP;
            this.id = this.leaveDataToModify.id;
            this.reason_desc = frmApplyLeaveDW.txtAreaComments.text;
            var subObject = this.getSubmissionObject();
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.apps.coe.ess.MVVM.partialUpdate("MYLEAVE", "leave", subObject,  this.submitNote.bind(this), function(err){
                kony.print("Error occurred while updating leave Request");
                kony.print(JSON.stringify(err));
                kony.application.dismissLoadingScreen();
            });
        }
        else{
            if(this.isRecurringLeave){
                for(var i =0 ;i<this.allLeaveDatesForRecurring.length; i++){
                    this.start_date = this.allLeaveDatesForRecurring[i];
                    this.end_date = this.allLeaveDatesForRecurring[i];
                    this.TIMESTAMP = dateTemp.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(dateTemp.getMonth() + 1) + "" + getTimeHourswithZero(dateTemp.getDate()) + "" + getTimeHourswithZero(dateTemp.getHours()) + "" + getTimeHourswithZero(dateTemp.getMinutes()) + "" + getTimeHourswithZero(dateTemp.getSeconds());
                    this.id = "MYLEAVE_V2_" + this.start_date + "_T_" + dateTemp.getMilliseconds();
                    this.reason_desc = frmApplyLeaveDW.txtAreaComments.text;
                    var subObject = this.getSubmissionObject();
                    kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                    if(i === this.allLeaveDatesForRecurring.length - 1){
                        this.isLastSubmission = true;
                    }
                    kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave", subObject,  this.submitNote.bind(this), function(err){
                        kony.print("Error occurred while submitting leave Request");
                        kony.print(JSON.stringify(err));
                        kony.application.dismissLoadingScreen();
                    });
                    // if(i === this.allLeaveDatesForRecurring.length - 1){
                    //     this.submitAttachment();
                        
                    // }
                }
            }
            else{
                this.TIMESTAMP = dateTemp.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(dateTemp.getMonth() + 1) + "" + getTimeHourswithZero(dateTemp.getDate()) + "" + getTimeHourswithZero(dateTemp.getHours()) + "" + getTimeHourswithZero(dateTemp.getMinutes()) + "" + getTimeHourswithZero(dateTemp.getSeconds());
                this.id = "MYLEAVE_V2_" + this.start_date + "_T_" + dateTemp.getMilliseconds();
                this.reason_desc = frmApplyLeaveDW.txtAreaComments.text;
                var subObject = this.getSubmissionObject();
                kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave", subObject,  this.submitNote.bind(this), function(err){
                    kony.print("Error occurred while submitting leave Request");
                    kony.print(JSON.stringify(err));
                    kony.application.dismissLoadingScreen();
                });
            }
            
        }       
    }
    this.leaveSlotUnavailable = function(){
        kony.print("Leave Slot unavailable");
        frmApplyLeaveDW.flxMain.top = "120dp";
        frmApplyLeaveDW.flxErrorDisplay.setVisibility(true);
        frmApplyLeaveDW.lblErrorMessage.text = "There was an error in date selection. You have already applied a leave in selected dates."
        frmApplyLeaveDW.lblDateDuration.text = Date.breakBackendDate(this.start_date)[0] + " " + (Date.getMonthMapNumberToMonth[this.start_date.slice(4,6)]) + " - " + Date.breakBackendDate(this.end_date)[0] + " " + (Date.getMonthMapNumberToMonth[this.end_date.slice(4,6)]);
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.showInvalidDatesPopup();
        frmApplyLeaveDW.forceLayout();

    }
    this.getDayDiff = function(startDate,endDate){
        var first = new Date(startDate[2],startDate[1], startDate[0]);
        var second = new Date(endDate[2],endDate[1], endDate[0]);
        return Math.round((second-first)/(1000*60*60*24));
    }
    this.get24HourTime = function(time){
        var splitTime = time.split(' ');
        var timeObj = splitTime[0];
        var modifier = splitTime[1];
        var hoursMinutesObj = timeObj.split('.');
        var hours = hoursMinutesObj[0];
        var minutes = hoursMinutesObj[1];
        if(hours === "12" ){
            hours = "00";
        }
        if(modifier === "PM"){
            hours = parseInt(hours)+12;
            hours = hours.toString();

        }
        if(typeof minutes === 'undefined')
            minutes = "00";
        hours = hours.length>1 ? hours : "0"+hours;
        return hours+minutes+"00";
    }
    this.submitNote = function(){
        var data = {};
        data['employee_id'] = this.employee_id;
        data['leave_id'] = this.id;
        data['comments'] = this.reason_desc;
        if (data.comments !== "" && data.comments !== undefined && data.comments !== null) {
            var date = new Date();
            var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
            data.createdts = timestamp;
            kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, function(res){
                kony.print("Note Submitted successfully");
                this.submitAttachment(this.id);
                if(this.isRecurringLeave && this.isLastSubmission){
                    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveDashboardDW");
                    formController.loadDataAndShowForm();
                }else if(this.isRecurringLeave === false){
                    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveDashboardDW");
                    formController.loadDataAndShowForm();
                }
                
            }.bind(this),function(err){
                kony.print("Note Submission unsuccessful");
                kony.application.dismissLoadingScreen();
            });
        }else{
            this.submitAttachment(this.id);
            if(this.isRecurringLeave && this.isLastSubmission){
                var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveDashboardDW");
                formController.loadDataAndShowForm();
            }else if(this.isRecurringLeave === false){
                var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveDashboardDW");
                formController.loadDataAndShowForm();
            } 
        }
    }
    this.getSubmissionObject = function(){
        var subObject = {};
        subObject['start_date'] = this.start_date;
        subObject['end_date'] = this.end_date;
        subObject['start_time'] = this.start_time;
        subObject['end_time'] = this.end_time;
        subObject['TIMESTAMP'] = this.TIMESTAMP;
        subObject['employee_id'] = this.employee_id;
        subObject['id'] = this.id;
        subObject['recurrence_id'] = this.recurrence_id;
        subObject['reason_desc']  = "";
        subObject['status_id'] = this.status_id;
        subObject['leave_type_id'] = this.leave_type_id;
        subObject['no_of_hours'] = this.no_of_hours;
        subObject['reason_desc'] = this.reason_desc;
        return subObject;
    }
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    Sets several actions throughout form
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.setActions = function(dataObject,leaveTypeData){
    //onClick action for Leave type
    frmApplyLeaveDW.flxConfirm.onClick = dataObject.onClickSubmit.bind(dataObject);
    for(var i=0; i<dataObject.leaveTypeData.length; i++){
        frmApplyLeaveDW["flxLeaveType"+i].onClick = dataObject.onClickSetLeaveType.bind(dataObject,i);
    }

    //onClick action for Full Day selection
    frmApplyLeaveDW.flxFullDayContainer.onClick = function(){
        dataObject.setLeaveToFullDay();
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.fullDayOnClick();
    }

    //onClick action for Hours Selection
    frmApplyLeaveDW.flxHoursContainer.onClick = function(){
        dataObject.setLeaveToPartial();
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.hoursOnClick();
    }
    for(var i=0; i<Date.getDayFromNum.length; i++){
        frmApplyLeaveDW["flx" +  Date.getDayFromNum[i]].onClick = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdaySelectionOnclick.bind(frmApplyLeaveDW["flx" +  Date.getDayFromNum[i]], dataObject);
    }
    for(var i=1 ; i<31 ; i++){
        if(i==1){
            var flexName = "flxRecurringDates1";
        }else{
            var flexName = i+"flxRecurringDates1";
        }
        frmApplyLeaveDW[flexName].onClick = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.weekdaySelectionOnclick.bind(frmApplyLeaveDW[flexName], dataObject);
    }
    frmApplyLeaveDW.flxAddAttachmentImage.onClick = kony.apps.coe.ess.myLeave.frmApplyLeaveDW.addAttachment.bind(this,dataObject);
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    shows/hides recurring leave flex
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.reccurringLeaveSwitch = function(){
    if(frmApplyLeaveDW.flxRecurringLeaveActive.isVisible === true){
        frmApplyLeaveDW.flxRecurringLeaveActive.setVisibility(false);
        frmApplyLeaveDW.flxAvailableSwitch.skin = "sknFlxBGfbfaf9Op100ShadowBorder1pxRoundedDW";
        frmApplyLeaveDW.lblRecurringYes.skin = "sknLbl8a8a8b14pxRomanDW";
        frmApplyLeaveDW.imgRecurringYesCheckbox.src = "unchecksmall.png";
        frmApplyLeaveDW.forceLayout();
    }
    else{
        frmApplyLeaveDW.flxRecurringLeaveActive.setVisibility(true);
        frmApplyLeaveDW.flxAvailableSwitch.skin = "sknFlxBG2ebaeeOp100ShadowBorder1pxRoundedDW";
        frmApplyLeaveDW.lblRecurringYes.skin = "sknLblffffff14pxRomanDW";
        frmApplyLeaveDW.imgRecurringYesCheckbox.src = "checksmall.png";
        frmApplyLeaveDW.forceLayout();
    }
}



kony.apps.coe.ess.myLeave.frmApplyLeaveDW.showInvalidDatesPopup = function(){
    frmApplyLeaveDW.flxBGBlur.setVisibility(true);
    frmApplyLeaveDW.flxExistingLeavePopup.setVisibility(true);
}


kony.apps.coe.ess.myLeave.frmApplyLeaveDW.closeInvalidDatesPopup = function(){
    frmApplyLeaveDW.flxBGBlur.setVisibility(false);
    frmApplyLeaveDW.flxExistingLeavePopup.setVisibility(false);
}


/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    on selection of from date
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.onSelectionOfFromDate = function(){
    var fromDate = new Date(frmApplyLeaveDW.calFromDateFilter.dateComponents[2], frmApplyLeaveDW.calFromDateFilter.dateComponents[1] - 1, frmApplyLeaveDW.calFromDateFilter.dateComponents[0]);
    var toDate = new Date(frmApplyLeaveDW.calToDateFilter.dateComponents[2], frmApplyLeaveDW.calToDateFilter.dateComponents[1] - 1, frmApplyLeaveDW.calToDateFilter.dateComponents[0]);
    if(toDate<fromDate){
        frmApplyLeaveDW.calToDateFilter.dateComponents = frmApplyLeaveDW.calFromDateFilter.dateComponents;
    }
    frmApplyLeaveDW.calToDateFilter.validStartDate = [];
    frmApplyLeaveDW.calToDateFilter.validStartDate[0] = frmApplyLeaveDW.calFromDateFilter.dateComponents[0];
    frmApplyLeaveDW.calToDateFilter.validStartDate[1] = frmApplyLeaveDW.calFromDateFilter.dateComponents[1];
    frmApplyLeaveDW.calToDateFilter.validStartDate[2] = frmApplyLeaveDW.calFromDateFilter.dateComponents[2];
}

/**
 * @memberof       frmApplyLeaveDW
 * @param          None.
 * @return         None.
 * @description    on selection of from date
 */
kony.apps.coe.ess.myLeave.frmApplyLeaveDW.onSelectionOfToDate = function(){
    var fromDate = new Date(frmApplyLeaveDW.calFromDateFilter.dateComponents[2], frmApplyLeaveDW.calFromDateFilter.dateComponents[1] - 1, frmApplyLeaveDW.calFromDateFilter.dateComponents[0]);
    var toDate = new Date(frmApplyLeaveDW.calToDateFilter.dateComponents[2], frmApplyLeaveDW.calToDateFilter.dateComponents[1] - 1, frmApplyLeaveDW.calToDateFilter.dateComponents[0]);
    var noOfDays = ((((toDate - fromDate)/1000)/60)/60)/24;
    noOfDays++;
    frmApplyLeaveDW.flxLeaveTypeContainer.height = "110dp";
    frmApplyLeaveDW.rtLeaveDaysCountInfo.text = "Applying for <b>"+noOfDays+ " days</b> leave."
    frmApplyLeaveDW.flxLeaveTypeInfoRow.setVisibility(true);
    frmApplyLeaveDW.forceLayout();
}



