/** 
 *  @author     Parveen.Chahal
 *  @category   Business Logic.	
 *  @desc       Contains the functions which are related to Date.
 *  @ © 2016    Kony Inc. 
 */

/**
 * @memberof       Date
 * @param          None.
 * @return         {Date} - A Date Object.
 * @description    This method is use to round off the date object.
 *                 It set Hours = 0.
 *                 It set Minutes = 0.
 *                 It set Seconds = 0.
 *                 It set Milliseconds = 0.
 */
Date.prototype.roundOfLocaleDate = function() {
	var d = new Date(this);
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return d;
};

/**
 * @memberof       Date
 * @param          {Date} date - A Date object.
 * @return         {Boolean}.
 * @description    This method is use to check whether passed Date is of Today's date or not.
 */
Date.isTodayDate = function(date) {
	date = new Date(date);
	var msa = date.roundOfLocaleDate();
  	var today = (new Date()).roundOfLocaleDate();
  	var diff = (Date.parse(today) - Date.parse(msa)) / 86400000;
  	return diff === 0;
};


Date.prototype.totalMinutesFromMorning = function() {
    var rd = this.roundOfLocaleDate();
    return (Date.parse(this) - Date.parse(rd)) / 60000;
};


/**
 * @memberof       Date
 * @param          {Date} date - A Date object.
 * @return         {Boolean}.
 * @description    This method is use to check whether passed Date is of Tomorrow's date or not.
 */
Date.isTomorrowDate = function(date) {
	date = new Date(date);
	var msa = date.roundOfLocaleDate();
  	var today = (new Date()).roundOfLocaleDate();
  	var diff = (Date.parse(today) - Date.parse(msa)) / 86400000;
  	return diff === -1;
};

/**
 * @memberof       Date
 * @param          None.
 * @return         {Array} - A Array of size two.
 * @description    This method is use to get interval of this week dates.
 */
Date.prototype.thisWeekInterval = function(weekstartday) {
    // By Default week is starting on Monday.
	weekstartday = parseInt(weekstartday);
	if(isNaN(weekstartday) || weekstartday < 0 || weekstartday > 6) {
	    weekstartday = 1;
	}
	var dateonly = this.roundOfLocaleDate();
	var d = dateonly.getDay();
	d = dateonly.getDay() >= weekstartday ? d - weekstartday : 7 + d - weekstartday;
	var first = new Date(Date.parse(dateonly) - 86400000 * d);
	var last = new Date(Date.parse(first) + 86400000 * 6);
	return [first, last];
};

Date.prototype.previousWeekInterval = function(weekstartday) {
    // By Default week is starting on Monday. 
	var thisweek = this.thisWeekInterval(weekstartday);
	var previousWeek = [
	    new Date(Date.parse(thisweek[0]) - 604800000),
		new Date(Date.parse(thisweek[1]) - 604800000)
	];
	return previousWeek;
};

Date.prototype.previousDay = function() {
    var dateonly = this.roundOfLocaleDate();
	return new Date(Date.parse(dateonly) - 86400000);
};

Date.prototype.thisMonthInterval = function() {
    var first = this.roundOfLocaleDate();
	first.setDate(1);
	var last = new Date(first);
	if(parseInt(last.getMonth()) >= 11) {
	    last.setMonth(1);
		last.setFullYear(last.getFullYear() + 1);
		last = new Date(Date.parse(last) - 86400000);
	} else {
	    last.setMonth(first.getMonth() + 1);
		last = new Date(Date.parse(last) - 86400000);
	}
	return [first, last];
};

Date.prototype.nextDay = function() {
    var dateonly = this.roundOfLocaleDate();
	return new Date(Date.parse(dateonly) + 86400000);
};

/**
 * @memberof       Date
 * @param          {Date} date - A Date object.
 * @return         {Boolean}.
 * @description    This method is use to check whether passed Date is of Yesterday's date or not.
 */
Date.isYesterdayDate = function(date) {
	date = new Date(date);
	var msa = date.roundOfLocaleDate();
  	var today = (new Date()).roundOfLocaleDate();
  	var diff = (Date.parse(today) - Date.parse(msa)) / 86400000;
  	return diff === 1;
};

/**
 * @memberof       Date
 * @param          None.
 * @return         {String}.
 * @description    This method return count of days from Today's Date.
 */
