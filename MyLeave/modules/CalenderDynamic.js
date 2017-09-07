kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.Reusable = kony.apps.coe.Reusable || {};
kony.apps.coe.Reusable.calendar = kony.apps.coe.Reusable.calendar || {};
kony.apps.coe.Reusable.calendar.HelperFunction = kony.apps.coe.Reusable.calendar.HelperFunction || {};

/*
class calendar_widget constructor
month_param 					- This is the month on which the calendar need to be intialized
year_param	 					- This is the year on which the calendar need to be intialized
Flex_name						- This represents the name of the flex which contains the calendar Elements
cell_skin						- This is the default cell skin of the cell in the calendar(the type of skin need to be specified was of type FLEXCONTAINER).
cell_focus_skin					- This is the default cell focus skin in the calander(the type of skin need to be specified was of FLEXCONTAINER).
calendarFlex_skin				- This is the default cell skin of the cell in the calendar(the type of skin need to be specified was of type FLEXCONTAINER).
monthFlex_skin					- This is the skin for the header in which shows the months of the calendar(The skin need to be specified was of type FLEXCONTAINER)
monthBTN_Skin_param				- This is the month header skin of the calendar(the type of skin need to be specified was of type BUTTON).
monthBTN_FocusSkin_param		- This is the month header foucs skin of the  calendar(the type of skin need to be specified was of type BUTTON).
weekLabel_skin					- This is the label  skin of the week days  in the calendar(the type of skin need to be specified was of type LABEL).
label_skin_BelongMonth			- This is the default label  skin of the cell in the calendar when it belongs to the month(the type of skin need to be specified was of type BUTTON).
label_skin_NotBelongMonth		- This is the default label  skin of the cell in the calendar when it does not belongs to the month(the type of skin need to be specified was of type
BUTTON).
isValidMonthandYearforCalendarCallBackFunction- This is the callback function where it has the parameters (month, year) which represents the calneder is chainging to the \
parameters 	month and year this must return true or false by the user defined logic so that the calender widget may not be navigated to the month and year of the function parameters. the month value ranges from (0 to 11)
errorcallbackIsValidMonthandYearCallBackFunction-This is callback function when the isValidMonthandYearforCalender returns false this is executed

onswipeCallBackFunction			- This is the call back fucntion for the onswipe callback which give you to excute  any actions to be peformed on swipe of the calendar widget
the method must contain the three parameters which are equivalent to the
onTouchEndCallBackFuntion		- This is the call Back function for the ontouch end callback which give you a paramater containg the data of the cell he clicked on so the
method must  contain the one parameter
callbackMonthChangeFunction		- This is the call back function to update the single month of the calendar eg: if a user swipe left or right one month calendar is newly added to the
calendar widget to change calendar for that month the callback function must have 3 parameters
.MONTH(this param repersents the newly added month to the calendar),YEAR(this param repersents the newly added Year to the calendar),calendarIndex(this param repersents the newly added month to the calendar index ).

callbackRefershTotalcalendarFucntion - This function is nothing but the client logic need to be performed with the total change in month and year of
the calendar. this method must contain the two params month(which reperesents the new month) and Year(which represents new Year)

//Method Description

This constructor creates the required ui Components in the calendar Widget

 */
