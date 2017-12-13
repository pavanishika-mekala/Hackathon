kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.KMS = {
  storeUidString : "PushUid_Approvals",
  /**
   * Set Callbacks for Push Notification. This should be called in pre-app-init.
   */
  setPushNotificationCallbacks : function() {
    kony.print("Start - kony.apps.coe.ess.KMS.setPushNotificationCallbacks");
    var callbacksMap =  {
      onsuccessfulregistration: kony.apps.coe.ess.KMS.callbacks.registerSuccess,
      onfailureregistration: kony.apps.coe.ess.KMS.callbacks.registerFailure,
      onlinenotification: kony.apps.coe.ess.KMS.callbacks.onlineNofication,
      offlinenotification: kony.apps.coe.ess.KMS.callbacks.offlineNotification,
      onsuccessfulderegistration: kony.apps.coe.ess.KMS.callbacks.deregisterSuccess,
      onfailurederegistration: kony.apps.coe.ess.KMS.callbacks.deregisterFailure
    };
    kony.push.setCallbacks(callbacksMap);

    //Register device for first time
    if(kony.store.getItem(kony.apps.coe.ess.KMS.storeUidString) === null) {
      kony.print("No UID found. Registering for first time");
      kony.apps.coe.ess.KMS.registerPush();
    }
    kony.print("End - kony.apps.coe.ess.KMS.setPushNotificationCallbacks");
  },
  /**
   * Register Push Notifications with Google Cloud Messaging (GCM) or Apple Push Notification (APN) Providers. 
   * This function should be called once when app is installed / settings of app
   */
  registerPush : function() { 
    kony.print("Start - kony.apps.coe.ess.KMS.registerPush");
    try {     
      var config;
      //#ifdef android
      config = {senderid : "881052403649"};
      //#endif
      
      //#ifdef tabrcandroid
      config = {senderid : "881052403649"};
      //#endif
      
      //#ifdef ipad
      config = [0,1,2];
      //#endif

      //#ifdef iphone
      config = [0,1,2];
      //#endif

      kony.push.register(config);
    } catch(err) {
      //Call Error Handler
      kony.print("Exception occured while registerPush : " + JSON.stringify(err));
    }
    kony.print("End - kony.apps.coe.ess.KMS.registerPush");
  },
  /**
   * Sunscribe to Kony Messaging Services. 
   * This function should be called after successful registration with GCM or APN
   * @param {fn} successCall  Called on successful subscription
   * @param {fn} failureCall  Called on error while subscription
   */
  subscribeKMS : function(successCall,errorCall) {
    kony.print("Start - kony.apps.coe.ess.KMS.subscribeKMS");
    var deviceType;
    //#ifdef android
    deviceType = "androidgcm";
    //#endif
    
    //#ifdef tabrcandroid
    deviceType = "androidgcm";
    //#endif

    //#ifdef iphone
    deviceType = "iphone";
    //#endif
    
    //#ifdef ipad
    deviceType = "iphone";
    //#endif
    var pnsId = kony.store.getItem(kony.apps.coe.ess.KMS.storeUidString);
    if(!pnsId) {
      //Invalid PNS ID. It should be valid
      //ToDo : Toast Error Message
      kony.print("Invalid pnsUid. Trying to register device to Push Notifications provider again. Try subscribing again");
      kony.apps.coe.ess.KMS.registerPush(); //Try to Register again
      if(errorCall) {
        errorCall();
      }
      return;
    }

    var userID = kony.apps.coe.ess.frmLogin.username.toUpperCase();
    kony.sdk.getCurrentInstance().getMessagingService().register(
      deviceType,
      kony.os.deviceInfo().deviceid,
      pnsId,
      userID,
      function(res) {
        //Subscribe Success
        kony.print("Subscription to Kony Push Notification is successful : " + JSON.stringify(res) );
        if(successCall) {
          kony.print("Executiong successCall of subscribeKMS");
          successCall();
        } else {
          kony.print("No successCall is provided for subscribeKMS");
        }

      },
      function(err) {
        //Subscribe Fail
        kony.print("KMS Subscription failed : " + JSON.stringify(err));
        if(errorCall) {
          kony.print("Executiong errorCall of subscribeKMS");
          errorCall();
        } else {
          kony.print("No errorCall is provided for subscribeKMS");
        }
      }
    );
    kony.print("End - kony.apps.coe.ess.KMS.subscribeKMS");
  },
  /**
   * Unsubscribe to Kony Messaging Services. 
   * Once Unsubscribed, Device will no longer receive Notifications from Mobile Fabric KMS.
   * @param {fn} $successCall Called on successful unsubscription
   * @param {fn} $errorCall Called on error while unsubscribing
   */
  unsubscribeKMS : function(successCall,errorCall) {
    kony.print("Start - kony.apps.coe.ess.KMS.unsubscribeKMS");
    kony.sdk.getCurrentInstance().getMessagingService().unregister(function(res){
      //unsubscribeKMS Success
  
      if(successCall) {
          kony.print("Executiong successCall of unsubscribeKMS");
          successCall();
        } else {
          kony.print("No successCall is provided for unsubscribeKMS");
        }

    },function(err){
      //unsubscribeKMS Fail
      kony.print("KMS Unsubscription failed : " + JSON.stringify(err));
      if(errorCall) {
          kony.print("Executiong errorCall of unsubscribeKMS");
          errorCall();
        } else {
          kony.print("No errorCall is provided for unsubscribeKMS");
        }
    });
    kony.print("End - kony.apps.coe.ess.KMS.unsubscribeKMS");
  },
  /** Called when notification is received(online/offline). Prepares Notification Data
 	*  @param {Object} $res
 	*			Notification Data with title,body,module etc.,
 	*/
  getNotoficationData : function(res) {
    kony.print("Start - kony.apps.coe.ess.KMS.getNotoficationData");
    try{
      var notificationData = {};
      //#ifdef android
      //Android Code
      if(res["gcm.notification.title"] !== null && res["gcm.notification.title"] !== undefined){
        notificationData.title = res["gcm.notification.title"];
        notificationData.description = res["gcm.notification.body"];
        notificationData.module = res.module;
        notificationData.contextData = res.contextData;
        notificationData.msgCode = res.msgCode;
      }else if(res["title"] !== null && res["title"] !== undefined){
        notificationData.title = res["title"];
        notificationData.description = res["content"];
        notificationData.module = res.module;
        notificationData.contextData = res.contextData;
        notificationData.msgCode = res.msgCode;
      }
      //#endif
      //#ifdef tabrcandroid
      //Android Tablet Code
      if(res["gcm.notification.title"] !== null && res["gcm.notification.title"] !== undefined){
        notificationData.title = res["gcm.notification.title"];
        notificationData.description = res["gcm.notification.body"];
        notificationData.module = res.module;
        notificationData.contextData = res.contextData;
        notificationData.msgCode = res.msgCode;
      }else if(res["title"] !== null && res["title"] !== undefined){
        notificationData.title = res["title"];
        notificationData.description = res["content"];
        notificationData.module = res.module;
        notificationData.contextData = res.contextData;
        notificationData.msgCode = res.msgCode;
      }
      //#endif
      //#ifdef iphone
      //iPhone Code
      if(res["alert"]["title"] !== null && res["alert"]["title"] !== undefined){
        notificationData.title = res.alert.title;
        notificationData.description = res.alert.body;
        notificationData.module = res.module;
        notificationData.contextData = res.contextData;
        notificationData.msgCode = res.msgCode;
      }
      //#endif
      //#ifdef ipad
      //iPad Code
      if(res["alert"]["title"] !== null && res["alert"]["title"] !== undefined){
        notificationData.title = res.alert.title;
        notificationData.description = res.alert.body;
        notificationData.module = res.module;
        notificationData.contextData = res.contextData;
        notificationData.msgCode = res.msgCode;
      }
      //#endif
      kony.print("End - kony.apps.coe.ess.KMS.getNotoficationData");
      return notificationData;
    }catch(e){
      handleError(e);
    }
    

  },
  /**
   * Deregister device from GCM/APN.
   * Once Deregistered, Device will no longer receive notifications from GCM/APN
   */
  deregisterPush : function() {
    kony.print("Start - kony.apps.coe.ess.KMS.deregisterPush");
    kony.push.deRegister({});
  },
  /** Deep dropping to Sepcific form
   *  @param {Object} $res
   *			Filtered notification Data object
   */
  deepDrop : function(data) {
    try{
        kony.print("Start - kony.apps.coe.ess.KMS.deepDrop");
        kony.print("Notification Data Received for deepdroping : " + JSON.stringify(data));
        var operations = function(data) {
            //What are operations to be done after syncing
            //#ifdef ipad
            var contextData = data.contextData;
            //#endif
            //#ifdef iphone
            var contextData = data.contextData;
            //#endif
            //#ifdef android
            var contextData = JSON.parse(data.contextData);
            //#endif
            //#ifdef tabrcandroid
            var contextData = JSON.parse(data.contextData);
            //#endif
            if(data.module === "MYAPPROVAL"){
              if(contextData === undefined || contextData.id === undefined){
                  kony.print("Context Data is undefined. Cannot Deep-drop");
                  kony.application.dismissLoadingScreen();
                  return;
              }else{
                      //#ifdef android
                      kony.apps.coe.ess.KMS.deepDropForMobile(contextData.id)
                      //#endif
                      
                      //#ifdef tabrcandroid
                      kony.apps.coe.ess.KMS.deepDropForTablet(contextData.id)
                      //#endif

                      //#ifdef iphone
                      kony.apps.coe.ess.KMS.deepDropForMobile(contextData.id)
                      //#endif
                      
                      //#ifdef ipad
                      kony.apps.coe.ess.KMS.deepDropForTablet(contextData.id)
                      //#endif
              }
            }else{
              kony.print("Unknown module name:"+ + JSON.stringify(data));
              kony.application.dismissLoadingScreen();
            }
            kony.application.dismissLoadingScreen();
        };
        kony.application.showLoadingScreen("", "Syncing....!", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        if(kony.sync.isSessionInProgress === false){
            kony.apps.coe.ess.Sync.doDownload = true;
            kony.apps.coe.ess.frmLogin.manualSyncOnClick(operations.bind(this,data), function(err) {
                kony.print("Falied Sync while deepdrop : " + JSON.stringify(err));
                kony.application.dismissLoadingScreen();
                handleError(err);
            });
        }else{
            kony.print("Sync already in progress");
            operations(data);
        }
        kony.print("End - kony.apps.coe.ess.KMS.deepDrop");
    }catch(e){
        handleError(e);
    }
    
  },
  /**
   * Deep drop logic for mobile channels
   */
  deepDropForMobile: function(requestId){
    try{
        kony.print("Dropping" + JSON.stringify(requestId));
        var idQuery = "SELECT id from approval_request WHERE request_id = '" + requestId + "';"
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", idQuery, function(res){
          kony.print("inside deepDropForMobile success::"+JSON.stringify(res));
          kony.application.dismissLoadingScreen();
          if(res[0] !== undefined && res[0] !== null && res[0] !== ""){
            var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalRequestDetail");
          	formController.loadDataAndShowForm(res[0].id);
          }
        }, function(err){
          kony.print("Error fetching id"+ JSON.stringify(err));
          handleError(err);
        });
      }catch(e){
        handleError(e);
    }
  },
  /**
   * Deep drop logic for Tablet channels
   */
  deepDropForTablet: function(requestId){
    try{
        kony.print("Dropping" + JSON.stringify(requestId));
      	var idQuery = "SELECT id from approval_request WHERE request_id = '" + requestId + "';"
        kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", idQuery, function(res){
          kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex = res[0].id
          var query_data = {};
          query_data.requestType = [];
          query_data.statusType = [];
          query_data.totalPeoples = [];
          //frmViewFilterHistory.flexCriterisData.dateval.txt = "-";
          //frmViewFilterHistory.flexCriterisData.reqval.txt = "-";
          //frmViewFilterHistory.flexCriterisData.statusval.txt = "-";
          //frmViewFilterHistory.segMentListView.height = "100%";
          var historyTabObject = new kony.apps.coe.ess.ApprovalHistoryTab();
          historyTabObject.filterData(query_data, historyTabObject.filterApplyQuerySuccess.bind(this, "apply"));
          kony.application.dismissLoadingScreen();
        }, function(err){
          kony.print("Error fetching id"+ JSON.stringify(err));
          handleError(err);
        });
        
        // kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex = requestId;
        
    }catch(e){
      kony.print("Error inside deepDropForTablet::"+e);
        handleError(e);
    }
    
  },
  /**
   * Returns true if device is subscribed for Push Notifications
   */
  isPushNotificationEnabled : function() {
    kony.print("Start -- isPushNotificationEnabled");
    var isEnabled = kony.store.getItem("ENABLE_PUSH");
    if(isEnabled) {
      kony.print("End -- isPushNotificationEnabled - Returned TRUE");
      return true;
    } else {
      kony.print("End -- isPushNotificationEnabled - Returned FALSE");
      return false;
    }
  },
  /**
   * Enables Push Notifications by Subscribing to KMS
   * @param {fn} $successCall Called on successful subscription
   * @param {fn} $failureCall Called on error while subscription to KMS
   */
  enablePushNotifications : function(successCall,failureCall) {
    kony.print("Start -- enablePushNotifications");
    var onEnableSuccess = function() {
      kony.store.setItem("ENABLE_PUSH", true);
      if(successCall) {
        successCall();
      }
    };
    this.subscribeKMS(onEnableSuccess,failureCall);
    kony.print("End -- enablePushNotifications");
  },
  /**
   * Disables Push Notifications by Unsubscribing to KMS
   * @param {fn} $successCall Called on successful unsubscription
   * @param {fn} $failureCall Called on error while unsubscription to KMS
   */
  disablePushNotifications : function(successCall,failureCall) {
    kony.print("Start -- disablePushNotifications");
    var onDisableSuccess = function() {
      kony.store.setItem("ENABLE_PUSH", false);
      if(successCall) {
        successCall();
      }
    };
    this.unsubscribeKMS(onDisableSuccess,failureCall);
    kony.print("End -- disablePushNotifications");
  }
};

