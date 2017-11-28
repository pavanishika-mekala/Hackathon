/*
 * Controller Extension class for frmTabApplyLeave
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmTabApplyLeaveControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmTabApplyLeaveControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /**
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config
     * @memberof frmTabApplyLeaveControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
          	var finalResponse = {
              managerData : [],
              leaveType : []
            };
          	var sqlQuery = "select e.First_Name,e.Last_Name ,c.Value ,c.Communication_Type_Id from Employee e join Communication_Channel c on c.Employee_Id = e.Id  where e.Id =(select emp.Manager_Id from Employee emp where emp.Id = '" + kony.apps.coe.ess.globalVariables.employeeId + "')";
			kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function (res) {
				finalResponse.managerData.push(res);
            }, function (err) {handleError(err);}, false);
			var query ="select  *  from leave_type";
     		kony.sync.single_select_execute(kony.sync.getDBName(), query, null,function(res){
            	finalResponse.leaveType.push(res);
              	success(finalResponse);
            },function (err) {handleError(err);}, false);
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
          	handleError(err);
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /**
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmTabApplyLeaveControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            this.getController().bindData(data);
            return data;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
          	handleError(err);
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    /**
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmTabApplyLeaveControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.getController().getFormModel().formatUI();
          	if (data.managerData[0].length > 0 && data.managerData[0] !== undefined && data.managerData[0][0].First_Name !== undefined && data.managerData[0][0].Last_Name !== undefined) {
				for (var i = 0; i < data.managerData[0].length; i++) {
					if (data.managerData[0][i].Communication_Type_Id === "0010") {
						kony.apps.ess.myLeave.tabApplyLeaveUI.mailId = data.managerData[0][i].Value;
					} else if (data.managerData[0][i].Communication_Type_Id === "0020") {
						kony.apps.ess.myLeave.tabApplyLeaveUI.phoneNumber = data.managerData[0][i].Value;
					}
				}
				kony.apps.ess.myLeave.tabApplyLeaveUI.ManagerName = data.managerData[0][0].First_Name + " " + data.managerData[0][0].Last_Name;
			}
          	frmTabApplyLeave.lblApproverName.text = kony.apps.ess.myLeave.tabApplyLeaveUI.ManagerName;
     		var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0,4);
     		frmTabApplyLeave.lblYear.text=currYear;
            kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.onClickOfFullDay();//CHECK
     		kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.updateDurationFullDay();
	 		frmTabApplyLeave.flxAddAtachment.removeAll();
     		kony.apps.ess.myLeave.tabApplyLeaveUI.staticAttachmentImg.setImgPlus();
	 		kony.apps.ess.myLeave.tabApplyLeaveUI.AddAttachment.lastIndex = 0;
	 		kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData = [];
     		kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData = {};
          	frmTabApplyLeave.flxLeaveType.removeAll();
            for (var i = 0; i < data.leaveType[0].length; i++) {
				var btnLeaveTypeObj = new kony.ui.Button({
						id : "btnLeaveType" + data.leaveType[0][i].id,
						width : kony.flex.USE_PREFERRED_SIZE,
						centerY : "50%",
              			left : "2%",
              			//#ifdef windows8
              				height : "90%",
              			//#else
              			height : "45%",
              			//#endif

						skin : "sknbtntabF4F4F4",
						focusSkin : "sknbtntab4A90E2",
						text : "  "+ data.leaveType[0][i].name + "   ",
						"widgetAlignment" : constants.WIDGET_ALIGN_CENTER,
						isVisible : true,
						onClick : function () {
							kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.onClickOfLeaveType(this);
						}
					}, {
						"padding" : [0, 0, 0, 0],
						"marginInPixel" : false,
						"paddingInPixel" : false,
						"contentAlignment" : constants.CONTENT_ALIGN_MIDDLE_LEFT
					}, {});
				frmTabApplyLeave.flxLeaveType.add(btnLeaveTypeObj);
			}
			frmTabApplyLeave.flxLeaveType["btnLeaveType" + data.leaveType[0][0].id].skin = "sknbtntab4A90E2";
      		//#ifndef
				frmTabApplyLeave.lblLeavesLeft.text = kony.i18n.getLocalizedString("i18n.ess.common.availed.valueKA")+ " " + frmTabApplyLeave["btnLeaveType" + data.leaveType[0][0].id].text ;
      		//#endif
			kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.onClickOfLeaveType(frmTabApplyLeave["btnLeaveType" + data.leaveType[0][0].id]);
			kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.selectedLeaveType = "btnLeaveType" + data.leaveType[0][0].id;
            if(kony.apps.ess.myLeave.tabApplyLeaveUI.checkIfEditLeaveMode.editMode === true){
              kony.apps.ess.myLeave.tabApplyLeaveUI.preshowtabApplyLeave.editLeave();
              kony.apps.ess.myLeave.tabApplyLeaveUI.checkIfEditLeaveMode.editMode = false;
              this.getController().showForm();
              kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
              }
            else
            {
              this.getController().showForm();
              kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
          	handleError(err);
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /**
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config
     * @memberof frmTabApplyLeaveControllerExtension#
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
     * @memberof frmTabApplyLeaveControllerExtension#
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
     * @memberof frmTabApplyLeaveControllerExtension#
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
