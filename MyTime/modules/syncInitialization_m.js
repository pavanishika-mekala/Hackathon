/**
 * Sync Functionality
 * @author Dharma Teja Reddy K
 */
kony.apps.coe.ess.Sync = kony.apps.coe.ess.Sync || {};
kony.apps.coe.ess.Sync.doDownload = true;
 kony.apps.coe.ess.Sync.syncOnLandingForm = false;
/**
 * Initialize Client Side Sync Library. It should be called once in apps life cycle.
 * @param {fn} $successCallback()
 *		Callback after Successfull initialization
 * @param {fn} $failureCallback()
 *		Callback incase of failed initialization
 */
kony.apps.coe.ess.Sync.initializeSync = function(successCallback, failureCallback) {
    sync.init(function(res) {
        //Init Success
        kony.print("Sync Initialization is successfully done");
        if (successCallback)
            successCallback();
    }, function(err) {
        //Init Failed
        handleError("Sync Initialization is successfully done : " + err);
        if (failureCallback)
            failureCallback();
    });
};
/**
 * Starts Syncing Process with specified syncClientConfig.
 * * @param {fn} $successCallback()
 *		Callback after Successfull Syncing
 * @param {fn} $failureCallback()
 *		Callback incase of failed Syncing
 */
kony.apps.coe.ess.Sync.startSyncSession = function (successCallback, failureCallback) {
	kony.print("--------------------in kony.apps.coe.ess.sync.syncStart SyncIntialzation_m.js");

	var config = konysyncClientSyncConfig;
	config.onsyncstart = function () {
		//Sync Session is Started
	};
	config.onsyncsuccess = function (res) {
		//Sync Session Success
		kony.print("Sync Session is successfully completed");
		if (successCallback) {
            kony.apps.coe.ess.globalVariables.syncCount = 0;
			kony.apps.coe.ess.Sync.doDownload = false;
			successCallback(res);
		}
	};
	config.onsyncerror = function (err) {
      	kony.apps.coe.ess.globalVariables.syncCount += 1;
		//Sync Session Encountered an Error
		kony.print("Sync Session encountered an error : " + JSON.stringify(err));
		//Validate error object
		if (err && err.errorCode + "" === "7022" && err.errorInfo) {
			//We do not know whihc scope will throw error. So, Find scope name through Object.keys
			var scopeName = Object.keys(err.errorInfo)[0];
			//Validate scopeName & ErrorCode
			if (scopeName && err.errorInfo[scopeName].errorCode === "SY0000E") {
				//Validate errorMessage
				if (err.errorInfo[scopeName].errorMessage && err.errorInfo[scopeName].errorMessage.toLowerCase().match(/session|token/)) {
					//handle token expairy issue
					kony.apps.coe.ess.frmLogin.handleSessionExpairyError();
					kony.apps.coe.ess.globalVariables.syncCount = 0;
				}
			}
		}
		
		if (kony.apps.coe.ess.globalVariables.syncCount && kony.apps.coe.ess.globalVariables.syncCount > 3) {
			kony.print("inside sync reset");
			var successCall = function () {
				var syncSuccess = function () {
					kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
					var currentForm = kony.application.getCurrentForm();
					if (currentForm == frmDummy || currentForm == frmLogin) {
						frmlogin.show();
					} else {
						InitailizeAllAppGloabalsOnSyncSuccess();
					}
				};
				var syncFailed = function (err) {
					kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
					handleError(err);
				};
				kony.apps.coe.ess.Sync.UI.startSyncProgressBar();
				kony.apps.coe.ess.Sync.doDownload = true;
				kony.apps.coe.ess.Sync.startSyncSession(syncSuccess, syncFailed);
			};
			var failureCall = function () {
				handleError("Reset failed");
			};
			kony.apps.coe.ess.Sync.resetSyncDb(successCall, failureCall);
		}

		if (failureCallback) {
			kony.apps.coe.ess.Sync.doDownload = false;
			failureCallback(err);
		}

	};

	var securityObj = new kony.apps.coe.ess.syncFunctions();
	var syncKey = securityObj.getSyncKey();
	config.devicedbencryptionkey = syncKey;

	//making other scopes data to be non downlaod at sync side
	config.sessiontasks = kony.apps.coe.ess.Sync.getSessionTasks();

	config.batchsize = "500000";

	sync.startSession(config);
};
/**
 * Resets Sync Db ie Erases data in Sync Tables
 * * @param {fn} $successCallback()
 *		Callback after Successfull Sync Reset
 * @param {fn} $failureCallback()
 *		Callback incase of failed Sync Reset
 */

