/*
 * FormModel Extension class for frmSearch
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmSearchFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmSearchFormModelExtension = Class({
		constructor: function (formModelObj) {
			var formModel = formModelObj;
			this.getFormModelObj = function () {
				return formModel;
			}
		},

		/**
		 * This is life cycle method invoked before bindData method, primarily used for UI customization.
		 * @memberof frmSearchFormModelExtension#
		 */
		formatUI: function () {
			//TO-DO add custom formatting
			kony.apps.coe.ess.Approvals.Footer.SetFocus(1);
			frmSearch.flxClear.setVisibility(false);
			frmSearch.flxHide.setVisibility(true);
			kony.apps.coe.ess.Approvals.frmSearch.onClickFilterClearSearch();
			frmSearch.flxSearchContainer.setVisibility(false);
		}
	});
