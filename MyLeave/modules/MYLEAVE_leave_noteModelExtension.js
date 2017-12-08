/*
 * Model Extension class for leave_note object under MYLEAVE object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.MYLEAVE = kony.model.MYLEAVE || {};
/**
 * Creates a new Model Extension.
 * @class leave_noteModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.MYLEAVE.leave_noteModelExtension = (function(){
    function leave_noteModelExtension(modelObj) {
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
     * @memberof leave_noteModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    leave_noteModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return leave_noteModelExtension;
})();