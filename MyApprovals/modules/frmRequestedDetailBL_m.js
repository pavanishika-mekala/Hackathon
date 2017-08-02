/*** @Author Sumeet.bartha@kony.com
 * @category data Binding / Business Logic
 * @desc  RequestedList class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

/*
 *@class	:	RequestedDetailBackend
 */
kony.apps.coe.ess.Approvals.RequestedDetailBackend = function () {};

kony.apps.coe.ess.Approvals.RequestedDetailBackend.Request_type = "";
// Variable to create note for each request
kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_id = "";
kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_type_id = "";

/**
 *@function
 * @class	 :  RequestedDetailBackend
 * @param    :  {JSON} data
 * @returns	 :	None
 * @desc	 :	process the data accoding to req .
 */

kony.apps.coe.ess.Approvals.RequestedDetailBackend.prototype.processData = function (data) {
	try {
		var skin1 = "";
		var skin2 = "sknflx1db6c9RoundCorner";
        var peopleskin = "flxRoundCornerImgDefault";
		var Request_type = kony.apps.coe.ess.Approvals.RequestedDetailBackend.Request_type;
		if (Request_type == "LEAVE") {
			skin1 = "sknflx7986cbRoundCorner";
          	peopleskin = "flxRoundCornerImgLeave";
		} else if (Request_type == "TIMESHEET") {
			skin1 = "sknflx039be5RoundCorner";
          	peopleskin = "flxRoundCornerImgTimesheet";
		} else if (Request_type == "EXPENSES") {
			skin1 = "sknflx1db6c9RoundCorner";
          	peopleskin = "flxRoundCornerImg";
		}
		var newData = [];
		for (var i = 0; i < data.length; i++) {
			var temp = {};
			temp.imgPeople = {
				src : "people.png"
			};
			temp.lblChat = data[i].comment;
          var createdts = data[i].createdts;
          var dateformat = "";
          var timeformat ="";
          try{
          dateformat = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Applied_Date.Format");
           timeformat = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Full_Time.Format");
          }catch(i18nerror)
            {
              handleError(i18nerror);
              kony.print("---------------------------i18nFetchError");
            }
          	if((createdts!=""&&createdts!=null)||createdts.length>8)
              {
            var appliedDate = new Date(createdts.substring(0,4),Number(createdts.substring(4,6))-1,createdts.substring(6,8),createdts.substring(8,10),createdts.substring(10,12),createdts.substring(12,14),'00');
                var tempDate = "Applied On "+appliedDate.getDateInFormat(dateformat);
                temp.lblAppliedOn = tempDate+" "+appliedDate.getDateInFormat(timeformat);
              }
          	else
              {
              var appliedDate = new Date(createdts.substring(0,4),Number(createdts.substring(4,6))-1,createdts.substring(6,8),createdts.substring(8,10));
               temp.lblAppliedOn = "Applied On "+appliedDate.getDateInFormat(dateformat);
              }
			//temp.lblAppliedOn = data[i].createdts;
        
			temp.lblName = data[i].employee_id;
          
			if (data[i].emp_Id == kony.apps.coe.ess.globalVariables.EmployeeID) {
               if (Request_type == "LEAVE") {
          	  temp.lblName = {skin:"sknlbl7986CBffpx28",text:data[i].employee_id};
			} else if (Request_type == "TIMESHEET") {
              temp.lblName = {skin:"sknlblba68c8ffpx28",text:data[i].employee_id};
			} else if (Request_type == "EXPENSES") {
              temp.lblName = {skin:"sknlblMob1DB6C9ffpx28",text:data[i].employee_id};
			}
				temp.template = flx1;
             	temp.flxpeople = { skin : "flxRoundCornerImgDefault" };
				temp.flxfreespace = {
					skin : "sknflx1db6c9RoundCorner"
				};
			} else {
				temp.template = flx2;
              	temp.flxpeople = { skin : peopleskin };
				temp.flxfreespace = {
					skin : skin1
				};
			}
			temp.lblforSpace = "Dummytxt";
			newData.push(temp);
		}
      	frmExpenseReportDetail.txtareaComments.text = "";
		this.bindData(newData);
		//return newData;
	} catch (e) {
		handleError(e);
	}
};
/**
 *@function
 * @class	 :  RequestedDetailBackend
 * @param    :  {JSON} data
 * @returns	 :	None
 * @desc	 :	bind data accoding to req .
 */

kony.apps.coe.ess.Approvals.RequestedDetailBackend.prototype.bindData = function (newdata) {
	if (typeof newdata != undefined && newdata != null && newdata.length != null && newdata.length > 0) {
		frmExpenseReportDetail.SegChat.isVisible = true;
		frmExpenseReportDetail.SegChat.setData(newdata);
		frmExpenseReportDetail.flxCoveArea.isVisible = false;
	} else {
		frmExpenseReportDetail.flxCoveArea.isVisible = true;
		frmExpenseReportDetail.SegChat.isVisible = false;
	}
};
/**
 *@function
 * @class	 :  RequestedDetailBackend
  * @returns	 :	None
 * @desc	 :	save note and Add to DB .
 */
kony.apps.coe.ess.Approvals.RequestedDetailBackend.prototype.CreateComment = function () {
	var commenttxt = frmExpenseReportDetail.txtareaComments.text;
	if (commenttxt != null && commenttxt != "") {
		var currDate = new Date();
      var dateformat = "";
          try{
          dateformat = kony.i18n.getLocalizedString("i18n.ess.MyApprovals.common.Full_Date.Format");
          }catch(i18nerror)
            {
              handleError(i18nerror);
              kony.print("---------------------------i18nFetchError");
            }
		var rowData = {
			"comment" : commenttxt,
			"createdts" : currDate.getDateInFormat(dateformat),
			"employee_id" : kony.apps.coe.ess.globalVariables.EmployeeID,
			"id" : "NOTE_" + kony.apps.coe.ess.globalVariables.EmployeeID + currDate.getDateInFormat(dateformat),
			"request_id" : kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_id,
			"request_type_id" : kony.apps.coe.ess.Approvals.RequestedDetailBackend.NoteRequest_type_id,
		};
		kony.apps.coe.ess.MVVM.createRecord("MYAPPROVALS", "request_note", rowData, function () { kony.apps.coe.ess.Sync.syncAsynchronously();}, function (e) {
          handleError(e);
		});
	}
};
