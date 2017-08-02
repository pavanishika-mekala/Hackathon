/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to action events of frmDelegationRequestDetails form
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
 * @description    This is a constructor for kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions = function() {
    kony.print("--Start constructor: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions--");
    kony.print("--End constructor: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions}.
 * @description    This method return instance of kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.
 *                 This object is created once; next time; will return same.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.getInstance = function () {
	kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.singletonObj;
        }
        kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.singletonObj = new kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions();
        return kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.singletonObj;
    } catch(err) {
       handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.getInstance--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will call show delegation list form.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.
onClickOfBackBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfBackBtn--");
    try {
        showDelegationRequestListForm();
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfBackBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will backend methods to stop delegation request.
 *                 And It call some UI updating methods after delegation stopped.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.
onClickOfStopBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfStopBtn--");
    try {
      	frmDelegationRequestDetails.flxBottomButtons.setVisibility(false);
        var contextData = kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.getInstance().contextData;
        kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().stopDelegationRequest(contextData.groupId, success, error);
    } catch(err) {
        handleError(err);
    }
    function success() {
        kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance().disableStopAndEditBtn();
        kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance().setStatus("3");
    }
    
    function error(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfStopBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will show create form in edit mode.
 *                 And will populate existing data for a request.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.
onClickOfEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfEditBtn--");
    try {
        var delegateGroupId = kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.getInstance().contextData.groupId;
        showDelegationRequestCreateForm({"openInEditMode" : true, "delegateGroupId" : delegateGroupId});
    } catch(err) {
        
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfEditBtn--");
};