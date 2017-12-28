/**
 *  @author     Prabhjot Singh
 *  @category   functionality.
 *  @desc
 *  @ © 2017    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime= kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.Tab = kony.apps.coe.ess.myTime.Tab || {};
kony.apps.coe.ess.myTime.Tab.SearchTask = kony.apps.coe.ess.myTime.Tab.SearchTask || {};
kony.apps.coe.ess.myTime.Tab.SearchTask = function() {
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
kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam ="Free Search";
kony.apps.coe.ess.myTime.Tab.SearchTask.data =[];
kony.apps.coe.ess.myTime.Tab.SearchTask.executeQuery = function(query) {
  try {
    kony.print("-- Start searchProject --");
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, kony.apps.coe.ess.myTime.Tab.SearchTask.success, kony.apps.coe.ess.myTime.Tab.SearchTask.failure);
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
kony.apps.coe.ess.myTime.Tab.SearchTask.success = function(resposne) {
  kony.print("-- Start success --");
  kony.print("####response"+resposne);
  kony.print("resposne.length"+resposne.length);
  kony.print("kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam"+kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam);

  if (resposne === undefined || resposne === null || resposne.length <= 0) {
    //  frmTimeSheetCreateTab.segTasks.zIndex =10;
    //frmTimeSheetCreateTab.flxSearchPopup.zIndex =11;
    if(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam =="Free Search")
    {
      frmTimeSheetCreateTab.segTasks.isVisible=false;
      frmTimeSheetCreateTab.flxSearchAddTask.isVisible=true;
      frmTimeSheetCreateTab.flxNoResultsHeader.isVisible=true;
      frmTimeSheetCreateTab.lblOnlineSearchResult.isVisible=false;
      frmTimeSheetCreateTab.lblNoOnlineResult.isVisible=false;
      
    }
    else
    {
      frmTimeSheetCreateTab.flxAdvancedSearchPopup.isVisible = true; 
      frmTimeSheetCreateTab.segAdvancedSearchResults.isVisible = false;  
      frmTimeSheetCreateTab.lblOnlineSearchResult.isVisible=false;
      frmTimeSheetCreateTab.lblNoOnlineResult.isVisible=false;
      showAdvancedSearchResults();
    }

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

    //Normal Search
    if(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam =="Free Search")
    {
      frmTimeSheetCreateTab.segTasks.isVisible=true;
      frmTimeSheetCreateTab.flxSearchAddTask.isVisible=false;
      frmTimeSheetCreateTab.flxNoResultsHeader.isVisible=false;
      frmTimeSheetCreateTab.segTasks.widgetDataMap = {
        "lblProjectName": "projectName",
        "lblTaskName": "taskName",
        "lblNetworkOrder": "orderId",
        "lblActivity": "activityOrder"
      };
      frmTimeSheetCreateTab.segTasks.setData(processedData);
      frmTimeSheetCreateTab.segTasks.setVisibility(true);
    }
    //Advanced Search     
    else
    { 
      frmTimeSheetCreateTab.segAdvancedSearchResults.widgetDataMap = {
        "lblProjectName": "projectName",
        "lblTaskName": "taskName",
        "lblNetworkOrder": "orderId",
        "lblActivity": "activityOrder"
      };
      frmTimeSheetCreateTab.segAdvancedSearchResults.setData(processedData);
      frmTimeSheetCreateTab.flxAdvancedSearchPopup.isVisible = false; 
      frmTimeSheetCreateTab.segAdvancedSearchResults.isVisible = true; 
      showAdvancedSearchResults();
    }

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
kony.apps.coe.ess.myTime.Tab.SearchTask.failure = function(error) {
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
kony.apps.coe.ess.myTime.Tab.SearchTask.listBoxSelection = function(selectedValue) {
  kony.print("-- Start listBoxSelection --");
  frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(false);
  switch (selectedValue) {
    case "Cost Center":
      frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(true);
      frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
      frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
      frmTimeSheetCreateTab.segTasks.height = "100%";
      frmTimeSheetCreateTab.imgStatus.src = "search_check.png";
      frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(true);
      frmTimeSheetCreateTab.txtBoxSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmSearchTask.costcenter");
      frmTimeSheetCreateTab.flexContain1.isVisible=true;
      frmTimeSheetCreateTab.flexContain2.isVisible=false;
      frmTimeSheetCreateTab.flexContain3.isVisible=false;  
      break;
    case "Network Order":
      frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(true);
      frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
      frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
      frmTimeSheetCreateTab.segTasks.height = "100%";
      frmTimeSheetCreateTab.imgStatus.src = "search_check.png";
      frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(true);
      frmTimeSheetCreateTab.txtBoxSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreateTab.networkorder");
      frmTimeSheetCreateTab.flexContain1.isVisible=true;
      frmTimeSheetCreateTab.flexContain2.isVisible=false;
      frmTimeSheetCreateTab.flexContain3.isVisible=false;    
      break;
    case "Activity Operation":
      frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(true);
      frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
      frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
      frmTimeSheetCreateTab.segTasks.height = "100%";
      frmTimeSheetCreateTab.imgStatus.src = "search_check.png";
      frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(true);
      frmTimeSheetCreateTab.txtBoxSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreateTab.activityoper");
      frmTimeSheetCreateTab.flexContain1.isVisible=true;
      frmTimeSheetCreateTab.flexContain2.isVisible=false;
      frmTimeSheetCreateTab.flexContain3.isVisible=false;  
      break;
    case "Cost Center, Activity":
      frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(false);
      frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
      frmTimeSheetCreateTab.flxTwoBox.setVisibility(true);
      frmTimeSheetCreateTab.segTasks.height = "92%";
      frmTimeSheetCreateTab.imgStatus.src = "search_check.png"
      frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(true);
      frmTimeSheetCreateTab.txtBoxNetworkOrder.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmSearchTask.costcenter");
      frmTimeSheetCreateTab.txtBoxActivityOperation.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreateTab.activityoper");
      frmTimeSheetCreateTab.flexContain1.isVisible=true;
      frmTimeSheetCreateTab.flexContain2.isVisible=true;
      frmTimeSheetCreateTab.flexContain3.isVisible=false;  
      break;
    case "Network Order, Activity Operation":
      frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(false);
      frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
      frmTimeSheetCreateTab.flxTwoBox.setVisibility(true);
      frmTimeSheetCreateTab.segTasks.height = "92%";
      frmTimeSheetCreateTab.imgStatus.src = "search_check.png"
      frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(true);
      frmTimeSheetCreateTab.txtBoxNetworkOrder.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreateTab.networkorder");
      frmTimeSheetCreateTab.txtBoxActivityOperation.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreateTab.activityoper");
      frmTimeSheetCreateTab.flexContain1.isVisible=true;
      frmTimeSheetCreateTab.flexContain2.isVisible=true;
      frmTimeSheetCreateTab.flexContain3.isVisible=false;  
      break;
    case "Network Order, Activity Operation, Work Center":
      frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(false);
      frmTimeSheetCreateTab.flxWorkCenter.setVisibility(true);
      frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
      frmTimeSheetCreateTab.segTasks.height = "82%";
      frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(true);
      frmTimeSheetCreateTab.imgStatus.src = "search_check.png"
      frmTimeSheetCreateTab.flexContain1.isVisible=true;
      frmTimeSheetCreateTab.flexContain2.isVisible=true;
      frmTimeSheetCreateTab.flexContain3.isVisible=true;  
      break;
    default:
      frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(true);
      frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
      frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
      frmTimeSheetCreateTab.segTasks.height = "100%";
      frmTimeSheetCreateTab.lblSelectedCriteria.setVisibility(false);
      frmTimeSheetCreateTab.imgStatus.src = "search_uncheck.png"
      frmTimeSheetCreateTab.txtBoxSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreateTab.globalsearch");
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
kony.apps.coe.ess.myTime.Tab.SearchTask.searchProjectTask = function(selectedValue) {
  kony.print("#####selectedValue"+selectedValue);
  var query = "select t.task_name, p.project_name,p.id as pid,t.id as tid, pt.type,pt.id as ptid from project_task pt left join project p on p.id=pt.project_id  left join task t on t.id=pt.task_id";
  var ccID = "";
  var networkOrderID = "";
  var activityOperID = "";
  switch (selectedValue) {
    case "Cost Center":
      ccID = frmTimeSheetCreateTab.tbxSearch1.text === null ? "" : frmTimeSheetCreateTab.tbxSearch1.text;
      query += " where pt.id like '%" + ccID + "%' AND pt.type='CC'";
      break;
    case "Network Order":
      networkOrderID = frmTimeSheetCreateTab.tbxSearch1.text;
      query += " where pt.id like '%" + networkOrderID + "%' AND pt.type='NO'";
      break;
    case "Activity Operation":
      activityOperID = frmTimeSheetCreateTab.tbxSearch1.text;
      query += " where pt.task_id like '%" + activityOperID + "%'";
      break;
    case "Cost Center, Activity":
      ccID = frmTimeSheetCreateTab.tbxSearch1.text;
      activityOperID = frmTimeSheetCreateTab.tbxSearch2.text;
      query += " where (pt.id like '%" + ccID + "%' AND pt.type='CC') AND (pt.task_id like '%" + activityOperID + "%')";
      break;
    case "Network Order, Activity Operation":
      networkOrderID = frmTimeSheetCreateTab.tbxSearch1.text;
      activityOperID = frmTimeSheetCreateTab.tbxSearch2.text;
      query += " where (pt.id like '%" + networkOrderID + "%' AND pt.type='NO') AND (pt.task_id like '%" + activityOperID + "%')";
      break;
    case "Network Order, Activity Operation, Work Center":
      networkOrderID = frmTimeSheetCreateTab.tbxSearch1.text;
      activityOperID = frmTimeSheetCreateTab.tbxSearch2.text;
      query += " where (pt.id like '%" + networkOrderID + "%' AND pt.type='NO') AND (pt.task_id like '%" + activityOperID + "%')";
      break;
    default:
      ccID = frmTimeSheetCreateTab.txtBoxSearch.text;
      query += " where p.Project_Name like '%" + ccID + "%' OR t.task_name like '%" + ccID + "%' OR pt.project_id like '%" + ccID + "%' OR pt.task_id like '%" + ccID + "%' OR pt.id like '%" + ccID + "%' order by p.id";
      break;
  }
  kony.apps.coe.ess.myTime.Tab.SearchTask.executeQuery(query);
};

/**
 * @class       SearchTask
 * @type        function
 * @param       selected listbox item value 
 * return       None.
 * desc         Does online search according to values entered
 */
