//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Sun Nov 05 01:01:22 UTC 2017TEAM_LEAVE_NOTE*******************
// **********************************Start TEAM_LEAVE_NOTE's helper methods************************
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
* Creates new TEAM_LEAVE_NOTE
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE = function(){
	this.ADDED_ON = null;
	this.COMMENTS = null;
	this.DELETE_IND = null;
	this.EMPNUMBER = null;
	this.LEAVEID = null;
	this.TIMESTAMP = null;
	this.markForUpload = true;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype = {
	get ADDED_ON(){
		return this._ADDED_ON;
	},
	set ADDED_ON(val){
		this._ADDED_ON = val;
	},
	get COMMENTS(){
		return this._COMMENTS;
	},
	set COMMENTS(val){
		this._COMMENTS = val;
	},
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
	get LEAVEID(){
		return this._LEAVEID;
	},
	set LEAVEID(val){
		this._LEAVEID = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
};

/************************************************************************************
* Retrieves all instances of TEAM_LEAVE_NOTE SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "ADDED_ON";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "COMMENTS";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	orderByMap = kony.sync.formOrderByClause("TEAM_LEAVE_NOTE",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAll->successcallback");
		successcallback(com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LEAVE_NOTE present in local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllCount function");
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LEAVE_NOTE using where clause in the local Database
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getCount->successcallback");
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
* Creates a new instance of TEAM_LEAVE_NOTE in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_NOTE",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "ADDED_ON=" + valuestable.ADDED_ON;
		pks["ADDED_ON"] = {key:"ADDED_ON",value:valuestable.ADDED_ON};
		errMsg = errMsg + ", EMPNUMBER=" + valuestable.EMPNUMBER;
		pks["EMPNUMBER"] = {key:"EMPNUMBER",value:valuestable.EMPNUMBER};
		errMsg = errMsg + ", LEAVEID=" + valuestable.LEAVEID;
		pks["LEAVEID"] = {key:"LEAVEID",value:valuestable.LEAVEID};
		com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of TEAM_LEAVE_NOTE in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].ADDED_ON = "ADDED_ON_0";
*		valuesArray[0].COMMENTS = "COMMENTS_0";
*		valuesArray[0].EMPNUMBER = "EMPNUMBER_0";
*		valuesArray[0].LEAVEID = "LEAVEID_0";
*		valuesArray[1] = {};
*		valuesArray[1].ADDED_ON = "ADDED_ON_1";
*		valuesArray[1].COMMENTS = "COMMENTS_1";
*		valuesArray[1].EMPNUMBER = "EMPNUMBER_1";
*		valuesArray[1].LEAVEID = "LEAVEID_1";
*		valuesArray[2] = {};
*		valuesArray[2].ADDED_ON = "ADDED_ON_2";
*		valuesArray[2].COMMENTS = "COMMENTS_2";
*		valuesArray[2].EMPNUMBER = "EMPNUMBER_2";
*		valuesArray[2].LEAVEID = "LEAVEID_2";
*		com.kony.TeamViewService.TEAM_LEAVE_NOTE.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_NOTE",errorcallback,true)===false){
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
				errMsg = "ADDED_ON=" + valuestable.ADDED_ON;
				pks["ADDED_ON"] = {key:"ADDED_ON",value:valuestable.ADDED_ON};
				errMsg = errMsg + ", EMPNUMBER=" + valuestable.EMPNUMBER;
				pks["EMPNUMBER"] = {key:"EMPNUMBER",value:valuestable.EMPNUMBER};
				errMsg = errMsg + ", LEAVEID=" + valuestable.LEAVEID;
				pks["LEAVEID"] = {key:"LEAVEID",value:valuestable.LEAVEID};
				var wcs = [];
				if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates TEAM_LEAVE_NOTE using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_NOTE",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates TEAM_LEAVE_NOTE(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_NOTE",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPKTable());
	}
};

/************************************************************************************
* Updates TEAM_LEAVE_NOTE(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.COMMENTS = "COMMENTS_updated0";
*		inputArray[0].whereClause = "where ADDED_ON = '0'";
*		inputArray[0].whereClause = "where EMPNUMBER = '0'";
*		inputArray[0].whereClause = "where LEAVEID = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.COMMENTS = "COMMENTS_updated1";
*		inputArray[1].whereClause = "where ADDED_ON = '1'";
*		inputArray[1].whereClause = "where EMPNUMBER = '1'";
*		inputArray[1].whereClause = "where LEAVEID = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.COMMENTS = "COMMENTS_updated2";
*		inputArray[2].whereClause = "where ADDED_ON = '2'";
*		inputArray[2].whereClause = "where EMPNUMBER = '2'";
*		inputArray[2].whereClause = "where LEAVEID = '2'";
*		com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "TEAM_LEAVE_NOTE";
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_NOTE",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPKTable());
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes TEAM_LEAVE_NOTE using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TEAM_LEAVE_NOTETransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK->TEAM_LEAVE_NOTE_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVEID");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade,"TEAM_LEAVE_REQUEST_ENTRY",false, errorcallback, markForUpload, record, false)){
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
	
	function TEAM_LEAVE_NOTEErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TEAM_LEAVE_NOTESuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TEAM_LEAVE_NOTETransactionCallback, TEAM_LEAVE_NOTESuccessCallback, TEAM_LEAVE_NOTEErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes TEAM_LEAVE_NOTE(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove("where ADDED_ON like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_LEAVE_NOTE_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVEID");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade,"TEAM_LEAVE_REQUEST_ENTRY",false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_LEAVE_NOTE_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove->TEAM_LEAVE_NOTE_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LEAVE_NOTE_removeTransactioncallback, TEAM_LEAVE_NOTE_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes TEAM_LEAVE_NOTE using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TEAM_LEAVE_NOTETransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK -> TEAM_LEAVE_NOTETransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVEID");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade,"TEAM_LEAVE_REQUEST_ENTRY",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function TEAM_LEAVE_NOTEErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK -> TEAM_LEAVE_NOTEErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TEAM_LEAVE_NOTESuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK -> TEAM_LEAVE_NOTESuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TEAM_LEAVE_NOTETransactionCallback, TEAM_LEAVE_NOTESuccessCallback, TEAM_LEAVE_NOTEErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes TEAM_LEAVE_NOTE(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_LEAVE_NOTE_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVEID");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade,"TEAM_LEAVE_REQUEST_ENTRY",false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_LEAVE_NOTE_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove->TEAM_LEAVE_NOTE_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LEAVE_NOTE_removeTransactioncallback, TEAM_LEAVE_NOTE_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves TEAM_LEAVE_NOTE using primary key from the local Database. 
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves TEAM_LEAVE_NOTE(s) using where clause from the local Database. 
* e.g. com.kony.TeamViewService.TEAM_LEAVE_NOTE.find("where ADDED_ON like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of TEAM_LEAVE_NOTE with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of TEAM_LEAVE_NOTE matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of TEAM_LEAVE_NOTE pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LEAVE_NOTE pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LEAVE_NOTE deferred for upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to TEAM_LEAVE_NOTE in local database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to TEAM_LEAVE_NOTE's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether TEAM_LEAVE_NOTE's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether TEAM_LEAVE_NOTE's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.isRecordPendingForUpload->successcallback function");
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
com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.removeCascade function");
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVEID");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade,"TEAM_LEAVE_REQUEST_ENTRY",false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.TeamViewService.TEAM_LEAVE_NOTE();
			obj.ADDED_ON = res[i].ADDED_ON;
			obj.COMMENTS = res[i].COMMENTS;
			obj.DELETE_IND = res[i].DELETE_IND;
			obj.EMPNUMBER = res[i].EMPNUMBER;
			obj.LEAVEID = res[i].LEAVEID;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.filterAttributes function");
	var attributeTable = {};
	attributeTable.ADDED_ON = "ADDED_ON";
	attributeTable.COMMENTS = "COMMENTS";
	attributeTable.EMPNUMBER = "EMPNUMBER";
	attributeTable.LEAVEID = "LEAVEID";

	var PKTable = {};
	PKTable.ADDED_ON = {}
	PKTable.ADDED_ON.name = "ADDED_ON";
	PKTable.ADDED_ON.isAutoGen = false;
	PKTable.EMPNUMBER = {}
	PKTable.EMPNUMBER.name = "EMPNUMBER";
	PKTable.EMPNUMBER.isAutoGen = false;
	PKTable.LEAVEID = {}
	PKTable.LEAVEID.name = "LEAVEID";
	PKTable.LEAVEID.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject TEAM_LEAVE_NOTE. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject TEAM_LEAVE_NOTE. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject TEAM_LEAVE_NOTE. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.TeamViewService.TEAM_LEAVE_NOTE.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.TeamViewService.TEAM_LEAVE_NOTE.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.getValuesTable function");
	var valuesTable = {};
	if(isInsert===true){
		valuesTable.ADDED_ON = this.ADDED_ON;
	}
	valuesTable.COMMENTS = this.COMMENTS;
	if(isInsert===true){
		valuesTable.EMPNUMBER = this.EMPNUMBER;
	}
	if(isInsert===true){
		valuesTable.LEAVEID = this.LEAVEID;
	}
	return valuesTable;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.prototype.getPKTable function");
	var pkTable = {};
	pkTable.ADDED_ON = {key:"ADDED_ON",value:this.ADDED_ON};
	pkTable.EMPNUMBER = {key:"EMPNUMBER",value:this.EMPNUMBER};
	pkTable.LEAVEID = {key:"LEAVEID",value:this.LEAVEID};
	return pkTable;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getPKTable function");
	var pkTable = [];
	pkTable.push("ADDED_ON");
	pkTable.push("EMPNUMBER");
	pkTable.push("LEAVEID");
	return pkTable;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.ADDED_ON)){
		if(!kony.sync.isNull(pks.ADDED_ON.value)){
			wc.key = "ADDED_ON";
			wc.value = pks.ADDED_ON.value;
		}
		else{
			wc.key = "ADDED_ON";
			wc.value = pks.ADDED_ON;
		}
	}else{
		sync.log.error("Primary Key ADDED_ON not specified in " + opName + " an item in TEAM_LEAVE_NOTE");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("ADDED_ON",opName,"TEAM_LEAVE_NOTE")));
		return;
	}
	kony.table.insert(wcs,wc);
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
		sync.log.error("Primary Key EMPNUMBER not specified in " + opName + " an item in TEAM_LEAVE_NOTE");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("EMPNUMBER",opName,"TEAM_LEAVE_NOTE")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.LEAVEID)){
		if(!kony.sync.isNull(pks.LEAVEID.value)){
			wc.key = "LEAVEID";
			wc.value = pks.LEAVEID.value;
		}
		else{
			wc.key = "LEAVEID";
			wc.value = pks.LEAVEID;
		}
	}else{
		sync.log.error("Primary Key LEAVEID not specified in " + opName + " an item in TEAM_LEAVE_NOTE");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("LEAVEID",opName,"TEAM_LEAVE_NOTE")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.validateNull function");
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.validateNullInsert function");
	if(kony.sync.isNull(valuestable.ADDED_ON) || kony.sync.isEmptyString(valuestable.ADDED_ON)){
		sync.log.error("Mandatory attribute ADDED_ON is missing for the SyncObject TEAM_LEAVE_NOTE.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LEAVE_NOTE", "ADDED_ON")));
		return false;
	}
	if(kony.sync.isNull(valuestable.EMPNUMBER) || kony.sync.isEmptyString(valuestable.EMPNUMBER)){
		sync.log.error("Mandatory attribute EMPNUMBER is missing for the SyncObject TEAM_LEAVE_NOTE.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LEAVE_NOTE", "EMPNUMBER")));
		return false;
	}
	if(kony.sync.isNull(valuestable.LEAVEID) || kony.sync.isEmptyString(valuestable.LEAVEID)){
		sync.log.error("Mandatory attribute LEAVEID is missing for the SyncObject TEAM_LEAVE_NOTE.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LEAVE_NOTE", "LEAVEID")));
		return false;
	}
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_NOTE.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.TeamViewService.TEAM_LEAVE_NOTE.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.TeamViewService.TEAM_LEAVE_NOTE.getTableName = function(){
	return "TEAM_LEAVE_NOTE";
};




// **********************************End TEAM_LEAVE_NOTE's helper methods************************