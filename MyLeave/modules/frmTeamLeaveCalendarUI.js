/**
 *  @author     Shweta Dasari
 *  @category   UI.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};
//currentYear is a global variable to keep track of user swipe count
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var dataLength = 0;
/*
//#ifndef windows8
frmTeamLeaveCalendar.lblHeaderYear.text = Math.floor(currentYear);
//#endif
*/
kony.apps.ess.myLeave.teamLeaveData=[];
var selectedMonth=currentDate.getMonth();

var months = ["Jan", "Feb", "Mar","Apr","May","June","July","August","Sept","October","Nov","Dec"];
 var mnth = selectedMonth-1;
/*
//#ifndef windows8
for(i = 0;i<=11;i++){
  kony.print("&&&&&&&&&&&&&&&&&&&&&&i="+i+"&&&&mnth="+mnth+"");
  if(i===mnth){
    eval("frmTeamLeaveCalendar.flxCalMonth"+months[mnth]+".skin =sknFlexTab4990e2");
  }else{
    eval("frmTeamLeaveCalendar.flxCalMonth"+months[mnth]+".skin =sknFlexTabf8f7f6Bor979797Opac20");
  }
}
//#endif
*/
var teamMembers = [];
var tempData = [];

kony.apps.ess.myLeave.frmTeamLeaveCalendarUI = function(){

};

/**
 * @function applyGesture
 * This function is invoked at frmTeamLeaveCalendar preshow to appy gesture to the months flex
 * Tap gesture and swipe gesture are applied to the months
 * @memberof frmTeamLeaveCalendarUI#
 * @returns {void}
 */
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.applyGesture=function(){
  kony.print("-- Start applyGesture --");
  var swipeOnCard = {
    fingers: 1,
    swipedistance: 50,
    swipeVelocity: 30
  };
  frmTeamLeaveCalendar.flexHeaderMonthSelection.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, swipeOnCard, this.swipeMonths.bind(this));
};
/**
 * @function swipeMonths
 * This function is invoked on the swipe of the months flex
 * @memeberof frmTeamLeaveCalendarUI#
 * @param {JSON}commonWidget - Details of the widget on which gesture is applied
 * @param {JSON}gestureInfo - Contains the type of gesture applied
 * @returns {void}
 */
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.swipeMonths = function(commonWidget, gestureInfo,context) {

  kony.print("-- Start segmentSwipeAnimation --");
  var swipedDirection = gestureInfo.swipeDirection;
  if (swipedDirection === 1) {
    currentYear = Math.floor(currentYear+1);
    frmTeamLeaveCalendar.lblHeaderYear.text = currentYear;
  } else if (swipedDirection === 2) {
    currentYear = Math.floor(currentYear-1);
    frmTeamLeaveCalendar.lblHeaderYear.text = currentYear;
  }
  kony.print("-- End segmentSwipeAnimation --");
};