kony.apps.coe.ess.myTime.Tab.SearchTask.onlineSearch = function(selectedValue) {
  kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  
  if(frmTimeSheetCreateTab.tbxSearch1.text === null)
  frmTimeSheetCreateTab.tbxSearch1.text="";
  if(frmTimeSheetCreateTab.tbxSearch2.text === null)
  frmTimeSheetCreateTab.tbxSearch2.text="";
  
  var modelName = "MYTIME";
  var dataObject = "Project_Task";
  var ccID = "";
  var networkOrderID = "";
  var activityOperID = "";
  var params = "";
  switch (selectedValue) {
    case "Cost Center":
      ccID = frmTimeSheetCreateTab.tbxSearch1.text;
      if (String.isEmpty(ccID)) {
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
        return;
      } else {
        params = "substringof(Project_Id,'" + ccID + "') and substringof(Type,'CC')";
      }
      break;
    case "Network Order":
      ccID = frmTimeSheetCreateTab.tbxSearch1.text;
      if (String.isEmpty(ccID)) {
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
        return;
      } else {
        params = "substringof(Project_Id,'" + ccID + "') and substringof(Type,'NO')";
      }
      break;
    case "Activity Operation":
      activityOperID = frmTimeSheetCreateTab.tbxSearch1.text;
      if (String.isEmpty(activityOperID)) {
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
        return;
      } else {
        params = "substringof(Task_Id,'" + activityOperID + "')";
      }
      break;
    case "Cost Center, Activity":
      ccID = frmTimeSheetCreateTab.tbxSearch1.text;
      activityOperID = frmTimeSheetCreateTab.tbxSearch2.text;
      if (String.isEmpty(ccID) || String.isEmpty(activityOperID)) {
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
        return;
      } else {
        params = "(substringof(Project_Id,'" + ccID + "') and substringof(Type,'CC')) and (substringof(Task_Id,'" + activityOperID + "'))";
      }
      break;
    case "Network Order, Activity Operation":
      ccID = frmTimeSheetCreateTab.tbxSearch1.text;
      activityOperID = frmTimeSheetCreateTab.tbxSearch2.text;
      if (String.isEmpty(ccID) || String.isEmpty(activityOperID)) {
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
        return;
      } else {
        params = "(substringof(Project_Id,'" + ccID + "') and substringof(Type,'NO')) and (substringof(Task_Id,'" + activityOperID + "'))";
      }
      break;
    case "Network Order, Activity Operation, Work Center":
      ccID = frmTimeSheetCreateTab.tbxSearch1.text;
      activityOperID = frmTimeSheetCreateTab.tbxSearch2.text;
      if (String.isEmpty(ccID) || String.isEmpty(activityOperID)) {
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.mandatoryMessage"));
        return;
      } else {
        params = "(substringof(Project_Id,'" + ccID + "') and substringof(Type,'CC')) and (substringof(Task_Id,'" + activityOperID + "'))";
      }
      break;
    default:
      ccID = frmTimeSheetCreateTab.txtBoxSearch.text;
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
  objSvc.fetch(options, kony.apps.coe.ess.myTime.Tab.SearchTask.onlineSuccess, kony.apps.coe.ess.myTime.Tab.SearchTask.onlineFailure);
};
/**
 * @class       SearchTask
 * @type        function
 * @param       response 
 * return       None.
 * desc         Sets data to segment
 */
kony.apps.coe.ess.myTime.Tab.SearchTask.onlineSuccess = function(response) {
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
    kony.apps.coe.ess.myTime.Tab.SearchTask.success(projectTasks);
  } else
  {
    if(kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam =="Free Search")
    {
      frmTimeSheetCreateTab.segTasks.isVisible=false;
      frmTimeSheetCreateTab.flxSearchAddTask.isVisible=true;
      frmTimeSheetCreateTab.flxNoResultsHeader.isVisible=true;
      frmTimeSheetCreateTab.lblOnlineSearchResult.isVisible=false;
      frmTimeSheetCreateTab.lblNoOnlineResult.isVisible=true;
    }
    else
    {
      frmTimeSheetCreateTab.flxAdvancedSearchPopup.isVisible = true; 
      frmTimeSheetCreateTab.segAdvancedSearchResults.isVisible = false;  
      frmTimeSheetCreateTab.lblOnlineSearchResult.isVisible=true;
      frmTimeSheetCreateTab.lblNoOnlineResult.isVisible=false;
      showAdvancedSearchResults();
    }

  }
};

