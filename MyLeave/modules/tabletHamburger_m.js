/**
 *  @author     Rajeev Saxena
 *  @category   UX/UI
 *  @desc       Hamburger Menu implementation for ESS
 *  @ © 2016    Kony Inc
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};

/**
 * @class          Hamburger
 * @type           Constructor
 * @param          {widgetRef} hamburgerButton - the button that will open/close the hamburger
 * @return         None.
 * @description    Create flexes and assign actions
 */
kony.apps.ess.Hamburger = function(hamburgerButton) {
	
	if(hamburgerButton == null)
      return;
    this.isFirstClick=true;
    this.buttonSwitch = 0;
	kony.application.getCurrentForm().enableScrolling = false;
    var succCallback = this.generateShadow;
    var callBackForHamburger = this.applyActions.bind(this);
    this.generateContainer(succCallback);
    this.generateHamburger(callBackForHamburger);
    var scopeObj = this;
    hamburgerButton.onClick = function(){
      if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) 
             kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP ONLINE";
          else
            kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP OFFLINE";
		 if(kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.isVisible){
        kony.application.getCurrentForm().flxHamburger.flxOfflineAlert.setVisibility(false);
        kony.apps.ess.myLeave.syncHamburger = 0; 
      }
    	if(scopeObj.buttonSwitch == 0){
    		scopeObj.buttonSwitch = 1;
            var showBrgr = scopeObj.showHamburger.bind(scopeObj);
    		showBrgr();
    	}
    	else{
    		scopeObj.buttonSwitch = 0;
            var hideBrgr = scopeObj.hideHamburger;
            hideBrgr();
    	}
            
      this.loadingNotificationData(); 
      this.initialiseUIElementsSingleMode();
      this.hamburgerMenuItemsShow();
       this.setDataToDynamicSegment(); 

    }.bind(scopeObj);
  if (this.isFirstClick === true) {
      this.isFirstClick = false;
      kony.print("-- Hamburger menu is called first time --");
      hamburgerButton.onClick();
    }

}



/**
 * @class          Hamburger
 * @type           Prototype
 * @param		   none
 * @return         None.
 * @description    function to be executed to show the list of hamburger Items on Menu.
 */
kony.apps.ess.Hamburger.prototype.
hamburgerMenuItemsShow = function() {
    if (kony.apps.coe.ess.appconfig.isShowDeepLinkingAppBeforeInstall === false) {
        //#ifdef ipad
        kony.apps.ess.deepLinkingSSO.appExistedOrNot();
        //#else
        //#ifdef tabrcandroid
        kony.apps.ess.deepLinkingSSO.appExistedOrNot();
        //#else
        this.changeHamburgerMenuItemsVisibility();
        //#endif
        //#endif
    } else {
        if (kony.apps.coe.ess.Validation.isNativeChannel === true && kony.apps.coe.ess.Validation.isTablet === false) {
            this.changeHamburgerMenuItemsVisibility();
        }
    }
};



/**
 * @class          Hamburger
 * @type           Prototype
 * @param          {function} callback - callback function to exectute
 * @return         None.
 * @description    generates hamburger's shadow
 */
