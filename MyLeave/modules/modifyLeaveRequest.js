/**
 *  @author     Nandhini.Subramaniam
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

kony.apps.coe.ess.myLeave.modifyLeave = kony.apps.coe.ess.myLeave.modifyLeave || {};


kony.apps.coe.ess.myLeave.modifyLeave.updateUI = {
  
   leaveData : null, 
   attachment_id : 0,
   attachment_data : [],
  
     setData : function(data){
       this.leaveData = data;
       var date = (new Date(data[0].EndDate.substring(0, 4), data[0].EndDate.substring(4, 6) - 1, data[0].EndDate.substring(6, 8)).toString()).substring(0,15);
       kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate = date;
       var date = (new Date(data[0].StartDate.substring(0, 4), data[0].StartDate.substring(4, 6) - 1, data[0].StartDate.substring(6, 8)).toString()).substring(0,15);
       kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate = date;
       date = new Date(kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate);
       frmApplyLeave.lblToDate.text = date.getDate() + " " + kony.apps.coe.ess.myLeave.applyLeave.Initialization.monthArray[date.getMonth()].slice(0, 3) + " " + date.getFullYear().toFixed();
       frmApplyLeave.lblSelect.isVisible = false;
       frmApplyLeave.lblToDate.isVisible = true;
       this.setLeaveType();
       this.setCalendarData();
       this.setFullDayHalfDay();
       this.setComments();
       this.setAttachments();
     },
     
     setLeaveType : function(){
          var id = this.leaveData[0].LeaveTypeId;
          kony.apps.coe.ess.myLeave.applyLeave.LeaveType.onClickOfLeaveType(this.leaveData[0].LeaveTypeId);
     },
     
     setCalendarData : function(){
                frmApplyLeave.flxFromToDate.height = "12%";
				frmApplyLeave.flxFullHalfDay.top = "0%";
				frmApplyLeave.flxCalendar.isVisible = false;
				kony.apps.coe.ess.myLeave.applyLeave.Initialization.changeCurrentDateSkin();
				kony.apps.coe.ess.myLeave.applyLeave.Initialization.mappingDataToCalendar();
				frmApplyLeave.flexMain.forceLayout();
     },
  
     setFullDayHalfDay : function(){
        var startDate = kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate;
        var endDate = kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate;
        if(new Date(startDate).compareOnlyDate(new Date(endDate))!==0){
            kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.onClickOfFullDay();
        }else
        {  
           if(this.leaveData[0].Hours >= 7){
              kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.onClickOfFullDay();
            }else if(parseFloat(this.leaveData[0].StartTime) === "000000" && parseFloat(this.leaveData[0].EndTime) === "000000"){
              kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.onClickOfFullDay();
            }
           else
            {
               kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.onClickOfHours();
               var start_time =kony.apps.coe.Reusable.createTimeline.getTimeFormatWithAMPM(parseInt((this.leaveData[0].StartTime).substring(0,2)*1));
               var end_time = kony.apps.coe.Reusable.createTimeline.getTimeFormatWithAMPM(parseInt((this.leaveData[0].EndTime).substring(0,2)*1));
               kony.apps.coe.Reusable.createTimeline.fillHours(start_time,end_time);            
            }
        }
     },
  
     setComments : function(){
       frmApplyLeave.txtComments.text = this.leaveData[0].Comment;
     },
  
     setAttachments : function(){
         var sqlQuery = "select distinct m.name as media_id from MyLeaveMedia m join leave_attachments la on m.name = la.media_id where la.leavel_id = '"+kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId+"'";
		 kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function (data) {
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_id =0;
            kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_data=data;
            kony.apps.coe.ess.myLeave.modifyLeave.updateUI.multipleAttachments();
		}, function (err) {
			kony.print("-----Error in getting leave balance----" + err);
           handleError(err);
		}, false);
     },
   
     multipleAttachments : function(){
        var data = kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_data;
        if(data.length>0 && kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_id < data.length){
                 var i = kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_id;
			    (new kony.apps.coe.ess.myLeave.media()).fetchAttachment({"mediaName":data[i].media_id},kony.apps.coe.ess.myLeave.modifyLeave.updateUI.getAttachmentSuccess,kony.apps.coe.ess.myLeave.modifyLeave.updateUI.getAttachmentError);
                 
               }else{
		          kony.application.dismissLoadingScreen();
               }
     },
     getAttachmentSuccess : function(response){
        if(response !== null){
           kony.apps.coe.ess.myLeave.applyLeave.Attachment.onClickOfTakePicture(response);
           kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_id = kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_id +1;
           kony.apps.coe.ess.myLeave.modifyLeave.updateUI.multipleAttachments();
        }else{
           kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_id = kony.apps.coe.ess.myLeave.modifyLeave.updateUI.attachment_id +1;
           kony.apps.coe.ess.myLeave.modifyLeave.updateUI.multipleAttachments();
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