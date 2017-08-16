/**
 *  @author     Shantam Agarwal
 *  @category   Business Logic
 *  @desc       Async Call functionality for multiple Service Calls
 *  @ ©2016    Kony Inc
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
/**
 * @type           method
 * @param          {callObj - object}Object of specific format to specify Object Services and objects to fetch, {succescallback - function} the successcallback with response
 * @return         None.
 * @description    Asynchronously fetches data from multiple tables from an object servicess
 */
kony.apps.coe.ess.multiFetchObjectService = function(callObj, successCallback){
	var callNum = 0;
	var responseObj = [];
	var errResponse = [];
	for(var i=0; i<callObj.length; i++){
		callNum += callObj[i].objects.length;
	}
	var dataSuccess = function(response){
		var regexModel = /[A-Za-z]*(?=\/objects\/)+/g;
		var regexObject = /[a-zA-Z0-9_]+(?=\?)/g;
		var model = regexModel.exec(response.httpresponse.url)[0];
		var object = regexObject.exec(response.httpresponse.url)[0];
		if(responseObj[model]){
			responseObj[model][object] = response.records;
		}
		else{
			responseObj[model] = {};
			responseObj[model][object] = response.records;
		}
		callNum--;
		if(callNum === 0 ){
			if(errResponse != []){
				responseObj.error = errResponse;
			}
			successCallback(responseObj);
		}
	}
	var dataFailure = function(error){
		errResponse.push(error);
		callNum--;
		if(callNum === 0 ){
			if(errResponse != []){
				responseObj.error = errResponse;
			}
			successCallback(responseObj);
		}
	}

	for(var i=0; i<callObj.length; i++){
		for(var j=0; j<callObj[i].objects.length; j++){
			var model = callObj[i].model;
			var object = callObj[i].objects[j];
			kony.apps.coe.ess.MVVM.OnlineServiceCall(callObj[i].model, callObj[i].objects[j], null, dataSuccess, dataFailure);
		}
	}
}