//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Fri Nov 03 18:11:56 UTC 2017Communication_Type*******************
// **********************************Start Communication_Type's helper methods************************
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
if(typeof(com.ess)=== "undefined"){ com.ess = {}; }
if(typeof(com.ess.EMPLOYEE)=== "undefined"){ com.ess.EMPLOYEE = {}; }

/************************************************************************************
* Creates new Communication_Type
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type = function(){
	this.Employee_Id = null;
	this.Id = null;
	this.lastmodifiedts = null;
	this.softdeleteflag = null;
	this.Type = null;
	this.markForUpload = true;
};

com.ess.EMPLOYEE.Communication_Type.prototype = {
	get Employee_Id(){
		return this._Employee_Id;
	},
	set Employee_Id(val){
		this._Employee_Id = val;
	},
	get Id(){
		return this._Id;
	},
	set Id(val){
		this._Id = val;
	},
	get lastmodifiedts(){
		return this._lastmodifiedts;
	},
	set lastmodifiedts(val){
		this._lastmodifiedts = val;
	},
	get softdeleteflag(){
		return this._softdeleteflag;
	},
	set softdeleteflag(val){
		this._softdeleteflag = val;
	},
	get Type(){
		return this._Type;
	},
	set Type(val){
		this._Type = val;
	},
};

/************************************************************************************
* Retrieves all instances of Communication_Type SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "Employee_Id";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "Id";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.ess.EMPLOYEE.Communication_Type.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	orderByMap = kony.sync.formOrderByClause("Communication_Type",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getAll->successcallback");
		successcallback(com.ess.EMPLOYEE.Communication_Type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of Communication_Type present in local database.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getAllCount function");
	com.ess.EMPLOYEE.Communication_Type.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of Communication_Type using where clause in the local Database
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getCount->successcallback");
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
* Creates a new instance of Communication_Type in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.ess.EMPLOYEE.Communication_Type.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Communication_Type.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"Communication_Type",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.Communication_Type.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "Employee_Id=" + valuestable.Employee_Id;
		pks["Employee_Id"] = {key:"Employee_Id",value:valuestable.Employee_Id};
		errMsg = errMsg + ", Id=" + valuestable.Id;
		pks["Id"] = {key:"Id",value:valuestable.Id};
		com.ess.EMPLOYEE.Communication_Type.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of Communication_Type in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Employee_Id = "Employee_Id_0";
*		valuesArray[0].Id = "Id_0";
*		valuesArray[0].Type = "Type_0";
*		valuesArray[1] = {};
*		valuesArray[1].Employee_Id = "Employee_Id_1";
*		valuesArray[1].Id = "Id_1";
*		valuesArray[1].Type = "Type_1";
*		valuesArray[2] = {};
*		valuesArray[2].Employee_Id = "Employee_Id_2";
*		valuesArray[2].Id = "Id_2";
*		valuesArray[2].Type = "Type_2";
*		com.ess.EMPLOYEE.Communication_Type.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"Communication_Type",errorcallback,true)===false){
				return;
			}

			newValuesArray[i] = valuestable;
		}
		valuesArray = newValuesArray;
		var isDuplicateKey = false;
		//checking for duplicate records
		var connection = kony.sync.getConnectionOnly(dbname, dbname);
		kony.sync.startTransaction(connection, checkDuplicatePkCallback, transactionSuccessCallback, transactionErrorCallback);
		var isError = false;
		function checkDuplicatePkCallback(tx){
			arrayLength = valuesArray.length;
			for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var valuestable = valuesArray[i];
				var pks = [];
				errMsg = "Employee_Id=" + valuestable.Employee_Id;
				pks["Employee_Id"] = {key:"Employee_Id",value:valuestable.Employee_Id};
				errMsg = errMsg + ", Id=" + valuestable.Id;
				pks["Id"] = {key:"Id",value:valuestable.Id};
				var wcs = [];
				if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"searching")===false){
					isError = true;
					return;
				}
				var query = kony.sync.qb_createQuery();
							kony.sync.qb_select(query, null);
							kony.sync.qb_from(query, tbname);
							kony.sync.qb_where(query, wcs);
				var query_compile = kony.sync.qb_compile(query);
				var sql = query_compile[0];
				var params = query_compile[1];
				var resultset = kony.sync.executeSql(tx, sql, params);
				if(resultset===false){
					isError = true;
					return;
				}
				if(resultset.rows.length!=0){
					isError = true;
					errMsg = "[" + errMsg + "]";
					isDuplicateKey = true;
					return;
				}
			}
			if(!isError){
				checkIntegrity(tx);
			}
		}
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.createAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massInsert(dbname, tbname, valuesArray, successcallback, errorcallback, markForUpload);
		}
		else{
			if(isReferentialIntegrityFailure){
				kony.sync.verifyAndCallClosure(errorcallback, errObject);
			}
			if(isDuplicateKey){
				kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
			}
		}
	}
	
	//foreign key constraints validations
	function checkIntegrity(tx){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.Communication_Type.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates Communication_Type using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.ess.EMPLOYEE.Communication_Type.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Communication_Type.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"Communication_Type",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.ess.EMPLOYEE.Communication_Type.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates Communication_Type(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"Communication_Type",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.Communication_Type.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.ess.EMPLOYEE.Communication_Type.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.Communication_Type.getPKTable());
	}
};

/************************************************************************************
* Updates Communication_Type(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.Type = "Type_updated0";
*		inputArray[0].whereClause = "where Employee_Id = '0'";
*		inputArray[0].whereClause = "where Id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.Type = "Type_updated1";
*		inputArray[1].whereClause = "where Employee_Id = '1'";
*		inputArray[1].whereClause = "where Id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.Type = "Type_updated2";
*		inputArray[2].whereClause = "where Employee_Id = '2'";
*		inputArray[2].whereClause = "where Id = '2'";
*		com.ess.EMPLOYEE.Communication_Type.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100004737b2bb0f56";
	var tbname = "Communication_Type";
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
			if(kony.sync.attributeValidation(valuestable,"Communication_Type",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.ess.EMPLOYEE.Communication_Type.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.ess.EMPLOYEE.Communication_Type.getPKTable());
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.ess.EMPLOYEE.Communication_Type.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes Communication_Type using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Communication_Type.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Communication_Type.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function Communication_TypeTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.deleteByPK->Communication_Type_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
		}else{
			pkNotFound = true;
		}
		var deletedRows = kony.sync.remove(tx, tbname, wcs, false, markForUpload, null);
			if(deletedRows === false){
				isError = true;
			}
	}
	
	function Communication_TypeErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Communication_Type.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function Communication_TypeSuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Communication_Type.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, Communication_TypeTransactionCallback, Communication_TypeSuccessCallback, Communication_TypeErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes Communication_Type(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.ess.EMPLOYEE.Communication_Type.remove("where Employee_Id like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Communication_Type_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Communication_Type_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.remove->Communication_Type_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Communication_Type_removeTransactioncallback, Communication_Type_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes Communication_Type using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function Communication_TypeTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK -> Communication_TypeTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function Communication_TypeErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK -> Communication_TypeErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function Communication_TypeSuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK -> Communication_TypeSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Communication_Type.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, Communication_TypeTransactionCallback, Communication_TypeSuccessCallback, Communication_TypeErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes Communication_Type(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Communication_Type_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Communication_Type_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.remove->Communication_Type_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Communication_Type_removeTransactioncallback, Communication_Type_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves Communication_Type using primary key from the local Database. 
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Communication_Type.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Communication_Type.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getAllDetailsByPK-> success callback function");
		successcallback(com.ess.EMPLOYEE.Communication_Type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves Communication_Type(s) using where clause from the local Database. 
* e.g. com.ess.EMPLOYEE.Communication_Type.find("where Employee_Id like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Communication_Type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of Communication_Type with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Communication_Type.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.ess.EMPLOYEE.Communication_Type.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of Communication_Type matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Communication_Type.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of Communication_Type pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Communication_Type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Communication_Type pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Communication_Type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Communication_Type deferred for upload.
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Communication_Type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to Communication_Type in local database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to Communication_Type's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Communication_Type.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether Communication_Type's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Communication_Type.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Communication_Type.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether Communication_Type's record  
* with given primary key is pending for upload
*************************************************************************************/
com.ess.EMPLOYEE.Communication_Type.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Communication_Type.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Communication_Type.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Communication_Type.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Communication_Type.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.Communication_Type.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.isRecordPendingForUpload->successcallback function");
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
com.ess.EMPLOYEE.Communication_Type.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.removeCascade function");
	var tbname = com.ess.EMPLOYEE.Communication_Type.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
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


