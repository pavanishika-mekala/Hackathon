//****************Sync Version:Sync-Dev-8.0.0_v201711101237_r14*******************
// ****************Generated On Wed Nov 29 10:59:54 UTC 2017TEAM_VIEW*******************
// **********************************Start TEAM_VIEW's helper methods************************
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
if(typeof(com.kony.TeamViewService)=== "undefined"){ com.kony.TeamViewService = {}; }

/************************************************************************************
* Creates new TEAM_VIEW
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW = function(){
	this.DELETE_IND = null;
	this.EMPNUMBER = null;
	this.EXTRACT_TSTAMP = null;
	this.TEAM_EMPNUMBER = null;
	this.TEAM_POSITION = null;
	this.TIMESTAMP = null;
	this.USER_ID = null;
	this.markForUpload = true;
};

com.kony.TeamViewService.TEAM_VIEW.prototype = {
	get DELETE_IND(){
		return this._DELETE_IND;
	},
	set DELETE_IND(val){
		this._DELETE_IND = val;
	},
	get EMPNUMBER(){
		return this._EMPNUMBER;
	},
	set EMPNUMBER(val){
		this._EMPNUMBER = val;
	},
	get EXTRACT_TSTAMP(){
		return this._EXTRACT_TSTAMP;
	},
	set EXTRACT_TSTAMP(val){
		this._EXTRACT_TSTAMP = val;
	},
	get TEAM_EMPNUMBER(){
		return this._TEAM_EMPNUMBER;
	},
	set TEAM_EMPNUMBER(val){
		this._TEAM_EMPNUMBER = val;
	},
	get TEAM_POSITION(){
		return this._TEAM_POSITION;
	},
	set TEAM_POSITION(val){
		this._TEAM_POSITION = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
	get USER_ID(){
		return this._USER_ID;
	},
	set USER_ID(val){
		this._USER_ID = val;
	},
};

/************************************************************************************
* Retrieves all instances of TEAM_VIEW SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "DELETE_IND";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "EMPNUMBER";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.TeamViewService.TEAM_VIEW.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	orderByMap = kony.sync.formOrderByClause("TEAM_VIEW",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getAll->successcallback");
		successcallback(com.kony.TeamViewService.TEAM_VIEW.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_VIEW present in local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getAllCount function");
	com.kony.TeamViewService.TEAM_VIEW.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_VIEW using where clause in the local Database
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getCount->successcallback");
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
* Creates a new instance of TEAM_VIEW in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.TeamViewService.TEAM_VIEW.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_VIEW.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"TEAM_VIEW",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_VIEW.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "EMPNUMBER=" + valuestable.EMPNUMBER;
		pks["EMPNUMBER"] = {key:"EMPNUMBER",value:valuestable.EMPNUMBER};
		errMsg = errMsg + ", TEAM_EMPNUMBER=" + valuestable.TEAM_EMPNUMBER;
		pks["TEAM_EMPNUMBER"] = {key:"TEAM_EMPNUMBER",value:valuestable.TEAM_EMPNUMBER};
		com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of TEAM_VIEW in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].EMPNUMBER = "EMPNUMBER_0";
*		valuesArray[0].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_0";
*		valuesArray[0].TEAM_EMPNUMBER = "TEAM_EMPNUMBER_0";
*		valuesArray[0].TEAM_POSITION = "TEAM_POSITION_0";
*		valuesArray[0].USER_ID = "USER_ID_0";
*		valuesArray[1] = {};
*		valuesArray[1].EMPNUMBER = "EMPNUMBER_1";
*		valuesArray[1].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_1";
*		valuesArray[1].TEAM_EMPNUMBER = "TEAM_EMPNUMBER_1";
*		valuesArray[1].TEAM_POSITION = "TEAM_POSITION_1";
*		valuesArray[1].USER_ID = "USER_ID_1";
*		valuesArray[2] = {};
*		valuesArray[2].EMPNUMBER = "EMPNUMBER_2";
*		valuesArray[2].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_2";
*		valuesArray[2].TEAM_EMPNUMBER = "TEAM_EMPNUMBER_2";
*		valuesArray[2].TEAM_POSITION = "TEAM_POSITION_2";
*		valuesArray[2].USER_ID = "USER_ID_2";
*		com.kony.TeamViewService.TEAM_VIEW.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_VIEW",errorcallback,true)===false){
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
				errMsg = "EMPNUMBER=" + valuestable.EMPNUMBER;
				pks["EMPNUMBER"] = {key:"EMPNUMBER",value:valuestable.EMPNUMBER};
				errMsg = errMsg + ", TEAM_EMPNUMBER=" + valuestable.TEAM_EMPNUMBER;
				pks["TEAM_EMPNUMBER"] = {key:"TEAM_EMPNUMBER",value:valuestable.TEAM_EMPNUMBER};
				var wcs = [];
				if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_VIEW.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates TEAM_VIEW using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.TeamViewService.TEAM_VIEW.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_VIEW.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"TEAM_VIEW",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.TeamViewService.TEAM_VIEW.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates TEAM_VIEW(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"TEAM_VIEW",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_VIEW.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.TeamViewService.TEAM_VIEW.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_VIEW.getPKTable());
	}
};

/************************************************************************************
* Updates TEAM_VIEW(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated0";
*		inputArray[0].changeSet.TEAM_POSITION = "TEAM_POSITION_updated0";
*		inputArray[0].changeSet.USER_ID = "USER_ID_updated0";
*		inputArray[0].whereClause = "where EMPNUMBER = '0'";
*		inputArray[0].whereClause = "where TEAM_EMPNUMBER = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated1";
*		inputArray[1].changeSet.TEAM_POSITION = "TEAM_POSITION_updated1";
*		inputArray[1].changeSet.USER_ID = "USER_ID_updated1";
*		inputArray[1].whereClause = "where EMPNUMBER = '1'";
*		inputArray[1].whereClause = "where TEAM_EMPNUMBER = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated2";
*		inputArray[2].changeSet.TEAM_POSITION = "TEAM_POSITION_updated2";
*		inputArray[2].changeSet.USER_ID = "USER_ID_updated2";
*		inputArray[2].whereClause = "where EMPNUMBER = '2'";
*		inputArray[2].whereClause = "where TEAM_EMPNUMBER = '2'";
*		com.kony.TeamViewService.TEAM_VIEW.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "TEAM_VIEW";
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_VIEW",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.TeamViewService.TEAM_VIEW.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.TeamViewService.TEAM_VIEW.getPKTable());
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.TeamViewService.TEAM_VIEW.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes TEAM_VIEW using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_VIEW.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TEAM_VIEWTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.deleteByPK->TEAM_VIEW_PKPresent successcallback");
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
	
	function TEAM_VIEWErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_VIEW.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TEAM_VIEWSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_VIEW.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TEAM_VIEWTransactionCallback, TEAM_VIEWSuccessCallback, TEAM_VIEWErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes TEAM_VIEW(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.TeamViewService.TEAM_VIEW.remove("where EMPNUMBER like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;
	var record = "";

	function TEAM_VIEW_removeTransactioncallback(tx){
			wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_VIEW_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.remove->TEAM_VIEW_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_VIEW_removeTransactioncallback, TEAM_VIEW_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes TEAM_VIEW using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TEAM_VIEWTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK -> TEAM_VIEWTransactionCallback");
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
	
	function TEAM_VIEWErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK -> TEAM_VIEWErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TEAM_VIEWSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK -> TEAM_VIEWSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TEAM_VIEWTransactionCallback, TEAM_VIEWSuccessCallback, TEAM_VIEWErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes TEAM_VIEW(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_VIEW_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_VIEW_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.remove->TEAM_VIEW_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_VIEW_removeTransactioncallback, TEAM_VIEW_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves TEAM_VIEW using primary key from the local Database. 
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.TeamViewService.TEAM_VIEW.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves TEAM_VIEW(s) using where clause from the local Database. 
* e.g. com.kony.TeamViewService.TEAM_VIEW.find("where EMPNUMBER like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_VIEW.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of TEAM_VIEW with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of TEAM_VIEW matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_VIEW.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of TEAM_VIEW pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_VIEW.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_VIEW pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_VIEW.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_VIEW deferred for upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_VIEW.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to TEAM_VIEW in local database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to TEAM_VIEW's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_VIEW.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether TEAM_VIEW's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether TEAM_VIEW's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_VIEW.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_VIEW.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of TEAM_LEAVE_REQUEST_REPORT related to TEAM_VIEW
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.TeamViewService.TEAM_VIEW.prototype.getTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.getTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.getTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.getTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.getTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_VIEW_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].TEAM_EMPNUMBER;				
			wcs.push({key:"EMPNUMBER", value:targetKey_0});		
			
			var tbname = "TEAM_LEAVE_REQUEST_REPORT"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT();
				obj.CANCEL_DATE = res[i].CANCEL_DATE;
				obj.CANCEL_TIME = res[i].CANCEL_TIME;
				obj.COMMENTS = res[i].COMMENTS;
				obj.CREATE_DATE = res[i].CREATE_DATE;
				obj.CREATE_TIME = res[i].CREATE_TIME;
				obj.DELETE_IND = res[i].DELETE_IND;
				obj.EMPNUMBER = res[i].EMPNUMBER;
				obj.EXTRACT_TSTAMP = res[i].EXTRACT_TSTAMP;
				obj.LEAVE_BALANCE_D = res[i].LEAVE_BALANCE_D;
				obj.LEAVE_BALANCE_H = res[i].LEAVE_BALANCE_H;
				obj.LEAVE_ENDDATE = res[i].LEAVE_ENDDATE;
				obj.LEAVE_ENDTIME = res[i].LEAVE_ENDTIME;
				obj.LEAVE_FROMDATE = res[i].LEAVE_FROMDATE;
				obj.LEAVE_FROMTIME = res[i].LEAVE_FROMTIME;
				obj.LEAVE_HRS = res[i].LEAVE_HRS;
				obj.LEAVE_TYPE = res[i].LEAVE_TYPE;
				obj.LEAVE_TYPE_TEXT = res[i].LEAVE_TYPE_TEXT;
				obj.LV_STATUS = res[i].LV_STATUS;
				obj.PROCESS_DATE = res[i].PROCESS_DATE;
				obj.PROCESS_TIME = res[i].PROCESS_TIME;
				obj.REQUEST_ID = res[i].REQUEST_ID;
				obj.STATUS = res[i].STATUS;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK(pks, TEAM_VIEW_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of TEAM_LEAVE_REQUEST_REPORT related to TEAM_VIEW
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.getCountOfTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.getCountOfTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_LEAVE_REQUEST_REPORTWithTEAM_EMPNUMBER",  "relationship", errorcallback)){
		return;
	}
	function TEAM_VIEW_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].TEAM_EMPNUMBER;
					targetAttributes.push("EMPNUMBER");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"EMPNUMBER":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"EMPNUMBER":targetKey_0});
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
		   com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK(pks, TEAM_VIEW_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of TEAM_PERSONAL_DATA related to TEAM_VIEW
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.TeamViewService.TEAM_VIEW.prototype.getTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.getTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.getTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.getTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.getTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_VIEW_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].TEAM_EMPNUMBER;				
			wcs.push({key:"EMPNUMBER", value:targetKey_0});		
			
			var tbname = "TEAM_PERSONAL_DATA"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.TEAM_PERSONAL_DATA.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.TeamViewService.TEAM_PERSONAL_DATA();
				obj.BEGDA = res[i].BEGDA;
				obj.BIRTHPLACE = res[i].BIRTHPLACE;
				obj.DELETE_IND = res[i].DELETE_IND;
				obj.DOB = res[i].DOB;
				obj.EMPNUMBER = res[i].EMPNUMBER;
				obj.ENDDA = res[i].ENDDA;
				obj.EXTRACT_TSTAMP = res[i].EXTRACT_TSTAMP;
				obj.FIRSTNAME = res[i].FIRSTNAME;
				obj.GENDER = res[i].GENDER;
				obj.INITIALS = res[i].INITIALS;
				obj.INTERESTS = res[i].INTERESTS;
				obj.JOINING_DT = res[i].JOINING_DT;
				obj.KNOWNAS = res[i].KNOWNAS;
				obj.LANG = res[i].LANG;
				obj.LASTNAME = res[i].LASTNAME;
				obj.MARITAL_STATUS = res[i].MARITAL_STATUS;
				obj.MEDICAL_NEEDS = res[i].MEDICAL_NEEDS;
				obj.MIDDLENAME = res[i].MIDDLENAME;
				obj.NAME_DOB = res[i].NAME_DOB;
				obj.NATIONALITY = res[i].NATIONALITY;
				obj.NO_OF_CHILD = res[i].NO_OF_CHILD;
				obj.PERID = res[i].PERID;
				obj.SINCE = res[i].SINCE;
				obj.SUBTYPE = res[i].SUBTYPE;
				obj.SUFFIX = res[i].SUFFIX;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				obj.TITLE = res[i].TITLE;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK(pks, TEAM_VIEW_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of TEAM_PERSONAL_DATA related to TEAM_VIEW
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_VIEW.prototype.getCountOfTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.getCountOfTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_VIEW.getCountOfTEAM_PERSONAL_DATAWithTEAM_EMPNUMBER",  "relationship", errorcallback)){
		return;
	}
	function TEAM_VIEW_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].TEAM_EMPNUMBER;
					targetAttributes.push("EMPNUMBER");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"EMPNUMBER":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"EMPNUMBER":targetKey_0});
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
		   com.kony.TeamViewService.TEAM_PERSONAL_DATA.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_VIEW.getAllDetailsByPK(pks, TEAM_VIEW_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.TeamViewService.TEAM_VIEW.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.removeCascade function");
	var tbname = com.kony.TeamViewService.TEAM_VIEW.getTableName();
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


com.kony.TeamViewService.TEAM_VIEW.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.TeamViewService.TEAM_VIEW();
			obj.DELETE_IND = res[i].DELETE_IND;
			obj.EMPNUMBER = res[i].EMPNUMBER;
			obj.EXTRACT_TSTAMP = res[i].EXTRACT_TSTAMP;
			obj.TEAM_EMPNUMBER = res[i].TEAM_EMPNUMBER;
			obj.TEAM_POSITION = res[i].TEAM_POSITION;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.USER_ID = res[i].USER_ID;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.TeamViewService.TEAM_VIEW.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.filterAttributes function");
	var attributeTable = {};
	attributeTable.EMPNUMBER = "EMPNUMBER";
	attributeTable.EXTRACT_TSTAMP = "EXTRACT_TSTAMP";
	attributeTable.TEAM_EMPNUMBER = "TEAM_EMPNUMBER";
	attributeTable.TEAM_POSITION = "TEAM_POSITION";
	attributeTable.USER_ID = "USER_ID";

	var PKTable = {};
	PKTable.EMPNUMBER = {}
	PKTable.EMPNUMBER.name = "EMPNUMBER";
	PKTable.EMPNUMBER.isAutoGen = false;
	PKTable.TEAM_EMPNUMBER = {}
	PKTable.TEAM_EMPNUMBER.name = "TEAM_EMPNUMBER";
	PKTable.TEAM_EMPNUMBER.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject TEAM_VIEW. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject TEAM_VIEW. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject TEAM_VIEW. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.TeamViewService.TEAM_VIEW.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.TeamViewService.TEAM_VIEW.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.TeamViewService.TEAM_VIEW.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.getValuesTable function");
	var valuesTable = {};
	if(isInsert===true){
		valuesTable.EMPNUMBER = this.EMPNUMBER;
	}
	valuesTable.EXTRACT_TSTAMP = this.EXTRACT_TSTAMP;
	if(isInsert===true){
		valuesTable.TEAM_EMPNUMBER = this.TEAM_EMPNUMBER;
	}
	valuesTable.TEAM_POSITION = this.TEAM_POSITION;
	valuesTable.USER_ID = this.USER_ID;
	return valuesTable;
};

com.kony.TeamViewService.TEAM_VIEW.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.prototype.getPKTable function");
	var pkTable = {};
	pkTable.EMPNUMBER = {key:"EMPNUMBER",value:this.EMPNUMBER};
	pkTable.TEAM_EMPNUMBER = {key:"TEAM_EMPNUMBER",value:this.TEAM_EMPNUMBER};
	return pkTable;
};

com.kony.TeamViewService.TEAM_VIEW.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getPKTable function");
	var pkTable = [];
	pkTable.push("EMPNUMBER");
	pkTable.push("TEAM_EMPNUMBER");
	return pkTable;
};

com.kony.TeamViewService.TEAM_VIEW.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.EMPNUMBER)){
		if(!kony.sync.isNull(pks.EMPNUMBER.value)){
			wc.key = "EMPNUMBER";
			wc.value = pks.EMPNUMBER.value;
		}
		else{
			wc.key = "EMPNUMBER";
			wc.value = pks.EMPNUMBER;
		}
	}else{
		sync.log.error("Primary Key EMPNUMBER not specified in " + opName + " an item in TEAM_VIEW");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("EMPNUMBER",opName,"TEAM_VIEW")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.TEAM_EMPNUMBER)){
		if(!kony.sync.isNull(pks.TEAM_EMPNUMBER.value)){
			wc.key = "TEAM_EMPNUMBER";
			wc.value = pks.TEAM_EMPNUMBER.value;
		}
		else{
			wc.key = "TEAM_EMPNUMBER";
			wc.value = pks.TEAM_EMPNUMBER;
		}
	}else{
		sync.log.error("Primary Key TEAM_EMPNUMBER not specified in " + opName + " an item in TEAM_VIEW");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("TEAM_EMPNUMBER",opName,"TEAM_VIEW")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.TeamViewService.TEAM_VIEW.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.validateNull function");
	return true;
};

com.kony.TeamViewService.TEAM_VIEW.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.validateNullInsert function");
	if(kony.sync.isNull(valuestable.EMPNUMBER) || kony.sync.isEmptyString(valuestable.EMPNUMBER)){
		sync.log.error("Mandatory attribute EMPNUMBER is missing for the SyncObject TEAM_VIEW.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_VIEW", "EMPNUMBER")));
		return false;
	}
	if(kony.sync.isNull(valuestable.TEAM_EMPNUMBER) || kony.sync.isEmptyString(valuestable.TEAM_EMPNUMBER)){
		sync.log.error("Mandatory attribute TEAM_EMPNUMBER is missing for the SyncObject TEAM_VIEW.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_VIEW", "TEAM_EMPNUMBER")));
		return false;
	}
	return true;
};

com.kony.TeamViewService.TEAM_VIEW.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_VIEW.getRelationshipMap function");
	var r1 = {};

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.TEAM_EMPNUMBER)){
		r1.sourceAttribute.push("EMPNUMBER") ;
		r1.foreignKeyAttribute.push("TEAM_EMPNUMBER") ;
		r1.targetAttributeValue.push("'" + valuestable.TEAM_EMPNUMBER+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.TEAM_LEAVE_REQUEST_REPORT===undefined){
			relationshipMap.TEAM_LEAVE_REQUEST_REPORT = [];
		}
		relationshipMap.TEAM_LEAVE_REQUEST_REPORT.push(r1);
	}
		
	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.TEAM_EMPNUMBER)){
		r1.sourceAttribute.push("EMPNUMBER") ;
		r1.foreignKeyAttribute.push("TEAM_EMPNUMBER") ;
		r1.targetAttributeValue.push("'" + valuestable.TEAM_EMPNUMBER+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.TEAM_PERSONAL_DATA===undefined){
			relationshipMap.TEAM_PERSONAL_DATA = [];
		}
		relationshipMap.TEAM_PERSONAL_DATA.push(r1);
	}
		
	return relationshipMap;
};


com.kony.TeamViewService.TEAM_VIEW.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.TeamViewService.TEAM_VIEW.getTableName = function(){
	return "TEAM_VIEW";
};




// **********************************End TEAM_VIEW's helper methods************************