/*
 * Model class for Time_Type_Category object under MYTIME object service group
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.ObjectServices = kony.sdk.mvvm.ObjectServices || {};
kony.sdk.mvvm.ObjectServices.MYTIME = kony.sdk.mvvm.ObjectServices.MYTIME || {};

/**
 * Creates a new Model.
 * @class Time_Type_CategoryModel
 * @param {Object} applicationContext - Application Context.
 * @param {Object} entityMetaData - Entity Metadata.
 * @param {Object} configOptions - Service Name and Service Options.
 */
kony.sdk.mvvm.ObjectServices.MYTIME.Time_Type_CategoryModel = Class(kony.sdk.mvvm.BaseModel, {

    constructor: function(applicationContext, entityMetaData, configOptions) {
        /**
         *  @Fields in this object
            Description
EMPNUMBER
ID
softdeletedflag
TIMESTAMP
Type

        */
        this.$class.$super.call(this, applicationContext, entityMetaData, configOptions);
    },
    /**
     * This method returns requested property of column from metadata.
     * @memberof Time_Type_CategoryModel#
     * @param {String} columnName - Column Name.
     * @param {String} key - property of column.
     * @returns {Object} - Value for property 
     */
    getValueForColumnProperty: function(columnName, key) {
        return this.$class.$superp.getValueForColumnProperty.call(this, columnName, key);
    },
    /**
     * This method returns list of column names for this object from metadata.
     * @memberof Time_Type_CategoryModel#
     * @returns {Array} - List of columns
     */
    getColumnNames: function() {
        return this.$class.$superp.getColumnNames.call(this);
    },
    /**
     * This method returns requested property of this object from metadata.
     * @memberof Time_Type_CategoryModel#
     * @param {String} propertyName - property.
     * @returns {Object} - Value for property 
     */
    getValueForProperty: function(propertyName) {
        return this.$class.$superp.getValueForProperty.call(this, propertyName);
    },
    /**
     * This method returns properties map of column from metadata.
     * @memberof Time_Type_CategoryModel#
     * @param {String} columnName - Column Name.
     * @returns {Object} - Column information 
     */
    getColumnInfo: function(columnName) {
        return this.$class.$superp.getColumnInfo.call(this, columnName);
    },
    /**
     * This method returns picklist values if exists for column from metadata.
     * @memberof Time_Type_CategoryModel#
     * @param {String} columnName - Column Name.
     * @returns {Array} - Pick list values for column
     */
    getFieldPickListValues: function(columnName) {
        return this.$class.$superp.getFieldPickListValues.call(this, columnName);
    },
    /**
     * This method fetches the data for requested columns of this object.
     * @memberof Time_Type_CategoryModel#
     * @param {Array} columnNames - List of Columns.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     * @param {Object} [dataModel] - DataModel, (applies filter if contains primary key value map).
     */
    fetchDataForColumns: function(columnNames, onSuccess, onError, contextData) {
        this.$class.$superp.fetchDataForColumns.call(this, columnNames, onSuccess, onError, contextData);
    },
    /**
     * This method fetches the data of this object as requested in dataObject
     * @memberof Time_Type_CategoryModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    fetch: function(options, onSuccess, onError) {
        this.$class.$superp.fetch.call(this, options, onSuccess, onError);
    },
    /**
     * This method saves the record provided in dataObject.
     * @memberof Time_Type_CategoryModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    create: function(options, onSuccess, onError) {
        this.$class.$superp.create.call(this, options, onSuccess, onError);
    },
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof Time_Type_CategoryModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    update: function(options, onSuccess, onError) {
        this.$class.$superp.update.call(this, options, onSuccess, onError);
    },
    /**
     * This method updates the columns of record provided in dataObject.
     * @memberof Time_Type_CategoryModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    partialUpdate: function(options, onSuccess, onError) {
        this.$class.$superp.partialUpdate.call(this, options, onSuccess, onError);
    },
    /**
     * This method updates(overrides) the record provided in dataObject.
     * @memberof Time_Type_CategoryModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    completeUpdate: function(options, onSuccess, onError) {
        this.$class.$superp.completeUpdate.call(this, options, onSuccess, onError);
    },
    /**
     * This method removes the record provided in dataObject.
     * @memberof Time_Type_CategoryModel#
     * @param {Object} options - includes {"dataObject": kony.sdk.dto.DataObject}
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    remove: function(options, onSuccess, onError) {
        this.$class.$superp.remove.call(this, options, onSuccess, onError);
    },
    /**
     * This method removes the record in this object with provided primary key values.
     * @memberof Time_Type_CategoryModel#
     * @param {Object} primaryKeyValueMap - Primary Keys and values.
     * @param {SuccessCallback} onSuccess - Success Callback.
     * @param {SuccessCallback} onError - Error Callback.
     */
    removeByPrimaryKey: function(primaryKeyValueMap, onSuccess, onError) {
        this.$class.$superp.removeByPrimaryKey.call(this, primaryKeyValueMap, onSuccess, onError);
    },
    /**
     * This invokes the validate method in model extension class.
     * This is called from create and update methods.
     * @memberof Time_Type_CategoryModel#
     * @param {Object} dataObject - Data object.
     * @param {kony.sdk.mvvm.v2.Model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    validate: function(dataObject, validationType) {
        return this.$class.$superp.validate.call(this, dataObject, validationType);
    }
});