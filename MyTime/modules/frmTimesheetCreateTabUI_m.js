/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.TimesheetCreate = kony.apps.coe.ess.myTime.TimesheetCreate || {};
kony.apps.coe.ess.myTime.nToStrTab = kony.apps.coe.ess.myTime.nToStrTab || {
  "week" : {
    "0" : "Sun",
    "1" : "Mon",
    "2" : "Tue",
    "3" : "Wed",
    "4" : "Thu",
    "5" : "Fri",
    "6" : "Sat"
  },
  "month" : {
    "0" : "Jan",
    "1" : "Feb",
    "2" : "Mar",
    "3" : "Apr",
    "4" : "May",
    "5" : "Jun",
    "6" : "Jul",
    "7" : "Aug",
    "8" : "Sep",
    "9" : "Oct",
    "10" : "Nov",
    "11" : "Dec"
  },
  "fullmonth" : {
    "0" : "January",
    "1" : "February",
    "2" : "March",
    "3" : "April",
    "4" : "May",
    "5" : "June",
    "6" : "July",
    "7" : "August",
    "8" : "September",
    "9" : "October",
    "10" : "November",
    "11" : "December"
  }
};

kony.apps.coe.ess.myTime.TimesheetHome = kony.apps.coe.ess.myTime.TimesheetHome || {};
kony.apps.coe.ess.myTime.TimesheetHome.flxTimesheetDetailsLeftSelectedIndex = "" ;
kony.apps.coe.ess.myTime.TimesheetHome.configTab = {
  editable : function () {
    frmTimesheetHome.flxTimesheetDetails.setEnabled(true);
  },

  notEditable : function () {
    frmTimesheetHome.flxTimesheetDetails.setEnabled(false);
  },

  disableSubmitBtn : function () {
    frmTimeSheetCreateTab.btnSubmit.onClick = function() {
      //toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.pleaseentertimeforallworkingdays"), 2000);
      alert(kony.i18n.getLocalizedString("i18n.ess.pleaseentertimeforallworkingdays"));
    };
    frmTimeSheetCreateTab.btnSubmit.skin="sknBtnDisableSubmit87cefa";
  },


  enableSubmitBtn : function () {
    try{
      frmTimeSheetCreateTab.btnSubmit.onClick = function() {
        try{
          kony.apps.coe.ess.myTime.TimesheetHome.onSubmitClickTab();
        }
        catch(e){
          handleCustomAlert(e.message);
        }
      };
      frmTimeSheetCreateTab.btnSubmit.skin="sknSubmitBtn4a90e2";
    }
    catch(e){
      handleCustomAlert(e.message);
    }
  }
};

/**
 * @class          TimesheetDatesSection
 * @type           Constructor
 * @param          {JsonObject} template - This is template.
 * @param          {JsonObject} parent - Parent flex.
 * @return         None.
 * @description    This is a class constructor.
 */
kony.apps.coe.ess.myTime.
TimesheetDatesSectionTab = function (template, parent) {
  this._data = null;
  this._template = template;
  this._parent = parent;
  this._selectedItem = null;
  this.labelDataMap = null;
  this._onSelectionCallback = null;

};

kony.apps.coe.ess.myTime.TimesheetDatesSectionTab.getCurrentTimesheetData = function (dateObj) {
  var startdate;
  var data;
  var sd,ed;
  var sdMon,edMon;
  if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "weekly") {
    startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj)[0].previousWeekInterval(0)[0];
    data = [];
    for (var i = 0; i <= 1; i++) {
      sd = new Date(Date.parse(startdate) + i * 604800000);
      ed = new Date(Date.parse(sd) + 518400000);
      sdMon=kony.apps.coe.ess.myTime.nToStr.month[sd.getMonth()];  
      edMon=kony.apps.coe.ess.myTime.nToStr.month[ed.getMonth()];   
      data.push({
        displayValue: sd.getDate()+" "+sdMon + " - " + ed.getDate()+" "+edMon,
        startDate : sd,
        endDate : ed
      });
    }
    return data;
  } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "biweekly") {
    startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.biWeekly(dateObj, new Date((new Date()).getFullYear(), 1, 1))[0].previousWeekInterval(0)[0];
    data = [];
    for (var i = 0; i <= 2; i++) {
      sd = new Date(Date.parse(startdate) + i * 604800000);
      ed = new Date(Date.parse(sd) + 518400000);
      sdMon = kony.apps.coe.ess.myTime.nToStr.month[sd.getMonth()];  
      edMon = kony.apps.coe.ess.myTime.nToStr.month[ed.getMonth()];   

      data.push({
        displayValue: sd.getDate()+" "+sdMon + " - " + ed.getDate()+" "+edMon,
        startDate : sd,
        endDate : ed
      });
    }
    return data;
  } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "monthly") {
    var sdedm = kony.apps.coe.ess.myTime.TimesheetDatesInterval.monthly(dateObj);
    startdate = sdedm[0].thisWeekInterval(0)[0];
    var enddate = sdedm[1].thisWeekInterval(0)[1];
    var nweeks = (Date.parse(enddate) - Date.parse(startdate)) / 604800000;
    data = [];
    for (var i = 0; i < nweeks; i++) {
      sd = new Date(Date.parse(startdate) + i * 604800000);
      ed = new Date(Date.parse(sd) + 518400000);
      data.push({
        displayValue : "week " + (i + 1),
        startDate : sd,
        endDate : ed
      });
    }
    return data;
  }
};

/**
 * @class          TimesheetDatesSection
 * @type           static variable.
 * @description    This contains label skins informations.
 */
kony.apps.coe.ess.myTime.
TimesheetDatesSectionTab.skin = {
  "selected" : "sknLblMobOp100Bg2EBAEFFcFFFFFF",
  "unselected" : "sknLblMobFC333333Op100FS34pxBor1pxRad100"
};

/**
 * @class          TimesheetDatesSection
 * @type           prototype function.
 * @param          {function} callback - A callback fuction which will be called
 *                 when we will call setSelectedItem.
 * @return         None.
 * @description    This method set the callback function for that instance.
 */
kony.apps.coe.ess.myTime.
TimesheetDatesSectionTab.prototype.setOnSelectionCallback = function (callback) {
  //frmTimeSheetCreateTab.flxTimeLine.removeAll();
  if (callback !== null && typeof(callback) === "function") {
    this._onSelectionCallback = callback;
  }
};

/**
 * @class          TimesheetDatesSection
 * @type           prototype function.
 * @param          {Array} data - contains the the data which will be shown in date section and timeline rows.
 * @return         None.
 * @description    This method set data in dates section.
 */

kony.apps.coe.ess.myTime.
TimesheetDatesSectionTab.prototype.setData = function (data) {
  var temp,left=18;
  if (data === null || !Array.isArray(data) || data.length <= 0) {
    return;
  }

  this._parent.removeAll();

  this._data = data;
  for (var i = 0; i < this._data.length; i++) {
    //#ifndef windows8 
    temp = this._template.clone(i);
    //#else
    if(i===1)left=0;
    left+=2;
    temp = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerY": "50%",
      "clipBounds": true,
      "height": "70%",
      "id": "flxDateInDateSection"+i,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": left+"%",
      "skin": "slFbox",
      "width": "13%",
      "zIndex": 1
    }, {}, {});
    temp.setDefaultUnit(kony.flex.DP);
    var lblSelectionDate = new kony.ui.Label({
      "centerY": "50%",
      "height": "98%",
      "id": "lblSelectionDate"+i,
      "isVisible": true,
      "left": "1%",
      "skin": "sknWlblBluBorder",
      "text": "1 Jan-5 Jan",
      "top": "1%",
      "width": "98%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    temp.add(lblSelectionDate);
    //#endif
    temp.onClick = function (index) {
      this.setSelectedItem(index);
      //frmTimesheetHome.flxBlock.isVisible = false;
    }
      .bind(this, i);
    temp.widgets()[0].text = this._data[i][this.labelDataMap];
    //#ifndef windows8
    temp.widgets()[0].skin = kony.apps.coe.ess.myTime.TimesheetDatesSectionTab.skin.unselected;
    //#else
    temp.widgets()[0].skin =sknWlbl90Dbluelbl;
    //#endif
    this._parent.add(temp);


  }
  this._selectedItem = null;

};

/**
 * @class          TimesheetDatesSection
 * @type           prototype function.
 * @param          {Number} index - This contains index value.
 * @return         None.
 * @description    This method set selected item variable of class.
 *                 This method change the skin of item according to index.
 *                 This method make a call to callback function passing
 *                 data set as a parameter corresponding to index.
 */
kony.apps.coe.ess.myTime.
TimesheetDatesSectionTab.prototype.setSelectedItem = function (index) {
  index = parseInt(index);
  kony.apps.coe.ess.myTime.TimesheetHome.flxTimesheetDetailsLeftSelectedIndex = "" ;
  frmTimeSheetCreateTab.flxTimeLine.removeAll();
  if (isNaN(index) || (this._selectedItem !== null && index === parseInt(this._selectedItem))) {
    return;
  }
  var presel = this._selectedItem;
  this._selectedItem = index;
  var flx = this._parent.widgets()[index];
  var lbl = flx.widgets()[0];
  //#ifndef windows8
  lbl.skin = kony.apps.coe.ess.myTime.TimesheetDatesSectionTab.skin.selected;
  //#else
  lbl.skin=sknWlblBluBorder;
  //#endif
  if (presel !== null && presel !== this._selectedItem) {
    flx = this._parent.widgets()[presel];
    lbl = flx.widgets()[0];
    //#ifndef windows8
    lbl.skin = kony.apps.coe.ess.myTime.TimesheetDatesSectionTab.skin.unselected;
    //#else
    lbl.skin =sknWlbl90Dbluelbl;
    //#endif

  }
  if (this._onSelectionCallback !== null) {
    this._onSelectionCallback(this.getSelectedItemData());
  }
};

kony.apps.coe.ess.myTime.
TimesheetDatesSectionTab.prototype.invokeCallback = function () {
  if (this._onSelectionCallback !== null) {
    this._onSelectionCallback(this.getSelectedItemData());
  }
};

/**
 * @class          TimesheetDatesSection
 * @type           prototype function.
 * @param          None
 * @return         {JsonObject} - Data corresponding to selectedItem.
 * @description    This method return data corresponding to selected Item.
 */
kony.apps.coe.ess.myTime.
TimesheetDatesSectionTab.prototype.getSelectedItemData = function () {
  if (this._selectedItem !== null && this._data !== null && this._selectedItem < this._data.length) {
    return this._data[this._selectedItem];
  } else {
    return null;
  }
};

/**
 * @class          TimesheetRow
 * @param          None.
 * @return         None.
 * @description    This method take input of string and replace all the '_' with space(' ').
 */
kony.apps.coe.ess.myTime.
TimesheetRowTab = function () {
  this._selectedItem = null;
  this._onSelectionCallbackRight = null;
  this._data = null;
};
//kony.apps.coe.ess.myTime.TimesheetRow.Tab = kony.apps.coe.ess.myTime.TimesheetRow.Tab || {};

kony.apps.coe.ess.myTime.
TimesheetRowTab.prototype.getSelectedItemData = function () {
  if (this._selectedItem !== null && this._data !== null && this._selectedItem < this._data.length) {
    return this._data[this._selectedItem];
  } else {
    return null;
  }
};

kony.apps.coe.ess.myTime.
TimesheetRowTab.prototype.setSelectedItem = function (index, isLeft) {
  index = parseInt(index);
  if (isNaN(index)) {
    return;
  }
  this._selectedItem = index;
  if (this._onSelectionCallbackRight !== null && !isLeft) {
    this._onSelectionCallbackRight(this.getSelectedItemData());
  }
};

kony.apps.coe.ess.myTime.
TimesheetRowTab.prototype.setOnSelectionCallbackRight = function (callback) {
  if (callback !== null && typeof(callback) === "function") {
    this._onSelectionCallbackRight = callback;
  }
};

/**
 * @class       TimesheetRow
 * @type        class function
 * @param       {String} idSuffix - This value will be added in the widgets id as suffix.
 * @param       {JsonObject} data - It contains all the data which needs to show in widgets.
 * @param       {String} daystatus - It contains the infomation about the day, according
 *              to wich all the skins and UI related thing will be managed.
 * return       {FlexContainer} - It return a prepaired flex widgets,
 *              which is according to idSuffix, data, daystatus.
 * desc         this function is used to get a row instance for timesheet form.
 */
