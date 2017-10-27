/*** @Author Sumeet.bartha
 * @category Business Logic / Action
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.globalVariables = kony.apps.coe.ess.globalVariables || {};
kony.apps.coe.ess.globalVariables.constants = kony.apps.coe.ess.globalVariables.constants || {};

kony.apps.coe.ess.globalVariables.constants={
 "FrmApprovalHome":{
   "NowType":0,
   "LaterType":1
 }
};

kony.apps.coe.ess.globalVariables.clientObj = "";
kony.apps.coe.ess.globalVariables.ReturnInsteadOfNull = "Unknown";
// EmployeeID
kony.apps.coe.ess.globalVariables.EmployeeID = "";
//Variable to control prevForm.
kony.apps.coe.ess.globalVariables.prevForm = "";
//variable to store the approval request detail as next pages requires the data from the previous form 
kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData={};
kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab={};
//This variable stores pdf file path. Used this global variable to access file path in pdfReader form preshow.
kony.apps.coe.ess.globalVariables.filePath = "";
kony.apps.coe.ess.globalVariables.filePathTab = "";
//variable to store the Dynamic Segment in the frmsettings 
kony.apps.coe.ess.globalVariables.SettingsSegments="";
kony.apps.coe.ess.globalVariables.requestTypeSegements="";
kony.apps.coe.ess.globalVariables.statusTypeSegments="";
kony.apps.coe.ess.globalVariables.FrmTabApprovalsPeopleSearch="";
//variable to store the Dynamic Segment in the frmApprovals
kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch="";
//variable to store the Dynamic Segment in the frmApprovals
kony.apps.coe.ess.globalVariables.FrmApprovalsCurrentContentType="";
//variable to store the No of records to be fetched in the frmApprovals search form
kony.apps.coe.ess.globalVariables.PaginationRecordLength = 30;

//variable to store the approval request detail as next pages requires the data from the previous form 
kony.apps.coe.ess.globalVariables.UserSortingKey="ESS_MYAPPROVALS_USERSETTING_SORTKEY";

//variable to store whether the refresh of form is triggered by the data operations such as approver,reject or later operations
kony.apps.coe.ess.globalVariables.RefreshType={
  "DataOperation":1
};
/*
 *@function
 *@Desc update EmplooyID on Init of App
 */
kony.apps.coe.ess.globalVariables.updateEmployeeID = function (SucessCallback) {
	kony.print("---------Started execution of updateEmployeeID function ----------");

	kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", "select emp.Id from Employee emp where emp.IsEmployee='1';", function (callback, res) {
      
      if(res&&res.length>0){
      kony.apps.coe.ess.globalVariables.EmployeeID = res[0].Id;
      }
      
		if (callback) {
			callback();
		}

	}
		.bind(this, SucessCallback), function (err) {
		alert(JSON.stringify(err));
	});
}

kony.apps.coe.ess.globalVariables.UserSortingKey="ESS_MYAPPROVALS_USERSETTING_SORTKEY";
/*
*@function
*@Desc update EmplooyID on Init of App
*/
kony.apps.coe.ess.globalVariables.updateTabEmployeeID = function()
{
  var successcallback = function(res)
  { 
    kony.apps.coe.ess.globalVariables.Status.updateStatus();
    kony.apps.coe.ess.globalVariables.EmployeeID = res[0].Id;
    //kony.apps.coe.ess.globalVariables.EmployeeID = "910067";
    if( kony.apps.coe.ess.globalVariables.isNativeTablet === true ){ 
        kony.application.dismissLoadingScreen();
		//#ifdef windows8
     		frmWinTabDashboard.show();
			//#else
			//frmTabDashboard.show();
            tabDashboardShow();
      	//#endif
    }
  };
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", "select emp.Id from Employee emp where emp.IsEmployee='1';",successcallback, function(err){alert(JSON.stringify(err));});
};

//bbe-101 menu sync
kony.apps.coe.ess.globalVariables.lastSyncDate="";
kony.apps.coe.ess.globalVariables.timeforAutoSync=600;

