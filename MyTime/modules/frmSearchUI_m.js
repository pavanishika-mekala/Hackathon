/*
 * My Time Search Module UI 
 * @author Mallikarjuna P
 *         mallikarjuna.pasupula@kony.com
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.Search = kony.apps.coe.ess.myTime.Search || {};
kony.apps.coe.ess.myTime.Search.popup = kony.apps.coe.ess.myTime.Search.popup || {};

kony.apps.coe.ess.myTime.Search.statusIdString = "";
kony.apps.coe.ess.myTime.Search.statusInfoJson = kony.apps.coe.ess.myTime.Search.statusInfoJson || {};
//TODO Need images for "ERROR" and "CANCEL" status
kony.apps.coe.ess.myTime.Search.StatusImageInfo = kony.apps.coe.ess.myTime.Search.StatusImageInfo || {
    "0": "approved.png",
    "1": "rejected.png",
    "2": "pending.png",
    "3": "rejected.png",
    "4": "sentback.png",
    "5": "saved.png",
    "6": "rejected.png",
    "7": "submitted.png"
};
//Set Actions
// frmSearchMyTime.lbView.onSelection = function() {kony.apps.coe.ess.myTime.Search.onViewOptionsSelect();};
/*
 * Constructor Search Module
 * @class Search
 */
/**
 * List of Options to be shown, When user want to add view filter
 */
kony.apps.coe.ess.myTime.Search.popup.viewOptions = [{
    "option": "Timesheets"
}, {
    "option": "Projects"
}];
/**
 * List of Options to be shown, When user want to add time type filter
 */
kony.apps.coe.ess.myTime.Search.popup.showOptions = [{
    "option": "All"
}, {
    "option": "Billable "
},{
    "option": "Not Billable "
}];
/**
 * 
 */
kony.apps.coe.ess.myTime.Search.selectFromDate = function() {

};
/*
 *
 */
kony.apps.coe.ess.myTime.Search.selectToDate = function() {

};
/*
 * kony.apps.coe.ess.myTime.Search.showOptionsFor 
 */
kony.apps.coe.ess.myTime.Search.selectViewList = function() {
    frmSearchMyTime.flxPopup.setVisibility(true);
    frmSearchMyTime.flxPopupContainer.left = "0%";
    frmSearchMyTime.segPopup.setData(kony.apps.coe.ess.myTime.Search.popup.viewOptions);
};
/*
 * kony.apps.coe.ess.myTime.Search.showOptionsFor
 */
kony.apps.coe.ess.myTime.Search.selectShowList = function() {
    frmSearchMyTime.flxPopup.setVisibility(true);
    frmSearchMyTime.flxPopupContainer.left = "50%";
    frmSearchMyTime.segPopup.setData(kony.apps.coe.ess.myTime.Search.popup.showOptions);
};
/**
 * Shows popup with View/Show Filter Options
 * @param {string} $popupType Expected Values are {"view","show"}
 */
kony.apps.coe.ess.myTime.Search.showOptionsFor = function(popupType) {

    if (popupType === "view") {
        frmSearchMyTime.flxPopupContainer.left = "0%";
        frmSearchMyTime.segPopup.setData(kony.apps.coe.ess.myTime.Search.popup.viewOptions);
    } else if (popupType === "show") {
        frmSearchMyTime.flxPopupContainer.left = "50%";
        frmSearchMyTime.segPopup.setData(kony.apps.coe.ess.myTime.Search.popup.showOptions);
    } else {
      	handleError("Wrong Parameter Sent : " + popupType);
        return;
    }
    frmSearchMyTime.flxPopup.setVisibility(true);
};
/*
 * Callback when user selects option from Popup
 * @param {Object} $eventObject Reference of Segment
 */
kony.apps.coe.ess.myTime.Search.popupCallback = function(eventObject) {
    var left = frmSearchMyTime.flxPopupContainer.left;
    var selected = eventObject.selectedRowItems[0].option;
    //ToDo - Look for better approach
    if (left === "0%") { //Means, Selection is releated to View Filter
        frmSearchMyTime.lblViewValue.text = selected;
        frmSearchMyTime.flxPopup.setVisibility(false);
    } else if (left === "50%") { //Means, Selection is releated to Show Filter
        frmSearchMyTime.lblShowValue.text = selected;
        frmSearchMyTime.flxPopup.setVisibility(false);
    } else {
        frmSearchMyTime.flxPopup.setVisibility(false);
      	handleError("Went Wrong : " + JSON.stringify(eventObject));
    }

};
/*
 * Mock Data Population
 */
