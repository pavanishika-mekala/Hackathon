kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myApprovals = kony.apps.coe.ess.myApprovals || {};

kony.apps.coe.ess.myApprovals.frmDeligationDW = function() {
  
};


/**
 * @function processData
 * this function wil process the data  
 * @return processedData to frmDeligation
 */

kony.apps.coe.ess.myApprovals.frmDeligationDW.
processData = function(data) {
    kony.print("--Start processData--");
  
   
    kony.print("---In Process data:" + JSON.stringify(data));
  var months = {"0": "Jan","1": "Feb","2": "Mar","3": "Apr","4": "May","5": "Jun","6": "Jul","7": "Aug","8": "Sep","9": "Oct","10": "Nov","11": "Dec"};
        
       
 
    var processedRequest = [];
  	var delegateData={};
    var delegateData1={};
  
  	var delegateDataArr=[];
    var delegateData1Arr=[];
    for (var i = 0; i < data.length; i++) {   
   
    var timeSheetStartDateRecieved=String(data[i].start_date);
    timeSheetStartDateFormat = new Date(timeSheetStartDateRecieved.substring(0, 4), parseInt(timeSheetStartDateRecieved.substring(4, 6)) - 1, timeSheetStartDateRecieved.substring(6, 8), timeSheetStartDateRecieved.substring(8, 10), timeSheetStartDateRecieved.substring(10, 12), timeSheetStartDateRecieved.substring(12, 16));
    timeSheetStartDateInHHMMMHHmm= new Date(timeSheetStartDateFormat.toHHMMMHHmm());        
    var timeSheetEndDateRecieved=String(data[i].end_date);
    timeSheetEndDateFormat = new Date(timeSheetEndDateRecieved.substring(0, 4), parseInt(timeSheetEndDateRecieved.substring(4, 6)) - 1, timeSheetEndDateRecieved.substring(6, 8), timeSheetEndDateRecieved.substring(8, 10), timeSheetEndDateRecieved.substring(10, 12), timeSheetEndDateRecieved.substring(12, 16));        
    timeSheetEndDateInHHMMMHHmm= new Date(timeSheetEndDateFormat.toHHMMMHHmm());
    var timeSheetDuration=timeSheetStartDateInHHMMMHHmm.getDate()+" "+months[timeSheetStartDateInHHMMMHHmm.getMonth()]+"-"+timeSheetEndDateInHHMMMHHmm.getDate()+" "+months[timeSheetEndDateInHHMMMHHmm.getMonth()];
   // var timeDifference = timeSheetEndDateInHHMMMHHmm.getDate()-timeSheetStartDateInHHMMMHHmm.getDate()+" Days"
  if(data[i].delegator_id == kony.apps.coe.ess.globalVariables.EmployeeID) {
   
   
   switch (data[i].request_type_id) {
   case "LEAVEREQ":
       delegateData.requestTypeImage = "leaverequest.png";
   break;
   case "TIMESHEET":
       delegateData.requestTypeImage = "timerequests.png";
   break;
   case "EXPENSES":
       delegateData.requestTypeImage = "expense.png";
    break;
   }
   delegateData.ID = data[i].id;
   delegateData.Groupid = data[i].delegation_group_id;
   delegateData.UserName = data[i].First_Name;
   delegateData.DelegateID = data[i].delegator_id;
   delegateData.EmployeeID = data[i].employee_id;
   delegateData.RequestDateObject = new Date().modifyByYYYYMMDDHHMMSS(data[i].createdts);
   delegateData.RequestDateString = delegateData.RequestDateObject.toDateString();
   delegateData.RequestDate = delegateData.RequestDateObject.toDDmmmHHMMtt();
   delegateData.TimeRequest = timeSheetDuration;
   delegateData.Days = "7 Days";
   delegateData.RequestType = data[i].request_type_id;
   delegateData.Separator = "Label";
     delegateDataArr.push(delegateData);
  }
    else
      {
   switch (data[i].request_type_id) {
   case "LEAVEREQ":
       delegateData.requestTypeImage = "leaverequest.png";
   break;
   case "TIMESHEET":
       delegateData.requestTypeImage = "timerequests.png";
   break;
   case "EXPENSES":
       delegateData.requestTypeImage = "expense.png";
    break;
   }
   delegateData1.ID = data[i].id;
   delegateData1.UserName = data[i].First_Name;
   delegateData1.DelegateID = data[i].delegator_id;
   delegateData1.EmployeeID = data[i].employee_id;
   delegateData1.RequestDateObject = new Date().modifyByYYYYMMDDHHMMSS(data[i].createdts);
   delegateData1.RequestDateString = delegateData.RequestDateObject.toDateString();
   delegateData1.RequestDate = delegateData.RequestDateObject.toDDmmmHHMMtt();
   delegateData1.TimeRequest = timeSheetDuration;
   delegateData1.Days = "7 Days";
   delegateData1.RequestType = data[i].request_type_id;
   delegateData1.Separator = "Label";
        delegateData1Arr.push(delegateData1);
        
      }  
  } 
  processedRequest.push(delegateDataArr,delegateData1Arr);
  kony.print("---- processedRequest for Deligation: " + JSON.stringify(processedRequest));
  return processedRequest;
}


kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.
naviagateToRecevied = function() {
  
  frmDelegationRequests.segSentToMe.setVisibility(true);
  frmDelegationRequests.segAllEmp.setVisibility(false);
  frmDelegationRequests.lblSentToMe.skin = "sknLbl1db6c9FS14pxDW";
  frmDelegationRequests.lblSentByMe.skin = "sknLbl333333DW"; 
  frmDelegationRequests.flxHighlight.setVisibility(false);
  frmDelegationRequests.flxHighlightRecevied.setVisibility(true);
  
}

kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.
naviagateToSentByMe = function() {
  
  frmDelegationRequests.segAllEmp.setVisibility(true);
  frmDelegationRequests.segSentToMe.setVisibility(false);
  frmDelegationRequests.lblSentByMe.skin = "sknLbl1db6c9FS14pxDW";
  frmDelegationRequests.lblSentToMe.skin = "sknLbl333333DW"; 
  frmDelegationRequests.flxHighlight.setVisibility(true);
  frmDelegationRequests.flxHighlightRecevied.setVisibility(false);
 
}

/**
 * @class onRowClickOfSegEmp
 * this class for AllDelegationRequest Details
 * this is called on Click of any Row item of the SentByMe list
 */
kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.onRowClickOfSegEmp = function() {
    var data = frmDelegationRequests.segAllEmp.selectedItems[0];
    kony.print("--- data segment :" + JSON.stringify(data));
    var selectedEmpName = data.UserName;
    var req = data.RequestType;
//    var dueDate = data.RequestDate;
    var DelegateDate = data.TimeRequest;
    var SubmittedDate = data.RequestDate;
    
    frmDelegationRequests.lblSelectedEmp.text = selectedEmpName;
    frmDelegationRequests.lblAllRequests.text = req;
    frmDelegationRequests.lblPeriod.text = DelegateDate;
    frmDelegationRequests.lblRequestedDate.text = SubmittedDate;
    
}

/**
 * @class onRowClickOfSegEmp
 * this class for AllDelegationRequest Details
 * this is called on Click of any Row item of the SentByMe list
 */
kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.onRowClickOfSegSentToMe = function() {
    var data = frmDelegationRequests.segSentToMe.selectedItems[0];
    kony.print("--- data segment :" + JSON.stringify(data));
    var selectedEmpName = data.UserName;
    var req = data.RequestType;
//    var dueDate = data.RequestDate;
    var DelegateDate = data.TimeRequest;
    var SubmittedDate = data.RequestDate;
    
    frmDelegationRequests.lblSelectedEmp.text = selectedEmpName;
    frmDelegationRequests.lblAllRequests.text = req;
    frmDelegationRequests.lblPeriod.text = DelegateDate;
    frmDelegationRequests.lblRequestedDate.text = SubmittedDate;
    
}

/*
 *@function
 *@params : none
 *@returns: none
 *@desc   : code to be executed on init of the Form
 */
kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.
initAddDelegation = function() {
  var WidgetsArray = ["lblRequestType", "imgTick"];
  var SelectionBehaviourConfig = {
    "imageIdentifier": "imgTick",
    "selectedStateImage": "select_green.png",
    "unselectedStateImage": "select.png"
  };
  kony.apps.coe.ess.globalVariables.requestTypeSegementsDW = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR, SelectionBehaviourConfig, 3, flxHistorySearch, function() {}, WidgetsArray);
  frmDelegationRequests.flxRequestTypeSelection.add(kony.apps.coe.ess.globalVariables.requestTypeSegementsDW.getDynamicSegment());
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

kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.
initdatefromto = function() {
  
    var dateObj = new Date();
	frmDelegationRequests.datePickerFrom.dateComponents = [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()]; 
	//To Do : Need to set TO Date for five days more than from date.
    var dateObj1 = new Date();
	frmDelegationRequests.datePickerTo.dateComponents = [dateObj1.getDate(), dateObj1.getMonth() + 1, dateObj1.getFullYear()]; 
  
}

kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.onclickEmployeeselect = function(){
   kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
   var objSvc = kony.sdk.getCurrentInstance().getObjectService("Employee", {
                        "access": "online"
                    });
                    var dataObject= new kony.sdk.dto.DataObject("Employee");
                    var options = {
                        "dataObject": dataObject
                    };
                    objSvc.fetch(options,success,error);
            function success(response) {  
             
            kony.print("---- Employee Data: " + JSON.stringify(response));
            
   //To Do : Need to set all employees          
     var Name = response.records[65].First_Name + response.records[1].Last_Name;
     var Name1 = response.records[68].First_Name + response.records[1].Last_Name;
     var Name2 = response.records[3].First_Name + response.records[1].Last_Name;
     var Name3 = response.records[4].First_Name + response.records[1].Last_Name;
     frmDelegationRequests.lblemp1name.text = Name;
     frmDelegationRequests.lblemp2name.text = Name1;
     frmDelegationRequests.lblemp3name.text = Name2;
     frmDelegationRequests.lblemp4name.text = Name3;
     frmDelegationRequests.imgDeselect.src= "deselecttick.png";
     frmDelegationRequests.flxEmployeeSearch.setVisibility(true);
     frmDelegationRequests.forceLayout();
     kony.application.dismissLoadingScreen();      
        }

           function error(err) {
            //Error fetching data
         kony.print("---- Error Data: " + JSON.stringify(err));
             kony.application.dismissLoadingScreen();
        }
    
 }

kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.onclickEmployeeselecttick = function(){
   
   frmDelegationRequests.lblempnameselect.text = frmDelegationRequests.lblemp1name.text;
   frmDelegationRequests.flxEmployeeSearch.setVisibility(false);
   frmDelegationRequests.flxselectemp.setVisibility(true);
   frmDelegationRequests.forceLayout();
  
}

kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.createdelegation = function(){
   kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
   var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {
                        "access": "online"
                    });
                    var dataObject= new kony.sdk.dto.DataObject("delegate");
                    var options = {
                        "dataObject": dataObject
                    };
     var timestamp = new Date().getUTCMilliseconds();
        var id = "MA_V1_DLG_" +  "_T_" + timestamp;
       
        var timestamp1 = new Date().getUTCMilliseconds();
        var delegategroupid = "MA_V1_DGP_" + "_T_" + timestamp1;
    dataObject.addField("id", id);
    dataObject.addField("delegation_group_id", delegategroupid);
	//To Do: Need to set employee_id which got selected from employee search
    dataObject.addField("employee_id", "13000202");
    dataObject.addField("delegator_id", kony.apps.coe.ess.globalVariables.EmployeeID);
	//To Do: Need to set request_Type which got selected from dynamic Segemnt
    dataObject.addField("request_type_id", "EXPENSES");
    dataObject.addField("status_id", "2");
    if (frmDelegationRequests.datePickerFrom.dateComponents === null || frmDelegationRequests.datePickerFrom.dateComponents === undefined || frmDelegationRequests.datePickerFrom.dateComponents === "") {
        //Transaction date necessary
    } else {
        dataObject.addField("start_date", (new kony.apps.coe.ess.myApprovals.frmDeligationDW()).dateParsing(frmDelegationRequests.datePickerFrom.dateComponents));
    }
    if (frmDelegationRequests.datePickerTo.dateComponents === null || frmDelegationRequests.datePickerTo.dateComponents === undefined || frmDelegationRequests.datePickerTo.dateComponents === "") {
        //Transaction date necessary
    } else {
        dataObject.addField("end_date", (new kony.apps.coe.ess.myApprovals.frmDeligationDW()).dateParsing(frmDelegationRequests.datePickerTo.dateComponents));
    }
                    objSvc.create(options,
            function(succ) {
                kony.print("In create expense Success callback" + JSON.stringify(succ));
               alert("Hi");
                var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmDelegationRequests");
                formController.loadDataAndShowForm();
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            },
            function(err) {
                kony.print("In error callback" + JSON.stringify(err));
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            });
  
}

/**
  @ function dateParsing
 */
kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.
dateParsing = function(dateComponents) {
    var arrDate = dateComponents;
    var strDate = String(arrDate[2]) + (String(arrDate[1]).length===1 ? ("0"+String(arrDate[1])) :String(arrDate[1])) + (String(arrDate[0]).length===1 ? ("0"+String(arrDate[0])) :String(arrDate[0]));
    return strDate;
};

kony.apps.coe.ess.myApprovals.frmDeligationDW.prototype.stopdelegation = function(){
   kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
   var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {"access":"online"});
   var dataObject = new kony.sdk.dto.DataObject("delegate");
   var data = frmDelegationRequests.segAllEmp.selectedItems[0];
   kony.print("Selected segment data:" + JSON.stringify(data));
   dataObject.addField("status_id","3");
   //To Do: Need to set employee_id which got selected from employee search
   dataObject.addField("employee_id", "13000202");
   dataObject.addField("delegator_id", kony.apps.coe.ess.globalVariables.EmployeeID);
   dataObject.addField("id", data.ID);
     dataObject.addField("delegation_group_id", data.Groupid);
  
  var options = {"dataObject":dataObject};

   objSvc.partialUpdate(options, function(res) {
                        //Processing of fetched requests is done for SPA records
                        frmDelegationRequests.segAllEmp.removeAt(frmDelegationRequests.segAllEmp.selectedIndex[1]);
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    }, function(err) {
                        kony.print("---------- Update error: " + JSON.stringify(err));
                        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    });
  
}  