kony.apps.coe.Reusable.calendarWIDGET = function(month_param, year_param, Flex_name, cell_skin, cell_focus_skin, calendarFlex_skin, monthFlex_skin, monthBTN_Skin_param, monthBTN_FocusSkin_param, weekLabel_skin, label_skin_BelongMonth, label_skin_NotBelongMonth, isValidMonthandYearforCalendarCallBackFunction, errorcallbackIsValidMonthandYearCallBackFunction, onswipeCallBackFunction, onTouchEndCallBackFuntion, callbackMonthChangeFunction_param, callbackRefershTotalcalendarFucntion_param) {
    this.month = month_param;
    this.year = year_param;
    this.data = [];
    this.cellSkin = cell_skin;
    this.cellFocusSkin = cell_focus_skin;
    this.calendarFlexSkin = calendarFlex_skin;
    this.labelSkinBelongsINmonth = label_skin_BelongMonth;
    this.labelSkinNotBelongsINmonth = label_skin_NotBelongMonth;
    this.currentFlex = 1;
    this.FLEXCOUNT = 3;
    this.calendarROWS = 5;
    this.WeekStartDay = 1;
    this.MonthData = [];
    this.MONTHHEADERCOUNT = 5;
    this.monthBTN_FocusSkin = monthBTN_FocusSkin_param;
    this.monthBTN_Skin = monthBTN_Skin_param;
    this.callbackMonthChangeFunction = callbackMonthChangeFunction_param;
    this.callbackRefershTotalcalendarFucntion = callbackRefershTotalcalendarFucntion_param;
    this.errorcallbackIsValidMonthandYearCallBackFunction = errorcallbackIsValidMonthandYearCallBackFunction;
    this.isValidMonthandYearforCalendarCallBackFunction = isValidMonthandYearforCalendarCallBackFunction;
    //Initalization of the data  json in the calendar widget
    for (var i = 0; i < this.FLEXCOUNT; i++) {
        this.data[i] = {
            "MONTH": "",
            "YEAR": "",
            "calendarDATA": "",
            "FLEXINDEX": "",
            "HOLIDAYS": ""
        };
        this.data[i].FLEXINDEX = i;
    }
    //Initialization of the month data
    for (var i = 0, diff = -1; i < this.MONTHHEADERCOUNT; i++, diff++) {
        this.MonthData[i] = {
            "MONTH": "",
            "YEAR": "",
            "BUTTONINDEX": i
        };
    }
    //creation of the total calendar widget that contains the month flex and week flex and the calendar flexs
    var basicconfig_Main = {
        "id": Flex_name,
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "100%",
        "zIndex": 1,
        "skin": calendarFlex_skin,
        "isVisible": true,
        "clipBounds": true,
        "layoutType": kony.flex.FLOW_VERTICAL
    };
    this.calendarWidget = new kony.ui.FlexContainer(basicconfig_Main, {}, {});
    //creation of the month header flex
    var basicconfig = {
        "id": "MONTHFLEXCONTAINER",
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "11.92%",
        "zIndex": 1,
        "skin": monthFlex_skin,
        "isVisible": true,
        "clipBounds": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL
    };
    this.MONTHFLEX = new kony.ui.FlexContainer(basicconfig, {}, {});
    this.calendarWidget.add(this.MONTHFLEX);
    //Monthflex created with UI for desktopWeb
    //#ifdef desktopweb
    this.calendarWidget.remove(this.MONTHFLEX);
    //#endif
    var monthcalendarHeaderWidth = 100 / this.MONTHHEADERCOUNT - 3;
    for (var i = 0; i < this.MONTHHEADERCOUNT; i++) {
        var lblBasic = {
            "id": "BTNMONTHHEADER" + i,
            "top": "0%",
            "left": "3%",
            "centerY": "50%",
            "zIndex": 1,
            "width": monthcalendarHeaderWidth + "%",
            "height": "80%",
            "isVisible": true,
            "skin": monthBTN_Skin_param,
            "focusSkin": monthBTN_FocusSkin_param,
            "text": "",
            "onClick": function() {
                var buttonIndexValue = arguments[0].id.replace("BTNMONTHHEADER", "");
                for (var i = 0; i < this.MONTHHEADERCOUNT; i++) {
                    if (buttonIndexValue == this.MonthData[i].BUTTONINDEX) {
                        updateToMonth = this.MonthData[i].MONTH;
                        updateToYear = this.MonthData[i].YEAR;
                        break;
                    }
                }
                this.setMonthandYear(updateToMonth, updateToYear);
            }.bind(this)
        };
        this[lblBasic.id] = new kony.ui.Button(lblBasic, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": false,
            "containerWeight": 80,
            "padding": [1, 1, 1, 1],
            "paddingInPixel": false,
            "margin": [0, 1, 1, 1],
            "marginInPixel": false,
            "displayText": true,
            "contentAlignment": constants.CONTENT_ALIGN_CENTER
        }, {});
        this.MONTHFLEX.add(this[lblBasic.id]);
    }
    //creation of the Week Flex with the coressponding week days
    var basicconfig = {
        "id": "WEEKFLEXCONTAINER",
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "8.5%",
        "zIndex": 1,
        "skin": calendarFlex_skin,
        "isVisible": true,
        "clipBounds": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL
    };
    //#ifdef desktopweb
    basicconfig.top = "3.5%";
    basicconfig.height = "20dp";
    //#endif
    this.weeekFlex = new kony.ui.FlexContainer(basicconfig, {}, {});
    this.calendarWidget.add(this.weeekFlex);
    for (var i = 0, day = this.WeekStartDay; i < 7; i++, day++) {
        day = day % 7;
        var lblBasic = {
            "id": "LBLWEEKDAY" + day,
            "top": "0%",
            "left": "3%",
            "centerY": "50%",
            "zIndex": 1,
            "width": "11.28%",
            "height": "100%",
            "isVisible": true,
            "skin": weekLabel_skin,
            "focusSkin": "weekLabel_skin",
            "text": kony.apps.coe.Reusable.calendar.HelperFunction.retriveDayName(day).substr(0, 3)

        };
        var lblLayout = {};
        //#ifdef desktopweb
        lblBasic.left = "0%";
        lblBasic.width = "14.28%";
        lblLayout = { "contentAlignment": constants.CONTENT_ALIGN_CENTER };
        //#endif
        var label_Week = new kony.ui.Label(lblBasic, lblLayout, {});
        this.weeekFlex.add(label_Week);
    }
    //creation of flex containg three flexs
    var basicconfig_Main = {
        "id": "DYNAMICCALNEDERWIDGETFLEX",
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "80.39%%",
        "zIndex": 1,
        "skin": calendarFlex_skin,
        "isVisible": true,
        "clipBounds": true,
        "layoutType": kony.flex.FREE_FORM
    };
    //#ifdef desktopweb
    basicconfig_Main.height = "90%";
    //#endif
    this.mainFlex_name = new kony.ui.FlexContainer(basicconfig_Main, {}, {});
    this.calendarWidget.add(this.mainFlex_name);
    for (var calendarIndex = 0; calendarIndex < (this.FLEXCOUNT); calendarIndex++) {
        var basicconfig_calendar = {
            "id": "",
            "top": "0%",
            "left": "0%",
            "width": "100%",
            "height": "100%",
            "zIndex": 1,
            "skin": calendarFlex_skin,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM
        };
        var middle = parseInt((this.FLEXCOUNT - 1) / 2);
        basicconfig_calendar.left = ((calendarIndex - middle) * 100) + "%";
        basicconfig_calendar.id = "calendarMONTHFLEX" + calendarIndex;
        this[basicconfig_calendar.id] = new kony.ui.FlexContainer(basicconfig_calendar, {}, {});
        this[basicconfig_calendar.id].setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
            fingers: 1
        }, function OnSwipeFunction(myWidget, gestureInfo, context) {
            if (gestureInfo.swipeDirection == 2) {
                var shiftingmonthdetails = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.month, this.year, -1);
                if (isValidMonthandYearforCalendarCallBackFunction(shiftingmonthdetails.MONTH, shiftingmonthdetails.YEAR)) {
                    var InsertedcalendarDetails = this.rightShift();
                    this.callbackMonthChangeFunction.call(this, InsertedcalendarDetails.MONTH, InsertedcalendarDetails.YEAR, InsertedcalendarDetails.calendarIndex);
                } else {
                    this.errorcallbackIsValidMonthandYearCallBackFunction.call(this);
                }
            } else if (gestureInfo.swipeDirection == 1) {
                var shiftingmonthdetails = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.month, this.year, 1);
                if (isValidMonthandYearforCalendarCallBackFunction(shiftingmonthdetails.MONTH, shiftingmonthdetails.YEAR)) {
                    var InsertedcalendarDetails = this.leftShift();
                    this.callbackMonthChangeFunction.call(this, InsertedcalendarDetails.MONTH, InsertedcalendarDetails.YEAR, InsertedcalendarDetails.calendarIndex);
                } else {
                    this.errorcallbackIsValidMonthandYearCallBackFunction.call(this);
                }
            }
            this.MonthDataConstructorIntializate();
            onswipeCallBackFunction.call(this, myWidget, gestureInfo, context)
        }.bind(this));
        var basicconfig_cell = {
            "id": "",
            "top": "-13.66%",
            "left": "0%",
            "width": "14.29%",
            "height": "16.65%",
            "zIndex": 1,
            "isVisible": true,
            "skin": this.cellSkin,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM
        };
        //#ifdef desktopweb
        basicconfig_cell.top = "-13%";
        basicconfig_cell.width = "14.28%";
        basicconfig_cell.height = "18%";
        //#endif
        var basicconfig_status = {
            "id": "",
            "bottom": "0%",
            "left": "0%",
            "width": "100%",
            "height": "5.5%",
            "centerX": "50%",
            "zIndex": 2,
            "isVisible": true,
            "skin": "sknTestParam",
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM
        };
        //#ifdef desktopweb
        basicconfig_status.left = "5%";
        //#endif
        var lblBasic = {
            "id": "",
            "centerX": "50%",
            "centerY": "50%",
            "zIndex": 1,
            "width": "100%",
            "height": "100%",
            "isVisible": true,
            "skin": "sknBTN",
            "focusSkin": "sknBTN",
            "text": "1",
            "onClick": function() {
                var buttonID = arguments[0].id;
                var currentDataIndex = parseInt((this.FLEXCOUNT - 1) / 2);
                var replaceId = "LABEL" + this.data[currentDataIndex].FLEXINDEX + "INDEX";
                var index = parseInt(buttonID.replace(replaceId, ""));
                onTouchEndCallBackFuntion.call(this, this.data[currentDataIndex].calendarDATA[index]);
            }.bind(this),
        };
        var imgBasic = {
            "id": "",
            "width": kony.flex.USE_PREFERED_SIZE,
            "height": kony.flex.USE_PREFERED_SIZE,
            "right": "0%",
            "top": "70%",
            "zIndex": 5,
            "isVisible": true,
            "src": "imagedrag.png"
        };
        var topOffset = 16.66;
        var leftOffset = 14.29;
        //#ifdef desktopweb
        topOffset = 15.2;
        leftOffset = 14.28;
        //#endif
        //#ifdef desktopweb
        var flxAlignedCenter = {
            "id": "",
            "width": "62dp",
            "height": "40dp",
            "centerX": "50%",
            "centerY": "50%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "sknTestParam",
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM
        };
        var flxAlignedRight = {
            "id": "",
            "width": "90%",
            "height": "100%",
            "right": "0%",
            "centerY": "50%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "sknTestParam",
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM
        };
        var flxAlignedLeft = {
            "id": "",
            "width": "90%",
            "height": "100%",
            "left": "0%",
            "centerY": "50%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "sknTestParam",
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM
        };
        //#endif
        for (var i = 0; i < 42; i++) {
            if (i % 7 === 0) {
                basicconfig_cell.top = (parseFloat(basicconfig_cell.top.replace("%", "")) + topOffset).toString() + "%";
                basicconfig_cell.left = "0%";
                kony.print("the value of top and left in " + i + "iteration was " + basicconfig_cell.top + " and " + basicconfig_cell.left);
            } else {
                basicconfig_cell.left = (parseFloat(basicconfig_cell.left.replace("%", "")) + leftOffset).toString() + "%";
            }
            basicconfig_cell.id = "FLEXCELL" + calendarIndex + "INDEX" + i;
            basicconfig_status.id = "FLEX" + calendarIndex + "INDEX" + i;
            lblBasic.id = "LABEL" + calendarIndex + "INDEX" + i;
            imgBasic.id = "IMAGE" + calendarIndex + "INDEX" + i;
            this[basicconfig_cell.id] = new kony.ui.FlexContainer(basicconfig_cell, {}, {});
            this[basicconfig_status.id] = new kony.ui.FlexContainer(basicconfig_status, {}, {});
            this[lblBasic.id] = new kony.ui.Button(lblBasic, {
                contentAlignment: constants.CONTENT_ALIGN_CENTER
            }, {});
            //#ifdef desktopweb
            flxAlignedCenter.id = "FLEXCENTER" + calendarIndex + "INDEX" + i;
            flxAlignedRight.id = "FLEXRIGHT" + calendarIndex + "INDEX" + i;
            flxAlignedLeft.id = "FLEXLEFT" + calendarIndex + "INDEX" + i;
            this[flxAlignedCenter.id] = new kony.ui.FlexContainer(flxAlignedCenter, {}, {});
            this[flxAlignedRight.id] = new kony.ui.FlexContainer(flxAlignedRight, {}, {});
            this[flxAlignedLeft.id] = new kony.ui.FlexContainer(flxAlignedLeft, {}, {});
            this[basicconfig_cell.id].add(this[flxAlignedCenter.id]);
            this[basicconfig_cell.id].add(this[flxAlignedRight.id]);
            this[basicconfig_cell.id].add(this[flxAlignedLeft.id]);
            //#endif
            this[imgBasic.id] = new kony.ui.Image2(imgBasic, {}, {});
            this[basicconfig_cell.id].add(this[lblBasic.id]);
            //#ifndef windows8
            this[basicconfig_cell.id].add(this[imgBasic.id]);
            //#endif
            this[basicconfig_cell.id].add(this[basicconfig_status.id]);
            this[basicconfig_calendar.id].add(this[basicconfig_cell.id]);
        }
        this.mainFlex_name.add(this[basicconfig_calendar.id]);
    }
    this.DataConstructorIntializate();
    this.MonthDataConstructorIntializate();
};