kony.apps.coe.ess.Sync.resetSyncDb = function (successCallback, failureCallback) {
	sync.reset(function (res) {
		//Reset Success
		kony.print("Sync Reset is Success");
		if (successCallback)
			successCallback();
	}, function (err) {
		//Reset Failed
		handleError("Resetting Sync Db failed : " + JSON.stringify(err));
		if (failureCallback)
			failureCallback();
	});

};

/**
 * sets config session tasks object dynamically
 * @param none
 * return {Object}
 */
kony.apps.coe.ess.Sync.getSessionTasks = function () {
	var sessionTasks = {
		
// 		MYPAY : {
			
// 			doupload : false,
// 			dodownload : false,
// 			uploaderrorpolicy : "continueonerror" 
// 		},
		EMPLOYEE : {
			
			doupload : true,
			dodownload : kony.apps.coe.ess.Sync.doDownload,
			uploaderrorpolicy : "continueonerror" 
		},
// 		MYPROFILE : {
			
// 			doupload : false,
// 			dodownload : false,
// 			uploaderrorpolicy : "continueonerror" 
// 		},
		MyTime : {
			
			doupload : true,
			dodownload : kony.apps.coe.ess.Sync.doDownload,
			uploaderrorpolicy : "continueonerror" 
		}, 
		Notifications: {
			doupload: true,
			dodownload: kony.apps.coe.ess.Sync.doDownload,
			uploaderrorpolicy: "continueonerror"
		}
//       ,

// 		MYLEAVE : {
			
// 			doupload : false,
// 			dodownload : false,
// 			uploaderrorpolicy : "continueonerror" 
// 		},

// 		MYAPPROVALS : {
			
// 			doupload : false,
// 			dodownload : false,
// 			uploaderrorpolicy : "continueonerror" 
// 		},
// 		MYEXPENSES : {
			
// 			doupload : false,
// 			dodownload : false,
// 			uploaderrorpolicy : "continueonerror" 
// 		}
	};
	return sessionTasks;
};

/**
 * Method to Sync asynchronously
 */
kony.apps.coe.ess.Sync.updatedWhileSyncing = false;
kony.apps.coe.ess.Sync.syncAsynchronously = function() {
  kony.print("--Start syncAsynchronously--");
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    if (kony.sync.isSessionInProgress) { 
        // another session is in progress
        kony.apps.coe.ess.Sync.updatedWhileSyncing = true;
        return;
      }
    var success = function() {
      kony.print(">>> Asynchronously Synced at " + JSON.stringify(new Date()));
      //After Asynchronous Sync, Refresh UI
      kony.apps.coe.ess.Sync.UI.stopSyncProgressBarWithSuccessMessage();
      kony.print("Asynchronous Sync is done");
      //Here, Write refresh functionality
      var currentForm = kony.application.getCurrentForm();
     
      if( kony.apps.coe.ess.globalVariables.isNativeTablet === false  ){
      if(currentForm == frmTimesheetHome){
        refreshTimesheetHomeForm();
      }
      else if(currentForm == frmTimesheetHistory){
        //ToDo : refresh timesheet History form after sync success
      }
      }
      else if(currentForm === frmTimeSheetCreateTab)
        {
          refreshTimeSheetCreateTabForm();
        }
        
      if(kony.apps.coe.ess.Sync.updatedWhileSyncing) {
        kony.apps.coe.ess.Sync.updatedWhileSyncing = false;
        kony.apps.coe.ess.Sync.syncAsynchronously();
      }
    };
    var failure = function() {
      kony.print(">>> Asynchronous Sync Failed at " + JSON.stringify(new Date()));
	  kony.apps.coe.ess.Sync.UI.stopSyncProgressBarWithErrorMessage();
    };
	kony.apps.coe.ess.Sync.UI.startSyncProgressBar();
    kony.apps.coe.ess.Sync.startSyncSession(success,failure);
  } 
  kony.print("--End syncAsynchronously--");
};