kony.apps.coe.ess.myTime.Search.listResults = function() {

    var data = null;
    var widgetMap = null;
    var rowTemplate = null;
    //ToDo : Key value for item come from backend. Here "lb2","lb1" is just a mock key
    //ToDo : Rename attributes of data object - attribute names should be more relevant
    if (frmSearchMyTime.lbView.selectedKey === "lb1") {
        data = [{
            "time": "01 Jan - 15 Jan",
            "stat": "fortnightly",
            "duration": "-----",
            "img": "page_on_dot.png"
        }, {
            "time": "01 Feb - 15 Feb",
            "stat": "fortnightly",
            "duration": "40 h",
            "img": "page_off_dot.png"
        }, {
            "time": "01 Mar - 15 Mar",
            "stat": "fortnightly",
            "duration": "90 h",
            "img": "page_on_dot.png"
        }, {
            "time": "01 Apr - 15 Apr",
            "stat": "fortnightly",
            "duration": "190 h",
            "img": "page_on_dot.png"
        }, {
            "time": "01 July - 15 July",
            "stat": "fortnightly",
            "duration": "90 h",
            "img": "page_off_dot.png"
        }, {
            "time": "01 Aug - 15 Aug",
            "stat": "fortnightly",
            "duration": "10 h",
            "img": "page_on_dot.png"
        }];

        widgetMap = {
            "lblTime": "time",
            "lblStat": "stat",
            "lblDuration": "duration",
            "imgStat": "img"
        };

        rowTemplate = flxSegSearchTimesheets;

    } else {
        data = [{
            "project": "Apple ",
            "timetype": "billable ",
            "duration": "20 h"
        }, {
            "project": "Google ",
            "timetype": "billable ",
            "duration": "90 h"
        }, {
            "project": "ABC",
            "timetype": "billable ",
            "duration": "27 h"
        }, {
            "project": "Samsung ",
            "timetype": "billable ",
            "duration": "120 h"
        }, {
            "project": "Kony",
            "timetype": "billable ",
            "duration": "60 h"
        }, {
            "project": "XYZ",
            "timetype": "billable ",
            "duration": "70 h"
        }, {
            "project": "HP",
            "timetype": "billable ",
            "duration": "45 h"
        }, {
            "project": "Samsung ",
            "timetype": "billable ",
            "duration": "120 h"
        }, {
            "project": "Kony",
            "timetype": "billable ",
            "duration": "60 h"
        }, {
            "project": "XYZ",
            "timetype": "billable ",
            "duration": "70 h"
        }, {
            "project": "HP",
            "timetype": "billable ",
            "duration": "45 h"
        }];

        widgetMap = {
            "lblProjectName": "project",
            "lblTimeType": "timetype",
            "lblDuration": "duration"
        };

        rowTemplate = flxSegSearchProjects;
    }

    frmSearchMyTime.segSearchResults.rowTemplate = rowTemplate;
    frmSearchMyTime.segSearchResults.widgetDataMap = widgetMap;
    frmSearchMyTime.segSearchResults.setVisibility(true);
    frmSearchMyTime.segSearchResults.setData(data);
};
/**
 * Hide visible popup
 */
kony.apps.coe.ess.myTime.Search.hidePopup = function() {
    frmSearchMyTime.flxPopup.setVisibility(false);
};
/*
 * Initialize Search Screen
 */
kony.apps.coe.ess.myTime.Search.preShow = function() {

    //frmSearchMyTime.segSearchResults.setVisibility(false);
    //Setting onSelect functionality - Alternate way to avoid ActionScripts
  
};



kony.apps.coe.ess.myTime.Search.onViewOptionsSelect = function() {
    var selectedKey = frmSearchMyTime.lbView.selectedKey;
    if (selectedKey === "lb2") {
        //User Selected Timesheets
        frmSearchMyTime.flxStatusField.setVisibility(false);
        frmSearchMyTime.flxSearchContainer.height = "26%";
        frmSearchMyTime.flxFromTo.height = "33%";
        frmSearchMyTime.flxViewShow.height = "33%";
        frmSearchMyTime.flxStatusField.height = "0%";
        frmSearchMyTime.flxListResults.height = "33%";
        frmSearchMyTime.flxResults.height = "57.5%";
    } else {
        //User Selected Projects
        frmSearchMyTime.flxSearchContainer.height = "36%";
        frmSearchMyTime.flxFromTo.height = "25%";
        frmSearchMyTime.flxViewShow.height = "25%";
        frmSearchMyTime.flxStatusField.height = "25%";
        frmSearchMyTime.flxListResults.height = "25%";
        frmSearchMyTime.flxStatusField.setVisibility(true);
        frmSearchMyTime.flxResults.height = "48%";
    }
};

