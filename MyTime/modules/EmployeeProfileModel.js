//****************Sync Version:Sync-QA-7.1.0_v201606271552_r5*******************
// ****************Generated On Tue Nov 08 15:33:07 IST 2016EmployeeProfile*******************
// **********************************Start EmployeeProfile's helper methods************************
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
* Creates new EmployeeProfile
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile = function(){
	this.Blood_group = null;
	this.Date_of_birth = null;
	this.Department_id = null;
	this.Designation_Id = null;
	this.Employment_Type = null;
	this.First_Name = null;
	this.Gender = null;
	this.Id = null;
	this.Interests = null;
	this.IsEmployee = null;
	this.Job_Location = null;
	this.JoiningDate = null;
	this.Last_Name = null;
	this.Manager_Id = null;
	this.Marital_Status = null;
	this.Marriage_Date = null;
	this.Media_Id = null;
	this.Medical_Needs = null;
	this.Middle_Name = null;
	this.Nationality = null;
	this.Office_Id = null;
	this.Place_of_birth = null;
	this.Preffered_name = null;
	this.softdeleteflag = null;
	this.Suffix = null;
	this.TIMESTAMP = null;
	this.Title = null;
	this.User_Id = null;
	this.markForUpload = true;
};

com.kony.ESS.myprofile.EmployeeProfile.prototype = {
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
	get Department_id(){
		return this._Department_id;
	},
	set Department_id(val){
		this._Department_id = val;
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
	get Marital_Status(){
		return this._Marital_Status;
	},
	set Marital_Status(val){
		this._Marital_Status = val;
	},
	get Marriage_Date(){
		return this._Marriage_Date;
	},
	set Marriage_Date(val){
		this._Marriage_Date = val;
	},
	get Media_Id(){
		return this._Media_Id;
	},
	set Media_Id(val){
		this._Media_Id = val;
	},
	get Medical_Needs(){
		return this._Medical_Needs;
	},
	set Medical_Needs(val){
		this._Medical_Needs = val;
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
	get TIMESTAMP(){
		return this._TIMESTAMP;
	},
	set TIMESTAMP(val){
		this._TIMESTAMP = val;
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
* Retrieves all instances of EmployeeProfile SyncObject present in local database with
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
* com.kony.ESS.myprofile.EmployeeProfile.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	orderByMap = kony.sync.formOrderByClause("EmployeeProfile",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getAll->successcallback");
		successcallback(com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of EmployeeProfile present in local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getAllCount function");
	com.kony.ESS.myprofile.EmployeeProfile.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of EmployeeProfile using where clause in the local Database
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCount->successcallback");
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
* Creates a new instance of EmployeeProfile in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.ESS.myprofile.EmployeeProfile.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.myprofile.EmployeeProfile.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"EmployeeProfile",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.myprofile.EmployeeProfile.getRelationshipMap(relationshipMap,valuestable);
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
		com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of EmployeeProfile in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].Blood_group = "Blood_group_0";
*		valuesArray[0].Date_of_birth = "Date_of_birth_0";
*		valuesArray[0].Department_id = "Department_id_0";
*		valuesArray[0].Designation_Id = "Designation_Id_0";
*		valuesArray[0].Employment_Type = "Employment_Type_0";
*		valuesArray[0].First_Name = "First_Name_0";
*		valuesArray[0].Gender = "Gender_0";
*		valuesArray[0].Id = "Id_0";
*		valuesArray[0].Interests = "Interests_0";
*		valuesArray[0].IsEmployee = "IsEmployee_0";
*		valuesArray[0].Job_Location = "Job_Location_0";
*		valuesArray[0].JoiningDate = "JoiningDate_0";
*		valuesArray[0].Last_Name = "Last_Name_0";
*		valuesArray[0].Manager_Id = "Manager_Id_0";
*		valuesArray[0].Marital_Status = "Marital_Status_0";
*		valuesArray[0].Marriage_Date = "Marriage_Date_0";
*		valuesArray[0].Media_Id = "Media_Id_0";
*		valuesArray[0].Medical_Needs = "Medical_Needs_0";
*		valuesArray[0].Middle_Name = "Middle_Name_0";
*		valuesArray[0].Nationality = "Nationality_0";
*		valuesArray[0].Office_Id = "Office_Id_0";
*		valuesArray[0].Place_of_birth = "Place_of_birth_0";
*		valuesArray[0].Preffered_name = "Preffered_name_0";
*		valuesArray[0].Suffix = "Suffix_0";
*		valuesArray[0].Title = "Title_0";
*		valuesArray[0].User_Id = "User_Id_0";
*		valuesArray[1] = {};
*		valuesArray[1].Blood_group = "Blood_group_1";
*		valuesArray[1].Date_of_birth = "Date_of_birth_1";
*		valuesArray[1].Department_id = "Department_id_1";
*		valuesArray[1].Designation_Id = "Designation_Id_1";
*		valuesArray[1].Employment_Type = "Employment_Type_1";
*		valuesArray[1].First_Name = "First_Name_1";
*		valuesArray[1].Gender = "Gender_1";
*		valuesArray[1].Id = "Id_1";
*		valuesArray[1].Interests = "Interests_1";
*		valuesArray[1].IsEmployee = "IsEmployee_1";
*		valuesArray[1].Job_Location = "Job_Location_1";
*		valuesArray[1].JoiningDate = "JoiningDate_1";
*		valuesArray[1].Last_Name = "Last_Name_1";
*		valuesArray[1].Manager_Id = "Manager_Id_1";
*		valuesArray[1].Marital_Status = "Marital_Status_1";
*		valuesArray[1].Marriage_Date = "Marriage_Date_1";
*		valuesArray[1].Media_Id = "Media_Id_1";
*		valuesArray[1].Medical_Needs = "Medical_Needs_1";
*		valuesArray[1].Middle_Name = "Middle_Name_1";
*		valuesArray[1].Nationality = "Nationality_1";
*		valuesArray[1].Office_Id = "Office_Id_1";
*		valuesArray[1].Place_of_birth = "Place_of_birth_1";
*		valuesArray[1].Preffered_name = "Preffered_name_1";
*		valuesArray[1].Suffix = "Suffix_1";
*		valuesArray[1].Title = "Title_1";
*		valuesArray[1].User_Id = "User_Id_1";
*		valuesArray[2] = {};
*		valuesArray[2].Blood_group = "Blood_group_2";
*		valuesArray[2].Date_of_birth = "Date_of_birth_2";
*		valuesArray[2].Department_id = "Department_id_2";
*		valuesArray[2].Designation_Id = "Designation_Id_2";
*		valuesArray[2].Employment_Type = "Employment_Type_2";
*		valuesArray[2].First_Name = "First_Name_2";
*		valuesArray[2].Gender = "Gender_2";
*		valuesArray[2].Id = "Id_2";
*		valuesArray[2].Interests = "Interests_2";
*		valuesArray[2].IsEmployee = "IsEmployee_2";
*		valuesArray[2].Job_Location = "Job_Location_2";
*		valuesArray[2].JoiningDate = "JoiningDate_2";
*		valuesArray[2].Last_Name = "Last_Name_2";
*		valuesArray[2].Manager_Id = "Manager_Id_2";
*		valuesArray[2].Marital_Status = "Marital_Status_2";
*		valuesArray[2].Marriage_Date = "Marriage_Date_2";
*		valuesArray[2].Media_Id = "Media_Id_2";
*		valuesArray[2].Medical_Needs = "Medical_Needs_2";
*		valuesArray[2].Middle_Name = "Middle_Name_2";
*		valuesArray[2].Nationality = "Nationality_2";
*		valuesArray[2].Office_Id = "Office_Id_2";
*		valuesArray[2].Place_of_birth = "Place_of_birth_2";
*		valuesArray[2].Preffered_name = "Preffered_name_2";
*		valuesArray[2].Suffix = "Suffix_2";
*		valuesArray[2].Title = "Title_2";
*		valuesArray[2].User_Id = "User_Id_2";
*		com.kony.ESS.myprofile.EmployeeProfile.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"EmployeeProfile",errorcallback,true)===false){
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
				if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.ESS.myprofile.EmployeeProfile.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates EmployeeProfile using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.ESS.myprofile.EmployeeProfile.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.myprofile.EmployeeProfile.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"EmployeeProfile",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.ESS.myprofile.EmployeeProfile.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates EmployeeProfile(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"EmployeeProfile",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.myprofile.EmployeeProfile.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.ESS.myprofile.EmployeeProfile.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.ESS.myprofile.EmployeeProfile.getPKTable());
	}
};

/************************************************************************************
* Updates EmployeeProfile(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.Blood_group = "Blood_group_updated0";
*		inputArray[0].changeSet.Date_of_birth = "Date_of_birth_updated0";
*		inputArray[0].changeSet.Department_id = "Department_id_updated0";
*		inputArray[0].changeSet.Designation_Id = "Designation_Id_updated0";
*		inputArray[0].whereClause = "where Id = '0'";
*		inputArray[0].whereClause = "where User_Id = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.Blood_group = "Blood_group_updated1";
*		inputArray[1].changeSet.Date_of_birth = "Date_of_birth_updated1";
*		inputArray[1].changeSet.Department_id = "Department_id_updated1";
*		inputArray[1].changeSet.Designation_Id = "Designation_Id_updated1";
*		inputArray[1].whereClause = "where Id = '1'";
*		inputArray[1].whereClause = "where User_Id = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.Blood_group = "Blood_group_updated2";
*		inputArray[2].changeSet.Date_of_birth = "Date_of_birth_updated2";
*		inputArray[2].changeSet.Department_id = "Department_id_updated2";
*		inputArray[2].changeSet.Designation_Id = "Designation_Id_updated2";
*		inputArray[2].whereClause = "where Id = '2'";
*		inputArray[2].whereClause = "where User_Id = '2'";
*		com.kony.ESS.myprofile.EmployeeProfile.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "100000014f28b9685";
	var tbname = "EmployeeProfile";
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
			if(kony.sync.attributeValidation(valuestable,"EmployeeProfile",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.ESS.myprofile.EmployeeProfile.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.ESS.myprofile.EmployeeProfile.getPKTable());
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
		sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.ESS.myprofile.EmployeeProfile.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes EmployeeProfile using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.ESS.myprofile.EmployeeProfile.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function EmployeeProfileTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.deleteByPK->EmployeeProfile_PKPresent successcallback");
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
	
	function EmployeeProfileErrorCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.EmployeeProfile.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function EmployeeProfileSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.EmployeeProfile.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, EmployeeProfileTransactionCallback, EmployeeProfileSuccessCallback, EmployeeProfileErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes EmployeeProfile(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.ESS.myprofile.EmployeeProfile.remove("where Blood_group like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function EmployeeProfile_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function EmployeeProfile_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.remove->EmployeeProfile_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, EmployeeProfile_removeTransactioncallback, EmployeeProfile_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes EmployeeProfile using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function EmployeeProfileTransactionCallback(tx){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK -> EmployeeProfileTransactionCallback");
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
	
	function EmployeeProfileErrorCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK -> EmployeeProfileErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function EmployeeProfileSuccessCallback(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK -> EmployeeProfileSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, EmployeeProfileTransactionCallback, EmployeeProfileSuccessCallback, EmployeeProfileErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes EmployeeProfile(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function EmployeeProfile_removeTransactioncallback(tx){
		wcs = " " + wcs;
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function EmployeeProfile_removeSuccess(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.remove->EmployeeProfile_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, EmployeeProfile_removeTransactioncallback, EmployeeProfile_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves EmployeeProfile using primary key from the local Database. 
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	var wcs = [];
	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves EmployeeProfile(s) using where clause from the local Database. 
* e.g. com.kony.ESS.myprofile.EmployeeProfile.find("where Blood_group like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of EmployeeProfile with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of EmployeeProfile matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.ESS.myprofile.EmployeeProfile.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of EmployeeProfile pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of EmployeeProfile pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of EmployeeProfile deferred for upload.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
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
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to EmployeeProfile in local database to last synced state
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to EmployeeProfile's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	var wcs = [];
	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.ESS.myprofile.EmployeeProfile.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether EmployeeProfile's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether EmployeeProfile's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.ESS.myprofile.EmployeeProfile.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.ESS.myprofile.EmployeeProfile.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.isRecordPendingForUpload->successcallback function");
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
* Retrieves instances of ADDRESS related to EmployeeProfile
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.myprofile.EmployeeProfile.prototype.getADDRESSWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getADDRESSWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getADDRESSWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getADDRESSWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getADDRESSWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getADDRESSWithId",  "relationship", errorcallback)){
		return;
	}	
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Employee_Id", value:targetKey_0});		
			
			var tbname = "ADDRESS"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.myprofile.ADDRESS.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.myprofile.ADDRESS();
				obj.Address1 = res[i].Address1;
				obj.Address2 = res[i].Address2;
				obj.City = res[i].City;
				obj.Country_Master_Id = res[i].Country_Master_Id;
				obj.Employee_Id = res[i].Employee_Id;
				obj.END_DATE = res[i].END_DATE;
				obj.Lat = res[i].Lat;
				obj.Long = res[i].Long;
				obj.softdeleteflag = res[i].softdeleteflag;
				obj.START_DATE = res[i].START_DATE;
				obj.State = res[i].State;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				obj.Type = res[i].Type;
				obj.Zip = res[i].Zip;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of ADDRESS related to EmployeeProfile
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfADDRESSWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfADDRESSWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getCountOfADDRESSWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getCountOfADDRESSWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCountOfADDRESSWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCountOfADDRESSWithId",  "relationship", errorcallback)){
		return;
	}
	function EmployeeProfile_successcallback(res){
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
		   com.kony.ESS.myprofile.ADDRESS.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of Department related to EmployeeProfile
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.myprofile.EmployeeProfile.prototype.getDepartmentWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getDepartmentWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getDepartmentWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getDepartmentWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getDepartmentWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getDepartmentWithId",  "relationship", errorcallback)){
		return;
	}	
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"EMPNUMBER", value:targetKey_0});		
			
			var tbname = "Department"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.myprofile.Department.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.myprofile.Department();
				obj.Dept_Name = res[i].Dept_Name;
				obj.EMPNUMBER = res[i].EMPNUMBER;
				obj.id = res[i].id;
				obj.softdeleteflag = res[i].softdeleteflag;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Department related to EmployeeProfile
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfDepartmentWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfDepartmentWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getCountOfDepartmentWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getCountOfDepartmentWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCountOfDepartmentWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCountOfDepartmentWithId",  "relationship", errorcallback)){
		return;
	}
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].Id;
					targetAttributes.push("EMPNUMBER");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"EMPNUMBER":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"EMPNUMBER":targetKey_0});
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
		   com.kony.ESS.myprofile.Department.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of Dependant_Details related to EmployeeProfile
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.myprofile.EmployeeProfile.prototype.getDependant_DetailsWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getDependant_DetailsWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getDependant_DetailsWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getDependant_DetailsWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getDependant_DetailsWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getDependant_DetailsWithId",  "relationship", errorcallback)){
		return;
	}	
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Employee_Id", value:targetKey_0});		
			
			var tbname = "Dependant_Details"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.myprofile.Dependant_Details.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.myprofile.Dependant_Details();
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
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Dependant_Details related to EmployeeProfile
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfDependant_DetailsWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfDependant_DetailsWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getCountOfDependant_DetailsWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getCountOfDependant_DetailsWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCountOfDependant_DetailsWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCountOfDependant_DetailsWithId",  "relationship", errorcallback)){
		return;
	}
	function EmployeeProfile_successcallback(res){
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
		   com.kony.ESS.myprofile.Dependant_Details.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of Designation related to EmployeeProfile
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.myprofile.EmployeeProfile.prototype.getDesignationWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getDesignationWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getDesignationWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getDesignationWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getDesignationWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getDesignationWithId",  "relationship", errorcallback)){
		return;
	}	
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"EMPNUMBER", value:targetKey_0});		
			
			var tbname = "Designation"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.myprofile.Designation.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.myprofile.Designation();
				obj.Description = res[i].Description;
				obj.Designation = res[i].Designation;
				obj.EMPNUMBER = res[i].EMPNUMBER;
				obj.Id = res[i].Id;
				obj.Job_Level = res[i].Job_Level;
				obj.Sequence_No = res[i].Sequence_No;
				obj.softdeleteflag = res[i].softdeleteflag;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Designation related to EmployeeProfile
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfDesignationWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfDesignationWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getCountOfDesignationWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getCountOfDesignationWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCountOfDesignationWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCountOfDesignationWithId",  "relationship", errorcallback)){
		return;
	}
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
				var targetAttributes = [];
													var targetKey_0 = res[0].Id;
					targetAttributes.push("EMPNUMBER");
					if(kony.type(targetKey_0)==="string") {
						wcs.push({"EMPNUMBER":"'"+targetKey_0+"'"});
					}else{
						wcs.push({"EMPNUMBER":targetKey_0});
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
		   com.kony.ESS.myprofile.Designation.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of Emergency_Contacts related to EmployeeProfile
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.myprofile.EmployeeProfile.prototype.getEmergency_ContactsWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getEmergency_ContactsWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getEmergency_ContactsWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getEmergency_ContactsWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getEmergency_ContactsWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getEmergency_ContactsWithId",  "relationship", errorcallback)){
		return;
	}	
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Employee_Id", value:targetKey_0});		
			
			var tbname = "Emergency_Contacts"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.myprofile.Emergency_Contacts.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Emergency_Contacts related to EmployeeProfile
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfEmergency_ContactsWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfEmergency_ContactsWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getCountOfEmergency_ContactsWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getCountOfEmergency_ContactsWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCountOfEmergency_ContactsWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCountOfEmergency_ContactsWithId",  "relationship", errorcallback)){
		return;
	}
	function EmployeeProfile_successcallback(res){
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
		   com.kony.ESS.myprofile.Emergency_Contacts.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of Identity related to EmployeeProfile
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.myprofile.EmployeeProfile.prototype.getIdentityWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getIdentityWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getIdentityWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getIdentityWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getIdentityWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getIdentityWithId",  "relationship", errorcallback)){
		return;
	}	
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Id;				
			wcs.push({key:"Employee_Id", value:targetKey_0});		
			
			var tbname = "Identity"
			var query = kony.sync.qb_createQuery();
			kony.sync.qb_select(query, null);
			kony.sync.qb_from(query, tbname);
			kony.sync.qb_where(query,wcs);
		
			var query_compile = kony.sync.qb_compile(query);
			var sql = query_compile[0];
			var params = query_compile[1];
			var dbname = kony.sync.getDBName();
		
			function mySuccCallback(res){
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.myprofile.Identity.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.myprofile.Identity();
				obj.Country_Master_Id = res[i].Country_Master_Id;
				obj.Date_of_expiry = res[i].Date_of_expiry;
				obj.Date_of_issue = res[i].Date_of_issue;
				obj.Employee_Id = res[i].Employee_Id;
				obj.END_DATE = res[i].END_DATE;
				obj.ID = res[i].ID;
				obj.Identity_Number = res[i].Identity_Number;
				obj.Identity_Type = res[i].Identity_Type;
				obj.Identity_Type_Id = res[i].Identity_Type_Id;
				obj.Name_as_on_Id = res[i].Name_as_on_Id;
				obj.Place_of_Issue = res[i].Place_of_Issue;
				obj.softdeleteflag = res[i].softdeleteflag;
				obj.START_DATE = res[i].START_DATE;
				obj.TIMESTAMP = res[i].TIMESTAMP;
				objMap[i] = obj;
			}
		}
		kony.sync.verifyAndCallClosure(successcallback, objMap);
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of Identity related to EmployeeProfile
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfIdentityWithId  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfIdentityWithId function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getCountOfIdentityWithId(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getCountOfIdentityWithId = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCountOfIdentityWithId function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCountOfIdentityWithId",  "relationship", errorcallback)){
		return;
	}
	function EmployeeProfile_successcallback(res){
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
		   com.kony.ESS.myprofile.Identity.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};
/************************************************************************************
* Retrieves instances of media related to EmployeeProfile
* with given $relationship.getSourceObjectAttribute() from local database.
*************************************************************************************/

					
com.kony.ESS.myprofile.EmployeeProfile.prototype.getmediaWithMedia_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getmediaWithMedia_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getmediaWithMedia_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getmediaWithMedia_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getmediaWithMedia_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}		
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getmediaWithMedia_Id",  "relationship", errorcallback)){
		return;
	}	
	function EmployeeProfile_successcallback(res){
		if(null!==res && res.length>0) {
			var wcs = [];
			var targetKey_0 = res[0].Media_Id;				
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
									kony.sync.verifyAndCallClosure(mySuccesscallback, com.kony.ESS.myprofile.media.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
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
				var obj = new com.kony.ESS.myprofile.media();
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
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Retrieves number of instances of media related to EmployeeProfile
* with given ${displayTargetAttribute} from local database.
*************************************************************************************/
com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfmediaWithMedia_Id  = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getCountOfmediaWithMedia_Id function");
	var pks = this.getPKTable();
	com.kony.ESS.myprofile.EmployeeProfile.getCountOfmediaWithMedia_Id(pks,successcallback,errorcallback);
};
com.kony.ESS.myprofile.EmployeeProfile.getCountOfmediaWithMedia_Id = function(pks,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getCountOfmediaWithMedia_Id function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.ESS.myprofile.EmployeeProfile.getCountOfmediaWithMedia_Id",  "relationship", errorcallback)){
		return;
	}
	function EmployeeProfile_successcallback(res){
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
		   com.kony.ESS.myprofile.media.getCount(wClause, successcallback,errorcallback);
		}else{
			kony.sync.verifyAndCallClosure(successcallback,{"count":0});
			return;
		}
	}
	
	com.kony.ESS.myprofile.EmployeeProfile.getAllDetailsByPK(pks, EmployeeProfile_successcallback, errorcallback);
};

