//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:10 IST 2016event*******************
// **********************************Start event's helper methods************************
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
* Creates new event
*************************************************************************************/
com.kony.MYLEAVE.event = function(){
	this.createdts = null;
	this.holiday_date = null;
	this.id = null;
	this.lastmodifiedts = null;
	this.name = null;
	this.region_id = null;
	this.sofsdeleteflag = null;
	this.type_id = null;
	this.markForUpload = true;
};

com.kony.MYLEAVE.event.prototype = {
	get createdts(){
		return this._createdts;
	},
	set createdts(val){
		this._createdts = val;
	},
	get holiday_date(){
		return this._holiday_date;
	},
	set holiday_date(val){
		this._holiday_date = val;
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
	get name(){
		return this._name;
	},
	set name(val){
		this._name = val;
	},
	get region_id(){
		return this._region_id;
	},
	set region_id(val){
		this._region_id = val;
	},
	get sofsdeleteflag(){
		return this._sofsdeleteflag;
	},
	set sofsdeleteflag(val){
		this._sofsdeleteflag = val;
	},
	get type_id(){
		return this._type_id;
	},
	set type_id(val){
		this._type_id = val;
	},
};

/************************************************************************************
* Retrieves all instances of event SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "createdts";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "holiday_date";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.MYLEAVE.event.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.MYLEAVE.event.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	orderByMap = kony.sync.formOrderByClause("event",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.event.getAll->successcallback");
		successcallback(com.kony.MYLEAVE.event.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of event present in local database.
*************************************************************************************/
com.kony.MYLEAVE.event.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getAllCount function");
	com.kony.MYLEAVE.event.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of event using where clause in the local Database
*************************************************************************************/
com.kony.MYLEAVE.event.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.MYLEAVE.event.getCount->successcallback");
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
* Creates a new instance of event in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.event.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.MYLEAVE.event.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYLEAVE.event.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.MYLEAVE.event.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"event",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYLEAVE.event.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.MYLEAVE.event.getRelationshipMap(relationshipMap,valuestable);
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
		errMsg = errMsg + ", region_id=" + valuestable.region_id;
		pks["region_id"] = {key:"region_id",value:valuestable.region_id};
		com.kony.MYLEAVE.event.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of event in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].createdts = "createdts_0";
*		valuesArray[0].holiday_date = "holiday_date_0";
*		valuesArray[0].id = "id_0";
*		valuesArray[0].name = "name_0";
*		valuesArray[0].region_id = "region_id_0";
*		valuesArray[0].type_id = "type_id_0";
*		valuesArray[1] = {};
*		valuesArray[1].createdts = "createdts_1";
*		valuesArray[1].holiday_date = "holiday_date_1";
*		valuesArray[1].id = "id_1";
*		valuesArray[1].name = "name_1";
*		valuesArray[1].region_id = "region_id_1";
*		valuesArray[1].type_id = "type_id_1";
*		valuesArray[2] = {};
*		valuesArray[2].createdts = "createdts_2";
*		valuesArray[2].holiday_date = "holiday_date_2";
*		valuesArray[2].id = "id_2";
*		valuesArray[2].name = "name_2";
*		valuesArray[2].region_id = "region_id_2";
*		valuesArray[2].type_id = "type_id_2";
*		com.kony.MYLEAVE.event.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.MYLEAVE.event.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.event.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"event",errorcallback,true)===false){
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
				errMsg = errMsg + ", region_id=" + valuestable.region_id;
				pks["region_id"] = {key:"region_id",value:valuestable.region_id};
				var wcs = [];
				if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.MYLEAVE.event.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.MYLEAVE.event.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.MYLEAVE.event.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates event using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.event.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.MYLEAVE.event.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYLEAVE.event.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.MYLEAVE.event.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"event",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.MYLEAVE.event.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates event(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.event.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.event.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"event",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYLEAVE.event.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYLEAVE.event.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.MYLEAVE.event.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYLEAVE.event.getPKTable());
	}
};

