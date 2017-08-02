/**
 * @module tabApprovalsListView
 * @author Teja Dhondi
 * @category actions (UI) 
 * @description tabApprovalsListView_m class. 
 * © 2017 Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

// Region - Class / object constructor. 
/**
 * @class tabApprovalsListView
 * this class for frmTabDashboard
 * this class for UI operations in the frmTabDashboard
 */

kony.apps.coe.ess.Approvals.tabApprovalsListView = function() {
    kony.print(":::Start tabApprovalsListView:::");
};

kony.apps.coe.ess.Approvals.tabApprovalsListView.segRequestTypeOnClick = function(data) {
    var query_data = {};
    query_data.totalPeoples = [];
    query_data.attribute_section_id = "1";
    query_data.status_id = "2";
    query_data.requestType = [];
    if (data.TYPE != 'All') {
        query_data.requestType.push(data.TYPE);
    }
    (new kony.apps.coe.ess.ApprovalHistoryTab()).filterData(query_data, kony.apps.coe.ess.Approvals.tabApprovalsListView.segRequestTypeOnClickResponse);
};
kony.apps.coe.ess.Approvals.tabApprovalsListView.segRequestTypeOnClickResponse = function(response) {
  	if (response == null || response == undefined || response.length < 0 || response == '') {
		frmTabListView.segMentListView.removeAll();
		return ;
	}
    var processedData = kony.apps.coe.ess.Approvals.ApprovalsHome.process_data_ForSegement(response);
    var WidgetDatamap = {
        "lblPeopleName": "UserName",
      	"lblShortName" : "CreatedUserShortName",
        "lblSubmitDate": "RequestDate",
        "lblDate": "dueDate",
        "lblPeoplePosition": "request_type",
        "flxDelegated": "Delegated",
        "imgUser": "imgPeople",
        "flxImage": "flxImage",
        "lblIname": "lblIname",
        "lblPeopleDate": "RequestInfo",
        "lblTotalDays": "AdditionalData",
        "flxTotalDays": "AdditionalData"
    };
    frmTabListView.segMentListView.widgetDataMap = WidgetDatamap;
    frmTabListView.segMentListView.setData(response);
  	frmTabListView.segMentListView.selectedRowIndex = [0, 0]; 
};

kony.apps.coe.ess.Approvals.tabApprovalsListView.setDataToSegPeople = function() {
    var query = "SELECT (First_Name || ' ' || Middle_Name || ' ' ||Last_Name ) as Name , Id as id ,  Media_Id as media_id  from employee where IsEmployee = '0' Order By First_Name , Middle_Name , Last_Name;";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, setDataToSegPeopleSuccessCallback, setDataToSegPeopleErrorCallback);

    function setDataToSegPeopleSuccessCallback(data) {
        if (data !== null && data !== "" && data.length > 0) {
            newData = [{
                id: "All",
                Name: "All"
            }].concat(data);
        }
        frmTabListView.segpplList.widgetDataMap = {
            "lblname": "Name",
        };
        frmTabListView.segpplList.setData(newData);
        kony.apps.coe.ess.FilterHistory.EmpSegData = data;
    }

    function setDataToSegPeopleErrorCallback() {

    }
};
kony.apps.coe.ess.Approvals.tabApprovalsListView.segPeopleOnClick = function(data) {
    var query_data = {};
    query_data.requestType = [];
    query_data.totalPeoples = [];
    query_data.attribute_section_id = "1";
    query_data.status_id = "2";
    query_data.totalPeoples = [];
    for (var index in data) {
        if (data[index] !='All') {
            query_data.totalPeoples.push(data[index].Id);
        }
    }
    (new kony.apps.coe.ess.ApprovalHistoryTab()).filterData(query_data, kony.apps.coe.ess.Approvals.tabApprovalsListView.segRequestTypeOnClickResponse);
};
/*
 *@function
 *@member  : frmTabListView
 *@params : None
 *@returns: None
 *@desc   : To filter poepleSearch in frmTabListView.
 */
kony.apps.coe.ess.Approvals.tabApprovalsListView.employeeFilterTab = function() {
    var query_data = {};
    query_data.requestType = [];
    query_data.totalPeoples = [];
    query_data.attribute_section_id = "1";
    query_data.status_id = "2";
    var selectedPeople = kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems;
    for (var index in selectedPeople) {
        query_data.totalPeoples.push(selectedPeople[index].Id);
    }
    kony.apps.coe.ess.Approvals.tabApprovalsListView.segPeopleOnClick(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch.SelectedItems);
    frmTabListView.flxEmployeeSearch.setVisibility(false);
};

kony.apps.coe.ess.Approvals.tabApprovalsListView.segPeopleOnClickCancelReset = function() {
    var query_data = {};
    query_data.totalPeoples = null;
    kony.apps.coe.ess.Approvals.frmSearch.retrieveDataByFilter(query_data, kony.apps.coe.ess.Approvals.tabApprovalsListView.segRequestTypeOnClickResponse);

};