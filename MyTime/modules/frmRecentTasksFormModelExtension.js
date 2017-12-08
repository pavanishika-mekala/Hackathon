/*
 * FormModel Extension class for frmRecentTasks
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmRecentTasksFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmRecentTasksFormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },

    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof frmRecentTasksFormModelExtension#
     */
    formatUI: function() {
        //TO-DO add custom formatting
        frmRecentTasks.segTasks.height = "100%";
        frmRecentTasks.imgStatus.src = "search_uncheck.png"
        flxMoreOptions.flxAddTask.setVisibility(false);
        frmRecentTasks.segTasks.setVisibility(true);
        frmRecentTasks.flxNoResults.setVisibility(false);
        //kony.apps.coe.ess.myTime.SearchTask.resetSearchCriteria();

    }
});