
/**
 * Sync Functionality
 * @author Dharma Teja Reddy K
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
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
kony.apps.coe.ess.Sync.initializeSync = function (successCallback, failureCallback) {
	sync.init(function (res) {
		//Init Success
		kony.print("Sync Initialization is successfully done");
		if (successCallback)
			successCallback();
	}, function (err) {
		//Init Failed
		kony.print("Sync Initialization is successfully done");
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
      //To increment sync count to check whether it is failing more than 3 times
		kony.apps.coe.ess.globalVariables.syncCount += 1;
		//Sync Session Encountered an Error
		try {
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
					}
				}
			}else{
              kony.application.dismissLoadingScreen();
              handleError(kony.i18n.getLocalizedString("i18n.ess.myApproval.genericErrorMsg.text"));
            }
		} catch (e) {
          alert(e.message);
			kony.print("--Exception occured while validating Error Object - kony.apps.coe.ess.Sync.startSyncSession : " + JSON.stringify(e));
		}
      
      /*
      //When sync fails continuously more than three times automatically it will reset and resync
      if (kony.apps.coe.ess.globalVariables.syncCount && kony.apps.coe.ess.globalVariables.syncCount > 3) {
        var successCall = function () {
          var syncSuccess = function () {
            kony.application.dismissLoadingScreen();
            kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
            var currentForm = kony.application.getCurrentForm();
            if (currentForm == frmDummy || currentForm == frmLogin) {
              frmlogin.show();
            } else {
              var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
    		  formController.loadDataAndShowForm();
            }
          };
          var syncFailed = function (err) {
            kony.application.dismissLoadingScreen();
            kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
            handleError(err);
          };
          kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
          kony.apps.coe.ess.Sync.UI.startSyncProgressBar();
          kony.apps.coe.ess.Sync.doDownload = true;
          kony.apps.coe.ess.Sync.startSyncSession(syncSuccess, syncFailed);
        };
        var failureCall = function () {
          handleError(kony.i18n.getLocalizedString("i18n.ess.common.handleError"));
        };
        kony.apps.coe.ess.Sync.resetSyncDb(successCall, failureCall);
      }*/

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
		kony.print("Resetting Sync Db failed : " + JSON.stringify(err));
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
		Employee: {
			doupload: true,
			dodownload: kony.apps.coe.ess.Sync.doDownload,
			uploaderrorpolicy: "continueonerror"
		},
		MYAPPROVALS: {
			doupload: true,
			dodownload: kony.apps.coe.ess.Sync.doDownload,
			uploaderrorpolicy: "continueonerror"
		},
	   Notifications: {
			doupload: true,
			dodownload: kony.apps.coe.ess.Sync.doDownload,
			uploaderrorpolicy: "continueonerror"
		}
	};
	return sessionTasks;
};

kony.apps.coe.ess.Sync.ManualSyncOnClick = function()
{
  function syncSuccess(e)
  {
      kony.application.dismissLoadingScreen();
    alert("Synced Successfully !!!");
  }
  kony.apps.coe.ess.frmLogin.manualSyncOnClick(syncSuccess);
};

/**
 * Method to Sync asynchronously
 */
kony.apps.coe.ess.Sync.updatedWhileSyncing = false;
kony.apps.coe.ess.Sync.syncAsynchronously = function(refreshType) {
  try{
  kony.print("--Start syncAsynchronously--");
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    if (kony.sync.isSessionInProgress) { 
        // another session is in progress
        kony.apps.coe.ess.Sync.updatedWhileSyncing = true;
        return;
      }
    var success = function(refreshType) {
      kony.print(">>> Asynchronously Synced at " + JSON.stringify(new Date()));
      //After Asynchronous Sync, Refresh UI
      kony.apps.coe.ess.Sync.UI.stopSyncProgressBarWithSuccessMessage();
      kony.print("Asynchronous Sync is done");
      //Refresh the form with the backend synced data       
      refreshCureentFormbypassingAsysncParams(refreshType);
      //To-DO
      //If any other updations are done while sync session, Start session again
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
    kony.apps.coe.ess.Sync.startSyncSession(success.bind(this,refreshType),failure);
  } 
  kony.print("--End syncAsynchronously--");
    }catch(e){
      alert(e.message);
    }
};


kony.apps.coe.ess.Sync.deltaSyncConfig = function() {
  try{
    kony.timer.cancel("serviceDeltaSyncTimer");
  }
  catch(e){
    kony.print(e);
  }
  try{
    kony.timer.schedule("serviceDeltaSyncTimer", kony.apps.coe.ess.Sync.deltaSync, kony.apps.coe.ess.globalVariables.timeforAutoSync, true);
  }
  catch(e){
    kony.print(e);
  }
};
kony.apps.coe.ess.Sync.deltaSync=function(){
  kony.print("-- Start deltaSync.function --");
  kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.apps.coe.ess.Sync.doDownload = true;
  if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.isSyncInProgress = true;
  }
  var successCallback = function() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.myApprovals.sync.Refreshing"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    formController.loadDataAndShowForm();
    kony.print("-- Completed auto sync from deltaSync --");
  };//.bind(this);
  if (kony.application.getCurrentForm().id != "frmLogin") {
  kony.apps.coe.ess.frmLogin.manualSyncOnClick(successCallback);
  }
  kony.print("-- End deltaSync.function --");
};