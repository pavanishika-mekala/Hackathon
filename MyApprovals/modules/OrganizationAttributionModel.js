//****************Sync Version:Sync-Dev-8.0.0_v201711101237_r14*******************
// ****************Generated On Mon Dec 11 21:58:46 UTC 2017OrganizationAttribution*******************
// **********************************Start OrganizationAttribution's helper methods************************
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
if(typeof(com.ess)=== "undefined"){ com.ess = {}; }
if(typeof(com.ess.EMPLOYEE)=== "undefined"){ com.ess.EMPLOYEE = {}; }

/************************************************************************************
* Creates new OrganizationAttribution
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution = function(){
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

com.ess.EMPLOYEE.OrganizationAttribution.prototype = {
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
* Retrieves all instances of OrganizationAttribution SyncObject present in local database with
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
* com.ess.EMPLOYEE.OrganizationAttribution.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	orderByMap = kony.sync.formOrderByClause("OrganizationAttribution",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getAll->successcallback");
		successcallback(com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of OrganizationAttribution present in local database.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getAllCount function");
	com.ess.EMPLOYEE.OrganizationAttribution.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of OrganizationAttribution using where clause in the local Database
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getCount->successcallback");
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
* Creates a new instance of OrganizationAttribution in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.ess.EMPLOYEE.OrganizationAttribution.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.OrganizationAttribution.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"OrganizationAttribution",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.OrganizationAttribution.getRelationshipMap(relationshipMap,valuestable);
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
		com.ess.EMPLOYEE.OrganizationAttribution.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of OrganizationAttribution in the local Database. These new 
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
*		com.ess.EMPLOYEE.OrganizationAttribution.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"OrganizationAttribution",errorcallback,true)===false){
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
				if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.OrganizationAttribution.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates OrganizationAttribution using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.ess.EMPLOYEE.OrganizationAttribution.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.OrganizationAttribution.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"OrganizationAttribution",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.ess.EMPLOYEE.OrganizationAttribution.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates OrganizationAttribution(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"OrganizationAttribution",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.OrganizationAttribution.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.ess.EMPLOYEE.OrganizationAttribution.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.OrganizationAttribution.getPKTable());
	}
};

/************************************************************************************
* Updates OrganizationAttribution(s) satisfying one or more where clauses in the local Database. 
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
*		com.ess.EMPLOYEE.OrganizationAttribution.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100004737b2bb0f56";
	var tbname = "OrganizationAttribution";
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
			if(kony.sync.attributeValidation(valuestable,"OrganizationAttribution",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.ess.EMPLOYEE.OrganizationAttribution.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.ess.EMPLOYEE.OrganizationAttribution.getPKTable());
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.ess.EMPLOYEE.OrganizationAttribution.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes OrganizationAttribution using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function OrganizationAttributionTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK->OrganizationAttribution_PKPresent successcallback");
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
	
	function OrganizationAttributionErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function OrganizationAttributionSuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.OrganizationAttribution.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, OrganizationAttributionTransactionCallback, OrganizationAttributionSuccessCallback, OrganizationAttributionErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes OrganizationAttribution(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.ess.EMPLOYEE.OrganizationAttribution.remove("where BEGDA like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;
	var record = "";

	function OrganizationAttribution_removeTransactioncallback(tx){
			wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function OrganizationAttribution_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.remove->OrganizationAttribution_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, OrganizationAttribution_removeTransactioncallback, OrganizationAttribution_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes OrganizationAttribution using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function OrganizationAttributionTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK -> OrganizationAttributionTransactionCallback");
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
	
	function OrganizationAttributionErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK -> OrganizationAttributionErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function OrganizationAttributionSuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK -> OrganizationAttributionSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, OrganizationAttributionTransactionCallback, OrganizationAttributionSuccessCallback, OrganizationAttributionErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes OrganizationAttribution(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function OrganizationAttribution_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function OrganizationAttribution_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.remove->OrganizationAttribution_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, OrganizationAttribution_removeTransactioncallback, OrganizationAttribution_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves OrganizationAttribution using primary key from the local Database. 
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.OrganizationAttribution.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.OrganizationAttribution.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getAllDetailsByPK-> success callback function");
		successcallback(com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves OrganizationAttribution(s) using where clause from the local Database. 
* e.g. com.ess.EMPLOYEE.OrganizationAttribution.find("where BEGDA like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of OrganizationAttribution with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.OrganizationAttribution.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.ess.EMPLOYEE.OrganizationAttribution.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of OrganizationAttribution matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.ess.EMPLOYEE.OrganizationAttribution.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of OrganizationAttribution pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of OrganizationAttribution pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of OrganizationAttribution deferred for upload.
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to OrganizationAttribution in local database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to OrganizationAttribution's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.OrganizationAttribution.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether OrganizationAttribution's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.OrganizationAttribution.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.OrganizationAttribution.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether OrganizationAttribution's record  
* with given primary key is pending for upload
*************************************************************************************/
com.ess.EMPLOYEE.OrganizationAttribution.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.OrganizationAttribution.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.OrganizationAttribution.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.OrganizationAttribution.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.OrganizationAttribution.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.OrganizationAttribution.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.isRecordPendingForUpload->successcallback function");
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
com.ess.EMPLOYEE.OrganizationAttribution.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.removeCascade function");
	var tbname = com.ess.EMPLOYEE.OrganizationAttribution.getTableName();
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


