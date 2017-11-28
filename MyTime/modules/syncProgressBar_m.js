/**
 * Sync Progressbar
 * @author Dharma Teja Reddy K
 *			dharmateja.kasa@kony.com
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Sync = kony.apps.coe.ess.Sync || {};

kony.apps.coe.ess.Sync.UI = {
  progressPercentage : 0,
  progressBarUI : null,
  syncingInBackground : false,
  previousForm : null
};
/**
   * Returns Sync Prgressbar UI
   */
kony.apps.coe.ess.Sync.UI.getProgressbarUI = function() {
 //the form and it's corresponding header
  var formsAndHeaderHeights={
       "frmAuditTrail": "flxAuditTrailHeader",
       "frmRecentTasks":"flxTitle",
       "frmSearchMyTime":"flxHeader",
       "frmSearchStatus":"flxHeader",
       "frmTaskList":"flxTitle",
       "frmTimeSheetCreate":"flxHeader",
       "frmTimesheetHelp":"flxTimesheetHelpHeader",
       "frmTimesheetHistory":"flxHeader",
       "frmTimesheetHome":"flxHeader",
       "frmTimesheetReview":"flxReviewHeader",
       "frmTimesheetSettings":"flxHeader",
       "frmViewTimeSheet":"flxHeader",
     };
     var isTheFormFound=false;
     var currentForm = kony.application.getCurrentForm();
     var requiredForm; 
     var requiredFormLength;
     var requiredFormHeightProgressBar;
     for(var key in formsAndHeaderHeights){
     if(key == currentForm.id){
       isTheFormFound=true;
       break;
     }     
   }
   if(isTheFormFound){
    requiredForm=currentForm[formsAndHeaderHeights[currentForm.id.toString()]].height;
     requiredFormLength=""+requiredForm.length;
     if(requiredFormLength==2)//form's header's height can either be in two digits or one digit -either <10 or >10
       {
         requiredFormHeightProgressBar=parseInt(requiredForm.substring(0,1))-1+"%";         
       }
     else{
       requiredFormHeightProgressBar=parseInt(requiredForm.substring(0,2))-1+"%";
     }
     
   
  }
  else{
    requiredFormHeightProgressBar="8%";
  }  
  var flxSyncProgresssBar = new kony.ui.FlexContainer({
    "id" : "flxSyncProgresssBar",
    "zIndex" : 50,
    "isVisible": true,
    "clipBounds": true,
    "layoutType": kony.flex.FREE_FORM,
    "width" : "100%",
    "height" : "1%",
    "top" : requiredFormHeightProgressBar,
    "left" : "0%"
  },{
    "padding": [0, 0, 0, 0]
  },{});

  var imgSyncProgressPath = new kony.ui.Image2({
    "id" : "imgSyncProgressPath",
    "isVisible" : true,
    "width" : "100%",
    "height" : "100%",
    "top" : "0%",
    "left" : "0%",
    "zIndex" : 1,
    "src" : "enabled.png"
  },{
    "containerWeight" : "100%"
  },{});

  var imgSyncProgressBar = new kony.ui.Image2({
    "id" : "imgSyncProgressBar",
    "isVisible" : true,
    "width" : "100%",
    "height" : "100%",
    "top" : "0%",
    "left" : "-100%",
    "zIndex" : 3,
    "src" : "disabled.png"
  },{
    "containerWeight" : "100%"
  },{});

  var imgSyncProgressAnimationBar = new kony.ui.Image2({
    "id" : "imgSyncProgressAnimationBar",
    "isVisible" : true,
    "width" : "3.47%",
    "height" : "100%",
    "top" : "0%",
    "left" : "40%",
    "zIndex" : 2,
    "src" : "threedots.png"
  },{
    "containerWeight" : "100%"
  },{});


  flxSyncProgresssBar.add(imgSyncProgressPath);
  flxSyncProgresssBar.add(imgSyncProgressBar);
  flxSyncProgresssBar.add(imgSyncProgressAnimationBar);

  kony.apps.coe.ess.Sync.UI.progressBarUI = flxSyncProgresssBar;
  return kony.apps.coe.ess.Sync.UI.progressBarUI;

}; //End of getProgressbarUI
/**
   * Shows Toast Message with Provided Message
   * @param {string} $message
   */
