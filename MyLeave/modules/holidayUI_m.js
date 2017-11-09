
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
	var query = "select h.Holiday_Date,h.Name, CASE WHEN (tr_fr.TEXT_CODE = '' OR  tr_fr.TEXT_CODE ISNULL) THEN tr_en.TEXT_DISPLAY ELSE tr_fr.TEXT_DISPLAY END AS TEXT_DISPLAY,tr_en.TEXT_CODE, tr_fr.TEXT_CODE from Holiday h LEFT JOIN translation tr_en ON ( h.Name = tr_en.TEXT_CODE AND tr_en.SPRAS like 'EN') LEFT JOIN translation tr_fr ON "+
        "( h.Name = tr_fr.TEXT_CODE AND tr_fr.SPRAS like '"+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"')"+
 		" where h.Name not like 'Non Working Day'  and (Holiday_Date between '" + currYear + "0101' AND '" + currYear + "1231')";
	kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function (data) {
		var processedData = [];
		for (var i = 0; i < data.length; i++) {
			var holidayData = {};
			holidayData.lblHoliday = data[i].Name;
			var date = data[i].Holiday_Date;
			var holidayDate = parseInt(date.substring(6, 8)) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(date.substring(4, 6) * 1) - 1).toString()];
			holidayData.lblDate = holidayDate;
			holidayData.imgPic = "starblue.png";
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
		"0": kony.i18n.getLocalizedString("i18n.ess.MyLeave.Mon"), //"Mon",
        "1": kony.i18n.getLocalizedString("i18n.ess.MyLeave.Tue"), //"Tue",
        "2": kony.i18n.getLocalizedString("i18n.ess.MyLeave.Wed"), //"Wed",
        "3": kony.i18n.getLocalizedString("i18n.ess.MyLeave.Thu"), //"Thu",
        "4": kony.i18n.getLocalizedString("i18n.ess.MyLeave.Fri"), //"Fri",
        "5": kony.i18n.getLocalizedString("i18n.ess.MyLeave.Sat"), //"Sat",
        "6": kony.i18n.getLocalizedString("i18n.ess.MyLeave.Sun"), //"Sun"
	},
	"month" : {
		"0" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jan"), //"Jan",
		"1" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.feb"), //"Feb",
		"2" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.mar"),//"Mar",
		"3" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.apr"),//"Apr",
		"4" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.may"),//"May",
		"5" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jun"),//"Jun",
		"6" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jul"),//"Jul",
		"7" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.aug"),//"Aug",
		"8" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.sep"),//"Sep",
		"9" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.oct"),//"Oct",
		"10" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.nov"),//"Nov",
		"11" : kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.dec")//"Dec"
	},
	"fullmonth" : {
		"0": kony.i18n.getLocalizedString("i18n.ess.Date.Month.january"),// "January";
        "1": kony.i18n.getLocalizedString("i18n.ess.Date.Month.Febrauary"),//"February";
        "2": kony.i18n.getLocalizedString("i18n.ess.Date.Month.March"),//"March";
        "3": kony.i18n.getLocalizedString("i18n.ess.Date.Month.April"),//"April";
        "4": kony.i18n.getLocalizedString("i18n.ess.Date.Month.May"),//"May";
        "5": kony.i18n.getLocalizedString("i18n.ess.Date.Month.June"),//"June";
        "6": kony.i18n.getLocalizedString("i18n.ess.Date.Month.July"),//"July";
        "7": kony.i18n.getLocalizedString("i18n.ess.Date.Month.August"),//"August";
        "8": kony.i18n.getLocalizedString("i18n.ess.Date.Month.September"),//"September";
        "9": kony.i18n.getLocalizedString("i18n.ess.Date.Month.October"),//"October";
        "10": kony.i18n.getLocalizedString("i18n.ess.Date.Month.November"),//"November";
        "11": kony.i18n.getLocalizedString("i18n.ess.Date.Month.December")//"December";
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
  	if(data.length !=null && data.length >0){
      frmHolidays.segListOfHolidays.setData(data);
      frmHolidays.lblNoRecords.setVisibility(false);
    }else{
      frmHolidays.segListOfHolidays.removeAll();
      frmHolidays.lblNoRecords.setVisibility(true);
    }
	kony.print("-- End setDataToHolidayForm --");
};
