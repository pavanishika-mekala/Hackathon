//@ Author
// @ Shanmukha

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.RequestType=function()
{
  kony.print("-- start Request type--");
  kony.print("-- end Request type--");
};

kony.apps.coe.ess.RequestType.prototype.onClickPeopleTabFromOut=function()
{
  frmTabReqTypeView.show();
  this.onClickPeopleTab();
};
kony.apps.coe.ess.RequestType.prototype.onClickPeopleTab=function()
{
  //#ifndef windows8
  frmTabReqTypeView.flxPeople.skin=sknFlx1C7393Focus;// sknWinFlx08739AHighlight
  frmTabReqTypeView.flxCategory.skin=sknFlx0c626f6b2e0494e;
  //#endif
  //#ifdef windows8
  frmTabReqTypeView.flxPeople.skin=sknWinFlx08739AHighlight;
  frmTabReqTypeView.flxCategory.skin=sknWinFlx1091C1;
  //#endif 
  frmTabReqTypeView.flxLeftReqppl.setVisibility(true);
  frmTabReqTypeView.flxDisplay.setVisibility(false);
  frmTabReqTypeView.flxLeftReqType.setVisibility(false);
};

kony.apps.coe.ess.RequestType.prototype.onClickRequestsTab=function()
{
  //#ifdef windows8
  frmTabReqTypeView.flxPeople.skin=sknFlx0c626f6b2e0494e;
  frmTabReqTypeView.flxCategory.skin=sknFlx1C7393Focus;
   //#endif
  //#ifdef windows8
  frmTabReqTypeView.flxPeople.skin=sknWinFlx1091C1;
  frmTabReqTypeView.flxCategory.skin=sknWinFlx08739AHighlight;
  //#endif 
  frmTabReqTypeView.flxLeftReqType.setVisibility(true);
  frmTabReqTypeView.flxLeftReqppl.setVisibility(false);
  frmTabReqTypeView.txtSearchPeople.text="";
  frmTabReqTypeView.cntlbl.text="";
  frmTabReqTypeView.flxDisplay.setVisibility(true);
};

kony.apps.coe.ess.RequestType.prevCat=0;
kony.apps.coe.ess.RequestType.curCat=1;
kony.apps.coe.ess.RequestType.prototype.onClickRequests=function(cur)
{
  var arr=["All","LEAVE","EXPENSES","TIMESHEET","PURCHREQTN","WORKORDER"];
  var prev=kony.apps.coe.ess.RequestType.prevCat;
  if(kony.apps.coe.ess.RequestType.prevCat!==0)
    {frmTabReqTypeView["flxType"+prev].skin="sknFlxFFFFFFWhiteBg";
    }                     
    frmTabReqTypeView[cur.id].skin="sknFlx05f9ff742dfa94c";
    cur=cur.id;cur=cur.replace("flxType","");
    cur=parseInt(cur);
    kony.apps.coe.ess.RequestType.prevCat=cur;
    kony.print("-- Enterd to retrieve:"+arr[cur]);
    //alert("-- Enterd to retrieve:"+arr[cur]);
     this.getRequestedData(arr[cur]);     
};
kony.apps.coe.ess.RequestType.ppls=[];
kony.apps.coe.ess.RequestType.countPpl=0;
kony.apps.coe.ess.RequestType.prototype.onClickPpl=function(data2)
{
  var frmobj=kony.application.getCurrentForm();
   var data,i,arr=[];frmobj.flexpplDynamic.setVisibility(true);
  data=kony.apps.coe.ess.FilterHistory.employeeDataPopup1;
  ///alert("--data--:"+JSON.stringify(data));
  data2=data2.id;data2=data2.replace("flexper","");
  data2=parseInt(data2);
   if(frmobj["selimg"+data2].src==="deselecttick.png")
      {
        frmobj["selimg"+data2].src="select_green.png";
      //kony.apps.coe.ess.RequestType.selectedPpls+=data[data2].id+",";
        kony.apps.coe.ess.RequestType.countPpl++;
        if(data[data2].id!==null)
        kony.apps.coe.ess.RequestType.ppls.push(data[data2].id);
     }
  else
  {
     frmobj["selimg"+data2].src="deselecttick.png";
      //alert("-- deleting index :");
    if(data[data2].id!==null)
      for(i=0;i<data.length;i++)
      {if(kony.apps.coe.ess.RequestType.ppls[i]==data[data2].id)
      delete kony.apps.coe.ess.RequestType.ppls[i];continue;}
       kony.apps.coe.ess.RequestType.countPpl--;
    
  }
  kony.print("--:Ppl presetn:"+JSON.stringify(kony.apps.coe.ess.RequestType.ppls));
  //alert("--:Ppl presetn:"+JSON.stringify(kony.apps.coe.ess.RequestType.ppls));
  // 2names srch box
  if(kony.apps.coe.ess.RequestType.countPpl>0)
  frmobj.txtSearchPeople.text=kony.apps.coe.ess.FilterHistory.empById[kony.apps.coe.ess.RequestType.ppls[0]].Name;                 
  //remainig count in per top...
  frmobj.cntlbl.text=kony.apps.coe.ess.RequestType.countPpl;
};

