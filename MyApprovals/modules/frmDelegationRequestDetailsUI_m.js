/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to UI of frmDelegationRequestDetails form
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

kony.apps.coe.ess.Approvals.frmDelegationRequestDetails = kony.apps.coe.ess.Approvals.frmDelegationRequestDetails || {};

/**
 * @param          none.
 * @return         none.
 * @description    This is a constructor for class kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI = function() {
    kony.print("--Start constructor: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI--");
    this.stausLabelConfig = {
        "2" : {
            text : kony.i18n.getLocalizedString("i18n.ess.myApprovals.active"),
            skin : "sknLblFC3fbd00FS28px"
        },
        "3" : {
            text : kony.i18n.getLocalizedString("i18n.ess.myApprovals.stopped"),
            skin : "sknLblFCf51d00FS28px"
        },
    };
    this.skinForStatusIcon = {
        "2" : "sknflx3fbd00",
        "3" : "sknflxf51d00"
    };
    kony.print("--End constructor: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI}.
 * @description    This method will return instance of kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.
 *                 Instance will be created once; next time; will be returned same.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance = function () {
	kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.singletonObj;
        }
        kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.singletonObj = new kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI();
        return kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.singletonObj;
    } catch(err) {
       handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will hide stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.
hideStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.hideStopAndEditBtn--");
    try {
        frmDelegationRequestDetails.flxBottomButtons.isVisible = false;
        frmDelegationRequestDetails.flxComments.height = "49.38%";
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.hideStopAndEditBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will show stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.
showStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.showStopAndEditBtn--");
    try {
        frmDelegationRequestDetails.flxBottomButtons.isVisible = true;
        frmDelegationRequestDetails.flxBottomButtons.setEnabled(true);
        frmDelegationRequestDetails.flxComments.height = "41.28%";
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.showStopAndEditBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will disable stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.
disableStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.disableStopAndEditBtn--");
    try {
        frmDelegationRequestDetails.flxBottomButtons.setEnabled(false);
        frmDelegationRequestDetails.flxBottomButtonsDisable.isVisible = true;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.disableStopAndEditBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will enable stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.
enableStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.enableStopAndEditBtn--");
    try {
        frmDelegationRequestDetails.flxBottomButtons.setEnabled(true);
        frmDelegationRequestDetails.flxBottomButtonsDisable.isVisible = false;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.enableStopAndEditBtn--");
};

/**
 * @param          {string} status - Status of request.
 * @return         none.
 * @description    This method will change UI as per status.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.
setStatus = function(status) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.setStatus--");
    try {
        status = String(status);
        frmDelegationRequestDetails.flxStatusIcon.skin = this.skinForStatusIcon[status];
        frmDelegationRequestDetails.lblStatus.skin = this.stausLabelConfig[status].skin;
        frmDelegationRequestDetails.lblStatus.text = this.stausLabelConfig[status].text;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.prototype.setStatus--");
};
