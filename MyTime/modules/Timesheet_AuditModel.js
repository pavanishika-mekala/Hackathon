//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Mon Oct 30 07:03:35 UTC 2017Timesheet_Audit*******************
// **********************************Start Timesheet_Audit's helper methods************************
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
* Creates new Timesheet_Audit
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit = function(){
	this.Created_On = null;
	this.Description = null;
	this.employee_id = null;
	this.Error_Msg = null;
	this.Id = null;
	this.lastmodified = null;
	this.softdeletedflag = null;
	this.Status_Id = null;
	this.Timesheet_Id = null;
	this.markForUpload = true;
};

com.kony.ESS.MYTIME.Timesheet_Audit.prototype = {
	get Created_On(){
		return this._Created_On;
	},
	set Created_On(val){
		this._Created_On = val;
	},
	get Description(){
		return this._Description;
	},
	set Description(val){
		this._Description = val;
	},
	get employee_id(){
		return this._employee_id;
	},
	set employee_id(val){
		this._employee_id = val;
	},
	get Error_Msg(){
		return this._Error_Msg;
	},
	set Error_Msg(val){
		this._Error_Msg = val;
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
	get softdeletedflag(){
		return this._softdeletedflag;
	},
	set softdeletedflag(val){
		this._softdeletedflag = val;
	},
	get Status_Id(){
		return this._Status_Id;
	},
	set Status_Id(val){
		this._Status_Id = val;
	},
	get Timesheet_Id(){
		return this._Timesheet_Id;
	},
	set Timesheet_Id(val){
		this._Timesheet_Id = val;
	},
};

/************************************************************************************
* Retrieves all instances of Timesheet_Audit SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "Created_On";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "Description";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.ESS.MYTIME.Timesheet_Audit.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	orderByMap = kony.sync.formOrderByClause("Timesheet_Audit",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getAll->successcallback");
		successcallback(com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of Timesheet_Audit present in local database.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getAllCount function");
	com.kony.ESS.MYTIME.Timesheet_Audit.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of Timesheet_Audit using where clause in the local Database
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getCount->successcallback");
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
* Creates a new instance of Timesheet_Audit in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.ESS.MYTIME.Timesheet_Audit.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.MYTIME.Timesheet_Audit.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"Timesheet_Audit",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.MYTIME.Timesheet_Audit.getRelationshipMap(relationshipMap,valuestable);
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
		com.kony.ESS.MYTIME.Timesheet_Audit.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of Timesheet_Audit in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Created_On = "Created_On_0";
*		valuesArray[0].Description = "Description_0";
*		valuesArray[0].employee_id = "employee_id_0";
*		valuesArray[0].Error_Msg = "Error_Msg_0";
*		valuesArray[0].Id = "Id_0";
*		valuesArray[0].Status_Id = "Status_Id_0";
*		valuesArray[0].Timesheet_Id = "Timesheet_Id_0";
*		valuesArray[1] = {};
*		valuesArray[1].Created_On = "Created_On_1";
*		valuesArray[1].Description = "Description_1";
*		valuesArray[1].employee_id = "employee_id_1";
*		valuesArray[1].Error_Msg = "Error_Msg_1";
*		valuesArray[1].Id = "Id_1";
*		valuesArray[1].Status_Id = "Status_Id_1";
*		valuesArray[1].Timesheet_Id = "Timesheet_Id_1";
*		valuesArray[2] = {};
*		valuesArray[2].Created_On = "Created_On_2";
*		valuesArray[2].Description = "Description_2";
*		valuesArray[2].employee_id = "employee_id_2";
*		valuesArray[2].Error_Msg = "Error_Msg_2";
*		valuesArray[2].Id = "Id_2";
*		valuesArray[2].Status_Id = "Status_Id_2";
*		valuesArray[2].Timesheet_Id = "Timesheet_Id_2";
*		com.kony.ESS.MYTIME.Timesheet_Audit.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"Timesheet_Audit",errorcallback,true)===false){
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
				if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.MYTIME.Timesheet_Audit.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates Timesheet_Audit using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.ESS.MYTIME.Timesheet_Audit.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.MYTIME.Timesheet_Audit.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"Timesheet_Audit",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.ESS.MYTIME.Timesheet_Audit.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates Timesheet_Audit(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"Timesheet_Audit",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.MYTIME.Timesheet_Audit.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.ESS.MYTIME.Timesheet_Audit.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.MYTIME.Timesheet_Audit.getPKTable());
	}
};

/************************************************************************************
* Updates Timesheet_Audit(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.Created_On = "Created_On_updated0";
*		inputArray[0].changeSet.Description = "Description_updated0";
*		inputArray[0].changeSet.employee_id = "employee_id_updated0";
*		inputArray[0].changeSet.Error_Msg = "Error_Msg_updated0";
*		inputArray[0].whereClause = "where Id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.Created_On = "Created_On_updated1";
*		inputArray[1].changeSet.Description = "Description_updated1";
*		inputArray[1].changeSet.employee_id = "employee_id_updated1";
*		inputArray[1].changeSet.Error_Msg = "Error_Msg_updated1";
*		inputArray[1].whereClause = "where Id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.Created_On = "Created_On_updated2";
*		inputArray[2].changeSet.Description = "Description_updated2";
*		inputArray[2].changeSet.employee_id = "employee_id_updated2";
*		inputArray[2].changeSet.Error_Msg = "Error_Msg_updated2";
*		inputArray[2].whereClause = "where Id = '2'";
*		com.kony.ESS.MYTIME.Timesheet_Audit.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "1000000020ac26b7c";
	var tbname = "Timesheet_Audit";
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
			if(kony.sync.attributeValidation(valuestable,"Timesheet_Audit",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.ESS.MYTIME.Timesheet_Audit.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.ESS.MYTIME.Timesheet_Audit.getPKTable());
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
		sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.ESS.MYTIME.Timesheet_Audit.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes Timesheet_Audit using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function Timesheet_AuditTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK->Timesheet_Audit_PKPresent successcallback");
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
	
	function Timesheet_AuditErrorCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function Timesheet_AuditSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet_Audit.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, Timesheet_AuditTransactionCallback, Timesheet_AuditSuccessCallback, Timesheet_AuditErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes Timesheet_Audit(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.ESS.MYTIME.Timesheet_Audit.remove("where Created_On like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Timesheet_Audit_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Timesheet_Audit_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.remove->Timesheet_Audit_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Timesheet_Audit_removeTransactioncallback, Timesheet_Audit_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes Timesheet_Audit using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function Timesheet_AuditTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK -> Timesheet_AuditTransactionCallback");
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
	
	function Timesheet_AuditErrorCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK -> Timesheet_AuditErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function Timesheet_AuditSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK -> Timesheet_AuditSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, Timesheet_AuditTransactionCallback, Timesheet_AuditSuccessCallback, Timesheet_AuditErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes Timesheet_Audit(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Timesheet_Audit_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Timesheet_Audit_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.remove->Timesheet_Audit_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Timesheet_Audit_removeTransactioncallback, Timesheet_Audit_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves Timesheet_Audit using primary key from the local Database. 
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet_Audit.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet_Audit.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	var wcs = [];
	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves Timesheet_Audit(s) using where clause from the local Database. 
* e.g. com.kony.ESS.MYTIME.Timesheet_Audit.find("where Created_On like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of Timesheet_Audit with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet_Audit.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.ESS.MYTIME.Timesheet_Audit.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of Timesheet_Audit matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet_Audit.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of Timesheet_Audit pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Timesheet_Audit pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Timesheet_Audit deferred for upload.
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to Timesheet_Audit in local database to last synced state
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to Timesheet_Audit's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	var wcs = [];
	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.MYTIME.Timesheet_Audit.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether Timesheet_Audit's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet_Audit.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet_Audit.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether Timesheet_Audit's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.ESS.MYTIME.Timesheet_Audit.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.MYTIME.Timesheet_Audit.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.MYTIME.Timesheet_Audit.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.MYTIME.Timesheet_Audit.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.MYTIME.Timesheet_Audit.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.isRecordPendingForUpload->successcallback function");
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
com.kony.ESS.MYTIME.Timesheet_Audit.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.removeCascade function");
	var tbname = com.kony.ESS.MYTIME.Timesheet_Audit.getTableName();
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


com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.convertTableToObject function");
	objMap = [];
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
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.ESS.MYTIME.Timesheet_Audit.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.filterAttributes function");
	var attributeTable = {};
	attributeTable.Created_On = "Created_On";
	attributeTable.Description = "Description";
	attributeTable.employee_id = "employee_id";
	attributeTable.Error_Msg = "Error_Msg";
	attributeTable.Id = "Id";
	attributeTable.Status_Id = "Status_Id";
	attributeTable.Timesheet_Id = "Timesheet_Id";

	var PKTable = {};
	PKTable.Id = {}
	PKTable.Id.name = "Id";
	PKTable.Id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject Timesheet_Audit. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject Timesheet_Audit. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject Timesheet_Audit. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.ESS.MYTIME.Timesheet_Audit.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.ESS.MYTIME.Timesheet_Audit.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.ESS.MYTIME.Timesheet_Audit.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.Created_On = this.Created_On;
	valuesTable.Description = this.Description;
	valuesTable.employee_id = this.employee_id;
	valuesTable.Error_Msg = this.Error_Msg;
	if(isInsert===true){
		valuesTable.Id = this.Id;
	}
	valuesTable.Status_Id = this.Status_Id;
	valuesTable.Timesheet_Id = this.Timesheet_Id;
	return valuesTable;
};

com.kony.ESS.MYTIME.Timesheet_Audit.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Id = {key:"Id",value:this.Id};
	return pkTable;
};

com.kony.ESS.MYTIME.Timesheet_Audit.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getPKTable function");
	var pkTable = [];
	pkTable.push("Id");
	return pkTable;
};

com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.pkCheck function");
	var wc = [];
	if(kony.sync.isNull(pks)){
		sync.log.error("Primary Key Id not specified in  " + opName + "  an item in Timesheet_Audit");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Timesheet_Audit")));
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
			sync.log.error("Primary Key Id not specified in  " + opName + "  an item in Timesheet_Audit");
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Timesheet_Audit")));
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

com.kony.ESS.MYTIME.Timesheet_Audit.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.validateNull function");
	if(valuestable.Timesheet_Id!==undefined){
		if(kony.sync.isNull(valuestable.Timesheet_Id) || kony.sync.isEmptyString(valuestable.Timesheet_Id)){
			sync.log.error("Mandatory attribute Timesheet_Id is missing for the SyncObject Timesheet_Audit.");
			errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Timesheet_Audit", "Timesheet_Id")));
			return false;
		}
	}
	return true;
};

com.kony.ESS.MYTIME.Timesheet_Audit.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
		sync.log.error("Mandatory attribute Id is missing for the SyncObject Timesheet_Audit.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Timesheet_Audit", "Id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.Timesheet_Id) || kony.sync.isEmptyString(valuestable.Timesheet_Id)){
		sync.log.error("Mandatory attribute Timesheet_Id is missing for the SyncObject Timesheet_Audit.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Timesheet_Audit", "Timesheet_Id")));
		return false;
	}
	return true;
};

com.kony.ESS.MYTIME.Timesheet_Audit.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.ESS.MYTIME.Timesheet_Audit.getRelationshipMap function");
	var r1 = {};
	r1 = {};
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];
	r1.targetAttributeValue  = [];
		
	if (!kony.sync.isNullOrUndefined(valuestable.Timesheet_Id)){
		r1.sourceAttribute.push("Id");
		r1.foreignKeyAttribute.push("Timesheet_Id");
		r1.targetAttributeValue.push("'" + valuestable.Timesheet_Id + "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.Timesheet===undefined){
			relationshipMap.Timesheet = [];
		}
		relationshipMap.Timesheet.push(r1);
	}
	

	return relationshipMap;
};


com.kony.ESS.MYTIME.Timesheet_Audit.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.ESS.MYTIME.Timesheet_Audit.getTableName = function(){
	return "Timesheet_Audit";
};




// **********************************End Timesheet_Audit's helper methods************************