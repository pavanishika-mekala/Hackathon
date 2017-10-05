kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.IsLaterSearch = kony.apps.coe.ess.Approvals.IsLaterSearch || {};

/*
 *@function
 *@member  : IsLaterSearch
 *@params : button clicked
 *@returns: None
 *@desc   : Changes skin of button clicked and sets data accordingly.
 */
kony.apps.coe.ess.Approvals.IsLaterSearch.filterIsLaterDetails = function (buttonWidget, request_query, request_type) {
	kony.print("--Start filterIsLaterDetails function--");
	try {
		if (isEmpty(request_query)) {
			handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.filterErrorMsg"));
			return;
		}
		var childWidgets = frmIsLaterSearch.flxScrlCategory.widgets();
		for (var x = 0; x < childWidgets.length; x++) {
			childWidgets[x].skin = "sknBtn0OFont00000028px";
		}
		buttonWidget.skin = "sknBtn0OBor1pxFFFFFF100O";
		if (buttonWidget.id != "btnFilterAll") {
			request_query.requestType.push(request_type);
		} else {
			//Nothing To DO
		}
		kony.apps.coe.ess.Approvals.IsLaterSearch.changeSkinsForLaterSegment(request_type);
		kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(request_query, kony.apps.coe.ess.Approvals.IsLaterSearch.set_data_ForLaterSegment);
		request_query.requestType = [];
	} catch (e) {
		handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.filterErrorMsg"));
		kony.print("Error while applying filter" + e.message);
	}
	kony.print("--End filterIsLaterDetails function--");
};

/*
 *@function
 *@member  : IsLaterSearch
 *@params : leave type
 *@returns: None
 *@desc   : Skins will be assigned as per request type
 */
kony.apps.coe.ess.Approvals.IsLaterSearch.changeSkinsForLaterSegment = function (request_type) {
	kony.print("--start change Skins function--");
	try {
		switch (request_type) {
		case "LEAVE":
			frmIsLaterSearch.flxHeader.skin = "sknFlx7986CBff";
			frmIsLaterSearch.flxFiter.skin = "sknFlx7986CBff";
            frmIsLaterSearch.skin = "sknFlx7986CBff";
			break;
		case "TIMESHEET":
			frmIsLaterSearch.flxHeader.skin = "sknflxBA68C8po100";
			frmIsLaterSearch.flxFiter.skin = "sknflxBA68C8po100";
            frmIsLaterSearch.skin = "sknflxBA68C8po100";
			break;
		case "EXPENSES":
			frmIsLaterSearch.flxHeader.skin = "skn1DB6C9ff";
			frmIsLaterSearch.flxFiter.skin = "skn1DB6C9ff";
            frmIsLaterSearch.skin = "skn1DB6C9ff";
			break;
		case "PURCHASEORDER":
			frmIsLaterSearch.flxHeader.skin = "sknFlxMob058594ff";
			frmIsLaterSearch.flxFiter.skin = "sknFlxMob058594ff";
            frmIsLaterSearch.skin = "sknFlxMob058594ff";
			break;
		case "WORKORDER":
			frmIsLaterSearch.flxHeader.skin = "sknFlxMob0284B5ff";
			frmIsLaterSearch.flxFiter.skin = "sknFlxMob0284B5ff";
            frmIsLaterSearch.skin = "sknFlxMob0284B5ff";
			break;
         default:
			frmIsLaterSearch.flxHeader.skin = "sknFlx7986CBff";
			frmIsLaterSearch.flxFiter.skin = "sknFlx7986CBff";
            frmIsLaterSearch.skin = "sknFlx7986CBff";
		/*default:
			frmIsLaterSearch.flxHeader.skin = "sknFlxMob0284B5ff";
			frmIsLaterSearch.flxFiter.skin = "sknFlxMob0284B5ff";
            frmIsLaterSearch.skin = "sknFlxMob0284B5ff";*/
		}
	} catch (e) {
		handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.errorChangeSkin"));
		kony.print("Error while applying filter" + e.message);
	}
	kony.print("--End changeSkins function--");
}

/*
 *@function
 *@member  : IsLaterSearch
 *@params :  None
 *@returns: None
 *@desc   : bind Data to Later Segment when all is selected
 */
kony.apps.coe.ess.Approvals.IsLaterSearch.onClickOfAll = function () {
	var query_data_Forall = {}
	query_data_Forall.totalPeoples = [];
	query_data_Forall.attribute_section_id = "1";
	query_data_Forall.status_id = "2";
  	query_data_Forall.isLater = "1";
	var selectedPeople = kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems;
	for (var index in selectedPeople) {
		query_data_Forall.totalPeoples.push(selectedPeople[index].Id);
	}
	var childWidgets = frmIsLaterSearch.flxScrlCategory.widgets();
	for (var x = 0; x < childWidgets.length; x++) {
		childWidgets[x].skin = "sknBtn0OFont00000028px";
	}
	frmIsLaterSearch.btnFilterAll.skin = "sknBtn0OBor1pxFFFFFF100O";
	kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(query_data_Forall, kony.apps.coe.ess.Approvals.IsLaterSearch.set_data_ForLaterSegment);
}
/*
 *@function
 *@member  : IsLaterSearch
 *@params :  None
 *@returns: None
 *@desc   : bind Data to Later Segment when all is selected
 */
kony.apps.coe.ess.Approvals.IsLaterSearch.set_data_ForLaterSegment = function (response) {
	try {
		var processedData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement(response);
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
          	"flxApprovalRequest" : "flxApprovalRequest",
          	"btnLaterReject":"btnLaterReject",
          	"btnLaterApprove":"btnLaterApprove"
		};
		frmIsLaterSearch.SegDetails.widgetDataMap = WidgetDatamap;
      	for(var i=0;i<processedData.length;i++){
          processedData[i]["btnLaterReject"]={"isVisible":false};
          processedData[i]["btnLaterApprove"]={"isVisible":false};
        }
		frmIsLaterSearch.SegDetails.setData(processedData);
	} catch (err) {
		handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.peopleSearch.ErrorMessage.bindData")));
	}
}