//kony.apps.coe.ess.myTime.TimesheetRow.getRowInstance kony.apps.coe.ess.myTime.TimesheetRow.Tab.getRowInstance
kony.apps.coe.ess.myTime.TimesheetRowTab.getRowInstance= function (idSuffix, data, daystatus, weekends, timesheetstartdate, timesheetenddate) {
  function minutesToTimeFormat(min) {
    function makeItTwoDigit(x) {
      return x < 10 ? "0" + x : x;
    }
    return makeItTwoDigit(parseInt(min / 60)) + ":" + makeItTwoDigit(parseInt(min % 60));
  }

  try {
    var starttimeline = 8;
    var endtimeline = 16;
    var dateobj = new Date(data.date);
    var day = kony.apps.coe.ess.myTime.nToStr.week[dateobj.getDay()].toUpperCase();
    var date = parseInt(dateobj.getDate());
    var month = kony.apps.coe.ess.myTime.nToStr.month[dateobj.getMonth()].toUpperCase();

    for (var i = 0; i < data.tasks.length; i++) {
      var x = data.tasks[i].starttime.getHours() + (data.tasks[i].starttime.getMinutes() / 60);
      if (x < starttimeline) {
        starttimeline = x;
      }
      x = data.tasks[i].endtime.getHours() + (data.tasks[i].endtime.getMinutes() / 60);
      if (x > endtimeline) {
        endtimeline = x;
      }
    }
    starttimeline = Math.floor(starttimeline);
    endtimeline = Math.ceil(endtimeline);
    kony.print("-> calculated min and max value of time time for date: " + data.date);
    var sizeofhours = kony.apps.generalizeWidthInDp(28);
    var totalhuors = endtimeline - starttimeline + 1;
    var widthoftimeline = (sizeofhours * totalhuors) + "dp";

    /*var flxTimesheetDetailsRow = new kony.ui.FlexContainer({
				id : "flxTimesheetDetailsRow" + idSuffix,
				left : "0%",
				top : "0%",
				height : "14.4%",
				width : "100%",
				clipBounds : true,
				layoutType : kony.flex.FLOW_HORIZONTAL,
				zIndex : "1"
			}, {
				padding : [0, 0, 0, 0]
			}, {});*/
    var flxTimesheetDetailsLeft = new kony.ui.FlexContainer({
      id : "flxTimesheetDetailsLeft" + idSuffix,
      left : "0%",
      top : "0%",
      height : "100%",
      width : "14.5%",
      clipBounds : true,
      layoutType : kony.flex.FREE_FORM,
      zIndex : "1"
    }, {
      padding : [0, 0, 0, 0]
    }, {});
    var lblLeftDay = new kony.ui.Label({
      id : "lblLeftDay" + idSuffix,
      text : day,
      //centerX : "50%",
      left:"15.8%",
      //top : "10%",
      top:"16%",
      width : "100%",
      height : "preferred",
      zIndex : "1"
    }, {
      padding : [0, 0, 0, 0]
      //contentAlignment : constants.CONTENT_ALIGN_CENTER
    }, {});

    var lblLeftDate = new kony.ui.Label({
      id : "lblLeftDate" + idSuffix,
      text : "" + parseInt(date),
      //centerX : "50%",
      //centerY : "50%",
      left:"15.8%",
      bottom:"8%",
      //	width : "44.4%",
      //	height : "41.2%",
      width:"preferred",
      height:"preferred",
      zIndex : "1"
    }, {
      padding : [0, 0, 0, 0]
      //contentAlignment : constants.CONTENT_ALIGN_CENTER
    }, {});

    var lblLeftMonth = new kony.ui.Label({
      id : "lblLeftMonth" + idSuffix,
      text : month,
      right:"10%",
      //centerX : "50%",
      //bottom : "10%",
      bottom: "11%",
      //width : "100%",
      //height : "preferred",
      width: "preferred",
      height: "preferred",
      zIndex : "1"
    }, {
      padding : [0, 0, 0, 0]
      //contentAlignment : constants.CONTENT_ALIGN_CENTER
    }, {});

    flxTimesheetDetailsLeft.add(lblLeftDay);
    flxTimesheetDetailsLeft.add(lblLeftDate);
    flxTimesheetDetailsLeft.add(lblLeftMonth);

    /*var flxTimesheetDetailsRight = new kony.ui.FlexContainer({
				id : "flxTimesheetDetailsRight" + idSuffix,
				left : "0%",
				top : "0%",
				height : "100%",
				width : "83.1%",
				clipBounds : true,
				layoutType : kony.flex.FREE_FORM,
				zIndex : "1"
			}, {
				padding : [0, 0, 0, 0]
			}, {});

		var flxTimesheetDetailsRightTimeline = new kony.ui.FlexScrollContainer({
				id : "flxTimesheetDetailsRightTimeline" + idSuffix,
				left : "1.9%",
				top : "8.6%",
				height : "82.8%",
				width : "96.2%",
				clipBounds : true,
				layoutType : kony.flex.FLOW_VERTICAL,
				scrollDirection : kony.flex.SCROLL_HORIZONTAL,
				allowVerticalBounce : false,
				allowHorizontalBounce : false,
				horizontalScrollIndicator : false,
				verticalScrollIndicator : false,
				bounces : false,
				zIndex : "1"
			}, {
				padding : [0, 0, 0, 0]
			}, {});

		var flxTimesheetDetailsRightTimelineHeader = new kony.ui.FlexContainer({
				id : "flxTimesheetDetailsRightTimelineHeader" + idSuffix,
				left : "0%",
				top : "0%",
				height : "35.2%",
				width : widthoftimeline,
				clipBounds : true,
				layoutType : kony.flex.FLOW_HORIZONTAL,
				zIndex : "1"
			}, {
				padding : [0, 0, 0, 0]
			}, {});
*/
    if (data.tasks !== null && data.tasks !== undefined && data.tasks.length > 0) {
      kony.print("-> entering in a for loop for creating timeline header");
      for (var i = starttimeline; i <= endtimeline; i++) {
        var ampmtime = "";
        if (i === 0 || i === 24) {
          ampmtime = "12 AM";
        } else if (i < 12) {
          ampmtime = i + " AM";
        } else if (i > 12) {
          ampmtime = i % 12 + " PM";
        } else {
          ampmtime = "12 PM";
        }}}/*
				var flxTimesheetDetailsRightHour = new kony.ui.FlexContainer({
						id : "flxTimesheetDetailsRightHour" + idSuffix + i,
						left : "0%",
						top : "0%",
						height : "100%",
						width : sizeofhours + "dp",
						clipBounds : true,
						layoutType : kony.flex.FREE_FORM,
						zIndex : "1"
					}, {
						padding : [0, 0, 0, 0]
					}, {});

				var lblTimesheetHour = new kony.ui.Label({
						id : "lblTimesheetHour" + idSuffix + i,
						text : ampmtime,
						top : "0%",
						centerX : "50%",
						width : "preferred",
						height : "preferred",
						skin : "sknLblMobFC333333Op100FS18px",
						contentAlignment : constants.CONTENT_ALIGN_CENTER,
						zIndex : "1"
					}, {
						padding : [0, 0, 0, 0]
					}, {});

				var flxTimesheetHourMark = new kony.ui.FlexContainer({
						id : "flxTimesheetHourMark" + idSuffix + i,
						bottom : "0%",
						height : "35%",
						width : "2px",
						centerX : "50%",
						clipBounds : true,
						skin : "sknFlxMobBG979797Op100",
						zIndex : "1"
					}, {
						padding : [0, 0, 0, 0]
					}, {});
				flxTimesheetDetailsRightHour.add(lblTimesheetHour);
				flxTimesheetDetailsRightHour.add(flxTimesheetHourMark);
				flxTimesheetDetailsRightTimelineHeader.add(flxTimesheetDetailsRightHour);
			}
		}

		flxTimesheetDetailsRightTimeline.add(flxTimesheetDetailsRightTimelineHeader);

		var flxTimesheetDetailsRightTimelineAllTasks = new kony.ui.FlexContainer({
				id : "flxTimesheetDetailsRightTimelineAllTasks" + idSuffix,
				left : "0%",
				top : "0%",
				height : "64.8%",
				width : widthoftimeline,
				clipBounds : true,
				layoutType : kony.flex.FREE_FORM,
				zIndex : "1"
			}, {
				padding : [0, 0, 0, 0]
			}, {});*/

    var perminfactor = sizeofhours / 60;
    if (data.tasks !== null && data.tasks !== undefined && data.tasks.length > 0) {
      for (var i = 0; i < data.tasks.length; i++) {
        var duration = (Date.parse(data.tasks[i].endtime) - Date.parse(data.tasks[i].starttime)) / 60000;
        var left = ((data.tasks[i].starttime.totalMinutesFromMorning() - starttimeline * 60) * perminfactor + (sizeofhours / 2)) + "dp";
        var width = (perminfactor * duration) + "dp";
        var skin = "";
        if (data.tasks[i].isBillable === true || String(data.tasks[i].isBillable) === "1") {
          skin = "sknFlxMobBg2D86E2Op80";
        } else {
          skin = "sknFlxMobBg1C7393Op80";
        }
      }
      /*	var flxTimesheetDetailsRightTimelineTask = new kony.ui.FlexContainer({
						id : "flxTimesheetDetailsRightTimelineTask" + idSuffix + i,
						left : left,
						top : "2%",
						height : "98%",
						width : width,
						clipBounds : true,
						skin : skin,
						layoutType : kony.flex.FREE_FORM,
						zIndex : "1"
					}, {
						padding : [0, 0, 0, 0]
					}, {});

				var lblTimesheetDetailsTimelineTaskName = new kony.ui.Label({
						id : "lblTimesheetDetailsTimelineTaskName" + idSuffix + i,
						text : data.tasks[i].taskname,
						top : "10%",
						centerX : "50%",
						width : "preferred",
						height : "preferred",
						skin : "sknLblMobFCFFFFFFFS71",
						contentAlignment : constants.CONTENT_ALIGN_CENTER,
						zIndex : "1"
					}, {
						padding : [0, 0, 0, 0]
					}, {});

				var lblTimesheetDetailsTimelineTaskDuration = new kony.ui.Label({
						id : "lblTimesheetDetailsTimelineTaskDuration" + idSuffix + i,
						text : minutesToTimeFormat(duration),
						bottom : "10%",
						centerX : "50%",
						width : "preferred",
						height : "preferred",
						skin : "sknLblMobFCFFFFFFFS64",
						contentAlignment : constants.CONTENT_ALIGN_CENTER,
						zIndex : "1"
					}, {
						padding : [0, 0, 0, 0]
					}, {});

				if (daystatus == "0") {
					flxTimesheetDetailsRightTimelineTask.skin = "sknFlxMob00C6AE100O";
				}
				flxTimesheetDetailsRightTimelineTask.add(lblTimesheetDetailsTimelineTaskName);
				flxTimesheetDetailsRightTimelineTask.add(lblTimesheetDetailsTimelineTaskDuration);
				flxTimesheetDetailsRightTimelineAllTasks.add(flxTimesheetDetailsRightTimelineTask);

			}
		}

		flxTimesheetDetailsRightTimeline.add(flxTimesheetDetailsRightTimelineAllTasks);

		flxTimesheetDetailsRight.add(flxTimesheetDetailsRightTimeline);
		flxTimesheetDetailsRow.add(flxTimesheetDetailsLeft);
		flxTimesheetDetailsRow.add(flxTimesheetDetailsRight);

		//      Skins assignment according to data.*/
    }
    if (daystatus == "0") {
      flxTimesheetDetailsLeft.skin = "sknFlxMob00C6AE100BorDDDDDD1px100";
      lblLeftDate.skin = "sknLblMobFCFFFFFF34px";
      lblLeftDay.skin = "sknLblMobFCFFFFFF20px";
      lblLeftMonth.skin = "sknLblMobFCFFFFFF18px";

      /*if (data.tasks.length > 0) {
				flxTimesheetDetailsRight.skin = "sknMobFlx61D8CA100OBorDDDDDD1px100O";
			}*/
    } else {

      //flxTimesheetDetailsLeft.skin = "sknFlxMobBGF8F8F8Op100BorDDDDDD";
      flxTimesheetDetailsLeft.skin = "sknflxBGd8d8d8";
      if (weekends[dateobj.toYYYYMMDD("")] !== undefined) {
        lblLeftDate.skin = "sknLblMobFC333333Op50FS34px";
        lblLeftDay.skin = "sknLblMobFC777777Op50FS20px";
        lblLeftMonth.skin = "sknLblMobFC777777Op50FS18px";
      } else {
        lblLeftDay.skin = "sknLblMobFC777777Op100FS20px";
        lblLeftMonth.skin = "sknLblMobFC777777Op100FS18px";
      }
      if (data.tasks.length > 0) {
        lblLeftDate.skin = "sknLblMobOp100Bg2EBAEFFcFFFFFF";
      }
      //flxTimesheetDetailsRight.skin = "sknFlxMobBGF8F8F8Op100BorDDDDDD";
      //} else {
      //flxTimesheetDetailsRight.skin = "sknFlxMobBgFFFFFFBorCDDDDDD";
      //}
      /*if ((timesheetstartdate <= data.date && data.date <= timesheetenddate) && (daystatus === "5" || daystatus === "-1" || daystatus === "1" || daystatus === "6")) {
				flxTimesheetDetailsLeft.onClick = function (index) {
					this._selectedItem = index;
					if (frmTimesheetHome.flxBlock.isVisible) {
						frmTimesheetHome.flxBlock.isVisible = false;
					} else {
						// 						var index = JSON.stringify(flxTimesheetDetailsLeft.id);
						// 						index = index.slice(24, index.length - 1);
						index = parseInt(index);
						var top = 0;
						top = top + (index * 14.4);

						if (index > 0) {
							top = top - 2.5;
						}
						frmTimesheetHome.flxClonePopup.top = top + "%";
						frmTimesheetHome.flxBlock.isVisible = true;
						kony.apps.coe.ess.globalVariables.dateToBeCloned = data.date;
					}

				}
				.bind(this, idSuffix);*/
      if ((timesheetstartdate <= data.date && data.date <= timesheetenddate) && (daystatus === "5" || daystatus === "-1" || daystatus === "1" || daystatus === "6")){
        flxTimesheetDetailsLeft.onClick = function(index){
          index = parseInt(index);
          kony.apps.coe.ess.myTime.TimesheetHome.flxTimesheetDetailsLeftSelectedIndex = index;
          this._selectedItem = index;
          kony.apps.coe.ess.myTime.TimesheetCreate.AddTimelineToFormTab(index);
          flxTimesheetDetailsLeft.skin="sknTabFlxLoginignBlue";
          frmTimeSheetCreateTab.btnStep1.skin="sknBtn1c7393";
          frmTimeSheetCreateTab.btnStep1.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.Step1");
          frmTimeSheetCreateTab.lblSelectTask.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.selectaTask");
          frmTimeSheetCreateTab.btnStep2.skin="sknBtn1c7393Px36";
          refreshAndShowTimesheetCreateTabForm();
          flxTimesheetDetailsLeft.skin="sknTabFlxLoginignBlue";
          frmTimeSheetCreateTab.flxSelectedLeave.isVisible = false;
          frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.isVisible = false;
          frmTimeSheetCreateTab.txtBoxSearch.setVisibility(true);
          frmTimeSheetCreateTab.imgCancel.setVisibility(true);
          frmTimeSheetCreateTab.segTasks.isVisible = true;
        
        }.bind(this, idSuffix);
      }
    }

    /*if ((timesheetstartdate <= data.date && data.date <= timesheetenddate) && (daystatus === "5" || daystatus === "-1" || daystatus === "1" || daystatus === "6")) {
			flxTimesheetDetailsRightTimeline.setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
				fingers : 1,
				taps : 1
			}, 
			    function (index) {
				this.setSelectedItem(index, false);
			}
				.bind(this, idSuffix));
		}*/
    //return flxTimesheetDetailsRow;
    return flxTimesheetDetailsLeft;
  } catch (err) {
    handleError(err);
  }
};

