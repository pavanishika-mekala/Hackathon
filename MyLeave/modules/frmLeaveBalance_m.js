/*** @Author Sumeet.bartha@kony.com
 * @category Business Logic / Action  / UI data Binding
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
//%Region - Constructor
/**
 * @param none.
 */
kony.apps.coe.ess.myLeave.leaveBalanceUI = function() {};
// %Region - Methods in leaveWalletUI
/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to leavewallet Flex
 */
kony.apps.coe.ess.myLeave.leaveBalanceUI.prototype.bindDataToForm = function(object) {
    var chartObj = (object.widgets())[3].id;
    var objectId = object.id.split("flxComplete");
    var rowIndex = parseInt(objectId[1]);
    JSON.stringify("chartObj" + chartObj);
    JSON.stringify("chartObj" + objectId);
    JSON.stringify("chartObj" + rowIndex);
    var sqlquery = "select *  from employee_leave_type limit " + rowIndex + ", 1";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
        var objectData = new Array(1);
        var skn = "";
       /* remove 
          var colors = [
            [
                ["0xE8F8F8ff", "0xE8F8F8ff"],
                ["0x3BD1D7ff", "0x51F1B7ff"]
            ],
            [
                ["0xFFEDEDff", "0xFFEDEDff"],
                ["0xF74A4Aff", "0xF78686ff"]
            ],
            [
                ["0xEAF9FDff", "0xEAF9FDff"],
                ["0x41B1EEff", "0x51D2F1ff"]
            ],
            [
                ["0xFFEBF3ff", "0xFFEBF3ff"],
                ["0xF82B7Bff", "0xF56DD5ff"]
            ]
        ];*/
        var colors = [
            kony.apps.coe.ess.globalVariables.leaveWalletcolors,
            kony.apps.coe.ess.globalVariables.leaveWalletcolors,
            kony.apps.coe.ess.globalVariables.leaveWalletcolors,
            kony.apps.coe.ess.globalVariables.leaveWalletcolors
        ];
        if (Number(objectId[1]) % 2 === 0) {

            skn = "LBLMOB3BD1D7";
        } else {
            skn = "LBLMOBF74A4A";
        }

        /*for(var i = 0 ;i< chartdata_Obj.length ; i++){
        if(chartdata_Obj[i].LEAVETYPETITLE==chartObj){
        objectData[0] = chartdata_Obj[i];
        }

        }*/
        var chartData = {};
        chartData.LEAVETAKEN = data[0].availed;
        chartData.TOTALLEAVE = data[0].balance;
        chartData.LEAVEBALANCE = Number(parseInt(data[0].balance) - parseInt(data[0].availed)).toFixed();
        chartData.LEAVETYPETITLE = data[0].leave_type_name;
        objectData[0] = chartData;
        var widgetObj = {
            "lblTop": "lblTop",
            "flxChartContainer": "flxChart",

        };
        var frmLeaveBalObj = new kony.apps.coe.ess.myLeave.leaveWalletUI(frmLeaveBalance, widgetObj, objectData[0]);
        frmLeaveBalObj.createSingleChart(objectData[0], colors[Number(objectId[1]) % 4], skn);
        frmLeaveBalance.lblTitle.text = (object.widgets())[3].id + " Balance";
        //remove frmLeaveBalance.lblTotalLeave.text = Number(objectData[0].TOTALLEAVE).toFixed();
        //remove frmLeaveBalance.lblAvailedLeave.text = Number(objectData[0].LEAVETAKEN).toFixed();
        frmLeaveBalance.lblTotalText.text=Number(objectData[0].TOTALLEAVE).toFixed();;
        frmLeaveBalance.lblCountConsumed.text=Number(objectData[0].LEAVETAKEN).toFixed();
        frmLeaveBalance.lblCountAvailable.text=Number(objectData[0].LEAVEBALANCE).toFixed();
        var totalColor=(colors[Number(objectId[1]) % 4][1][0]).substring(2,8);
        var availedColor=(colors[Number(objectId[1]) % 4][0][1]).substring(2,8);
        kony.print("-----" +availedColor+"-----"+totalColor);
        switch(totalColor)
          {
              case"3BD1D7": frmLeaveBalance.lblIndicator.skin="LBL3BD1D7";
                            break;
              case"F74A4A": frmLeaveBalance.lblIndicator.skin="LBLF74A4A";
                            break;
              case"41B1EE": frmLeaveBalance.lblIndicator.skin="LBL41B1EE";
                            break;
              case"F82B7B": frmLeaveBalance.lblIndicator.skin="LBLF82B7B";
                            break;
              default:frmLeaveBalance.lblIndicator.skin="sknLblBgf74a4a";
                            break;
          }
         switch(availedColor)
          {
              case"E8F8F8": frmLeaveBalance.lblIndicatorAvailed.skin="LBLE8F8F8";
                            break;
              case"FFEDED": frmLeaveBalance.lblIndicatorAvailed.skin="LBLFFEDED";
                            break;
              case"EAF9FD": frmLeaveBalance.lblIndicatorAvailed.skin="LBLEAF9FD";
                            break;
              case"FFEBF3": frmLeaveBalance.lblIndicatorAvailed.skin="LBLFFEBF3";
                            break;
              default:frmLeaveBalance.lblIndicatorAvailed.skin="sknLblBgFFEDED";
                            break;
          }
        frmLeaveBalance.lblTotalHolidays.text = "View " + frmLeaveBalance.lblTitle.text.replace(" Balance", "").trim() + " History";
        frmLeaveBalance.show();

    }, function(err) {
        kony.print("-----error in executing query---" + err);
    }, false);

};


/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called to view history 
 */

kony.apps.coe.ess.myLeave.leaveBalanceUI.prototype.leaveDetails = function() {
    var lable = frmLeaveBalance.lblTitle.text;
    var leaveType = lable.replace(" Balance", "").trim();
    try {
        var yyyy = parseInt(new Date().getFullYear() * 1);
        var sqlQuery = "select l.id, l.no_of_hours as hrs, l.start_date as startDate,l.end_date as endDate,l.lastmodifiedts as modified,s.Status_Name as status,s.Id as sid,lt.name as leaveType from leave l,Status s,leave_type lt where l.leave_type_id = lt.id and l.status_id = s.Id and l.start_date between " + yyyy + "0101 and " + yyyy + "1231 and lt.name in ('" + leaveType + "') and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " order by l.start_date desc";
        new kony.apps.coe.myLeave.search().execQuery(sqlQuery);
        frmSearchLog.show();
    } catch (err) {
        handleError(err);
    }
};
