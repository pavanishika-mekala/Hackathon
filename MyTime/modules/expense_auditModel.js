//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:13 IST 2016expense_audit*******************
// **********************************Start expense_audit's helper methods************************
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
if(typeof(com.kony.myExpenses)=== "undefined"){ com.kony.myExpenses = {}; }

/************************************************************************************
* Creates new expense_audit
*************************************************************************************/
com.kony.myExpenses.expense_audit = function(){
	this.approver_employee_id = null;
	this.approver_name = null;
	this.createdts = null;
	this.description = null;
	this.employee_id = null;
	this.error_message = null;
	this.expense_id = null;
	this.id = null;
	this.lastmodifiedts = null;
	this.softdeletedflag = null;
	this.status_id = null;
	this.markForUpload = true;
};

com.kony.myExpenses.expense_audit.prototype = {
	get approver_employee_id(){
		return this._approver_employee_id;
	},
	set approver_employee_id(val){
		this._approver_employee_id = val;
	},
	get approver_name(){
		return this._approver_name;
	},
	set approver_name(val){
		this._approver_name = val;
	},
	get createdts(){
		return this._createdts;
	},
	set createdts(val){
		this._createdts = val;
	},
	get description(){
		return this._description;
	},
	set description(val){
		this._description = val;
	},
	get employee_id(){
		return this._employee_id;
	},
	set employee_id(val){
		this._employee_id = val;
	},
	get error_message(){
		return this._error_message;
	},
	set error_message(val){
		this._error_message = val;
	},
	get expense_id(){
		return this._expense_id;
	},
	set expense_id(val){
		this._expense_id = val;
	},
	get id(){
		return this._id;
	},
	set id(val){
		this._id = val;
	},
	get lastmodifiedts(){
		return this._lastmodifiedts;
	},
	set lastmodifiedts(val){
		this._lastmodifiedts = val;
	},
	get softdeletedflag(){
		return this._softdeletedflag;
	},
	set softdeletedflag(val){
		this._softdeletedflag = val;
	},
	get status_id(){
		return this._status_id;
	},
	set status_id(val){
		this._status_id = val;
	},
};

/************************************************************************************
* Retrieves all instances of expense_audit SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "approver_employee_id";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "approver_name";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.myExpenses.expense_audit.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.myExpenses.expense_audit.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	orderByMap = kony.sync.formOrderByClause("expense_audit",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.getAll->successcallback");
		successcallback(com.kony.myExpenses.expense_audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of expense_audit present in local database.
*************************************************************************************/
com.kony.myExpenses.expense_audit.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getAllCount function");
	com.kony.myExpenses.expense_audit.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of expense_audit using where clause in the local Database
*************************************************************************************/
com.kony.myExpenses.expense_audit.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.getCount->successcallback");
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
* Creates a new instance of expense_audit in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense_audit.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.myExpenses.expense_audit.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.myExpenses.expense_audit.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.myExpenses.expense_audit.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"expense_audit",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.myExpenses.expense_audit.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.myExpenses.expense_audit.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "employee_id=" + valuestable.employee_id;
		pks["employee_id"] = {key:"employee_id",value:valuestable.employee_id};
		errMsg = errMsg + ", expense_id=" + valuestable.expense_id;
		pks["expense_id"] = {key:"expense_id",value:valuestable.expense_id};
		errMsg = errMsg + ", id=" + valuestable.id;
		pks["id"] = {key:"id",value:valuestable.id};
		com.kony.myExpenses.expense_audit.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of expense_audit in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].approver_employee_id = "approver_employee_id_0";
