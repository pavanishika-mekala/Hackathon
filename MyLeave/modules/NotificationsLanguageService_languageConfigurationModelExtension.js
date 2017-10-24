/*
 * Model Extension class for languageConfiguration object under NotificationsLanguageService object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.NotificationsLanguageService = kony.model.NotificationsLanguageService || {};
/**
 * Creates a new Model Extension.
 * @class languageConfigurationModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.NotificationsLanguageService.languageConfigurationModelExtension = (function(){
    function languageConfigurationModelExtension(modelObj) {
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
     * @memberof languageConfigurationModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    languageConfigurationModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return languageConfigurationModelExtension;
})();