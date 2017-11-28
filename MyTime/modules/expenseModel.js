//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:13 IST 2016expense*******************
// **********************************Start expense's helper methods************************
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
if(typeof(com.kony.myExpenses)=== "undefined"){ com.kony.myExpenses = {}; }

/************************************************************************************
* Creates new expense
*************************************************************************************/
com.kony.myExpenses.expense = function(){
	this.amount = null;
	this.approved_amount = null;
	this.base_amount = null;
	this.base_currency_id = null;
	this.bilable_client = null;
	this.client_name = null;
	this.createdts = null;
	this.currency_id = null;
	this.department_id = null;
	this.description = null;
	this.employee_id = null;
	this.expense_report_id = null;
	this.id = null;
	this.isPersonal = null;
	this.lastmodifiedts = null;
	this.location = null;
	this.parent_id = null;
	this.payment_type_id = null;
	this.purpose_desc = null;
	this.softdeletedflag = null;
	this.transaction_date = null;
	this.type_id = null;
	this.vendor = null;
	this.markForUpload = true;
};

com.kony.myExpenses.expense.prototype = {
	get amount(){
		return this._amount;
	},
	set amount(val){
		this._amount = val;
	},
	get approved_amount(){
		return this._approved_amount;
	},
	set approved_amount(val){
		this._approved_amount = val;
	},
	get base_amount(){
		return this._base_amount;
	},
	set base_amount(val){
		this._base_amount = val;
	},
	get base_currency_id(){
		return this._base_currency_id;
	},
	set base_currency_id(val){
		this._base_currency_id = val;
	},
	get bilable_client(){
		return this._bilable_client;
	},
	set bilable_client(val){
		this._bilable_client = val;
	},
	get client_name(){
		return this._client_name;
	},
	set client_name(val){
		this._client_name = val;
	},
	get createdts(){
		return this._createdts;
	},
	set createdts(val){
		this._createdts = val;
	},
	get currency_id(){
		return this._currency_id;
	},
	set currency_id(val){
		this._currency_id = val;
	},
	get department_id(){
		return this._department_id;
	},
	set department_id(val){
		this._department_id = val;
	},
	get description(){
		return this._description;
	},
	set description(val){
		this._description = val;
	},
	get employee_id(){
		return this._employee_id;
	},
	set employee_id(val){
		this._employee_id = val;
	},
	get expense_report_id(){
		return this._expense_report_id;
	},
	set expense_report_id(val){
		this._expense_report_id = val;
	},
	get id(){
		return this._id;
	},
	set id(val){
		this._id = val;
	},
	get isPersonal(){
		return this._isPersonal;
	},
	set isPersonal(val){
		this._isPersonal = val;
	},
	get lastmodifiedts(){
		return this._lastmodifiedts;
	},
	set lastmodifiedts(val){
		this._lastmodifiedts = val;
	},
	get location(){
		return this._location;
	},
	set location(val){
		this._location = val;
	},
	get parent_id(){
		return this._parent_id;
	},
	set parent_id(val){
		this._parent_id = val;
	},
	get payment_type_id(){
		return this._payment_type_id;
	},
	set payment_type_id(val){
		this._payment_type_id = val;
	},
	get purpose_desc(){
		return this._purpose_desc;
	},
	set purpose_desc(val){
		this._purpose_desc = val;
	},
	get softdeletedflag(){
		return this._softdeletedflag;
	},
	set softdeletedflag(val){
		this._softdeletedflag = val;
	},
	get transaction_date(){
		return this._transaction_date;
	},
	set transaction_date(val){
		this._transaction_date = val;
	},
	get type_id(){
		return this._type_id;
	},
	set type_id(val){
		this._type_id = val;
	},
	get vendor(){
		return this._vendor;
	},
	set vendor(val){
		this._vendor = val;
	},
};