*		valuesArray[0].approver_name = "approver_name_0";
*		valuesArray[0].createdts = "createdts_0";
*		valuesArray[0].description = "description_0";
*		valuesArray[0].employee_id = "employee_id_0";
*		valuesArray[0].error_message = "error_message_0";
*		valuesArray[0].expense_id = "expense_id_0";
*		valuesArray[0].id = "id_0";
*		valuesArray[0].lastmodifiedts = "lastmodifiedts_0";
*		valuesArray[0].softdeletedflag = "softdeletedflag_0";
*		valuesArray[0].status_id = "status_id_0";
*		valuesArray[1] = {};
*		valuesArray[1].approver_employee_id = "approver_employee_id_1";
*		valuesArray[1].approver_name = "approver_name_1";
*		valuesArray[1].createdts = "createdts_1";
*		valuesArray[1].description = "description_1";
*		valuesArray[1].employee_id = "employee_id_1";
*		valuesArray[1].error_message = "error_message_1";
*		valuesArray[1].expense_id = "expense_id_1";
*		valuesArray[1].id = "id_1";
*		valuesArray[1].lastmodifiedts = "lastmodifiedts_1";
*		valuesArray[1].softdeletedflag = "softdeletedflag_1";
*		valuesArray[1].status_id = "status_id_1";
*		valuesArray[2] = {};
*		valuesArray[2].approver_employee_id = "approver_employee_id_2";
*		valuesArray[2].approver_name = "approver_name_2";
*		valuesArray[2].createdts = "createdts_2";
*		valuesArray[2].description = "description_2";
*		valuesArray[2].employee_id = "employee_id_2";
*		valuesArray[2].error_message = "error_message_2";
*		valuesArray[2].expense_id = "expense_id_2";
*		valuesArray[2].id = "id_2";
*		valuesArray[2].lastmodifiedts = "lastmodifiedts_2";
*		valuesArray[2].softdeletedflag = "softdeletedflag_2";
*		valuesArray[2].status_id = "status_id_2";
*		com.kony.myExpenses.expense_audit.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.myExpenses.expense_audit.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"expense_audit",errorcallback,true)===false){
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
				errMsg = "employee_id=" + valuestable.employee_id;
				pks["employee_id"] = {key:"employee_id",value:valuestable.employee_id};
				errMsg = errMsg + ", expense_id=" + valuestable.expense_id;
				pks["expense_id"] = {key:"expense_id",value:valuestable.expense_id};
				errMsg = errMsg + ", id=" + valuestable.id;
				pks["id"] = {key:"id",value:valuestable.id};
				var wcs = [];
				if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.myExpenses.expense_audit.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.myExpenses.expense_audit.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.myExpenses.expense_audit.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates expense_audit using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense_audit.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.myExpenses.expense_audit.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.myExpenses.expense_audit.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.myExpenses.expense_audit.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"expense_audit",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.myExpenses.expense_audit.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates expense_audit(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense_audit.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"expense_audit",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.myExpenses.expense_audit.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.myExpenses.expense_audit.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.myExpenses.expense_audit.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.myExpenses.expense_audit.getPKTable());
	}
};