kony.apps.coe.ess.myTime.Search.selectStatus = function() {
    kony.print("-- Start selectStatus --");
    var navObj = new kony.sdk.mvvm.NavigationObject();
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSearchStatus");
    formController.loadDataAndShowForm(navObj);
    kony.print("-- End selectStatus --");
};
/*
 * On Click of Done in StatusSelection form, Navigate back to Search form & update Status filter as per selection
 */
kony.apps.coe.ess.myTime.Search.onStatusSelectionDone = function() {
    var segmentData = frmSearchStatus.segSearchStatusContainer.data;
    var selectedItems = frmSearchStatus.segSearchStatusContainer.selectedRowItems;
    var string = "";
    kony.apps.coe.ess.myTime.Search.statusIdString = "";
    if (selectedItems === null) {
        //Nothing is selected 
        // ToDo : What to do if nothing is selected 
        string = "None";
    } else {
        var len = selectedItems.length;
        for (var i = 0; i < len; i++) {
            string += selectedItems[i].Status_Name;
            kony.apps.coe.ess.myTime.Search.statusIdString += "'" + selectedItems[i].Id + "'";
            if (i !== len - 1) {
                string += ",";
                kony.apps.coe.ess.myTime.Search.statusIdString += ",";
            }
        }
    }
    frmSearchMyTime.lblStatusSelectedSearch.text = string;
    frmSearchMyTime.show();
};
/*
 * OnClick of Cancel in SearchStatus form, It navigates back to Search form without any effect
 */
kony.apps.coe.ess.myTime.Search.onStatusSelectionCancel = function() {
    kony.application.getPreviousForm().show();
};
/**
 * PreShow event of frmSearchStatus 
 */
kony.apps.coe.ess.myTime.Search.searchStatusPreshow = function() {
    //   frmSearchStatus.segSearchStatusContainer.
};
/**
 * Handles search Operation
 */
