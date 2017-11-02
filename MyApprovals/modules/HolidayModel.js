//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Thu Nov 02 12:21:40 UTC 2017Holiday*******************
// **********************************Start Holiday's helper methods************************
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
* Creates new Holiday
*************************************************************************************/
com.ess.EMPLOYEE.Holiday = function(){
	this.Holiday_Date = null;
	this.Id = null;
	this.lastmodifiedts = null;
	this.Name = null;
	this.softdeleteflag = null;
	this.Type = null;
	this.markForUpload = true;
};

com.ess.EMPLOYEE.Holiday.prototype = {
	get Holiday_Date(){
		return this._Holiday_Date;
	},
	set Holiday_Date(val){
		this._Holiday_Date = val;
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
	get Name(){
		return this._Name;
	},
	set Name(val){
		this._Name = val;
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
* Retrieves all instances of Holiday SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "Holiday_Date";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "Id";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.ess.EMPLOYEE.Holiday.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	orderByMap = kony.sync.formOrderByClause("Holiday",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getAll->successcallback");
		successcallback(com.ess.EMPLOYEE.Holiday.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of Holiday present in local database.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getAllCount function");
	com.ess.EMPLOYEE.Holiday.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of Holiday using where clause in the local Database
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getCount->successcallback");
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
* Creates a new instance of Holiday in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.ess.EMPLOYEE.Holiday.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Holiday.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"Holiday",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.Holiday.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "Holiday_Date=" + valuestable.Holiday_Date;
		pks["Holiday_Date"] = {key:"Holiday_Date",value:valuestable.Holiday_Date};
		com.ess.EMPLOYEE.Holiday.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of Holiday in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Holiday_Date = "Holiday_Date_0";
*		valuesArray[0].Id = "Id_0";
*		valuesArray[0].Name = "Name_0";
*		valuesArray[0].Type = "Type_0";
*		valuesArray[1] = {};
*		valuesArray[1].Holiday_Date = "Holiday_Date_1";
*		valuesArray[1].Id = "Id_1";
*		valuesArray[1].Name = "Name_1";
*		valuesArray[1].Type = "Type_1";
*		valuesArray[2] = {};
*		valuesArray[2].Holiday_Date = "Holiday_Date_2";
*		valuesArray[2].Id = "Id_2";
*		valuesArray[2].Name = "Name_2";
*		valuesArray[2].Type = "Type_2";
*		com.ess.EMPLOYEE.Holiday.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"Holiday",errorcallback,true)===false){
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
				errMsg = "Holiday_Date=" + valuestable.Holiday_Date;
				pks["Holiday_Date"] = {key:"Holiday_Date",value:valuestable.Holiday_Date};
				var wcs = [];
				if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.Holiday.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates Holiday using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.ess.EMPLOYEE.Holiday.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Holiday.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"Holiday",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.ess.EMPLOYEE.Holiday.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates Holiday(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"Holiday",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.Holiday.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.ess.EMPLOYEE.Holiday.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.Holiday.getPKTable());
	}
};

/************************************************************************************
* Updates Holiday(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.Id = "Id_updated0";
*		inputArray[0].changeSet.Name = "Name_updated0";
*		inputArray[0].changeSet.Type = "Type_updated0";
*		inputArray[0].whereClause = "where Holiday_Date = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.Id = "Id_updated1";
*		inputArray[1].changeSet.Name = "Name_updated1";
*		inputArray[1].changeSet.Type = "Type_updated1";
*		inputArray[1].whereClause = "where Holiday_Date = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.Id = "Id_updated2";
*		inputArray[2].changeSet.Name = "Name_updated2";
*		inputArray[2].changeSet.Type = "Type_updated2";
*		inputArray[2].whereClause = "where Holiday_Date = '2'";
*		com.ess.EMPLOYEE.Holiday.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100004737b2bb0f56";
	var tbname = "Holiday";
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
			if(kony.sync.attributeValidation(valuestable,"Holiday",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.ess.EMPLOYEE.Holiday.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.ess.EMPLOYEE.Holiday.getPKTable());
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.ess.EMPLOYEE.Holiday.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes Holiday using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Holiday.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Holiday.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function HolidayTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.deleteByPK->Holiday_PKPresent successcallback");
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
	
	function HolidayErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Holiday.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function HolidaySuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Holiday.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, HolidayTransactionCallback, HolidaySuccessCallback, HolidayErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes Holiday(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.ess.EMPLOYEE.Holiday.remove("where Holiday_Date like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Holiday_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Holiday_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.remove->Holiday_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Holiday_removeTransactioncallback, Holiday_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes Holiday using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function HolidayTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK -> HolidayTransactionCallback");
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
	
	function HolidayErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK -> HolidayErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function HolidaySuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK -> HolidaySuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Holiday.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, HolidayTransactionCallback, HolidaySuccessCallback, HolidayErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes Holiday(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Holiday_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Holiday_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.remove->Holiday_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Holiday_removeTransactioncallback, Holiday_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves Holiday using primary key from the local Database. 
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Holiday.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Holiday.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getAllDetailsByPK-> success callback function");
		successcallback(com.ess.EMPLOYEE.Holiday.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves Holiday(s) using where clause from the local Database. 
* e.g. com.ess.EMPLOYEE.Holiday.find("where Holiday_Date like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Holiday.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of Holiday with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Holiday.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.ess.EMPLOYEE.Holiday.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of Holiday matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Holiday.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of Holiday pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Holiday.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Holiday pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Holiday.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Holiday deferred for upload.
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Holiday.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to Holiday in local database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to Holiday's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Holiday.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether Holiday's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Holiday.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Holiday.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether Holiday's record  
* with given primary key is pending for upload
*************************************************************************************/
com.ess.EMPLOYEE.Holiday.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Holiday.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Holiday.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Holiday.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Holiday.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.Holiday.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.isRecordPendingForUpload->successcallback function");
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
com.ess.EMPLOYEE.Holiday.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.removeCascade function");
	var tbname = com.ess.EMPLOYEE.Holiday.getTableName();
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


com.ess.EMPLOYEE.Holiday.convertTableToObject = function(res){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.ess.EMPLOYEE.Holiday();
			obj.Holiday_Date = res[i].Holiday_Date;
			obj.Id = res[i].Id;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.Name = res[i].Name;
			obj.softdeleteflag = res[i].softdeleteflag;
			obj.Type = res[i].Type;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.ess.EMPLOYEE.Holiday.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.filterAttributes function");
	var attributeTable = {};
	attributeTable.Holiday_Date = "Holiday_Date";
	attributeTable.Id = "Id";
	attributeTable.Name = "Name";
	attributeTable.Type = "Type";

	var PKTable = {};
	PKTable.Holiday_Date = {}
	PKTable.Holiday_Date.name = "Holiday_Date";
	PKTable.Holiday_Date.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject Holiday. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject Holiday. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject Holiday. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.ess.EMPLOYEE.Holiday.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.ess.EMPLOYEE.Holiday.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.ess.EMPLOYEE.Holiday.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.prototype.getValuesTable function");
	var valuesTable = {};
	if(isInsert===true){
		valuesTable.Holiday_Date = this.Holiday_Date;
	}
	valuesTable.Id = this.Id;
	valuesTable.Name = this.Name;
	valuesTable.Type = this.Type;
	return valuesTable;
};

com.ess.EMPLOYEE.Holiday.prototype.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Holiday_Date = {key:"Holiday_Date",value:this.Holiday_Date};
	return pkTable;
};

com.ess.EMPLOYEE.Holiday.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getPKTable function");
	var pkTable = [];
	pkTable.push("Holiday_Date");
	return pkTable;
};