Date.prototype.getNDaysFromNow = function() {
  	var msa = this.roundOfLocaleDate();
  	var today = (new Date()).roundOfLocaleDate();
  	var diff = (Date.parse(today) - Date.parse(msa)) / 86400000;
  	diff = parseInt(diff);
  	switch(diff) {
      case 0:
        return "Today";
      case -1:
        return "Tomorrow";
      case 1:
        return "Yesterday";
    }
  	return diff > 0 ? diff + " days ago" : -diff + " days to go";
};
/**
 * @memberof       Date
 * @param          Date.
 * @return         {String}.
 * @description    This method return difference of days. If no parameter passed, It will take current date by default
 */
Date.prototype.differenceInDays = function(toDate) {
  	if(!toDate) {
      toDate = new Date();
    }
  	var fromDate = this.roundOfLocaleDate();
  	var diff = (Date.parse(fromDate) - Date.parse(toDate)) / 86400000;
  	diff = parseInt(diff);
  	return diff === 1 ? diff + " Day" : diff + " Days";
};



/**
 * @memberof       Date
 * @param          None.
 * @return         {Date} - A Date Object.
 * @description    This method is use to round off the date object.
 *                 It set UTC Hours = 0.
 *                 It set UTC Minutes = 0.
 *                 It set UTC Seconds = 0.
 *                 It set UTC Milliseconds = 0.
 */
Date.prototype.roundOfUTCDate = function() {
	var d = new Date(this);
	d.setUTCHours(0);
	d.setUTCMinutes(0);
	d.setUTCSeconds(0);
	d.setUTCMilliseconds(0);
	return d;
};

/**
 * @memberof       Date
 * @param          {Date, String} date.
 * @return         {Number}
 *                 Positive - If current date object is greater than passed one.
 * @description    This method comapre Date & Time.
 */
Date.prototype.compare = function(date) {
	if (date === null || date === undefined) {
		return null;
	}
  	if(typeof(date) === "string") {
        date = Date.convertStrToDateObj(date);
      	if(date === null || isNaN(date)) {
            return 1;
        }
    } else {
        date = new Date(date);
    }
	return this - date;
};

/**
 * @memberof       Date
 * @param          {Date, String} date.
 * @return         {Number}
 *                 Positive - If current date object is greater than passed one.
 * @description    This method comapre Date Only.
 */
Date.prototype.compareOnlyDate = function(date) {
	if (date === null || date === undefined) {
		return null;
	}
  	if(typeof(date) === "string") {
        date = Date.convertStrToDateObj(date);
      	if(date === null || isNaN(date)) {
            return 1;
        }
    } else {
        date = new Date(date);
    }
	var d1 = this.toYYYYMMDD();
	var d2 = date.toYYYYMMDD();
	return d1.localeCompare(d2);
};

/**
 * @memberof       Date
 * @param          {String} separatedby - dd, mm, yyyy are separatedby passed param if it is undefined then it would be "/".
 * @return         {String} - Date in YYYYMMDD format.
 * @description    This method is use to format date display in YYYYMMDD.
 */
Date.prototype.toYYYYMMDD = function(separatedby) {
	function makeItOfTwoDigits(num) {
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}
	var dd = makeItOfTwoDigits(this.getDate());
	var mm = makeItOfTwoDigits(this.getMonth() + 1);
	var yy = this.getFullYear();
  	if(separatedby !== null && separatedby !== undefined && typeof(separatedby) === "string") {
        return yy + separatedby + mm + separatedby + dd;
    }
	return yy + "/" + mm + "/" + dd;
};

/**
 * @memberof       Date
 * @param          {String} separatedby - dd, mm, yyyy are separatedby passed param if it is undefined then it would be "/".
 * @return         {String} - Date in MMDDYYYY format.
 * @description    This method is use to format date display in MMDDYYYY.
 */
Date.prototype.toMMDDYYYY = function(separatedby) {
	function makeItOfTwoDigits(num) {
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}
	var dd = makeItOfTwoDigits(this.getDate());
	var mm = makeItOfTwoDigits(this.getMonth() + 1);
	var yy = this.getFullYear();
  	if(separatedby !== null && separatedby !== undefined && typeof(separatedby) === "string") {
        return mm + separatedby + dd + separatedby + yy;
    }
	return mm + "/" + dd + "/" + yy;
};

/**
 * @memberof       Date
 * @param          {String} separatedby - dd, mm, yyyy are separatedby passed param if it is undefined then it would be "/".
 * @return         {String} - Date in DDMMYYYY format.
 * @description    This method is use to format date display in DDMMYYYY.
 */
Date.prototype.toDDMMYYYY = function(separatedby) {
	function makeItOfTwoDigits(num) {
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}
	var dd = makeItOfTwoDigits(this.getDate());
	var mm = makeItOfTwoDigits(this.getMonth() + 1);
	var yy = this.getFullYear();
  	if(separatedby !== null && separatedby !== undefined && typeof(separatedby) === "string") {
        return dd + separatedby + mm + separatedby + yy;
    }
	return dd + "/" + mm + "/" + yy;
};