/************************************************************************************
* Retrieves all instances of expense SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "amount";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "approved_amount";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.myExpenses.expense.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.myExpenses.expense.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.myExpenses.expense.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	orderByMap = kony.sync.formOrderByClause("expense",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense.getAll->successcallback");
		successcallback(com.kony.myExpenses.expense.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of expense present in local database.
*************************************************************************************/
com.kony.myExpenses.expense.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getAllCount function");
	com.kony.myExpenses.expense.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of expense using where clause in the local Database
*************************************************************************************/
com.kony.myExpenses.expense.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.myExpenses.expense.getCount->successcallback");
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
* Creates a new instance of expense in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.myExpenses.expense.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.myExpenses.expense.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.myExpenses.expense.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"expense",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.myExpenses.expense.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.myExpenses.expense.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "employee_id=" + valuestable.employee_id;
		pks["employee_id"] = {key:"employee_id",value:valuestable.employee_id};
		errMsg = errMsg + ", expense_report_id=" + valuestable.expense_report_id;
		pks["expense_report_id"] = {key:"expense_report_id",value:valuestable.expense_report_id};
		errMsg = errMsg + ", id=" + valuestable.id;
		pks["id"] = {key:"id",value:valuestable.id};
		com.kony.myExpenses.expense.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of expense in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].amount = "amount_0";
*		valuesArray[0].approved_amount = "approved_amount_0";
*		valuesArray[0].base_amount = "base_amount_0";
*		valuesArray[0].base_currency_id = "base_currency_id_0";
*		valuesArray[0].bilable_client = "bilable_client_0";
*		valuesArray[0].client_name = "client_name_0";
*		valuesArray[0].createdts = "createdts_0";
*		valuesArray[0].currency_id = "currency_id_0";
*		valuesArray[0].department_id = "department_id_0";
*		valuesArray[0].description = "description_0";
*		valuesArray[0].employee_id = "employee_id_0";
*		valuesArray[0].expense_report_id = "expense_report_id_0";
*		valuesArray[0].id = "id_0";
*		valuesArray[0].isPersonal = "isPersonal_0";
*		valuesArray[0].location = "location_0";
*		valuesArray[0].parent_id = "parent_id_0";
*		valuesArray[0].payment_type_id = "payment_type_id_0";
*		valuesArray[0].purpose_desc = "purpose_desc_0";
*		valuesArray[0].transaction_date = "transaction_date_0";
*		valuesArray[0].type_id = "type_id_0";
*		valuesArray[0].vendor = "vendor_0";
*		valuesArray[1] = {};
*		valuesArray[1].amount = "amount_1";
*		valuesArray[1].approved_amount = "approved_amount_1";
*		valuesArray[1].base_amount = "base_amount_1";
*		valuesArray[1].base_currency_id = "base_currency_id_1";
*		valuesArray[1].bilable_client = "bilable_client_1";
*		valuesArray[1].client_name = "client_name_1";
*		valuesArray[1].createdts = "createdts_1";
*		valuesArray[1].currency_id = "currency_id_1";
*		valuesArray[1].department_id = "department_id_1";
*		valuesArray[1].description = "description_1";
*		valuesArray[1].employee_id = "employee_id_1";
*		valuesArray[1].expense_report_id = "expense_report_id_1";
*		valuesArray[1].id = "id_1";
*		valuesArray[1].isPersonal = "isPersonal_1";
*		valuesArray[1].location = "location_1";
*		valuesArray[1].parent_id = "parent_id_1";
*		valuesArray[1].payment_type_id = "payment_type_id_1";
*		valuesArray[1].purpose_desc = "purpose_desc_1";
*		valuesArray[1].transaction_date = "transaction_date_1";
*		valuesArray[1].type_id = "type_id_1";
*		valuesArray[1].vendor = "vendor_1";
*		valuesArray[2] = {};
*		valuesArray[2].amount = "amount_2";
*		valuesArray[2].approved_amount = "approved_amount_2";
*		valuesArray[2].base_amount = "base_amount_2";
*		valuesArray[2].base_currency_id = "base_currency_id_2";
*		valuesArray[2].bilable_client = "bilable_client_2";
*		valuesArray[2].client_name = "client_name_2";
*		valuesArray[2].createdts = "createdts_2";
*		valuesArray[2].currency_id = "currency_id_2";
*		valuesArray[2].department_id = "department_id_2";
*		valuesArray[2].description = "description_2";
*		valuesArray[2].employee_id = "employee_id_2";
*		valuesArray[2].expense_report_id = "expense_report_id_2";
*		valuesArray[2].id = "id_2";
*		valuesArray[2].isPersonal = "isPersonal_2";
*		valuesArray[2].location = "location_2";
*		valuesArray[2].parent_id = "parent_id_2";
*		valuesArray[2].payment_type_id = "payment_type_id_2";
*		valuesArray[2].purpose_desc = "purpose_desc_2";
*		valuesArray[2].transaction_date = "transaction_date_2";
*		valuesArray[2].type_id = "type_id_2";
*		valuesArray[2].vendor = "vendor_2";
*		com.kony.myExpenses.expense.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.myExpenses.expense.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"expense",errorcallback,true)===false){
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
				errMsg = "employee_id=" + valuestable.employee_id;
				pks["employee_id"] = {key:"employee_id",value:valuestable.employee_id};
				errMsg = errMsg + ", expense_report_id=" + valuestable.expense_report_id;
				pks["expense_report_id"] = {key:"expense_report_id",value:valuestable.expense_report_id};
				errMsg = errMsg + ", id=" + valuestable.id;
				pks["id"] = {key:"id",value:valuestable.id};
				var wcs = [];
				if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.myExpenses.expense.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.myExpenses.expense.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.myExpenses.expense.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates expense using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.myExpenses.expense.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.myExpenses.expense.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.myExpenses.expense.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"expense",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.myExpenses.expense.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates expense(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"expense",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.myExpenses.expense.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.myExpenses.expense.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.myExpenses.expense.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.myExpenses.expense.getPKTable());
	}
};