/**
 * @class       TimesheetRow
 * @type        class prototype
 * @param       {JsonObject} data - It contains all the data which needs to show in widgets.
 * return       None.
 * desc         This prototype is used to create dynamic rows and populate data in them.
 */
kony.apps.coe.ess.myTime.
TimesheetRowTab.prototype.setData = function (data, timesheetstartdate, timesheetenddate) {
  var successCallback = function (res) {
    var weekends = {};
    for (var i = 0; i < res.length; i++) {
      weekends[res[i].Date] = "";
    }
    this._data = data;
    frmTimeSheetCreateTab.flxTimesheetDetails.removeAll();
    for (var i = 0; i < data.length; i++) {
      var temp = kony.apps.coe.ess.myTime.TimesheetRowTab.getRowInstance.call(this, i, this._data[i], this._data[i].daystatus, weekends, timesheetstartdate, timesheetenddate);
      if(kony.apps.coe.ess.myTime.TimesheetHome.flxTimesheetDetailsLeftSelectedIndex === i){
        temp.skin = "sknTabFlxLoginignBlue";
      }
      frmTimeSheetCreateTab.flxTimesheetDetails.add(temp);
    }
  }
  .bind(this);
  var query = "select h.Holiday_Date as Date from Holiday h where h.Type = '3';";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, function (err) {
    handleError(err);
  });

};

kony.apps.coe.ess.myTime.TimesheetHomeCloneTab = {
  hideAllPopups : function(){
    frmTimesheetHome.flxBlock.isVisible=false;
    frmTimesheetHome.flxBlank.isVisible=false;
    frmTimesheetHome.flxHomePopupClone.isVisible=false;
    frmTimesheetHome.flxHomePopupCloneSuccessful.isVisible=false;
    frmTimesheetHome.flxHomePopupClone1.isVisible=false;
    frmTimesheetHome.flxHomePopupCloneSuccessful1.isVisible=false;
  },
  onPopupClickRowOne : function(){
    kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
    frmTimesheetHome.flxBlank.isVisible=true;
    frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
    frmTimesheetHome.flxHomePopupClone.isVisible=true;
  },
  onPopupClickRowTwo : function(){
    kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
    frmTimesheetHome.flxBlank.isVisible=true;
    frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
    frmTimesheetHome.flxHomePopupClone1.isVisible=true;
  },
  ViewSuccessPopupHome : function(){
    kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
    frmTimesheetHome.flxBlank.isVisible=true;
    frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
    frmTimesheetHome.flxHomePopupCloneSuccessful.isVisible=true;
  },
  ViewSuccessPopupHome1 : function(){
    kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
    frmTimesheetHome.flxBlank.isVisible=true;
    frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
    frmTimesheetHome.flxHomePopupCloneSuccessful1.isVisible=true;
    refreshTimesheetHomeForm();
  },
  onClickHomePopupCloneSuccessfulOk :  function(){
    kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
  },
  CloneLastTimeEntry : function () {
    kony.application.showLoadingScreen("", "Cloning Timeline", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
    kony.apps.coe.ess.myTime.TimesheetCreate.Clone.isTimeEntryExistForDate(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObjTab.getSelectedItemData().date.previousDay(), function (res) {
      if(res === true)   {       		
        kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimelineFromLastEntry(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObjTab.getSelectedItemData().date, function()  {
          kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
          refreshTimesheetHomeForm();
          kony.application.dismissLoadingScreen();
          toastMessage.showToastMsg("Task successfully cloned", 2000);
        }, function(err) {kony.application.dismissLoadingScreen();handleError(err);});
      }
      else if(res === false) {
        kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
        kony.application.dismissLoadingScreen();
        toastMessage.showToastMsg("No Task for cloning", 2000);
      }
    },  function (err){handleError(err);});
  },
  cloneFromLastWeek : function () {
    kony.application.showLoadingScreen("", "Cloning Timesheet", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObjTab.getSelectedItemData().date, new Date(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObjTab.getSelectedItemData().date.getFullYear(), 1, 1));
    kony.apps.coe.ess.myTime.TimesheetCreate.Clone.isTimeEntryExistForTimesheet(interval[0].previousDay(), function(res) {
      if(res === true) {
        kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneFromLastTimesheet(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObjTab.getSelectedItemData().date, function() {
          kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
          refreshTimesheetHomeForm();
          kony.application.dismissLoadingScreen();
          toastMessage.showToastMsg("Task successfully cloned", 2000);
        }, function(err) {kony.application.dismissLoadingScreen();handleError(err);});
      }
      else if(res === false){
        kony.apps.coe.ess.myTime.TimesheetHomeCloneTab.hideAllPopups();
        kony.application.dismissLoadingScreen();
        toastMessage.showToastMsg("No Task for cloning", 2000);
      }
    }, function(err){handleError(err);});
  }
};

kony.apps.coe.ess.myTime.submitTimesheetTab = function () {
  var dataItem = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionTabObj.getSelectedItemData();
  var contextData = {};
  if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig === kony.apps.coe.ess.constants.WEEKLY) {

    contextData.timesheetId = dataItem.timesheetId;
    contextData.displayValue = dataItem.startDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dataItem.startDate.getMonth()] + " - " +
      dataItem.endDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dataItem.endDate.getMonth()];
  } else {
    contextData = dataItem;
    var data = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTimesheetHome").getContextData();
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(data); 
    contextData.startDate = interval[0];
    contextData.endDate = interval[1];
    contextData.displayValue = dataItem.startDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dataItem.startDate.getMonth()] + " - " +
      dataItem.endDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dataItem.endDate.getMonth()];
  }
  showTimesheetReviewForm(contextData);
  //   kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId="TIMESHEET1";
  //   (new kony.apps.coe.ess.myTime.ViewTimeSheet()).showViewTimeSheetForm();
};

kony.apps.coe.ess.myTime.TimesheetCreate.AddTimelineToFormTab= function(index) {
  var task;
  var data=kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.contextData;
  for(var i=0;i<data.length;i++){
    if(i===index){
      task=(data[i].tasks);
    }
  }
  var ProjectTaskId=[];
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
    var final = "" + hour;
    if (min > 0) {
      final += "." + makeItTwoDigits(min);
    }
    if (isPM) {
      final += " PM";
    } else {
      final += " AM";
    }
    return final;
  }
  var tempdata = [];
  // if((tasks !== undefined && tasks !== null && tasks.length) > 0 && (tasks.starttime!==undefined)){
  for (var i = 0; i < task.length; i++) {
    tempdata.push({
      Project_Task_Id: task[i].Project_Task_Id,
      TimeType_Id: task[i].TimeType_Id,
      Time_Entry_Id: task[i].timeentry_id,
      Start_Time: convertHoursMinutesForTimeline(task[i].starttime.getHours(), task[i].starttime.getMinutes()),
      End_Time: convertHoursMinutesForTimeline(task[i].endtime.getHours(), task[i].endtime.getMinutes()),
      Task_Name: task[i].taskname,
      isBillable: task[i].isBillable,
      Project_Task_Type: task[i].Project_Task_Type,
      Desc: task[i].Desc,
      Time_Line_Status: null
    });
    if (oldestTaskHour > task[i].starttime.getHours()) {
      oldestTaskHour = task[i].starttime.getHours();
    }
  }
  if(tempdata===[] || tempdata.length<1)
  {
    frmTimeSheetCreateTab.segDetailsSelectedTask.setVisibility(false);
  }
  if (oldestTaskHour == 24) {
    kony.apps.coe.Reusable.TimelineCreationTab.initialScrollHour = "9 AM";
  } else {
    kony.apps.coe.Reusable.TimelineCreationTab.initialScrollHour = convertHoursMinutesForTimeline(oldestTaskHour, 0);
  }
  // }
  preshowfrmhomeTab();
  /*  for(var j=0;j<data.length;j++){
      if(j===index){
        for(var k=0;k<task.length;k++){
      ProjectTaskId.push(task[j].Project_Task_Id);
        }
      alert(JSON.stringify(ProjectTaskId));
      }

    }*/
  frmTimeSheetCreateTab.flxTimeLine.removeAll();
  var slider = new kony.apps.coe.Reusable.TimelineCreationTab();
  slider.drawSliderUITab(frmTimeSheetCreateTab.flxTimeLine, 12, 12);
  slider.setCallback(kony.apps.coe.ess.myTime.TimesheetCreate.Slider.onStartEditing,
                     kony.apps.coe.ess.myTime.TimesheetCreate.Slider.onDoneEditing);
  // kony.apps.coe.ess.myTime.TimesheetCreate.setDataToSegTaskDetails(task);
  frmTimeSheetCreateTab.show();
  slider.storeCoordinatesOfTimeLineTab();
  slider.fillTimelineTab(tempdata);
  /*frmTimeSheetCreateTab.postShow = function() {
        slider.storeCoordinatesOfTimeLine();
        slider.fillTimeline(tempdata);
    };*/
};

kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfLeaveTimeTypeTab = function(selectedItem) {
  try{
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateLeaveName(selectedItem.Id);
    kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName(selectedItem.Name);
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Project_Task_Id = null;
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Task_Name = selectedItem.Name;
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Project_Task_Type = null;
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Desc = "";
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.TimeType_Id = selectedItem.Id;

  }
  catch(e){
    handleError(e.message);
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskTab = function (selectedTask) {

  if (kony.apps.coe.Reusable.TimelineCreationTab.isSliderEmpty) {
    frmTimeSheetCreateTab.segTasks.selectedRowIndex = null;
    return;
  }	
  function updateSelectedTask() {
    var arr = kony.ds.read(kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.RecentTasksIdForKonyStore);
    if (arr === null) {
      arr = [selectedTask.Project_Task_Id];
    } else if (arr.length < 5) {
      var ind = arr.indexOf(selectedTask.Project_Task_Id);
      if (ind >= 0) {
        arr.splice(ind, 1);
      }
      arr.push(selectedTask.Project_Task_Id);
    } else {
      var ind = arr.indexOf(selectedTask.Project_Task_Id);
      if (ind >= 0) {
        arr.splice(ind, 1);
        arr.push(selectedTask.Project_Task_Id);
      } else {
        arr.shift();
        arr.push(selectedTask.Project_Task_Id);
      }
    }
    kony.ds.save(arr, kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.RecentTasksIdForKonyStore);
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Project_Task_Id = selectedTask.Project_Task_Id;
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Project_Task_Type = selectedTask.Project_Task_Type;
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateProjectTaskName(selectedTask.Project_Task_Id);
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateTimeType(null);
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateActivityDesc(null);
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfigTab.showSelectedTaskTimeType();
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfigTab.showTimeType();
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfigTab.scrollDownToShowSelectedTask();
  }
  function success(res) {
    if (res !== undefined && res !== null && res.length <= 0) {
      kony.apps.coe.ess.MVVM.createRecord("MYTIME", "Project_Task", temp, function (res) {
        kony.print("project_Task inserted Successfully");
        if (selectedTask.backendDataTab.hasOwnProperty('Project')) {
          kony.apps.coe.ess.MVVM.createRecord("MYTIME", "Project", selectedTask.backendDataTab.Project[0], function (res) {
            kony.print("project inserted Successfully");
          }, function (err) {
            handleError(err);
          });
          delete selectedTask.backendDataTab.Project;
        }
        if (selectedTask.backendDataTab.hasOwnProperty('Task')) {
          kony.apps.coe.ess.MVVM.createRecord("MYTIME", "Task", selectedTask.backendDataTab.Task[0], function (res) {
            kony.print("Task inserted Successfully");
          }, function (err) {
            handleError(err);
          });
          delete selectedTask.backendDataTab.Task;
        }
        updateSelectedTask();
        kony.apps.coe.ess.globalVariables.isOnlineSearch = false;
      }, function (err) {
        handleError(err);
      });
      kony.apps.coe.ess.globalVariables.isOnlineSearch = false;
    } else {
      updateSelectedTask();
    }
  }
  if (kony.apps.coe.ess.globalVariables.isOnlineSearch) {
    selectedTask.backendData.Employee_Id = kony.apps.coe.ess.globalVariables.employeeId;
    selectedTask.backendData.User_Id = (kony.apps.coe.ess.frmLogin.username).trim().toUpperCase();
    var temp = JSON.parse(JSON.stringify(selectedTask.backendData));
    if (temp.hasOwnProperty('Project')) {
      delete temp.Project;
    }
    if (temp.hasOwnProperty('Task')) {
      delete temp.Task;
    }
    var query = "select id from Project_Task where id = '" + temp.id + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function (res) {
      handleError(res);
    });
  } else {
    updateSelectedTask();
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab = {

  updateLeaveName: function(id) {
    frmTimeSheetCreateTab.lblSelectedLeave.text = "";
    if (id === null || id === undefined || id === "") {
      return;
    }

    function success(res) {
      //             alert("updateTimeType" + JSON.stringify(res));
      for (var i = 0; i < res.length; i++) {
        frmTimeSheetCreateTab.lblSelectedLeave.text = res[i].Name;
        break;
      }
    }
    var query = "select tt.Name as Name from Time_Type tt where tt.ID = '" + id + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
      handleError(res);
    });
  },

  updateProjectTaskName: function(Project_Task_Id) {
    frmTimeSheetCreateTab.lblSelectedTaskName.text = "";
    frmTimeSheetCreateTab.lblActivityId.text = "";
    frmTimeSheetCreateTab.lblSelectedProjectName.text = "";
    frmTimeSheetCreateTab.lblCostCenterId.text = "";

    frmTimeSheetCreateTab.lblCostCenter.text = "";
    frmTimeSheetCreateTab.lblSummaryActivityId.text = "";
    frmTimeSheetCreateTab.lblActivityName.text = "";
    if (Project_Task_Id === null || Project_Task_Id === undefined || Project_Task_Id === "") {
      return;
    }

    function successCallback(res) {

      if(res === null || res.length <= 0) {
        frmTimeSheetCreateTab.lblSelectedProjectName.text = "" + Project_Task_Id.toString().titleCase();
        //kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchPopup();
        //kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchButton();
        return;
      }
      var Project_Id = "";
      var Task_Id = "";
      for (var i = 0; i < res.length; i++) {
        Project_Id = res[i].Project_Id;
        Task_Id = res[i].Task_Id;
      }

      if (Task_Id !== null && Task_Id !== undefined && Task_Id !== "") {
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", "select t.Task_Name as name, t.Type as type from Task t where t.Id = '" + Task_Id + "';",
                                              function(res) {
          for (var i in res) {
            kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName(res[i].name);
            kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Task_Name = res[i].name;
            frmTimeSheetCreateTab.lblSelectedTaskName.text = res[i].name;
            frmTimeSheetCreateTab.lblActivityId.text = res[i].type + " - " + String(Task_Id).replace(res[i].type, "");
            frmTimeSheetCreateTab.lblSummaryActivityId.text = res[i].type + " - " + String(Task_Id).replace(res[i].type, "");
            break;
          }
        },
                                              function(res) {
          handleError(res);
        });
      } else {
        frmTimeSheetCreateTab.lblSelectedTaskName.text = "";
        frmTimeSheetCreateTab.lblActivityId.text = "";
        frmTimeSheetCreateTab.lblSummaryActivityId.text = "-";
      }
      if (Project_Id !== null && Project_Id !== undefined && Project_Id !== "") {
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", 
                                              "select p.Project_Name as name, p.Project_Type as type from Project p where p.Id = '" + Project_Id + "';",
                                              function(res) {
          for (var i in res) {
            if (Task_Id === null || Task_Id === undefined || Task_Id === "") {
              kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName(res[i].name);
              kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Task_Name = res[i].name;
            }
            frmTimeSheetCreateTab.lblSelectedProjectName.text = res[i].name.toString().titleCase();
            frmTimeSheetCreateTab.lblActivityName.text = res[i].name.toString().titleCase();
            frmTimeSheetCreateTab.lblCostCenterId.text = res[i].type + " - " + String(Project_Id).replace(res[i].type, "");
            frmTimeSheetCreateTab.lblCostCenter.text = res[i].type + " - " + String(Project_Id).replace(res[i].type, "");
            break;
          }
        },
                                              function(res) {
          handleError(res);
        });
      } else {
        frmTimeSheetCreateTab.lblSelectedProjectName.text = "";
        frmTimeSheetCreateTab.lblCostCenterId.text = "";
        frmTimeSheetCreateTab.lblCostCenter.text = "";
      }
    }
    var query = "select pt.Project_Id as Project_Id, pt.Task_Id as Task_Id from Project_Task pt where pt.ID = '" + Project_Task_Id + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, function(res) {
      handleError(res);
    });

  },

  updateTimeType: function(id) {
    frmTimeSheetCreateTab.lblSelectedTaskTimeType.text = "";
    frmTimeSheetCreateTab.lblActivityTimeType.text = "";
    if (id === null || id === undefined || id === "") {
      return;
    }

    function success(res) {
      //             alert("updateTimeType" + JSON.stringify(res));
      for (var i = 0; i < res.length; i++) {
        frmTimeSheetCreateTab.lblSelectedTaskTimeType.text = res[i].Name;
        frmTimeSheetCreateTab.lblActivityTimeType.text = res[i].Name;
        frmTimeSheetCreateTab.flxOuterTask.setVisibility(false);
        frmTimeSheetCreateTab.flxTaskSummary.setVisibility(true);
        frmTimeSheetCreateTab.flxAddDesc.setVisibility(false);
        break;
      }
    }
    var query = "select tt.Name as Name from Time_Type tt where tt.ID = '" + id + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
      handleError(res);
    });
  },

  updateActivityDesc: function(time_entry_id) {
    frmTimeSheetCreateTab.tbxSelectedTaskDescription.text = "";
    if (time_entry_id === null || time_entry_id === undefined || time_entry_id === "") {
      return;
    }

    function success(res) {
      //             alert("updateActivityDesc" + JSON.stringify(res));
      for (var i = 0; i < res.length; i++) {
        frmTimeSheetCreateTab.tbxSelectedTaskDescription.text = res[i].Desc;
        break;
      }
    }
    var query = "select te.Project_Task_id as Project_Task_Id, te.Time_Type_Id as Time_Type_Id, te.Activity_Description as Desc from Time_Entry te where te.ID = '" + time_entry_id + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
      handleError(res);
    });
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.isLeaveTimeTypeTab = function(time_type_id, callback, data) {
  if (time_type_id === null || time_type_id === undefined) {
    callback(false, data);
    return;
  }

  function success(res) {
    if (res === null || res === undefined || res.length <= 0) {
      callback(false, data);
      return;
    }
    callback(true, data);
  }
  var query = "select tt.ID, ttc.ID as Time_Type_Category_Id from Time_Type tt left join Time_Type_Category ttc on tt.Time_Type_Category_Id=ttc.id where ttc.Type='ABSENT' AND tt.ID='" + time_type_id + "';";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
    handleError(res);
  });
};

kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfigTab = {

  flxScrTimeTypeGestureId: null,

  showTasks: function(data) {
    frmTimeSheetCreateTab.flxSelectedLeave.isVisible = false;
    frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.isVisible = false;
    frmTimeSheetCreateTab.segTasks.isVisible = true;
  },

  showSelectedTaskTimeType: function(data) {
    // frmTimeSheetCreateTab.flxProjectTaskSelection.isVisible = false;
    //frmTimeSheetCreate.flxSelectedLeave.isVisible = false;
    frmTimeSheetCreateTab.segTasks.isVisible = false;
    frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.isVisible = true;
  },

  showSelectedLeave: function() {
    frmTimeSheetCreateTab.segTasks.isVisible = false;
    frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.isVisible = false;
    frmTimeSheetCreateTab.flxSelectedLeave.isVisible = true;
  },

  OnClickFlxScrollUp: function() {
    //#ifdef android 
    frmTimeSheetCreate.flxScrTimeType.contentOffset = {
      x: "0%",
      y: frmTimeSheetCreate.flxSelectedTask.height
    };

    frmTimeSheetCreate.flxScrollUp.isVisible = false;
    frmTimeSheetCreate.imgScrollUp.isVisible = false;
    frmTimeSheetCreate.flxScrollDown.isVisible = true;
    frmTimeSheetCreate.imgScrollDown.isVisible = true;
    //#endif
  },
  OnClickFlxScrollDown: function() {
    //#ifdef android
    frmTimeSheetCreate.flxScrTimeType.contentOffset = {
      x: "0%",
      y: "0%"
    };
    frmTimeSheetCreate.flxScrollDown.isVisible = false;
    frmTimeSheetCreate.imgScrollDown.isVisible = false;
    frmTimeSheetCreate.flxScrollUp.isVisible = true;
    frmTimeSheetCreate.imgScrollUp.isVisible = true;
    //#endif
  },
  scrollDownToShowSelectedTask: function() {
    //#ifdef tabrcandroid
    //frmTimeSheetCreate.flxScrollDown.isVisible = false;
    //frmTimeSheetCreate.imgScrollDown.isVisible = false;
    //frmTimeSheetCreate.flxScrollUp.isVisible = true;
    //frmTimeSheetCreate.imgScrollUp.isVisible = true;
    //#endif

    //#ifdef ipad
    if (!frmTimeSheetCreateTab.flxTimeType.isVisible) {
      return;
    }
    if (this.flxScrTimeTypeGestureId !== null) {
      frmTimeSheetCreateTab.flxScrTimeType.removeGestureRecognizer(this.flxScrTimeTypeGestureId);
    }
    frmTimeSheetCreateTab.flxScrTimeType.contentOffset = {
      x: "0%",
      y: "0%"
    };
    this.flxScrTimeTypeGestureId = frmTimeSheetCreateTab.flxScrTimeType.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
      fingers: 1,
      swipedistance: 40,
      swipevelocity: 50
    }, function(commonWidget, gestureInfo, context) {
      if (gestureInfo.swipeDirection === 3) {
        kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollUpToHideSelectedTask();
      }
    });
    //#endif
  },
  scrollUpToHideSelectedTask: function() {
    //#ifdef iphone
    // if (!frmTimeSheetCreate.flxTimeType.isVisible) {
    //   return;
    // }
    frmTimeSheetCreateTab.flxScrTimeType.contentOffset = {
      x: "0%",
      y: frmTimeSheetCreateTab.flxSelectedTask.height
    };
    if (this.flxScrTimeTypeGestureId !== null) {
      frmTimeSheetCreateTab.flxScrTimeType.removeGestureRecognizer(this.flxScrTimeTypeGestureId);
    }
    //#endif 
  },
  onSegmentBeginnning : function(){
    // //#ifdef iphone
    //#ifdef ipad
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollDownToShowSelectedTask();
    //#endif
  },

  showTimeType: function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.populateData.timeType();
    frmTimeSheetCreateTab.flxTimeType.isVisible = true;
  },

  hideTimeType: function() {
    frmTimeSheetCreate.flxTimeType.isVisible = false;
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.onSelectionOfTaskTimeTypeTab = function(selectedItem) {
  kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.TimeType_Id = selectedItem.Id;
  kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntryTab.updateTimeType(selectedItem.Id);
};

kony.apps.coe.ess.myTime.TimesheetCreate.validateSubmitButtonVisibilityTab = function(date) {
  kony.apps.coe.ess.myTime.getTimesheetDataForADate(date, function(date, tsd) {
    if (tsd === null) {
      kony.apps.coe.ess.myTime.TimesheetHome.configTab.disableSubmitBtn();
      return;
    }
    if (tsd.Status_Id !== "5" && tsd.Status_Id !== "1") {
      kony.apps.coe.ess.myTime.TimesheetHome.configTab.disableSubmitBtn();
      return;
    }
    var tsid = tsd.Id;
    var timesheetStatusCheckSuccessCallback = function(date, tsid, res) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].Status_Id === "5" || res[i].Status_Id === "1") {
          var successCallbackTimeEntry = function(date, res) {
            var successCallbackHoliday = function(date, timeentryres, holires) {
              var timeentryset = {};
              var holidayset = {};
              var i;
              for (i = 0; i < timeentryres.length; i++) {
                timeentryset[timeentryres[i].Date] = "";
              }
              for (i = 0; i < holires.length; i++) {
                holidayset[holires[i].Date] = "";
              }
              var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
              for (var startdate = interval[0]; startdate.compareOnlyDate(interval[1]) <= 0; startdate = new Date(Date.parse(startdate) + 86400000)) {
                var temp = startdate.toYYYYMMDD("");
                if (timeentryset[temp] === undefined && holidayset[temp] === undefined) {
                  kony.apps.coe.ess.myTime.TimesheetHome.configTab.disableSubmitBtn();
                  return;
                }
              }
              kony.apps.coe.ess.myTime.TimesheetHome.configTab.enableSubmitBtn();
            }
            .bind(this, date, res);
            var query = "select h.Holiday_Date as Date from Holiday h;";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallbackHoliday, function(err) {
              handleError(err);
            });
          }
          .bind(this, date);
          var query = "select te.Date as Date from Time_Entry te where te.Timesheet_Id = '" + tsid + "' AND te.StatusId != '3' AND te.StatusId != '2';";
          kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallbackTimeEntry, function(err) {
            handleError(err);
          });

        } else {
          kony.apps.coe.ess.myTime.TimesheetHome.configTab.disableSubmitBtn();
        }
        break;
      }
    }
    .bind(this, date, tsid);
    var query = "select t.Status_Id as Status_Id from Timesheet t where t.Id = '" + tsid + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, timesheetStatusCheckSuccessCallback, function(err) {
      handleError(err);
    });
  }
                                                    .bind(this, date));
};

kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfigTab = {
  onClickOfAddTaskInPopup : function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = frmTimeSheetCreate.txtBoxSearch.text;
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = "CC";
    //         frmTimeSheetCreate.lblSelectedProjectName.text = frmTimeSheetCreate.txtBoxSearch.text;
    frmTimeSheetCreate.lblCostCenterId.text = "";
    frmTimeSheetCreate.lblSelectedTaskName.text = "";
    frmTimeSheetCreate.lblActivityId.text = "";
    frmTimeSheetCreate.lblSelectedTaskTimeType.text = "";
    frmTimeSheetCreate.tbxSelectedTaskDescription.text = "";
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showSelectedTaskTimeType();
    kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.showTimeType();
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(frmTimeSheetCreate.txtBoxSearch.text);
    kony.apps.coe.ess.myTime.TimesheetCreate.Search.contractAnimation();
  },

  showSearchButton : function() {
    frmTimeSheetCreateTab.flxOnlineSearch.setVisibility(true);
  },
  hideSearchButton : function() {
    frmTimeSheetCreateTab.flxOnlineSearch.setVisibility(false);
  },

  showSearchPopup : function() {
    frmTimeSheetCreateTab.lblSearchedTerm.text = frmTimeSheetCreateTab.txtBoxSearch.text;
    frmTimeSheetCreateTab.lblSearchOnlineSuggestion.text = "Search " + frmTimeSheetCreateTab.txtBoxSearch.text + " Online";
    frmTimeSheetCreateTab.lblSearcAddTaskSuggestion.text = "Add " + frmTimeSheetCreateTab.txtBoxSearch.text + " as Task";
    frmTimeSheetCreateTab.flxSearchPopup.setVisibility(true);
  },
  hideSearchPopup : function() {
    frmTimeSheetCreateTab.flxSearchPopup.setVisibility(false);
  },

  showCancelButton : function() {
    //frmTimeSheetCreate.flxBtnCancel.setVisibility(true);
  },
  hideCancelButton : function() {
    frmTimeSheetCreate.flxBtnCancel.setVisibility(false);
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.popupsTab = {
  hideAllPopups: function() {
    frmTimeSheetCreate.flxBlank.isVisible = false;
    frmTimeSheetCreate.flxCloneTaskToPopup.isVisible = false;
    frmTimeSheetCreate.flxDeleteMenuPopup.isVisible = false;
    frmTimeSheetCreate.flxDiscardPopup.isVisible = false;
    frmTimeSheetCreate.flxSuccessPopup.isVisible = false;
    frmTimeSheetCreate.flxpopuptimeline.isVisible = false;
    frmTimeSheetCreate.flxpopuptask.isVisible = false;
    frmTimeSheetCreate.flxPopupCloneSuccessful.isVisible = false;
    frmTimeSheetCreate.flxPopupCloneError.isVisible = false;
    frmTimeSheetCreate.flxPopupClone.isVisible = false;
    frmTimeSheetCreate.flxPopupEmpty.isVisible = false;
  },

  disableCloneTaskTo: function() {
    //frmTimeSheetCreate.btnCloneTask.setEnabled(false);
  },

  enableCloneTaskTo: function() {
    frmTimeSheetCreate.btnCloneTask.setEnabled(true);
  },
  btnPopupDeleteTimelineConfirmOnClick: function() {
    var sliderObj = new kony.apps.coe.Reusable.TimelineCreationTab();
    sliderObj.deleteTimeline();
  },
  btnPopupDeleteTimelineCancleOnClick: function() {
    frmTimeSheetCreate.flxpopuptimeline.isVisible = false;
    frmTimeSheetCreate.flxBlank.isVisible = false;
  },
  btnPopupDeleteTaskConfirmOnClick: function() {
    var sliderObj = new kony.apps.coe.Reusable.TimelineCreationTab();
    sliderObj.deleteTask();
  },
  btnPopupDeleteTaskCancleOnClick: function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  },
  btnPopupSubmissionOkOnClick: function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  },
  btnPopupEmptyConfirmOnClick: function(){
    kony.application.getPreviousForm().show();
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  },
  btnPopupEmptyCancelOnClick: function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  },
  popupCloneRowOnClick: function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxPopupClone.isVisible = true;
  },
  onClickOfCloneTaskTo: function() {
    var selectedItemDates = frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems[0].date;
    var displayValue = frmTimeSheetCreate.segCloneTaskToPopup.selectedRowItems[0].lblDate;
    var data = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data;
    var validationForExistingTimeEntry = function(selectedItemDate, data, res) {
      function getDateObj(time) {
        var isPM = false;
        if (time.indexOf("PM") >= 0) {
          isPM = true;
        }
        var x = time.split(".");
        var hh = parseInt(x[0]);
        var mm;
        if (x.length < 2) {
          mm = "00";
        } else {
          mm = parseInt(x[1]);
        }
        if (isPM && hh === 12) {
          hh = 12;
        } else if (!isPM && hh === 12) {
          hh = 0;
        } else if (hh >= 1 && isPM) {
          hh += 12;
        }
        var tempdate = new Date(2016, 1, 24);
        return (tempdate.setHours(hh), tempdate.setMinutes(mm), tempdate.setSeconds(0), tempdate);
      }

      function HHMMSSToDateObj(str) {
        var tempdate = new Date(2016, 1, 24);
        return (tempdate.setHours(str.substring(0, 2)), tempdate.setMinutes(str.substring(2, 4)), tempdate.setSeconds(0), tempdate);
      }

      function isDeletable(curr, temp) {
        return curr.Start_Time - temp.Start_Time <= 0 && curr.End_Time - temp.End_Time >= 0;
      }

      function isAffected(curr, temp) {
        return !((temp.Start_Time < curr.Start_Time && temp.End_Time <= curr.Start_Time) || (temp.End_Time > curr.End_Time && temp.Start_Time >= curr.End_Time));
      }

      var cancelTimeEntry = function(id) {
        var Time_entry_record = {};
        Time_entry_record.Id = id;
        Time_entry_record.StatusId = "3";
        kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
      };

      var updateStartTimeOfTimeEntry = function(id, starttime) {
        var Time_entry_record = {};
        Time_entry_record.Id = id;
        Time_entry_record.Start_Time = starttime.toHHMMSS("");
        kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
      };

      var updateEndTimeOfTimeEntry = function(id, endtime) {
        var Time_entry_record = {};
        Time_entry_record.Id = id;
        Time_entry_record.End_Time = endtime.toHHMMSS("");
        kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.update(Time_entry_record);
      };
      var current = {
        Start_Time: getDateObj(data.Start_Time),
        End_Time: getDateObj(data.End_Time)
      };
      var addNewEntryInDB = function(selectedItemDate, data, current) {
        var Time_entry_record = {};
        Time_entry_record.Employee_Id = kony.apps.coe.ess.globalVariables.employeeId;
        Time_entry_record.Date = (new Date(selectedItemDate)).toYYYYMMDD("");
        Time_entry_record.End_Time = current.End_Time.toHHMMSS("");
        Time_entry_record.Start_Time = current.Start_Time.toHHMMSS("");
        Time_entry_record.Time_Type_Id = data.TimeType_Id;
        Time_entry_record.Activity_Description = data.Desc;
        Time_entry_record.StatusId = "5";
        Time_entry_record.Project_Task_id = data.Project_Task_Id;
        Time_entry_record.Project_Task_Type = data.Project_Task_Type;
        kony.apps.coe.ess.myTime.TimesheetCreate.TimeEntry.create(Time_entry_record);
      }.bind(this, selectedItemDate, data, current);

      for (var i = 0; i < res.length; i++) {
        var temp = {
          Start_Time: HHMMSSToDateObj(res[i].Start_Time),
          End_Time: HHMMSSToDateObj(res[i].End_Time)
        };
        if (isDeletable(current, temp)) {
          cancelTimeEntry(res[i].Id);
        } else if (isAffected(current, temp)) {
          if (temp.Start_Time < current.Start_Time) {
            updateEndTimeOfTimeEntry(res[i].Id, current.Start_Time);
          } else {
            updateStartTimeOfTimeEntry(res[i].Id, current.End_Time);
          }
        }
      }
      addNewEntryInDB();
    };
    var errorCallback = function(err) {
      //alert(err);
      kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
      kony.apps.coe.ess.myTime.TimesheetCreate.popups.showErrorPopup();
      handleError(err);
    };
    for (var i = 0; i < selectedItemDates.length; i++) {
      var tempfunc = validationForExistingTimeEntry.bind(this, selectedItemDates[i], data);
      var query = "select te.Id, te.Start_Time as Start_Time, te.End_Time as End_Time from Time_Entry te where te.Date = '" + (new Date(selectedItemDates[i])).toYYYYMMDD("") + "';";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, tempfunc, errorCallback);
    }
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.showSuccessPopup(displayValue);
  },

  showCloneTaskToPopup: function() {
    var currentdate = kony.apps.coe.ess.myTime.TimesheetCreate.Backend.contextData.date;
    var startdate, enddate;
    var segDataSet = [];
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig !== "weekly") {
      var timesheetdates = [];
      var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(currentdate, new Date(currentdate.getFullYear(), 1, 1));
      startdate = interval[0];
      enddate = interval[1];
      for(var i = startdate; i <= enddate; i = i.nextDay()) {
        if(i.compareOnlyDate(currentdate) !== 0) {
          timesheetdates.push(i.toString());
        }
      }
      segDataSet.push({
        lblDate: "All Timesheet entries",
        date: timesheetdates
      });
    }
    startdate = currentdate.thisWeekInterval(0)[0];
    var allweekdays = [];
    for (var i = 0; i < 7; i++) {
      var td = new Date(Date.parse(startdate) + i * 86400000);
      if (td.getDate() !== currentdate.getDate()) {
        allweekdays.push(td.toString());
      }
    }
    segDataSet.push({
      lblDate: "All Dates in week",
      date: allweekdays
    });
    var newdate = new Date();
    for (var i = 0; i < allweekdays.length; i++) {
      if (newdate.getDate() !== (new Date(allweekdays[i])).getDate()) {
        segDataSet.push({
          lblDate: (new Date(allweekdays[i])).getDate() + " " + kony.apps.coe.ess.myTime.nToStr.week[(new Date(allweekdays[i])).getDay()],
          date: [allweekdays[i]]
        });
      } else {
        segDataSet.push({
          lblDate: "Today",
          date: [allweekdays[i]]
        });
      }
    }
    frmTimeSheetCreate.segCloneTaskToPopup.setData(segDataSet);
    frmTimeSheetCreate.flxBlank.skin = "sknFlxBg000000";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxCloneTaskToPopup.isVisible = true;
  },

  showDeleteMenuPopup: function() {
    frmTimeSheetCreate.flxBlank.skin = "sknFlxBg000000";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxDeleteMenuPopup.isVisible = true;
  },

  showDiscardPopup: function() {
    frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxDiscardPopup.isVisible = true;
  },

  showErrorPopup: function(e) {
    frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxPopupCloneError.isVisible = true;
  },
  showSuccessPopup: function(displayDate) {
    frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.lblPopupDetailsCloneSuccessful.text = "Task successfully cloned to " + displayDate + ".";
    frmTimeSheetCreate.flxPopupCloneSuccessful.isVisible = true;
  },
  showEmptyPopup: function(){
    frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxPopupEmpty.isVisible = true;
  }
};
kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggleTab = {

  isWork: true,

  onClickOfWork: function(callback) {
    frmTimeSheetCreateTab.flxWorkHours.skin = "sknflx1c7393Px24";
    frmTimeSheetCreateTab.flxVacation.skin = "sknflxBGTab";
    frmTimeSheetCreateTab.lblWorkHr.skin= "sknlblBlkWh90";
    frmTimeSheetCreateTab.lblVacation.skin="sknlbl777777Tab";
    frmTimeSheetCreateTab.imgWork.src = "workwhite.png";
    frmTimeSheetCreateTab.imgLeave.src = "vacation.png";
    frmTimeSheetCreateTab.btnStep1.setVisibility(true);
    frmTimeSheetCreateTab.btnStep2.setVisibility(true);
    frmTimeSheetCreateTab.btnStep1.skin = "sknBtn1c7393";
    frmTimeSheetCreateTab.btnStep2.skin = "sknBtn1c7393Px36";
    frmTimeSheetCreateTab.btnStep1.text = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.Step1");
    frmTimeSheetCreateTab.lblSelectTask.text = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.selectaTask");
    this.isWork = true;
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.reset();
    frmTimeSheetCreateTab.segTasks.setVisibility(true);
    frmTimeSheetCreateTab.txtBoxSearch.setVisibility(true);
    frmTimeSheetCreateTab.imgCancel.setVisibility(true);
    //frmTimeSheetCreate.segTasks.setVisibility(true);
    frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
    frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(false);
    frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.setVisibility(false);
    //frmTimeSheetCreate.txtBoxSearch.setVisibility(true);
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.populateData.projectTask();
    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
      callback(this.isWork);
    }
  },

  onClickOfLeave: function(callback) {

    frmTimeSheetCreateTab.flxWorkHours.skin = "sknflxBGTab";
    frmTimeSheetCreateTab.flxVacation.skin = "sknflx1c7393Px24";
    frmTimeSheetCreateTab.lblWorkHr.skin= "sknlbl777777Tab";
    frmTimeSheetCreateTab.lblVacation.skin="sknlblBlkWh90";
    frmTimeSheetCreateTab.imgWork.src = "work.png";
    frmTimeSheetCreateTab.imgLeave.src = "vacationwhite.png";
    this.isWork = false;
    frmTimeSheetCreateTab.txtBoxSearch.setVisibility(false);
    frmTimeSheetCreateTab.imgCancel.setVisibility(false);
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.reset();
    frmTimesheetCreateTab.lblSelectTask.text = "Select Leave Type";
    frmTimesheetCreateTab.btnStep2.isVisible = false;
    //frmTimeSheetCreate.segTasks.setVisibility(false);
    //frmTimeSheetCreate.segLeaveSelection.setVisibility(true);
    frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(false);
    frmTimeSheetCreateTab.segTasks.setVisibility(false);
    frmTimeSheetCreateTab.segLeaveSelection.setVisibility(true);
    // frmTimeSheetCreate.txtBoxSearch.setVisibility(false);
    kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.populateData.leaves();
    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
      callback(this.isWork);
    }
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig = {

  flxScrTimeTypeGestureId: null,

  showTasks: function(data) {
    frmTimeSheetCreate.flxSelectedLeave.isVisible = false;
    frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = false;
    frmTimeSheetCreate.flxProjectTaskSelection.isVisible = true;
  },

  showSelectedTaskTimeType: function(data) {
    frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
    frmTimeSheetCreate.flxSelectedLeave.isVisible = false;
    frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = true;
  },

  showSelectedLeave: function() {
    frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
    frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = false;
    frmTimeSheetCreate.flxSelectedLeave.isVisible = true;
  },

  OnClickFlxScrollUp: function() {
    frmTimeSheetCreate.flxScrTimeType.contentOffset = {
      x: "0%",
      y: frmTimeSheetCreate.flxSelectedTask.height
    };

    frmTimeSheetCreate.flxScrollUp.isVisible = false;
    frmTimeSheetCreate.imgScrollUp.isVisible = false;
    frmTimeSheetCreate.flxScrollDown.isVisible = true;
    frmTimeSheetCreate.imgScrollDown.isVisible = true;
  },
  OnClickFlxScrollDown: function() {
    frmTimeSheetCreate.flxScrTimeType.contentOffset = {
      x: "0%",
      y: "0%"
    };
    frmTimeSheetCreate.flxScrollDown.isVisible = false;
    frmTimeSheetCreate.imgScrollDown.isVisible = false;
    frmTimeSheetCreate.flxScrollUp.isVisible = true;
    frmTimeSheetCreate.imgScrollUp.isVisible = true;
  },
  scrollDownToShowSelectedTask: function() {
    frmTimeSheetCreate.flxScrollDown.isVisible = false;
    frmTimeSheetCreate.imgScrollDown.isVisible = false;
    frmTimeSheetCreate.flxScrollUp.isVisible = true;
    frmTimeSheetCreate.imgScrollUp.isVisible = true;

    //         //#ifdef iphone
    //         if (!frmTimeSheetCreate.flxTimeType.isVisible) {
    //             return;
    //         }
    //         if (this.flxScrTimeTypeGestureId !== null) {
    //             frmTimeSheetCreate.flxScrTimeType.removeGestureRecognizer(this.flxScrTimeTypeGestureId);
    //         }
    //         frmTimeSheetCreate.flxScrTimeType.contentOffset = {
    //             x: "0%",
    //             y: "0%"
    //         };
    //         this.flxScrTimeTypeGestureId = frmTimeSheetCreate.flxScrTimeType.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
    //             fingers: 1,
    //             swipedistance: 40,
    //             swipevelocity: 50
    //         }, function(commonWidget, gestureInfo, context) {
    //             if (gestureInfo.swipeDirection === 3) {
    //                 kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollUpToHideSelectedTask();
    //             }
    //         });
    //         //#endif
  },
  scrollUpToHideSelectedTask: function() {
    //         //#ifdef iphone
    //         if (!frmTimeSheetCreate.flxTimeType.isVisible) {
    //             return;
    //         }
    //         frmTimeSheetCreate.flxScrTimeType.contentOffset = {
    //             x: "0%",
    //             y: frmTimeSheetCreate.flxSelectedTask.height
    //         };
    //         if (this.flxScrTimeTypeGestureId !== null) {
    //             frmTimeSheetCreate.flxScrTimeType.removeGestureRecognizer(this.flxScrTimeTypeGestureId);
    //         }
    //         //#endif 
  },
  onSegmentBeginnning : function(){
    //       //#ifdef iphone
    //       kony.apps.coe.ess.myTime.TimesheetCreate.TaskTimeTypeSelectionConfig.scrollDownToShowSelectedTask();
    //       //#endif
  },

  showTimeType: function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.populateData.timeType();
  },

  hideTimeType: function() {
    //frmTimeSheetCreate.flxTimeType.isVisible = false;
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.SearchTab = {
  searchOnline: function() {
    //Do online search
    kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    kony.apps.coe.ess.globalVariables.isOnlineSearch = true;
    var searchString = frmTimeSheetCreate.txtBoxSearch.text;
    Query = searchString;
    var modelName = "MYTIME";
    var dataObject = "Project_Task";
    var queryParams;
    if (searchString.indexOf(',') == -1) {
      queryParams = {
        "$top": "10",
        "$filter": "substringof(Project_Id,'" + searchString + "') or substringof(Task_Id,'" + searchString + "') or substringof(id,'" + searchString + "')"
      };
      kony.apps.coe.ess.MVVM.OnlineServiceCall(modelName, dataObject, queryParams, kony.apps.coe.ess.myTime.TimesheetCreate.onlineSuccess, kony.apps.coe.ess.myTime.TimesheetCreate.onlineError);
    } else {
      //Blocked with some Issue once the issue resolved then we have to implement this part of online search
      //var params = Query.split(",");
      //queryParams= {"$filter":"substringof(Project_Id,'"+params[0]+"') and substringof(Task_Id,'"+params[1]+"')"};
      //kony.apps.coe.ess.MVVM.OnlineServiceCall(modelName, dataObject,queryParams, onlineSuccess,onlineError);
    }
    frmTimeSheetCreate.flxSearchPopup.setVisibility(false);
    //this.contractAnimation();
  },
  searchFor: function(query) {
    Query = query;
    if (query.trim() === "") {
      //ToDo : What should be done incase of empty queries ?
      return;
    }
    var result = [];
    if (query.indexOf(',') == -1) {
      var sqlQuery = "select t.task_name, p.project_name,p.id as pid,t.id as tid, pt.type,pt.id as ptid from project_task pt left join project p on p.id=pt.project_id  left join task t on t.id=pt.task_id where p.Project_Name like '%" + query + "%' OR t.task_name like '%" + query + "%' OR pt.project_id like '%" + query + "%' OR pt.task_id like '%" + query + "%' OR pt.id like '%" + query + "%' order by p.id";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, kony.apps.coe.ess.myTime.TimesheetCreate.sqlSuccessTab, kony.apps.coe.ess.myTime.TimesheetCreate.sqlFailureTab);
    } else {
      var params = query.split(",");
      var sqlquery = "select t.task_name, p.project_name,p.id as pid,t.id as tid, pt.type,pt.id as ptid from project_task pt left join project p on p.id=pt.project_id  left join task t on t.id=pt.task_id where p.id like '%" + params[0] + "%' and t.id like'%" + params[1] + "%' OR p.Project_Name like '%" + params[0] + "%' and t.Task_Name like '%" + params[1] + "%'";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlquery, kony.apps.coe.ess.myTime.TimesheetCreate.sqlSuccessTab, kony.apps.coe.ess.myTime.TimesheetCreate.sqlFailureTab);
    }

  },

  expandAnimation: function() {
    //var animObj = kony.ui.createAnimation({
    /* "100": {
                "width": "90.6%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE_OUT
                }
            }*/
    //});

    // var timingObj = {
    //"duration": 0.5,
    //"fillMode": kony.anim.FILL_MODE_FORWARDS
    // };

    //var animCallbacks = {
    //  "animationEnd": function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfigTab.showCancelButton();
    kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfigTab.showSearchButton();
    if (kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggleTab.isWork) {
      //Work is active
      frmTimeSheetCreateTab.segTasks.setVisibility(false);
    } else {
      //Leaves is active
      frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
    }
    //   }
    // };

    // frmTimeSheetCreate.txtBoxSearch.animate(animObj, timingObj, animCallbacks);
  },

  contractAnimation: function() {
   // var animObj = kony.ui.createAnimation({
      /* "100": {
                "width": "49.4%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE_OUT
                }
            }*/
 //   });

    var timingObj = {
      //  "duration": 0.5,
      //  "fillMode": kony.anim.FILL_MODE_FORWARDS
    };

    var animCallbacks = {
      "animationEnd": function() {
        // frmTimeSheetCreateTab.flxTimeLine.removeAll();
        frmTimeSheetCreateTab.segTasks.setVisibility(true);
        frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
        frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(false);
        frmTimeSheetCreateTab.flxSelectedTaskDeatilsType.setVisibility(false);
        // frmTimeSheetCreateTab.btnStep1.skin="sknBtn1c7393";
        // frmTimeSheetCreateTab.btnStep1.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.Step1");
        // frmTimeSheetCreateTab.lblSelectTask.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.selectaTask");
        // frmTimeSheetCreateTab.btnStep2.skin="sknBtn1c7393Px36";
        // refreshAndShowTimesheetCreateTabForm();
        //kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchButton();
        //kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchPopup();
        //kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideCancelButton();
        //frmTimeSheetCreate.txtBoxSearch.text = "";
        frmTimeSheetCreateTab.txtBoxSearch.text = "";
        // if (kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggleTab.isWork) {
        //Work is active
        //frmTimeSheetCreate.segTasks.setVisibility(true);
        //frmTimeSheetCreateTab.segTasks.setVisibility(true);
        // } else {
        //Leaves is active
        //frmTimeSheetCreate.segLeaveSelection.setVisibility(true);
        //   }
        //frmTimeSheetCreate.segTasksSearchResults.setVisibility(false);


      }
    };

    //frmTimeSheetCreate.txtBoxSearch.animate(animObj, timingObj, animCallbacks);
    frmTimeSheetCreateTab.txtBoxSearch.animate(animObj, timingObj, animCallbacks);
  }
};