com.ess.EMPLOYEE.Holiday.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key Holiday_Date not specified in  " + opName + "  an item in Holiday");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Holiday_Date",opName,"Holiday")));
		return false;	
	}
	else if(kony.sync.isValidJSTable(pks)){
		if(!kony.sync.isNull(pks.Holiday_Date)){
			if(!kony.sync.isNull(pks.Holiday_Date.value)){
				wc.key = "Holiday_Date";
				wc.value = pks.Holiday_Date.value;
			}
			else{
				wc.key = "Holiday_Date";
				wc.value = pks.Holiday_Date;
			}
		}else{
			sync.log.error("Primary Key Holiday_Date not specified in  " + opName + "  an item in Holiday");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Holiday_Date",opName,"Holiday")));
			return false;
		}
	}
	else{
		wc.key = "Holiday_Date";
		wc.value = pks;
	}	
	kony.table.insert(wcs,wc);
	return true;
};

com.ess.EMPLOYEE.Holiday.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.validateNull function");
	if(valuestable.Id!==undefined){
		if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
			sync.log.error("Mandatory attribute Id is missing for the SyncObject Holiday.");
			errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Holiday", "Id")));
			return false;
		}
	}
	return true;
};

com.ess.EMPLOYEE.Holiday.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Holiday_Date) || kony.sync.isEmptyString(valuestable.Holiday_Date)){
		sync.log.error("Mandatory attribute Holiday_Date is missing for the SyncObject Holiday.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Holiday", "Holiday_Date")));
		return false;
	}
	if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
		sync.log.error("Mandatory attribute Id is missing for the SyncObject Holiday.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Holiday", "Id")));
		return false;
	}
	return true;
};

com.ess.EMPLOYEE.Holiday.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.ess.EMPLOYEE.Holiday.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.ess.EMPLOYEE.Holiday.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.ess.EMPLOYEE.Holiday.getTableName = function(){
	return "Holiday";
};




// **********************************End Holiday's helper methods************************