/*
This method is to create the Data in the Month Header of  the calendar
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.MonthDataConstructorIntializate = function() {

    for (var i = 0, diff = -1; i < this.MONTHHEADERCOUNT; i++, diff++) {
        var monthYearKeyPair = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.month, this.year, diff)
        this.MonthData[i].MONTH = monthYearKeyPair.MONTH;
        this.MonthData[i].YEAR = monthYearKeyPair.YEAR;

    }
    this.updateMonthHeaders();
}

/*
This method is to update ui of the month data according to the change in the Monthdata memeber of the current calendar widget object
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.updateMonthHeaders = function() {

    for (var i = 0, diff = -1; i < this.MONTHHEADERCOUNT; i++, diff++) {

        var BtnHeaderId = "BTNMONTHHEADER" + this.MonthData[i].BUTTONINDEX.toString();

        this[BtnHeaderId].skin = this.monthBTN_Skin;
        this[BtnHeaderId].text = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthName(this.MonthData[i].MONTH).substr(0, 3) + " " + this.MonthData[i].YEAR.toString().substr(2, 2);

        if (this.MonthData[i].MONTH == this.month && this.MonthData[i].YEAR == this.year) {
            this[BtnHeaderId].skin = this.monthBTN_FocusSkin;
        }
    }
};

/*
This method is to create the Data in the label in the calendar cells  of the calendar Month
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.DataConstructorIntializate = function() {
    var middleFlex = parseInt((this.FLEXCOUNT - 1) / 2);

    for (var calendarIndex = middleFlex; calendarIndex < (this.FLEXCOUNT); calendarIndex++) {
        this.calendarDataIntialize(calendarIndex, kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.month, this.year, (calendarIndex - middleFlex)));
    }

    for (var calendarIndex = middleFlex - 1; calendarIndex >= 0; calendarIndex--) {
        this.calendarDataIntialize(calendarIndex, kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.month, this.year, (calendarIndex - middleFlex)));
    }
    this.updatecalendarRows();

};

/*
Method Description: This is the helper method for the DataConstructorIntializate function
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.calendarDataIntialize = function(calendarIndex, monthDetailsJson) {
    this.data[calendarIndex].MONTH = monthDetailsJson.MONTH;
    this.data[calendarIndex].YEAR = monthDetailsJson.YEAR;
    this.data[calendarIndex].calendarDATA = this.retrivemonthData(this.data[calendarIndex].MONTH, this.data[calendarIndex].YEAR, this.labelSkinBelongsINmonth, this.labelSkinNotBelongsINmonth, this.cellSkin, this.cellFocusSkin);
    this.updateUiByData(this.data[calendarIndex].calendarDATA, this.data[calendarIndex].FLEXINDEX);

};

/*
Method Description: This is the helper method for the DataConstructorIntializate function
AcessByInstance:false
 */
