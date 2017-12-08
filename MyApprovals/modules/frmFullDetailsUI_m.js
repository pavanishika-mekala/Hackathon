

/*** @Author Swetha
 * @category data Binding / Business Logic
 * @desc  FullDetails class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};


/*
 *@class	:	RequestedListBackendlogic
 */
kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic = function() {
    // Class level var to remember whether sync is in progress or not
    // This is only for manual Sync, not for background sync
    // used in login, hamburger menu
    var isSyncInProgress = false;
};
kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.prototype.callFrmFullDetails = function()
{
 var navObj = new kony.sdk.mvvm.NavigationObject();
  var qp = {
    "requestId": kony.apps.coe.ess.Approvals.ExpenseReportDetail.Request_Id 
  };
  navObj.setQueryParams("segFullDetails", qp);

  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmFullDetails");

  formController.loadDataAndShowForm(navObj);

  var title=frmExpenseReportDetail.lblTitle.text;

  frmFullDetails.lblBussinessType.text=title;
  var titleDet=frmExpenseReportDetail.lblTitleDetail.text;
  frmFullDetails.lblBussiTravel.text=titleDet;
  var dateOfDetail=frmExpenseReportDetail.lblDate.text;

  frmFullDetails.lblDateTime.text=dateOfDetail;

};

kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.prototype.FullDetailsProcessData = function(data)
{
 // alert("in process data");
   var newData = [];
  var labelNames;
  var labelValues;
      labelNames= (data.segFullDetails[0].labels).split(",");
      labelValues= (data.segFullDetails[0].values).split(",");
  for(var i = 0 ;i<labelNames.length ; i++)
    {
       var record={"labelName":labelNames[i],"labelValue":labelValues[i]};
       newData.push(record);
    }
  //alert("newData:"+JSON.stringify(newData));
    
  return newData;
};
kony.apps.coe.ess.Approvals.FullDetailsRequestedListBackendlogic.prototype.FullDetailsbindData = function(newdata) {
  
     var widgetDataMap={
            lblType: "labelName",
            lblValue: "labelValue"}
        ;
   frmFullDetails.segFullDetails.widgetDataMap = widgetDataMap;
      //alert("in bind data");  
      frmFullDetails.segFullDetails.setData(newdata);
  //alert("newdata:"+newdata+"newdata in json:"+JSON.stringify(newdata));
	
};
