/*
 * Model Extension class for Mapping object under MappingService object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.MappingService = kony.model.MappingService || {};
/**
 * Creates a new Model Extension.
 * @class MappingModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.MappingService.MappingModelExtension = (function(){
    function MappingModelExtension(modelObj) {
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
     * @memberof MappingModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    MappingModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return MappingModelExtension;
})();