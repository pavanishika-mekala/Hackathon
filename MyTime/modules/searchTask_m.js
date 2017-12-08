/**
 *  @author     Laxmikanth.Patlolla
 *  @category   functionality.
 *  @desc
 *  @ © 2017    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.SearchTask = kony.apps.coe.ess.myTime.SearchTask || {};
kony.apps.coe.ess.myTime.SearchTask = function() {
    kony.print("-- Start SearchTask --");
    kony.print("-- End SearchTask --");
};

/**
 * @class       SearchTask
 * @type        function
 * @param       placehonder value of textbox 
 * return       None.
 * desc         This method searches project according to content entered in textbox and based on listbox selection
 */
kony.apps.coe.ess.myTime.SearchTask.executeQuery = function(query) {
    try {
        kony.print("-- Start searchProject --");
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, kony.apps.coe.ess.myTime.SearchTask.success, kony.apps.coe.ess.myTime.SearchTask.failure);
        kony.print("-- End searchProject --");
    } catch (e) {
        handleError("Error in query: " + e);
    }
};

/**
 * @class       SearchTask
 * @type        function
 * @param       response of query 
 * return       None.
 * desc         Sets segment data
 */
kony.apps.coe.ess.myTime.SearchTask.success = function(resposne) {
    kony.print("-- Start success --");
    if (resposne === undefined || resposne === null || resposne.length <= 0) {
        frmRecentTasks.segTasks.setVisibility(false);
        frmRecentTasks.flxNoResults.setVisibility(true);
        flxMoreOptions.flxAddTask.setVisibility(true);
    } else {
        var processedData = [];
        for (var i = 0; i < resposne.length; i++) {
            processedData.push({
                projectName: (resposne[i].Project_Name === undefined || resposne[i].Project_Name === null) ? "" : resposne[i].Project_Name,
                taskName: (resposne[i].Task_Name === undefined || resposne[i].Task_Name === null) ? "" : resposne[i].Task_Name,
                orderId: resposne[i].Type + "-" + resposne[i].ptid,
                activityOrder: (resposne[i].tid === undefined || resposne[i].tid === null) ? "" : "A.O - " + resposne[i].tid,
                projectId: (resposne[i].ptid === undefined || resposne[i].ptid === null) ? "" : resposne[i].ptid,
                projectType: (resposne[i].Type === undefined || resposne[i].Type === null) ? "" : resposne[i].Type
            });
        }
        frmRecentTasks.segTasks.widgetDataMap = {
            "lblProjectName": "projectName",
            "lblTaskName": "taskName",
            "lblNetworkOrder": "orderId",
            "lblActivity": "activityOrder"
        };
        frmRecentTasks.segTasks.setData(processedData);
        frmRecentTasks.segTasks.setVisibility(true);
        frmRecentTasks.flxNoResults.setVisibility(false);
        flxMoreOptions.flxAddTask.setVisibility(false);
    }
    kony.print("-- End success --");
};

/**
 * @class       SearchTask
 * @type        function
 * @param       error message 
 * return       None.
 * desc         Displays error message
 */
kony.apps.coe.ess.myTime.SearchTask.failure = function(error) {
    kony.print("-- Start failure --");
    kony.print("Error in searching tasks" + error);
    handleError("Error in searching tasks" + error);
    kony.print("-- End failure --");
};

/**
 * @class       SearchTask
 * @type        function
 * @param       selected listbox item value 
 * return       None.
 * desc         Changes UI accordingly
 */
