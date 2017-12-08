//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:12 IST 2016approval_attachment*******************
// **********************************Start approval_attachment's helper methods************************
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
* Creates new approval_attachment
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment = function(){
	this.approval_detail_id = null;
	this.approval_id = null;
	this.id = null;
	this.lastmodifiedts = null;
	this.media_id = null;
	this.softdeleteflag = null;
	this.type_id = null;
	this.markForUpload = true;
};

com.kony.MYAPPROVALS.approval_attachment.prototype = {
	get approval_detail_id(){
		return this._approval_detail_id;
	},
	set approval_detail_id(val){
		this._approval_detail_id = val;
	},
	get approval_id(){
		return this._approval_id;
	},
	set approval_id(val){
		this._approval_id = val;
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
	get media_id(){
		return this._media_id;
	},
	set media_id(val){
		this._media_id = val;
	},
	get softdeleteflag(){
		return this._softdeleteflag;
	},
	set softdeleteflag(val){
		this._softdeleteflag = val;
	},
	get type_id(){
		return this._type_id;
	},
	set type_id(val){
		this._type_id = val;
	},
};

/************************************************************************************
* Retrieves all instances of approval_attachment SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "approval_detail_id";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "approval_id";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.MYAPPROVALS.approval_attachment.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	orderByMap = kony.sync.formOrderByClause("approval_attachment",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getAll->successcallback");
		successcallback(com.kony.MYAPPROVALS.approval_attachment.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of approval_attachment present in local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getAllCount function");
	com.kony.MYAPPROVALS.approval_attachment.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of approval_attachment using where clause in the local Database
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getCount->successcallback");
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
* Creates a new instance of approval_attachment in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.MYAPPROVALS.approval_attachment.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.approval_attachment.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"approval_attachment",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.MYAPPROVALS.approval_attachment.getRelationshipMap(relationshipMap,valuestable);
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
		com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of approval_attachment in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].approval_detail_id = "approval_detail_id_0";
*		valuesArray[0].approval_id = "approval_id_0";
*		valuesArray[0].id = "id_0";
*		valuesArray[0].media_id = "media_id_0";
*		valuesArray[0].type_id = "type_id_0";
*		valuesArray[1] = {};
*		valuesArray[1].approval_detail_id = "approval_detail_id_1";
*		valuesArray[1].approval_id = "approval_id_1";
*		valuesArray[1].id = "id_1";
*		valuesArray[1].media_id = "media_id_1";
*		valuesArray[1].type_id = "type_id_1";
*		valuesArray[2] = {};
*		valuesArray[2].approval_detail_id = "approval_detail_id_2";
*		valuesArray[2].approval_id = "approval_id_2";
*		valuesArray[2].id = "id_2";
*		valuesArray[2].media_id = "media_id_2";
*		valuesArray[2].type_id = "type_id_2";
*		com.kony.MYAPPROVALS.approval_attachment.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"approval_attachment",errorcallback,true)===false){
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
				if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.MYAPPROVALS.approval_attachment.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates approval_attachment using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.MYAPPROVALS.approval_attachment.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.approval_attachment.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"approval_attachment",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.MYAPPROVALS.approval_attachment.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates approval_attachment(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"approval_attachment",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYAPPROVALS.approval_attachment.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.MYAPPROVALS.approval_attachment.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYAPPROVALS.approval_attachment.getPKTable());
	}
};

/************************************************************************************
* Updates approval_attachment(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.approval_detail_id = "approval_detail_id_updated0";
*		inputArray[0].changeSet.approval_id = "approval_id_updated0";
*		inputArray[0].changeSet.media_id = "media_id_updated0";
*		inputArray[0].changeSet.type_id = "type_id_updated0";
*		inputArray[0].whereClause = "where id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.approval_detail_id = "approval_detail_id_updated1";
*		inputArray[1].changeSet.approval_id = "approval_id_updated1";
*		inputArray[1].changeSet.media_id = "media_id_updated1";
*		inputArray[1].changeSet.type_id = "type_id_updated1";
*		inputArray[1].whereClause = "where id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.approval_detail_id = "approval_detail_id_updated2";
*		inputArray[2].changeSet.approval_id = "approval_id_updated2";
*		inputArray[2].changeSet.media_id = "media_id_updated2";
*		inputArray[2].changeSet.type_id = "type_id_updated2";
*		inputArray[2].whereClause = "where id = '2'";
*		com.kony.MYAPPROVALS.approval_attachment.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "approval_attachment";
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
			if(kony.sync.attributeValidation(valuestable,"approval_attachment",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.MYAPPROVALS.approval_attachment.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.MYAPPROVALS.approval_attachment.getPKTable());
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.MYAPPROVALS.approval_attachment.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes approval_attachment using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.approval_attachment.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function approval_attachmentTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.deleteByPK->approval_attachment_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("media_id") ;
			targetAttributes.push("name") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.ApprovalMedia.removeCascade,"ApprovalMedia",false, errorcallback, markForUpload, record, false)){
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
	
	function approval_attachmentErrorCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_attachment.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function approval_attachmentSuccessCallback(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_attachment.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, approval_attachmentTransactionCallback, approval_attachmentSuccessCallback, approval_attachmentErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes approval_attachment(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.MYAPPROVALS.approval_attachment.remove("where approval_detail_id like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function approval_attachment_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("media_id") ;
			targetAttributes.push("name") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.ApprovalMedia.removeCascade, "ApprovalMedia", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function approval_attachment_removeSuccess(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.remove->approval_attachment_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, approval_attachment_removeTransactioncallback, approval_attachment_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes approval_attachment using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function approval_attachmentTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK -> approval_attachmentTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("media_id") ;
			targetAttributes.push("name") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.ApprovalMedia.removeCascade,"ApprovalMedia",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function approval_attachmentErrorCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK -> approval_attachmentErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function approval_attachmentSuccessCallback(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK -> approval_attachmentSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, approval_attachmentTransactionCallback, approval_attachmentSuccessCallback, approval_attachmentErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes approval_attachment(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function approval_attachment_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("media_id") ;
			targetAttributes.push("name") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.ApprovalMedia.removeCascade, "ApprovalMedia", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function approval_attachment_removeSuccess(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.remove->approval_attachment_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, approval_attachment_removeTransactioncallback, approval_attachment_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves approval_attachment using primary key from the local Database. 
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	var wcs = [];
	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.MYAPPROVALS.approval_attachment.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves approval_attachment(s) using where clause from the local Database. 
* e.g. com.kony.MYAPPROVALS.approval_attachment.find("where approval_detail_id like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_attachment.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of approval_attachment with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of approval_attachment matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_attachment.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of approval_attachment pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_attachment.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of approval_attachment pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_attachment.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of approval_attachment deferred for upload.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.approval_attachment.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to approval_attachment in local database to last synced state
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to approval_attachment's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	var wcs = [];
	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.approval_attachment.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether approval_attachment's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether approval_attachment's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.approval_attachment.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYAPPROVALS.approval_attachment.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of ApprovalMedia related to approval_attachment
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.approval_attachment.prototype.getApprovalMediaWithname  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.getApprovalMediaWithname function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.getApprovalMediaWithname(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.getApprovalMediaWithname = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getApprovalMediaWithname function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.getApprovalMediaWithname",  "relationship", errorcallback)){
		return;
	}	
	function approval_attachment_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].media_id;				
			wcs.push({key:"name", value:targetKey_0});		
			
			var tbname = "ApprovalMedia"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.ApprovalMedia.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.ApprovalMedia();
				obj.classField = res[i].classField;
				obj.classValue = res[i].classValue;
				obj.description = res[i].description;
				obj.extension = res[i].extension;
				obj.group = res[i].group;
				obj.name = res[i].name;
				obj.ondemand = res[i].ondemand;
				obj.type = res[i].type;
				obj.url = res[i].url;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK(pks, approval_attachment_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of ApprovalMedia related to approval_attachment
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.getCountOfApprovalMediaWithname  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.getCountOfApprovalMediaWithname function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.getCountOfApprovalMediaWithname(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.getCountOfApprovalMediaWithname = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getCountOfApprovalMediaWithname function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.getCountOfApprovalMediaWithname",  "relationship", errorcallback)){
		return;
	}
	function approval_attachment_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].media_id;
					targetAttributes.push("name");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"name":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"name":targetKey_0});
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
		   com.kony.MYAPPROVALS.ApprovalMedia.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK(pks, approval_attachment_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of attachment_type related to approval_attachment
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.approval_attachment.prototype.getattachment_typeWithtype_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.getattachment_typeWithtype_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.getattachment_typeWithtype_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.getattachment_typeWithtype_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getattachment_typeWithtype_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.getattachment_typeWithtype_id",  "relationship", errorcallback)){
		return;
	}	
	function approval_attachment_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].type_id;				
			wcs.push({key:"id", value:targetKey_0});		
			
			var tbname = "attachment_type"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.attachment_type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.attachment_type();
				obj.createdts = res[i].createdts;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.name = res[i].name;
				obj.SoftdeleteFlag = res[i].SoftdeleteFlag;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK(pks, approval_attachment_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of attachment_type related to approval_attachment
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.approval_attachment.prototype.getCountOfattachment_typeWithtype_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.getCountOfattachment_typeWithtype_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.approval_attachment.getCountOfattachment_typeWithtype_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.approval_attachment.getCountOfattachment_typeWithtype_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getCountOfattachment_typeWithtype_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.approval_attachment.getCountOfattachment_typeWithtype_id",  "relationship", errorcallback)){
		return;
	}
	function approval_attachment_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].type_id;
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
		   com.kony.MYAPPROVALS.attachment_type.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.approval_attachment.getAllDetailsByPK(pks, approval_attachment_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.MYAPPROVALS.approval_attachment.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.removeCascade function");
	var tbname = com.kony.MYAPPROVALS.approval_attachment.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("media_id") ;
			targetAttributes.push("name") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.ApprovalMedia.removeCascade, "ApprovalMedia", false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.MYAPPROVALS.approval_attachment.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.convertTableToObject function");
	objMap = [];
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
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.MYAPPROVALS.approval_attachment.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.filterAttributes function");
	var attributeTable = {};
	attributeTable.approval_detail_id = "approval_detail_id";
	attributeTable.approval_id = "approval_id";
	attributeTable.id = "id";
	attributeTable.media_id = "media_id";
	attributeTable.type_id = "type_id";

	var PKTable = {};
	PKTable.id = {}
	PKTable.id.name = "id";
	PKTable.id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject approval_attachment. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject approval_attachment. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject approval_attachment. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.MYAPPROVALS.approval_attachment.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.MYAPPROVALS.approval_attachment.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.MYAPPROVALS.approval_attachment.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.approval_detail_id = this.approval_detail_id;
	valuesTable.approval_id = this.approval_id;
	if(isInsert===true){
		valuesTable.id = this.id;
	}
	valuesTable.media_id = this.media_id;
	valuesTable.type_id = this.type_id;
	return valuesTable;
};

com.kony.MYAPPROVALS.approval_attachment.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.prototype.getPKTable function");
	var pkTable = {};
	pkTable.id = {key:"id",value:this.id};
	return pkTable;
};

com.kony.MYAPPROVALS.approval_attachment.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getPKTable function");
	var pkTable = [];
	pkTable.push("id");
	return pkTable;
};

com.kony.MYAPPROVALS.approval_attachment.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key id not specified in  " + opName + "  an item in approval_attachment");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"approval_attachment")));
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
			sync.log.error("Primary Key id not specified in  " + opName + "  an item in approval_attachment");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"approval_attachment")));
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

com.kony.MYAPPROVALS.approval_attachment.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.validateNull function");
	return true;
};

com.kony.MYAPPROVALS.approval_attachment.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.validateNullInsert function");
	if(kony.sync.isNull(valuestable.id) || kony.sync.isEmptyString(valuestable.id)){
		sync.log.error("Mandatory attribute id is missing for the SyncObject approval_attachment.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "approval_attachment", "id")));
		return false;
	}
	return true;
};

com.kony.MYAPPROVALS.approval_attachment.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.MYAPPROVALS.approval_attachment.getRelationshipMap function");
	var r1 = {};
	r1 = {};
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];
	r1.targetAttributeValue  = [];
		
	if (!kony.sync.isNullOrUndefined(valuestable.approval_id)){
		r1.sourceAttribute.push("id");
		r1.foreignKeyAttribute.push("approval_id");
		r1.targetAttributeValue.push("'" + valuestable.approval_id + "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.approval_request===undefined){
			relationshipMap.approval_request = [];
		}
		relationshipMap.approval_request.push(r1);
	}
	

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.type_id)){
		r1.sourceAttribute.push("id") ;
		r1.foreignKeyAttribute.push("type_id") ;
		r1.targetAttributeValue.push("'" + valuestable.type_id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.attachment_type===undefined){
			relationshipMap.attachment_type = [];
		}
		relationshipMap.attachment_type.push(r1);
	}
		
	return relationshipMap;
};


com.kony.MYAPPROVALS.approval_attachment.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.MYAPPROVALS.approval_attachment.getTableName = function(){
	return "approval_attachment";
};




// **********************************End approval_attachment's helper methods************************