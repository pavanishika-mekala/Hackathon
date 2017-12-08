//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:12 IST 2016approval_request*******************
// **********************************Start approval_request's helper methods************************
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
if(typeof(com.kony.MYAPPROVALS)=== "undefined"){ com.kony.MYAPPROVALS = {}; }

/************************************************************************************
* Creates new approval_request
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request = function(){
	this.category_id = null;
	this.createdts = null;
	this.Description = null;
	this.due_date = null;
	this.employee_id = null;
	this.id = null;
	this.IsLater = null;
	this.IsRead = null;
	this.lastmodifiedts = null;
	this.media_id = null;
	this.request_date = null;
	this.request_id = null;
	this.softdeletedflag = null;
	this.status_id = null;
	this.type_id = null;
	this.markForUpload = true;
};

com.kony.MYAPPROVALS.approval_request.prototype = {
	get category_id(){
		return this._category_id;
	},
	set category_id(val){
		this._category_id = val;
	},
	get createdts(){
		return this._createdts;
	},
	set createdts(val){
		this._createdts = val;
	},
	get Description(){
		return this._Description;
	},
	set Description(val){
		this._Description = val;
	},
	get due_date(){
		return this._due_date;
	},
	set due_date(val){
		this._due_date = val;
	},
	get employee_id(){
		return this._employee_id;
	},
	set employee_id(val){
		this._employee_id = val;
	},
	get id(){
		return this._id;
	},
	set id(val){
		this._id = val;
	},
	get IsLater(){
		return this._IsLater;
	},
	set IsLater(val){
		this._IsLater = val;
	},
	get IsRead(){
		return this._IsRead;
	},
	set IsRead(val){
		this._IsRead = val;
	},
	get lastmodifiedts(){
		return this._lastmodifiedts;
	},
	set lastmodifiedts(val){
		this._lastmodifiedts = val;
	},
	get media_id(){
		return this._media_id;
	},
	set media_id(val){
		this._media_id = val;
	},
	get request_date(){
		return this._request_date;
	},
	set request_date(val){
		this._request_date = val;
	},
	get request_id(){
		return this._request_id;
	},
	set request_id(val){
		this._request_id = val;
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
	get type_id(){
		return this._type_id;
	},
	set type_id(val){
		this._type_id = val;
	},
};

/************************************************************************************
* Retrieves all instances of approval_request SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "category_id";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "createdts";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.MYAPPROVALS.approval_request.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	orderByMap = kony.sync.formOrderByClause("approval_request",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getAll->successcallback");
		successcallback(com.kony.MYAPPROVALS.approval_request.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of approval_request present in local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getAllCount function");
	com.kony.MYAPPROVALS.approval_request.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of approval_request using where clause in the local Database
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getCount->successcallback");
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
* Creates a new instance of approval_request in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.MYAPPROVALS.approval_request.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.approval_request.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"approval_request",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.MYAPPROVALS.approval_request.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "id=" + valuestable.id;
		pks["id"] = {key:"id",value:valuestable.id};
		com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of approval_request in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].category_id = "category_id_0";
*		valuesArray[0].createdts = "createdts_0";
*		valuesArray[0].Description = "Description_0";
*		valuesArray[0].due_date = "due_date_0";
*		valuesArray[0].employee_id = "employee_id_0";
*		valuesArray[0].id = "id_0";
*		valuesArray[0].IsLater = "IsLater_0";
*		valuesArray[0].IsRead = "IsRead_0";
*		valuesArray[0].media_id = "media_id_0";
*		valuesArray[0].request_date = "request_date_0";
*		valuesArray[0].request_id = "request_id_0";
*		valuesArray[0].status_id = "status_id_0";
*		valuesArray[0].type_id = "type_id_0";
*		valuesArray[1] = {};
*		valuesArray[1].category_id = "category_id_1";
*		valuesArray[1].createdts = "createdts_1";
*		valuesArray[1].Description = "Description_1";
*		valuesArray[1].due_date = "due_date_1";
*		valuesArray[1].employee_id = "employee_id_1";
*		valuesArray[1].id = "id_1";
*		valuesArray[1].IsLater = "IsLater_1";
*		valuesArray[1].IsRead = "IsRead_1";
*		valuesArray[1].media_id = "media_id_1";
*		valuesArray[1].request_date = "request_date_1";
*		valuesArray[1].request_id = "request_id_1";
*		valuesArray[1].status_id = "status_id_1";
*		valuesArray[1].type_id = "type_id_1";
*		valuesArray[2] = {};
*		valuesArray[2].category_id = "category_id_2";
*		valuesArray[2].createdts = "createdts_2";
*		valuesArray[2].Description = "Description_2";
*		valuesArray[2].due_date = "due_date_2";
*		valuesArray[2].employee_id = "employee_id_2";
*		valuesArray[2].id = "id_2";
*		valuesArray[2].IsLater = "IsLater_2";
*		valuesArray[2].IsRead = "IsRead_2";
*		valuesArray[2].media_id = "media_id_2";
*		valuesArray[2].request_date = "request_date_2";
*		valuesArray[2].request_id = "request_id_2";
*		valuesArray[2].status_id = "status_id_2";
*		valuesArray[2].type_id = "type_id_2";
*		com.kony.MYAPPROVALS.approval_request.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"approval_request",errorcallback,true)===false){
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
				errMsg = "id=" + valuestable.id;
				pks["id"] = {key:"id",value:valuestable.id};
				var wcs = [];
				if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.MYAPPROVALS.approval_request.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates approval_request using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.MYAPPROVALS.approval_request.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.approval_request.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"approval_request",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.MYAPPROVALS.approval_request.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates approval_request(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"approval_request",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYAPPROVALS.approval_request.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.MYAPPROVALS.approval_request.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYAPPROVALS.approval_request.getPKTable());
	}
};

/************************************************************************************
* Updates approval_request(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.category_id = "category_id_updated0";
*		inputArray[0].changeSet.createdts = "createdts_updated0";
*		inputArray[0].changeSet.Description = "Description_updated0";
*		inputArray[0].changeSet.due_date = "due_date_updated0";
*		inputArray[0].whereClause = "where id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.category_id = "category_id_updated1";
*		inputArray[1].changeSet.createdts = "createdts_updated1";
*		inputArray[1].changeSet.Description = "Description_updated1";
*		inputArray[1].changeSet.due_date = "due_date_updated1";
*		inputArray[1].whereClause = "where id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.category_id = "category_id_updated2";
*		inputArray[2].changeSet.createdts = "createdts_updated2";
*		inputArray[2].changeSet.Description = "Description_updated2";
*		inputArray[2].changeSet.due_date = "due_date_updated2";
*		inputArray[2].whereClause = "where id = '2'";
*		com.kony.MYAPPROVALS.approval_request.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "approval_request";
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
			if(kony.sync.attributeValidation(valuestable,"approval_request",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.MYAPPROVALS.approval_request.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.MYAPPROVALS.approval_request.getPKTable());
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.MYAPPROVALS.approval_request.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes approval_request using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.approval_request.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function approval_requestTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.deleteByPK->approval_request_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.approval_attachment.removeCascade,"approval_attachment",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("request_id") ;
			targetAttributes.push("id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.attribute.removeCascade,"attribute",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.request_approver.removeCascade,"request_approver",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("category_id") ;
			targetAttributes.push("id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.request_category.removeCascade,"request_category",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("request_id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.request_note.removeCascade,"request_note",false, errorcallback, markForUpload, record, false)){
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
	
	function approval_requestErrorCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_request.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function approval_requestSuccessCallback(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_request.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, approval_requestTransactionCallback, approval_requestSuccessCallback, approval_requestErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes approval_request(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.MYAPPROVALS.approval_request.remove("where category_id like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function approval_request_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.approval_attachment.removeCascade, "approval_attachment", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("request_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute.removeCascade, "attribute", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_approver.removeCascade, "request_approver", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("category_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_category.removeCascade, "request_category", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("request_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_note.removeCascade, "request_note", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function approval_request_removeSuccess(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.remove->approval_request_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, approval_request_removeTransactioncallback, approval_request_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes approval_request using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function approval_requestTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK -> approval_requestTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.approval_attachment.removeCascade,"approval_attachment",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("request_id") ;
			targetAttributes.push("id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.attribute.removeCascade,"attribute",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.request_approver.removeCascade,"request_approver",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("category_id") ;
			targetAttributes.push("id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.request_category.removeCascade,"request_category",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("request_id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.request_note.removeCascade,"request_note",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function approval_requestErrorCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK -> approval_requestErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function approval_requestSuccessCallback(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK -> approval_requestSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_request.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, approval_requestTransactionCallback, approval_requestSuccessCallback, approval_requestErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes approval_request(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function approval_request_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.approval_attachment.removeCascade, "approval_attachment", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("request_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute.removeCascade, "attribute", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_approver.removeCascade, "request_approver", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("category_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_category.removeCascade, "request_category", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("request_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_note.removeCascade, "request_note", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function approval_request_removeSuccess(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.remove->approval_request_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, approval_request_removeTransactioncallback, approval_request_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves approval_request using primary key from the local Database. 
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	var wcs = [];
	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.MYAPPROVALS.approval_request.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves approval_request(s) using where clause from the local Database. 
* e.g. com.kony.MYAPPROVALS.approval_request.find("where category_id like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_request.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of approval_request with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.MYAPPROVALS.approval_request.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of approval_request matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_request.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of approval_request pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_request.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of approval_request pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_request.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of approval_request deferred for upload.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_request.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to approval_request in local database to last synced state
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to approval_request's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	var wcs = [];
	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_request.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether approval_request's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether approval_request's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_request.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYAPPROVALS.approval_request.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of approval_attachment related to approval_request
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.approval_request.prototype.getapproval_attachmentWithapproval_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getapproval_attachmentWithapproval_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getapproval_attachmentWithapproval_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getapproval_attachmentWithapproval_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getapproval_attachmentWithapproval_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getapproval_attachmentWithapproval_id",  "relationship", errorcallback)){
		return;
	}	
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].id;				
			wcs.push({key:"approval_id", value:targetKey_0});		
			
			var tbname = "approval_attachment"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.approval_attachment.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.approval_attachment();
				obj.approval_detail_id = res[i].approval_detail_id;
				obj.approval_id = res[i].approval_id;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.media_id = res[i].media_id;
				obj.softdeleteflag = res[i].softdeleteflag;
				obj.type_id = res[i].type_id;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of approval_attachment related to approval_request
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.getCountOfapproval_attachmentWithapproval_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getCountOfapproval_attachmentWithapproval_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getCountOfapproval_attachmentWithapproval_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getCountOfapproval_attachmentWithapproval_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getCountOfapproval_attachmentWithapproval_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getCountOfapproval_attachmentWithapproval_id",  "relationship", errorcallback)){
		return;
	}
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].id;
					targetAttributes.push("approval_id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"approval_id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"approval_id":targetKey_0});
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
		   com.kony.MYAPPROVALS.approval_attachment.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of attribute related to approval_request
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.approval_request.prototype.getattributeWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getattributeWithid function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getattributeWithid(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getattributeWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getattributeWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getattributeWithid",  "relationship", errorcallback)){
		return;
	}	
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].request_id;				
			wcs.push({key:"id", value:targetKey_0});		
			
			var tbname = "attribute"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.attribute.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.attribute();
				obj.approval_detail_id = res[i].approval_detail_id;
				obj.approval_id = res[i].approval_id;
				obj.attribute_def_id = res[i].attribute_def_id;
				obj.createdts = res[i].createdts;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.softdeleteflag = res[i].softdeleteflag;
				obj.value = res[i].value;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of attribute related to approval_request
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.getCountOfattributeWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getCountOfattributeWithid function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getCountOfattributeWithid(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getCountOfattributeWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getCountOfattributeWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getCountOfattributeWithid",  "relationship", errorcallback)){
		return;
	}
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].request_id;
					targetAttributes.push("id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"id":targetKey_0});
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
		   com.kony.MYAPPROVALS.attribute.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of request_approver related to approval_request
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.approval_request.prototype.getrequest_approverWithapproval_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getrequest_approverWithapproval_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getrequest_approverWithapproval_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getrequest_approverWithapproval_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getrequest_approverWithapproval_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getrequest_approverWithapproval_id",  "relationship", errorcallback)){
		return;
	}	
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].id;				
			wcs.push({key:"approval_id", value:targetKey_0});		
			
			var tbname = "request_approver"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.request_approver.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.request_approver();
				obj.approval_id = res[i].approval_id;
				obj.approver_id = res[i].approver_id;
				obj.createdts = res[i].createdts;
				obj.delegator_id = res[i].delegator_id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.softdeletedflag = res[i].softdeletedflag;
				obj.status_id = res[i].status_id;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of request_approver related to approval_request
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.getCountOfrequest_approverWithapproval_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getCountOfrequest_approverWithapproval_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getCountOfrequest_approverWithapproval_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getCountOfrequest_approverWithapproval_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getCountOfrequest_approverWithapproval_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getCountOfrequest_approverWithapproval_id",  "relationship", errorcallback)){
		return;
	}
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].id;
					targetAttributes.push("approval_id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"approval_id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"approval_id":targetKey_0});
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
		   com.kony.MYAPPROVALS.request_approver.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of request_category related to approval_request
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.approval_request.prototype.getrequest_categoryWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getrequest_categoryWithid function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getrequest_categoryWithid(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getrequest_categoryWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getrequest_categoryWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getrequest_categoryWithid",  "relationship", errorcallback)){
		return;
	}	
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].category_id;				
			wcs.push({key:"id", value:targetKey_0});		
			
			var tbname = "request_category"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.request_category.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.request_category();
				obj.createdts = res[i].createdts;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.name = res[i].name;
				obj.parent_id = res[i].parent_id;
				obj.softdeletedflag = res[i].softdeletedflag;
				obj.type_id = res[i].type_id;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of request_category related to approval_request
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.getCountOfrequest_categoryWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getCountOfrequest_categoryWithid function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getCountOfrequest_categoryWithid(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getCountOfrequest_categoryWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getCountOfrequest_categoryWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getCountOfrequest_categoryWithid",  "relationship", errorcallback)){
		return;
	}
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].category_id;
					targetAttributes.push("id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"id":targetKey_0});
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
		   com.kony.MYAPPROVALS.request_category.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of request_note related to approval_request
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.approval_request.prototype.getrequest_noteWithrequest_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getrequest_noteWithrequest_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getrequest_noteWithrequest_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getrequest_noteWithrequest_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getrequest_noteWithrequest_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getrequest_noteWithrequest_id",  "relationship", errorcallback)){
		return;
	}	
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].id;				
			wcs.push({key:"request_id", value:targetKey_0});		
			
			var tbname = "request_note"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.request_note.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.request_note();
				obj.comment = res[i].comment;
				obj.createdts = res[i].createdts;
				obj.employee_id = res[i].employee_id;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.request_id = res[i].request_id;
				obj.request_type_id = res[i].request_type_id;
				obj.softdeletedflag = res[i].softdeletedflag;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of request_note related to approval_request
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_request.prototype.getCountOfrequest_noteWithrequest_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getCountOfrequest_noteWithrequest_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_request.getCountOfrequest_noteWithrequest_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_request.getCountOfrequest_noteWithrequest_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getCountOfrequest_noteWithrequest_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_request.getCountOfrequest_noteWithrequest_id",  "relationship", errorcallback)){
		return;
	}
	function approval_request_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].id;
					targetAttributes.push("request_id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"request_id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"request_id":targetKey_0});
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
		   com.kony.MYAPPROVALS.request_note.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.approval_request.getAllDetailsByPK(pks, approval_request_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.MYAPPROVALS.approval_request.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.removeCascade function");
	var tbname = com.kony.MYAPPROVALS.approval_request.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.approval_attachment.removeCascade, "approval_attachment", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("request_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute.removeCascade, "attribute", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("approval_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_approver.removeCascade, "request_approver", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("category_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_category.removeCascade, "request_category", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("id") ;
			targetAttributes.push("request_id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.request_note.removeCascade, "request_note", false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.MYAPPROVALS.approval_request.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.MYAPPROVALS.approval_request();
			obj.category_id = res[i].category_id;
			obj.createdts = res[i].createdts;
			obj.Description = res[i].Description;
			obj.due_date = res[i].due_date;
			obj.employee_id = res[i].employee_id;
			obj.id = res[i].id;
			obj.IsLater = res[i].IsLater;
			obj.IsRead = res[i].IsRead;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.media_id = res[i].media_id;
			obj.request_date = res[i].request_date;
			obj.request_id = res[i].request_id;
			obj.softdeletedflag = res[i].softdeletedflag;
			obj.status_id = res[i].status_id;
			obj.type_id = res[i].type_id;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.MYAPPROVALS.approval_request.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.filterAttributes function");
	var attributeTable = {};
	attributeTable.category_id = "category_id";
	attributeTable.createdts = "createdts";
	attributeTable.Description = "Description";
	attributeTable.due_date = "due_date";
	attributeTable.employee_id = "employee_id";
	attributeTable.id = "id";
	attributeTable.IsLater = "IsLater";
	attributeTable.IsRead = "IsRead";
	attributeTable.media_id = "media_id";
	attributeTable.request_date = "request_date";
	attributeTable.request_id = "request_id";
	attributeTable.status_id = "status_id";
	attributeTable.type_id = "type_id";

	var PKTable = {};
	PKTable.id = {}
	PKTable.id.name = "id";
	PKTable.id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject approval_request. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject approval_request. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject approval_request. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.MYAPPROVALS.approval_request.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.MYAPPROVALS.approval_request.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.MYAPPROVALS.approval_request.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.category_id = this.category_id;
	valuesTable.createdts = this.createdts;
	valuesTable.Description = this.Description;
	valuesTable.due_date = this.due_date;
	valuesTable.employee_id = this.employee_id;
	if(isInsert===true){
		valuesTable.id = this.id;
	}
	valuesTable.IsLater = this.IsLater;
	valuesTable.IsRead = this.IsRead;
	valuesTable.media_id = this.media_id;
	valuesTable.request_date = this.request_date;
	valuesTable.request_id = this.request_id;
	valuesTable.status_id = this.status_id;
	valuesTable.type_id = this.type_id;
	return valuesTable;
};

com.kony.MYAPPROVALS.approval_request.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.prototype.getPKTable function");
	var pkTable = {};
	pkTable.id = {key:"id",value:this.id};
	return pkTable;
};

com.kony.MYAPPROVALS.approval_request.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getPKTable function");
	var pkTable = [];
	pkTable.push("id");
	return pkTable;
};

com.kony.MYAPPROVALS.approval_request.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key id not specified in  " + opName + "  an item in approval_request");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"approval_request")));
		return false;	
	}
	else if(kony.sync.isValidJSTable(pks)){
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
			sync.log.error("Primary Key id not specified in  " + opName + "  an item in approval_request");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"approval_request")));
			return false;
		}
	}
	else{
		wc.key = "id";
		wc.value = pks;
	}	
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.MYAPPROVALS.approval_request.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.validateNull function");
	return true;
};

com.kony.MYAPPROVALS.approval_request.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.validateNullInsert function");
	if(kony.sync.isNull(valuestable.id) || kony.sync.isEmptyString(valuestable.id)){
		sync.log.error("Mandatory attribute id is missing for the SyncObject approval_request.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "approval_request", "id")));
		return false;
	}
	return true;
};

com.kony.MYAPPROVALS.approval_request.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_request.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.MYAPPROVALS.approval_request.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.MYAPPROVALS.approval_request.getTableName = function(){
	return "approval_request";
};




// **********************************End approval_request's helper methods************************