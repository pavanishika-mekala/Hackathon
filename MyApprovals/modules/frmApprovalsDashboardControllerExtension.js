/*
 * Controller Extension class for frmApprovalsDashboard
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmApprovalsDashboardControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmApprovalsDashboardControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmApprovalsDashboardControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
             kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
            //Incase of SPA
                var responseRecords;
		        var responseemployee;
                kony.apps.coe.ess.Approvals.spa.formController = this;
                    var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", { "access": "online" })
                    var dataObject = new kony.sdk.dto.DataObject("approval_request");
                    var options = { "dataObject": dataObject };
                    objSvc.fetch(options, function(res) {
                         responseRecords = res.records;
                       kony.print("---Data of Approval Request:" + JSON.stringify(responseRecords));
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
                          for(var h=0;h<responseRecords.length;h++)
                            {
                              for(var j=0;j<responseemployee.length;j++){
                                if(responseRecords[h].employee_id===responseemployee[j].Id){
                                 
                                  responseRecords[h].attribute[1].value=responseemployee[j].First_Name;
                                  responseRecords[h].attribute[2].value=responseemployee[j].Last_Name;
                                  break;                           
                                  
                                }
                              }
                              
                            }
                        //Processing of fetched requests is done for SPA records
                       kony.apps.coe.ess.Approvals.spa.ProcessSpaRecords(responseRecords);
                       kony.print("---------- before Modify: " + JSON.stringify(responseRecords));
                    }, function(err) {
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

//         function success(response) {
//             alert(JSON.stringify(response));
//             kony.sdk.mvvm.log.info("success fetching data ", response);
//             scopeObj.getController().processData(response);
//         }

//         function error(err) {
//             //Error fetching data
//             kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
//             kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
//             var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
//             kony.sdk.mvvm.log.error(exception.toString());
//         }
    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmApprovalsDashboardControllerExtension#
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
     * @memberof frmApprovalsDashboardControllerExtension#
     */
    bindData: function(data) {
        try {
          
          data = data.ApprovalRequestData;
          data.sort(function(a, b) {
              var pr = {
                "LEAVE" : 1,
                "TIMESHEET" : 2
              };
              var c = pr[a.request_type];
              var d = pr[b.request_type];
              if(!c) {
                  c = 99999999999;
              }
              if(!d) {
                  d = 99999999999;
              }
              return c - d;
          });
          var x=[];
      for (var  y = 0;y < data.length; y++) {   
        if(Number(data[y].isLater) === 0 && Number(data[y].StatusId) === 2) 
          x.push(data[y]);
      }
        
        var i;

for (i = 0;i < data.length; i++) {
	if (data[i].attributejson) {
		for (var attr in data[i].attributejson) {
			data[i][attr] = data[i].attributejson[attr];
         
		}
		delete data[i].attributejson;
	}
	kony.print("---- Modified Data:  "+JSON.stringify(data[i]));
}
          kony.print("---- data of bindData: " + JSON.stringify(x));
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
         
          var rowTemp = frmApprovalsDashboard.flxAllRequests;
          var colTemp = frmApprovalsDashboard.flxTimeRequest;
          rowTemp.removeAll();
          kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj = new kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList(frmApprovalsDashboard.flxApprovalRequestList, rowTemp, colTemp);
          kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.widgetsDataMap = {
              "lblEmpNameTime" : "UserName",
              "lblTimeSheet" : "category",
              "flxDetailsTime" : "typeskin",
              "lblDateTimesheet" : "RequestDate",
              "lblDueTimeTimesheet" : "DateDue",
              "lblDueDateTimesheet" : "dueDate",
              "lblPeriodTimeSheet" : "RequestInfo", 
              "lblReqTypeTime" : "requestTypeText",
              "lblDetailType" : "AdditionalData",
              "lblApproveTime" : "btnApprove",
              "lblRejectTime" : "btnReject",
              "lblSkipTime" : "btnSkip",
              "lblReasonTimesheet" : "Comments",
              "imgTime" : "typeimage",
              "lblDelegate": "DelegateText",
            
            
          };
          kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.propertiesToSet = {
            "lblEmpNameTime" : "text",
            "lblTimeSheet" : "text",
            "lblDateTimesheet" : "text",
            "lblDueTimeTimesheet" : "text",
            "lblDueDateTimesheet" : "text",
            "lblPeriodTimeSheet" : "text", 
            "lblReqTypeTime" : "text",
            "lblDetailType" : "text",
            "lblApproveTime" : "text",
            "lblRejectTime" : "text",
            "lblSkipTime" : "text",
            "lblReasonTimesheet" : "text",
            "flxDetailsTime" : "skin",
            "lblDelegate":"text",
          };
         
          kony.apps.coe.ess.Approvals.DashboardDesktop.ApprovalRequestList.Obj.setData(x);
      frmApprovalsDashboard.lblNoOfLeaves.text=kony.apps.coe.ess.Approvals.DashboardDesktop.requestsCount.lblNoOfLeaves;
	  frmApprovalsDashboard.lblNoOfExpense.text=kony.apps.coe.ess.Approvals.DashboardDesktop.requestsCount.lblNoOfExpense;
	  frmApprovalsDashboard.lblNoOfTimeReq.text=kony.apps.coe.ess.Approvals.DashboardDesktop.requestsCount.lblNoOfTimeReq;
	

      //     this.$class.$superp.bindData.call(this, data);
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
     * @memberof frmApprovalsDashboardControllerExtension#
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
     * @memberof frmApprovalsDashboardControllerExtension#
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
     * @memberof frmApprovalsDashboardControllerExtension#
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