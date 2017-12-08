//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:10 IST 2016leave*******************
// **********************************Start leave's helper methods************************
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
if(typeof(com.kony.MYLEAVE)=== "undefined"){ com.kony.MYLEAVE = {}; }

/************************************************************************************
* Creates new leave
*************************************************************************************/
com.kony.MYLEAVE.leave = function(){
	this.createdts = null;
	this.employee_id = null;
	this.end_date = null;
	this.end_time = null;
	this.id = null;
	this.lastmodifiedts = null;
	this.leave_type_id = null;
	this.no_of_hours = null;
	this.reason_desc = null;
	this.recurrence_id = null;
	this.softdeletedflag = null;
	this.start_date = null;
	this.start_time = null;
	this.status_id = null;
	this.TIMESTAMP = null;
	this.markForUpload = true;
};

com.kony.MYLEAVE.leave.prototype = {
	get createdts(){
		return this._createdts;
	},
	set createdts(val){
		this._createdts = val;
	},
	get employee_id(){
		return this._employee_id;
	},
	set employee_id(val){
		this._employee_id = val;
	},
	get end_date(){
		return this._end_date;
	},
	set end_date(val){
		this._end_date = val;
	},
	get end_time(){
		return this._end_time;
	},
	set end_time(val){
		this._end_time = val;
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
	get leave_type_id(){
		return this._leave_type_id;
	},
	set leave_type_id(val){
		this._leave_type_id = val;
	},
	get no_of_hours(){
		return this._no_of_hours;
	},
	set no_of_hours(val){
		if(!kony.sync.isEmptyString(val) && !kony.sync.isNull(val) && !kony.sync.isValidNumberType(val)){
			sync.log.error("Invalid data type for the attribute no_of_hours in leave.\nExpected:\"double\"\nActual:\"" + kony.type(val) + "\"");
		}
		this._no_of_hours = val;
	},
	get reason_desc(){
		return this._reason_desc;
	},
	set reason_desc(val){
		this._reason_desc = val;
	},
	get recurrence_id(){
		return this._recurrence_id;
	},
	set recurrence_id(val){
		this._recurrence_id = val;
	},
	get softdeletedflag(){
		return this._softdeletedflag;
	},
	set softdeletedflag(val){
		this._softdeletedflag = val;
	},
	get start_date(){
		return this._start_date;
	},
	set start_date(val){
		this._start_date = val;
	},
	get start_time(){
		return this._start_time;
	},
	set start_time(val){
		this._start_time = val;
	},
	get status_id(){
		return this._status_id;
	},
	set status_id(val){
		this._status_id = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
};

/************************************************************************************
* Retrieves all instances of leave SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "createdts";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "employee_id";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.MYLEAVE.leave.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.MYLEAVE.leave.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	orderByMap = kony.sync.formOrderByClause("leave",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.getAll->successcallback");
		successcallback(com.kony.MYLEAVE.leave.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of leave present in local database.
*************************************************************************************/
com.kony.MYLEAVE.leave.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getAllCount function");
	com.kony.MYLEAVE.leave.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of leave using where clause in the local Database
*************************************************************************************/
com.kony.MYLEAVE.leave.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.MYLEAVE.leave.getCount->successcallback");
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
* Creates a new instance of leave in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.leave.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.MYLEAVE.leave.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYLEAVE.leave.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.MYLEAVE.leave.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"leave",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYLEAVE.leave.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.MYLEAVE.leave.getRelationshipMap(relationshipMap,valuestable);
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
		errMsg = errMsg + ", id=" + valuestable.id;
		pks["id"] = {key:"id",value:valuestable.id};
		com.kony.MYLEAVE.leave.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of leave in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].createdts = "createdts_0";
*		valuesArray[0].employee_id = "employee_id_0";
*		valuesArray[0].end_date = "end_date_0";
*		valuesArray[0].end_time = "end_time_0";
*		valuesArray[0].id = "id_0";
*		valuesArray[0].lastmodifiedts = "lastmodifiedts_0";
*		valuesArray[0].leave_type_id = "leave_type_id_0";
*		valuesArray[0].no_of_hours = 0;
*		valuesArray[0].reason_desc = "reason_desc_0";
*		valuesArray[0].recurrence_id = "recurrence_id_0";
*		valuesArray[0].start_date = "start_date_0";
*		valuesArray[0].start_time = "start_time_0";
*		valuesArray[0].status_id = "status_id_0";
*		valuesArray[1] = {};
*		valuesArray[1].createdts = "createdts_1";
*		valuesArray[1].employee_id = "employee_id_1";
*		valuesArray[1].end_date = "end_date_1";
*		valuesArray[1].end_time = "end_time_1";
*		valuesArray[1].id = "id_1";
*		valuesArray[1].lastmodifiedts = "lastmodifiedts_1";
*		valuesArray[1].leave_type_id = "leave_type_id_1";
*		valuesArray[1].no_of_hours = 1;
*		valuesArray[1].reason_desc = "reason_desc_1";
*		valuesArray[1].recurrence_id = "recurrence_id_1";
*		valuesArray[1].start_date = "start_date_1";
*		valuesArray[1].start_time = "start_time_1";
*		valuesArray[1].status_id = "status_id_1";
*		valuesArray[2] = {};
*		valuesArray[2].createdts = "createdts_2";
*		valuesArray[2].employee_id = "employee_id_2";
*		valuesArray[2].end_date = "end_date_2";
*		valuesArray[2].end_time = "end_time_2";
*		valuesArray[2].id = "id_2";
*		valuesArray[2].lastmodifiedts = "lastmodifiedts_2";
*		valuesArray[2].leave_type_id = "leave_type_id_2";
*		valuesArray[2].no_of_hours = 2;
*		valuesArray[2].reason_desc = "reason_desc_2";
*		valuesArray[2].recurrence_id = "recurrence_id_2";
*		valuesArray[2].start_date = "start_date_2";
*		valuesArray[2].start_time = "start_time_2";
*		valuesArray[2].status_id = "status_id_2";
*		com.kony.MYLEAVE.leave.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.MYLEAVE.leave.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"leave",errorcallback,true)===false){
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
				errMsg = errMsg + ", id=" + valuestable.id;
				pks["id"] = {key:"id",value:valuestable.id};
				var wcs = [];
				if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.MYLEAVE.leave.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.MYLEAVE.leave.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.MYLEAVE.leave.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates leave using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.leave.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.MYLEAVE.leave.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYLEAVE.leave.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.MYLEAVE.leave.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"leave",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.MYLEAVE.leave.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates leave(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.leave.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"leave",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYLEAVE.leave.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYLEAVE.leave.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.MYLEAVE.leave.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYLEAVE.leave.getPKTable());
	}
};

