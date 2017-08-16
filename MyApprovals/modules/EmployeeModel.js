//****************Sync Version:MobileFabricInstaller-DEV-7.2.1_v201611220827_r47*******************
// ****************Generated On Wed Aug 16 06:50:31 UTC 2017Employee*******************
// **********************************Start Employee's helper methods************************
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
* Creates new Employee
*************************************************************************************/
com.ess.EMPLOYEE.Employee = function(){
	this.Blood_group = null;
	this.Date_of_birth = null;
	this.Department_Id = null;
	this.Designation_Id = null;
	this.Employment_Type = null;
	this.First_Name = null;
	this.Gender = null;
	this.group_id = null;
	this.Id = null;
	this.Interests = null;
	this.IsEmployee = null;
	this.Job_Location = null;
	this.JoiningDate = null;
	this.lastmodifiedts = null;
	this.Last_Name = null;
	this.Manager_Id = null;
	this.Marital_Status_Id = null;
	this.Marriage_date = null;
	this.Media_Id = null;
	this.Medical_needs = null;
	this.Middle_Name = null;
	this.Nationality = null;
	this.Office_Id = null;
	this.Physical_disability = null;
	this.Place_of_birth = null;
	this.Preffered_name = null;
	this.RH_factor = null;
	this.softdeleteflag = null;
	this.Suffix = null;
	this.Title = null;
	this.User_Id = null;
	this.markForUpload = true;
};

