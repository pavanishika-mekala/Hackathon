/*
 * FormModel Extension class for frmApprovalRequestDetail
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmApprovalRequestDetailFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmApprovalRequestDetailFormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },

    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof frmApprovalRequestDetailFormModelExtension#
     */
    formatUI: function() {
        //TO-DO add custom formatting
      //restting the text to null on loading form
      frmApprovalRequestDetail.txtareaComments.text="";
      frmApprovalRequestDetail.btnAttachments.skin = "sknbtnDetails";
  	  frmApprovalRequestDetail.btnDetails.skin = "sknbtn084A52ffpx32";
      frmApprovalRequestDetail.imguser.src="people_selected.png";
      frmApprovalRequestDetail.flxScrollBottom.setVisibility(true);
  	  frmApprovalRequestDetail.flxattachmentDetails.setVisibility(false);
  	  frmApprovalRequestDetail.imgPdf.setVisibility(true);
  	  frmApprovalRequestDetail.flxStatusicon.setVisibility(true);
  	  frmApprovalRequestDetail.lblStatus.setVisibility(true);
    }
});