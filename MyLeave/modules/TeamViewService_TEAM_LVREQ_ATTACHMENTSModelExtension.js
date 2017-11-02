/*
 * Model Extension class for TEAM_LVREQ_ATTACHMENTS object under TeamViewService object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.model = kony.model || {};
kony.model.TeamViewService = kony.model.TeamViewService || {};
/**
 * Creates a new Model Extension.
 * @class TEAM_LVREQ_ATTACHMENTSModelExtension
 * @param {Object} modelObj - Model.
 */
kony.model.TeamViewService.TEAM_LVREQ_ATTACHMENTSModelExtension = (function(){
    function TEAM_LVREQ_ATTACHMENTSModelExtension(modelObj) {
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
     * @memberof TEAM_LVREQ_ATTACHMENTSModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    TEAM_LVREQ_ATTACHMENTSModelExtension.prototype.validate = function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
	
	return TEAM_LVREQ_ATTACHMENTSModelExtension;
})();