kony.apps.coe.ess.myTime.TimesheetCreate.sqlSuccessTab = function(res) {
  if(res === null || res.length <= 0) {
    kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfigTab.showSearchPopup();
    return;
  } else {
    //kony.apps.coe.ess.myTime.TimesheetCreate.Search.contractAnimation();
    kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfigTab.hideSearchButton();
    kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfigTab.hideSearchPopup();
  }
  res = kony.apps.coe.makeGroups("pid", res);
  var finalData = [];
  var hSkin = "sknLblFc2d86E2Fs24";
  for (var i = 0; i < res.length; i++) {
    var sectionData = [];
    var rows = [];
    for (var j = 0; j < res[i].length; j++) {
      var projectTask = {};
      projectTask.ProjectId = res[i][j].pid;
      projectTask.Project_Task_Id = res[i][j].ptid;
      projectTask.TaskId = res[i][j].tid;
      projectTask.backendData = res[i][j].backendData;
      if (j === 0) {
        var ind = (res[i][j].Type).indexOf("|");
        var type1 = (ind !== -1) ? (res[i][j].Type).substring(0, ind) : (res[i][j].Type);
        var type1Value = res[i][j].pid.replace(type1, "");
        var head = {
          lblProjectNameHeader: {
            text: type1 + " - " + type1Value,
            skin: (type1 + type1Value).indexOf(Query) !== -1 ? hSkin : ""
          }
        };
        sectionData.push(head);
      }
      if (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Type)) {
        var index = (res[i][j].Type).indexOf("|");
        var type2 = (index !== -1) ? (res[i][j].Type).substring(0, index) : (res[i][j].Type);
        var type2Value = ((res[i][j].tid) !== null && (res[i][j].tid) !== undefined) ? (res[i][j].tid).replace(type2, "") : "";
        projectTask.lblProjectName = res[i][j].Project_Name;
        projectTask.lblTaskName = (res[i][j].Task_Name !== null) ? res[i][j].Task_Name : " - ";
        projectTask.Project_Task_Type = res[i][j].Type;
        projectTask.lblActivityId = (type2 + " - " + type2Value);
        projectTask.template = flxSegProjectTaskActivityIdSelection;
      } else if (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Project_Name) && kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Task_Name)) {
        projectTask.lblProjectName = res[i][j].Project_Name;
        projectTask.Project_Task_Type = res[i][j].Type;
        projectTask.lblTaskName = (res[i][j].Task_Name !== null) ? res[i][j].Task_Name : " - ";
        projectTask.template = flxTaskList;
      } else {
        projectTask.lblProjectName = (kony.apps.coe.ess.myTime.ViewTimeSheetUI.isData(res[i][j].Project_Name)) ? res[i][j].Project_Name : res[i][j].Task_Name;
        projectTask.Project_Task_Type = res[i][j].Type;
        projectTask.template = flxTaskList;
      }
      rows.push(projectTask);
    }
    sectionData.push(rows);
    finalData.push(sectionData);
  }
  frmTimeSheetCreateTab.segTasksSearchResults.setData(finalData);
  frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
  frmTimeSheetCreateTab.segTasks.setVisibility(false);
  frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(true);
  frmTimeSheetCreateTab.lblNoResultsTask.setVisibility(false);
  kony.application.dismissLoadingScreen();
  kony.print(JSON.stringify(finalData));
};


