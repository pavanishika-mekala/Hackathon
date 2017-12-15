kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.navigationTab = function()
{
  
};
kony.apps.coe.ess.myTime.navigationTab.prototype.loginaction = function()
{
  reUsableLoginForm.btnLogin.onClick = function(){frmTimesheetHistory.show();};
};
kony.apps.coe.ess.myTime.navigationTab.prototype.timesheetcreateactionTab = function()
{
   /* frmTimeSheetCreate.btnCancel.onClick = function(){
      kony.apps.coe.ess.myTime.TimesheetCreate.Search.contractAnimation();
      kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
      refreshAndShowTimesheetHomeForm();
    };*/
       frmTimeSheetCreateTab.btnClear.onClick = function(){
      //kony.apps.coe.ess.myTime.TimesheetCreate.SearchTab.contractAnimation();
      //kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
      frmTimeSheetCreateTab.flxTimeLine.removeAll();
        kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.reset();
      frmTimeSheetCreateTab.flxOuterTask.setVisibility(true);
      frmTimeSheetCreateTab.flxTaskSummary.setVisibility(false);
         frmTimeSheetCreateTab.btnStep1.setVisibility(true);
      frmTimeSheetCreateTab.btnStep2.setVisibility(true);
      frmTimeSheetCreateTab.flxSelTask.setVisibility(true);
         frmTimeSheetCreateTab.flxWorkHours.skin = "sknflx1c7393Px24";
        frmTimeSheetCreateTab.flxVacation.skin = "sknflxBGTab";
        frmTimeSheetCreateTab.lblWorkHr.skin= "sknlblBlkWh90";
        frmTimeSheetCreateTab.lblVacation.skin="sknlbl777777Tab";
        frmTimeSheetCreateTab.imgWork.src = "workwhite.png";
        frmTimeSheetCreateTab.imgLeave.src = "vacation.png";
      frmTimeSheetCreateTab.segProjectTaskSelection.setVisibility(true);
      frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
      frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(false);
      frmTimeSheetCreateTab.segDetailsSelectedTask.setVisibility(false);
      //frmTimeSheetCreateTab.flxSelectedTaskDeatilsType.setVisibility(false);
      frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.setVisibility(false);
      frmTimeSheetCreateTab.btnStep1.skin="sknBtn1c7393";
      frmTimeSheetCreateTab.btnStep1.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.Step1");
      frmTimeSheetCreateTab.lblSelectTask.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.selectaTask");
      frmTimeSheetCreateTab.btnStep2.skin="sknBtn1c7393Px36";
      frmTimeSheetCreateTab.txtBoxSearch.setVisibility(true);
      frmTimeSheetCreateTab.imgCancel.setVisibility(true);
      refreshAndShowTimesheetCreateTabForm();
    };
    frmTimeSheetCreateTab.btnSave1.onClick = function () {
	try{
      kony.apps.coe.ess.myTime.TimesheetHome.flxTimesheetDetailsLeftSelectedIndex = "" ; 
      if(!kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggleTab.isWork && kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.isLeaveSelected()){
        handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.common.selectLeaveType"));
		return;
      }
	if (!kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.isValidData() && !kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.isTaskSelected() && kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggleTab.isWork) {
		handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.common.selectTaskandTime"));
		return;
	}
	if (!kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.isTaskSelected() && kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggleTab.isWork) {
		handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.frmSelectTask.title"));
		return;
	}
	if (!kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData.isValidData() && kony.apps.coe.ess.myTime.TimesheetCreate.WorkLeaveToggleTab.isWork) {
		handleCustomAlert(kony.i18n.getLocalizedString("i18n.ess.mytime.createtimesheet.selecttimetype.valueKA"));
		return;
	} else {
      kony.print("--Data: " + JSON.stringify(kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.CurrentTaskTimelineData));
		var prevNoOfTasks = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData.length;
		(new kony.apps.coe.Reusable.TimelineCreationTab()).TapSlidertoFixTaskTab(frmTimeSheetCreateTab.flexSlider);
		var startIndex = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData.length - prevNoOfTasks;
		var len = kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData.length;
		for (var index = prevNoOfTasks; index < len; index++) { //Updating the DB with new added tasks
				kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData[index]);
				kony.apps.coe.Reusable.TimelineCreationTab.selectTimelineTaskCallback(kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData[index].data, kony.apps.coe.Reusable.TimelineCreationTab.TimeSheetData);
			}
			//kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
			kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = true;
			kony.apps.coe.ess.globalVariables.notFirstTask = false;
			kony.apps.coe.ess.globalVariables.sliderLeftValue = null;
			kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = false;
			kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelectionTab.isBlocked = false;
			showListViewForm();
	}
	}
	catch(e){
		handleCustomAlert("Error in saving timeline: " + e.message);
	}
};

};

kony.apps.coe.ess.myTime.navigationTab.prototype.apppreshowTab = function()
{
  this.timesheetcreateactionTab();
};

function apppreshowTab()
{
  var navigation  = new kony.apps.coe.ess.myTime.navigationTab();
  navigation.apppreshowTab();
}
kony.apps.coe.ess.myTime.navigationTab.prototype.onClickOfDeleteMenuTab = function() {
 /* frmTimeSheetCreate.segDeleteMenuPopup.onRowClick = function(){
  if(frmTimeSheetCreate.segDeleteMenuPopup.selectedRowIndex[1]===0) {
      kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTask();
   }
  else if(frmTimeSheetCreate.segDeleteMenuPopup.selectedRowIndex[1]===1) {
     kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTimeline();
   }
   };*/
};
kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTask = function() {
 	 kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  	 frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
	 frmTimeSheetCreate.flxBlank.isVisible = true;
     frmTimeSheetCreate.flxpopuptask.isVisible = true; 
};
kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTimeline = function() {
 	 kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  	 frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
	 frmTimeSheetCreate.flxBlank.isVisible = true;
     frmTimeSheetCreate.flxpopuptimeline.isVisible = true;
};