/*
This module is to define the global variables for the app

*/
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.globalVariables = kony.apps.coe.ess.globalVariables || {};
kony.apps.coe.ess.globalVariables.checkNetwork =kony.apps.coe.ess.globalVariables.checkNetwork || {};
kony.apps.coe.ess.constants = kony.apps.coe.ess.constants || {};

kony.apps.coe.ess.globalVariables.previousFormForLeaveRequestDetails = null;
kony.apps.coe.ess.globalVariables.employeeId = "1000005";
kony.apps.coe.ess.globalVariables.employeeName = "";
// This is for the client object creation for the mf app this is used to retrive the sync services and
kony.apps.coe.ess.globalVariables.clientObj = null;
//var to remember whether sync is in progress or not
// This is only for manual Sync, not for background sync
// used in login, hamburger menu
kony.apps.coe.ess.globalVariables.isSyncInProgress=false;
//var to remember number of times sync is being called
kony.apps.coe.ess.globalVariables.syncCount=0;
kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=false;//to check if offline popup which displays that the network is offline
kony.apps.coe.ess.globalVariables.isNativeIphone = false;
kony.apps.coe.ess.globalVariables.isNativeAndroid = false;
kony.apps.coe.ess.globalVariables.isSPAIphone = false;
kony.apps.coe.ess.globalVariables.isSPAAndroid = false;
kony.apps.coe.ess.globalVariables.isNative = false;
kony.apps.coe.ess.globalVariables.isSPA = false;
kony.apps.coe.ess.globalVariables.isWebDesktop = false;
kony.apps.coe.ess.globalVariables.isNativeIpad = false;
kony.apps.coe.ess.globalVariables.isNativeWinTab = false;
kony.apps.coe.ess.globalVariables.isNativeAndroidTab = false;
kony.apps.coe.ess.globalVariables.isNativeTablet = false;
kony.apps.coe.ess.globalVariables.isRightShift = false;
//--------------for native start-----------------
  //#ifdef android
    kony.apps.coe.ess.globalVariables.isNativeAndroid = false;
    kony.apps.coe.ess.globalVariables.isNative = true;
  //#endif

  //#ifdef iphone
    kony.apps.coe.ess.globalVariables.isNativeIphone = true;
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
//-------for native end--------------
//--------------for SPA start-----------------
  //#ifdef spaip
    kony.apps.coe.ess.globalVariables.isSPAIphone = true;
    kony.apps.coe.ess.globalVariables.isSPA = true;
  //#endif
 //2.For spa in android
  //#ifdef spaan
    kony.apps.coe.ess.globalVariables.isSPAAndroid = true;
    kony.apps.coe.ess.globalVariables.isSPA = true;
  //#endif
//-------for SPA end--------------
//--------------for DW start-----------------
  //#ifdef desktopweb
    kony.apps.coe.ess.globalVariables.isWebDesktop = true;
  //#endif
//-------for DW end--------------
//checks if app is in the foreground
kony.apps.coe.ess.globalVariables.ForegroundCall = function() {
  var callbacksObj={onforeground:kony.apps.coe.ess.Sync.syncAsynchronously()};
  kony.application.setApplicationCallbacks(callbacksObj);
};
kony.apps.coe.ess.globalVariables.checkNetwork.config = {
  statusChange : function(isOnLine) {
    if (isOnLine) {
      kony.print("device was offine, and is now online,so let's sync ");
      if(kony.sync.isSessionInProgress === false && kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible === false){//check if any kind of sync is in progress and also checks if popupoffline is invisible
        kony.apps.coe.ess.globalVariables.ForegroundCall();//to check if app is in foreground
      }
    }
    else {      
      kony.print("device was online,now is offline,so dont do anything");
    }
  }  
};
kony.apps.coe.ess.globalVariables.Status = {
  idToStr: {},
  strToId: {},
  updateStatus: function() {
    function successCallback(res) {
      kony.apps.coe.ess.globalVariables.Status.nToStr = {};
      kony.apps.coe.ess.globalVariables.Status.strToN = {};
      for (var i in res) {
        kony.apps.coe.ess.globalVariables.Status.idToStr[res[i].Id] = res[i].Status_Name.toUpperCase();
        kony.apps.coe.ess.globalVariables.Status.strToId[res[i].Status_Name.toUpperCase()] = res[i].Id;
      }
    }
    var query = "select s.Id as Id, s.Status_Name as Status_Name from Status s;";
    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, successCallback, function(err) {
      handleError(err);
    }, false);
  }
};

String.prototype.replaceAll = function(f, r) {
  return this.split(f).join(r);
};
kony.apps.coe.ess.globalVariables.leaveWalletcolors=[
                ["0xD74B14ff", "0xD74B14ff"],
				["0xFFC300ff", "0xFFC300ff"],
				["0x69AF23ff","0x69AF23ff"]
            ];
kony.apps.coe.ess.globalVariables.leaveWalletconsumedSkn="LBLBgD74B14";
kony.apps.coe.ess.globalVariables.leaveWalletPlanedSkn="LBLFFC300";
kony.apps.coe.ess.globalVariables.leaveWalletAvailableSkn="LBL69AF23";