kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.DashboardDesktop = kony.apps.coe.ess.Approvals.DashboardDesktop || {};

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList = function (parent, rowTemplate, colTemplate) {
	this._data = null;
	this._colTemplate = colTemplate.clone("");
	this._rowTemplate = rowTemplate.clone("");
	this._parent = parent;
	this.selectedIndex = null;
	this.widgetsDataMap = null;
	this.propertiesToSet = null;
    this._supportedEvents = ["onClick"];
};

kony.apps.coe.ess.Approvals.DashboardDesktop.requestsCount={
  lblNoOfLeaves:0,
  lblNoOfExpense:0,
  lblNoOfTimeReq:0
};

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.getSelectedItemData = function() {
    if(this._data !== null && this._data !== undefined && this._data.length > 0) {
        return this._data[this.selectedIndex];
    }
    return null;
};
/**
 * @class setData
 * Function to set Data to Dynamic Flex's in Approval dashboard
 */
kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.setData = function (data) {
    var scopeObj = this;
  	var timeSheetCount=0;
  	var leaveCount=0;
  	var expenses=0;
  
	if (data === null || !Array.isArray(data) || data.length <= 0) {
		return;
	}
  	this._parent.removeAll();
	this._data = data;
	var nrows = (this._data.length + 1) / 2;
	nrows = parseInt(nrows);
	for (var i = 0; i < nrows; i++) {
		var temprow = this._rowTemplate.clone("" + i);
		for (var j = 0; j < 2; j++) {
			var k = i * 2 + j;
            if(k >= scopeObj._data.length) {
                break;
            }
			if (k >= this._data.length) {
				break;
			}
			var tempcol = this._colTemplate.clone("" + k);
            dataMapping(tempcol, scopeObj._colTemplate, data[k], k);
            temprow.add(tempcol);
          if(data[k].request_type==="LEAVE")
            {
              leaveCount++;
            }
          if(data[k].request_type==="TIMESHEET")
            {
              timeSheetCount++;
            }
          if(data[k].request_type==="EXPENSES")
            {
              expenses++;
            }
		}
      kony.apps.coe.ess.Approvals.DashboardDesktop.requestsCount.lblNoOfLeaves=leaveCount;
      kony.apps.coe.ess.Approvals.DashboardDesktop.requestsCount.lblNoOfExpense=expenses;
      kony.apps.coe.ess.Approvals.DashboardDesktop.requestsCount.lblNoOfTimeReq=timeSheetCount;
      this._parent.add(temprow);
	}
    scopeObj.selectedIndex = null;
    function newOnClick(selectedIndex, oldOnClick) {
        scopeObj.setSelectedItem(selectedIndex);
        oldOnClick();
    }
    function dataMapping(currWidget, templateWidget, data, index) {
        var allTempWigdets, allCurrWigdets;
        if(templateWidget.widgets === undefined) {
            allTempWigdets = {"0" : templateWidget};
        } else {
            allTempWigdets = templateWidget.widgets();
        }
        if(currWidget.widgets === undefined) {
            allCurrWigdets = {"0" : currWidget};
        } else {
            allCurrWigdets = currWidget.widgets();
        }
        for(var i in  allTempWigdets) {
            for(var y in scopeObj._supportedEvents) {
                if(allCurrWigdets[i][scopeObj._supportedEvents[y]] !== undefined) {
                    var oldOnClick = allCurrWigdets[i][scopeObj._supportedEvents[y]];
                    allCurrWigdets[i][scopeObj._supportedEvents[y]] = newOnClick.bind(null, index, oldOnClick);
                }
            } 
            
            if(allTempWigdets[i].widgets !== undefined) {
                dataMapping(allCurrWigdets[i], allTempWigdets[i], data, index);
            }
            var wId = String(allTempWigdets[i].id);
            var tempdata = data[scopeObj.widgetsDataMap[wId]];
            if(tempdata !== undefined) {
                if(typeof(tempdata) === "object") {
                    for(var t in tempdata) {
                        allCurrWigdets[i][t] = tempdata[t];
                    }
                } else {
                    allCurrWigdets[i][scopeObj.propertiesToSet[wId]] = tempdata;
                }
            }
        }
    }
};

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.updateDataAt = function (index, data) {
	for (var i in data) {
		this._data[index][i] = data[i];
	}
	var tempcol = this._colTemplate.clone("" + index);
	var nwid = tempcol.widgets().length;
	for (var z = 0; z < nwid; z++) {
		frmEventsList[tempcol.widgets()[z].id][this.propertiesToSet[this._colTemplate.widgets()[z].id]] = this._data[index][this.widgetsDataMap[this._colTemplate.widgets()[z].id]];
	}
};

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.setSelectedItem = function (index) {
	index = parseInt(index, 10);
	if (isNaN(index)) {
        this.selectedIndex = null;
		return;
	}
	this.selectedIndex = index;
};
/**
 * @class getSelectedItemData
 * Function to get the SelectedItem data
 */

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.getSelectedItemData = function () {
	if (this.selectedIndex !== null && this._data !== null && this.selectedIndex < this._data.length) {
		return this._data[this.selectedIndex];
	} else {
		return null;
	}
};

