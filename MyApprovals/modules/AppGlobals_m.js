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

// This is for the client object creation for the mf app this is used to retrive the sync services and
kony.apps.coe.ess.globalVariables.clientObj=null;
kony.apps.coe.ess.globalVariables.ifOfflinePopUpVisible=false;//to check if offline popup which displays that the network is offline

//var to remember number of times sync is being called
kony.apps.coe.ess.globalVariables.syncCount=0;

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
	idToStr : {},
	strToId : {},
	updateStatus : function () {
		function successCallback(res) {
            kony.apps.coe.ess.globalVariables.statusResponse=res;
			kony.apps.coe.ess.globalVariables.Status.idToStr = {};
			kony.apps.coe.ess.globalVariables.Status.strToId = {};
			for (var i in res) {
				kony.apps.coe.ess.globalVariables.Status.idToStr[res[i].Id] = res[i].Status_Name.toUpperCase();
				kony.apps.coe.ess.globalVariables.Status.strToId[res[i].Status_Name.toUpperCase()] = res[i].Id;
			}
		}
		var query = "select s.Id as Id, s.Status_Name as Status_Name from Status s;";
		kony.sync.single_select_execute(kony.sync.getDBName(), query, null, successCallback,function (err) {
			handleError(err);
		}, false);
	}
};



//--added for SPA start --
kony.apps.coe.ess.globalVariables.applicationType = kony.os.deviceInfo().type;
kony.apps.coe.ess.globalVariables.isNativeIp=false;
kony.apps.coe.ess.globalVariables.isNativeAnd=false;
kony.apps.coe.ess.globalVariables.isSPAIp=false;
kony.apps.coe.ess.globalVariables.isSPAAnd=false;
kony.apps.coe.ess.globalVariables.isNative=false;
kony.apps.coe.ess.globalVariables.isSPA=false;
kony.apps.coe.ess.globalVariables.isWebDesktop=false;

//-added for Native Tablet
kony.apps.coe.ess.globalVariables.isNativeIpad = false;
kony.apps.coe.ess.globalVariables.isNativeWinTab = false;
kony.apps.coe.ess.globalVariables.isNativeAndroidTab = false;
kony.apps.coe.ess.globalVariables.isNativeTablet = false;

//for spa in IOS
//#ifdef spaip
//#define SPA_platform
kony.print("--ifdef spaip--");
kony.apps.coe.ess.globalVariables.isSPAIp=true;
kony.apps.coe.ess.globalVariables.isSPA = true;
//#endif

//for spa in android
//#ifdef spaan
//#define SPA_platform
kony.print("--ifdef spaan--");
kony.apps.coe.ess.globalVariables.isSPAAnd=true;
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
kony.apps.coe.ess.globalVariables.isNativeAnd=true;
kony.apps.coe.ess.globalVariables.isNative=true;
//#endif

//for native iphone
//#ifdef iphone
//#define native_platform
kony.print("--iphone Native--");
kony.apps.coe.ess.globalVariables.isNativeIp=true;
kony.apps.coe.ess.globalVariables.isNative=true;
//#endif

//#ifdef ipad
	kony.apps.coe.ess.globalVariables.isNativeIpad = true;
	kony.apps.coe.ess.globalVariables.isNative = true;
	//kony.apps.coe.ess.globalVariables.isNativeTablet = true;
//#endif

//#ifdef windows8
	kony.apps.coe.ess.globalVariables.isNativeWinTab = true;
	kony.apps.coe.ess.globalVariables.isNative = true;
	kony.apps.coe.ess.globalVariables.isNativeTablet = true;
//#endif

//#ifdef tabrcandroid
	kony.apps.coe.ess.globalVariables.isNativeAndroidTab = true;
	kony.apps.coe.ess.globalVariables.isNative = true;
	//kony.apps.coe.ess.globalVariables.isNativeTablet = true;
//#endif

//for native both
//#ifdef native_platform
kony.print("--Both Native-- ");
kony.apps.coe.ess.globalVariables.isNative=true;
//#endif

//for Desktop
//#ifdef desktopweb
//#define SPA_PLATFORMS
kony.print("--Desktop web-- ");
kony.apps.coe.ess.globalVariables.isWebDesktop=true;
//#endif

// Login configuration
kony.apps.coe.ess.globalVariables.active_login_service="";
kony.apps.coe.ess.globalVariables.used_pre_login=false;
kony.apps.coe.ess.globalVariables.login_sap_spnego_token="KonySAP-Request-Spnego";
kony.apps.coe.ess.globalVariables.login_sap_access_token="KonySAP-Request-Access-Token";
kony.apps.coe.ess.globalVariables.sap_axway_token="konysap-api";

//App navigation
kony.apps.coe.ess.globalVariables.prevFormFlow = "";
kony.apps.coe.ess.globalVariables.employeeName="";

// Login and logout timers configurations
kony.apps.coe.ess.globalVariables.logoutDelay=2;
kony.apps.coe.ess.globalVariables.loginAutoRefreshPeriod=2700; // 45 minutes