kony.apps.coe.ess.myTime.Search.handleSearchOperation = function() {
    kony.print("-- Start handleSearchOperation --");
    var fromDateCldrWidget = frmSearchMyTime.cldrFromSearch;
    var toDateCldrWidget = frmSearchMyTime.cldrToSearch;
    var billableValue = "";
    var searchQuery = "";
    var selectedFromDate = new Date(fromDateCldrWidget.year, fromDateCldrWidget.month - 1, fromDateCldrWidget.day).toYYYYMMDD("");
    var selectedToDate = new Date(toDateCldrWidget.year, toDateCldrWidget.month - 1, toDateCldrWidget.day).toYYYYMMDD("");
    var selectedStatusValues = kony.apps.coe.ess.myTime.Search.statusIdString;
    if (frmSearchMyTime.lbShow.selectedKey === "lb1") {
        billableValue = "('0','1')";
    } else if(frmSearchMyTime.lbShow.selectedKey === "lb2"){
        billableValue = "('1')";
    }
  else{
        billableValue = "('0')";
  }
    if (frmSearchMyTime.lbView.selectedKey === "lb1") {
        //Todo status is getting as not configured .Need to figure out it .
      	if(selectedStatusValues=== "")
          {
            searchQuery = "select ts.Id as timesheetID, ts.Start_Date as StartDate, ts.End_Date as EndDate, sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable, ts.Status_Id as Status,s.Status_Name as StatusName from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id left join Status s on s.Id = ts.Status_Id WHERE ((ts.Start_Date <= '"+selectedFromDate+"' and ts.End_Date >= '"+selectedFromDate+"') or (ts.Start_Date <= '"+selectedToDate+"' and ts.End_Date >= '"+selectedToDate+"') or (ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "')) and te.StatusId != '3' group by ts.Id having p.isBillable IN " + billableValue + " ;";
          }
      else
        {
        	searchQuery = "select ts.Id as timesheetID, ts.Start_Date as StartDate, ts.End_Date as EndDate, sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable, ts.Status_Id as Status,s.Status_Name as StatusName from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id left join Status s on s.Id = ts.Status_Id WHERE ((ts.Start_Date <= '"+selectedFromDate+"' and ts.End_Date >= '"+selectedFromDate+"') or (ts.Start_Date <= '"+selectedToDate+"' and ts.End_Date >= '"+selectedToDate+"') or (ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "')) and te.StatusId != '3' group by ts.Id having p.isBillable IN  " + billableValue + " and ts.Status_Id  IN ( " + selectedStatusValues + ");";
        }
    } else {
        searchQuery = "select sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable,p.Project_Name as ProjectName  from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id group by p.Project_Name having p.isBillable IN  " + billableValue + "  and ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "';";
    }
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", searchQuery, searchSuccessCallBack, searchFailureCallBack);
    /**
     * Suucess CallBack for search Operation
     */
    function searchSuccessCallBack(response) {
        kony.print("-- Start searchSuccessCallBack --");
        var data = response;
        var widgetMap = null;
        var rowTemplate = null;
        if (data !== null && data !== undefined && data.length !== 0) {
          	frmSearchMyTime.segSearchResults.setVisibility(true);
          	frmSearchMyTime.noResultsLbl.setVisibility(false);
            if (frmSearchMyTime.lbView.selectedKey === "lb1") {
                for (var count = 0; count < data.length; count++) {
                    data[count].template = flxSegSearchTimesheets;
                  	data[count].Definition = kony.apps.coe.ess.globalVariables.timesheetLengthConfig;
                    data[count].Duration = kony.apps.coe.ess.myTime.Search.toDDMON(data[count].StartDate.toString()) + "-" + kony.apps.coe.ess.myTime.Search.toDDMON(data[count].EndDate.toString());
                    data[count].StatusImg = kony.apps.coe.ess.myTime.Search.StatusImageInfo[data[count].Status];
                }
                //Todo Need to implement img for status 
                widgetMap = {
                    "lblTime": "Duration",
                  	"lblStat" :"Definition",
                    "lblDuration": "ActualHours",
                    "imgStat": "StatusImg"
                };
                rowTemplate = flxSegSearchTimesheets;
            } else {
                for (var projectCount = 0; projectCount < data.length; projectCount++) {
                    data[projectCount].template = flxSegSearchProjectsBig;
                    if (data[projectCount].Billable === "1") {
                        data[projectCount].Billable = "Billable";
                    } else {
                        data[projectCount].Billable = "Not Billable";
                    }
                }
                widgetMap = {
                    "lblProjectName": "ProjectName",
                    "lblTimeType": "Billable",
                    "lblDuration": "ActualHours"
                };
                rowTemplate = flxSegSearchProjects;
            }
            frmSearchMyTime.segSearchResults.rowTemplate = rowTemplate;
            frmSearchMyTime.segSearchResults.widgetDataMap = widgetMap;
            frmSearchMyTime.segSearchResults.setVisibility(true);
            frmSearchMyTime.segSearchResults.setData(data);
        } else {
          	frmSearchMyTime.segSearchResults.removeAll();
          	frmSearchMyTime.segSearchResults.setVisibility(false);
          	frmSearchMyTime.noResultsLbl.setVisibility(true);
        }
        frmSearchMyTime.segSearchResults.onRowClick = kony.apps.coe.ess.myTime.Search.viewTimesheetDetails;
        kony.print("-- End searchSuccessCallBack --");
    }
    /**
     * Failure CallBack for Search Operation
     */
    function searchFailureCallBack(response) {
        kony.print("-- Start searchSuccessCallBack --");
		handleError(response);
        kony.print("-- End searchSuccessCallBack --");
    }

    kony.print("-- End handleSearchOperation --");
};
/**
 * Converts dateString to DD MON format
 */
kony.apps.coe.ess.myTime.Search.toDDMON = function(dateString) {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    var date = new Date(year, month - 1, day);
    var curr_date = date.getDate();
    var curr_month = kony.apps.coe.ess.myTime.nToStr.month[date.getMonth()];
    return curr_date + " " + curr_month;

};
/**
 * Hide Filter Function
 */