/**
 * @class removeAt
 * this class for frmApprovalDashboard Removing Flex's
 * this is called on Click of Approve/Reject/Skip button in Approve Dashbaord
 */

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.removeAt = function(index) {
	var scopeObj = this;
    scopeObj._data.splice(index, 1);
    scopeObj.setData(scopeObj._data);
};


/**
 * @class Skip
 * this class for frmApprovalDashboard Skip Part
 * this is called on Click of Skip button in Approve Dashbaord
 */

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.SkipLater = function(){
  var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {"access":"online"});
  var dataObject = new kony.sdk.dto.DataObject("approval_request");
  dataObject.addField("IsLater","1");
  dataObject.addField("id", kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.getSelectedItemData().ID);
  var options = {"dataObject":dataObject};

   objSvc.partialUpdate(options, function(res) {
                        //Processing of fetched requests is done for SPA records
                        kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.removeAt(kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.selectedIndex);
                    }, function(err) {
                        kony.print("---------- Update error: " + JSON.stringify(err));
                    });
  
};

/**
 * @class Approve
 * this class for frmApprovalDashboard Approve Part
 * this is called on Click of Approve button in Approve Dashbaord
 */

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.Approve = function(){
  var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {"access":"online"});
  var dataObject = new kony.sdk.dto.DataObject("approval_request");
  dataObject.addField("status_id","0");
  dataObject.addField("id", kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.getSelectedItemData().ID);
  dataObject.addField("employee_id",kony.apps.coe.ess.globalVariables.EmployeeID);
  var options = {"dataObject":dataObject};

   objSvc.partialUpdate(options, function(res) {
                        //Processing of fetched requests is done for SPA records
                        alert("Approved");
                        kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.removeAt(kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.selectedIndex);
                    }, function(err) {
                        kony.print("---------- Update error: " + JSON.stringify(err));
                    });
  
};

/**
 * @class Reject
 * this class for frmApprovalDashboard Reject Part
 * this is called on Click of Reject button in Approve Dashbaord
 */

kony.apps.coe.ess.Approvals.DashboardDesktop.
ApprovalRequestList.prototype.Reject = function(){
  var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {"access":"online"});
  var dataObject = new kony.sdk.dto.DataObject("approval_request");
  dataObject.addField("status_id","1");
  dataObject.addField("id", kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.getSelectedItemData().ID);
  dataObject.addField("employee_id",kony.apps.coe.ess.globalVariables.EmployeeID);
  var options = {"dataObject":dataObject};

   objSvc.partialUpdate(options, function(res) {
                        //Processing of fetched requests is done for SPA records
                        alert("Rejected");
                        kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.removeAt(kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.selectedIndex);
                    }, function(err) {
                        kony.print("---------- Update error: " + JSON.stringify(err));
                    });
  
};
