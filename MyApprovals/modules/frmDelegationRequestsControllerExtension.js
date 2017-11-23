/*
 * Controller Extension class for frmDelegationRequests
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmDelegationRequestsControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmDelegationRequestsControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmDelegationRequestsControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.loadingForm"));
          //  this.$class.$superp.fetchData.call(this, success, error);
         var responsedelegate;
		 var responseemployee;
          var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {
							"access": "online"
						});
					var dataObject = new kony.sdk.dto.DataObject("delegate");
					var options = {
						"dataObject": dataObject
					};
        //  objSvc.fetch(options,success,error);
          objSvc.fetch(options,
						function (res) {
						//Processing of fetched requests is done for SPA records
						responsedelegate = res.records;
						kony.print("Delegate Records fetch" + JSON.stringify(responsedelegate));
						var objSvc2 = kony.sdk.getCurrentInstance().getObjectService("Employee", {
								"access": "online"
							});
						var dataObject2 = new kony.sdk.dto.DataObject("Employee");
						var options2 = {
							"dataObject": dataObject2
						};
						objSvc2.fetch(options2,
							function (res) {
							//Processing of fetched requests is done for SPA records
							responseemployee = res.records;
                          	kony.print("Delegate Records fetch" + JSON.stringify(responseemployee));
                          for(var h=0;h<responsedelegate.length;h++)
                            {
                              for(var j=0;j<responseemployee.length;j++){
                                if(responsedelegate[h].employee_id===responseemployee[j].Id){
                                  responsedelegate[h].First_Name=responseemployee[j].First_Name;
                                  //responsedelegate[h].Last_Name=responseemployee[j].Last_Name;
                                  break;                           
                                  
                                }
                              }
                              
                            }
					scopeObj.getController().processData(responsedelegate);
                    kony.print("---Before Process of Delegate" + JSON.stringify(responsedelegate));
						}, function (err) {
							kony.print("---------- dataObject error: " + JSON.stringify(err));
						});
					}, function (err) {
						kony.print("---------- dataObject error: " + JSON.stringify(err));
					});
			
			
          
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", JSON.stringify(response));
            kony.print("---- Deligation Data: " + JSON.stringify(response));
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
     * @memberof frmDelegationRequestsControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            //var data = data.records;
            kony.print("---- Deligation Data in process data: " + JSON.stringify(data));
            var processedData = kony.apps.coe.ess.myApprovals.frmDeligationDW.processData(data);//this.$class.$superp.processData.call(this, data);
            
          //  scopeObj.getController().bindData(this, processedData);
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
     * @memberof frmDelegationRequestsControllerExtension#
     */
    bindData: function(data) {
        try {
           
           kony.print("---- Bind Data : " + JSON.stringify(data));
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
          
              var datamap = {

                "lblEmpName": "UserName",
                "imgTime": "requestTypeImage",
                "lblSumittedDate": "RequestDate",
                "lblEmpId": "EmployeeID",
                "lblDetail": "TimeRequest",
                "lblDetailType": "Days",
                "lblSeparator": "Separator",
             
            }
            formmodel.setViewAttributeByProperty("segAllEmp", "widgetDataMap", datamap);
            formmodel.setViewAttributeByProperty("segAllEmp", "data", data[0]);
          
            var datamap1 = {

                "lblEmpName": "UserName",
                "imgTime": "requestTypeImage",
                "lblSumittedDate": "RequestDate",
                "lblEmpId": "DelegateID",
                "lblDetail": "TimeRequest",
                "lblDetailType": "Days",
              "lblSeparator": "Separator",
             
            }
            formmodel.setViewAttributeByProperty("segSentToMe", "widgetDataMap", datamap1);
            formmodel.setViewAttributeByProperty("segSentToMe", "data", data[1]);
          //  this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
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
     * @memberof frmDelegationRequestsControllerExtension#
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
     * @memberof frmDelegationRequestsControllerExtension#
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
     * @memberof frmDelegationRequestsControllerExtension#
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