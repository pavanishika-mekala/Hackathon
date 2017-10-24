/*
 * Model Extension class for ConfigurationBundle object under LeaveDynamicSkins object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.LeaveDynamicSkins = kony.model.LeaveDynamicSkins || {};
/**
 * Creates a new Model Extension.
 * @class ConfigurationBundleModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.LeaveDynamicSkins.ConfigurationBundleModelExtension = (function(){
    function ConfigurationBundleModelExtension(modelObj) {
        var model = modelObj;

        this.getModel = function() {
            return model;
        };
        this.setModel = function(modelObj) {
            model = modelObj;
        };

    }
    
    /**
     * This is called from create and update methods of Model class.
     * This method is a handle to custom validation written by developer.
     * @memberof ConfigurationBundleModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    ConfigurationBundleModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return ConfigurationBundleModelExtension;
})();