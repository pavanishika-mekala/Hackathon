/*
 * Model Extension class for Communication_Type object under Employee object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.Employee = kony.model.Employee || {};
/**
 * Creates a new Model Extension.
 * @class Communication_TypeModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.Employee.Communication_TypeModelExtension = (function(){
    function Communication_TypeModelExtension(modelObj) {
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
     * @memberof Communication_TypeModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    Communication_TypeModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return Communication_TypeModelExtension;
})();