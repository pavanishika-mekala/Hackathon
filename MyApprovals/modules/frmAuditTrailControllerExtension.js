/*
 * Controller Extension class for frmAuditTrail
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmAuditTrailControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmAuditTrailControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /**
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config
     * @memberof frmAuditTrailControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            var requestId = kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.RequestDetials.ID;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
            //BBE-126 History list completed with approved request by someone else
//           	var query="select aa.*,emp1.First_Name as First_Name from approval_audit aa left outer join approval_request ar on aa.request_id=ar.id left outer join employee emp1 on aa.employee_id=emp1.id left outer join employee emp2 on ar.employee_id=emp2.id "+
//             "left outer join employee emp3 on emp2.manager_id=emp3.id where aa.requestId='"+requestId + "';";
          	//quering audit data.
            var query = "select aa.*, emp.First_Name as First_Name,emp.Last_Name as Last_Name from approval_audit aa left join Employee emp on aa.employee_id = emp.Id where aa.request_id = '" + requestId + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallbackForAuditRecords, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

		function successCallbackForAuditRecords(res) {
            for(var i in res) {
                res[i].templateType = 0;
				if (res[i].First_Name === null || res[i].First_Name== "null"|| res[i].First_Name === "" || res[i].First_Name === undefined) {
                    res[i].First_Name=" ";
				}else{
					res[i].First_Name = res[i].First_Name+ " " +res[i].Last_Name;
				}
            }
            //quering comments data.
            var query = "select rn.createdts as createdts, ra.status_id as status_id, emp.First_Name as First_Name, emp.Last_Name as Last_Name,Group_concat(attribute.value)      AS Attributevalue, Group_concat(attribute.attribute_def_id)  AS AttributeNAME, rn.comment as comments from approval_request ar left join request_approver ra on ra.approval_id = ar.id left join Employee emp on ra.approver_id = emp.Id left join request_note rn on rn.approval_id = ar.id left join attribute on rn.approval_id=attribute.approval_id where ar.id = '" + requestId + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallbackForComments.bind(scopeObj, res), error);
        }

        function successCallbackForComments(data, res) {
            for(var i in res) {
                res[i].templateType = 1;
              var tempJSON;
              if(res[i].AttributeNAME != undefined && res[i].AttributeNAME !== null && res[i].AttributeNAME != "null") {
                  tempJSON = res[i].AttributeNAME.returnCombinationInJsonFormat(res[i].Attributevalue, ",");
              } else {
                tempJSON = {};
              }
              if (res[i].First_Name === null || res[i].First_Name== "null"|| res[i].First_Name === "" || res[i].First_Name === undefined) {
                if(tempJSON.hasOwnProperty('FirstNameAttributeDef') && tempJSON.hasOwnProperty('LastNameAttributeDef'))
                 res[i].First_Name=tempJSON.FirstNameAttributeDef+" "+tempJSON.LastNameAttributeDef;
                else
                  res[i].First_Name="";
              }else{
                res[i].First_Name = res[i].First_Name+ " " +res[i].Last_Name;
              }
                data.push(res[i]);
            }
            //quering data if timesheet is pending.
            var query = "select ar.createdts as createdts, ra.status_id as status_id, emp.First_Name as First_Name,emp.Last_Name as Last_Name from approval_request ar left join request_approver ra on ra.approval_id = ar.id left join Employee emp on ra.approver_id = emp.Id where ar.id = '" + requestId + "';";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallbackForPendingTimesheet.bind(scopeObj, data), error);
        }

        function successCallbackForPendingTimesheet(data, res) {
            for(var i in res) {
                if(res[i].status_id === "2") {
                  	if(res[i].First_Name == null){
                      res[i].First_Name="";
                      res[i].Last_Name="";
                    }
                    data.push({
                        createdts : res[i].createdts,
                        status_id : res[i].status_id,
                        First_Name : res[i].First_Name+" "+res[i].Last_Name,
                        description : "",
                        templateType : 0
                    });
                }
            }
            success(data);
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
     * @memberof frmAuditTrailControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        var statusImages = {
            "0": "approved_audit.png",
			"1": "rejected_audit.png",
			"2": "pending_audit.png",
			"3": "canceled_audit.png",
			"4": "",
			"5": "saved_audit.png",
			"6": "system_error_audit.png",
			"7": "submitted_audit.png"
        };
      	var status_keys = {
            "0": kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Approved"),
			"1": kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Rejected"),
			"2": kony.i18n.getLocalizedString("i18n.ess.myApprovals.frmTabListview.Pending"),
			"3": kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Cancelled"),
			"4": "",
			"5": "Saved",
			"6": "Error",
			"7": "Submitted"
        };
        try {
            var scopeObj = this;
            var processedData = [];
            //sorting increasing order of created timestamp
            data.sort(function(a, b) {
                return a.createdts !== null ? a.createdts.localeCompare(b.createdts) : false;
            });
            for(var i in data) {
                //parsing to string
                var dateStr = data[i].createdts !== null ? String(data[i].createdts) : "";
                var date = "";
                //checking condition for invalid date
                if(dateStr !== null && dateStr !== undefined && dateStr !== "" && dateStr.toLowerCase() !== "null") {
                    //converting from date string (e.g. 20170212020456) to date object
                    date = new Date(dateStr.substring(0, 4), parseInt(dateStr.substring(4, 6)) - 1, dateStr.substring(6, 8), dateStr.substring(8, 10), dateStr.substring(10, 12), dateStr.substring(12, 16));
                    //converting to required date format i.e. DD MMM HH mm am/pm.
                    date = date.toHHMMMHHmm();
                }
                //assigning different template for comments and audit record.
                if(parseInt(data[i].templateType) === 0) {
                    data[i].status_id = String(data[i].status_id);
                    var status = "";
                    if(data[i].status_id !== null && data[i].status_id !== undefined && data[i].status_id.toLowerCase() !== "null" && data[i].status_id !== "") {
                        // getting status value using status id
                        status = kony.apps.coe.ess.globalVariables.Status.idToStr[data[i].status_id];
                        status = status.charAt(0).toUpperCase() + status.substring(1, status.length).toLowerCase();
                        status=status_keys[data[i].status_id];
                    }
                    processedData.push({
                        lblEventName : status,
                        lblEventDesc : data[i].description,
                        lblPersonName : data[i].First_Name,
                        lblDate : date,
                        imgStatus : statusImages[data[i].status_id],
                        lblBottomLine : {isVisible : true},
                        lblVerticalLineTop : {isVisible : true},
                        lblVerticalLineBottom : {text : "", isVisible : (i >= data.length - 1 ? false : true)}
                    });
                } else if(parseInt(data[i].templateType) === 1) {
                    processedData.push({
                        lblEventName : kony.i18n.getLocalizedString("i18n.ess.common.userComment"),
                        lblEventDesc : data[i].comments,
                        lblPersonName : data[i].First_Name,
                        lblDate : date,
                        imgStatus : "comment_audit.png",
                        lblVerticalLineTop : {text : "", isVisible : true},
                        lblBottomLine : {text : "", isVisible : true},
                        lblVerticalLineBottom : {text : "", isVisible : (i >= data.length - 1 ? false : true)}
                    });
                }

            }
            this.getController().bindData(processedData);
            return processedData;
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
     * @memberof frmAuditTrailControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            //setting data to segment
            frmAuditTrail.segAuditTrailList.setData(data);
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
     * @memberof frmAuditTrailControllerExtension#
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
     * @memberof frmAuditTrailControllerExtension#
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
     * @memberof frmAuditTrailControllerExtension#
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
