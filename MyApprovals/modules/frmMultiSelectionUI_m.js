kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.MultiSelect = kony.apps.coe.ess.Approvals.MultiSelect || {};

/*
 *@function
 *@params   :   selectedItems - selected requests, status - either to approve or reject
 *@returns	:	None
 *@desc		:	Stores ID of selected requests in order to approve or reject them
 */
kony.apps.coe.ess.Approvals.MultiSelect.getSelectedID = function(selectedItems, status) {
  kony.print("----Start getSelectedID function");
    if (!isEmpty(selectedItems)) {
        var idList = [];
        for (var i = 0; i < selectedItems.length; i++) {
            idList.push(selectedItems[i].ID);
        }
        if (status == "1") {
            kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.rejectRequest(idList);
        } else {
            kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.approveRequest(idList);
        }
    } else {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.MultiSelect.message"));
    }
  kony.print("----End getSelectedID function");
};