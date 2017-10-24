/*
 * Model Extension class for employee_leave_type object under MYLEAVE object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.MYLEAVE = kony.model.MYLEAVE || {};
/**
 * Creates a new Model Extension.
 * @class employee_leave_typeModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.MYLEAVE.employee_leave_typeModelExtension = (function(){
    function employee_leave_typeModelExtension(modelObj) {
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
     * @memberof employee_leave_typeModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    employee_leave_typeModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return employee_leave_typeModelExtension;
})();