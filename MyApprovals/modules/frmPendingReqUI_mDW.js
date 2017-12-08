kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};

kony.apps.coe.ess.frmPendingUIDW = function() {

};
kony.apps.coe.ess.frmHamUIDW = function() {

};

kony.apps.coe.ess.frmAppDashboardUIDW = function() {
    this.employee_id = "";
};
/*** this function is
     called on click
     of request by
     ***/
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfRequestType = function() {
    if (frmPendingRequest.flxPeople.skin === "sknFlx2ebaeeRCDW") {
        frmPendingRequest.flxPeople.skin = "sknFlxf8f8f8RCDW";
        frmPendingRequest.lblPeople.skin = "sknLbl777777FS14pxDW";
        frmPendingRequest.imgTickPeople.src = "uncheck.png";
        frmPendingRequest.flxSelectpeople.setVisibility(false);
        frmPendingRequest.flxFilter.left = "0%";
        frmPendingRequest.flxFilter.width = "100%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.segAllEmp.left = "0%";
        frmPendingRequest.segAllEmp.width = "40%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.left = "40%";
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.width = "60%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.forceLayout();
    }
    if (frmPendingRequest.flxRequestType.skin === "sknFlxf8f8f8RCDW") {
        frmPendingRequest.flxRequestType.skin = "sknFlx2ebaeeRCDW";
        frmPendingRequest.lblRequestType.skin = "sknLblffffffFS14DW";
        frmPendingRequest.imgTickRequest.src = "check.png";
        frmPendingRequest.flxFilter.left = "8.5%";
        frmPendingRequest.flxFilter.width = "91.5%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.segAllEmp.left = "8.5%";
        frmPendingRequest.segAllEmp.width = "40%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.segAuditTrail.left = "10%";
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.segAuditTrail.width = "80%";
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.flxAuditTrailDetails.width = "100%";
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
        frmPendingRequest.flxAuditTrailDetails.left = "0%";
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.left = "48.5%";
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.width = "51.5%";
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxAllRequests.setVisibility(true);
        frmPendingRequest.forceLayout();
       (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest(null);
    } else {
        frmPendingRequest.flxRequestType.skin = "sknFlxf8f8f8RCDW";
        frmPendingRequest.lblRequestType.skin = "sknLbl777777FS14pxDW";
        frmPendingRequest.imgTickRequest.src = "uncheck.png";
        frmPendingRequest.flxAllRequests.setVisibility(false);
        frmPendingRequest.flxFilter.left = "0%";
        frmPendingRequest.flxFilter.width = "100%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.segAllEmp.left = "0%";
        frmPendingRequest.segAllEmp.width = "40%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.left = "40%";
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.width = "60%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.forceLayout();
        (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest(null);
    }
};
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfPeople = function() {
    if (frmPendingRequest.flxRequestType.skin === "sknFlx2ebaeeRCDW") {
        frmPendingRequest.flxRequestType.skin = "sknFlxf8f8f8RCDW";
        frmPendingRequest.lblRequestType.skin = "sknLbl777777FS14pxDW";
        frmPendingRequest.imgTickRequest.src = "uncheck.png";
        frmPendingRequest.flxAllRequests.setVisibility(false);
        frmPendingRequest.flxFilter.left = "0%";
        frmPendingRequest.flxFilter.width = "100%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.segAllEmp.left = "0%";
        frmPendingRequest.segAllEmp.width = "40%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.left = "40%";
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.width = "60%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.forceLayout();
      (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest(null);
    }
    if (frmPendingRequest.flxPeople.skin === "sknFlxf8f8f8RCDW") {
        frmPendingRequest.flxPeople.skin = "sknFlx2ebaeeRCDW";
        frmPendingRequest.lblPeople.skin = "sknLblffffffFS14DW";
        frmPendingRequest.imgTickPeople.src = "check.png";
        frmPendingRequest.flxFilter.left = "8.5%";
        frmPendingRequest.flxFilter.width = "91.5%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.segAllEmp.left = "8.5%";
        frmPendingRequest.segAllEmp.width = "40%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.left = "48.5%";
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.width = "51.5%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.flxSelectpeople.setVisibility(true);
        frmPendingRequest.forceLayout();
         
        var data = kony.apps.coe.ess.frmPendingUIDW.EmployeeTable(function(res) {
            kony.print("---- Data of employee table:" + JSON.stringify(res));
          
        for (var j=0;j<res.length;j++){
          res[j].Separator="Label";
          res[j].image = "people.png";
        }
        kony.print("---- Data1 of employee table:" + JSON.stringify(res[j]));
        frmPendingRequest.segEmp.widgetDataMap = {"lblname" : "UserName", "lblSep" : "separator", "perimg" : "EmployeeImage"};
        EmployeeDataArray=[];
        for(var i=0;i<res.length;i++){
        var UserName = res[i].First_Name + res[i].Last_Name;
        var employeeID=res[i].Id;
        var separator= res[i].Separator;
        var EmployeeImage = res[i].image;
        var EmployeeData ={"UserName": UserName,"employeeID":employeeID,"separator":separator,"EmployeeImage":EmployeeImage};
           EmployeeDataArray.push(EmployeeData);
        }   
 		 frmPendingRequest.segEmp.setData(EmployeeDataArray);
 		 kony.print("--- Employee segment :" + JSON.stringify(EmployeeDataArray));
        });
        
                                 
    } else {
        frmPendingRequest.flxPeople.skin = "sknFlxf8f8f8RCDW";
        frmPendingRequest.lblPeople.skin = "sknLbl777777FS14pxDW";
        frmPendingRequest.imgTickPeople.src = "uncheck.png";
        frmPendingRequest.flxSelectpeople.setVisibility(false);
        frmPendingRequest.flxFilter.left = "0%";
        frmPendingRequest.flxFilter.width = "100%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.segAllEmp.left = "0%";
        frmPendingRequest.segAllEmp.width = "40%";
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.left = "40%";
        frmPendingRequest.flxOuterSelectedEmpReqFullDetails.width = "60%";
        frmPendingRequest.flxAuditTrailDetails.forceLayout();
        frmPendingRequest.flxInnerPending.forceLayout();
        frmPendingRequest.forceLayout();
        (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest(null);
    }
};
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfAuditTrail = function() {
    //var data=[];
    frmPendingRequest.lblOverView.skin = "sknLbl12636dDW";
    frmPendingRequest.lblFullDetails.skin = "sknLbl12636dDW";
    frmPendingRequest.lblAttachments.skin = "sknLbl12636dDW";
    frmPendingRequest.flxHighLight.left = "81%";
    frmPendingRequest.flxHeaderDetails.forceLayout();
    frmPendingRequest.lblAuditTrail.skin = "sknLblffffffFS14DW";
    frmPendingRequest.flxAuditTrail.forceLayout();
    frmPendingRequest.flxOuterHeader.height = "110px";
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxSelectedEmpImg.setVisibility(false);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPending.setVisibility(false);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPendingCircle.setVisibility(false);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.flxSelectedEmpReqFullDetails.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxBtnRejectApprove.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxFullDetailsOverview.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAuditTrailDetails.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxComments.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAttachmentsSegment.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxFullDetailsSegment.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxInnerPending.forceLayout();
    frmPendingRequest.forceLayout();
  
    var data = frmPendingRequest.segAllEmp.selectedItems[0];
    kony.print("--- data segment :" + JSON.stringify(data));
  
    frmPendingRequest.segAuditTrail.widgetDataMap = {
         "lblPersonNameAT" : "UserName",
         "lblHorizontalLineAT" : "Separator",
         "lblLineAT" : "Separator",
         "lblLineAT2" : "Separator",
         "lblDescriptionAT": "category",
         "lblEventCreationAT": "Audit",
         "lblDateAT" : "RequestDate",
         "imgAT" : "Auditimage",
    };
  var 	UserName=data.UserName;
  var 	RequestDate=data.RequestDate;
  var   Separator = data.Separator;
  var   category = data.category;
  var   Audit = data.Audit;
  var Auditimage = data.Auditimage;
  var AttachmentData =[{"UserName": UserName,"RequestDate": RequestDate,"Separator":Separator,"category":category,"Audit":Audit,"Auditimage":Auditimage}];
  frmPendingRequest.segAuditTrail.setData(AttachmentData);
  
    
    frmPendingRequest.segAuditTrail.setData(data);
    frmPendingRequest.flxAuditTrailDetails.forceLayout();
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxInnerPending.forceLayout();
    frmPendingRequest.forceLayout();
};
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfOverview = function() {
    frmPendingRequest.lblOverView.skin = "sknLblffffffFS14DW";
    frmPendingRequest.flxHighLight.left = "3.67%";
    frmPendingRequest.flxHeaderDetails.forceLayout();
    frmPendingRequest.lblAuditTrail.skin = "sknLbl12636dDW";
    frmPendingRequest.lblFullDetails.skin = "sknLbl12636dDW";
    frmPendingRequest.lblAttachments.skin = "sknLbl12636dDW";
    frmPendingRequest.flxAuditTrail.forceLayout();
    frmPendingRequest.flxOuterHeader.height = "185px";
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxSelectedEmpImg.setVisibility(true);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPending.setVisibility(true);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPendingCircle.setVisibility(true);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.flxComments.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAttachmentsSegment.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxSelectedEmpReqFullDetails.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxBtnRejectApprove.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAuditTrailDetails.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxFullDetailsSegment.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxFullDetailsOverview.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxInnerPending.forceLayout();
    frmPendingRequest.forceLayout();
};
/**
 * @class onClickOfFullDetails
 * this class for Full details Overview
 * this is called on Click of FullDetails 
 */

kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfFullDetails = function() {
    frmPendingRequest.lblFullDetails.skin = "sknLblffffffFS14DW";
    frmPendingRequest.flxHighLight.left = "55%";
    frmPendingRequest.flxHeaderDetails.forceLayout();
    frmPendingRequest.lblAuditTrail.skin = "sknLbl12636dDW";
    frmPendingRequest.lblOverView.skin = "sknLbl12636dDW";
    frmPendingRequest.lblAttachments.skin = "sknLbl12636dDW";
    frmPendingRequest.flxAuditTrail.forceLayout();   
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxSelectedEmpImg.setVisibility(false);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPending.setVisibility(false);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblSelectedEmp.setVisibility(false);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPendingCircle.setVisibility(false);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.flxComments.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAttachmentsSegment.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxSelectedEmpReqFullDetails.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxFullDetailsOverview.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxBtnRejectApprove.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
//    frmPendingRequest.flxFullDetailsSegment.setVisibility(true);
 //   frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAuditTrailDetails.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxInnerPending.forceLayout();
    frmPendingRequest.forceLayout();
    var data = frmPendingRequest.segAllEmp.selectedItems[0];
    kony.print("--- data segment :" + JSON.stringify(data));
   
     frmPendingRequest.segFullDetails.widgetDataMap = {
        "lblType" : "leftdetails",
         "lblValue" : "rightdetails",
         "lblSep" : "Separator",
       "lblVerSep1" : "VerSeparator",
        
    };
   
    if((data.extended).length === 0 ||(data.extended).length === 2){
    frmPendingRequest.flxFullDetailsSegment.setVisibility(false);
    }else {
     var details = data.extended;
    frmPendingRequest.flxFullDetailsSegment.setVisibility(true);
    
    for(left in details){
      console.log(left);
    }
     for(left in details){
      console.log(details[left]);
    }
    var leftdetails = left;
    var rightdetails = details[left];
    var   Separator = data.Separator;
    var   VerSeparator = data.Separator;
   
  var FullDeatils =[{"leftdetails": leftdetails,"rightdetails": rightdetails,"VerSeparator":VerSeparator,"Separator":Separator}];
  frmPendingRequest.segFullDetails.setData(FullDeatils);
  kony.print("--- FullDetails segment :" + JSON.stringify(FullDeatils));
 }   
};

/**
 * @class onClickOfAttachments
 * this class for Full details Overview
 * this is called on Click of FullDetails 
 */

kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfAttachments = function() {
    frmPendingRequest.lblAttachments.skin = "sknLblffffffFS14DW";
    frmPendingRequest.flxHighLight.left = "30%";
    frmPendingRequest.flxHeaderDetails.forceLayout();
    frmPendingRequest.lblAuditTrail.skin = "sknLbl12636dDW";
    frmPendingRequest.lblOverView.skin = "sknLbl12636dDW";
    frmPendingRequest.lblFullDetails.skin = "sknLbl12636dDW";
    frmPendingRequest.flxAuditTrail.forceLayout();   
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxSelectedEmpImg.setVisibility(true);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPending.setVisibility(true);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblSelectedEmp.setVisibility(true);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.lblPendingCircle.setVisibility(true);
    frmPendingRequest.flxOuterHeader.forceLayout();
    frmPendingRequest.flxComments.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAttachmentsSegment.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxSelectedEmpReqFullDetails.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxFullDetailsOverview.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxBtnRejectApprove.setVisibility(true);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxAuditTrailDetails.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxFullDetailsSegment.setVisibility(false);
    frmPendingRequest.flxOuterSelectedEmpReqFullDetails.forceLayout();
    frmPendingRequest.flxInnerPending.forceLayout();
    frmPendingRequest.forceLayout();
    var data = frmPendingRequest.segAllEmp.selectedItems[0];
    kony.print("--- data segment :" + JSON.stringify(data));
    
    var req = data.request_type;
    var Category = data.category;
    var image = data.requestTypeImage;
    frmPendingRequest.lblBusinessName.text = req;
    frmPendingRequest.lblTypeName.text = Category;
    frmPendingRequest.imgTypeOfRequest.src = image;
  
    frmPendingRequest.segAttachment.widgetDataMap = {
        "lblPeopleName" : "media_name",
         "imgPeople" : "attachments",
         "lblSep" : "Separator",
         "lblPeoplePosition" : "AddedOn",
    };
  var 	media_name=data.media_name;
  var 	attachments=data.attachments;
  var   Separator = data.Separator;
  var   AddedOn = "Added on" + data.RequestDate;
  var AttachmentData =[{"media_name": media_name,"attachments": attachments,"Separator":Separator, "AddedOn":AddedOn}];
  frmPendingRequest.segAttachment.setData(AttachmentData);
  kony.print("--- Attachment segment :" + JSON.stringify(AttachmentData));
};


/**
 * @class onClickOfSettings
 * this class for FrmHamburger settings
 * this is called on Click of Settings icon in Hamburger
 */

kony.apps.coe.ess.frmHamUIDW.prototype.onClickOfSettings = function() {
    if (frmHamburgerDW.flxHamAppPreferences.isVisible === true) {
        frmHamburgerDW.flxHamAppPreferences.isVisible = false;
        frmHamburgerDW.flxContent.forceLayout();
        frmHamburgerDW.flxMasthead.isVisible = true;
        frmHamburgerDW.flxContent.forceLayout();
        frmHamburgerDW.flxHamApps.isVisible = true;
        frmHamburgerDW.flxContent.forceLayout();
        frmHamburgerDW.lblApplicationPreferences.setVisibility(false);
        frmHamburgerDW.flxActionsWrapper.forceLayout();
        frmHamburgerDW.forceLayout();

    } else {
        frmHamburgerDW.flxHamApps.isVisible = false;
        frmHamburgerDW.flxContent.forceLayout();
        frmHamburgerDW.flxHamAppPreferences.isVisible = true;
        frmHamburgerDW.flxContent.forceLayout();
        frmHamburgerDW.flxMasthead.isVisible = false;
        frmHamburgerDW.flxContent.forceLayout();
        frmHamburgerDW.lblApplicationPreferences.setVisibility(true);
        frmHamburgerDW.flxActionsWrapper.forceLayout();
        frmHamburgerDW.forceLayout();
    }
};

/**
 * @class onClickOfMenu
 * this class for Open Menu
 * this is called on Click of Hamburger
 */

kony.apps.coe.ess.frmHamUIDW.prototype.onClickOfMenu = function() {
  
     var fulldata = kony.apps.coe.ess.Approvals.spa.totalRequests.ISLaterRequestsData.concat(kony.apps.coe.ess.Approvals.spa.totalRequests.ApprovalRequestData)
        var Filterdata=[];
        for (var  y = 0;y < fulldata.length; y++) {   
        if((Number(fulldata[y].isLater) === 0 && Number(fulldata[y].StatusId) === 2) || (Number(fulldata[y].isLater) === 1 && Number(fulldata[y].StatusId) === 2)) 
        Filterdata.push(fulldata[y]);
       }
  
     var  data = Filterdata;
  if(data.length>0) {
     kony.print("---- Request Type Filter data:" + JSON.stringify(data));
     kony.print("----User Name:" + JSON.stringify(data[0]));
     var Name = data[0].UserName;
     frmHamburgerDW.lblProfileName.text = Name;
     frmHamburgerDW.flxHamAppPreferences.isVisible = false;
     frmHamburgerDW.flxContent.forceLayout();
     frmHamburgerDW.flxMasthead.isVisible = true;
     frmHamburgerDW.flxContent.forceLayout();
     frmHamburgerDW.flxHamApps.isVisible = true;
     frmHamburgerDW.flxContent.forceLayout();
     frmHamburgerDW.lblApplicationPreferences.setVisibility(false);
     frmHamburgerDW.flxActionsWrapper.forceLayout();
     frmHamburgerDW.forceLayout();
     frmHamburgerDW.show();
    }else{
      frmHamburgerDW.lblProfileName.text = "DemoUser";
     frmHamburgerDW.flxHamAppPreferences.isVisible = false;
     frmHamburgerDW.flxContent.forceLayout();
     frmHamburgerDW.flxMasthead.isVisible = true;
     frmHamburgerDW.flxContent.forceLayout();
     frmHamburgerDW.flxHamApps.isVisible = true;
     frmHamburgerDW.flxContent.forceLayout();
     frmHamburgerDW.lblApplicationPreferences.setVisibility(false);
     frmHamburgerDW.flxActionsWrapper.forceLayout();
     frmHamburgerDW.forceLayout();
     frmHamburgerDW.show();
    }
    }



/**
 * @class onRowClickOfSegEmp
 * this class for AllPendingRequest Details
 * this is called on Click of any Row item of the Pending list
 */
kony.apps.coe.ess.frmPendingUIDW.prototype.onRowClickOfSegEmp = function() {
    var data = frmPendingRequest.segAllEmp.selectedItems[0];
    kony.print("--- data segment :" + JSON.stringify(data));
    var selectedEmpName = data.UserName;
    var req = data.request_type;
    var detailType = data.AdditionalData;
    var detail = data.RequestInfo;
    var subDate = data.RequestDate;
    var duedate = data.dueDate;
    var image = data.requestTypeImage;
    var Comments = data.Comments;
    var Category = data.category;
    frmPendingRequest.lblSelectedEmp.text = selectedEmpName;
    frmPendingRequest.lblType.text = req;
    frmPendingRequest.lblDetail.text = Category;
    frmPendingRequest.lblCompany.text = detailType;
    frmPendingRequest.lblReqCost.text = detail;
    frmPendingRequest.lblRequestedDate.text = subDate;
    frmPendingRequest.lblDueDate.text = duedate;
    frmPendingRequest.imgSelectedReq.src = image;
    frmPendingRequest.lblComment.text = Comments;
    frmPendingRequest.lblNameOfCommenter.text = selectedEmpName;
    frmPendingRequest.lblAppliedOn.text = "Applied On" + subDate;
};
/**
 * @class onClickOfRejectExpense
 * this class for AllPendingRequest Details
 * this is called on Click of reject button
 */
kony.apps.coe.ess.frmAppDashboardUIDW.prototype.onClickOfRejectExpense = function() {
    frmApprovalsDashboard.flxExpenseRequest.setVisibility(false);
    frmApprovalsDashboard.flxAllRequests.forceLayout();
    frmApprovalsDashboard.flxOuter2.forceLayout();
    frmApprovalsDashboard.flxOuterDashboard.forceLayout();
    frmApprovalsDashboard.forceLayout();
    frmApprovalsDashboard.flxPurchaseRequest.top = "14px";
    frmApprovalsDashboard.flxAllRequests.forceLayout();
    frmApprovalsDashboard.flxOuter2.forceLayout();
    frmApprovalsDashboard.flxOuterDashboard.forceLayout();
    frmApprovalsDashboard.forceLayout();
    frmApprovalsDashboard.flxWorkRequest.top = "318px";
    frmApprovalsDashboard.flxAllRequests.forceLayout();
    frmApprovalsDashboard.flxOuter2.forceLayout();
    frmApprovalsDashboard.flxOuterDashboard.forceLayout();
    frmApprovalsDashboard.forceLayout();
    frmApprovalsDashboard.flxTimeRequest.right = "2%";
    frmApprovalsDashboard.flxTimeRequest.left = "Default";
    frmApprovalsDashboard.flxAllRequests.forceLayout();
    frmApprovalsDashboard.flxOuter2.forceLayout();
    frmApprovalsDashboard.flxOuterDashboard.forceLayout();
    frmApprovalsDashboard.forceLayout();

};
/**
 * @class onClickOfLeaveReq
 * this class for AllPendingRequest Filter
 * this is called on Click of Leave Option Request Type filter
 */
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfLeaveReq = function() {
    frmPendingRequest.flxLeaveReq.imgLeave.src = "leaverequest.png";
    frmPendingRequest.flxLeaveReq.lblLeave.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxLeaveReq.lblRequest.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxLeaveReq.skin = "sknFlx1db6c9BorderDownAndRightDW";
    frmPendingRequest.flxExpenseRequest.imgExpense.src = "expense.png";
    frmPendingRequest.flxExpenseRequest.lblExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.lblRequestExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxTimeRequests.imgTime.src = "timerequests.png";
    frmPendingRequest.flxTimeRequests.lblTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.lblRequestTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxPurchaseRequest.imgPurchase.src = "purchasereq.png";
    frmPendingRequest.flxPurchaseRequest.lblPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.lblRequestPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxWorkRequest.imgWork.src = "workrequest.png";
    frmPendingRequest.flxWorkRequest.lblWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.lblRequestWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";

}
/**
 * @class onClickOfExpenseReq
 * this class for AllPendingRequest Filter
 * this is called on Click of Expense Option Request Type filter
 */
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfExpenseReq = function() {
    frmPendingRequest.flxLeaveReq.imgLeave.src = "leaverequest.png";
    frmPendingRequest.flxLeaveReq.lblLeave.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.lblRequest.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxExpenseRequest.imgExpense.src = "expenserequestwhite.png";
    frmPendingRequest.flxExpenseRequest.lblExpense.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxExpenseRequest.lblRequestExpense.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxExpenseRequest.skin = "sknFlx1db6c9BorderDownAndRightDW";
    frmPendingRequest.flxTimeRequests.imgTime.src = "timerequests.png";
    frmPendingRequest.flxTimeRequests.lblTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.lblRequestTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxPurchaseRequest.imgPurchase.src = "purchasereq.png";
    frmPendingRequest.flxPurchaseRequest.lblPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.lblRequestPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxWorkRequest.imgWork.src = "workrequest.png";
    frmPendingRequest.flxWorkRequest.lblWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.lblRequestWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
}
/**
 * @class onClickOfTimeReq
 * this class for AllPendingRequest Filter
 * this is called on Click of Time Option Request Type filter
 */
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfTimeReq = function() {
    frmPendingRequest.flxLeaveReq.imgLeave.src = "leaverequest.png";
    frmPendingRequest.flxLeaveReq.lblLeave.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.lblRequest.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxExpenseRequest.imgExpense.src = "expense.png";
    frmPendingRequest.flxExpenseRequest.lblExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.lblRequestExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxTimeRequests.imgTime.src = "timerequests.png";
    frmPendingRequest.flxTimeRequests.lblTime.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxTimeRequests.lblRequestTime.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxTimeRequests.skin = "sknFlx1db6c9BorderDownAndRightDW";
    frmPendingRequest.flxPurchaseRequest.imgPurchase.src = "purchasereq.png";
    frmPendingRequest.flxPurchaseRequest.lblPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.lblRequestPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxWorkRequest.imgWork.src = "workrequest.png";
    frmPendingRequest.flxWorkRequest.lblWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.lblRequestWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
}
/**
 * @class onClickOfPurchaseReq
 * this class for AllPendingRequest Filter
 * this is called on Click of PO Option Request Type filter
 */

kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfPurchaseReq = function() {
    frmPendingRequest.flxLeaveReq.imgLeave.src = "leaverequest.png";
    frmPendingRequest.flxLeaveReq.lblLeave.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.lblRequest.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxExpenseRequest.imgExpense.src = "expense.png";
    frmPendingRequest.flxExpenseRequest.lblExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.lblRequestExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxTimeRequests.imgTime.src = "timerequests.png";
    frmPendingRequest.flxTimeRequests.lblTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.lblRequestTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxPurchaseRequest.imgPurchase.src = "purchasereq.png";
    frmPendingRequest.flxPurchaseRequest.lblPurchase.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxPurchaseRequest.lblRequestPurchase.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxPurchaseRequest.skin = "sknFlx1db6c9BorderDownAndRightDW";
    frmPendingRequest.flxWorkRequest.imgWork.src = "workrequest.png";
    frmPendingRequest.flxWorkRequest.lblWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.lblRequestWork.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxWorkRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
}
/**
 * @class onClickOfWorkReq
 * this class for AllPendingRequest Filter
 * this is called on Click of WO Option Request Type filter
 */
kony.apps.coe.ess.frmPendingUIDW.prototype.onClickOfWorkReq = function() {
    frmPendingRequest.flxLeaveReq.imgLeave.src = "leaverequest.png";
    frmPendingRequest.flxLeaveReq.lblLeave.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.lblRequest.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxLeaveReq.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxExpenseRequest.imgExpense.src = "expense.png";
    frmPendingRequest.flxExpenseRequest.lblExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.lblRequestExpense.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxExpenseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxTimeRequests.imgTime.src = "timerequests.png";
    frmPendingRequest.flxTimeRequests.lblTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.lblRequestTime.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxTimeRequests.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxPurchaseRequest.imgPurchase.src = "purchasereq.png";
    frmPendingRequest.flxPurchaseRequest.lblPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.lblRequestPurchase.skin = "sknLbl483d8bDW";
    frmPendingRequest.flxPurchaseRequest.skin = "sknFlxe6e6e6BorderDownandRightDW";
    frmPendingRequest.flxWorkRequest.imgWork.src = "workrequest.png";
    frmPendingRequest.flxWorkRequest.lblWork.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxWorkRequest.lblRequestWork.skin = "sknLblffffffFS115DW";
    frmPendingRequest.flxWorkRequest.skin = "sknFlx1db6c9BorderDownAndRightDW";
}


/**
 * @class filterPendingRequest
 * this class for AllPendingRequest Filter
 * this is called on When we sort the Pending list as Per selecetd Request Type
 */
kony.apps.coe.ess.frmPendingUIDW.prototype.filterPendingRequest = function(filterParam) {
  
        var fulldata = kony.apps.coe.ess.Approvals.spa.totalRequests.ISLaterRequestsData.concat(kony.apps.coe.ess.Approvals.spa.totalRequests.ApprovalRequestData)
        var Filterdata=[];
        for (var  y = 0;y < fulldata.length; y++) {   
        if((Number(fulldata[y].isLater) === 0 && Number(fulldata[y].StatusId) === 2) || (Number(fulldata[y].isLater) === 1 && Number(fulldata[y].StatusId) === 2)) 
        Filterdata.push(fulldata[y]);
       }
  
     var  data = Filterdata;
     kony.print("---- Request Type Filter data:" + JSON.stringify(data));
  
   
//    var data = kony.apps.coe.ess.Approvals.spa.totalRequests.ISLaterRequestsData;
    
    var filteredData = [];
    if (filterParam === null || filterParam === undefined) {
        filteredData = data;
    } else {
        for (var i in data) {
            if (data[i].request_type === filterParam) {
                filteredData.push(data[i]);
            }
        }
    }
    frmPendingRequest.segAllEmp.setData(filteredData);
};

/**
 * @class Reject
 * this class for frmPendingRequests Reject Part
 * this is called on Click of Reject button in Pending Request
 */

kony.apps.coe.ess.frmPendingUIDW.prototype.PendingReject = function(){
  var data = frmPendingRequest.segAllEmp.selectedItems[0];
  var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {"access":"online"});
  var dataObject = new kony.sdk.dto.DataObject("approval_request");
  dataObject.addField("status_id","1");
  dataObject.addField("id", data.ID);
  dataObject.addField("employee_id",data.CreatedByEmployeeid);//13000426
  var options = {"dataObject":dataObject};

   objSvc.partialUpdate(options, function(res) {
                        //Processing of fetched requests is done for SPA records
                        alert("Rejected");
                         frmPendingRequest.segAllEmp.removeAt(frmPendingRequest.segAllEmp.selectedIndex[1]);
                    }, function(err) {
                        kony.print("---------- Update error: " + JSON.stringify(err));
                    });
  
};

/**
 * @class Reject
 * this class for frmPendingRequests Approve Part
 * this is called on Click of Approve button in Pending Request
 */

kony.apps.coe.ess.frmPendingUIDW.prototype.ApprovePendingRequest = function(){
  var data = frmPendingRequest.segAllEmp.selectedItems[0];
  var objSvc = kony.sdk.getCurrentInstance().getObjectService("MYAPPROVALS", {"access":"online"});
  var dataObject = new kony.sdk.dto.DataObject("approval_request");
  dataObject.addField("status_id","0");
  dataObject.addField("id", data.ID);
  dataObject.addField("employee_id",data.CreatedByEmployeeid);//13000426
  var options = {"dataObject":dataObject};

   objSvc.partialUpdate(options, function(res) {
                        //Processing of fetched requests is done for SPA records
                        frmPendingRequest.flxBlank.setVisibility(false);
                        alert("Approved");
                        frmPendingRequest.segAllEmp.removeAt(frmPendingRequest.segAllEmp.selectedIndex[1]);
                    }, function(err) {
                        kony.print("---------- Update error: " + JSON.stringify(err));
                    });
  
};
/**
 * @class EmployeeTable
 * this class for frmPendingRequests People Sort
 * this is called on Click of People button in Pending Request
 */

kony.apps.coe.ess.frmPendingUIDW.EmployeeTable = function(callback){
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
            callback(response.records);
            
        }

           function error(err) {
            //Error fetching data
         kony.print("---- Error Data: " + JSON.stringify(err));
        }
};
  kony.apps.coe.ess.frmPendingUIDW.employeeRequestsPending=function (){
     var data1=kony.apps.coe.ess.frmAllPendingRequestsdata.requestsPending.data;
    var empSegRowdata1 = frmPendingRequest.segEmp.selectedItems[0];
    var selectedEmpID1 = empSegRowdata1.employeeID;
    var filteredData1=[];

    var datamap1 = {
      "lblEmpName": "UserName",
      "lblTypeReq": "category",
      "lblDetail": "RequestInfo",
      "lblSumittedDate": "RequestDate",
      "imgEmp": "employeeImg",
      //    "lblExpiry" : "remaingHours",
      "lblDueDate": "dueDate",
      "lblDetailType": "AdditionalData",
      "lblDateDue": "DateDue",
      "lblSep": "Separator",
      "lblComment" : "Comments",
    };

    for(var i1=0;i1<data1.length;i1++)
    {
      if(selectedEmpID1===data1[i1].CreatedByEmployeeid){
        filteredData1.push(data1[i1]);
      }
    }
    frmPendingRequest.segAllEmp.widgetDataMap =datamap1;
    frmPendingRequest.segAllEmp.data=filteredData1;
};





kony.apps.coe.ess.frmPendingUIDW.DynamicSegmentForEmployeeSearchCreation = function() {
 
  kony.print("---- start of search segment creation---");  
  var WidgetsArray=["imgSelection","imgEmployee","imgRequestType","lblEmployeeName","lblShortName"];
  var SelectionBehaviourConfig={"imageIdentifier":"imgSelection","selectedStateImage":"select_green.png","unselectedStateImage":"select.png"};
  kony.apps.coe.ess.globalVariables.FrmPendingRequestPeopleSearch=new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR,SelectionBehaviourConfig,3,flexEmployeeSelection,function(){},WidgetsArray);
  frmPendingRequest.flxScrlimages.add(kony.apps.coe.ess.globalVariables.FrmPendingRequestPeopleSearch.getDynamicSegment());
  kony.apps.coe.ess.globalVariables.FrmPendingRequestPeopleSearch.WidgetDataMap={"imgSelection":"imgSelection","imgEmployee":"imgEmployee","imgRequestType":"imgRequestType","lblEmployeeName":"UserName","lblShortName":"CreatedUserShortName"};//,imgEmployee":"employeeImg"};
  kony.print("---- end of search segment creation---");  
var data1=kony.apps.coe.ess.frmAllPendingRequestsdata.requestsPending.data;
     kony.print("---- Data of RequestTypesTable data table:" + JSON.stringify(data1)); 
           
    // var data = kony.apps.coe.ess.frmPendingUIDW.RequestTypesTable(function(res) {
    kony.print("---- Data of RequestTypesTable table:" + JSON.stringify(data1.records)); 
    var RequestTypesTable=[];
   for(var i in data1){
      var sampleJson={};
     //   sampleJson.imgSelection={src:"select.png"};
       //    sampleJson.imgEmployee={src:"select.png"};
       //sampleJson.imgRequestType={src:"select.png"};
      sampleJson.UserName ={text: data1[i].UserName};
      sampleJson.CreatedUserShortName ={text: data1[i].CreatedUserShortName}; 
      kony.print("---- Data of RequestTypesTable  json table:" + JSON.stringify(sampleJson)); 
   
     RequestTypesTable.push(sampleJson);
    }
    
   //     	var Response =[{imgSelection: {"src":"select.png"},imgEmployee: {"src":"select.png"},imgRequestType: {"src":"select.png"},UserName:{"text":"Text1"},CreatedUserShortName: {"text":"DD"}}];
   
      //  var Response = [{TYPE:{"text":"Text1"},imgRequestType: {"src":"select.png"}},{TYPE:{"text":"Text1"},imgRequestType: {"src":"select.png"}},{TYPE:{"text":"Text1"},imgRequestType: {"src":"select.png"}},{TYPE:{"text":"Text1"},imgRequestType: {"src":"select.png"}}];
    kony.apps.coe.ess.globalVariables.FrmPendingRequestPeopleSearch.setData(RequestTypesTable);
    /* var segmentConfiguration = {
                    "MediaKeyAttribute": "Media_Id",
                    "ImageWidgetName": "imgEmployee",
                    "hideWidgetNames": []
                };
                kony.apps.coe.ess.MyApprovals.media.lazyLoading(kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_DYNAMICSEGMENT, DynamicWidget, "Employee", "mediaEmployee", "", segmentConfiguration);

            
          //  .bind(this, DynamicWidget),
            function(err) {
                handleError(err);
            }*/
  }

kony.apps.coe.ess.frmPendingUIDW.prototype.onclickEmployeesearch = function(){
  
  var fulldata = kony.apps.coe.ess.Approvals.spa.totalRequests.ISLaterRequestsData.concat(kony.apps.coe.ess.Approvals.spa.totalRequests.ApprovalRequestData)
        var Filterdata=[];
        for (var  y = 0;y < fulldata.length; y++) {   
        if((Number(fulldata[y].isLater) === 0 && Number(fulldata[y].StatusId) === 2) || (Number(fulldata[y].isLater) === 1 && Number(fulldata[y].StatusId) === 2)) 
        Filterdata.push(fulldata[y]);
       }
  
     var  data = Filterdata;
     kony.print("---- Request Type Filter data:" + JSON.stringify(data));
     kony.print("----User Name:" + JSON.stringify(data[0]));
     var Name = data[0].UserName;
     frmPendingRequest.lblemp1name.text = Name;
      frmPendingRequest.imgDeselect.src= "deselecttick.png";
     frmPendingRequest.flxEmployeeSearch.setVisibility(true);
     frmPendingRequest.forceLayout();
 }

kony.apps.coe.ess.frmPendingUIDW.prototype.onclickEmployeename = function(){
  
     frmPendingRequest.imgDeselect.src= "select_green.png";
     
 }