kony.apps.coe.ess.Sync.UI.showInformationToast = function(message) {
  var flxSyncToastMessage = new kony.ui.FlexContainer({
    "id" : "flxSyncToastMessage",
    "zIndex" : 75,
    "isVisible": true,
    "clipBounds": true,
    "layoutType": kony.flex.FREE_FORM,
    "width" : "64%",
    "height" : "4.64%",
    "top" : "6%",
    "centerX" : "50%",
    "skin" : "sknFlxInfoToast"
  },{
    "padding": [0, 0, 0, 0]
  },{});

  var lblSyncToastMessage = new kony.ui.Label({
    "id" : "lblSyncToastMessage",
    "zIndex" : 1,
    "isVisible": true,
    "text" : message,
    "skin" : "sknLblToastMessage",
    "centerX" : "50%",
    "centerY" : "50%"
  },{
    "padding": [0, 0, 0, 0]
  },{});

  var currentForm = kony.application.getCurrentForm();
  flxSyncToastMessage.add(lblSyncToastMessage);
  currentForm.add(flxSyncToastMessage);

  var removeToastMessage = function() {
    try {
      kony.timer.cancel("syncMsgTimer");
      currentForm.flxSyncToastMessage.setVisibility(false);
      currentForm.flxSyncToastMessage.remove(lblSyncToastMessage);
      currentForm.remove(flxSyncToastMessage);
    } catch (e) {
      kony.print("error in Blogic cancelTimer : " + e);
    }
  };

  try{
    kony.timer.schedule("syncMsgTimer", removeToastMessage, 2, false);
  }catch(e){
    kony.print("==syncMsgTimer Timer Error==>");
  } 
}; //End of showInformationToast
/**
   * Shows Error Toast Message with Provided Message. Callback will be execution on user action.
   * @param {string} $message
   * @param {fn()} $callBack
   */
kony.apps.coe.ess.Sync.UI.showErrorToast = function(message,actionCallback) {
  var flxSyncErrorToastMessage = new kony.ui.FlexContainer({
    "id" : "flxSyncErrorToastMessage",
    "zIndex" : 75,
    "isVisible": true,
    "clipBounds": true,
    "layoutType": kony.flex.FREE_FORM,
    "width" : "80%",
    "height" : "4.64%",
    "top" : "6%",
    "centerX" : "50%",
    "skin" : "sknFlxErrorToast"
  },{
    "padding": [0, 0, 0, 0]
  },{});
  var flxErrorMessage = new kony.ui.FlexContainer({
    "id" : "flxErrorMessage",
    "zIndex" : 1,
    "isVisible": true,
    "clipBounds": true,
    "layoutType": kony.flex.FREE_FORM,
    "width" : "65.5%",
    "height" : "100%",
    "top" : "0%",
    "left" : "0%",
    "skin" : "sknFlxErrorToastMesage"
  },{
    "padding": [0, 0, 0, 0]
  },{});

  var lblErrorMessage = new kony.ui.Label({
    "id" : "lblErrorMessage",
    "zIndex" : 1,
    "isVisible": true,
    "text" : message,
    "skin" : "sknLblToastMessage",
    "centerX" : "50%",
    "centerY" : "50%"
  },{
    "padding": [0, 0, 0, 0]
  },{});
  flxErrorMessage.add(lblErrorMessage);

  var flxErrorAction = new kony.ui.FlexContainer({
    "id" : "flxErrorAction",
    "zIndex" : 1,
    "isVisible": true,
    "clipBounds": true,
    "layoutType": kony.flex.FREE_FORM,
    "width" : "34%",
    "height" : "100%",
    "top" : "0%",
    "right" : "0%",
    "onClick" : actionCallback,
    "skin" : "sknFlxErrorToastAction"
  },{
    "padding": [0, 0, 0, 0]
  },{});

  var lblErrorActionMessage = new kony.ui.Label({
    "id" : "lblErrorActionMessage",
    "zIndex" : 1,
    "isVisible": true,
    "text" : "Try Again",
    "skin" : "sknLblToastMessage",
    "centerX" : "50%",
    "centerY" : "50%"
  },{
    "padding": [0, 0, 0, 0]
  },{});
  flxErrorAction.add(lblErrorActionMessage);
  flxSyncErrorToastMessage.add(flxErrorAction);
  flxSyncErrorToastMessage.add(flxErrorMessage);

  var currentForm = kony.application.getCurrentForm();
  currentForm.add(flxSyncErrorToastMessage);

  var removeToastMessage = function() {
    try {
      kony.timer.cancel("syncMsgTimer");
      currentForm.remove(flxSyncErrorToastMessage);
    } catch (e) {
      kony.print("error in Blogic cancelTimer : " + e);
    }
  };

  try{
    kony.timer.schedule("syncMsgTimer", removeToastMessage, 5, false);
  }catch(e){
    kony.print("==syncMsgTimer Timer Error==>");
  } 
}; //End of showErrorToast

