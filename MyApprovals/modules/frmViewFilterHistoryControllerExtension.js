/*
 * Controller Extension class for frmViewFilterHistory
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmViewFilterHistoryControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmViewFilterHistoryControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmViewFilterHistoryControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            this.$class.$superp.fetchData.call(this, success, error);
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
     * @memberof frmViewFilterHistoryControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
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
     * @memberof frmViewFilterHistoryControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
          	var data = this.getController().getContextData();
            var widgetDataMap = {
                "lblCreatedDate": "request_date",
                "lblName": "UserName",
                "lblPurpose": "categoryName",
                "lblApproved": "status_value",
                "lblIntials": "CreatedUserShortName",
                "lblRequestInfo": "RequestInfo",
                "imgType": "imgPurpose",
                "imgUser": "imgUser"
            };
            frmViewFilterHistory.segMentListView.widgetDataMap = widgetDataMap;
            frmViewFilterHistory.segMentListView.setData(data);
           //SetDataToUIDefault(frmViewFilterHistory);
          frmViewFilterHistory.reqval.text = "";
          frmViewFilterHistory.statusval.text = "";
            var areFiltersPresent = {"type": false, "status": false, "date": false};
        var selectedType = kony.apps.coe.ess.globalVariables.requestTypeSegements.SelectedItems;
          var selectedStatus = kony.apps.coe.ess.globalVariables.statusTypeSegments.SelectedItems;
        if (selectedType !== null && selectedType.length > 0) {
            if (selectedType[0].TYPE.text.toUpperCase() != 'ALL') {
                for (var i = 0; i < selectedType.length; i++) {
       				if(i == selectedType.length - 1){
       					frmViewFilterHistory.reqval.text += selectedType[i].TYPE.text.toUpperCase();
                        areFiltersPresent.type = true;
       				}
       				else{
                    	frmViewFilterHistory.reqval.text += selectedType[i].TYPE.text.toUpperCase() + ",";
                        areFiltersPresent.type = true;	
       				}
                }
            }
            else{
            	frmViewFilterHistory.reqval.text = kony.i18n.getLocalizedString("18n.ess.MyApprovals.frmRequestList.lblAll.text");
                areFiltersPresent.type = true;
            }
        }
          if (selectedStatus !== null && selectedStatus.length > 0) {
            if (selectedStatus[0].TYPE != 'All') {
                for (var i = 0; i < selectedStatus.length; i++) {
       				if(i == selectedStatus.length - 1){
       					frmViewFilterHistory.statusval.text += selectedStatus[i].Status_Name.text;
                        areFiltersPresent.status = true;
       				}
       				else{
                    	frmViewFilterHistory.statusval.text += selectedStatus[i].Status_Name.text + ",";
                        areFiltersPresent.status = true;	
       				}
                }
            }
        }
        if(frmViewFilterHistory.fromdate !== null && frmViewFilterHistory.fromdate !== undefined && frmViewFilterHistory.fromdate.day !== null && frmViewFilterHistory.fromdate.day !== undefined){
            frmViewFilterHistory.dateval.text = frmTabApprovalHistory.fromdate.day + "/" + frmTabApprovalHistory.fromdate.month + "/" + frmTabApprovalHistory.fromdate.year;
            areFiltersPresent.date = true;
        }
        if(frmViewFilterHistory.todate !== null && frmViewFilterHistory.todate !== undefined && frmViewFilterHistory.todate.day !== null && frmViewFilterHistory.todate.day !== undefined){
            frmViewFilterHistory.dateval.text += " - " + frmTabApprovalHistory.todate.day + "/" + frmTabApprovalHistory.todate.month + "/" + frmTabApprovalHistory.todate.year;
            areFiltersPresent.date = true;
        }
        if(areFiltersPresent.date === false && areFiltersPresent.status === false && areFiltersPresent.type === false){
            frmViewFilterHistory.flexCriterisData.setVisibility(false);
            frmViewFilterHistory.segMentListView.height = "100%";    
        }else{
            frmViewFilterHistory.flexCriterisData.setVisibility(true);
            frmViewFilterHistory.segMentListView.height = "80%";
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
     * @memberof frmViewFilterHistoryControllerExtension#
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
     * @memberof frmViewFilterHistoryControllerExtension#
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
     * @memberof frmViewFilterHistoryControllerExtension#
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