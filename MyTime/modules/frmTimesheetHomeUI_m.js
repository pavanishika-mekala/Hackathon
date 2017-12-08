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
kony.apps.coe.ess.myTime.nToStr = kony.apps.coe.ess.myTime.nToStr || {
    "week": {
        "0": "Sun",
        "1": "Mon",
        "2": "Tue",
        "3": "Wed",
        "4": "Thu",
        "5": "Fri",
        "6": "Sat"
    },
    "month": {
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
    },
    "fullmonth": {
        "0": "January",
        "1": "February",
        "2": "March",
        "3": "April",
        "4": "May",
        "5": "June",
        "6": "July",
        "7": "August",
        "8": "September",
        "9": "October",
        "10": "November",
        "11": "December"
    }
};

kony.apps.coe.ess.myTime.TimesheetHome = kony.apps.coe.ess.myTime.TimesheetHome || {};
kony.apps.coe.ess.myTime.TimesheetHome.config = {
    editable: function() {
        frmTimesheetHome.flxTimesheetDetails.setEnabled(true);
    },

    notEditable: function() {
        frmTimesheetHome.flxTimesheetDetails.setEnabled(false);
    },
    disableSubmitBtn: function(statusId) {
        frmTimesheetHome.btnSubmit.onClick = function() {  
          if(statusId === undefined || statusId === null){
            //handleError("");
            toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.pleaseentertimeforallworkingdays"), 2000);
          }
          else if (statusId === "5" || statusId === "1") {
                toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.pleaseentertimeforallworkingdays"), 2000);
          } 
          else if (statusId === "0") {
                    toastMessage.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.timesheetisalreadysubmitted"), 2000);
          }
            
        };
        frmTimesheetHome.btnSubmit.skin = "sknBtnSubmitDisabled";
    },
    enableSubmitBtn: function() {
        frmTimesheetHome.btnSubmit.onClick = function() {
            kony.apps.coe.ess.myTime.submitTimesheet();
        };
        frmTimesheetHome.btnSubmit.skin = "sknBtnSubmit";
    },
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
TimesheetDatesSection = function(template, parent) {
    this._data = null;
    this._template = template;
    this._parent = parent;
    this._selectedItem = null;
    this.labelDataMap = null;
    this._onSelectionCallback = null;

};

kony.apps.coe.ess.myTime.
TimesheetDatesSection.getCurrentTimesheetData = function(dateObj) {
    var startdate;
    var data;
    var sd;
    var ed;
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "daily") {
        var interval = dateObj.thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay);
        data = [];
        data.push({
            displayValue: interval[0].getDate() + "-" + interval[1].getDate(),
            startDate: interval[0],
            endDate: interval[1]
        });
        return data;
    } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "weekly") {
        startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        data = [];
        for (var i = 0; i <= 1; i++) {
            sd = new Date(Date.parse(startdate) + i * 604800000);
            ed = new Date(Date.parse(sd) + 518400000);
            data.push({
                displayValue: sd.getDate() + "-" + ed.getDate(),
                startDate: sd,
                endDate: ed
            });
        }
        return data;
    } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "biweekly") {
        startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        data = [];
        for (var i = 0; i <= 2; i++) {
            sd = new Date(Date.parse(startdate) + i * 604800000);
            ed = new Date(Date.parse(sd) + 518400000);
            data.push({
                displayValue: sd.getDate() + "-" + ed.getDate(),
                startDate: sd,
                endDate: ed
            });
        }
        return data;
    } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "monthly") {
        var sdedm = kony.apps.coe.ess.myTime.TimesheetDatesInterval.monthly(dateObj);
        startdate = sdedm[0].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        var enddate = sdedm[1].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[1];
        var nweeks = (Date.parse(enddate) - Date.parse(startdate)) / 604800000;
        data = [];
        for (var i = 0; i < nweeks; i++) {
            sd = new Date(Date.parse(startdate) + i * 604800000);
            ed = new Date(Date.parse(sd) + 518400000);
            data.push({
                displayValue: "week " + (i + 1),
                startDate: sd,
                endDate: ed
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
TimesheetDatesSection.skin = {
    "selected": "sknLblMobOp100Bg2EBAEFFcFFFFFF",
    "unselected": "sknLblMobFC333333Op100FS34pxBor1pxRad100"
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
TimesheetDatesSection.prototype.setOnSelectionCallback = function(callback) {
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
TimesheetDatesSection.prototype.setData = function(data) {
    if (data === null || !Array.isArray(data) || data.length <= 0) {
        return;
    }
    this._parent.removeAll();
    this._data = data;
    for (var i = 0; i < this._data.length; i++) {
        var temp = this._template.clone(i);
        temp.onClick = function(index) {
                this.setSelectedItem(index);
                frmTimesheetHome.flxBlock.isVisible = false;
            }
            .bind(this, i);
        temp.widgets()[0].text = this._data[i][this.labelDataMap];
        temp.widgets()[0].skin = kony.apps.coe.ess.myTime.TimesheetDatesSection.skin.unselected;
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
TimesheetDatesSection.prototype.setSelectedItem = function(index) {
    index = parseInt(index);
    if (isNaN(index) || (this._selectedItem !== null && index === parseInt(this._selectedItem))) {
        return;
    }
    var presel = this._selectedItem;
    this._selectedItem = index;
    var flx = this._parent.widgets()[index];
    var lbl = flx.widgets()[0];
    lbl.skin = kony.apps.coe.ess.myTime.TimesheetDatesSection.skin.selected;
    if (presel !== null && presel !== this._selectedItem) {
        flx = this._parent.widgets()[presel];
        lbl = flx.widgets()[0];
        lbl.skin = kony.apps.coe.ess.myTime.TimesheetDatesSection.skin.unselected;
    }
    if (this._onSelectionCallback !== null) {
        this._onSelectionCallback(this.getSelectedItemData());
    }
};

kony.apps.coe.ess.myTime.
TimesheetDatesSection.prototype.invokeCallback = function() {
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
TimesheetDatesSection.prototype.getSelectedItemData = function() {
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
TimesheetRow = function() {
    this._selectedItem = null;
    this._onSelectionCallbackRight = null;
    this._data = null;
};

kony.apps.coe.ess.myTime.
TimesheetRow.prototype.getSelectedItemData = function() {
    if (this._selectedItem !== null && this._data !== null && this._selectedItem < this._data.length) {
        return this._data[this._selectedItem];
    } else {
        return null;
    }
};

kony.apps.coe.ess.myTime.
TimesheetRow.prototype.setSelectedItem = function(index, isLeft) {

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
TimesheetRow.prototype.setOnSelectionCallbackRight = function(callback) {
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
kony.apps.coe.ess.myTime.
TimesheetRow.getRowInstance = function(idSuffix, data, daystatus, weekends, timesheetstartdate, timesheetenddate) {
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

        var flxTimesheetDetailsRow = new kony.ui.FlexContainer({
            id: "flxTimesheetDetailsRow" + idSuffix,
            left: "0%",
            top: "0%",
            height: "14.4%",
            width: "100%",
            clipBounds: true,
            layoutType: kony.flex.FLOW_HORIZONTAL,
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0]
        }, {});
        var flxTimesheetDetailsLeft = new kony.ui.FlexContainer({
            id: "flxTimesheetDetailsLeft" + idSuffix,
            left: "0%",
            top: "0%",
            height: "100%",
            width: "16.9%",
            clipBounds: true,
            layoutType: kony.flex.FREE_FORM,
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0]
        }, {});
        var lblLeftDay = new kony.ui.Label({
            id: "lblLeftDay" + idSuffix,
            text: day,
            centerX: "50%",
            top: "10%",
            width: "100%",
            height: "preferred",
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0],
            contentAlignment: constants.CONTENT_ALIGN_CENTER
        }, {});

        var lblLeftDate = new kony.ui.Label({
            id: "lblLeftDate" + idSuffix,
            text: "" + parseInt(date),
            centerX: "50%",
            centerY: "50%",
            width: "44.4%",
            height: "41.2%",
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0],
            contentAlignment: constants.CONTENT_ALIGN_CENTER
        }, {});

        var lblLeftMonth = new kony.ui.Label({
            id: "lblLeftMonth" + idSuffix,
            text: month,
            centerX: "50%",
            bottom: "10%",
            width: "100%",
            height: "preferred",
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0],
            contentAlignment: constants.CONTENT_ALIGN_CENTER
        }, {});

        flxTimesheetDetailsLeft.add(lblLeftDay);
        flxTimesheetDetailsLeft.add(lblLeftDate);
        flxTimesheetDetailsLeft.add(lblLeftMonth);

        var flxTimesheetDetailsRight = new kony.ui.FlexContainer({
            id: "flxTimesheetDetailsRight" + idSuffix,
            left: "0%",
            top: "0%",
            height: "100%",
            width: "83.1%",
            clipBounds: true,
            layoutType: kony.flex.FREE_FORM,
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0]
        }, {});

        var flxTimesheetDetailsRightTimeline = new kony.ui.FlexScrollContainer({
            id: "flxTimesheetDetailsRightTimeline" + idSuffix,
            left: "1.9%",
            top: "8.6%",
            height: "82.8%",
            width: "96.2%",
            clipBounds: true,
            layoutType: kony.flex.FLOW_VERTICAL,
            scrollDirection: kony.flex.SCROLL_HORIZONTAL,
            allowVerticalBounce: false,
            allowHorizontalBounce: false,
            horizontalScrollIndicator: false,
            verticalScrollIndicator: false,
            bounces: false,
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0]
        }, {});

        var flxTimesheetDetailsRightTimelineHeader = new kony.ui.FlexContainer({
            id: "flxTimesheetDetailsRightTimelineHeader" + idSuffix,
            left: "0%",
            top: "0%",
            height: "35.2%",
            width: widthoftimeline,
            clipBounds: true,
            layoutType: kony.flex.FLOW_HORIZONTAL,
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0]
        }, {});

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
                }
                var flxTimesheetDetailsRightHour = new kony.ui.FlexContainer({
                    id: "flxTimesheetDetailsRightHour" + idSuffix + i,
                    left: "0%",
                    top: "0%",
                    height: "100%",
                    width: sizeofhours + "dp",
                    clipBounds: true,
                    layoutType: kony.flex.FREE_FORM,
                    zIndex: "1"
                }, {
                    padding: [0, 0, 0, 0]
                }, {});

                var lblTimesheetHour = new kony.ui.Label({
                    id: "lblTimesheetHour" + idSuffix + i,
                    text: ampmtime,
                    top: "0%",
                    centerX: "50%",
                    width: "preferred",
                    height: "preferred",
                    skin: "sknLblMobFC333333Op100FS18px",
                    contentAlignment: constants.CONTENT_ALIGN_CENTER,
                    zIndex: "1"
                }, {
                    padding: [0, 0, 0, 0]
                }, {});

                var flxTimesheetHourMark = new kony.ui.FlexContainer({
                    id: "flxTimesheetHourMark" + idSuffix + i,
                    bottom: "0%",
                    height: "35%",
                    width: "2px",
                    centerX: "50%",
                    clipBounds: true,
                    skin: "sknFlxMobBG979797Op100",
                    zIndex: "1"
                }, {
                    padding: [0, 0, 0, 0]
                }, {});
                if (kony.apps.coe.ess.appconfig.isManualTimeEntry === false) {
                    flxTimesheetDetailsRightHour.add(lblTimesheetHour);
                    flxTimesheetDetailsRightHour.add(flxTimesheetHourMark);
                }

                flxTimesheetDetailsRightTimelineHeader.add(flxTimesheetDetailsRightHour);
            }
        }

        flxTimesheetDetailsRightTimeline.add(flxTimesheetDetailsRightTimelineHeader);

        var flxTimesheetDetailsRightTimelineAllTasks = new kony.ui.FlexContainer({
            id: "flxTimesheetDetailsRightTimelineAllTasks" + idSuffix,
            left: "0%",
            top: "0%",
            height: "64.8%",
            width: widthoftimeline,
            clipBounds: true,
            layoutType: kony.flex.FREE_FORM,
            zIndex: "1"
        }, {
            padding: [0, 0, 0, 0]
        }, {});

        var perminfactor = sizeofhours / 60;
        if (data.tasks !== null && data.tasks !== undefined && data.tasks.length > 0) {
            for (var i = 0; i < data.tasks.length; i++) {
                var duration = (Date.parse(data.tasks[i].endtime) - Date.parse(data.tasks[i].starttime)) / 60000;
                //}
                var left = ((data.tasks[i].starttime.totalMinutesFromMorning() - starttimeline * 60) * perminfactor + (sizeofhours / 2)) + "dp";
                var width = (perminfactor * duration) + "dp";
                var skin = "";
                if (data.tasks[i].isBillable === true || String(data.tasks[i].isBillable) === "1") {
                    skin = "sknFlxMobBg2D86E2Op80";
                } else {
                    skin = "sknFlxMobBg1C7393Op80";
                }

                var flxTimesheetDetailsRightTimelineTask = new kony.ui.FlexContainer({
                    id: "flxTimesheetDetailsRightTimelineTask" + idSuffix + i,
                    left: left,
                    top: "2%",
                    height: "98%",
                    width: width,
                    clipBounds: true,
                    skin: skin,
                    layoutType: kony.flex.FREE_FORM,
                    zIndex: "1"
                }, {
                    padding: [0, 0, 0, 0]
                }, {});

                var lblTimesheetDetailsTimelineTaskName = new kony.ui.Label({
                    id: "lblTimesheetDetailsTimelineTaskName" + idSuffix + i,
                    text: data.tasks[i].taskname,
                    top: "10%",
                    //left: "2%",
                    centerX: "50%",
                    width: "preferred",
                    height: "preferred",
                    skin: "sknLblMobFCFFFFFFFS71",
                    contentAlignment: constants.CONTENT_ALIGN_CENTER,
                    zIndex: "1"
                }, {
                    padding: [0, 0, 0, 0]
                }, {});

                var lblTimesheetDetailsTimelineTaskDuration = new kony.ui.Label({
                    id: "lblTimesheetDetailsTimelineTaskDuration" + idSuffix + i,
                    text: minutesToTimeFormat(duration),
                    bottom: "10%",
                    centerX: "50%",
                    width: "preferred",
                    height: "preferred",
                    skin: "sknLblMobFCFFFFFFFS64",
                    contentAlignment: constants.CONTENT_ALIGN_CENTER,
                    zIndex: "1"
                }, {
                    padding: [0, 0, 0, 0]
                }, {});

                if (daystatus == "0") {
                    flxTimesheetDetailsRightTimelineTask.skin = "sknFlxMob00C6AE100O";
                }
                flxTimesheetDetailsRightTimelineTask.add(lblTimesheetDetailsTimelineTaskName);
                flxTimesheetDetailsRightTimelineTask.add(lblTimesheetDetailsTimelineTaskDuration);
                flxTimesheetDetailsRightTimelineAllTasks.add(flxTimesheetDetailsRightTimelineTask);

            }
        } else {
            if (day == "MON") {
                var lblPlaceHolder = new kony.ui.Label({
                    id: "lblPlaceHolder" + idSuffix,
                    text: "Tap to initiate time writing",
                    left: "0%",
                    //centerY: "50%",
                    width: "preferred",
                    height: "preferred",
                    skin: "sknlbldddddd28px",
                    contentAlignment: constants.CONTENT_ALIGN_CENTER,
                    zIndex: "1"
                }, {
                    padding: [0, 0, 0, 0]
                }, {});
                flxTimesheetDetailsRightTimeline.add(lblPlaceHolder);
            }
        }

        flxTimesheetDetailsRightTimeline.add(flxTimesheetDetailsRightTimelineAllTasks);

        flxTimesheetDetailsRight.add(flxTimesheetDetailsRightTimeline);
        flxTimesheetDetailsRow.add(flxTimesheetDetailsLeft);
        flxTimesheetDetailsRow.add(flxTimesheetDetailsRight);

        //      Skins assignment according to data.
        if (daystatus == "0") {
            flxTimesheetDetailsLeft.skin = "sknFlxMob00C6AE100BorDDDDDD1px100";
            lblLeftDate.skin = "sknLblMobFCFFFFFF34px";
            lblLeftDay.skin = "sknLblMobFCFFFFFF20px";
            lblLeftMonth.skin = "sknLblMobFCFFFFFF18px";

            if (data.tasks.length > 0) {
                flxTimesheetDetailsRight.skin = "sknMobFlx61D8CA100OBorDDDDDD1px100O";
            }
        } else {

            flxTimesheetDetailsLeft.skin = "sknFlxMobBGF8F8F8Op100BorDDDDDD";
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
                flxTimesheetDetailsRight.skin = "sknFlxMobBGF8F8F8Op100BorDDDDDD";
            } else {
                flxTimesheetDetailsRight.skin = "sknFlxMobBgFFFFFFBorCDDDDDD";
            }
            if (isPartOfCurrentTimesheet() && (daystatus === "5" || daystatus === "-1" || daystatus === "1" || daystatus === "6")) {
                flxTimesheetDetailsLeft.onClick = function(index) {
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
                    .bind(this, idSuffix);
            }
        }
        if (isPartOfCurrentTimesheet() && (daystatus === "5" || daystatus === "-1" || daystatus === "1" || daystatus === "6")) {
            flxTimesheetDetailsRightTimeline.setGestureRecognizer(constants.GESTURE_TYPE_TAP, {
                    fingers: 1,
                    taps: 1
                }, function(index) {
                    this.setSelectedItem(index, false);
                }
                .bind(this, idSuffix));
        }
        return flxTimesheetDetailsRow;
    } catch (err) {
        handleError(err);
    }

    function isPartOfCurrentTimesheet() {
        if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig === "monthly") {
            return timesheetstartdate <= data.date && data.date <= timesheetenddate;
        }
        return true;
    }
};