kony.apps.coe.ess.RequestType.prototype.onSrchDone=function()
{
  var frmobj=kony.application.getCurrentForm();
  frmobj.flexpplDynamic.setVisibility(true);
  var data=kony.apps.coe.ess.FilterHistory.employeeData;
  kony.apps.coe.ess.FilterHistory.employeeDataPopup1=[];
  var textvar=frmobj.txtSearchPeople.text;
  for(var i=0;i<data.length;i++)
  if(data[i].Name!==null && ((data[i].First_Name.toLowerCase().indexOf(textvar.toLowerCase())===0) ||(data[i].Last_Name.toLowerCase().indexOf(textvar.toLowerCase())===0)))
   kony.apps.coe.ess.FilterHistory.employeeDataPopup1.push(data[i]);
  kony.print("--Selecxtedppls:-"+kony.apps.coe.ess.FilterHistory.employeeDataPopup1);
  frmobj.flexpplDynamic.removeAll();
  if(kony.apps.coe.ess.FilterHistory.employeeDataPopup1.length===0)
    kony.apps.coe.ess.FilterHistory.employeeDataPopup1=data;
  this.populateDynamicPplData();
};
var masdata=[],ctrlf=0;
kony.apps.coe.ess.RequestType.prototype.onDonePplSelection=function()
{
  var i=0,segdata=[];var frmobj=kony.application.getCurrentForm();
  var empdata=kony.apps.coe.ess.RequestType.ppls;
  var empStr="";var temp=[];
 kony.print("--Selected Employees--"+kony.apps.coe.ess.RequestType.ppls);
 //alert("--Selected Employees--"+kony.apps.coe.ess.RequestType.ppls);
  for(i=0;i<empdata.length;i++)
      empStr=empStr+empdata[i]+",";
  kony.print("--empdataString:--"+empStr);//alert("--empdataString:--"+empStr);
  var id=frmobj.id;segdata=frmobj.segMentListView.data;
   if(id=="frmTabListView" && ctrlf===0){masdata=segdata;ctrlf=1;}
   if((id=="frmTabListView" && ctrlf===1)|| segdata.length===0)segdata=masdata;
  kony.print("-- the data in seg:"+segdata);
  for(i=0;i<segdata.length;i++)
    {
      
      if((segdata[i].EmpId!==null) && empStr.indexOf(segdata[i].EmpId)===0)
        temp.push(segdata[i]);
    }
  kony.print("--SegDatatempdataString:--"+temp);//alert("--SegDatatempdataString:--"+temp);
   frmobj.segMentListView.setData(temp);
  kony.print("--completed setting to segmeent--"); //alert("--completed setting to segmeent--");
   this.onCancelPplSelection();
};
var ct=0;
kony.apps.coe.ess.RequestType.prototype.onCancelPplSelection=function()
{
  var frmobj=kony.application.getCurrentForm();
  frmobj.flexpplDynamic.removeAll();
  //frmTabReqTypeView.remove(frmTabReqTypeView.selFlex);
  kony.apps.coe.ess.RequestType.selectedPpls=[];
  kony.apps.coe.ess.FilterHistory.employeeDataPopup1=kony.apps.coe.ess.FilterHistory.employeeData;
  frmobj.selFlex.setVisibility(false);ct=1;
  frmobj.txtSearchPeople.text="";
  frmobj.flexpplDynamic.setVisibility(false);
  frmobj.cntlbl.text="0";kony.apps.coe.ess.RequestType.ppls=[];kony.apps.coe.ess.RequestType.countPpl=0;
};