/**
 * @memberof       Date
 * @param          None.
 * @return         {String} - Date in format of YYYY-MM-DD HH:MI:SS.
 * @description    This method is use to format locale date in YYYY-MM-DD HH:MI:SS.
 */
Date.prototype.getLocaleDateForDB = function() {
	function makeItOfTwoDigits(num) {
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}
	var dd = makeItOfTwoDigits(this.getDate());
	var mm = makeItOfTwoDigits(this.getMonth() + 1);
	var yy = this.getFullYear();
	var hh = makeItOfTwoDigits(this.getHours());
	var mi = makeItOfTwoDigits(this.getMinutes());
	var ss = makeItOfTwoDigits(this.getSeconds());
	return yy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
};

/**
 * @memberof       Date
 * @param          None.
 * @return         {String} - Date in format of YYYY-MM-DD HH:MI:SS.
 * @description    This method is use to format UTC date in YYYY-MM-DD HH:MI:SS.
 */
Date.prototype.getUTCDateForDB = function() {
	function makeItOfTwoDigits(num) {
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}
	var dd = makeItOfTwoDigits(this.getUTCDate());
	var mm = makeItOfTwoDigits(this.getUTCMonth() + 1);
	var yy = this.getUTCFullYear();
	var hh = makeItOfTwoDigits(this.getUTCHours());
	var mi = makeItOfTwoDigits(this.getUTCMinutes());
	var ss = makeItOfTwoDigits(this.getUTCSeconds());
	return yy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
};

/**
 * @memberof       Date
 * @param          {string} separatedby - the separator of the date
 * @return         {String} - Date in format of YYYY-MM-DD HH:MI:SS.
 * @description    This method is use to format time to HHMMSS.
 */
Date.prototype.toHHMMSS = function(separatedby) {
	function makeItOfTwoDigits(num) {
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}
	var hh = makeItOfTwoDigits(this.getHours());
	var mm = makeItOfTwoDigits(this.getMinutes());
	var ss = makeItOfTwoDigits(this.getSeconds());
  	if(separatedby !== null && separatedby !== undefined && typeof(separatedby) === "string") {
        return hh + separatedby + mm + separatedby + ss;
    }
	return hh + ":" + mm + ":" + ss;
};

/**
 * @memberof       Date
 * @param          None.
 * @return         {Number} - Difference between current locale Date and UTC Date in Milliseconds.
 * @description    This method returns difference between current locale and UTC Date and Time in Milliseconds
 */
Date.getTimeDiffWithGMT = function() {
	var date = new Date();
	var ddL = date.getDate();
	var mmL = date.getMonth();
	var yyL = date.getFullYear();
	var hhL = date.getHours();
	var miL = date.getMinutes();
	var ssL = date.getSeconds();
	var msL = date.getMilliseconds();

	var ddU = date.getUTCDate();
	var mmU = date.getUTCMonth();
	var yyU = date.getUTCFullYear();
	var hhU = date.getUTCHours();
	var miU = date.getUTCMinutes();
	var ssU = date.getUTCSeconds();
	var msU = date.getUTCMilliseconds();
	var L = new Date(yyL, mmL - 1, ddL, hhL, miL, ssL, msL);
	var U = new Date(yyU, mmU - 1, ddU, hhU, miU, ssU, msU);
	return Date.parse(L) - Date.parse(U);
};

/**
 * @memberof       Date
 * @param          {Date, String} dateString.
 * @return         {Date} - A date object from string of date.
 * @description    This method make a date object from string of date.
 */
Date.convertStrToDateObj = function(dateString) {
    if (dateString === null || typeof dateString === undefined) {
        return dateString;
    }

    if (typeof(dateString) !== "string") {
        //if type is not string return as it is date
        return dateString;
    }
    if (dateString.indexOf("-") < 0) {
        //if string doesn't contains hyphens return to object directly
        return new Date(dateString);
    }
  	var dateStringWithSlashes = dateString.replace(/-/g, '\/').replace(/T.+/, '');
  	
  	//if valid date object can we obtain from all slashes return same.
  	if (!isNaN(Date.parse(dateStringWithSlashes))) {
         return new Date(dateStringWithSlashes);
    }
  	//converting all hyphens to slashes failed let us convert first two slashes and retry;
  	
    for (var i = 0; i < 2; i++) {
        var index = dateString.indexOf("-");
        date = setCharAtInString(dateString, index, '/');
    }
    if (!isNaN(Date.parse(dateString))) {
		return new Date(dateString);
    }
  	kony.print("unable to convert given input string to date object: " + dateString);
  	return null;
};