com.ess.EMPLOYEE.Communication_Type.convertTableToObject = function(res){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.ess.EMPLOYEE.Communication_Type();
			obj.Employee_Id = res[i].Employee_Id;
			obj.Id = res[i].Id;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.softdeleteflag = res[i].softdeleteflag;
			obj.Type = res[i].Type;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.ess.EMPLOYEE.Communication_Type.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.filterAttributes function");
	var attributeTable = {};
	attributeTable.Employee_Id = "Employee_Id";
	attributeTable.Id = "Id";
	attributeTable.Type = "Type";

	var PKTable = {};
	PKTable.Employee_Id = {}
	PKTable.Employee_Id.name = "Employee_Id";
	PKTable.Employee_Id.isAutoGen = false;
	PKTable.Id = {}
	PKTable.Id.name = "Id";
	PKTable.Id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject Communication_Type. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject Communication_Type. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject Communication_Type. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.ess.EMPLOYEE.Communication_Type.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.ess.EMPLOYEE.Communication_Type.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.ess.EMPLOYEE.Communication_Type.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.prototype.getValuesTable function");
	var valuesTable = {};
	if(isInsert===true){
		valuesTable.Employee_Id = this.Employee_Id;
	}
	if(isInsert===true){
		valuesTable.Id = this.Id;
	}
	valuesTable.Type = this.Type;
	return valuesTable;
};

