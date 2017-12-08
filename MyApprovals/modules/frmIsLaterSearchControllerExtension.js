/*
 * Controller Extension class for frmIsLaterSearch
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmIsLaterSearchControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmIsLaterSearchControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
  constructor: function (controllerObj) {
    this.$class.$super.call(this, controllerObj);
  },
  /**
		 * This method is an entry point for all fetch related flows. Developer can edit.
		 * Default implementation fetches data for the form based on form config
		 * @memberof frmIsLaterSearchControllerExtension#
		 */
  fetchData: function () {
    try {

      var selectedPeople=this.getController().getContextData();				
      var scopeObj = this;
      if (isEmpty(selectedPeople)) {
        return;
      }
      if (this.getController().getContextData().message == "Async") {
        //make no actions as of form is reloaded by the async operation				
        selectedPeople = kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems;					
      }
      var query_data = {
        "totalPeoples" : [],
        "attribute_section_id" : "1",
        "status_id" : "2"
      };				
      for (var index in selectedPeople) {
        query_data.totalPeoples.push(selectedPeople[index].Id);
      }

      var filteredRequestRetrival = function (selectedPeople,ISLaterRequestsData) {
        kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(query_data, function (selectedPeople,ISLaterRequestsData, res) {
          //sending the control to the process data
          var resultData = {
            "IsLaterRequestsTypes": ISLaterRequestsData,
            "ISLaterRequestsData": res,
            "selectedPeople" : selectedPeople
          };
          scopeObj.getController().processData(resultData);
        }
                                                                   .bind(this,selectedPeople,ISLaterRequestsData),
                                                                   function (err) {
          kony.print(err);                      	
          handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchApprovalRequest") + JSON.stringify(err)));
        });
      };

      var IsLaterRequests_query = "SELECT leave_hours AS Leave_hours ," +
      "leave_days AS Leave_days,"	+
        "request_type.NAME AS TYPE, " +
          "        Count (IsLaterRequests.type_id) AS COUNT ," +
          "			request_type.id AS id " +
          " FROM   request_type " +
          "        LEFT JOIN (SELECT * " +
          "                   FROM   approval_request " +
          "                          LEFT JOIN request_approver " +
          "                                 ON ( request_approver.approval_id = " +
          "                                      approval_request.id " +
          "                                    ) " +
          "                   WHERE  approval_request.islater = 1 " +
          "                          AND request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID + "'" +
          "                          AND request_approver.status_id = '2') IsLaterRequests " +
          "               ON ( IsLaterRequests.type_id = request_type.id ) " +
          " GROUP  BY request_type.id ";
      kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", IsLaterRequests_query, function (selectedPeople,res) {
        //sending the control to the process data
        filteredRequestRetrival(selectedPeople,res);
      }.bind(this,selectedPeople),
                                            function (err) {
        kony.print("------------ error in the retriving of the islater request");
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmApprovalHome.errorMessages.fetchIslaterApprovalRequest") + JSON.stringify(err)));
      });
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.peopleSearch.ErrorMessage.fetchData")));
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }

    kony.print("-------End fetch data of IsLaterSearch form controller extension");
  },
  /**
		 * This method processes fetched data. Developer can edit.
		 * Default implementation processes the provided data to required format for bind.
		 * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
		 * @memberof frmIsLaterSearchControllerExtension#
		 * @returns {Object} - processed data
		 */
  processData: function (response) {
    try {              	
      var scopeObj = this;
      var processedData = {};
      processedData.ISLaterRequestsData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement(response.ISLaterRequestsData);
      processedData.IsLaterRequestsTypes = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForISlaterSegment(response.IsLaterRequestsTypes);
      processedData.selectedPeople = response.selectedPeople;
      scopeObj.getController().bindData(processedData);
    } catch (err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.peopleSearch.ErrorMessage.processData")));
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }
  },
  /**
		 * This method binds the processed data to the form. Developer can edit.
		 * Default implementation binds the data to widgets in the form.
		 * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
		 * @memberof frmIsLaterSearchControllerExtension#
		 */
  bindData: function (processedData) {
    try {
      var selectedPeople=processedData.selectedPeople;
      //chainging the no label text to selected people
      frmIsLaterSearch.lblPeopleSelectedCount.text = (parseInt(selectedPeople.length,10)).toFixed();
      var PeopleSearch_text="";
      if(selectedPeople.length>1){
        PeopleSearch_text = selectedPeople[0].username.text + "&" + (selectedPeople.length-1) + " "+kony.i18n.getLocalizedString("i18n.ess.common.more");                  
      }else{
        PeopleSearch_text = selectedPeople[0].username.text;
      }
      frmIsLaterSearch.lblPeopleSelected.text=PeopleSearch_text;
      if (processedData.ISLaterRequestsData == null || processedData.ISLaterRequestsData == undefined) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.peopleSearch.ErrorMessage.nullResponse")));
        return;
      }
      if (processedData.ISLaterRequestsData.length <= 0 || isEmpty(processedData.ISLaterRequestsData)) {
        frmIsLaterSearch.lblNoRecordsFound.setVisibility(true);
      } else {
        frmIsLaterSearch.lblNoRecordsFound.setVisibility(false);
      }
      var formmodel = this.getController().getFormModel();
      formmodel.clear();
      this.getController().getFormModel().formatUI();
      var query_data = {}
      query_data.requestType = [];
      query_data.totalPeoples = [];
      query_data.attribute_section_id = "1";
      query_data.status_id = "2";
      query_data.isLater = "1";
      var selectedPeople = kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems;
      for (var index in selectedPeople) {
        query_data.totalPeoples.push(selectedPeople[index].Id);
      }
      for (var index in processedData.IsLaterRequestsTypes) {
        var id = "btnFilter" + processedData.IsLaterRequestsTypes[index].ID;
        var request_type = processedData.IsLaterRequestsTypes[index].TYPE;
        if (frmIsLaterSearch[id]) {
          kony.print(" Already exsisting to the form ");
        } else {
          //this if condition has to be removed for getting timesheets
          if(processedData.IsLaterRequestsTypes[index].NAME == "LEAVE"){
            var lblBasic = {
              "id": id,
              "left": "3%",
              "centerY": "50%",
              "zIndex": 1,
              "width": kony.flex.USE_PREFERED_SIZE,
              "height": "89.7%",
              "isVisible": true,
              "minWidth" : "20%",
              "skin": "sknBtn0OFont00000028px",
              "focusSkin": "sknBtn0OBor1pxFFFFFF100O",
              "text": " " + processedData.IsLaterRequestsTypes[index].NAME + " ",

            };
            var btn_filter = new kony.ui.Button(lblBasic, {
              contentAlignment: constants.CONTENT_ALIGN_CENTER
            }, {});
            btn_filter.onClick = kony.apps.coe.ess.Approvals.IsLaterSearch.filterIsLaterDetails.bind(this, btn_filter, query_data, request_type)
            frmIsLaterSearch.flxScrlCategory.add(btn_filter);
          }
        }
      }
      frmIsLaterSearch.flxHeader.skin = "sknFlxMob0284B5ff";
      frmIsLaterSearch.flxFiter.skin = "sknFlxMob0284B5ff";
      //setting the data to the approval request Segement
      var WidgetDatamap = {
        "lblShortName": "CreatedUserShortName",
        //"imgCategory": "requestTypeImage",
        "lblUserName": "UserName",
        "lblCreateDate": "RequestDate",
        "lblDueDateValue": "dueDate",
        "lblRequestInfo": "RequestInfo",
        "btnAdditionalInfo": "AdditionalData",
        "flxTimer": "FlxTimerUi",
        "lblCategory": "category",
        //"flxBorder1": "requestTypeBorderSkin",
        //"flxBorder2": "requestTypeBorderSkin2",
        //"imgLeaveInfo": "requestTypeInfoImage",
        "lblRemainingHours": "remaingHours",
        "imgSelection": "imgSelection",
        "flxApprovalRequest" : "flxApprovalRequest"
      };
      frmIsLaterSearch.SegDetails.widgetDataMap = WidgetDatamap;
      frmIsLaterSearch.SegDetails.setData(processedData.ISLaterRequestsData);
      frmIsLaterSearch.show();
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      kony.apps.coe.ess.Approvals.IsLaterSearch.onClickOfAll();
      this.getController().showForm();
    } catch (err) {
      handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.peopleSearch.ErrorMessage.bindData")));
    }
  },
  /**
		 * This method is entry point for save flow. Developer can edit.
		 * Default implementation saves the entity record from the data of widgets defined in form config
		 * @memberof frmIsLaterSearchControllerExtension#
		 */
  saveData: function () {
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
		 * @memberof frmIsLaterSearchControllerExtension#
		 */
  deleteData: function () {
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
		 * @memberof frmIsLaterSearchControllerExtension#
		 */
  showForm: function () {
    try {
      var formmodel = this.getController().getFormModel();
      formmodel.showView();
    } catch (e) {
      var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
      kony.sdk.mvvm.log.error(exception.toString());
    }
  }
});
