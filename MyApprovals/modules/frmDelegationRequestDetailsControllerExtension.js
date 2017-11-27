/*
 * Controller Extension class for frmDelegationRequestDetails
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmDelegationRequestDetailsControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmDelegationRequestDetailsControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmDelegationRequestDetailsControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.loadingForm"));
            var contextData = this.getController().getContextData();
            if(contextData === null || contextData === undefined || typeof(contextData) !== "object") {
                throw "Error: Invalid context data";
            }
            if(contextData.groupId === null || contextData.groupId === undefined || String(contextData.groupId) === "") {
                throw "Error: Invalid groupId";
            }
            if(contextData.isSentByMe === null || contextData.isSentByMe === undefined || String(contextData.isSentByMe) === "") {
                throw "Error: Invalid isSentByMe";
            }
            kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.Backend.getInstance().contextData = contextData;
            var query = "select dl.delegation_group_id as groupId, dl.status_id as statusId, dl.employee_id as empId, emp.First_Name as firstName, emp.Last_Name as lastName, rt.name as requestTypeName, dl.start_date as startDate, dl.end_date as endDate, dl.createdts as createdDate, dl.comments as comments from delegate dl " + 
                " left join Employee emp on emp.Id = dl.employee_id " +
                " left join request_type rt on rt.id = dl.request_type_id " + 
                " where dl.delegation_group_id = '" + contextData.groupId + "' group by rt.name";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.getController().processData(response);
        }

        function error(err) {
            //Error fetching data
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
     * @memberof frmDelegationRequestDetailsControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        function makeItOfTwoDigits(num) {
            num = parseInt(num);
            if(isNaN(num)) {
                return "";
            }
            if(num >= 0 && num <= 9) {
                return "0" + num;
            }
            return String(num);
        }
        function formatRequestInterval(data) {
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dateInterval = "";
            if(data.startDate !== undefined && data.startDate !== null && data.startDate !== "") {
                dateInterval = makeItOfTwoDigits(data.startDate.substring(6, 8)) + " " + month[parseInt(data.startDate.substring(4, 6)) - 1];
            }
            if(data.endDate !== undefined && data.endDate !== null && data.endDate !== "") {
                dateInterval += " - " + makeItOfTwoDigits(data.endDate.substring(6, 8)) + " " + month[parseInt(data.endDate.substring(4, 6)) - 1];
            }
            return dateInterval;
        }
        function eliminateDeletedRequestFromActive(data) {
            function isStatusSameForAll(data) {
                var statusId = String(data[0].statusId).trim();
                for(var i in data) {
                    if(String(data[i].statusId).trim() !== statusId) {
                        return false;
                    }
                }
                return true;
            }
            if(!isStatusSameForAll(data)) {
                var tempArray = [];
                for(var i in  data) {
                    if(String(data[i].statusId).trim() === "2") {
                        tempArray.push(data[i]);
                    }
                }
                return tempArray;
            }
            return data;
        }
        try {
            var scopeObj = this;
            data = eliminateDeletedRequestFromActive(data);
            var contextData = this.getController().getContextData();
            var processedData = {};
            processedData = JSON.parse(JSON.stringify(data[0]));
            processedData.requestTypeName = "";
            for(var i in data) {
                processedData.requestTypeName += data[i].requestTypeName + ", ";
            }
            processedData.requestTypeName = processedData.requestTypeName.substring(0, processedData.requestTypeName.length - 2);
            processedData.requestInterval = formatRequestInterval(processedData);
            processedData.empName = String(processedData.firstName).trim() + " " + String(processedData.lastName).trim();
            processedData.createdDate = String(processedData.createdDate);
            if(processedData.createdDate !== null && processedData.createdDate !== undefined && processedData.createdDate !== "") {
                processedData.createdDate = (new Date().modifyByYYYYMMDDHHMMSS(processedData.createdDate)).toDDMMMYYHHmm();
            } else {
                processedData.createdDate = "";
            }
            if(processedData.comments !== null && processedData.comments !== undefined && String(processedData.comments).trim() !== "") {
                processedData.commentsData = [{
                    "imgUserImage" : "people.png",
                    "lblName" : processedData.firstName,
                    "lblChat" : processedData.comments,
                    "lblAppliedOn" : {isVisible : false},
                    "template" : contextData.isSentByMe === true ? flxSelfComments : flxRequesterComments
                }];
            } else {
                processedData.commentsData = [];
            }
            
            delete processedData.firstName;
            delete processedData.lastName;
            delete processedData.startDate;
            delete processedData.endDate;
            delete processedData.comments;  
          
            this.getController().bindData(processedData);
            return [processedData];
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
     * @memberof frmDelegationRequestDetailsControllerExtension#
     */
    bindData: function(data) {
        try {
            var contextData = this.getController().getContextData();
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.getController().getFormModel().formatUI();
            frmDelegationRequestDetails.lblUserName.text = data.empName;
            frmDelegationRequestDetails.lblEmpNo.text = data.empId;
            frmDelegationRequestDetails.lblDelegationPeriodValue.text = data.requestInterval;
            frmDelegationRequestDetails.lblRequesedInfoDetail.text = data.requestTypeName;
          	var requestedDate = new Date(data.createdDate);
            frmDelegationRequestDetails.lblRequestedOnDate.text = requestedDate.toDDmmmYY();
            frmDelegationRequestDetails.SegChat.setData(data.commentsData);
            
            if(contextData.isSentByMe) {
                kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance().showStopAndEditBtn();
            } else {
                kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance().hideStopAndEditBtn();
            }
          
            if(data.statusId === "2") {
                kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance().enableStopAndEditBtn();
            } else {
                kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance().disableStopAndEditBtn();
            }
            kony.apps.coe.ess.Approvals.frmDelegationRequestDetails.UI.getInstance().setStatus(data.statusId);
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
     * @memberof frmDelegationRequestDetailsControllerExtension#
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
     * @memberof frmDelegationRequestDetailsControllerExtension#
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
     * @memberof frmDelegationRequestDetailsControllerExtension#
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