/**
 * @class       SearchTask
 * @type        function
 * @param       error 
 * return       None.
 * desc         Displays error message
 */
kony.apps.coe.ess.myTime.Tab.SearchTask.onlineFailure = function(error) {
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
kony.apps.coe.ess.myTime.Tab.SearchTask.addAsNewTask = function(selectedValue) {
  var taskName = "";
  var projectName = "";
  var taskType = "";
  switch (selectedValue) {
    case "Cost Center":
      projectName = frmTimeSheetCreateTab.txtBoxSearch.text;
      taskType = "CC";
      break;
    case "Network Order":
      projectName = frmTimeSheetCreateTab.txtBoxSearch.text;
      taskType = "NO";
      break;
    case "Activity Operation":
      taskName = frmTimeSheetCreateTab.txtBoxSearch.text;
      break;
    case "Cost Center, Activity":
      projectName = frmTimeSheetCreateTab.txtBoxNetworkOrder.text;
      taskName = frmTimeSheetCreateTab.txtBoxActivityOperation.text;
      taskType = "CC";
      break;
    case "Network Order, Activity Operation":
      projectName = frmTimeSheetCreateTab.txtBoxNetworkOrder.text;
      taskName = frmTimeSheetCreateTab.txtBoxActivityOperation.text;
      taskType = "NO";
      break;
    case "Network Order, Activity Operation, Work Center":
      projectName = frmTimeSheetCreateTab.txtFieldNetwork.text;
      taskName = frmTimeSheetCreateTab.txtFieldActivity.text;
      taskType = "NO";
      break;
    default:
      projectName = frmTimeSheetCreateTab.txtBoxSearch.text;
      taskType = "CC";
      break;
  }
  kony.apps.coe.ess.myTime.Tab.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Id = projectName;
  if (taskType !== "") {
    kony.apps.coe.ess.myTime.Tab.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Project_Task_Type = taskType;
  }
  if (taskName !== "") {
    kony.apps.coe.ess.myTime.Tab.TimesheetCreate.Backend.CurrentTaskTimelineData.data.Task_Name = taskName;
  }
  kony.apps.coe.ess.myTime.Tab.TimesheetCreate.updateReadOnlyForTimeEntry.updateProjectTaskName(projectName);
  kony.apps.coe.ess.myTime.Tab.TimesheetCreate.updateReadOnlyForTimeEntry.updateTimeType(null);
  kony.apps.coe.ess.myTime.Tab.TimesheetCreate.updateReadOnlyForTimeEntry.updateActivityDesc(null);
  frmTimeSheetCreateTab.show();
};

/**
 * @class       SearchTask
 * @type        function
 * @param       None 
 * return       None.
 * desc         Resets search criteria fields
 */
kony.apps.coe.ess.myTime.Tab.SearchTask.resetSearchCriteria = function() {
  frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(true);
  frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
  frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
  frmTimeSheetCreateTab.listBoxCriteria.selectedKey = "lb1";
  frmTimeSheetCreateTab.txtBoxSearch.text = "";
  frmTimeSheetCreateTab.txtBoxSearch.placeholder = kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreateTab.globalsearch");
  frmTimeSheetCreateTab.imgStatus.src = "search_uncheck.png";
};

kony.apps.coe.ess.myTime.Tab.SearchTask.onSelectionOfListBox = function(listbox) {

  if (listbox.selectedKey == "lb1") {
    frmTimeSheetCreateTab.imgStatus.src = "search_uncheck.png";
  } else {
    frmTimeSheetCreateTab.imgStatus.src = "search_check.png";
  }
  var selectedKeyValue=String(listbox.selectedKeyValue[1]);
  var selectedKeyValue_array = selectedKeyValue.split(',');	

  if (selectedKeyValue_array.length == 2 ) {
    frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(false);
    frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
    frmTimeSheetCreateTab.flxTwoBox.setVisibility(true);
    frmTimeSheetCreateTab.txtBoxNetworkOrder.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.Tab.SearchTask.getLocalizedStr(selectedKeyValue_array[0].trim()));
    frmTimeSheetCreateTab.txtBoxActivityOperation.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.Tab.SearchTask.getLocalizedStr(selectedKeyValue_array[1].trim()));
    frmTimeSheetCreateTab.flxSearchCriteria.height = "22%";
  } else if (selectedKeyValue_array.length == 3) {
    frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(false);
    frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
    frmTimeSheetCreateTab.flxWorkCenter.setVisibility(true);
    frmTimeSheetCreateTab.txtFieldNetwork.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.Tab.SearchTask.getLocalizedStr(selectedKeyValue_array[0].trim()));
    frmTimeSheetCreateTab.txtFieldActivity.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.Tab.SearchTask.getLocalizedStr(selectedKeyValue_array[1].trim()));
    frmTimeSheetCreateTab.txtFieldWorkCenter.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.Tab.SearchTask.getLocalizedStr(selectedKeyValue_array[2].trim()));
    frmTimeSheetCreateTab.flxSearchCriteria.height = "32%";
  } else {
    frmTimeSheetCreateTab.flxTwoBox.setVisibility(false);
    frmTimeSheetCreateTab.flxWorkCenter.setVisibility(false);
    frmTimeSheetCreateTab.flxSearchCriteria.height = "15%";
    frmTimeSheetCreateTab.flxGlobalSearch.setVisibility(true);
    frmTimeSheetCreateTab.txtBoxSearch.placeholder=kony.i18n.getLocalizedString(kony.apps.coe.ess.myTime.Tab.SearchTask.getLocalizedStr(selectedKeyValue_array[0].trim()));
  }
  frmTimeSheetCreateTab.flxScrollTasks.top = "0%";
  frmTimeSheetCreateTab.forceLayout();
};

