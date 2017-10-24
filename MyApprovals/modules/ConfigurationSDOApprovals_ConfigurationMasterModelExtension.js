/*
 * Model Extension class for ConfigurationMaster object under ConfigurationSDOApprovals object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.ConfigurationSDOApprovals = kony.model.ConfigurationSDOApprovals || {};
/**
 * Creates a new Model Extension.
 * @class ConfigurationMasterModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.ConfigurationSDOApprovals.ConfigurationMasterModelExtension = (function(){
    function ConfigurationMasterModelExtension(modelObj) {
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
     * @memberof ConfigurationMasterModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    ConfigurationMasterModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return ConfigurationMasterModelExtension;
})();