kony.apps.coe.ess.RequestType.prevSegindex=-1;
kony.apps.coe.ess.RequestType.prototype.onClickSegmentList=function()
{
  var pindex=kony.apps.coe.ess.RequestType.prevSegindex;
  var segdata=frmTabReqTypeView.segMentListView.data;
 
  var cindex=frmTabReqTypeView.segMentListView.selectedRowIndex[1];
  kony.apps.coe.ess.RequestType.currentIndexAppr=cindex;
  if(pindex!=-1)
    {
      segdata[pindex].template=flexRow;
      frmTabReqTypeView.segMentListView.setDataAt(segdata[pindex],pindex);  
    }
  segdata[cindex].template=flexRowSel;
  frmTabReqTypeView.segMentListView.setDataAt(segdata[cindex],cindex);
  kony.apps.coe.ess.RequestType.prevSegindex=cindex;
  this.onClickOverview("frm");
};

kony.apps.coe.ess.RequestType.currentIndexAppr=0;
kony.apps.coe.ess.RequestType.prototype.onClickOverview=function(frmid)
{
   this.ResetSkinsTabs(frmid);
  var frmobj=kony.application.getCurrentForm();
  //#ifndef windows8
  frmobj.btnOverview.skin=sknTabbtnRoundWh100;
  //#endif
  //#ifdef windows8
  frmobj.flxOverviews.skin="sknWinFlxOverviewFFFFFF";
  frmobj.lblOverview.skin="sknWinLblOverviewffffff";
  //#endif
  frmobj.flexOverview.setVisibility(true);

};

kony.apps.coe.ess.RequestType.prototype.ResetSkinsTabs=function(frmid)
{
var frmobj=kony.application.getCurrentForm();
 frmobj.flexOverview.setVisibility(false);
frmobj.flexAttachments.setVisibility(false);
frmobj.flexfullDetails.setVisibility(false);
frmobj.flxAudit.setVisibility(false);
//#ifndef windows8
frmobj.btnOverview.skin=sknBtn063ec1c78222e4a;
frmobj.btnAttachment.skin=sknBtn063ec1c78222e4a;
frmobj.btnDetails.skin=sknBtn063ec1c78222e4a;
frmobj.btnTrail.skin=sknBtn063ec1c78222e4a;
  //#endif
  //#ifdef windows8
frmobj.flxOverviews.skin="slFbox";
frmobj.lblOverview.skin="sknWinLblAttachment12636d";

frmobj.flxAttachments.skin="slFbox";
frmobj.lblAttachments.skin="sknWinLblAttachment12636d";

frmobj.flxFulldetail.skin="slFbox";
frmobj.lblFullDetails.skin="sknWinLblAttachment12636d";

frmobj.flxAuditTrail.skin="slFbox";
frmobj.lblAuditTrail.skin="sknWinLblAttachment12636d";
  //#endif
};
kony.apps.coe.ess.RequestType.prototype.onClickAttachments=function(frmid)
{
  var frmobj=kony.application.getCurrentForm();
  var i=0;this.ResetSkinsTabs(frmid);
  //#ifndef windows8
   frmobj.btnAttachment.skin=sknTabbtnRoundWh100;
  //#endif 
  //#ifdef windows8
  frmobj.flxAttachments.skin="sknWinFlxOverviewFFFFFF";
  frmobj.lblAttachments.skin="sknWinLblOverviewffffff";
  //#endif
   frmobj.flexAttachments.setVisibility(true);
  //this.ResetSkinsTabs(frmid);


};
kony.apps.coe.ess.RequestType.prototype.setAttachmentdata=function(data)
{
  /*var frmobj=kony.application.getCurrentForm();
   var   SegChatDataMap = {
						"lblUserName": "ShortName",
						"lblUserAppliedDate": "Appliedon",
						"lblUserComment": "Comment"
					};
					
			var		WidgetDatamap = {
							"lblPeopleName": "Media"
						};
frmobj.segComment.setData(data.comments);
frmobj.attachSeg.setData(data.userAttachments);
  */
  
};
kony.apps.coe.ess.RequestType.prototype.onClickFullDetails=function(frmid)
{
  var i=0;this.ResetSkinsTabs(frmid);
  var frmobj=kony.application.getCurrentForm();
  //#ifndef windows8
   frmobj.btnDetails.skin=sknTabbtnRoundWh100;
  //#endif
  //#ifdef windows8
  frmobj.flxFulldetail.skin="sknWinFlxOverviewFFFFFF";
  frmobj.lblFullDetails.skin="sknWinLblOverviewffffff";
  //#endif
  frmobj.flexfullDetails.setVisibility(true);
  
};

