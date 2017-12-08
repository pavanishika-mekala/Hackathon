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

kony.apps.ess.myLeave.teamLeaveCalendarWin = function(){
  
};
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var selectedMonth=currentDate.getMonth();
kony.apps.ess.myLeave.teamLeaveCalendarWin.weekendDates = [];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//#ifdef windows8
frmTeamLeaveCalendar.lblMonth.text = months[selectedMonth]+" "+currentYear;
//#endif

kony.apps.ess.myLeave.teamLeaveCalendarWin.prototype.fillDays = function() {
  kony.application.showLoadingScreen("Loading, Please Wait!", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: currentYear= "+currentYear+"$$$$$$$$$$$$$$$$$:: selectedMonth="+selectedMonth);
  var startDate = new Date(currentYear,selectedMonth,1);
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: startDate  = "+startDate);
  var endDate = new Date(currentYear, selectedMonth+1,  (new Date(currentYear, selectedMonth, 0).getDate())-1);
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: End Date = "+endDate);
  var startDay = startDate.getDate();
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: startDay = "+startDay);
  var endDay = endDate.getDate();
  kony.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SHWETA:: endDay = "+endDay);

  var day;
  var between = [];

for(j =startDay; j<= endDay;j++){
      startDate = new Date(currentYear,selectedMonth,j);  
  	  var startDateStr = startDate.toString();
  	  var arr = [];
  	  arr = startDateStr.split(" ");
 	  var chars = [];
  	  chars = arr[0];
  	  var finalDate = "\n"+chars[0]+chars[1]+"\n"+startDate.getDate();
//   	  if(arr[0] === "Sat" || arr[0] === "Sun"){
//         kony.apps.ess.myLeave.teamLeaveCalendarWin.weekendDates.push(startDate.getDate());
//       }
      between.push(finalDate);
}
  frmTeamLeaveCalendar.flxTeam.removeAll();
  
  var teamTitle = new kony.ui.Label({
              "id": "teamTitle",
              "skin": "sknlblwinteam",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "13%",
              "height": "100%",
              "zIndex": 1,
              "isVisible": true,
              "text": "Team",
          }, {
              "padding": [0, 0, 0, 0],
    		  "contentAlignment": constants.CONTENT_ALIGN_CENTER,
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
  frmTeamLeaveCalendar.flxTeam.add(teamTitle);
  
        for( i = 0; i<between.length; i++){
      var lblDate = new kony.ui.Label({
              "id": "lblDate"+i,
              "skin": "sknflxtabnoleave",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "2.8%",
              "height": "100%",
              "zIndex": 1,
              "isVisible": true,
              "text": between[i],
          }, {
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
          frmTeamLeaveCalendar.flxTeam.add(lblDate);
      
    }
};

kony.apps.ess.myLeave.teamLeaveCalendarWin.prototype.createEmpLeaveCalendar1 = function(members,leaveData){
  try{
    frmTeamLeaveCalendar.flxScrollTeamLeave.removeAll();
    
    for(k=0; k<members.length ; k++){
    var flxEmpRec = new kony.ui.FlexContainer({
        "id": "flxEmpRec" + k,
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "13%",
        "zIndex": 1,
        "isVisible": true,
        "clipbounds": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL//4
    }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 100
    }, {});
      var flxProfile = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "flxProfile",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "sknflxtabf8f8f8",
        "top": "0dp",
        "width": "13%",
        "zIndex": 1
    }, {}, {});
    flxProfile.setDefaultUnit(kony.flex.DP);
      flxEmpRec.add(flxProfile);
	var impEmpPic = new kony.ui.Image2({
        "centerX": "25%",
      "centerY": "50%",
        "height": "80%",
        "id": "impEmp" + k,
        "isVisible": true,
        "left": "0%",
        "skin": "slImage",
        "src": "profile.png",
        "top": "15%",
        "width": "40%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    
    var nameLabel = new kony.ui.Label({
                                     
        "centerX": "62%",
        "centerY": "50%",
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
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    
      var flxInitials = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerX": "25%",
        "centerY": "50%",
        "clipBounds": true,
        "height": "80%",
        "id": "flxInitials" + k,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "40dp",
        "skin": "sknflxinitials",
        "top": "15%",
        "width": "40%",
        "zIndex": 1
    }, {}, {});
    flxInitials.setDefaultUnit(kony.flex.DP);
      var initialString = (members[k].First_Name[0]).toUpperCase() + (members[k].Last_Name[0]).toLowerCase();
      var lblinitials = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "50%",
        "id": "lblinitials" +k,
        "isVisible": true,
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
    
    var count = new Date(currentYear, selectedMonth, 0).getDate() - 1;
    //Default all No Leave Skin
   // alert(kony.apps.ess.myLeave.teamLeaveCalendarWin.weekendDates);
  	for( i = 0; i<count; i++){
     // if(kony.apps.ess.myLeave.teamLeaveCalendarWin.weekendDates.indexOf(count) > -1){
//         var lblLeaveData = new kony.ui.Label({
//               "id": "lblLeaveDataEmp"+k+"Lbl" + i,
//               "skin": "sknteamleaveFAFAFA",//grey colour,
//               "top": "0%",
//               "left": "0%",
//               "width": "2.8%",
//               "height": "100%",
//               "zIndex": 1,
//               "isVisible": true,
//               "text": "S",
//           }, {
//               "padding": [0, 0, 0, 0],
//               "marginInPixel": false,
//               "paddingInPixel": false,
//               "containerWeight": 100
//           }, {});
//         flxEmpRec.add(lblLeaveData);
//       }else{
        var lblLeaveData = new kony.ui.Label({
              "id": "lblLeaveDataEmp"+k+"Lbl" + i,
              "skin": "sknflxtabnoleave",//"sknLblNoLeave",
              "top": "0%",
              "left": "0%",
              "width": "2.8%",
              "height": "100%",
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
     // }
      
          
      
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
  
  kony.application.dismissLoadingScreen();
};
/**
 * This method fetch the images from backend.
 * @memberof TeamView
 * @param None
 * @returns null
 */
kony.apps.ess.myLeave.teamLeaveCalendarWin.prototype.fetchImageValueByMediaId = function(teamMembers) {
  try
  {
    kony.print("---- Inside fetchImageValueByMediaId ----");
    var data = teamMembers;
    if(typeof data != "undefined" && data !== null && data.length !== null && data.length > 0)
    {
      for(var i=0;i<data.length;i++)
      {
        if(data[i].Media_Id!=="")
        {
          (new kony.apps.coe.ess.myLeave.media()).fetchEmployeeImage({"mediaName":data[i].Media_Id},this.fetchImageValueByMediaIdSuccessCallback.bind(this,data[i].Media_Id),this.fetchImageValueByMediaIdErrorCallBack);  
        }
      } 
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
kony.apps.ess.myLeave.teamLeaveCalendarWin.prototype.fetchImageValueByMediaIdSuccessCallback = function(media_id, response) {
  try
  {
    alert("inside fetchImageValueByMediaIdSuccessCallback");
    kony.print("---- Inside fetchImageValueByMediaIdSuccessCallback ----");
    if(response!==null && response!=="")
    {
      if(response.length>0 && response.length<=kony.apps.coe.ess.appconfig.maxImageSizeLimit)
      {
        var data = teamMembers;
        if(typeof data != "undefined" && data !== null && data.length !== null && data.length > 0)
        {
          for(var i=0;i<data.length;i++)
          {
            if(media_id==data[i].Media_id)
            {
              data[i].imgEmpPic = {"base64":response};
              data[i].imgEmp = {"isVisible": true};
              data[i].flxInitials ={"isVisible": false};
              //kony.apps.ess.myLeave.tempData = data;
              //teamLeaveData = data;
              break;
            }
          }
        }
      }
    }else{
      alert("else  of fetchImageValueByMediaIdSuccessCallback");
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
kony.apps.ess.myLeave.teamLeaveCalendarWin.prototype.fetchImageValueByMediaIdErrorCallBack = function(error) {
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