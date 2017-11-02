//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Thu Nov 02 11:15:29 UTC 2017TEAM_LVREQ_ATTACHMENTS*******************
// **********************************Start TEAM_LVREQ_ATTACHMENTS's helper methods************************
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
* Creates new TEAM_LVREQ_ATTACHMENTS
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS = function(){
	this.BINARY_NAME = null;
	this.DELETE_IND = null;
	this.EXTRACT_TSTAMP = null;
	this.FILE_DESC = null;
	this.FILE_EXT = null;
	this.FILE_NAME = null;
	this.INSTID = null;
	this.LEAVE_ENTRY_ID = null;
	this.LV_ATTCH_SEQNO = null;
	this.SOURCE_SYSTEM = null;
	this.TIMESTAMP = null;
	this.markForUpload = true;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype = {
	get BINARY_NAME(){
		return this._BINARY_NAME;
	},
	set BINARY_NAME(val){
		this._BINARY_NAME = val;
	},
	get DELETE_IND(){
		return this._DELETE_IND;
	},
	set DELETE_IND(val){
		this._DELETE_IND = val;
	},
	get EXTRACT_TSTAMP(){
		return this._EXTRACT_TSTAMP;
	},
	set EXTRACT_TSTAMP(val){
		this._EXTRACT_TSTAMP = val;
	},
	get FILE_DESC(){
		return this._FILE_DESC;
	},
	set FILE_DESC(val){
		this._FILE_DESC = val;
	},
	get FILE_EXT(){
		return this._FILE_EXT;
	},
	set FILE_EXT(val){
		this._FILE_EXT = val;
	},
	get FILE_NAME(){
		return this._FILE_NAME;
	},
	set FILE_NAME(val){
		this._FILE_NAME = val;
	},
	get INSTID(){
		return this._INSTID;
	},
	set INSTID(val){
		this._INSTID = val;
	},
	get LEAVE_ENTRY_ID(){
		return this._LEAVE_ENTRY_ID;
	},
	set LEAVE_ENTRY_ID(val){
		this._LEAVE_ENTRY_ID = val;
	},
	get LV_ATTCH_SEQNO(){
		return this._LV_ATTCH_SEQNO;
	},
	set LV_ATTCH_SEQNO(val){
		this._LV_ATTCH_SEQNO = val;
	},
	get SOURCE_SYSTEM(){
		return this._SOURCE_SYSTEM;
	},
	set SOURCE_SYSTEM(val){
		this._SOURCE_SYSTEM = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
};

/************************************************************************************
* Retrieves all instances of TEAM_LVREQ_ATTACHMENTS SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "BINARY_NAME";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "DELETE_IND";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	orderByMap = kony.sync.formOrderByClause("TEAM_LVREQ_ATTACHMENTS",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAll->successcallback");
		successcallback(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LVREQ_ATTACHMENTS present in local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllCount function");
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LVREQ_ATTACHMENTS using where clause in the local Database
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCount->successcallback");
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
* Creates a new instance of TEAM_LVREQ_ATTACHMENTS in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LVREQ_ATTACHMENTS",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "LEAVE_ENTRY_ID=" + valuestable.LEAVE_ENTRY_ID;
		pks["LEAVE_ENTRY_ID"] = {key:"LEAVE_ENTRY_ID",value:valuestable.LEAVE_ENTRY_ID};
		errMsg = errMsg + ", LV_ATTCH_SEQNO=" + valuestable.LV_ATTCH_SEQNO;
		pks["LV_ATTCH_SEQNO"] = {key:"LV_ATTCH_SEQNO",value:valuestable.LV_ATTCH_SEQNO};
		com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of TEAM_LVREQ_ATTACHMENTS in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].BINARY_NAME = "BINARY_NAME_0";
*		valuesArray[0].DELETE_IND = "DELETE_IND_0";
*		valuesArray[0].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_0";
*		valuesArray[0].FILE_DESC = "FILE_DESC_0";
*		valuesArray[0].FILE_EXT = "FILE_EXT_0";
*		valuesArray[0].FILE_NAME = "FILE_NAME_0";
*		valuesArray[0].INSTID = "INSTID_0";
*		valuesArray[0].LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID_0";
*		valuesArray[0].LV_ATTCH_SEQNO = "LV_ATTCH_SEQNO_0";
*		valuesArray[0].SOURCE_SYSTEM = "SOURCE_SYSTEM_0";
*		valuesArray[0].TIMESTAMP = "TIMESTAMP_0";
*		valuesArray[1] = {};
*		valuesArray[1].BINARY_NAME = "BINARY_NAME_1";
*		valuesArray[1].DELETE_IND = "DELETE_IND_1";
*		valuesArray[1].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_1";
*		valuesArray[1].FILE_DESC = "FILE_DESC_1";
*		valuesArray[1].FILE_EXT = "FILE_EXT_1";
*		valuesArray[1].FILE_NAME = "FILE_NAME_1";
*		valuesArray[1].INSTID = "INSTID_1";
*		valuesArray[1].LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID_1";
*		valuesArray[1].LV_ATTCH_SEQNO = "LV_ATTCH_SEQNO_1";
*		valuesArray[1].SOURCE_SYSTEM = "SOURCE_SYSTEM_1";
*		valuesArray[1].TIMESTAMP = "TIMESTAMP_1";
*		valuesArray[2] = {};
*		valuesArray[2].BINARY_NAME = "BINARY_NAME_2";
*		valuesArray[2].DELETE_IND = "DELETE_IND_2";
*		valuesArray[2].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_2";
*		valuesArray[2].FILE_DESC = "FILE_DESC_2";
*		valuesArray[2].FILE_EXT = "FILE_EXT_2";
*		valuesArray[2].FILE_NAME = "FILE_NAME_2";
*		valuesArray[2].INSTID = "INSTID_2";
*		valuesArray[2].LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID_2";
*		valuesArray[2].LV_ATTCH_SEQNO = "LV_ATTCH_SEQNO_2";
*		valuesArray[2].SOURCE_SYSTEM = "SOURCE_SYSTEM_2";
*		valuesArray[2].TIMESTAMP = "TIMESTAMP_2";
*		com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LVREQ_ATTACHMENTS",errorcallback,true)===false){
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
				errMsg = "LEAVE_ENTRY_ID=" + valuestable.LEAVE_ENTRY_ID;
				pks["LEAVE_ENTRY_ID"] = {key:"LEAVE_ENTRY_ID",value:valuestable.LEAVE_ENTRY_ID};
				errMsg = errMsg + ", LV_ATTCH_SEQNO=" + valuestable.LV_ATTCH_SEQNO;
				pks["LV_ATTCH_SEQNO"] = {key:"LV_ATTCH_SEQNO",value:valuestable.LV_ATTCH_SEQNO};
				var wcs = [];
				if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates TEAM_LVREQ_ATTACHMENTS using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"TEAM_LVREQ_ATTACHMENTS",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates TEAM_LVREQ_ATTACHMENTS(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LVREQ_ATTACHMENTS",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPKTable());
	}
};

/************************************************************************************
* Updates TEAM_LVREQ_ATTACHMENTS(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.BINARY_NAME = "BINARY_NAME_updated0";
*		inputArray[0].changeSet.DELETE_IND = "DELETE_IND_updated0";
*		inputArray[0].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated0";
*		inputArray[0].changeSet.FILE_DESC = "FILE_DESC_updated0";
*		inputArray[0].whereClause = "where LEAVE_ENTRY_ID = '0'";
*		inputArray[0].whereClause = "where LV_ATTCH_SEQNO = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.BINARY_NAME = "BINARY_NAME_updated1";
*		inputArray[1].changeSet.DELETE_IND = "DELETE_IND_updated1";
*		inputArray[1].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated1";
*		inputArray[1].changeSet.FILE_DESC = "FILE_DESC_updated1";
*		inputArray[1].whereClause = "where LEAVE_ENTRY_ID = '1'";
*		inputArray[1].whereClause = "where LV_ATTCH_SEQNO = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.BINARY_NAME = "BINARY_NAME_updated2";
*		inputArray[2].changeSet.DELETE_IND = "DELETE_IND_updated2";
*		inputArray[2].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated2";
*		inputArray[2].changeSet.FILE_DESC = "FILE_DESC_updated2";
*		inputArray[2].whereClause = "where LEAVE_ENTRY_ID = '2'";
*		inputArray[2].whereClause = "where LV_ATTCH_SEQNO = '2'";
*		com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "TEAM_LVREQ_ATTACHMENTS";
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LVREQ_ATTACHMENTS",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPKTable());
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes TEAM_LVREQ_ATTACHMENTS using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TEAM_LVREQ_ATTACHMENTSTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK->TEAM_LVREQ_ATTACHMENTS_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVE_ENTRY_ID");
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
	
	function TEAM_LVREQ_ATTACHMENTSErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TEAM_LVREQ_ATTACHMENTSSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TEAM_LVREQ_ATTACHMENTSTransactionCallback, TEAM_LVREQ_ATTACHMENTSSuccessCallback, TEAM_LVREQ_ATTACHMENTSErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes TEAM_LVREQ_ATTACHMENTS(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove("where BINARY_NAME like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_LVREQ_ATTACHMENTS_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVE_ENTRY_ID");
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
	function TEAM_LVREQ_ATTACHMENTS_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove->TEAM_LVREQ_ATTACHMENTS_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LVREQ_ATTACHMENTS_removeTransactioncallback, TEAM_LVREQ_ATTACHMENTS_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes TEAM_LVREQ_ATTACHMENTS using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TEAM_LVREQ_ATTACHMENTSTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK -> TEAM_LVREQ_ATTACHMENTSTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVE_ENTRY_ID");
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
	
	function TEAM_LVREQ_ATTACHMENTSErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK -> TEAM_LVREQ_ATTACHMENTSErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TEAM_LVREQ_ATTACHMENTSSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK -> TEAM_LVREQ_ATTACHMENTSSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TEAM_LVREQ_ATTACHMENTSTransactionCallback, TEAM_LVREQ_ATTACHMENTSSuccessCallback, TEAM_LVREQ_ATTACHMENTSErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes TEAM_LVREQ_ATTACHMENTS(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_LVREQ_ATTACHMENTS_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVE_ENTRY_ID");
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
	function TEAM_LVREQ_ATTACHMENTS_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove->TEAM_LVREQ_ATTACHMENTS_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LVREQ_ATTACHMENTS_removeTransactioncallback, TEAM_LVREQ_ATTACHMENTS_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves TEAM_LVREQ_ATTACHMENTS using primary key from the local Database. 
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves TEAM_LVREQ_ATTACHMENTS(s) using where clause from the local Database. 
* e.g. com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.find("where BINARY_NAME like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of TEAM_LVREQ_ATTACHMENTS with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of TEAM_LVREQ_ATTACHMENTS matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of TEAM_LVREQ_ATTACHMENTS pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LVREQ_ATTACHMENTS pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LVREQ_ATTACHMENTS deferred for upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to TEAM_LVREQ_ATTACHMENTS in local database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to TEAM_LVREQ_ATTACHMENTS's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether TEAM_LVREQ_ATTACHMENTS's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether TEAM_LVREQ_ATTACHMENTS's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of media related to TEAM_LVREQ_ATTACHMENTS
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getmediaWithBINARY_NAME  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getmediaWithBINARY_NAME function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getmediaWithBINARY_NAME(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getmediaWithBINARY_NAME = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getmediaWithBINARY_NAME function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getmediaWithBINARY_NAME",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_LVREQ_ATTACHMENTS_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].BINARY_NAME;				
			wcs.push({key:"name", value:targetKey_0});		
			
			var tbname = "media"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.media.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.TeamViewService.media();
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
	
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK(pks, TEAM_LVREQ_ATTACHMENTS_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of media related to TEAM_LVREQ_ATTACHMENTS
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getCountOfmediaWithBINARY_NAME  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getCountOfmediaWithBINARY_NAME function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCountOfmediaWithBINARY_NAME(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCountOfmediaWithBINARY_NAME = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCountOfmediaWithBINARY_NAME function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCountOfmediaWithBINARY_NAME",  "relationship", errorcallback)){
		return;
	}
	function TEAM_LVREQ_ATTACHMENTS_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].BINARY_NAME;
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
		   com.kony.TeamViewService.media.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getAllDetailsByPK(pks, TEAM_LVREQ_ATTACHMENTS_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.removeCascade function");
	var tbname = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("LEAVE_ENTRY_ID");
 		targetAttributes.push("LEAVE_ENTRY_ID");
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


com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS();
			obj.BINARY_NAME = res[i].BINARY_NAME;
			obj.DELETE_IND = res[i].DELETE_IND;
			obj.EXTRACT_TSTAMP = res[i].EXTRACT_TSTAMP;
			obj.FILE_DESC = res[i].FILE_DESC;
			obj.FILE_EXT = res[i].FILE_EXT;
			obj.FILE_NAME = res[i].FILE_NAME;
			obj.INSTID = res[i].INSTID;
			obj.LEAVE_ENTRY_ID = res[i].LEAVE_ENTRY_ID;
			obj.LV_ATTCH_SEQNO = res[i].LV_ATTCH_SEQNO;
			obj.SOURCE_SYSTEM = res[i].SOURCE_SYSTEM;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.filterAttributes function");
	var attributeTable = {};
	attributeTable.BINARY_NAME = "BINARY_NAME";
	attributeTable.DELETE_IND = "DELETE_IND";
	attributeTable.EXTRACT_TSTAMP = "EXTRACT_TSTAMP";
	attributeTable.FILE_DESC = "FILE_DESC";
	attributeTable.FILE_EXT = "FILE_EXT";
	attributeTable.FILE_NAME = "FILE_NAME";
	attributeTable.INSTID = "INSTID";
	attributeTable.LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID";
	attributeTable.LV_ATTCH_SEQNO = "LV_ATTCH_SEQNO";
	attributeTable.SOURCE_SYSTEM = "SOURCE_SYSTEM";
	attributeTable.TIMESTAMP = "TIMESTAMP";

	var PKTable = {};
	PKTable.LEAVE_ENTRY_ID = {}
	PKTable.LEAVE_ENTRY_ID.name = "LEAVE_ENTRY_ID";
	PKTable.LEAVE_ENTRY_ID.isAutoGen = false;
	PKTable.LV_ATTCH_SEQNO = {}
	PKTable.LV_ATTCH_SEQNO.name = "LV_ATTCH_SEQNO";
	PKTable.LV_ATTCH_SEQNO.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject TEAM_LVREQ_ATTACHMENTS. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject TEAM_LVREQ_ATTACHMENTS. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject TEAM_LVREQ_ATTACHMENTS. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.BINARY_NAME = this.BINARY_NAME;
	valuesTable.DELETE_IND = this.DELETE_IND;
	valuesTable.EXTRACT_TSTAMP = this.EXTRACT_TSTAMP;
	valuesTable.FILE_DESC = this.FILE_DESC;
	valuesTable.FILE_EXT = this.FILE_EXT;
	valuesTable.FILE_NAME = this.FILE_NAME;
	valuesTable.INSTID = this.INSTID;
	if(isInsert===true){
		valuesTable.LEAVE_ENTRY_ID = this.LEAVE_ENTRY_ID;
	}
	if(isInsert===true){
		valuesTable.LV_ATTCH_SEQNO = this.LV_ATTCH_SEQNO;
	}
	valuesTable.SOURCE_SYSTEM = this.SOURCE_SYSTEM;
	valuesTable.TIMESTAMP = this.TIMESTAMP;
	return valuesTable;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.prototype.getPKTable function");
	var pkTable = {};
	pkTable.LEAVE_ENTRY_ID = {key:"LEAVE_ENTRY_ID",value:this.LEAVE_ENTRY_ID};
	pkTable.LV_ATTCH_SEQNO = {key:"LV_ATTCH_SEQNO",value:this.LV_ATTCH_SEQNO};
	return pkTable;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getPKTable function");
	var pkTable = [];
	pkTable.push("LEAVE_ENTRY_ID");
	pkTable.push("LV_ATTCH_SEQNO");
	return pkTable;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.LEAVE_ENTRY_ID)){
		if(!kony.sync.isNull(pks.LEAVE_ENTRY_ID.value)){
			wc.key = "LEAVE_ENTRY_ID";
			wc.value = pks.LEAVE_ENTRY_ID.value;
		}
		else{
			wc.key = "LEAVE_ENTRY_ID";
			wc.value = pks.LEAVE_ENTRY_ID;
		}
	}else{
		sync.log.error("Primary Key LEAVE_ENTRY_ID not specified in " + opName + " an item in TEAM_LVREQ_ATTACHMENTS");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("LEAVE_ENTRY_ID",opName,"TEAM_LVREQ_ATTACHMENTS")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.LV_ATTCH_SEQNO)){
		if(!kony.sync.isNull(pks.LV_ATTCH_SEQNO.value)){
			wc.key = "LV_ATTCH_SEQNO";
			wc.value = pks.LV_ATTCH_SEQNO.value;
		}
		else{
			wc.key = "LV_ATTCH_SEQNO";
			wc.value = pks.LV_ATTCH_SEQNO;
		}
	}else{
		sync.log.error("Primary Key LV_ATTCH_SEQNO not specified in " + opName + " an item in TEAM_LVREQ_ATTACHMENTS");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("LV_ATTCH_SEQNO",opName,"TEAM_LVREQ_ATTACHMENTS")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.validateNull function");
	return true;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.validateNullInsert function");
	if(kony.sync.isNull(valuestable.LEAVE_ENTRY_ID) || kony.sync.isEmptyString(valuestable.LEAVE_ENTRY_ID)){
		sync.log.error("Mandatory attribute LEAVE_ENTRY_ID is missing for the SyncObject TEAM_LVREQ_ATTACHMENTS.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LVREQ_ATTACHMENTS", "LEAVE_ENTRY_ID")));
		return false;
	}
	if(kony.sync.isNull(valuestable.LV_ATTCH_SEQNO) || kony.sync.isEmptyString(valuestable.LV_ATTCH_SEQNO)){
		sync.log.error("Mandatory attribute LV_ATTCH_SEQNO is missing for the SyncObject TEAM_LVREQ_ATTACHMENTS.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LVREQ_ATTACHMENTS", "LV_ATTCH_SEQNO")));
		return false;
	}
	return true;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getRelationshipMap function");
	var r1 = {};

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.BINARY_NAME)){
		r1.sourceAttribute.push("name") ;
		r1.foreignKeyAttribute.push("BINARY_NAME") ;
		r1.targetAttributeValue.push("'" + valuestable.BINARY_NAME+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.media===undefined){
			relationshipMap.media = [];
		}
		relationshipMap.media.push(r1);
	}
		
	return relationshipMap;
};


com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getTableName = function(){
	return "TEAM_LVREQ_ATTACHMENTS";
};




// **********************************End TEAM_LVREQ_ATTACHMENTS's helper methods************************