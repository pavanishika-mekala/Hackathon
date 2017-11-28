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

kony.apps.coe.ess.myTime.util = kony.apps.coe.ess.myTime.util || {};

kony.apps.screenHeightInPx = "1096";
kony.apps.screenWidthInPx = "640";
kony.apps.screenHeightInDp = "548";
kony.apps.screenWidthInDp = "320";

/**
 * @type           function
 * @param          {Number} dp - width in dp.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert width of a widget in dp according to device screen size.
 */
kony.apps.
generalizeWidthInDp = function(dp) {
    dp = parseFloat(dp);
    if(!isNaN(dp)) {
        return dp * (kony.os.deviceInfo().screenWidth / kony.apps.screenWidthInDp);
    }
    return null;
};

/**
 * @type           function
 * @param          {Number} dp - height in dp.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert height of a widget in dp according to device screen size.
 */
kony.apps.
generalizeHeightInDp = function(dp) {
    dp = parseFloat(dp);
    if(!isNaN(dp)) {
        return dp * (kony.os.deviceInfo().screenHeight / kony.apps.screenHeightInDp);
    }
    return null;
};

/**
 * @type           function
 * @param          {Number} px - width in px.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert width of a widget in px according to device screen size.
 */
kony.apps.
generalizeWidthInPx = function(px) {
    px = parseFloat(px);
    if(!isNaN(px)) {
        return parseInt(px * (kony.os.deviceInfo().deviceWidth / parseInt(kony.apps.screenWidthInPx)));
    }
    return null;
};

/**
 * @type           function
 * @param          {Number} px - height in px.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert height of a widget in px according to device screen size.
 */
kony.apps.
generalizeHeightInPx = function(px) {
    px = parseFloat(px);
    if(!isNaN(px)) {
        return parseInt(px * (kony.os.deviceInfo().deviceHeight / parseInt(kony.apps.screenHeightInPx)));
    }
    return null;
};

kony.apps.coe.ess.myTime.getTimesheetDataForADate = function(date, callback, errorCallback) {
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
    function successCallback(res) {
        if(res === null || res.length <= 0) {
            callback(null);
            return;
        }
        for(var i in res) {
            if(callback !== null && callback !== undefined && typeof(callback) === "function") {
                callback(res[i]);
            }
            break;
        }
    }
    var st = interval[0].toYYYYMMDD("");
    var ed = interval[1].toYYYYMMDD("");
    var query = "select ts.Id as Id, ts.Status_Id as Status_Id, ts.Start_Date as Start_Date, ts.End_Date as End_Date from Timesheet ts where ts.Start_Date = '" + st + "' AND ts.End_Date = '" + ed + "';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, errorCallback);
};

kony.apps.coe.ess.myTime.downloadEmployeeImage = function(emp_id, successCallback, errorCallback) {
    if(!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        errorCallback("Network not available");
        return;
    }
    function success(res) {
        if(res !== null && res !== undefined && res.length > 0) {
            for(var i in res) {
                kony.apps.coe.ess.MVVM.GetbinaryContent("Employee","mediaEmployee",res[i].Id, successCallback, errorCallback);
                break;
            }
        }        
    }
    var query="select e.Media_Id as Id from Employee e where e.Id='" + emp_id + "';"; 
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, errorCallback);
};


kony.apps.coe.ess.myTime.util.dayStrToNumber = function(dayStr) {
    dayStr = String(dayStr).toLowerCase();
    switch(dayStr) {
      case "sunday":
          return 0;
      case "monday":
          return 1;
      case "tuesday":
          return 2;
      case "wednesday":
          return 3;
      case "thursday":
          return 4;
      case "friday":
          return 5;
      case "saturday":
          return 6;
      default:
          return 1;
    }
};

/**
 * @type        function
 * @param       string 
 * return       None.
 * desc         checks whether string has content or not
 */
String.isEmpty = function(str){
  if(str === undefined || str === null || str == ""){
    return true;
  }
  else{
    return false;
  }
};


/**
 * @type        function
 * @param       number 
 * return       None.
 * desc         checks if  number  is less than 10 , it appends a 0 to it
 */
function makeItOfTwoDigits(num) {
  //input validation
        if(num===null || num===undefined || num==="")
        return;
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}