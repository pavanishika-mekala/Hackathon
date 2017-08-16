/** 
 *  @author     Shantam Agarwal
 *  @category   Business Logic.	
 *  @desc       Contains UI related code for frmLeaveDahsboard
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW = kony.apps.coe.ess.myLeave.frmLeaveDashboardDW || {};
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.employeeData = [];

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    This method is used to initialize UI for frmLeaveDashboard on desktopWeb.
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.initializeUI = function(dateParam, responseLeaveData,responseStatusData, responseLeaveTypeData, responseHolidayData){
    if(!responseLeaveData)
        return;
    var statusObj = kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.buildStatusObject(responseStatusData);
    var currDate = new Date(dateParam);
    if(typeof kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj === 'undefined' ||  kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj === null){
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendarWidget", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblWeekHeaderCalendarDW", "sknLblBelongMonthClaendarDW", "sknBtnNotBelongMonthCalendarDW",kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.isValidMonthandYearforCalendar,null,kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.onswipeCallBackFunctionForCalendar,kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarCellClick.bind(kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj,statusObj, responseLeaveTypeData),kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.callbackMonthChangeFunctionForCalendar,kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.callbackRefershTotalcalendarFucntionForCalendar);
        frmLeaveDashboardDW.flxCalendarContainer.add(kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.calendarWidget);
    }
    else{
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.setMonthandYear(currDate.getMonth(), currDate.getFullYear());
    }
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.updateMonthHeader();
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setMonthChangeOnClickMethods(currDate,responseLeaveData,responseStatusData, responseHolidayData, statusObj);
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addHolidaysOnCalendar(dateParam, responseHolidayData, kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj)
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addLeaveRequestOnCalendar(kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj, responseLeaveData,responseStatusData, statusObj);   
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.closeRequestDetails();
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Sets on click methods of left and right shift of calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setMonthChangeOnClickMethods = function(dateParam, responseLeaveData,responseStatusData, responseHolidayData, statusObj){
    var setDate = dateParam;
    var nextMonthNum = dateParam.getMonth()+1;
    var prevMonthNum = dateParam.getMonth()-1;
    frmLeaveDashboardDW.flxMonthShiftLeft.onClick = function(){
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.rightShift();
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addHolidaysOnCalendar(dateParam, responseHolidayData, kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj)
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addLeaveRequestOnCalendar(kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj, responseLeaveData,responseStatusData, statusObj);
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.updateMonthHeader();
    }
    frmLeaveDashboardDW.flxMonthShiftRight.onClick = function(){
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.leftShift();
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addHolidaysOnCalendar(dateParam, responseHolidayData, kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj)
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addLeaveRequestOnCalendar(kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj, responseLeaveData,responseStatusData, statusObj);   
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.updateMonthHeader();
    }
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    callback param method to check if date range is within allowed range for calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addHolidaysOnCalendar = function(dateParam, responseHolidayData, calendarWidgetObj){
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.clearCalendar(calendarWidgetObj);
    for(var i=0; i<responseHolidayData.length; i++){
        var holDate = Date.breakBackendDate(responseHolidayData[i].Holiday_Date);
        if(responseHolidayData[i].Type !== "1")
            continue;
        if(parseInt(holDate[1]) -1 === calendarWidgetObj.month && parseInt(holDate[2]) === parseInt(dateParam.getFullYear())){
            cellData = {
                    "CELL": {
                        "skin": "sknFlxCalendarHolidayDW",
                        "align": "center"
                    },
                    "data": {
                        "CellData": "",
                        "TYPE": ""
                    },
                    "IMAGE": {
                        "isVisible": false,
                        "src": ""
                    }
                };
            calendarWidgetObj.setDataAtIndex(1, calendarWidgetObj.getIndexByDate(new Date(holDate[2], holDate[1]-1, holDate[0])), cellData);
        }
        
    }
}
/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    callback param method to check if date range is within allowed range for calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.isValidMonthandYearforCalendar = function(month, year) {
    try {
        kony.print("-- Start isValidMonthandYearforCalender --");
        var currDate = new Date();
        if (year >= (currDate.getFullYear() - 1).toString().trim(0, 4) && year <= (currDate.getFullYear() + 1).toString().trim(0, 4)) {
            return true;
        } else {
            return false;
        }
        kony.print("-- End isValidMonthandYearforCalender --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    on swipe CallBack Function For Calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.onswipeCallBackFunctionForCalendar = function(){
    kony.print("-- Start onswipeCallBackFunctionForCalendar --");
    kony.print("-- End onswipeCallBackFunctionForCalendar --");
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    callback Month Change Function For Calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.callbackMonthChangeFunctionForCalendar = function(month, year, calendarIndex){
    kony.print("-- Start callbackMonthChangeFunctionForCalendar --");
    kony.print("-- End callbackMonthChangeFunctionForCalendar --");
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    callback Refersh Total calendar Fucntion For Calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.callbackRefershTotalcalendarFucntionForCalendar = function(){
    kony.print("-- Start callbackRefershTotalcalendarFucntionForCalendar --");
    kony.print("-- End callbackRefershTotalcalendarFucntionForCalendar --");
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Displays Leave Request Details Flex
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarCellClick = function(statusObj, leaveTypeData, cellData) {
    if(typeof cellData.data.CellData.start_date === 'undefined'){
        return;
    }
    for(var i=0; i<leaveTypeData.length; i++){
        if(cellData.data.CellData.leave_type_id === leaveTypeData[i].id){
            frmLeaveDashboardDW.lblLeaveType.text = leaveTypeData[i].name;
            break;
        }
    }
    if(cellData.data.CellData.status_id === "0"){
        frmLeaveDashboardDW.flxRequestHeader.skin = "sknFlx00C6ADOp100p";
        frmLeaveDashboardDW.flxAddOption.setVisibility(false);
        frmLeaveDashboardDW.flxEditOption.setVisibility(false);
        frmLeaveDashboardDW.lblCurrentStatus.skin = "sknLbl00C6ADOp100S14pxDW"        
        frmLeaveDashboardDW.lblCurrentStatusDate.setVisibility(true);
        frmLeaveDashboardDW.lblAppliedDate.text = cellData.data.CellData.lastmodifiedts.slice(6,8) + " "+Date.getMonthMapNumberToMonth[cellData.data.CellData.lastmodifiedts.slice(4,6)] + " "+  cellData.data.CellData.lastmodifiedts.slice(0,4) + " " + cellData.data.CellData.lastmodifiedts.slice(8,10) +":"+cellData.data.CellData.lastmodifiedts.slice(10,12) ;
    }else{
        frmLeaveDashboardDW.flxRequestHeader.skin = "sknFlxBGFAB745Op100DW";
        frmLeaveDashboardDW.lblCurrentStatus.skin = "sknLblfab74514pxRomanDW";
        frmLeaveDashboardDW.lblCurrentStatusDate.setVisibility(false);
        frmLeaveDashboardDW.flxAddOption.setVisibility(true);
        frmLeaveDashboardDW.flxEditOption.setVisibility(true);
    }
    frmLeaveDashboardDW.lblLeaveDateTime.text = Date.breakBackendDate(cellData.data.CellData.start_date)[0] + " " + (Date.getMonthMapNumberToMonth[cellData.data.CellData.start_date.slice(4,6)]).slice(0,3) + " - " + Date.breakBackendDate(cellData.data.CellData.end_date)[0] + " " + (Date.getMonthMapNumberToMonth[cellData.data.CellData.end_date.slice(4,6)]).slice(0,3);
    frmLeaveDashboardDW.lblLeaveDuration.text = cellData.data.CellData.no_of_hours.toString().split('.')[0] + " Hours";
    frmLeaveDashboardDW.lblAppliedDate.text = cellData.data.CellData.createdts.slice(6,8) + " "+Date.getMonthMapNumberToMonth[cellData.data.CellData.createdts.slice(4,6)] + " "+  cellData.data.CellData.createdts.slice(0,4) + " " + cellData.data.CellData.createdts.slice(8,10) +":"+cellData.data.CellData.createdts.slice(10,12) ;
    if (cellData.data.CellData.leave_type_id === "0200" || cellData.data.CellData.leave_type_id === "0205" ) {
        if(typeof cellData.data.CellData.leave_attachments === 'undefined'){
            frmLeaveDashboardDW.flxComments.top = "230dp";
            frmLeaveDashboardDW.flxDocumentStatus.setVisibility(true);
            frmLeaveDashboardDW.flxAttachments.setVisibility(false);
        }else{
            frmLeaveDashboardDW.flxComments.top = "230dp";
            frmLeaveDashboardDW.flxDocumentStatus.setVisibility(false);
            frmLeaveDashboardDW.flxAttachments.setVisibility(true);
            kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setAttachments(cellData.data.CellData);
        }
        
    } else {
        frmLeaveDashboardDW.flxComments.top = "100dp";
        frmLeaveDashboardDW.flxDocumentStatus.setVisibility(false);
        frmLeaveDashboardDW.flxAttachments.setVisibility(false);
    }
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setCommentsInDetailsFlex(cellData.data.CellData);
    frmLeaveDashboardDW.flxBGBlur.setVisibility(true);
    frmLeaveDashboardDW.flxLeaveRequestDetails.setVisibility(true);
    frmLeaveDashboardDW.flxWithdrawOption.onClick = function(){
        frmLeaveDashboardDW.flxLeaveRequestDetails.setVisibility(false);
        frmLeaveDashboardDW.lblWithdrawLeavePopupQuestion.text = "Do you really want to Withdraw the leave request on "+cellData.data.CellData.start_date.slice(6,8) + "-"+cellData.data.CellData.end_date.slice(6,8) + " "+(Date.getMonthMapNumberToMonth[cellData.data.CellData.end_date.slice(4,6)]).slice(0,3)+ "?";
        frmLeaveDashboardDW.flxWithdrawLeavePopup.setVisibility(true);
        frmLeaveDashboardDW.forceLayout();
        frmLeaveDashboardDW.flxConfirmWithdraw.onClick = function(){
            kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.withdrawLeave(cellData.data.CellData);
        }
        frmLeaveDashboardDW.blCancel.onTouchStart = function(){
            frmLeaveDashboardDW.flxWithdrawLeavePopup.setVisibility(false);
            frmLeaveDashboardDW.flxBGBlur.setVisibility(false);
        }
    }
    frmLeaveDashboardDW.flxEditOption.onClick = function(){
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.navigateToApplyLeave(cellData.data.CellData);
    }
}


kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setCommentsInDetailsFlex = function(leaveData){
    var segData = [];
    if(leaveData.reason_desc !== "" && typeof leaveData.leave_note === 'undefined'){
        segData.push({
            "lblComment": leaveData.reason_desc,
            "lblCommentTimestamp": "Created on " +  leaveData.createdts.slice(6,8) + " "+Date.getMonthMapNumberToMonth[leaveData.createdts.slice(4,6)] + " "+  leaveData.createdts.slice(0,4) + " " + leaveData.createdts.slice(8,10) +":"+leaveData.createdts.slice(10,12),
            "imgEmpPic": "adduserpic.png",
            "lblUserName": "Rose",
            template: flxSegCommentsSelf
        });
    };
    if(leaveData.leave_note){
        for(var i=0; i<leaveData.leave_note.length; i++){
            if(leaveData.leave_note[i].employee_id === kony.apps.coe.ess.globalVariables.employeeId){
                segData.push({
                    "lblComment": leaveData.leave_note[i].comments,
                    "lblCommentTimestamp": "Created on " +  leaveData.leave_note[i].lastmodifiedts.slice(6,8) + " "+Date.getMonthMapNumberToMonth[leaveData.lastmodifiedts.slice(4,6)] + " "+  leaveData.lastmodifiedts.slice(0,4) + " " + leaveData.lastmodifiedts.slice(8,10) +":"+leaveData.lastmodifiedts.slice(10,12),
                    "imgEmpPic": "adduserpic.png",
                    "lblUserName": frmHamburgerDW.lblProfileName.text.split(" ")[0],
                    template: flxSegCommentsSelf
                });
            }else{
                for(var j=0; j<kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.employeeData.length; j++){
                    if(leaveData.leave_note[i].employee_id === kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.employeeData[j].employee_id){
                        var commentEmployeeName = kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.employeeData[j].First_Name;
                    }
                }
                segData.push({
                    "lblComment": leaveData.leave_note[i].comments,
                    "lblCommentTimestamp": "Created on " +  leaveData.leave_note[i].lastmodifiedts.slice(6,8) + " "+Date.getMonthMapNumberToMonth[leaveData.lastmodifiedts.slice(4,6)] + " "+  leaveData.lastmodifiedts.slice(0,4) + " " + leaveData.lastmodifiedts.slice(8,10) +":"+leaveData.lastmodifiedts.slice(10,12),
                    "imgapprover": "adduserpic.png",
                    "lblUserName": commentEmployeeName,
                    template: flxSegComments
                });
            }
        }
    }
    if(segData.length === 0){
        frmLeaveDashboardDW.flxComments.setVisibility(false);
    }else{
        frmLeaveDashboardDW.flxComments.setVisibility(true);
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setUserImagesInComments(segData, leaveData);
    }
    frmLeaveDashboardDW.segLeaveComments.setData(segData);
}
/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    sets attachments in Leave Request Details Flex
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setAttachments = function(leaveData){
    if(leaveData.leave_attachments.length === 0 ){
        return;
    }
    var mediaObject = new kony.apps.coe.ess.myLeave.media();
    var successFetchEmployeeImage = function(res){
        frmLeaveDashboardDW.imgAttachmentScreenshot.base64 = res;
    }
    var failureFetchingEmployeeImage = function(){
        kony.print("Failed fetching employee image");
    }
    
    for(var i=0; i<leaveData.leave_attachments.length; i++){
        mediaObject.fetchEmployeeImageDW(media_id, successFetchAttachment, failureFetchingAttachment)
    }
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    sets user images for comments in Leave Request Details Flex
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setUserImagesInComments = function(segData, leaveData){
    if(leaveData.reason_desc !== "" && typeof leaveData.leave_note === 'undefined'){
        var imgBase64;
        var commentEmployeeId = kony.apps.coe.ess.globalVariables.employeeId;
        if(commentEmployeeId === kony.apps.coe.ess.globalVariables.employeeId){
            imgBase64 = frmHamburgerDW.imgProfileImage.base64;
        }
        segData[0].imgEmpPic.base64 = imgBase64;
        frmLeaveDashboardDW.segLeaveComments.setData(segData);
        return;
    }
    for(var i = 0; i<leaveData.leave_note.length; i++){
        var imgBase64;
        var commentEmployeeId = leaveData.leave_note[i].employee_id;
        if(commentEmployeeId === kony.apps.coe.ess.globalVariables.employeeId)
            imgBase64 = frmHamburgerDW.imgProfileImage.base64;
        else{
            for(var j=0; j<kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.employeeData.length; j++){
                if(commentEmployeeId === kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.employeeData[j].employee_id){
                    var mediaIdToFetch = kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.employeeData[j].Media_Id;
                    break;
                }
            }
            var successFetchEmployeeImage = function(res){
                imgBase64 = res;
            }
            var failureFetchingEmployeeImage = function(err){
                kony.print(err);
            }
            if(mediaIdToFetch != null && typeof mediaIdToFetch != 'undefined'){
                var mediaObject = new kony.apps.coe.ess.myLeave.media();
                mediaObject.fetchEmployeeImageDW(mediaIdToFetch, successFetchEmployeeImage, failureFetchingEmployeeImage);
            }  
        }
        if(segData[i].template === flxSegCommentsSelf){
            if(imgBase64 === null || typeof imgBase64 === "undefined" ){
                segData[i].imgEmpPic = "adduserpic.png"
            }else{
                segData[i].imgEmpPic = {"base64" : imgBase64};
            }
        }else{
            if(imgBase64 === null || typeof imgBase64 === "undefined" ){
                segData[i].imgapprover = "adduserpic.png"
            }else{
                segData[i].imgapprover = {"base64" : imgBase64};
            }
        }
        
    }
    frmLeaveDashboardDW.segLeaveComments.setData(segData);
}
/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    closes Leave Request Details Flex
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.closeRequestDetails = function(){
  	frmLeaveDashboardDW.flxBGBlur.setVisibility(false);
  	frmLeaveDashboardDW.flxLeaveRequestDetails.setVisibility(false);
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    withdraw leave request
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.withdrawLeave = function(leaveData){
    var tempJSON = {
        "id": leaveData.id,
        "status_id": "3",
        "employee_id": kony.apps.coe.ess.globalVariables.employeeId
    };
    kony.apps.coe.ess.MVVM.partialUpdate("MYLEAVE", "leave", tempJSON, function(leaveData, res) {
        frmLeaveDashboardDW.flxWithdrawLeavePopup.setVisibility(false);
        frmLeaveDashboardDW.flxBGBlur.setVisibility(false);
        var leaveDate = parseInt(leaveData.start_date.slice(6,8));
        var leaveMonth = Date.getMonthMapNumberToMonth[leaveData.start_date.slice(4,6)]
        if(leaveDate === 1){
            leaveDate = "1st";
        }else if(leaveDate === 2){
            leaveDate = "2nd";
        }else if(leaveDate === 3){
            leaveDate = "3rd";
        }else{
            leaveDate = leaveDate +"th";
        }
        frmLeaveDashboardDW.lblSuccessAction.text = "Leave request on "+ leaveDate + " "+ leaveMonth +" is successfully withdrawn";
        frmLeaveDashboardDW.flxSuccessAction.setVisibility(true);
        function timerFunc()
        {
            frmLeaveDashboardDW.flxSuccessAction.setVisibility(false);
        }
        kony.timer.schedule("hideTaost",timerFunc, 4, false);
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.removeLeaveRequest(leaveData);
        frmLeaveDashboardDW.forceLayout();
    }.bind(this, leaveData), function(err) {
        kony.print(err);
    });
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    clear cell skins for current month
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.clearCalendar = function(calendarWidgetObj){
    for (var i = 0; i < 42; i++) {
        cellData = {
                    "CELL": {
                        "skin": "sknFlxMobOp0",
                        "align": "center"
                    },
                    "data": {
                        "CellData": "",
                        "TYPE": ""
                    },
                    "IMAGE": {
                        "isVisible": false,
                        "src": ""
                    }
                };
        calendarWidgetObj.setDataAtIndex(1, i, cellData);
    }
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    show Leave Requests marked on calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.addLeaveRequestOnCalendar = function(calendarWidgetObj, leaveData, statusData,statusObj){
    var requestStatusCounts = {"ApprovedCount": 0, "PendingCount" : 0, "SubmittedCount" :0, "RejectedCount" : 0, "ErrorCount":0, "TotalPending":0};
    if(leaveData.length <= 0){
        return;
    }
    for(var index=0; index<leaveData.length; index++){
        var fromDate = Date.breakBackendDate(leaveData[index].start_date);
        var toDate =  Date.breakBackendDate(leaveData[index].end_date);
        if(leaveData[index].status_id === "3"){
            continue;
        }
        if(leaveData[index].status_id === "2"){
            requestStatusCounts.TotalPending++;
        }
        if(parseInt(fromDate[1])-1 == kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.month){
            if(fromDate[0] === toDate[0] && fromDate[1] === toDate[1]){
                cellData = {
                    "CELL": {
                        "skin": "sknFlxMob"+statusObj[leaveData[index].status_id].toLowerCase()+"RoundOutline",
                        "align": "center"
                    },
                    "data": {
                        "CellData": leaveData[index],
                        "TYPE": ""
                    },
                    "IMAGE": {
                        "isVisible": false,
                        "src": ""
                    }
                };
                calendarWidgetObj.setDataAtIndex(1, calendarWidgetObj.getIndexByDate(new Date(toDate[2], toDate[1]-1, toDate[0])), cellData);
                requestStatusCounts[statusObj[leaveData[index].status_id]+"Count"] ++;
            }
            else{
                for(var i = parseInt(fromDate[0]); i<= parseInt(toDate[0]); i++){
                    if(i === parseInt(fromDate[0])){
                        cellData = {
                            "CELL": {
                                "skin": "sknFlxMob"+statusObj[leaveData[index].status_id].toLowerCase()+"LeftBarOutline",
                                "align": "right"
                            },
                            "data": {
                                "CellData": leaveData[index],
                                "TYPE": ""
                            },
                            "IMAGE": {
                                "isVisible": false,
                                "src": ""
                            }
                        }; 
                        calendarWidgetObj.setDataAtIndex(1, calendarWidgetObj.getIndexByDate(new Date(toDate[2], toDate[1]-1, i)), cellData);
                        requestStatusCounts[statusObj[leaveData[index].status_id]+"Count"] ++;
                    }else if(i === parseInt(toDate[0])){
                        cellData = {
                            "CELL": {
                                "skin": "sknFlxMob"+statusObj[leaveData[index].status_id].toLowerCase()+"RightBarOutline",
                                "align": "left"
                            },
                            "data": {
                                "CellData": leaveData[index],
                                "TYPE": ""
                            },
                            "IMAGE": {
                                "isVisible": false,
                                "src": ""
                            }
                        }; 

                        calendarWidgetObj.setDataAtIndex(1, calendarWidgetObj.getIndexByDate(new Date(toDate[2], toDate[1]-1, i)), cellData);
                        requestStatusCounts[statusObj[leaveData[index].status_id]+"Count"] ++;
                    }else{
                        cellData = {
                            "CELL": {
                                "skin": "sknFlxMob"+statusObj[leaveData[index].status_id].toLowerCase()+"MiddleBarOutline",
                                "align": "bg"
                            },
                            "data": {
                                "CellData": leaveData[index],
                                "TYPE": ""
                            },
                            "IMAGE": {
                                "isVisible": false,
                                "src": ""
                            }
                        }; 
                        calendarWidgetObj.setDataAtIndex(1, calendarWidgetObj.getIndexByDate(new Date(toDate[2], toDate[1]-1, i)), cellData);
                        requestStatusCounts[statusObj[leaveData[index].status_id]+"Count"] ++;
                    }
                }
            }
        }
    }
    kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setLeaveCounts(requestStatusCounts,leaveData);
};

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Displays Leave Request Details FlexUpdates calendar header with correct month and year
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.updateMonthHeader = function(){
    var monthNum = kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.month;
    var yearNum = kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.year;
    monthNum++;
    monthNum = monthNum>9 ? monthNum.toString() : "0"+monthNum.toString();
    var monthName = Date.getMonthMapNumberToMonth[monthNum];
    frmLeaveDashboardDW.lblMonthName.text = monthName +" "+ yearNum.toString();
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    remove Leave Request from calendar
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.removeLeaveRequest = function(leaveData){
    var fromDate = Date.breakBackendDate(leaveData.start_date);
    var toDate = Date.breakBackendDate(leaveData.end_date);
    for(var i = fromDate[0]; i<= toDate[0]; i++){
        cellData = {
                    "CELL": {
                        "skin": "sknLblBelongMonthClaendarDW",
                        "align": "bg"
                    },
                    "data": {
                        "CellData": "",
                        "TYPE": ""
                    },
                    "IMAGE": {
                        "isVisible": false,
                        "src": ""
                    }
                }; 
        kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.setDataAtIndex(1, kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.calendarWidgetObj.getIndexByDate(new Date(toDate[2], toDate[1]-1, i)), cellData);
    }
};

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    navigates to apply leave form
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.navigateToApplyLeave = function(leaveData){
    if(leaveData){
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.navigationMode(leaveData);
    }
    else{
        kony.apps.coe.ess.myLeave.frmApplyLeaveDW.navigationMode();
    }
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    filters entire leave data for current user
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.filterData = function(leaveDataToFilter, successCallback){
    var empLeaveData = [];
    for(var i = 0; i<leaveDataToFilter.length; i++){
        if(leaveDataToFilter[i].employee_id === kony.apps.coe.ess.globalVariables.employeeId){
            empLeaveData.push(leaveDataToFilter[i]);
        }
        if(i == leaveDataToFilter.length -1){
            kony.apps.coe.ess.myLeave.frmApplyLeaveDW.leaveData = empLeaveData;
            successCallback(empLeaveData);
        }
    }
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Creates JSON object from Status table for easier fetch
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.buildStatusObject = function(statusData){
    var statusObject = {};
    for(var i=0; i<statusData.length; i++){
        statusObject[statusData[i].Id] = statusData[i].Status_Name;
        if(i == statusData.length - 1){
            return statusObject;
        }
    }
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Populate holidays to segment
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.populateHolidaysBirthdaysAndEvents = function(holidayData, employeeData){
    kony.print(employeeData);
    var currDate = new Date();
    var monthNum = currDate.getMonth();
    var paddedMonthNum = (monthNum+1) > 9 ? (monthNum+1).toString() : "0" + (monthNum+1).toString();
    var monthName = Date.getMonthMapNumberToMonth[paddedMonthNum];
    var yearNum = currDate.getFullYear().toString().slice(2,4);
    var birthdayList = [];
    frmLeaveDashboardDW.segHolidayList.widgetDataMap = {
        "lblHolidayName": "lblHolidayName",
        "lblHolidayDate": "lblHolidayDate",
        "lblHolidaySectionHeader": "lblHolidaySectionHeader",
        "imgHolidayListSectionHeader": "imgHolidayListSectionHeader",
        "lblType": "lblType",
        "lblDummyDivider" : "lblDummyDivider"
    };
    var months = {
        "0": "Jan",
        "1": "Feb",
        "2": "Mar",
        "3": "Apr",
        "4": "May",
        "5": "Jun",
        "6": "Jul",
        "7": "Aug",
        "8": "Sep",
        "9": "Oct",
        "10": "Nov",
        "11": "Dec"
    };
    var segData = [
        [{
                lblHolidaySectionHeader: "Holidays",
                imgHolidayListSectionHeader: "holidays.png",
                lblDummyDivider : " ",
                template: flxHolidaySectionHeader
            },
            []
        ],
        [{
                lblHolidaySectionHeader: {
                    text: "Events",
                    skin: "sknLbl52627016pxMediumDW"
                },
                lblDummyDivider : " ",
                imgHolidayListSectionHeader: "events.png",
                template: flxHolidaySectionHeader
            },
            [{
                lblType: "No Events in  "+monthName+" '"+yearNum,
                template: flxSegHolidayListNoEvent
            }]
        ],
        [{
                lblHolidaySectionHeader: {
                    text: "Birthdays",
                    skin: "sknLbl52627016pxMediumDW"
                },
                lblDummyDivider : " ",
                imgHolidayListSectionHeader: "birthdays.png",
                template: flxHolidaySectionHeader
            },
            []
        ]
    ];

    for (var i = 0 ; i <holidayData.length; i++) {
        if(holidayData[i].Type == '1' && parseInt(holidayData[i].Holiday_Date.slice(4,6)) - 1 == (new Date()).getMonth() && parseInt(holidayData[i].Holiday_Date.slice(0,4)) == (new Date()).getFullYear()){
            segData[0][1].push({'lblHolidayName':holidayData[i].Name, 'lblHolidayDate': parseInt((holidayData[i].Holiday_Date).slice(6,8)).toString() + " "+ months[(parseInt((holidayData[i].Holiday_Date).slice(4,6))-1)]})
        }
        if(i === holidayData.length - 1 && segData[0][1].length === 0){
            segData[0][1].push({
                lblType: "No Holidays in  "+monthName+" '"+yearNum,
                template: flxSegHolidayListNoEvent
            });
        }
    }
    for (var i = 0 ; i <employeeData.length; i++) {
        var empDOBArr = Date.breakBackendDate(employeeData[i].Date_of_birth);
        if( empDOBArr[1] == monthNum+1 ){
            birthdayList.push({"date": empDOBArr, "name":employeeData[i].First_Name});
        }
        if(i === employeeData.length - 1){
            kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.sortAndSetBirthdays(birthdayList, segData, monthName, yearNum);
        }
    }
    
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Populate birthdays to segment
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.sortAndSetBirthdays = function(birthdayList, segData, monthName, yearNum){
    if(birthdayList.length === 0){
        segData[2][1].push({
            lblType: "No Birthdays in  "+monthName+" '"+yearNum,
            template: flxSegHolidayListNoEvent
        });
        frmLeaveDashboardDW.segHolidayList.setData(segData);
        return;
    }
    var sortedBirthdayList = birthdayList.sort(function(a,b){
        return a.date[0] - b.date[0];
    });

    for (var i = 0 ; i <sortedBirthdayList.length; i++) {
        segData[2][1].push({'lblHolidayName':sortedBirthdayList[i].name, 'lblHolidayDate': sortedBirthdayList[i].date[0].toString() + " "+ monthName.slice(0,3)});
    }
    frmLeaveDashboardDW.segHolidayList.setData(segData);
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Sets user image in hamburger
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setUserImageInHamburger = function(media_id){
    var mediaObject = new kony.apps.coe.ess.myLeave.media();
    var successFetchEmployeeImage = function(res){
        frmHamburgerDW.imgProfileImage.base64 = res;
    }
    var failureFetchingEmployeeImage = function(){
        kony.print("Failed fetching employee image");
    }
    mediaObject.fetchEmployeeImageDW(media_id, successFetchEmployeeImage, failureFetchingEmployeeImage)
}
/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Set Leave counts throughout form
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setLeaveCounts = function(requestStatusCounts, leaveData){
    frmLeaveDashboardDW.lblLeavesPendingNumber.text = (requestStatusCounts.PendingCount).toString();
    frmLeaveDashboardDW.lblLeavesApprovedNumber.text = (requestStatusCounts.ApprovedCount).toString();
    frmLeaveDashboardDW.lblLeavesRejectedNumber.text = (requestStatusCounts.RejectedCount).toString();
    frmLeaveDashboardDW.lblLeavesSubmittedNumber.text = (requestStatusCounts.SubmittedCount).toString();
    frmLeaveDashboardDW.lblPendingNumber.text = requestStatusCounts.TotalPending.toString();
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Open all holidays and events form
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.navigateToAllHolidaysForm = function(){
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmAllHolidaysAndEventsDW");
    formController.loadDataAndShowForm();
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Open Team View form
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.navigateToTeamViewForm = function(){
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCalendarTeamViewDW");
    formController.loadDataAndShowForm();
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Open Leave Dashboard
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.navigateToLeaveDashboard = function(){
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveDashboardDW");
    formController.loadDataAndShowForm();
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Sets manager name to apply leave page
 */
kony.apps.coe.ess.myLeave.frmLeaveDashboardDW.setManagerNameToApplyLeave = function(employeeData, managerId){
    for(var i=0; i<employeeData.length; i++){
        if(employeeData[i].Id === managerId){
            kony.apps.coe.ess.myLeave.frmApplyLeaveDW.managerName = employeeData[i].First_Name + " " + employeeData[i].Last_Name;
            break;
        }
    }
    
}
