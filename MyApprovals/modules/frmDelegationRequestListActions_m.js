/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to Actions of frmDelegationRequestList form
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

kony.apps.coe.ess.Approvals.DelegationRequestList = kony.apps.coe.ess.Approvals.DelegationRequestList || {};

/**
 * @param          none.
 * @return         none.
 * @description    This is a constructor for class kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.Actions = function() {
    kony.print("--Start constructor: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions--");
    kony.print("--End constructor: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.DelegationRequestList.Actions}.
 * @description    This method will return instance of kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.
 *                 Instance will be created once; next time; will be returned same.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance--");
    try {
        if(kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.singletonObj;
        }
        kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.singletonObj = new kony.apps.coe.ess.Approvals.DelegationRequestList.Actions();
        return kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.singletonObj;
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will call UI methods for selection of sent by me.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.
onClickOfSentByMe = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onClickOfSentByMe--");
    try{
        kony.apps.coe.ess.Approvals.DelegationRequestList.UI.getInstance().selectSentByMe();
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onClickOfSentByMe--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will call UI methods for selection of received.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.
onClickOfReceived = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onClickOfReceived--");
    try{
        kony.apps.coe.ess.Approvals.DelegationRequestList.UI.getInstance().selectReceived();
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onClickOfReceived--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method show delegation details form and will selected item as context data.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.
onRowClickOfSentByMeList = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onRowClickOfSentByMeList--");
    try {
        var selectedItem = frmDelegationRequestList.segRequestsListSentByMe.selectedItems[0];
        selectedItem.isSentByMe = true;
        showDelegationRequestDetailsForm(selectedItem);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onRowClickOfSentByMeList--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method show delegation details form and will selected item as context data.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.
onRowClickOfReceivedList = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onRowClickOfReceivedList--");
    try {
        var selectedItem = frmDelegationRequestList.segRequestsListReceived.selectedItems[0];
        selectedItem.isSentByMe = false;
        showDelegationRequestDetailsForm(selectedItem);
    } catch(err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.prototype.onRowClickOfReceivedList--");
};