kony.apps.ess.Hamburger.prototype.generateShadow = function(callback){
    kony.print("---------generating shadow");
    if(kony.application.getCurrentForm().flxHamburgerShadow === null){
        var shadowContainer = new kony.ui.FlexContainer({
            "id": "flxHamburgerShadow",
            "top": "0%",
            "left": "0%",
            "width": "110%",
            "height": "110%",
            "zIndex": 3,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM,
            "skin" : "sknFlxHamburgerShadow"
        }, {
            "padding": [0, 0, 0, 0]
        }, {}); 
        kony.application.getCurrentForm().addAt(shadowContainer,0);
        kony.print("---------------shadow generated");
    }
    else{
        kony.print("---------------shadow already exists");
    }
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          {function} callback - callback function to exectute
 * @return         None.
 * @description    nest all form widgets in a container
 */
kony.apps.ess.Hamburger.prototype.generateContainer = function(callback){
    kony.print("---------generating container");
    var children = kony.application.getCurrentForm().widgets();
    if(kony.application.getCurrentForm().flxMainContainer === null){
        var mainContainer = new kony.ui.FlexContainer({
            "id": "flxMainContainer",
            "top": "0%",
            "left": "0%",
            "width": "100%",
            "height": "100%",
            "zIndex": 1,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM,
        }, {
            "padding": [0, 0, 0, 0]
        }, {});
        while(kony.application.getCurrentForm().widgets().length >0){
            mainContainer.add(kony.application.getCurrentForm().widgets()[0]);
            kony.application.getCurrentForm().remove(kony.application.getCurrentForm().widgets()[0]);
        }
        mainContainer.zIndex = 4;
        kony.application.getCurrentForm().addAt(mainContainer,0);
        kony.print("------------ Container generated");
    }
    else{
        kony.print("----------Container already exists");
    }

    callback()
}


kony.apps.ess.Hamburger.prototype.generateHamburger = function(callback){
        kony.print("---------generating brgr");
    if(kony.application.getCurrentForm().lblHamburgerCompanyName === null){
        //var flexContainer1 = frmHamburger.flxHamburger.clone("");
      	
      	if(frmHamburger.flxHamburger !== undefined){
        	kony.application.getCurrentForm().addAt(frmHamburger.flxHamburger,0);
          	currForm = kony.application.getCurrentForm();
        	kony.application.getCurrentForm().lblAppVersion.text = kony.apps.coe.ess.appconfig.appversion;
        }
      	else{
          	kony.application.getCurrentForm().addAt(currForm.flxHamburger,0);
          	currForm = kony.application.getCurrentForm();
          	kony.application.getCurrentForm().lblAppVersion.text = kony.apps.coe.ess.appconfig.appversion;
        }
        kony.print("------------ brgr generated");
        callback()
    }
    else{
        kony.print("------------ brgr already exists");
    } 
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @return         None.
 * @description    applies actions to funcitions inside hamburger
 */
kony.apps.ess.Hamburger.prototype.applyActions = function(){
    if(kony.application.getCurrentForm().flxSyncNow !== null || kony.application.getCurrentForm().flxSyncNow !== undefined){
        kony.application.getCurrentForm().flxSyncNow.onClick = function(){
          if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) 
             kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP ONLINE";
          else
            kony.application.getCurrentForm().flxHamburger.lblAppOnline.text = "APP OFFLINE";
            kony.print("-----------------Initiate manual sync from Hamburger");
            kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.Login.SyncingData"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
			if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))
				kony.apps.ess.myLeave.syncHamburger = 1;  
          kony.apps.coe.ess.Sync.doDownload = true;
            var successCallback = function(){
                    kony.print("-----------------Completed manual sync from Hamburger");
            };
            kony.apps.coe.ess.frmLogin.manualSyncOnClick(successCallback);
        };
    }
    if(kony.application.getCurrentForm().flxLogout !== null || kony.application.getCurrentForm().flxLogout !== undefined){
        kony.application.getCurrentForm().flxLogout.onClick = function(){
            kony.print("-----------------Initiate logout from Hamburger");
            //kony.application.getCurrentForm().flxLogout.onClick = function(){};
            //kony.application.getCurrentForm().flxSyncNow.onClick = function(){};
            this.hideHamburger();
            this.buttonSwitch = 0;
            kony.sdk.mvvm.LogoutAction();
            kony.print("-----------------Completed logout from Hamburger");
        }.bind(this);
    }   
    kony.print("------------- actions applied");
};
/**
 * @class          Hamburger
 * @type           Prototype
 * @return         None.
 * @description    show Hamburger menu flex
 */
