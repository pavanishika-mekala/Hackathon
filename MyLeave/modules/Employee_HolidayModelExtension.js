/*
 * Model Extension class for Holiday object under Employee object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.Employee = kony.model.Employee || {};
/**
 * Creates a new Model Extension.
 * @class HolidayModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.Employee.HolidayModelExtension = (function(){
    function HolidayModelExtension(modelObj) {
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
     * @memberof HolidayModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    HolidayModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return HolidayModelExtension;
})();