kony.apps.coe.ess.myTime.TimesheetCreate.sqlFailureTab = function(res) {
  kony.application.dismissLoadingScreen();
  handleError(res);
};


kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelectionTab = {

  isBlocked : false,

  selectedItem: 0,

  onClickOfHoursTab: function(callback) {
    if(this.isBlocked){
      return;
    }
    this.selectedItem = 0;
    frmTimeSheetCreateTab.btnHours.skin = "sknbtn4a90E2";
    frmTimeSheetCreateTab.btnFullDay.skin = "CopyslButtonGlossBlue0894e330d8d8142";

    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
      callback(this.selectedItem);
    }

  },

  onClickOfFullDayTab: function(callback) {
    if(this.isBlocked){
      return;
    }
    var data = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData;
    for(var i=0 ; i<data.length ; i++){
      if(data[i].data.Time_Line_Status !== "deleted"){
        return;
      }
    }
    this.selectedItem = 1;
    frmTimeSheetCreateTab.btnHours.skin = "CopyslButtonGlossBlue0894e330d8d8142";
    frmTimeSheetCreateTab.btnFullDay.skin = "sknbtn4a90E2";
    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
      callback(this.selectedItem, "9 AM", "5 PM");
    }
  }
};

kony.apps.coe.ess.myTime.TimesheetCreate.updateTotalTimeTab = function() {
  var data = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData;

  function makeItTwoDigits(x) {
    x = parseInt(x);
    if (x < 10) {
      return "0" + x;
    } else {
      return "" + x;
    }
  }

  function getHHMMSS(time) {
    var isPM = false;
    if (time.indexOf("PM") >= 0) {
      isPM = true;
    }
    var x = time.split(".");
    var hh = parseInt(x[0]);
    var mm;
    if (x.length < 2) {
      mm = "00";
    } else {
      mm = parseInt(x[1]);
    }
    if (isPM && hh === 12) {
      hh = 12;
    } else if (!isPM && hh === 12) {
      hh = "00";
    } else if (hh >= 1 && isPM) {
      hh += 12;
    }
    return {
      hh: hh,
      mm: mm,
      ss: 0
    };
  }
  var totalmin = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].data.Time_Line_Status !== "deleted") {
      var st = getHHMMSS(data[i].startTime);
      var ed = getHHMMSS(data[i].endTime);
      var h = parseInt(ed.hh) - parseInt(st.hh);
      var m = parseInt(ed.mm) - parseInt(st.mm);
      totalmin += (h * 60 + m);

    }
  }
  // frmTimeSheetCreate.lblTotalTime.text = "Total Time Filled: " + parseInt(totalmin / 60) + ":" + parseInt(totalmin % 60) + " hours";
};
kony.apps.coe.ess.myTime.TimesheetCreate.setDataToSegTaskDetails= function(tasks){
  //   alert("Deatails setdata"+JSON.stringify(tasks));
  var arr=[];
  var ProjectTaskIds=[];
  var Project_TaskId;
  ProjectTaskIds=[];
  if(tasks !== null || tasks !== undefined || tasks!== "" || tasks.length>0){
    for(var i=0;i<tasks.length;i++){
      ProjectTaskIds.push(tasks[i].Project_Task_Id);
    }

  }
  if (tasks === null || tasks === undefined || tasks === "" || ProjectTaskIds===[] || ProjectTaskIds === null || ProjectTaskIds===undefined || tasks.length < 1) {
    frmTimeSheetCreateTab.segDetailsSelectedTask.setVisibility(false);
    return;
  }


  for(var j=0;j<ProjectTaskIds.length;j++){
    Project_TaskId=ProjectTaskIds[j];
    var query = "select pt.Project_Id as Project_Id, pt.Task_Id as Task_Id from Project_Task pt where pt.ID = '" + ProjectTaskIds[j] + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, function(res) {
      handleError(res);
    });
  }function successCallback(res) {
    if(res === null || res.length <= 0) {
      //frmTimeSheetCreateTab.lblSelectedProjectName.text = "" + Project_Task_Id.toString().titleCase();
      var obj1={
        "lblSelectedProjectName1": "" + Project_TaskId.toString().titleCase()
      };
      arr.push(obj1);
      frmTimeSheetCreateTab.segDetailsSelectedTask.setData(arr);  
      //kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchPopup();
      //kony.apps.coe.ess.myTime.TimesheetCreate.SearchConfig.hideSearchButton();
      return;
    }
    var Project_Id = "";
    var Task_Id = "";
    for (var i = 0; i < res.length; i++) {
      Project_Id = res[i].Project_Id;
      Task_Id = res[i].Task_Id;
    }

    //if (Task_Id !== null && Task_Id !== undefined && Task_Id !== "") {
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", "select t.Task_Name as name, t.Type as type from Task t where t.Id = '" + Task_Id + "';",
                                          function(res) {
      for (var i in res) {
        //kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName(res[i].name);
        //kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Task_Name = res[i].name;
        // frmTimeSheetCreateTab.lblSelectedTaskName.text = res[i].name;
        // frmTimeSheetCreateTab.lblActivityId.text = res[i].type + " - " + String(Task_Id).replace(res[i].type, "");
        var obj={
          "lblSelectedTaskName1":res[i].name,
          "lblActivityId1":res[i].type + " - " + String(Task_Id).replace(res[i].type, "")
        };
        arr.push(obj);
        frmTimeSheetCreateTab.segDetailsSelectedTask.setData(arr);  
        break;
      }
    },
                                          function(res) {
      handleError(res);
    });
    //  } else {
    //    frmTimeSheetCreateTab.lblSelectedTaskName.text = "";
    //  frmTimeSheetCreateTab.lblActivityId.text = "";
    //}
    if (Project_Id !== null && Project_Id !== undefined && Project_Id !== "") {
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", 
                                            "select p.Project_Name as name, p.Project_Type as type from Project p where p.Id = '" + Project_Id + "';",
                                            function(res) {
        for (var i in res) {
          if (Task_Id === null || Task_Id === undefined || Task_Id === "") {
            //kony.apps.coe.Reusable.TimelineCreationTab.updateTaskName(res[i].name);
            //kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.data.Task_Name = res[i].name;
          }
          //frmTimeSheetCreateTab.lblSelectedProjectName.text = res[i].name.toString().titleCase();
          //frmTimeSheetCreateTab.lblCostCenterId.text = res[i].type + " - " + String(Project_Id).replace(res[i].type, "");
          var obj2={
            "lblSelectedProjectName1": res[i].name.toString().titleCase(),
            "lblCostCenterId1" : "Cost Center ID-" + res[i].type + " - " + String(Project_Id).replace(res[i].type, "")
          };
          arr.push(obj2);
          frmTimeSheetCreateTab.segDetailsSelectedTask.setData(arr);  
          frmTimeSheetCreateTab.segDetailsSelectedTask.setVisibility(true);  
          break;
        }
      },
                                            function(res) {
        handleError(res);
      });
    } else {
      frmTimeSheetCreateTab.lblSelectedProjectName.text = "";
      frmTimeSheetCreateTab.lblCostCenterId.text = "";
    }
  }

};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       data to be processed , successCallBack 
 * return       None.
 * desc         this function process the data and pass it as a param to updateSegment function
 */
kony.apps.coe.ess.myTime.TimesheetCreate.settingTaskSummaryTab = function (dataSet, successCallBack) {
  kony.print("--------------------start settingTaskSummary--------------------");
  //alert("====before update===="+JSON.stringify(dataSet));
  if (dataSet === null || dataSet === undefined || dataSet.length <= 0) {
    return;
  }
  function getHHMMSS(time) {
    var isPM = false;
    if (time === null || time === undefined || time === "") {
      return {
        hh: 0,
        mm: 0,
        ss: 0
      };
    } else {
      if (time.indexOf("PM") >= 0) {
        isPM = true;
      }
      var x = time.split(".");
      var hh = parseInt(x[0]);
      var mm;
      if (x.length < 2) {
        mm = "00";
      } else {
        mm = parseInt(x[1]);
      }
      if (isPM && hh === 12) {
        hh = 12;
      } else if (!isPM && hh === 12) {
        hh = "00";
      } else if (hh >= 1 && isPM) {
        hh += 12;
      } else if (hh >= 1 && hh <= 9 && !isPM) {
        hh = "0" + hh;
      }
      return {
        hh: hh,
        mm: mm,
        ss: 0
      };
    }
  }
  var finalData = {};
  var generatedData = [];
  //frmTimeSheetCreate.flxProjectTaskSelection.isVisible = false;
  //frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.isVisible = true;
  //frmTimeSheetCreate.flxScrTimeEntrySummary.isVisible = true;
  generatingEachRowData.call(this, 0);
  function generatingEachRowData(index) {
    finalData = {};
    finalData.start_time = dataSet[index].Start_Time;
    finalData.end_time = dataSet[index].End_Time;
    finalData.time_Slot = dataSet[index].Start_Time + " - " + dataSet[index].End_Time;
    finalData.Task_Name = dataSet[index].Task_Name;
    var endTimeForCal = getHHMMSS(dataSet[index].End_Time);
    endTimeForCal = "" + endTimeForCal.hh + ((endTimeForCal.mm) * 60) / 100;
    var startTimeForCal = getHHMMSS(dataSet[index].start_Time);
    startTimeForCal = "" + startTimeForCal.hh + ((startTimeForCal.mm) * 60) / 100;
    finalData.actual_Hours = kony.apps.coe.ess.myTime.TimesheetCreate.timeEntryCreate.getTimeDiff(endTimeForCal, startTimeForCal) + " " + kony.i18n.getLocalizedString("i18n.ess.frmListViewH");
    if (dataSet[index].data === null || dataSet[index].data === undefined) {
      finalData.timeType_Id = dataSet[index].TimeType_Id;
      finalData.time_Entry_ID = dataSet[index].Time_Entry_Id;
      finalData.project_Task_Id = dataSet[index].Project_Task_Id;
    } else {
      finalData.timeType_Id = dataSet[index].data.TimeType_Id;
      finalData.time_Entry_ID = dataSet[index].data.Time_Entry_Id;
      finalData.project_Task_Id = dataSet[index].data.Project_Task_Id;
      finalData.description = dataSet[index].data.Desc;
      finalData.project_Id = dataSet[index].data.Project_Task_Type + " - " + dataSet[index].data.Project_Task_Id;
    }

    if (finalData.timeType_Id !== null && finalData.timeType_Id !== undefined && finalData.timeType_Id !== "") {
      var query = "select tt.Name as Name from Time_Type tt where tt.ID = '" + finalData.timeType_Id + "';";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successForProjectTaskId.bind(this, index), errorForProjectTaskId);
    }
    else{
      generatedData.push(finalData);
      if (index < (dataSet.length - 1)) {
        generatingEachRowData(index + 1);
      } else {
        successCallBack(generatedData);
      }
    }

    function errorForProjectTaskId(err){
      handleError(err);
    }
    function successForProjectTaskId(index, res) {
      for (var i = 0; i < res.length; i++) {
        finalData.time_Type_Name = res[0].Name;
      }
      generatedData.push(finalData);
      if (index < (dataSet.length - 1)) {
        generatingEachRowData(index + 1);
      } else {
        successCallBack(generatedData);
      }
      /*if (finalData.project_Id !== null && finalData.project_Id !== undefined && finalData.project_Id !== "") {
			kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", "select p.Project_Name as name, p.Project_Type as type from Project p where p.Id = '" + finalData.project_Id + "';", successForProjectQuery.bind(this, index),errorForProjectQuery);
		} else {
          	finalData.project_Id = "";
          	finalData.project_Name = "";
          	finalData.task_Id = "";
          	finalData.task_Name = "";
          	generatedData.push(finalData);
			if (index < (dataSet.length - 1)) {
				generatingEachRowData(index + 1);
			} else {
				successCallBack(generatedData);
			}
		}*/

      function errorForProjectQuery(err){
        handleError(err);
      }
      function successForProjectQuery(index, res) {
        for (var i = 0; i < res.length; i++) {
          finalData.project_Name = res[i].name;
        }
        if (finalData.task_Id !== null && finalData.task_Id !== undefined && finalData.task_Id !== "") {
          kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", "select t.Task_Name as name, t.Type as type from Task t where t.Id = '" + finalData.task_Id + "';", successForTaskQuery.bind(this, index),errorForTaskQuery);
        } else {
          finalData.task_Id = " ";
          finalData.task_Name = " ";
          generatedData.push(finalData);
          if (index < (dataSet.length - 1)) {
            generatingEachRowData(index + 1);
          } else {
            successCallBack(generatedData);
          }
        }
      }

      function errorForTaskQuery(err){
        handleError(err);
      }
      function successForTaskQuery(index, res) {
        for (var i = 0; i < res.length; i++) {
          finalData.task_Name = res[i].name;
        }
        generatedData.push(finalData);
        if (index < (dataSet.length - 1)) {
          generatingEachRowData(index + 1);
        } else {
          successCallBack(generatedData);
        }
      }
    }
    kony.print("--------------------end settingTaskSummary--------------------");
  }
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       data set to set in segment 
 * return       None.
 * desc         This method sets the data to segment
 */
