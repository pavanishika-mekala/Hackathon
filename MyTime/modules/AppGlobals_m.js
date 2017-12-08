/*
This module is to define the global variables for the app

 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.globalVariables = kony.apps.coe.ess.globalVariables || {};
kony.apps.coe.ess.globalVariables.checkNetwork = kony.apps.coe.ess.globalVariables.checkNetwork || {};
kony.apps.coe.ess.constants = kony.apps.coe.ess.constants || {};
//Temporary Globals. [Weekly, Biweekly, Monthly]


kony.apps.coe.ess.globalVariables.timesheetLengthConfig = null;
kony.apps.coe.ess.globalVariables.employeeId = null;
kony.apps.coe.ess.globalVariables.noOFCloneListPrevious = 1;
kony.apps.coe.ess.globalVariables.noOFCloneListnext = 1;
kony.apps.coe.ess.globalVariables.isOnlineSearch = false;
kony.apps.coe.ess.globalVariables.futureTimesheets = null;
kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible = false; //to check if offline popup which displays that the network is offline
kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = false;
//To store previous postions of a slider
kony.apps.coe.ess.globalVariables.prevSliderLeft = "";
kony.apps.coe.ess.globalVariables.prevSliderWidth = "";
kony.apps.coe.ess.globalVariables.flag_delete=true;


//checks if app is in the foreground
kony.apps.coe.ess.globalVariables.ForegroundCall = function() {
    var callbacksObj = { onforeground: kony.apps.coe.ess.Sync.syncAsynchronously() };
    kony.application.setApplicationCallbacks(callbacksObj);
};
kony.apps.coe.ess.globalVariables.checkNetwork.config = {
    statusChange: function(isOnLine) {
        if (isOnLine) {
            kony.print("device was offine, and is now online,so let's sync ");
            if (kony.sync.isSessionInProgress === false && kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible == false) { //check if any kind of sync is in progress and also checks if popupoffline is invisible
                kony.apps.coe.ess.globalVariables.ForegroundCall(); //to check if app is in foreground
            }
        } else {
            kony.print("device was online,now is offline,so dont do anything");
        }
    }
};
// This variable is used to clear previous timeentry data which should be done only if user enters second time entry for the day
kony.apps.coe.ess.globalVariables.notFirstTask = false;
kony.apps.coe.ess.globalVariables.prevSlider = "";
kony.apps.coe.ess.globalVariables.time_type_names = "";
kony.apps.coe.ess.globalVariables.currentTask = "";
kony.apps.coe.ess.globalVariables.currentTaskIndex = "";
kony.apps.coe.ess.globalVariables.currentFixedFlex = "";
kony.apps.coe.ess.globalVariables.taskSelectedOnEdit = false;
kony.apps.coe.ess.globalVariables.currentTaskStartIndex = ""; //kony.apps.coe.ess.globalVariables.getTimeIndex(kony.apps.coe.ess.appconfig.defaultSliderStartTime);
kony.apps.coe.ess.globalVariables.currentTaskEndIndex = ""; //kony.apps.coe.ess.globalVariables.getTimeIndex(kony.apps.coe.ess.appconfig.defaultSliderEndTime);
kony.apps.coe.ess.globalVariables.taskStartTime = "";
kony.apps.coe.ess.globalVariables.sliderLeftValue = "";
//var to remember whether sync is in progress or not
// This is only for manual Sync, not for background sync
// used in login, hamburger menu
kony.apps.coe.ess.globalVariables.isSyncInProgress = false;

//var to remember number of times sync is being called
kony.apps.coe.ess.globalVariables.syncCount = 0;
// This is for retriving the future timesheet range
getFutureTimesheetRange = function() {
    var query = "select td.Future_Timesheets from Timesheet_definition td";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query,
        function(res) {
            kony.print("in timeSheet Range Selection");

            function defaultValue() {
                if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "weekly") {
                    kony.apps.coe.ess.globalVariables.futureTimesheets = "12";
                } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "biweekly") {
                    kony.apps.coe.ess.globalVariables.futureTimesheets = "6";
                } else {
                    kony.apps.coe.ess.globalVariables.futureTimesheets = "3";
                }
            }
            if (res === null || res === undefined || res.length <= 0) {
                defaultValue();
                return;
            } else {
                if (res[0].Future_Timesheets === null || res[0].Future_Timesheets === undefined || res[0].Future_Timesheets.length <= 0) {
                    defaultValue();
                } else {
                    kony.apps.coe.ess.globalVariables.futureTimesheets = res[0].Future_Timesheets;
                }
            }
        },
        function(err) {
            handleError(err);
        });
};

// This is for the client object creation for the mf app this is used to retrive the sync services and
kony.apps.coe.ess.globalVariables.clientObj = null;

//Constant Values
kony.apps.coe.ess.constants.WEEKLY = "weekly";
kony.apps.coe.ess.constants.MONTHLY = "monthly";
kony.apps.coe.ess.constants.BIWEEKLY = "biweekly";

// These are used for the cloning mechanism
kony.apps.coe.ess.globalVariables.dateToBeCloned = null;

InitailizeAllAppGloabalsOnSyncSuccess = function() {
    kony.apps.coe.ess.globalVariables.Status.updateMe();
    kony.apps.coe.ess.myTime.frmTimesheetHelp.helpLayerObj = new kony.apps.coe.ess.myTime.frmTimesheetHelp.HelpLayer(frmTimesheetHome);

    kony.apps.coe.ess.myTime.frmTimesheetHelp.helpLayerObj.showHelpLayer();

    kony.apps.coe.ess.globalVariables.updateEmployeeIdAndTimesheetConfig(showTimesheetHomeForm);
    getFutureTimesheetRange();

};

InitailizeAllTabGloabalsOnSyncSuccess = function() {
    try {

        //#ifdef windows8
        frmListView.show();
        //#else
        kony.apps.coe.ess.globalVariables.Status.updateMe();
        kony.apps.coe.ess.globalVariables.updateEmployeeIdAndTimesheetDef(showListViewForm);
        getFutureTimesheetRange();
        //#endif
    } catch (err) { alert(err.message); }
};

//This is the function to retrive the status of the helper layer 
kony.apps.coe.ess.globalVariables.Status = {
    nToStr: {},
    strToN: {},
    updateMe: function() {

        function successCallback(res) {
            kony.apps.coe.ess.globalVariables.Status.nToStr = {};
            kony.apps.coe.ess.globalVariables.Status.strToN = {};
            for (var i in res) {
                kony.apps.coe.ess.globalVariables.Status.nToStr[res[i].Id] = res[i].Status_Name.toUpperCase();
                kony.apps.coe.ess.globalVariables.Status.strToN[res[i].Status_Name.toUpperCase()] = res[i].Id;
            }
        }
        var query = "select s.Id as Id, s.Status_Name as Status_Name from Status s;";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, function(err) {
            alert(JSON.stringify(err));
        });
    }
};


kony.apps.coe.ess.globalVariables.updateEmployeeIdAndTimesheetConfig = function(callback) {

    kony.apps.coe.ess.globalVariables.timesheetLengthConfig = "weekly";
    kony.apps.coe.ess.appconfig.weekStartDay = 0;
    var successCallbackEmpId = function(callback, res) {
            var successCallbackDefinition = function(callback, res) {
                    if (res === null || res.length <= 0) {
                        kony.apps.coe.ess.globalVariables.timesheetLengthConfig = "weekly";
                        kony.apps.coe.ess.appconfig.weekStartDay = 0;
                    }
                    kony.print("kony.apps.coe.ess.globalVariables.timesheetLengthConfig : " + kony.apps.coe.ess.globalVariables.timesheetLengthConfig);
                    for (var i in res) {
                        kony.apps.coe.ess.globalVariables.timesheetLengthConfig = String(res[i].Definition).toLowerCase();
                        kony.apps.coe.ess.appconfig.weekStartDay = kony.apps.coe.ess.myTime.util.dayStrToNumber(res[i].Week_Start_Day);
                        var dateStr = String(res[i].yearStartDate);
                        kony.apps.coe.ess.appconfig.yearStartDate = new Date(dateStr.substring(0, 4), Number(dateStr.substring(4, 6)) - 1, Number(dateStr.substring(6, 8)));
                        break;
                    }
                    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
                        callback();
                    }
                }
                .bind(this, callback);
            for (var i in res) {
                kony.apps.coe.ess.globalVariables.employeeId = String(res[i].Id);
                break;
            }
            var query1 = "select td.Definition as Definition, td.Year_Start_Date as yearStartDate, td.Week_Start_Day as Week_Start_Day from Timesheet_Definition td where td.Employee_Id='" + kony.apps.coe.ess.globalVariables.employeeId + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query1, successCallbackDefinition, function(err) {
                alert(JSON.stringify(err));
            });
        }
        .bind(this, callback);
    var query = "select emp.Id from Employee emp where emp.IsEmployee='1';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallbackEmpId, function(err) {
        alert(JSON.stringify(err));
    });
};



//--added for SPA start --
kony.apps.coe.ess.globalVariables.applicationType = kony.os.deviceInfo().type;
kony.apps.coe.ess.globalVariables.isNativeIp = false;
kony.apps.coe.ess.globalVariables.isNativeAnd = false;
kony.apps.coe.ess.globalVariables.isSPAIp = false;
kony.apps.coe.ess.globalVariables.isSPAAnd = false;
kony.apps.coe.ess.globalVariables.isNative = false;
kony.apps.coe.ess.globalVariables.isSPA = false;
kony.apps.coe.ess.globalVariables.isWebDesktop = false;

kony.apps.coe.ess.globalVariables.isNativeIpad = false;
kony.apps.coe.ess.globalVariables.isNativeWinTab = false;
kony.apps.coe.ess.globalVariables.isNativeAndroidTab = false;
kony.apps.coe.ess.globalVariables.isNativeTablet = false;

//for spa in IOS  
//#ifdef spaip
//#define SPA_platform
kony.print("--ifdef spaip--");
kony.apps.coe.ess.globalVariables.isSPAIp = true;
kony.apps.coe.ess.globalVariables.isSPA = true;
//#endif

//for spa in android  
//#ifdef spaan
//#define SPA_platform
kony.print("--ifdef spaan--");
kony.apps.coe.ess.globalVariables.isSPAAnd = true;
kony.apps.coe.ess.globalVariables.isSPA = true;
//#endif

//for both spaAndroid or spaIphone
//#ifdef SPA_platform
kony.print("--SPA_platform--");
kony.apps.coe.ess.globalVariables.isSPA = true;
//#endif

//for native android
//#ifdef android
//#define native_platform

kony.print("--Android Native-- ");
kony.apps.coe.ess.globalVariables.isNativeAnd = true;
kony.apps.coe.ess.globalVariables.isNative = true;
//#endif

//for native iphone
//#ifdef iphone
//#define native_platform 
kony.print("--iphone Native--");
kony.apps.coe.ess.globalVariables.isNativeIp = true;
kony.apps.coe.ess.globalVariables.isNative = true;
//#endif

//for native both
//#ifdef native_platform
kony.print("--Both Native-- ");
kony.apps.coe.ess.globalVariables.isNative = true;
//#endif

//#ifdef ipad
kony.apps.coe.ess.globalVariables.isNativeIpad = true;
kony.apps.coe.ess.globalVariables.isNative = true;
kony.apps.coe.ess.globalVariables.isNativeTablet = true;
//#endif
//#ifdef windows8
kony.apps.coe.ess.globalVariables.isNativeWinTab = true;
kony.apps.coe.ess.globalVariables.isNative = true;
kony.apps.coe.ess.globalVariables.isNativeTablet = true;
//#endif
//#ifdef tabrcandroid
kony.apps.coe.ess.globalVariables.isNativeAndroidTab = true;
kony.apps.coe.ess.globalVariables.isNative = true;
kony.apps.coe.ess.globalVariables.isNativeTablet = true;
//#endif


kony.apps.coe.ess.globalVariables.updateEmployeeIdAndTimesheetDef = function(callback) {
    var successCallbackEmpId = function(callback, res) {
            var successCallbackDefinition = function(callback, res) {

                    if (res === null || res.length <= 0) {
                        kony.apps.coe.ess.globalVariables.timesheetLengthConfig = "weekly";
                    }
                    for (var i in res) {
                        kony.apps.coe.ess.globalVariables.timesheetLengthConfig = String(res[i].Definition).toLowerCase();
                        break;
                    }
                    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
                        callback();
                    }
                }
                .bind(this, callback);
            for (var i in res) {
                kony.apps.coe.ess.globalVariables.employeeId = String(res[i].Id);
                break;
            }
            var query1 = "select td.Definition from Timesheet_Definition td where td.Employee_Id='" + kony.apps.coe.ess.globalVariables.employeeId + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query1, successCallbackDefinition, function(err) {
                alert(JSON.stringify(err));
            });
        }
        .bind(this, callback);
    var query = "select emp.Id from Employee emp where emp.IsEmployee='1';";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallbackEmpId, function(err) {
        alert(JSON.stringify(err));
    });
};

kony.apps.coe.ess.globalVariables.getTimeIndex = function(currentTime) {
    var index;
    var xCoOrdinates = kony.apps.coe.Reusable.TimelineCreation.XCoordinatesOfTimeLine;
    index = xCoOrdinates.map(function(el) {
        return el[1];
    }).indexOf(currentTime);

    return xCoOrdinates[index][0];
};