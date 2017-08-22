kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.ApprovalHistoryDW = function() {
  kony.print("--start Approval History In DW--");
  kony.print("--end Approval History In DW--");
};
/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : code to be executed on init of the Form
 */
kony.apps.coe.ess.ApprovalHistoryDW.prototype.
initApprovalHistory = function() {
  var WidgetsArray = ["lblRequestType", "imgTick"];
  var SelectionBehaviourConfig = {
    "imageIdentifier": "imgTick",
    "selectedStateImage": "select_green.png",
    "unselectedStateImage": "select.png"
  };
  kony.apps.coe.ess.globalVariables.requestTypeSegementsDW = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 3, flxHistorySearch, function() {}, WidgetsArray);
  frmHistory.flxscHistorySearch.add(kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.getDynamicSegment());
  kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.WidgetDataMap = {
    "lblRequestType": "TYPE",
    "imgTick": "imgTick"
  };
  var data = kony.apps.coe.ess.frmFilterHistoryUIDW.RequestTypesTable(function(res) {
    kony.print("---- Data of RequestTypesTable table:" + JSON.stringify(res.records)); 
    var RequestTypesTable=[];
    for(var i=0;i<res.length;i++){
      var sampleJson={};
      sampleJson.TYPE ={text: res[i].id};
      sampleJson.imgTick={src:"select.png"};
      RequestTypesTable.push(sampleJson);
    }
    kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.setData(RequestTypesTable);

  });
};

