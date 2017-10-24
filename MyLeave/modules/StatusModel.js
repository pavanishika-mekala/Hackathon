//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Tue Oct 24 13:09:25 UTC 2017Status*******************
// **********************************Start Status's helper methods************************
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
if(typeof(com.kony.Employee)=== "undefined"){ com.kony.Employee = {}; }

/************************************************************************************
* Creates new Status
*************************************************************************************/
com.kony.Employee.Status = function(){
	this.Id = null;
	this.lastmodifiedts = null;
	this.softdeleteflag = null;
	this.Status_Name = null;
	this.markForUpload = true;
};

com.kony.Employee.Status.prototype = {
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
	get Status_Name(){
		return this._Status_Name;
	},
	set Status_Name(val){
		this._Status_Name = val;
	},
};

/************************************************************************************
* Retrieves all instances of Status SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "Id";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "lastmodifiedts";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.Employee.Status.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.Employee.Status.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.Employee.Status.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	orderByMap = kony.sync.formOrderByClause("Status",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.Employee.Status.getAll->successcallback");
		successcallback(com.kony.Employee.Status.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of Status present in local database.
*************************************************************************************/
com.kony.Employee.Status.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.getAllCount function");
	com.kony.Employee.Status.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of Status using where clause in the local Database
*************************************************************************************/
com.kony.Employee.Status.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.Employee.Status.getCount->successcallback");
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
* Creates a new instance of Status in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.Employee.Status.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.Employee.Status.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.Employee.Status.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.Employee.Status.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.Employee.Status.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"Status",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.Employee.Status.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.Employee.Status.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "Id=" + valuestable.Id;
		pks["Id"] = {key:"Id",value:valuestable.Id};
		com.kony.Employee.Status.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of Status in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Id = "Id_0";
*		valuesArray[0].lastmodifiedts = "lastmodifiedts_0";
*		valuesArray[0].softdeleteflag = "softdeleteflag_0";
*		valuesArray[0].Status_Name = "Status_Name_0";
*		valuesArray[1] = {};
*		valuesArray[1].Id = "Id_1";
*		valuesArray[1].lastmodifiedts = "lastmodifiedts_1";
*		valuesArray[1].softdeleteflag = "softdeleteflag_1";
*		valuesArray[1].Status_Name = "Status_Name_1";
*		valuesArray[2] = {};
*		valuesArray[2].Id = "Id_2";
*		valuesArray[2].lastmodifiedts = "lastmodifiedts_2";
*		valuesArray[2].softdeleteflag = "softdeleteflag_2";
*		valuesArray[2].Status_Name = "Status_Name_2";
*		com.kony.Employee.Status.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.Employee.Status.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.Employee.Status.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"Status",errorcallback,true)===false){
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
				errMsg = "Id=" + valuestable.Id;
				pks["Id"] = {key:"Id",value:valuestable.Id};
				var wcs = [];
				if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.Employee.Status.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.Employee.Status.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.Employee.Status.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates Status using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.Employee.Status.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.Employee.Status.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.Employee.Status.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.Employee.Status.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.Employee.Status.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"Status",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.Employee.Status.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates Status(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.Employee.Status.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.Employee.Status.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"Status",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.Employee.Status.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.Employee.Status.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.Employee.Status.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.Employee.Status.getPKTable());
	}
};

/************************************************************************************
* Updates Status(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.lastmodifiedts = "lastmodifiedts_updated0";
*		inputArray[0].changeSet.softdeleteflag = "softdeleteflag_updated0";
*		inputArray[0].changeSet.Status_Name = "Status_Name_updated0";
*		inputArray[0].whereClause = "where Id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.lastmodifiedts = "lastmodifiedts_updated1";
*		inputArray[1].changeSet.softdeleteflag = "softdeleteflag_updated1";
*		inputArray[1].changeSet.Status_Name = "Status_Name_updated1";
*		inputArray[1].whereClause = "where Id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.lastmodifiedts = "lastmodifiedts_updated2";
*		inputArray[2].changeSet.softdeleteflag = "softdeleteflag_updated2";
*		inputArray[2].changeSet.Status_Name = "Status_Name_updated2";
*		inputArray[2].whereClause = "where Id = '2'";
*		com.kony.Employee.Status.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.Employee.Status.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.Employee.Status.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "Status";
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
			if(kony.sync.attributeValidation(valuestable,"Status",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.Employee.Status.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.Employee.Status.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.Employee.Status.getPKTable());
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
		sync.log.trace("Entering  com.kony.Employee.Status.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.Employee.Status.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes Status using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.Employee.Status.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.Employee.Status.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.Employee.Status.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.Employee.Status.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function StatusTransactionCallback(tx){
		sync.log.trace("Entering com.kony.Employee.Status.deleteByPK->Status_PKPresent successcallback");
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
	
	function StatusErrorCallback(){
		sync.log.error("Entering com.kony.Employee.Status.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function StatusSuccessCallback(){
		sync.log.trace("Entering com.kony.Employee.Status.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.Employee.Status.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, StatusTransactionCallback, StatusSuccessCallback, StatusErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes Status(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.Employee.Status.remove("where Id like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.Employee.Status.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.Employee.Status.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Status_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Status_removeSuccess(){
		sync.log.trace("Entering com.kony.Employee.Status.remove->Status_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.Employee.Status.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.Employee.Status.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Status_removeTransactioncallback, Status_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes Status using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.Employee.Status.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.Employee.Status.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.Employee.Status.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function StatusTransactionCallback(tx){
		sync.log.trace("Entering com.kony.Employee.Status.removeDeviceInstanceByPK -> StatusTransactionCallback");
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
	
	function StatusErrorCallback(){
		sync.log.error("Entering com.kony.Employee.Status.removeDeviceInstanceByPK -> StatusErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function StatusSuccessCallback(){
		sync.log.trace("Entering com.kony.Employee.Status.removeDeviceInstanceByPK -> StatusSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.Employee.Status.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, StatusTransactionCallback, StatusSuccessCallback, StatusErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes Status(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.Employee.Status.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Status_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Status_removeSuccess(){
		sync.log.trace("Entering com.kony.Employee.Status.remove->Status_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.Employee.Status.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.Employee.Status.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Status_removeTransactioncallback, Status_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves Status using primary key from the local Database. 
*************************************************************************************/
com.kony.Employee.Status.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.Employee.Status.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.Employee.Status.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	var wcs = [];
	if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.Employee.Status.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.Employee.Status.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves Status(s) using where clause from the local Database. 
