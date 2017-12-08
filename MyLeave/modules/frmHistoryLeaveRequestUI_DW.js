/** 
 *  @author     Shantam Agarwal
 *  @category   Business Logic.	
 *  @desc       Contains UI related code for frmHistoryLeaveRequestDW
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW = kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW || {};

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    initializes UI for Leave History Form
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.initializeUI = function(responseLeaveData, responseTypeData, fullData, isClearingFilters) {
    var responseStatusData = fullData.Employee.Status;
    if (isClearingFilters !== true) {
        frmHistoryLeaveRequestDW.destroy();
    }
    var currDate = new Date();
    frmHistoryLeaveRequestDW.calFromDateFilter.dateComponents = [currDate.getDate(), currDate.getMonth() + 1, currDate.getFullYear()];
    frmHistoryLeaveRequestDW.calToDateFilter.dateComponents = [currDate.getDate(), currDate.getMonth() + 1, currDate.getFullYear()];
    var filterObject = new kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.filterObject(responseLeaveData, responseTypeData, responseStatusData, fullData);
    frmHistoryLeaveRequestDW.flxApplyFiltersButton.onClick = function() {
        filterObject.filterLeaves();
    }
    kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.setStatusActions(filterObject);
    frmHistoryLeaveRequestDW.flxClearButton.onClick = function() {
        filterObject.clearFilters(responseLeaveData, responseTypeData, fullData);
    }
    kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.populateLeavesInSegment(responseLeaveData, responseTypeData, responseStatusData, responseTypeData, responseStatusData, fullData, null, null)
    if (isClearingFilters !== true) {
        kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.generateRows(responseTypeData, kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.generateFilterSwitches.bind(this, filterObject));
    } else {
        kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.resetFilters(responseTypeData, filterObject);
    }
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    sets contexts for date pickers
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.setCalendarContexts = function() {
    var context1 = {
        "widget": frmHistoryLeaveRequestDW.flxDatePickerFrom,
        "anchor": "bottom"
    };
    frmHistoryLeaveRequestDW.calFromDateFilter.setContext(context1);
    var context2 = {
        "widget": frmHistoryLeaveRequestDW.flxDatePickerTo,
        "anchor": "bottom"
    };
    frmHistoryLeaveRequestDW.calToDateFilter.setContext(context2);
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    returns a switch for leave types acc to params
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.getNewLeaveTypeSwitch = function(leaveTypeData, index, filterObject) {
    var newSwitchFlex = new kony.ui.FlexContainer({
        "id": "flxLeaveTypeSwitch" + index,
        "top": "20dp",
        "left": "20dp",
        "width": "155dp",
        "height": "40dp",
        "zIndex": 1,
        "isVisible": true,
        "clipBounds": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "sknFlxBGfbfaf9Op100ShadowBorder1pxRoundedDW",
        onClick: kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.onClickLeaveTypeSwitchActivate.bind(this, leaveTypeData[index], index, filterObject)
    }, {
        "padding": [0, 0, 0, 0]
    }, {});
    var switchLabel = new kony.ui.Label({
        id: "lblLeaveType" + index,
        skin: "sknLbl8a8a8b14pxRomanDW",
        left: "10%",
        centerY: "50%",
        isVisible: true,
    }, {
        "padding": [0, 0, 0, 0]
    }, {});
    switchLabel.text = leaveTypeData[index].name;
    newSwitchFlex.add(switchLabel);
    var switchImage = new kony.ui.Image2({
        id: "imgCheckbox" + index,
        isVisible: true,
        src: "unchecksmall.png",
        width: "14dp",
        right: "10%",
        height: "14dp",
        centerY: "50%"
    }, {}, {});
    newSwitchFlex.add(switchImage);
    return newSwitchFlex;

}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    generate rows for leave type switches
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.generateRows = function(leaveTypeData, callback) {
    var rowCount = Math.ceil(leaveTypeData.length / 3);
    for (var i = 0; i < rowCount; i++) {
        var newRowFlex = new kony.ui.FlexContainer({
            "id": "flxFilterRow" + i,
            "top": "0dp",
            "left": "0dp",
            "width": "100%",
            "height": "64dp",
            "zIndex": 1,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
            "skin": "slFbox"
        }, {
            "padding": [0, 0, 0, 0]
        }, {});
        if (i != 0) {
            newRowFlex.height = "55dp"
        }
        frmHistoryLeaveRequestDW.flxFiltersContainer.addAt(newRowFlex, 2 + i);
    }
    callback(leaveTypeData);
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    generate leave type switches for filters
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.generateFilterSwitches = function(filterObject,leaveTypeData){
	var currentRow = 0;
	for(var i=0; i<leaveTypeData.length; i++){
		if(i%3 === 0 && i!= 0){
			currentRow++;
		}
		frmHistoryLeaveRequestDW["flxFilterRow"+currentRow].add(kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.getNewLeaveTypeSwitch(leaveTypeData,i, filterObject));
		kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.onClickLeaveTypeSwitchDeactivate(leaveTypeData[i], i, filterObject);
	}
	frmHistoryLeaveRequestDW.lblSelectAll.onTouchStart = function(){
		for(var i=0; i<leaveTypeData.length; i++){
			if(frmHistoryLeaveRequestDW["imgCheckbox"+i].src !== "checksmall.png"){
				frmHistoryLeaveRequestDW["flxLeaveTypeSwitch"+i].onClick();
			}
		}
	}
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    activates a swtich
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.onClickLeaveTypeSwitchActivate = function(selectedLeaveTypeData, selectedIndex, filterObject) {
    frmHistoryLeaveRequestDW["flxLeaveTypeSwitch" + selectedIndex].skin = "sknFlxBG2ebaeeOp100ShadowBorder1pxRoundedDW";
    frmHistoryLeaveRequestDW["lblLeaveType" + selectedIndex].skin = "sknLblffffff14pxRomanDW";
    frmHistoryLeaveRequestDW["imgCheckbox" + selectedIndex].src = "checksmall.png";
    filterObject.selectedLeaveTypes.push(selectedLeaveTypeData);
    frmHistoryLeaveRequestDW["flxLeaveTypeSwitch" + selectedIndex].onClick = kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.onClickLeaveTypeSwitchDeactivate.bind(this, selectedLeaveTypeData, selectedIndex, filterObject);
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    deactivates a switch
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.onClickLeaveTypeSwitchDeactivate = function(selectedLeaveTypeData, selectedIndex, filterObject) {
    frmHistoryLeaveRequestDW["flxLeaveTypeSwitch" + selectedIndex].skin = "sknFlxBGfbfaf9Op100ShadowBorder1pxRoundedDW";
    frmHistoryLeaveRequestDW["lblLeaveType" + selectedIndex].skin = "sknLbl8a8a8b14pxRomanDW";
    frmHistoryLeaveRequestDW["imgCheckbox" + selectedIndex].src = "unchecksmall.png";
    for (var i = 0; i < filterObject.selectedLeaveTypes.length; i++) {
        if (filterObject.selectedLeaveTypes[i].id === selectedLeaveTypeData.id) {
            filterObject.selectedLeaveTypes.splice(i, 1);
        }
    }
    frmHistoryLeaveRequestDW["flxLeaveTypeSwitch" + selectedIndex].onClick = kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.onClickLeaveTypeSwitchActivate.bind(this, selectedLeaveTypeData, selectedIndex, filterObject);
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    sets actions for status switches
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.setStatusActions = function(filterObject) {
    var approvedActivate = function(filterObject) {
        filterObject.selectedLeaveStatus.push("0");
        frmHistoryLeaveRequestDW.flxApprovedSwitch.skin = "sknFlx05c8af1Op100Bor1pxR5pxOp0DW";
        frmHistoryLeaveRequestDW.lblApproved.skin = "sknLblffffff14pxRomanDW";
        frmHistoryLeaveRequestDW.imgApprovedCheckbox.src = "checksmall.png";
        frmHistoryLeaveRequestDW.flxApprovedSwitch.onClick = approvedDeactivate.bind(this, filterObject);
    }
    var approvedDeactivate = function(filterObject) {
        for (var i = 0; i < filterObject.selectedLeaveStatus.length; i++) {
            if (filterObject.selectedLeaveStatus[i] === "0") {
                filterObject.selectedLeaveStatus.splice(i, 1);
            }
        }
        frmHistoryLeaveRequestDW.flxApprovedSwitch.skin = "sknFlxBGfbfaf9Op100ShadowBorder1pxRoundedDW";
        frmHistoryLeaveRequestDW.lblApproved.skin = "sknLbl6a777b14pxRomanDW";
        frmHistoryLeaveRequestDW.imgApprovedCheckbox.src = "unchecksmall.png";
        frmHistoryLeaveRequestDW.flxApprovedSwitch.onClick = approvedActivate.bind(this, filterObject);
    }

    var pendingActivate = function(filterObject) {
        filterObject.selectedLeaveStatus.push("2");
        frmHistoryLeaveRequestDW.flxPendingSwitch.skin = "sknFlx05c8af1Op100Bor1pxR5pxOp0DW";
        frmHistoryLeaveRequestDW.lblPending.skin = "sknLblffffff14pxRomanDW";
        frmHistoryLeaveRequestDW.imgPendingCheckbox.src = "checksmall.png";
        frmHistoryLeaveRequestDW.flxPendingSwitch.onClick = pendingDeactivate.bind(this, filterObject);
    }
    var pendingDeactivate = function(filterObject) {
        for (var i = 0; i < filterObject.selectedLeaveStatus.length; i++) {
            if (filterObject.selectedLeaveStatus[i] === "2") {
                filterObject.selectedLeaveStatus.splice(i, 1);
            }
        }
        frmHistoryLeaveRequestDW.flxPendingSwitch.skin = "sknFlxBGfbfaf9Op100ShadowBorder1pxRoundedDW";
        frmHistoryLeaveRequestDW.lblPending.skin = "sknLblfcc35614pxRomanDW";
        frmHistoryLeaveRequestDW.imgPendingCheckbox.src = "uncheckyellow.png";
        frmHistoryLeaveRequestDW.flxPendingSwitch.onClick = pendingActivate.bind(this, filterObject);
    }

    var rejectedActivate = function(filterObject) {
        filterObject.selectedLeaveStatus.push("1");
        frmHistoryLeaveRequestDW.flxRejectedSwitch.skin = "sknFlx05c8af1Op100Bor1pxR5pxOp0DW";
        frmHistoryLeaveRequestDW.lblRejected.skin = "sknLblffffff14pxRomanDW";
        frmHistoryLeaveRequestDW.imgRejectedCheckbox.src = "checksmall.png";
        frmHistoryLeaveRequestDW.flxRejectedSwitch.onClick = rejectedDeactivate.bind(this, filterObject);
    }
    var rejectedDeactivate = function(filterObject) {
        for (var i = 0; i < filterObject.selectedLeaveStatus.length; i++) {
            if (filterObject.selectedLeaveStatus[i] === "1") {
                filterObject.selectedLeaveStatus.splice(i, 1);
            }
        }
        frmHistoryLeaveRequestDW.flxRejectedSwitch.skin = "sknFlxBGfbfaf9Op100ShadowBorder1pxRoundedDW";
        frmHistoryLeaveRequestDW.lblRejected.skin = "sknLblff6e5f14pxRomanDW";
        frmHistoryLeaveRequestDW.imgRejectedCheckbox.src = "uncheckred.png";
        frmHistoryLeaveRequestDW.flxRejectedSwitch.onClick = rejectedActivate.bind(this, filterObject);
    }

    var sentBackActivate = function(filterObject) {
        filterObject.selectedLeaveStatus.push("4");
        frmHistoryLeaveRequestDW.flxSentBackSwitch.skin = "sknFlx05c8af1Op100Bor1pxR5pxOp0DW";
        frmHistoryLeaveRequestDW.lblSentback.skin = "sknLblffffff14pxRomanDW";
        frmHistoryLeaveRequestDW.imgSentBackCheckbox.src = "checksmall.png";
        frmHistoryLeaveRequestDW.flxSentBackSwitch.onClick = sentBackDeactivate.bind(this, filterObject);
    }
    var sentBackDeactivate = function(filterObject) {
        for (var i = 0; i < filterObject.selectedLeaveStatus.length; i++) {
            if (filterObject.selectedLeaveStatus[i] === "4") {
                filterObject.selectedLeaveStatus.splice(i, 1);
            }
        }
        frmHistoryLeaveRequestDW.flxSentBackSwitch.skin = "sknFlxBGfbfaf9Op100ShadowBorder1pxRoundedDW";
        frmHistoryLeaveRequestDW.lblSentback.skin = "sknLbl1C739314pxRomanDW";
        frmHistoryLeaveRequestDW.imgSentBackCheckbox.src = "unchecksmall.png";
        frmHistoryLeaveRequestDW.flxSentBackSwitch.onClick = sentBackActivate.bind(this, filterObject);
    }
    frmHistoryLeaveRequestDW.flxApprovedSwitch.onClick = approvedActivate.bind(this, filterObject);
    frmHistoryLeaveRequestDW.flxPendingSwitch.onClick = pendingActivate.bind(this, filterObject);
    frmHistoryLeaveRequestDW.flxRejectedSwitch.onClick = rejectedActivate.bind(this, filterObject);
    frmHistoryLeaveRequestDW.flxSentBackSwitch.onClick = sentBackActivate.bind(this, filterObject);
    approvedDeactivate(filterObject);
    pendingDeactivate(filterObject);
    rejectedDeactivate(filterObject);
    sentBackDeactivate(filterObject);
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    filter object class
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.filterObject = function(leaveDataArg, leaveTypeArg, statusDataArg, fullData) {

    this.selectedLeaveTypes = [];
    this.allLeaveTypeData = leaveTypeArg;
    this.allStatusData = statusDataArg;
    this.selectedLeaveStatus = [];
    this.leaveData = [];
    this.filteredLeaveDataByDate = [];
    this.filteredLeaveDataByType = [];
    this.filteredLeaveData = [];
    this.fromDateFilter;
    this.toDateFilter;
    for (var i = 0; i < leaveDataArg.length; i++) {
        if (leaveDataArg[i].employee_id == kony.apps.coe.ess.globalVariables.employeeId) {
            this.leaveData.push(leaveDataArg[i]);
        }
    }
    this.setDateFilters = function() {
        this.fromDateFilter = new Date(frmHistoryLeaveRequestDW.calFromDateFilter.dateComponents[2], frmHistoryLeaveRequestDW.calFromDateFilter.dateComponents[1] - 1, frmHistoryLeaveRequestDW.calFromDateFilter.dateComponents[0] + 1);
        this.toDateFilter = new Date(frmHistoryLeaveRequestDW.calToDateFilter.dateComponents[2], frmHistoryLeaveRequestDW.calToDateFilter.dateComponents[1] - 1, frmHistoryLeaveRequestDW.calToDateFilter.dateComponents[0]);
    }
    this.filterLeavesByStatus = function() {
        if (this.selectedLeaveStatus.length === 0) {
            for (var i = 0; i < this.filteredLeaveDataByType.length; i++) {
                this.filteredLeaveData.push(this.filteredLeaveDataByType[i]);
                if (i === this.filteredLeaveDataByType.length - 1) {
                    kony.print(this.filteredLeaveData);
                    kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.populateLeavesInSegment(this.filteredLeaveData, this.allLeaveTypeData, this.allStatusData, this.selectedLeaveTypes, this.selectedLeaveStatus, fullData, this.fromDateFilter, this.toDateFilter);
                }
            }
        } else {
            for (var i = 0; i < this.filteredLeaveDataByType.length; i++) {
                for (var j = 0; j < this.selectedLeaveStatus.length; j++) {
                    if (this.filteredLeaveDataByType[i].status_id === this.selectedLeaveStatus[j]) {
                        this.filteredLeaveData.push(this.filteredLeaveDataByType[i]);
                    }
                }
                if (i === this.filteredLeaveDataByType.length - 1) {
                    kony.print(this.filteredLeaveData);
                    kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.populateLeavesInSegment(this.filteredLeaveData, this.allLeaveTypeData, this.allStatusData, this.selectedLeaveTypes, this.selectedLeaveStatus, fullData, this.fromDateFilter, this.toDateFilter);
                }
            }
        }
    }
    this.filterLeavesByType = function() {
        if (this.selectedLeaveTypes.length === 0) {
            for (var i = 0; i < this.filteredLeaveDataByDate.length; i++) {
                this.filteredLeaveDataByType.push(this.filteredLeaveDataByDate[i]);
                if (i === this.filteredLeaveDataByDate.length - 1) {
                    this.filterLeavesByStatus();
                }
            }
        } else {
            for (var i = 0; i < this.filteredLeaveDataByDate.length; i++) {
                for (var j = 0; j < this.selectedLeaveTypes.length; j++) {
                    if (this.filteredLeaveDataByDate[i].leave_type_id === this.selectedLeaveTypes[j].id) {
                        this.filteredLeaveDataByType.push(this.filteredLeaveDataByDate[i]);
                    }
                }
                if (i === this.filteredLeaveDataByDate.length - 1) {
                    this.filterLeavesByStatus();
                }
            }
        }
    }
    this.filterLeavesByDate = function() {
        for (var i = 0; i < this.leaveData.length; i++) {
            var leaveStartArr = Date.breakBackendDate(this.leaveData[i].start_date);
            var leaveEndArr = Date.breakBackendDate(this.leaveData[i].end_date);
            var leaveStart = new Date(parseInt(leaveStartArr[2]), parseInt(leaveStartArr[1]) - 1, parseInt(leaveStartArr[0]));
            var leaveEnd = new Date(parseInt(leaveEndArr[2]), parseInt(leaveEndArr[1]) - 1, parseInt(leaveEndArr[0]));
            if (this.fromDateFilter <= leaveStart && this.toDateFilter >= leaveEnd) {
                this.filteredLeaveDataByDate.push((this.leaveData[i]));
            }
            if (i === this.leaveData.length - 1) {
                this.filterLeavesByType();
            }
        }
    }
    this.filterLeaves = function() {
        this.filteredLeaveDataByDate = [];
        this.filteredLeaveDataByType = [];
        this.filteredLeaveData = [];
        this.setDateFilters();
        this.filterLeavesByDate();
    }
    this.clearFilters = function(responseLeaveData, responseTypeData, fullData) {
        kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.initializeUI(responseLeaveData, responseTypeData, fullData, true);
    }
}


/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    self explanatory
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.resetFilters = function(leaveTypeData, filterObject) {
    for (var i = 0; i < leaveTypeData.length; i++) {
        kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.onClickLeaveTypeSwitchDeactivate(leaveTypeData[i], i, filterObject);
    }
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    populates filtered/unfiltered leaves in segment
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.populateLeavesInSegment = function(leaveData, leaveTypeData, statusData, selectedLeaveTypes, selectedLeaveStatus, fullData, fromDateFilter, toDateFilter) {

    frmHistoryLeaveRequestDW.segPendingLeaves.removeAll();
    frmHistoryLeaveRequestDW.segPendingLeaves.widgetDataMap = {
        "flxDurationContainer": "flxDurationContainer",
        "flxSegLeaveList": "flxSegLeaveList",
        "flxViewDetails": "flxViewDetails",
        "imgRightArrow": "imgRightArrow",
        "lblAppliedOn": "lblAppliedOn",
        "lblDateRange": "lblDateRange",
        "lblDummyDivider": "lblDummyDivider",
        "lblLeaveDuration": "lblLeaveDuration",
        "lblLeaveType": "lblLeaveType",
        "lblStatusButton": "lblStatusButton"
    };
    var filteredLeaveData = [];
    var segData = [];
    for (var i = 0; i < leaveData.length; i++) {
        if (leaveData[i].employee_id !== kony.apps.coe.ess.globalVariables.employeeId) {
            continue;
        }
        if (leaveData[i].start_date === "00000000") {
            continue;
        }
        filteredLeaveData.push(leaveData[i]);
        var newRow = {};
        newRow["lblAppliedOn"] = leaveData[i].createdts.slice(6, 8) + " " + Date.getMonthMapNumberToMonth[leaveData[i].createdts.slice(4, 6)] + " " + leaveData[i].createdts.slice(0, 4) + " " + leaveData[i].createdts.slice(8, 10) + ":" + leaveData[i].createdts.slice(10, 12);;
        newRow["lblDateRange"] = Date.breakBackendDate(leaveData[i].start_date)[0] + " " + (Date.getMonthMapNumberToMonth[Date.breakBackendDate(leaveData[i].start_date)[1]]).slice(0, 3) + " - " + Date.breakBackendDate(leaveData[i].end_date)[0] + " " + (Date.getMonthMapNumberToMonth[leaveData[i].end_date.slice(4, 6)]).slice(0, 3);
        newRow["lblDummyDivider"] = " ";
        newRow["lblLeaveDuration"] = leaveData[i].no_of_hours + " Hours";
        for (var j = 0; j < leaveTypeData.length; j++) {
            if (leaveData[i].leave_type_id === leaveTypeData[j].id) {
                newRow["lblLeaveType"] = leaveTypeData[j].name;
                break;
            }
        }
        if (leaveData[i].status_id === "0") {
            newRow["lblStatusButton"] = {
                "skin": "sknLbl6a777b14pxRomanDW",
                "text": "Approved"
            };
            newRow["flxViewDetails"] = {
                "skin": "sknFlxBorder1px05C8AF14Rad50pxDW"
            };
            newRow["imgRightArrow"] = "chevrongreen.png";
        } else if (leaveData[i].status_id === "1") {
            newRow["lblStatusButton"] = {
                "skin": "sknLblff6e5f14pxRomanDW",
                "text": "Rejected"
            };
            newRow["flxViewDetails"] = {
                "skin": "sknFlxBorder1pxff6e5f14Rad50pxDW"
            };
            newRow["imgRightArrow"] = "chevronred.png";
        } else if (leaveData[i].status_id === "2") {
            newRow["lblStatusButton"] = {
                "skin": "sknLblfcc35614pxRomanDW",
                "text": "Pending"
            };
            newRow["flxViewDetails"] = {
                "skin": "sknFlxBorder1pxfcb234Rad50pxDW"
            };
            newRow["imgRightArrow"] = "chevronyellow.png";
        } else if (leaveData[i].status_id === "4") {
            newRow["lblStatusButton"] = {
                "skin": "sknLbl1C739314pxRomanDW",
                "text": "Sent Back"
            };
            newRow["flxViewDetails"] = {
                "skin": "sknFlxBorder1px1C739314Rad50pxDW"
            };
            newRow["imgRightArrow"] = "chevronblueright.png";
        }
        segData.push(newRow);
    }
    frmHistoryLeaveRequestDW.segPendingLeaves.setData(segData);
    frmHistoryLeaveRequestDW.segPendingLeaves.onRowClick = function(widgetRef, sectionIndex, rowIndex, selectedState) {
        frmPendingLeaveRequestsDW.lblLeaveCalendarBreadCrumb.text = "History";
        frmPendingLeaveRequestsDW.lblPendingLeaveRequestsBreadcrumb.text = "Filtered Leave Requests"
        frmPendingLeaveRequestsDW.flxFilter.setVisibility(true);
        frmPendingLeaveRequestsDW.segPendingLeaves.top = "101dp";
        frmPendingLeaveRequestsDW.segPendingLeaves.height = "600dp";
        frmPendingLeaveRequestsDW.forceLayout();
        if (fromDateFilter === null) {
            frmPendingLeaveRequestsDW.lblDateRange.text = "-";
        } else {
            var fromMonth = (fromDateFilter.getMonth() + 1) > 9 ? (fromDateFilter.getMonth() + 1).toString() : "0" + (fromDateFilter.getMonth() + 1).toString();
            var toMonth = (toDateFilter.getMonth() + 1) > 9 ? (toDateFilter.getMonth() + 1).toString() : "0" + (toDateFilter.getMonth() + 1).toString();
            var date = fromDateFilter.getDate() + " " + Date.getMonthMapNumberToMonth[fromMonth].slice(0, 3) + " '" + fromDateFilter.getFullYear().toString().slice(2, 4) + " - " + toDateFilter.getDate() + " " + Date.getMonthMapNumberToMonth[toMonth].slice(0, 3) + " '" + toDateFilter.getFullYear().toString().slice(2, 4);
            frmPendingLeaveRequestsDW.lblDateRange.text = date;
        }
        for (var i = 0; i < selectedLeaveTypes.length; i++) {
            if (i == 0) {
                frmPendingLeaveRequestsDW.lblLeaveTypeFilter.text = selectedLeaveTypes[i].name;
                continue;
            }
            frmPendingLeaveRequestsDW.lblLeaveTypeFilter.text = frmPendingLeaveRequestsDW.lblLeaveTypeFilter.text + ", " + selectedLeaveTypes[i].name;
        }

        for (var i = 0; i < selectedLeaveStatus.length; i++) {
            var requestStatus = " ";
            if (i == 0) {
                switch (selectedLeaveStatus[i]) {
                    case "0":
                        {
                            requestStatus = "Approved";
                            break;
                        }
                    case "2":
                        {
                            requestStatus = "Pending";
                            break;
                        }
                    case "1":
                        {
                            requestStatus = "Rejected";
                            break;
                        }
                    case "4":
                        {
                            requestStatus = "Sent Back";
                            break;
                        }

                }
                frmPendingLeaveRequestsDW.lblRequestStatus.text = requestStatus;
                continue;
            }
            switch (selectedLeaveStatus[i]) {
                case "0":
                    {
                        requestStatus = "Approved";
                        break;
                    }
                case "2":
                    {
                        requestStatus = "Pending";
                        break;
                    }
                case "1":
                    {
                        requestStatus = "Rejected";
                        break;
                    }
                case "4":
                    {
                        requestStatus = "Sent Back";
                        break;
                    }

            }
            frmPendingLeaveRequestsDW.lblRequestStatus.text = frmPendingLeaveRequestsDW.lblRequestStatus.text + ", " + requestStatus;
        }
        kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.initializeUI(filteredLeaveData, fullData, false, selectedLeaveStatus);
        frmPendingLeaveRequestsDW.show();
        var ind = frmHistoryLeaveRequestDW.segPendingLeaves.selectedRowIndex[1];
        kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.OnClick(frmPendingLeaveRequestsDW.segPendingLeaves, 0, ind);
    }
}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    show form
 */
kony.apps.coe.ess.myLeave.frmHistoryLeaveRequestDW.showForm = function() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmHistoryLeaveRequestDW");
    formController.loadDataAndShowForm();
}