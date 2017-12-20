/*
 * FormModel Extension class for frmDelegationRequestCreate
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmDelegationRequestCreateFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmDelegationRequestCreateFormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },

    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof frmDelegationRequestCreateFormModelExtension#
     */
    formatUI: function() {
        //TO-DO add custom formatting
      kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().showIndefiniteBtn();
      var toDaysDate = new Date();
      var year = toDaysDate.getFullYear()
      var date = toDaysDate.getDate();
      var month = toDaysDate.getMonth();
      frmDelegationRequestCreate.clndFromDate.validEndDate = [date, month+1, year+1];
      kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().enableToDate();
    }
});