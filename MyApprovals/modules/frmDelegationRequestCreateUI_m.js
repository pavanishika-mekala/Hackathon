/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to UI of frmDelegationRequestCreate form
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
 * @description    This is a constructor for class kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI = function () {
    kony.print("--Start constructor: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI--");
	this.isIndefiniteBtnChecked = false;
    kony.print("--End constructor: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI}.
 * @description    This method will return instance of kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.
 *                 Object will be created once; next time; will return same object.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance = function () {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance--");
	try {
		if (kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.singletonObj !== undefined) {
			return kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.singletonObj;
		}
		kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.singletonObj = new kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI();
		return kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.singletonObj;
	} catch (err) {
		handleError(err);
	}
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance--");
};

/**
 * @param          none.
 * @return         {Boolean}.
 * @description    This method will check if indefinite button is checked or not.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
isIndefinteBtnChecked = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.isIdefinteChecked--");
    try {
        return this.isIndefiniteBtnChecked === true;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.isIdefinteChecked--");
};

/**
 * @param          {function} callback - This will be called after selection is done.
 * @return         none.
 * @description    This method will select all types from list.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
selectAllRequestTypes = function (callback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.selectAllRequestTypes--");
	try {
		var dataLength = frmDelegationRequestCreate.segTypeOfRequestList.data.length;
		var selectedIndices = [];
		for (var i = 0; i < dataLength; i++) {
			selectedIndices.push(i);
		}
		frmDelegationRequestCreate.segTypeOfRequestList.selectedRowIndices = [[0, selectedIndices]];
	} catch (err) {
		handleError(err);
	}
	if (callback !== null && callback !== undefined && typeof(callback) === "function") {
		callback();
	} else {
		kony.print("callback paramter is null || undefined || not of function type.");
	}
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.selectAllRequestTypes--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will hide indefinite toggle button.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
hideIndefiniteBtn = function () {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.hideIndefiniteBtn--");
	try {
		frmDelegationRequestCreate.flxIndefiniteToggle.isVisible = false;
		this.isIndefiniteBtnChecked = null;
	} catch (err) {
		handleError(err);
	}
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.hideIndefiniteBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will show indefinite toggle button.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
showIndefiniteBtn = function () {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.showIndefiniteBtn--");
	try {
		frmDelegationRequestCreate.imgIndefinitePeriod.src = "uncheck.png";
		frmDelegationRequestCreate.flxIndefiniteToggle.isVisible = true;
		this.isIndefiniteBtnChecked = false;
	} catch (err) {
		handleError(err);
	}
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.showIndefiniteBtn--");
};

/**
 * @param          {function} callback - This will called at the end. When all UI will be set.
 * @return         none.
 * @description    This method will toggle indefinite toggle button.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
toggleIndefiniteBtn = function (callback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.toggleIndefiniteBtn--");
	try {
		if (this.isIndefiniteBtnChecked === null) {
			throw "Error: isIndefiniteBtnChecked is null";
		} else if (this.isIndefiniteBtnChecked === false) {
			frmDelegationRequestCreate.imgIndefinitePeriod.src = "checked.png";
			this.isIndefiniteBtnChecked = true;
		} else if (this.isIndefiniteBtnChecked === true) {
			frmDelegationRequestCreate.imgIndefinitePeriod.src = "uncheck.png";
			this.isIndefiniteBtnChecked = false;
		} else {
			throw "Error: isIndefiniteBtnChecked is not type of Boolean";
		}
	} catch (err) {
		callback(null);
		handleError(err);
	}
	if (callback !== null && callback !== undefined && typeof(callback) === "function") {
		callback(this.isIndefiniteBtnChecked);
	} else {
		kony.print("callback paramter is null || undefined || not of function type.");
	}
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.toggleIndefiniteBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will set disabled UI for To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
disableToDate = function () {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.disableToDate--");
    try {
        frmDelegationRequestCreate.flxToDate.setEnabled(false);
	    //frmDelegationRequestCreate.clndToDate.isVisible = false;
	    //frmDelegationRequestCreate.lblToDateSelect.isVisible = true;
	    frmDelegationRequestCreate.flxToDateDisable.isVisible = true;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.disableToDate--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will set enabled UI for To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
enableToDate = function () {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.enableToDate--");
    try {
        frmDelegationRequestCreate.flxToDateDisable.isVisible = false;
	    frmDelegationRequestCreate.lblToDateSelect.isVisible = false;
	    frmDelegationRequestCreate.clndToDate.isVisible = true;
	    frmDelegationRequestCreate.flxToDate.setEnabled(true);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.enableToDate--");
};

/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set date in To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setDateInToCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDateInToCalendar--");
    try {
        if(dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
        	throw "Error: dateObj is null || undefined || not instance of Date";
        }
         frmDelegationRequestCreate.clndToDate.date = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDateInToCalendar--");
};

/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set date in From Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setDateInFromCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDateInFromCalendar--");
    try {
        if(dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
        	throw "Error: dateObj is null || undefined || not instance of Date";
        }
        frmDelegationRequestCreate.clndFromDate.date = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDateInFromCalendar--");
};

/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set lower limit in To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setLowerLimitOnToCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setLowerLimitOnToCalendar--");
    try {
        if(dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
        	throw "Error: dateObj is null || undefined || not instance of Date";
        }      
        frmDelegationRequestCreate.clndToDate.validStartDate = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setLowerLimitOnToCalendar--");
};

/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set upper limit in To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setUpperLimitOnToCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setUpperLimitOnToCalendar--");
    try {
        if(dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
        	throw "Error: dateObj is null || undefined || not instance of Date";
        }
        frmDelegationRequestCreate.clndToDate.validEndDate = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setUpperLimitOnToCalendar--");
};

/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set lower limit in From Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setLowerLimitOnFromCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setLowerLimitOnFromCalendar--");
    try {
        if(dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
        	throw "Error: dateObj is null || undefined || not instance of Date";
        } 
        frmDelegationRequestCreate.clndFromDate.validStartDate = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setLowerLimitOnFromCalendar--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will disable on click of change employee button.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
disableChangeEmployeeBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.disableChangeEmployeeBtn--");
    try {
        frmDelegationRequestCreate.flxSelectDelegatedApprover.setEnabled(false);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.disableChangeEmployeeBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will enable on click of change employee button.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
enableChangeEmployeeBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.enableChangeEmployeeBtn--");
    try {
        frmDelegationRequestCreate.flxSelectDelegatedApprover.setEnabled(true);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.enableChangeEmployeeBtn--");
};

/**
 * @param          {JsonObject} empData - This contains all required data of a employee.
 * @return         none.
 * @description    This method will set data in UI for a employee.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setEmployeeData = function(empData) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setEmployeeData--");
    try {
        frmDelegationRequestCreate.lblEmpId.text = empData.empId;
        frmDelegationRequestCreate.lblEmpName.text = empData.empName;
      	frmDelegationRequestCreate.lblEmpNameAndDesignationHyphen.setVisibility(false);
        //frmDelegationRequestCreate.lblEmpDesignation.text = empData.empDesignation;
        //frmDelegationRequestCreate.lblEmpEmail.text = empData.email;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setEmployeeData--");
};

/**
 * @param          {JsonObject} data - This contains all data. Which will be set in UI.
 * @return         none.
 * @description    This method will set data in UI for a delegation request. Which will be available for edit.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setDataInEditMode = function(data) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDataInEditMode--");
    try {
        if(data === null || data === undefined) {
            throw "Error in setDataInEditMode: data is null or undefined";
        }
        if(!Array.isArray(data)) {
            throw "Error in setDataInEditMode: Expected array of data as parameter.";
        }
        var tempGroupId = data[0].groupId;
        for(var i in data) {
            if(String(data[i].groupId) !== String(tempGroupId)) {
                throw "Error in setDataInEditMode: groupId should be same for all type of request";
            }
        }
        this.setCalendarWidgetsDateFormat(kony.i18n.getLocalizedString("i18n.ess.common.calendarDateFormat"));
        var requestTypes = [];
        for(var i in data) {
            requestTypes.push(data[i].requestTypeId);
        }
        var startDate = new Date(data[0].startDate.substring(0, 4), parseInt(data[0].startDate.substring(4, 6)) - 1, data[0].startDate.substring(6, 8));
        var endDate = new Date(data[0].endDate.substring(0, 4), parseInt(data[0].endDate.substring(4, 6)) - 1, data[0].endDate.substring(6, 8));
        this.setDateInFromCalendar(startDate);
        this.setLowerLimitOnToCalendar(startDate);
        this.setDateInToCalendar(endDate);
        this.disableChangeEmployeeBtn();
        frmDelegationRequestCreate.txtareaComments.text = String(data[0].comments).trim();
        var empData = kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().getEmployeeDetails(data[0].empId);
        this.setEmployeeData(empData);
        var selectedIndices = [];
        var segData = frmDelegationRequestCreate.segTypeOfRequestList.data;
        for(var i in segData) {
            if(requestTypes.indexOf(segData[i].id) >= 0) {
                selectedIndices.push(parseInt(i));
            }
        }
        frmDelegationRequestCreate.segTypeOfRequestList.selectedRowIndices = [[0, selectedIndices]];
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDataInEditMode--");
};

/**
 * @param          {String} empId - This contains employee data.
 * @return         none.
 * @description    This method will set employee data in UI.
 *                 Reset from date with current date and to date fromDate + 6 days
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setDataInCreateMode = function(empId) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDataInCreateMode--");
    try {
        if(empId === null || empId === undefined || String(empId).trim() === "") {
            throw "Error in setDataInCreateMode: empId is null || undefined || empty string";
        }
        this.setCalendarWidgetsDateFormat(kony.i18n.getLocalizedString("i18n.ess.common.calendarDateFormat"));
        var newDate = new Date();
        this.setLowerLimitOnFromCalendar(newDate);
        //setting current date
        this.setDateInFromCalendar(newDate);
        this.setLowerLimitOnToCalendar(newDate);
        //setting fromDate + 6 days
        this.setDateInToCalendar(new Date(Date.parse(newDate) + 518400000));
        this.enableChangeEmployeeBtn();
        frmDelegationRequestCreate.txtareaComments.text = "";
        var empData = kony.apps.coe.ess.Approvals.EmployeeLookUp.getInstance().getEmployeeDetails(empId);
        this.setEmployeeData(empData);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setDataInCreateMode--");
};

/**
 * @param          {String} dateFormat - This should contains a valid date format.
 * @return         none.
 * @description    This method will change date format for all calendar widgets in create form.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.
setCalendarWidgetsDateFormat = function(dateFormat) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setCalendarWidgetsDateFormat--");
    try {
        dateFormat = String(dateFormat); //parsing to String
        if(dateFormat === null || dateFormat === undefined || dateFormat === "") {
            dateFormat = "dd/MM/yyyy";
        }
        frmDelegationRequestCreate.clndFromDate.dateFormat = dateFormat; //assigning date format to from calendar
        frmDelegationRequestCreate.clndToDate.dateFormat = dateFormat; //assigning date format to from calendar
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.prototype.setCalendarWidgetsDateFormat--");
};