kony.apps.coe.ess.RequestType.prototype.onClickAuditTrail=function(frmid)
{
  var i=0;this.ResetSkinsTabs(frmid);
   var frmobj=kony.application.getCurrentForm();
  //#ifndef windows8
  frmobj.btnTrail.skin=sknTabbtnRoundWh100;
  //#endif
  //#ifdef windows8
  frmobj.flxAuditTrail.skin="sknWinFlxOverviewFFFFFF";
  frmobj.lblAuditTrail.skin="sknWinLblOverviewffffff";
  //#endif
  frmobj.flxAudit.setVisibility(true);
};

kony.apps.coe.ess.RequestType.prototype.onClickCancelSelectedPplX=function()
{
(kony.application.getCurrentForm()).flxDisplay.setVisibility(false);
};

function reinitiateForm(frmids)
{
  var frmid=kony.application.getPreviousForm();
  frmid.destroy();frmid.show();
}


var MonthsData=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
kony.apps.coe.ess.RequestType.prototype.processReqData=function(data)
{
  kony.print("--Enterd proceddsdata--:"+JSON.stringify(data));
  //alert("--Enterd proceddsdata--:"+JSON.stringify(data));
  var desc=[],v1,v2=[],i=0;var dateformat="";var objdate;
  var formatDateObj = new kony.apps.coe.ess.Approvals.RequestedListBackendlogic();
  dateformat = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Due_Date.Format");

            for(i=0;i<data.length;i++)
              {      
              if(!data[i].hasOwnProperty('Media_Id'))data[i].Media_Id=null;
             data[i].perimg="profile.png";
             data[i].fullName=data[i].First_Name+" "+data[i].Last_Name;
                // data[i].category_id  2014 01 21
			     data[i].daycount=parseInt(data[i].request_date.substring(6))-parseInt(data[i].request_date.substring(6));
                 objdate = new Date().modifyByYYYYMMDDHHMMSS(data[i].request_date);
                 data[i].request_date = objdate.toDateString();
                 objdate = new Date().modifyByYYYYMMDDHHMMSS(data[i].due_date);
                 data[i].due_date = objdate.toDateString();
              //MyTime..
                //type_id":"PURCHREQTN"//":"PR: 0010000007 10.00 
                if(data[i].type_id==="PURCHREQTN"){}
                // wrokorder  no description..
                //
                if(data[i].type_id==="WORKORDER"){}
                if(data[i].type_id==="TIMESHEET"){}
              }
              
    kony.print("---processed data types..:"+JSON.stringify(data));
     frmTabReqTypeView.segMentListView.widgetDataMap={
       "lblPeopleName":"fullName",
       "lblSubmitDate":"request_date",
       "lblDate":"due_date",
       "lblPeoplePosition":"category_id",
       "lblPeopleDate":"days",
       "lblTotalDays":"daycount",
       "imgPeople":"perimg"
     };
     if(data!=="" && data!==null) {
     	frmTabReqTypeView.segMentListView.setData(data);
     }
   kony.print("---processed data types..:"+JSON.stringify(frmTabReqTypeView.segMentListView.data));
    /*var segmentConfiguration = {
									"MediaKeyAttribute": "Media_Id",
									"ImageWidgetName": "perimg",
									"hideWidgetNames": []
								};
   kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(1, 
                                                    frmTabReqTypeView.segMentListView, "Employee", "mediaEmployee", "", segmentConfiguration);	
  
             */
};