/************************************************************************************
* Updates expense(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.amount = "amount_updated0";
*		inputArray[0].changeSet.approved_amount = "approved_amount_updated0";
*		inputArray[0].changeSet.base_amount = "base_amount_updated0";
*		inputArray[0].changeSet.base_currency_id = "base_currency_id_updated0";
*		inputArray[0].whereClause = "where employee_id = '0'";
*		inputArray[0].whereClause = "where expense_report_id = '0'";
*		inputArray[0].whereClause = "where id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.amount = "amount_updated1";
*		inputArray[1].changeSet.approved_amount = "approved_amount_updated1";
*		inputArray[1].changeSet.base_amount = "base_amount_updated1";
*		inputArray[1].changeSet.base_currency_id = "base_currency_id_updated1";
*		inputArray[1].whereClause = "where employee_id = '1'";
*		inputArray[1].whereClause = "where expense_report_id = '1'";
*		inputArray[1].whereClause = "where id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.amount = "amount_updated2";
*		inputArray[2].changeSet.approved_amount = "approved_amount_updated2";
*		inputArray[2].changeSet.base_amount = "base_amount_updated2";
*		inputArray[2].changeSet.base_currency_id = "base_currency_id_updated2";
*		inputArray[2].whereClause = "where employee_id = '2'";
*		inputArray[2].whereClause = "where expense_report_id = '2'";
*		inputArray[2].whereClause = "where id = '2'";
*		com.kony.myExpenses.expense.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.myExpenses.expense.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.myExpenses.expense.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "expense";
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
			if(kony.sync.attributeValidation(valuestable,"expense",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.myExpenses.expense.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.myExpenses.expense.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.myExpenses.expense.getPKTable());
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
		sync.log.trace("Entering  com.kony.myExpenses.expense.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.myExpenses.expense.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes expense using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.myExpenses.expense.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function expenseTransactionCallback(tx){
		sync.log.trace("Entering com.kony.myExpenses.expense.deleteByPK->expense_PKPresent successcallback");
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
	
	function expenseErrorCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function expenseSuccessCallback(){
		sync.log.trace("Entering com.kony.myExpenses.expense.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, expenseTransactionCallback, expenseSuccessCallback, expenseErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes expense(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.myExpenses.expense.remove("where amount like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.myExpenses.expense.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.myExpenses.expense.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function expense_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function expense_removeSuccess(){
		sync.log.trace("Entering com.kony.myExpenses.expense.remove->expense_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.myExpenses.expense.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.myExpenses.expense.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, expense_removeTransactioncallback, expense_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes expense using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.myExpenses.expense.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function expenseTransactionCallback(tx){
		sync.log.trace("Entering com.kony.myExpenses.expense.removeDeviceInstanceByPK -> expenseTransactionCallback");
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
	
	function expenseErrorCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense.removeDeviceInstanceByPK -> expenseErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function expenseSuccessCallback(){
		sync.log.trace("Entering com.kony.myExpenses.expense.removeDeviceInstanceByPK -> expenseSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, expenseTransactionCallback, expenseSuccessCallback, expenseErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes expense(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.myExpenses.expense.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function expense_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function expense_removeSuccess(){
		sync.log.trace("Entering com.kony.myExpenses.expense.remove->expense_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.myExpenses.expense.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.myExpenses.expense.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, expense_removeTransactioncallback, expense_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves expense using primary key from the local Database. 
*************************************************************************************/
com.kony.myExpenses.expense.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	var wcs = [];
	if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.myExpenses.expense.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.myExpenses.expense.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves expense(s) using where clause from the local Database. 
