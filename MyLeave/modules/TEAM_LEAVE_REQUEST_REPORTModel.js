//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Sun Nov 05 01:01:22 UTC 2017TEAM_LEAVE_REQUEST_REPORT*******************
// **********************************Start TEAM_LEAVE_REQUEST_REPORT's helper methods************************
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
* Creates new TEAM_LEAVE_REQUEST_REPORT
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT = function(){
	this.CANCEL_DATE = null;
	this.CANCEL_TIME = null;
	this.COMMENTS = null;
	this.CREATE_DATE = null;
	this.CREATE_TIME = null;
	this.DELETE_IND = null;
	this.EMPNUMBER = null;
	this.EXTRACT_TSTAMP = null;
	this.LEAVE_BALANCE_D = null;
	this.LEAVE_BALANCE_H = null;
	this.LEAVE_ENDDATE = null;
	this.LEAVE_ENDTIME = null;
	this.LEAVE_FROMDATE = null;
	this.LEAVE_FROMTIME = null;
	this.LEAVE_HRS = null;
	this.LEAVE_TYPE = null;
	this.LEAVE_TYPE_TEXT = null;
	this.LV_STATUS = null;
	this.PROCESS_DATE = null;
	this.PROCESS_TIME = null;
	this.REQUEST_ID = null;
	this.STATUS = null;
	this.TIMESTAMP = null;
	this.markForUpload = true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype = {
	get CANCEL_DATE(){
		return this._CANCEL_DATE;
	},
	set CANCEL_DATE(val){
		this._CANCEL_DATE = val;
	},
	get CANCEL_TIME(){
		return this._CANCEL_TIME;
	},
	set CANCEL_TIME(val){
		this._CANCEL_TIME = val;
	},
	get COMMENTS(){
		return this._COMMENTS;
	},
	set COMMENTS(val){
		this._COMMENTS = val;
	},
	get CREATE_DATE(){
		return this._CREATE_DATE;
	},
	set CREATE_DATE(val){
		this._CREATE_DATE = val;
	},
	get CREATE_TIME(){
		return this._CREATE_TIME;
	},
	set CREATE_TIME(val){
		this._CREATE_TIME = val;
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
	get EXTRACT_TSTAMP(){
		return this._EXTRACT_TSTAMP;
	},
	set EXTRACT_TSTAMP(val){
		this._EXTRACT_TSTAMP = val;
	},
	get LEAVE_BALANCE_D(){
		return this._LEAVE_BALANCE_D;
	},
	set LEAVE_BALANCE_D(val){
		if(!kony.sync.isEmptyString(val) && !kony.sync.isNull(val) && !kony.sync.isValidNumberType(val)){
			sync.log.error("Invalid data type for the attribute LEAVE_BALANCE_D in TEAM_LEAVE_REQUEST_REPORT.\nExpected:\"double\"\nActual:\"" + kony.type(val) + "\"");
		}
		this._LEAVE_BALANCE_D = val;
	},
	get LEAVE_BALANCE_H(){
		return this._LEAVE_BALANCE_H;
	},
	set LEAVE_BALANCE_H(val){
		if(!kony.sync.isEmptyString(val) && !kony.sync.isNull(val) && !kony.sync.isValidNumberType(val)){
			sync.log.error("Invalid data type for the attribute LEAVE_BALANCE_H in TEAM_LEAVE_REQUEST_REPORT.\nExpected:\"double\"\nActual:\"" + kony.type(val) + "\"");
		}
		this._LEAVE_BALANCE_H = val;
	},
	get LEAVE_ENDDATE(){
		return this._LEAVE_ENDDATE;
	},
	set LEAVE_ENDDATE(val){
		this._LEAVE_ENDDATE = val;
	},
	get LEAVE_ENDTIME(){
		return this._LEAVE_ENDTIME;
	},
	set LEAVE_ENDTIME(val){
		this._LEAVE_ENDTIME = val;
	},
	get LEAVE_FROMDATE(){
		return this._LEAVE_FROMDATE;
	},
	set LEAVE_FROMDATE(val){
		this._LEAVE_FROMDATE = val;
	},
	get LEAVE_FROMTIME(){
		return this._LEAVE_FROMTIME;
	},
	set LEAVE_FROMTIME(val){
		this._LEAVE_FROMTIME = val;
	},
	get LEAVE_HRS(){
		return this._LEAVE_HRS;
	},
	set LEAVE_HRS(val){
		if(!kony.sync.isEmptyString(val) && !kony.sync.isNull(val) && !kony.sync.isValidNumberType(val)){
			sync.log.error("Invalid data type for the attribute LEAVE_HRS in TEAM_LEAVE_REQUEST_REPORT.\nExpected:\"double\"\nActual:\"" + kony.type(val) + "\"");
		}
		this._LEAVE_HRS = val;
	},
	get LEAVE_TYPE(){
		return this._LEAVE_TYPE;
	},
	set LEAVE_TYPE(val){
		this._LEAVE_TYPE = val;
	},
	get LEAVE_TYPE_TEXT(){
		return this._LEAVE_TYPE_TEXT;
	},
	set LEAVE_TYPE_TEXT(val){
		this._LEAVE_TYPE_TEXT = val;
	},
	get LV_STATUS(){
		return this._LV_STATUS;
	},
	set LV_STATUS(val){
		this._LV_STATUS = val;
	},
	get PROCESS_DATE(){
		return this._PROCESS_DATE;
	},
	set PROCESS_DATE(val){
		this._PROCESS_DATE = val;
	},
	get PROCESS_TIME(){
		return this._PROCESS_TIME;
	},
	set PROCESS_TIME(val){
		this._PROCESS_TIME = val;
	},
	get REQUEST_ID(){
		return this._REQUEST_ID;
	},
	set REQUEST_ID(val){
		this._REQUEST_ID = val;
	},
	get STATUS(){
		return this._STATUS;
	},
	set STATUS(val){
		this._STATUS = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
};

/************************************************************************************
* Retrieves all instances of TEAM_LEAVE_REQUEST_REPORT SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "CANCEL_DATE";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "CANCEL_TIME";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	orderByMap = kony.sync.formOrderByClause("TEAM_LEAVE_REQUEST_REPORT",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAll->successcallback");
		successcallback(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LEAVE_REQUEST_REPORT present in local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllCount function");
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LEAVE_REQUEST_REPORT using where clause in the local Database
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCount->successcallback");
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
* Creates a new instance of TEAM_LEAVE_REQUEST_REPORT in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_REPORT",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getRelationshipMap(relationshipMap,valuestable);
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
		errMsg = errMsg + ", REQUEST_ID=" + valuestable.REQUEST_ID;
		pks["REQUEST_ID"] = {key:"REQUEST_ID",value:valuestable.REQUEST_ID};
		com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of TEAM_LEAVE_REQUEST_REPORT in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].CANCEL_DATE = "CANCEL_DATE_0";
*		valuesArray[0].CANCEL_TIME = "CANCEL_TIME_0";
*		valuesArray[0].COMMENTS = "COMMENTS_0";
*		valuesArray[0].CREATE_DATE = "CREATE_DATE_0";
*		valuesArray[0].CREATE_TIME = "CREATE_TIME_0";
*		valuesArray[0].EMPNUMBER = "EMPNUMBER_0";
*		valuesArray[0].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_0";
*		valuesArray[0].LEAVE_BALANCE_D = 0;
*		valuesArray[0].LEAVE_BALANCE_H = 0;
*		valuesArray[0].LEAVE_ENDDATE = "LEAVE_ENDDATE_0";
*		valuesArray[0].LEAVE_ENDTIME = "LEAVE_ENDTIME_0";
*		valuesArray[0].LEAVE_FROMDATE = "LEAVE_FROMDATE_0";
*		valuesArray[0].LEAVE_FROMTIME = "LEAVE_FROMTIME_0";
*		valuesArray[0].LEAVE_HRS = 0;
*		valuesArray[0].LEAVE_TYPE = "LEAVE_TYPE_0";
*		valuesArray[0].LEAVE_TYPE_TEXT = "LEAVE_TYPE_TEXT_0";
*		valuesArray[0].LV_STATUS = "LV_STATUS_0";
*		valuesArray[0].PROCESS_DATE = "PROCESS_DATE_0";
*		valuesArray[0].PROCESS_TIME = "PROCESS_TIME_0";
*		valuesArray[0].REQUEST_ID = "REQUEST_ID_0";
*		valuesArray[0].STATUS = "STATUS_0";
*		valuesArray[1] = {};
*		valuesArray[1].CANCEL_DATE = "CANCEL_DATE_1";
*		valuesArray[1].CANCEL_TIME = "CANCEL_TIME_1";
*		valuesArray[1].COMMENTS = "COMMENTS_1";
*		valuesArray[1].CREATE_DATE = "CREATE_DATE_1";
*		valuesArray[1].CREATE_TIME = "CREATE_TIME_1";
*		valuesArray[1].EMPNUMBER = "EMPNUMBER_1";
*		valuesArray[1].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_1";
*		valuesArray[1].LEAVE_BALANCE_D = 1;
*		valuesArray[1].LEAVE_BALANCE_H = 1;
*		valuesArray[1].LEAVE_ENDDATE = "LEAVE_ENDDATE_1";
*		valuesArray[1].LEAVE_ENDTIME = "LEAVE_ENDTIME_1";
*		valuesArray[1].LEAVE_FROMDATE = "LEAVE_FROMDATE_1";
*		valuesArray[1].LEAVE_FROMTIME = "LEAVE_FROMTIME_1";
*		valuesArray[1].LEAVE_HRS = 1;
*		valuesArray[1].LEAVE_TYPE = "LEAVE_TYPE_1";
*		valuesArray[1].LEAVE_TYPE_TEXT = "LEAVE_TYPE_TEXT_1";
*		valuesArray[1].LV_STATUS = "LV_STATUS_1";
*		valuesArray[1].PROCESS_DATE = "PROCESS_DATE_1";
*		valuesArray[1].PROCESS_TIME = "PROCESS_TIME_1";
*		valuesArray[1].REQUEST_ID = "REQUEST_ID_1";
*		valuesArray[1].STATUS = "STATUS_1";
*		valuesArray[2] = {};
*		valuesArray[2].CANCEL_DATE = "CANCEL_DATE_2";
*		valuesArray[2].CANCEL_TIME = "CANCEL_TIME_2";
*		valuesArray[2].COMMENTS = "COMMENTS_2";
*		valuesArray[2].CREATE_DATE = "CREATE_DATE_2";
*		valuesArray[2].CREATE_TIME = "CREATE_TIME_2";
*		valuesArray[2].EMPNUMBER = "EMPNUMBER_2";
*		valuesArray[2].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_2";
*		valuesArray[2].LEAVE_BALANCE_D = 2;
*		valuesArray[2].LEAVE_BALANCE_H = 2;
*		valuesArray[2].LEAVE_ENDDATE = "LEAVE_ENDDATE_2";
*		valuesArray[2].LEAVE_ENDTIME = "LEAVE_ENDTIME_2";
*		valuesArray[2].LEAVE_FROMDATE = "LEAVE_FROMDATE_2";
*		valuesArray[2].LEAVE_FROMTIME = "LEAVE_FROMTIME_2";
*		valuesArray[2].LEAVE_HRS = 2;
*		valuesArray[2].LEAVE_TYPE = "LEAVE_TYPE_2";
*		valuesArray[2].LEAVE_TYPE_TEXT = "LEAVE_TYPE_TEXT_2";
*		valuesArray[2].LV_STATUS = "LV_STATUS_2";
*		valuesArray[2].PROCESS_DATE = "PROCESS_DATE_2";
*		valuesArray[2].PROCESS_TIME = "PROCESS_TIME_2";
*		valuesArray[2].REQUEST_ID = "REQUEST_ID_2";
*		valuesArray[2].STATUS = "STATUS_2";
*		com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_REPORT",errorcallback,true)===false){
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
				errMsg = errMsg + ", REQUEST_ID=" + valuestable.REQUEST_ID;
				pks["REQUEST_ID"] = {key:"REQUEST_ID",value:valuestable.REQUEST_ID};
				var wcs = [];
				if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates TEAM_LEAVE_REQUEST_REPORT using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_REPORT",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates TEAM_LEAVE_REQUEST_REPORT(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_REPORT",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPKTable());
	}
};

/************************************************************************************
* Updates TEAM_LEAVE_REQUEST_REPORT(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.CANCEL_DATE = "CANCEL_DATE_updated0";
*		inputArray[0].changeSet.CANCEL_TIME = "CANCEL_TIME_updated0";
*		inputArray[0].changeSet.COMMENTS = "COMMENTS_updated0";
*		inputArray[0].changeSet.CREATE_DATE = "CREATE_DATE_updated0";
*		inputArray[0].whereClause = "where EMPNUMBER = '0'";
*		inputArray[0].whereClause = "where REQUEST_ID = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.CANCEL_DATE = "CANCEL_DATE_updated1";
*		inputArray[1].changeSet.CANCEL_TIME = "CANCEL_TIME_updated1";
*		inputArray[1].changeSet.COMMENTS = "COMMENTS_updated1";
*		inputArray[1].changeSet.CREATE_DATE = "CREATE_DATE_updated1";
*		inputArray[1].whereClause = "where EMPNUMBER = '1'";
*		inputArray[1].whereClause = "where REQUEST_ID = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.CANCEL_DATE = "CANCEL_DATE_updated2";
*		inputArray[2].changeSet.CANCEL_TIME = "CANCEL_TIME_updated2";
*		inputArray[2].changeSet.COMMENTS = "COMMENTS_updated2";
*		inputArray[2].changeSet.CREATE_DATE = "CREATE_DATE_updated2";
*		inputArray[2].whereClause = "where EMPNUMBER = '2'";
*		inputArray[2].whereClause = "where REQUEST_ID = '2'";
*		com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "TEAM_LEAVE_REQUEST_REPORT";
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_REPORT",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPKTable());
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes TEAM_LEAVE_REQUEST_REPORT using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TEAM_LEAVE_REQUEST_REPORTTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK->TEAM_LEAVE_REQUEST_REPORT_PKPresent successcallback");
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
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("EMPNUMBER") ;
			targetAttributes.push("EMPNUMBER") ;
			srcAttributes.push("REQUEST_ID") ;
			targetAttributes.push("REQUEST_ID") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade,"TEAM_LEAVE_REQUEST_ENTRY",false, errorcallback, markForUpload, record, false)){
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
	
	function TEAM_LEAVE_REQUEST_REPORTErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TEAM_LEAVE_REQUEST_REPORTSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TEAM_LEAVE_REQUEST_REPORTTransactionCallback, TEAM_LEAVE_REQUEST_REPORTSuccessCallback, TEAM_LEAVE_REQUEST_REPORTErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes TEAM_LEAVE_REQUEST_REPORT(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove("where CANCEL_DATE like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_LEAVE_REQUEST_REPORT_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("EMPNUMBER") ;
			targetAttributes.push("EMPNUMBER") ;
			srcAttributes.push("REQUEST_ID") ;
			targetAttributes.push("REQUEST_ID") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade, "TEAM_LEAVE_REQUEST_ENTRY", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
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
	function TEAM_LEAVE_REQUEST_REPORT_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove->TEAM_LEAVE_REQUEST_REPORT_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LEAVE_REQUEST_REPORT_removeTransactioncallback, TEAM_LEAVE_REQUEST_REPORT_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes TEAM_LEAVE_REQUEST_REPORT using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TEAM_LEAVE_REQUEST_REPORTTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK -> TEAM_LEAVE_REQUEST_REPORTTransactionCallback");
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
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("EMPNUMBER") ;
			targetAttributes.push("EMPNUMBER") ;
			srcAttributes.push("REQUEST_ID") ;
			targetAttributes.push("REQUEST_ID") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade,"TEAM_LEAVE_REQUEST_ENTRY",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function TEAM_LEAVE_REQUEST_REPORTErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK -> TEAM_LEAVE_REQUEST_REPORTErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TEAM_LEAVE_REQUEST_REPORTSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK -> TEAM_LEAVE_REQUEST_REPORTSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TEAM_LEAVE_REQUEST_REPORTTransactionCallback, TEAM_LEAVE_REQUEST_REPORTSuccessCallback, TEAM_LEAVE_REQUEST_REPORTErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes TEAM_LEAVE_REQUEST_REPORT(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_LEAVE_REQUEST_REPORT_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("EMPNUMBER") ;
			targetAttributes.push("EMPNUMBER") ;
			srcAttributes.push("REQUEST_ID") ;
			targetAttributes.push("REQUEST_ID") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade, "TEAM_LEAVE_REQUEST_ENTRY", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
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
	function TEAM_LEAVE_REQUEST_REPORT_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove->TEAM_LEAVE_REQUEST_REPORT_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LEAVE_REQUEST_REPORT_removeTransactioncallback, TEAM_LEAVE_REQUEST_REPORT_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves TEAM_LEAVE_REQUEST_REPORT using primary key from the local Database. 
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves TEAM_LEAVE_REQUEST_REPORT(s) using where clause from the local Database. 
* e.g. com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.find("where CANCEL_DATE like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of TEAM_LEAVE_REQUEST_REPORT with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of TEAM_LEAVE_REQUEST_REPORT matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of TEAM_LEAVE_REQUEST_REPORT pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LEAVE_REQUEST_REPORT pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LEAVE_REQUEST_REPORT deferred for upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to TEAM_LEAVE_REQUEST_REPORT in local database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to TEAM_LEAVE_REQUEST_REPORT's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether TEAM_LEAVE_REQUEST_REPORT's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether TEAM_LEAVE_REQUEST_REPORT's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of TEAM_LEAVE_REQUEST_ENTRY related to TEAM_LEAVE_REQUEST_REPORT
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

										
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_LEAVE_REQUEST_REPORT_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].EMPNUMBER;				
			wcs.push({key:"EMPNUMBER", value:targetKey_0});		
						var targetKey_1 = res[0].REQUEST_ID;				
			wcs.push({key:"REQUEST_ID", value:targetKey_1});		
			
			var tbname = "TEAM_LEAVE_REQUEST_ENTRY"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY();
				obj.APPROVAL_DATE = res[i].APPROVAL_DATE;
				obj.CANCEL_COMMENTS = res[i].CANCEL_COMMENTS;
				obj.CANCEL_DATE = res[i].CANCEL_DATE;
				obj.CANCEL_TIME = res[i].CANCEL_TIME;
				obj.COMMENTS = res[i].COMMENTS;
				obj.CREATE_DATE = res[i].CREATE_DATE;
				obj.CREATE_TIME = res[i].CREATE_TIME;
				obj.DELETE_IND = res[i].DELETE_IND;
				obj.EMPNUMBER = res[i].EMPNUMBER;
				obj.EXTRACT_TSTAMP = res[i].EXTRACT_TSTAMP;
				obj.ISERROR = res[i].ISERROR;
				obj.LEAVE_DAYS = res[i].LEAVE_DAYS;
				obj.LEAVE_ENDDATE = res[i].LEAVE_ENDDATE;
				obj.LEAVE_ENDTIME = res[i].LEAVE_ENDTIME;
				obj.LEAVE_ENTRY_ID = res[i].LEAVE_ENTRY_ID;
				obj.LEAVE_FROMDATE = res[i].LEAVE_FROMDATE;
				obj.LEAVE_FROMTIME = res[i].LEAVE_FROMTIME;
				obj.LEAVE_HRS = res[i].LEAVE_HRS;
				obj.LEAVE_TYPE = res[i].LEAVE_TYPE;
				obj.LV_STATUS = res[i].LV_STATUS;
				obj.MGR_COMMENTS = res[i].MGR_COMMENTS;
				obj.PROCESS_DATE = res[i].PROCESS_DATE;
				obj.PROCESS_TIME = res[i].PROCESS_TIME;
				obj.REQUEST_ID = res[i].REQUEST_ID;
				obj.STATUS = res[i].STATUS;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				obj.TYPE = res[i].TYPE;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_REPORT_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of TEAM_LEAVE_REQUEST_ENTRY related to TEAM_LEAVE_REQUEST_REPORT
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getCountOfTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getCountOfTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCountOfTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCountOfTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCountOfTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getCountOfTEAM_LEAVE_REQUEST_ENTRYWithEMPNUMBERANDREQUEST_ID",  "relationship", errorcallback)){
		return;
	}
	function TEAM_LEAVE_REQUEST_REPORT_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].EMPNUMBER;
					targetAttributes.push("EMPNUMBER");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"EMPNUMBER":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"EMPNUMBER":targetKey_0});
					} 
														var targetKey_1 = res[0].REQUEST_ID;
					targetAttributes.push("REQUEST_ID");
					if(kony.type(targetKey_1)==="string") {
						wcs.push({"REQUEST_ID":"'"+targetKey_1+"'"});
					}else{
						wcs.push({"REQUEST_ID":targetKey_1});
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
		   com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_REPORT_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.removeCascade function");
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("EMPNUMBER") ;
			targetAttributes.push("EMPNUMBER") ;
			srcAttributes.push("REQUEST_ID") ;
			targetAttributes.push("REQUEST_ID") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade, "TEAM_LEAVE_REQUEST_ENTRY", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
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


com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.convertTableToObject function");
	objMap = [];
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
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.filterAttributes function");
	var attributeTable = {};
	attributeTable.CANCEL_DATE = "CANCEL_DATE";
	attributeTable.CANCEL_TIME = "CANCEL_TIME";
	attributeTable.COMMENTS = "COMMENTS";
	attributeTable.CREATE_DATE = "CREATE_DATE";
	attributeTable.CREATE_TIME = "CREATE_TIME";
	attributeTable.EMPNUMBER = "EMPNUMBER";
	attributeTable.EXTRACT_TSTAMP = "EXTRACT_TSTAMP";
	attributeTable.LEAVE_BALANCE_D = "LEAVE_BALANCE_D";
	attributeTable.LEAVE_BALANCE_H = "LEAVE_BALANCE_H";
	attributeTable.LEAVE_ENDDATE = "LEAVE_ENDDATE";
	attributeTable.LEAVE_ENDTIME = "LEAVE_ENDTIME";
	attributeTable.LEAVE_FROMDATE = "LEAVE_FROMDATE";
	attributeTable.LEAVE_FROMTIME = "LEAVE_FROMTIME";
	attributeTable.LEAVE_HRS = "LEAVE_HRS";
	attributeTable.LEAVE_TYPE = "LEAVE_TYPE";
	attributeTable.LEAVE_TYPE_TEXT = "LEAVE_TYPE_TEXT";
	attributeTable.LV_STATUS = "LV_STATUS";
	attributeTable.PROCESS_DATE = "PROCESS_DATE";
	attributeTable.PROCESS_TIME = "PROCESS_TIME";
	attributeTable.REQUEST_ID = "REQUEST_ID";
	attributeTable.STATUS = "STATUS";

	var PKTable = {};
	PKTable.EMPNUMBER = {}
	PKTable.EMPNUMBER.name = "EMPNUMBER";
	PKTable.EMPNUMBER.isAutoGen = false;
	PKTable.REQUEST_ID = {}
	PKTable.REQUEST_ID.name = "REQUEST_ID";
	PKTable.REQUEST_ID.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject TEAM_LEAVE_REQUEST_REPORT. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject TEAM_LEAVE_REQUEST_REPORT. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject TEAM_LEAVE_REQUEST_REPORT. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.CANCEL_DATE = this.CANCEL_DATE;
	valuesTable.CANCEL_TIME = this.CANCEL_TIME;
	valuesTable.COMMENTS = this.COMMENTS;
	valuesTable.CREATE_DATE = this.CREATE_DATE;
	valuesTable.CREATE_TIME = this.CREATE_TIME;
	if(isInsert===true){
		valuesTable.EMPNUMBER = this.EMPNUMBER;
	}
	valuesTable.EXTRACT_TSTAMP = this.EXTRACT_TSTAMP;
	valuesTable.LEAVE_BALANCE_D = this.LEAVE_BALANCE_D;
	valuesTable.LEAVE_BALANCE_H = this.LEAVE_BALANCE_H;
	valuesTable.LEAVE_ENDDATE = this.LEAVE_ENDDATE;
	valuesTable.LEAVE_ENDTIME = this.LEAVE_ENDTIME;
	valuesTable.LEAVE_FROMDATE = this.LEAVE_FROMDATE;
	valuesTable.LEAVE_FROMTIME = this.LEAVE_FROMTIME;
	valuesTable.LEAVE_HRS = this.LEAVE_HRS;
	valuesTable.LEAVE_TYPE = this.LEAVE_TYPE;
	valuesTable.LEAVE_TYPE_TEXT = this.LEAVE_TYPE_TEXT;
	valuesTable.LV_STATUS = this.LV_STATUS;
	valuesTable.PROCESS_DATE = this.PROCESS_DATE;
	valuesTable.PROCESS_TIME = this.PROCESS_TIME;
	if(isInsert===true){
		valuesTable.REQUEST_ID = this.REQUEST_ID;
	}
	valuesTable.STATUS = this.STATUS;
	return valuesTable;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.prototype.getPKTable function");
	var pkTable = {};
	pkTable.EMPNUMBER = {key:"EMPNUMBER",value:this.EMPNUMBER};
	pkTable.REQUEST_ID = {key:"REQUEST_ID",value:this.REQUEST_ID};
	return pkTable;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getPKTable function");
	var pkTable = [];
	pkTable.push("EMPNUMBER");
	pkTable.push("REQUEST_ID");
	return pkTable;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.pkCheck function");
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
		sync.log.error("Primary Key EMPNUMBER not specified in " + opName + " an item in TEAM_LEAVE_REQUEST_REPORT");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("EMPNUMBER",opName,"TEAM_LEAVE_REQUEST_REPORT")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.REQUEST_ID)){
		if(!kony.sync.isNull(pks.REQUEST_ID.value)){
			wc.key = "REQUEST_ID";
			wc.value = pks.REQUEST_ID.value;
		}
		else{
			wc.key = "REQUEST_ID";
			wc.value = pks.REQUEST_ID;
		}
	}else{
		sync.log.error("Primary Key REQUEST_ID not specified in " + opName + " an item in TEAM_LEAVE_REQUEST_REPORT");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("REQUEST_ID",opName,"TEAM_LEAVE_REQUEST_REPORT")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.validateNull function");
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.validateNullInsert function");
	if(kony.sync.isNull(valuestable.EMPNUMBER) || kony.sync.isEmptyString(valuestable.EMPNUMBER)){
		sync.log.error("Mandatory attribute EMPNUMBER is missing for the SyncObject TEAM_LEAVE_REQUEST_REPORT.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LEAVE_REQUEST_REPORT", "EMPNUMBER")));
		return false;
	}
	if(kony.sync.isNull(valuestable.REQUEST_ID) || kony.sync.isEmptyString(valuestable.REQUEST_ID)){
		sync.log.error("Mandatory attribute REQUEST_ID is missing for the SyncObject TEAM_LEAVE_REQUEST_REPORT.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LEAVE_REQUEST_REPORT", "REQUEST_ID")));
		return false;
	}
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_REPORT.getTableName = function(){
	return "TEAM_LEAVE_REQUEST_REPORT";
};




// **********************************End TEAM_LEAVE_REQUEST_REPORT's helper methods************************