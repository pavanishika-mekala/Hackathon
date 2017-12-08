//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:12 IST 2016attribute_def*******************
// **********************************Start attribute_def's helper methods************************
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
* Creates new attribute_def
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def = function(){
	this.attribute_section_id = null;
	this.createdts = null;
	this.data_type_id = null;
	this.default_value = null;
	this.id = null;
	this.label = null;
	this.lastmodifiedts = null;
	this.softdeleteflag = null;
	this.markForUpload = true;
};

com.kony.MYAPPROVALS.attribute_def.prototype = {
	get attribute_section_id(){
		return this._attribute_section_id;
	},
	set attribute_section_id(val){
		this._attribute_section_id = val;
	},
	get createdts(){
		return this._createdts;
	},
	set createdts(val){
		this._createdts = val;
	},
	get data_type_id(){
		return this._data_type_id;
	},
	set data_type_id(val){
		this._data_type_id = val;
	},
	get default_value(){
		return this._default_value;
	},
	set default_value(val){
		this._default_value = val;
	},
	get id(){
		return this._id;
	},
	set id(val){
		this._id = val;
	},
	get label(){
		return this._label;
	},
	set label(val){
		this._label = val;
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
};

/************************************************************************************
* Retrieves all instances of attribute_def SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "attribute_section_id";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "createdts";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.MYAPPROVALS.attribute_def.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	orderByMap = kony.sync.formOrderByClause("attribute_def",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getAll->successcallback");
		successcallback(com.kony.MYAPPROVALS.attribute_def.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of attribute_def present in local database.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getAllCount function");
	com.kony.MYAPPROVALS.attribute_def.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of attribute_def using where clause in the local Database
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getCount->successcallback");
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
* Creates a new instance of attribute_def in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.MYAPPROVALS.attribute_def.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.attribute_def.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"attribute_def",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.MYAPPROVALS.attribute_def.getRelationshipMap(relationshipMap,valuestable);
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
		com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of attribute_def in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].attribute_section_id = "attribute_section_id_0";
*		valuesArray[0].createdts = "createdts_0";
*		valuesArray[0].data_type_id = "data_type_id_0";
*		valuesArray[0].default_value = "default_value_0";
*		valuesArray[0].id = "id_0";
*		valuesArray[0].label = "label_0";
*		valuesArray[1] = {};
*		valuesArray[1].attribute_section_id = "attribute_section_id_1";
*		valuesArray[1].createdts = "createdts_1";
*		valuesArray[1].data_type_id = "data_type_id_1";
*		valuesArray[1].default_value = "default_value_1";
*		valuesArray[1].id = "id_1";
*		valuesArray[1].label = "label_1";
*		valuesArray[2] = {};
*		valuesArray[2].attribute_section_id = "attribute_section_id_2";
*		valuesArray[2].createdts = "createdts_2";
*		valuesArray[2].data_type_id = "data_type_id_2";
*		valuesArray[2].default_value = "default_value_2";
*		valuesArray[2].id = "id_2";
*		valuesArray[2].label = "label_2";
*		com.kony.MYAPPROVALS.attribute_def.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"attribute_def",errorcallback,true)===false){
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
				if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.MYAPPROVALS.attribute_def.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates attribute_def using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.MYAPPROVALS.attribute_def.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.attribute_def.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"attribute_def",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.MYAPPROVALS.attribute_def.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates attribute_def(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"attribute_def",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYAPPROVALS.attribute_def.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.MYAPPROVALS.attribute_def.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.MYAPPROVALS.attribute_def.getPKTable());
	}
};

/************************************************************************************
* Updates attribute_def(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.attribute_section_id = "attribute_section_id_updated0";
*		inputArray[0].changeSet.createdts = "createdts_updated0";
*		inputArray[0].changeSet.data_type_id = "data_type_id_updated0";
*		inputArray[0].changeSet.default_value = "default_value_updated0";
*		inputArray[0].whereClause = "where id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.attribute_section_id = "attribute_section_id_updated1";
*		inputArray[1].changeSet.createdts = "createdts_updated1";
*		inputArray[1].changeSet.data_type_id = "data_type_id_updated1";
*		inputArray[1].changeSet.default_value = "default_value_updated1";
*		inputArray[1].whereClause = "where id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.attribute_section_id = "attribute_section_id_updated2";
*		inputArray[2].changeSet.createdts = "createdts_updated2";
*		inputArray[2].changeSet.data_type_id = "data_type_id_updated2";
*		inputArray[2].changeSet.default_value = "default_value_updated2";
*		inputArray[2].whereClause = "where id = '2'";
*		com.kony.MYAPPROVALS.attribute_def.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "attribute_def";
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
			if(kony.sync.attributeValidation(valuestable,"attribute_def",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.MYAPPROVALS.attribute_def.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.MYAPPROVALS.attribute_def.getPKTable());
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
		sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.MYAPPROVALS.attribute_def.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes attribute_def using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.MYAPPROVALS.attribute_def.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function attribute_defTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.deleteByPK->attribute_def_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("attribute_def_id");
 		targetAttributes.push("id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.MYAPPROVALS.attribute.removeCascade,"attribute",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("attribute_section_id") ;
			targetAttributes.push("id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.attribute_section.removeCascade,"attribute_section",false, errorcallback, markForUpload, record, false)){
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
	
	function attribute_defErrorCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.attribute_def.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function attribute_defSuccessCallback(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.attribute_def.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, attribute_defTransactionCallback, attribute_defSuccessCallback, attribute_defErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes attribute_def(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.MYAPPROVALS.attribute_def.remove("where attribute_section_id like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function attribute_def_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("attribute_section_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute_section.removeCascade, "attribute_section", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("attribute_def_id");
 		targetAttributes.push("id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute.removeCascade,"attribute",false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function attribute_def_removeSuccess(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.remove->attribute_def_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, attribute_def_removeTransactioncallback, attribute_def_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes attribute_def using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function attribute_defTransactionCallback(tx){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK -> attribute_defTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("attribute_def_id");
 		targetAttributes.push("id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.MYAPPROVALS.attribute.removeCascade,"attribute",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("attribute_section_id") ;
			targetAttributes.push("id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.MYAPPROVALS.attribute_section.removeCascade,"attribute_section",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function attribute_defErrorCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK -> attribute_defErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function attribute_defSuccessCallback(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK -> attribute_defSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.attribute_def.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, attribute_defTransactionCallback, attribute_defSuccessCallback, attribute_defErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes attribute_def(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function attribute_def_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("attribute_section_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute_section.removeCascade, "attribute_section", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("attribute_def_id");
 		targetAttributes.push("id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute.removeCascade,"attribute",false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function attribute_def_removeSuccess(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.remove->attribute_def_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, attribute_def_removeTransactioncallback, attribute_def_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves attribute_def using primary key from the local Database. 
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	var wcs = [];
	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.MYAPPROVALS.attribute_def.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves attribute_def(s) using where clause from the local Database. 
* e.g. com.kony.MYAPPROVALS.attribute_def.find("where attribute_section_id like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.attribute_def.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of attribute_def with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of attribute_def matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.attribute_def.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of attribute_def pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.attribute_def.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of attribute_def pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.attribute_def.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of attribute_def deferred for upload.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.MYAPPROVALS.attribute_def.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to attribute_def in local database to last synced state
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to attribute_def's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	var wcs = [];
	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.MYAPPROVALS.attribute_def.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether attribute_def's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether attribute_def's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.MYAPPROVALS.attribute_def.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.MYAPPROVALS.attribute_def.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of attribute_section related to attribute_def
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.attribute_def.prototype.getattribute_sectionWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.getattribute_sectionWithid function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.getattribute_sectionWithid(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.getattribute_sectionWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getattribute_sectionWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.getattribute_sectionWithid",  "relationship", errorcallback)){
		return;
	}	
	function attribute_def_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].attribute_section_id;				
			wcs.push({key:"id", value:targetKey_0});		
			
			var tbname = "attribute_section"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.attribute_section.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.attribute_section();
				obj.createdts = res[i].createdts;
				obj.description = res[i].description;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.request_type_id = res[i].request_type_id;
				obj.softdeletedflag = res[i].softdeletedflag;
				obj.TYPE = res[i].TYPE;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK(pks, attribute_def_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of attribute_section related to attribute_def
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.getCountOfattribute_sectionWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.getCountOfattribute_sectionWithid function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.getCountOfattribute_sectionWithid(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.getCountOfattribute_sectionWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getCountOfattribute_sectionWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.getCountOfattribute_sectionWithid",  "relationship", errorcallback)){
		return;
	}
	function attribute_def_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].attribute_section_id;
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
		   com.kony.MYAPPROVALS.attribute_section.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK(pks, attribute_def_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of data_type related to attribute_def
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.MYAPPROVALS.attribute_def.prototype.getdata_typeWithdata_type_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.getdata_typeWithdata_type_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.getdata_typeWithdata_type_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.getdata_typeWithdata_type_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getdata_typeWithdata_type_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.getdata_typeWithdata_type_id",  "relationship", errorcallback)){
		return;
	}	
	function attribute_def_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].data_type_id;				
			wcs.push({key:"id", value:targetKey_0});		
			
			var tbname = "data_type"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.MYAPPROVALS.data_type.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.MYAPPROVALS.data_type();
				obj.createdts = res[i].createdts;
				obj.description = res[i].description;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.softdeletedlag = res[i].softdeletedlag;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK(pks, attribute_def_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of data_type related to attribute_def
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.MYAPPROVALS.attribute_def.prototype.getCountOfdata_typeWithdata_type_id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.getCountOfdata_typeWithdata_type_id function");
	var pks = this.getPKTable();
	com.kony.MYAPPROVALS.attribute_def.getCountOfdata_typeWithdata_type_id(pks,successcallback,errorcallback);
};
com.kony.MYAPPROVALS.attribute_def.getCountOfdata_typeWithdata_type_id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getCountOfdata_typeWithdata_type_id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.MYAPPROVALS.attribute_def.getCountOfdata_typeWithdata_type_id",  "relationship", errorcallback)){
		return;
	}
	function attribute_def_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].data_type_id;
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
		   com.kony.MYAPPROVALS.data_type.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.MYAPPROVALS.attribute_def.getAllDetailsByPK(pks, attribute_def_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.MYAPPROVALS.attribute_def.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.removeCascade function");
	var tbname = com.kony.MYAPPROVALS.attribute_def.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("attribute_section_id") ;
			targetAttributes.push("id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute_section.removeCascade, "attribute_section", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("attribute_def_id");
 		targetAttributes.push("id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.MYAPPROVALS.attribute.removeCascade,"attribute",false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.MYAPPROVALS.attribute_def.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.MYAPPROVALS.attribute_def();
			obj.attribute_section_id = res[i].attribute_section_id;
			obj.createdts = res[i].createdts;
			obj.data_type_id = res[i].data_type_id;
			obj.default_value = res[i].default_value;
			obj.id = res[i].id;
			obj.label = res[i].label;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.softdeleteflag = res[i].softdeleteflag;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.MYAPPROVALS.attribute_def.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.filterAttributes function");
	var attributeTable = {};
	attributeTable.attribute_section_id = "attribute_section_id";
	attributeTable.createdts = "createdts";
	attributeTable.data_type_id = "data_type_id";
	attributeTable.default_value = "default_value";
	attributeTable.id = "id";
	attributeTable.label = "label";

	var PKTable = {};
	PKTable.id = {}
	PKTable.id.name = "id";
	PKTable.id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject attribute_def. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject attribute_def. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject attribute_def. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.MYAPPROVALS.attribute_def.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.MYAPPROVALS.attribute_def.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.MYAPPROVALS.attribute_def.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.attribute_section_id = this.attribute_section_id;
	valuesTable.createdts = this.createdts;
	valuesTable.data_type_id = this.data_type_id;
	valuesTable.default_value = this.default_value;
	if(isInsert===true){
		valuesTable.id = this.id;
	}
	valuesTable.label = this.label;
	return valuesTable;
};

com.kony.MYAPPROVALS.attribute_def.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.prototype.getPKTable function");
	var pkTable = {};
	pkTable.id = {key:"id",value:this.id};
	return pkTable;
};

com.kony.MYAPPROVALS.attribute_def.getPKTable = function(){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getPKTable function");
	var pkTable = [];
	pkTable.push("id");
	return pkTable;
};

com.kony.MYAPPROVALS.attribute_def.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key id not specified in  " + opName + "  an item in attribute_def");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"attribute_def")));
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
			sync.log.error("Primary Key id not specified in  " + opName + "  an item in attribute_def");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"attribute_def")));
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

com.kony.MYAPPROVALS.attribute_def.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.validateNull function");
	return true;
};

com.kony.MYAPPROVALS.attribute_def.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.validateNullInsert function");
	if(kony.sync.isNull(valuestable.id) || kony.sync.isEmptyString(valuestable.id)){
		sync.log.error("Mandatory attribute id is missing for the SyncObject attribute_def.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "attribute_def", "id")));
		return false;
	}
	return true;
};

com.kony.MYAPPROVALS.attribute_def.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.MYAPPROVALS.attribute_def.getRelationshipMap function");
	var r1 = {};

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.data_type_id)){
		r1.sourceAttribute.push("id") ;
		r1.foreignKeyAttribute.push("data_type_id") ;
		r1.targetAttributeValue.push("'" + valuestable.data_type_id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.data_type===undefined){
			relationshipMap.data_type = [];
		}
		relationshipMap.data_type.push(r1);
	}
		
	return relationshipMap;
};


com.kony.MYAPPROVALS.attribute_def.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.MYAPPROVALS.attribute_def.getTableName = function(){
	return "attribute_def";
};




// **********************************End attribute_def's helper methods************************