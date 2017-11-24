kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.Utils = kony.apps.coe.ess.Utils || {};


kony.apps.coe.ess.Utils.retriveMonthDetails = function (month, year, diff) {
	month = month + diff;
	if (month > 11) {
		year = year + parseInt(month / 11);
		month = month % 12;
		return {
			"MONTH" : month,
			"YEAR" : year
		};
	} else if (month < 0) {
		year = (year - ((parseInt(month / 11) * -1) + 1));
		month = (12 - (month % 12) * (-1));
		return {
			"MONTH" : month,
			"YEAR" : year
		};
	} else {
		return {
			"MONTH" : month,
			"YEAR" : year
		};
	}
	throw "something went wrong in the retriving month details";
};
