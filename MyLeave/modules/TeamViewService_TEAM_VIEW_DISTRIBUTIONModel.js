/*
 * Model class for TEAM_VIEW_DISTRIBUTION object under TeamViewService object service group
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.TeamViewService = kony.model.TeamViewService || {};

/**
 * Creates a new Model.
 * @class TEAM_VIEW_DISTRIBUTIONModel
 * @param {Object} applicationContext - Application Context.
 * @param {Object} entityMetaData - Entity Metadata.
 * @param {Object} configOptions - Service Name and Service Options.
 */
kony.model.TeamViewService.TEAM_VIEW_DISTRIBUTIONModel = (function(){
	
    function TEAM_VIEW_DISTRIBUTIONModel(applicationContext, entityMetaData, configOptions) {
    	/**
    	 * @Fields in this object
		 *
		 * DELETE_IND 
		 * DIST_KEY 
		 * EMPNUMBER 
		 * EXTRACT_TSTAMP 
		 * TIMESTAMP 
		 * USER_ID 
		 */
        kony.model.BaseModel.call(this, applicationContext, entityMetaData, configOptions);
    }
	inheritsFrom(TEAM_VIEW_DISTRIBUTIONModel,kony.model.BaseModel);
    /**
     * This method returns requested property of column from metadata.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {String} columnName - Column Name.
     * @param {String} key - property of column.
     * @returns {Object} - Value for property 
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.getValueForColumnProperty = function(columnName, key) {
        return kony.model.BaseModel.prototype.getValueForColumnProperty.call(this, columnName, key);
    }
    /**
     * This method returns list of column names for this object from metadata.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @returns {Array} - List of columns
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.getColumnNames = function() {
        return kony.model.BaseModel.prototype.getColumnNames.call(this);
    }
    /**
     * This method returns requested property of this object from metadata.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {String} propertyName - property.
     * @returns {Object} - Value for property 
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.getValueForProperty = function(propertyName){
        return kony.model.BaseModel.prototype.getValueForProperty.call(this, propertyName);
    }
    /**
     * This method returns properties map of column from metadata.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {String} columnName - Column Name.
     * @returns {Object} - Column information 
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.getColumnInfo = function(columnName) {
        return kony.model.BaseModel.prototype.getColumnInfo.call(this, columnName);
    }
    /**
     * This method returns picklist values if exists for column from metadata.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {String} columnName - Column Name.
     * @returns {Array} - Pick list values for column
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.getFieldPickListValues = function(columnName){
        return kony.model.BaseModel.prototype.getFieldPickListValues.call(this, columnName);
    }
    /**
     * This method fetches the data for requested columns of this object.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Array} columnNames - List of Columns.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     * @param {Object} [dataModel] - DataModel, (applies filter if contains primary key value map).
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.fetchDataForColumns = function(columnNames, onSuccess, onError, dataModel) {
        kony.model.BaseModel.prototype.fetchDataForColumns.call(this, columnNames, onSuccess, onError, dataModel);
    }
    /**
     * This method fetches the data of this object as requested in dataObject
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.fetch = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetch.call(this, options, onSuccess, onError);
    }
    /**
     * This method saves the record provided in dataObject.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.create = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.create.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.update = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.update.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.partialUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.partialUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates(overrides) the record provided in dataObject.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.completeUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.completeUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record provided in dataObject.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.remove = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.remove.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record in this object with provided primary key values.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} primaryKeyValueMap - Primary Keys and values.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.removeByPrimaryKey = function(primaryKeyValueMap, onSuccess, onError){
        kony.model.BaseModel.prototype.removeByPrimaryKey.call(this, primaryKeyValueMap, onSuccess, onError);
    }
    /**
     * This method fetches the complete response of fetch operation as requested in dataObject
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.fetchResponse = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetchResponse.call(this, options, onSuccess, onError);
    }
    /**
     * This method invokes the customVerb operation as requested in dataObject
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {String} verbName - Name of the verb
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.customVerb = function(verbName, options, success, error) {
        kony.model.BaseModel.prototype.customVerb.call(this, verbName, options, success, error);
    }
    /**
     * This invokes the validate method in model extension class.
     * This is called from create and update methods.
     * @memberof TEAM_VIEW_DISTRIBUTIONModel#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    TEAM_VIEW_DISTRIBUTIONModel.prototype.validate = function(dataObject, validationType) {
        return kony.model.BaseModel.prototype.validate.call(this, dataObject, validationType);
    }
	
	return TEAM_VIEW_DISTRIBUTIONModel;
})();