/************************************************************************************
* Updates leave(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.createdts = "createdts_updated0";
*		inputArray[0].changeSet.end_date = "end_date_updated0";
*		inputArray[0].changeSet.end_time = "end_time_updated0";
*		inputArray[0].changeSet.lastmodifiedts = "lastmodifiedts_updated0";
*		inputArray[0].whereClause = "where employee_id = '0'";
*		inputArray[0].whereClause = "where id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.createdts = "createdts_updated1";
*		inputArray[1].changeSet.end_date = "end_date_updated1";
*		inputArray[1].changeSet.end_time = "end_time_updated1";
*		inputArray[1].changeSet.lastmodifiedts = "lastmodifiedts_updated1";
*		inputArray[1].whereClause = "where employee_id = '1'";
*		inputArray[1].whereClause = "where id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.createdts = "createdts_updated2";
*		inputArray[2].changeSet.end_date = "end_date_updated2";
*		inputArray[2].changeSet.end_time = "end_time_updated2";
*		inputArray[2].changeSet.lastmodifiedts = "lastmodifiedts_updated2";
*		inputArray[2].whereClause = "where employee_id = '2'";
*		inputArray[2].whereClause = "where id = '2'";
*		com.kony.MYLEAVE.leave.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.MYLEAVE.leave.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.MYLEAVE.leave.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "leave";
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
			if(kony.sync.attributeValidation(valuestable,"leave",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.MYLEAVE.leave.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.MYLEAVE.leave.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.MYLEAVE.leave.getPKTable());
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
		sync.log.trace("Entering  com.kony.MYLEAVE.leave.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.MYLEAVE.leave.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes leave using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.MYLEAVE.leave.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function leaveTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.deleteByPK->leave_PKPresent successcallback");
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
	
	function leaveErrorCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.leave.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function leaveSuccessCallback(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.leave.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, leaveTransactionCallback, leaveSuccessCallback, leaveErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes leave(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.MYLEAVE.leave.remove("where createdts like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.MYLEAVE.leave.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function leave_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function leave_removeSuccess(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.remove->leave_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, leave_removeTransactioncallback, leave_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes leave using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function leaveTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.removeDeviceInstanceByPK -> leaveTransactionCallback");
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
	
	function leaveErrorCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.leave.removeDeviceInstanceByPK -> leaveErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function leaveSuccessCallback(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.removeDeviceInstanceByPK -> leaveSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.leave.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, leaveTransactionCallback, leaveSuccessCallback, leaveErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes leave(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYLEAVE.leave.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function leave_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function leave_removeSuccess(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.remove->leave_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, leave_removeTransactioncallback, leave_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves leave using primary key from the local Database. 
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	var wcs = [];
	if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.MYLEAVE.leave.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.MYLEAVE.leave.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves leave(s) using where clause from the local Database. 
* e.g. com.kony.MYLEAVE.leave.find("where createdts like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.MYLEAVE.leave.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.leave.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of leave with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.MYLEAVE.leave.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.MYLEAVE.leave.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of leave matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.leave.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
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
		sync.log.trace("Entering com.kony.MYLEAVE.leave.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.MYLEAVE.leave.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.MYLEAVE.leave.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of leave pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.MYLEAVE.leave.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
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
		sync.log.trace("Entering com.kony.MYLEAVE.leave.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.leave.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of leave pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.MYLEAVE.leave.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.leave.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of leave deferred for upload.
*************************************************************************************/
com.kony.MYLEAVE.leave.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
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
		sync.log.trace("Entering com.kony.MYLEAVE.leave.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.leave.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to leave in local database to last synced state
*************************************************************************************/
com.kony.MYLEAVE.leave.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to leave's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	var wcs = [];
	if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.leave.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.leave.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether leave's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.leave.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYLEAVE.leave.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether leave's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.leave.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.leave.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYLEAVE.leave.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYLEAVE.leave.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of leave_attachments related to leave
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYLEAVE.leave.prototype.getleave_attachmentsWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.getleave_attachmentsWithid function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.getleave_attachmentsWithid(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.getleave_attachmentsWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getleave_attachmentsWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.getleave_attachmentsWithid",  "relationship", errorcallback)){
		return;
	}	
	function leave_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].id;				
			wcs.push({key:"leavel_id", value:targetKey_0});		
			
			var tbname = "leave_attachments"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYLEAVE.leave_attachments.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
							}
		
			kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback);
			return;
		}	
	}
	
	function mySuccesscallback(res){
		var objMap = [];
		if(res!==null){
			for(var i in res){
				var obj = new com.kony.MYLEAVE.leave_attachments();
				obj.createdts = res[i].createdts;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.leavel_id = res[i].leavel_id;
				obj.LV_ATTCH_SEQNO = res[i].LV_ATTCH_SEQNO;
				obj.media_id = res[i].media_id;
				obj.softdeleteflag = res[i].softdeleteflag;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYLEAVE.leave.getAllDetailsByPK(pks, leave_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of leave_attachments related to leave
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.getCountOfleave_attachmentsWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.getCountOfleave_attachmentsWithid function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.getCountOfleave_attachmentsWithid(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.getCountOfleave_attachmentsWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getCountOfleave_attachmentsWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.getCountOfleave_attachmentsWithid",  "relationship", errorcallback)){
		return;
	}
	function leave_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].id;
					targetAttributes.push("leavel_id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"leavel_id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"leavel_id":targetKey_0});
					} 
														
			var wClause = "where ";
   			var i;
        	var len = wcs.length;
        	for (i = 0; i < len; i++) {
        		wClauseMap = wcs[i];
        		wClause += targetAttributes[i] + " = " + wClauseMap[targetAttributes[i]]
        		if(i != len-1)
        		{
            		 wClause += " AND "
        		}
    		}
		   com.kony.MYLEAVE.leave_attachments.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYLEAVE.leave.getAllDetailsByPK(pks, leave_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of leave_note related to leave
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

										
com.kony.MYLEAVE.leave.prototype.getleave_noteWithemployee_idANDid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.getleave_noteWithemployee_idANDid function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.getleave_noteWithemployee_idANDid(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.getleave_noteWithemployee_idANDid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getleave_noteWithemployee_idANDid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.getleave_noteWithemployee_idANDid",  "relationship", errorcallback)){
		return;
	}	
	function leave_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].employee_id;				
			wcs.push({key:"employee_id", value:targetKey_0});		
						var targetKey_1 = res[0].id;				
			wcs.push({key:"leave_id", value:targetKey_1});		
			
			var tbname = "leave_note"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYLEAVE.leave_note.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
							}
		
			kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback);
			return;
		}	
	}
	
	function mySuccesscallback(res){
		var objMap = [];
		if(res!==null){
			for(var i in res){
				var obj = new com.kony.MYLEAVE.leave_note();
				obj.comments = res[i].comments;
				obj.createdts = res[i].createdts;
				obj.employee_id = res[i].employee_id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.leave_id = res[i].leave_id;
				obj.softdeleteflag = res[i].softdeleteflag;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYLEAVE.leave.getAllDetailsByPK(pks, leave_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of leave_note related to leave
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYLEAVE.leave.prototype.getCountOfleave_noteWithemployee_idANDid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.getCountOfleave_noteWithemployee_idANDid function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.leave.getCountOfleave_noteWithemployee_idANDid(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.leave.getCountOfleave_noteWithemployee_idANDid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getCountOfleave_noteWithemployee_idANDid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.leave.getCountOfleave_noteWithemployee_idANDid",  "relationship", errorcallback)){
		return;
	}
	function leave_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].employee_id;
					targetAttributes.push("employee_id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"employee_id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"employee_id":targetKey_0});
					} 
														var targetKey_1 = res[0].id;
					targetAttributes.push("leave_id");
					if(kony.type(targetKey_1)==="string") {
						wcs.push({"leave_id":"'"+targetKey_1+"'"});
					}else{
						wcs.push({"leave_id":targetKey_1});
					} 
														
			var wClause = "where ";
   			var i;
        	var len = wcs.length;
        	for (i = 0; i < len; i++) {
        		wClauseMap = wcs[i];
        		wClause += targetAttributes[i] + " = " + wClauseMap[targetAttributes[i]]
        		if(i != len-1)
        		{
            		 wClause += " AND "
        		}
    		}
		   com.kony.MYLEAVE.leave_note.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYLEAVE.leave.getAllDetailsByPK(pks, leave_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.MYLEAVE.leave.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.removeCascade function");
	var tbname = com.kony.MYLEAVE.leave.getTableName();
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


com.kony.MYLEAVE.leave.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.MYLEAVE.leave();
			obj.createdts = res[i].createdts;
			obj.employee_id = res[i].employee_id;
			obj.end_date = res[i].end_date;
			obj.end_time = res[i].end_time;
			obj.id = res[i].id;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.leave_type_id = res[i].leave_type_id;
			obj.no_of_hours = res[i].no_of_hours;
			obj.reason_desc = res[i].reason_desc;
			obj.recurrence_id = res[i].recurrence_id;
			obj.softdeletedflag = res[i].softdeletedflag;
			obj.start_date = res[i].start_date;
			obj.start_time = res[i].start_time;
			obj.status_id = res[i].status_id;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.MYLEAVE.leave.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.filterAttributes function");
	var attributeTable = {};
	attributeTable.createdts = "createdts";
	attributeTable.employee_id = "employee_id";
	attributeTable.end_date = "end_date";
	attributeTable.end_time = "end_time";
	attributeTable.id = "id";
	attributeTable.lastmodifiedts = "lastmodifiedts";
	attributeTable.leave_type_id = "leave_type_id";
	attributeTable.no_of_hours = "no_of_hours";
	attributeTable.reason_desc = "reason_desc";
	attributeTable.recurrence_id = "recurrence_id";
	attributeTable.start_date = "start_date";
	attributeTable.start_time = "start_time";
	attributeTable.status_id = "status_id";

	var PKTable = {};
	PKTable.employee_id = {}
	PKTable.employee_id.name = "employee_id";
	PKTable.employee_id.isAutoGen = false;
	PKTable.id = {}
	PKTable.id.name = "id";
	PKTable.id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject leave. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject leave. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject leave. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.MYLEAVE.leave.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.MYLEAVE.leave.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.MYLEAVE.leave.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.createdts = this.createdts;
	if(isInsert===true){
		valuesTable.employee_id = this.employee_id;
	}
	valuesTable.end_date = this.end_date;
	valuesTable.end_time = this.end_time;
	if(isInsert===true){
		valuesTable.id = this.id;
	}
	valuesTable.lastmodifiedts = this.lastmodifiedts;
	valuesTable.leave_type_id = this.leave_type_id;
	valuesTable.no_of_hours = this.no_of_hours;
	valuesTable.reason_desc = this.reason_desc;
	valuesTable.recurrence_id = this.recurrence_id;
	valuesTable.start_date = this.start_date;
	valuesTable.start_time = this.start_time;
	valuesTable.status_id = this.status_id;
	return valuesTable;
};

com.kony.MYLEAVE.leave.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.prototype.getPKTable function");
	var pkTable = {};
	pkTable.employee_id = {key:"employee_id",value:this.employee_id};
	pkTable.id = {key:"id",value:this.id};
	return pkTable;
};

