/*
 * Model Extension class for notification object under NotificationsApprovals object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.NotificationsApprovals = kony.model.NotificationsApprovals || {};
/**
 * Creates a new Model Extension.
 * @class notificationModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.NotificationsApprovals.notificationModelExtension = (function(){
    function notificationModelExtension(modelObj) {
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
     * @memberof notificationModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    notificationModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return notificationModelExtension;
})();