com.ess.EMPLOYEE.Employee.prototype = {
	get Blood_group(){
		return this._Blood_group;
	},
	set Blood_group(val){
		this._Blood_group = val;
	},
	get Date_of_birth(){
		return this._Date_of_birth;
	},
	set Date_of_birth(val){
		this._Date_of_birth = val;
	},
	get Department_Id(){
		return this._Department_Id;
	},
	set Department_Id(val){
		this._Department_Id = val;
	},
	get Designation_Id(){
		return this._Designation_Id;
	},
	set Designation_Id(val){
		this._Designation_Id = val;
	},
	get Employment_Type(){
		return this._Employment_Type;
	},
	set Employment_Type(val){
		this._Employment_Type = val;
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
	get group_id(){
		return this._group_id;
	},
	set group_id(val){
		this._group_id = val;
	},
	get Id(){
		return this._Id;
	},
	set Id(val){
		this._Id = val;
	},
	get Interests(){
		return this._Interests;
	},
	set Interests(val){
		this._Interests = val;
	},
	get IsEmployee(){
		return this._IsEmployee;
	},
	set IsEmployee(val){
		this._IsEmployee = val;
	},
	get Job_Location(){
		return this._Job_Location;
	},
	set Job_Location(val){
		this._Job_Location = val;
	},
	get JoiningDate(){
		return this._JoiningDate;
	},
	set JoiningDate(val){
		this._JoiningDate = val;
	},
	get lastmodifiedts(){
		return this._lastmodifiedts;
	},
	set lastmodifiedts(val){
		this._lastmodifiedts = val;
	},
	get Last_Name(){
		return this._Last_Name;
	},
	set Last_Name(val){
		this._Last_Name = val;
	},
	get Manager_Id(){
		return this._Manager_Id;
	},
	set Manager_Id(val){
		this._Manager_Id = val;
	},
	get Marital_Status_Id(){
		return this._Marital_Status_Id;
	},
	set Marital_Status_Id(val){
		this._Marital_Status_Id = val;
	},
	get Marriage_date(){
		return this._Marriage_date;
	},
	set Marriage_date(val){
		this._Marriage_date = val;
	},
	get Media_Id(){
		return this._Media_Id;
	},
	set Media_Id(val){
		this._Media_Id = val;
	},
	get Medical_needs(){
		return this._Medical_needs;
	},
	set Medical_needs(val){
		this._Medical_needs = val;
	},
	get Middle_Name(){
		return this._Middle_Name;
	},
	set Middle_Name(val){
		this._Middle_Name = val;
	},
	get Nationality(){
		return this._Nationality;
	},
	set Nationality(val){
		this._Nationality = val;
	},
	get Office_Id(){
		return this._Office_Id;
	},
	set Office_Id(val){
		this._Office_Id = val;
	},
	get Physical_disability(){
		return this._Physical_disability;
	},
	set Physical_disability(val){
		this._Physical_disability = val;
	},
	get Place_of_birth(){
		return this._Place_of_birth;
	},
	set Place_of_birth(val){
		this._Place_of_birth = val;
	},
	get Preffered_name(){
		return this._Preffered_name;
	},
	set Preffered_name(val){
		this._Preffered_name = val;
	},
	get RH_factor(){
		return this._RH_factor;
	},
	set RH_factor(val){
		this._RH_factor = val;
	},
	get softdeleteflag(){
		return this._softdeleteflag;
	},
	set softdeleteflag(val){
		this._softdeleteflag = val;
	},
	get Suffix(){
		return this._Suffix;
	},
	set Suffix(val){
		this._Suffix = val;
	},
	get Title(){
		return this._Title;
	},
	set Title(val){
		this._Title = val;
	},
	get User_Id(){
		return this._User_Id;
	},
	set User_Id(val){
		this._User_Id = val;
	},
};

/************************************************************************************
* Retrieves all instances of Employee SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "Blood_group";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "Date_of_birth";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.ess.EMPLOYEE.Employee.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.ess.EMPLOYEE.Employee.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	orderByMap = kony.sync.formOrderByClause("Employee",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getAll->successcallback");
		successcallback(com.ess.EMPLOYEE.Employee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of Employee present in local database.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getAllCount function");
	com.ess.EMPLOYEE.Employee.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of Employee using where clause in the local Database
*************************************************************************************/
com.ess.EMPLOYEE.Employee.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getCount->successcallback");
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
* Creates a new instance of Employee in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.ess.EMPLOYEE.Employee.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Employee.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"Employee",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.Employee.getRelationshipMap(relationshipMap,valuestable);
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
		errMsg = errMsg + ", User_Id=" + valuestable.User_Id;
		pks["User_Id"] = {key:"User_Id",value:valuestable.User_Id};
		com.ess.EMPLOYEE.Employee.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of Employee in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Blood_group = "Blood_group_0";
*		valuesArray[0].Date_of_birth = 0;
*		valuesArray[0].Department_Id = "Department_Id_0";
*		valuesArray[0].Designation_Id = "Designation_Id_0";
*		valuesArray[0].Employment_Type = "Employment_Type_0";
*		valuesArray[0].First_Name = "First_Name_0";
*		valuesArray[0].Gender = "Gender_0";
*		valuesArray[0].group_id = "group_id_0";
*		valuesArray[0].Id = "Id_0";
*		valuesArray[0].Interests = "Interests_0";
*		valuesArray[0].IsEmployee = "IsEmployee_0";
*		valuesArray[0].Job_Location = "Job_Location_0";
*		valuesArray[0].JoiningDate = 0;
*		valuesArray[0].Last_Name = "Last_Name_0";
*		valuesArray[0].Manager_Id = "Manager_Id_0";
*		valuesArray[0].Marital_Status_Id = "Marital_Status_Id_0";
*		valuesArray[0].Marriage_date = 0;
*		valuesArray[0].Media_Id = "Media_Id_0";
*		valuesArray[0].Medical_needs = "Medical_needs_0";
*		valuesArray[0].Middle_Name = "Middle_Name_0";
*		valuesArray[0].Nationality = "Nationality_0";
*		valuesArray[0].Office_Id = "Office_Id_0";
*		valuesArray[0].Physical_disability = "Physical_disability_0";
*		valuesArray[0].Place_of_birth = "Place_of_birth_0";
*		valuesArray[0].Preffered_name = "Preffered_name_0";
*		valuesArray[0].RH_factor = "RH_factor_0";
*		valuesArray[0].Suffix = "Suffix_0";
*		valuesArray[0].Title = "Title_0";
*		valuesArray[0].User_Id = "User_Id_0";
*		valuesArray[1] = {};
*		valuesArray[1].Blood_group = "Blood_group_1";
*		valuesArray[1].Date_of_birth = 1;
*		valuesArray[1].Department_Id = "Department_Id_1";
*		valuesArray[1].Designation_Id = "Designation_Id_1";
*		valuesArray[1].Employment_Type = "Employment_Type_1";
*		valuesArray[1].First_Name = "First_Name_1";
*		valuesArray[1].Gender = "Gender_1";
*		valuesArray[1].group_id = "group_id_1";
*		valuesArray[1].Id = "Id_1";
*		valuesArray[1].Interests = "Interests_1";
*		valuesArray[1].IsEmployee = "IsEmployee_1";
*		valuesArray[1].Job_Location = "Job_Location_1";
*		valuesArray[1].JoiningDate = 1;
*		valuesArray[1].Last_Name = "Last_Name_1";
*		valuesArray[1].Manager_Id = "Manager_Id_1";
*		valuesArray[1].Marital_Status_Id = "Marital_Status_Id_1";
*		valuesArray[1].Marriage_date = 1;
*		valuesArray[1].Media_Id = "Media_Id_1";
*		valuesArray[1].Medical_needs = "Medical_needs_1";
*		valuesArray[1].Middle_Name = "Middle_Name_1";
*		valuesArray[1].Nationality = "Nationality_1";
*		valuesArray[1].Office_Id = "Office_Id_1";
*		valuesArray[1].Physical_disability = "Physical_disability_1";
*		valuesArray[1].Place_of_birth = "Place_of_birth_1";
*		valuesArray[1].Preffered_name = "Preffered_name_1";
*		valuesArray[1].RH_factor = "RH_factor_1";
*		valuesArray[1].Suffix = "Suffix_1";
*		valuesArray[1].Title = "Title_1";
*		valuesArray[1].User_Id = "User_Id_1";
*		valuesArray[2] = {};
*		valuesArray[2].Blood_group = "Blood_group_2";
*		valuesArray[2].Date_of_birth = 2;
*		valuesArray[2].Department_Id = "Department_Id_2";
*		valuesArray[2].Designation_Id = "Designation_Id_2";
*		valuesArray[2].Employment_Type = "Employment_Type_2";
*		valuesArray[2].First_Name = "First_Name_2";
*		valuesArray[2].Gender = "Gender_2";
*		valuesArray[2].group_id = "group_id_2";
*		valuesArray[2].Id = "Id_2";
*		valuesArray[2].Interests = "Interests_2";
*		valuesArray[2].IsEmployee = "IsEmployee_2";
*		valuesArray[2].Job_Location = "Job_Location_2";
*		valuesArray[2].JoiningDate = 2;
*		valuesArray[2].Last_Name = "Last_Name_2";
*		valuesArray[2].Manager_Id = "Manager_Id_2";
*		valuesArray[2].Marital_Status_Id = "Marital_Status_Id_2";
*		valuesArray[2].Marriage_date = 2;
*		valuesArray[2].Media_Id = "Media_Id_2";
*		valuesArray[2].Medical_needs = "Medical_needs_2";
*		valuesArray[2].Middle_Name = "Middle_Name_2";
*		valuesArray[2].Nationality = "Nationality_2";
*		valuesArray[2].Office_Id = "Office_Id_2";
*		valuesArray[2].Physical_disability = "Physical_disability_2";
*		valuesArray[2].Place_of_birth = "Place_of_birth_2";
*		valuesArray[2].Preffered_name = "Preffered_name_2";
*		valuesArray[2].RH_factor = "RH_factor_2";
*		valuesArray[2].Suffix = "Suffix_2";
*		valuesArray[2].Title = "Title_2";
*		valuesArray[2].User_Id = "User_Id_2";
*		com.ess.EMPLOYEE.Employee.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.Employee.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"Employee",errorcallback,true)===false){
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
				errMsg = errMsg + ", User_Id=" + valuestable.User_Id;
				pks["User_Id"] = {key:"User_Id",value:valuestable.User_Id};
				var wcs = [];
				if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.ess.EMPLOYEE.Employee.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates Employee using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.ess.EMPLOYEE.Employee.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Employee.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"Employee",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.ess.EMPLOYEE.Employee.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates Employee(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"Employee",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.Employee.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.ess.EMPLOYEE.Employee.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.ess.EMPLOYEE.Employee.getPKTable());
	}
};

