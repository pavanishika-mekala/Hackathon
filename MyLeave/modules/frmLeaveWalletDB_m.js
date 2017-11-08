/*** @Author nandhini.subramaniam @kony.com
 * @category Business Logic / Action  / UI data Binding
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
//%Region - Constructor
kony.apps.coe.ess.myLeave.leaveWallet = function() {

};


// %Region - Methods in leaveWallet
/**
 * @member of  leaveWallet
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - fetches leaveWallet data  
 */
kony.apps.coe.ess.myLeave.leaveWallet.prototype.showWalletForm= function(){
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveWallet");
        formController.loadDataAndShowForm();
};

kony.apps.coe.ess.myLeave.leaveWallet.prototype.processData = function(data){
   var chartData = [];
    for(var i=0; i < data.length ; i++){
        var dataJson ={};
        dataJson.LEAVETAKEN = data[i].availed;
        dataJson.LEAVEBALANCE = data[i].balance;//parseInt(data.leave_type[i].balance) - parseInt(data.leave_type[i].availed);
      	if(data[i].planned === ""){
        	data[i].planned = "0";
      	}
      	dataJson.LEAVEPLANNED = data[i].planned;
        dataJson.TOTALLEAVE =  parseInt(data[i].availed) + parseInt(data[i].balance) + parseInt(data[i].planned);//data.leave_type[i].balance;
        dataJson.LEAVETYPETITLE = data[i].TEXT_DISPLAY//data.leave_type[i].leave_type_name;
        chartData.push(dataJson);
    }
    (new kony.apps.coe.ess.myLeave.leaveWallet()).bindData(chartData);
};

// %Region - Methods in leaveWallet
/**
 * @member of  leaveWallet
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - bind the data to leavewallet flex in frmCalendar.
 */
kony.apps.coe.ess.myLeave.leaveWallet.prototype.bindData = function(data) {
    try {
        kony.print("--------------------in kony.apps.coe.ess.LeaveWallet.bindData LeaveWallet_m.js");
      var widgetObj = {
    				"lblTop":"lblTop",
    				"flxChartContainer":"flxleavelist",
    			
 			      };
      var tempobj = new kony.apps.coe.ess.myLeave.leaveWalletUI(frmLeaveWallet, widgetObj, data);
      tempobj.bindData(); 
      kony.print("--------------------out of kony.apps.coe.ess.LeaveWallet.bindData LeaveWallet_m.js");
    } catch (e) {
        handleError(e);
    }
};