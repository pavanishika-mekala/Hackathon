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
kony.apps.coe.ess.appconfig = {
    appkey: "8399ab64030ebd5c371ab824f3491bff",
    appsecret: "66cb17537d742549daec96ba97535cce",
    serviceurl: "https://100017816.auth.konycloud.com/appconfig",
	identityServiceName:"ESSIDENTITY",
    listOfApps:["myProfile", "myTime", "myPay", "myExpenses", "myApprovals"],
    appversion : "v3.1.1",
  	isDemo : true,
    isSingleQrCode: true,
    workingHours:8,
  /* Steps to obtain the runtime url
	1.Go to publish tab in the Mobile Fabric App.
	2.Under runtime console select objects and it will navigate to admin console object services.
	3.Select storage object service used as part of app and select any table.
	4.It will navigate to request and response page.
	5.Besides get there is a url and select upto v1 and copy it to runtimeurl.
   	*/
    isRecurringSupported:true,
   	runtimeurl : "https://empselfservice1.konycloud.com:443/services/data/v1",
	ACFAppID :"MYLEAVE",   
    isSingleQrCode:true,
    isShowDeepLinkingAppBeforeInstall:false,
    /* variable is used to enable or disable the Team Leave.Currently frmLeaveHome using this Variable.
    If we assign the variable value to false then Team Leave Feature is not Available.
    If we  assign the value to true then Team Leave Feature is available.*/
    isTeamLeaveEnabled:true,
    /* variable  used to enable or disable the the Audit Trail.Currently frmLeaveRequestDetail using this Variable.
    If we assign the variable value to false then Audit Trail Feature is not Available.
    If we  assign the value to true then then Audit Trail Feature is available. */
    isAuditTrailEnabled:true,
    /*variable is used to enable or disable the attachements while applying the leave.Currently frmApplyLeave using this Variable.
     If we assign the variable value to false then  Attachement Feature is not Available.
     If we  assign the value to true,then Attachement Feature is available.*/
    isAttachementsEnabled:true,
    myPayUrl:"https://itunes.apple.com/in/app/kony-mypay/id1155632859?mt=8",//AppstoreURL for the My Pay.
    myTimeUrl:"https://itunes.apple.com/in/app/kony-mytime/id1157618072?mt=8",//AppstoreURL for the My Time.
    myProfileUrl:"https://itunes.apple.com/in/app/kony-myprofile/id1157624949?mt=8",//AppstoreURL for the My Profile.
    myExpenseUrl:"https://itunes.apple.com/in/app/kony-myexpenses/id1157625850?mt=8",//AppstoreURL for the My Expenses.
    myApprovalUrl:"https://itunes.apple.com/in/app/kony-myapprovals/id1157635405?mt=8",//AppstoreURL for the MyApprovals .
    // -- Category : Login :: START
    // Make this false to allow only office365 Login and not allowing local Login, registration
    showLocalLogin: false,
    // -- Category : Login :: END

    showErrorDetailsOnAlert: false,

   	//Set phoneNumber as to how many parts the phoneNumber should be divided to
  	// Ex : if inputNumber is +919032180XXX and phoneNumber is "3,4,5" output will be +91 9032 180XX X
    phoneNumber: "3,10", // set this parameter for formatting phone number

    maxImageSizeLimit: 1000000, //set this parameter for limiting image size

    writeAboveMe: "do not use me" // Only to avoid mistakes of comma related for last value
};