/*
 * @class       TimesheetRow
 * @type        class prototype
 * @param       {JsonObject} data - It contains all the data which needs to show in widgets.
 * return       None.
 * desc         This prototype is used to create dynamic rows and populate data in them.
 */
kony.apps.coe.ess.myTime.
TimesheetRow.prototype.setData = function(data, timesheetstartdate, timesheetenddate) {
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

    frmTimesheetHome.flxBlock.isVisible = false;
    var successCallback = function(res) {
            var weekends = {};
            for (var i = 0; i < res.length; i++) {
                weekends[res[i].Date] = "";
            }
            this._data = data;
            frmTimesheetHome.flxTimesheetDetails.removeAll();
            for (var i = 0; i < data.length; i++) {
                var temp = kony.apps.coe.ess.myTime.TimesheetRow.getRowInstance.call(this, i, this._data[i], this._data[i].daystatus, weekends, timesheetstartdate, timesheetenddate);
                frmTimesheetHome.flxTimesheetDetails.add(temp);
            }
        }
        .bind(this);
    var query = "select h.Holiday_Date as Date from Holiday h where h.Type = '3';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, function(err) {
        handleError(err);
    });
    var copyData = [];
    var tempData = [];
    for (var i = 0; i < data.length; i++) {
        var taskData = data[i].tasks;
        var j = 0;
        while (j < taskData.length) {
            var startTime = convertHoursMinutesForTimeline(taskData[j].starttime.getHours(), taskData[j].starttime.getMinutes());
            var endTime = convertHoursMinutesForTimeline(taskData[j].endtime.getHours(), taskData[j].endtime.getMinutes());
            tempData.push({
                date: data[i].date.toString(),
                timeslot: startTime + " to " + endTime
            });
            j++;
        }
        copyData.push(tempData);
    }
    kony.apps.coe.ess.myTime.TimesheetCreate.CloneDatesData = tempData;
};