kony.apps.coe.ess.myTime.SearchTask.listBoxSelection = function(selectedValue) {
    kony.print("-- Start listBoxSelection --");
    frmRecentTasks.lblSelectedCriteria.setVisibility(false);
    switch (selectedValue) {
        case "Cost Center":
            frmRecentTasks.flxGlobalSearch.setVisibility(true);
            frmRecentTasks.flxWorkCenter.setVisibility(false);
            frmRecentTasks.flxTwoBox.setVisibility(false);
            frmRecentTasks.segTasks.height = "100%";
            frmRecentTasks.imgStatus.src = "search_check.png"
            frmRecentTasks.lblSelectedCriteria.setVisibility(true);
            frmRecentTasks.txtFieldGlobalSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmSearchTask.costcenter");
            break;
        case "Network Order":
            frmRecentTasks.flxGlobalSearch.setVisibility(true);
            frmRecentTasks.flxWorkCenter.setVisibility(false);
            frmRecentTasks.flxTwoBox.setVisibility(false);
            frmRecentTasks.segTasks.height = "100%";
            frmRecentTasks.imgStatus.src = "search_check.png"
            frmRecentTasks.lblSelectedCriteria.setVisibility(true);
            frmRecentTasks.txtFieldGlobalSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmRecentTasks.networkorder");
            break;
        case "Activity Operation":
            frmRecentTasks.flxGlobalSearch.setVisibility(true);
            frmRecentTasks.flxWorkCenter.setVisibility(false);
            frmRecentTasks.flxTwoBox.setVisibility(false);
            frmRecentTasks.segTasks.height = "100%";
            frmRecentTasks.imgStatus.src = "search_check.png"
            frmRecentTasks.lblSelectedCriteria.setVisibility(true);
            frmRecentTasks.txtFieldGlobalSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmRecentTasks.activityoper");
            break;
        case "Cost Center, Activity":
            frmRecentTasks.flxGlobalSearch.setVisibility(false);
            frmRecentTasks.flxWorkCenter.setVisibility(false);
            frmRecentTasks.flxTwoBox.setVisibility(true);
            frmRecentTasks.segTasks.height = "92%";
            frmRecentTasks.imgStatus.src = "search_check.png"
            frmRecentTasks.lblSelectedCriteria.setVisibility(true);
            frmRecentTasks.txtBoxNetworkOrder.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmSearchTask.costcenter");
            frmRecentTasks.txtBoxActivityOperation.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmRecentTasks.activityoper");
            break;
        case "Network Order, Activity Operation":
            frmRecentTasks.flxGlobalSearch.setVisibility(false);
            frmRecentTasks.flxWorkCenter.setVisibility(false);
            frmRecentTasks.flxTwoBox.setVisibility(true);
            frmRecentTasks.segTasks.height = "92%";
            frmRecentTasks.imgStatus.src = "search_check.png"
            frmRecentTasks.lblSelectedCriteria.setVisibility(true);
            frmRecentTasks.txtBoxNetworkOrder.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmRecentTasks.networkorder");
            frmRecentTasks.txtBoxActivityOperation.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmRecentTasks.activityoper");
            break;
        case "Network Order, Activity Operation, Work Center":
            frmRecentTasks.flxGlobalSearch.setVisibility(false);
            frmRecentTasks.flxWorkCenter.setVisibility(true);
            frmRecentTasks.flxTwoBox.setVisibility(false);
            frmRecentTasks.segTasks.height = "82%";
            frmRecentTasks.lblSelectedCriteria.setVisibility(true);
            frmRecentTasks.imgStatus.src = "search_check.png"
            break;
        default:
            frmRecentTasks.flxGlobalSearch.setVisibility(true);
            frmRecentTasks.flxWorkCenter.setVisibility(false);
            frmRecentTasks.flxTwoBox.setVisibility(false);
            frmRecentTasks.segTasks.height = "100%";
            frmRecentTasks.lblSelectedCriteria.setVisibility(false);
            frmRecentTasks.imgStatus.src = "search_uncheck.png"
            frmRecentTasks.txtFieldGlobalSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmRecentTasks.globalsearch");
            break;
    }
    kony.print("-- End listBoxSelection --");
};

/**
 * @class       SearchTask
 * @type        function
 * @param       selected listbox item value 
 * return       None.
 * desc         Searches according to values entered
 */
