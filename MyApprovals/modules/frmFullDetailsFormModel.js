/*
 * FormModel class for frmFullDetails
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model.
 * @class frmFullDetailsFormModel
 * @param {Object} controller - Form Controller.
 */
kony.sdk.mvvm.frmFullDetailsFormModel = Class(kony.sdk.mvvm.BaseFormModel, {

    constructor: function(controller) {
        this.$class.$super.call(this, controller);
    },
    /**
     * This method sets form model properties' value and corresponding widgets' data to null, which are defined in form config. 
     * @memberof frmFullDetailsFormModel#
     */
    clear: function() {
        this.$class.$superp.clear.call(this);
    },
    /**
     * This method clears all form model properties and invokes destroy method on corresponding form.
     * @memberof frmFullDetailsFormModel#
     */
    destroy: function() {
        this.$class.$superp.destroy.call(this);
    },
    /**
     * This method updates widget data corresponding to the provided form model property.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     */
    notifyObservers: function(formModelPropertyName) {
        this.$class.$superp.notifyObservers.call(this, formModelPropertyName);
    },
    /**
     * This method updates data for widgets corresponding to the provided form model properties. 
     * @memberof frmFullDetailsFormModel#
     * @param {Array} formModelProperties - List of form model properties.
     */
    update: function(formModelProperties) {
        this.$class.$superp.update.call(this, formModelProperties);
    },
    /**
     * This method shows form.
     * @memberof frmFullDetailsFormModel#
     */
    showView: function() {
        this.$class.$superp.showView.call(this);
    },
    /**
     * This method returns requested widget data.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     * @returns {Object} - data from the widget
     */
    getWidgetData: function(formModelPropertyName) {
        return this.$class.$superp.getWidgetData.call(this, formModelPropertyName);
    },
    /**
     * This method sets given property value to the formModel.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     * @param {Object} data - Data object.
     * @param {Boolean} [doNotNotify] - If true, will not update the widget data.
     */
    setWidgetData: function(formModelPropertyName, data, doNotNotify) {
        this.$class.$superp.setWidgetData.call(this, formModelPropertyName, data, doNotNotify);
    },
    /**
     * This method checks if there is a change in widget data.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     * @returns {Boolean} - 1. true if widget data is updated due to user interaction 2. true if developer sets widget data using setViewAttributeByProperty method for the property.
     * 3. false if invoked after getWidgetData/setWidgetData method for the property.
     */
    isPropertyValueChanged: function(formModelPropertyName) {
        return this.$class.$superp.isPropertyValueChanged.call(this, formModelPropertyName);
    },
    /**
     * This method sets masterdata to the widget. Supports Listbox, Combobox.
     * @memberof frmFullDetailsFormModel#
     * @param {Object} masterData - masterData.
     * @param {String} formModelPropertyName - form model property.
     */
    setMasterDataByProperty: function(masterData, formModelPropertyName) {
        this.$class.$superp.setMasterDataByProperty.call(this, masterData, formModelPropertyName);
    },
    /**
     * This method returns masterdata of widget. Supports Listbox, Combobox.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     * @returns {Object} - masterData
     */
    getMasterDataByProperty: function(formModelPropertyName) {
        return this.$class.$superp.getMasterDataByProperty.call(this, formModelPropertyName);
    },
    /**
     * This method sets given value to the widget property.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     * @param {String} attributeName - Attribute Name.
     * @param {Object} attributeVal - Attribute Value.
     */
    setViewAttributeByProperty: function(formModelPropertyName, attributeName, attributeVal) {
        this.$class.$superp.setViewAttributeByProperty.call(this, formModelPropertyName, attributeName, attributeVal);
    },
    /**
     * This method returns requested widget property value.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     * @param {String} attributeName - Attribute Name.
     * @returns {Object} - Attribute Value.
     */
    getViewAttributeByProperty: function(formModelPropertyName, attributeName) {
        return this.$class.$superp.getViewAttributeByProperty.call(this, formModelPropertyName, attributeName);
    },
    /**
     * This method executes widget action.
     * @memberof frmFullDetailsFormModel#
     * @param {String} formModelPropertyName - form model property.
     * @param {String} actionName - Action Name.
     * @param {Array} argsArray - Arguments for method/action.
     * @returns {Object} - Return value of method/action.
     */
    performActionOnView: function(formModelPropertyName, actionName, argsArray) {
        return this.$class.$superp.performActionOnView.call(this, formModelPropertyName, actionName, argsArray);
    },
    /**
     * This method executes form model method.
     * @memberof frmFullDetailsFormModel#
     * @param {String} actionName - Action Name.
     * @param {Array} argsArray - Arguments for method/action.
     * @returns {Object} - Return value of method/action.
     */
    performAction: function(actionName, argsArray) {
        return this.$class.$superp.performAction.call(this, actionName, argsArray);
    },
    /**
     * This method returns kony form instance.
     * @memberof frmFullDetailsFormModel#
     * @returns {Object} - Kony Form Object
     */
    getForm: function() {
        return this.$class.$superp.getForm.call(this);
    },
    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof frmFullDetailsFormModel#
     * @returns {Object} - Return value from formatUI of Form Model Extension
     */
    formatUI: function() {
        return this.$class.$superp.formatUI.call(this);
    }
});