kony.apps.coe.ess.KMS.callbacks = {
  /**
   * Called on Successful Registration with GCM / APN. 
   * @param {string} $tokenID 
   *				UniqueID returned by GCM / APN on registration
   */
  registerSuccess : function(tokenID) {
    //We can store tokenID in device for future subscription
    kony.print("Push Notifications Registration is successful : " + JSON.stringify(tokenID));
    kony.store.setItem(kony.apps.coe.ess.KMS.storeUidString,tokenID);
    //kony.apps.coe.ess.KMS.subscribeKMS();
  },
  /**
   * Error callback of Registration with GCM / APN
   * @param {Object} $err 
   *				Cause of error 
   */
  registerFailure : function(err) {
    kony.print("Push Notifications registration is failed : " + JSON.stringify(err));
  },
  /**
   * Success callback of Deegistration with GCM / APN
   * @param {Object} $res 
   */
  deregisterSuccess : function(res) {
    kony.print("Push Notifications Deregistrations is successful : " + JSON.stringify(res));
  },
  /**
   * Error callback of Deregistration with GCM / APN
   * @param {Object} $err 
   *				Cause of error 
   */
  deregisterFailure : function(err) {
    kony.print("Push Notifications Deregistrations is failed : " + JSON.stringify(err));
  },
  /**
   * When device is foreground & notification is recieved, This callback is triggered
   * @param {Object} $res
   *				Notification data/payload sent by KMS
   */
  onlineNofication : function(res) {
      var data = kony.apps.coe.ess.KMS.getNotoficationData(res);
      var translatedText = kony.i18n.getLocalizedString(data.msgCode.toString());
      if(translatedText !== null && translatedText !== undefined){
        var descrToSet = translatedText;
      }else{
        var descrToSet = data.description;
      }
    var alertHandler = function(okClicked) {
     
      if(okClicked) {
        kony.print("#### Show button is clicked on Notification Alert");
        kony.apps.coe.ess.KMS.deepDrop(data);
      } else {
        kony.print("#### Cancel button is clicked on Notification Alert");
      }
    };
    var alertUI = kony.ui.Alert({
      "message": descrToSet,
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": data.title,
      "yesLabel": "Show",
      "noLabel": "Cancel",
      "alertIcon": "",
      "alertHandler": alertHandler
    },{});
    
  },
  /**
   * When device is backgound / off & notification is recieved, This callback is triggered
   * @param {Object} $res
   *				Notification data/payload sent by KMS
   */
  offlineNotification : function(res) {
    //ToDo : Issue with Functional Modules - App Crashes as most of modules are not loaded on startup
    //Uncomment following two lines after fixing that issue

    //var data = kony.apps.coe.ess.KMS.getNotoficationData(res);
    //kony.apps.coe.ess.KMS.deepDrop(data);
    kony.store.setItem("kony.MYAPPROVALS.latestNotificationData", res);
  },
  /**
   * shows notification data stored in storage
   */
  fetchAndShowOfflineNotificationData: function(){
    var notificationData = kony.store.getItem("kony.MYAPPROVALS.latestNotificationData");
    if(notificationData !== null && notificationData !== undefined &&  notificationData !== "" ){
      this.onlineNofication(notificationData);
      kony.store.removeItem("kony.MYAPPROVALS.latestNotificationData");
    }else{
      return;
    }
    
  }
};



