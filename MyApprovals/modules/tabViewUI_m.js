 kony = kony || {};
 kony.apps = kony.apps || {};
 kony.apps.coe = kony.apps.coe || {};
 kony.apps.coe.ess = kony.apps.coe.ess || {};
 kony.apps.coe.ess.myApprovals = kony.apps.coe.ess.myApprovals || {};
 // Region - Class / object constructor. 
 /**
  * @class expenseDetailsTab_m
  * this class for frmTabEditExpense
  * this class for UI operations in the frmTabEditExpense
  */
 //for first row as default


 var seletedRowData;
 var selectedApprovalID;
 kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex = null;
 //Segment ONROWCLICK
 function SetDataToUI() {
     var frmobj = kony.application.getCurrentForm();
     seletedRowData = frmobj.segMentListView.selectedItems[0];
     kony.apps.coe.ess.Approvals.getApprovalsRequestList.StatusId = seletedRowData.StatusId;
     frmobj.lblProfileName.text = seletedRowData.UserName.text;
     (new kony.apps.coe.ess.myExpense.tabListViewUI()).flxOverViewOnClick();
     setDataToOverview(frmobj);

 }

 function setDataToOverview(frmobj) {
     if (seletedRowData.TypeID === "EXPENSES") {
         //#ifndef windows8
         frmobj.imgProfileBg.src = "expense_oval.png";
         frmobj.imgApprType.src = "expensesmall.png";
         frmobj.lblTitle.skin = "sknLbl1DB6C9Roman34px";
         frmobj.lblRequestedOn.skin = "sknLbl1DB6C9Roman28px";
         frmobj.lblDueOn.skin = "sknLbl1DB6C9Roman28px";
         frmobj.lblPurchaseAmt.skin = "sknLbl1cb7c9Heavy32px";
         //#endif

         //#ifdef windows8
         frmobj.flxRightTop.skin = "sknWinFlxRight1DB6C9";
         frmobj.imgApprType.src = "expensesmall.png";
         frmobj.lblTitle.skin = "sknWinLblTitle1db6c9";
         frmobj.lblRequestedOn.skin = "sknWinLblTitle1db6c9";
         frmobj.lblDueOn.skin = "sknWinLblTitle1db6c9";
         frmobj.lblPurchaseAmt.skin = "sknWinLblTitle1db6c9";
         //#endif    
     }
     if (seletedRowData.TypeID === "LEAVEREQ") {
         //#ifndef windows8
         frmobj.imgProfileBg.src = "leave_oval.png";
         frmobj.imgApprType.src = "leavesmall.png";
         frmobj.lblTitle.skin = "sknLEvLbl";
         frmobj.lblRequestedOn.skin = "sknLeavReq";
         frmobj.lblDueOn.skin = "sknLeavReq";
         frmobj.lblPurchaseAmt.skin = "sknLblLeave";
         //#endif

         //#ifdef windows8
         frmobj.flxRightTop.skin = "sknWinLeaveflx";
         frmobj.imgApprType.src = "leavesmall.png";
         frmobj.lblTitle.skin = "sknWinLeaveLbl";
         frmobj.lblRequestedOn.skin = "sknWinLeaveLbl";
         frmobj.lblDueOn.skin = "sknWinLeaveLbl";
         frmobj.lblPurchaseAmt.skin = "sknWinLeaveLbl";
         //#endif

     }
     if (seletedRowData.TypeID === "TIMESHEET") {
         //#ifndef windows8
         frmobj.imgProfileBg.src = "time_oval.png";
         frmobj.imgApprType.src = "timesmall.png";
         frmobj.lblTitle.skin = "sknTimeLbl110";
         frmobj.lblRequestedOn.skin = "sknTimelbl";
         frmobj.lblDueOn.skin = "sknTimelbl";
         frmobj.lblPurchaseAmt.skin = "sknTimeLbl100";
         //#endif

         //#ifdef windows8
         frmobj.flxRightTop.skin = "sknWinTimeflx";
         frmobj.imgApprType.src = "timesmall.png";
         frmobj.lblTitle.skin = "sknWinTimeLbl";
         frmobj.lblRequestedOn.skin = "sknWinTimeLbl";
         frmobj.lblDueOn.skin = "sknWinTimeLbl";
         frmobj.lblPurchaseAmt.skin = "sknWinTimeLbl";
         //#endif
     }
     if (seletedRowData.TypeID === "WORKORDER") {
         //#ifndef windows8
         frmobj.imgProfileBg.src = "wo_oval.png";
         frmobj.imgApprType.src = "workorder.png";
         frmobj.lblTitle.skin = "sknWoLbl";
         frmobj.lblRequestedOn.skin = "sknWoLbl100";
         frmobj.lblDueOn.skin = "sknWoLbl100";
         frmobj.lblPurchaseAmt.skin = "sknWoLblPurchase";
         //#endif

         //#ifdef windows8
         frmobj.flxRightTop.skin = "sknWinFlxRigthtop";
         frmobj.imgApprType.src = "workorder.png";
         frmobj.lblTitle.skin = "sknWinWoLbl";
         frmobj.lblRequestedOn.skin = "sknWinWoLbl";
         frmobj.lblDueOn.skin = "sknWinWoLbl";
         frmobj.lblPurchaseAmt.skin = "sknWinWoLbl";
         //#endif
       }
      selectedApprovalID = seletedRowData.ID;
     //#ifndef windows8  
     if (seletedRowData.MediaID !== "NULL" && seletedRowData.MediaID !== null && seletedRowData.MediaID !== undefined && seletedRowData.MediaID !== " ") {
        frmobj.imgProfilePic.isVisible = true;
       	frmobj.lblAbbreviation.isVisible = false;
       	kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, frmobj.imgProfilePic, "Employee", "mediaEmployee", seletedRowData.MediaID, {});
     }else{
       	frmobj.imgProfilePic.isVisible = false;
       	frmobj.lblAbbreviation.isVisible = true;
        frmobj.lblAbbreviation.text = seletedRowData.CreatedUserShortName;
       	frmobj.forceLayout();
     }
     //#endif    
     (new kony.apps.coe.ess.Approvals.getApprovalsRequestList()).getApprovalsRequestPreshow(frmobj);
     
     frmobj.lblStatusTraffic.text = seletedRowData.StatusName;
 }
 function SetDataToUIDefault(frmobj) {
   if(frmobj.segMentListView.data !== null) {
     if(kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex !== null){
       for(var i=0;i<frmobj.segMentListView.data.length;i++){
         if(frmobj.segMentListView.data[i].ID === kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex){
           seletedRowData = frmobj.segMentListView.data[i];
           frmobj.segMentListView.selectedRowIndex = [0, i];
         }
       }
     }else{
       seletedRowData = frmobj.segMentListView.data[0];
       frmobj.segMentListView.selectedRowIndex = [0, 0];
     }
     frmobj.lblProfileName.text = seletedRowData.UserName.text;
     setDataToOverview(frmobj);
     kony.apps.coe.ess.Approvals.getApprovalsRequestList.StatusId = seletedRowData.StatusId;
   	 SetDataToUI();
   }
 }

