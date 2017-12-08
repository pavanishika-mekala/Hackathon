kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.TimesheetCreate = kony.apps.coe.ess.myTime.TimesheetCreate || {};

kony.apps.coe.ess.myTime.TimesheetCreate.timeEntryCreate = {
	getTimeDiff : function(time1, time2) {
		var hours1 = parseFloat(time1.toString().slice(0,2));
	    var minutes1 = ((parseFloat(time1.toString().slice(2,4)))/60);
	    var hours2 = parseFloat(time2.toString().slice(0,2));
	    var minutes2 = ((parseFloat(time2.toString().slice(2,4)))/60);
	    var diff = (hours1-hours2)+(minutes1-minutes2);
	    return diff;
	}
};