kony.apps.coe.ess.myTime.Tab.SearchTask.getLocalizedStr = function(localizedStr) {
  var localizedString;
  switch (localizedStr) {
    case "Cost Center":
      localizedString="i18n.ess.frmSearchTask.costcenter";
      break;
    case "Network Order":
      localizedString="i18n.ess.frmTimeSheetCreateTab.networkorder";
      break;
    case "Activity Operation":
      localizedString="i18n.ess.frmTimeSheetCreateTab.activityoper";
      break;
    case "Activity":
      localizedString="i18n.ess.frmTimeSheetCreateTab.activityoper";
      break;
    case "Work Center":
      localizedString="i18n.ess.frmTimeSheetCreateTab.workcenter";
      break;
  }
  return localizedString;
};

var master_data=[];
function showAdvancedSearchTask ()
{
  frmTimeSheetCreateTab.segAdvancedSearch.data =master_data; 
  frmTimeSheetCreateTab.flxAdvancedSearch.isVisible=true;
  frmTimeSheetCreateTab.flxAdvancedOption.flxSearchSelected.setVisibility(false);
  frmTimeSheetCreateTab.flxDayData.isVisible=false;
  frmTimeSheetCreateTab.flxOuterTask.isVisible=false;
  frmTimeSheetCreateTab.flxSearchResults.isVisible=false;
  frmTimeSheetCreateTab.btnStartSearch.isVisible=false;
  frmTimeSheetCreateTab.lblAddAsTask.isVisible=false;
  frmTimeSheetCreateTab.segAdvancedSearch.isVisible=true;
  frmTimeSheetCreateTab.flxAdvHead.isVisible=true;

}