/************************************************************************************
* Updates expense_audit(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.approver_employee_id = "approver_employee_id_updated0";
*		inputArray[0].changeSet.approver_name = "approver_name_updated0";
*		inputArray[0].changeSet.createdts = "createdts_updated0";
*		inputArray[0].changeSet.description = "description_updated0";
*		inputArray[0].whereClause = "where employee_id = '0'";
*		inputArray[0].whereClause = "where expense_id = '0'";
*		inputArray[0].whereClause = "where id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.approver_employee_id = "approver_employee_id_updated1";
*		inputArray[1].changeSet.approver_name = "approver_name_updated1";
*		inputArray[1].changeSet.createdts = "createdts_updated1";
*		inputArray[1].changeSet.description = "description_updated1";
*		inputArray[1].whereClause = "where employee_id = '1'";
*		inputArray[1].whereClause = "where expense_id = '1'";
*		inputArray[1].whereClause = "where id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.approver_employee_id = "approver_employee_id_updated2";
*		inputArray[2].changeSet.approver_name = "approver_name_updated2";
*		inputArray[2].changeSet.createdts = "createdts_updated2";
*		inputArray[2].changeSet.description = "description_updated2";
*		inputArray[2].whereClause = "where employee_id = '2'";
*		inputArray[2].whereClause = "where expense_id = '2'";
*		inputArray[2].whereClause = "where id = '2'";
*		com.kony.myExpenses.expense_audit.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.myExpenses.expense_audit.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "expense_audit";
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
			if(kony.sync.attributeValidation(valuestable,"expense_audit",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.myExpenses.expense_audit.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.myExpenses.expense_audit.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.myExpenses.expense_audit.getPKTable());
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
		sync.log.trace("Entering  com.kony.myExpenses.expense_audit.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.myExpenses.expense_audit.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes expense_audit using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense_audit.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.myExpenses.expense_audit.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function expense_auditTransactionCallback(tx){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.deleteByPK->expense_audit_PKPresent successcallback");
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
	
	function expense_auditErrorCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense_audit.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function expense_auditSuccessCallback(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense_audit.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, expense_auditTransactionCallback, expense_auditSuccessCallback, expense_auditErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes expense_audit(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.myExpenses.expense_audit.remove("where approver_employee_id like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.myExpenses.expense_audit.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function expense_audit_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function expense_audit_removeSuccess(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.remove->expense_audit_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, expense_audit_removeTransactioncallback, expense_audit_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes expense_audit using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function expense_auditTransactionCallback(tx){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK -> expense_auditTransactionCallback");
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
	
	function expense_auditErrorCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK -> expense_auditErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function expense_auditSuccessCallback(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK -> expense_auditSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense_audit.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, expense_auditTransactionCallback, expense_auditSuccessCallback, expense_auditErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes expense_audit(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.myExpenses.expense_audit.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function expense_audit_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function expense_audit_removeSuccess(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.remove->expense_audit_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, expense_audit_removeTransactioncallback, expense_audit_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves expense_audit using primary key from the local Database. 
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense_audit.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense_audit.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	var wcs = [];
	if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.myExpenses.expense_audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves expense_audit(s) using where clause from the local Database. 
* e.g. com.kony.myExpenses.expense_audit.find("where approver_employee_id like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.myExpenses.expense_audit.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense_audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of expense_audit with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense_audit.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.myExpenses.expense_audit.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.myExpenses.expense_audit.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of expense_audit matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense_audit.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
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
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.myExpenses.expense_audit.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of expense_audit pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.myExpenses.expense_audit.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
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
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense_audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of expense_audit pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.myExpenses.expense_audit.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense_audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of expense_audit deferred for upload.
*************************************************************************************/
com.kony.myExpenses.expense_audit.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
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
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense_audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to expense_audit in local database to last synced state
*************************************************************************************/
com.kony.myExpenses.expense_audit.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to expense_audit's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense_audit.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense_audit.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	var wcs = [];
	if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense_audit.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether expense_audit's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense_audit.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense_audit.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense_audit.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether expense_audit's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.myExpenses.expense_audit.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense_audit.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense_audit.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense_audit.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense_audit.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.myExpenses.expense_audit.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.myExpenses.expense_audit.isRecordPendingForUpload->successcallback function");
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
com.kony.myExpenses.expense_audit.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.removeCascade function");
	var tbname = com.kony.myExpenses.expense_audit.getTableName();
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