kony.apps.coe.ess.myTime.SearchTask.searchProjectTask = function(selectedValue) {
    var query = "select t.task_name, p.project_name,p.id as pid,t.id as tid, pt.type,pt.id as ptid from project_task pt left join project p on p.id=pt.project_id  left join task t on t.id=pt.task_id";
    var ccID = "";
    var networkOrderID = "";
    var activityOperID = "";
    switch (selectedValue) {
        case "Cost Center":
            ccID = frmRecentTasks.txtFieldGlobalSearch.text === null ? "" : frmRecentTasks.txtFieldGlobalSearch.text;
            query += " where pt.id like '%" + ccID + "%' AND pt.type='CC'";
            break;
        case "Network Order":
            networkOrderID = frmRecentTasks.txtFieldGlobalSearch.text;
            query += " where pt.id like '%" + networkOrderID + "%' AND pt.type='NO'";
            break;
        case "Activity Operation":
            activityOperID = frmRecentTasks.txtFieldGlobalSearch.text;
            query += " where pt.task_id like '%" + activityOperID + "%'";
            break;
        case "Cost Center, Activity":
            ccID = frmRecentTasks.txtBoxNetworkOrder.text;
            activityOperID = frmRecentTasks.txtBoxActivityOperation.text;
            query += " where (pt.id like '%" + ccID + "%' AND pt.type='CC') AND (pt.task_id like '%" + activityOperID + "%')";
            break;
        case "Network Order, Activity Operation":
            networkOrderID = frmRecentTasks.txtBoxNetworkOrder.text;
            activityOperID = frmRecentTasks.txtBoxActivityOperation.text;
            query += " where (pt.id like '%" + networkOrderID + "%' AND pt.type='NO') AND (pt.task_id like '%" + activityOperID + "%')";
            break;
        case "Network Order, Activity Operation, Work Center":
            networkOrderID = frmRecentTasks.txtFieldNetwork.text;
            activityOperID = frmRecentTasks.txtFieldActivity.text;
            query += " where (pt.id like '%" + networkOrderID + "%' AND pt.type='NO') AND (pt.task_id like '%" + activityOperID + "%')";
            break;
        default:
            ccID = frmRecentTasks.txtFieldGlobalSearch.text;
            query += " where p.Project_Name like '%" + ccID + "%' OR t.task_name like '%" + ccID + "%' OR pt.project_id like '%" + ccID + "%' OR pt.task_id like '%" + ccID + "%' OR pt.id like '%" + ccID + "%' order by p.id";
    }
    kony.apps.coe.ess.myTime.SearchTask.executeQuery(query);
};

/**
 * @class       SearchTask
 * @type        function
 * @param       selected listbox item value 
 * return       None.
 * desc         Does online search according to values entered
 */