///with Conditions for more than one day leave
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.createEmpLeaveCalendar1 = function(members,leaveData){
  try{
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
    for(k=0; k<20; k++){
      dataLength++;
    var flxEmpRec = new kony.ui.FlexContainer({
        "id": "flxEmpRec" + k,
        "top": "0%",
        "left": "0%",
        "width": "13%",
        "height": "100%",
        "zIndex": 1,
        "isVisible": true,
        "clipbounds": true,
        "layoutType": kony.flex.FLOW_VERTICAL//4
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 100
    }, {});
      var flxProfile = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "15%",
        "id": "flxProfile" + k,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "sknflxtabf8f8f8",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flxProfile.setDefaultUnit(kony.flex.DP);
      flxEmpRec.add(flxProfile);
	var impEmpPic = new kony.ui.Image2({
        "centerX": "50%",
        "height": "50%",
        "id": "impEmp" + k,
        "isVisible": true,
        "left": "0%",
        "skin": "slImage",
        "src": "profile.png",
        "top": "15%",
        "width": "50%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});

    var nameLabel = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "80%",
        "height": "30%",
        "id": "lblEmpName" + k,
        "isVisible": true,
        "left": "15dp",
        "skin": "CopyslLabel05fbc27d33b9248",
        "text":  members[k].First_Name,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "54dp",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });

      var flxInitials = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerX": "50%",
        "clipBounds": true,
        "height": "52%",
        "id": "flxInitials" + k,
        "isVisible": false,
        "layoutType": kony.flex.FREE_FORM,
        "left": "40dp",
        "skin": "sknflxinitials",
        "top": "15%",
        "width": "50%",
        "zIndex": 1
    }, {}, {});
    flxInitials.setDefaultUnit(kony.flex.DP);
      var initialString = (members[k].First_Name[0]).toUpperCase() + (members[k].Last_Name[0]).toLowerCase();
      var lblinitials = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "50%",
        "id": "lblinitials" +k,
        "isVisible": false,
        "left": "10dp",
        "skin": "sknlbltabinitails",
        "text": initialString,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "13dp",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxInitials.add(lblinitials);
      flxProfile.add(impEmpPic, nameLabel, flxInitials);

    //var count = 31;
    var count = 15;
    //Default all No Leave Skin
  	for( i = 0; i<count; i++){
      var lblLeaveData = new kony.ui.Label({
              "id": "lblLeaveDataEmp"+k+"Lbl" + i,
              "skin": "sknflxtabnoleave",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "100%",
              "height": "5%",
              "zIndex": 1,
              "isVisible": true,
              "text": "",
          }, {
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
          flxEmpRec.add(lblLeaveData);

    }

    frmTeamLeaveCalendar.flxScrollTeamLeave.add(flxEmpRec);

    var leavedays = 0;
    var leaveDataLen=leaveData.length;
    if(leaveDataLen===1){
      if(members[k].Id === leaveData[0][0].employee_id){
        var start_date="",end_date="";
        start_date = leaveData[0][0].start_date;
        end_date = leaveData[0][0].end_date;

        var start_day = start_date.substring(6, 8);
        var end_day = end_date.substring(6,8);
        var startdayInt = 1*start_day;
        var enddayInt = 1* end_day;

        var leavedays = enddayInt - startdayInt;

        if(leavedays===0){
          var labelObj = eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+startdayInt-1);
          labelObj.skin="sknLblLeave";
        }else if(leavedays===1){
          eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(startdayInt-1)+ ".skin=sknLblLeave");
          eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(enddayInt-1)+ ".skin=sknLblLeave");
        }else{
          for(x=(startdayInt-1);x<=(enddayInt-1);x++){
            eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(startdayInt-1)+ ".skin=sknLblLeave");
          }
        }
      }

    }else if(leaveDataLen>1){

    }

  }
  }catch(error){
    kony.application.dismissLoadingScreen();
  }
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
};
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.createEmpLeaveCalendar2 = function(members,leaveData){

  for(k=0; k<25 ; k++){
    var flxEmpRec = new kony.ui.FlexContainer({
        "id": "flxEmpRec" + k,
        "top": "0%",
        "left": "0%",
        "width": "13%",
        "height": "100%",
        "zIndex": 1,
        "isVisible": true,
        "clipbounds": true,
        "layoutType": kony.flex.FLOW_VERTICAL//4
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 100
    }, {});
	var impEmpPic = new kony.ui.Image2({
        "id": "impEmp" + k,
        "src": "profile.png",
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "10%",//5
        "zIndex": 1,
        "isVisible": true,
        "text": "",
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 100
    }, {});
    flxEmpRec.add(impEmpPic);
    var nameLabel = new kony.ui.Label({
              "id": "lblEmpName" + k,
              "skin": "sknLbl999999Ft36AvenirLTStdRoman",	//sknLblNoLeave
              "top": "0%",
              "left": "0%",
              "width": "100%",
              "height": "5%",
              "zIndex": 1,
              "isVisible": true,
              "text": members[k].First_Name,
          }, {
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
    flxEmpRec.add(nameLabel);

    var count = 31;
    //Default all No Leave Skin
  	for( i = 15; i<count; i++){
      var lblLeaveData = new kony.ui.Label({
              "id": "lblLeaveDataEmp"+k+"Lbl" + i,
              "skin": "sknLblNoLeave",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "100%",
              "height": "5%",
              "zIndex": 1,
              "isVisible": true,
              "text": "",
          }, {
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
          flxEmpRec.add(lblLeaveData);

    }

    frmTeamLeaveCalendar.flxScrollTeamLeave.add(flxEmpRec);

    var leavedays = 0;
    var leaveDataLen=leaveData.length;
    if(leaveDataLen===1){
      if(members[k].Id === leaveData[0][0].employee_id){
        var start_date="",end_date="";
        start_date = leaveData[0][0].start_date;
        end_date = leaveData[0][0].end_date;

        var start_day = start_date.substring(6, 8);
        var end_day = end_date.substring(6,8);
        var startdayInt = 1*start_day;
        var enddayInt = 1* end_day;

        var leavedays = enddayInt - startdayInt;

        if(leavedays===0){
          var labelObj = eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+startdayInt-1);
          labelObj.skin="sknLblLeave";
        }else if(leavedays===1){
          eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(startdayInt-1)+ ".skin=sknLblLeave");
          eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(enddayInt-1)+ ".skin=sknLblLeave");
        }else{
          for(x=(startdayInt-1);x<=(enddayInt-1);x++){
            eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(startdayInt-1)+ ".skin=sknLblLeave");
          }
        }
      }

    }else if(leaveDataLen>1){

    }

  }
};

kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.getTeamData = function(){
  var query = "select First_Name, Middle_Name, Last_Name,Manager_Id, group_id, Id,Media_Id from Employee where group_id="+
            "(select group_id from Employee where Id='"+kony.apps.coe.ess.globalVariables.employeeId +"') and Id!='"+kony.apps.coe.ess.globalVariables.employeeId+"'";
  kony.sync.single_select_execute(kony.sync.getDBName(), query, null, this.getTeamDataSuccesscallback.bind(this), function(err)
        {
     alert(err);
           // handleError(err);
        }, false);
};
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.getTeamDataSuccesscallback = function(data){
  kony.print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shweta:: getTeamDataSuccesscallback ="+data);
  if(data!==null && data!==undefined){
    if(data.length>0){
      teamMembers = data;
      for(var i=0;i<data.length;i++){
          var yearIntervalEndDate = currentYear;
          var yearIntervalStartDate = currentYear;
          var monthIntervalStartDate = selectedMonth;
          var monthIntervalEndDate = selectedMonth;
          var dayIntervalEndDate = 30;
          var dayIntervalStartDate = 1;
        if(i===(data.length-1)){
          lastEmp = 1;
        }
           var sqlQuery = "select start_date,end_date,employee_id from leave where employee_id = '" + data[i].Id+"' and status_id = 0"+
               " and ((start_date between '" + yearIntervalStartDate + monthIntervalStartDate + dayIntervalStartDate +
               "' AND '" + yearIntervalEndDate + monthIntervalEndDate + dayIntervalEndDate+
               "') OR (end_date between '" + yearIntervalStartDate + monthIntervalStartDate + dayIntervalStartDate +
               "' AND '" + yearIntervalEndDate + monthIntervalEndDate + dayIntervalEndDate + "'))";
          kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, this.getTeamLeavesSuccesscallback.bind(this), function(err)
            {
                handleError(err);
            }, false);


        //this.fetchImageValueByMediaId(data);
//          var sqlQuery = "select start_date,end_date,employee_id from leave where employee_id = '" + data[i].Id+"' and status_id = 0"+
//              " and ((start_date between '20010101' AND '20010131') OR (end_date between '20170101' AND '20170131'))";
//         kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, this.getTeamLeavesSuccesscallback.bind(this), function(err)
//           {
//               alert(err);
//           }, false);
      }

    }else{
      kony.print("getTeamDataSuccesscallback data  length is not > 0");
    }
  }else{
     kony.print("getTeamDataSuccesscallback data is null or undefined");
  }
};
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.getTeamLeavesSuccesscallback = function(data){

  if(data!==null && data!==undefined){
    if(data.length>0){
      var empLeaveJson = data;
      kony.apps.ess.myLeave.teamLeaveData.push(empLeaveJson);
      if(lastEmp===1){
        this.createEmpLeaveCalendar1(teamMembers,kony.apps.ess.myLeave.teamLeaveData);
      }
    }
  }else{
     kony.print("getTeamLeavesSuccesscallback data is null or undefined");
  }
};

kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.fetchImageValueByMediaId = function(data) {
  try
  {
    kony.print("entered fetchImageValueByMediaId");
    kony.print("---- Inside fetchImageValueByMediaId ----");
    if(typeof data != "undefined" && data !== null && data.length !== null && data.length > 0)
    {
      kony.print("if fetchImageValueByMediaId");
      kony.apps.ess.myLeave.tempData = data;
      kony.print("data fetchImageValueByMediaId="+data);
      kony.print("kony.apps.ess.myLeave.tempData:::::::::"+kony.apps.ess.myLeave.tempData);
      for(var i=0;i<data.length;i++)
      {
        if(data[i].Media_id!=="")
        {
          (new kony.apps.ess.myLeave.tabmedia()).fetchEmployeeImage({"mediaName":data[i].Media_id},this.fetchImageValueByMediaIdSuccessCallback.bind(this,data[i].Media_id),this.fetchImageValueByMediaIdErrorCallBack);
        }
      }
      kony.print("FINAL AFTER ADDING IMAGES:::"+kony.apps.ess.myLeave.tempData);
    }else{
      kony.print("No data in fetchImageValueByMediaId");
    }
  }
  catch(e)
  {
	handleError(e);
  }
};

/**
 * fetchImageValueByMediaIdSuccessCallback
 * @memberof TeamView
 * @param None
 * @returns null
 */
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.fetchImageValueByMediaIdSuccessCallback = function(media_id, response) {
  try
  {
    kony.print("inside fetchImageValueByMediaIdSuccessCallback");
    kony.print("---- Inside fetchImageValueByMediaIdSuccessCallback ----");
    if(response!==null && response!=="")
    {
      if(response.length>0 && response.length<=kony.apps.coe.ess.appconfig.maxImageSizeLimit)
      {
        var data = kony.apps.ess.myLeave.tempData;
        if(typeof data != "undefined" && data !== null && data.length !== null && data.length > 0)
        {
          for(var i=0;i<data.length;i++)
          {
            if(media_id==data[i].Media_id)
            {
              data[i].imgEmpPic = {"base64":response};
              data[i].flxProfileImage = {"isVisible": true};
              data[i].flxInitials ={"isVisible": false};
              kony.apps.ess.myLeave.tempData = data;
              teamLeaveData = data;
              break;
            }
          }
        }
      }
    }else{
      kony.print("else  of fetchImageValueByMediaIdSuccessCallback");
    }
  }
  catch(e)
  {
	handleError(e);
  }
};

