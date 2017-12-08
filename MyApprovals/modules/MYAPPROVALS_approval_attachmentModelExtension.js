/*
 * Model Extension class for approval_attachment object under MYAPPROVALS object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.MYAPPROVALS = kony.model.MYAPPROVALS || {};
/**
 * Creates a new Model Extension.
 * @class approval_attachmentModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.MYAPPROVALS.approval_attachmentModelExtension = (function(){
    function approval_attachmentModelExtension(modelObj) {
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
     * @memberof approval_attachmentModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    approval_attachmentModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return approval_attachmentModelExtension;
})();