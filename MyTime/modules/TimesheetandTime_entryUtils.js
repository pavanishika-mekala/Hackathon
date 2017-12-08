
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.
TimesheetDatesInterval = {
    daily : function (dateObj){
  		if (dateObj instanceof Date) {
		    return [new Date(dateObj), new Date(dateObj)];
		} else {
			throw "Invalid arguments getTimesheetStartAndEndDates requires the parameter of DateObject ";
		}
    },

	weekly : function (dateObj) {
        if (dateObj instanceof Date) {
		    return dateObj.thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay);
		} else {
			throw "Invalid arguments getTimesheetStartAndEndDates requires the parameter of DateObject ";
		}
	},

	biWeekly : function (dateObj, baseDate) {
        if (dateObj instanceof Date && baseDate instanceof Date) {
		    var minDate = new Date(dateObj.getFullYear(), baseDate.getMonth(), baseDate.getDate());
			var maxDate = new Date(dateObj.getFullYear() + 1, baseDate.getMonth(), baseDate.getDate());
			maxDate = maxDate.previousDay();
			if(!(minDate <= dateObj && maxDate >= dateObj)) {
			    minDate.setFullYear(dateObj.getFullYear() - 1);
				maxDate.setFullYear(dateObj.getFullYear());
			}
			baseDate = minDate.thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
			var first;
			var last;
			var diff = (new Date(Date.parse(dateObj) - Date.parse(baseDate))) / 1209600000;
			diff = parseInt(diff);
			first = new Date(Date.parse(baseDate) + diff * 1209600000);
			last = new Date(Date.parse(first) + 1123200000);
			if(first < minDate) {
			    first = minDate;
			}
			if(last > maxDate) {
			    last = maxDate;
			}
			return [first, last];
		} else {
			throw "Invalid arguments getTimesheetStartAndEndDates requires the parameter of DateObject ";
		}
    },

	monthly : function (dateObj) {
        if (dateObj instanceof Date) {
            return dateObj.thisMonthInterval();
		} else {
			throw "Invalid arguments getTimesheetStartAndEndDates requires the parameter of DateObject ";
		}
    },

	getTimesheetStartAndEndDates : function (dateObj) {
        var baseDate = kony.apps.coe.ess.appconfig.yearStartDate;
        var timesheettype = kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase();
        timesheettype = String(timesheettype).toLowerCase();
		switch (timesheettype) {
          case "daily":
              return kony.apps.coe.ess.myTime.TimesheetDatesInterval.daily(dateObj);
		  case "weekly":
	          return kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj);
		  case "biweekly":
			  return kony.apps.coe.ess.myTime.TimesheetDatesInterval.biWeekly(dateObj, baseDate);
		   case "monthly":
			  return kony.apps.coe.ess.myTime.TimesheetDatesInterval.monthly(dateObj);
		}
	}
};

