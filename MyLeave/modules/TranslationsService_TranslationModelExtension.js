/*
 * Model Extension class for Translation object under TranslationsService object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.TranslationsService = kony.model.TranslationsService || {};
/**
 * Creates a new Model Extension.
 * @class TranslationModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.TranslationsService.TranslationModelExtension = (function(){
    function TranslationModelExtension(modelObj) {
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
     * @memberof TranslationModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    TranslationModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return TranslationModelExtension;
})();