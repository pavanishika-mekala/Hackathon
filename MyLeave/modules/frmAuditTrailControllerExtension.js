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
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            var query ="select la.id as id, la.leave_id as leave_id, la.status_id as status_id,la.description as description, la.createdts as createdts, la.employee_id as First_Name from leave_audit la where la.leave_id = '" + kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id + "';";
            var data = [];
            kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function(res_leave_audit) {
                data = res_leave_audit;
                for(var i in data) {
                    data[i].template_type = 0;
                }
                var query = "select ln.*, emp.First_Name as First_Name, emp.Last_Name as Last_Name from leave_note ln left join Employee emp on ln.employee_id = emp.Id where ln.leave_id = '" + kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id + "';";
                kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function(res_comments) {
                    for(var i in res_comments) {
                        res_comments[i].template_type = 1;
                        res_comments[i].First_Name = res_comments[i].First_Name+" "+res_comments[i].Last_Name;
                        data.push(res_comments[i]);
                    }
                    var query = "select l.lastmodifiedts as createdts, l.status_id as status_id, emp.First_Name as First_Name from leave l left join Employee emp on l.employee_id = emp.Id where l.id = '" + kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id + "';";
                    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function(res_leaverecord) {
                        for(var i in res_leaverecord) {
                            if(res_leaverecord[i].status_id === "2") {
                                data.push({
                                    createdts : res_leaverecord[i].createdts,
                                    status_id : res_leaverecord[i].status_id,
                                    First_Name : res_leaverecord[i].First_Name,
                                    description : "",
                                    template_type : 0
                                });
                            }
                            break;
                        }
                        success(data);
                    }, function(err) {
                        handleError(err);
                    }, false);
                }, function(err) {
                    handleError(err);
                }, false);
            }, function (err) {
				handleError(err);
			}, false);
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
     * @memberof frmAuditTrailControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        var status_images = {
            "0": "approved.png",
			"1": "rejected.png",
			"2": "pending.png",
			"3": "canceled.png",
			"4": "",
			"5": "saved.png",
			"6": "system_error.png",
			"7": "submitted.png"
        };
        try {
            var scopeObj = this;
            var processedData = [];
            data.sort(function(a, b) {
                return a.createdts.localeCompare(b.createdts);
            });
            for(var i in data) {
                //parsing to string
                var dateStr = String(data[i].createdts);
                var date = "";
                //checking condition for invalid date string.
                if(dateStr !== null && dateStr !== undefined && dateStr !== "" && dateStr.toLowerCase() !== "null") {
                    // converting fron date string (20170214020546) to date Object
                    date = new Date(dateStr.substring(0, 4), parseInt(dateStr.substring(4, 6)) - 1, dateStr.substring(6, 8), dateStr.substring(8, 10), dateStr.substring(10, 12), dateStr.substring(12, 16));
                    // converting date in required format i.e. DD MMM HH mm am/pm
                    date = date.toHHMMMHHmm();
                }
                // assigning different templates for comments and audit record.
                if(parseInt(data[i].template_type) === 0) {
                    data[i].status_id = String(data[i].status_id);
                    var status = "";
                    if(data[i].status_id !== null && data[i].status_id !== undefined && data[i].status_id.toLowerCase() !== "null" && data[i].status_id !== "") {
                        // getting status value from status id
                        status = kony.apps.coe.ess.globalVariables.Status.idToStr[data[i].status_id];
                        status = status.charAt(0).toUpperCase() + status.substring(1, status.length).toLowerCase();
                    }
                    processedData.push({
                        lblEventName : status,
                        lblEventDesc : data[i].description,
                        lblPersonName : data[i].First_Name,
                        lblDate : date,
                        imgStatus : status_images[data[i].status_id],
                        lblVerticalLineTop : {text : "", isVisible : true},
                        lblBottomLine : {text : "", isVisible : true},
                        lblVerticalLineBottom : {text : "", isVisible : (i >= data.length - 1 ? false : true)}
                    });
                } else if(parseInt(data[i].template_type) === 1) {
                    processedData.push({
                        lblEventName : "User Comment",
                        lblEventDesc : data[i].comments,
                        lblPersonName : data[i].First_Name,
                        lblDate : date,
                        imgStatus : "comment.png",
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