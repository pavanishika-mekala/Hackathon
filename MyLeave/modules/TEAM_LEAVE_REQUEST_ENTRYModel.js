//****************Sync Version:Sync-Dev-8.0.0_v201711101237_r14*******************
// ****************Generated On Wed Nov 29 10:59:54 UTC 2017TEAM_LEAVE_REQUEST_ENTRY*******************
// **********************************Start TEAM_LEAVE_REQUEST_ENTRY's helper methods************************
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
* Creates new TEAM_LEAVE_REQUEST_ENTRY
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY = function(){
	this.APPROVAL_DATE = null;
	this.CANCEL_COMMENTS = null;
	this.CANCEL_DATE = null;
	this.CANCEL_TIME = null;
	this.COMMENTS = null;
	this.CREATE_DATE = null;
	this.CREATE_TIME = null;
	this.DELETE_IND = null;
	this.EMPNUMBER = null;
	this.EXTRACT_TSTAMP = null;
	this.ISERROR = null;
	this.LEAVE_DAYS = null;
	this.LEAVE_ENDDATE = null;
	this.LEAVE_ENDTIME = null;
	this.LEAVE_ENTRY_ID = null;
	this.LEAVE_FROMDATE = null;
	this.LEAVE_FROMTIME = null;
	this.LEAVE_HRS = null;
	this.LEAVE_TYPE = null;
	this.LV_STATUS = null;
	this.MGR_COMMENTS = null;
	this.PROCESS_DATE = null;
	this.PROCESS_TIME = null;
	this.REQUEST_ID = null;
	this.STATUS = null;
	this.TIMESTAMP = null;
	this.TYPE = null;
	this.markForUpload = true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype = {
	get APPROVAL_DATE(){
		return this._APPROVAL_DATE;
	},
	set APPROVAL_DATE(val){
		this._APPROVAL_DATE = val;
	},
	get CANCEL_COMMENTS(){
		return this._CANCEL_COMMENTS;
	},
	set CANCEL_COMMENTS(val){
		this._CANCEL_COMMENTS = val;
	},
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
	get ISERROR(){
		return this._ISERROR;
	},
	set ISERROR(val){
		this._ISERROR = val;
	},
	get LEAVE_DAYS(){
		return this._LEAVE_DAYS;
	},
	set LEAVE_DAYS(val){
		if(!kony.sync.isEmptyString(val) && !kony.sync.isNull(val) && !kony.sync.isValidNumberType(val)){
			sync.log.error("Invalid data type for the attribute LEAVE_DAYS in TEAM_LEAVE_REQUEST_ENTRY.\nExpected:\"double\"\nActual:\"" + kony.type(val) + "\"");
		}
		this._LEAVE_DAYS = val;
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
	get LEAVE_ENTRY_ID(){
		return this._LEAVE_ENTRY_ID;
	},
	set LEAVE_ENTRY_ID(val){
		this._LEAVE_ENTRY_ID = val;
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
			sync.log.error("Invalid data type for the attribute LEAVE_HRS in TEAM_LEAVE_REQUEST_ENTRY.\nExpected:\"double\"\nActual:\"" + kony.type(val) + "\"");
		}
		this._LEAVE_HRS = val;
	},
	get LEAVE_TYPE(){
		return this._LEAVE_TYPE;
	},
	set LEAVE_TYPE(val){
		this._LEAVE_TYPE = val;
	},
	get LV_STATUS(){
		return this._LV_STATUS;
	},
	set LV_STATUS(val){
		this._LV_STATUS = val;
	},
	get MGR_COMMENTS(){
		return this._MGR_COMMENTS;
	},
	set MGR_COMMENTS(val){
		this._MGR_COMMENTS = val;
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
	get TYPE(){
		return this._TYPE;
	},
	set TYPE(val){
		this._TYPE = val;
	},
};

/************************************************************************************
* Retrieves all instances of TEAM_LEAVE_REQUEST_ENTRY SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "APPROVAL_DATE";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "CANCEL_COMMENTS";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	orderByMap = kony.sync.formOrderByClause("TEAM_LEAVE_REQUEST_ENTRY",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAll->successcallback");
		successcallback(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LEAVE_REQUEST_ENTRY present in local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllCount function");
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_LEAVE_REQUEST_ENTRY using where clause in the local Database
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCount->successcallback");
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
* Creates a new instance of TEAM_LEAVE_REQUEST_ENTRY in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_ENTRY",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getRelationshipMap(relationshipMap,valuestable);
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
		errMsg = errMsg + ", LEAVE_ENTRY_ID=" + valuestable.LEAVE_ENTRY_ID;
		pks["LEAVE_ENTRY_ID"] = {key:"LEAVE_ENTRY_ID",value:valuestable.LEAVE_ENTRY_ID};
		com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of TEAM_LEAVE_REQUEST_ENTRY in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].APPROVAL_DATE = "APPROVAL_DATE_0";
*		valuesArray[0].CANCEL_COMMENTS = "CANCEL_COMMENTS_0";
*		valuesArray[0].CANCEL_DATE = "CANCEL_DATE_0";
*		valuesArray[0].CANCEL_TIME = "CANCEL_TIME_0";
*		valuesArray[0].COMMENTS = "COMMENTS_0";
*		valuesArray[0].CREATE_DATE = "CREATE_DATE_0";
*		valuesArray[0].CREATE_TIME = "CREATE_TIME_0";
*		valuesArray[0].EMPNUMBER = "EMPNUMBER_0";
*		valuesArray[0].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_0";
*		valuesArray[0].ISERROR = "ISERROR_0";
*		valuesArray[0].LEAVE_DAYS = 0;
*		valuesArray[0].LEAVE_ENDDATE = "LEAVE_ENDDATE_0";
*		valuesArray[0].LEAVE_ENDTIME = "LEAVE_ENDTIME_0";
*		valuesArray[0].LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID_0";
*		valuesArray[0].LEAVE_FROMDATE = "LEAVE_FROMDATE_0";
*		valuesArray[0].LEAVE_FROMTIME = "LEAVE_FROMTIME_0";
*		valuesArray[0].LEAVE_HRS = 0;
*		valuesArray[0].LEAVE_TYPE = "LEAVE_TYPE_0";
*		valuesArray[0].LV_STATUS = "LV_STATUS_0";
*		valuesArray[0].MGR_COMMENTS = "MGR_COMMENTS_0";
*		valuesArray[0].PROCESS_DATE = "PROCESS_DATE_0";
*		valuesArray[0].PROCESS_TIME = "PROCESS_TIME_0";
*		valuesArray[0].REQUEST_ID = "REQUEST_ID_0";
*		valuesArray[0].STATUS = "STATUS_0";
*		valuesArray[0].TYPE = "TYPE_0";
*		valuesArray[1] = {};
*		valuesArray[1].APPROVAL_DATE = "APPROVAL_DATE_1";
*		valuesArray[1].CANCEL_COMMENTS = "CANCEL_COMMENTS_1";
*		valuesArray[1].CANCEL_DATE = "CANCEL_DATE_1";
*		valuesArray[1].CANCEL_TIME = "CANCEL_TIME_1";
*		valuesArray[1].COMMENTS = "COMMENTS_1";
*		valuesArray[1].CREATE_DATE = "CREATE_DATE_1";
*		valuesArray[1].CREATE_TIME = "CREATE_TIME_1";
*		valuesArray[1].EMPNUMBER = "EMPNUMBER_1";
*		valuesArray[1].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_1";
*		valuesArray[1].ISERROR = "ISERROR_1";
*		valuesArray[1].LEAVE_DAYS = 1;
*		valuesArray[1].LEAVE_ENDDATE = "LEAVE_ENDDATE_1";
*		valuesArray[1].LEAVE_ENDTIME = "LEAVE_ENDTIME_1";
*		valuesArray[1].LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID_1";
*		valuesArray[1].LEAVE_FROMDATE = "LEAVE_FROMDATE_1";
*		valuesArray[1].LEAVE_FROMTIME = "LEAVE_FROMTIME_1";
*		valuesArray[1].LEAVE_HRS = 1;
*		valuesArray[1].LEAVE_TYPE = "LEAVE_TYPE_1";
*		valuesArray[1].LV_STATUS = "LV_STATUS_1";
*		valuesArray[1].MGR_COMMENTS = "MGR_COMMENTS_1";
*		valuesArray[1].PROCESS_DATE = "PROCESS_DATE_1";
*		valuesArray[1].PROCESS_TIME = "PROCESS_TIME_1";
*		valuesArray[1].REQUEST_ID = "REQUEST_ID_1";
*		valuesArray[1].STATUS = "STATUS_1";
*		valuesArray[1].TYPE = "TYPE_1";
*		valuesArray[2] = {};
*		valuesArray[2].APPROVAL_DATE = "APPROVAL_DATE_2";
*		valuesArray[2].CANCEL_COMMENTS = "CANCEL_COMMENTS_2";
*		valuesArray[2].CANCEL_DATE = "CANCEL_DATE_2";
*		valuesArray[2].CANCEL_TIME = "CANCEL_TIME_2";
*		valuesArray[2].COMMENTS = "COMMENTS_2";
*		valuesArray[2].CREATE_DATE = "CREATE_DATE_2";
*		valuesArray[2].CREATE_TIME = "CREATE_TIME_2";
*		valuesArray[2].EMPNUMBER = "EMPNUMBER_2";
*		valuesArray[2].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_2";
*		valuesArray[2].ISERROR = "ISERROR_2";
*		valuesArray[2].LEAVE_DAYS = 2;
*		valuesArray[2].LEAVE_ENDDATE = "LEAVE_ENDDATE_2";
*		valuesArray[2].LEAVE_ENDTIME = "LEAVE_ENDTIME_2";
*		valuesArray[2].LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID_2";
*		valuesArray[2].LEAVE_FROMDATE = "LEAVE_FROMDATE_2";
*		valuesArray[2].LEAVE_FROMTIME = "LEAVE_FROMTIME_2";
*		valuesArray[2].LEAVE_HRS = 2;
*		valuesArray[2].LEAVE_TYPE = "LEAVE_TYPE_2";
*		valuesArray[2].LV_STATUS = "LV_STATUS_2";
*		valuesArray[2].MGR_COMMENTS = "MGR_COMMENTS_2";
*		valuesArray[2].PROCESS_DATE = "PROCESS_DATE_2";
*		valuesArray[2].PROCESS_TIME = "PROCESS_TIME_2";
*		valuesArray[2].REQUEST_ID = "REQUEST_ID_2";
*		valuesArray[2].STATUS = "STATUS_2";
*		valuesArray[2].TYPE = "TYPE_2";
*		com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_ENTRY",errorcallback,true)===false){
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
				errMsg = errMsg + ", LEAVE_ENTRY_ID=" + valuestable.LEAVE_ENTRY_ID;
				pks["LEAVE_ENTRY_ID"] = {key:"LEAVE_ENTRY_ID",value:valuestable.LEAVE_ENTRY_ID};
				var wcs = [];
				if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates TEAM_LEAVE_REQUEST_ENTRY using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_ENTRY",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates TEAM_LEAVE_REQUEST_ENTRY(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_ENTRY",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPKTable());
	}
};

/************************************************************************************
* Updates TEAM_LEAVE_REQUEST_ENTRY(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.APPROVAL_DATE = "APPROVAL_DATE_updated0";
*		inputArray[0].changeSet.CANCEL_COMMENTS = "CANCEL_COMMENTS_updated0";
*		inputArray[0].changeSet.CANCEL_DATE = "CANCEL_DATE_updated0";
*		inputArray[0].changeSet.CANCEL_TIME = "CANCEL_TIME_updated0";
*		inputArray[0].whereClause = "where EMPNUMBER = '0'";
*		inputArray[0].whereClause = "where LEAVE_ENTRY_ID = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.APPROVAL_DATE = "APPROVAL_DATE_updated1";
*		inputArray[1].changeSet.CANCEL_COMMENTS = "CANCEL_COMMENTS_updated1";
*		inputArray[1].changeSet.CANCEL_DATE = "CANCEL_DATE_updated1";
*		inputArray[1].changeSet.CANCEL_TIME = "CANCEL_TIME_updated1";
*		inputArray[1].whereClause = "where EMPNUMBER = '1'";
*		inputArray[1].whereClause = "where LEAVE_ENTRY_ID = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.APPROVAL_DATE = "APPROVAL_DATE_updated2";
*		inputArray[2].changeSet.CANCEL_COMMENTS = "CANCEL_COMMENTS_updated2";
*		inputArray[2].changeSet.CANCEL_DATE = "CANCEL_DATE_updated2";
*		inputArray[2].changeSet.CANCEL_TIME = "CANCEL_TIME_updated2";
*		inputArray[2].whereClause = "where EMPNUMBER = '2'";
*		inputArray[2].whereClause = "where LEAVE_ENTRY_ID = '2'";
*		com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "TEAM_LEAVE_REQUEST_ENTRY";
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_LEAVE_REQUEST_ENTRY",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPKTable());
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes TEAM_LEAVE_REQUEST_ENTRY using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TEAM_LEAVE_REQUEST_ENTRYTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK->TEAM_LEAVE_REQUEST_ENTRY_PKPresent successcallback");
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
	
	function TEAM_LEAVE_REQUEST_ENTRYErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TEAM_LEAVE_REQUEST_ENTRYSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TEAM_LEAVE_REQUEST_ENTRYTransactionCallback, TEAM_LEAVE_REQUEST_ENTRYSuccessCallback, TEAM_LEAVE_REQUEST_ENTRYErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes TEAM_LEAVE_REQUEST_ENTRY(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove("where APPROVAL_DATE like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;
	var record = "";

	function TEAM_LEAVE_REQUEST_ENTRY_removeTransactioncallback(tx){
			wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_LEAVE_REQUEST_ENTRY_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove->TEAM_LEAVE_REQUEST_ENTRY_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LEAVE_REQUEST_ENTRY_removeTransactioncallback, TEAM_LEAVE_REQUEST_ENTRY_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes TEAM_LEAVE_REQUEST_ENTRY using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TEAM_LEAVE_REQUEST_ENTRYTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK -> TEAM_LEAVE_REQUEST_ENTRYTransactionCallback");
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
	
	function TEAM_LEAVE_REQUEST_ENTRYErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK -> TEAM_LEAVE_REQUEST_ENTRYErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TEAM_LEAVE_REQUEST_ENTRYSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK -> TEAM_LEAVE_REQUEST_ENTRYSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TEAM_LEAVE_REQUEST_ENTRYTransactionCallback, TEAM_LEAVE_REQUEST_ENTRYSuccessCallback, TEAM_LEAVE_REQUEST_ENTRYErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes TEAM_LEAVE_REQUEST_ENTRY(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_LEAVE_REQUEST_ENTRY_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_LEAVE_REQUEST_ENTRY_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove->TEAM_LEAVE_REQUEST_ENTRY_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_LEAVE_REQUEST_ENTRY_removeTransactioncallback, TEAM_LEAVE_REQUEST_ENTRY_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves TEAM_LEAVE_REQUEST_ENTRY using primary key from the local Database. 
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves TEAM_LEAVE_REQUEST_ENTRY(s) using where clause from the local Database. 
* e.g. com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.find("where APPROVAL_DATE like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of TEAM_LEAVE_REQUEST_ENTRY with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of TEAM_LEAVE_REQUEST_ENTRY matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of TEAM_LEAVE_REQUEST_ENTRY pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LEAVE_REQUEST_ENTRY pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_LEAVE_REQUEST_ENTRY deferred for upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to TEAM_LEAVE_REQUEST_ENTRY in local database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to TEAM_LEAVE_REQUEST_ENTRY's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether TEAM_LEAVE_REQUEST_ENTRY's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether TEAM_LEAVE_REQUEST_ENTRY's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of TEAM_LEAVE_AUDIT related to TEAM_LEAVE_REQUEST_ENTRY
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_LEAVE_REQUEST_ENTRY_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].LEAVE_ENTRY_ID;				
			wcs.push({key:"ENTRY_ID", value:targetKey_0});		
			
			var tbname = "TEAM_LEAVE_AUDIT"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.TEAM_LEAVE_AUDIT.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.TeamViewService.TEAM_LEAVE_AUDIT();
				obj.APPROVER_EMPNO = res[i].APPROVER_EMPNO;
				obj.APPROVER_NAME = res[i].APPROVER_NAME;
				obj.COMMENTS = res[i].COMMENTS;
				obj.DELETE_IND = res[i].DELETE_IND;
				obj.EMPNUMBER = res[i].EMPNUMBER;
				obj.ENTRY_ID = res[i].ENTRY_ID;
				obj.SEQ_NO = res[i].SEQ_NO;
				obj.STATUS = res[i].STATUS;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_ENTRY_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of TEAM_LEAVE_AUDIT related to TEAM_LEAVE_REQUEST_ENTRY
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getCountOfTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getCountOfTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_AUDITWithLEAVE_ENTRY_ID",  "relationship", errorcallback)){
		return;
	}
	function TEAM_LEAVE_REQUEST_ENTRY_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].LEAVE_ENTRY_ID;
					targetAttributes.push("ENTRY_ID");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"ENTRY_ID":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"ENTRY_ID":targetKey_0});
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
		   com.kony.TeamViewService.TEAM_LEAVE_AUDIT.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_ENTRY_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of TEAM_LEAVE_NOTE related to TEAM_LEAVE_REQUEST_ENTRY
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_LEAVE_REQUEST_ENTRY_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].LEAVE_ENTRY_ID;				
			wcs.push({key:"LEAVEID", value:targetKey_0});		
			
			var tbname = "TEAM_LEAVE_NOTE"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.TEAM_LEAVE_NOTE.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.TeamViewService.TEAM_LEAVE_NOTE();
				obj.ADDED_ON = res[i].ADDED_ON;
				obj.COMMENTS = res[i].COMMENTS;
				obj.DELETE_IND = res[i].DELETE_IND;
				obj.EMPNUMBER = res[i].EMPNUMBER;
				obj.LEAVEID = res[i].LEAVEID;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_ENTRY_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of TEAM_LEAVE_NOTE related to TEAM_LEAVE_REQUEST_ENTRY
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getCountOfTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getCountOfTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LEAVE_NOTEWithLEAVE_ENTRY_ID",  "relationship", errorcallback)){
		return;
	}
	function TEAM_LEAVE_REQUEST_ENTRY_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].LEAVE_ENTRY_ID;
					targetAttributes.push("LEAVEID");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"LEAVEID":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"LEAVEID":targetKey_0});
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
		   com.kony.TeamViewService.TEAM_LEAVE_NOTE.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_ENTRY_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of TEAM_LVREQ_ATTACHMENTS related to TEAM_LEAVE_REQUEST_ENTRY
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID",  "relationship", errorcallback)){
		return;
	}	
	function TEAM_LEAVE_REQUEST_ENTRY_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].LEAVE_ENTRY_ID;				
			wcs.push({key:"LEAVE_ENTRY_ID", value:targetKey_0});		
			
			var tbname = "TEAM_LVREQ_ATTACHMENTS"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_ENTRY_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of TEAM_LVREQ_ATTACHMENTS related to TEAM_LEAVE_REQUEST_ENTRY
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getCountOfTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getCountOfTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getCountOfTEAM_LVREQ_ATTACHMENTSWithLEAVE_ENTRY_ID",  "relationship", errorcallback)){
		return;
	}
	function TEAM_LEAVE_REQUEST_ENTRY_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].LEAVE_ENTRY_ID;
					targetAttributes.push("LEAVE_ENTRY_ID");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"LEAVE_ENTRY_ID":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"LEAVE_ENTRY_ID":targetKey_0});
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
		   com.kony.TeamViewService.TEAM_LVREQ_ATTACHMENTS.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getAllDetailsByPK(pks, TEAM_LEAVE_REQUEST_ENTRY_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.removeCascade function");
	var tbname = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName();
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


com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.convertTableToObject function");
	objMap = [];
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
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.filterAttributes function");
	var attributeTable = {};
	attributeTable.APPROVAL_DATE = "APPROVAL_DATE";
	attributeTable.CANCEL_COMMENTS = "CANCEL_COMMENTS";
	attributeTable.CANCEL_DATE = "CANCEL_DATE";
	attributeTable.CANCEL_TIME = "CANCEL_TIME";
	attributeTable.COMMENTS = "COMMENTS";
	attributeTable.CREATE_DATE = "CREATE_DATE";
	attributeTable.CREATE_TIME = "CREATE_TIME";
	attributeTable.EMPNUMBER = "EMPNUMBER";
	attributeTable.EXTRACT_TSTAMP = "EXTRACT_TSTAMP";
	attributeTable.ISERROR = "ISERROR";
	attributeTable.LEAVE_DAYS = "LEAVE_DAYS";
	attributeTable.LEAVE_ENDDATE = "LEAVE_ENDDATE";
	attributeTable.LEAVE_ENDTIME = "LEAVE_ENDTIME";
	attributeTable.LEAVE_ENTRY_ID = "LEAVE_ENTRY_ID";
	attributeTable.LEAVE_FROMDATE = "LEAVE_FROMDATE";
	attributeTable.LEAVE_FROMTIME = "LEAVE_FROMTIME";
	attributeTable.LEAVE_HRS = "LEAVE_HRS";
	attributeTable.LEAVE_TYPE = "LEAVE_TYPE";
	attributeTable.LV_STATUS = "LV_STATUS";
	attributeTable.MGR_COMMENTS = "MGR_COMMENTS";
	attributeTable.PROCESS_DATE = "PROCESS_DATE";
	attributeTable.PROCESS_TIME = "PROCESS_TIME";
	attributeTable.REQUEST_ID = "REQUEST_ID";
	attributeTable.STATUS = "STATUS";
	attributeTable.TYPE = "TYPE";

	var PKTable = {};
	PKTable.EMPNUMBER = {}
	PKTable.EMPNUMBER.name = "EMPNUMBER";
	PKTable.EMPNUMBER.isAutoGen = false;
	PKTable.LEAVE_ENTRY_ID = {}
	PKTable.LEAVE_ENTRY_ID.name = "LEAVE_ENTRY_ID";
	PKTable.LEAVE_ENTRY_ID.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject TEAM_LEAVE_REQUEST_ENTRY. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject TEAM_LEAVE_REQUEST_ENTRY. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject TEAM_LEAVE_REQUEST_ENTRY. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.APPROVAL_DATE = this.APPROVAL_DATE;
	valuesTable.CANCEL_COMMENTS = this.CANCEL_COMMENTS;
	valuesTable.CANCEL_DATE = this.CANCEL_DATE;
	valuesTable.CANCEL_TIME = this.CANCEL_TIME;
	valuesTable.COMMENTS = this.COMMENTS;
	valuesTable.CREATE_DATE = this.CREATE_DATE;
	valuesTable.CREATE_TIME = this.CREATE_TIME;
	if(isInsert===true){
		valuesTable.EMPNUMBER = this.EMPNUMBER;
	}
	valuesTable.EXTRACT_TSTAMP = this.EXTRACT_TSTAMP;
	valuesTable.ISERROR = this.ISERROR;
	valuesTable.LEAVE_DAYS = this.LEAVE_DAYS;
	valuesTable.LEAVE_ENDDATE = this.LEAVE_ENDDATE;
	valuesTable.LEAVE_ENDTIME = this.LEAVE_ENDTIME;
	if(isInsert===true){
		valuesTable.LEAVE_ENTRY_ID = this.LEAVE_ENTRY_ID;
	}
	valuesTable.LEAVE_FROMDATE = this.LEAVE_FROMDATE;
	valuesTable.LEAVE_FROMTIME = this.LEAVE_FROMTIME;
	valuesTable.LEAVE_HRS = this.LEAVE_HRS;
	valuesTable.LEAVE_TYPE = this.LEAVE_TYPE;
	valuesTable.LV_STATUS = this.LV_STATUS;
	valuesTable.MGR_COMMENTS = this.MGR_COMMENTS;
	valuesTable.PROCESS_DATE = this.PROCESS_DATE;
	valuesTable.PROCESS_TIME = this.PROCESS_TIME;
	valuesTable.REQUEST_ID = this.REQUEST_ID;
	valuesTable.STATUS = this.STATUS;
	valuesTable.TYPE = this.TYPE;
	return valuesTable;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.prototype.getPKTable function");
	var pkTable = {};
	pkTable.EMPNUMBER = {key:"EMPNUMBER",value:this.EMPNUMBER};
	pkTable.LEAVE_ENTRY_ID = {key:"LEAVE_ENTRY_ID",value:this.LEAVE_ENTRY_ID};
	return pkTable;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getPKTable function");
	var pkTable = [];
	pkTable.push("EMPNUMBER");
	pkTable.push("LEAVE_ENTRY_ID");
	return pkTable;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.pkCheck function");
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
		sync.log.error("Primary Key EMPNUMBER not specified in " + opName + " an item in TEAM_LEAVE_REQUEST_ENTRY");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("EMPNUMBER",opName,"TEAM_LEAVE_REQUEST_ENTRY")));
		return;
	}
	kony.table.insert(wcs,wc);
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
		sync.log.error("Primary Key LEAVE_ENTRY_ID not specified in " + opName + " an item in TEAM_LEAVE_REQUEST_ENTRY");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("LEAVE_ENTRY_ID",opName,"TEAM_LEAVE_REQUEST_ENTRY")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.validateNull function");
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.validateNullInsert function");
	if(kony.sync.isNull(valuestable.EMPNUMBER) || kony.sync.isEmptyString(valuestable.EMPNUMBER)){
		sync.log.error("Mandatory attribute EMPNUMBER is missing for the SyncObject TEAM_LEAVE_REQUEST_ENTRY.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LEAVE_REQUEST_ENTRY", "EMPNUMBER")));
		return false;
	}
	if(kony.sync.isNull(valuestable.LEAVE_ENTRY_ID) || kony.sync.isEmptyString(valuestable.LEAVE_ENTRY_ID)){
		sync.log.error("Mandatory attribute LEAVE_ENTRY_ID is missing for the SyncObject TEAM_LEAVE_REQUEST_ENTRY.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_LEAVE_REQUEST_ENTRY", "LEAVE_ENTRY_ID")));
		return false;
	}
	return true;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getRelationshipMap function");
	var r1 = {};
	r1 = {};
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];
	r1.targetAttributeValue  = [];
		
	if (!kony.sync.isNullOrUndefined(valuestable.EMPNUMBER)){
		r1.sourceAttribute.push("EMPNUMBER");
		r1.foreignKeyAttribute.push("EMPNUMBER");
		r1.targetAttributeValue.push("'" + valuestable.EMPNUMBER + "'");
	}
	if (!kony.sync.isNullOrUndefined(valuestable.REQUEST_ID)){
		r1.sourceAttribute.push("REQUEST_ID");
		r1.foreignKeyAttribute.push("REQUEST_ID");
		r1.targetAttributeValue.push("'" + valuestable.REQUEST_ID + "'");
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
	
	if(!kony.sync.isNullOrUndefined(valuestable.LEAVE_ENTRY_ID)){
		r1.sourceAttribute.push("ENTRY_ID") ;
		r1.foreignKeyAttribute.push("LEAVE_ENTRY_ID") ;
		r1.targetAttributeValue.push("'" + valuestable.LEAVE_ENTRY_ID+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.TEAM_LEAVE_AUDIT===undefined){
			relationshipMap.TEAM_LEAVE_AUDIT = [];
		}
		relationshipMap.TEAM_LEAVE_AUDIT.push(r1);
	}
		
	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.LEAVE_ENTRY_ID)){
		r1.sourceAttribute.push("LEAVEID") ;
		r1.foreignKeyAttribute.push("LEAVE_ENTRY_ID") ;
		r1.targetAttributeValue.push("'" + valuestable.LEAVE_ENTRY_ID+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.TEAM_LEAVE_NOTE===undefined){
			relationshipMap.TEAM_LEAVE_NOTE = [];
		}
		relationshipMap.TEAM_LEAVE_NOTE.push(r1);
	}
		
	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.LEAVE_ENTRY_ID)){
		r1.sourceAttribute.push("LEAVE_ENTRY_ID") ;
		r1.foreignKeyAttribute.push("LEAVE_ENTRY_ID") ;
		r1.targetAttributeValue.push("'" + valuestable.LEAVE_ENTRY_ID+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.TEAM_LVREQ_ATTACHMENTS===undefined){
			relationshipMap.TEAM_LVREQ_ATTACHMENTS = [];
		}
		relationshipMap.TEAM_LVREQ_ATTACHMENTS.push(r1);
	}
		
	return relationshipMap;
};


com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.TeamViewService.TEAM_LEAVE_REQUEST_ENTRY.getTableName = function(){
	return "TEAM_LEAVE_REQUEST_ENTRY";
};




// **********************************End TEAM_LEAVE_REQUEST_ENTRY's helper methods************************