* e.g. com.kony.myExpenses.expense.find("where amount like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.myExpenses.expense.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of expense with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.myExpenses.expense.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.myExpenses.expense.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of expense matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.myExpenses.expense.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
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
		sync.log.trace("Entering com.kony.myExpenses.expense.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.myExpenses.expense.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.myExpenses.expense.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of expense pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.myExpenses.expense.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
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
		sync.log.trace("Entering com.kony.myExpenses.expense.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of expense pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.myExpenses.expense.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of expense deferred for upload.
*************************************************************************************/
com.kony.myExpenses.expense.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
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
		sync.log.trace("Entering com.kony.myExpenses.expense.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.myExpenses.expense.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to expense in local database to last synced state
*************************************************************************************/
com.kony.myExpenses.expense.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to expense's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.myExpenses.expense.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	var wcs = [];
	if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.myExpenses.expense.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.myExpenses.expense.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether expense's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.myExpenses.expense.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.myExpenses.expense.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether expense's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.myExpenses.expense.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.myExpenses.expense.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.myExpenses.expense.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.myExpenses.expense.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.myExpenses.expense.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of receipt related to expense
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.myExpenses.expense.prototype.getreceiptWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.getreceiptWithid function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.getreceiptWithid(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense.getreceiptWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getreceiptWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.getreceiptWithid",  "relationship", errorcallback)){
		return;
	}	
	function expense_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].id;				
			wcs.push({key:"expense_id", value:targetKey_0});		
			
			var tbname = "receipt"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.myExpenses.receipt.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.myExpenses.receipt();
				obj.createdts = res[i].createdts;
				obj.employee_id = res[i].employee_id;
				obj.expense_id = res[i].expense_id;
				obj.id = res[i].id;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.media_id = res[i].media_id;
				obj.name = res[i].name;
				obj.softdeletedflag = res[i].softdeletedflag;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.myExpenses.expense.getAllDetailsByPK(pks, expense_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of receipt related to expense
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.myExpenses.expense.prototype.getCountOfreceiptWithid  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.getCountOfreceiptWithid function");
	var pks = this.getPKTable();
	com.kony.myExpenses.expense.getCountOfreceiptWithid(pks,successcallback,errorcallback);
};
com.kony.myExpenses.expense.getCountOfreceiptWithid = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.getCountOfreceiptWithid function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.myExpenses.expense.getCountOfreceiptWithid",  "relationship", errorcallback)){
		return;
	}
	function expense_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].id;
					targetAttributes.push("expense_id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"expense_id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"expense_id":targetKey_0});
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
		   com.kony.myExpenses.receipt.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.myExpenses.expense.getAllDetailsByPK(pks, expense_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.myExpenses.expense.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.myExpenses.expense.removeCascade function");
	var tbname = com.kony.myExpenses.expense.getTableName();
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


com.kony.myExpenses.expense.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.myExpenses.expense.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.myExpenses.expense();
			obj.amount = res[i].amount;
			obj.approved_amount = res[i].approved_amount;
			obj.base_amount = res[i].base_amount;
			obj.base_currency_id = res[i].base_currency_id;
			obj.bilable_client = res[i].bilable_client;
			obj.client_name = res[i].client_name;
			obj.createdts = res[i].createdts;
			obj.currency_id = res[i].currency_id;
			obj.department_id = res[i].department_id;
			obj.description = res[i].description;
			obj.employee_id = res[i].employee_id;
			obj.expense_report_id = res[i].expense_report_id;
			obj.id = res[i].id;
			obj.isPersonal = res[i].isPersonal;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.location = res[i].location;
			obj.parent_id = res[i].parent_id;
			obj.payment_type_id = res[i].payment_type_id;
			obj.purpose_desc = res[i].purpose_desc;
			obj.softdeletedflag = res[i].softdeletedflag;
			obj.transaction_date = res[i].transaction_date;
			obj.type_id = res[i].type_id;
			obj.vendor = res[i].vendor;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.myExpenses.expense.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.myExpenses.expense.filterAttributes function");
	var attributeTable = {};
	attributeTable.amount = "amount";
	attributeTable.approved_amount = "approved_amount";
	attributeTable.base_amount = "base_amount";
	attributeTable.base_currency_id = "base_currency_id";
	attributeTable.bilable_client = "bilable_client";
	attributeTable.client_name = "client_name";
	attributeTable.createdts = "createdts";
	attributeTable.currency_id = "currency_id";
	attributeTable.department_id = "department_id";
	attributeTable.description = "description";
	attributeTable.employee_id = "employee_id";
	attributeTable.expense_report_id = "expense_report_id";
	attributeTable.id = "id";
	attributeTable.isPersonal = "isPersonal";
	attributeTable.location = "location";
	attributeTable.parent_id = "parent_id";
	attributeTable.payment_type_id = "payment_type_id";
	attributeTable.purpose_desc = "purpose_desc";
	attributeTable.transaction_date = "transaction_date";
	attributeTable.type_id = "type_id";
	attributeTable.vendor = "vendor";

	var PKTable = {};
	PKTable.employee_id = {}
	PKTable.employee_id.name = "employee_id";
	PKTable.employee_id.isAutoGen = false;
	PKTable.expense_report_id = {}
	PKTable.expense_report_id.name = "expense_report_id";
	PKTable.expense_report_id.isAutoGen = false;
	PKTable.id = {}
	PKTable.id.name = "id";
	PKTable.id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject expense. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject expense. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject expense. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.myExpenses.expense.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.myExpenses.expense.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.myExpenses.expense.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.myExpenses.expense.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.amount = this.amount;
	valuesTable.approved_amount = this.approved_amount;
	valuesTable.base_amount = this.base_amount;
	valuesTable.base_currency_id = this.base_currency_id;
	valuesTable.bilable_client = this.bilable_client;
	valuesTable.client_name = this.client_name;
	valuesTable.createdts = this.createdts;
	valuesTable.currency_id = this.currency_id;
	valuesTable.department_id = this.department_id;
	valuesTable.description = this.description;
	if(isInsert===true){
		valuesTable.employee_id = this.employee_id;
	}
	if(isInsert===true){
		valuesTable.expense_report_id = this.expense_report_id;
	}
	if(isInsert===true){
		valuesTable.id = this.id;
	}
	valuesTable.isPersonal = this.isPersonal;
	valuesTable.location = this.location;
	valuesTable.parent_id = this.parent_id;
	valuesTable.payment_type_id = this.payment_type_id;
	valuesTable.purpose_desc = this.purpose_desc;
	valuesTable.transaction_date = this.transaction_date;
	valuesTable.type_id = this.type_id;
	valuesTable.vendor = this.vendor;
	return valuesTable;
};