kony.apps.coe.ess.myTime.SearchTask.onlineSearch = function(selectedValue) {
    kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    var modelName = "MYTIME";
    var dataObject = "Project_Task";
    var ccID = "";
    var networkOrderID = "";
    var activityOperID = "";
    var params = "";
    switch (selectedValue) {
        case "Cost Center":
            ccID = frmRecentTasks.txtFieldGlobalSearch.text;
            if (String.isEmpty(ccID)) {
                handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
                return;
            } else {
                params = "substringof(Project_Id,'" + ccID + "') and substringof(Type,'CC')";
            }
            break;
        case "Network Order":
            ccID = frmRecentTasks.txtFieldGlobalSearch.text;
            if (String.isEmpty(ccID)) {
                handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
                return;
            } else {
                params = "substringof(Project_Id,'" + ccID + "') and substringof(Type,'NO')";
            }
            break;
        case "Activity Operation":
            activityOperID = frmRecentTasks.txtFieldGlobalSearch.text;
            if (String.isEmpty(activityOperID)) {
                handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
                return;
            } else {
                params = "substringof(Task_Id,'" + activityOperID + "')";
            }
            break;
        case "Cost Center, Activity":
            ccID = frmRecentTasks.txtBoxNetworkOrder.text;
            activityOperID = frmRecentTasks.txtBoxActivityOperation.text;
            if (String.isEmpty(ccID) || String.isEmpty(activityOperID)) {
                handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
                return;
            } else {
                params = "(substringof(Project_Id,'" + ccID + "') and substringof(Type,'CC')) and (substringof(Task_Id,'" + activityOperID + "'))";
            }
            break;
        case "Network Order, Activity Operation":
            ccID = frmRecentTasks.txtBoxNetworkOrder.text;
            activityOperID = frmRecentTasks.txtBoxActivityOperation.text;
            if (String.isEmpty(ccID) || String.isEmpty(activityOperID)) {
                handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
                return;
            } else {
                params = "(substringof(Project_Id,'" + ccID + "') and substringof(Type,'NO')) and (substringof(Task_Id,'" + activityOperID + "'))";
            }
            break;
        case "Network Order, Activity Operation, Work Center":
            ccID = frmRecentTasks.txtFieldNetwork.text;
            activityOperID = frmRecentTasks.txtFieldActivity.text;
            if (String.isEmpty(ccID) || String.isEmpty(activityOperID)) {
                handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
                return;
            } else {
                params = "(substringof(Project_Id,'" + ccID + "') and substringof(Type,'CC')) and (substringof(Task_Id,'" + activityOperID + "'))";
            }
            break;
        default:
            ccID = frmRecentTasks.txtFieldGlobalSearch.text;
            if (String.isEmpty(ccID)) {
                handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
                return;
            } else {
                params = "substringof(Project_Id,'" + ccID + "') or substringof(Task_Id,'" + ccID + "') or substringof(id,'" + ccID + "')";
            }
            break;
    }
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(modelName, {
        "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(dataObject);
    dataObject.setOdataUrl("$filter= " + params);
    var options = {
        "dataObject": dataObject
    };
    objSvc.fetch(options, kony.apps.coe.ess.myTime.SearchTask.onlineSuccess, kony.apps.coe.ess.myTime.SearchTask.onlineFailure);
};
/**
 * @class       SearchTask
 * @type        function
 * @param       response 
 * return       None.
 * desc         Sets data to segment
 */
kony.apps.coe.ess.myTime.SearchTask.onlineSuccess = function(response) {
    kony.application.dismissLoadingScreen();
    if (response.records != '') {
        response = response.records;
        var projectTasks = [];
        for (var i = 0; i < response.length; i++) {
            projectTasks.push({
                Project_Name: response[i].Project[0].Project_Name,
                Task_Name: (response[i].Task !== undefined) ? response[i].Task[0].Task_Name : null,
                Type: response[i].Type,
                ptid: response[i].id,
                tid: response[i].Task_Id
            });

        }
        kony.apps.coe.ess.myTime.SearchTask.success(projectTasks);
    } else {
        frmRecentTasks.segTasks.setVisibility(false);
        frmRecentTasks.flxNoResults.setVisibility(true);
        flxMoreOptions.flxAddTask.setVisibility(true);
    }
};

/**
 * @class       SearchTask
 * @type        function
 * @param       error 
 * return       None.
 * desc         Displays error message
 */
kony.apps.coe.ess.myTime.SearchTask.onlineFailure = function(error) {
    kony.application.dismissLoadingScreen();
    handleError("Error in online: " + JSON.stringify(error));
};
/**
 * @class       SearchTask
 * @type        function
 * @param       selected listbox item value 
 * return       None.
 * desc         Searches according to values entered
 */
kony.apps.coe.ess.myTime.SearchTask.addAsNewTask = function(selectedValue) {
    var taskName = "";
    var projectName = "";
    var taskType = "";
    switch (selectedValue) {
        case "Cost Center":
            projectName = frmRecentTasks.txtFieldGlobalSearch.text;
            taskType = "CC";
            break;
        case "Network Order":
            projectName = frmRecentTasks.txtFieldGlobalSearch.text;
            taskType = "NO";
            break;
        case "Activity Operation":
            taskName = frmRecentTasks.txtFieldGlobalSearch.text;
            break;
        case "Cost Center, Activity":
            projectName = frmRecentTasks.txtBoxNetworkOrder.text;
            taskName = frmRecentTasks.txtBoxActivityOperation.text;
            taskType = "CC";
            break;
        case "Network Order, Activity Operation":
            projectName = frmRecentTasks.txtBoxNetworkOrder.text;
            taskName = frmRecentTasks.txtBoxActivityOperation.text;
            taskType = "NO";
            break;
        case "Network Order, Activity Operation, Work Center":
            projectName = frmRecentTasks.txtFieldNetwork.text;
            taskName = frmRecentTasks.txtFieldActivity.text;
            taskType = "NO";
            break;
        default:
            projectName = frmRecentTasks.txtFieldGlobalSearch.text;
            taskType = "CC";
            break;
    }
    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = projectName;
    if (taskType !== "") {
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = taskType;
    }
    if (taskName !== "") {
        kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = taskName;
    }
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(projectName);
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateTimeType(null);
    kony.apps.coe.ess.myTime.TimesheetCreate.updateReadOnlyForTimeEntry.updateActivityDesc(null);
    frmTimeSheetCreate.show();
};

/**
 * @class       SearchTask
 * @type        function
 * @param       None 
 * return       None.
 * desc         Resets search criteria fields
 */
kony.apps.coe.ess.myTime.SearchTask.resetSearchCriteria = function() {
    frmRecentTasks.flxGlobalSearch.setVisibility(true);
    frmRecentTasks.flxWorkCenter.setVisibility(false);
    frmRecentTasks.flxTwoBox.setVisibility(false);
    frmRecentTasks.listBoxCriteria.selectedKey = "lb1";
    frmRecentTasks.txtFieldGlobalSearch.text = "";
    frmRecentTasks.txtFieldGlobalSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmRecentTasks.globalsearch");
    frmRecentTasks.imgStatus.src = "search_uncheck.png";
};

kony.apps.coe.ess.myTime.SearchTask.onSelectionOfListBox = function(listbox) {

    if (listbox.selectedKey == "lb1") {
        frmRecentTasks.imgStatus.src = "search_uncheck.png";
    } else {
        frmRecentTasks.imgStatus.src = "search_check.png";
    }
	var selectedKeyValue=String(listbox.selectedKeyValue[1]);
	var selectedKeyValue_array = selectedKeyValue.split(',');	
	
    if (selectedKeyValue_array.length == 2 ) {
        frmRecentTasks.flxGlobalSearch.setVisibility(false);
		frmRecentTasks.flxWorkCenter.setVisibility(false);
        frmRecentTasks.flxTwoBox.setVisibility(true);
		frmRecentTasks.txtBoxNetworkOrder.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.SearchTask.getLocalizedStr(selectedKeyValue_array[0].trim()));
		frmRecentTasks.txtBoxActivityOperation.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.SearchTask.getLocalizedStr(selectedKeyValue_array[1].trim()));
        frmRecentTasks.flxSearchCriteria.height = "22%";
    } else if (selectedKeyValue_array.length == 3) {
        frmRecentTasks.flxGlobalSearch.setVisibility(false);
		frmRecentTasks.flxTwoBox.setVisibility(false);
        frmRecentTasks.flxWorkCenter.setVisibility(true);
		frmRecentTasks.txtFieldNetwork.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.SearchTask.getLocalizedStr(selectedKeyValue_array[0].trim()));
		frmRecentTasks.txtFieldActivity.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.SearchTask.getLocalizedStr(selectedKeyValue_array[1].trim()));
		frmRecentTasks.txtFieldWorkCenter.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.SearchTask.getLocalizedStr(selectedKeyValue_array[2].trim()));
        frmRecentTasks.flxSearchCriteria.height = "32%";
    } else {
        frmRecentTasks.flxTwoBox.setVisibility(false);
        frmRecentTasks.flxWorkCenter.setVisibility(false);
        frmRecentTasks.flxSearchCriteria.height = "15%";
		frmRecentTasks.flxGlobalSearch.setVisibility(true);
		frmRecentTasks.txtFieldGlobalSearch.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.SearchTask.getLocalizedStr(selectedKeyValue_array[0].trim()));
    }
    frmRecentTasks.flxScrollTasks.top = "0%";
    frmRecentTasks.forceLayout();
};

kony.apps.coe.ess.myTime.SearchTask.getLocalizedStr = function(localizedStr) {
var localizedString;
switch (localizedStr) {
        case "Cost Center":
            localizedString="i18n.ess.frmSearchTask.costcenter";
            break;
        case "Network Order":
            localizedString="i18n.ess.frmRecentTasks.networkorder";
            break;
		case "Activity Operation":
            localizedString="i18n.ess.frmRecentTasks.activityoper";
            break;
		case "Activity":
            localizedString="i18n.ess.frmRecentTasks.activityoper";
            break;
		case "Work Center":
            localizedString="i18n.ess.frmRecentTasks.workcenter";
            break;
    }
return localizedString;
};