/**
 *  @author     Shweta Dasari
 *  @category   UI.
 *  @desc
 *  @ © 2017    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};

kony.apps.ess.myLeave.tabLeaveWalletUI = function(){
  
};

kony.apps.ess.myLeave.tabLeaveWalletUI.prototype.getLeaveWalletData = function() {
  var query= "select  * from employee_leave_type";
  kony.sync.single_select_execute(kony.sync.getDBName(), query, null, this.getLeaveWalletDataSuccesscallback.bind(this), function(err)
        {
     alert(err);
           // handleError(err);
        }, false);
};

kony.apps.ess.myLeave.tabLeaveWalletUI.prototype.getLeaveWalletDataSuccesscallback = function(data){

  kony.print("%%%%%%%%%%%%%%%%%%%%SHWETA LEAVE WALLET DATA ="+data);
  //var dataArray = [];
  //dataArray.push(data);
  //alert("%%%%%%%%%%%%%%%%%%%%SHWETA LEAVE WALLET DATA ="+JSON.stringify(dataArray));
  if(data!==null && data!==undefined){
    if(data.length>0){
      for(var i=0;i<data.length;i++){
        if(data[i].leave_type_id==="03"){
          var bal = Math.floor(data[i].balance);
          frmTabLeaveWallet.lblCL.text = bal;//Annual Leave
          var availed = Math.floor(data[i].availed);
          var total = bal+availed;
          var percent = (bal*25)/(total);
          frmTabLeaveWallet.lblAvlCL.text = "AVAILABLE OF TOTAL "+(total); 
          frmTabLeaveWallet.flxProgress1.width = percent+"%";
         }
         else if(data[i].leave_type_id==="10"){
           var bal = Math.floor(data[i].balance);
        	frmTabLeaveWallet.lblPL.text = bal;//Personal Leave
            var availed = Math.floor(data[i].availed);
            var total = bal+availed;
            var percent = (bal*25)/(total);
            frmTabLeaveWallet.lblAvlPL.text = "AVAILABLE OF TOTAL "+(total); 
            frmTabLeaveWallet.flxprogress3.width = percent+"%";
         }else if(data[i].leave_type_id==="04"){
           var bal = Math.floor(data[i].balance);
           frmTabLeaveWallet.lblML.text = bal;//Medical  Leave
            var availed = Math.floor(data[i].availed);
            var total = bal+availed;
            var percent = (bal*25)/(total);
            frmTabLeaveWallet.lblAvlML.text = "AVAILABLE OF TOTAL "+(total); 
            frmTabLeaveWallet.flxprogress2.width = percent+"%";
           
         }else if(data[i].leave_type_id==="01"){//Comp Time for Overtime
           var bal = Math.floor(data[i].balance);
           frmTabLeaveWallet.lblTravelLeaveTitle.text = data[i].leave_type_name;
           frmTabLeaveWallet.lblTL.text = bal;
            var availed = Math.floor(data[i].availed);
            var total = bal+availed;
            var percent = (bal*25)/(total);
            frmTabLeaveWallet.lblAvlTL.text = "AVAILABLE OF TOTAL "+(total); 
            //frmTabLeaveWallet.flxProgress2.width = percent+"%";
           
         }else if(data[i].leave_type_id==="02"){//Floating Holiday
           var bal = Math.floor(data[i].balance);
           frmTabLeaveWallet.lblMaternityLeaveTitle.text = data[i].leave_type_name;
           frmTabLeaveWallet.lblMatL.text = bal;//Other Leave
           var availed = Math.floor(data[i].availed);
            var total = bal+availed;
            var percent = (bal*25)/(total);
          frmTabLeaveWallet.lblAvlMTL.text = "AVAILABLE OF TOTAL "+(total) ; 
        }else if(data[i].leave_type_id==="12"){
          var bal = Math.floor(data[i].balance);
           frmTabLeaveWallet.lblVacationLeaveTitle.text = data[i].leave_type_name;
           frmTabLeaveWallet.lblVL.text = bal;//Other Leave
           var availed = Math.floor(data[i].availed);
            var total = bal+availed;
            var percent = (bal*25)/(total);
          frmTabLeaveWallet.lblAvlVL.text = "AVAILABLE OF TOTAL "+(total) ; 
          frmTabLeaveWallet.flxProgress4.width = ((data[i].balance)*25)/(data[i].balance + data[i].availed)+"%";
        }else{
          kony.print("no data");
        }
      }
      
    }else{
      kony.print("Data length is 0");
    }
  }else{
    kony.print("data undefined!");
  }
};