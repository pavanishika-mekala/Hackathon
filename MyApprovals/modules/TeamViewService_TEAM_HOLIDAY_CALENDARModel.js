/*
 * Model class for TEAM_HOLIDAY_CALENDAR object under TeamViewService object service group
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.TeamViewService = kony.model.TeamViewService || {};

/**
 * Creates a new Model.
 * @class TEAM_HOLIDAY_CALENDARModel
 * @param {Object} applicationContext - Application Context.
 * @param {Object} entityMetaData - Entity Metadata.
 * @param {Object} configOptions - Service Name and Service Options.
 */
kony.model.TeamViewService.TEAM_HOLIDAY_CALENDARModel = (function(){
	
    function TEAM_HOLIDAY_CALENDARModel(applicationContext, entityMetaData, configOptions) {
    	/**
    	 * @Fields in this object
		 *
		 * DELETE_IND 
		 * EXTRACT_TSTAMP 
		 * KJAHR 
		 * MOFID 
		 * MONAT 
		 * MOSID 
		 * NWDAY01 
		 * NWDAY01_DESC 
		 * NWDAY02 
		 * NWDAY02_DESC 
		 * NWDAY03 
		 * NWDAY03_DESC 
		 * NWDAY04 
		 * NWDAY04_DESC 
		 * NWDAY05 
		 * NWDAY05_DESC 
		 * NWDAY06 
		 * NWDAY06_DESC 
		 * NWDAY07 
		 * NWDAY07_DESC 
		 * NWDAY08 
		 * NWDAY08_DESC 
		 * NWDAY09 
		 * NWDAY09_DESC 
		 * NWDAY10 
		 * NWDAY10_DESC 
		 * NWDAY11 
		 * NWDAY11_DESC 
		 * NWDAY12 
		 * NWDAY12_DESC 
		 * NWDAY13 
		 * NWDAY13_DESC 
		 * NWDAY14 
		 * NWDAY14_DESC 
		 * NWDAY15 
		 * NWDAY15_DESC 
		 * NWDAY16 
		 * NWDAY16_DESC 
		 * NWDAY17 
		 * NWDAY17_DESC 
		 * NWDAY18 
		 * NWDAY18_DESC 
		 * NWDAY19 
		 * NWDAY19_DESC 
		 * NWDAY20 
		 * NWDAY20_DESC 
		 * NWDAY21 
		 * NWDAY21_DESC 
		 * NWDAY22 
		 * NWDAY22_DESC 
		 * NWDAY23 
		 * NWDAY23_DESC 
		 * NWDAY24 
		 * NWDAY24_DESC 
		 * NWDAY25 
		 * NWDAY25_DESC 
		 * NWDAY26 
		 * NWDAY26_DESC 
		 * NWDAY27 
		 * NWDAY27_DESC 
		 * NWDAY28 
		 * NWDAY28_DESC 
		 * NWDAY29 
		 * NWDAY29_DESC 
		 * NWDAY30 
		 * NWDAY30_DESC 
		 * NWDAY31 
		 * NWDAY31_DESC 
		 * SCHKZ 
		 * TIMESTAMP 
		 * ZEITY 
		 */
        kony.model.BaseModel.call(this, applicationContext, entityMetaData, configOptions);
    }
	inheritsFrom(TEAM_HOLIDAY_CALENDARModel,kony.model.BaseModel);
    /**
     * This method returns requested property of column from metadata.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {String} columnName - Column Name.
     * @param {String} key - property of column.
     * @returns {Object} - Value for property 
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.getValueForColumnProperty = function(columnName, key) {
        return kony.model.BaseModel.prototype.getValueForColumnProperty.call(this, columnName, key);
    }
    /**
     * This method returns list of column names for this object from metadata.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @returns {Array} - List of columns
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.getColumnNames = function() {
        return kony.model.BaseModel.prototype.getColumnNames.call(this);
    }
    /**
     * This method returns requested property of this object from metadata.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {String} propertyName - property.
     * @returns {Object} - Value for property 
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.getValueForProperty = function(propertyName){
        return kony.model.BaseModel.prototype.getValueForProperty.call(this, propertyName);
    }
    /**
     * This method returns properties map of column from metadata.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {String} columnName - Column Name.
     * @returns {Object} - Column information 
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.getColumnInfo = function(columnName) {
        return kony.model.BaseModel.prototype.getColumnInfo.call(this, columnName);
    }
    /**
     * This method returns picklist values if exists for column from metadata.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {String} columnName - Column Name.
     * @returns {Array} - Pick list values for column
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.getFieldPickListValues = function(columnName){
        return kony.model.BaseModel.prototype.getFieldPickListValues.call(this, columnName);
    }
    /**
     * This method fetches the data for requested columns of this object.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Array} columnNames - List of Columns.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     * @param {Object} [dataModel] - DataModel, (applies filter if contains primary key value map).
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.fetchDataForColumns = function(columnNames, onSuccess, onError, dataModel) {
        kony.model.BaseModel.prototype.fetchDataForColumns.call(this, columnNames, onSuccess, onError, dataModel);
    }
    /**
     * This method fetches the data of this object as requested in dataObject
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.fetch = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetch.call(this, options, onSuccess, onError);
    }
    /**
     * This method saves the record provided in dataObject.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.create = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.create.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.update = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.update.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.partialUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.partialUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates(overrides) the record provided in dataObject.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.completeUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.completeUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record provided in dataObject.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.remove = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.remove.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record in this object with provided primary key values.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} primaryKeyValueMap - Primary Keys and values.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.removeByPrimaryKey = function(primaryKeyValueMap, onSuccess, onError){
        kony.model.BaseModel.prototype.removeByPrimaryKey.call(this, primaryKeyValueMap, onSuccess, onError);
    }
    /**
     * This method fetches the complete response of fetch operation as requested in dataObject
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.fetchResponse = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetchResponse.call(this, options, onSuccess, onError);
    }
    /**
     * This method invokes the customVerb operation as requested in dataObject
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {String} verbName - Name of the verb
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.customVerb = function(verbName, options, success, error) {
        kony.model.BaseModel.prototype.customVerb.call(this, verbName, options, success, error);
    }
    /**
     * This invokes the validate method in model extension class.
     * This is called from create and update methods.
     * @memberof TEAM_HOLIDAY_CALENDARModel#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    TEAM_HOLIDAY_CALENDARModel.prototype.validate = function(dataObject, validationType) {
        return kony.model.BaseModel.prototype.validate.call(this, dataObject, validationType);
    }
	
	return TEAM_HOLIDAY_CALENDARModel;
})();