com.kony.myExpenses.expense.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.myExpenses.expense.prototype.getPKTable function");
	var pkTable = {};
	pkTable.employee_id = {key:"employee_id",value:this.employee_id};
	pkTable.expense_report_id = {key:"expense_report_id",value:this.expense_report_id};
	pkTable.id = {key:"id",value:this.id};
	return pkTable;
};

com.kony.myExpenses.expense.getPKTable = function(){
	sync.log.trace("Entering com.kony.myExpenses.expense.getPKTable function");
	var pkTable = [];
	pkTable.push("employee_id");
	pkTable.push("expense_report_id");
	pkTable.push("id");
	return pkTable;
};

com.kony.myExpenses.expense.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.myExpenses.expense.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.employee_id)){
		if(!kony.sync.isNull(pks.employee_id.value)){
			wc.key = "employee_id";
			wc.value = pks.employee_id.value;
		}
		else{
			wc.key = "employee_id";
			wc.value = pks.employee_id;
		}
	}else{
		sync.log.error("Primary Key employee_id not specified in " + opName + " an item in expense");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("employee_id",opName,"expense")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.expense_report_id)){
		if(!kony.sync.isNull(pks.expense_report_id.value)){
			wc.key = "expense_report_id";
			wc.value = pks.expense_report_id.value;
		}
		else{
			wc.key = "expense_report_id";
			wc.value = pks.expense_report_id;
		}
	}else{
		sync.log.error("Primary Key expense_report_id not specified in " + opName + " an item in expense");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("expense_report_id",opName,"expense")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
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
		sync.log.error("Primary Key id not specified in " + opName + " an item in expense");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("id",opName,"expense")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.myExpenses.expense.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.validateNull function");
	return true;
};

