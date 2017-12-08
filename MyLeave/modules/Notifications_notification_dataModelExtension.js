/*
 * Model Extension class for notification_data object under Notifications object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.Notifications = kony.model.Notifications || {};
/**
 * Creates a new Model Extension.
 * @class notification_dataModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.Notifications.notification_dataModelExtension = (function(){
    function notification_dataModelExtension(modelObj) {
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
     * @memberof notification_dataModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    notification_dataModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return notification_dataModelExtension;
})();