function showCombinationinAdvancedSearchTask(selectedTask)
{
  kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam =selectedTask;
  var selectedTasks = selectedTask.split(",");
  frmTimeSheetCreateTab.tbxSearch1.text="";
  frmTimeSheetCreateTab.tbxSearch2.text="";
  frmTimeSheetCreateTab.tbxSearch3.text="";
  switch(selectedTasks.length)
  {   
    case 2:
      frmTimeSheetCreateTab.flexContainer3.isVisible= false;
      frmTimeSheetCreateTab.flexContainer2.isVisible= true;
      frmTimeSheetCreateTab.flexContainer1.isVisible= true;
      frmTimeSheetCreateTab.lblTask1.text = selectedTasks[0];
      frmTimeSheetCreateTab.lblTask2.text = selectedTasks[1];

      break;

    case 3:
      frmTimeSheetCreateTab.flexContainer3.isVisible= true;
      frmTimeSheetCreateTab.flexContainer2.isVisible= true;
      frmTimeSheetCreateTab.flexContainer1.isVisible= true;
      frmTimeSheetCreateTab.lblTask1.text = selectedTasks[0];
      frmTimeSheetCreateTab.lblTask2.text = selectedTasks[1];
      frmTimeSheetCreateTab.lblTask3.text = selectedTasks[2];
      break;

    default:
      frmTimeSheetCreateTab.flexContainer3.isVisible= false;
      frmTimeSheetCreateTab.flexContainer2.isVisible= false;
      frmTimeSheetCreateTab.flexContainer1.isVisible= true;
      frmTimeSheetCreateTab.lblTask1.text = selectedTasks[0];
      break;

  }
  frmTimeSheetCreateTab.flxAdvancedOption.flxSearchSelected.setVisibility(true);
  frmTimeSheetCreateTab.lblSearchCriteriaSelect.text = selectedTask;
  frmTimeSheetCreateTab.flxSearchResults.isVisible=false;
  frmTimeSheetCreateTab.btnStartSearch.isVisible=true;
  frmTimeSheetCreateTab.lblAddAsTask.isVisible=false;
  frmTimeSheetCreateTab.segAdvancedSearch.isVisible=false;
  frmTimeSheetCreateTab.flxAdvHead.isVisible=true;

}