kony.apps.ess.Hamburger.prototype.showHamburger = function(){
    kony.print("---------- Hamburger open initiated");

    kony.application.getCurrentForm().flxMainContainer.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "92.1%",
                "top" : "10.3%",
                "height" : "80.4%",
                "width" : "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": kony.print("---------Animated Main Flex for Hamburger")
        });
    kony.application.getCurrentForm().flxHamburgerShadow.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "92.1%",
                "top" : "7%",
                "height" : "87%",
                "width" : "84%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": kony.print("---------Animated Shadow for Hamburger")
        });
    if(kony.application.getCurrentForm().flxOverlayCOntainer === null){
        var overlayContainer = new kony.ui.FlexContainer({
            "id": "flxOverlayContainer",
            "left": "92.1%",
            "top" : "10.3%",
            "height" : "80.4%",
            "width" : "70%",
            "zIndex": 100,
            "isVisible": true,
            "clipBounds": true,
            "layoutType": kony.flex.FREE_FORM,
        }, {
            "padding": [0, 0, 0, 0]
        }, {});
        kony.application.getCurrentForm().add(overlayContainer);
    }
    kony.application.getCurrentForm().flxOverlayContainer.onClick=function(){
        this.buttonSwitch = 0;
        this.hideHamburger();
    }.bind(this);
    kony.print("---------- Hamburger open complete");
}
/**
 * @class          Hamburger
 * @type           Prototype
 * @param          none
 * @return         None.
 * @description    close hamburger
 */
kony.apps.ess.Hamburger.prototype.hideHamburger = function(){
    kony.print("---------- Hamburger close initiated");
    kony.application.getCurrentForm().remove(kony.application.getCurrentForm().flxOverlayContainer);
    kony.application.getCurrentForm().flxMainContainer.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "0%",
            "top" : "0%",
            "height" : "100%",
            "width" : "100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": function(){
           kony.print("---------- Main flex closed");
        }   
    });
    kony.application.getCurrentForm().flxHamburgerShadow.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top" : "0%",
                "height" : "100%",
                "width" : "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": kony.print("---------Closed Shadow for Hamburger")
        });
    kony.print("---------- Hamburger close complete");
}

