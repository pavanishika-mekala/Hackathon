/*
 * FormModel Extension class for frmApprovalHome
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmApprovalHomeFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmApprovalHomeFormModelExtension = Class({
		constructor: function (formModelObj) {
			var formModel = formModelObj;
			this.getFormModelObj = function () {
				return formModel;
			}
		},

		/**
		 * This is life cycle method invoked before bindData method, primarily used for UI customization.
		 * @memberof frmApprovalHomeFormModelExtension#
		 */
		formatUI: function () {
			//TO-DO add custom formatting
			try {
              	//chainging the focus for the all the type of request filters
				var childWidgets = frmApprovalHome.flxScrlCategory.widgets();
				for (var x = 0; x < childWidgets.length; x++) {
					childWidgets[x].skin = "sknBtn0OFont00000028px";
				}
              	//chainging the footer skins
              	kony.apps.coe.ess.Approvals.Footer.SetFocus(0);
				frmApprovalHome.btnFilterAll.skin = "sknBtn0OBor1pxFFFFFF100O";
				frmApprovalHome.imgFilter.src = "filter_unselected.png";
              	frmApprovalHome.flxApprovalSegments.height = "100%";
              	//reseting the header colors
              	frmApprovalHome.flxHeader.skin = "sknFlx3EBEA3100O";
				frmApprovalHome.flxFiter.skin = "sknFlx3EBEA3100O";
              	//chainging the global variable to set context of the page
				kony.apps.coe.ess.globalVariables.FrmApprovalsCurrentContentType = kony.apps.coe.ess.globalVariables.constants.FrmApprovalHome.NowType;			
				// hiding the employee filter ui
				kony.apps.coe.ess.Approvals.ApprovalsHome.hideEmployeeFilter();
				//setting ui to show now approval request without filters 
				frmApprovalHome.flxApprovalList.setVisibility(true);
				frmApprovalHome.flxLaterApprovals.setVisibility(false);
				frmApprovalHome.flxFilterButton.setVisibility(true);      
                frmApprovalHome.flxFiter.setVisibility(false);
              	frmApprovalHome.lblNoRecordsFound.setVisibility(false);             	
              	frmApprovalHome.flxSlider.left="27%";
              	kony.apps.coe.ess.Approvals.ApprovalsHome.sliderAnimationToNow();
              	//resetting the textboxes
              	frmApprovalHome.tbxLaterFilter.text="";
				} catch (e) {
				handleError("Something went wrong");
				kony.print("Something went wrong in formatUI model extension." + e.message);
			}
		}
	});
