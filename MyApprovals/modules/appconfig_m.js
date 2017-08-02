/*
 * appconfig, store all configuration values here.
 * This is similar to java projects's .properties files.
 * Make sure you write comments explaining each property added here.
 * Try to add based on category
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.frmAllPendingRequestsdata = kony.apps.coe.ess.frmAllPendingRequestsdata || {};
kony.apps.coe.ess.frmAllPendingRequestsdata.requestsPending = kony.apps.coe.ess.frmAllPendingRequestsdata.requestsPending ||{};
kony.apps.coe.ess.frmAllPendingRequestsdata.requestsPending = {  
	data:[]
};

kony.apps.coe.ess.appconfig = {
    appkey: "15437d195a89d1197c790552e4b61eee",
    appsecret: "547d3210d90478fe6b03f58aa8d7f44a",
    serviceurl: "https://100017816.auth.konycloud.com/appconfig",
    isDemo : true,
    isSingleQrCode: true,
  	/* Steps to obtain the runtime url
	1.Go to publish tab in the Mobile Fabric App.
	2.Under runtime console select objects and it will navigate to admin console object services.
	3.Select storage object service used as part of app and select any table.
	4.It will navigate to request and response page.
	5.Besides get there is a url and select upto v1 and copy it to runtimeurl.
   	*/
   	runtimeurl : "https://empselfservice1.konycloud.com:443/services/data/v1",

	ACFAppID :"MYAPPROVALS",   
  	identityServiceName:"ESSIDENTITY",
    isShowDeepLinkingAppBeforeInstall:false,
    isShowDelegation:true,
 	appversion : "v3.1.1",
    listOfApps : ["myLeave", "myTime", "myPay", "myExpenses", "myProfile"],
    myPayUrl:"https://itunes.apple.com/in/app/kony-mypay/id1155632859?mt=8",//AppstoreURL for the My Pay.
    myTimeUrl:"https://itunes.apple.com/in/app/kony-mytime/id1157618072?mt=8",//AppstoreURL for the My Time.
    myLeaveUrl:"https://itunes.apple.com/in/app/kony-myleave/id1157606885?mt=8",//AppstoreURL for the My Leave.
    myExpenseUrl:"https://itunes.apple.com/in/app/kony-myexpenses/id1157625850?mt=8",//AppstoreURL for the My Expenses.
    myProfileUrl:"https://itunes.apple.com/in/app/kony-myprofile/id1157624949?mt=8",//AppstoreURL for the MyApprovals .
    // -- Category : Login :: START
    // Make this false to allow only office365 Login and not allowing local Login, registration
    showLocalLogin: false,
    // -- Category : Login :: END

    showErrorDetailsOnAlert: true,

  	//Set phoneNumber as to how many parts the phoneNumber should be divided to
  	// Ex : if inputNumber is +919032180XXX and phoneNumber is "3,4,5" output will be +91 9032 180XX X
    phoneNumber: "3,10", // set this parameter for formatting phone number

    writeAboveMe: "do not use me" // Only to avoid mistakes of comma related for last value
};