/**
 * This method is the errorcallback of fetchImageValueByMediaId
 * @memberof TeamView
 * @param None
 * @returns null
 */
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.fetchImageValueByMediaIdErrorCallBack = function(error) {
  if(error.opstatus!==null && error.opstatus!==undefined)
  {
    if(error.opstatus==20005)
    {
      kony.print("---------Media File not found "+JSON.stringify(error));
    }
    else
    {
     kony.print("---------Error in Json File "+JSON.stringify(error));
    }
  }
};
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.fillDays1 = function() {
  //kony.application.showLoadingScreen("Loading, Please Wait!", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: currentYear= "+currentYear+"$$$$$$$$$$$$$$$$$:: selectedMonth="+selectedMonth);
  var startDate = new Date(currentYear,selectedMonth,1);
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: startDate  = "+startDate);
  var endDate = new Date(currentYear, selectedMonth+1, 15);
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: End Date = "+endDate);
  var startDay = startDate.getDate();
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: startDay = "+startDay);
  var endDay = endDate.getDate();
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: endDay = "+endDay);

  var day;
  var between = [];

for(j =startDay; j<= endDay;j++){
      startDate = new Date(currentYear,(selectedMonth-1),j);
  	  var startDateStr = startDate.toString();
  	  var arr = [];
  	  arr = startDateStr.split(" ");
  	  var finalDate = startDate.getDate()+" "+arr[0];
      between.push(finalDate);
}
  //alert("between="+between);
frmTeamLeaveCalendar.flxDates.removeAll();
        for( i = 0; i<between.length; i++){
      var lblDate = new kony.ui.Label({
              "id": "lblDate"+i,
              "skin": "sknflxtabnoleave",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "100%",
              "height": "5%",
              "zIndex": 1,
              "isVisible": true,
              "text": between[i],
          }, {
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
          frmTeamLeaveCalendar.flxDates.add(lblDate);

    }
};
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.fillDays2 = function() {
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: currentYear= "+currentYear+"$$$$$$$$$$$$$$$$$:: selectedMonth="+selectedMonth);
  var startDate = new Date(currentYear,selectedMonth,16);
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: startDate  = "+startDate);
  var endDate = new Date(currentYear, selectedMonth+1, 0);
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: End Date = "+endDate);
  var startDay = startDate.getDate();
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: startDay = "+startDay);
  var endDay = endDate.getDate();
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: endDay = "+endDay);

  var day;
  var between = [];

for(j =startDay; j<= endDay;j++){
      startDate = new Date(currentYear,(selectedMonth - 1),j);
  	  var startDateStr = startDate.toString();
  	  var arr = [];
  	  arr = startDateStr.split(" ");
  	  var finalDate = startDate.getDate()+" "+arr[0];
      between.push(finalDate);
}
frmTeamLeaveCalendar.flxDates.removeAll();
        for( i = 0; i<between.length; i++){
      var lblDate = new kony.ui.Label({
              "id": "lblDate"+i,
              "skin": "sknLblNoLeave",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "100%",
              "height": "5%",
              "zIndex": 1,
              "isVisible": true,
              "text": between[i],
          }, {
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
          frmTeamLeaveCalendar.flxDates.add(lblDate);

    }
};
///with Conditions for more than one day leave
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.onScrollEndOfFlex = function(members,leaveData){
  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Data..");
  try{
    var end = (dataLength + 19)
    for(k=(dataLength - 1); k<end; k++){
      dataLength++;
    var flxEmpRec = new kony.ui.FlexContainer({
        "id": "flxEmpRec" + k,
        "top": "0%",
        "left": "0%",
        "width": "13%",
        "height": "100%",
        "zIndex": 1,
        "isVisible": true,
        "clipbounds": true,
        "layoutType": kony.flex.FLOW_VERTICAL//4
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 100
    }, {});
      var flxProfile = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "15%",
        "id": "flxProfile" + k,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "sknflxtabf8f8f8",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flxProfile.setDefaultUnit(kony.flex.DP);
      flxEmpRec.add(flxProfile);
	var impEmpPic = new kony.ui.Image2({
        "centerX": "50%",
        "height": "50%",
        "id": "impEmp" + k,
        "isVisible": true,
        "left": "0%",
        "skin": "slImage",
        "src": "profile.png",
        "top": "15%",
        "width": "50%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});

    var nameLabel = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "80%",
        "height": "30%",
        "id": "lblEmpName" + k,
        "isVisible": true,
        "left": "15dp",
        "skin": "CopyslLabel05fbc27d33b9248",
        "text":  members[k].First_Name,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "54dp",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });

      var flxInitials = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerX": "50%",
        "clipBounds": true,
        "height": "52%",
        "id": "flxInitials" + k,
        "isVisible": false,
        "layoutType": kony.flex.FREE_FORM,
        "left": "40dp",
        "skin": "sknflxinitials",
        "top": "15%",
        "width": "50%",
        "zIndex": 1
    }, {}, {});
    flxInitials.setDefaultUnit(kony.flex.DP);
      var initialString = (members[k].First_Name[0]).toUpperCase() + (members[k].Last_Name[0]).toLowerCase();
      var lblinitials = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "50%",
        "id": "lblinitials" +k,
        "isVisible": false,
        "left": "10dp",
        "skin": "sknlbltabinitails",
        "text": initialString,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "13dp",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxInitials.add(lblinitials);
      flxProfile.add(impEmpPic, nameLabel, flxInitials);

    //var count = 31;
    var count = 15;
    //Default all No Leave Skin
  	for( i = 0; i<count; i++){
      var lblLeaveData = new kony.ui.Label({
              "id": "lblLeaveDataEmp"+k+"Lbl" + i,
              "skin": "sknflxtabnoleave",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "100%",
              "height": "5%",
              "zIndex": 1,
              "isVisible": true,
              "text": "",
          }, {
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
          flxEmpRec.add(lblLeaveData);

    }

    frmTeamLeaveCalendar.flxScrollTeamLeave.add(flxEmpRec);

    var leavedays = 0;
    var leaveDataLen=leaveData.length;
    if(leaveDataLen===1){
      if(members[k].Id === leaveData[0][0].employee_id){
        var start_date="",end_date="";
        start_date = leaveData[0][0].start_date;
        end_date = leaveData[0][0].end_date;

        var start_day = start_date.substring(6, 8);
        var end_day = end_date.substring(6,8);
        var startdayInt = 1*start_day;
        var enddayInt = 1* end_day;

        var leavedays = enddayInt - startdayInt;

        if(leavedays===0){
          var labelObj = eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+startdayInt-1);
          labelObj.skin="sknLblLeave";
        }else if(leavedays===1){
          eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(startdayInt-1)+ ".skin=sknLblLeave");
          eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(enddayInt-1)+ ".skin=sknLblLeave");
        }else{
          for(x=(startdayInt-1);x<=(enddayInt-1);x++){
            eval("frmTeamLeaveCalendar.lblLeaveDataEmp"+k+"Lbl"+(startdayInt-1)+ ".skin=sknLblLeave");
          }
        }
      }

    }else if(leaveDataLen>1){

    }

  }
  }catch(error){
    kony.application.dismissLoadingScreen();
  }
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
  frmTeamLeaveCalendar.forceLayout();
};
/*
*/
kony.apps.ess.myLeave.frmTeamLeaveCalendarUI.prototype.onClickOfMonth = function(month) {
  	kony.print("---start onClickOfMonth---");
  	var months = {"Jan" : "1", "Feb" : "2", "Mar" : "3", "Apr" : "4", "May" : "5", "June" : "6", "July" : "7", "August" : "8", "Sept" : "9", "October" : "10", "Nov" : "11", "Dec" : "12"};
  	selectedMonth = parseInt(months[month]);
  	frmTeamLeaveCalendar.flxCalMonthJan.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthJan.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthFeb.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthFeb.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthMar.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthMar.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthApr.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthApr.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthMay.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthMay.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthJune.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthJune.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthJuly.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthJuly.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthAugust.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthAugust.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthSept.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthSept.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthOctober.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthOctober.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthNov.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthNov.skin = "sknLbl999999Ft36AvenirLTStdRoman";

	frmTeamLeaveCalendar.flxCalMonthDec.skin = "sknFlexTabf8f7f6Bor979797Opac20";
	frmTeamLeaveCalendar.lblCalMonthDec.skin = "sknLbl999999Ft36AvenirLTStdRoman";

  	frmTeamLeaveCalendar["flxCalMonth" + month].skin = "sknFlexTab4990e2";
	frmTeamLeaveCalendar["lblCalMonth" + month].skin = "sknLblTabffffff36AvenirLTStdRoman";

  	//#ifdef windows8
		(new kony.apps.ess.myLeave.teamLeaveCalendarWin()).fillDays();
		(new kony.apps.ess.myLeave.teamLeaveCalendarWin()).createEmpLeaveCalendar1(teamMembers,kony.apps.ess.myLeave.teamLeaveData);
	//#else
		(new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).fillDays1();
		(new kony.apps.ess.myLeave.frmTeamLeaveCalendarUI()).createEmpLeaveCalendar1(teamMembers,kony.apps.ess.myLeave.teamLeaveData);
	//#endif
  	frmTeamLeaveCalendar.imgDownWeek.src = "toggle_off.png"
  	kony.print("---end onClickOfMonth---");
};