kony.apps.coe.Reusable.calendarWIDGET.prototype.updateUiByData = function(data, FLEXINDEX) {
    for (var i = 0; i < data.length; i++) {
        this.updateCellUiByFlexIndex(FLEXINDEX, i, data[i]);
    }
};
/*
Method Description: This is the helper method for the DataConstructorIntializate function
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.updateCellUiByFlexIndex = function(FLEXINDEX, i, data_json) {

    var id = "LABEL" + FLEXINDEX + "INDEX" + i;
    var cell_id = "FLEXCELL" + FLEXINDEX + "INDEX" + i;
    var rightAligned = "FLEXRIGHT" + FLEXINDEX + "INDEX" + i;
    var leftAligned = "FLEXLEFT" + FLEXINDEX + "INDEX" + i;
    var centerAligned = "FLEXCENTER" + FLEXINDEX + "INDEX" + i;
    var flex_id = "FLEX" + FLEXINDEX + "INDEX" + i;
    var imgid = "IMAGE" + FLEXINDEX + "INDEX" + i;

    if (this[id].text != data_json.LABEL.Day) {
        this[id].text = data_json.LABEL.Day;
    }

    if (data_json.CELL) {
        if (data_json.CELL.skin) {
            if (this[cell_id].skin != data_json.CELL.skin) {
                this[cell_id].skin = data_json.CELL.skin;
                this[cell_id].focusSkin = data_json.CELL.skin;
            }

        }
    }
    //#ifdef desktopweb
    if (data_json.CELL) {
        if (data_json.CELL.skin && data_json.CELL.align) {
            if (data_json.CELL.align === "left") {
                this[leftAligned].skin = data_json.CELL.skin;
                this[leftAligned].focusSkin = data_json.CELL.skin;
                this[rightAligned].skin = "";
                this[rightAligned].focusSkin = "";
                this[cell_id].skin = "";
                this[cell_id].focusSkin = "";
                this[centerAligned].skin = "";
                this[centerAligned].focusSkin = "";
            } else if (data_json.CELL.align === "right") {
                this[rightAligned].skin = data_json.CELL.skin;
                this[rightAligned].focusSkin = data_json.CELL.skin;
                this[leftAligned].skin = "";
                this[leftAligned].focusSkin = "";
                this[cell_id].skin = "";
                this[cell_id].focusSkin = "";
                this[centerAligned].skin = "";
                this[centerAligned].focusSkin = "";
            } else if (data_json.CELL.align === "center") {
                this[centerAligned].skin = data_json.CELL.skin;
                this[centerAligned].focusSkin = data_json.CELL.skin;
                this[leftAligned].skin = "";
                this[leftAligned].focusSkin = "";
                this[rightAligned].skin = "";
                this[rightAligned].focusSkin = "";
                this[cell_id].skin = "";
                this[cell_id].focusSkin = "";
            } else if (data_json.CELL.align === "bg") {
                this[cell_id].skin = data_json.CELL.skin;
                this[cell_id].focusSkin = data_json.CELL.skin;
                this[leftAligned].skin = "";
                this[leftAligned].focusSkin = "";
                this[rightAligned].skin = "";
                this[rightAligned].focusSkin = "";
                this[centerAligned].skin = "";
                this[centerAligned].focusSkin = "";
            }
        }
    }
    //#endif
    if (data_json.LABEL) {
        if (data_json.LABEL.skin) {
            if (this[id].skin != data_json.LABEL.skin) {
                this[id].skin = data_json.LABEL.skin;
            }

        }
    }
    if (data_json.LABEL) {
        if (data_json.LABEL.focusSkin) {
            if (this[id].focusSkin != data_json.LABEL.focusSkin) {
                this[id].focusSkin = data_json.LABEL.focusSkin;
            }

        }
    }
    if (data_json.FLEX) {
        if (data_json.FLEX.skin) {
            if (this[flex_id].skin != data_json.FLEX.skin) {
                this[flex_id].skin = data_json.FLEX.skin;
            }
        }
    }

    if (data_json.IMAGE) {
        if (this[imgid].isVisible != data_json.IMAGE.isVisible) {
            this[imgid].isVisible = data_json.IMAGE.isVisible;
        }

        if (this[imgid].src != data_json.IMAGE.src) {
            this[imgid].src = data_json.IMAGE.src;
        }

    }
};
/*
Method Description: This method is used to return the widget reference of the calendar
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.getcalendar = function() {
    return this.calendarWidget;
};

/*
Method Description: This method is used to change the cell at the index
Parameters:
calendarIndex:Represent the data index of the calendar
index		 :This represent the cell index This range from 0 to 42
data_json	 :the data_json is the json object that is similar to the {"CELL":{"skin":"FLXMOB00C6AD"},"FLEX": {"skin": "FLXMOB00C6AD"},"data": {"CellData": data.CellData,"TYPE":"LEAVE"},"IMAGE": {"isVisible": false,"src": ""}};
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.setDataAtIndex = function(calendarIndex, index, data_json) {
    var flexIndex = this.data[calendarIndex].FLEXINDEX;
    if (index < 42) {
        if (data_json.CELL.skin) {
            this.data[calendarIndex].calendarDATA[index].CELL.skin = data_json.CELL.skin;
        }
        //#ifdef desktopweb
        if (data_json.CELL.align) {
            this.data[calendarIndex].calendarDATA[index].CELL.align = data_json.CELL.align;
        }
        //#endif
        if (data_json.FLEX) {
            if (data_json.FLEX.skin) {
                this.data[calendarIndex].calendarDATA[index].FLEX.skin = data_json.FLEX.skin;
            }
        }
        if (data_json.data) {
            if (data_json.data.CellData) {
                this.data[calendarIndex].calendarDATA[index].data.CellData = data_json.data.CellData;
            }
            if (data_json.data.TYPE) {
                this.data[calendarIndex].calendarDATA[index].data.TYPE = data_json.data.TYPE;
            }

        }

        if (data_json.IMAGE) {
            if (data_json.IMAGE.isVisible) {
                this.data[calendarIndex].calendarDATA[index].IMAGE.isVisible = data_json.IMAGE.isVisible;
            }

            if (data_json.IMAGE.src) {
                this.data[calendarIndex].calendarDATA[index].IMAGE.src = data_json.IMAGE.src;
            }

        }

        if (data_json.LABEL) {
            if (data_json.LABEL.skin)
                this.data[calendarIndex].calendarDATA[index].LABEL.skin = data_json.LABEL.skin;
        }

        this.updateCellUiByFlexIndex(flexIndex, index, this.data[calendarIndex].calendarDATA[index]);

    } else {}

};
/*
Method Description: This is the helper method for the DataConstructorIntializate function and this is used to be retrive the data for the month
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.retrivemonthData = function(month, year, labelSkinBelongsINmonth, labelSkinNotBelongsINmonth, cellSkin, focusSkin) {
    var d = new Date();
    d.setDate(1);
    d.setMonth(month);
    d.setFullYear(year);

    var emptycellslength = d.getDay() - this.WeekStartDay;

    if (emptycellslength < 0) {
        emptycellslength = 7 - emptycellslength * -1;
    }

    var data = [];

    d.setDate(d.getDate() - emptycellslength);
    for (var i = 0; i <= emptycellslength - 1; i++) {
        data[i] = {
            "LABEL": {
                "Day": d.getDate().toFixed(),
                "Date": d.toDateString(),
                "isMothDay": false,
                "skin": labelSkinNotBelongsINmonth,
                "focusSkin": labelSkinNotBelongsINmonth
            },
            "FLEX": {
                "skin": cellSkin
            },
            "data": {
                "CellData": "",
                "TYPE": ""
            },
            "IMAGE": {
                "isVisible": false,
                "src": ""
            },
            "CELL": {
                "skin": cellSkin
            }
        };
        d.setDate(d.getDate() + 1);
    }

    for (var i = emptycellslength; i < 42; i++) {
        if (d.getMonth() == month) {
            data[i] = {
                "LABEL": {
                    "Day": d.getDate().toFixed(),
                    "Date": d.toDateString(),
                    "isMothDay": true,
                    "skin": labelSkinBelongsINmonth,
                    "focusSkin": focusSkin
                },
                "FLEX": {
                    "skin": cellSkin
                },
                "data": {
                    "CellData": "",
                    "TYPE": ""
                },
                "IMAGE": {
                    "isVisible": false,
                    "src": ""
                },
                "CELL": {
                    "skin": cellSkin
                }
            };

        } else {
            data[i] = {
                "LABEL": {
                    "Day": d.getDate().toFixed(),
                    "Date": d.toDateString(),
                    "isMothDay": false,
                    "skin": labelSkinNotBelongsINmonth,
                    "focusSkin": labelSkinNotBelongsINmonth
                },
                "FLEX": {
                    "skin": cellSkin
                },
                "data": {
                    "CellData": "",
                    "TYPE": ""
                },
                "IMAGE": {
                    "isVisible": false,
                    "src": ""
                },
                "CELL": {
                    "skin": cellSkin
                }
            };
        }
        d.setDate(d.getDate() + 1);
    }

    return data;
};

/*
Method Description: this is to shift the current calendar by decreasing month by -1 and adds the removed flex at the right most corner
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.leftShift = function(calendarIndex, monthDetailsJson) {
    kony.print("left shift");
    this.mainFlex_name.setEnabled(false);
    var middle = parseInt((this.FLEXCOUNT - 1) / 2);
    var removeFlexIndex = this.data[0].FLEXINDEX;
    var removeFlex_id = "calendarMONTHFLEX" + removeFlexIndex;
    var updateFlexIndex = this.data[this.FLEXCOUNT - 1].FLEXINDEX + 1;
    if (updateFlexIndex > this.FLEXCOUNT - 1) {
        updateFlexIndex = 0;
    }

    for (var i = 0; i < (this.FLEXCOUNT - 1); i++) {
        this.data[i].FLEXINDEX = this.data[i + 1].FLEXINDEX;
        this.data[i].MONTH = this.data[i + 1].MONTH;
        this.data[i].YEAR = this.data[i + 1].YEAR;
        this.data[i].FLEXINDEX = this.data[i + 1].FLEXINDEX;
        this.data[i].calendarDATA = this.data[i + 1].calendarDATA;
        this.data[i].HOLIDAYS = this.data[i + 1].HOLIDAYS;
    }

    for (var i = this.FLEXCOUNT - 2; i >= 0; i--) {
        var animation_id = "calendarMONTHFLEX" + this.data[i].FLEXINDEX;
        var animate_left = (this[animation_id].left.replace("%", "") - 100) + "%";
        this.animation(this[animation_id], animate_left, this.mainFlex_name);

    }
    var lastshiftIndex = this.FLEXCOUNT - 2;
    var insertIndex = this.FLEXCOUNT - 1;

    var next = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.data[lastshiftIndex].MONTH, this.data[lastshiftIndex].YEAR, 1);
    this.data[insertIndex].MONTH = next.MONTH;
    this.data[insertIndex].YEAR = next.YEAR;
    this.data[insertIndex].FLEXINDEX = updateFlexIndex;
    this.data[insertIndex].calendarDATA = this.retrivemonthData(next.MONTH, next.YEAR, this.labelSkinBelongsINmonth, this.labelSkinNotBelongsINmonth, this.cellSkin, this.cellFocusSkin);

    var removed = this.mainFlex_name.removeAt(0);
    this[removeFlex_id].left = (middle * 100) + "%";
    this.mainFlex_name.addAt(this[removeFlex_id], insertIndex);
    //kony.print("in the left shift removing at the index at 0" + "the flex id removed was" + removeFlex_id + "insertIndex :" + insertIndex + "removedis" + removed.id);

    kony.print("the current month was" + this.data[1].MONTH + "year" + this.data[1].YEAR);
    this.updateUiByData(this.data[insertIndex].calendarDATA, this.data[insertIndex].FLEXINDEX);
    this.month = this.data[middle].MONTH;
    this.year = this.data[middle].YEAR;
    //updating the calendar details such as no of rows and current month and current year
    this.updatecalendarRows();
    this.updateMonthAndYear();
    //this.mainFlex_name.setEnabled(true);
    return {
        "MONTH": next.MONTH,
        "YEAR": next.YEAR,
        "FLEXINDEX": updateFlexIndex,
        "calendarIndex": insertIndex
    };

};

/*
Method Description: this is to shift the current calendar by increasing month by +1and adds the removed flex at the left most corner
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.rightShift = function(calendarIndex, monthDetailsJson) {
    this.mainFlex_name.setEnabled(false);
    var middle = parseInt((this.FLEXCOUNT - 1) / 2);
    var removeFlexIndex = this.data[this.FLEXCOUNT - 1].FLEXINDEX;
    var removeFlex_id = "calendarMONTHFLEX" + removeFlexIndex;
    var updateFlexIndex = this.data[0].FLEXINDEX - 1;
    if (updateFlexIndex < 0) {
        updateFlexIndex = this.FLEXCOUNT - 1;
    }

    for (var i = this.FLEXCOUNT - 1; i > 0; i--) {

        this.data[i].FLEXINDEX = this.data[i - 1].FLEXINDEX;
        this.data[i].MONTH = this.data[i - 1].MONTH;
        this.data[i].YEAR = this.data[i - 1].YEAR;
        this.data[i].FLEXINDEX = this.data[i - 1].FLEXINDEX;
        this.data[i].calendarDATA = this.data[i - 1].calendarDATA;
        this.data[i].HOLIDAYS = this.data[i - 1].HOLIDAYS;
    }

    for (var i = 1; i < this.FLEXCOUNT; i++) {
        var animation_id = "calendarMONTHFLEX" + this.data[i].FLEXINDEX;
        var animate_left = (parseInt(this[animation_id].left.replace("%", "")) + 100) + "%";
        this.animation(this[animation_id], animate_left, this.mainFlex_name);
    }

    var lastshiftIndex = 1;
    var insertIndex = 0;

    var prev = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.data[lastshiftIndex].MONTH, this.data[lastshiftIndex].YEAR, -1);
    this.data[insertIndex].MONTH = prev.MONTH;
    this.data[insertIndex].YEAR = prev.YEAR;
    this.data[insertIndex].FLEXINDEX = updateFlexIndex;
    this.data[insertIndex].calendarDATA = this.retrivemonthData(prev.MONTH, prev.YEAR, this.labelSkinBelongsINmonth, this.labelSkinNotBelongsINmonth, this.cellSkin, this.cellFocusSkin);
    kony.print("in the right shift removing at the index" + (this.FLEXCOUNT - 1) + "the flex id removed was" + removeFlex_id + "insertIndex :" + insertIndex);
    this.mainFlex_name.removeAt(parseInt(this.FLEXCOUNT - 1));
    this[removeFlex_id].left = (middle * -100) + "%";
    this.mainFlex_name.addAt(this[removeFlex_id], insertIndex);

    this.updateUiByData(this.data[insertIndex].calendarDATA, this.data[insertIndex].FLEXINDEX);
    kony.print("the current month was" + this.data[1].MONTH + "year" + this.data[1].YEAR);
    this.month = this.data[middle].MONTH;
    this.year = this.data[middle].YEAR;
    this.updatecalendarRows();
    this.updateMonthAndYear();
    //this.mainFlex_name.setEnabled(true);
    kony.apps.coe.ess.globalVariables.isRightShift = true;
    return {
        "MONTH": prev.MONTH,
        "YEAR": prev.YEAR,
        "FLEXINDEX": updateFlexIndex,
        "calendarIndex": insertIndex
    };

};
/*
Method Description: This makes the calendar flex animation functionality
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.animation = function(calendarWidget, left, Widget_Helper) {
    kony.print("the widget animated was" + calendarWidget.id + "left" + left);

    calendarWidget.animate(
        kony.ui.createAnimation({
            "100": {
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                },
                "left": left,
            }

        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.3
        }, {
            "animationEnd": function() {
                kony.print("aniamtion end");
                Widget_Helper.setEnabled(true);
            }
        });
}

/*
Method Description: setting the calendar rows value this updates the calendarROWS value such that the (6-calendarROWS) are need not be shown
AcessByInstance:false
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.updatecalendarRows = function() {
    var middle = parseInt((this.FLEXCOUNT - 1) / 2);

    if (this.data[middle].calendarDATA[28].LABEL.isMothDay == false) {
        this.calendarROWS = 4;
    } else if (this.data[middle].calendarDATA[35].LABEL.isMothDay == false) {
        this.calendarROWS = 5;
    } else {
        this.calendarROWS = 6;
    }

};

/*
Method Description: setting the calendar rows value this updates the public fields of the objects such as  month and Year
AcessByInstance:false
 */