function showAdvancedSearchResults()
{
  frmTimeSheetCreateTab.flxAdvancedOption.flxSearchSelected.setVisibility(true);
  frmTimeSheetCreateTab.flxSearchResults.isVisible=true;
  frmTimeSheetCreateTab.btnStartSearch.isVisible=true;
  frmTimeSheetCreateTab.lblAddAsTask.isVisible=true;
  frmTimeSheetCreateTab.segAdvancedSearch.isVisible=false;
  frmTimeSheetCreateTab.flxAdvHead.isVisible=true;
}


function onadvancedSearchSelection()
{
  var selectedRow = frmTimeSheetCreateTab.segAdvancedSearch.selectedIndex[1];
  var selectedTask="";
  for(var i=0;i<master_data.length;i++)
  {
    if(i==selectedRow)
    {
      master_data[i].imgSelected = "tickselect.png";
      selectedTask = master_data[i].searchCriteria;
    }
    else
    {
      master_data[i].imgSelected = "blankimage.png";
    }
  }
  frmTimeSheetCreateTab.segAdvancedSearch.data =master_data;
  showCombinationinAdvancedSearchTask(selectedTask);

}


kony.apps.coe.ess.myTime.Tab.SearchTask.showPopupAddasTask =function()
{
  frmTimeSheetCreateTab.lblTaskCombinationValue.text =kony.apps.coe.ess.myTime.Tab.SearchTask.searchParam;
  frmTimeSheetCreateTab.lbTask1.text =  frmTimeSheetCreateTab.lblTask1.text;
  frmTimeSheetCreateTab.lbTask1Value.text =frmTimeSheetCreateTab.tbxSearch1.text;
  frmTimeSheetCreateTab.lbTask2.text = frmTimeSheetCreateTab.lblTask2.text;
  frmTimeSheetCreateTab.lbTask2Value.text =frmTimeSheetCreateTab.tbxSearch2.text;
  frmTimeSheetCreateTab.lbTask3.text =frmTimeSheetCreateTab.lblTask3.text;
  frmTimeSheetCreateTab.lbTask3Value.text =frmTimeSheetCreateTab.tbxSearch3.text;
  frmTimeSheetCreateTab.flxAddAsTaskPopup.isVisible =true;

};
