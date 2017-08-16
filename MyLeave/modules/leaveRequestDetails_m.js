//Type your code here

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.
leaveRequestDetails = function () {
	kony.print("-- Start LeaveRequestDetails --");
	kony.print("-- End LeaveReuestDetails --");
};

kony.apps.coe.ess.myLeave.
leaveRequestDetails.showForm =
function (leave_id) {
	kony.print("---- Start showLeaveRequestDetails ----");
	frmLeaveRequestDetails.destroy();

	kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id = leave_id;
	var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveRequestDetails");

	formController.loadDataAndShowForm();

	//frmLeaveRequestDetails.show();
	kony.print("---- End showLeaveReuestDetails ----");
};
