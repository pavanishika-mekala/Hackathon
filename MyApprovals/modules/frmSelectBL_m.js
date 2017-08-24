/***@Author Sumeet.bartha@kony.com
 * @category data Binding / Business Logic
 * @desc  RequestedList class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

/*
 *@class	:	frmSelectBackendLogic
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic = function() {};

/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called onSelection of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onFromClick = function() {
    frmSearch.calToDate.validStartDate = [frmSearch.calFromDate.day, frmSearch.calFromDate.month, frmSearch.calFromDate.year];
    var from = "" + frmSearch.calFromDate.year + frmSearch.calFromDate.month + frmSearch.calFromDate.day;
    var to = "" + frmSearch.calToDate.year + frmSearch.calToDate.month + frmSearch.calToDate.day;
    if (parseInt(from) > parseInt(to)) {
        frmSearch.calToDate.dateComponents = [frmSearch.calFromDate.day, frmSearch.calFromDate.month, frmSearch.calFromDate.year];
    }

};

/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Touch Start  of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onTouchStartOfFromDate = function() {
    frmSearch.flxFromSection.skin = "sknFlxMobEFEFEF100OBor1pxDDDDDD100O";
    frmSearch.flxCalendarMask.skin = "sknFlxMobEFEFEF100O";
};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Touch End  of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onTouchEndOfFromDate = function() {
    frmSearch.flxFromSection.skin = "sknFlxMobFAFAFA100OBor1pxDDDDDD100O";
    frmSearch.flxCalendarMask.skin = "sknFlxMobFAFAFA";
};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Touch Start  of ToCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onTouchStartOfToDate = function() {
    frmSearch.flxToSelection.skin = "sknFlxMobEFEFEF100OBor1pxDDDDDD100O";
    frmSearch.flxCalendarMask2.skin = "sknFlxMobEFEFEF100O";
};

/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Touch End of ToCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onTouchEndOfToDate = function() {
    frmSearch.flxToSelection.skin = "sknFlxMobFAFAFA100OBor1pxDDDDDD100O";
    frmSearch.flxCalendarMask2.skin = "sknFlxMobFAFAFA";
};

/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onClickRequestType = function() {
    function onDoneRequest() {
        var selectedData = frmSelect.SegRequestsType.selectedRowItems;
        if (selectedData != null && selectedData != "" && selectedData.length > 0) {
            if (selectedData[0].request_name == "All") {
                frmSearch.lblRequests.text = "All";
            } else {
                var Datatoset = "";
                for (var i = 0; i < selectedData.length; i++) {
                    if (i == selectedData.length - 1) {
                        Datatoset += selectedData[i].request_name;
                    } else {
                        Datatoset += selectedData[i].request_name + ", ";
                    }
                }
                frmSearch.lblRequests.text = Datatoset;
            }
            frmSearch.lblRequests.skin = "sknLblMobFC333333Op100FS100";
        } else {
            frmSearch.lblRequests.text = "select request";
            frmSearch.lblRequests.skin = "sknLblMobCCCCCC100OFS36px";
        }
        frmSearch.show();
    }
    frmSelect.SegRequestsType.isVisible = true;
    frmSelect.SegStatusType.isVisible = false;
    frmSelect.segSearchPeople.isVisible = false;
    frmSelect.flxClear.onTouchEnd = onDoneRequest;
    if (frmSelect.SegRequestsType.data.length == 1) {
        this.RefreshSegRequestData();
    }
    frmSelect.show();
};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onClickStatusType = function() {
    function onDoneRequest() {
        var selectedData = frmSelect.SegStatusType.selectedRowItems;
        if (selectedData != null && selectedData != "" && selectedData.length > 0) {
            if (selectedData[0].status_name == "All") {
                frmSearch.lblLeaveStatus.text = "All";
            } else {
                var Datatoset = "";
                for (var i = 0; i < selectedData.length; i++) {
                    if (i == selectedData.length - 1) {
                        Datatoset += selectedData[i].status_name;
                    } else {
                        Datatoset += selectedData[i].status_name + ", ";
                    }
                }
                frmSearch.lblLeaveStatus.text = Datatoset;
            }
            frmSearch.lblLeaveStatus.skin = "sknLblMobFC333333Op100FS100";
        } else {
            frmSearch.lblLeaveStatus.text = "select status";
            frmSearch.lblLeaveStatus.skin = "sknLblMobCCCCCC100OFS36px";
        }
        frmSearch.show();
    }
    frmSelect.SegRequestsType.isVisible = false;
    frmSelect.SegStatusType.isVisible = true;
    frmSelect.segSearchPeople.isVisible = false;
    frmSelect.flxClear.onTouchEnd = onDoneRequest;
    if (frmSelect.SegStatusType.data.length == 1) {
        this.RefreshSegStatusData();
    }
    frmSelect.show();
};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.onClickPeople = function() {
    function onDoneRequest() {
        var selectedData = frmSelect.segSearchPeople.selectedRowItems;
        if (selectedData != null && selectedData != "" && selectedData.length > 0) {
            if (selectedData[0].Name == "All") {
                frmSearch.lblUsers.text = "All";
            } else {
                var Datatoset = "";
                for (var i = 0; i < selectedData.length; i++) {
                    if (i == selectedData.length - 1) {
                        Datatoset += selectedData[i].Name;
                    } else {
                        Datatoset += selectedData[i].Name + ", ";
                    }
                }
                frmSearch.lblUsers.text = Datatoset;
            }
            frmSearch.lblUsers.skin = "sknLblMobFC333333Op100FS100";
        } else {
            frmSearch.lblUsers.text = "select people";
            frmSearch.lblUsers.skin = "sknLblMobCCCCCC100OFS36px";
        }
        frmSearch.show();
    }
    frmSelect.SegRequestsType.isVisible = false;
    frmSelect.SegStatusType.isVisible = false;
    frmSelect.segSearchPeople.isVisible = true;
    frmSelect.flxClear.onTouchEnd = onDoneRequest;
    if (frmSelect.segSearchPeople.data.length == 1) {
        this.RefreshSegPeopleData();
    }
    frmSelect.show();
};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.ClearAll = function() {
    this.RefreshSegRequestData();
    frmSearch.lblRequests.text = "select request";
    frmSearch.lblLeaveStatus.text = "select status";
    var today = new Date();
    var startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    var todayday = today.getDate();
    var todaymonth = (parseInt(today.getMonth()) + 1);
    var todayyear = today.getFullYear();
    var startDateday = startDate.getDate();
    var startDatemonth = (parseInt(startDate.getMonth()) + 1);
    var startDateyear = startDate.getFullYear();
    frmSearch.calToDate.dateComponents = [todayday, todaymonth, todayyear];
    frmSearch.calFromDate.dateComponents = [startDateday, startDatemonth, startDateyear];
    frmSearch.lblUsers.text = "select people";
    frmSearch.lblUsers.skin = "sknLblMobCCCCCC100OFS36px";
    frmSearch.lblRequests.skin = "sknLblMobCCCCCC100OFS36px";
    frmSearch.lblLeaveStatus.skin = "sknLblMobCCCCCC100OFS36px";

    frmSearch.flxSearchContainer.height = "0%"; //docking the filter flex on click of search icon
    frmSearch.flxClear.setVisibility(false);
    frmSearch.flxHide.setVisibility(true);

    var fromDate = startDate.getDateInFormat("yyyymmdd");
    var toDate = today.getDateInFormat("yyyymmdd");
    var navObj = new kony.sdk.mvvm.NavigationObject();
    var qp = {
        "fromDate": fromDate,
        "toDate": toDate
    };
    navObj.setQueryParams("segList", qp);
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSearch");
    formController.loadDataAndShowForm(navObj);

};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.RefreshSegRequestData = function() {
    function successCallback(data) {
        if (data != null && data != "" && data.length > 0) {
            var newData = [{
                id: "All",
                request_name: "All",
                imgSelected: "close.png"
            }].concat(data);
            for (var i = 0; i < newData.length; i++) {
                newData[i].imgSelected = "close.png";
            }
            frmSelect.SegRequestsType.removeAll();
            frmSelect.SegRequestsType.widgetDataMap = {
                lblRequest: "request_name",
                imgSelected: "imgSelected"
            };
            frmSelect.SegRequestsType.setData(newData);
        }

    }

    function errorCallback(err) {

        handleError(err);
    }
    if (kony.apps.coe.ess.globalVariables.isSPA) {
        var requestTypes;
    } else {
        var query = "select id , name as request_name from request_type ORDER BY name";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallback, errorCallback);
    }

};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.RefreshSegStatusData = function() {
    function successCallback(data) {
      if(null !== data && undefined !== data && " !== data"){
        for(var i = 0;i<data.length;i++){
          var statusText = data[i].status_name;
          if(statusText == "Pending"){
            data[i].status_name = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Pending");
          }else if(statusText == "Approved"){
            data[i].status_name = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Approved");
          }else if(statusText == "Rejected"){
            data[i].status_name = kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Rejected");
          }
        }
      }
        if (data != null && data != "" && data.length > 0) {
            var newData = [{
                id: "All",
                status_name: "All"
            }].concat(data);
            for (var i = 0; i < newData.length; i++) {
                newData[i].imgSelected = "close.png";
            }
            var widgetDataMap = {
                lblRequest: "status_name",
                imgSelected: "imgSelected"
            };
            frmSelect.SegStatusType.widgetDataMap = widgetDataMap;
            frmSelect.SegStatusType.setData(newData);
        }

    }

    function errorCallback(err) {

        handleError(err);
    }

    var query = "SELECT Id as id , Status_Name as status_name  from status where Id <'3' order by Id;";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallback, errorCallback);
};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.RefreshSegPeopleData = function() {
    kony.print("---- RefreshSegPeopleData start ----");

    function successCallback(data) {
        if (data != null && data != "" && data.length > 0) {
            var newData = [{
                id: "All",
                Name: "All"
            }].concat(data);
            for (var i = 0; i < newData.length; i++) {
                newData[i].imgSelected = "close.png";
            }
            var widgetDataMap = {
                lblName: "Name",
                imgSelected: "imgSelected",
                lblIntials: "lblIntials"
            };
            frmSelect.segSearchPeople.widgetDataMap = widgetDataMap;
            frmSelect.segSearchPeople.setData(newData);
        }

    }

    function errorCallback(err) {

        handleError(err);
    }
    if (kony.apps.coe.ess.globalVariables.isSPA) {
        kony.print("---- RefreshSegPeopleData in SPA ----");
        var peopleData = kony.apps.coe.ess.Approvals.SPA.Search.getPeople(frmSearch.segList.data);
        kony.print("---- peopleData: " + JSON.stringify(peopleData));
        successCallback(peopleData);
    } else {
        var query = "SELECT (First_Name || ' ' || Middle_Name || ' ' ||Last_Name ) as Name , Id as id ,  Media_Id as media_id  from employee where IsEmployee = '0' Order By First_Name , Middle_Name , Last_Name;";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, successCallback, errorCallback);
    }
    kony.print("---- RefreshSegPeopleData start ----");
};
/***
 *@function
 * @class	 :  frmSelectBackendLogic
 * @returns	 :	None
 * @desc	 :	called on Click of FromCalendar
 */
kony.apps.coe.ess.Approvals.frmSelectBackendLogic.prototype.selectAll = function(segmentName) {};