/************************************************************************************
* Updates event(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.createdts = "createdts_updated0";
*		inputArray[0].changeSet.holiday_date = "holiday_date_updated0";
*		inputArray[0].changeSet.name = "name_updated0";
*		inputArray[0].changeSet.type_id = "type_id_updated0";
*		inputArray[0].whereClause = "where id = '0'";
*		inputArray[0].whereClause = "where region_id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.createdts = "createdts_updated1";
*		inputArray[1].changeSet.holiday_date = "holiday_date_updated1";
*		inputArray[1].changeSet.name = "name_updated1";
*		inputArray[1].changeSet.type_id = "type_id_updated1";
*		inputArray[1].whereClause = "where id = '1'";
*		inputArray[1].whereClause = "where region_id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.createdts = "createdts_updated2";
*		inputArray[2].changeSet.holiday_date = "holiday_date_updated2";
*		inputArray[2].changeSet.name = "name_updated2";
*		inputArray[2].changeSet.type_id = "type_id_updated2";
*		inputArray[2].whereClause = "where id = '2'";
*		inputArray[2].whereClause = "where region_id = '2'";
*		com.kony.MYLEAVE.event.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.MYLEAVE.event.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.MYLEAVE.event.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "event";
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
			if(kony.sync.attributeValidation(valuestable,"event",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.MYLEAVE.event.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.MYLEAVE.event.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.MYLEAVE.event.getPKTable());
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
		sync.log.trace("Entering  com.kony.MYLEAVE.event.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.MYLEAVE.event.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes event using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.event.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.MYLEAVE.event.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.event.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function eventTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYLEAVE.event.deleteByPK->event_PKPresent successcallback");
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
	
	function eventErrorCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.event.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function eventSuccessCallback(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.event.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, eventTransactionCallback, eventSuccessCallback, eventErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes event(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.MYLEAVE.event.remove("where createdts like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.MYLEAVE.event.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYLEAVE.event.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function event_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function event_removeSuccess(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.remove->event_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, event_removeTransactioncallback, event_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes event using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.event.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.event.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function eventTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYLEAVE.event.removeDeviceInstanceByPK -> eventTransactionCallback");
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
	
	function eventErrorCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.event.removeDeviceInstanceByPK -> eventErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function eventSuccessCallback(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.removeDeviceInstanceByPK -> eventSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.event.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, eventTransactionCallback, eventSuccessCallback, eventErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes event(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYLEAVE.event.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function event_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function event_removeSuccess(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.remove->event_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYLEAVE.event.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, event_removeTransactioncallback, event_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves event using primary key from the local Database. 
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.event.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.event.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	var wcs = [];
	if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.MYLEAVE.event.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.MYLEAVE.event.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves event(s) using where clause from the local Database. 
* e.g. com.kony.MYLEAVE.event.find("where createdts like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.MYLEAVE.event.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.event.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of event with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.event.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.MYLEAVE.event.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.MYLEAVE.event.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of event matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYLEAVE.event.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
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
		sync.log.trace("Entering com.kony.MYLEAVE.event.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.MYLEAVE.event.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.MYLEAVE.event.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of event pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.MYLEAVE.event.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
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
		sync.log.trace("Entering com.kony.MYLEAVE.event.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.event.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of event pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.MYLEAVE.event.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.event.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.event.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of event deferred for upload.
*************************************************************************************/
com.kony.MYLEAVE.event.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
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
		sync.log.trace("Entering com.kony.MYLEAVE.event.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYLEAVE.event.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to event in local database to last synced state
*************************************************************************************/
com.kony.MYLEAVE.event.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.event.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to event's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.event.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.event.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	var wcs = [];
	if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYLEAVE.event.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYLEAVE.event.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether event's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.event.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.event.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.event.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYLEAVE.event.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether event's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.MYLEAVE.event.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYLEAVE.event.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.MYLEAVE.event.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.MYLEAVE.event.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYLEAVE.event.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYLEAVE.event.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYLEAVE.event.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYLEAVE.event.isRecordPendingForUpload->successcallback function");
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
com.kony.MYLEAVE.event.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.MYLEAVE.event.removeCascade function");
	var tbname = com.kony.MYLEAVE.event.getTableName();
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


com.kony.MYLEAVE.event.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.MYLEAVE.event.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.MYLEAVE.event();
			obj.createdts = res[i].createdts;
			obj.holiday_date = res[i].holiday_date;
			obj.id = res[i].id;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.name = res[i].name;
			obj.region_id = res[i].region_id;
			obj.sofsdeleteflag = res[i].sofsdeleteflag;
			obj.type_id = res[i].type_id;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.MYLEAVE.event.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.MYLEAVE.event.filterAttributes function");
	var attributeTable = {};
	attributeTable.createdts = "createdts";
	attributeTable.holiday_date = "holiday_date";
	attributeTable.id = "id";
	attributeTable.name = "name";
	attributeTable.region_id = "region_id";
	attributeTable.type_id = "type_id";

	var PKTable = {};
	PKTable.id = {}
	PKTable.id.name = "id";
	PKTable.id.isAutoGen = false;
	PKTable.region_id = {}
	PKTable.region_id.name = "region_id";
	PKTable.region_id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject event. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject event. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject event. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.MYLEAVE.event.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.MYLEAVE.event.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.MYLEAVE.event.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.MYLEAVE.event.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.MYLEAVE.event.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.createdts = this.createdts;
	valuesTable.holiday_date = this.holiday_date;
	if(isInsert===true){
		valuesTable.id = this.id;
	}
	valuesTable.name = this.name;
	if(isInsert===true){
		valuesTable.region_id = this.region_id;
	}
	valuesTable.type_id = this.type_id;
	return valuesTable;
};

com.kony.MYLEAVE.event.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYLEAVE.event.prototype.getPKTable function");
	var pkTable = {};
	pkTable.id = {key:"id",value:this.id};
	pkTable.region_id = {key:"region_id",value:this.region_id};
	return pkTable;
};

com.kony.MYLEAVE.event.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getPKTable function");
	var pkTable = [];
	pkTable.push("id");
	pkTable.push("region_id");
	return pkTable;
};

com.kony.MYLEAVE.event.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.MYLEAVE.event.pkCheck function");
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
		sync.log.error("Primary Key id not specified in " + opName + " an item in event");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"event")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.region_id)){
		if(!kony.sync.isNull(pks.region_id.value)){
			wc.key = "region_id";
			wc.value = pks.region_id.value;
		}
		else{
			wc.key = "region_id";
			wc.value = pks.region_id;
		}
	}else{
		sync.log.error("Primary Key region_id not specified in " + opName + " an item in event");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("region_id",opName,"event")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.MYLEAVE.event.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.validateNull function");
	return true;
};

com.kony.MYLEAVE.event.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYLEAVE.event.validateNullInsert function");
	if(kony.sync.isNull(valuestable.id) || kony.sync.isEmptyString(valuestable.id)){
		sync.log.error("Mandatory attribute id is missing for the SyncObject event.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "event", "id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.region_id) || kony.sync.isEmptyString(valuestable.region_id)){
		sync.log.error("Mandatory attribute region_id is missing for the SyncObject event.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "event", "region_id")));
		return false;
	}
	return true;
};

com.kony.MYLEAVE.event.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.MYLEAVE.event.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.MYLEAVE.event.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.MYLEAVE.event.getTableName = function(){
	return "event";
};




// **********************************End event's helper methods************************