com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject = function(res){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.ess.EMPLOYEE.OrganizationAttribution();
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

com.ess.EMPLOYEE.OrganizationAttribution.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.filterAttributes function");
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
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject OrganizationAttribution. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject OrganizationAttribution. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject OrganizationAttribution. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.ess.EMPLOYEE.OrganizationAttribution.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.ess.EMPLOYEE.OrganizationAttribution.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.ess.EMPLOYEE.OrganizationAttribution.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.prototype.getValuesTable function");
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

com.ess.EMPLOYEE.OrganizationAttribution.prototype.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.prototype.getPKTable function");
	var pkTable = {};
	pkTable.BEGDA = {key:"BEGDA",value:this.BEGDA};
	pkTable.EMPNUMBER = {key:"EMPNUMBER",value:this.EMPNUMBER};
	pkTable.ENDDA = {key:"ENDDA",value:this.ENDDA};
	return pkTable;
};

com.ess.EMPLOYEE.OrganizationAttribution.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getPKTable function");
	var pkTable = [];
	pkTable.push("BEGDA");
	pkTable.push("EMPNUMBER");
	pkTable.push("ENDDA");
	return pkTable;
};

com.ess.EMPLOYEE.OrganizationAttribution.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.pkCheck function");
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
		sync.log.error("Primary Key BEGDA not specified in " + opName + " an item in OrganizationAttribution");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("BEGDA",opName,"OrganizationAttribution")));
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
		sync.log.error("Primary Key EMPNUMBER not specified in " + opName + " an item in OrganizationAttribution");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("EMPNUMBER",opName,"OrganizationAttribution")));
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
		sync.log.error("Primary Key ENDDA not specified in " + opName + " an item in OrganizationAttribution");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("ENDDA",opName,"OrganizationAttribution")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.ess.EMPLOYEE.OrganizationAttribution.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.validateNull function");
	return true;
};

com.ess.EMPLOYEE.OrganizationAttribution.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.validateNullInsert function");
	if(kony.sync.isNull(valuestable.BEGDA) || kony.sync.isEmptyString(valuestable.BEGDA)){
		sync.log.error("Mandatory attribute BEGDA is missing for the SyncObject OrganizationAttribution.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "OrganizationAttribution", "BEGDA")));
		return false;
	}
	if(kony.sync.isNull(valuestable.EMPNUMBER) || kony.sync.isEmptyString(valuestable.EMPNUMBER)){
		sync.log.error("Mandatory attribute EMPNUMBER is missing for the SyncObject OrganizationAttribution.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "OrganizationAttribution", "EMPNUMBER")));
		return false;
	}
	if(kony.sync.isNull(valuestable.ENDDA) || kony.sync.isEmptyString(valuestable.ENDDA)){
		sync.log.error("Mandatory attribute ENDDA is missing for the SyncObject OrganizationAttribution.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "OrganizationAttribution", "ENDDA")));
		return false;
	}
	return true;
};

com.ess.EMPLOYEE.OrganizationAttribution.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.ess.EMPLOYEE.OrganizationAttribution.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.ess.EMPLOYEE.OrganizationAttribution.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.ess.EMPLOYEE.OrganizationAttribution.getTableName = function(){
	return "OrganizationAttribution";
};




// **********************************End OrganizationAttribution's helper methods************************