/*
 * Model class for MyLeaveMedia object under MYLEAVE object service group
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.MYLEAVE = kony.model.MYLEAVE || {};

/**
 * Creates a new Model.
 * @class MyLeaveMediaModel
 * @param {Object} applicationContext - Application Context.
 * @param {Object} entityMetaData - Entity Metadata.
 * @param {Object} configOptions - Service Name and Service Options.
 */
kony.model.MYLEAVE.MyLeaveMediaModel = (function(){
	
    function MyLeaveMediaModel(applicationContext, entityMetaData, configOptions) {
    	/**
    	 * @Fields in this object
		 *
		 * classField 
		 * classValue 
		 * description 
		 * extension 
		 * group 
		 * name 
		 * ondemand 
		 * type 
		 * url 
		 */
        kony.model.BaseModel.call(this, applicationContext, entityMetaData, configOptions);
    }
	inheritsFrom(MyLeaveMediaModel,kony.model.BaseModel);
    /**
     * This method returns requested property of column from metadata.
     * @memberof MyLeaveMediaModel#
     * @param {String} columnName - Column Name.
     * @param {String} key - property of column.
     * @returns {Object} - Value for property 
     */
    MyLeaveMediaModel.prototype.getValueForColumnProperty = function(columnName, key) {
        return kony.model.BaseModel.prototype.getValueForColumnProperty.call(this, columnName, key);
    }
    /**
     * This method returns list of column names for this object from metadata.
     * @memberof MyLeaveMediaModel#
     * @returns {Array} - List of columns
     */
    MyLeaveMediaModel.prototype.getColumnNames = function() {
        return kony.model.BaseModel.prototype.getColumnNames.call(this);
    }
    /**
     * This method returns requested property of this object from metadata.
     * @memberof MyLeaveMediaModel#
     * @param {String} propertyName - property.
     * @returns {Object} - Value for property 
     */
    MyLeaveMediaModel.prototype.getValueForProperty = function(propertyName){
        return kony.model.BaseModel.prototype.getValueForProperty.call(this, propertyName);
    }
    /**
     * This method returns properties map of column from metadata.
     * @memberof MyLeaveMediaModel#
     * @param {String} columnName - Column Name.
     * @returns {Object} - Column information 
     */
    MyLeaveMediaModel.prototype.getColumnInfo = function(columnName) {
        return kony.model.BaseModel.prototype.getColumnInfo.call(this, columnName);
    }
    /**
     * This method returns picklist values if exists for column from metadata.
     * @memberof MyLeaveMediaModel#
     * @param {String} columnName - Column Name.
     * @returns {Array} - Pick list values for column
     */
    MyLeaveMediaModel.prototype.getFieldPickListValues = function(columnName){
        return kony.model.BaseModel.prototype.getFieldPickListValues.call(this, columnName);
    }
    /**
     * This method fetches the data for requested columns of this object.
     * @memberof MyLeaveMediaModel#
     * @param {Array} columnNames - List of Columns.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     * @param {Object} [dataModel] - DataModel, (applies filter if contains primary key value map).
     */
    MyLeaveMediaModel.prototype.fetchDataForColumns = function(columnNames, onSuccess, onError, dataModel) {
        kony.model.BaseModel.prototype.fetchDataForColumns.call(this, columnNames, onSuccess, onError, dataModel);
    }
    /**
     * This method fetches the data of this object as requested in dataObject
     * @memberof MyLeaveMediaModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.fetch = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetch.call(this, options, onSuccess, onError);
    }
    /**
     * This method saves the record provided in dataObject.
     * @memberof MyLeaveMediaModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.create = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.create.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof MyLeaveMediaModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.update = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.update.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof MyLeaveMediaModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.partialUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.partialUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates(overrides) the record provided in dataObject.
     * @memberof MyLeaveMediaModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.completeUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.completeUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record provided in dataObject.
     * @memberof MyLeaveMediaModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.remove = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.remove.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record in this object with provided primary key values.
     * @memberof MyLeaveMediaModel#
     * @param {Object} primaryKeyValueMap - Primary Keys and values.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.removeByPrimaryKey = function(primaryKeyValueMap, onSuccess, onError){
        kony.model.BaseModel.prototype.removeByPrimaryKey.call(this, primaryKeyValueMap, onSuccess, onError);
    }
    /**
     * This method fetches the complete response of fetch operation as requested in dataObject
     * @memberof MyLeaveMediaModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.fetchResponse = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetchResponse.call(this, options, onSuccess, onError);
    }
    /**
     * This method invokes the customVerb operation as requested in dataObject
     * @memberof MyLeaveMediaModel#
     * @param {String} verbName - Name of the verb
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    MyLeaveMediaModel.prototype.customVerb = function(verbName, options, success, error) {
        kony.model.BaseModel.prototype.customVerb.call(this, verbName, options, success, error);
    }
    /**
     * This invokes the validate method in model extension class.
     * This is called from create and update methods.
     * @memberof MyLeaveMediaModel#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    MyLeaveMediaModel.prototype.validate = function(dataObject, validationType) {
        return kony.model.BaseModel.prototype.validate.call(this, dataObject, validationType);
    }
	
	return MyLeaveMediaModel;
})();