kony.apps.coe.ess.myTime.Search.onClickHideFilters = function() {
    var widgetMap = null;
    var rowTemplate = null;
    var data = null;
    data = frmSearchMyTime.segSearchResults.data;
    frmSearchMyTime.flxHideFilters.setVisibility(false);
    frmSearchMyTime.flxShowFilters.setVisibility(true);
  
  	frmSearchMyTime.lbView.setVisibility(false);
  	frmSearchMyTime.lbShow.setVisibility(false);  
  	frmSearchMyTime.flxSearchContainer.animate(
        kony.ui.createAnimation({
            100: {
                height: "0%",
            }
        }), {
            fillMode: kony.anim.FILL_MODE_FORWARDS,
            duration: 0.5
        });
    frmSearchMyTime.flxResults.height = "84%";
    frmSearchMyTime.segSearchResults.setVisibility(true);
    if (data !== null && data !== undefined && data.length !== 0) {
        frmSearchMyTime.segSearchResults.rowTemplate = frmSearchMyTime.segSearchResults.data[0].template;
        if (frmSearchMyTime.lbView.selectedKey === "lb1") {
            for (var count = 0; count < data.length; count++) {
                data[count].template = flxSegSearchTimesheetsBig;
            }
            widgetMap = {
                "lblTime": "Duration",
              	 "lblStat" :"Definition",
                "lblDuration": "ActualHours",
                "imgStat": "StatusImg"
            };
        } else {
            for (var prcount = 0; prcount < data.length; prcount++) {
                data[prcount].template = flxSegSearchProjectsBig;
            }
            widgetMap = {
                "lblProjectName": "ProjectName",
                "lblTimeType": "Billable",
                "lblDuration": "ActualHours"
            };
        }
        frmSearchMyTime.segSearchResults.widgetDataMap = widgetMap;
        frmSearchMyTime.segSearchResults.setData(data);
    }else{
      	frmSearchMyTime.segSearchResults.setVisibility(false);
        frmSearchMyTime.noResultsLbl.setVisibility(true);
    }



};
/**
 * Show Filter Function
 */
kony.apps.coe.ess.myTime.Search.onClickShowFilters = function() {
    var widgetMap = null;
    var rowTemplate = null;
    var data = null;
  	var height = null;
    data = frmSearchMyTime.segSearchResults.data;
  	var selectedKey = frmSearchMyTime.lbView.selectedKey;
  	if (selectedKey === "lb2") {
        //User Selected Timesheets
        frmSearchMyTime.flxStatusField.setVisibility(false);
        height = "26%";
        frmSearchMyTime.flxFromTo.height = "33%";
        frmSearchMyTime.flxViewShow.height = "33%";
        frmSearchMyTime.flxStatusField.height = "0%";
        frmSearchMyTime.flxListResults.height = "33%";
        frmSearchMyTime.flxResults.height = "57.5%";
    } else {
        //User Selected Projects
        height = "36%";
        frmSearchMyTime.flxFromTo.height = "25%";
        frmSearchMyTime.flxViewShow.height = "25%";
        frmSearchMyTime.flxStatusField.height = "25%";
        frmSearchMyTime.flxListResults.height = "25%";
        frmSearchMyTime.flxStatusField.setVisibility(true);
        frmSearchMyTime.flxResults.height = "48%";
    }
    frmSearchMyTime.flxSearchContainer.animate(
        kony.ui.createAnimation({
            100: {
                height: height,
            }
        }), {
            fillMode: kony.anim.FILL_MODE_FORWARDS,
            duration: 0.5
        }, {
    	    "animationEnd": function(){
	  			frmSearchMyTime.lbView.setVisibility(true);
  				frmSearchMyTime.lbShow.setVisibility(true);
        }
    });
    
  	frmSearchMyTime.flxHideFilters.setVisibility(true);
    frmSearchMyTime.flxShowFilters.setVisibility(false);
  	frmSearchMyTime.segSearchResults.setVisibility(true);
   if (data !== null && data !== undefined && data.length !== 0) {
      frmSearchMyTime.segSearchResults.rowTemplate = frmSearchMyTime.segSearchResults.data[0].template;
      if (selectedKey=== "lb1") {
          for (var count = 0; count < data.length; count++) {
              data[count].template = flxSegSearchTimesheets;
          }
          widgetMap = {
              "lblTime": "Duration",
               "lblStat" :"Definition",
              "lblDuration": "ActualHours",
              "imgStat": "StatusImg"
          };
      } else {
          for (var prcount = 0; prcount < data.length; prcount++) {
              data[prcount].template = flxSegSearchProjects;
          }
          widgetMap = {
              "lblProjectName": "ProjectName",
              "lblTimeType": "Billable",
              "lblDuration": "ActualHours"
          };
      }
      frmSearchMyTime.segSearchResults.widgetDataMap = widgetMap;
      frmSearchMyTime.segSearchResults.setData(data);
   }else{
     frmSearchMyTime.segSearchResults.setVisibility(false);
     frmSearchMyTime.noResultsLbl.setVisibility(true);
   } 
};
/**
 *Init Function
 */
