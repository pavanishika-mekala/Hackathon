/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to action events of frmDelegationRequestCreate form
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

kony.apps.coe.ess.Approvals.DelegationRequestCreate = kony.apps.coe.ess.Approvals.DelegationRequestCreate || {};


/**
 * @param          none.
 * @return         none.
 * @description    This is constructor for action class.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions = function() {
    
};

/**
 * @param          none.
 * @return         Instance of kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.
 * @description    It returns object of kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.
 *                 Only once it will create object after that, will return same.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.singletonObj;
        }
        kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.singletonObj = new kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions();
        return kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.singletonObj;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.getInstance--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This will be called on click of indefinite toggle button.
 *                 This method is calling UI setting methods also.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.
onClickOfIndefiniteBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfIndefiniteBtn--");
    function callback(isChecked) {
        var fromDate = frmDelegationRequestCreate.clndFromDate;
      	kony.print("fromDate is::"+fromDate);
      	//frmDelegationRequestCreate.clndFromDate.validEndDate = [fromDate.day, fromDate.month, fromDate.year+1];
        if(isChecked) {
          	frmDelegationRequestCreate.clndToDate.date = [fromDate.day-1, fromDate.month, fromDate.year+1];
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().disableToDate();
        } else {
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().enableToDate();
          	frmDelegationRequestCreate.clndToDate.date = [fromDate.day+6, fromDate.month, fromDate.year];
        }
    }
    try {
        kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().toggleIndefiniteBtn(callback);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfIndefiniteBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This will be called on click of select all button.
 *                 This method is calling UI setting methods also.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.
onClickOfSelectAllBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfSelectAllBtn--");
    try {
        kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().selectAllRequestTypes();
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfSelectAllBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This will be called on selection of date in from calendar.
 *                 This method is setting lower limit for to calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.
onSelectionOfDateInFromCalendar = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onSelectionOfDateInFromCalendar--");
    try {
        var fromDate = frmDelegationRequestCreate.clndFromDate;
        var toDate = frmDelegationRequestCreate.clndToDate;
        fromDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
        toDate = new Date(toDate.year, toDate.month - 1, toDate.day);
        if(toDate <= fromDate) {
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().setDateInToCalendar(fromDate);
        }
      	var frmDate = frmDelegationRequestCreate.clndFromDate;
      	frmDelegationRequestCreate.clndToDate.validEndDate = [frmDate.day, frmDate.month, frmDate.year+1]
      	if(kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().isIndefinteBtnChecked()){
          //var frmDate = frmDelegationRequestCreate.clndFromDate;
          frmDelegationRequestCreate.flxToDate.setEnabled(true);
          frmDelegationRequestCreate.clndToDate.date = [frmDate.day, frmDate.month, frmDate.year+1];
          frmDelegationRequestCreate.flxToDate.setEnabled(false);
        }
        kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().setLowerLimitOnToCalendar(fromDate);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onSelectionOfDateInFromCalendar--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This will be called on click of submit button.
 *                 This method is collecting data and formating and calling backend methods to write in DB.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.
onClickOfSubmit = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfSubmit--");
    try {
        var contextData = kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().contextData;
        var selectedItems = frmDelegationRequestCreate.segTypeOfRequestList.selectedItems;
        var values = [];
        var fromDate = frmDelegationRequestCreate.clndFromDate;
        var toDate = frmDelegationRequestCreate.clndToDate;
        var timeStamp = new Date();
        if(selectedItems === null || selectedItems === undefined || selectedItems.length <= 0) {
            toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pleaseSelectRequestType"), 2000);
            return;
        }
        timeStamp = timeStamp.toYYYMMDDHHMMSS();
        fromDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
        fromDate = fromDate.toYYYYMMDD("");
        if(!kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().isIndefinteBtnChecked()) {
            toDate = new Date(toDate.year, toDate.month - 1, toDate.day);
        } else {
          	var frmDateforTodate = frmDelegationRequestCreate.clndFromDate;
          	toDate = new Date(frmDateforTodate.year+1, frmDateforTodate.month - 1, frmDateforTodate.day - 1);
        }
      	toDate = toDate.toYYYYMMDD("");
        var employeeId = String(kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().contextData.empId);
        for(var i in selectedItems) {
            if(!kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().isIndefinteBtnChecked()) {
                values.push({
                    "employee_id" : employeeId,
                    "delegator_id" : kony.apps.coe.ess.globalVariables.EmployeeID,
                    "request_type_id" : selectedItems[i].id,
                    "start_date" : fromDate,
                    "end_date" : toDate,
                    "status_id" : "2",
                    "comments" : String(frmDelegationRequestCreate.txtareaComments.text).trim(),
                    "createdts" : timeStamp
                });
            } else {
                values.push({
                    "employee_id" : employeeId,
                    "delegator_id" : kony.apps.coe.ess.globalVariables.EmployeeID,
                    "request_type_id" : selectedItems[i].id,
                    "start_date" : fromDate,
                  	"end_date" : toDate,
                    "status_id" : "2",
                    "comments" : String(frmDelegationRequestCreate.txtareaComments.text).trim(),
                    "createdts" : timeStamp
                });
            }
        }
        
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.myApprovals.validatingRequest"));
        if(contextData.openInEditMode === true) {
            for(var i in values) {
                values[i].delegation_group_id = contextData.delegateGroupId;
            }
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().isValidRequest(values, successCallbackForUpdateValidation.bind(this, values), error);
        } else {
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().isValidRequest(values, successCallbackForCreateValidation.bind(this, values), error);
        }        
    } catch(err) {
        kony.application.dismissLoadingScreen();
        handleError(err);
    }
    function successCallbackForCreateValidation(values, isValid) {
        kony.application.dismissLoadingScreen();
        if(isValid) {
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.myApprovals.creatingRequest"));
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().createDelegationRequest(values, successCallbackForCreate, error);
        } else {
            toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.delegationAlreadyExistsForTheSelectedPeriod"), 2000);
        }
    }
    function successCallbackForUpdateValidation(values, isValid) {
        kony.application.dismissLoadingScreen();
        if(isValid) {
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.myApprovals.creatingRequest"));
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().updateDelegationRequest(values, successCallbackForCreate, error);
        } else {
            toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.delegationAlreadyExistsForTheSelectedPeriod"), 2000);
        }
    }
    function successCallbackForCreate(res) {
        kony.application.dismissLoadingScreen();
        showDelegationRequestListForm();
    }
    function error(err) {
        kony.application.dismissLoadingScreen();
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfSubmit--");
};