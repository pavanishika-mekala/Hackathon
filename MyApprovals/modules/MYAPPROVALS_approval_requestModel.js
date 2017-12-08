/*
 * Model class for approval_request object under MYAPPROVALS object service group
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.MYAPPROVALS = kony.model.MYAPPROVALS || {};

/**
 * Creates a new Model.
 * @class approval_requestModel
 * @param {Object} applicationContext - Application Context.
 * @param {Object} entityMetaData - Entity Metadata.
 * @param {Object} configOptions - Service Name and Service Options.
 */
kony.model.MYAPPROVALS.approval_requestModel = (function(){
	
    function approval_requestModel(applicationContext, entityMetaData, configOptions) {
    	/**
    	 * @Fields in this object
		 *
		 * category_id 
		 * createdts 
		 * Description 
		 * due_date 
		 * employee_id 
		 * id 
		 * IsLater 
		 * IsRead 
		 * lastmodifiedts 
		 * media_id 
		 * request_date 
		 * request_id 
		 * softdeletedflag 
		 * status_id 
		 * type_id 
		 * leave_hours 
		 * leave_days 
		 */
        kony.model.BaseModel.call(this, applicationContext, entityMetaData, configOptions);
    }
	inheritsFrom(approval_requestModel,kony.model.BaseModel);
    /**
     * This method returns requested property of column from metadata.
     * @memberof approval_requestModel#
     * @param {String} columnName - Column Name.
     * @param {String} key - property of column.
     * @returns {Object} - Value for property 
     */
    approval_requestModel.prototype.getValueForColumnProperty = function(columnName, key) {
        return kony.model.BaseModel.prototype.getValueForColumnProperty.call(this, columnName, key);
    }
    /**
     * This method returns list of column names for this object from metadata.
     * @memberof approval_requestModel#
     * @returns {Array} - List of columns
     */
    approval_requestModel.prototype.getColumnNames = function() {
        return kony.model.BaseModel.prototype.getColumnNames.call(this);
    }
    /**
     * This method returns requested property of this object from metadata.
     * @memberof approval_requestModel#
     * @param {String} propertyName - property.
     * @returns {Object} - Value for property 
     */
    approval_requestModel.prototype.getValueForProperty = function(propertyName){
        return kony.model.BaseModel.prototype.getValueForProperty.call(this, propertyName);
    }
    /**
     * This method returns properties map of column from metadata.
     * @memberof approval_requestModel#
     * @param {String} columnName - Column Name.
     * @returns {Object} - Column information 
     */
    approval_requestModel.prototype.getColumnInfo = function(columnName) {
        return kony.model.BaseModel.prototype.getColumnInfo.call(this, columnName);
    }
    /**
     * This method returns picklist values if exists for column from metadata.
     * @memberof approval_requestModel#
     * @param {String} columnName - Column Name.
     * @returns {Array} - Pick list values for column
     */
    approval_requestModel.prototype.getFieldPickListValues = function(columnName){
        return kony.model.BaseModel.prototype.getFieldPickListValues.call(this, columnName);
    }
    /**
     * This method fetches the data for requested columns of this object.
     * @memberof approval_requestModel#
     * @param {Array} columnNames - List of Columns.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     * @param {Object} [dataModel] - DataModel, (applies filter if contains primary key value map).
     */
    approval_requestModel.prototype.fetchDataForColumns = function(columnNames, onSuccess, onError, dataModel) {
        kony.model.BaseModel.prototype.fetchDataForColumns.call(this, columnNames, onSuccess, onError, dataModel);
    }
    /**
     * This method fetches the data of this object as requested in dataObject
     * @memberof approval_requestModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.fetch = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetch.call(this, options, onSuccess, onError);
    }
    /**
     * This method saves the record provided in dataObject.
     * @memberof approval_requestModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.create = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.create.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof approval_requestModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.update = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.update.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof approval_requestModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.partialUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.partialUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates(overrides) the record provided in dataObject.
     * @memberof approval_requestModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.completeUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.completeUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record provided in dataObject.
     * @memberof approval_requestModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.remove = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.remove.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record in this object with provided primary key values.
     * @memberof approval_requestModel#
     * @param {Object} primaryKeyValueMap - Primary Keys and values.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.removeByPrimaryKey = function(primaryKeyValueMap, onSuccess, onError){
        kony.model.BaseModel.prototype.removeByPrimaryKey.call(this, primaryKeyValueMap, onSuccess, onError);
    }
    /**
     * This method fetches the complete response of fetch operation as requested in dataObject
     * @memberof approval_requestModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.fetchResponse = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetchResponse.call(this, options, onSuccess, onError);
    }
    /**
     * This method invokes the customVerb operation as requested in dataObject
     * @memberof approval_requestModel#
     * @param {String} verbName - Name of the verb
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    approval_requestModel.prototype.customVerb = function(verbName, options, success, error) {
        kony.model.BaseModel.prototype.customVerb.call(this, verbName, options, success, error);
    }
    /**
     * This invokes the validate method in model extension class.
     * This is called from create and update methods.
     * @memberof approval_requestModel#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    approval_requestModel.prototype.validate = function(dataObject, validationType) {
        return kony.model.BaseModel.prototype.validate.call(this, dataObject, validationType);
    }
	
	return approval_requestModel;
})();