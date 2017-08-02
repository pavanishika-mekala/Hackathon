/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to Employee look up form.
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

kony.apps.coe.ess.Approvals.EmployeeLookUp = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.EmployeeLookUp--");
    this.widgetDataMap = {
        "lblEmpName" : "empName",
        "lblEmpDesignation" : "empDesignation",
        "lblEmpIdValue" : "empId",
    };
    this.employeeList = [];
    kony.print("--End: kony.apps.coe.ess.Approvals.EmployeeLookUp--");
};

kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.EmployeeLookUp.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.EmployeeLookUp.singletonObj;
        } else {
            kony.apps.coe.ess.Approvals.EmployeeLookUp.singletonObj = new kony.apps.coe.ess.Approvals.EmployeeLookUp();
            return kony.apps.coe.ess.Approvals.EmployeeLookUp.singletonObj;
        }
    } catch(err) {
        handleError(err);
    }
    kony.print("--Start: kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance--");
};

kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.
getEmployeeDetails = function(empId) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.getEmployeeDetails--");
    try {
        for(var i in this.employeeList) {
            if(String(this.employeeList[i].empId).trim() === String(empId).trim()) {
                return this.employeeList[i];
            }
        }
    } catch(err) {
        handleError(err); 
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.getEmployeeDetails--");
};

kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.
setDataInList = function() {
  var scopeObj = this;
    kony.print("--Start: kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.setDataInList--");
    try {
      	frmEmployeeLookUp.segEmployeeList.widgetDataMap = this.widgetDataMap;
		var query = "SELECT (First_Name || ' ' || Middle_Name || ' ' ||Last_Name ) as empName , Id as empId from employee where IsEmployee = '0'"; 		
      	kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(res) {
            scopeObj.employeeList = res;
        	frmEmployeeLookUp.segEmployeeList.setData(res);
    	}, function(error){
          	handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchApprovalRequest") + JSON.stringify(error)));
    		kony.print("Entered into Error block in Employee Look up search");
  		});
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.setDataInList--");
};

kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.
onRowClickOfList = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.onRowClickOfList--");
    try {
        var selectedItem = frmEmployeeLookUp.segEmployeeList.selectedItems[0];
        showDelegationRequestCreateForm(selectedItem);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.EmployeeLookUp.prototype.onRowClickOfList--");
};