/*
 * Controller Extension class for frmTabLeaveDashboard
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmTabLeaveDashboardControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmTabLeaveDashboardControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmTabLeaveDashboardControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            var finalResponse={
              holidaysResponse:[],
              eventsResponse:[],
              leavesResponse: []
            };
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            //this.$class.$superp.fetchData.call(this, success, error);
          	var currDate = new Date();
      		var actualCurrYear = currDate.getFullYear().toString().trim(0, 4);
          	//var currMonth = "" +("0" + (currDate.getMonth() + 1));
      		var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.month)) + 1)).slice(-2));
      		var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0,4);
          	var getPendingRequestsQuery = "select count(id) as allPending from leave as l " +
      									  "where status_id = 2 and employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and ((l.start_date between '" + (parseInt(actualCurrYear)-1).toString() + "0101'" +
      									  " AND '" + (parseInt(actualCurrYear)+1).toString() + "1231') OR (l.end_date between '" + (parseInt(actualCurrYear)-1).toString() + "0101' AND '" + (parseInt(actualCurrYear)+1).toString() + "1231'))";
   	  		kony.sync.single_select_execute(kony.sync.getDBName(), getPendingRequestsQuery, null, function(res) {
				//#ifndef windows8
	        		frmTabLeaveDashboard.lblPendingLeaveCount.text = res[0].allPending + "";
				//#endif
      		}, function (err){handleError(err);}, false);
      		var getHolidaysQuery = "select Holiday_Date as Date,Name from Holiday where Holiday_Date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31'";
   	  		kony.sync.single_select_execute(kony.sync.getDBName(), getHolidaysQuery, null, function(holidaysResponse) {
              	finalResponse.holidaysResponse.push(holidaysResponse);
              	var getEventsQuery = "select holiday_date as Date,name from event where (holiday_date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31')";
   				kony.sync.single_select_execute(kony.sync.getDBName(), getEventsQuery, null, function(eventsResponse) {
                  	finalResponse.eventsResponse.push(eventsResponse);
                  	var getLeavesQuery = "select l.id as LeaveID, lt.name as LeaveType, l.status_id as StatusID, l.start_date as StartDate, l.end_date as EndDate, l.no_of_hours as Hours, l.lastmodifiedts as LastModifiedDate, l.createdts as CreateDate " +
        								 "from leave l join leave_type lt on l.leave_type_id = lt.id " +
        								 "where l.employee_id = '" + kony.apps.coe.ess.globalVariables.employeeId + "' and ((l.start_date between '" + currYear + currMonth + "01'" +
        								 " AND '" + currYear + currMonth + "31') OR (l.end_date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31'))";
   					kony.sync.single_select_execute(kony.sync.getDBName(), getLeavesQuery, null, function(leavesResponse){
                      	finalResponse.leavesResponse.push(leavesResponse);
                      	success(finalResponse);
                    }, function (err){handleError(err);}, false);
                }, function (err){handleError(err);}, false);
            }, function (err){handleError(err);}, false);
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
     * @memberof frmTabLeaveDashboardControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(res) {
        try {
            var scopeObj = this;
          	kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            //var processedData = this.$class.$superp.processData.call(this, data);
          	kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data = [];
    		var monthsJSON = {"01":"January", "02":"February", "03":"March", "04":"April", "05":"May", "06":"June", "07":"July", "08":"August", "09":"September", "10":"October", "11":"November", "12":"December"};
  			for(var i = 0; i < res.holidaysResponse[0].length; i++){
      			var tempJSON = {};
      			if(res.holidaysResponse[0][i].Name !== "Non Working Day"){
        			tempJSON = {"Type" : "Holiday",
	                       "isValid" : true};
			      }	else {
        			tempJSON = {"Type" : "Non Working Day",
                    	   "isValid" : true};
      				}
      				tempJSON.Name = res.holidaysResponse[0][i].Name;
      				tempJSON.Date = res.holidaysResponse[0][i].Date.substring(6,8) + " " + (monthsJSON[res.holidaysResponse[0][i].Date.substring(4,6) + ""]).substring(0,3);
      				tempJSON.FullDate = res.holidaysResponse[0][i].Date;
      				kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.push(tempJSON);
    		}
          	for(var i = 0; i < res.eventsResponse[0].length; i++){
      			var tempJSON = {"Type" : "Event",
                	     "isValid" : true};
      			tempJSON.Name = res.eventsResponse[0][i].Name;
      			tempJSON.Date = res.eventsResponse[0][i].Date.substring(6,8) + " " + (monthsJSON[res[i].Date.substring(4,6) + ""]).substring(0,3);
      			tempJSON.FullDate = res.eventsResponse[0][i].Date;
		      	kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.push(tempJSON);
    		}
  			kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.sort(function(a,b){
      			var x = new Date(a.FullDate.substring(0,4),a.FullDate.substring(4,6),a.FullDate.substring(6,8));
      			var y = new Date(b.FullDate.substring(0,4),b.FullDate.substring(4,6),b.FullDate.substring(6,8));
      			return x.compareOnlyDate(y);
    		});
          	var processedData = {
				formatedHolidayData : [],
    			formattedEventData : [],
              	statusCount : []
            };
    		for(var i = 0; i<kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.length; i++ ) {
      			var tempJSON = {
        			"lblDate" : "",
        			"lblHoliday" : "",
      			};
      			if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Type.toLowerCase() === "holiday" && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].isValid === true) {
					tempJSON.lblDate = {"text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Date};
    	    		tempJSON.lblHoliday = {"skin":"sknlblFF72A9Op100S32pxRoman", "text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Name};
        			processedData.formatedHolidayData.push(tempJSON);
      			}	
      			else if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Type.toLowerCase() === "event") {
        			tempJSON.lblDate = {"text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Date};
        			tempJSON.lblHoliday = {"skin":"sknlblFA713BOp100S32pxRoman", "text" : kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].Name};
        			processedData.formattedEventData.push(tempJSON);
      			}
            }
          	for(var i = 0; i<kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.length; i++){
      			for(var j = 0; j < res.length; j++){
        			if(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].FullDate >= res[j].StartDate && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].FullDate <= res[j].EndDate && (res[j].StatusID == "2" || res[j].StatusID == "0" || res[j].StatusID == "1" || res[j].StatusID == "7")){
          				kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data[i].isValid = false;
          				break;
        			}
      			}
    		}
  			var statusArray = ["ACCEPTED","REJECTED","PENDING","CANCEL","SENTBACK","SAVED","ERROR","Submitted"];
  			processedData.statusCount = {"pending":0,"accepted":0,"rejected":0,"submitted":0};
			for(var i = 0; i < res.leavesResponse[0].length; i++){
      			res.leavesResponse[0][i].Status = statusArray[parseInt(res.leavesResponse[0][i].StatusID)];
      			if(res.leavesResponse[0][i].Status.toLowerCase() == "pending" || res.leavesResponse[0][i].Status.toLowerCase() == "accepted" || res.leavesResponse[0][i].Status.toLowerCase() == "rejected" || res.leavesResponse[0][i].Status.toLowerCase() == "submitted"){
        			processedData.statusCount[res.leavesResponse[0][i].Status.toLowerCase()] = processedData.statusCount[res.leavesResponse[0][i].Status.toLowerCase()] + 1;
      			}
      			var tempJSON = {"Type" : "Leave"};
      			tempJSON.LeaveID = res.leavesResponse[0][i].LeaveID;
      			tempJSON.LeaveType = res.leavesResponse[0][i].LeaveType;
      			tempJSON.StartDate = res.leavesResponse[0][i].StartDate;
      			tempJSON.EndDate = res.leavesResponse[0][i].EndDate;
      			tempJSON.Hours = res.leavesResponse[0][i].Hours;
      			tempJSON.CreateDate = res.leavesResponse[0][i].CreateDate;
      			tempJSON.LastModifiedDate = res.leavesResponse[0][i].LastModifiedDate;
      			if(res.leavesResponse[0][i].Status.toLowerCase() == "accepted") {
        			tempJSON.Status = "APPROVED";
      			} else {
        			tempJSON.Status = res.leavesResponse[0][i].Status;
      			}
      			kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.data.push(tempJSON);
    		}
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
     * @memberof frmTabLeaveDashboardControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            //this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
          	frmTabLeaveDashboard.lblLeaveMonthDetailsStatusApprovedCount.text = "" + data.statusCount.accepted;
  			frmTabLeaveDashboard.lblLeaveMonthDetailsStatusPendingCount.text = "" + data.statusCount.pending;
  			frmTabLeaveDashboard.lblLeaveMonthDetailsStatusRejectedCount.text = "" + data.statusCount.rejected;
    		frmTabLeaveDashboard.lblLeaveMonthDetailsStatusSubmittedCount.text = "" + data.statusCount.submitted;
			frmTabLeaveDashboard.segMonthHolidayList.setData(data.formatedHolidayData);
    		frmTabLeaveDashboard.segMonthEventList.setData(data.formattedEventData);
          	kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.mappingBackendDataToCalendar();
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
     * @memberof frmTabLeaveDashboardControllerExtension#
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
     * @memberof frmTabLeaveDashboardControllerExtension#
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
     * @memberof frmTabLeaveDashboardControllerExtension#
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