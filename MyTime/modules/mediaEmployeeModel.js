//****************Sync Version:Sync-Dev-8.0.0_v201711101237_r14*******************
// ****************Generated On Mon Dec 11 13:01:26 UTC 2017mediaEmployee*******************
// **********************************Start mediaEmployee's helper methods************************
if (typeof(kony) === "undefined") {
	kony = {};
}

if (typeof(kony.sync) === "undefined") {
	kony.sync = {};
}

if (typeof(kony.sync.log) === "undefined") {
	kony.sync.log = {};
}

if (typeof(sync) === "undefined") {
	sync = {};
}

if (typeof(sync.log) === "undefined") {
	sync.log = {};
}



if(typeof(com)=== "undefined"){ com = {}; }
if(typeof(com.kony)=== "undefined"){ com.kony = {}; }
if(typeof(com.kony.EMPLOYEE)=== "undefined"){ com.kony.EMPLOYEE = {}; }

/************************************************************************************
* Creates new mediaEmployee
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee = function(){
	this.classField = null;
	this.classValue = null;
	this.description = null;
	this.extension = null;
	this.group = null;
	this.name = null;
	this.ondemand = null;
	this.type = null;
	this.url = null;
	this.markForUpload = true;
};

com.kony.EMPLOYEE.mediaEmployee.prototype = {
	get classField(){
		return this._classField;
	},
	set classField(val){
		this._classField = val;
	},
	get classValue(){
		return this._classValue;
	},
	set classValue(val){
		this._classValue = val;
	},
	get description(){
		return this._description;
	},
	set description(val){
		this._description = val;
	},
	get extension(){
		return this._extension;
	},
	set extension(val){
		this._extension = val;
	},
	get group(){
		return this._group;
	},
	set group(val){
		this._group = val;
	},
	get name(){
		return this._name;
	},
	set name(val){
		this._name = val;
	},
	get ondemand(){
		return this._ondemand;
	},
	set ondemand(val){
		this._ondemand = val;
	},
	get type(){
		return this._type;
	},
	set type(val){
		this._type = val;
	},
	get url(){
		return this._url;
	},
	set url(val){
		this._url = val;
	},
};

/************************************************************************************
* Retrieves all instances of mediaEmployee SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "classField";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "classValue";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.EMPLOYEE.mediaEmployee.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	orderByMap = kony.sync.formOrderByClause("mediaEmployee",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getAll->successcallback");
		successcallback(com.kony.EMPLOYEE.mediaEmployee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of mediaEmployee present in local database.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getAllCount function");
	com.kony.EMPLOYEE.mediaEmployee.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of mediaEmployee using where clause in the local Database
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getCount->successcallback");
		if(null!==res){
			var count = null;
			count = res["count(*)"];
			kony.sync.verifyAndCallClosure(successcallback, {count:count});
		}
		else{
			sync.log.error("Some error occured while getting the count");
		}
	}
};

/************************************************************************************
* Creates a new instance of mediaEmployee in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.EMPLOYEE.mediaEmployee.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.EMPLOYEE.mediaEmployee.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"mediaEmployee",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.EMPLOYEE.mediaEmployee.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of mediaEmployee in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].classField = "classField_0";
*		valuesArray[0].classValue = "classValue_0";
*		valuesArray[0].description = "description_0";
*		valuesArray[0].extension = "extension_0";
*		valuesArray[0].group = "group_0";
*		valuesArray[0].ondemand = "ondemand_0";
*		valuesArray[0].type = "type_0";
*		valuesArray[0].url = 0;
*		valuesArray[1] = {};
*		valuesArray[1].classField = "classField_1";
*		valuesArray[1].classValue = "classValue_1";
*		valuesArray[1].description = "description_1";
*		valuesArray[1].extension = "extension_1";
*		valuesArray[1].group = "group_1";
*		valuesArray[1].ondemand = "ondemand_1";
*		valuesArray[1].type = "type_1";
*		valuesArray[1].url = 1;
*		valuesArray[2] = {};
*		valuesArray[2].classField = "classField_2";
*		valuesArray[2].classValue = "classValue_2";
*		valuesArray[2].description = "description_2";
*		valuesArray[2].extension = "extension_2";
*		valuesArray[2].group = "group_2";
*		valuesArray[2].ondemand = "ondemand_2";
*		valuesArray[2].type = "type_2";
*		valuesArray[2].url = 2;
*		com.kony.EMPLOYEE.mediaEmployee.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var isProperData = true;
	var arrayLen = 0;
	var errorInfo = [];
	var arrayLength = valuesArray.length;
	var errObject = null;
	var isReferentialIntegrityFailure = false;
	var errMsg = null;
	if(kony.sync.enableORMValidations){
		var newValuesArray = [];

		//column level validations
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var valuestable = valuesArray[i];
			if(kony.sync.attributeValidation(valuestable,"mediaEmployee",errorcallback,true)===false){
				return;
			}

			newValuesArray[i] = valuestable;
		}
		valuesArray = newValuesArray;
		var connection = kony.sync.getConnectionOnly(dbname, dbname);
		kony.sync.startTransaction(connection, checkIntegrity, transactionSuccessCallback, transactionErrorCallback);
		var isError = false;
	}
	else{
		//copying by value
		var newValuesArray = [];
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			newValuesArray[i] = kony.sync.CreateCopy(valuesArray[i]);
		}
		valuesArray = newValuesArray;
		kony.sync.massInsert(dbname, tbname, valuesArray, successcallback, errorcallback, markForUpload);
	}

	function transactionErrorCallback(){
		if(isError==true){
			//Statement error has occurred
				kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
		}
		else{
			//Transaction error has occurred
				kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
	}

	function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.createAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massInsert(dbname, tbname, valuesArray, successcallback, errorcallback, markForUpload);
		}
		else{
			if(isReferentialIntegrityFailure){
				kony.sync.verifyAndCallClosure(errorcallback, errObject);
			}
		}
	}
	
	//foreign key constraints validations
	function checkIntegrity(tx){
		sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.EMPLOYEE.mediaEmployee.getRelationshipMap(relationshipMap,valuesArray[i]);
			errObject = kony.sync.checkIntegrityinTransaction(tx, relationshipMap, null);
			if(errObject===false){
				isError = true;
				return; 
			}
			if(errObject!==true){
				isError = true;
				isReferentialIntegrityFailure = true;
				return;
			}
		}
	}
};
/************************************************************************************
* Updates mediaEmployee using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.EMPLOYEE.mediaEmployee.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.EMPLOYEE.mediaEmployee.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"mediaEmployee",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.EMPLOYEE.mediaEmployee.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates mediaEmployee(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"mediaEmployee",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.EMPLOYEE.mediaEmployee.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.EMPLOYEE.mediaEmployee.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.EMPLOYEE.mediaEmployee.getPKTable());
	}
};

/************************************************************************************
* Updates mediaEmployee(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.classField = "classField_updated0";
*		inputArray[0].changeSet.classValue = "classValue_updated0";
*		inputArray[0].changeSet.description = "description_updated0";
*		inputArray[0].changeSet.extension = "extension_updated0";
*		inputArray[0].whereClause = "where name = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.classField = "classField_updated1";
*		inputArray[1].changeSet.classValue = "classValue_updated1";
*		inputArray[1].changeSet.description = "description_updated1";
*		inputArray[1].changeSet.extension = "extension_updated1";
*		inputArray[1].whereClause = "where name = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.classField = "classField_updated2";
*		inputArray[2].changeSet.classValue = "classValue_updated2";
*		inputArray[2].changeSet.description = "description_updated2";
*		inputArray[2].changeSet.extension = "extension_updated2";
*		inputArray[2].whereClause = "where name = '2'";
*		com.kony.EMPLOYEE.mediaEmployee.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "1000000020ac26b7c";
	var tbname = "mediaEmployee";
	var isError = false;
	var errObject = null;
	if(markForUpload == false || markForUpload == "false"){
		markForUpload="false"
	}
	else{
		markForUpload="true"
	}
	if((kony.sync.enableORMValidations)){

		var newInputArray = [];
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var v = inputArray[i];
			var valuestable = v.changeSet;
			var isEmpty = true;
			for(var key in valuestable){
				isEmpty = false;
				break;
			}
			if(isEmpty){
				errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeNullValue,kony.sync.getErrorMessage(kony.sync.errorCodeNullValue)));
				return;
			}
			var wcs = v.whereClause;
			var twcs = wcs;
			if(kony.sync.attributeValidation(valuestable,"mediaEmployee",errorcallback,false)===false){
				return;
			}

			newInputArray[i] = [];
			newInputArray[i].changeSet = valuestable;
			newInputArray[i].whereClause = wcs;
		}
		inputArray = newInputArray;
		var connection = kony.sync.getConnectionOnly(dbname, dbname);
		kony.sync.startTransaction(connection, checkIntegrity, transactionSuccessCallback, transactionErrorCallback);

	}
	else{
		//copying by value
		var newInputArray = [];
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
		    var v = inputArray[i];
		    newInputArray[i] = kony.sync.CreateCopy(v);
		}
		inputArray = newInputArray;
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.EMPLOYEE.mediaEmployee.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.EMPLOYEE.mediaEmployee.getPKTable());
		}
	}

	function transactionErrorCallback(){
		if(errObject===false){
			//Sql statement error has occcurred
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
			
		}
		else if(errObject!==null){
			// Referential integrity error has occurred
			kony.sync.verifyAndCallClosure(errorcallback, errObject);
		}
		else{
			//Transaction error has occurred
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeTransaction, kony.sync.getErrorMessage(kony.sync.errorCodeTransaction), null));
		}
	}
	//foreign key constraints validations
	function checkIntegrity(tx){
		sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.EMPLOYEE.mediaEmployee.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
			sync.log.debug("Relationship Map for Integrity check created:", relationshipMap);
			errObject = kony.sync.checkIntegrityinTransaction(tx, relationshipMap, null);
			if(errObject===false){
				isError = true;
				return; 
			}
			if(errObject!==true){
				isError = true;
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}
	}


}
/************************************************************************************
* Deletes mediaEmployee using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.EMPLOYEE.mediaEmployee.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.EMPLOYEE.mediaEmployee.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function mediaEmployeeTransactionCallback(tx){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.deleteByPK->mediaEmployee_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Media_Id");
 		targetAttributes.push("name");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.EMPLOYEE.Employee.removeCascade,"Employee",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
		var deletedRows = kony.sync.remove(tx, tbname, wcs, false, markForUpload, null);
			if(deletedRows === false){
				isError = true;
			}
	}
	
	function mediaEmployeeErrorCallback(){
		sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function mediaEmployeeSuccessCallback(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, mediaEmployeeTransactionCallback, mediaEmployeeSuccessCallback, mediaEmployeeErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes mediaEmployee(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.EMPLOYEE.mediaEmployee.remove("where classField like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;
	var record = "";

	function mediaEmployee_removeTransactioncallback(tx){
			wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Media_Id");
 		targetAttributes.push("name");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
			if (record === false) {
				isError = true;
				return;
			}
	if(record !== null){
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.EMPLOYEE.Employee.removeCascade,"Employee",false, errorcallback, markForUpload, record, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
	}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function mediaEmployee_removeSuccess(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.remove->mediaEmployee_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, mediaEmployee_removeTransactioncallback, mediaEmployee_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes mediaEmployee using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function mediaEmployeeTransactionCallback(tx){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK -> mediaEmployeeTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Media_Id");
 		targetAttributes.push("name");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.EMPLOYEE.Employee.removeCascade,"Employee",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function mediaEmployeeErrorCallback(){
		sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK -> mediaEmployeeErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function mediaEmployeeSuccessCallback(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK -> mediaEmployeeSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, mediaEmployeeTransactionCallback, mediaEmployeeSuccessCallback, mediaEmployeeErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes mediaEmployee(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function mediaEmployee_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Media_Id");
 		targetAttributes.push("name");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.EMPLOYEE.Employee.removeCascade,"Employee",false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function mediaEmployee_removeSuccess(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.remove->mediaEmployee_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, mediaEmployee_removeTransactioncallback, mediaEmployee_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves mediaEmployee using primary key from the local Database. 
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.EMPLOYEE.mediaEmployee.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.EMPLOYEE.mediaEmployee.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var wcs = [];
	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks,wcs,errorcallback,"searching")===false){
		return;
	}
	twcs = kony.sync.CreateCopy(wcs);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_where(query, wcs);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.EMPLOYEE.mediaEmployee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};




/************************************************************************************
* Retrieves mediaEmployee.getBinary using pk values. 
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getBinary = function(colName, pks, config, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinary");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	sync.log.trace("getting binary for column :"+colName+" of table:"+tbname);
	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinary success callback function" 
				+"for columns :"+colName+" of tablename :"+tbname+" with response"+ res);
		if(!kony.sync.isNullOrUndefined(res) && !kony.sync.isNullOrUndefined(res.base64)) {
			sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinary user success callback function"+ res.base64);
			successcallback(res.base64);
		}
		else {
			sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.getBinary error callback function"+ res);
			errorcallback(res);
		}
	}	
	kony.sync.single_binary_select_base64_execute(dbname, tbname, colName, pks, config, mySuccCallback, errorcallback);
};
/************************************************************************************
* Retrieves mediaEmployee.FilePath using pk values. 
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getBinaryFilePath = function(colName, pks, config, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinaryFilePath");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	sync.log.trace("getting filepath for column :"+colName+" of table:"+tbname);
	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinaryFilePath success callback function"
			+"for columns :"+colName+" of tablename :"+tbname+" with response"+ res);
		if(!kony.sync.isNullOrUndefined(res) && !kony.sync.isNullOrUndefined(res.filePath)) {
			sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinaryFilePath user success callback function"+ res.filePath);
			successcallback(res.filePath);
		}
		else {
			sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.getBinaryFilePath error callback function"+ res);
			errorcallback(res);
		}
	}	
	kony.sync.single_binary_select_file_execute(dbname, tbname, colName, pks, config, mySuccCallback, errorcallback);
};
/************************************************************************************
* Retrieves mediaEmployee status for binary using where clause. 
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getBinaryStatus = function(colName, pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinaryStatus");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getBinaryStatus success callback function"+ res);
		successcallback(res);
	}
	sync.getStatusForBinary(tbname, colName, pks, mySuccCallback, errorcallback);
};


/************************************************************************************
* Retrieves mediaEmployee(s) using where clause from the local Database. 
* e.g. com.kony.EMPLOYEE.mediaEmployee.find("where classField like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.EMPLOYEE.mediaEmployee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of mediaEmployee with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.EMPLOYEE.mediaEmployee.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.EMPLOYEE.mediaEmployee.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
		return;
	}

	function markRecordForUpload(tx, record){
		var versionMapMain = [];
		versionMapMain[kony.sync.mainTableChangeTypeColumn] = kony.sync.getChangeTypeForUploadTrue(record[kony.sync.historyTableChangeTypeColumn]);
		var scopename = kony.sync.scopes.syncTableScopeDic[tbname];
		var versionNo = kony.sync.getseqnumber(tx, scopename);
		if(versionNo === false){
			return false;
		}
		versionMapMain[kony.sync.historyTableSyncVersionColumn] = versionNo.versionnumber;
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_update(query, tbname);
					kony.sync.qb_set(query,versionMapMain);
					kony.sync.qb_where(query, wcs);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		return kony.sync.executeSql(tx, sql, params);		
	}
	
	function markRecordForUploadHistory(tx, record){
		var versionMap = [];
		versionMap[kony.sync.historyTableChangeTypeColumn] = kony.sync.getChangeTypeForUploadTrue(record[kony.sync.historyTableChangeTypeColumn]);
		var scopename = kony.sync.scopes.syncTableScopeDic[tbname];
		var versionNo = kony.sync.getseqnumber(tx, scopename);
		if(versionNo === false){
			return false;
		}
		var twcs = [];
		twcs = wcs;
		kony.table.insert(twcs,{key : kony.sync.historyTableChangeTypeColumn, value : record[kony.sync.historyTableChangeTypeColumn], optype : "EQ",comptype : "AND"});
		versionMap[kony.sync.historyTableSyncVersionColumn] = versionNo.versionnumber;
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_update(query, tbname + kony.sync.historyTableName);
					kony.sync.qb_set(query,versionMap);
					kony.sync.qb_where(query, twcs);
		kony.table.remove(twcs);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		return kony.sync.executeSql(tx, sql, params);
	}
	
	function single_transaction_callback (tx){
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_select(query, [kony.sync.historyTableChangeTypeColumn]);
					kony.sync.qb_from(query, tbname);
					kony.sync.qb_where(query, wcs);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0];
		var params = query_compile[1];
		var resultSet = kony.sync.executeSql(tx, sql, params);
		if(resultSet === false){
			isError = true;
			return;
		}

		var num_records = resultSet.rows.length;
		if(num_records > 0){
			recordsFound = true;
			var record = kony.db.sqlResultsetRowItem(tx, resultSet, 0);
			var changeType = record[kony.sync.mainTableChangeTypeColumn];
			if(!kony.sync.isNullOrUndefined(changeType) && kony.string.startsWith(""+changeType,"9")){
				recordsMarkedForUpload = 1;
				if(markRecordForUpload(tx, record) === false){
					isError = true;
					return;
				}
			}
		}
					
				
		var query1 =kony.sync.qb_createQuery();
					kony.sync.qb_select(query1, [kony.sync.historyTableChangeTypeColumn]);
					kony.sync.qb_from(query1, tbname + kony.sync.historyTableName);
					kony.sync.qb_where(query1, wcs);
		var query1_compile = kony.sync.qb_compile(query1);
		var sql1 = query1_compile[0];
		var params1 = query1_compile[1];
		var resultSet1 = kony.sync.executeSql (tx, sql1, params1);
		if(resultSet1!==false){
			var num_records = resultSet1.rows.length;
			for(var i = 0; i <= num_records - 1; i++ ){
				var record = kony.db.sqlResultsetRowItem(tx, resultSet1, i);
				if(markRecordForUploadHistory(tx, record) === false){
					isError = true;
					return;
				}
				recordsFound = true;
			}
		}
		else{
			isError = true;
		}
	}
	function single_transaction_success_callback(){
		if(recordsFound === true){
			kony.sync.verifyAndCallClosure(successcallback , {count:recordsMarkedForUpload});
		}
		else{
			kony.sync.pkNotFoundErrCallback(errorcallback, tbname);
		}
	}
	
	function single_transaction_error_callback(res){
		if (!isError) {
			kony.sync.showTransactionError(errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(connection != null){
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
	}
};

/************************************************************************************
* Marks instance(s) of mediaEmployee matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var isError = false;
	var num_records_main = 0;
	wcs = kony.sync.validateWhereClause(wcs);
	if(!kony.sync.isNull(wcs) && !kony.sync.isEmptyString(wcs)) {
		wcs = wcs + " and " + kony.sync.historyTableChangeTypeColumn + " like '9%'";
	}else{	
		wcs = "where " + kony.sync.historyTableChangeTypeColumn + " like '9%'";
	}
	
	function markRecordForUpload(tx, record){
		var versionMapMain = [];
		versionMapMain[kony.sync.mainTableChangeTypeColumn] = kony.sync.getChangeTypeForUploadTrue(record[kony.sync.historyTableChangeTypeColumn]);
		var scopename = kony.sync.scopes.syncTableScopeDic[tbname];
		var versionNo = kony.sync.getseqnumber(tx, scopename);
		if(versionNo === false){
			return false;
		}
		versionMapMain[kony.sync.historyTableSyncVersionColumn] = versionNo.versionnumber;
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_update(query, tbname);
					kony.sync.qb_set(query,versionMapMain);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0] + " " + wcs;
		var params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params) === false){
			return false;
		}
	}
	
	function markRecordForUploadHistory(tx, record){
		var versionMap = [];
		versionMap[kony.sync.historyTableChangeTypeColumn] = kony.sync.getChangeTypeForUploadTrue(record[kony.sync.historyTableChangeTypeColumn]);
		var scopename = kony.sync.scopes.syncTableScopeDic[tbname];
		var versionNo = kony.sync.getseqnumber(tx, scopename);
		if(versionNo === false){
			return false;
		}
		var twcs = "";
		twcs = wcs;
		twcs = twcs + " AND " + kony.sync.historyTableChangeTypeColumn + " = " + record[kony.sync.historyTableChangeTypeColumn];
		versionMap[kony.sync.historyTableSyncVersionColumn] = versionNo.versionnumber;
		
		var query = kony.sync.qb_createQuery();
					kony.sync.qb_update(query, tbname + kony.sync.historyTableName);
					kony.sync.qb_set(query,versionMap);
		var query_compile = kony.sync.qb_compile(query);
		var sql = query_compile[0]  + " " + twcs;
		var params = query_compile[1];
		if(kony.sync.executeSql(tx, sql, params) === false){
			return false;
		}
	}
	
	function single_transaction_callback (tx){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.markForUpload->single_transaction_callback");
		//updating main table
		var sql = "select " + kony.sync.historyTableChangeTypeColumn + " from \"" + tbname + "\" " + wcs ;
		var resultSet = kony.sync.executeSql (tx, sql, null);
		if(resultSet === false){
			isError = true;
			return;
		}
		
		num_records_main = resultSet.rows.length;
		for(var i = 0; i < num_records_main; i++ ){
			var record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			if(markRecordForUpload(tx, record) === false){
				isError = true;
				return;
			}
		}
		
		//updating history table
		var sql = "select " + kony.sync.historyTableChangeTypeColumn + " from " + tbname + kony.sync.historyTableName + " " + wcs;
		var resultSet = kony.sync.executeSql (tx, sql, null);
		if(resultSet === false){
			isError = true;
			return;
		}

		var num_records = resultSet.rows.length;
		for ( var i = 0; i <= num_records - 1; i++ ){
			var record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
			if(markRecordForUploadHistory(tx, record)=== false){
				isError = true;
				return;
			}
		}
	}
	
	function single_transaction_success_callback(){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.markForUpload->single_transaction_error_callback");
		if(!isError) {
			kony.sync.showTransactionError(errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(connection != null){
		kony.sync.startTransaction(connection, single_transaction_callback, single_transaction_success_callback, single_transaction_error_callback);
	}
};

/************************************************************************************
* Retrieves instance(s) of mediaEmployee pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var sql;
	if(typeof(wcs) === "string" && wcs != null){
		wcs = kony.sync.validateWhereClause(wcs);
		sql = "select * from \"" + tbname + "\" "+ wcs + " and " + kony.sync.mainTableChangeTypeColumn + " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" = "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	}else{
		errorcallback = successcallback;
		successcallback = wcs;
		sql = "select * from \"" + tbname + "\" WHERE " + kony.sync.mainTableChangeTypeColumn + " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" = "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.EMPLOYEE.mediaEmployee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of mediaEmployee pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.EMPLOYEE.mediaEmployee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of mediaEmployee deferred for upload.
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var sql;
	if(typeof(wcs) === "string" && wcs != null ){
		wcs = kony.sync.validateWhereClause(wcs);
		sql = "select * from \"" + tbname +  "\" " + wcs + " and " + kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableChangeTypeColumn+" LIKE '9%'";
	}else{
		errorcallback = successcallback;
		successcallback = wcs;
		sql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableChangeTypeColumn+" LIKE '9%'"; 
	}
	
	kony.sync.single_select_execute(dbname, sql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.EMPLOYEE.mediaEmployee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to mediaEmployee in local database to last synced state
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to mediaEmployee's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var wcs = [];
	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.EMPLOYEE.mediaEmployee.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether mediaEmployee's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.EMPLOYEE.mediaEmployee.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.EMPLOYEE.mediaEmployee.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks,wcs,errorcallback,"selecting")===false){
		return;
	}
	var twcs = [];
	twcs = kony.sync.CreateCopy(wcs);
	kony.table.insert(twcs, {
			key : kony.sync.mainTableChangeTypeColumn,
			value : "9%",
			optype : "LIKE",
			comptype : "AND"
		});
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_where(query, twcs);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	kony.sync.single_select_execute(dbname, sql, params, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.isRecordDeferredForUpload->successcallback function");
		if(res.length === 1){
			flag = true;
		}
		else{
			flag = false;
		}
		kony.sync.verifyAndCallClosure(successcallback, {deferred:flag});
	}
};

/************************************************************************************
* isRecordPendingForUpload returns true or false depending on whether mediaEmployee's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.EMPLOYEE.mediaEmployee.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.EMPLOYEE.mediaEmployee.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.EMPLOYEE.mediaEmployee.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.EMPLOYEE.mediaEmployee.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.EMPLOYEE.mediaEmployee.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.EMPLOYEE.mediaEmployee.pkCheck(pks,wcs,errorcallback,"selecting")===false){
		return;
	}
	var twcs = [];
	twcs = kony.sync.CreateCopy(wcs);
	kony.table.insert(twcs, {
			key : kony.sync.mainTableChangeTypeColumn,
			value : "9%",
			optype : "NOT LIKE",
			comptype : "AND"
		});
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_where(query, twcs);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];
	kony.sync.single_select_execute(dbname, sql, params, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.isRecordPendingForUpload->successcallback function");
		if(res.length === 1){
			flag = true;
		}
		else{
			flag = false;
		}
		kony.sync.verifyAndCallClosure(successcallback, {pending:flag});
	}
};




/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.EMPLOYEE.mediaEmployee.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.removeCascade function");
	var tbname = com.kony.EMPLOYEE.mediaEmployee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Media_Id");
 		targetAttributes.push("name");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.EMPLOYEE.Employee.removeCascade,"Employee",false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
	}
	if(isCascade){
		if(removeCascadeChildren()===false){
			return false;
		}
		if(kony.sync.deleteBatch(tx, tbname, wcs, isLocal,markForUpload, null)===false){
			return false;
		}
		return true;
	}else{
		var sql = "select * from \"" + tbname + "\" " + wcs;
		var resultSet = kony.sync.executeSql(tx, sql, null);
		if(resultSet===false){
			return false;
		}	
		var num_records = resultSet.rows.length;
		if(num_records === 0){
			return true;
		}else{
			sync.log.error(kony.sync.getReferetialIntegrityDeleteErrMessg(tbname,tbname,tbname,parentTable));
			errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeReferentialIntegrity,kony.sync.getReferetialIntegrityDeleteErrMessg(tbname,tbname,tbname,parentTable)));
			return false;
		}
	}
};


com.kony.EMPLOYEE.mediaEmployee.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.EMPLOYEE.mediaEmployee();
			obj.classField = res[i].classField;
			obj.classValue = res[i].classValue;
			obj.description = res[i].description;
			obj.extension = res[i].extension;
			obj.group = res[i].group;
			obj.name = res[i].name;
			obj.ondemand = res[i].ondemand;
			obj.type = res[i].type;
			obj.url = res[i].url;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.EMPLOYEE.mediaEmployee.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.filterAttributes function");
	var attributeTable = {};
	attributeTable.classField = "classField";
	attributeTable.classValue = "classValue";
	attributeTable.description = "description";
	attributeTable.extension = "extension";
	attributeTable.group = "group";
	attributeTable.name = "name";
	attributeTable.ondemand = "ondemand";
	attributeTable.type = "type";
	attributeTable.url = "url";

	var PKTable = {};
	PKTable.name = {}
	PKTable.name.name = "name";
	PKTable.name.isAutoGen = true;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject mediaEmployee. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject mediaEmployee. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject mediaEmployee. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
			}else{
				newvaluestable[k] = v;
			}
		}
		else{
			newvaluestable[k] = v;
		}
	}
	return newvaluestable;
};

com.kony.EMPLOYEE.mediaEmployee.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.EMPLOYEE.mediaEmployee.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.EMPLOYEE.mediaEmployee.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.classField = this.classField;
	valuesTable.classValue = this.classValue;
	valuesTable.description = this.description;
	valuesTable.extension = this.extension;
	valuesTable.group = this.group;
	if(isInsert===true){
		valuesTable.name = this.name;
	}
	valuesTable.ondemand = this.ondemand;
	valuesTable.type = this.type;
	valuesTable.url = this.url;
	return valuesTable;
};

com.kony.EMPLOYEE.mediaEmployee.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.prototype.getPKTable function");
	var pkTable = {};
	pkTable.name = {key:"name",value:this.name};
	return pkTable;
};

com.kony.EMPLOYEE.mediaEmployee.getPKTable = function(){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getPKTable function");
	var pkTable = [];
	pkTable.push("name");
	return pkTable;
};

com.kony.EMPLOYEE.mediaEmployee.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key name not specified in  " + opName + "  an item in mediaEmployee");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("name",opName,"mediaEmployee")));
		return false;	
	}
	else if(kony.sync.isValidJSTable(pks)){
		if(!kony.sync.isNull(pks.name)){
			if(!kony.sync.isNull(pks.name.value)){
				wc.key = "name";
				wc.value = pks.name.value;
			}
			else{
				wc.key = "name";
				wc.value = pks.name;
			}
		}else{
			sync.log.error("Primary Key name not specified in  " + opName + "  an item in mediaEmployee");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("name",opName,"mediaEmployee")));
			return false;
		}
	}
	else{
		wc.key = "name";
		wc.value = pks;
	}	
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.EMPLOYEE.mediaEmployee.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.validateNull function");
	if(valuestable.description!==undefined){
		if(kony.sync.isNull(valuestable.description) || kony.sync.isEmptyString(valuestable.description)){
			sync.log.error("Mandatory attribute description is missing for the SyncObject mediaEmployee.");
			errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "mediaEmployee", "description")));
			return false;
		}
	}
	if(valuestable.extension!==undefined){
		if(kony.sync.isNull(valuestable.extension) || kony.sync.isEmptyString(valuestable.extension)){
			sync.log.error("Mandatory attribute extension is missing for the SyncObject mediaEmployee.");
			errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "mediaEmployee", "extension")));
			return false;
		}
	}
	if(valuestable.type!==undefined){
		if(kony.sync.isNull(valuestable.type) || kony.sync.isEmptyString(valuestable.type)){
			sync.log.error("Mandatory attribute type is missing for the SyncObject mediaEmployee.");
			errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "mediaEmployee", "type")));
			return false;
		}
	}
	return true;
};

com.kony.EMPLOYEE.mediaEmployee.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.validateNullInsert function");
	if(kony.sync.isNull(valuestable.description) || kony.sync.isEmptyString(valuestable.description)){
		sync.log.error("Mandatory attribute description is missing for the SyncObject mediaEmployee.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "mediaEmployee", "description")));
		return false;
	}
	if(kony.sync.isNull(valuestable.extension) || kony.sync.isEmptyString(valuestable.extension)){
		sync.log.error("Mandatory attribute extension is missing for the SyncObject mediaEmployee.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "mediaEmployee", "extension")));
		return false;
	}
	if(kony.sync.isNull(valuestable.type) || kony.sync.isEmptyString(valuestable.type)){
		sync.log.error("Mandatory attribute type is missing for the SyncObject mediaEmployee.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "mediaEmployee", "type")));
		return false;
	}
	return true;
};

com.kony.EMPLOYEE.mediaEmployee.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.EMPLOYEE.mediaEmployee.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.EMPLOYEE.mediaEmployee.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.EMPLOYEE.mediaEmployee.getTableName = function(){
	return "mediaEmployee";
};




// **********************************End mediaEmployee's helper methods************************