com.kony.MYLEAVE.leave.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getPKTable function");
	var pkTable = [];
	pkTable.push("employee_id");
	pkTable.push("id");
	return pkTable;
};

com.kony.MYLEAVE.leave.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.pkCheck function");
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
		sync.log.error("Primary Key employee_id not specified in " + opName + " an item in leave");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("employee_id",opName,"leave")));
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
		sync.log.error("Primary Key id not specified in " + opName + " an item in leave");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"leave")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.MYLEAVE.leave.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.validateNull function");
	return true;
};

com.kony.MYLEAVE.leave.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.validateNullInsert function");
	if(kony.sync.isNull(valuestable.employee_id) || kony.sync.isEmptyString(valuestable.employee_id)){
		sync.log.error("Mandatory attribute employee_id is missing for the SyncObject leave.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "leave", "employee_id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.id) || kony.sync.isEmptyString(valuestable.id)){
		sync.log.error("Mandatory attribute id is missing for the SyncObject leave.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "leave", "id")));
		return false;
	}
	return true;
};

com.kony.MYLEAVE.leave.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.MYLEAVE.leave.getRelationshipMap function");
	var r1 = {};

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.id)){
		r1.sourceAttribute.push("leavel_id") ;
		r1.foreignKeyAttribute.push("id") ;
		r1.targetAttributeValue.push("'" + valuestable.id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.leave_attachments===undefined){
			relationshipMap.leave_attachments = [];
		}
		relationshipMap.leave_attachments.push(r1);
	}
		
	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.employee_id)){
		r1.sourceAttribute.push("employee_id") ;
		r1.foreignKeyAttribute.push("employee_id") ;
		r1.targetAttributeValue.push("'" + valuestable.employee_id+ "'");
	}
	if(!kony.sync.isNullOrUndefined(valuestable.id)){
		r1.sourceAttribute.push("leave_id") ;
		r1.foreignKeyAttribute.push("id") ;
		r1.targetAttributeValue.push("'" + valuestable.id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.leave_note===undefined){
			relationshipMap.leave_note = [];
		}
		relationshipMap.leave_note.push(r1);
	}
		
	return relationshipMap;
};


com.kony.MYLEAVE.leave.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.MYLEAVE.leave.getTableName = function(){
	return "leave";
};




// **********************************End leave's helper methods************************