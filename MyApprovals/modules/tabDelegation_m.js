kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.DelegationTab = kony.apps.coe.ess.Approvals.DelegationTab || {};

/*
 *@class	:	DelegationTab
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI = function() {
    this.segEmpData = null;
  	this.seletedRowData=null;
    this.employeeList = null;
    this.isSentByMeClicked = true;
    this.isIndefiniteBtnChecked = false;
    this.contextData = null;
    this.stausLabelConfig = {
        "2": {
            text: kony.i18n.getLocalizedString("i18n.ess.myApprovals.active"),
            skin: "sknLblFC3fbd00FS28px"
        },
        "3": {
            text: kony.i18n.getLocalizedString("i18n.ess.myApprovals.stop"),
            skin: "sknLblFCf51d00FS28px"
        },
    };
    this.skinForStatusIcon = {
        "2": "sknflx3fbd00",
        "3": "sknflxf51d00"
    };
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.DelegationTab.UI}.
 * @description    This method will return instance of kony.apps.coe.ess.Approvals.DelegationTab.UI.
 *                 Instance will be created once; next time; will be returned same.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance--");
    try {
        if (kony.apps.coe.ess.Approvals.DelegationTab.UI.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.DelegationTab.UI.singletonObj;
        }
        kony.apps.coe.ess.Approvals.DelegationTab.UI.singletonObj = new kony.apps.coe.ess.Approvals.DelegationTab.UI();
        return kony.apps.coe.ess.Approvals.DelegationTab.UI.singletonObj;
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will call UI methods for selection of sent by me.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
onClickOfSentByMe = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.Actions.prototype.onClickOfSentByMe--");
    try {
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().selectSentByMe();
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.Actions.prototype.onClickOfSentByMe--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will call UI methods for selection of received.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
onClickOfReceived = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.prototype.onClickOfReceived--");
    try {
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().selectReceived();
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.prototype.onClickOfReceived--");
};
/**
 * @param          none.
 * @return         {function} callback - This will be called at the end of all tasks in this method.
 * @description    Navigation to received list will be done with animation.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
selectReceived = function(callback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.selectReceived--");
    frmDelegationTab.flxHighlight.setVisibility(false);
    frmDelegationTab.flxHighlightRecevied.setVisibility(true);
    frmDelegationTab.segRequestsListSentByMe.setVisibility(false);
    frmDelegationTab.segRequestsListReceived.setVisibility(true);
    this.isSentByMeClicked = false;
    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
        callback();
    } else {
        kony.print("callback paramter is null || undefined || not of function type.");
    }
    kony.print("-End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.selectReceived--");
};

/**
 * @param          none.
 * @return         {function} callback - This will be called at the end of all tasks in this method.
 * @description    Navigation to sent by me list will be done with animation.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
selectSentByMe = function(callback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.selectSentByMe--");
    frmDelegationTab.flxHighlight.setVisibility(true);
    frmDelegationTab.flxHighlightRecevied.setVisibility(false);
    frmDelegationTab.segRequestsListSentByMe.setVisibility(true);
    frmDelegationTab.segRequestsListReceived.setVisibility(false);
    this.isSentByMeClicked = true;
    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
        callback();
    } else {
        kony.print("callback paramter is null || undefined || not of function type.");
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.selectSentByMe--");
};
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setDataInList = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDataInList--");
    try {
        var WidgetsArray = ["imgSelection", "lblEmployeeName", "lblEmpId", "lblShortName"];
        var SelectionBehaviourConfig = {
            "imageIdentifier": "imgSelection",
            "selectedStateImage": "selected.png",
            "unselectedStateImage": "select.png"
        };
        //kony.apps.coe.ess.globalVariables.FrmDelegationEmployeeData = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR, SelectionBehaviourConfig, 3, flxEmployeeSelection, kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().segEmployeeSelectedItems, WidgetsArray);
        kony.apps.coe.ess.globalVariables.FrmDelegationEmployeeData = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR, SelectionBehaviourConfig, 3, flxEmployeeSelection, function() {}, WidgetsArray);

        frmDelegationTab.flxScrlImages.add(kony.apps.coe.ess.globalVariables.FrmDelegationEmployeeData.getDynamicSegment());
        kony.apps.coe.ess.globalVariables.FrmDelegationEmployeeData.WidgetDataMap = {
            "lblEmployeeName": "empName",
            "lblShortName": "shortName",
            "lblEmpId": "empId",
            "imgSelection": "imgSelection"
        };
        var query = "SELECT (First_Name || ' ' || Middle_Name || ' ' ||Last_Name ) as empName , Id as empId ,(CASE WHEN ([employee].[First_Name] IS NULL) THEN '' ELSE SUBSTR ([employee].[First_Name], 1, 1) END || '' || (CASE WHEN ([employee].[Last_Name] IS NULL) THEN '' ELSE SUBSTR ([employee].[Last_Name], 1, 1) END)) AS [shortName] from employee where IsEmployee = '0'";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(res) {
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().employeeList = res;
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().DynamicSegmentSetDataEmployee(res, kony.apps.coe.ess.globalVariables.FrmDelegationEmployeeData);
        }, function(error) {
            handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchApprovalRequest") + JSON.stringify(error)));
            kony.print("Entered into Error block in Employee Look up search");
        });
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDataInList--");
};
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
DynamicSegmentSetDataEmployee = function(Response, DynamicWidget) {
    try {
        //input validations
        if (isEmpty(DynamicWidget)) {
            handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.ErrorMessage.InvalidInput"));
            return;
        }

        for (var index in Response) {
            Response[index].empName = {
                "text": Response[index].empName
            }
            Response[index].empId = {
                "text": Response[index].empId
            }
            Response[index].shortName = {
                "text": Response[index].shortName
            }
        }
        DynamicWidget.setData(Response);
        //lazy loading
        var segmentConfiguration = {
            "MediaKeyAttribute": "Media_Id",
            "ImageWidgetName": "imgEmployee",
            "hideWidgetNames": []
        };
        //kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_DYNAMICSEGMENT, DynamicWidget, "Employee", "mediaEmployee", "", segmentConfiguration); 

    } catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.ErrorMessage.dynamicData")));
    }

};

/**
 * @param          none.
 * @return         none.
 * @description    This method show delegation details form and will selected item as context data.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
onRowClickOfSentByMeList = function(selectedItem) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.onRowClickOfSentByMeList--");
    try {
        selectedItem.isSentByMe = true;
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().setDataToDelegationDetails(selectedItem);

    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.onRowClickOfSentByMeList--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method show delegation details form and will selected item as context data.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
onRowClickOfReceivedList = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.onRowClickOfReceivedList--");
    try {
        var selectedItem = frmDelegationTab.segRequestsListReceived.selectedItems[0];
        selectedItem.isSentByMe = false;
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().setDataToDelegationDetails(selectedItem);
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.onRowClickOfReceivedList--");
};

kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDataToDelegationDetails = function(contextData) {
    try {
        if (contextData === null || contextData === undefined || typeof(contextData) !== "object") {
            throw "Error: Invalid context data";
        }
        if (contextData.groupId === null || contextData.groupId === undefined || String(contextData.groupId) === "") {
            throw "Error: Invalid groupId";
        }
        if (contextData.isSentByMe === null || contextData.isSentByMe === undefined || String(contextData.isSentByMe) === "") {
            throw "Error: Invalid isSentByMe";
        }
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().contextData = contextData;
        var query = "select dl.delegation_group_id as groupId, dl.status_id as statusId, dl.employee_id as empId, emp.First_Name as firstName, emp.Last_Name as lastName, rt.name as requestTypeName, dl.start_date as startDate, dl.end_date as endDate, dl.createdts as createdDate, dl.comments as comments from delegate dl " +
            " left join Employee emp on emp.Id = dl.employee_id " +
            " left join request_type rt on rt.id = dl.request_type_id " +
            " where dl.delegation_group_id = '" + contextData.groupId + "';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success, error);

        function success(data) {
            function makeItOfTwoDigits(num) {
                num = parseInt(num);
                if (isNaN(num)) {
                    return "";
                }
                if (num >= 0 && num <= 9) {
                    return "0" + num;
                }
                return String(num);
            }

            function formatRequestInterval(data) {
                var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var dateInterval = "";
                if (data.startDate !== undefined && data.startDate !== null && data.startDate !== "") {
                    dateInterval = makeItOfTwoDigits(data.startDate.substring(6, 8)) + " " + month[parseInt(data.startDate.substring(4, 6)) - 1];
                }
                if (data.endDate !== undefined && data.endDate !== null && data.endDate !== "") {
                    dateInterval += " - " + makeItOfTwoDigits(data.endDate.substring(6, 8)) + " " + month[parseInt(data.endDate.substring(4, 6)) - 1];
                }
                return dateInterval;
            }

            function eliminateDeletedRequestFromActive(data) {
                function isStatusSameForAll(data) {
                    var statusId = String(data[0].statusId).trim();
                    for (var i in data) {
                        if (String(data[i].statusId).trim() !== statusId) {
                            return false;
                        }
                    }
                    return true;
                }
                if (!isStatusSameForAll(data)) {
                    var tempArray = [];
                    for (var i in data) {
                        if (String(data[i].statusId).trim() === "2") {
                            tempArray.push(data[i]);
                        }
                    }
                    return tempArray;
                }
                return data;
            }
            data = eliminateDeletedRequestFromActive(data);
            var processedData = {};
            processedData = JSON.parse(JSON.stringify(data[0]));
            processedData.requestTypeName = "";
            for (var i in data) {
                processedData.requestTypeName += data[i].requestTypeName + ", ";
            }
            processedData.requestTypeName = processedData.requestTypeName.substring(0, processedData.requestTypeName.length - 2);
            processedData.requestInterval = formatRequestInterval(processedData);
            processedData.empName = String(processedData.firstName).trim() + " " + String(processedData.lastName).trim();
            processedData.createdDate = String(processedData.createdDate);
            if (processedData.createdDate !== null && processedData.createdDate !== undefined && processedData.createdDate !== "") {
                processedData.createdDate = (new Date().modifyByYYYYMMDDHHMMSS(processedData.createdDate)).toDDMMMYYHHmm();
            } else {
                processedData.createdDate = "";
            }
            if (processedData.comments !== null && processedData.comments !== undefined && String(processedData.comments).trim() !== "") {
                processedData.commentsData = [{
                    "imgUserImage": "people.png",
                    "lblName": processedData.firstName,
                    "lblChat": processedData.comments,
                    "lblAppliedOn": {
                        isVisible: false
                    },
                    "template": contextData.isSentByMe === true ? flxSelfComments : flxRequesterComments
                }];
            } else {
                processedData.commentsData = [];
            }

            delete processedData.firstName;
            delete processedData.lastName;
            delete processedData.startDate;
            delete processedData.endDate;
            delete processedData.comments;
            frmDelegationTab.lblUserName.text = processedData.empName;
            //frmDelegationTab.lblEmpNo.text = processedData.empId;
            frmDelegationTab.lblDelegationPeriodValue.text = processedData.requestInterval;
            frmDelegationTab.lblRequesedInfoDetail.text = processedData.requestTypeName;
            frmDelegationTab.lblRequestedOnDate.text = processedData.createdDate;
            frmDelegationTab.SegChat.setData(processedData.commentsData);

            if (contextData.isSentByMe) {
                kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().showStopAndEditBtn();
            } else {
                kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().hideStopAndEditBtn();
            }

            if (processedData.statusId === "2") {
                kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().enableStopAndEditBtn();
            } else {
                kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().disableStopAndEditBtn();
            }
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().setStatus(processedData.statusId);
        }
    } catch (err) {}


    function error(err) {}
};

/**
 * @param          {string} status - Status of request.
 * @return         none.
 * @description    This method will change UI as per status.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setStatus = function(status) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setStatus--");
    try {
        status = String(status);
        frmDelegationTab.flxStatusCircle.skin = this.skinForStatusIcon[status];
        frmDelegationTab.lblStatusName.skin = this.stausLabelConfig[status].skin;
        frmDelegationTab.lblStatusName.text = this.stausLabelConfig[status].text;
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setStatus--");
};



/**
 * @param          none.
 * @return         none.
 * @description    This will be called on click of indefinite toggle button.
 *                 This method is calling UI setting methods also.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
onClickOfIndefiniteBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfIndefiniteBtn--");

    function callback(isChecked) {
        if (isChecked) {
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().disableToDate();
        } else {
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().enableToDate();
        }
    }
    try {
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().toggleIndefiniteBtn(callback);
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfIndefiniteBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will set disabled UI for To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
disableToDate = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.disableToDate--");
    try {
        frmDelegationTab.flxToDate.setEnabled(false);
        frmDelegationTab.clndToDate.isVisible = false;
        // frmDelegationTab.lblToDateSelect.isVisible = true;
        frmDelegationTab.flxToDateDisable.isVisible = true;
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.disableToDate--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will set enabled UI for To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
enableToDate = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.enableToDate--");
    try {
        frmDelegationTab.flxToDateDisable.isVisible = false;
        // frmDelegationTab.lblToDateSelect.isVisible = false;
        frmDelegationTab.clndToDate.isVisible = true;
        frmDelegationTab.flxToDate.setEnabled(true);
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.enableToDate--");
};
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.onRowClickOfList = function(contextData) {
    kony.print("--onRowClickOfList--");
    try {
        //var contextData = kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().segEmpData;
        if (contextData === undefined || contextData === null||contextData === "") {
            contextData = kony.apps.coe.ess.globalVariables.FrmDelegationEmployeeData.SelectedItems[0];
        }
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().contextData = contextData;
        var query = "select rt.id as id, rt.name as Status_Name from request_type rt " +
            " where id NOT IN ('TIMEENTRY')";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success, error);
    } catch (err) {
        kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
    }

    function success(data) {
        kony.sdk.mvvm.log.info("success fetching data ", data);
        for (var i in data) {
            if (data[i].Status_Name !== null && data[i].Status_Name !== undefined && data[i].Status_Name !== "") {
                data[i].Status_Name = data[i].Status_Name.toLowerCase();
                data[i].Status_Name = data[i].Status_Name.charAt(0).toUpperCase() + data[i].Status_Name.substring(1, data[i].Status_Name.length);
            }
            data[i].imgSelectionIndicator = "select.png";
        }
        kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.WidgetDataMap = {
            "lblRequestType": "Status_Name",
            "imgSelectionIndicator": "imgSelectionIndicator"
        };
        var statusResponse = JSON.parse(JSON.stringify(data));
        for (var index in statusResponse) {
            statusResponse[index].Status_Name = {
                "text": statusResponse[index].Status_Name,
            };
            statusResponse[index].imgSelectionIndicator = {
                "src": "select.png",
            };
        }
        kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.setData(statusResponse);
        /// kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().DynamicSegmentSetDataEmployee(data,kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments);
        if (contextData.openInEditMode !== undefined && contextData.openInEditMode === true) {
            var query = "select dl.delegation_group_id as groupId, dl.employee_id as empId, dl.request_type_id as requestTypeId, dl.start_date as startDate, dl.end_date as endDate, dl.comments as comments from delegate dl " +
                " where dl.status_id = '2' " +
                " AND dl.delegation_group_id = '" + contextData.delegateGroupId + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success1, error1);
        } else {
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().setDataInCreateMode(contextData.empId.text);
        }

        function success1(res) {
            if (res === null || res === undefined || res.length <= 0) {
                return;
            }
            contextData.empId.text = res[0].empId;
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().contextData.empId.text = res[0].empId;
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().setDataInEditMode(res);
        }

        function error1(err) {
            handleError(err);
        }
      frmDelegationTab.flxEmployeeData.setVisibility(false);
    }

    function error(err) {
        //Error fetching data
        handleError(err);
        kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
    }
    frmDelegationTab.flxNewDelegationRequests.setVisibility(true);
};

/**
 * @param          {JsonObject} data - This contains all data. Which will be set in UI.
 * @return         none.
 * @description    This method will set data in UI for a delegation request. Which will be available for edit.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setDataInEditMode = function(data) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDataInEditMode--");
    try {
        if (data === null || data === undefined) {
            throw "Error in setDataInEditMode: data is null or undefined";
        }
        if (!Array.isArray(data)) {
            throw "Error in setDataInEditMode: Expected array of data as parameter.";
        }
        var tempGroupId = data[0].groupId;
        for (var i in data) {
            if (String(data[i].groupId) !== String(tempGroupId)) {
                throw "Error in setDataInEditMode: groupId should be same for all type of request";
            }
        }
        this.setCalendarWidgetsDateFormat(kony.i18n.getLocalizedString("i18n.ess.common.calendarDateFormat"));
        var requestTypes = [];
        for (var i in data) {
            requestTypes.push(data[i].requestTypeId);
        }
        var startDate = new Date(data[0].startDate.substring(0, 4), parseInt(data[0].startDate.substring(4, 6)) - 1, data[0].startDate.substring(6, 8));
        var endDate = new Date(data[0].endDate.substring(0, 4), parseInt(data[0].endDate.substring(4, 6)) - 1, data[0].endDate.substring(6, 8));
        this.setDateInFromCalendar(startDate);
        this.setLowerLimitOnToCalendar(startDate);
        this.setDateInToCalendar(endDate);
        this.disableChangeEmployeeBtn();
        frmDelegationTab.txtareaComments.text = String(data[0].comments).trim();
        var empData = kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().getEmployeeDetails(data[0].empId.text);
        this.setEmployeeData(empData);
        var selectedIndices = [];
        var segData = kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.Data;
        for (var i in segData) {
            if (requestTypes.indexOf(segData[i].id) >= 0) {
                selectedIndices.push(parseInt(i));
            }
        }
        // frmDelegationTab.segTypeOfRequestList.selectedRowIndices = [[0, selectedIndices]];
        //kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.SelectedIndexs= [[0, selectedIndices]];
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDataInEditMode--");
};

/**
 * @param          {String} dateFormat - This should contains a valid date format.
 * @return         none.
 * @description    This method will change date format for all calendar widgets in create form.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setCalendarWidgetsDateFormat = function(dateFormat) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setCalendarWidgetsDateFormat--");
    try {
        dateFormat = String(dateFormat); //parsing to String
        if (dateFormat === null || dateFormat === undefined || dateFormat === "") {
            dateFormat = "dd/MM/yyyy";
        }
        frmDelegationTab.clndFromDate.dateFormat = dateFormat; //assigning date format to from calendar
        frmDelegationTab.clndToDate.dateFormat = dateFormat; //assigning date format to from calendar
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setCalendarWidgetsDateFormat--");
};
/**
 * @param          {function} callback - This will called at the end. When all UI will be set.
 * @return         none.
 * @description    This method will toggle indefinite toggle button.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
toggleIndefiniteBtn = function(callback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.toggleIndefiniteBtn--");
    try {
        if (this.isIndefiniteBtnChecked === null) {
            throw "Error: isIndefiniteBtnChecked is null";
        } else if (this.isIndefiniteBtnChecked === false) {
            frmDelegationTab.imgIndefinitePeriod.src = "checked.png";
            this.isIndefiniteBtnChecked = true;
        } else if (this.isIndefiniteBtnChecked === true) {
            frmDelegationTab.imgIndefinitePeriod.src = "uncheck.png";
            this.isIndefiniteBtnChecked = false;
        } else {
            throw "Error: isIndefiniteBtnChecked is not type of Boolean";
        }
    } catch (err) {
        callback(null);
        handleError(err);
    }
    if (callback !== null && callback !== undefined && typeof(callback) === "function") {
        callback(this.isIndefiniteBtnChecked);
    } else {
        kony.print("callback paramter is null || undefined || not of function type.");
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.toggleIndefiniteBtn--");
};
/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set lower limit in To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setLowerLimitOnToCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setLowerLimitOnToCalendar--");
    try {
        if (dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
            throw "Error: dateObj is null || undefined || not instance of Date";
        }
        frmDelegationTab.clndToDate.validStartDate = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setLowerLimitOnToCalendar--");
};
/**
 * @param          none.
 * @return         none.
 * @description    This method will disable on click of change employee button.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
disableChangeEmployeeBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.disableChangeEmployeeBtn--");
    try {
        //frmDelegationTabe.flxSelectDelegatedApprover.setEnabled(false);
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.disableChangeEmployeeBtn--");
};

/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set date in To Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setDateInToCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDateInToCalendar--");
    try {
        if (dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
            throw "Error: dateObj is null || undefined || not instance of Date";
        }
        frmDelegationTab.clndToDate.date = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDateInToCalendar--");
};
/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set date in From Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setDateInFromCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDateInFromCalendar--");
    try {
        if (dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
            throw "Error: dateObj is null || undefined || not instance of Date";
        }
        frmDelegationTab.clndFromDate.date = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDateInFromCalendar--");
};

/**
 * @param          {JsonObject} empData - This contains all required data of a employee.
 * @return         none.
 * @description    This method will set data in UI for a employee.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setEmployeeData = function(empData) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setEmployeeData--");
    try {
        frmDelegationTab.lblEmployeeId.text = empData.empId.text;
        frmDelegationTab.lblEmployeeName.text = empData.empName.text;
        //frmDelegationTab.lblEmpDesignation.text = empData.empDesignation;
        //frmDelegationTab.lblEmpEmail.text = empData.email;
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setEmployeeData--");
};

/**
 * @param          {String} empId - This contains employee data.
 * @return         none.
 * @description    This method will set employee data in UI.
 *                 Reset from date with current date and to date fromDate + 6 days
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setDataInCreateMode = function(empId) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDataInCreateMode--");
    try {
        if (empId === null || empId === undefined || String(empId).trim() === "") {
            throw "Error in setDataInCreateMode: empId is null || undefined || empty string";
        }
        this.setCalendarWidgetsDateFormat(kony.i18n.getLocalizedString("i18n.ess.common.calendarDateFormat"));
        var newDate = new Date();
        this.setLowerLimitOnFromCalendar(newDate);
        //setting current date
        this.setDateInFromCalendar(newDate);
        this.setLowerLimitOnToCalendar(newDate);
        //setting fromDate + 6 days
        this.setDateInToCalendar(new Date(Date.parse(newDate) + 518400000));
        this.enableChangeEmployeeBtn();
        frmDelegationTab.txtareaComments.text = "";
        var empData = kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().getEmployeeDetails(empId);
        this.setEmployeeData(empData);
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setDataInCreateMode--");
};

kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
getEmployeeDetails = function(empId) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.getEmployeeDetails--");
    try {
        for (var i in kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().employeeList) {
            if (String(kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().employeeList[i].empId.text).trim() === String(empId).trim()) {
                return kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().employeeList[i];
            }
        }
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.getEmployeeDetails--");
};
/**
 * @param          none.
 * @return         none.
 * @description    This method will enable on click of change employee button.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
enableChangeEmployeeBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.enableChangeEmployeeBtn--");
    try {
        frmDelegationTab.flxSelectDelegatedApprover.setEnabled(true);
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.enableChangeEmployeeBtn--");
};
/**
 * @param          none.
 * @return         none.
 * @description    This method will enable stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
enableStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.enableStopAndEditBtn--");
    try {
        frmDelegationTab.flxBottomButtons.setEnabled(true);
        frmDelegationTab.flxBottomButtonsDisable.isVisible = false;
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.enableStopAndEditBtn--");
};
/**
 * @param          none.
 * @return         none.
 * @description    This method will disable stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
disableStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.disableStopAndEditBtn--");
    try {
        frmDelegationTab.flxBottomButtons.setEnabled(false);
      //#ifndef windows8
        frmDelegationTab.flxBottomButtonsDisable.isVisible = true;
      //#endif
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.disableStopAndEditBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will hide stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
hideStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.hideStopAndEditBtn--");
    try {
        frmDelegationTab.flxBottomButtons.isVisible = false;
        frmDelegationTab.flxComments.height = "49.38%";
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.hideStopAndEditBtn--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will show stop and edit button in UI.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
showStopAndEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.showStopAndEditBtn--");
    try {
        frmDelegationTab.flxBottomButtons.isVisible = true;
        frmDelegationTab.flxBottomButtons.setEnabled(true);
        frmDelegationTab.flxComments.height = "41.28%";
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.showStopAndEditBtn--");
};
/**
 * @param          {Date} dateObj - This is a Date object.
 * @return         none.
 * @description    This method will set lower limit in From Date calendar.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
setLowerLimitOnFromCalendar = function(dateObj) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setLowerLimitOnFromCalendar--");
    try {
        if (dateObj === null || dateObj === undefined || !(dateObj instanceof Date)) {
            throw "Error: dateObj is null || undefined || not instance of Date";
        }
        frmDelegationTab.clndFromDate.validStartDate = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.setLowerLimitOnFromCalendar--");
};

/**
 * @param          none.
 * @return         none.
 * @description    This will be called on click of submit button.
 *                 This method is collecting data and formating and calling backend methods to write in DB.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.onClickOfSubmit = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfSubmit--");
    try {
        var contextData = kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().contextData;
        var selectedItems = kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.SelectedItems;
        var values = [];
        var fromDate = frmDelegationTab.clndFromDate;
        var toDate = frmDelegationTab.clndToDate;
        var timeStamp = new Date();
        if (selectedItems === null || selectedItems === undefined || selectedItems.length <= 0) {
            //ToastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pleaseSelectRequestType"), 2000);
            alert("pleaseSelectRequestType");
            return;
        }
        timeStamp = timeStamp.toYYYMMDDHHMMSS();
        fromDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
        fromDate = fromDate.toYYYYMMDD("");
        if (!kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().isIndefinteBtnChecked()) {
            toDate = new Date(toDate.year, toDate.month - 1, toDate.day);
            toDate = toDate.toYYYYMMDD("");
        } else {
            toDate = "";
        }
        var employeeId = String(kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().contextData.empId.text);
        for (var i in selectedItems) {
            if (!kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().isIndefinteBtnChecked()) {
                values.push({
                    "employee_id": employeeId,
                    "delegator_id": kony.apps.coe.ess.globalVariables.EmployeeID,
                    "request_type_id": selectedItems[i].id,
                    "start_date": fromDate,
                    "end_date": toDate,
                    "status_id": "2",
                    "comments": String(frmDelegationTab.txtareaComments.text).trim(),
                    "createdts": timeStamp
                });
            } else {
                values.push({
                    "employee_id": employeeId,
                    "delegator_id": kony.apps.coe.ess.globalVariables.EmployeeID,
                    "request_type_id": selectedItems[i].id,
                    "start_date": fromDate,
                    "status_id": "2",
                    "comments": String(frmDelegationTab.txtareaComments.text).trim(),
                    "createdts": timeStamp
                });
            }
        }
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.myApprovals.validatingRequest"));
        if (contextData.openInEditMode !== undefined && contextData.openInEditMode === true) {
            for (var i in values) {
                values[i].delegation_group_id = contextData.delegateGroupId;
            }
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().isValidRequest(values, successCallbackForUpdateValidation.bind(this, values), error);
        } else {
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().isValidRequest(values, successCallbackForCreateValidation.bind(this, values), error);
        }
    } catch (err) {
        kony.application.dismissLoadingScreen();
        handleError(err);
    }

    function successCallbackForCreateValidation(values, isValid) {
        kony.application.dismissLoadingScreen();
        if (isValid) {
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.myApprovals.creatingRequest"));
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().createDelegationRequest(values, successCallbackForCreate, error);
        } else {
            //ToastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.delegationAlreadyExistsForTheSelectedPeriod"), 2000);
            alert("delegationAlreadyExistsForTheSelectedPeriod");
        }
    }

    function successCallbackForUpdateValidation(values, isValid) {
        kony.application.dismissLoadingScreen();
        if (isValid) {
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.myApprovals.creatingRequest"));
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().updateDelegationRequest(values, successCallbackForCreate, error);
        } else {
            //ToastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.delegationAlreadyExistsForTheSelectedPeriod"), 2000);
            alert("delegationAlreadyExistsForTheSelectedPeriod");
        }
    }

    function successCallbackForCreate(res) {
        kony.application.dismissLoadingScreen();
        frmDelegationTab.flxNewDelegationRequests.setVisibility(false);
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationTab");
        formController.loadDataAndShowForm();
    }

    function error(err) {
        kony.application.dismissLoadingScreen();
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Actions.prototype.onClickOfSubmit--");
};
/**
 * @param          none.
 * @return         {Boolean}.
 * @description    This method will check if indefinite button is checked or not.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
isIndefinteBtnChecked = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.isIdefinteChecked--");
    try {
        return this.isIndefiniteBtnChecked === true;
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.isIdefinteChecked--");
};

kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.segEmployeeSelectedItems = function(segName, segSelectedData) {
    kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().segEmpData = segSelectedData;
};

/**
 * @param          none.
 * @return         none.
 * @description    This method will backend methods to stop delegation request.
 *                 And It call some UI updating methods after delegation stopped.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
onClickOfStopBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfStopBtn--");
    try {
        var contextData = kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().contextData;
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().stopDelegationRequest(contextData.groupId, success, error);
    } catch (err) {
        handleError(err);
    }

    function success() {
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().disableStopAndEditBtn();
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().setStatus("3");
      	var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationTab");
    	formController.loadDataAndShowForm();
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
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
onClickOfEditBtn = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfEditBtn--");
    try {
        var delegateGroupId = kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().contextData.groupId;
        //showDelegationRequestCreateForm({"openInEditMode" : true, "delegateGroupId" : delegateGroupId});
        kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().onRowClickOfList({
            "openInEditMode": true,
            "delegateGroupId": delegateGroupId
        });
    } catch (err) {

    }
    kony.print("--End: kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Actions.prototype.onClickOfEditBtn--");
};

/**
 * @param          {String} groupId - It is group id for a delegation request.
 * @param          {function} successCallback - This will be called at successful execution.
 * @param          {function} errorCallback - This will be called, if an error occur in execution.
 * @return         none.
 * @description    This method will stop delegation request.
 */
kony.apps.coe.ess.Approvals.DelegationTab.UI.prototype.
stopDelegationRequest = function(groupId, successCallback, errorCallback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.stopDelegationRequest--");
    try {
        if (groupId === null || groupId === undefined || String(groupId) === "") {
            throw "Error in groupId: groupId is null || undefined || empty string";
        }
        com.kony.MYAPPROVALS.delegate.update("where delegation_group_id = '" + groupId + "' AND status_id = '2' ", {
            status_id: "3"
        }, successCallback, errorCallback, true);
    } catch (err) {
        handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.prototype.stopDelegationRequest--");
};