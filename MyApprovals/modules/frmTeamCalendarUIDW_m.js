kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.frmTeamCalUiDW = function(){
  
};


var currentDateDW = new Date();
var currentYearDW = currentDateDW.getFullYear();
var currentMonthDW = currentDateDW.getMonth();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function daysInMonthDW(month,year) {
    return new Date(year, month+1, 0).getDate();
}

kony.apps.coe.ess.frmTeamCalUiDW.prototype.fillDays = function(){
  frmTeamCalendar.lblCurrentMonthAndYear.text = months[currentMonthDW]+" "+currentYearDW;
  var noOfDaysInMonth= daysInMonthDW(currentMonthDW,currentYearDW);
  var startDate= new Date(currentYearDW,currentMonthDW,1);
  var endDate=new Date(currentYearDW,currentMonthDW,noOfDaysInMonth);
  var startDay=startDate.getDate();
  var endDay=endDate.getDate();
  var day;
  var between=[];
  for(var j=startDay;j<=endDay;j++){
      startDate = new Date(currentYearDW,currentMonthDW,j);  
  	  var startDateStr = startDate.toString();
  	  var arr = [];
  	  arr = startDateStr.split(" ");
      arr[0] = arr[0].substring(0,arr[0].length-1);
  	  var finalDate = arr[0]+"\n"+startDate.getDate();
      between.push(finalDate);
  }
  frmTeamCalendar.flxDates.removeAll();
        for(var i = 0; i<between.length; i++){
          var flxGenDate;
          if(noOfDaysInMonth===31){
          flxGenDate = new kony.ui.FlexContainer({
                "id" : "flxGenDate" + i,
				"top" : "0%",
				"left" : i*3.23+"%",
				"width" : "3.23%",
				"height" : "100%",
				"zIndex" : 1,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
         }, {
                "padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
            }, {});
          }
          else if(noOfDaysInMonth===30){
             flxGenDate = new kony.ui.FlexContainer({
                "id" : "flxGenDate" + i,
				"top" : "0%",
				"left" : i*3.34+"%",
				"width" : "3.34%",
				"height" : "100%",
				"zIndex" : 1,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
         }, {
                "padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
            }, {});
          }
          else{
            flxGenDate = new kony.ui.FlexContainer({
                "id" : "flxGenDate" + i,
				"top" : "0%",
				"left" : i*3.57+"%",
				"width" : "3.57%",
				"height" : "100%",
				"zIndex" : 1,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
         }, {
                "padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
            }, {});
          }
          frmTeamCalendar.flxDates.add(flxGenDate);
          if(between[i].search("Sa")>=0 || between[i].search("Su")>=0){
          frmTeamCalendar["flxGenDate"+i].skin="sknFlxfafafaBoRightAndBottomDW";
          }
          else{
          frmTeamCalendar["flxGenDate"+i].skin="sknFlxffffffBoRightAndBottomDW";
          }
          frmTeamCalendar.flxDates.forceLayout();
          frmTeamCalendar.flxTeamCalendar.forceLayout();
          frmTeamCalendar.flxMain.forceLayout();
          frmTeamCalendar.forceLayout();
      var lblDate = new kony.ui.Label({
              "id": "lblDate"+i,
              "skin": "sknLbl666a81FS10pxDW",
              "left": "4%",
              "top": "30%",
              "width": "100%",
              "height": kony.flex.USE_PREFFERED_SIZE,
              "zIndex": 1,
              "isVisible": true,
              "text": between[i],
          }, {
              "contentAlignment": constants.CONTENT_ALIGN_CENTER,
              "padding": [0, 0, 0, 0],
              "marginInPixel": false,
              "paddingInPixel": false,
              "containerWeight": 100
          }, {});
          frmTeamCalendar["flxGenDate"+i].add(lblDate);
          frmTeamCalendar["flxGenDate"+i].forceLayout();
          frmTeamCalendar.flxDates.forceLayout();
          frmTeamCalendar.flxTeamCalendar.forceLayout();
          frmTeamCalendar.flxMain.forceLayout();
          frmTeamCalendar.forceLayout();
    }
  var x=59;
  frmTeamCalendar.flxDetails.removeAll();
  for(var k=0; k<(between.length); k++){
     var flxDownDetails;
          if(noOfDaysInMonth===31){
          flxDownDetails = new kony.ui.FlexContainer({
                "id" : "flxDownDetails" + k,
				"top" : "0%",
                "left" : k*3.23+"%",
				"width" : "3.23%",
				"height" : "100%",
				"zIndex" : 1,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
         }, {
                "padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
            }, {});
          }
          else if(noOfDaysInMonth===30){
             flxDownDetails = new kony.ui.FlexContainer({
                "id" : "flxDownDetails" + k,
				"top" : "0%",
				"left" : k*3.34+"%",
				"width" : "3.34%",
				"height" : "100%",
				"zIndex" : 1,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
         }, {
                "padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
            }, {});
          }
          else{
            flxDownDetails = new kony.ui.FlexContainer({
                "id" : "flxDownDetails" + k,
				"top" : "0%",
				"left" : k*3.57+"%",
				"width" : "3.57%",
				"height" : "100%",
				"zIndex" : 1,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
         }, {
                "padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
            }, {});
          }
    frmTeamCalendar.flxDetails.add(flxDownDetails);
     if(between[k].search("Sa")>=0 || between[k].search("Su")>=0){
          frmTeamCalendar["flxDownDetails"+k].skin="sknFlxfafafaBoRightDW";
          }
          else{
          frmTeamCalendar["flxDownDetails"+k].skin="sknFlxffffffBoRightDW";
          }
   frmTeamCalendar.flxDetails.forceLayout();
   frmTeamCalendar.flxTeamCalendar.forceLayout();
   frmTeamCalendar.flxMain.forceLayout();
   frmTeamCalendar.forceLayout();
    var flxHorLine = new kony.ui.FlexContainer({
                "id" : "flxHorLine" + k,
                "skin" : "sknFlxd3d3d3DotLineDW",
				"top" : x+"px",
                "left" : "0%",
				"width" : "100%",
				"height" : "1px",
				"zIndex" : 3,
				"isVisible" : true,
				"clipbounds" : true,
				"layoutType" : kony.flex.FREE_FORM
         }, {
                "padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
            }, {});
    frmTeamCalendar.flxDetails.add(flxHorLine);
    frmTeamCalendar.flxDetails.forceLayout();
    frmTeamCalendar.flxTeamCalendar.forceLayout();
    frmTeamCalendar.flxMain.forceLayout();
    frmTeamCalendar.forceLayout();
    x=x+59;
  }
};