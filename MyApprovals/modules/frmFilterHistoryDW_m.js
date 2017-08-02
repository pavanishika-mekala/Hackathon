kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.frmFilterHistoryUIDW = function() {

};

/**
 * @class onClickOfApproveFilter
 * this class for frmHistory filter Part
 * this is called on Click of Approve option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfApproveFilter = function() {
    if (frmHistory.flxApproved.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxApproved.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblApproved.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickApproved.imgTickApproved.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistory("0");
    } else {
        frmHistory.flxApproved.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblApproved.skin = "sknLbl05c8afFS14pxDW";
        frmHistory.flxImgTickApproved.imgTickApproved.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistory(null);
    }
};
/**
 * @class onClickOfRejectFilter
 * this class for frmHistory filter Part
 * this is called on Click of Reject option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfRejectFilter = function() {
    if (frmHistory.flxRejected.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxRejected.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblRejected.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickRejected.imgTickRejected.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistory("1");
    } else {
        frmHistory.flxRejected.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblRejected.skin = "sknLblff6e5fFS14pxDW";
        frmHistory.flxImgTickRejected.imgTickRejected.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistory(null);
    }
};
/**
 * @class onClickOfPendingFilter
 * this class for frmHistory filter Part
 * this is called on Click of Pending option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfPendingFilter = function() {
    if (frmHistory.flxPending.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxPending.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblPending.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickPending.imgTickPending.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistory("2");
    } else {
        frmHistory.flxPending.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblPending.skin = "sknLblfab745DW";
        frmHistory.flxImgTickPending.imgTickPending.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistory(null);
    }
};
/**
 * @class onClickOfTimeFilter
 * this class for frmHistory filter Part
 * this is called on Click of Timesheet option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfTimeFilter = function() {
    if (frmHistory.flxTimeRequest.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxTimeRequest.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblTimeRequest.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickTime.imgTickTime.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType("TIMESHEET");
    } else {
        frmHistory.flxTimeRequest.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblTimeRequest.skin = "sknLbl777777FS14pxDW";
        frmHistory.flxImgTickTime.imgTickTime.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType(null);
    }
};
/**
 * @class onClickOfLeaveFilter
 * this class for frmHistory filter Part
 * this is called on Click of Leave option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfLeaveFilter = function() {
    if (frmHistory.flxLeaveRequest.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxLeaveRequest.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblLeaveRequest.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickLeave.imgTickLeave.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType("TIMESHEET");
    } else {
        frmHistory.flxLeaveRequest.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblLeaveRequest.skin = "sknLbl777777FS14pxDW";
        frmHistory.flxImgTickLeave.imgTickLeave.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType(null);
    }
};
/**
 * @class onClickOfExpenseFilter
 * this class for frmHistory filter Part
 * this is called on Click of Expense option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfExpenseFilter = function() {
    if (frmHistory.flxExpenseRequest.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxExpenseRequest.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblExpenseRequest.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickExpense.imgTickExpense.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType("EXPENSES");
    } else {
        frmHistory.flxExpenseRequest.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblExpenseRequest.skin = "sknLbl777777FS14pxDW";
        frmHistory.flxImgTickExpense.imgTickExpense.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType(null);
    }
};
/**
 * @class onClickOfPOFilter
 * this class for frmHistory filter Part
 * this is called on Click of PO option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfPOFilter = function() {
    if (frmHistory.flxPurchaseRequest.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxPurchaseRequest.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblPurchaseRequest.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickPurchase.imgTickPurchase.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType("PURCHASEORDER");
    } else {
        frmHistory.flxPurchaseRequest.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblPurchaseRequest.skin = "sknLbl777777FS14pxDW";
        frmHistory.flxImgTickPurchase.imgTickPurchase.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType(null);
    }
};
/**
 * @class onClickOfWOFilter
 * this class for frmHistory filter Part
 * this is called on Click of WO option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickOfWOFilter = function() {
    if (frmHistory.flxWorkOrder.skin === "sknFlxf8f8f8RCDW") {
        frmHistory.flxWorkOrder.skin = "sknFlx2ebaeeRCDW";
        frmHistory.lblWorkOrder.skin = "sknLblffffffFS14DW";
        frmHistory.flxImgTickWorkOrder.imgTickWorkOrder.src = "check.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType("WORKORDER");
    } else {
        frmHistory.flxWorkOrder.skin = "sknFlxf8f8f8RCDW";
        frmHistory.lblWorkOrder.skin = "sknLbl777777FS14pxDW";
        frmHistory.flxImgTickWorkOrder.imgTickWorkOrder.src = "uncheck.png";
        (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType(null);
    }
};
/**
 * @class onClickClearAll
 * this class for frmHistory filter Part
 * this is called on Click of Clear option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickClearAll = function() {

    frmHistory.flxApproved.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblApproved.skin = "sknLbl05c8afFS14pxDW";
    frmHistory.flxImgTickApproved.imgTickApproved.src = "uncheck.png";
    frmHistory.flxRejected.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblRejected.skin = "sknLblff6e5fFS14pxDW";
    frmHistory.flxImgTickRejected.imgTickRejected.src = "uncheck.png";
    frmHistory.flxPending.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblPending.skin = "sknLblfab745DW";
    frmHistory.flxImgTickPending.imgTickPending.src = "uncheck.png";
    frmHistory.flxTimeRequest.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblTimeRequest.skin = "sknLbl777777FS14pxDW";
    frmHistory.flxImgTickTime.imgTickTime.src = "uncheck.png";
    frmHistory.flxLeaveRequest.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblLeaveRequest.skin = "sknLbl777777FS14pxDW";
    frmHistory.flxImgTickLeave.imgTickLeave.src = "uncheck.png";
    frmHistory.flxExpenseRequest.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblExpenseRequest.skin = "sknLbl777777FS14pxDW";
    frmHistory.flxImgTickExpense.imgTickExpense.src = "uncheck.png";
    frmHistory.flxPurchaseRequest.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblPurchaseRequest.skin = "sknLbl777777FS14pxDW";
    frmHistory.flxImgTickPurchase.imgTickPurchase.src = "uncheck.png";
    frmHistory.flxWorkOrder.skin = "sknFlxf8f8f8RCDW";
    frmHistory.lblWorkOrder.skin = "sknLbl777777FS14pxDW";
    frmHistory.flxImgTickWorkOrder.imgTickWorkOrder.src = "uncheck.png";
};
/**
 * @class onClickSelectAll
 * this class for frmHistory filter Part
 * this is called on Click of SelectAll option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.onClickSelectAll = function() {

    frmHistory.flxApproved.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblApproved.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickApproved.imgTickApproved.src = "check.png";
    frmHistory.flxRejected.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblRejected.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickRejected.imgTickRejected.src = "check.png";
    frmHistory.flxPending.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblPending.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickPending.imgTickPending.src = "check.png";
    frmHistory.flxTimeRequest.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblTimeRequest.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickTime.imgTickTime.src = "check.png";
    frmHistory.flxLeaveRequest.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblLeaveRequest.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickLeave.imgTickLeave.src = "check.png";
    frmHistory.flxExpenseRequest.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblExpenseRequest.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickExpense.imgTickExpense.src = "check.png";
    frmHistory.flxPurchaseRequest.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblPurchaseRequest.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickPurchase.imgTickPurchase.src = "check.png";
    frmHistory.flxWorkOrder.skin = "sknFlx2ebaeeRCDW";
    frmHistory.lblWorkOrder.skin = "sknLblffffffFS14DW";
    frmHistory.flxImgTickWorkOrder.imgTickWorkOrder.src = "check.png";
    (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistoryStatusType(null);
    (new kony.apps.coe.ess.frmFilterHistoryUIDW()).filterHistory(null);

}
/**
 * @class filterHistory
 * this class for frmHistory filter Part
 * this is called on Click of Approve/Reject/Pending option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.filterHistory = function(filterParam) {
    var data = kony.apps.coe.ess.Approvals.SPA.Search.processedData;
    kony.print("----Test:" + JSON.stringify(data));
    var filteredData = [];
    if (filterParam === null || filterParam === undefined) {
        filteredData = data;
    } else {
        for (var i in data) {
            if (data[i].status_id === filterParam) {
                filteredData.push(data[i]);
            }
        }
    }
    frmHistory.segAllEmp.setData(filteredData);
};
/**
 * @class filterHistoryStatusType
 * this class for frmHistory filter Part
 * this is called on Click of Leave/Timeshet/Expense/PO/WO option in History Filter
 */
kony.apps.coe.ess.frmFilterHistoryUIDW.prototype.filterHistoryStatusType = function(filterParam) {
    var data = kony.apps.coe.ess.Approvals.SPA.Search.processedData;
    kony.print("----Test:" + JSON.stringify(data));
    var filteredData = [];
    if (filterParam === null || filterParam === undefined) {
        filteredData = data;
    } else {
        for (var i in data) {
            if (data[i].Requesttype === filterParam) {
                filteredData.push(data[i]);
            }
        }
    }
    frmHistory.segAllEmp.setData(filteredData);
};

kony.apps.coe.ess.frmFilterHistoryUIDW.RequestTypesTable = function(callback){
var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {
                        "access": "online"
                    });
                    var dataObject= new kony.sdk.dto.DataObject("request_type");
                    var options = {
                        "dataObject": dataObject
                    };
                    objSvc.fetch(options,success,error);
            function success(response) {        
            kony.print("---- getRequestTypes Data: " + JSON.stringify(response));
            callback(response.records);
            
        }
           function error(err) {
          
         kony.print("---- frmFilterHistoryUIDW.getRequestTypes: " + JSON.stringify(err));
        }
};