/**
   * Adds Sync Progressbar to Form. If no form is given, It will add to current form
   */
kony.apps.coe.ess.Sync.UI.addSyncProgressBar = function(formReference) {
  if(!formReference)
    formReference = kony.application.getCurrentForm();

  if(!formReference.flxSyncProgresssBar) {
    formReference.add(kony.apps.coe.ess.Sync.UI.getProgressbarUI());
  } 
}; //End of addSyncProgressBarToCurrentForm
/**
   * Removes Sync Progressbar from Form. If no form is passed, It will remove from current form, if exists.
   */
kony.apps.coe.ess.Sync.UI.removeSyncProgressBar = function(formReference) {
  if(!formReference) {
    formReference = kony.application.getCurrentForm();
  }

  if(formReference.flxSyncProgresssBar) {
    formReference.flxSyncProgresssBar.removeFromParent();
  } 
}; //End of removeSyncProgressbarFrom

/**
   * Animate Sync Progressbar
   */
kony.apps.coe.ess.Sync.UI.animateProgressBar = function() {

  var animationDef = {
    0 : {
      "left" : kony.apps.coe.ess.Sync.UI.progressPercentage + "%",
      "stepConfig" : {
        "timingFunction" : kony.anim.LINEAR
      }
    },
    100 : {
      "left" : "100%",
      "stepConfig" : {
        "timingFunction" : kony.anim.LINEAR
      }
    }
  };

  var animationConfig = {
    "duration" : 1,
    "iterationCount": 0,
    "delay": 0,
    "fillMode": kony.anim.FILL_MODE_FORWARDS
  };

  var currentForm = kony.application.getCurrentForm();
  if(currentForm.imgSyncProgressAnimationBar) {
    currentForm.imgSyncProgressAnimationBar.animate(kony.ui.createAnimation(animationDef),animationConfig,{
      "animationStart" : null,
      "animationEnd" : null
    });
  }
}; //End of animateProgressBar
/**
   * Updates Sync Pgoress Percentage with given value
   * @param {number} $number
   */
kony.apps.coe.ess.Sync.UI.setProgressPercentage = function(number) {
  //kony.apps.coe.ess.Sync.UI.progressPercentage = number;
  var currentForm = kony.application.getCurrentForm();
  if(currentForm.imgSyncProgressBar) {
    //currentForm.imgSyncProgressBar.left = (kony.apps.coe.ess.Sync.UI.progressPercentage - 100) + "%"
    var animationDef = {
      0 : {
        //"left" : "" + kony.apps.coe.ess.Sync.UI.progressPercentage + "%",
        "stepConfig" : {
          "timingFunction" : kony.anim.LINEAR
        }
      },
      100 : {
        "left" : (number - 100) + "%",
        "stepConfig" : {
          "timingFunction" : kony.anim.LINEAR
        }
      }
    };

    var animationConfig = {
      "duration" : (number - kony.apps.coe.ess.Sync.UI.progressPercentage) / 100  ,
      "iterationCount": 1,
      "delay": 0,
      "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    currentForm.imgSyncProgressBar.animate(kony.ui.createAnimation(animationDef),animationConfig,{
      "animationStart" : null,
      "animationEnd" : function(){
        kony.apps.coe.ess.Sync.UI.progressPercentage = number;
      }
    });
  }
}; //End of setProgressPercentage
/**
   * It is called when background Sync is started
   */