/**
 * @param          {String} str.
 * @param          {Number} index.
 * @param          {String} ch.
 * @return         {String} - A new String.
 * @description    This method add some part in the previous string add given position.
 */
function setCharAtInString(str, index, ch) {
    if(str === null || undefined) {
        return null;
    }
  	if(index < 0 || index >= str.length) {
        return str;
    }
  	var a = str.substring(0, index);
  	var b = str.substring(index + 1, str.length);
	return a + ch + b;
}
  

/**
 * @memberof    Date.
 * @params      {Date, String} date1, date2 - Comparision will be done between both params.
 * @return      Positive - If date1 is greater than date2.
 * @desc        This mehtod do comparion between two dates.
 *              For now we are not using this function
 *              Problem: We seems to have issues in multi-timezone environment
 *              Server in one timezone, devices from different time zones.
 */
Date.compareDates = function(date1, date2) {
	kony.print("-- compareDates Start --");
	if (date1 === null || date2 === null) {
		return null;
	}
	kony.print("Input is 1: " + JSON.stringify(date1) + " 2 is : " + JSON.stringify(date2));
	var rv;
	date1 = Date.convertStrToDateObj(date1);
	date2 = Date.convertStrToDateObj(date2);
	kony.print(" POST conversion Input is 1: " + JSON.stringify(date1) + " 2 is : " + JSON.stringify(date2));
	var d1 = date1.getUTCDate();
	var m1 = date1.getUTCMonth();
	var y1 = date1.getUTCFullYear();
	var d2 = date2.getUTCDate();
	var m2 = date2.getUTCMonth();
	var y2 = date2.getUTCFullYear();
	if (y1 - y2 === 0) {
		if (m1 - m2 === 0) {
			rv = d1 - d2;
		} else {
			rv = m1 - m2;
		}
	} else {
		rv = y1 - y2;
	}
	kony.print("-- compareDates End -- " + rv);
	return rv;
};

Date.prototype.toHHMMMHHmm = function () {
	var months = {
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
	};
	function formatTo12HH(hh) {
		hh = parseInt(hh);
		var isAM = true;
		if (hh >= 12) {
			isAM = false;
		}
		hh = hh % 12;
		if (hh === 0) {
			hh = 12;
		}
		return {
			hh: hh,
			isAM: isAM
		};
	}
	function makeTwoDigits(x) {
		if (parseInt(x) < 10) {
			return "0" + parseInt(x);
		}
		return String(x);
	}
	var dd = this.getDate();
	var mm = months[this.getMonth()];
    var formatedHH = formatTo12HH(this.getHours());
	var hh = makeTwoDigits(formatedHH.hh);
	var min = makeTwoDigits(this.getMinutes());
	var ampm = formatedHH.isAM === true ? "AM" : "PM";
	return dd + " " + mm + " " + hh + ":" + min + " " + ampm;
};

Date.getMonthMapNumberToMonth = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};

Date.getDayFromNum = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];


/**
 * @memberof    Date.
 * @params      {String} date - the date of format 'YYYYMMDD' to split to array
 * @return      Array of format [DD,MM,YYYY]
 * @desc        Method splits date string as stored in backend and returns the split array
 */
Date.breakBackendDate = function(date) {
	return [date.slice(6,8),date.slice(4,6),date.slice(0,4)];
}

/**
 * @memberof    Date.
 * @params      {String} date - the date of format 'YYYYMMDD' to return Date from
 * @return      JS Date object
 * @desc        Method converts "YYYYMMDD" string to Date object
 */
Date.getDateObject = function(dateString){
	var year        = dateString.substring(0,4);
	var month       = dateString.substring(4,6);
	var day         = dateString.substring(6,8);

	var date        = new Date(year, month-1, day);
	return date;
}

/**
@Class Date
@Function GetMonthName
@Param Lang
@Desc returns monthname
 */
Date.getMonthName = function(lang,month,flag) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
  if(flag){
    return Date.locale[lang].indexOf(month_names[month]);
  }
    return Date.locale[lang].month_names[month];
};
/**
@Class Date
@Function getMonthNameShort
@Param Lang
@Desc returns month shortname
 */
Date.getMonthNameShort = function(lang,month,flag) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
  if(flag){
    return Date.locale[lang].indexOf(month_names_short[month]);
  }
    return Date.locale[lang].month_names_short[month];
};

Date.locale = {
  en: {
    month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  fr_BE: {
    month_names: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    month_names_short: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
  },
  nl_BE: {
    month_names: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
    month_names_short: ['Jan', 'Feb', 'Maart', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
  }

};