kony.apps.ess.Hamburger.prototype.loadingNotificationData = function() {
    try {
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"));
        var sqlQuery = "SELECT n.title, n.description, n.notification_id, " +
            "GROUP_CONCAT(data_key) as dataKeys, GROUP_CONCAT(data_value) as dataValues, " +
            "n.createdts as notificationTime " +
            "FROM notification n " +
            "LEFT JOIN notification_data nd on n.notification_id = nd.notification_id " +
            "WHERE n.module='APPROVALS' " +
            "GROUP BY nd.notification_id LIMIT 20;";
        kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, success, error);

        function success(data) {
            var scopeObj = this;
            var processedData = [];
            if (!data && data.length === 0) {
                //There's No data to process
                kony.application.getCurrentForm().segNotifications.removeAll();
                loadDatatoSegNotifications(processedData);
            }
            data.forEach(function(item, index) {
                var notificationTime;
                var datestr = String(item.notificationTime);
                if (datestr && datestr.toLowerCase() !== "null") {
                    var date = new Date(datestr.substring(0, 4), parseInt(datestr.substring(4, 6)) - 1, datestr.substring(6, 8), datestr.substring(8, 10), datestr.substring(10, 12), datestr.substring(12, 16));
                    notificationTime = date.toHHMMMHHmm();
                } else {
                    notificationTime = "";
                }

                var preparedData = {
                    "title": item.title,
                    "description": item.description,
                    "notificationTime": notificationTime,
                    "timePeriod": "",
                    "timeDuration": "",
                    "notificationIcon": "reminder.png"
                };

                //Find out which type of notification it is
                var dataKeys = item.dataKeys.split(",");
                var dataValues = item.dataValues.split(",");

                var moduleIndex = dataKeys.indexOf("module");
                var moduleType;
                if (moduleIndex !== -1) {
                    moduleType = dataValues[moduleIndex];
                } else {
                    //Whihc means there is no module information for Notification
                    //It shouldn't happen
                    moduleType = "default";
                }
                preparedData.moduleType = moduleType;

                //Context Data holds more data for deepdroping or fetchng information.
                var contextIndex = dataKeys.indexOf("contextData");
                var contextData;
                if (contextIndex !== -1) {
                    var cData = dataValues[contextIndex];
                    var cDataModified = cData.replaceAll("\\", "");
                    contextData = JSON.parse(cDataModified);
                } else {
                    contextData = null;
                }
                preparedData.contextData = contextData;

                processedData.push(preparedData);
            });
            loadDatatoSegNotifications(processedData);
        }
    } catch (err) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("Error in successCallBack of query in tabletHamburger");
        handleError(err);
    }

    function error(err) {
        handleError(err);
    }

    function loadDatatoSegNotifications(data) {
        try {
            var widgetDataMap = {
                "lblNotificationNameTab": "title",
                "lblNotificationDescriptionTab": "description",
                "lblNotificationTime": "notificationTime",
                "imgNotificationTab": "notificationIcon",
            };
            kony.application.getCurrentForm().segNotifications.removeAll();
            kony.application.getCurrentForm().segNotifications.widgetDataMap = widgetDataMap;
            kony.application.getCurrentForm().segNotifications.setData(data);
            for (var i in data) {
                var eachData = data[i];
                switch (eachData.moduleType) {
                    case "APPROVALS":
                        if (eachData.contextData) {
                            kony.apps.coe.ess.notifications.getNotificationHistoryInstance().fetchDetails(i, eachData.contextData.id);
                        }
                        break;
                    default:
                        kony.print("Default case is executed : " + eachData.moduleType);
                        break;
                }
            }
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in loadDatatoSegNotifications of tabletHamburger");
        }
    }
};
kony.apps.ess.Hamburger.prototype.initialiseUIElementsSingleMode = function() {
    if (kony.application.getCurrentForm().flxMenuForSingleMode.isVisible === true) {
        kony.print("Start initialiseUIElementsSingleMode");
        try {
            //Set Push Notifications Icon 
            var isEnabled = kony.apps.coe.ess.KMS.isPushNotificationEnabled();
            if (isEnabled === false) {
                kony.application.getCurrentForm().imgToggleHamburgerPushNotifications.src = "button_inactive.png";
            } else {
                kony.application.getCurrentForm().imgToggleHamburgerPushNotifications.src = "button_active.png";
            }
        } catch (excp) {
            kony.print("Exception caught in kony.apps.ess.Hamburger.prototype.initialiseUIElementsSingleMode : " + JSON.stringify(excp));
        }
        kony.print("end initialiseUIElementsSingleMode");
    }
};

kony.apps.ess.Hamburger.prototype.setDataToDynamicSegment = function() {
    kony.print("----Start setDataToDynamicSegment ---------");
    var WidgetsArray = ["flxRequestType", "lblRequestType", "imgRequestType"];
    kony.apps.coe.ess.globalVariables.DynamicAppsSegment = new kony.apps.ess.DynamicSegment(kony.apps.ess.Constants.SEGUI_SINGLE_SELECT_BEHAVIOR, {}, 3, flxDynamicApps, kony.apps.ess.Hamburger.prototype.btnAppStatus, WidgetsArray);
    kony.application.getCurrentForm().flxDynamicAppsSegment.add(kony.apps.coe.ess.globalVariables.DynamicAppsSegment.getDynamicSegment());
    var processedAppData = new kony.apps.ess.Hamburger.prototype.ProcessData(listOfAvailableApps);
    kony.apps.coe.ess.globalVariables.DynamicAppsSegment.setData(processedAppData);
    kony.print("----End setDataToDynamicSegment ---------");
};
kony.apps.ess.Hamburger.prototype.btnAppStatus = function() {
    var status = kony.apps.coe.ess.globalVariables.DynamicAppsSegment.SelectedItems[0].request_type.id;
    if (status.toString().toLowerCase() !== "myleave") {
        kony.apps.ess.deepLinkingSSO.btnOtherAppsOnClick(status);
    }
};
kony.apps.ess.Hamburger.prototype.ProcessData = function(res) {
    kony.print("--start kony.apps.ess.Hamburger.prototype.ProcessData --");
    if (isEmpty(res)) {
        throw {
            "message": kony.i18n.getLocalizedString("i18n.ess.frmSettigns.ErrorMessage.Process")
        };
    }

    var ProcessedRequests = [];
    for (var index in res) {
        var TypeSpecificUi = kony.apps.ess.Hamburger.prototype.retriveTypeUi(res[index].name);
        TypeSpecificUi.request_type = res[index];
        ProcessedRequests.push(TypeSpecificUi);
    }

    kony.print("--end kony.apps.ess.Hamburger.prototype.ProcessData --");
    return ProcessedRequests;
};

