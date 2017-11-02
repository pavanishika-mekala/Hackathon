//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Thu Nov 02 11:15:29 UTC 2017TEAM_MEMBER_ORG_DATA*******************
// **********************************Start TEAM_MEMBER_ORG_DATA's helper methods************************
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
* Creates new TEAM_MEMBER_ORG_DATA
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA = function(){
	this.BEGDA = null;
	this.DELETE_IND = null;
	this.EMPNUMBER = null;
	this.ENDDA = null;
	this.EXTRACT_TSTAMP = null;
	this.MOFID = null;
	this.MOSID = null;
	this.SCHKZ = null;
	this.TIMESTAMP = null;
	this.ZEITY = null;
	this.markForUpload = true;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype = {
	get BEGDA(){
		return this._BEGDA;
	},
	set BEGDA(val){
		this._BEGDA = val;
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
	get ENDDA(){
		return this._ENDDA;
	},
	set ENDDA(val){
		this._ENDDA = val;
	},
	get EXTRACT_TSTAMP(){
		return this._EXTRACT_TSTAMP;
	},
	set EXTRACT_TSTAMP(val){
		this._EXTRACT_TSTAMP = val;
	},
	get MOFID(){
		return this._MOFID;
	},
	set MOFID(val){
		this._MOFID = val;
	},
	get MOSID(){
		return this._MOSID;
	},
	set MOSID(val){
		this._MOSID = val;
	},
	get SCHKZ(){
		return this._SCHKZ;
	},
	set SCHKZ(val){
		this._SCHKZ = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
	get ZEITY(){
		return this._ZEITY;
	},
	set ZEITY(val){
		this._ZEITY = val;
	},
};

/************************************************************************************
* Retrieves all instances of TEAM_MEMBER_ORG_DATA SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "BEGDA";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "DELETE_IND";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	orderByMap = kony.sync.formOrderByClause("TEAM_MEMBER_ORG_DATA",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAll->successcallback");
		successcallback(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_MEMBER_ORG_DATA present in local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllCount function");
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_MEMBER_ORG_DATA using where clause in the local Database
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCount->successcallback");
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
* Creates a new instance of TEAM_MEMBER_ORG_DATA in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"TEAM_MEMBER_ORG_DATA",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "BEGDA=" + valuestable.BEGDA;
		pks["BEGDA"] = {key:"BEGDA",value:valuestable.BEGDA};
		errMsg = errMsg + ", EMPNUMBER=" + valuestable.EMPNUMBER;
		pks["EMPNUMBER"] = {key:"EMPNUMBER",value:valuestable.EMPNUMBER};
		errMsg = errMsg + ", ENDDA=" + valuestable.ENDDA;
		pks["ENDDA"] = {key:"ENDDA",value:valuestable.ENDDA};
		com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of TEAM_MEMBER_ORG_DATA in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].BEGDA = "BEGDA_0";
*		valuesArray[0].EMPNUMBER = "EMPNUMBER_0";
*		valuesArray[0].ENDDA = "ENDDA_0";
*		valuesArray[0].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_0";
*		valuesArray[0].MOFID = "MOFID_0";
*		valuesArray[0].MOSID = "MOSID_0";
*		valuesArray[0].SCHKZ = "SCHKZ_0";
*		valuesArray[0].ZEITY = "ZEITY_0";
*		valuesArray[1] = {};
*		valuesArray[1].BEGDA = "BEGDA_1";
*		valuesArray[1].EMPNUMBER = "EMPNUMBER_1";
*		valuesArray[1].ENDDA = "ENDDA_1";
*		valuesArray[1].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_1";
*		valuesArray[1].MOFID = "MOFID_1";
*		valuesArray[1].MOSID = "MOSID_1";
*		valuesArray[1].SCHKZ = "SCHKZ_1";
*		valuesArray[1].ZEITY = "ZEITY_1";
*		valuesArray[2] = {};
*		valuesArray[2].BEGDA = "BEGDA_2";
*		valuesArray[2].EMPNUMBER = "EMPNUMBER_2";
*		valuesArray[2].ENDDA = "ENDDA_2";
*		valuesArray[2].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_2";
*		valuesArray[2].MOFID = "MOFID_2";
*		valuesArray[2].MOSID = "MOSID_2";
*		valuesArray[2].SCHKZ = "SCHKZ_2";
*		valuesArray[2].ZEITY = "ZEITY_2";
*		com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_MEMBER_ORG_DATA",errorcallback,true)===false){
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
				errMsg = "BEGDA=" + valuestable.BEGDA;
				pks["BEGDA"] = {key:"BEGDA",value:valuestable.BEGDA};
				errMsg = errMsg + ", EMPNUMBER=" + valuestable.EMPNUMBER;
				pks["EMPNUMBER"] = {key:"EMPNUMBER",value:valuestable.EMPNUMBER};
				errMsg = errMsg + ", ENDDA=" + valuestable.ENDDA;
				pks["ENDDA"] = {key:"ENDDA",value:valuestable.ENDDA};
				var wcs = [];
				if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates TEAM_MEMBER_ORG_DATA using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"TEAM_MEMBER_ORG_DATA",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates TEAM_MEMBER_ORG_DATA(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"TEAM_MEMBER_ORG_DATA",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPKTable());
	}
};

/************************************************************************************
* Updates TEAM_MEMBER_ORG_DATA(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated0";
*		inputArray[0].changeSet.MOFID = "MOFID_updated0";
*		inputArray[0].changeSet.MOSID = "MOSID_updated0";
*		inputArray[0].changeSet.SCHKZ = "SCHKZ_updated0";
*		inputArray[0].whereClause = "where BEGDA = '0'";
*		inputArray[0].whereClause = "where EMPNUMBER = '0'";
*		inputArray[0].whereClause = "where ENDDA = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated1";
*		inputArray[1].changeSet.MOFID = "MOFID_updated1";
*		inputArray[1].changeSet.MOSID = "MOSID_updated1";
*		inputArray[1].changeSet.SCHKZ = "SCHKZ_updated1";
*		inputArray[1].whereClause = "where BEGDA = '1'";
*		inputArray[1].whereClause = "where EMPNUMBER = '1'";
*		inputArray[1].whereClause = "where ENDDA = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated2";
*		inputArray[2].changeSet.MOFID = "MOFID_updated2";
*		inputArray[2].changeSet.MOSID = "MOSID_updated2";
*		inputArray[2].changeSet.SCHKZ = "SCHKZ_updated2";
*		inputArray[2].whereClause = "where BEGDA = '2'";
*		inputArray[2].whereClause = "where EMPNUMBER = '2'";
*		inputArray[2].whereClause = "where ENDDA = '2'";
*		com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "TEAM_MEMBER_ORG_DATA";
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_MEMBER_ORG_DATA",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPKTable());
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes TEAM_MEMBER_ORG_DATA using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TEAM_MEMBER_ORG_DATATransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK->TEAM_MEMBER_ORG_DATA_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("TEAM_EMPNUMBER");
 		targetAttributes.push("EMPNUMBER");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.TeamViewService.TEAM_VIEW.removeCascade,"TEAM_VIEW",false, errorcallback, markForUpload, record, false)){
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
	
	function TEAM_MEMBER_ORG_DATAErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TEAM_MEMBER_ORG_DATASuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TEAM_MEMBER_ORG_DATATransactionCallback, TEAM_MEMBER_ORG_DATASuccessCallback, TEAM_MEMBER_ORG_DATAErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes TEAM_MEMBER_ORG_DATA(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove("where BEGDA like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_MEMBER_ORG_DATA_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("TEAM_EMPNUMBER");
 		targetAttributes.push("EMPNUMBER");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_VIEW.removeCascade,"TEAM_VIEW",false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_MEMBER_ORG_DATA_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove->TEAM_MEMBER_ORG_DATA_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_MEMBER_ORG_DATA_removeTransactioncallback, TEAM_MEMBER_ORG_DATA_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes TEAM_MEMBER_ORG_DATA using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TEAM_MEMBER_ORG_DATATransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK -> TEAM_MEMBER_ORG_DATATransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("TEAM_EMPNUMBER");
 		targetAttributes.push("EMPNUMBER");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.TeamViewService.TEAM_VIEW.removeCascade,"TEAM_VIEW",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function TEAM_MEMBER_ORG_DATAErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK -> TEAM_MEMBER_ORG_DATAErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TEAM_MEMBER_ORG_DATASuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK -> TEAM_MEMBER_ORG_DATASuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TEAM_MEMBER_ORG_DATATransactionCallback, TEAM_MEMBER_ORG_DATASuccessCallback, TEAM_MEMBER_ORG_DATAErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes TEAM_MEMBER_ORG_DATA(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_MEMBER_ORG_DATA_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("TEAM_EMPNUMBER");
 		targetAttributes.push("EMPNUMBER");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_VIEW.removeCascade,"TEAM_VIEW",false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_MEMBER_ORG_DATA_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove->TEAM_MEMBER_ORG_DATA_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_MEMBER_ORG_DATA_removeTransactioncallback, TEAM_MEMBER_ORG_DATA_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves TEAM_MEMBER_ORG_DATA using primary key from the local Database. 
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves TEAM_MEMBER_ORG_DATA(s) using where clause from the local Database. 
* e.g. com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.find("where BEGDA like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of TEAM_MEMBER_ORG_DATA with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of TEAM_MEMBER_ORG_DATA matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of TEAM_MEMBER_ORG_DATA pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_MEMBER_ORG_DATA pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_MEMBER_ORG_DATA deferred for upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to TEAM_MEMBER_ORG_DATA in local database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to TEAM_MEMBER_ORG_DATA's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether TEAM_MEMBER_ORG_DATA's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether TEAM_MEMBER_ORG_DATA's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of TEAM_HOLIDAY_CALENDAR related to TEAM_MEMBER_ORG_DATA
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

																				
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_MEMBER_ORG_DATA_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].MOFID;				
			wcs.push({key:"MOFID", value:targetKey_0});		
						var targetKey_1 = res[0].MOSID;				
			wcs.push({key:"MOSID", value:targetKey_1});		
						var targetKey_2 = res[0].SCHKZ;				
			wcs.push({key:"SCHKZ", value:targetKey_2});		
						var targetKey_3 = res[0].ZEITY;				
			wcs.push({key:"ZEITY", value:targetKey_3});		
			
			var tbname = "TEAM_HOLIDAY_CALENDAR"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR();
				obj.DELETE_IND = res[i].DELETE_IND;
				obj.EXTRACT_TSTAMP = res[i].EXTRACT_TSTAMP;
				obj.KJAHR = res[i].KJAHR;
				obj.MOFID = res[i].MOFID;
				obj.MONAT = res[i].MONAT;
				obj.MOSID = res[i].MOSID;
				obj.NWDAY01 = res[i].NWDAY01;
				obj.NWDAY01_DESC = res[i].NWDAY01_DESC;
				obj.NWDAY02 = res[i].NWDAY02;
				obj.NWDAY02_DESC = res[i].NWDAY02_DESC;
				obj.NWDAY03 = res[i].NWDAY03;
				obj.NWDAY03_DESC = res[i].NWDAY03_DESC;
				obj.NWDAY04 = res[i].NWDAY04;
				obj.NWDAY04_DESC = res[i].NWDAY04_DESC;
				obj.NWDAY05 = res[i].NWDAY05;
				obj.NWDAY05_DESC = res[i].NWDAY05_DESC;
				obj.NWDAY06 = res[i].NWDAY06;
				obj.NWDAY06_DESC = res[i].NWDAY06_DESC;
				obj.NWDAY07 = res[i].NWDAY07;
				obj.NWDAY07_DESC = res[i].NWDAY07_DESC;
				obj.NWDAY08 = res[i].NWDAY08;
				obj.NWDAY08_DESC = res[i].NWDAY08_DESC;
				obj.NWDAY09 = res[i].NWDAY09;
				obj.NWDAY09_DESC = res[i].NWDAY09_DESC;
				obj.NWDAY10 = res[i].NWDAY10;
				obj.NWDAY10_DESC = res[i].NWDAY10_DESC;
				obj.NWDAY11 = res[i].NWDAY11;
				obj.NWDAY11_DESC = res[i].NWDAY11_DESC;
				obj.NWDAY12 = res[i].NWDAY12;
				obj.NWDAY12_DESC = res[i].NWDAY12_DESC;
				obj.NWDAY13 = res[i].NWDAY13;
				obj.NWDAY13_DESC = res[i].NWDAY13_DESC;
				obj.NWDAY14 = res[i].NWDAY14;
				obj.NWDAY14_DESC = res[i].NWDAY14_DESC;
				obj.NWDAY15 = res[i].NWDAY15;
				obj.NWDAY15_DESC = res[i].NWDAY15_DESC;
				obj.NWDAY16 = res[i].NWDAY16;
				obj.NWDAY16_DESC = res[i].NWDAY16_DESC;
				obj.NWDAY17 = res[i].NWDAY17;
				obj.NWDAY17_DESC = res[i].NWDAY17_DESC;
				obj.NWDAY18 = res[i].NWDAY18;
				obj.NWDAY18_DESC = res[i].NWDAY18_DESC;
				obj.NWDAY19 = res[i].NWDAY19;
				obj.NWDAY19_DESC = res[i].NWDAY19_DESC;
				obj.NWDAY20 = res[i].NWDAY20;
				obj.NWDAY20_DESC = res[i].NWDAY20_DESC;
				obj.NWDAY21 = res[i].NWDAY21;
				obj.NWDAY21_DESC = res[i].NWDAY21_DESC;
				obj.NWDAY22 = res[i].NWDAY22;
				obj.NWDAY22_DESC = res[i].NWDAY22_DESC;
				obj.NWDAY23 = res[i].NWDAY23;
				obj.NWDAY23_DESC = res[i].NWDAY23_DESC;
				obj.NWDAY24 = res[i].NWDAY24;
				obj.NWDAY24_DESC = res[i].NWDAY24_DESC;
				obj.NWDAY25 = res[i].NWDAY25;
				obj.NWDAY25_DESC = res[i].NWDAY25_DESC;
				obj.NWDAY26 = res[i].NWDAY26;
				obj.NWDAY26_DESC = res[i].NWDAY26_DESC;
				obj.NWDAY27 = res[i].NWDAY27;
				obj.NWDAY27_DESC = res[i].NWDAY27_DESC;
				obj.NWDAY28 = res[i].NWDAY28;
				obj.NWDAY28_DESC = res[i].NWDAY28_DESC;
				obj.NWDAY29 = res[i].NWDAY29;
				obj.NWDAY29_DESC = res[i].NWDAY29_DESC;
				obj.NWDAY30 = res[i].NWDAY30;
				obj.NWDAY30_DESC = res[i].NWDAY30_DESC;
				obj.NWDAY31 = res[i].NWDAY31;
				obj.NWDAY31_DESC = res[i].NWDAY31_DESC;
				obj.SCHKZ = res[i].SCHKZ;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				obj.ZEITY = res[i].ZEITY;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK(pks, TEAM_MEMBER_ORG_DATA_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of TEAM_HOLIDAY_CALENDAR related to TEAM_MEMBER_ORG_DATA
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getCountOfTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getCountOfTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCountOfTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCountOfTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCountOfTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getCountOfTEAM_HOLIDAY_CALENDARWithMOFIDANDMOSIDANDSCHKZANDZEITY",  "relationship", errorcallback)){
		return;
	}
	function TEAM_MEMBER_ORG_DATA_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].MOFID;
					targetAttributes.push("MOFID");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"MOFID":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"MOFID":targetKey_0});
					} 
														var targetKey_1 = res[0].MOSID;
					targetAttributes.push("MOSID");
					if(kony.type(targetKey_1)==="string") {
						wcs.push({"MOSID":"'"+targetKey_1+"'"});
					}else{
						wcs.push({"MOSID":targetKey_1});
					} 
														var targetKey_2 = res[0].SCHKZ;
					targetAttributes.push("SCHKZ");
					if(kony.type(targetKey_2)==="string") {
						wcs.push({"SCHKZ":"'"+targetKey_2+"'"});
					}else{
						wcs.push({"SCHKZ":targetKey_2});
					} 
														var targetKey_3 = res[0].ZEITY;
					targetAttributes.push("ZEITY");
					if(kony.type(targetKey_3)==="string") {
						wcs.push({"ZEITY":"'"+targetKey_3+"'"});
					}else{
						wcs.push({"ZEITY":targetKey_3});
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
		   com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getAllDetailsByPK(pks, TEAM_MEMBER_ORG_DATA_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeCascade function");
	var tbname = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("TEAM_EMPNUMBER");
 		targetAttributes.push("EMPNUMBER");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_VIEW.removeCascade,"TEAM_VIEW",false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA();
			obj.BEGDA = res[i].BEGDA;
			obj.DELETE_IND = res[i].DELETE_IND;
			obj.EMPNUMBER = res[i].EMPNUMBER;
			obj.ENDDA = res[i].ENDDA;
			obj.EXTRACT_TSTAMP = res[i].EXTRACT_TSTAMP;
			obj.MOFID = res[i].MOFID;
			obj.MOSID = res[i].MOSID;
			obj.SCHKZ = res[i].SCHKZ;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.ZEITY = res[i].ZEITY;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.filterAttributes function");
	var attributeTable = {};
	attributeTable.BEGDA = "BEGDA";
	attributeTable.EMPNUMBER = "EMPNUMBER";
	attributeTable.ENDDA = "ENDDA";
	attributeTable.EXTRACT_TSTAMP = "EXTRACT_TSTAMP";
	attributeTable.MOFID = "MOFID";
	attributeTable.MOSID = "MOSID";
	attributeTable.SCHKZ = "SCHKZ";
	attributeTable.ZEITY = "ZEITY";

	var PKTable = {};
	PKTable.BEGDA = {}
	PKTable.BEGDA.name = "BEGDA";
	PKTable.BEGDA.isAutoGen = false;
	PKTable.EMPNUMBER = {}
	PKTable.EMPNUMBER.name = "EMPNUMBER";
	PKTable.EMPNUMBER.isAutoGen = false;
	PKTable.ENDDA = {}
	PKTable.ENDDA.name = "ENDDA";
	PKTable.ENDDA.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject TEAM_MEMBER_ORG_DATA. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject TEAM_MEMBER_ORG_DATA. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject TEAM_MEMBER_ORG_DATA. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getValuesTable function");
	var valuesTable = {};
	if(isInsert===true){
		valuesTable.BEGDA = this.BEGDA;
	}
	if(isInsert===true){
		valuesTable.EMPNUMBER = this.EMPNUMBER;
	}
	if(isInsert===true){
		valuesTable.ENDDA = this.ENDDA;
	}
	valuesTable.EXTRACT_TSTAMP = this.EXTRACT_TSTAMP;
	valuesTable.MOFID = this.MOFID;
	valuesTable.MOSID = this.MOSID;
	valuesTable.SCHKZ = this.SCHKZ;
	valuesTable.ZEITY = this.ZEITY;
	return valuesTable;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.prototype.getPKTable function");
	var pkTable = {};
	pkTable.BEGDA = {key:"BEGDA",value:this.BEGDA};
	pkTable.EMPNUMBER = {key:"EMPNUMBER",value:this.EMPNUMBER};
	pkTable.ENDDA = {key:"ENDDA",value:this.ENDDA};
	return pkTable;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getPKTable function");
	var pkTable = [];
	pkTable.push("BEGDA");
	pkTable.push("EMPNUMBER");
	pkTable.push("ENDDA");
	return pkTable;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.BEGDA)){
		if(!kony.sync.isNull(pks.BEGDA.value)){
			wc.key = "BEGDA";
			wc.value = pks.BEGDA.value;
		}
		else{
			wc.key = "BEGDA";
			wc.value = pks.BEGDA;
		}
	}else{
		sync.log.error("Primary Key BEGDA not specified in " + opName + " an item in TEAM_MEMBER_ORG_DATA");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("BEGDA",opName,"TEAM_MEMBER_ORG_DATA")));
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
		sync.log.error("Primary Key EMPNUMBER not specified in " + opName + " an item in TEAM_MEMBER_ORG_DATA");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("EMPNUMBER",opName,"TEAM_MEMBER_ORG_DATA")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.ENDDA)){
		if(!kony.sync.isNull(pks.ENDDA.value)){
			wc.key = "ENDDA";
			wc.value = pks.ENDDA.value;
		}
		else{
			wc.key = "ENDDA";
			wc.value = pks.ENDDA;
		}
	}else{
		sync.log.error("Primary Key ENDDA not specified in " + opName + " an item in TEAM_MEMBER_ORG_DATA");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("ENDDA",opName,"TEAM_MEMBER_ORG_DATA")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.validateNull function");
	return true;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.validateNullInsert function");
	if(kony.sync.isNull(valuestable.BEGDA) || kony.sync.isEmptyString(valuestable.BEGDA)){
		sync.log.error("Mandatory attribute BEGDA is missing for the SyncObject TEAM_MEMBER_ORG_DATA.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_MEMBER_ORG_DATA", "BEGDA")));
		return false;
	}
	if(kony.sync.isNull(valuestable.EMPNUMBER) || kony.sync.isEmptyString(valuestable.EMPNUMBER)){
		sync.log.error("Mandatory attribute EMPNUMBER is missing for the SyncObject TEAM_MEMBER_ORG_DATA.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_MEMBER_ORG_DATA", "EMPNUMBER")));
		return false;
	}
	if(kony.sync.isNull(valuestable.ENDDA) || kony.sync.isEmptyString(valuestable.ENDDA)){
		sync.log.error("Mandatory attribute ENDDA is missing for the SyncObject TEAM_MEMBER_ORG_DATA.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_MEMBER_ORG_DATA", "ENDDA")));
		return false;
	}
	return true;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getRelationshipMap function");
	var r1 = {};

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.MOFID)){
		r1.sourceAttribute.push("MOFID") ;
		r1.foreignKeyAttribute.push("MOFID") ;
		r1.targetAttributeValue.push("'" + valuestable.MOFID+ "'");
	}
	if(!kony.sync.isNullOrUndefined(valuestable.MOSID)){
		r1.sourceAttribute.push("MOSID") ;
		r1.foreignKeyAttribute.push("MOSID") ;
		r1.targetAttributeValue.push("'" + valuestable.MOSID+ "'");
	}
	if(!kony.sync.isNullOrUndefined(valuestable.SCHKZ)){
		r1.sourceAttribute.push("SCHKZ") ;
		r1.foreignKeyAttribute.push("SCHKZ") ;
		r1.targetAttributeValue.push("'" + valuestable.SCHKZ+ "'");
	}
	if(!kony.sync.isNullOrUndefined(valuestable.ZEITY)){
		r1.sourceAttribute.push("ZEITY") ;
		r1.foreignKeyAttribute.push("ZEITY") ;
		r1.targetAttributeValue.push("'" + valuestable.ZEITY+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.TEAM_HOLIDAY_CALENDAR===undefined){
			relationshipMap.TEAM_HOLIDAY_CALENDAR = [];
		}
		relationshipMap.TEAM_HOLIDAY_CALENDAR.push(r1);
	}
		
	return relationshipMap;
};


com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.getTableName = function(){
	return "TEAM_MEMBER_ORG_DATA";
};




// **********************************End TEAM_MEMBER_ORG_DATA's helper methods************************