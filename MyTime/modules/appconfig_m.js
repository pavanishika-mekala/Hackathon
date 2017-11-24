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
    appkey: "5eea362c14ec570d704cfb1e9a2b8c02",
    appsecret: "d2f6704427077dc1e0b099f96c5aedfe",
    serviceurl:"https://100017816.auth.konycloud.com/appconfig",
    identityServiceName: "ESSIDENTITY",
    isDemo: true,
    /* Steps to obtain the runtime url
	1.Go to publish tab in the Mobile Fabric App.
	2.Under runtime console select objects and it will navigate to admin console object services.
	3.Select storage object service used as part of app and select any table.
	4.It will navigate to request and response page.
	5.Besides get there is a url and select upto v1 and copy it to runtimeurl.
   	*/
    runtimeurl: "https://empselfservice1.konycloud.com:443/services/data/v1",
    listOfApps: ["myLeave", "myProfile", "myPay", "myExpenses", "myApprovals"],
    isShowDeepLinkingAppBeforeInstall: false,
    version: "v3.1.1", //set version number for the app
    myPayUrl: "https://itunes.apple.com/in/app/kony-mypay/id1155632859?mt=8", //AppstoreURL for the My Pay.
    myProfileUrl: "https://itunes.apple.com/in/app/kony-myprofile/id1157624949?mt=8", //AppstoreURL for the My Profile.
    myLeaveUrl: "https://itunes.apple.com/in/app/kony-myleave/id1157606885?mt=8", //AppstoreURL for the My Leave.
    myExpenseUrl: "https://itunes.apple.com/in/app/kony-myexpenses/id1157625850?mt=8", //AppstoreURL for the My Expenses.
    myApprovalUrl: "https://itunes.apple.com/in/app/kony-myapprovals/id1157635405?mt=8", //AppstoreURL for the MyApprovals .
    // -- Category : Login :: START
    // Make this false to allow only office365 Login and not allowing local Login, registration
    showLocalLogin: false,
    // -- Category : Login :: END

    showErrorDetailsOnAlert: true,
    isSingleQrCode: true,

    //Set phoneNumber as to how many parts the phoneNumber should be divided to
    // Ex : if inputNumber is +919032180XXX and phoneNumber is "3,4,5" output will be +91 9032 180XX X
    phoneNumber: "3,10", // set this parameter for formatting phone number
    weekStartDay: 0, // {0 : Sunday, 1 : Monday, 2 : Tuesday, ........., 6 : Saturday}
    yearStartDate: new Date((new Date()).getFullYear(), 0, 1), //This is dateObj and by default assign date is 1 January. Year doesn't matter to this where it is being used. So, assigning current year.


    fullDayStartTime: "9 AM",
    fullDayEndTime: "5 PM",
    defaultSliderStartTime: "9 AM",
    defaultSliderEndTime: "11 AM",
    isManualTimeEntry: false,
    getCurrentLocation: false, //This variable actually comes from backend and decides whether to capture the user location or not while submitting the timesheet
    writeAboveMe: "do not use me" // Only to avoid mistakes of comma related for last value

};