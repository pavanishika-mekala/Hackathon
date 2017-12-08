kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

//%Region - Constructor
kony.apps.coe.ess.myTime.
CalendarViewUIDW = function() {
    try {
        kony.print("-- Start CalendarViewUIDW --");
        var calendarWidgetObj=null;
        kony.print("-- End CalendarViewUIDW --");
    } catch (e) {
       handleError(e);
    }
};
kony.apps.coe.ess.myTime.CalendarViewUIDW.lastDate = "";
// %Region - Methods in CalendarViewUIDW
/**
 * @class       CalendarViewUIDW
 * @type        UIz
 * @param       None
 * return       None.
 * desc         This method dynamically creates the calendar widget and adds it to the form.
 */
kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.onfrmCalendarViewInit = function() {
    try {
        kony.print("-- Start onfrmCalendarViewInit --");
        kony.apps.coe.ess.myTime.CalendarViewUIDW.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var currDate = new Date();
		calendarWidgetObj = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendarWidget", "sknFlxMobOp0", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblWeekHeaderCalendarDW", "sknLblBelongMonthClaendarDW", "sknBtnNotBelongMonthCalendarDW",this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender, this.onSwipeCallback, this.onTouchEndCallback.bind(this), this.monthRefresh, this.totalCalenderRefresh);
        frmCalendarViewDW.flxCalendarContainer.add(calendarWidgetObj.calendarWidget); 
        (new kony.apps.coe.ess.myTime.CalendarViewUIDW()).setDataToCalendar();
      }catch (e) {
       handleError(e);
    }
       	kony.print("-- End onfrmCalendarViewInit --");
};
kony.apps.coe.ess.myTime.CalendarViewUIDW.prototype.setDataToCalendar = function() {
 
      cellData = {
        "CELL": {
            "skin": "sknFlxApprovedLeftBarDW",
            "align": "right"
        },
          "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
    calendarWidgetObj.setDataAtIndex(1, 8, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxApprovedRightBarDW",
            "align": "left"
        },
          "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
    calendarWidgetObj.setDataAtIndex(1, 12, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxApprovedMiddleBarDW",
            "align": "bg"
        },
         "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
      for(var i=9;i<12;i++){
    calendarWidgetObj.setDataAtIndex(1, i, cellData);
      }
   cellData = {
        "CELL": {
            "skin": "sknFlxApprovedLeftBarDW",
            "align": "right"
        },
          "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
    calendarWidgetObj.setDataAtIndex(1, 15, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxApprovedRightBarDW",
            "align": "left"
        },
          "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
    calendarWidgetObj.setDataAtIndex(1, 19, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxApprovedMiddleBarDW",
            "align": "bg"
        },
         "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
      for(var i=16;i<19;i++){
    calendarWidgetObj.setDataAtIndex(1, i, cellData);
      }
  cellData = {
        "CELL": {
            "skin": "sknFlxpendingLeftBarDW",
            "align": "right"
        },
          "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
    calendarWidgetObj.setDataAtIndex(1, 22, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxpendingRightBarDW",
            "align": "left"
        },
          "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
    calendarWidgetObj.setDataAtIndex(1, 26, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxpendingMiddleBarDW",
            "align": "bg"
        },
         "LABEL" : {
            "skin" :"sknlblFffffffPx14DW"
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
      for(var i=23;i<26;i++){
    calendarWidgetObj.setDataAtIndex(1, i, cellData);
      }
   cellData = {
        "CELL": {
            "skin": "sknFlxDueLeftBarDW",
            "align": "right"
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
    calendarWidgetObj.setDataAtIndex(1, 29, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxDueRightBarDW",
            "align": "left"
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
    calendarWidgetObj.setDataAtIndex(1, 33, cellData);
    cellData = {
        "CELL": {
            "skin": "sknFlxDueMiddleBarDW",
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
      for(var i=30;i<33;i++){
    calendarWidgetObj.setDataAtIndex(1, i, cellData);
      }
   
};
/**
 * @class       CalendarViewUIDW
 * @type        UI
 * @param       month, year
 * return       {Boolean}.
 * desc         This method is a callback function for the calendar widget called to check whether it is a valid month and year for the calendar or not.
 */

kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.isValidMonthandYearforCalender = function(month, year) {
    try {
        kony.print("-- Start isValidMonthandYearforCalender --");
        (new kony.apps.coe.ess.myTime.CalendarViewUIDW()).generatingLastDateToAccess();
        var genratedDate = new Date(year, month).toYYYYMMDD("");
        if (genratedDate <= kony.apps.coe.ess.myTime.CalendarViewUIDW.lastDate) {
            return true;
        } else {
            try {
                // toastMessage.showToastMsg("These Timesheet are currently not available", 2000);
                alert("These Timesheet are currently not available");
            } catch (e) {
                handleError(e);

            }
            return false;
        }
        kony.print("-- End isValidMonthandYearforCalender --");
    } catch (e) {
       handleError(e);
    }
};

kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.generatingLastDateToAccess = function() {
    var date = new Date();
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
    var sd = interval[0].toYYYYMMDD("");
    var ed = interval[1].toYYYYMMDD("");
    for (var i = 0; i < kony.apps.coe.ess.globalVariables.futureTimesheets; i++) {

        interval[1].setDate(interval[1].getDate() + 1);
        interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(interval[1], new Date(date.getFullYear(), 1, 1));
    }
    kony.apps.coe.ess.myTime.CalendarViewUIDW.lastDate = interval[1].toYYYYMMDD("");
};

/**
 * @class       CalendarViewUIDW
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is an error callback function for the calendar widget.
 */
kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.errorIsValidMonthandYearforCalender = function(month, year) {
};


/**
 * @class       CalendarViewUIDW
 * @type        UI
 * @param       myWidget, gestureInfo, context
 * return       None.
 * desc         This method is a callback function for the calendar widget called on swipe.
 */
kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.onSwipeCallback = function(myWidget, gestureInfo, context) {
(new kony.apps.coe.ess.myTime.CalendarViewUIDW()).monthRefresh();
//  this.monthRefresh();
};

/**
 * @class       CalendarViewUIDW
 * @type        UI
 * @param       data
 * return       None.
 * desc         This method is a callback function for the calendar widget called on touch end.
 */
kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.onTouchEndCallback = function(data) {
  if(data.CELL.skin == "sknFlxApprovedLeftBarDW"||data.CELL.skin == "sknFlxApprovedRightBarDW"||data.CELL.skin == "sknFlxApprovedMiddleBarDW")
  {
	frmCalendarViewDW.imgDelete.setVisibility(false);
	frmCalendarViewDW.imgEdit.setVisibility(false);
    frmCalendarViewDW.imgAudit.setVisibility(true);
    frmCalendarViewDW.flxCopy.right="30px";
  }
  else 
  {
   	frmCalendarViewDW.imgDelete.setVisibility(true);
	frmCalendarViewDW.imgEdit.setVisibility(true);
    frmCalendarViewDW.imgAudit.setVisibility(false);
    frmCalendarViewDW.flxCopy.right="140px"; 
     if(data.CELL.skin == "sknFlxSavedLeftBarDW"||data.CELL.skin == "sknFlxSavedRightBarDW"||data.CELL.skin == "sknFlxSavedMiddleBarDW")
    {
    }
    else if(data.CELL.skin == "sknFlxpendingLeftBarDW"||data.CELL.skin == "sknFlxpendingRightBarDW"||data.CELL.skin == "sknFlxpendingMiddleBarDW")
    {

    }
  else if(data.CELL.skin == "sknFlxDueLeftBarDW"||data.CELL.skin == "sknFlxDueRightBarDW"||data.CELL.skin == "sknFlxDueMiddleBarDW")
    {
frmCreateViewDW.show();
    }
  }
   };
/**
 * @class       CalendarViewUIDW
 * @type        UI
 * @param       month, year, index
 * return       None.
 * desc         This method is a callback function for the calendar widget called on month refresh.
 */
kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.monthRefresh = function(month, year, index) {
    try {
        kony.print("-- Start monthRefresh --");
        kony.print("-- End monthRefresh --");
    } catch (e) {
       handleError(e);
    }
};

/**
 * @class       CalendarViewUIDW
 * @type        UI
 * @param       month, year
 * return       None.
 * desc         This method is a callback function for the calendar widget called on total calendar refresh.
 */
kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.totalCalenderRefresh = function(month, year) {
    try {
        kony.print("-- Start totalCalenderRefresh --");
        kony.print("-- End totalCalenderRefresh --");
    } catch (e) {
        handleError(e);
    }
};
kony.apps.coe.ess.myTime.CalendarViewUIDW.prototype.CopyWeekTimesheet = function() {
    kony.print("-- Start CopyWeekTimesheet --");
	var segData=["15 Jan - 19 Jan","22 Jan - 26 Jan","29 Jan - 3 Feb"];
    var selectedIndex = frmCalendarViewDW.segCopy.selectedRowIndex;
    var selectedValue = frmCalendarViewDW.segCopy.data[selectedIndex[1]];
    if (selectedValue.imgActiveInactive === "checkboxinactive.png") {
        selectedValue.imgActiveInactive = "checkboxactive.png";
        selectedValue.flxCpy={skin:"sknflxBG087da8R40DW"};
        selectedValue.lblWeek={skin:"sknlblffffffPx12AveRomanDW"};
    } else {
     	selectedValue.imgActiveInactive = "checkboxinactive.png";
      	selectedValue.flxCpy={skin:"sknflxB1Px087da8R40DW"};
      	selectedValue.lblWeek={skin:"sknlblF087da8Px12AveRomanDW"}; 
    }
    selectedValue.lblWeek.text=segData[selectedIndex[1]]; 
    frmCalendarViewDW.segCopy.setDataAt(selectedValue, selectedIndex[1], selectedIndex[0]);
    kony.print("-- End CopyWeekTimesheet --");
};


/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    Displays Leave Request Details Flex
 */
kony.apps.coe.ess.myTime.CalendarViewUIDW.calendarCellClick = function(cellData){
  	//frmCalendarViewDW.flxBGBlur.setVisibility(true);
  	//frmCalendarViewDW.flxLeaveRequestDetails.setVisibility(true);
};

kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.onCloneTimesheet=function(){
      kony.print("-- Start onCloneTimesheet --");
  if(frmCalendarViewDW.imgCopy.src == "clone.png"){
frmCalendarViewDW.flxSegCopy.setVisibility(true);
frmCalendarViewDW.imgCopy.src = "cloneselected.png";
frmCalendarViewDW.imgCopy.width = "50dp";
frmCalendarViewDW.imgCopy.height = "50dp";
frmCalendarViewDW.forceLayout();
}
else
  {
 frmCalendarViewDW.flxSegCopy.setVisibility(false);
frmCalendarViewDW.imgCopy.src = "clone.png";
frmCalendarViewDW.imgCopy.width = "25dp";
frmCalendarViewDW.imgCopy.height = "25dp";
frmCalendarViewDW.forceLayout();
  }
      kony.print("-- End onCloneTimesheet --");
};
kony.apps.coe.ess.myTime.
CalendarViewUIDW.prototype.onSelectDate=function(eventobject){
for(var i=0;i<frmCalendarViewDW.flxWeekDays.widgets().length;i++)
  {
    frmCalendarViewDW.flxWeekDays.widgets()[i].skin="sknflxB05c8afPx1DW";
    (frmCalendarViewDW.flxWeekDays.widgets()[i]).widgets()[0].skin="sknlblF05c8afPx14DW";
  }
  frmCalendarViewDW.flxWeek.skin="sknflxB05c8afPx1DW";
  frmCalendarViewDW.lblWeek.skin="sknlblF05c8afPx14DW";
  eventobject.skin="sknflxBG05c8afB05c8afR40DW";
  eventobject.widgets()[0].skin="sknlblFffffffPx14DW";
     
};