com.kony.myExpenses.expense_audit.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.myExpenses.expense_audit();
			obj.approver_employee_id = res[i].approver_employee_id;
			obj.approver_name = res[i].approver_name;
			obj.createdts = res[i].createdts;
			obj.description = res[i].description;
			obj.employee_id = res[i].employee_id;
			obj.error_message = res[i].error_message;
			obj.expense_id = res[i].expense_id;
			obj.id = res[i].id;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.softdeletedflag = res[i].softdeletedflag;
			obj.status_id = res[i].status_id;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.myExpenses.expense_audit.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.filterAttributes function");
	var attributeTable = {};
	attributeTable.approver_employee_id = "approver_employee_id";
	attributeTable.approver_name = "approver_name";
	attributeTable.createdts = "createdts";
	attributeTable.description = "description";
	attributeTable.employee_id = "employee_id";
	attributeTable.error_message = "error_message";
	attributeTable.expense_id = "expense_id";
	attributeTable.id = "id";
	attributeTable.lastmodifiedts = "lastmodifiedts";
	attributeTable.softdeletedflag = "softdeletedflag";
	attributeTable.status_id = "status_id";

	var PKTable = {};
	PKTable.employee_id = {}
	PKTable.employee_id.name = "employee_id";
	PKTable.employee_id.isAutoGen = false;
	PKTable.expense_id = {}
	PKTable.expense_id.name = "expense_id";
	PKTable.expense_id.isAutoGen = false;
	PKTable.id = {}
	PKTable.id.name = "id";
	PKTable.id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject expense_audit. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject expense_audit. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject expense_audit. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.myExpenses.expense_audit.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.myExpenses.expense_audit.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.myExpenses.expense_audit.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.approver_employee_id = this.approver_employee_id;
	valuesTable.approver_name = this.approver_name;
	valuesTable.createdts = this.createdts;
	valuesTable.description = this.description;
	if(isInsert===true){
		valuesTable.employee_id = this.employee_id;
	}
	valuesTable.error_message = this.error_message;
	if(isInsert===true){
		valuesTable.expense_id = this.expense_id;
	}
	if(isInsert===true){
		valuesTable.id = this.id;
	}
	valuesTable.lastmodifiedts = this.lastmodifiedts;
	valuesTable.softdeletedflag = this.softdeletedflag;
	valuesTable.status_id = this.status_id;
	return valuesTable;
};

com.kony.myExpenses.expense_audit.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.prototype.getPKTable function");
	var pkTable = {};
	pkTable.employee_id = {key:"employee_id",value:this.employee_id};
	pkTable.expense_id = {key:"expense_id",value:this.expense_id};
	pkTable.id = {key:"id",value:this.id};
	return pkTable;
};

com.kony.myExpenses.expense_audit.getPKTable = function(){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getPKTable function");
	var pkTable = [];
	pkTable.push("employee_id");
	pkTable.push("expense_id");
	pkTable.push("id");
	return pkTable;
};

com.kony.myExpenses.expense_audit.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.employee_id)){
		if(!kony.sync.isNull(pks.employee_id.value)){
			wc.key = "employee_id";
			wc.value = pks.employee_id.value;
		}
		else{
			wc.key = "employee_id";
			wc.value = pks.employee_id;
		}
	}else{
		sync.log.error("Primary Key employee_id not specified in " + opName + " an item in expense_audit");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("employee_id",opName,"expense_audit")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.expense_id)){
		if(!kony.sync.isNull(pks.expense_id.value)){
			wc.key = "expense_id";
			wc.value = pks.expense_id.value;
		}
		else{
			wc.key = "expense_id";
			wc.value = pks.expense_id;
		}
	}else{
		sync.log.error("Primary Key expense_id not specified in " + opName + " an item in expense_audit");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("expense_id",opName,"expense_audit")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.id)){
		if(!kony.sync.isNull(pks.id.value)){
			wc.key = "id";
			wc.value = pks.id.value;
		}
		else{
			wc.key = "id";
			wc.value = pks.id;
		}
	}else{
		sync.log.error("Primary Key id not specified in " + opName + " an item in expense_audit");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"expense_audit")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.myExpenses.expense_audit.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.validateNull function");
	return true;
};

com.kony.myExpenses.expense_audit.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.validateNullInsert function");
	if(kony.sync.isNull(valuestable.employee_id) || kony.sync.isEmptyString(valuestable.employee_id)){
		sync.log.error("Mandatory attribute employee_id is missing for the SyncObject expense_audit.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "expense_audit", "employee_id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.expense_id) || kony.sync.isEmptyString(valuestable.expense_id)){
		sync.log.error("Mandatory attribute expense_id is missing for the SyncObject expense_audit.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "expense_audit", "expense_id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.id) || kony.sync.isEmptyString(valuestable.id)){
		sync.log.error("Mandatory attribute id is missing for the SyncObject expense_audit.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "expense_audit", "id")));
		return false;
	}
	return true;
};

com.kony.myExpenses.expense_audit.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.myExpenses.expense_audit.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.myExpenses.expense_audit.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.myExpenses.expense_audit.getTableName = function(){
	return "expense_audit";
};




// **********************************End expense_audit's helper methods************************