kony.apps.coe.ess.myTime.TimesheetCreate.updateSegmentTab = function (data){
  kony.print("--------------------start updateSegment--------------------");
  // alert(JSON.stringify(data));
  if(data!==null || data!==undefined || data!=="" || data.length>0){
    frmTimeSheetCreateTab.segDetailsSelectedTask.widgetDataMap = {
      "lblProjectName1" : "project_Name",
      "lblTimeType" : "time_Type_Name",
      "lblTaskName" : "Task_Name",
      "lblNO" : "project_Id",
      "lblAO" : "task_Id",
      "lblDescription" : "description",
      "lblTotalHours" : "actual_Hours",
      "lblTimeSlot" : "time_Slot"
    };
    if(kony.apps.coe.ess.myTime.TimesheetHome.flxTimesheetDetailsLeftSelectedIndex !== ""){
      frmTimeSheetCreateTab.segDetailsSelectedTask.setData(data);
      frmTimeSheetCreateTab.segDetailsSelectedTask.setVisibility(true);

    }
    kony.print("--------------------end updateSegment--------------------");
  }
  else{
    frmTimeSheetCreateTab.segDetailsSelectedTask.setVisibility(false);
  }
};

kony.apps.coe.ess.myTime.TimesheetHome.onSubmitClickTab = function() {
  try{
    kony.apps.coe.ess.MVVM.createRecord("MYTIME", "Timesheet_Note",
                                        kony.apps.coe.ess.myTime.TimesheetHome.generateDataTab(),
                                        kony.apps.coe.ess.myTime.TimesheetHome.completeReviewTab,
                                        function(err) {
      handleCustomAlert("Err : " + JSON.stringify(err));
    }
                                       );
  }
  catch(e){
    handleCustomAlert(e.message);
  }
};


kony.apps.coe.ess.myTime.TimesheetHome.generateDataTab = function() {
  try{
    var d = new Date();
    var data = {
      "Added_On": "",
      "Comments": "",
      "Employee_Id": kony.apps.coe.ess.globalVariables.employeeId,
      "Id": "",
      "Timesheet_Id": ""
    };
    data.Added_On = d.toYYYYMMDD("") + d.toHHMMSS("");
    // data.Comments = frmTimesheetReview.txtAreaComments.text;
    data.Timesheet_Id = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObjTab.getSelectedItemData().timesheetId;
    data.Id = "MYTIME_V1_TMST_" + data.Added_On + "_T_" + d.getUTCMilliseconds() + "_1";
    return data;
  }
  catch(e){
    handleCustomAlert(e.message);
  }
};


kony.apps.coe.ess.myTime.TimesheetHome.completeReviewTab = function() {
  try{
    var timesheet_Id = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObjTab.getSelectedItemData().timesheetId;
    com.kony.ESS.MYTIME.Time_Entry.update("where timesheet_id = '" + timesheet_Id + "' AND StatusId != '3'", {
      StatusId: "7"
    }, function(timesheet_Id, res) {
      //Update Success
      var dateObj=new Date();
      kony.apps.coe.ess.MVVM.update("MYTIME", "Timesheet", {
        "Id": timesheet_Id,
        "Status_Id": "7",
        "SubmittedOn" : dateObj.toYYYYMMDD("")+dateObj.toHHMMSS("")
      }, function(timesheet_Id, res) {
        //kony.application.showLoadingScreen("", "Syncing...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        //kony.apps.coe.ess.frmLogin.manualSyncOnClick(kony.apps.coe.ess.myTime.TimesheetReview.submisionPopup());
        kony.apps.coe.ess.Sync.syncAsynchronously();
        kony.apps.coe.ess.myTime.TimesheetHome.onSubmisionDoneTab();
        kony.print("successfully submitted for timesheet id = " + timesheet_Id);
      }.bind(this, timesheet_Id), function(err) {
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.common.errorTimesheetSummary") + timesheet_Id + " : " + JSON.stringify(err));
      });
    }.bind(this, timesheet_Id), function(res) {
      //Update Failed
      handleCustomAlert(JSON.stringify(res));
    });
  }
  catch(e){
    handleCustomAlert(e.message);
  }
};

kony.apps.coe.ess.myTime.TimesheetHome.onSubmisionDoneTab = function() {
  handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.timesheetsubmittedsuccessfully"));
  kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = false;
  kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObjTab.getSelectedItemData().timesheetId;
  //showViewTimeSheetForm();
};
kony.apps.coe.ess.myTime.TimesheetHome.popluateTimePickerDataTab = function() {
  kony.print("---- populateTimePickerData start");
  try {
    var coords = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
    var index = 0;
    var timeslots = [];
    var timeslotsArray = [];
    while (index < coords.length) {
      var temp = [0, 0];
      temp[0] = coords[index][0].toString(); //Storing the left values as keys so that sliding of time slider could be easy
      temp[1] = coords[index][1]; //Storing time slots from 11:45 PM to 11 PM
      timeslots.push(temp);
      index++;
    }
    timeslots.push(50);
    timeslotsArray.push(timeslots); //Start time
    timeslotsArray.push(timeslots); //End time

    frmTimeSheetCreateTab.timePicker.masterData = timeslotsArray;
    kony.print("---- populateTimePickerData end");
  } catch (error) {
    kony.print("---- populateTimePickerData error: " + error);
  }
};
/**
 * @class       TimesheetCreate
 * @type        function
 * @param       None
 * return       None
 * desc         This is used to store the slider position before changing to full so that it could revert back to orginal size and position
 */
kony.apps.coe.ess.myTime.TimesheetCreate.storeSliderTab = function() {
  try {
    kony.print("---- in store slider");
    kony.print("---- left: " + frmTimeSheetCreateTab.flexSlider.left);
    kony.print("---- width" + frmTimeSheetCreateTab.flexSlider.width);
    if (kony.apps.coe.ess.globalVariables.fullDayButtonisSelected !== true) {
      kony.apps.coe.ess.globalVariables.prevSliderLeft = frmTimeSheetCreateTab.flexSlider.left;
      kony.apps.coe.ess.globalVariables.prevSliderWidth = frmTimeSheetCreateTab.flexSlider.width;
    }
  } catch (error) {
    handleError(error);
  }
};
kony.apps.coe.ess.myTime.TimesheetCreate.revertSliderTab = function() {
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
      kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider(kony.apps.coe.ess.appconfig.defaultSliderStartTime, kony.apps.coe.ess.appconfig.defaultSliderEndTime);
      kony.apps.coe.ess.globalVariables.prevSliderLeft = "";
      kony.apps.coe.ess.globalVariables.prevSliderWidth = "";
    }
  } catch (error) {
    handleError(error);
  }
};


/**
 * @class       TimesheetDatesSectionTab
 * @type        function
 * desc         this function is called on by deleting a particular task in a day in create timesheet tab.
 */

kony.apps.coe.ess.myTime.TimesheetDatesSectionTab.prototype.timeSheetDeleteTask = function() {
  try {
    var segData = frmTimeSheetCreateTab.segDetailsSelectedTask.selectedItems[0];
    var selected_index = frmTimeSheetCreateTab.segDetailsSelectedTask.selectedIndex[1];
    start_time = segData.start_time;
    frmTimeSheetCreateTab.segDetailsSelectedTask.removeAt(selected_index);      
    (new kony.apps.coe.Reusable.TimelineCreationTab()).deleteTask(start_time);
    kony.apps.coe.ess.globalVariables.notFirstTask = true;
    //If there are no more tasks to delete
    if (frmTimeSheetCreateTab.segDetailsSelectedTask.data.length === undefined || frmTimeSheetCreateTab.segDetailsSelectedTask.data.length < 1) {
      //frmTimeSheetCreateTab.flxSelectionBar.setVisibility(true);
      //frmTimeSheetCreateTab.flxTotalTime.setVisibility(false);
    }
  } catch (error) {
    handleError(error);
  }
};



kony.apps.coe.ess.myTime.TimesheetDatesSectionTab.prototype.timeSheetClearAllTasks = function() {
  try {
    var segFullData = frmTimeSheetCreateTab.segDetailsSelectedTask.data;
    for(var i = 0; i < segFullData.length; i++){
      var segData = frmTimeSheetCreateTab.segDetailsSelectedTask.data[i];
      start_time = segData.start_time;
      frmTimeSheetCreateTab.segDetailsSelectedTask.removeAt(i);      
      //(new kony.apps.coe.Reusable.TimelineCreationTab()).deleteTask(start_time);
      kony.apps.coe.ess.globalVariables.notFirstTask = true;
    }
    //If there are no more tasks to delete
    if (frmTimeSheetCreateTab.segDetailsSelectedTask.data.length === undefined || frmTimeSheetCreateTab.segDetailsSelectedTask.data.length < 1) {
      //frmTimeSheetCreateTab.flxSelectionBar.setVisibility(true);
      //frmTimeSheetCreateTab.flxTotalTime.setVisibility(false);
    }
  } catch (error) {
    handleError(error);
  }
};


kony.apps.coe.ess.myTime.TimesheetCreate.pickerViewOnClickApplyTab = function() {
  kony.print("---- I'm here in pickerViewOnClickApplyTab");
  var selectedValues = frmTimeSheetCreateTab.timePicker.selectedKeyValues;
  kony.print("---- timePicker selected values: " + JSON.stringify(selectedValues));
  // kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.reset();
  // kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.TimeType_Id = null;
  var leftPinDistFromLeft = parseInt(selectedValues[0][0]);
  var rightPinDistFromLeft = parseInt(selectedValues[1][0]);
  var startTime = selectedValues[0][1];
  var endTime = selectedValues[1][1];
  if (leftPinDistFromLeft < rightPinDistFromLeft) {
    var sliderObj = new kony.apps.coe.Reusable.TimelineCreationTab();
    var frmName = kony.apps.coe.Reusable.TimelineCreationTab.parentWidgetName;
    var coordinates = kony.apps.coe.Reusable.TimelineCreationTab.XCoordinatesOfTimeLine;
    var startIndex = coordinates.map(function(el) {
      return el[1];
    }).indexOf(startTime);
    var endIndex = coordinates.map(function(el) {
      return el[1];
    }).indexOf(endTime);
    var width = coordinates[endIndex][0] - coordinates[startIndex][0];
    var left = coordinates[startIndex][0];
    frmName.flexSliderTask.width = (parseInt(width) - 50) + "dp";
    sliderObj.animateSlider(left, width);
    kony.apps.coe.Reusable.TimelineCreationTab.setDefaultSlider(startTime, endTime);
    frmTimeSheetCreateTab.flxTimePicker.setVisibility(false);
    frmTimeSheetCreateTab.flexSlider.setVisibility(true);
    frmTimeSheetCreateTab.segProjectTaskSelection.setVisibility(true);    
    //         frmTimeSheetCreate.tbxSelectedTaskDescription.text = "";
    //         frmTimeSheetCreate.lblSummary.setVisibility(false);
    //         frmTimeSheetCreate.labPopupHeader.top = "30.5%";
    //         frmTimeSheetCreate.btnDone.setVisibility(true);
    //         frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(false);
    leftPinDistFromLeft = leftPinDistFromLeft.toString();
    rightPinDistFromLeft = rightPinDistFromLeft.toString();
    frmTimeSheetCreateTab.timePicker.selectedKeys = [leftPinDistFromLeft, rightPinDistFromLeft];

    kony.apps.coe.Reusable.TimelineCreationTab.scrollTimelineFrameSearchTab();
  } else {
    kony.print("---- start time should be less when compared to end time");
  }
  kony.print("---- values: " + leftPinDistFromLeft + " " + rightPinDistFromLeft);
};