kony.apps.coe.ess.myTime.Search.initFunction = function(){
  	frmSearchMyTime.segSearchResults.removeAll();
  	var todayDate = new Date();
   frmSearchMyTime.cldrFromSearch.date = [todayDate.getDate(), todayDate.getMonth() + 1, todayDate.getFullYear()];
   frmSearchMyTime.cldrToSearch.date = [todayDate.getDate(), todayDate.getMonth() + 1, todayDate.getFullYear()];
   frmSearchMyTime.lbView.onSelection = function() {
        kony.apps.coe.ess.myTime.Search.onViewOptionsSelect();
   };
};
/**
 *View Timesheet Details when a timesheet is clicked on search results
 */
 kony.apps.coe.ess.myTime.Search.viewTimesheetDetails = function(){
    if(frmSearchMyTime.segSearchResults.selectedRowItems[0].Status=='5'){
        var sDate = frmSearchMyTime.segSearchResults.selectedRowItems[0].StartDate;
        var toDate = new Date(sDate.slice(0,4),parseInt(sDate.slice(4,6))-1,sDate.slice(6,8));
      kony.apps.coe.ess.MyTime.Footer.SetFooterNavigation(1,toDate);
    }
    else{
        kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId = frmSearchMyTime.segSearchResults.selectedRowItems[0].timesheetID;
        showViewTimeSheetForm();
    }

 };
 /**
 *Reset functionality for search screen
 */
 kony.apps.coe.ess.myTime.Search.handleReset = function(){
    frmSearchMyTime.segSearchResults.removeAll();
   	frmSearchMyTime.noResultsLbl.setVisibility(false);
    var todayDate = new Date();
    frmSearchMyTime.cldrFromSearch.date = [todayDate.getDate(), todayDate.getMonth() + 1, todayDate.getFullYear()];
    frmSearchMyTime.cldrToSearch.date = [todayDate.getDate(), todayDate.getMonth() + 1, todayDate.getFullYear()];   
    frmSearchMyTime.lblStatusSelectedSearch.text = kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.statusNone");
  	if (frmSearchMyTime.lbView.selectedKey === "lb2") {
        frmSearchMyTime.flxSearchContainer.height = "36%";
        frmSearchMyTime.flxFromTo.height = "25%";
        frmSearchMyTime.flxViewShow.height = "25%";
        frmSearchMyTime.flxStatusField.height = "25%";
        frmSearchMyTime.flxListResults.height = "25%";
        frmSearchMyTime.flxStatusField.setVisibility(true);
        frmSearchMyTime.flxResults.height = "48%";
    } 
    frmSearchMyTime.lbView.selectedKey = "";
    frmSearchMyTime.lbShow.selectedKey = "";
    kony.apps.coe.ess.myTime.Search.statusIdString = "";
 };

 /**
 * Start Date selection Event 
 */
 kony.apps.coe.ess.myTime.Search.handleStartDateEvent = function(){
   var fromDateCldrWidget = frmSearchMyTime.cldrFromSearch;
   var toDateCldrWidget = frmSearchMyTime.cldrToSearch;
   var selectedFromDate = new Date(fromDateCldrWidget.year, fromDateCldrWidget.month - 1, fromDateCldrWidget.day);
   var selectedToDate = new Date(toDateCldrWidget.year, toDateCldrWidget.month - 1, toDateCldrWidget.day);
   if(selectedToDate <selectedFromDate ){
     frmSearchMyTime.cldrToSearch.date =  [selectedFromDate.getDate(), selectedFromDate.getMonth() + 1, selectedFromDate.getFullYear()];
   }
   toDateCldrWidget.validStartDate = [fromDateCldrWidget.day, fromDateCldrWidget.month, fromDateCldrWidget.year];
 };