kony.apps.ess.Hamburger.prototype.retriveTypeUi = function(Type) {
    kony.print("--start kony.apps.ess.Hamburger.prototype..retriveTypeUi --");
    //input validations
    if (isEmpty(Type)) {
        throw {
            "message": kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation")
        };
    }
    var TypeSpecificSkin = {
        "flxRequestType": {
            "skin": "sknFlxMob2EBAEERound"
        },
        "lblRequestType": {
            "text": Type,
            "skin": "sknLblFontffffff28pxABLTstdRoman",
            "isVisible": true
        },
        "imgRequestType": {
           "src": "expense.png"
        }
    }

    switch (Type) {
        case 'EXPENSES':
            TypeSpecificSkin.flxRequestType.skin = "sknFlxApprHamburgerTab";
            TypeSpecificSkin.lblRequestType.skin = "sknLblExpense";
            TypeSpecificSkin.lblRequestType.isVisible = true;
            TypeSpecificSkin.imgRequestType.src = "expense.png";
            break;
        case 'TIMESHEET':
            TypeSpecificSkin.flxRequestType.skin = "sknFlxApprHamburgerTab";
            TypeSpecificSkin.lblRequestType.skin = "sknLblTime";
            TypeSpecificSkin.lblRequestType.isVisible = true;
            TypeSpecificSkin.imgRequestType.src = "time.png";
            break;
        case 'APPROVALS':
            TypeSpecificSkin.flxRequestType.skin = "sknFlxApprHamburgerTab";
            TypeSpecificSkin.lblRequestType.skin = "sknlblApprovals";
            TypeSpecificSkin.lblRequestType.isVisible = true;
            TypeSpecificSkin.imgRequestType.src = "myapproval";
           break;
        case 'PROFILE':
            TypeSpecificSkin.flxRequestType.skin = "sknFlxApprHamburgerTab";
            TypeSpecificSkin.lblRequestType.skin = "sknLblProfile";
            TypeSpecificSkin.lblRequestType.isVisible = true;
            TypeSpecificSkin.imgRequestType.src = "personal.png";
            break;
        case 'PAY':
            TypeSpecificSkin.flxRequestType.skin = "sknFlxApprHamburgerTab";
            TypeSpecificSkin.lblRequestType.skin = "sknLblPay";
            TypeSpecificSkin.lblRequestType.isVisible = true;
            TypeSpecificSkin.imgRequestType.src = "mypay_inactive.png";
            break;
        default:
         
            TypeSpecificSkin.flxRequestType.skin = "sknFlxApprovalshighlighted";
            TypeSpecificSkin.lblRequestType.skin = "sknLblFontffffff28pxABLTstdRoman";
            TypeSpecificSkin.lblRequestType.isVisible = true;
            TypeSpecificSkin.imgRequestType.src = "leaveactive.png";

    }
    kony.print("--end kony.apps.ess.Hamburger.prototype.retriveTypeUi --");
    return TypeSpecificSkin;
};