/************************************************************************************
* Start of helper functions used internally, not to be used as ORMs
*************************************************************************************/

//Deletes all the dependant tables in the relationship tables.Need to pass transaction handler as input
com.kony.ESS.myprofile.EmployeeProfile.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.removeCascade function");
	var tbname = com.kony.ESS.myprofile.EmployeeProfile.getTableName();
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


com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.convertTableToObject function");
	objMap = [];
	if(res!==null){
		for(var i in res){
			var obj = new com.kony.ESS.myprofile.EmployeeProfile();
			obj.Blood_group = res[i].Blood_group;
			obj.Date_of_birth = res[i].Date_of_birth;
			obj.Department_id = res[i].Department_id;
			obj.Designation_Id = res[i].Designation_Id;
			obj.Employment_Type = res[i].Employment_Type;
			obj.First_Name = res[i].First_Name;
			obj.Gender = res[i].Gender;
			obj.Id = res[i].Id;
			obj.Interests = res[i].Interests;
			obj.IsEmployee = res[i].IsEmployee;
			obj.Job_Location = res[i].Job_Location;
			obj.JoiningDate = res[i].JoiningDate;
			obj.Last_Name = res[i].Last_Name;
			obj.Manager_Id = res[i].Manager_Id;
			obj.Marital_Status = res[i].Marital_Status;
			obj.Marriage_Date = res[i].Marriage_Date;
			obj.Media_Id = res[i].Media_Id;
			obj.Medical_Needs = res[i].Medical_Needs;
			obj.Middle_Name = res[i].Middle_Name;
			obj.Nationality = res[i].Nationality;
			obj.Office_Id = res[i].Office_Id;
			obj.Place_of_birth = res[i].Place_of_birth;
			obj.Preffered_name = res[i].Preffered_name;
			obj.softdeleteflag = res[i].softdeleteflag;
			obj.Suffix = res[i].Suffix;
			obj.TIMESTAMP = res[i].TIMESTAMP;
			obj.Title = res[i].Title;
			obj.User_Id = res[i].User_Id;
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.ESS.myprofile.EmployeeProfile.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.filterAttributes function");
	var attributeTable = {};
	attributeTable.Blood_group = "Blood_group";
	attributeTable.Date_of_birth = "Date_of_birth";
	attributeTable.Department_id = "Department_id";
	attributeTable.Designation_Id = "Designation_Id";
	attributeTable.Employment_Type = "Employment_Type";
	attributeTable.First_Name = "First_Name";
	attributeTable.Gender = "Gender";
	attributeTable.Id = "Id";
	attributeTable.Interests = "Interests";
	attributeTable.IsEmployee = "IsEmployee";
	attributeTable.Job_Location = "Job_Location";
	attributeTable.JoiningDate = "JoiningDate";
	attributeTable.Last_Name = "Last_Name";
	attributeTable.Manager_Id = "Manager_Id";
	attributeTable.Marital_Status = "Marital_Status";
	attributeTable.Marriage_Date = "Marriage_Date";
	attributeTable.Media_Id = "Media_Id";
	attributeTable.Medical_Needs = "Medical_Needs";
	attributeTable.Middle_Name = "Middle_Name";
	attributeTable.Nationality = "Nationality";
	attributeTable.Office_Id = "Office_Id";
	attributeTable.Place_of_birth = "Place_of_birth";
	attributeTable.Preffered_name = "Preffered_name";
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
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject EmployeeProfile. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject EmployeeProfile. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject EmployeeProfile. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.ESS.myprofile.EmployeeProfile.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.ESS.myprofile.EmployeeProfile.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.ESS.myprofile.EmployeeProfile.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.Blood_group = this.Blood_group;
	valuesTable.Date_of_birth = this.Date_of_birth;
	valuesTable.Department_id = this.Department_id;
	valuesTable.Designation_Id = this.Designation_Id;
	valuesTable.Employment_Type = this.Employment_Type;
	valuesTable.First_Name = this.First_Name;
	valuesTable.Gender = this.Gender;
	if(isInsert===true){
		valuesTable.Id = this.Id;
	}
	valuesTable.Interests = this.Interests;
	valuesTable.IsEmployee = this.IsEmployee;
	valuesTable.Job_Location = this.Job_Location;
	valuesTable.JoiningDate = this.JoiningDate;
	valuesTable.Last_Name = this.Last_Name;
	valuesTable.Manager_Id = this.Manager_Id;
	valuesTable.Marital_Status = this.Marital_Status;
	valuesTable.Marriage_Date = this.Marriage_Date;
	valuesTable.Media_Id = this.Media_Id;
	valuesTable.Medical_Needs = this.Medical_Needs;
	valuesTable.Middle_Name = this.Middle_Name;
	valuesTable.Nationality = this.Nationality;
	valuesTable.Office_Id = this.Office_Id;
	valuesTable.Place_of_birth = this.Place_of_birth;
	valuesTable.Preffered_name = this.Preffered_name;
	valuesTable.Suffix = this.Suffix;
	valuesTable.Title = this.Title;
	if(isInsert===true){
		valuesTable.User_Id = this.User_Id;
	}
	return valuesTable;
};

com.kony.ESS.myprofile.EmployeeProfile.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.prototype.getPKTable function");
	var pkTable = {};
	pkTable.Id = {key:"Id",value:this.Id};
	pkTable.User_Id = {key:"User_Id",value:this.User_Id};
	return pkTable;
};

