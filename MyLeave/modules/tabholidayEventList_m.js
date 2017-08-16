/**
 * @module Holiday
 * @Author Ritika.Arora
 * @category  UI
 * @desc HolidayUI class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.tabHolidayUI = function() {
    kony.print("-- Start tabHolidayUI --");
    kony.print("-- End tabHolidayUI --");
};

/**
 * @function getData
 * @member of tabHolidayUI#
 * @return - {void}
 * @description - code for data mapping for segment row
 */
kony.apps.coe.ess.myLeave.tabHolidayUI.prototype.processHolidayData = function(data) {
    var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0, 4);
    var processedData = [];
    for (var i = 0; i < data.length; i++) {
        var holidayData = {};
        var date = data[i].Holiday_Date;
        var holidayDate = parseInt(date.substring(6, 8),10) + "";
        var holidayMonth = kony.apps.coe.ess.myLeave.nToStr.fullmonth[(parseInt(date.substring(4, 6) * 1,10) - 1).toString()];
        holidayData = {
            lblHolidayOccasion: data[i].Name,
            lblHolidayMonth: holidayMonth,
            lblHolidayDate: holidayDate,
            lblHolidaySepratorLine: {
                text: "",
                isVisible: true
            },
            lblHolidaySeperator2: {
                text: "",
                isVisible: true
            }
        };
        processedData.push(holidayData);
    }
    frmTabHolidayList.lblHolidayYear.text = currYear;
    return processedData;

};

/**
 * @function getData
 * @member of tabHolidayUI#
 * @return - {void}
 * @description - code for data mapping for segment row
 */
kony.apps.coe.ess.myLeave.tabHolidayUI.prototype.processDataForEvents = function(data) {
    var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0, 4);
    var processedData = [];
    for (var i = 0; i < data.length; i++) {
        var eventData = {};
        var date = data[i].Holiday_Date;
        var holidayDate = parseInt(date.substring(6, 8),10) + "";
        var holidayMonth = kony.apps.coe.ess.myLeave.nToStr.fullmonth[(parseInt(date.substring(4, 6),10) - 1).toString()];
        eventData = {
            lblHolidayOccasion: data[i].Name,
            lblHolidayMonth: holidayMonth,
            lblHolidayDate: holidayDate,
            lblHolidaySepratorLine: {
                text: "",
                isVisible: true
            },
            lblHolidaySeperator2: {
                text: "",
                isVisible: true
            }
        };
        processedData.push(eventData);
    }
    frmTabHolidayList.lblEventYear.text = currYear;
    return processedData;
};


/**
 * @function nToStr
 * @member of HolidayUI#
 * @return - {void}
 * @description - code for converting numbers into string for week,months,fullmonths.
 */
kony.apps.coe.ess.myLeave.nToStr = kony.apps.coe.ess.myLeave.nToStr || {
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