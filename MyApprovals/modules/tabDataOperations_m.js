/*
 *  @author     Rajesh.Chandolu
 *  @category   Business Logic.	
 *  @desc       Contains the functions which are operations on the approval request such as approval,Rejection etc
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.ApprovalRequests = kony.apps.coe.ess.Approvals.ApprovalRequests || {};
kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations = kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations || {};
/*
 *@function
 *@params   :   Id of the approval request on which operation need to be performed
 *@returns  :   Processed data back to the Controller extension
 *@returns	:	None
 *@desc		:	Approves the approval request
 */
kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest = function(id) {
    try {
        kony.print("------in the begining of the Data operations approving the approval request-----");
        if (id && id != null && id != "") {
            var mID = "";
            var success;
            if (Array.isArray(id)) {
                mID = id.pop();
               success = function(response) {
                    if (id.length > 0) {
                        kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(id);
                    } else {
                        //refresh the current form if the app is offline
                        //refreshCureentFormbypassingAsysncParams();
                      //#ifndef windows8  
                      frmTabDashboard.show();
                      //#else
                        frmWinTabDashboard.show();
                      //#endif
                        kony.apps.coe.ess.Sync.syncAsynchronously();
                    }
                };
            } else {
                mID = id;
                success = function(res) {
                    //refresh the current form if the app is offline
                    //refreshCureentFormbypassingAsysncParams();
                    //#ifndef windows8  
                  var frmObj=kony.application.getCurrentForm();
                  	if(frmObj.id==="frmTabListView"||frmObj.id==="frmViewFilterHistory")
                    frmObj.show();
                  	else
                    frmTabDashboard.show();
                      //#else
                        frmWinTabDashboard.show();
                      //#endif
                    kony.apps.coe.ess.Sync.syncAsynchronously();
                };
            }
            var errorcallback = function(e) {
                handleError(e);
            };
            var rowData = {
                "status_id": '0',
                "approval_id": mID,
                "approver_id": kony.apps.coe.ess.globalVariables.EmployeeID,
            };
            kony.apps.coe.ess.MVVM.update("MYAPPROVALS", "request_approver", rowData, success, errorcallback);
        } else {
            kony.print("---- invalid input in the rejection of the approval request------ " + id);
        }
        kony.print("------Sucessfully completed the Data operations approving the approval request-----");
    } catch (e) {
        kony.print("Unable to perform data operation on  the request " + e.message);
    }
};
/*
 *@function
 *@params   :   Id of the approval request on which operation need to be performed
 *@returns  :   Processed data back to the Controller extension
 *@returns	:	None
 *@desc		:	Approves the approval request
 */
kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest = function(id) {
    try {
        kony.print("------in the begining of the Data operation rejecting the approval request-----");
        if (id && id != null && id != "") {
            var mID = "";
            var success;
            if (Array.isArray(id)) {
                mID = id.pop();
                success = function(response) {
                    if (id.length > 0) {
                        kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(id);
                    } else {
                        //refresh the current form if the app is offline
                        //refreshCureentFormbypassingAsysncParams();
                      
                        //#ifndef windows8  
                      frmTabDashboard.show();
                      //#else
                        frmWinTabDashboard.show();
                      //#endif
                        kony.apps.coe.ess.Sync.syncAsynchronously();
                    }
                };
            } else {
                mID = id;
                success = function(res) {
                    //refresh the current form if the app is offline
                    //refreshCureentFormbypassingAsysncParams();
                    if(kony.application.getCurrentForm().id==="frmTabListView")
                    frmTabListView.show();
                  	else
                      {
                    //#ifndef windows8  
                    frmTabDashboard.show();
                    //#else
                    frmWinTabDashboard.show();
                    //#endif
                      }
                    kony.apps.coe.ess.Sync.syncAsynchronously();
                };
            }
            var errorcallback = function(e) {
                handleError(e);
            };
            var rowData = {
                "status_id": '1',
                "approval_id": mID,
                "approver_id": kony.apps.coe.ess.globalVariables.EmployeeID,
            };
            kony.apps.coe.ess.MVVM.update("MYAPPROVALS", "request_approver", rowData, success, errorcallback);
        } else {
            kony.print("---- invalid input in the rejection of the approval request------ " + id);
        }
        kony.print("------Sucessfully completed the Data operation rejecting the approval request-----");
    } catch (e) {
        kony.print("Unable to perform data operation on  the request " + e.message);
    }
};
/*
 *@function
 *@params   :   Id of the approval request on which operation need to be performed
 *@returns  :   Processed data back to the Controller extension
 *@returns	:	None
 *@desc		:	Mark approval request as later
 */
kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.markAsLater = function(id) {
    try {
        kony.print("-- Start markAsLater --");
        // Input validations
        if (isEmptyOrNull(id)) {
            kony.print("Ignoring Error: Unable to perform data operation on  the request");
            kony.print("-- End markAsLater --");
            return;
        }
        var successcallback = function(res) {
            //refresh the current form if the app is offline
            // refreshCureentFormbypassingAsysncParams();
          
          //#ifndef windows8
            frmTabDashboard.flexToastMessage.setVisibility(true);
            var timerid = "toastApprovalsTabTimer";
            kony.timer.schedule(timerid, function() {
                frmTabDashboard.flexToastMessage.setVisibility(false);
            }, 5, false);
            frmTabDashboard.show();
          //#else
          frmWinTabDashboard.show();
          //#endif
            kony.apps.coe.ess.Sync.syncAsynchronously();
        };
        var errorcallback = function(e) {
            handleError(e);
        };
        var rowData = {
            "id": id,
            "IsLater": "1"
        };
        kony.apps.coe.ess.MVVM.update("MYAPPROVALS", "approval_request", rowData, successcallback, errorcallback);
        kony.print("------Sucessfully completed the Data operation sending in the approval request in islater queue-----");
    } catch (e) {
        kony.print("Ignoring Error: markAsLater" + e.message());
    }
    kony.print("-- End markAsLater --");
};
/*
 *@function
 *@params   :   Id of the approval request on which operation need to be performed
 *@returns  :   Processed data back to the Controller extension
 *@returns	:	None
 *@desc		:	Mark approval request as later
 */
kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.markAsRead = function(id) {
    try {
        kony.print("------in the begining of the Data operations markign approval request as read -----");
        if (id && id != null && id != "") {
            var successcallback = function(res) {
                //refresh the current form if the app is offline
                refreshCureentFormbypassingAsysncParams();
                kony.apps.coe.ess.Sync.syncAsynchronously();
            };
            var errorcallback = function(e) {
                handleError(e);
            };
            var rowData = {
                "id": id,
                "IsRead": "1"
            };
            kony.apps.coe.ess.MVVM.update("MYAPPROVALS", "approval_request", rowData, successcallback, errorcallback);
        } else {
            kony.print("---- invalid input in the markas read ------ " + id);
        }
        kony.print("------Sucessfully completed the Data operation marking  the approval request as a read -----");
    } catch (e) {
        kony.print("Unable to perform data operation on  the request " + e.message);
    }
};
/*
 *@function
 *@params   :   Id of the approval request on which operation need to be performed
 *@returns  :   Processed data back to the Controller extension
 *@returns	:	None
 *@desc		:	Mark approval request as later
 */
kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment = function(ApprovalID, Comment) {
    try {
        kony.print("--Start kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment--");
        //input validation
        if (isEmpty(ApprovalID) || isEmpty(Comment)) {
            //input validation failed do nothing    
            kony.print("--invalid input to the method kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment--");
            return;
        }
        var successcallback = function(res) {

        };
        var currentTimestamp = new Date().toYYYMMDDHHMMSS();
        var rowData = {
            "approval_id": ApprovalID,
            "comment": Comment,
            "employee_id": kony.apps.coe.ess.globalVariables.EmployeeID,
            "createdts": currentTimestamp,
            "id": ApprovalID + "-" + currentTimestamp
        };
        kony.apps.coe.ess.MVVM.createRecord("MYAPPROVALS", "request_note", rowData, successcallback, function(err) {
            handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.internalError"));
        });
        kony.print("--end kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.createComment--");
    } catch (e) {
        kony.print("error occured " + JSON.stringify(e));
        handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.internalError"));
    }
};