kony.apps.coe.ess.ApprovalHistoryDW.prototype.
initApprovalStatusBasesHistory = function() {
  var WidgetsArray1 = ["lblRequestTypes", "imgTicks"];
  var SelectionBehaviourConfig1 = {
    "imageIdentifier": "imgTicks",
    "selectedStateImage": "select_green.png",
    "unselectedStateImage": "select.png"
  };
  kony.apps.coe.ess.globalVariables.statusTypeSegementsDW = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig1, 3, flxHistoryStatusSearch, function() {}, WidgetsArray1);
  frmHistory.flxscHistoryStatusSearch.add(kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.getDynamicSegment());
  kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.WidgetDataMap = {
    "lblRequestTypes": "TYPE",
    "imgTicks": "imgTicks"
  };
  var Response = [{TYPE:{"text":kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Approved")},imgTicks: {"src":"select.png"}},{TYPE:{"text":kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Rejected")},imgTicks: {"src":"select.png"}},{TYPE:{"text":kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Pending")},imgTicks: {"src":"select.png"}}];
  kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.setData(Response);
  /* commented as the text ar hardcoded 
  var Response = [{TYPE:{"text":"Approved"},imgTicks: {"src":"select.png"}},{TYPE:{"text":"Rejected"},imgTicks: {"src":"select.png"}},{TYPE:{"text":"Pending"},imgTicks: {"src":"select.png"}}];
  kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.setData(Response);
  */
};

kony.apps.coe.ess.ApprovalHistoryDW.prototype.searchHistory=function(){
  var selectedRequestTypes=kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.SelectedItems;
  var selectedRequestsBasedOnStatus=kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.SelectedItems;
  var data = kony.apps.coe.ess.Approvals.SPA.Search.processedData;
  var filteredData = [];
  var filteredDataStatusWise=[];
  var datewiseFilterData = [];
  var start_date_time = (new Date(frmHistory.datePickerFrom.date)).getTime();
  var end_date_time = (new Date(frmHistory.datePickerTo.date)).getTime();

  if ((start_date_time!== "undefined") && (start_date_time !== null) && (end_date_time !== "undefined") && (end_date_time!== null)) {
    if(end_date_time<start_date_time){
      alert("End Date can not be less than Start Date");
      return;
    }
    var currentRequestTime;  

    for (var m = 0; m < data.length; m++) {
      currentRequestTime = (data[m].RequestDateObject).getTime();
      if (currentRequestTime !== undefined && currentRequestTime !== null) {
        if ((currentRequestTime <= end_date_time) && (currentRequestTime >= start_date_time)) {
          datewiseFilterData.push(data[m]);
        }
      }
    }
    kony.print("data after filtering by dates is " + JSON.stringify(datewiseFilterData));
    if(datewiseFilterData.length>0 && datewiseFilterData!==null){
      data=datewiseFilterData;
    }
    else{
      alert("No data is present to filter among the slected dates");
    }
  }

  if(selectedRequestTypes.length>0 && selectedRequestTypes !== null && selectedRequestTypes !== undefined)
  {
    for(var i=0;i<selectedRequestTypes.length;i++)
    {
      var filterParam=selectedRequestTypes[i].TYPE.text;
      if (filterParam !== null && filterParam !== undefined) {
        if(filterParam==="LEAVEREQ")
        {
          filterParam="LEAVE";
        }
        for (var index in data) {
          if (data[index].Requesttype === filterParam) {
            filteredData.push(data[index]);
          }
        }
      }
    }  
  }
  if(selectedRequestsBasedOnStatus.length>0 && selectedRequestsBasedOnStatus !== null && selectedRequestsBasedOnStatus !== undefined)
  {
    for(var j=0;j<selectedRequestsBasedOnStatus.length;j++)
    {
      var filterStatusParam=selectedRequestsBasedOnStatus[j].TYPE.text;
      if (filterStatusParam !== null && filterStatusParam !== undefined) {
        //if(filterStatusParam==="Approved")
        if(filterStatusParam === kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Approved"))
        {
          filterStatusParam="0";
        }
        //if(filterStatusParam==="Rejected")
        if(filterStatusParam === kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Rejected"))
        {
          filterStatusParam="1";
        }
        //if(filterStatusParam==="Pending")
        if(filterStatusParam === kony.i18n.getLocalizedString("i18n.ess.frmHistoryDW.Pending"))
        {
          filterStatusParam="2";
        }
        if(selectedRequestTypes.length>0)
        {
          data=filteredData;
        }
        for (var ind in data) {
          if (data[ind].status_id === filterStatusParam) {
            filteredDataStatusWise.push(data[ind]);
          }
        }
      }
    }   
  }
  else{
    filteredDataStatusWise=filteredData;
  }
  if(filteredDataStatusWise.length>0 && filteredDataStatusWise !== null && filteredDataStatusWise !== undefined)
  {
    frmHistory.segAllEmp.setData(filteredDataStatusWise);
  }
  else{    
    if(datewiseFilterData.length!==0 && datewiseFilterData!==null && datewiseFilterData!==undefined){
    frmHistory.segAllEmp.setData(datewiseFilterData);
      }
    else{
      kony.print("Filter serach is not getting any data");
      frmHistory.segAllEmp.setData(filteredDataStatusWise);
    }
  }

};

/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : code to clear all the selected options in the search History form.
 */

kony.apps.coe.ess.ApprovalHistoryDW.clearAll = function () {
  try {
    var indexsSelectedInRequestType=[];
    var indexsSelectedInStatusType=[];
    kony.print("-- Start clearAll--");
    indexsSelectedInRequestType= kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.SelectedIndexs;
    indexsSelectedInStatusType= kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.SelectedIndexs;

    var selectedRequestsTypeLen=indexsSelectedInRequestType.length;
    var selectedStatusTypeLen=indexsSelectedInStatusType.length;

    
      for(var i=0;i<selectedRequestsTypeLen;i++)
      {
        var SelectedCellData = kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.Data[indexsSelectedInRequestType[0]];
        SelectedCellData[kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.selectionBehaviorConfig.imageIdentifier] = {
          "isVisible": true,
          "src": kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.selectionBehaviorConfig.unselectedStateImage
        };	
        kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.setDataAtIndex(indexsSelectedInRequestType[0], SelectedCellData);
        kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.SelectedIndexs.splice(0,1);
        kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.SelectedItems.splice(0,1);
      }
    
    
      for(var j=0;j<selectedStatusTypeLen;j++)
      {
        var SelectedStatusCellData = kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.Data[indexsSelectedInStatusType[0]];
        SelectedStatusCellData[kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.selectionBehaviorConfig.imageIdentifier] = {
          "isVisible": true,
          "src": kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.selectionBehaviorConfig.unselectedStateImage
        };	
        kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.setDataAtIndex(indexsSelectedInStatusType[0], SelectedStatusCellData);
        kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.SelectedIndexs.splice(0,1);
        kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.SelectedItems.splice(0,1);
      }
    
  } catch (e) {
    throw e;
  }
};

/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : code to select all the options in the search History form.
 */

kony.apps.coe.ess.ApprovalHistoryDW.selectAll = function () {
  try {

    for(var i=0;i<kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.Data.length;i++)
    {
      var index = kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.SelectedIndexs.indexOf(i);
      if (index == -1) {//Not in selected Indexs
        kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.SelectedIndexs.push(i.toString());
        kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.SelectedItems.push(kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.Data[i]);
        //making the cell in selected state
        var SelectedCellData = kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.Data[i];
        SelectedCellData[kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.selectionBehaviorConfig.imageIdentifier] = {
          "isVisible": true,
          "src": kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.selectionBehaviorConfig.selectedStateImage
        };			
        kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.setDataAtIndex(i, SelectedCellData);
      } 
    }
    
    for(var j=0;j<kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.Data.length;j++)
    {
      var ind = kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.SelectedIndexs.indexOf(j);
      if (ind == -1) {//Not in selected Indexs    
        kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.SelectedIndexs.push(j.toString());
        kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.SelectedItems.push(kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.Data[j]);
        //making the cell in selected state
        var CellData = kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.Data[j];
        CellData[kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.selectionBehaviorConfig.imageIdentifier] = {
          "isVisible": true,
          "src": kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.selectionBehaviorConfig.selectedStateImage
        };			
        kony.apps.coe.ess.globalVariables.statusTypeSegementsDW.setDataAtIndex(j, CellData);
      } 
    }

  } catch (e) {
    throw e;
  }
};