kony.apps.coe.Reusable.calendarWIDGET.prototype.updateMonthAndYear = function() {
    var middle = parseInt((this.FLEXCOUNT - 1) / 2);
    this.month = this.data[middle].MONTH;
    this.year = this.data[middle].YEAR;

}

/*
Method Description: setting the calendar to the required month and year
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.setMonthandYear = function(month_param, year_param) {

    var middle = parseInt((this.FLEXCOUNT - 1) / 2);

    var currentMonth = this.data[middle].MONTH;
    var currentyear = this.data[middle].YEAR;

    var diff = (year_param * 12 + month_param) - (currentyear * 12 + currentMonth);
    kony.print(diff);

    if ((diff >= -1) && (diff <= 1)) {
        if (diff == -1) {
            if (this.isValidMonthandYearforCalendarCallBackFunction(month_param, year_param)) {
                var InsertedcalendarDetails = this.rightShift();
                this.callbackMonthChangeFunction.call(this, InsertedcalendarDetails.MONTH, InsertedcalendarDetails.YEAR, InsertedcalendarDetails.calendarIndex);
            } else {
                this.errorcallbackIsValidMonthandYearCallBackFunction.call(this);
            }

        } else if (diff == 1) {
            if (this.isValidMonthandYearforCalendarCallBackFunction(month_param, year_param)) {
                var InsertedcalendarDetails = this.leftShift();
                this.callbackMonthChangeFunction.call(this, InsertedcalendarDetails.MONTH, InsertedcalendarDetails.YEAR, InsertedcalendarDetails.calendarIndex);
            } else {
                this.errorcallbackIsValidMonthandYearCallBackFunction.call(this);
            }

        } else {
            kony.print("calling function set montha and year and requesting to change to the same month and year currently displayed by calendar")
        }
    } else {

        if (diff > 1) {
            kony.print("in diff")
            var shiftingmonthdetails = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.month, this.year, (diff - 1));
            kony.print("shifting months are diff >1" + shiftingmonthdetails);
            if (this.isValidMonthandYearforCalendarCallBackFunction(month_param, year_param)) {
                this.month = shiftingmonthdetails.MONTH;
                this.year = shiftingmonthdetails.YEAR;
                this.DataConstructorIntializate();
                this.leftShift();
                this.callbackRefershTotalcalendarFucntion.call(this, this.month, this.year);
            } else {
                this.errorcallbackIsValidMonthandYearCallBackFunction.call(this);
            }

        } else if (diff < -1) {
            var shiftingmonthdetails = kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails(this.month, this.year, (diff + 1));
            kony.print("shifting months are diff <1" + shiftingmonthdetails);
            if (this.isValidMonthandYearforCalendarCallBackFunction(month_param, year_param)) {
                this.month = shiftingmonthdetails.MONTH;
                this.year = shiftingmonthdetails.YEAR;
                this.DataConstructorIntializate();
                this.rightShift();
                this.callbackRefershTotalcalendarFucntion.call(this, this.month, this.year);
            } else {
                this.errorcallbackIsValidMonthandYearCallBackFunction.call(this);
            }

        } else {
            throw "some error occured in setting the month " + month_param + "year: " + year_param;
        }
    }
    this.MonthDataConstructorIntializate();
};

/*
Method Description: This to return the index of the date at which the cell is binded to it
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.getIndexByDate = function(Date_crossCheck) {

    var middle = parseInt(((this.FLEXCOUNT - 1) / 2));
    for (var index = 0, j = this.data[middle].calendarDATA.length; index < j; index++) {
        var date_compare = new Date(this.data[middle].calendarDATA[index].LABEL.Date);

        if (parseInt((date_compare.getTime() - Date_crossCheck.getTime()) / (1000 * 24 * 3600)) == 0) {

            return index;
        }

    }
    return -1;
};

/*
Method Description: This to return the data At  the specified index
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.getCelldataAtIndex = function(index) {
    var middleindex = parseInt((this.FLEXCOUNT - 1) / 2);

    return this.data[middleindex].calendarDATA[index];

};

/*
Method Description: This to reset the calendar cell at the specified index
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.resetCellStatusAtIndex = function(index) {

    var currentDataIndex = parseInt((this.FLEXCOUNT - 1) / 2);
    var CURRENTFLEXINDEX = this.data[currentDataIndex].FLEXINDEX;
    var flex_cell_id = "FLEXCELL" + CURRENTFLEXINDEX + "INDEX" + index;
    var image_id = "IMAGE" + CURRENTFLEXINDEX + "INDEX" + index;
    this[flex_cell_id].skin = this.cellSkin;
    this[image_id].top = "70%";
    // this[flex_cell_id].opacity=1;
    var data = this.data[currentDataIndex].calendarDATA[index];
    this.setCellStatus(index, data);

};

/*
Method Description: This is used to make the cell in to the selected State by the passing the required value skins in the data_json
parameter:
index; the index of the cell to be updated
data_json:the input to the data_json is simlar to JSON object such as {"skin":"","statusSkin":"","img":"","imgVisible":"","opacity":""}
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.setCellStatus = function(index, data_json) {

    var currentDataIndex = parseInt((this.FLEXCOUNT - 1) / 2);
    var CURRENTFLEXINDEX = this.data[currentDataIndex].FLEXINDEX;

    if (data_json) {
        if (index < 42) {
            var flex_cell_id = "FLEXCELL" + CURRENTFLEXINDEX + "INDEX" + index;
            var flex_status_id = "FLEX" + CURRENTFLEXINDEX + "INDEX" + index;
            var image_id = "IMAGE" + CURRENTFLEXINDEX + "INDEX" + index;
            var btn_id = "LABEL" + CURRENTFLEXINDEX + "INDEX" + index;

            if (data_json.FLEX) {
                if (data_json.FLEX.skin) {
                    this[flex_status_id].skin = data_json.FLEX.skin;
                }

            }
            if (data_json.IMAGE) {
                if (data_json.IMAGE.src) {
                    this[image_id].src = data_json.IMAGE.src;

                }
                if (data_json.IMAGE.isVisible) {
                    this[image_id].isVisible = data_json.IMAGE.isVisible;
                }
                if (data_json.IMAGE.TOP) {
                    this[image_id].top = data_json.IMAGE.TOP;
                }

            }

            if (data_json.LABEL) {
                if (data_json.LABEL.skin) {
                    this[btn_id].skin = data_json.LABEL.skin;
                }

            }
            if (data_json.CELL) {

                if (data_json.CELL.opacity) {
                    this[flex_cell_id].opacity = data_json.CELL.opacity;
                }
                if (data_json.CELL.skin) {
                    this[flex_cell_id].skin = data_json.CELL.skin;
                }

            }

        }

    } else {}

};
/*
Method Description: This method makes  the calendar to be in blur by changing the opacity
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.SetBlurSkinning = function() {

    for (var calendarIndex = 0; calendarIndex < this.data.length; calendarIndex++) {
        var CURRENTFLEXINDEX = this.data[calendarIndex].FLEXINDEX;

        for (var i = 0; i < 42; i++) {
            var flex_cell_id = "FLEXCELL" + CURRENTFLEXINDEX + "INDEX" + i;
            this[flex_cell_id].opacity = 0.5;

        }

    }

}

/*
Method Description: this removes the blur effect for the calendar
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.ResetBlur = function() {
    for (var calendarIndex = 0; calendarIndex < this.data.length; calendarIndex++) {
        var CURRENTFLEXINDEX = this.data[calendarIndex].FLEXINDEX;

        for (var i = 0; i < 42; i++) {
            var flex_cell_id = "FLEXCELL" + CURRENTFLEXINDEX + "INDEX" + i;
            this[flex_cell_id].opacity = 1;

        }

    }

}

/*
Method Description: This reset the total calendar in to previous state which means that removing the selected states of calendar to unselected state
AcessByInstance:true
 */

