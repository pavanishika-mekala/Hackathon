/*
 * Controller Extension class for frmDelegationRequestCreate
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmDelegationRequestCreateControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmDelegationRequestCreateControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmDelegationRequestCreateControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            var contextData = this.getController().getContextData();
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().contextData = contextData;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.loadingForm"));
            var query = "select rt.id as id, rt.name as name from request_type rt " +
                " where id NOT IN ('TIMEENTRY')";
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
     * @memberof frmDelegationRequestCreateControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            for(var i in data) {
                if(data[i].name !== null && data[i].name !== undefined && data[i].name !== "") {
                    switch(data[i].name) {
                        case "PURCHASEORDER":
                        	data[i].name = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.PurchaseOrder");
							break;
                        case 'PURCHASEREQUISITION':
                        	data[i].name = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.PurchaseRequisition");
                			break;
                        case "WORKORDER":
                        	data[i].name = kony.i18n.getLocalizedString("i18n.ess.frmApprovalRequestDetail.Title.WorkOrder");
							break;

                    }
                }
                data[i].imgSelectionIndicator = "tick_inactive.png";
            }
            this.getController().bindData(data);
            return data;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmDelegationRequestCreateControllerExtension#
     */
    bindData: function(data) {
        try {
            var scopeObj = this;
            var contextData = kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().contextData;
            frmDelegationRequestCreate.segTypeOfRequestList.widgetDataMap = {"lblName" : "name", "imgSelectionIndicator" : "imgSelectionIndicator"};
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.getController().getFormModel().formatUI();
           //this code has to be removed for getting timesheet change result to data
          	var result=[]
          	for(index in data){
              if(kony.string.equalsIgnoreCase(data[index]["name"],"LEAVE")){
                result.push(data[index]);
              }
            }
           //this code has to be removed for getting timesheet change result to data
            frmDelegationRequestCreate.segTypeOfRequestList.setData(result);
            if(contextData.openInEditMode === true) {
                var query = "select dl.delegation_group_id as groupId, dl.employee_id as empId, dl.request_type_id as requestTypeId, dl.start_date as startDate, dl.end_date as endDate, dl.comments as comments from delegate dl " + 
                    " where dl.status_id = '2' " +
                    " AND dl.delegation_group_id = '" + contextData.delegateGroupId +"';";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, success, error);
            } else {
                kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().setDataInCreateMode(contextData.empId);
                scopeObj.getController().showForm();
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(res) {
            if(res === null || res === undefined || res.length <= 0) {
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                return;
            }
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.Backend.getInstance().contextData.empId = res[0].empId;
            kony.apps.coe.ess.Approvals.DelegationRequestCreate.UI.getInstance().setDataInEditMode(res);
            scopeObj.getController().showForm();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
      
        function error(err) {
            handleError(err);
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmDelegationRequestCreateControllerExtension#
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
     * @memberof frmDelegationRequestCreateControllerExtension#
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
     * @memberof frmDelegationRequestCreateControllerExtension#
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