kony.apps.coe.ess.Sync.UI.startSyncProgressBar = function() { 
  kony.apps.coe.ess.Sync.UI.syncingInBackground = true;
  kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
  kony.apps.coe.ess.Sync.UI.setProgressPercentage(0);
}; //End of startSyncProgressBar
/**
   * Should be called in Post Show of Everyform. It Shows Sync Progressbar in form if Sync is happening in background
   */
kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing = function() {
  var currentForm = kony.application.getCurrentForm();
  if(kony.apps.coe.ess.Sync.UI.syncingInBackground) {
    kony.apps.coe.ess.Sync.UI.removeSyncProgressBar(kony.apps.coe.ess.Sync.UI.previousForm);
    kony.apps.coe.ess.Sync.UI.addSyncProgressBar();
    kony.apps.coe.ess.Sync.UI.animateProgressBar();
    kony.apps.coe.ess.Sync.UI.previousForm = currentForm;
  } else {
    kony.apps.coe.ess.Sync.UI.removeSyncProgressBar();
    if(currentForm.flxSyncToastMessage)
      currentForm.remove(currentForm.flxSyncToastMessage);
    if(currentForm.flxSyncErrorToastMessage)
      currentForm.remove(currentForm.flxSyncErrorToastMessage);
  }
}; //End of showSyncProgressBarIfSyncing

kony.apps.coe.ess.Sync.UI.stopSyncProgressBarWithSuccessMessage = function() {
  kony.apps.coe.ess.Sync.UI.setProgressPercentage(100);
  kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
}; //End of stopSyncProgressBarWithSuccessMessage

kony.apps.coe.ess.Sync.UI.stopSyncProgressBarWithErrorMessage = function() {
  kony.apps.coe.ess.Sync.UI.showErrorToast(kony.i18n.getLocalizedString("i18n.ess.common.sync.errorOccured")  , function(){
	//kony.apps.coe.ess.Sync.syncAsynchronously();
    var currentForm = kony.application.getCurrentForm();
    if(currentForm.flxSyncErrorToastMessage)
      currentForm.remove(currentForm.flxSyncErrorToastMessage);
  });
  kony.apps.coe.ess.Sync.UI.stopSyncProgressBar();
  kony.print("sync Value"+kony.apps.coe.ess.globalVariables.syncCount);
 
}; //End of stopSyncProgressBarWithSuccessMessage

kony.apps.coe.ess.Sync.UI.stopSyncProgressBar = function() {
  try {
    kony.timer.schedule("syncBarRemoveTmr", function(){
      kony.timer.cancel("syncBarRemoveTmr");
      kony.apps.coe.ess.Sync.UI.previousForm = null;
      kony.apps.coe.ess.Sync.UI.syncingInBackground = false;
      kony.apps.coe.ess.Sync.UI.removeSyncProgressBar(); 
    }, 3, false);
  } catch (e) {
    kony.print("Exception Occured in stopSyncProgressBar : " + JSON.stringify(e));
  }
};// End of stopSyncProgressBar
kony.apps.coe.ess.Sync.UI.updateProgressBar = function() {
  if(kony.apps.coe.ess.Sync.UI.progressPercentage < 90)
    kony.apps.coe.ess.Sync.UI.setProgressPercentage(kony.apps.coe.ess.Sync.UI.progressPercentage + 10);
};