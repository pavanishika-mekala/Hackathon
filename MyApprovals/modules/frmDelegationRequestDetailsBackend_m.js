/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to backend of frmDelegationRequestDetails form
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
 * @description    This is a constructor for class kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend = function () {
	kony.print("--Start constructor: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend--");
    this.contextData = null;
	kony.print("--End constructor: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend}.
 * @description    This method will return instance of kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.
 *                 Instance will be created once; next time; will be returned same.
 */
kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.getInstance = function () {
	kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.singletonObj;
        }
        kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.singletonObj = new kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend();
        return kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.singletonObj;
    } catch(err) {
       handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.getInstance--");
};

