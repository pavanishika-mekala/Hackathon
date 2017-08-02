/*
 * FormModel Extension class for frmIsLaterSearch
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmIsLaterSearchFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmIsLaterSearchFormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },

    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof frmIsLaterSearchFormModelExtension#
     */
    formatUI: function() {
        //TO-DO add custom formatting
      var childWidgets = frmIsLaterSearch.flxScrlCategory.widgets();
		for(var x = 0; x < childWidgets.length; x++){
        childWidgets[x].skin = "sknBtn0OFont00000028px";
      }
      frmIsLaterSearch.btnFilterAll.skin = "sknBtn0OBor1pxFFFFFF100O";
      frmIsLaterSearch.lblNoRecordsFound.setVisibility(false);
    }
});