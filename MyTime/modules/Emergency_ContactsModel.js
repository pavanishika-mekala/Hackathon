//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:07 IST 2016Emergency_Contacts*******************
// **********************************Start Emergency_Contacts's helper methods************************
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
if(typeof(com.kony.ESS.myprofile)=== "undefined"){ com.kony.ESS.myprofile = {}; }

/************************************************************************************
* Creates new Emergency_Contacts
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts = function(){
	this.Contact_No = null;
	this.Date_of_birth = null;
	this.EMERGENCY_RELATION = null;
	this.Employee_Id = null;
	this.END_DATE = null;
	this.First_Name = null;
	this.Gender = null;
	this.ID = null;
	this.Identity_No = null;
	this.Last_Name = null;
	this.Media_ID = null;
	this.Relation_id = null;
	this.Sequence_No = null;
	this.softdeleteflag = null;
	this.START_DATE = null;
	this.TIMESTAMP = null;
	this.markForUpload = true;
};

com.kony.ESS.myprofile.Emergency_Contacts.prototype = {
	get Contact_No(){
		return this._Contact_No;
	},
	set Contact_No(val){
		this._Contact_No = val;
	},
	get Date_of_birth(){
		return this._Date_of_birth;
	},
	set Date_of_birth(val){
		this._Date_of_birth = val;
	},
	get EMERGENCY_RELATION(){
		return this._EMERGENCY_RELATION;
	},
	set EMERGENCY_RELATION(val){
		this._EMERGENCY_RELATION = val;
	},
	get Employee_Id(){
		return this._Employee_Id;
	},
	set Employee_Id(val){
		this._Employee_Id = val;
	},
	get END_DATE(){
		return this._END_DATE;
	},
	set END_DATE(val){
		this._END_DATE = val;
	},
	get First_Name(){
		return this._First_Name;
	},
	set First_Name(val){
		this._First_Name = val;
	},
	get Gender(){
		return this._Gender;
	},
	set Gender(val){
		this._Gender = val;
	},
	get ID(){
		return this._ID;
	},
	set ID(val){
		this._ID = val;
	},
	get Identity_No(){
		return this._Identity_No;
	},
	set Identity_No(val){
		this._Identity_No = val;
	},
	get Last_Name(){
		return this._Last_Name;
	},
	set Last_Name(val){
		this._Last_Name = val;
	},
	get Media_ID(){
		return this._Media_ID;
	},
	set Media_ID(val){
		this._Media_ID = val;
	},
	get Relation_id(){
		return this._Relation_id;
	},
	set Relation_id(val){
		this._Relation_id = val;
	},
	get Sequence_No(){
		return this._Sequence_No;
	},
	set Sequence_No(val){
		this._Sequence_No = val;
	},
	get softdeleteflag(){
		return this._softdeleteflag;
	},
	set softdeleteflag(val){
		this._softdeleteflag = val;
	},
	get START_DATE(){
		return this._START_DATE;
	},
	set START_DATE(val){
		this._START_DATE = val;
	},
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
	},
};

/************************************************************************************
* Retrieves all instances of Emergency_Contacts SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "Contact_No";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "Date_of_birth";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.ESS.myprofile.Emergency_Contacts.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	orderByMap = kony.sync.formOrderByClause("Emergency_Contacts",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getAll->successcallback");
		successcallback(com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of Emergency_Contacts present in local database.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getAllCount function");
	com.kony.ESS.myprofile.Emergency_Contacts.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of Emergency_Contacts using where clause in the local Database
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getCount->successcallback");
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
* Creates a new instance of Emergency_Contacts in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.ESS.myprofile.Emergency_Contacts.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.myprofile.Emergency_Contacts.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"Emergency_Contacts",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.myprofile.Emergency_Contacts.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "Employee_Id=" + valuestable.Employee_Id;
		pks["Employee_Id"] = {key:"Employee_Id",value:valuestable.Employee_Id};
		errMsg = errMsg + ", Relation_id=" + valuestable.Relation_id;
		pks["Relation_id"] = {key:"Relation_id",value:valuestable.Relation_id};
		errMsg = errMsg + ", Sequence_No=" + valuestable.Sequence_No;
		pks["Sequence_No"] = {key:"Sequence_No",value:valuestable.Sequence_No};
		errMsg = errMsg + ", START_DATE=" + valuestable.START_DATE;
		pks["START_DATE"] = {key:"START_DATE",value:valuestable.START_DATE};
		com.kony.ESS.myprofile.Emergency_Contacts.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of Emergency_Contacts in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Contact_No = "Contact_No_0";
*		valuesArray[0].Date_of_birth = 0;
*		valuesArray[0].EMERGENCY_RELATION = "EMERGENCY_RELATION_0";
*		valuesArray[0].Employee_Id = "Employee_Id_0";
*		valuesArray[0].END_DATE = "END_DATE_0";
*		valuesArray[0].First_Name = "First_Name_0";
*		valuesArray[0].Gender = "Gender_0";
*		valuesArray[0].ID = "ID_0";
*		valuesArray[0].Identity_No = "Identity_No_0";
*		valuesArray[0].Last_Name = "Last_Name_0";
*		valuesArray[0].Media_ID = "Media_ID_0";
*		valuesArray[0].Relation_id = "Relation_id_0";
*		valuesArray[0].Sequence_No = "Sequence_No_0";
*		valuesArray[0].START_DATE = "START_DATE_0";
*		valuesArray[1] = {};
*		valuesArray[1].Contact_No = "Contact_No_1";
*		valuesArray[1].Date_of_birth = 1;
*		valuesArray[1].EMERGENCY_RELATION = "EMERGENCY_RELATION_1";
*		valuesArray[1].Employee_Id = "Employee_Id_1";
*		valuesArray[1].END_DATE = "END_DATE_1";
*		valuesArray[1].First_Name = "First_Name_1";
*		valuesArray[1].Gender = "Gender_1";
*		valuesArray[1].ID = "ID_1";
*		valuesArray[1].Identity_No = "Identity_No_1";
*		valuesArray[1].Last_Name = "Last_Name_1";
*		valuesArray[1].Media_ID = "Media_ID_1";
*		valuesArray[1].Relation_id = "Relation_id_1";
*		valuesArray[1].Sequence_No = "Sequence_No_1";
*		valuesArray[1].START_DATE = "START_DATE_1";
*		valuesArray[2] = {};
*		valuesArray[2].Contact_No = "Contact_No_2";
*		valuesArray[2].Date_of_birth = 2;
*		valuesArray[2].EMERGENCY_RELATION = "EMERGENCY_RELATION_2";
*		valuesArray[2].Employee_Id = "Employee_Id_2";
*		valuesArray[2].END_DATE = "END_DATE_2";
*		valuesArray[2].First_Name = "First_Name_2";
*		valuesArray[2].Gender = "Gender_2";
*		valuesArray[2].ID = "ID_2";
*		valuesArray[2].Identity_No = "Identity_No_2";
*		valuesArray[2].Last_Name = "Last_Name_2";
*		valuesArray[2].Media_ID = "Media_ID_2";
*		valuesArray[2].Relation_id = "Relation_id_2";
*		valuesArray[2].Sequence_No = "Sequence_No_2";
*		valuesArray[2].START_DATE = "START_DATE_2";
*		com.kony.ESS.myprofile.Emergency_Contacts.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"Emergency_Contacts",errorcallback,true)===false){
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
				errMsg = "Employee_Id=" + valuestable.Employee_Id;
				pks["Employee_Id"] = {key:"Employee_Id",value:valuestable.Employee_Id};
				errMsg = errMsg + ", Relation_id=" + valuestable.Relation_id;
				pks["Relation_id"] = {key:"Relation_id",value:valuestable.Relation_id};
				errMsg = errMsg + ", Sequence_No=" + valuestable.Sequence_No;
				pks["Sequence_No"] = {key:"Sequence_No",value:valuestable.Sequence_No};
				errMsg = errMsg + ", START_DATE=" + valuestable.START_DATE;
				pks["START_DATE"] = {key:"START_DATE",value:valuestable.START_DATE};
				var wcs = [];
				if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.myprofile.Emergency_Contacts.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates Emergency_Contacts using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.ESS.myprofile.Emergency_Contacts.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.myprofile.Emergency_Contacts.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"Emergency_Contacts",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.ESS.myprofile.Emergency_Contacts.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates Emergency_Contacts(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"Emergency_Contacts",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.myprofile.Emergency_Contacts.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.ESS.myprofile.Emergency_Contacts.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.myprofile.Emergency_Contacts.getPKTable());
	}
};

/************************************************************************************
* Updates Emergency_Contacts(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.Contact_No = "Contact_No_updated0";
*		inputArray[0].changeSet.Date_of_birth = "Date_of_birth_updated0";
*		inputArray[0].changeSet.EMERGENCY_RELATION = "EMERGENCY_RELATION_updated0";
*		inputArray[0].changeSet.END_DATE = "END_DATE_updated0";
*		inputArray[0].whereClause = "where Employee_Id = '0'";
*		inputArray[0].whereClause = "where Relation_id = '0'";
*		inputArray[0].whereClause = "where Sequence_No = '0'";
*		inputArray[0].whereClause = "where START_DATE = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.Contact_No = "Contact_No_updated1";
*		inputArray[1].changeSet.Date_of_birth = "Date_of_birth_updated1";
*		inputArray[1].changeSet.EMERGENCY_RELATION = "EMERGENCY_RELATION_updated1";
*		inputArray[1].changeSet.END_DATE = "END_DATE_updated1";
*		inputArray[1].whereClause = "where Employee_Id = '1'";
*		inputArray[1].whereClause = "where Relation_id = '1'";
*		inputArray[1].whereClause = "where Sequence_No = '1'";
*		inputArray[1].whereClause = "where START_DATE = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.Contact_No = "Contact_No_updated2";
*		inputArray[2].changeSet.Date_of_birth = "Date_of_birth_updated2";
*		inputArray[2].changeSet.EMERGENCY_RELATION = "EMERGENCY_RELATION_updated2";
*		inputArray[2].changeSet.END_DATE = "END_DATE_updated2";
*		inputArray[2].whereClause = "where Employee_Id = '2'";
*		inputArray[2].whereClause = "where Relation_id = '2'";
*		inputArray[2].whereClause = "where Sequence_No = '2'";
*		inputArray[2].whereClause = "where START_DATE = '2'";
*		com.kony.ESS.myprofile.Emergency_Contacts.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "Emergency_Contacts";
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
			if(kony.sync.attributeValidation(valuestable,"Emergency_Contacts",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.ESS.myprofile.Emergency_Contacts.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.ESS.myprofile.Emergency_Contacts.getPKTable());
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
		sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.ESS.myprofile.Emergency_Contacts.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes Emergency_Contacts using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function Emergency_ContactsTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK->Emergency_Contacts_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Id");
 		targetAttributes.push("Employee_Id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.ESS.myprofile.EmployeeProfile.removeCascade,"EmployeeProfile",false, errorcallback, markForUpload, record, false)){
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
	
	function Emergency_ContactsErrorCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function Emergency_ContactsSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.Emergency_Contacts.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, Emergency_ContactsTransactionCallback, Emergency_ContactsSuccessCallback, Emergency_ContactsErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes Emergency_Contacts(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.ESS.myprofile.Emergency_Contacts.remove("where Contact_No like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Emergency_Contacts_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Id");
 		targetAttributes.push("Employee_Id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.ESS.myprofile.EmployeeProfile.removeCascade,"EmployeeProfile",false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Emergency_Contacts_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.remove->Emergency_Contacts_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Emergency_Contacts_removeTransactioncallback, Emergency_Contacts_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes Emergency_Contacts using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function Emergency_ContactsTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK -> Emergency_ContactsTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Id");
 		targetAttributes.push("Employee_Id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.ESS.myprofile.EmployeeProfile.removeCascade,"EmployeeProfile",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function Emergency_ContactsErrorCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK -> Emergency_ContactsErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function Emergency_ContactsSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK -> Emergency_ContactsSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, Emergency_ContactsTransactionCallback, Emergency_ContactsSuccessCallback, Emergency_ContactsErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes Emergency_Contacts(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Emergency_Contacts_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Id");
 		targetAttributes.push("Employee_Id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.ESS.myprofile.EmployeeProfile.removeCascade,"EmployeeProfile",false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Emergency_Contacts_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.remove->Emergency_Contacts_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Emergency_Contacts_removeTransactioncallback, Emergency_Contacts_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves Emergency_Contacts using primary key from the local Database. 
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.Emergency_Contacts.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.Emergency_Contacts.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	var wcs = [];
	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves Emergency_Contacts(s) using where clause from the local Database. 
* e.g. com.kony.ESS.myprofile.Emergency_Contacts.find("where Contact_No like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of Emergency_Contacts with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.Emergency_Contacts.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.ESS.myprofile.Emergency_Contacts.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of Emergency_Contacts matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.ESS.myprofile.Emergency_Contacts.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of Emergency_Contacts pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Emergency_Contacts pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Emergency_Contacts deferred for upload.
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to Emergency_Contacts in local database to last synced state
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to Emergency_Contacts's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	var wcs = [];
	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.Emergency_Contacts.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether Emergency_Contacts's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.Emergency_Contacts.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.Emergency_Contacts.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether Emergency_Contacts's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.ESS.myprofile.Emergency_Contacts.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.Emergency_Contacts.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.Emergency_Contacts.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.Emergency_Contacts.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.Emergency_Contacts.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.myprofile.Emergency_Contacts.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.isRecordPendingForUpload->successcallback function");
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
com.kony.ESS.myprofile.Emergency_Contacts.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.removeCascade function");
	var tbname = com.kony.ESS.myprofile.Emergency_Contacts.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("Id");
 		targetAttributes.push("Employee_Id");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.ESS.myprofile.EmployeeProfile.removeCascade,"EmployeeProfile",false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.ESS.myprofile.Emergency_Contacts();
			obj.Contact_No = res[i].Contact_No;
			obj.Date_of_birth = res[i].Date_of_birth;
			obj.EMERGENCY_RELATION = res[i].EMERGENCY_RELATION;
			obj.Employee_Id = res[i].Employee_Id;
			obj.END_DATE = res[i].END_DATE;
			obj.First_Name = res[i].First_Name;
			obj.Gender = res[i].Gender;
			obj.ID = res[i].ID;
			obj.Identity_No = res[i].Identity_No;
			obj.Last_Name = res[i].Last_Name;
			obj.Media_ID = res[i].Media_ID;
			obj.Relation_id = res[i].Relation_id;
			obj.Sequence_No = res[i].Sequence_No;
			obj.softdeleteflag = res[i].softdeleteflag;
			obj.START_DATE = res[i].START_DATE;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.ESS.myprofile.Emergency_Contacts.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.filterAttributes function");
	var attributeTable = {};
	attributeTable.Contact_No = "Contact_No";
	attributeTable.Date_of_birth = "Date_of_birth";
	attributeTable.EMERGENCY_RELATION = "EMERGENCY_RELATION";
	attributeTable.Employee_Id = "Employee_Id";
	attributeTable.END_DATE = "END_DATE";
	attributeTable.First_Name = "First_Name";
	attributeTable.Gender = "Gender";
	attributeTable.ID = "ID";
	attributeTable.Identity_No = "Identity_No";
	attributeTable.Last_Name = "Last_Name";
	attributeTable.Media_ID = "Media_ID";
	attributeTable.Relation_id = "Relation_id";
	attributeTable.Sequence_No = "Sequence_No";
	attributeTable.START_DATE = "START_DATE";

	var PKTable = {};
	PKTable.Employee_Id = {}
	PKTable.Employee_Id.name = "Employee_Id";
	PKTable.Employee_Id.isAutoGen = false;
	PKTable.Relation_id = {}
	PKTable.Relation_id.name = "Relation_id";
	PKTable.Relation_id.isAutoGen = false;
	PKTable.Sequence_No = {}
	PKTable.Sequence_No.name = "Sequence_No";
	PKTable.Sequence_No.isAutoGen = false;
	PKTable.START_DATE = {}
	PKTable.START_DATE.name = "START_DATE";
	PKTable.START_DATE.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject Emergency_Contacts. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject Emergency_Contacts. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject Emergency_Contacts. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.ESS.myprofile.Emergency_Contacts.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.ESS.myprofile.Emergency_Contacts.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.ESS.myprofile.Emergency_Contacts.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.Contact_No = this.Contact_No;
	valuesTable.Date_of_birth = this.Date_of_birth;
	valuesTable.EMERGENCY_RELATION = this.EMERGENCY_RELATION;
	if(isInsert===true){
		valuesTable.Employee_Id = this.Employee_Id;
	}
	valuesTable.END_DATE = this.END_DATE;
	valuesTable.First_Name = this.First_Name;
	valuesTable.Gender = this.Gender;
	valuesTable.ID = this.ID;
	valuesTable.Identity_No = this.Identity_No;
	valuesTable.Last_Name = this.Last_Name;
	valuesTable.Media_ID = this.Media_ID;
	if(isInsert===true){
		valuesTable.Relation_id = this.Relation_id;
	}
	if(isInsert===true){
		valuesTable.Sequence_No = this.Sequence_No;
	}
	if(isInsert===true){
		valuesTable.START_DATE = this.START_DATE;
	}
	return valuesTable;
};

com.kony.ESS.myprofile.Emergency_Contacts.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Employee_Id = {key:"Employee_Id",value:this.Employee_Id};
	pkTable.Relation_id = {key:"Relation_id",value:this.Relation_id};
	pkTable.Sequence_No = {key:"Sequence_No",value:this.Sequence_No};
	pkTable.START_DATE = {key:"START_DATE",value:this.START_DATE};
	return pkTable;
};

com.kony.ESS.myprofile.Emergency_Contacts.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getPKTable function");
	var pkTable = [];
	pkTable.push("Employee_Id");
	pkTable.push("Relation_id");
	pkTable.push("Sequence_No");
	pkTable.push("START_DATE");
	return pkTable;
};

com.kony.ESS.myprofile.Emergency_Contacts.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.Employee_Id)){
		if(!kony.sync.isNull(pks.Employee_Id.value)){
			wc.key = "Employee_Id";
			wc.value = pks.Employee_Id.value;
		}
		else{
			wc.key = "Employee_Id";
			wc.value = pks.Employee_Id;
		}
	}else{
		sync.log.error("Primary Key Employee_Id not specified in " + opName + " an item in Emergency_Contacts");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Employee_Id",opName,"Emergency_Contacts")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.Relation_id)){
		if(!kony.sync.isNull(pks.Relation_id.value)){
			wc.key = "Relation_id";
			wc.value = pks.Relation_id.value;
		}
		else{
			wc.key = "Relation_id";
			wc.value = pks.Relation_id;
		}
	}else{
		sync.log.error("Primary Key Relation_id not specified in " + opName + " an item in Emergency_Contacts");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Relation_id",opName,"Emergency_Contacts")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.Sequence_No)){
		if(!kony.sync.isNull(pks.Sequence_No.value)){
			wc.key = "Sequence_No";
			wc.value = pks.Sequence_No.value;
		}
		else{
			wc.key = "Sequence_No";
			wc.value = pks.Sequence_No;
		}
	}else{
		sync.log.error("Primary Key Sequence_No not specified in " + opName + " an item in Emergency_Contacts");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Sequence_No",opName,"Emergency_Contacts")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.START_DATE)){
		if(!kony.sync.isNull(pks.START_DATE.value)){
			wc.key = "START_DATE";
			wc.value = pks.START_DATE.value;
		}
		else{
			wc.key = "START_DATE";
			wc.value = pks.START_DATE;
		}
	}else{
		sync.log.error("Primary Key START_DATE not specified in " + opName + " an item in Emergency_Contacts");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("START_DATE",opName,"Emergency_Contacts")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.ESS.myprofile.Emergency_Contacts.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.validateNull function");
	if(valuestable.END_DATE!==undefined){
		if(kony.sync.isNull(valuestable.END_DATE) || kony.sync.isEmptyString(valuestable.END_DATE)){
			sync.log.error("Mandatory attribute END_DATE is missing for the SyncObject Emergency_Contacts.");
			errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Emergency_Contacts", "END_DATE")));
			return false;
		}
	}
	return true;
};

com.kony.ESS.myprofile.Emergency_Contacts.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Employee_Id) || kony.sync.isEmptyString(valuestable.Employee_Id)){
		sync.log.error("Mandatory attribute Employee_Id is missing for the SyncObject Emergency_Contacts.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Emergency_Contacts", "Employee_Id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.END_DATE) || kony.sync.isEmptyString(valuestable.END_DATE)){
		sync.log.error("Mandatory attribute END_DATE is missing for the SyncObject Emergency_Contacts.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Emergency_Contacts", "END_DATE")));
		return false;
	}
	if(kony.sync.isNull(valuestable.Relation_id) || kony.sync.isEmptyString(valuestable.Relation_id)){
		sync.log.error("Mandatory attribute Relation_id is missing for the SyncObject Emergency_Contacts.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Emergency_Contacts", "Relation_id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.Sequence_No) || kony.sync.isEmptyString(valuestable.Sequence_No)){
		sync.log.error("Mandatory attribute Sequence_No is missing for the SyncObject Emergency_Contacts.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Emergency_Contacts", "Sequence_No")));
		return false;
	}
	if(kony.sync.isNull(valuestable.START_DATE) || kony.sync.isEmptyString(valuestable.START_DATE)){
		sync.log.error("Mandatory attribute START_DATE is missing for the SyncObject Emergency_Contacts.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Emergency_Contacts", "START_DATE")));
		return false;
	}
	return true;
};

com.kony.ESS.myprofile.Emergency_Contacts.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.ESS.myprofile.Emergency_Contacts.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.ESS.myprofile.Emergency_Contacts.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.ESS.myprofile.Emergency_Contacts.getTableName = function(){
	return "Emergency_Contacts";
};




// **********************************End Emergency_Contacts's helper methods************************