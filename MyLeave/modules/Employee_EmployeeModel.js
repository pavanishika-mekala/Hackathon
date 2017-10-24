/*
 * Model class for Employee object under Employee object service group
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.Employee = kony.model.Employee || {};

/**
 * Creates a new Model.
 * @class EmployeeModel
 * @param {Object} applicationContext - Application Context.
 * @param {Object} entityMetaData - Entity Metadata.
 * @param {Object} configOptions - Service Name and Service Options.
 */
kony.model.Employee.EmployeeModel = (function(){
	
    function EmployeeModel(applicationContext, entityMetaData, configOptions) {
    	/**
    	 * @Fields in this object
		 *
		 * Blood_group 
		 * Date_of_birth 
		 * Department_Id 
		 * Designation_Id 
		 * Employment_Type 
		 * First_Name 
		 * Gender 
		 * group_id 
		 * Id 
		 * Interests 
		 * IsEmployee 
		 * Job_Location 
		 * JoiningDate 
		 * lastmodifiedts 
		 * Last_Name 
		 * Manager_Id 
		 * Marital_Status_Id 
		 * Marriage_date 
		 * Media_Id 
		 * Medical_needs 
		 * Middle_Name 
		 * Nationality 
		 * Office_Id 
		 * Physical_disability 
		 * Place_of_birth 
		 * Preffered_name 
		 * RH_factor 
		 * softdeleteflag 
		 * Suffix 
		 * Title 
		 * User_Id 
		 */
        kony.model.BaseModel.call(this, applicationContext, entityMetaData, configOptions);
    }
	inheritsFrom(EmployeeModel,kony.model.BaseModel);
    /**
     * This method returns requested property of column from metadata.
     * @memberof EmployeeModel#
     * @param {String} columnName - Column Name.
     * @param {String} key - property of column.
     * @returns {Object} - Value for property 
     */
    EmployeeModel.prototype.getValueForColumnProperty = function(columnName, key) {
        return kony.model.BaseModel.prototype.getValueForColumnProperty.call(this, columnName, key);
    }
    /**
     * This method returns list of column names for this object from metadata.
     * @memberof EmployeeModel#
     * @returns {Array} - List of columns
     */
    EmployeeModel.prototype.getColumnNames = function() {
        return kony.model.BaseModel.prototype.getColumnNames.call(this);
    }
    /**
     * This method returns requested property of this object from metadata.
     * @memberof EmployeeModel#
     * @param {String} propertyName - property.
     * @returns {Object} - Value for property 
     */
    EmployeeModel.prototype.getValueForProperty = function(propertyName){
        return kony.model.BaseModel.prototype.getValueForProperty.call(this, propertyName);
    }
    /**
     * This method returns properties map of column from metadata.
     * @memberof EmployeeModel#
     * @param {String} columnName - Column Name.
     * @returns {Object} - Column information 
     */
    EmployeeModel.prototype.getColumnInfo = function(columnName) {
        return kony.model.BaseModel.prototype.getColumnInfo.call(this, columnName);
    }
    /**
     * This method returns picklist values if exists for column from metadata.
     * @memberof EmployeeModel#
     * @param {String} columnName - Column Name.
     * @returns {Array} - Pick list values for column
     */
    EmployeeModel.prototype.getFieldPickListValues = function(columnName){
        return kony.model.BaseModel.prototype.getFieldPickListValues.call(this, columnName);
    }
    /**
     * This method fetches the data for requested columns of this object.
     * @memberof EmployeeModel#
     * @param {Array} columnNames - List of Columns.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     * @param {Object} [dataModel] - DataModel, (applies filter if contains primary key value map).
     */
    EmployeeModel.prototype.fetchDataForColumns = function(columnNames, onSuccess, onError, dataModel) {
        kony.model.BaseModel.prototype.fetchDataForColumns.call(this, columnNames, onSuccess, onError, dataModel);
    }
    /**
     * This method fetches the data of this object as requested in dataObject
     * @memberof EmployeeModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.fetch = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetch.call(this, options, onSuccess, onError);
    }
    /**
     * This method saves the record provided in dataObject.
     * @memberof EmployeeModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.create = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.create.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof EmployeeModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.update = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.update.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof EmployeeModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.partialUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.partialUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method updates(overrides) the record provided in dataObject.
     * @memberof EmployeeModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.completeUpdate = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.completeUpdate.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record provided in dataObject.
     * @memberof EmployeeModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.remove = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.remove.call(this, options, onSuccess, onError);
    }
    /**
     * This method removes the record in this object with provided primary key values.
     * @memberof EmployeeModel#
     * @param {Object} primaryKeyValueMap - Primary Keys and values.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.removeByPrimaryKey = function(primaryKeyValueMap, onSuccess, onError){
        kony.model.BaseModel.prototype.removeByPrimaryKey.call(this, primaryKeyValueMap, onSuccess, onError);
    }
    /**
     * This method fetches the complete response of fetch operation as requested in dataObject
     * @memberof EmployeeModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.fetchResponse = function(options, onSuccess, onError) {
        kony.model.BaseModel.prototype.fetchResponse.call(this, options, onSuccess, onError);
    }
    /**
     * This method invokes the customVerb operation as requested in dataObject
     * @memberof EmployeeModel#
     * @param {String} verbName - Name of the verb
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    EmployeeModel.prototype.customVerb = function(verbName, options, success, error) {
        kony.model.BaseModel.prototype.customVerb.call(this, verbName, options, success, error);
    }
    /**
     * This invokes the validate method in model extension class.
     * This is called from create and update methods.
     * @memberof EmployeeModel#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    EmployeeModel.prototype.validate = function(dataObject, validationType) {
        return kony.model.BaseModel.prototype.validate.call(this, dataObject, validationType);
    }
	
	return EmployeeModel;
})();