kony.apps.coe.ess.RequestType.prototype.postShowRequest=function()
{
  var temp;//templates=[segppltemp,segpplAtemp,segpplBtemp,segpplABtemp];
  //load data to Segment..
  var pdata=kony.apps.coe.ess.FilterHistory.employeeData;
  for(var i=0;i<pdata.length;i++)
  {
   pdata[i].perimg="profile.png";
   if(pdata[i].media_id !==null && pdata[i].media_id.length>4)
   pdata[i].template=segppltemp;
   else pdata[i].template=segpplAtemp;
   temp=pdata[i].Last_Name[0];temp=temp.toLowerCase();
   pdata[i].lblIname=pdata[i].First_Name[0]+temp;
  }
  kony.print("--- pdata:"+JSON.stringify(pdata));
   //alert("--- pdata:"+JSON.stringify(pdata));
  frmTabReqTypeView.segpplList.widgetDataMap={
    "lblname":"Name",
    "lblfname":"Name",
    "perimg":"perimg",
    "lblIname":"lblIname"
  };
  frmTabReqTypeView.segpplList.setData(pdata);
  kony.apps.coe.ess.FilterHistory.EmpSegData=pdata;
  // load images.. for people..
  var segmentConfiguration = {
									"MediaKeyAttribute": "media_id",
									"ImageWidgetName": "perimg",
									"hideWidgetNames": []
								};
  //#ifndef windows8
	kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(1, 
                                                    frmTabReqTypeView.segpplList, "Employee", "mediaEmployee", "", segmentConfiguration);	
   //#endif
};

var ctrlappreq=0,masterReqdata=[];
kony.apps.coe.ess.RequestType.prototype.getRequestedData=function(requestType)
{
  /*var query="select approval_id,ra.status_id,category_id,ar.type_id,request_date,due_date from request_approver ra  LEFT JOIN approval_request as ar ON(ra.approval_id=ar.id) LEFT JOIN Status as s ON (s.id=ar.status_id) LEFT JOIN request_category as rc on (rc.id=ar.category_id) WHERE ra.approver_id=";
   query+="'"+kony.apps.coe.ess.globalVariables.EmployeeID+"'";
  query+=" AND ar.type_id=";
  query+="'"+requestType+"'";
  //kony.application.showLoadingScreen("", "Loading Results....", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  kony.print("--Query--:"+query);alert("--Query--:"+query);
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function (respf) {
   kony.print("-- responseFilterIndividual:"+JSON.stringify(respf));
    var respfinal={};
    alert("-- responseFilterIndividual:"+JSON.stringify(respf));
    var qry2="select * from approval_request LEFT JOIN Employee ON approval_request.employee_id=Employee.Id where type_id=";
    //alert("-- responseFilterIndividual:"+JSON.stringify(response));
    qry2+="'"+requestType+"'";
      if(respf!==null && respf!==undefined){for(var i=0;i<respf.length;i++)
      respfinal[respf[i].approval_id]=respf[i];
    kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", qry2, function (respfinal,response) {
    kony.print("-- responseIndividual:"+JSON.stringify(response));alert("-- responseIndividual:"+JSON.stringify(response));
    if(response!==null && response!==undefined)for(var i=0;i<response.length;i++)
      {if(respfinal[response[i]])
                    {respfinal[response[i].id].First_Name=response[i].First_Name;
        respfinal[response[i].id].Last_Name=response[i].Last_Name;
        respfinal[response[i].id].Media_Id=response[i].Media_Id;}
      }
      kony.print("-- did it:"+JSON.stringify(respfinal));alert("-- did it:"+JSON.stringify(respfinal));
    //var qry2="select * from approval_request LEFT JOIN Employee ON approval_request.employee_id=Employee.id where approval_request.employee_id!=NULL";
    //alert("-- responseFilterIndividual:"+JSON.stringify(response));
    (new kony.apps.coe.ess.RequestType()).processReqData(respfinal);
    //kony.application.dismissLoadingScreen();
  },{});
}
  },{});
 */
  if(ctrlappreq===0)
    {
      masterReqdata=frmTabReqTypeView.segMentListView.data;
      ctrlappreq=1;
    }
    var frmobj=kony.application.getCurrentForm();
    var segmentConfiguration = {
									"MediaKeyAttribute": "MediaID",
									"ImageWidgetName": "imgPeople",
									"hideWidgetNames": []
								};
  var data=kony.apps.coe.ess.Approvals.tabApprovalsListView.masterData;var data1=[];
  //alert("--data..setting.."+JSON.stringify(data));
  for(var i=0;i<data.length;i++){ 
  if(data[i].request_type==requestType)
    {
      if(data[i].MediaID===undefined)data[i].MediaID=null;
       data1.push(data[i]);
  }
  }
  frmTabReqTypeView.segMentListView.setData(data1);
  //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(1, 
                                                   // frmTabReqTypeView.segMentListView, "Employee", "mediaEmployee", "", segmentConfiguration);
  
};


