/*
 * Model Extension class for Configurations object under LeaveConfigurations object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.LeaveConfigurations = kony.model.LeaveConfigurations || {};
/**
 * Creates a new Model Extension.
 * @class ConfigurationsModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.LeaveConfigurations.ConfigurationsModelExtension = (function(){
    function ConfigurationsModelExtension(modelObj) {
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
     * @memberof ConfigurationsModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    ConfigurationsModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return ConfigurationsModelExtension;
})();