kony.apps.coe.ess.myTime.TimesheetHomeClone = {
    hideAllPopups: function() {
        frmTimesheetHome.flxBlock.isVisible = false;
        frmTimesheetHome.flxBlank.isVisible = false;
        frmTimesheetHome.flxHomePopupClone.isVisible = false;
        frmTimesheetHome.flxHomePopupCloneSuccessful.isVisible = false;
        frmTimesheetHome.flxHomePopupClone1.isVisible = false;
        frmTimesheetHome.flxHomePopupCloneSuccessful1.isVisible = false;
    },

    showSPAMenuOptions: function() {
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
        frmTimesheetHome.flxBlank.isVisible = true;
        frmTimesheetHome.flxBlank.flxMenuWeb.isVisible = true;
        frmTimesheetHome.forceLayout();

    },

    hideSPAMenuOptions: function() {
        frmTimesheetHome.flxMenuWeb.isVisible = false;
        if (kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.getInstance().isMenuButtonClicked === true) {
            kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.getInstance().toggleMenuButton();
        }
    },

    onPopupClickRowOne: function() {
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
        frmTimesheetHome.flxBlank.isVisible = true;
        frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
        frmTimesheetHome.flxHomePopupClone.isVisible = true;
    },
    onPopupClickRowTwo: function() {
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
        frmTimesheetHome.flxBlank.isVisible = true;
        frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
        frmTimesheetHome.flxHomePopupClone1.isVisible = true;
    },
    ViewSuccessPopupHome: function() {
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
        frmTimesheetHome.flxBlank.isVisible = true;
        frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
        frmTimesheetHome.flxHomePopupCloneSuccessful.isVisible = true;
    },
    ViewSuccessPopupHome1: function() {
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
        frmTimesheetHome.flxBlank.isVisible = true;
        frmTimesheetHome.flxBlank.skin = "sknflxMob33333376O";
        frmTimesheetHome.flxHomePopupCloneSuccessful1.isVisible = true;
        refreshTimesheetHomeForm();
    },
    onClickHomePopupCloneSuccessfulOk: function() {
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
    },
    CloneLastTimeEntry: function() {
        kony.application.showLoadingScreen("", "Cloning Timeline", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
        kony.apps.coe.ess.myTime.TimesheetCreate.Clone.isTimeEntryExistForDate(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData().date.previousDay(), function(res) {
            if (res === true) {
                kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimelineFromLastEntry(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData().date, function() {
                    kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
                    refreshTimesheetHomeForm();
                    kony.application.dismissLoadingScreen();
                    toastMessage.showToastMsg("Task successfully cloned", 2000);
                }, function(err) {
                    kony.application.dismissLoadingScreen();
                    handleError(err);
                });
            } else if (res === false) {
                kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
                kony.application.dismissLoadingScreen();
                toastMessage.showToastMsg("No Task for cloning", 2000);
            }
        }, function(err) { handleError(err); });
    },
    cloneFromLastWeek: function() {
        kony.application.showLoadingScreen("", "Cloning Timesheet", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
        var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData().date, new Date(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData().date.getFullYear(), 1, 1));
        kony.apps.coe.ess.myTime.TimesheetCreate.Clone.isTimeEntryExistForTimesheet(interval[0].previousDay(), function(res) {
            if (res === true) {
                kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneFromLastTimesheet(kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowObj.getSelectedItemData().date, function() {
                    kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
                    refreshTimesheetHomeForm();
                    kony.application.dismissLoadingScreen();
                    toastMessage.showToastMsg("Task successfully cloned", 2000);
                }, function(err) {
                    kony.application.dismissLoadingScreen();
                    handleError(err);
                });
            } else if (res === false) {
                kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
                kony.application.dismissLoadingScreen();
                toastMessage.showToastMsg("No Task for cloning", 2000);
            }
        }, function(err) { handleError(err); });
    }
};

kony.apps.coe.ess.myTime.submitTimesheet = function() {
    var dataItem = kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.getSelectedItemData();
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
/**
 * @class          myTime
 * @type           Function.
 * @param          None
 * @return         None
 * @description    This method calls the required functions and allocates cache storage for different variables
 */
kony.apps.coe.ess.myTime.invokePostShowFunctions = function(){
  if(kony.store.getItem("isFirstTime") === undefined || kony.store.getItem("isFirstTime") === null){
    outerFlexFooterNavigation.setVisibility(false);
  }
  if(typeof(kony.store.getItem("manualTimeEntry"))=== "boolean"){
    kony.apps.coe.ess.appconfig.isManualTimeEntry = kony.store.getItem("manualTimeEntry");
  }
  if(kony.store.getItem("defaultTaskDuration") === undefined || kony.store.getItem("defaultTaskDuration") === null){
    kony.store.setItem("defaultTaskDuration",2);
  }
};
kony.apps.coe.ess.myTime.frmTimesheetHomeUI = kony.apps.coe.ess.myTime.frmTimesheetHomeUI || {};

kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA = function() {
    kony.print("--Start constructor: kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA--");
    this.isMenuButtonClicked = false;
    kony.print("--End constructor: kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA--");
};

kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.getInstance = function() {
    if (kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.singletonObj !== undefined) {
        return kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.singletonObj;
    } else {
        kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.singletonObj = new kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA();
        return kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.singletonObj;
    }
}

kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.prototype.setHeaderConfiguration = function() {
    kony.print("--Start: kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.prototype.setHeaderConfiguration--");
    if (kony.apps.coe.ess.globalVariables.isSPA) {
        flxHeaderHomeAndView.isVisible = true;
        outerFlexFooterNavigation.isVisible = false;
        frmTimesheetHome.flxHeader.isVisible = false;
    } else {
        flxHeaderHomeAndView.isVisible = false;
        outerFlexFooterNavigation.isVisible = true;
        frmTimesheetHome.flxHeader.isVisible = true;
    }
    kony.print("--End: kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.prototype.setHeaderConfiguration--");
};

kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.prototype.toggleMenuButton = function(callback) {
    kony.print("--Start: kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.prototype.toggleMenuButton--");
    this.isMenuButtonClicked = (this.isMenuButtonClicked === false);
    if (this.isMenuButtonClicked === true) {
        frmTimesheetHome.imgMoreButton.src = "moreselected_mw.png";
    } else {
        frmTimesheetHome.imgMoreButton.src = "more_mw.png";
    }
    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
        callback(this.isMenuButtonClicked);
    } else {
        kony.print("callback is null || undefined || not a function ");
    }
    kony.print("--End: kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.prototype.toggleMenuButton--");
};