* e.g. com.kony.Employee.Status.find("where Id like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.Employee.Status.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.Employee.Status.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of Status with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.Employee.Status.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.Employee.Status.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.Employee.Status.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.Employee.Status.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of Status matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.Employee.Status.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
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
		sync.log.trace("Entering com.kony.Employee.Status.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.Employee.Status.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.Employee.Status.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of Status pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.Employee.Status.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
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
		sync.log.trace("Entering com.kony.Employee.Status.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.Employee.Status.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Status pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.Employee.Status.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.Employee.Status.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.Employee.Status.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Status deferred for upload.
*************************************************************************************/
com.kony.Employee.Status.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
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
		sync.log.trace("Entering com.kony.Employee.Status.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.Employee.Status.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to Status in local database to last synced state
*************************************************************************************/
com.kony.Employee.Status.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.Employee.Status.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to Status's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.Employee.Status.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.Employee.Status.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.Employee.Status.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	var wcs = [];
	if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.Employee.Status.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.Employee.Status.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether Status's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.Employee.Status.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.Employee.Status.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.Employee.Status.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.Employee.Status.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.Employee.Status.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether Status's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.Employee.Status.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.Employee.Status.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.Employee.Status.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.Employee.Status.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.Employee.Status.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.Employee.Status.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.Employee.Status.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.Employee.Status.isRecordPendingForUpload->successcallback function");
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
com.kony.Employee.Status.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.Employee.Status.removeCascade function");
	var tbname = com.kony.Employee.Status.getTableName();
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


com.kony.Employee.Status.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.Employee.Status.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.Employee.Status();
			obj.Id = res[i].Id;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.softdeleteflag = res[i].softdeleteflag;
			obj.Status_Name = res[i].Status_Name;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.Employee.Status.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.Employee.Status.filterAttributes function");
	var attributeTable = {};
	attributeTable.Id = "Id";
	attributeTable.lastmodifiedts = "lastmodifiedts";
	attributeTable.softdeleteflag = "softdeleteflag";
	attributeTable.Status_Name = "Status_Name";

	var PKTable = {};
	PKTable.Id = {}
	PKTable.Id.name = "Id";
	PKTable.Id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject Status. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject Status. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject Status. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.Employee.Status.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.Employee.Status.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.Employee.Status.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.Employee.Status.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.Employee.Status.prototype.getValuesTable function");
	var valuesTable = {};
	if(isInsert===true){
		valuesTable.Id = this.Id;
	}
	valuesTable.lastmodifiedts = this.lastmodifiedts;
	valuesTable.softdeleteflag = this.softdeleteflag;
	valuesTable.Status_Name = this.Status_Name;
	return valuesTable;
};

com.kony.Employee.Status.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.Employee.Status.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Id = {key:"Id",value:this.Id};
	return pkTable;
};

com.kony.Employee.Status.getPKTable = function(){
	sync.log.trace("Entering com.kony.Employee.Status.getPKTable function");
	var pkTable = [];
	pkTable.push("Id");
	return pkTable;
};

com.kony.Employee.Status.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.Employee.Status.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key Id not specified in  " + opName + "  an item in Status");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Status")));
		return false;	
	}
	else if(kony.sync.isValidJSTable(pks)){
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
			sync.log.error("Primary Key Id not specified in  " + opName + "  an item in Status");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Status")));
			return false;
		}
	}
	else{
		wc.key = "Id";
		wc.value = pks;
	}	
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.Employee.Status.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.validateNull function");
	return true;
};

com.kony.Employee.Status.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.Employee.Status.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
		sync.log.error("Mandatory attribute Id is missing for the SyncObject Status.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Status", "Id")));
		return false;
	}
	return true;
};

com.kony.Employee.Status.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.Employee.Status.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.Employee.Status.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.Employee.Status.getTableName = function(){
	return "Status";
};




// **********************************End Status's helper methods************************