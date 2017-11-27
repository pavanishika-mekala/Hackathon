/** 
 *  @author     Sumeet.Bartha
 *  @category   UI design.	
 *  @desc       
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.navigation = function() {

};
kony.apps.coe.ess.myTime.navigation.prototype.loginaction = function() {
    reUsableLoginForm.btnLogin.onClick = function() { frmTimesheetHistory.show(); };
};
kony.apps.coe.ess.myTime.navigation.prototype.timesheetcreateaction = function() {
    kony.print("---- I'm here in navigation_m timesheetcreateaction");
    frmTimeSheetCreate.btnCancel.onClick = function() {
        kony.apps.coe.ess.myTime.TimesheetCreate.Search.contractAnimation();
        kony.apps.coe.Reusable.TimelineCreation.setDefaultSlider("9 AM", "11 AM");
        kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
        kony.apps.coe.ess.globalVariables.notFirstTask = false;
        kony.apps.coe.ess.globalVariables.prevSlider = "";
        kony.apps.coe.ess.globalVariables.taskStartTime = "";
        kony.apps.coe.ess.globalVariables.taskSelectedOnEdit = false;
        frmTimeSheetCreate.btnEditDone.setVisibility(false);
        frmTimeSheetCreate.flxManualTimeSelection.setVisibility(false);
        frmTimeSheetCreate.flxCopy.setVisibility(true);
        kony.apps.coe.ess.myTime.TimesheetCreate.resetCopyUI();
        refreshAndShowTimesheetHomeForm();
        kony.apps.coe.ess.globalVariables.sliderLeftValue = null; //Making slider left value as empty once back button on create page is clicked
        kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = false;

    };
    frmTimeSheetCreate.btnDone.onClick = function() {
        try {
            kony.print("---- frmTimeSheetCreate btnDone onClick start");
            //kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent === true
            kony.print("---- current task data: " + JSON.stringify(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.data));
          if (!kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.isValidData() && !kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.isTaskSelected()) {
                //kony.apps.coe.ess.myTime.TimesheetCreate.popups.showEmptyPopup();
            	handleCustomAlert("Please Select Task & Time Type");
            	return;
            }
          if (!kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.isTaskSelected()) {
                handleCustomAlert("Please Select Task");
            	return;
            }
          if (!kony.apps.coe.ess.myTime.TimesheetCreate.Backend.CurrentTaskTimelineData.isValidData()) {
                handleCustomAlert("Please Select TimeType");
            	return;
            }
           else {
                var prevNoOfTasks = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length;
                (new kony.apps.coe.Reusable.TimelineCreation()).TapSlidertoFixTask(frmTimeSheetCreate.flexSlider);
                var startIndex = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length - prevNoOfTasks;
                var len = kony.apps.coe.Reusable.TimelineCreation.TimeSheetData.length;
                for (var index = prevNoOfTasks; index < len; index++) { //Updating the DB with new added tasks
                    kony.apps.coe.ess.myTime.TimesheetCreate.Backend.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[index]);
                    kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[index].data, kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
                }
                frmTimeSheetCreate.flxProjectTaskSelection.setVisibility(false);
                frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.setVisibility(true);
                //refreshAndShowTimesheetHomeForm();
                //showTimesheetCreateForm(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
                kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
                kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
                kony.apps.coe.ess.globalVariables.notFirstTask = false;
                frmTimeSheetCreate.btnDone.setVisibility(false);
                frmTimeSheetCreate.flexSlider.setVisibility(false);
                frmTimeSheetCreate.lblSummary.setVisibility(true);
                frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(true);
                frmTimeSheetCreate.flxTotalTime.setVisibility(true);
                frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
                frmTimeSheetCreate.flxManualTimeSelection.setVisibility(false);
                frmTimeSheetCreate.flxCopy.setVisibility(true);

                //To scroll the timeline upto newly created task
                var id = kony.apps.coe.Reusable.TimelineCreation.id;
                id = id - 1;
                frmTimeSheetCreate.timeLineScrollFlex.scrollToWidget(frmTimeSheetCreate["flxSelectedTime" + id]);
                //Making slider left value empty once task is created
                kony.apps.coe.ess.globalVariables.sliderLeftValue = null;
                kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = false;
                kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.isBlocked = false;
            }
            kony.print("---- frmTimeSheetCreate btnDone onClick end");
        } catch (error) {
            kony.print("---- frmTimeSheetCreate btnDone onClick error: " + error);
        }
    };

    frmTimeSheetCreate.btnEditDone.onClick = function() {
        try {
            kony.print("---- in btnEditDone onClick");
            kony.apps.coe.Reusable.TimelineCreation.editingFixedTaskModeOn = true;
            (new kony.apps.coe.Reusable.TimelineCreation()).TapSlidertoFixTask(frmTimeSheetCreate.flexSlider);
            kony.print("---- edited data: " + JSON.stringify(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[kony.apps.coe.ess.globalVariables.currentTaskIndex]));
            kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[kony.apps.coe.ess.globalVariables.currentTaskIndex].data.Time_Line_Status = "modified";
            kony.apps.coe.ess.myTime.TimesheetCreate.Backend.addTimeEntriesInDB(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[kony.apps.coe.ess.globalVariables.currentTaskIndex]);
            kony.application.dismissLoadingScreen();
            if(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[kony.apps.coe.ess.globalVariables.currentTaskIndex].data !== null && typeof kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[kony.apps.coe.ess.globalVariables.currentTaskIndex].data !== undefined){
                kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[kony.apps.coe.ess.globalVariables.currentTaskIndex].data, kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
            }else{
                kony.apps.coe.Reusable.TimelineCreation.selectTimelineTaskCallback(kony.apps.coe.Reusable.TimelineCreation.TimeSheetData[kony.apps.coe.ess.globalVariables.currentTaskIndex], kony.apps.coe.Reusable.TimelineCreation.TimeSheetData);
            }
            frmTimeSheetCreate.btnEditDone.setVisibility(false);
            frmTimeSheetCreate.flxProjectTaskSelection.setVisibility(false);
            frmTimeSheetCreate.flxSelectedTaskTimeTypeSelection.setVisibility(true);
            kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
            kony.apps.coe.Reusable.TimelineCreation.isUnfixedTaskPresent = true;
            kony.apps.coe.ess.globalVariables.notFirstTask = false;
            kony.apps.coe.ess.globalVariables.taskSelectedOnEdit = false;
            frmTimeSheetCreate.flxTotalTime.setVisibility(true);
            frmTimeSheetCreate.flxSelectionBar.setVisibility(false);
            frmTimeSheetCreate.flxManualTimeSelection.setVisibility(false);
            frmTimeSheetCreate.flxCopy.setVisibility(true);
            frmTimeSheetCreate.btnDone.setVisibility(false);
            frmTimeSheetCreate.btnTimeSheetAdd.setVisibility(true);
            frmTimeSheetCreate.lblSummary.setVisibility(true);
            //commented now will be included in furthur commits          	
            //frmTimeSheetCreate.timeLineScrollFlex.scrollToWidget(frmTimeSheetCreate[kony.apps.coe.ess.globalVariables.currentFixedFlex]);
            kony.apps.coe.ess.globalVariables.taskStartTime = "";
        } catch (error) {
            handleError(error);
        }
    };

};

kony.apps.coe.ess.myTime.navigation.prototype.apppreshow = function() {
    this.timesheetcreateaction();
};

function apppreshow() {
    var navigation = new kony.apps.coe.ess.myTime.navigation();
    navigation.apppreshow();
}
kony.apps.coe.ess.myTime.navigation.prototype.onClickOfDeleteMenu = function() {
    frmTimeSheetCreate.segDeleteMenuPopup.onRowClick = function() {
        if (frmTimeSheetCreate.segDeleteMenuPopup.selectedRowIndex[1] === 0) {
            kony.apps.coe.ess.myTime.navigation.prototype.deleteTask();
        } else if (frmTimeSheetCreate.segDeleteMenuPopup.selectedRowIndex[1] === 1) {
            kony.apps.coe.ess.myTime.navigation.prototype.deleteTimeline();
        }
    };
};
kony.apps.coe.ess.myTime.navigation.prototype.deleteTask = function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxpopuptask.isVisible = true;
};
kony.apps.coe.ess.myTime.navigation.prototype.deleteTimeline = function() {
    kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
    frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
    frmTimeSheetCreate.flxBlank.isVisible = true;
    frmTimeSheetCreate.flxpopuptimeline.isVisible = true;
};