kony.apps.coe.Reusable.calendarWIDGET.prototype.resetTotalcalendarUI = function() {
    for (var calendarIndex = 0; calendarIndex < this.data.length; calendarIndex++) {
        var CURRENTFLEXINDEX = this.data[calendarIndex].FLEXINDEX;
        for (var i = 0; i < 42; i++) {
            var flex_cell_id = "FLEXCELL" + CURRENTFLEXINDEX + "INDEX" + i;
            var label_id = "LABEL" + CURRENTFLEXINDEX + "INDEX" + i;
            var flex_id = "FLEX" + CURRENTFLEXINDEX + "INDEX" + i;
            var imgid = "IMAGE" + CURRENTFLEXINDEX + "INDEX" + i;

            this[flex_cell_id].opacity = 1;
            this[flex_cell_id].skin = this.cellSkin;
            this[label_id].skin = this.data[calendarIndex].calendarDATA[i].LABEL.skin;
            this[flex_id].skin = this.data[calendarIndex].calendarDATA[i].FLEX.skin;
            this[imgid].isVisible = this.data[calendarIndex].calendarDATA[i].IMAGE.isVisible;
            this[imgid].src = this.data[calendarIndex].calendarDATA[i].IMAGE.src;
            this[imgid].top = "70%";
        }

    }
};

//helper method functions for the calendar Widget

kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthDetails = function(month, year, diff) {

    var d = new Date();

    d.setDate(1);
    d.setMonth(month);
    d.setFullYear(year);

    d.setMonth(d.getMonth() + diff);

    return {
        "MONTH": d.getMonth(),
        "YEAR": d.getFullYear()
    };

    throw "something went wrong in the retriving month details";
}

// helper method to retrive the name of teh Day
kony.apps.coe.Reusable.calendar.HelperFunction.retriveDayName = function(day_param) {

    if (day_param < 7) {
        switch (day_param) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday"
            default:
                throw "some wrong input in the retrive Day Name function of calendar helper";
        }
    } else {

        throw "something went wrong in the retriving Day Name";
    }

}

kony.apps.coe.Reusable.calendar.HelperFunction.retriveMonthName = function(month_int) {

    switch (month_int) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";

        default:
            throw "some thing wrogn paramete passing in the function retrive month Name"

    }

}