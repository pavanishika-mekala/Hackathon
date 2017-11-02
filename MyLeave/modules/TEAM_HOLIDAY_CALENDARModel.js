//****************Sync Version:Sync-Dev-8.0.0_v201709040903_r7*******************
// ****************Generated On Thu Nov 02 11:15:29 UTC 2017TEAM_HOLIDAY_CALENDAR*******************
// **********************************Start TEAM_HOLIDAY_CALENDAR's helper methods************************
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
* Creates new TEAM_HOLIDAY_CALENDAR
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR = function(){
	this.DELETE_IND = null;
	this.EXTRACT_TSTAMP = null;
	this.KJAHR = null;
	this.MOFID = null;
	this.MONAT = null;
	this.MOSID = null;
	this.NWDAY01 = null;
	this.NWDAY01_DESC = null;
	this.NWDAY02 = null;
	this.NWDAY02_DESC = null;
	this.NWDAY03 = null;
	this.NWDAY03_DESC = null;
	this.NWDAY04 = null;
	this.NWDAY04_DESC = null;
	this.NWDAY05 = null;
	this.NWDAY05_DESC = null;
	this.NWDAY06 = null;
	this.NWDAY06_DESC = null;
	this.NWDAY07 = null;
	this.NWDAY07_DESC = null;
	this.NWDAY08 = null;
	this.NWDAY08_DESC = null;
	this.NWDAY09 = null;
	this.NWDAY09_DESC = null;
	this.NWDAY10 = null;
	this.NWDAY10_DESC = null;
	this.NWDAY11 = null;
	this.NWDAY11_DESC = null;
	this.NWDAY12 = null;
	this.NWDAY12_DESC = null;
	this.NWDAY13 = null;
	this.NWDAY13_DESC = null;
	this.NWDAY14 = null;
	this.NWDAY14_DESC = null;
	this.NWDAY15 = null;
	this.NWDAY15_DESC = null;
	this.NWDAY16 = null;
	this.NWDAY16_DESC = null;
	this.NWDAY17 = null;
	this.NWDAY17_DESC = null;
	this.NWDAY18 = null;
	this.NWDAY18_DESC = null;
	this.NWDAY19 = null;
	this.NWDAY19_DESC = null;
	this.NWDAY20 = null;
	this.NWDAY20_DESC = null;
	this.NWDAY21 = null;
	this.NWDAY21_DESC = null;
	this.NWDAY22 = null;
	this.NWDAY22_DESC = null;
	this.NWDAY23 = null;
	this.NWDAY23_DESC = null;
	this.NWDAY24 = null;
	this.NWDAY24_DESC = null;
	this.NWDAY25 = null;
	this.NWDAY25_DESC = null;
	this.NWDAY26 = null;
	this.NWDAY26_DESC = null;
	this.NWDAY27 = null;
	this.NWDAY27_DESC = null;
	this.NWDAY28 = null;
	this.NWDAY28_DESC = null;
	this.NWDAY29 = null;
	this.NWDAY29_DESC = null;
	this.NWDAY30 = null;
	this.NWDAY30_DESC = null;
	this.NWDAY31 = null;
	this.NWDAY31_DESC = null;
	this.SCHKZ = null;
	this.TIMESTAMP = null;
	this.ZEITY = null;
	this.markForUpload = true;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype = {
	get DELETE_IND(){
		return this._DELETE_IND;
	},
	set DELETE_IND(val){
		this._DELETE_IND = val;
	},
	get EXTRACT_TSTAMP(){
		return this._EXTRACT_TSTAMP;
	},
	set EXTRACT_TSTAMP(val){
		this._EXTRACT_TSTAMP = val;
	},
	get KJAHR(){
		return this._KJAHR;
	},
	set KJAHR(val){
		this._KJAHR = val;
	},
	get MOFID(){
		return this._MOFID;
	},
	set MOFID(val){
		this._MOFID = val;
	},
	get MONAT(){
		return this._MONAT;
	},
	set MONAT(val){
		this._MONAT = val;
	},
	get MOSID(){
		return this._MOSID;
	},
	set MOSID(val){
		this._MOSID = val;
	},
	get NWDAY01(){
		return this._NWDAY01;
	},
	set NWDAY01(val){
		this._NWDAY01 = val;
	},
	get NWDAY01_DESC(){
		return this._NWDAY01_DESC;
	},
	set NWDAY01_DESC(val){
		this._NWDAY01_DESC = val;
	},
	get NWDAY02(){
		return this._NWDAY02;
	},
	set NWDAY02(val){
		this._NWDAY02 = val;
	},
	get NWDAY02_DESC(){
		return this._NWDAY02_DESC;
	},
	set NWDAY02_DESC(val){
		this._NWDAY02_DESC = val;
	},
	get NWDAY03(){
		return this._NWDAY03;
	},
	set NWDAY03(val){
		this._NWDAY03 = val;
	},
	get NWDAY03_DESC(){
		return this._NWDAY03_DESC;
	},
	set NWDAY03_DESC(val){
		this._NWDAY03_DESC = val;
	},
	get NWDAY04(){
		return this._NWDAY04;
	},
	set NWDAY04(val){
		this._NWDAY04 = val;
	},
	get NWDAY04_DESC(){
		return this._NWDAY04_DESC;
	},
	set NWDAY04_DESC(val){
		this._NWDAY04_DESC = val;
	},
	get NWDAY05(){
		return this._NWDAY05;
	},
	set NWDAY05(val){
		this._NWDAY05 = val;
	},
	get NWDAY05_DESC(){
		return this._NWDAY05_DESC;
	},
	set NWDAY05_DESC(val){
		this._NWDAY05_DESC = val;
	},
	get NWDAY06(){
		return this._NWDAY06;
	},
	set NWDAY06(val){
		this._NWDAY06 = val;
	},
	get NWDAY06_DESC(){
		return this._NWDAY06_DESC;
	},
	set NWDAY06_DESC(val){
		this._NWDAY06_DESC = val;
	},
	get NWDAY07(){
		return this._NWDAY07;
	},
	set NWDAY07(val){
		this._NWDAY07 = val;
	},
	get NWDAY07_DESC(){
		return this._NWDAY07_DESC;
	},
	set NWDAY07_DESC(val){
		this._NWDAY07_DESC = val;
	},
	get NWDAY08(){
		return this._NWDAY08;
	},
	set NWDAY08(val){
		this._NWDAY08 = val;
	},
	get NWDAY08_DESC(){
		return this._NWDAY08_DESC;
	},
	set NWDAY08_DESC(val){
		this._NWDAY08_DESC = val;
	},
	get NWDAY09(){
		return this._NWDAY09;
	},
	set NWDAY09(val){
		this._NWDAY09 = val;
	},
	get NWDAY09_DESC(){
		return this._NWDAY09_DESC;
	},
	set NWDAY09_DESC(val){
		this._NWDAY09_DESC = val;
	},
	get NWDAY10(){
		return this._NWDAY10;
	},
	set NWDAY10(val){
		this._NWDAY10 = val;
	},
	get NWDAY10_DESC(){
		return this._NWDAY10_DESC;
	},
	set NWDAY10_DESC(val){
		this._NWDAY10_DESC = val;
	},
	get NWDAY11(){
		return this._NWDAY11;
	},
	set NWDAY11(val){
		this._NWDAY11 = val;
	},
	get NWDAY11_DESC(){
		return this._NWDAY11_DESC;
	},
	set NWDAY11_DESC(val){
		this._NWDAY11_DESC = val;
	},
	get NWDAY12(){
		return this._NWDAY12;
	},
	set NWDAY12(val){
		this._NWDAY12 = val;
	},
	get NWDAY12_DESC(){
		return this._NWDAY12_DESC;
	},
	set NWDAY12_DESC(val){
		this._NWDAY12_DESC = val;
	},
	get NWDAY13(){
		return this._NWDAY13;
	},
	set NWDAY13(val){
		this._NWDAY13 = val;
	},
	get NWDAY13_DESC(){
		return this._NWDAY13_DESC;
	},
	set NWDAY13_DESC(val){
		this._NWDAY13_DESC = val;
	},
	get NWDAY14(){
		return this._NWDAY14;
	},
	set NWDAY14(val){
		this._NWDAY14 = val;
	},
	get NWDAY14_DESC(){
		return this._NWDAY14_DESC;
	},
	set NWDAY14_DESC(val){
		this._NWDAY14_DESC = val;
	},
	get NWDAY15(){
		return this._NWDAY15;
	},
	set NWDAY15(val){
		this._NWDAY15 = val;
	},
	get NWDAY15_DESC(){
		return this._NWDAY15_DESC;
	},
	set NWDAY15_DESC(val){
		this._NWDAY15_DESC = val;
	},
	get NWDAY16(){
		return this._NWDAY16;
	},
	set NWDAY16(val){
		this._NWDAY16 = val;
	},
	get NWDAY16_DESC(){
		return this._NWDAY16_DESC;
	},
	set NWDAY16_DESC(val){
		this._NWDAY16_DESC = val;
	},
	get NWDAY17(){
		return this._NWDAY17;
	},
	set NWDAY17(val){
		this._NWDAY17 = val;
	},
	get NWDAY17_DESC(){
		return this._NWDAY17_DESC;
	},
	set NWDAY17_DESC(val){
		this._NWDAY17_DESC = val;
	},
	get NWDAY18(){
		return this._NWDAY18;
	},
	set NWDAY18(val){
		this._NWDAY18 = val;
	},
	get NWDAY18_DESC(){
		return this._NWDAY18_DESC;
	},
	set NWDAY18_DESC(val){
		this._NWDAY18_DESC = val;
	},
	get NWDAY19(){
		return this._NWDAY19;
	},
	set NWDAY19(val){
		this._NWDAY19 = val;
	},
	get NWDAY19_DESC(){
		return this._NWDAY19_DESC;
	},
	set NWDAY19_DESC(val){
		this._NWDAY19_DESC = val;
	},
	get NWDAY20(){
		return this._NWDAY20;
	},
	set NWDAY20(val){
		this._NWDAY20 = val;
	},
	get NWDAY20_DESC(){
		return this._NWDAY20_DESC;
	},
	set NWDAY20_DESC(val){
		this._NWDAY20_DESC = val;
	},
	get NWDAY21(){
		return this._NWDAY21;
	},
	set NWDAY21(val){
		this._NWDAY21 = val;
	},
	get NWDAY21_DESC(){
		return this._NWDAY21_DESC;
	},
	set NWDAY21_DESC(val){
		this._NWDAY21_DESC = val;
	},
	get NWDAY22(){
		return this._NWDAY22;
	},
	set NWDAY22(val){
		this._NWDAY22 = val;
	},
	get NWDAY22_DESC(){
		return this._NWDAY22_DESC;
	},
	set NWDAY22_DESC(val){
		this._NWDAY22_DESC = val;
	},
	get NWDAY23(){
		return this._NWDAY23;
	},
	set NWDAY23(val){
		this._NWDAY23 = val;
	},
	get NWDAY23_DESC(){
		return this._NWDAY23_DESC;
	},
	set NWDAY23_DESC(val){
		this._NWDAY23_DESC = val;
	},
	get NWDAY24(){
		return this._NWDAY24;
	},
	set NWDAY24(val){
		this._NWDAY24 = val;
	},
	get NWDAY24_DESC(){
		return this._NWDAY24_DESC;
	},
	set NWDAY24_DESC(val){
		this._NWDAY24_DESC = val;
	},
	get NWDAY25(){
		return this._NWDAY25;
	},
	set NWDAY25(val){
		this._NWDAY25 = val;
	},
	get NWDAY25_DESC(){
		return this._NWDAY25_DESC;
	},
	set NWDAY25_DESC(val){
		this._NWDAY25_DESC = val;
	},
	get NWDAY26(){
		return this._NWDAY26;
	},
	set NWDAY26(val){
		this._NWDAY26 = val;
	},
	get NWDAY26_DESC(){
		return this._NWDAY26_DESC;
	},
	set NWDAY26_DESC(val){
		this._NWDAY26_DESC = val;
	},
	get NWDAY27(){
		return this._NWDAY27;
	},
	set NWDAY27(val){
		this._NWDAY27 = val;
	},
	get NWDAY27_DESC(){
		return this._NWDAY27_DESC;
	},
	set NWDAY27_DESC(val){
		this._NWDAY27_DESC = val;
	},
	get NWDAY28(){
		return this._NWDAY28;
	},
	set NWDAY28(val){
		this._NWDAY28 = val;
	},
	get NWDAY28_DESC(){
		return this._NWDAY28_DESC;
	},
	set NWDAY28_DESC(val){
		this._NWDAY28_DESC = val;
	},
	get NWDAY29(){
		return this._NWDAY29;
	},
	set NWDAY29(val){
		this._NWDAY29 = val;
	},
	get NWDAY29_DESC(){
		return this._NWDAY29_DESC;
	},
	set NWDAY29_DESC(val){
		this._NWDAY29_DESC = val;
	},
	get NWDAY30(){
		return this._NWDAY30;
	},
	set NWDAY30(val){
		this._NWDAY30 = val;
	},
	get NWDAY30_DESC(){
		return this._NWDAY30_DESC;
	},
	set NWDAY30_DESC(val){
		this._NWDAY30_DESC = val;
	},
	get NWDAY31(){
		return this._NWDAY31;
	},
	set NWDAY31(val){
		this._NWDAY31 = val;
	},
	get NWDAY31_DESC(){
		return this._NWDAY31_DESC;
	},
	set NWDAY31_DESC(val){
		this._NWDAY31_DESC = val;
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
* Retrieves all instances of TEAM_HOLIDAY_CALENDAR SyncObject present in local database with
* given limit and offset where limit indicates the number of records to be retrieved
* and offset indicates number of rows to be ignored before returning the records.
* e.g. var orderByMap = []
* orderByMap[0] = {};
* orderByMap[0].key = "DELETE_IND";
* orderByMap[0].sortType ="desc";
* orderByMap[1] = {};
* orderByMap[1].key = "EXTRACT_TSTAMP";
* orderByMap[1].sortType ="asc";
* var limit = 20;
* var offset = 5;
* com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAll(successcallback,errorcallback, orderByMap, limit, offset)
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAll = function(successcallback, errorcallback, orderByMap, limit, offset){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAll->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	orderByMap = kony.sync.formOrderByClause("TEAM_HOLIDAY_CALENDAR",orderByMap);
	var query = kony.sync.qb_createQuery();
				kony.sync.qb_select(query, null);	
				kony.sync.qb_from(query, tbname);
				kony.sync.qb_orderBy(query, orderByMap);
				kony.sync.qb_limitOffset(query,limit,offset);
	var query_compile = kony.sync.qb_compile(query);
	var sql = query_compile[0];
	var params = query_compile[1];

	function mySuccCallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAll->successcallback");
		successcallback(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname,sql, params,mySuccCallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_HOLIDAY_CALENDAR present in local database.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllCount = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllCount function");
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getCount("",successcallback,errorcallback);
};

/************************************************************************************
* Returns number of TEAM_HOLIDAY_CALENDAR using where clause in the local Database
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getCount = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getCount->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getCount" , "getCount", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select count(*) from \"" + tbname + "\" " + wcs;
	kony.sync.single_execute_sql(dbname,sql, null, mySuccCallback, errorcallback);
	function mySuccCallback(res) {
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getCount->successcallback");
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
* Creates a new instance of TEAM_HOLIDAY_CALENDAR in the local Database. The new record will 
* be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.create = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.create function");
	var valuestable = this.getValuesTable(true);
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.create(valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.create = function(valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.create->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.create" , "create", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);

	if(kony.sync.attributeValidation(valuestable,"TEAM_HOLIDAY_CALENDAR",errorcallback,true)===false){
		return;
	}
	
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.create->success callback");
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}

	var pks = [];
	var errMsg = "";
	
	function createSuccesscallback(res){
		if(res==null || res.length==0){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getRelationshipMap(relationshipMap,valuestable);
			kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
		}
		else{
			errMsg = "[" + errMsg + "]";
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodeDuplicatePrimaryKey,kony.sync.getErrorMessage(kony.sync.errorCodeDuplicatePrimaryKey, tbname, errMsg)));
		}
	}
	
	if(kony.sync.enableORMValidations){
		errMsg = "KJAHR=" + valuestable.KJAHR;
		pks["KJAHR"] = {key:"KJAHR",value:valuestable.KJAHR};
		errMsg = errMsg + ", MOFID=" + valuestable.MOFID;
		pks["MOFID"] = {key:"MOFID",value:valuestable.MOFID};
		errMsg = errMsg + ", MONAT=" + valuestable.MONAT;
		pks["MONAT"] = {key:"MONAT",value:valuestable.MONAT};
		errMsg = errMsg + ", MOSID=" + valuestable.MOSID;
		pks["MOSID"] = {key:"MOSID",value:valuestable.MOSID};
		errMsg = errMsg + ", SCHKZ=" + valuestable.SCHKZ;
		pks["SCHKZ"] = {key:"SCHKZ",value:valuestable.SCHKZ};
		errMsg = errMsg + ", ZEITY=" + valuestable.ZEITY;
		pks["ZEITY"] = {key:"ZEITY",value:valuestable.ZEITY};
		com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllDetailsByPK(pks,createSuccesscallback,errorcallback)
	}
	else{
		kony.sync.single_insert_execute(dbname,tbname,valuestable,successcallback,errorcallback,markForUpload);
	}
};

/************************************************************************************
* Creates number of new instances of TEAM_HOLIDAY_CALENDAR in the local Database. These new 
* records will be merged with the enterprise datasource in the next Sync. Based upon 
* kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var valuesArray = [];
*		valuesArray[0] = {};
*		valuesArray[0].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_0";
*		valuesArray[0].KJAHR = "KJAHR_0";
*		valuesArray[0].MOFID = "MOFID_0";
*		valuesArray[0].MONAT = "MONAT_0";
*		valuesArray[0].MOSID = "MOSID_0";
*		valuesArray[0].NWDAY01 = "NWDAY01_0";
*		valuesArray[0].NWDAY01_DESC = "NWDAY01_DESC_0";
*		valuesArray[0].NWDAY02 = "NWDAY02_0";
*		valuesArray[0].NWDAY02_DESC = "NWDAY02_DESC_0";
*		valuesArray[0].NWDAY03 = "NWDAY03_0";
*		valuesArray[0].NWDAY03_DESC = "NWDAY03_DESC_0";
*		valuesArray[0].NWDAY04 = "NWDAY04_0";
*		valuesArray[0].NWDAY04_DESC = "NWDAY04_DESC_0";
*		valuesArray[0].NWDAY05 = "NWDAY05_0";
*		valuesArray[0].NWDAY05_DESC = "NWDAY05_DESC_0";
*		valuesArray[0].NWDAY06 = "NWDAY06_0";
*		valuesArray[0].NWDAY06_DESC = "NWDAY06_DESC_0";
*		valuesArray[0].NWDAY07 = "NWDAY07_0";
*		valuesArray[0].NWDAY07_DESC = "NWDAY07_DESC_0";
*		valuesArray[0].NWDAY08 = "NWDAY08_0";
*		valuesArray[0].NWDAY08_DESC = "NWDAY08_DESC_0";
*		valuesArray[0].NWDAY09 = "NWDAY09_0";
*		valuesArray[0].NWDAY09_DESC = "NWDAY09_DESC_0";
*		valuesArray[0].NWDAY10 = "NWDAY10_0";
*		valuesArray[0].NWDAY10_DESC = "NWDAY10_DESC_0";
*		valuesArray[0].NWDAY11 = "NWDAY11_0";
*		valuesArray[0].NWDAY11_DESC = "NWDAY11_DESC_0";
*		valuesArray[0].NWDAY12 = "NWDAY12_0";
*		valuesArray[0].NWDAY12_DESC = "NWDAY12_DESC_0";
*		valuesArray[0].NWDAY13 = "NWDAY13_0";
*		valuesArray[0].NWDAY13_DESC = "NWDAY13_DESC_0";
*		valuesArray[0].NWDAY14 = "NWDAY14_0";
*		valuesArray[0].NWDAY14_DESC = "NWDAY14_DESC_0";
*		valuesArray[0].NWDAY15 = "NWDAY15_0";
*		valuesArray[0].NWDAY15_DESC = "NWDAY15_DESC_0";
*		valuesArray[0].NWDAY16 = "NWDAY16_0";
*		valuesArray[0].NWDAY16_DESC = "NWDAY16_DESC_0";
*		valuesArray[0].NWDAY17 = "NWDAY17_0";
*		valuesArray[0].NWDAY17_DESC = "NWDAY17_DESC_0";
*		valuesArray[0].NWDAY18 = "NWDAY18_0";
*		valuesArray[0].NWDAY18_DESC = "NWDAY18_DESC_0";
*		valuesArray[0].NWDAY19 = "NWDAY19_0";
*		valuesArray[0].NWDAY19_DESC = "NWDAY19_DESC_0";
*		valuesArray[0].NWDAY20 = "NWDAY20_0";
*		valuesArray[0].NWDAY20_DESC = "NWDAY20_DESC_0";
*		valuesArray[0].NWDAY21 = "NWDAY21_0";
*		valuesArray[0].NWDAY21_DESC = "NWDAY21_DESC_0";
*		valuesArray[0].NWDAY22 = "NWDAY22_0";
*		valuesArray[0].NWDAY22_DESC = "NWDAY22_DESC_0";
*		valuesArray[0].NWDAY23 = "NWDAY23_0";
*		valuesArray[0].NWDAY23_DESC = "NWDAY23_DESC_0";
*		valuesArray[0].NWDAY24 = "NWDAY24_0";
*		valuesArray[0].NWDAY24_DESC = "NWDAY24_DESC_0";
*		valuesArray[0].NWDAY25 = "NWDAY25_0";
*		valuesArray[0].NWDAY25_DESC = "NWDAY25_DESC_0";
*		valuesArray[0].NWDAY26 = "NWDAY26_0";
*		valuesArray[0].NWDAY26_DESC = "NWDAY26_DESC_0";
*		valuesArray[0].NWDAY27 = "NWDAY27_0";
*		valuesArray[0].NWDAY27_DESC = "NWDAY27_DESC_0";
*		valuesArray[0].NWDAY28 = "NWDAY28_0";
*		valuesArray[0].NWDAY28_DESC = "NWDAY28_DESC_0";
*		valuesArray[0].NWDAY29 = "NWDAY29_0";
*		valuesArray[0].NWDAY29_DESC = "NWDAY29_DESC_0";
*		valuesArray[0].NWDAY30 = "NWDAY30_0";
*		valuesArray[0].NWDAY30_DESC = "NWDAY30_DESC_0";
*		valuesArray[0].NWDAY31 = "NWDAY31_0";
*		valuesArray[0].NWDAY31_DESC = "NWDAY31_DESC_0";
*		valuesArray[0].SCHKZ = "SCHKZ_0";
*		valuesArray[0].ZEITY = "ZEITY_0";
*		valuesArray[1] = {};
*		valuesArray[1].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_1";
*		valuesArray[1].KJAHR = "KJAHR_1";
*		valuesArray[1].MOFID = "MOFID_1";
*		valuesArray[1].MONAT = "MONAT_1";
*		valuesArray[1].MOSID = "MOSID_1";
*		valuesArray[1].NWDAY01 = "NWDAY01_1";
*		valuesArray[1].NWDAY01_DESC = "NWDAY01_DESC_1";
*		valuesArray[1].NWDAY02 = "NWDAY02_1";
*		valuesArray[1].NWDAY02_DESC = "NWDAY02_DESC_1";
*		valuesArray[1].NWDAY03 = "NWDAY03_1";
*		valuesArray[1].NWDAY03_DESC = "NWDAY03_DESC_1";
*		valuesArray[1].NWDAY04 = "NWDAY04_1";
*		valuesArray[1].NWDAY04_DESC = "NWDAY04_DESC_1";
*		valuesArray[1].NWDAY05 = "NWDAY05_1";
*		valuesArray[1].NWDAY05_DESC = "NWDAY05_DESC_1";
*		valuesArray[1].NWDAY06 = "NWDAY06_1";
*		valuesArray[1].NWDAY06_DESC = "NWDAY06_DESC_1";
*		valuesArray[1].NWDAY07 = "NWDAY07_1";
*		valuesArray[1].NWDAY07_DESC = "NWDAY07_DESC_1";
*		valuesArray[1].NWDAY08 = "NWDAY08_1";
*		valuesArray[1].NWDAY08_DESC = "NWDAY08_DESC_1";
*		valuesArray[1].NWDAY09 = "NWDAY09_1";
*		valuesArray[1].NWDAY09_DESC = "NWDAY09_DESC_1";
*		valuesArray[1].NWDAY10 = "NWDAY10_1";
*		valuesArray[1].NWDAY10_DESC = "NWDAY10_DESC_1";
*		valuesArray[1].NWDAY11 = "NWDAY11_1";
*		valuesArray[1].NWDAY11_DESC = "NWDAY11_DESC_1";
*		valuesArray[1].NWDAY12 = "NWDAY12_1";
*		valuesArray[1].NWDAY12_DESC = "NWDAY12_DESC_1";
*		valuesArray[1].NWDAY13 = "NWDAY13_1";
*		valuesArray[1].NWDAY13_DESC = "NWDAY13_DESC_1";
*		valuesArray[1].NWDAY14 = "NWDAY14_1";
*		valuesArray[1].NWDAY14_DESC = "NWDAY14_DESC_1";
*		valuesArray[1].NWDAY15 = "NWDAY15_1";
*		valuesArray[1].NWDAY15_DESC = "NWDAY15_DESC_1";
*		valuesArray[1].NWDAY16 = "NWDAY16_1";
*		valuesArray[1].NWDAY16_DESC = "NWDAY16_DESC_1";
*		valuesArray[1].NWDAY17 = "NWDAY17_1";
*		valuesArray[1].NWDAY17_DESC = "NWDAY17_DESC_1";
*		valuesArray[1].NWDAY18 = "NWDAY18_1";
*		valuesArray[1].NWDAY18_DESC = "NWDAY18_DESC_1";
*		valuesArray[1].NWDAY19 = "NWDAY19_1";
*		valuesArray[1].NWDAY19_DESC = "NWDAY19_DESC_1";
*		valuesArray[1].NWDAY20 = "NWDAY20_1";
*		valuesArray[1].NWDAY20_DESC = "NWDAY20_DESC_1";
*		valuesArray[1].NWDAY21 = "NWDAY21_1";
*		valuesArray[1].NWDAY21_DESC = "NWDAY21_DESC_1";
*		valuesArray[1].NWDAY22 = "NWDAY22_1";
*		valuesArray[1].NWDAY22_DESC = "NWDAY22_DESC_1";
*		valuesArray[1].NWDAY23 = "NWDAY23_1";
*		valuesArray[1].NWDAY23_DESC = "NWDAY23_DESC_1";
*		valuesArray[1].NWDAY24 = "NWDAY24_1";
*		valuesArray[1].NWDAY24_DESC = "NWDAY24_DESC_1";
*		valuesArray[1].NWDAY25 = "NWDAY25_1";
*		valuesArray[1].NWDAY25_DESC = "NWDAY25_DESC_1";
*		valuesArray[1].NWDAY26 = "NWDAY26_1";
*		valuesArray[1].NWDAY26_DESC = "NWDAY26_DESC_1";
*		valuesArray[1].NWDAY27 = "NWDAY27_1";
*		valuesArray[1].NWDAY27_DESC = "NWDAY27_DESC_1";
*		valuesArray[1].NWDAY28 = "NWDAY28_1";
*		valuesArray[1].NWDAY28_DESC = "NWDAY28_DESC_1";
*		valuesArray[1].NWDAY29 = "NWDAY29_1";
*		valuesArray[1].NWDAY29_DESC = "NWDAY29_DESC_1";
*		valuesArray[1].NWDAY30 = "NWDAY30_1";
*		valuesArray[1].NWDAY30_DESC = "NWDAY30_DESC_1";
*		valuesArray[1].NWDAY31 = "NWDAY31_1";
*		valuesArray[1].NWDAY31_DESC = "NWDAY31_DESC_1";
*		valuesArray[1].SCHKZ = "SCHKZ_1";
*		valuesArray[1].ZEITY = "ZEITY_1";
*		valuesArray[2] = {};
*		valuesArray[2].EXTRACT_TSTAMP = "EXTRACT_TSTAMP_2";
*		valuesArray[2].KJAHR = "KJAHR_2";
*		valuesArray[2].MOFID = "MOFID_2";
*		valuesArray[2].MONAT = "MONAT_2";
*		valuesArray[2].MOSID = "MOSID_2";
*		valuesArray[2].NWDAY01 = "NWDAY01_2";
*		valuesArray[2].NWDAY01_DESC = "NWDAY01_DESC_2";
*		valuesArray[2].NWDAY02 = "NWDAY02_2";
*		valuesArray[2].NWDAY02_DESC = "NWDAY02_DESC_2";
*		valuesArray[2].NWDAY03 = "NWDAY03_2";
*		valuesArray[2].NWDAY03_DESC = "NWDAY03_DESC_2";
*		valuesArray[2].NWDAY04 = "NWDAY04_2";
*		valuesArray[2].NWDAY04_DESC = "NWDAY04_DESC_2";
*		valuesArray[2].NWDAY05 = "NWDAY05_2";
*		valuesArray[2].NWDAY05_DESC = "NWDAY05_DESC_2";
*		valuesArray[2].NWDAY06 = "NWDAY06_2";
*		valuesArray[2].NWDAY06_DESC = "NWDAY06_DESC_2";
*		valuesArray[2].NWDAY07 = "NWDAY07_2";
*		valuesArray[2].NWDAY07_DESC = "NWDAY07_DESC_2";
*		valuesArray[2].NWDAY08 = "NWDAY08_2";
*		valuesArray[2].NWDAY08_DESC = "NWDAY08_DESC_2";
*		valuesArray[2].NWDAY09 = "NWDAY09_2";
*		valuesArray[2].NWDAY09_DESC = "NWDAY09_DESC_2";
*		valuesArray[2].NWDAY10 = "NWDAY10_2";
*		valuesArray[2].NWDAY10_DESC = "NWDAY10_DESC_2";
*		valuesArray[2].NWDAY11 = "NWDAY11_2";
*		valuesArray[2].NWDAY11_DESC = "NWDAY11_DESC_2";
*		valuesArray[2].NWDAY12 = "NWDAY12_2";
*		valuesArray[2].NWDAY12_DESC = "NWDAY12_DESC_2";
*		valuesArray[2].NWDAY13 = "NWDAY13_2";
*		valuesArray[2].NWDAY13_DESC = "NWDAY13_DESC_2";
*		valuesArray[2].NWDAY14 = "NWDAY14_2";
*		valuesArray[2].NWDAY14_DESC = "NWDAY14_DESC_2";
*		valuesArray[2].NWDAY15 = "NWDAY15_2";
*		valuesArray[2].NWDAY15_DESC = "NWDAY15_DESC_2";
*		valuesArray[2].NWDAY16 = "NWDAY16_2";
*		valuesArray[2].NWDAY16_DESC = "NWDAY16_DESC_2";
*		valuesArray[2].NWDAY17 = "NWDAY17_2";
*		valuesArray[2].NWDAY17_DESC = "NWDAY17_DESC_2";
*		valuesArray[2].NWDAY18 = "NWDAY18_2";
*		valuesArray[2].NWDAY18_DESC = "NWDAY18_DESC_2";
*		valuesArray[2].NWDAY19 = "NWDAY19_2";
*		valuesArray[2].NWDAY19_DESC = "NWDAY19_DESC_2";
*		valuesArray[2].NWDAY20 = "NWDAY20_2";
*		valuesArray[2].NWDAY20_DESC = "NWDAY20_DESC_2";
*		valuesArray[2].NWDAY21 = "NWDAY21_2";
*		valuesArray[2].NWDAY21_DESC = "NWDAY21_DESC_2";
*		valuesArray[2].NWDAY22 = "NWDAY22_2";
*		valuesArray[2].NWDAY22_DESC = "NWDAY22_DESC_2";
*		valuesArray[2].NWDAY23 = "NWDAY23_2";
*		valuesArray[2].NWDAY23_DESC = "NWDAY23_DESC_2";
*		valuesArray[2].NWDAY24 = "NWDAY24_2";
*		valuesArray[2].NWDAY24_DESC = "NWDAY24_DESC_2";
*		valuesArray[2].NWDAY25 = "NWDAY25_2";
*		valuesArray[2].NWDAY25_DESC = "NWDAY25_DESC_2";
*		valuesArray[2].NWDAY26 = "NWDAY26_2";
*		valuesArray[2].NWDAY26_DESC = "NWDAY26_DESC_2";
*		valuesArray[2].NWDAY27 = "NWDAY27_2";
*		valuesArray[2].NWDAY27_DESC = "NWDAY27_DESC_2";
*		valuesArray[2].NWDAY28 = "NWDAY28_2";
*		valuesArray[2].NWDAY28_DESC = "NWDAY28_DESC_2";
*		valuesArray[2].NWDAY29 = "NWDAY29_2";
*		valuesArray[2].NWDAY29_DESC = "NWDAY29_DESC_2";
*		valuesArray[2].NWDAY30 = "NWDAY30_2";
*		valuesArray[2].NWDAY30_DESC = "NWDAY30_DESC_2";
*		valuesArray[2].NWDAY31 = "NWDAY31_2";
*		valuesArray[2].NWDAY31_DESC = "NWDAY31_DESC_2";
*		valuesArray[2].SCHKZ = "SCHKZ_2";
*		valuesArray[2].ZEITY = "ZEITY_2";
*		com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.createAll(valuesArray, successcallback, errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.createAll = function(valuesArray, successcallback, errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.createAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.createAll" , "createAll", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_HOLIDAY_CALENDAR",errorcallback,true)===false){
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
				errMsg = "KJAHR=" + valuestable.KJAHR;
				pks["KJAHR"] = {key:"KJAHR",value:valuestable.KJAHR};
				errMsg = errMsg + ", MOFID=" + valuestable.MOFID;
				pks["MOFID"] = {key:"MOFID",value:valuestable.MOFID};
				errMsg = errMsg + ", MONAT=" + valuestable.MONAT;
				pks["MONAT"] = {key:"MONAT",value:valuestable.MONAT};
				errMsg = errMsg + ", MOSID=" + valuestable.MOSID;
				pks["MOSID"] = {key:"MOSID",value:valuestable.MOSID};
				errMsg = errMsg + ", SCHKZ=" + valuestable.SCHKZ;
				pks["SCHKZ"] = {key:"SCHKZ",value:valuestable.SCHKZ};
				errMsg = errMsg + ", ZEITY=" + valuestable.ZEITY;
				pks["ZEITY"] = {key:"ZEITY",value:valuestable.ZEITY};
				var wcs = [];
				if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.createAll->transactionSuccessCallback");
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.createAll->checkIntegrity");
		arrayLength = valuesArray.length;
		for (var i=0; valuesArray != null && i < arrayLength; i++ ){
			var relationshipMap={};  
			relationshipMap = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getRelationshipMap(relationshipMap,valuesArray[i]);
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
* Updates TEAM_HOLIDAY_CALENDAR using primary key in the local Database. The update will be
* merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.updateByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.updateByPK function");
	var pks = this.getPKTable();
	var valuestable = this.getValuesTable(false);
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateByPK(pks,valuestable, successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateByPK = function(pks,valuestable, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateByPK",  "updateByPk", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [ ];

	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"updating")===false){
		return;
	}

	if(kony.sync.attributeValidation(valuestable,"TEAM_HOLIDAY_CALENDAR",errorcallback,false)===false){
		return;
	}

	var relationshipMap={};  
	relationshipMap = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getRelationshipMap(relationshipMap,valuestable);

	kony.sync.updateByPK(tbname, dbname, relationshipMap, pks,valuestable, successcallback,errorcallback, markForUpload, wcs);
};

/************************************************************************************
* Updates TEAM_HOLIDAY_CALENDAR(s) using where clause in the local Database. The update(s)
* will be merged with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.update = function(wcs, valuestable, successcallback,errorcallback,markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.update function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.update",  "update", errorcallback)){
		return;
	}

	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);

	if(kony.sync.attributeValidation(valuestable,"TEAM_HOLIDAY_CALENDAR",errorcallback,false)===false){
		return;
	}
	function executeSuccess(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.update-> success callback of Integrity Check");
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPKTable());
	}

	if(kony.sync.enableORMValidations){
		var relationshipMap={};  
		relationshipMap = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getRelationshipMap(relationshipMap,valuestable);
		kony.sync.checkIntegrity(dbname,relationshipMap,executeSuccess,errorcallback);
	}
	else{
		kony.sync.single_update_execute(dbname,tbname,valuestable,wcs,successcallback,errorcallback,true, markForUpload, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPKTable());
	}
};

/************************************************************************************
* Updates TEAM_HOLIDAY_CALENDAR(s) satisfying one or more where clauses in the local Database. 
* The update(s) will be merged with the enterprise datasource in the next Sync.
* Based upon kony.sync.enableORMValidations flag, validations will be enabled/disabled.
* e.g.	var inputArray = [];
*		inputArray[0] = {};
*		inputArray[0].changeSet = {};
*		inputArray[0].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated0";
*		inputArray[0].changeSet.NWDAY01 = "NWDAY01_updated0";
*		inputArray[0].changeSet.NWDAY01_DESC = "NWDAY01_DESC_updated0";
*		inputArray[0].changeSet.NWDAY02 = "NWDAY02_updated0";
*		inputArray[0].whereClause = "where KJAHR = '0'";
*		inputArray[0].whereClause = "where MOFID = '0'";
*		inputArray[0].whereClause = "where MONAT = '0'";
*		inputArray[0].whereClause = "where MOSID = '0'";
*		inputArray[0].whereClause = "where SCHKZ = '0'";
*		inputArray[0].whereClause = "where ZEITY = '0'";
*		inputArray[1] = {};
*		inputArray[1].changeSet = {};
*		inputArray[1].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated1";
*		inputArray[1].changeSet.NWDAY01 = "NWDAY01_updated1";
*		inputArray[1].changeSet.NWDAY01_DESC = "NWDAY01_DESC_updated1";
*		inputArray[1].changeSet.NWDAY02 = "NWDAY02_updated1";
*		inputArray[1].whereClause = "where KJAHR = '1'";
*		inputArray[1].whereClause = "where MOFID = '1'";
*		inputArray[1].whereClause = "where MONAT = '1'";
*		inputArray[1].whereClause = "where MOSID = '1'";
*		inputArray[1].whereClause = "where SCHKZ = '1'";
*		inputArray[1].whereClause = "where ZEITY = '1'";
*		inputArray[2] = {};
*		inputArray[2].changeSet = {};
*		inputArray[2].changeSet.EXTRACT_TSTAMP = "EXTRACT_TSTAMP_updated2";
*		inputArray[2].changeSet.NWDAY01 = "NWDAY01_updated2";
*		inputArray[2].changeSet.NWDAY01_DESC = "NWDAY01_DESC_updated2";
*		inputArray[2].changeSet.NWDAY02 = "NWDAY02_updated2";
*		inputArray[2].whereClause = "where KJAHR = '2'";
*		inputArray[2].whereClause = "where MOFID = '2'";
*		inputArray[2].whereClause = "where MONAT = '2'";
*		inputArray[2].whereClause = "where MOSID = '2'";
*		inputArray[2].whereClause = "where SCHKZ = '2'";
*		inputArray[2].whereClause = "where ZEITY = '2'";
*		com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateAll(inputArray,successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateAll = function(inputArray, successcallback, errorcallback, markForUpload) {
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateAll function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateAll",  "updateAll", errorcallback)){
		return;
	}
	var dbname = "10000473715010d0b";
	var tbname = "TEAM_HOLIDAY_CALENDAR";
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
			if(kony.sync.attributeValidation(valuestable,"TEAM_HOLIDAY_CALENDAR",errorcallback,false)===false){
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
		kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,errorcallback,markForUpload, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPKTable());
	}
	
		function transactionSuccessCallback(){
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateAll->transactionSuccessCallback");
		if(!isError){
			kony.sync.massUpdate(dbname, tbname,inputArray,successcallback,transactionErrorCallback,markForUpload, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPKTable());
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
		sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.updateAll->checkIntegrity");
		for (var i=0; ((inputArray) != null) && i < inputArray.length; i++ ){
			var relationshipMap={}; 
			relationshipMap = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getRelationshipMap(relationshipMap,inputArray[i].changeSet);
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
* Deletes TEAM_HOLIDAY_CALENDAR using primary key from the local Database. The record will be
* deleted from the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.deleteByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.deleteByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK(pks,successcallback,errorcallback,this.markForUpload);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK = function(pks, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK",  "deleteByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var twcs = [];
	var deletedRows;
	var record = "";
	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}	
	twcs = kony.sync.CreateCopy(wcs);
	function TEAM_HOLIDAY_CALENDARTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK->TEAM_HOLIDAY_CALENDAR_PKPresent successcallback");
		record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(record===false){
			isError = true;
			return;
		}
		if (null !== record) {
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("MOFID");
 		targetAttributes.push("MOFID");
	 	srcAttributes.push("MOSID");
 		targetAttributes.push("MOSID");
	 	srcAttributes.push("SCHKZ");
 		targetAttributes.push("SCHKZ");
	 	srcAttributes.push("ZEITY");
 		targetAttributes.push("ZEITY");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeCascade,"TEAM_MEMBER_ORG_DATA",false, errorcallback, markForUpload, record, false)){
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
	
	function TEAM_HOLIDAY_CALENDARErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK->relationship failure callback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}

	}
	function TEAM_HOLIDAY_CALENDARSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK->relationship success callback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.deleteByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
		
		var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(dbconnection != null){
			kony.sync.startTransaction(dbconnection, TEAM_HOLIDAY_CALENDARTransactionCallback, TEAM_HOLIDAY_CALENDARSuccessCallback, TEAM_HOLIDAY_CALENDARErrorCallback, "Single Execute");
		}

};

/************************************************************************************
* Deletes TEAM_HOLIDAY_CALENDAR(s) using where clause from the local Database. The record(s)
* will be deleted from the enterprise datasource in the next Sync.
* e.g. com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove("where EXTRACT_TSTAMP like 'A%'", successcallback,errorcallback, true);
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove = function(wcs, successcallback,errorcallback, markForUpload){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove",  "remove", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_HOLIDAY_CALENDAR_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("MOFID");
 		targetAttributes.push("MOFID");
	 	srcAttributes.push("MOSID");
 		targetAttributes.push("MOSID");
	 	srcAttributes.push("SCHKZ");
 		targetAttributes.push("SCHKZ");
	 	srcAttributes.push("ZEITY");
 		targetAttributes.push("ZEITY");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeCascade,"TEAM_MEMBER_ORG_DATA",false, errorcallback, markForUpload, null, false)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, false, markForUpload, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_HOLIDAY_CALENDAR_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove->TEAM_HOLIDAY_CALENDAR_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_HOLIDAY_CALENDAR_removeTransactioncallback, TEAM_HOLIDAY_CALENDAR_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Deletes TEAM_HOLIDAY_CALENDAR using primary key from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.removeDeviceInstanceByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.removeDeviceInstanceByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK",  "removeDeviceInstanceByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	var wcs = [];
	var isError = false;
	var pkNotFound = false;
	var deletedRows;
	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"deleting")===false){
		return;
	}
	
	function TEAM_HOLIDAY_CALENDARTransactionCallback(tx){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK -> TEAM_HOLIDAY_CALENDARTransactionCallback");
		var record = kony.sync.getOriginalRow(tx, tbname, wcs, errorcallback);
		if(null !== record && false !=record) {
			deletedRows = kony.sync.remove(tx, tbname, wcs, true, null, null);
			if(deletedRows === false){
				isError = true;
			}
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("MOFID");
 		targetAttributes.push("MOFID");
	 	srcAttributes.push("MOSID");
 		targetAttributes.push("MOSID");
	 	srcAttributes.push("SCHKZ");
 		targetAttributes.push("SCHKZ");
	 	srcAttributes.push("ZEITY");
 		targetAttributes.push("ZEITY");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
			if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, "", com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeCascade,"TEAM_MEMBER_ORG_DATA",false, errorcallback, null, record, true)){
				isError = true;	
				kony.sync.rollbackTransaction(tx);
				return;
			}
		}else{
			pkNotFound = true;
		}
	}
	
	function TEAM_HOLIDAY_CALENDARErrorCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK -> TEAM_HOLIDAY_CALENDARErrorCallback");
		if(isError === false){
			kony.sync.verifyAndCallClosure(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	
	function TEAM_HOLIDAY_CALENDARSuccessCallback(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK -> TEAM_HOLIDAY_CALENDARSuccessCallback");
		if(pkNotFound === true){
			kony.sync.verifyAndCallClosure(pkNotFoundErrCallback);
			return;
		}
		
		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, {rowsdeleted:1});
		}
	}
	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstanceByPK -> PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
	
	var dbconnection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
	if(dbconnection != null){
		kony.sync.startTransaction(dbconnection, TEAM_HOLIDAY_CALENDARTransactionCallback, TEAM_HOLIDAY_CALENDARSuccessCallback, TEAM_HOLIDAY_CALENDARErrorCallback, "Single Execute");
	}

};

/************************************************************************************
* Deletes TEAM_HOLIDAY_CALENDAR(s) using where clause from the local Database. This will
* not have any effect in enterprise datasource in subsequent sync cycles
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstance = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeDeviceInstance->main function");
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var twcs = wcs;
	var isError = false;
	var rowsDeleted;

	function TEAM_HOLIDAY_CALENDAR_removeTransactioncallback(tx){
		wcs = " " + wcs;
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("MOFID");
 		targetAttributes.push("MOFID");
	 	srcAttributes.push("MOSID");
 		targetAttributes.push("MOSID");
	 	srcAttributes.push("SCHKZ");
 		targetAttributes.push("SCHKZ");
	 	srcAttributes.push("ZEITY");
 		targetAttributes.push("ZEITY");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeCascade,"TEAM_MEMBER_ORG_DATA",false, errorcallback, null, null, true)){
			isError = true;	
			kony.sync.rollbackTransaction(tx);
			return;
		}
		rowsDeleted = kony.sync.deleteBatch(tx, tbname, wcs, true, null, errorcallback)
		if(rowsDeleted === false){
			isError = true;
		}
	}
	function TEAM_HOLIDAY_CALENDAR_removeSuccess(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove->TEAM_HOLIDAY_CALENDAR_removeSuccess function");

		if(!isError){
			kony.sync.verifyAndCallClosure(successcallback, rowsDeleted);
		}
	}
	function errorcallbackWrapper(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove->error callback function");
		if(!isError){
			kony.sync.showTransactionError(errorcallback);
		}
		if(kony.sync.errorObject != null){
			kony.sync.verifyAndCallClosure(errorcallback, kony.sync.errorObject);
			kony.sync.errorObject = null;
		}
	}
	function deleteEntity(){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.remove->delete Entity function");
		var connection = kony.sync.getConnectionOnly(dbname, dbname, errorcallback);
		if(connection != null){
			kony.sync.startTransaction(connection, TEAM_HOLIDAY_CALENDAR_removeTransactioncallback, TEAM_HOLIDAY_CALENDAR_removeSuccess, errorcallbackWrapper);
		}
	}
	deleteEntity();
};

/************************************************************************************
* Retrieves TEAM_HOLIDAY_CALENDAR using primary key from the local Database. 
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.getAllDetailsByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.getAllDetailsByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllDetailsByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllDetailsByPK = function(pks, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllDetailsByPK-> main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllDetailsByPK",  "getAllDetailsByPK", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"searching")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getAllDetailsByPK-> success callback function");
		successcallback(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
	kony.sync.single_select_execute(dbname, sql, params, mySuccCallback, errorcallback);
};






/************************************************************************************
* Retrieves TEAM_HOLIDAY_CALENDAR(s) using where clause from the local Database. 
* e.g. com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.find("where EXTRACT_TSTAMP like 'A%'", successcallback,errorcallback);
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.find = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.find function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.find",  "find", errorcallback)){
		return;
	}
	//wcs will be a string formed by the user.
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	wcs = kony.sync.validateWhereClause(wcs);
	var sql = "select * from \"" + tbname + "\" " + wcs;
	function mySuccCallback(res){
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
	kony.sync.single_select_execute(dbname, sql, null, mySuccCallback, errorcallback);
};

/************************************************************************************
* Marks instance of TEAM_HOLIDAY_CALENDAR with given primary key for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.markForUploadbyPK = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.markForUploadbyPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUploadbyPK(pks, successcallback, errorcallback);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUploadbyPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUploadbyPK function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUploadbyPK",  "markForUploadbyPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	var isError = false;
	var recordsFound = false;
	var recordsMarkedForUpload = 0;
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks, wcs, errorcallback, "marking for upload by PK")===false){
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
* Marks instance(s) of TEAM_HOLIDAY_CALENDAR matching given where clause for upload. This will 
* enable deferred records to merge with the enterprise datasource in the next Sync.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUpload",  "markForUpload", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUpload->single_transaction_callback");
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUpload->single_transaction_success_callback");
		kony.sync.verifyAndCallClosure(successcallback, {count:num_records_main});
	}
	
	function single_transaction_error_callback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.markForUpload->single_transaction_error_callback");
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
* Retrieves instance(s) of TEAM_HOLIDAY_CALENDAR pending for upload. Records are marked for
* pending upload if they have been updated or created locally and the changes have
* not been merged with enterprise datasource.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPendingUpload = function(wcs, successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPendingUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPendingUpload->successcallback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_HOLIDAY_CALENDAR pending for acknowledgement. This is relevant
* when the SyncObject is part of the SyncScope whose SyncStrategy is PersistentSync.
* In persistent Sync the  records in the local database are put into a pending 
* acknowledgement state after an upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPendingAcknowledgement = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPendingAcknowledgement->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	var currentversion = kony.sync.getCurrentVersionNumber(tbname);
	var mysql="select * from \""+tbname+"\" WHERE "+kony.sync.mainTableChangeTypeColumn+ " is not null AND "+kony.sync.mainTableChangeTypeColumn+" <> -1 AND "+kony.sync.mainTableSyncVersionColumn+" <> "+currentversion+" AND "+kony.sync.mainTableChangeTypeColumn+" NOT LIKE '9%'"; 
	kony.sync.single_select_execute(dbname, mysql, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPendingAcknowledgement success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}
};

/************************************************************************************
* Retrieves instance(s) of TEAM_HOLIDAY_CALENDAR deferred for upload.
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getDeferredUpload = function(wcs,successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getDeferredUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getDeferredUpload->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject(kony.sync.filterNullsFromSelectResult(res)));
	}	
};

/************************************************************************************
* Rollbacks all changes to TEAM_HOLIDAY_CALENDAR in local database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChanges = function(successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChanges->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, null, mySuccesscallback, errorcallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChanges->main function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}		
};

/************************************************************************************
* Rollbacks changes to TEAM_HOLIDAY_CALENDAR's record with given primary key in local 
* database to last synced state
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.rollbackPendingLocalChangesByPK = function(successcallback,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.rollbackPendingLocalChangesByPK function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChangesByPK(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChangesByPK = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChangesByPK->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChangesByPK",  "rollbackPendingLocalChangesByPK", errorcallback)){
		return;
	}	
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	var wcs = [];
	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"rollbacking")===false){
		return;
	}	
	kony.sync.konySyncRollBackPendingChanges(tbname, dbname, wcs, mySuccesscallback, pkNotFoundErrCallback);
	function mySuccesscallback(res){
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChangesByPK->success callback function");
		kony.sync.verifyAndCallClosure(successcallback, res);
	}	
	function pkNotFoundErrCallback(){
		sync.log.error("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.rollbackPendingLocalChangesByPK->PK not found callback");
		kony.sync.pkNotFoundErrCallback(errorcallback,tbname);
	}
};

/************************************************************************************
* isRecordDeferredForUpload returns true or false depending on whether TEAM_HOLIDAY_CALENDAR's record  
* with given primary key got deferred in last sync
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.isRecordDeferredForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.isRecordDeferredForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordDeferredForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordDeferredForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordDeferredForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordDeferredForUpload",  "isRecordDeferredForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordDeferredForUpload->successcallback function");
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
* isRecordPendingForUpload returns true or false depending on whether TEAM_HOLIDAY_CALENDAR's record  
* with given primary key is pending for upload
*************************************************************************************/
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.isRecordPendingForUpload = function(successcallback,errorcallback){
	sync.log.trace("Entering  com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.isRecordPendingForUpload function");
	var pks = this.getPKTable();
	com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordPendingForUpload(pks,successcallback,errorcallback);
};
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordPendingForUpload = function(pks, successcallback, errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordPendingForUpload->main function");
	if(!kony.sync.isSyncInitialized(errorcallback)){
		return;
	}
	if(!kony.sync.validateInput(arguments, "com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordPendingForUpload",  "isRecordPendingForUpload", errorcallback)){
		return;
	}
	var dbname = kony.sync.getDBName();
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	var wcs = [] ;
	var flag;
	if(com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck(pks,wcs,errorcallback,"selecting")===false){
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
		sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.isRecordPendingForUpload->successcallback function");
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
com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeCascade = function(tx, wcs, errorcallback, markForUpload, isCascade, parentTable, isLocal){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.removeCascade function");
	var tbname = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName();
	markForUpload = kony.sync.getUploadStatus(markForUpload);
	function removeCascadeChildren(){
	var srcAttributes = [];
	var targetAttributes = [];
	 	srcAttributes.push("MOFID");
 		targetAttributes.push("MOFID");
	 	srcAttributes.push("MOSID");
 		targetAttributes.push("MOSID");
	 	srcAttributes.push("SCHKZ");
 		targetAttributes.push("SCHKZ");
	 	srcAttributes.push("ZEITY");
 		targetAttributes.push("ZEITY");
		//srcAttributes and targetAttributes are interchanged while calling the removecascade
		if(!kony.sync.removeCascadeHelper(tx, targetAttributes, srcAttributes, tbname, wcs, com.kony.TeamViewService.TEAM_MEMBER_ORG_DATA.removeCascade,"TEAM_MEMBER_ORG_DATA",false, errorcallback, markForUpload, null, isLocal)){
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


com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject = function(res){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.convertTableToObject function");
	objMap = [];
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
			obj.markForUpload = (Math.floor(res[i].konysyncchangetype/10)==9)? false:true;
			objMap[i] = obj;
		}
	}
	return objMap;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.filterAttributes = function(valuestable, insert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.filterAttributes function");
	var attributeTable = {};
	attributeTable.EXTRACT_TSTAMP = "EXTRACT_TSTAMP";
	attributeTable.KJAHR = "KJAHR";
	attributeTable.MOFID = "MOFID";
	attributeTable.MONAT = "MONAT";
	attributeTable.MOSID = "MOSID";
	attributeTable.NWDAY01 = "NWDAY01";
	attributeTable.NWDAY01_DESC = "NWDAY01_DESC";
	attributeTable.NWDAY02 = "NWDAY02";
	attributeTable.NWDAY02_DESC = "NWDAY02_DESC";
	attributeTable.NWDAY03 = "NWDAY03";
	attributeTable.NWDAY03_DESC = "NWDAY03_DESC";
	attributeTable.NWDAY04 = "NWDAY04";
	attributeTable.NWDAY04_DESC = "NWDAY04_DESC";
	attributeTable.NWDAY05 = "NWDAY05";
	attributeTable.NWDAY05_DESC = "NWDAY05_DESC";
	attributeTable.NWDAY06 = "NWDAY06";
	attributeTable.NWDAY06_DESC = "NWDAY06_DESC";
	attributeTable.NWDAY07 = "NWDAY07";
	attributeTable.NWDAY07_DESC = "NWDAY07_DESC";
	attributeTable.NWDAY08 = "NWDAY08";
	attributeTable.NWDAY08_DESC = "NWDAY08_DESC";
	attributeTable.NWDAY09 = "NWDAY09";
	attributeTable.NWDAY09_DESC = "NWDAY09_DESC";
	attributeTable.NWDAY10 = "NWDAY10";
	attributeTable.NWDAY10_DESC = "NWDAY10_DESC";
	attributeTable.NWDAY11 = "NWDAY11";
	attributeTable.NWDAY11_DESC = "NWDAY11_DESC";
	attributeTable.NWDAY12 = "NWDAY12";
	attributeTable.NWDAY12_DESC = "NWDAY12_DESC";
	attributeTable.NWDAY13 = "NWDAY13";
	attributeTable.NWDAY13_DESC = "NWDAY13_DESC";
	attributeTable.NWDAY14 = "NWDAY14";
	attributeTable.NWDAY14_DESC = "NWDAY14_DESC";
	attributeTable.NWDAY15 = "NWDAY15";
	attributeTable.NWDAY15_DESC = "NWDAY15_DESC";
	attributeTable.NWDAY16 = "NWDAY16";
	attributeTable.NWDAY16_DESC = "NWDAY16_DESC";
	attributeTable.NWDAY17 = "NWDAY17";
	attributeTable.NWDAY17_DESC = "NWDAY17_DESC";
	attributeTable.NWDAY18 = "NWDAY18";
	attributeTable.NWDAY18_DESC = "NWDAY18_DESC";
	attributeTable.NWDAY19 = "NWDAY19";
	attributeTable.NWDAY19_DESC = "NWDAY19_DESC";
	attributeTable.NWDAY20 = "NWDAY20";
	attributeTable.NWDAY20_DESC = "NWDAY20_DESC";
	attributeTable.NWDAY21 = "NWDAY21";
	attributeTable.NWDAY21_DESC = "NWDAY21_DESC";
	attributeTable.NWDAY22 = "NWDAY22";
	attributeTable.NWDAY22_DESC = "NWDAY22_DESC";
	attributeTable.NWDAY23 = "NWDAY23";
	attributeTable.NWDAY23_DESC = "NWDAY23_DESC";
	attributeTable.NWDAY24 = "NWDAY24";
	attributeTable.NWDAY24_DESC = "NWDAY24_DESC";
	attributeTable.NWDAY25 = "NWDAY25";
	attributeTable.NWDAY25_DESC = "NWDAY25_DESC";
	attributeTable.NWDAY26 = "NWDAY26";
	attributeTable.NWDAY26_DESC = "NWDAY26_DESC";
	attributeTable.NWDAY27 = "NWDAY27";
	attributeTable.NWDAY27_DESC = "NWDAY27_DESC";
	attributeTable.NWDAY28 = "NWDAY28";
	attributeTable.NWDAY28_DESC = "NWDAY28_DESC";
	attributeTable.NWDAY29 = "NWDAY29";
	attributeTable.NWDAY29_DESC = "NWDAY29_DESC";
	attributeTable.NWDAY30 = "NWDAY30";
	attributeTable.NWDAY30_DESC = "NWDAY30_DESC";
	attributeTable.NWDAY31 = "NWDAY31";
	attributeTable.NWDAY31_DESC = "NWDAY31_DESC";
	attributeTable.SCHKZ = "SCHKZ";
	attributeTable.ZEITY = "ZEITY";

	var PKTable = {};
	PKTable.KJAHR = {}
	PKTable.KJAHR.name = "KJAHR";
	PKTable.KJAHR.isAutoGen = false;
	PKTable.MOFID = {}
	PKTable.MOFID.name = "MOFID";
	PKTable.MOFID.isAutoGen = false;
	PKTable.MONAT = {}
	PKTable.MONAT.name = "MONAT";
	PKTable.MONAT.isAutoGen = false;
	PKTable.MOSID = {}
	PKTable.MOSID.name = "MOSID";
	PKTable.MOSID.isAutoGen = false;
	PKTable.SCHKZ = {}
	PKTable.SCHKZ.name = "SCHKZ";
	PKTable.SCHKZ.isAutoGen = false;
	PKTable.ZEITY = {}
	PKTable.ZEITY.name = "ZEITY";
	PKTable.ZEITY.isAutoGen = false;
	var newvaluestable = {};
	for (var k in valuestable){
		var v = valuestable[k];
		if(kony.sync.isNull(attributeTable[k])) { 
			sync.log.warn("Ignoring the attribute " + k + " for the SyncObject TEAM_HOLIDAY_CALENDAR. "  + k + " not defined as an attribute in SyncConfiguration.");
		}else if(!kony.sync.isNull(PKTable[k])) {
			if(insert===false){
				sync.log.warn("Ignoring the primary key " + k + " for the SyncObject TEAM_HOLIDAY_CALENDAR. Primary Key should not be the part of the attributes to be updated in the local device database.");
			}else if(PKTable[k].isAutoGen){
				sync.log.warn("Ignoring the auto-generated primary key " + k + " for the SyncObject TEAM_HOLIDAY_CALENDAR. Auto-generated Primary Key should not be the part of the attributes to be inserted in the local device database.");
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

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.formOrderByClause = function(orderByMap){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.formOrderByClause function");
	if(!kony.sync.isNull(orderByMap)){
		var valuestable = kony.sync.convertOrderByMapToValuesTable(orderByMap);
		//var filteredValuestable = com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.filterAttributes(valuestable, true);
		return kony.sync.convertToValuesTableOrderByMap(orderByMap,valuestable);
	}
	return null;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.getValuesTable = function(isInsert){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.getValuesTable function");
	var valuesTable = {};
	valuesTable.EXTRACT_TSTAMP = this.EXTRACT_TSTAMP;
	if(isInsert===true){
		valuesTable.KJAHR = this.KJAHR;
	}
	if(isInsert===true){
		valuesTable.MOFID = this.MOFID;
	}
	if(isInsert===true){
		valuesTable.MONAT = this.MONAT;
	}
	if(isInsert===true){
		valuesTable.MOSID = this.MOSID;
	}
	valuesTable.NWDAY01 = this.NWDAY01;
	valuesTable.NWDAY01_DESC = this.NWDAY01_DESC;
	valuesTable.NWDAY02 = this.NWDAY02;
	valuesTable.NWDAY02_DESC = this.NWDAY02_DESC;
	valuesTable.NWDAY03 = this.NWDAY03;
	valuesTable.NWDAY03_DESC = this.NWDAY03_DESC;
	valuesTable.NWDAY04 = this.NWDAY04;
	valuesTable.NWDAY04_DESC = this.NWDAY04_DESC;
	valuesTable.NWDAY05 = this.NWDAY05;
	valuesTable.NWDAY05_DESC = this.NWDAY05_DESC;
	valuesTable.NWDAY06 = this.NWDAY06;
	valuesTable.NWDAY06_DESC = this.NWDAY06_DESC;
	valuesTable.NWDAY07 = this.NWDAY07;
	valuesTable.NWDAY07_DESC = this.NWDAY07_DESC;
	valuesTable.NWDAY08 = this.NWDAY08;
	valuesTable.NWDAY08_DESC = this.NWDAY08_DESC;
	valuesTable.NWDAY09 = this.NWDAY09;
	valuesTable.NWDAY09_DESC = this.NWDAY09_DESC;
	valuesTable.NWDAY10 = this.NWDAY10;
	valuesTable.NWDAY10_DESC = this.NWDAY10_DESC;
	valuesTable.NWDAY11 = this.NWDAY11;
	valuesTable.NWDAY11_DESC = this.NWDAY11_DESC;
	valuesTable.NWDAY12 = this.NWDAY12;
	valuesTable.NWDAY12_DESC = this.NWDAY12_DESC;
	valuesTable.NWDAY13 = this.NWDAY13;
	valuesTable.NWDAY13_DESC = this.NWDAY13_DESC;
	valuesTable.NWDAY14 = this.NWDAY14;
	valuesTable.NWDAY14_DESC = this.NWDAY14_DESC;
	valuesTable.NWDAY15 = this.NWDAY15;
	valuesTable.NWDAY15_DESC = this.NWDAY15_DESC;
	valuesTable.NWDAY16 = this.NWDAY16;
	valuesTable.NWDAY16_DESC = this.NWDAY16_DESC;
	valuesTable.NWDAY17 = this.NWDAY17;
	valuesTable.NWDAY17_DESC = this.NWDAY17_DESC;
	valuesTable.NWDAY18 = this.NWDAY18;
	valuesTable.NWDAY18_DESC = this.NWDAY18_DESC;
	valuesTable.NWDAY19 = this.NWDAY19;
	valuesTable.NWDAY19_DESC = this.NWDAY19_DESC;
	valuesTable.NWDAY20 = this.NWDAY20;
	valuesTable.NWDAY20_DESC = this.NWDAY20_DESC;
	valuesTable.NWDAY21 = this.NWDAY21;
	valuesTable.NWDAY21_DESC = this.NWDAY21_DESC;
	valuesTable.NWDAY22 = this.NWDAY22;
	valuesTable.NWDAY22_DESC = this.NWDAY22_DESC;
	valuesTable.NWDAY23 = this.NWDAY23;
	valuesTable.NWDAY23_DESC = this.NWDAY23_DESC;
	valuesTable.NWDAY24 = this.NWDAY24;
	valuesTable.NWDAY24_DESC = this.NWDAY24_DESC;
	valuesTable.NWDAY25 = this.NWDAY25;
	valuesTable.NWDAY25_DESC = this.NWDAY25_DESC;
	valuesTable.NWDAY26 = this.NWDAY26;
	valuesTable.NWDAY26_DESC = this.NWDAY26_DESC;
	valuesTable.NWDAY27 = this.NWDAY27;
	valuesTable.NWDAY27_DESC = this.NWDAY27_DESC;
	valuesTable.NWDAY28 = this.NWDAY28;
	valuesTable.NWDAY28_DESC = this.NWDAY28_DESC;
	valuesTable.NWDAY29 = this.NWDAY29;
	valuesTable.NWDAY29_DESC = this.NWDAY29_DESC;
	valuesTable.NWDAY30 = this.NWDAY30;
	valuesTable.NWDAY30_DESC = this.NWDAY30_DESC;
	valuesTable.NWDAY31 = this.NWDAY31;
	valuesTable.NWDAY31_DESC = this.NWDAY31_DESC;
	if(isInsert===true){
		valuesTable.SCHKZ = this.SCHKZ;
	}
	if(isInsert===true){
		valuesTable.ZEITY = this.ZEITY;
	}
	return valuesTable;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.prototype.getPKTable function");
	var pkTable = {};
	pkTable.KJAHR = {key:"KJAHR",value:this.KJAHR};
	pkTable.MOFID = {key:"MOFID",value:this.MOFID};
	pkTable.MONAT = {key:"MONAT",value:this.MONAT};
	pkTable.MOSID = {key:"MOSID",value:this.MOSID};
	pkTable.SCHKZ = {key:"SCHKZ",value:this.SCHKZ};
	pkTable.ZEITY = {key:"ZEITY",value:this.ZEITY};
	return pkTable;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPKTable = function(){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getPKTable function");
	var pkTable = [];
	pkTable.push("KJAHR");
	pkTable.push("MOFID");
	pkTable.push("MONAT");
	pkTable.push("MOSID");
	pkTable.push("SCHKZ");
	pkTable.push("ZEITY");
	return pkTable;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck = function(pks,wcs,errorcallback,opName){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.pkCheck function");
	var wc = [];
	if(!kony.sync.isNull(pks.KJAHR)){
		if(!kony.sync.isNull(pks.KJAHR.value)){
			wc.key = "KJAHR";
			wc.value = pks.KJAHR.value;
		}
		else{
			wc.key = "KJAHR";
			wc.value = pks.KJAHR;
		}
	}else{
		sync.log.error("Primary Key KJAHR not specified in " + opName + " an item in TEAM_HOLIDAY_CALENDAR");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("KJAHR",opName,"TEAM_HOLIDAY_CALENDAR")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.MOFID)){
		if(!kony.sync.isNull(pks.MOFID.value)){
			wc.key = "MOFID";
			wc.value = pks.MOFID.value;
		}
		else{
			wc.key = "MOFID";
			wc.value = pks.MOFID;
		}
	}else{
		sync.log.error("Primary Key MOFID not specified in " + opName + " an item in TEAM_HOLIDAY_CALENDAR");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("MOFID",opName,"TEAM_HOLIDAY_CALENDAR")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.MONAT)){
		if(!kony.sync.isNull(pks.MONAT.value)){
			wc.key = "MONAT";
			wc.value = pks.MONAT.value;
		}
		else{
			wc.key = "MONAT";
			wc.value = pks.MONAT;
		}
	}else{
		sync.log.error("Primary Key MONAT not specified in " + opName + " an item in TEAM_HOLIDAY_CALENDAR");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("MONAT",opName,"TEAM_HOLIDAY_CALENDAR")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.MOSID)){
		if(!kony.sync.isNull(pks.MOSID.value)){
			wc.key = "MOSID";
			wc.value = pks.MOSID.value;
		}
		else{
			wc.key = "MOSID";
			wc.value = pks.MOSID;
		}
	}else{
		sync.log.error("Primary Key MOSID not specified in " + opName + " an item in TEAM_HOLIDAY_CALENDAR");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("MOSID",opName,"TEAM_HOLIDAY_CALENDAR")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.SCHKZ)){
		if(!kony.sync.isNull(pks.SCHKZ.value)){
			wc.key = "SCHKZ";
			wc.value = pks.SCHKZ.value;
		}
		else{
			wc.key = "SCHKZ";
			wc.value = pks.SCHKZ;
		}
	}else{
		sync.log.error("Primary Key SCHKZ not specified in " + opName + " an item in TEAM_HOLIDAY_CALENDAR");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("SCHKZ",opName,"TEAM_HOLIDAY_CALENDAR")));
		return;
	}
	kony.table.insert(wcs,wc);
	var wc = [];
	if(!kony.sync.isNull(pks.ZEITY)){
		if(!kony.sync.isNull(pks.ZEITY.value)){
			wc.key = "ZEITY";
			wc.value = pks.ZEITY.value;
		}
		else{
			wc.key = "ZEITY";
			wc.value = pks.ZEITY;
		}
	}else{
		sync.log.error("Primary Key ZEITY not specified in " + opName + " an item in TEAM_HOLIDAY_CALENDAR");
		kony.sync.verifyAndCallClosure(errorcallback, kony.sync.getErrorTable(kony.sync.errorCodePrimaryKeyNotSpecified,kony.sync.getPrimaryKeyNotSpecifiedMsg("ZEITY",opName,"TEAM_HOLIDAY_CALENDAR")));
		return;
	}
	kony.table.insert(wcs,wc);
	return true;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.validateNull = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.validateNull function");
	return true;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.validateNullInsert = function (valuestable,errorcallback){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.validateNullInsert function");
	if(kony.sync.isNull(valuestable.KJAHR) || kony.sync.isEmptyString(valuestable.KJAHR)){
		sync.log.error("Mandatory attribute KJAHR is missing for the SyncObject TEAM_HOLIDAY_CALENDAR.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_HOLIDAY_CALENDAR", "KJAHR")));
		return false;
	}
	if(kony.sync.isNull(valuestable.MOFID) || kony.sync.isEmptyString(valuestable.MOFID)){
		sync.log.error("Mandatory attribute MOFID is missing for the SyncObject TEAM_HOLIDAY_CALENDAR.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_HOLIDAY_CALENDAR", "MOFID")));
		return false;
	}
	if(kony.sync.isNull(valuestable.MONAT) || kony.sync.isEmptyString(valuestable.MONAT)){
		sync.log.error("Mandatory attribute MONAT is missing for the SyncObject TEAM_HOLIDAY_CALENDAR.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_HOLIDAY_CALENDAR", "MONAT")));
		return false;
	}
	if(kony.sync.isNull(valuestable.MOSID) || kony.sync.isEmptyString(valuestable.MOSID)){
		sync.log.error("Mandatory attribute MOSID is missing for the SyncObject TEAM_HOLIDAY_CALENDAR.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_HOLIDAY_CALENDAR", "MOSID")));
		return false;
	}
	if(kony.sync.isNull(valuestable.SCHKZ) || kony.sync.isEmptyString(valuestable.SCHKZ)){
		sync.log.error("Mandatory attribute SCHKZ is missing for the SyncObject TEAM_HOLIDAY_CALENDAR.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_HOLIDAY_CALENDAR", "SCHKZ")));
		return false;
	}
	if(kony.sync.isNull(valuestable.ZEITY) || kony.sync.isEmptyString(valuestable.ZEITY)){
		sync.log.error("Mandatory attribute ZEITY is missing for the SyncObject TEAM_HOLIDAY_CALENDAR.");
		errorcallback(kony.sync.getErrorTable(kony.sync.errorCodeMandatoryAttribute,kony.sync.getErrorMessage(kony.sync.errorCodeMandatoryAttribute, "TEAM_HOLIDAY_CALENDAR", "ZEITY")));
		return false;
	}
	return true;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getRelationshipMap = function(relationshipMap,valuestable){
	sync.log.trace("Entering com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getRelationshipMap function");
	var r1 = {};

	return relationshipMap;
};


com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.checkPKValueTables = function (valuetables)	{
	var checkPksNotNullFlag = true;
	for(var i = 0; i < valuetables.length; i++)	{
		if(kony.sync.isNull(valuetables[i])){
			checkPksNotNullFlag = false;
			break;
		}
	}
	return checkPksNotNullFlag;
};

com.kony.TeamViewService.TEAM_HOLIDAY_CALENDAR.getTableName = function(){
	return "TEAM_HOLIDAY_CALENDAR";
};




// **********************************End TEAM_HOLIDAY_CALENDAR's helper methods************************