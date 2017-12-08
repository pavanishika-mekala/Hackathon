//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Mon Oct 30 07:03:35 UTC 2017Timesheet*******************
// **********************************Start Timesheet's helper methods************************
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
if(typeof(com.kony.ESS)=== "undefined"){ com.kony.ESS = {}; }
if(typeof(com.kony.ESS.MYTIME)=== "undefined"){ com.kony.ESS.MYTIME = {}; }

/************************************************************************************
* Creates new Timesheet
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet = function(){
	this.Employee_Id = null;
	this.End_Date = null;
	this.Id = null;
	this.lastmodified = null;
	this.latitude = null;
	this.longitude = null;
	this.softdeletedflag = null;
	this.Start_Date = null;
	this.Status_Id = null;
	this.SubmittedOn = null;
	this.TIMESTAMP = null;
	this.markForUpload = true;
};

com.kony.ESS.MYTIME.Timesheet.prototype = {
	get Employee_Id(){
		return this._Employee_Id;
	},
	set Employee_Id(val){
		this._Employee_Id = val;
	},
	get End_Date(){
		return this._End_Date;
	},
	set End_Date(val){
		this._End_Date = val;
	},
	get Id(){
		return this._Id;
	},
	set Id(val){
		this._Id = val;
	},
	get lastmodified(){
		return this._lastmodified;
	},
	set lastmodified(val){
		this._lastmodified = val;
	},
	get latitude(){
		return this._latitude;
	},
	set latitude(val){
		this._latitude = val;
	},
	get longitude(){
		return this._longitude;
	},
	set longitude(val){
		this._longitude = val;
	},
	get softdeletedflag(){
		return this._softdeletedflag;
	},
	set softdeletedflag(val){
		this._softdeletedflag = val;
	},
	get Start_Date(){
		return this._Start_Date;
	},
	set Start_Date(val){
		this._Start_Date = val;
	},
	get Status_Id(){
		return this._Status_Id;
	},
	set Status_Id(val){
		this._Status_Id = val;
	},
	get SubmittedOn(){
		return this._SubmittedOn;
	},
	set SubmittedOn(val){
		this._SubmittedOn = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
};

/************************************************************************************
* Retrieves all instances of Timesheet SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "Employee_Id";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "End_Date";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.ESS.MYTIME.Timesheet.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	orderByMap = kony.sync.formOrderByClause("Timesheet",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getAll->successcallback");
		successcallback(com.kony.ESS.MYTIME.Timesheet.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of Timesheet present in local database.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getAllCount function");
	com.kony.ESS.MYTIME.Timesheet.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of Timesheet using where clause in the local Database
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getCount->successcallback");
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
* Creates a new instance of Timesheet in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.ESS.MYTIME.Timesheet.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.MYTIME.Timesheet.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"Timesheet",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.MYTIME.Timesheet.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "Id=" + valuestable.Id;
		pks["Id"] = {key:"Id",value:valuestable.Id};
		com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of Timesheet in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Employee_Id = "Employee_Id_0";
*		valuesArray[0].End_Date = "End_Date_0";
*		valuesArray[0].Id = "Id_0";
*		valuesArray[0].lastmodified = "lastmodified_0";
*		valuesArray[0].latitude = "latitude_0";
*		valuesArray[0].longitude = "longitude_0";
*		valuesArray[0].Start_Date = "Start_Date_0";
*		valuesArray[0].Status_Id = "Status_Id_0";
*		valuesArray[0].SubmittedOn = "SubmittedOn_0";
*		valuesArray[1] = {};
*		valuesArray[1].Employee_Id = "Employee_Id_1";
*		valuesArray[1].End_Date = "End_Date_1";
*		valuesArray[1].Id = "Id_1";
*		valuesArray[1].lastmodified = "lastmodified_1";
*		valuesArray[1].latitude = "latitude_1";
*		valuesArray[1].longitude = "longitude_1";
*		valuesArray[1].Start_Date = "Start_Date_1";
*		valuesArray[1].Status_Id = "Status_Id_1";
*		valuesArray[1].SubmittedOn = "SubmittedOn_1";
*		valuesArray[2] = {};
*		valuesArray[2].Employee_Id = "Employee_Id_2";
*		valuesArray[2].End_Date = "End_Date_2";
*		valuesArray[2].Id = "Id_2";
*		valuesArray[2].lastmodified = "lastmodified_2";
*		valuesArray[2].latitude = "latitude_2";
*		valuesArray[2].longitude = "longitude_2";
*		valuesArray[2].Start_Date = "Start_Date_2";
*		valuesArray[2].Status_Id = "Status_Id_2";
*		valuesArray[2].SubmittedOn = "SubmittedOn_2";
*		com.kony.ESS.MYTIME.Timesheet.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"Timesheet",errorcallback,true)===false){
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
				errMsg = "Id=" + valuestable.Id;
				pks["Id"] = {key:"Id",value:valuestable.Id};
				var wcs = [];
				if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.MYTIME.Timesheet.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates Timesheet using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.ESS.MYTIME.Timesheet.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.MYTIME.Timesheet.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"Timesheet",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.ESS.MYTIME.Timesheet.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates Timesheet(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"Timesheet",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.MYTIME.Timesheet.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.ESS.MYTIME.Timesheet.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.MYTIME.Timesheet.getPKTable());
	}
};

/************************************************************************************
* Updates Timesheet(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.Employee_Id = "Employee_Id_updated0";
*		inputArray[0].changeSet.End_Date = "End_Date_updated0";
*		inputArray[0].changeSet.lastmodified = "lastmodified_updated0";
*		inputArray[0].changeSet.latitude = "latitude_updated0";
*		inputArray[0].whereClause = "where Id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.Employee_Id = "Employee_Id_updated1";
*		inputArray[1].changeSet.End_Date = "End_Date_updated1";
*		inputArray[1].changeSet.lastmodified = "lastmodified_updated1";
*		inputArray[1].changeSet.latitude = "latitude_updated1";
*		inputArray[1].whereClause = "where Id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.Employee_Id = "Employee_Id_updated2";
*		inputArray[2].changeSet.End_Date = "End_Date_updated2";
*		inputArray[2].changeSet.lastmodified = "lastmodified_updated2";
*		inputArray[2].changeSet.latitude = "latitude_updated2";
*		inputArray[2].whereClause = "where Id = '2'";
*		com.kony.ESS.MYTIME.Timesheet.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "1000000020ac26b7c";
	var tbname = "Timesheet";
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
			if(kony.sync.attributeValidation(valuestable,"Timesheet",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.ESS.MYTIME.Timesheet.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.ESS.MYTIME.Timesheet.getPKTable());
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
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.ESS.MYTIME.Timesheet.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes Timesheet using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.MYTIME.Timesheet.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TimesheetTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.deleteByPK->Timesheet_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.ESS.MYTIME.Timesheet_Note.removeCascade,"Timesheet_Note",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.ESS.MYTIME.Time_Entry.removeCascade,"Time_Entry",false, errorcallback, markForUpload, record, false)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.ESS.MYTIME.Timesheet_Audit.removeCascade,"Timesheet_Audit",false, errorcallback, markForUpload, record, false)){
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
	
	function TimesheetErrorCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TimesheetSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TimesheetTransactionCallback, TimesheetSuccessCallback, TimesheetErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes Timesheet(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.ESS.MYTIME.Timesheet.remove("where Employee_Id like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Timesheet_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Timesheet_Note.removeCascade, "Timesheet_Note", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Time_Entry.removeCascade, "Time_Entry", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Timesheet_Audit.removeCascade, "Timesheet_Audit", false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Timesheet_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.remove->Timesheet_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Timesheet_removeTransactioncallback, Timesheet_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes Timesheet using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TimesheetTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK -> TimesheetTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.ESS.MYTIME.Timesheet_Note.removeCascade,"Timesheet_Note",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.ESS.MYTIME.Time_Entry.removeCascade,"Time_Entry",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
			if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, "", com.kony.ESS.MYTIME.Timesheet_Audit.removeCascade,"Timesheet_Audit",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function TimesheetErrorCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK -> TimesheetErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TimesheetSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK -> TimesheetSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TimesheetTransactionCallback, TimesheetSuccessCallback, TimesheetErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes Timesheet(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Timesheet_removeTransactioncallback(tx){
		wcs = " " + wcs;
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Timesheet_Note.removeCascade, "Timesheet_Note", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Time_Entry.removeCascade, "Time_Entry", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Timesheet_Audit.removeCascade, "Timesheet_Audit", false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Timesheet_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.remove->Timesheet_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Timesheet_removeTransactioncallback, Timesheet_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves Timesheet using primary key from the local Database. 
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	var wcs = [];
	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.ESS.MYTIME.Timesheet.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves Timesheet(s) using where clause from the local Database. 
* e.g. com.kony.ESS.MYTIME.Timesheet.find("where Employee_Id like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of Timesheet with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of Timesheet matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of Timesheet pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Timesheet pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Timesheet deferred for upload.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to Timesheet in local database to last synced state
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to Timesheet's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	var wcs = [];
	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether Timesheet's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether Timesheet's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.MYTIME.Timesheet.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of Timesheet_Note related to Timesheet
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.MYTIME.Timesheet.prototype.getTimesheet_NoteWithTimesheet_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getTimesheet_NoteWithTimesheet_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.getTimesheet_NoteWithTimesheet_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.getTimesheet_NoteWithTimesheet_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getTimesheet_NoteWithTimesheet_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getTimesheet_NoteWithTimesheet_Id",  "relationship", errorcallback)){
		return;
	}	
	function Timesheet_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Timesheet_Id", value:targetKey_0});		
			
			var tbname = "Timesheet_Note"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.MYTIME.Timesheet_Note.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.MYTIME.Timesheet_Note();
				obj.Added_On = res[i].Added_On;
				obj.Comments = res[i].Comments;
				obj.Employee_Id = res[i].Employee_Id;
				obj.Id = res[i].Id;
				obj.lastmodified = res[i].lastmodified;
				obj.softdeletedflag = res[i].softdeletedflag;
				obj.Timesheet_Id = res[i].Timesheet_Id;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks, Timesheet_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Timesheet_Note related to Timesheet
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.getCountOfTimesheet_NoteWithTimesheet_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getCountOfTimesheet_NoteWithTimesheet_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_NoteWithTimesheet_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_NoteWithTimesheet_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_NoteWithTimesheet_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_NoteWithTimesheet_Id",  "relationship", errorcallback)){
		return;
	}
	function Timesheet_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].Id;
					targetAttributes.push("Timesheet_Id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"Timesheet_Id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"Timesheet_Id":targetKey_0});
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
		   com.kony.ESS.MYTIME.Timesheet_Note.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks, Timesheet_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of Time_Entry related to Timesheet
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.MYTIME.Timesheet.prototype.getTime_EntryWithTimesheet_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getTime_EntryWithTimesheet_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.getTime_EntryWithTimesheet_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.getTime_EntryWithTimesheet_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getTime_EntryWithTimesheet_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getTime_EntryWithTimesheet_Id",  "relationship", errorcallback)){
		return;
	}	
	function Timesheet_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Timesheet_Id", value:targetKey_0});		
			
			var tbname = "Time_Entry"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.MYTIME.Time_Entry.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.MYTIME.Time_Entry();
				obj.Activity_Description = res[i].Activity_Description;
				obj.Actual_Hours = res[i].Actual_Hours;
				obj.Created_On = res[i].Created_On;
				obj.Date = res[i].Date;
				obj.Employee_Id = res[i].Employee_Id;
				obj.End_Time = res[i].End_Time;
				obj.Id = res[i].Id;
				obj.lastmodified = res[i].lastmodified;
				obj.Project_Task_id = res[i].Project_Task_id;
				obj.Project_Task_Type = res[i].Project_Task_Type;
				obj.softdeletedflag = res[i].softdeletedflag;
				obj.Start_Time = res[i].Start_Time;
				obj.StatusId = res[i].StatusId;
				obj.Timesheet_Id = res[i].Timesheet_Id;
				obj.Time_Type_Id = res[i].Time_Type_Id;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks, Timesheet_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Time_Entry related to Timesheet
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.getCountOfTime_EntryWithTimesheet_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getCountOfTime_EntryWithTimesheet_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.getCountOfTime_EntryWithTimesheet_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.getCountOfTime_EntryWithTimesheet_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getCountOfTime_EntryWithTimesheet_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getCountOfTime_EntryWithTimesheet_Id",  "relationship", errorcallback)){
		return;
	}
	function Timesheet_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].Id;
					targetAttributes.push("Timesheet_Id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"Timesheet_Id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"Timesheet_Id":targetKey_0});
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
		   com.kony.ESS.MYTIME.Time_Entry.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks, Timesheet_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of Timesheet_Audit related to Timesheet
* with given $relationship.getTargetObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.MYTIME.Timesheet.prototype.getTimesheet_AuditWithTimesheet_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getTimesheet_AuditWithTimesheet_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.getTimesheet_AuditWithTimesheet_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.getTimesheet_AuditWithTimesheet_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getTimesheet_AuditWithTimesheet_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getTimesheet_AuditWithTimesheet_Id",  "relationship", errorcallback)){
		return;
	}	
	function Timesheet_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Timesheet_Id", value:targetKey_0});		
			
			var tbname = "Timesheet_Audit"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.MYTIME.Timesheet_Audit();
				obj.Created_On = res[i].Created_On;
				obj.Description = res[i].Description;
				obj.employee_id = res[i].employee_id;
				obj.Error_Msg = res[i].Error_Msg;
				obj.Id = res[i].Id;
				obj.lastmodified = res[i].lastmodified;
				obj.softdeletedflag = res[i].softdeletedflag;
				obj.Status_Id = res[i].Status_Id;
				obj.Timesheet_Id = res[i].Timesheet_Id;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks, Timesheet_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Timesheet_Audit related to Timesheet
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet.prototype.getCountOfTimesheet_AuditWithTimesheet_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getCountOfTimesheet_AuditWithTimesheet_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_AuditWithTimesheet_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_AuditWithTimesheet_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_AuditWithTimesheet_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet.getCountOfTimesheet_AuditWithTimesheet_Id",  "relationship", errorcallback)){
		return;
	}
	function Timesheet_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].Id;
					targetAttributes.push("Timesheet_Id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"Timesheet_Id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"Timesheet_Id":targetKey_0});
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
		   com.kony.ESS.MYTIME.Timesheet_Audit.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.MYTIME.Timesheet.getAllDetailsByPK(pks, Timesheet_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.ESS.MYTIME.Timesheet.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.removeCascade function");
	var tbname = com.kony.ESS.MYTIME.Timesheet.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Timesheet_Note.removeCascade, "Timesheet_Note", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Time_Entry.removeCascade, "Time_Entry", false, errorcallback, markForUpload, null, isLocal)){
			return false;
		}
			var srcAttributes = [];
			var targetAttributes = [];
			srcAttributes.push("Id") ;
			targetAttributes.push("Timesheet_Id") ;
		if(!kony.sync.removeCascadeHelper(tx, srcAttributes, targetAttributes, tbname, wcs, com.kony.ESS.MYTIME.Timesheet_Audit.removeCascade, "Timesheet_Audit", false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.ESS.MYTIME.Timesheet.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.ESS.MYTIME.Timesheet();
			obj.Employee_Id = res[i].Employee_Id;
			obj.End_Date = res[i].End_Date;
			obj.Id = res[i].Id;
			obj.lastmodified = res[i].lastmodified;
			obj.latitude = res[i].latitude;
			obj.longitude = res[i].longitude;
			obj.softdeletedflag = res[i].softdeletedflag;
			obj.Start_Date = res[i].Start_Date;
			obj.Status_Id = res[i].Status_Id;
			obj.SubmittedOn = res[i].SubmittedOn;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.ESS.MYTIME.Timesheet.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.filterAttributes function");
	var attributeTable = {};
	attributeTable.Employee_Id = "Employee_Id";
	attributeTable.End_Date = "End_Date";
	attributeTable.Id = "Id";
	attributeTable.lastmodified = "lastmodified";
	attributeTable.latitude = "latitude";
	attributeTable.longitude = "longitude";
	attributeTable.Start_Date = "Start_Date";
	attributeTable.Status_Id = "Status_Id";
	attributeTable.SubmittedOn = "SubmittedOn";

	var PKTable = {};
	PKTable.Id = {}
	PKTable.Id.name = "Id";
	PKTable.Id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject Timesheet. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject Timesheet. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject Timesheet. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.ESS.MYTIME.Timesheet.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.ESS.MYTIME.Timesheet.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.ESS.MYTIME.Timesheet.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.Employee_Id = this.Employee_Id;
	valuesTable.End_Date = this.End_Date;
	if(isInsert===true){
		valuesTable.Id = this.Id;
	}
	valuesTable.lastmodified = this.lastmodified;
	valuesTable.latitude = this.latitude;
	valuesTable.longitude = this.longitude;
	valuesTable.Start_Date = this.Start_Date;
	valuesTable.Status_Id = this.Status_Id;
	valuesTable.SubmittedOn = this.SubmittedOn;
	return valuesTable;
};

com.kony.ESS.MYTIME.Timesheet.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Id = {key:"Id",value:this.Id};
	return pkTable;
};

com.kony.ESS.MYTIME.Timesheet.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getPKTable function");
	var pkTable = [];
	pkTable.push("Id");
	return pkTable;
};

com.kony.ESS.MYTIME.Timesheet.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key Id not specified in  " + opName + "  an item in Timesheet");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Timesheet")));
		return false;	
	}
	else if(kony.sync.isValidJSTable(pks)){
		if(!kony.sync.isNull(pks.Id)){
			if(!kony.sync.isNull(pks.Id.value)){
				wc.key = "Id";
				wc.value = pks.Id.value;
			}
			else{
				wc.key = "Id";
				wc.value = pks.Id;
			}
		}else{
			sync.log.error("Primary Key Id not specified in  " + opName + "  an item in Timesheet");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Timesheet")));
			return false;
		}
	}
	else{
		wc.key = "Id";
		wc.value = pks;
	}	
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.ESS.MYTIME.Timesheet.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.validateNull function");
	return true;
};

com.kony.ESS.MYTIME.Timesheet.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
		sync.log.error("Mandatory attribute Id is missing for the SyncObject Timesheet.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Timesheet", "Id")));
		return false;
	}
	return true;
};

com.kony.ESS.MYTIME.Timesheet.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.ESS.MYTIME.Timesheet.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.ESS.MYTIME.Timesheet.getTableName = function(){
	return "Timesheet";
};




// **********************************End Timesheet's helper methods************************