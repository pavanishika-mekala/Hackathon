/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to backend of frmDelegationRequestCreate form
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

kony.apps.coe.ess.Approvals.DelegationRequestCreate = kony.apps.coe.ess.Approvals.DelegationRequestCreate || {};

//----------------------------------------------Backend-------------------------------------------------------------------

/**
 * @param          none.
 * @return         none.
 * @description    This is constructor for class kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend = function () {
	kony.print("--Start constructor: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend--");
    this.contextData = null;
	kony.print("--End constructor: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend}.
 * @description    This is return instance of kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.
 *                 This creates object once next time; will return same.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.singletonObj;
        }
        kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.singletonObj = new kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend();
        return kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.singletonObj;
    } catch(err) {
       handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance--");
};

/**
 * @param          {Array} values - It contains data of a delegation request; need to create.
 * @param          {function} successCallback - This will be called at successful creation of delegation request.
 * @param          {function} errorCallback - This will be called, if an error occur while creating request(writing in DB).
 * @return         none.
 * @description    This will create delegation request for provided data.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.
createDelegationRequest = function (values, successCallback, errorCallback) {
	kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.createDelegationRequest--");
	try {
		if (!Array.isArray(values)) {
			var x = [];
			x.push(values);
			values = x;
		}
		if (values.length <= 0) {
			if (successCallback !== null && successCallback !== undefined && typeof(successCallback) === "function") {
				successCallback();
			} else {
				kony.print("Warning: successCallback is null || undefined || not type of function");
			}
			return;
		}
        var groupId = getDelegateGroupId(0);
        for(var i in values) {
            if(values[i].delegation_group_id === null || values[i].delegation_group_id === undefined || String(values[i].delegation_group_id).trim() === "") {
                values[i].delegation_group_id = groupId;
            }
        }
		recCreate(0);
	} catch (err) {
		handleError(err);
	}
	function recCreate(index) {
        values[index].id = getDelegateId(index);
		var validation = kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.getInstance().validateCreateData(values[index]);
        if(validation.validationResult) {
            kony.apps.coe.ess.MVVM.createRecord("MYAPPROVALS", "delegate", values[index], success.bind(this, index), errorCallback);
        } else {
            errorCallback(validation.message);
        }
	}
	function success(index, res) {
		if (index >= values.length - 1) {
			if (successCallback !== null && successCallback !== undefined && typeof(successCallback) === "function") {
				successCallback();
			} else {
				kony.print("Warning: successCallback is null || undefined || not type of function");
			}
			return;
		}
		recCreate(index + 1);
	}
    function getDelegateId(index) {
        var timestamp = new Date().getUTCMilliseconds();
        return "MA_V1_DLG_" + values[index].start_date + "_T_" + timestamp;
    }
    function getDelegateGroupId(index) {
        var timestamp = new Date().getUTCMilliseconds();
        return "MA_V1_DGP_" + values[index].start_date + "_T_" + timestamp;
    }
	kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.createDelegationRequest--");
};

/**
 * @param          {Array} values - It contains data of a delegation request; need to create.
 * @param          {function} successCallback - This will be called at successful update of delegation request.
 * @param          {function} errorCallback - This will be called, if an error occur while updating request.
 * @return         none.
 * @description    This will update delegation request for provided data.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.
updateDelegationRequest = function (values, successCallback, errorCallback) {
	kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.updateDelegationRequest--");
	try {
        var scopeObj = this;
        if (!Array.isArray(values)) {
			var x = [];
			x.push(values);
			values = x;
		}
		if (values.length <= 0) {
			if (successCallback !== null && successCallback !== undefined && typeof(successCallback) === "function") {
				successCallback();
			} else {
				kony.print("Warning in updateDelegationRequest: successCallback is null || undefined || not type of function");
			}
			return;
		}
        //checking whether id is same for all OR not
        var tempGroupId = values[0].delegation_group_id;
        for(var i in values) {
            if(String(tempGroupId) !== String(values[i].delegation_group_id)) {
                throw "Error in updateDelegationRequest: while checking whether id is same for all record or not.";
            }
        }
        var deletedRequestSet = "(";
        for(var i in values) {
            deletedRequestSet += "'" + values[i].request_type_id + "',";
        }
        deletedRequestSet = deletedRequestSet.substring(0, deletedRequestSet.length - 1) + ")";
        var whereCondition = " where delegation_group_id = '" + values[0].delegation_group_id + "' AND request_type_id NOT IN " + deletedRequestSet + " AND status_id = '2';";
        com.kony.MYAPPROVALS.delegate.update(whereCondition, {"status_id" : "3"}, successCallbackStopDelegationRequest, errorCallback, true);
    }
	catch (err) {
		handleError(err);
	}
	function successCallbackStopDelegationRequest() {
		recUpdate(0);
	}
    function recUpdate(index) {
		var validation = kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.getInstance().validateUpdateData(values[index]);
        if(validation.validationResult) {
            scopeObj.isRequestExist(values[index], successCallbackForIsExistRequest.bind(scopeObj, index), errorCallback);
        } else {
            errorCallback(validation.message);
        }
	}
    function successCallbackForIsExistRequest(index, isExist) {
        values[index].status_id = "2"; //reseting status
        if(isExist) {
            //Update existing one
            var whereCondition = " where delegation_group_id = '" + values[index].delegation_group_id + "' AND request_type_id = '" + values[index].request_type_id + "';";
            com.kony.MYAPPROVALS.delegate.update(whereCondition, values[index], success.bind(scopeObj, index), errorCallback, true);
        } else {
            //Create new one
            scopeObj.createDelegationRequest(values[index], success.bind(scopeObj, index), errorCallback);
        }
    }
    function success(index, res) {
        if (index >= values.length - 1) {
			if (successCallback !== null && successCallback !== undefined && typeof(successCallback) === "function") {
				successCallback();
			} else {
				kony.print("Warning in updateDelegationRequest: successCallback is null || undefined || not type of function");
			}
			return;
		}
		recUpdate(index + 1);
    }
	kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.updateDelegationRequest--");
};

/**
 * @param          {JsonObject} data - It must contain valid delegation_group_id and request_type_id.
 * @param          {function} successCallback - This will be called at successful execution with an argument true/false.
 * @param          {function} errorCallback - This will be called, if an error occur in execution.
 * @return         none.
 * @description    This method will check if there is any request with same group id and request type to avoid duplicacy.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.
isRequestExist = function(data, successCallback, errorCallback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.isRequestExist--");
    try {
        if(data === null || data === undefined || typeof(data) !== "object") {
            throw "Error in isRequestExist: data is null || undefined || not type of object";
        }
        if(data.delegation_group_id === undefined || data.delegation_group_id === null || String(data.delegation_group_id) === "") {
            throw "Error in isRequestExist: delegation_group_id is null || undefined || empty string";
        }
        if(data.request_type_id === undefined || data.request_type_id === null || String(data.request_type_id) === "") {
            throw "Error in isRequestExist: request_type_id is null || undefined || empty string";
        }
        var query = "select dl.id from delegate dl " +
            " where dl.delegation_group_id = '" + data.delegation_group_id + "' " +
            " AND dl.request_type_id = '" + data.request_type_id + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success, errorCallback);
    } catch(err) {
        handleError(err);
    }
    function success(res) {
        if(res === null || res === undefined || res.length <= 0) {
            successCallback(false);
            return;
        }
        successCallback(true);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.isRequestExist--");
};

/**
 * @param          {String} groupId - It is group id for a delegation request.
 * @param          {function} successCallback - This will be called at successful execution.
 * @param          {function} errorCallback - This will be called, if an error occur in execution.
 * @return         none.
 * @description    This method will stop delegation request.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.
stopDelegationRequest = function (groupId, successCallback, errorCallback) {
	kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.stopDelegationRequest--");
	try {
        if(groupId === null || groupId === undefined || String(groupId) === "") {
            throw "Error in groupId: groupId is null || undefined || empty string";
        }
        com.kony.MYAPPROVALS.delegate.update("where delegation_group_id = '" + groupId + "' AND status_id = '2' ", {status_id : "3"}, successCallback, errorCallback, true);
	} catch (err) {
		handleError(err);
	}
	kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.stopDelegationRequest--");
};

/**
 * @param          {Array} values - This will contains a delegation request.
 * @param          {function} successCallback - This will be called at successful execution.
 * @param          {function} errorCallback - This will be called, if an error occur in execution.
 * @return         none.
 * @description    This method will validate delegation request.
 *                 This method is supposed to call before writing data in DB. To avoid duplicate request.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.
isValidRequest = function(values, successCallback, errorCallback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.isAvalidRequest--");
    function getQuery(i, indexForData) {
        i = String(parseInt(i));
        indexForData = String(parseInt(indexForData));
        var baseQuery  = "select dl.start_date as start_date, dl.end_date as end_date from delegate dl " + 
                " where dl.delegator_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "' " + 
                " AND dl.status_id = '2' " + 
                " AND dl.request_type_id = '" + values[indexForData].request_type_id + "' ";
        if(values[indexForData].delegation_group_id !== null && values[indexForData].delegation_group_id !== undefined && String(values[indexForData].delegation_group_id).trim() !== "") {
            baseQuery += " AND dl.delegation_group_id != '" + values[indexForData].delegation_group_id + "' ";
        }
        if(values[indexForData].end_date !== null && values[indexForData].end_date !== undefined  && String(values[indexForData].end_date).trim() !== "") {
            switch(i) {
                case "0":
                    return baseQuery +
                        " AND ((dl.end_date IS NULL) OR dl.end_date = '')" +
                        " AND dl.start_date <= '" + values[indexForData].end_date + "';";
                case "1":
                    return baseQuery +
                        " AND ((dl.end_date IS NOT NULL) AND dl.end_date != '')" +
                        " AND ((dl.start_date >= '" + values[indexForData].start_date + "' AND dl.start_date <= '" + values[indexForData].end_date + "') OR (dl.end_date >= '" + values[indexForData].start_date + "' AND dl.end_date <= '" + values[indexForData].end_date + "'));";
                default:
                    return "";
            }
        } else {
            switch(i) {
                case "0":
                    return baseQuery +
                        " AND ((dl.end_date IS NULL) OR dl.end_date = '');";
                case "1":
                    return baseQuery +
                        " AND ((dl.end_date IS NOT NULL) AND dl.end_date != '')" +
                        " AND dl.end_date >= '" + values[indexForData].start_date + "';";
                default:
                    return "";
            }
        }
        
    }
    var queryIndex = 0;
    try {
		if (!Array.isArray(values)) {
			var x = [];
			x.push(values);
			values = x;
		}
		if (values.length <= 0) {
			if (successCallback !== null && successCallback !== undefined && typeof(successCallback) === "function") {
				successCallback(true);
			} else {
				kony.print("Warning: successCallback is null || undefined || not type of function");
			}
			return;
		}
		recValidate(0);
	} catch (err) {
		handleError(err);
	}
	function recValidate(index) {
        var query = getQuery(queryIndex, index);
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success.bind(this, index), errorCallback);
	}
	function success(index, res) {
        if(res !== null && res !== undefined && res.length > 0) {
            successCallback(false);
            return;
        }
		if (index >= values.length - 1) {
            queryIndex = parseInt(queryIndex);
            if(queryIndex < 1) {
                queryIndex = queryIndex + 1;
                recValidate(0);
                return;
            }
			if (successCallback !== null && successCallback !== undefined && typeof(successCallback) === "function") {
				successCallback(true);
			} else {
				kony.print("Warning: successCallback is null || undefined || not type of function");
			}
			return;
		}
		recValidate(index + 1);
	}
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.isAvalidRequest--");
};

//--------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------Validation-----------------------------------------------------------

/**
 * @param          none.
 * @return         none.
 * @description    This constructor for class kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation = function () {
    kony.print("--Start constructor: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation--");
    kony.print("--End constructor: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation}.
 * @description    This method will return object for class kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.
 *                 Object will be created once; next time same will be returned;
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.singletonObj;
        }
        kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.singletonObj = new kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation();
        return kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.singletonObj;
    } catch(err) {
       handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.getInstance--");
};
  
/**
 * @param          {JsonObject} data - This contains data which need to validate.
 * @param          {String} key - This is a key corresponding to which value will be validated.
 * @return         {JsonObject} - It contains to values {validationResult - true/false}, {message - a string of message}.
 * @description    This will do basic and common validations; will check for null, undefined and empty string("").
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.prototype.
commonValidations = function (data, key) {
	try {
		key = String(key);
		if (data[key] === null || data[key] === undefined || data[key] === "") {
			return {
				"validationResult": false,
				"message": "Error in " + key + " : " + key + " is undefined || null || empty string"
			};
		}
		return {
			"validationResult": true,
			"message": key + " is valid"
		};
	} catch (err) {
		handleError(err);
	}
};

/**
 * @param          {JsonObject} data - This should contain required fields.
 * @return         {JsonObject} - It contains to values {validationResult - true/false}, {message - a string of message}.
 * @description    This method will validate creation request data.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.prototype.
validateCreateData = function (data) {
	try {
		if (!data instanceof Object) {
			return {
				"validationResult": false,
				"message": "Invalid type of arguments; expected JSON type"
			};
		}
		var params = ["id", "delegation_group_id", "delegator_id", "employee_id", "request_type_id", "start_date", "createdts", "status_id"];
		var result;
		for (var i in params) {
			result = this.commonValidations(data, params[i]);
			if (!result.ValidationResult) {
				return result;
			}
		}
		result = this.commonValidations(data, "end_date");
		if (result.ValidationResult && String(data.start_date).compare(data.end_date) > 0) {
			return {
				"validationResult": false,
				"message": "Error in start_date and end_date: start_date is greater than end_date"
			};
		}
        if(String(data.status_id) !== "2") {
            return {
				"validationResult": false,
				"message": "Error in status_id: status_id value should be 2 for creation"
			};
        }
	} catch (err) {
		handleError(err);
	}
};

/**
 * @param          {JsonObject} data - This should contain required fields.
 * @return         {JsonObject} - It contains to values {validationResult - true/false}, {message - a string of message}.
 * @description    This method will validate update request data.
 */
kony.apps.coe.ess.Approvals.DelegationRequestCreate.Validation.prototype.
validateUpdateData = function (data) {
	try {
		if (!data instanceof Object) {
			return {
				"validationResult": false,
				"message": "Invalid type of arguments; expected JSON type"
			};
		}
		var params = ["request_type_id", "delegation_group_id"];
		var result;
		for (var i in params) {
			result = this.commonValidations(data, params[i]);
			if (!result.ValidationResult) {
				return result;
			}
		}
	} catch (err) {
		handleError(err);
	}
};

//-----------------------------------------------------------------------------------------------------------------------------
