
//-----------------------------------File Header -------------------------------------------------
/**
 * @module Holiday
 * @Author Waseem Ahmed
 * @category  UI
 * @desc HolidayUI class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.HolidayUI = function () {
	kony.print("-- Start HolidayUI --");
	kony.print("-- End HolidayUI --");
};

/**
 * @function getData
 * @member of HolidayUI#
 * @return - {void}
 * @description - code for data mapping for segment row
 */
kony.apps.coe.ess.myLeave.HolidayUI.prototype.getData = function () {
    var currYear = (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.year).toString().trim(0,4);
	var query = "select Holiday_Date,Name from Holiday where Name not like 'Non Working Day' and (Holiday_Date between '" + currYear + "0101' AND '" + currYear + "1231')";
	kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function (data) {
		var processedData = [];
		for (var i = 0; i < data.length; i++) {
			var holidayData = {};
			holidayData.lblHoliday = data[i].Name;
			var date = data[i].Holiday_Date;
			var holidayDate = parseInt(date.substring(6, 8)) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(date.substring(4, 6) * 1) - 1).toString()];
			holidayData.lblDate = holidayDate;
			holidayData.imgPic = "baloon_white.png";
			holidayData.lblLine1 = " ";
			processedData.push(holidayData);
			kony.apps.coe.ess.myLeave.HolidayUI.setDataToHolidayForm(processedData);
		}

	}, function (err) {
		 handleError(err);
	}, false);
};
/**
 * @function addAlternateSkinToSegment
 * @member of HolidayUI#
 * @return - {void}
 * @description - This method is used for adding the skin for row alternate.
 */
kony.apps.coe.ess.myLeave.HolidayUI.prototype.addAlternateSkinToSegment = function (data, firstSkin, secondSkin) {
	try {
		if (typeof data != "undefined" && data !== null && data.length !== null && data.length > 0) {
			for (var index = 0; index < data.length; index++) {
				if (index % 2 === 0) {
					data[index].flxSegTemp = {
						"skin" : firstSkin
					};
				} else {
					data[index].flxSegTemp = {
						"skin" : secondSkin
					};
				}
			}
		}
		return data;
	} catch (e) {
		handleError(e);
	}
};

/**
 * @function nToStr
 * @member of HolidayUI#
 * @return - {void}
 * @description - code for converting numbers into string for week,months,fullmonths.
 */
kony.apps.coe.ess.myLeave.nToStr = kony.apps.coe.ess.myLeave.nToStr || {
	"week" : {
		"0": "Mon",
        "1": "Tue",
        "2": "Wed",
        "3": "Thu",
        "4": "Fri",
        "5": "Sat",
        "6": "Sun"
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

/**
 * @function setDataToHolidayForm
 * @member of HolidayUI#
 * @return - {void}
 * @description - code for setting data for holiday form.
 */

kony.apps.coe.ess.myLeave.HolidayUI.setDataToHolidayForm = function (data) {
	kony.print("-- Start setDataToHolidayForm --");
	data = (new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI()).addAlternateSkinToSegment(data, "flxMain", "sknSegRowFAFAFAop100", "sknSegAltRowF8F8F8op100");
	frmHolidays.segListOfHolidays.setData(data);
	kony.print("-- End setDataToHolidayForm --");
};