com.kony.ESS.myprofile.EmployeeProfile.getPKTable = function(){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getPKTable function");
	var pkTable = [];
	pkTable.push("Id");
	pkTable.push("User_Id");
	return pkTable;
};

com.kony.ESS.myprofile.EmployeeProfile.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.pkCheck function");
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
		sync.log.error("Primary Key Id not specified in " + opName + " an item in EmployeeProfile");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("Id",opName,"EmployeeProfile")));
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
		sync.log.error("Primary Key User_Id not specified in " + opName + " an item in EmployeeProfile");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("User_Id",opName,"EmployeeProfile")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.ESS.myprofile.EmployeeProfile.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.validateNull function");
	return true;
};

com.kony.ESS.myprofile.EmployeeProfile.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.validateNullInsert function");
	if(kony.sync.isNull(valuestable.Id) || kony.sync.isEmptyString(valuestable.Id)){
		sync.log.error("Mandatory attribute Id is missing for the SyncObject EmployeeProfile.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "EmployeeProfile", "Id")));
		return false;
	}
	if(kony.sync.isNull(valuestable.User_Id) || kony.sync.isEmptyString(valuestable.User_Id)){
		sync.log.error("Mandatory attribute User_Id is missing for the SyncObject EmployeeProfile.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "EmployeeProfile", "User_Id")));
		return false;
	}
	return true;
};

com.kony.ESS.myprofile.EmployeeProfile.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.ESS.myprofile.EmployeeProfile.getRelationshipMap function");
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
		if(relationshipMap.ADDRESS===undefined){
			relationshipMap.ADDRESS = [];
		}
		relationshipMap.ADDRESS.push(r1);
	}
		
	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.Id)){
		r1.sourceAttribute.push("EMPNUMBER") ;
		r1.foreignKeyAttribute.push("Id") ;
		r1.targetAttributeValue.push("'" + valuestable.Id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.Department===undefined){
			relationshipMap.Department = [];
		}
		relationshipMap.Department.push(r1);
	}
		
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
		if(relationshipMap.Dependant_Details===undefined){
			relationshipMap.Dependant_Details = [];
		}
		relationshipMap.Dependant_Details.push(r1);
	}
		
	r1={}
	r1.sourceAttribute = [];
	r1.foreignKeyAttribute = [];	
	r1.targetAttributeValue = [];
	
	if(!kony.sync.isNullOrUndefined(valuestable.Id)){
		r1.sourceAttribute.push("EMPNUMBER") ;
		r1.foreignKeyAttribute.push("Id") ;
		r1.targetAttributeValue.push("'" + valuestable.Id+ "'");
	}
	if(r1.targetAttributeValue.length > 0){
		if(relationshipMap.Designation===undefined){
			relationshipMap.Designation = [];
		}
		relationshipMap.Designation.push(r1);
	}
		
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
		if(relationshipMap.Emergency_Contacts===undefined){
			relationshipMap.Emergency_Contacts = [];
		}
		relationshipMap.Emergency_Contacts.push(r1);
	}
		
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
		if(relationshipMap.Identity===undefined){
			relationshipMap.Identity = [];
		}
		relationshipMap.Identity.push(r1);
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
		if(relationshipMap.media===undefined){
			relationshipMap.media = [];
		}
		relationshipMap.media.push(r1);
	}
		
	return relationshipMap;
};


com.kony.ESS.myprofile.EmployeeProfile.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.ESS.myprofile.EmployeeProfile.getTableName = function(){
	return "EmployeeProfile";
};




// **********************************End EmployeeProfile's helper methods************************