com.kony.myExpenses.expense.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.myExpenses.expense.validateNullInsert function");
	if(kony.sync.isNull(valuestable.employee_id) || kony.sync.isEmptyString(valuestable.employee_id)){
		sync.log.error("Mandatory attribute employee_id is missing for the SyncObject expense.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "expense", "employee_id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.expense_report_id) || kony.sync.isEmptyString(valuestable.expense_report_id)){
		sync.log.error("Mandatory attribute expense_report_id is missing for the SyncObject expense.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "expense", "expense_report_id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.id) || kony.sync.isEmptyString(valuestable.id)){
		sync.log.error("Mandatory attribute id is missing for the SyncObject expense.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "expense", "id")));
		return false;
	}
	return true;
};

com.kony.myExpenses.expense.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.myExpenses.expense.getRelationshipMap function");
	var r1 = {};

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.id)){
		r1.sourceAttribute.push("expense_id") ;
		r1.foreignKeyAttribute.push("id") ;
		r1.targetAttributeValue.push("'" + valuestable.id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.receipt===undefined){
			relationshipMap.receipt = [];
		}
		relationshipMap.receipt.push(r1);
	}
		
	return relationshipMap;
};


com.kony.myExpenses.expense.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.myExpenses.expense.getTableName = function(){
	return "expense";
};




// **********************************End expense's helper methods************************