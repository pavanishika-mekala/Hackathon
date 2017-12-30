/** 
 *  @author     S Shantam.Agarwal ,Rajesh.Chandolu
 *  @category   Business Logic.	
 *  @desc       Contains the functions which are related to Date.
 *  @ © 2016    Kony Inc. 
 */
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
    if (separatedby !== null && separatedby !== undefined && typeof(separatedby) === "string") {
        return hh + separatedby + mm + separatedby + ss;
    }
    return hh + ":" + mm + ":" + ss;
};

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
 * @param          {string} separatedby - the separator of the date
 * @return         {String} - Date in format of YYYYMMDDHHMISS
 * @description    This method is use to format time to YYMMDDHHMMSS.
 */
Date.prototype.toYYYMMDDHHMMSS = function() {
     var DD = makeItOfTwoDigits(this.getDate().toString());
	 var MM = makeItOfTwoDigits((this.getMonth()+1).toString());
	 var YYYY = makeItOfTwoDigits(this.getFullYear().toString());	 
   function makeItOfTwoDigits(num) {
        num = parseInt(num);
        if (num < 10) {
            return "0" + num;
        } else {
            return "" + num;
        }
    }  
	var hhmmss=this.toHHMMSS("");		
	return YYYY+MM+DD+hhmmss;	 
};

/**
 * @memberof       Date
 * @param          {string} inthe format YYYYMMDDHHMMSS or YYYYMMDD
 * @return         {Date} - Date object for the respective param
 * @description    This method is Modify the current date object to  respective date and time.
 */
Date.prototype.modifyByYYYYMMDDHHMMSS = function(date) {
  if(isEmpty(date)){
    return new Date();
  }
    date = date.toString()
    var length = date.length;

    if (Number(date) == "NAN") {
        length = null;
    }


    switch (length) {
        case 8:
            this.setFullYear(date.substring(0, 4));
            this.setMonth(Number(date.substring(4, 6)) - 1);
            this.setDate(date.substring(6, 8));
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            break;
        case 14:
            this.setFullYear(date.substring(0, 4));
            this.setMonth(Number(date.substring(4, 6)) - 1);
            this.setDate(date.substring(6, 8));
            this.setHours(date.substring(8, 10));
            this.setMinutes(date.substring(10, 12));
            this.setSeconds(date.substring(12, 14));
            break;
        default:
            kony.print(" Wrong input (" + date + ")to the date method modifyByYYYYMMDDHHMMSS making no changes to the data object");
    }

    return this;

};

/**
 * @memberof       Date
 * @return         {String} - Date in format of DD mmm HH:MM tt
 * @description    This method is use to format time to HHMMSS.
 */
Date.prototype.toDDmmmHHMMtt = function() {

    var day = this.getDate();
    var month = this.retriveMonthName().substring(0, 3);
    var hours = this.getHours();
    var minutes = this.getMinutes();
//     var tt;
//     if (hours >= 12) {
//         hours = hours - 12;
//         tt = "PM";
//     } else {
//         tt = "AM";
//     }
  var formattedDate=day + " " + month + " " ;
  	if(parseInt(minutes) < 10 && parseInt(minutes) !== 0) {
			minutes = "0" + parseInt(minutes);
	}
  	if(parseInt(hours) < 10 && parseInt(hours) !== 0) {
			hours = "0" + parseInt(hours);
	}
  	
  	if(hours===0&&minutes===0){
      
    }else{
      formattedDate+=hours + ":" + minutes; //+ " " + tt
    }

    return formattedDate ;


};

/**
 * @memberof       Date
 * @return         {String} - Date in format of DD mmm,YYYY
 * @description    This method is use to format time to HHMMSS.
 */
Date.prototype.toDDmmmYYYY = function() {
  	var day = this.getDate();
 	var monthName=this.retriveMonthName();
 	var month="";
 	if(monthName){
  	   month = monthName.substring(0, 3);
  	}  
    var year = this.getFullYear();
    return day + " " + month + ", " + year;
};

/**
 * @memberof       Date
 * @return         {String} - Date in format of DD mmm'YY
 * @description    This method is use to format time to HHMMSS.
 */
Date.prototype.toDDmmmYY = function() {    
    var day = this.getDate();
    var monthName=this.retriveMonthName();
 	var month="";
 	if(monthName){
  	   month = monthName.substring(0, 3);
  	} 
  	kony.print("day is::"+day+"   monthName is::"+monthName+"   month is::"+month+"  year is::"+this.getFullYear());
    var year = this.getFullYear().toString().substring(2,4);
  	if(year == "00"){
      year = this.getFullYear().toString()
    }
    return day + " " + month + "'" + year;
  
};




Date.prototype.retriveMonthName = function() {

    var month = this.getMonth();

    switch (month) {
        case 0:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.january");
        case 1:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.Febrauary");
        case 2:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.March");
        case 3:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.April");
        case 4:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.May");
        case 5:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.June");
        case 6:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.July");
        case 7:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.August");
        case 8:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.September");
        case 9:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.October");
        case 10:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.November");
        case 11:
            return kony.i18n.getLocalizedString("i18n.ess.Date.Month.December");
        default:
            kony.print("invalid input ")
            return null;
    }
}

Date.prototype.toHHMMMHHmm = function () {
	var months = {
		"0": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jan"),
		"1": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.feb"),
		"2": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.mar"),
		"3": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.apr"),
		"4": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.may"),
		"5": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jun"),
		"6": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jul"),
		"7": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.aug"),
		"8": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.sep"),
		"9": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.oct"),
		"10": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.nov"),
		"11": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.dec")
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
	var hh = makeTwoDigits(this.getHours());
	var min = makeTwoDigits(this.getMinutes());
	var ampm = formatedHH.isAM === true ? "AM" : "PM";
	return dd + " " + mm + " " + hh + ":" + min ;//+ " " + ampm;
};

Date.prototype.toDDMMMYYHHmm = function () {
	var months = {
		"0": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jan"),
		"1": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.feb"),
		"2": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.mar"),
		"3": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.apr"),
		"4": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.may"),
		"5": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jun"),
		"6": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.jul"),
		"7": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.aug"),
		"8": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.sep"),
		"9": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.oct"),
		"10": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.nov"),
		"11": kony.i18n.getLocalizedString("i18n.ess.Date.shortmonth.dec")
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
	var yy = String(this.getFullYear());
	yy = yy.substring(yy.length - 2, yy.length);
	var formatedHH = formatTo12HH(this.getHours());
	var hh = makeTwoDigits(this.getHours());
	var min = makeTwoDigits(this.getMinutes());
	var ampm = formatedHH.isAM === true ? "AM" : "PM";
	return dd + " " + mm + "'" + yy + " " + hh + ":" + min;// + " " + ampm;
};