kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};
kony.apps.ess.myLeave.editLeave = kony.apps.ess.myLeave.editLeave || {};

kony.apps.ess.myLeave.editLeave.updateUI = {
  
   leaveData : null, 
   attachment_id : 0,
   attachment_data : [],
  
     setData : function(data){
       kony.print("((((((((((((((((((((((ENTERED editLeave:setData))))))))))))))))))))))"+data);
       this.leaveData = data;
       var date = (new Date(data[0].EndDate.substring(0, 4), data[0].EndDate.substring(4, 6) - 1, data[0].EndDate.substring(6, 8)).toString()).substring(0,15);
       var stdate = (new Date(data[0].StartDate.substring(0, 4), data[0].StartDate.substring(4, 6) - 1, data[0].StartDate.substring(6, 8)).toString()).substring(0,15);
       kony.apps.ess.myLeave.tabApplyLeaveUI.endDate = date;
       kony.apps.ess.myLeave.tabApplyLeaveUI.startDate = stdate;
       kony.apps.ess.myLeave.calendarUI.startDate = stdate;
       kony.apps.ess.myLeave.calendarUI.endDate=date;
       date = new Date(kony.apps.ess.myLeave.tabApplyLeaveUI.endDate);
       stdate = new Date(kony.apps.ess.myLeave.tabApplyLeaveUI.startDate);
       frmTabApplyLeave.lblFrmCal.text = stdate.toString().substring(8,10) + " " + kony.apps.ess.myLeave.calendarUI.Initialization.monthArray[stdate.getMonth()].slice(0, 3) + " " + stdate.getFullYear().toFixed();
       frmTabApplyLeave.lblToCal.text = date.toString().substring(8,10) + " " + kony.apps.ess.myLeave.calendarUI.Initialization.monthArray[date.getMonth()].slice(0, 3) + " " + date.getFullYear().toFixed();
       this.setLeaveType();
       //this.setCalendarData();
       this.setFullDayHalfDay();
       this.setComments();
       this.setAttachments();
     },
     
     setLeaveType : function(){
          var id = this.leaveData[0].LeaveTypeId;
          kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.onClickOfLeaveType(frmTabApplyLeave["btnLeaveType"+id]);
     },
     
     setCalendarData : function(){
				//kony.apps.ess.myLeave.tabApplyLeaveUI.Initialization.changeCurrentDateSkin();
				(new kony.apps.ess.myLeave.calendarUI()).mappingDataToCalendar();
     },
  
     setFullDayHalfDay : function(){
        var startDate = kony.apps.ess.myLeave.tabApplyLeaveUI.startDate;
        var endDate = kony.apps.ess.myLeave.tabApplyLeaveUI.endDate;
        if(new Date(startDate).compareOnlyDate(new Date(endDate))!==0){
            kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.onClickOfFullDay();
        }else
        {  
           if(this.leaveData[0].Hours >= 7){
              kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.onClickOfFullDay();
            }else if(parseFloat(this.leaveData[0].StartTime) === "000000" && parseFloat(this.leaveData[0].EndTime) === "000000"){
              kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.onClickOfFullDay();
            }
           else
            {
               kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.onClickOfHours();
               var start_time =kony.apps.coe.Reusable.createTimeline.getTimeFormatWithAMPM(parseInt((this.leaveData[0].StartTime).substring(0,2)*1));
               var end_time = kony.apps.coe.Reusable.createTimeline.getTimeFormatWithAMPM(parseInt((this.leaveData[0].EndTime).substring(0,2)*1));
               kony.apps.coe.Reusable.createTabTimeline.fillHours(start_time,end_time);            
            }
        }
     },
  
     setComments : function(){
       frmTabApplyLeave.txtAreaComments.text = this.leaveData[0].Comment;
     },
  
     setAttachments : function(){
         var sqlQuery = "select distinct m.name as media_id from MyLeaveMedia m join leave_attachments la on m.name = la.media_id where la.leavel_id = '"+kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId+"'";
		 kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function (data) {
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.apps.ess.myLeave.editLeave.updateUI.attachment_id =0;
            kony.apps.ess.myLeave.editLeave.updateUI.attachment_data=data;
            kony.apps.ess.myLeave.editLeave.updateUI.multipleAttachments();
		}, function (err) {
			kony.print("-----Error in getting leave balance----" + err);
           handleError(err);
		}, false);
     },
   
     multipleAttachments : function(){
        var data = kony.apps.ess.myLeave.editLeave.updateUI.attachment_data;
        if(data.length>0 && kony.apps.ess.myLeave.editLeave.updateUI.attachment_id < data.length){
                 var i = kony.apps.ess.myLeave.editLeave.updateUI.attachment_id;
			    (new kony.apps.coe.ess.myLeave.media()).fetchAttachment({"mediaName":data[i].media_id},kony.apps.ess.myLeave.editLeave.updateUI.getAttachmentSuccess,kony.apps.ess.myLeave.editLeave.updateUI.getAttachmentError);
               }else{
                 kony.apps.ess.myLeave.tabApplyLeaveUI.AddAttachment.lastIndex = 0;
                 kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData = [];
		          kony.application.dismissLoadingScreen();
               }


     },
     getAttachmentSuccess : function(response){
        if(response !== null){
           kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.onClickOfTakePicture(response);
           kony.apps.ess.myLeave.editLeave.updateUI.attachment_id = kony.apps.ess.myLeave.editLeave.updateUI.attachment_id +1;
           kony.apps.ess.myLeave.editLeave.updateUI.multipleAttachments();
        }else{
           kony.apps.ess.myLeave.editLeave.updateUI.attachment_id = kony.apps.ess.myLeave.editLeave.updateUI.attachment_id +1;
           kony.apps.ess.myLeave.editLeave.updateUI.multipleAttachments();
        }
     },
    getAttachmentError : function(err){
	  kony.application.dismissLoadingScreen();
      kony.print("---error--"+JSON.stringify(err));
      handleError(err);
    }
     
};
function getTimeHourswithZero(data){
   if(parseInt(data) < 10){
     return "0"+data;
   }else{
     return data;
   }
}