kony.apps.coe.ess.RequestType.prevpplIndex=-1;
var cntcps=0,globalEmpData=[];
kony.apps.coe.ess.RequestType.prototype.onClickPplSegment=function()
{
  var pindex=kony.apps.coe.ess.RequestType.prototype.prevpplIndex;
  var cindex=frmTabReqTypeView.segpplList.selectedRowIndex[1];
  var cdata=frmTabReqTypeView.segpplList.data;//media_id
  if(cntcps===0){globalEmpData=cdata;cntcps++;}
    //frmTabReqTypeView.segpplList.setData(kony.apps.coe.ess.FilterHistory.EmpSegData);
     if(cdata[cindex].media_id===null || cdata[cindex].media_id.length<5 )cdata[cindex].template=segpplABtemp;
      else cdata[cindex].template=segpplBtemp;
      //cdata[pindex].template=(cdata[pindex].template==segpplBtemp?segppltemp:segpplAtemp);
      //frmTabReqTypeView.segpplList.setDataAt(cdata[pindex],pindex);
 
  frmTabReqTypeView.segpplList.setData(globalEmpData);
  frmTabReqTypeView.segpplList.setDataAt(cdata[cindex],cindex);
  kony.apps.coe.ess.RequestType.prevpplIndex=cindex;
  this.getRecordsForEmployee(cdata[cindex].id);
};


kony.apps.coe.ess.RequestType.prototype.getRecordsForEmployee=function(Empid)
{
 /* var query="select * from approval_request LEFT JOIN Employee ON Employee.id=approval_request.employee_id where approval_request.employee_id =";
    query+="'"+Empid+"'";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function (response) {
   kony.print("-- responseFilterIndividual:"+JSON.stringify(response));
    alert("-- responseFilterIndividual:"+JSON.stringify(response));
    (new kony.apps.coe.ess.RequestType()).processReqData(response);
  },function(err)
                                       {
    kony.print("--Enterd error call getRecordsForEmployee---");
  });
  */
  kony.print("--enterd to retrieve empid:"+Empid);
  var frmobj=kony.application.getCurrentForm();
  var data=kony.apps.coe.ess.Approvals.tabApprovalsListView.ApprovalsListData;
     var segmentConfiguration = {
									"MediaKeyAttribute": "MediaID",
									"ImageWidgetName": "imgPeople",
									"hideWidgetNames": []
								};
  var data1=[];
   if(Empid!==null)
  for(var i=0;i<data.length;i++){ 
    if(data[i].MediaID===undefined)data[i].MediaID=null;
    if(data[i].EmpId==Empid)
     data1.push(data[i]);
  }
  kony.print("--after filtering:"+JSON.stringify(data1));
  frmobj.segMentListView.setData(data1);
  //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(1, 
                                                    //frmobj.segMentListView, "Employee", "mediaEmployee", "", segmentConfiguration);
};
var fctrl={};
kony.apps.coe.ess.RequestType.prototype.populateDynamicPplData=function()
{
  var tp=20,ht=10,tempstr,tempv,temp;
  var frmobj=kony.application.getCurrentForm();
  var empdata=kony.apps.coe.ess.FilterHistory.employeeDataPopup1;
  if(empdata.length<1)empdata=kony.apps.coe.ess.FilterHistory.employeeData;
     kony.print("--EmpdataLength:"+empdata.length);
 kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading..");
  for(var i=0;i<empdata.length/4;i++)
    {
      tempv=i;
      tempv="flexset"+tempv;
      tempstr=tp+"%";
      temp=i*4;
      addVerticalContainerPpl(tempstr,i);
      tp+=10;kony.print("--Entered addingFlex emp:"+i);
      kony.print("--Entered adding emp:"+i);
      for(var j=0;j<4 && temp+j<empdata.length;j++)
      {temp+=j;frmobj["flexset"+i].add(addHorizontalcontainerPpl(temp+"",empdata[temp].Name));
      //#ifndef windows8
       //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, frmTabReqTypeView["selimg"+temp],"Employee", "mediaEmployee", empdata[temp].Media_Id, {});
      //#endif
      }
    }
  //tp=tp+ht;
  var id=frmobj.id;
  if(fctrl[id]===undefined || fctrl[id]===null){addSelectionFooter(tp+"%");fctrl[id]=1;}
  frmobj.selFlex.setVisibility(true);
  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
};


