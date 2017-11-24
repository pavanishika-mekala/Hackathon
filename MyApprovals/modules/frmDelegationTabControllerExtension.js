/*
 * Controller Extension class for frmDelegationTab
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmDelegationTabControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmDelegationTabControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmDelegationTabControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.loadingForm"));
            kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().setDataInList();
            var query = "select dl.delegation_group_id as groupId, dl.status_id as statusId, dl.employee_id as empId, emp.First_Name as firstName, emp.Last_Name as lastName, rt.name as requestTypeName, dl.start_date as startDate, dl.end_date as endDate, dl.createdts as createdDate from delegate dl " +
                " left join Employee emp on emp.Id = dl.employee_id " +
                " left join request_type rt on rt.id = dl.request_type_id " +
                " where dl.delegator_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallbackSentByMe.bind(this), error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function successCallbackSentByMe(res) {
            var query = "select dl.delegation_group_id as groupId, dl.status_id as statusId, dl.delegator_id as empId, emp.First_Name as firstName, emp.Last_Name as lastName, rt.name as requestTypeName, dl.start_date as startDate, dl.end_date as endDate, dl.createdts as createdDate from delegate dl " +
                " left join Employee emp on emp.Id = dl.delegator_id " +
                " left join request_type rt on rt.id = dl.request_type_id " +
                " where dl.employee_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success.bind(this, res), error);
        }

        function success(dataSentByMe, dataReceived) {
            kony.sdk.mvvm.log.info("success fetching data dataSentByMe", dataSentByMe);
            kony.sdk.mvvm.log.info("success fetching data dataReceived", dataReceived);
            scopeObj.getController().processData({
                "dataSentByMe": dataSentByMe,
                "dataReceived": dataReceived
            });
        }

        function error(err) {
            //Error fetching data
            handleError(err);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmDelegationTabControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
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

        function numberOfDays(data) {
            var startDate = data.startDate;
            var endDate = data.endDate;
            if (endDate !== null && endDate !== undefined && endDate !== "" && startDate !== null && startDate !== undefined && startDate !== "") {
                startDate = new Date(startDate.substring(0, 4), Number(startDate.substring(4, 6)) - 1, startDate.substring(6, 8));
                endDate = new Date(endDate.substring(0, 4), Number(endDate.substring(4, 6)) - 1, endDate.substring(6, 8));
                var days = String(((Date.parse(endDate) - Date.parse(startDate)) / 86400000) + 1).split(".")[0];
                return days + " " + kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Days.text");
            }
            return "";
        }
        var comparatorForSortingWithCreatedDate = function(a, b) {
            return String(b.createdDate).localeCompare(String(a.createdDate));
        };

        function getStatusTextWithSkin(id) {
            switch (String(id)) {
                case "2":
                    return {
                        text: kony.i18n.getLocalizedString("i18n.ess.myApprovals.active"),
                        skin: "sknLblFC3fbd00FS28px"
                    };
                case "3":
                    return {
                        text: kony.i18n.getLocalizedString("i18n.ess.myApprovals.stop"),
                        skin: "sknLblFCf51d00FS28px"
                    };
                default:
                    return {
                        isVisible: false
                    };
            }
        }

        function getStatusIconSkin(id) {
            switch (String(id)) {
                case "2":
                    return {
                        skin: "sknflx3fbd00"
                    };
                case "3":
                    return {
                        skin: "sknflxf51d00"
                    };
                default:
                    return {
                        isVisible: false
                    };
            }
        }

        function eliminateDeletedRequestFromActive(groupedData) {
            function isStatusSameForAll(data) {
                var statusId = String(data[0].statusId).trim();
                for (var i in data) {
                    if (String(data[i].statusId).trim() !== statusId) {
                        return false;
                    }
                }
                return true;
            }
            for (var i in groupedData) {
                if (!isStatusSameForAll(groupedData[i])) {
                    var tempArray = [];
                    for (var j in groupedData[i]) {
                        if (String(groupedData[i][j].statusId).trim() === "2") {
                            tempArray.push(groupedData[i][j]);
                        }
                    }
                    groupedData[i] = tempArray;
                }
            }
            return groupedData;
        }
        try {
            var scopeObj = this;
            var dataSentByMeGrouped = eliminateDeletedRequestFromActive(kony.apps.coe.makeGroups("groupId", data.dataSentByMe));
            var dataReceivedGrouped = eliminateDeletedRequestFromActive(kony.apps.coe.makeGroups("groupId", data.dataReceived));
            data.dataSentByMe = [];
            data.dataReceived = [];
            var i, tempData;
            for (i in dataSentByMeGrouped) {
                tempData = dataSentByMeGrouped[i][0];
                if (dataSentByMeGrouped[i].length > 1) {
                    tempData.requestTypeName = tempData.requestTypeName + ", " + parseInt(dataSentByMeGrouped[i].length - 1) + " more";
                }
                data.dataSentByMe.push(tempData);
            }
            for (i in dataReceivedGrouped) {
                tempData = dataReceivedGrouped[i][0];
                if (dataReceivedGrouped[i].length > 1) {
                    tempData.requestTypeName = tempData.requestTypeName + ", " + parseInt(dataReceivedGrouped[i].length - 1) + " more";
                }
                data.dataReceived.push(tempData);
            }
            data.dataSentByMe.sort(comparatorForSortingWithCreatedDate);
            data.dataReceived.sort(comparatorForSortingWithCreatedDate);
            for (i in data.dataSentByMe) {
                data.dataSentByMe[i].requestInterval = formatRequestInterval(data.dataSentByMe[i]);
                data.dataSentByMe[i].empName = String(data.dataSentByMe[i].firstName).trim() + " " + String(data.dataSentByMe[i].lastName).trim();
                data.dataSentByMe[i].days = numberOfDays(data.dataSentByMe[i]);
                data.dataSentByMe[i].lblStatus = getStatusTextWithSkin(data.dataSentByMe[i].statusId);
                data.dataSentByMe[i].flxStatusIcon = getStatusIconSkin(data.dataSentByMe[i].statusId);
                data.dataSentByMe[i].createdDate = String(data.dataSentByMe[i].createdDate);
                if (data.dataSentByMe[i].createdDate !== null && data.dataSentByMe[i].createdDate !== undefined && data.dataSentByMe[i].createdDate !== "") {
                    data.dataSentByMe[i].createdDate = (new Date().modifyByYYYYMMDDHHMMSS(data.dataSentByMe[i].createdDate)).toDDMMMYYHHmm();
                } else {
                    data.dataSentByMe[i].createdDate = "";
                }

                delete data.dataSentByMe[i].firstName;
                delete data.dataSentByMe[i].lastName;
                delete data.dataSentByMe[i].startDate;
                delete data.dataSentByMe[i].endDate;
            }
            for (i in data.dataReceived) {
                data.dataReceived[i].requestInterval = formatRequestInterval(data.dataReceived[i]);
                data.dataReceived[i].empName = String(data.dataReceived[i].firstName).trim() + " " + String(data.dataReceived[i].lastName).trim();
                data.dataReceived[i].days = numberOfDays(data.dataReceived[i]);
                data.dataReceived[i].lblStatus = getStatusTextWithSkin(data.dataReceived[i].statusId);
                data.dataReceived[i].flxStatusIcon = getStatusIconSkin(data.dataReceived[i].statusId);
                data.dataReceived[i].createdDate = String(data.dataReceived[i].createdDate);
                if (data.dataReceived[i].createdDate !== null && data.dataReceived[i].createdDate !== undefined && data.dataReceived[i].createdDate !== "") {
                    data.dataReceived[i].createdDate = (new Date().modifyByYYYYMMDDHHMMSS(data.dataReceived[i].createdDate)).toDDMMMYYHHmm();
                } else {
                    data.dataReceived[i].createdDate = "";
                }

                delete data.dataReceived[i].firstName;
                delete data.dataReceived[i].lastName;
                delete data.dataReceived[i].startDate;
                delete data.dataReceived[i].endDate;
            }
            this.getController().bindData(data);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmDelegationTabControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.getController().getFormModel().formatUI();
            frmDelegationTab.segRequestsListSentByMe.widgetDataMap = frmDelegationTab.segRequestsListReceived.widgetDataMap = {
                "lblEmpName": "empName",
                "imgEmp": "empImage",
                "lblEmpId": "empId",
                "lblDetail": "requestInterval",
                "lblDetailType": "days",
                "lblSumittedDate": "createdDate",
                "lblRequestTypes": "requestTypeName",
                "lblStatus": "lblStatus",
                "flxStatusIcon": "flxStatusIcon",
              	"lblTypeOfRequestHeader" : "lblTypeOfRequestHeader"
            };
            frmDelegationTab.segRequestsListSentByMe.setData(data.dataSentByMe);
            frmDelegationTab.segRequestsListReceived.setData(data.dataReceived);
            var WidgetsArray = ["lblRequestType", "imgRequestType"];
            var SelectionBehaviourConfig = {
                "imageIdentifier": "imgRequestType",
                "selectedStateImage": "select_green.png",
                "unselectedStateImage": "select.png"
            };
            kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 4, flxFilterFormat, function() {}, WidgetsArray);
            frmDelegationTab.flxRequestStatusValues.add(kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.getDynamicSegment());
            kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.WidgetDataMap = {
                "lblRequestType": "Status_Name",
                "imgRequestType": "imgRequestType"
            };
            var statusResponse = JSON.parse(JSON.stringify(kony.apps.coe.ess.globalVariables.statusResponse));
            for (index in statusResponse) {
                statusResponse[index].Status_Name = {
                    "text": statusResponse[index].Status_Name,
                };
                statusResponse[index].imgRequestType = {
                    "src": "select.png",
                };
            }
            kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments.setData(statusResponse);
 			frmDelegationTab.segRequestsListSentByMe.selectedRowIndex=[0,0];
            if(frmDelegationTab.segRequestsListSentByMe.data !== null) {
              kony.apps.coe.ess.Approvals.DelegationTab.UI.getInstance().onRowClickOfSentByMeList(frmDelegationTab.segRequestsListSentByMe.data[0]);
            }
			if(frmDelegationTab.segRequestsListSentByMe.data === null) {
				frmDelegationTab.flxRight.setVisibility(false);
              	frmDelegationTab.flxBg.setVisibility(true);
			}
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmDelegationTabControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmDelegationTabControllerExtension#
     */
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method shows form.
     * @memberof frmDelegationTabControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    }
});