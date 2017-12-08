/**
 * @module formattingDate 
 * @Author Shweta Dasari
 * @category UI/actions 
 * @description 
 * © 2016 Kony Inc. 
 */
// Region - namespaces. 
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};
// Region - Class / object constructor.
/**
 * @class calendarUI
 * Contains the UI actions and the functions for the dynamic calendar
 */
kony.apps.ess.myLeave.formattingDate = function(ll) {
};
kony.apps.ess.myLeave.formattingDate.prototype.toFormatTabDateCal = function(input_date) {
    try {
      
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
        input_date = input_date.split(" ");
        var input_date_year = input_date[3];//2016
        var input_date_month = months.indexOf(input_date[1])+1 ;
        var input_date_date = input_date[2];
        var stringTarget = input_date_date + " " + input_date[1] + " " + input_date_year;
        return stringTarget;
    } catch (exception) {
        handleError(exception);
    }
};
kony.apps.ess.myLeave.formattingDate.prototype.getSelectedMonthYear = function(input_date) {
    try {
      
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
        input_date = input_date.split(" ");
      var input_date_day = input_date[0];
        var input_date_year = input_date[2];//2016
        var input_date_month = months.indexOf(input_date[1])+1 ;
      	var dateArr = [];
      dateArr.push(input_date_day);
      	dateArr.push(input_date_month);
      	dateArr.push(input_date_year);
        return dateArr;
    } catch (exception) {
        handleError(exception);
    }
};