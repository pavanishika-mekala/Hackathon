

//**********************************Start DDL Commands************************
konysyncSQLLiteDDLCommands = [
 	"create table \"Communication_Channel_HISTORY\" (\"Communication_Type_Id\" nvarchar(4) not null,\"Employee_Id\" nvarchar(8) not null,\"END_DATE\" nvarchar(8) not null,\"START_DATE\" nvarchar(8) not null,\"Value\" nvarchar(30),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"Communication_Channel_ORIGINAL\" (\"Communication_Type_Id\" nvarchar(4) not null,\"Employee_Id\" nvarchar(8) not null,\"END_DATE\" nvarchar(8) not null,\"START_DATE\" nvarchar(8) not null,\"Value\" nvarchar(30),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Communication_Type_Id\", \"Employee_Id\"))",
 	"create table \"Communication_Channel\" (\"Communication_Type_Id\" nvarchar(4) not null,\"Employee_Id\" nvarchar(8) not null,\"END_DATE\" nvarchar(8) not null,\"START_DATE\" nvarchar(8) not null,\"Value\" nvarchar(30),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Communication_Type_Id\", \"Employee_Id\"))",
 	"create table \"Communication_Type_HISTORY\" (\"Employee_Id\" nvarchar(8) not null,\"Id\" nvarchar(4) not null,\"Type\" nvarchar(40),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"Communication_Type_ORIGINAL\" (\"Employee_Id\" nvarchar(8) not null,\"Id\" nvarchar(4) not null,\"Type\" nvarchar(40),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Employee_Id\", \"Id\"))",
 	"create table \"Communication_Type\" (\"Employee_Id\" nvarchar(8) not null,\"Id\" nvarchar(4) not null,\"Type\" nvarchar(40),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Employee_Id\", \"Id\"))",
 	"create table \"Employee_HISTORY\" (\"Blood_group\" nvarchar(30),\"Date_of_birth\" date,\"Department_Id\" nvarchar(32),\"Designation_Id\" nvarchar(32),\"Employment_Type\" nvarchar(32),\"First_Name\" nvarchar(32),\"Gender\" nvarchar(30),\"group_id\" nvarchar(32),\"Id\" nvarchar(32) not null,\"Interests\" nvarchar(255),\"IsEmployee\" nvarchar(10),\"Job_Location\" nvarchar(64),\"JoiningDate\" date,\"Last_Name\" nvarchar(32),\"Manager_Id\" nvarchar(32),\"Marital_Status_Id\" nvarchar(30),\"Marriage_date\" date,\"Media_Id\" nvarchar(10),\"Medical_needs\" nvarchar(255),\"Middle_Name\" nvarchar(32),\"Nationality\" nvarchar(100),\"Office_Id\" nvarchar(32),\"Physical_disability\" nvarchar(10),\"Place_of_birth\" nvarchar(100),\"Preffered_name\" nvarchar(100),\"RH_factor\" nvarchar(10),\"Suffix\" nvarchar(30),\"Title\" nvarchar(32),\"User_Id\" nvarchar(12) not null,\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"Employee_ORIGINAL\" (\"Id\" nvarchar(32) not null,\"User_Id\" nvarchar(12) not null,\"Blood_group\" nvarchar(30),\"Date_of_birth\" date,\"Department_Id\" nvarchar(32),\"Designation_Id\" nvarchar(32),\"Employment_Type\" nvarchar(32),\"First_Name\" nvarchar(32),\"Gender\" nvarchar(30),\"group_id\" nvarchar(32),\"Interests\" nvarchar(255),\"IsEmployee\" nvarchar(10),\"Job_Location\" nvarchar(64),\"JoiningDate\" date,\"Last_Name\" nvarchar(32),\"Manager_Id\" nvarchar(32),\"Marital_Status_Id\" nvarchar(30),\"Marriage_date\" date,\"Media_Id\" nvarchar(10),\"Medical_needs\" nvarchar(255),\"Middle_Name\" nvarchar(32),\"Nationality\" nvarchar(100),\"Office_Id\" nvarchar(32),\"Physical_disability\" nvarchar(10),\"Place_of_birth\" nvarchar(100),\"Preffered_name\" nvarchar(100),\"RH_factor\" nvarchar(10),\"Suffix\" nvarchar(30),\"Title\" nvarchar(32),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Id\", \"User_Id\"))",
 	"create table \"Employee\" (\"Id\" nvarchar(32) not null,\"User_Id\" nvarchar(12) not null,\"Blood_group\" nvarchar(30),\"Date_of_birth\" date,\"Department_Id\" nvarchar(32),\"Designation_Id\" nvarchar(32),\"Employment_Type\" nvarchar(32),\"First_Name\" nvarchar(32),\"Gender\" nvarchar(30),\"group_id\" nvarchar(32),\"Interests\" nvarchar(255),\"IsEmployee\" nvarchar(10),\"Job_Location\" nvarchar(64),\"JoiningDate\" date,\"Last_Name\" nvarchar(32),\"Manager_Id\" nvarchar(32),\"Marital_Status_Id\" nvarchar(30),\"Marriage_date\" date,\"Media_Id\" nvarchar(10),\"Medical_needs\" nvarchar(255),\"Middle_Name\" nvarchar(32),\"Nationality\" nvarchar(100),\"Office_Id\" nvarchar(32),\"Physical_disability\" nvarchar(10),\"Place_of_birth\" nvarchar(100),\"Preffered_name\" nvarchar(100),\"RH_factor\" nvarchar(10),\"Suffix\" nvarchar(30),\"Title\" nvarchar(32),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Id\", \"User_Id\"))",
 	"create table \"Holiday_HISTORY\" (\"Holiday_Date\" nvarchar(10) not null,\"Id\" nvarchar(10) not null,\"Name\" nvarchar(10),\"Type\" nvarchar(10),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"Holiday_ORIGINAL\" (\"Holiday_Date\" nvarchar(4000) not null,\"Id\" nvarchar(10) not null,\"Name\" nvarchar(10),\"Type\" nvarchar(10),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Holiday_Date\"))",
 	"create table \"Holiday\" (\"Holiday_Date\" nvarchar(4000) not null,\"Id\" nvarchar(10) not null,\"Name\" nvarchar(10),\"Type\" nvarchar(10),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Holiday_Date\"))",
 	"create table \"MyLeaveMedia_HISTORY\" (\"classField\" nvarchar(40),\"classValue\" nvarchar(40),\"description\" nvarchar(60) not null,\"extension\" nvarchar(8) not null,\"group\" nvarchar(20),\"name\" nvarchar(32) not null,\"ondemand\" nvarchar(20),\"type\" nvarchar(15) not null,\"url\" blob,\"blobref_url\" integer,\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"MyLeaveMedia_ORIGINAL\" (\"name\" nvarchar(4000) not null,\"classField\" nvarchar(40),\"classValue\" nvarchar(40),\"description\" nvarchar(60) not null,\"extension\" nvarchar(8) not null,\"group\" nvarchar(20),\"ondemand\" nvarchar(20),\"type\" nvarchar(15) not null,\"url\" blob,\"blobref_url\" integer,\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"name\"))",
 	"create table \"MyLeaveMedia\" (\"name\" nvarchar(4000) not null,\"classField\" nvarchar(40),\"classValue\" nvarchar(40),\"description\" nvarchar(60) not null,\"extension\" nvarchar(8) not null,\"group\" nvarchar(20),\"ondemand\" nvarchar(20),\"type\" nvarchar(15) not null,\"url\" blob,\"blobref_url\" integer,\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"name\"))",
 	"create table \"Status_HISTORY\" (\"Id\" nvarchar(32) not null,\"lastmodifiedts\" nvarchar(14),\"softdeleteflag\" nvarchar(1),\"Status_Name\" nvarchar(255),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"Status_ORIGINAL\" (\"Id\" nvarchar(4000) not null,\"lastmodifiedts\" nvarchar(14),\"softdeleteflag\" nvarchar(1),\"Status_Name\" nvarchar(255),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Id\"))",
 	"create table \"Status\" (\"Id\" nvarchar(4000) not null,\"lastmodifiedts\" nvarchar(14),\"softdeleteflag\" nvarchar(1),\"Status_Name\" nvarchar(255),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"Id\"))",
 	"create table \"employee_leave_type_HISTORY\" (\"availed\" nvarchar(10),\"balance\" nvarchar(10),\"employee_id\" nvarchar(10),\"expiry_date\" nvarchar(10),\"lastmodifiedts\" nvarchar(10),\"leave_type_id\" nvarchar(4) not null,\"leave_type_name\" nvarchar(100),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"employee_leave_type_ORIGINAL\" (\"leave_type_id\" nvarchar(4000) not null,\"availed\" nvarchar(10),\"balance\" nvarchar(10),\"employee_id\" nvarchar(10),\"expiry_date\" nvarchar(10),\"lastmodifiedts\" nvarchar(10),\"leave_type_name\" nvarchar(100),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"leave_type_id\"))",
 	"create table \"employee_leave_type\" (\"leave_type_id\" nvarchar(4000) not null,\"availed\" nvarchar(10),\"balance\" nvarchar(10),\"employee_id\" nvarchar(10),\"expiry_date\" nvarchar(10),\"lastmodifiedts\" nvarchar(10),\"leave_type_name\" nvarchar(100),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"leave_type_id\"))",
 	"create table \"event_HISTORY\" (\"createdts\" nvarchar(14),\"holiday_date\" nvarchar(8),\"id\" nvarchar(40) not null,\"name\" nvarchar(40),\"region_id\" nvarchar(10) not null,\"type_id\" nvarchar(40),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"event_ORIGINAL\" (\"id\" nvarchar(40) not null,\"region_id\" nvarchar(10) not null,\"createdts\" nvarchar(14),\"holiday_date\" nvarchar(8),\"name\" nvarchar(40),\"type_id\" nvarchar(40),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\", \"region_id\"))",
 	"create table \"event_type_HISTORY\" (\"createdts\" nvarchar(14),\"id\" nvarchar(40) not null,\"Name\" nvarchar(40),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"event_type_ORIGINAL\" (\"id\" nvarchar(4000) not null,\"createdts\" nvarchar(14),\"Name\" nvarchar(40),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\"))",
 	"create table \"event_type\" (\"id\" nvarchar(4000) not null,\"createdts\" nvarchar(14),\"Name\" nvarchar(40),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\"))",
 	"create table \"event\" (\"id\" nvarchar(40) not null,\"region_id\" nvarchar(10) not null,\"createdts\" nvarchar(14),\"holiday_date\" nvarchar(8),\"name\" nvarchar(40),\"type_id\" nvarchar(40),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\", \"region_id\"))",
 	"create table \"konysyncBLOBSTOREMANAGER\" (\"id\" integer not null,\"localPath\" text,\"tableName\" text,\"columnName\" text,\"type\" text,\"state\" integer,\"status\" integer,\"size\" integer,\"retry\" integer,\"lastUpdatedTimeStamp\" TIMESTAMP default CURRENT_TIMESTAMP,primary key (\"id\"))",
 	"create table \"konysyncCHUNKDATA\" (\"chunkid\" int not null,\"payloadid\" nvarchar(50) not null,\"scopename\" nvarchar(100) not null,\"chunkdata\" text,\"timestamp\" nvarchar(50),primary key (\"chunkid\", \"payloadid\", \"scopename\"))",
 	"create table \"konysyncCHUNKMETAINFO\" (\"payloadid\" nvarchar(50) not null,\"scopename\" nvarchar(100) not null,\"chunkacknowledged\" int,\"chunksize\" int,\"chunkcount\" int,\"chunkhashsum\" nvarchar(35),\"chunkdiscarded\" int,primary key (\"payloadid\", \"scopename\"))",
 	"create table \"konysyncDIAGNOSTICS\" (\"id\" bigint not null,\"action\" nvarchar(100),\"details\" nvarchar(2000),\"timestamp\" timestamp,primary key (\"id\"))",
 	"create table \"konysyncMETAINFO\" (\"id\" bigint not null,\"versionnumber\" int,\"lastserversynccontext\" nvarchar(1000),\"lastserveruploadsynccontext\" nvarchar(1000),\"lastschemaupgradesynccontext\" nvarchar(1000),\"filtervalue\" nvarchar(1000),\"replaysequencenumber\" integer,\"lastgeneratedid\" integer,\"scopename\" nvarchar(100),primary key (\"id\"))",
 	"create table \"konysyncPENDINGUPLOADREQUESTINFO\" (\"scopename\" nvarchar(100) not null,\"uploadrequest\" text,\"objectlevelinfo\" text,\"insertcount\" int,\"updatecount\" int,\"deletecount\" int,\"batchinsertcount\" int,\"batchupdatecount\" int,\"batchdeletecount\" int,\"uploadlimit\" int,primary key (\"scopename\"))",
 	"create table \"leave_HISTORY\" (\"createdts\" nvarchar(14),\"employee_id\" nvarchar(12) not null,\"end_date\" nvarchar(8),\"end_time\" nvarchar(10),\"id\" nvarchar(30) not null,\"lastmodifiedts\" nvarchar(14),\"leave_type_id\" nvarchar(12),\"no_of_hours\" double,\"reason_desc\" nvarchar(300),\"recurrence_id\" nvarchar(10),\"start_date\" nvarchar(8),\"start_time\" nvarchar(10),\"status_id\" nvarchar(3),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"leave_ORIGINAL\" (\"employee_id\" nvarchar(12) not null,\"id\" nvarchar(30) not null,\"createdts\" nvarchar(14),\"end_date\" nvarchar(8),\"end_time\" nvarchar(10),\"lastmodifiedts\" nvarchar(14),\"leave_type_id\" nvarchar(12),\"no_of_hours\" double,\"reason_desc\" nvarchar(300),\"recurrence_id\" nvarchar(10),\"start_date\" nvarchar(8),\"start_time\" nvarchar(10),\"status_id\" nvarchar(3),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"employee_id\", \"id\"))",
 	"create table \"leave_attachments_HISTORY\" (\"createdts\" nvarchar(14),\"lastmodifiedts\" nvarchar(14),\"leavel_id\" nvarchar(32) not null,\"LV_ATTCH_SEQNO\" double not null,\"media_id\" nvarchar(32) not null,\"softdeleteflag\" nvarchar(1),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"leave_attachments_ORIGINAL\" (\"leavel_id\" nvarchar(32) not null,\"LV_ATTCH_SEQNO\" double not null,\"createdts\" nvarchar(14),\"lastmodifiedts\" nvarchar(14),\"media_id\" nvarchar(32) not null,\"softdeleteflag\" nvarchar(1),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"leavel_id\", \"LV_ATTCH_SEQNO\"))",
 	"create table \"leave_attachments\" (\"leavel_id\" nvarchar(32) not null,\"LV_ATTCH_SEQNO\" double not null,\"createdts\" nvarchar(14),\"lastmodifiedts\" nvarchar(14),\"media_id\" nvarchar(32) not null,\"softdeleteflag\" nvarchar(1),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"leavel_id\", \"LV_ATTCH_SEQNO\"))",
 	"create table \"leave_audit_HISTORY\" (\"createdts\" nvarchar(14),\"description\" nvarchar(255),\"employee_id\" nvarchar(8) not null,\"error_message\" nvarchar(10),\"id\" nvarchar(12) not null,\"lastmodifiedts\" nvarchar(14),\"leave_id\" nvarchar(32) not null,\"status_id\" nvarchar(10),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"leave_audit_ORIGINAL\" (\"id\" nvarchar(4000) not null,\"createdts\" nvarchar(14),\"description\" nvarchar(255),\"employee_id\" nvarchar(8) not null,\"error_message\" nvarchar(10),\"lastmodifiedts\" nvarchar(14),\"leave_id\" nvarchar(32) not null,\"status_id\" nvarchar(10),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\"))",
 	"create table \"leave_audit\" (\"id\" nvarchar(4000) not null,\"createdts\" nvarchar(14),\"description\" nvarchar(255),\"employee_id\" nvarchar(8) not null,\"error_message\" nvarchar(10),\"lastmodifiedts\" nvarchar(14),\"leave_id\" nvarchar(32) not null,\"status_id\" nvarchar(10),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\"))",
 	"create table \"leave_note_HISTORY\" (\"comments\" nvarchar(255),\"createdts\" nvarchar(14) not null,\"employee_id\" nvarchar(8) not null,\"leave_id\" nvarchar(32) not null,\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"leave_note_ORIGINAL\" (\"createdts\" nvarchar(14) not null,\"employee_id\" nvarchar(8) not null,\"leave_id\" nvarchar(32) not null,\"comments\" nvarchar(255),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"createdts\", \"employee_id\", \"leave_id\"))",
 	"create table \"leave_note\" (\"createdts\" nvarchar(14) not null,\"employee_id\" nvarchar(8) not null,\"leave_id\" nvarchar(32) not null,\"comments\" nvarchar(255),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"createdts\", \"employee_id\", \"leave_id\"))",
 	"create table \"leave_type_HISTORY\" (\"id\" nvarchar(12) not null,\"is_recurrable\" nvarchar(10),\"lastmodifiedts\" nvarchar(10),\"name\" nvarchar(40),\"sofsdeleteflag\" nvarchar(10),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"leave_type_ORIGINAL\" (\"id\" nvarchar(4000) not null,\"is_recurrable\" nvarchar(10),\"lastmodifiedts\" nvarchar(10),\"name\" nvarchar(40),\"sofsdeleteflag\" nvarchar(10),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\"))",
 	"create table \"leave_type\" (\"id\" nvarchar(4000) not null,\"is_recurrable\" nvarchar(10),\"lastmodifiedts\" nvarchar(10),\"name\" nvarchar(40),\"sofsdeleteflag\" nvarchar(10),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\"))",
 	"create table \"leave\" (\"employee_id\" nvarchar(12) not null,\"id\" nvarchar(30) not null,\"createdts\" nvarchar(14),\"end_date\" nvarchar(8),\"end_time\" nvarchar(10),\"lastmodifiedts\" nvarchar(14),\"leave_type_id\" nvarchar(12),\"no_of_hours\" double,\"reason_desc\" nvarchar(300),\"recurrence_id\" nvarchar(10),\"start_date\" nvarchar(8),\"start_time\" nvarchar(10),\"status_id\" nvarchar(3),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"employee_id\", \"id\"))",
 	"create table \"mediaEmployee_HISTORY\" (\"classField\" nvarchar(40),\"classValue\" nvarchar(40),\"description\" nvarchar(60) not null,\"extension\" nvarchar(8) not null,\"group\" nvarchar(20),\"name\" nvarchar(32) not null,\"ondemand\" nvarchar(20),\"type\" nvarchar(15) not null,\"url\" blob,\"blobref_url\" integer,\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"mediaEmployee_ORIGINAL\" (\"name\" nvarchar(4000) not null,\"classField\" nvarchar(40),\"classValue\" nvarchar(40),\"description\" nvarchar(60) not null,\"extension\" nvarchar(8) not null,\"group\" nvarchar(20),\"ondemand\" nvarchar(20),\"type\" nvarchar(15) not null,\"url\" blob,\"blobref_url\" integer,\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"name\"))",
 	"create table \"mediaEmployee\" (\"name\" nvarchar(4000) not null,\"classField\" nvarchar(40),\"classValue\" nvarchar(40),\"description\" nvarchar(60) not null,\"extension\" nvarchar(8) not null,\"group\" nvarchar(20),\"ondemand\" nvarchar(20),\"type\" nvarchar(15) not null,\"url\" blob,\"blobref_url\" integer,\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"name\"))",
 	"create table \"notification_HISTORY\" (\"createdts\" nvarchar(14),\"description\" nvarchar(150),\"employee_id\" nvarchar(8) not null,\"module\" nvarchar(15),\"notification_id\" nvarchar(32) not null,\"title\" nvarchar(15),\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"notification_ORIGINAL\" (\"employee_id\" nvarchar(8) not null,\"notification_id\" nvarchar(32) not null,\"createdts\" nvarchar(14),\"description\" nvarchar(150),\"module\" nvarchar(15),\"title\" nvarchar(15),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"employee_id\", \"notification_id\"))",
 	"create table \"notification_data_HISTORY\" (\"createdts\" nvarchar(14),\"data_key\" nvarchar(15),\"data_value\" nvarchar(255),\"id\" nvarchar(32) not null,\"notification_id\" nvarchar(32) not null,\"konysyncversionnumber\" integer,\"konysyncchangetype\" integer,\"konysyncreplaysequence\" integer,\"konysyncchangetime\" timestamp,\"konysynchashsum\" nvarchar(4000))",
 	"create table \"notification_data_ORIGINAL\" (\"id\" nvarchar(32) not null,\"notification_id\" nvarchar(32) not null,\"createdts\" nvarchar(14),\"data_key\" nvarchar(15),\"data_value\" nvarchar(255),\"konysyncoriginalchangetype\" integer,\"konysyncoriginalversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\", \"notification_id\"))",
 	"create table \"notification_data\" (\"id\" nvarchar(32) not null,\"notification_id\" nvarchar(32) not null,\"createdts\" nvarchar(14),\"data_key\" nvarchar(15),\"data_value\" nvarchar(255),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"id\", \"notification_id\"))",
 	"create table \"notification\" (\"employee_id\" nvarchar(8) not null,\"notification_id\" nvarchar(32) not null,\"createdts\" nvarchar(14),\"description\" nvarchar(150),\"module\" nvarchar(15),\"title\" nvarchar(15),\"konysyncchangetype\" integer,\"konysyncversionnumber\" integer,\"konysynchashsum\" nvarchar(4000),primary key (\"employee_id\", \"notification_id\"))"
]
//**********************************End DDL Commands************************