/************************************************************************************
* Updates Employee(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.Blood_group = "Blood_group_updated0";
*		inputArray[0].changeSet.Date_of_birth = "Date_of_birth_updated0";
*		inputArray[0].changeSet.Department_Id = "Department_Id_updated0";
*		inputArray[0].changeSet.Designation_Id = "Designation_Id_updated0";
*		inputArray[0].whereClause = "where Id = '0'";
*		inputArray[0].whereClause = "where User_Id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.Blood_group = "Blood_group_updated1";
*		inputArray[1].changeSet.Date_of_birth = "Date_of_birth_updated1";
*		inputArray[1].changeSet.Department_Id = "Department_Id_updated1";
*		inputArray[1].changeSet.Designation_Id = "Designation_Id_updated1";
*		inputArray[1].whereClause = "where Id = '1'";
*		inputArray[1].whereClause = "where User_Id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.Blood_group = "Blood_group_updated2";
*		inputArray[2].changeSet.Date_of_birth = "Date_of_birth_updated2";
*		inputArray[2].changeSet.Department_Id = "Department_Id_updated2";
*		inputArray[2].changeSet.Designation_Id = "Designation_Id_updated2";
*		inputArray[2].whereClause = "where Id = '2'";
*		inputArray[2].whereClause = "where User_Id = '2'";
*		com.ess.EMPLOYEE.Employee.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.Employee.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100004737b2bb0f56";
	var tbname = "Employee";
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
			if(kony.sync.attributeValidation(valuestable,"Employee",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.ess.EMPLOYEE.Employee.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.ess.EMPLOYEE.Employee.getPKTable());
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
		sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.ess.EMPLOYEE.Employee.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes Employee using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.ess.EMPLOYEE.Employee.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function EmployeeTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.deleteByPK->Employee_PKPresent successcallback");
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
	
	function EmployeeErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Employee.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function EmployeeSuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Employee.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, EmployeeTransactionCallback, EmployeeSuccessCallback, EmployeeErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes Employee(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.ess.EMPLOYEE.Employee.remove("where Blood_group like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.ess.EMPLOYEE.Employee.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Employee_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Employee_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.remove->Employee_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Employee_removeTransactioncallback, Employee_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes Employee using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function EmployeeTransactionCallback(tx){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK -> EmployeeTransactionCallback");
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
	
	function EmployeeErrorCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK -> EmployeeErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function EmployeeSuccessCallback(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK -> EmployeeSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Employee.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, EmployeeTransactionCallback, EmployeeSuccessCallback, EmployeeErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes Employee(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.ess.EMPLOYEE.Employee.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function Employee_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function Employee_removeSuccess(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.remove->Employee_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, Employee_removeTransactioncallback, Employee_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves Employee using primary key from the local Database. 
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getAllDetailsByPK-> success callback function");
		successcallback(com.ess.EMPLOYEE.Employee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves Employee(s) using where clause from the local Database. 
* e.g. com.ess.EMPLOYEE.Employee.find("where Blood_group like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.ess.EMPLOYEE.Employee.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Employee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of Employee with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.ess.EMPLOYEE.Employee.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.ess.EMPLOYEE.Employee.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of Employee matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Employee.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of Employee pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Employee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Employee pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Employee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of Employee deferred for upload.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.ess.EMPLOYEE.Employee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to Employee in local database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.Employee.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to Employee's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	var wcs = [];
	if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.ess.EMPLOYEE.Employee.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether Employee's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether Employee's record  
* with given primary key is pending for upload
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.ess.EMPLOYEE.Employee.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
	var wcs = [] ;
	var flag;
	if(com.ess.EMPLOYEE.Employee.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.ess.EMPLOYEE.Employee.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of Communication_Channel related to Employee
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.ess.EMPLOYEE.Employee.prototype.getCommunication_ChannelWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.getCommunication_ChannelWithId function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.getCommunication_ChannelWithId(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.getCommunication_ChannelWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getCommunication_ChannelWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.getCommunication_ChannelWithId",  "relationship", errorcallback)){
		return;
	}	
	function Employee_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Employee_Id", value:targetKey_0});		
			
			var tbname = "Communication_Channel"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.ess.EMPLOYEE.Communication_Channel.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.ess.EMPLOYEE.Communication_Channel();
				obj.Communication_Type_Id = res[i].Communication_Type_Id;
				obj.Employee_Id = res[i].Employee_Id;
				obj.END_DATE = res[i].END_DATE;
				obj.lastmodifiedts = res[i].lastmodifiedts;
				obj.softdeleteflag = res[i].softdeleteflag;
				obj.START_DATE = res[i].START_DATE;
				obj.Value = res[i].Value;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.ess.EMPLOYEE.Employee.getAllDetailsByPK(pks, Employee_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Communication_Channel related to Employee
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.getCountOfCommunication_ChannelWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.getCountOfCommunication_ChannelWithId function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.getCountOfCommunication_ChannelWithId(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.getCountOfCommunication_ChannelWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getCountOfCommunication_ChannelWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.getCountOfCommunication_ChannelWithId",  "relationship", errorcallback)){
		return;
	}
	function Employee_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].Id;
					targetAttributes.push("Employee_Id");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"Employee_Id":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"Employee_Id":targetKey_0});
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
		   com.ess.EMPLOYEE.Communication_Channel.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.ess.EMPLOYEE.Employee.getAllDetailsByPK(pks, Employee_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of mediaEmployee related to Employee
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.ess.EMPLOYEE.Employee.prototype.getmediaEmployeeWithMedia_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.getmediaEmployeeWithMedia_Id function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.getmediaEmployeeWithMedia_Id(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.getmediaEmployeeWithMedia_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getmediaEmployeeWithMedia_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.getmediaEmployeeWithMedia_Id",  "relationship", errorcallback)){
		return;
	}	
	function Employee_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Media_Id;				
			wcs.push({key:"name", value:targetKey_0});		
			
			var tbname = "mediaEmployee"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.ess.EMPLOYEE.mediaEmployee.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.ess.EMPLOYEE.mediaEmployee();
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
	
	com.ess.EMPLOYEE.Employee.getAllDetailsByPK(pks, Employee_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of mediaEmployee related to Employee
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.ess.EMPLOYEE.Employee.prototype.getCountOfmediaEmployeeWithMedia_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.getCountOfmediaEmployeeWithMedia_Id function");
	var pks = this.getPKTable();
	com.ess.EMPLOYEE.Employee.getCountOfmediaEmployeeWithMedia_Id(pks,successcallback,errorcallback);
};
com.ess.EMPLOYEE.Employee.getCountOfmediaEmployeeWithMedia_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getCountOfmediaEmployeeWithMedia_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.ess.EMPLOYEE.Employee.getCountOfmediaEmployeeWithMedia_Id",  "relationship", errorcallback)){
		return;
	}
	function Employee_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].Media_Id;
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
		   com.ess.EMPLOYEE.mediaEmployee.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.ess.EMPLOYEE.Employee.getAllDetailsByPK(pks, Employee_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.ess.EMPLOYEE.Employee.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.removeCascade function");
	var tbname = com.ess.EMPLOYEE.Employee.getTableName();
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


com.ess.EMPLOYEE.Employee.convertTableToObject = function(res){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.ess.EMPLOYEE.Employee();
			obj.Blood_group = res[i].Blood_group;
			obj.Date_of_birth = res[i].Date_of_birth;
			obj.Department_Id = res[i].Department_Id;
			obj.Designation_Id = res[i].Designation_Id;
			obj.Employment_Type = res[i].Employment_Type;
			obj.First_Name = res[i].First_Name;
			obj.Gender = res[i].Gender;
			obj.group_id = res[i].group_id;
			obj.Id = res[i].Id;
			obj.Interests = res[i].Interests;
			obj.IsEmployee = res[i].IsEmployee;
			obj.Job_Location = res[i].Job_Location;
			obj.JoiningDate = res[i].JoiningDate;
			obj.lastmodifiedts = res[i].lastmodifiedts;
			obj.Last_Name = res[i].Last_Name;
			obj.Manager_Id = res[i].Manager_Id;
			obj.Marital_Status_Id = res[i].Marital_Status_Id;
			obj.Marriage_date = res[i].Marriage_date;
			obj.Media_Id = res[i].Media_Id;
			obj.Medical_needs = res[i].Medical_needs;
			obj.Middle_Name = res[i].Middle_Name;
			obj.Nationality = res[i].Nationality;
			obj.Office_Id = res[i].Office_Id;
			obj.Physical_disability = res[i].Physical_disability;
			obj.Place_of_birth = res[i].Place_of_birth;
			obj.Preffered_name = res[i].Preffered_name;
			obj.RH_factor = res[i].RH_factor;
			obj.softdeleteflag = res[i].softdeleteflag;
			obj.Suffix = res[i].Suffix;
			obj.Title = res[i].Title;
			obj.User_Id = res[i].User_Id;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.ess.EMPLOYEE.Employee.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.filterAttributes function");
	var attributeTable = {};
	attributeTable.Blood_group = "Blood_group";
	attributeTable.Date_of_birth = "Date_of_birth";
	attributeTable.Department_Id = "Department_Id";
	attributeTable.Designation_Id = "Designation_Id";
	attributeTable.Employment_Type = "Employment_Type";
	attributeTable.First_Name = "First_Name";
	attributeTable.Gender = "Gender";
	attributeTable.group_id = "group_id";
	attributeTable.Id = "Id";
	attributeTable.Interests = "Interests";
	attributeTable.IsEmployee = "IsEmployee";
	attributeTable.Job_Location = "Job_Location";
	attributeTable.JoiningDate = "JoiningDate";
	attributeTable.Last_Name = "Last_Name";
	attributeTable.Manager_Id = "Manager_Id";
	attributeTable.Marital_Status_Id = "Marital_Status_Id";
	attributeTable.Marriage_date = "Marriage_date";
	attributeTable.Media_Id = "Media_Id";
	attributeTable.Medical_needs = "Medical_needs";
	attributeTable.Middle_Name = "Middle_Name";
	attributeTable.Nationality = "Nationality";
	attributeTable.Office_Id = "Office_Id";
	attributeTable.Physical_disability = "Physical_disability";
	attributeTable.Place_of_birth = "Place_of_birth";
	attributeTable.Preffered_name = "Preffered_name";
	attributeTable.RH_factor = "RH_factor";
	attributeTable.Suffix = "Suffix";
	attributeTable.Title = "Title";
	attributeTable.User_Id = "User_Id";

	var PKTable = {};
	PKTable.Id = {}
	PKTable.Id.name = "Id";
	PKTable.Id.isAutoGen = false;
	PKTable.User_Id = {}
	PKTable.User_Id.name = "User_Id";
	PKTable.User_Id.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject Employee. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject Employee. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject Employee. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.ess.EMPLOYEE.Employee.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.ess.EMPLOYEE.Employee.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.ess.EMPLOYEE.Employee.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.Blood_group = this.Blood_group;
	valuesTable.Date_of_birth = this.Date_of_birth;
	valuesTable.Department_Id = this.Department_Id;
	valuesTable.Designation_Id = this.Designation_Id;
	valuesTable.Employment_Type = this.Employment_Type;
	valuesTable.First_Name = this.First_Name;
	valuesTable.Gender = this.Gender;
	valuesTable.group_id = this.group_id;
	if(isInsert===true){
		valuesTable.Id = this.Id;
	}
	valuesTable.Interests = this.Interests;
	valuesTable.IsEmployee = this.IsEmployee;
	valuesTable.Job_Location = this.Job_Location;
	valuesTable.JoiningDate = this.JoiningDate;
	valuesTable.Last_Name = this.Last_Name;
	valuesTable.Manager_Id = this.Manager_Id;
	valuesTable.Marital_Status_Id = this.Marital_Status_Id;
	valuesTable.Marriage_date = this.Marriage_date;
	valuesTable.Media_Id = this.Media_Id;
	valuesTable.Medical_needs = this.Medical_needs;
	valuesTable.Middle_Name = this.Middle_Name;
	valuesTable.Nationality = this.Nationality;
	valuesTable.Office_Id = this.Office_Id;
	valuesTable.Physical_disability = this.Physical_disability;
	valuesTable.Place_of_birth = this.Place_of_birth;
	valuesTable.Preffered_name = this.Preffered_name;
	valuesTable.RH_factor = this.RH_factor;
	valuesTable.Suffix = this.Suffix;
	valuesTable.Title = this.Title;
	if(isInsert===true){
		valuesTable.User_Id = this.User_Id;
	}
	return valuesTable;
};

com.ess.EMPLOYEE.Employee.prototype.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Id = {key:"Id",value:this.Id};
	pkTable.User_Id = {key:"User_Id",value:this.User_Id};
	return pkTable;
};

com.ess.EMPLOYEE.Employee.getPKTable = function(){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getPKTable function");
	var pkTable = [];
	pkTable.push("Id");
	pkTable.push("User_Id");
	return pkTable;
};

com.ess.EMPLOYEE.Employee.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.pkCheck function");
	var wc = [];
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
		sync.log.error("Primary Key Id not specified in " + opName + " an item in Employee");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"Employee")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.User_Id)){
		if(!kony.sync.isNull(pks.User_Id.value)){
			wc.key = "User_Id";
			wc.value = pks.User_Id.value;
		}
		else{
			wc.key = "User_Id";
			wc.value = pks.User_Id;
		}
	}else{
		sync.log.error("Primary Key User_Id not specified in " + opName + " an item in Employee");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("User_Id",opName,"Employee")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.ess.EMPLOYEE.Employee.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.validateNull function");
	return true;
};

com.ess.EMPLOYEE.Employee.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
		sync.log.error("Mandatory attribute Id is missing for the SyncObject Employee.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Employee", "Id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.User_Id) || kony.sync.isEmptyString(valuestable.User_Id)){
		sync.log.error("Mandatory attribute User_Id is missing for the SyncObject Employee.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "Employee", "User_Id")));
		return false;
	}
	return true;
};

com.ess.EMPLOYEE.Employee.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.ess.EMPLOYEE.Employee.getRelationshipMap function");
	var r1 = {};

	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.Id)){
		r1.sourceAttribute.push("Employee_Id") ;
		r1.foreignKeyAttribute.push("Id") ;
		r1.targetAttributeValue.push("'" + valuestable.Id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.Communication_Channel===undefined){
			relationshipMap.Communication_Channel = [];
		}
		relationshipMap.Communication_Channel.push(r1);
	}
		
	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.Media_Id)){
		r1.sourceAttribute.push("name") ;
		r1.foreignKeyAttribute.push("Media_Id") ;
		r1.targetAttributeValue.push("'" + valuestable.Media_Id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.mediaEmployee===undefined){
			relationshipMap.mediaEmployee = [];
		}
		relationshipMap.mediaEmployee.push(r1);
	}
		
	return relationshipMap;
};


com.ess.EMPLOYEE.Employee.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.ess.EMPLOYEE.Employee.getTableName = function(){
	return "Employee";
};




// **********************************End Employee's helper methods************************