com.ess.EMPLOYEE.Communication_Type.prototype.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Employee_Id = {key:"Employee_Id",value:this.Employee_Id};
	pkTable.Id = {key:"Id",value:this.Id};
	return pkTable;
};

com.ess.EMPLOYEE.Communication_Type.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getPKTable function");
	var pkTable = [];
	pkTable.push("Employee_Id");
	pkTable.push("Id");
	return pkTable;
};

com.ess.EMPLOYEE.Communication_Type.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.Employee_Id)){
		if(!kony.sync.isNull(pks.Employee_Id.value)){
			wc.key = "Employee_Id";
			wc.value = pks.Employee_Id.value;
		}
		else{
			wc.key = "Employee_Id";
			wc.value = pks.Employee_Id;
		}
	}else{
		sync.log.error("Primary Key Employee_Id not specified in " + opName + " an item in Communication_Type");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Employee_Id",opName,"Communication_Type")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.Id)){
		if(!kony.sync.isNull(pks.Id.value)){
			wc.key = "Id";
			wc.value = pks.Id.value;
		}
		else{
			wc.key = "Id";
			wc.value = pks.Id;
		}
	}else{
		sync.log.error("Primary Key Id not specified in " + opName + " an item in Communication_Type");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Communication_Type")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.ess.EMPLOYEE.Communication_Type.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.validateNull function");
	return true;
};

com.ess.EMPLOYEE.Communication_Type.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Employee_Id) || kony.sync.isEmptyString(valuestable.Employee_Id)){
		sync.log.error("Mandatory attribute Employee_Id is missing for the SyncObject Communication_Type.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Communication_Type", "Employee_Id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
		sync.log.error("Mandatory attribute Id is missing for the SyncObject Communication_Type.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Communication_Type", "Id")));
		return false;
	}
	return true;
};

com.ess.EMPLOYEE.Communication_Type.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.ess.EMPLOYEE.Communication_Type.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.ess.EMPLOYEE.Communication_Type.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.ess.EMPLOYEE.Communication_Type.getTableName = function(){
	return "Communication_Type";
};




// **********************************End Communication_Type's helper methods************************