/*** @Author Sumeet.bartha
 * @category Business Logic / Action
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.locale = kony.apps.coe.ess.locale || {};

kony.apps.coe.ess.locale.getSelectedLocale = function(currentLocale){
   var device = kony.apps.coe.ess.locale.checkDevice();
  if(device == "iOS"){
    if(currentLocale.length > 1){
      currentLocale = currentLocale.split("-");
      return kony.apps.coe.ess.locale.getCurrentLocale(currentLocale[0]);
    }
  }
  if(device == "Android"){
    if(currentLocale["language"].length > 1){
      return kony.apps.coe.ess.locale.getCurrentLocale(currentLocale["language"]);
    }
  }
};

kony.apps.coe.ess.locale.checkDevice = function(){
		var deviceType = "";
		//#ifdef iphone
			deviceType = "iOS";
		//#endif
		//#ifdef ipad
			deviceType = "iOS";
		//#endif
		//#ifdef tabrcandroid
			deviceType = "Android";
		//#endif
		//#ifdef android
			deviceType = "Android";
		//#endif
		return deviceType;
	};

kony.apps.coe.ess.locale.setLocaleInformation = function(currentLocale,successCallback,failureCallback){
  var setLocale = "";
  setLocale = kony.apps.coe.ess.locale.getSelectedLocale(currentLocale);
  kony.i18n.setCurrentLocaleAsync(setLocale, function(){kony.print("Success in setting locale");}, function(){kony.print("Error in setting locale");}, null);
};

kony.apps.coe.ess.locale.getCurrentLocale = function(currentLocale){
  var setCurrentLocale = "";	
  switch(currentLocale) 
  {
    case "en" : 
      setCurrentLocale = "en";
      break;
    case "nl"  :
      setCurrentLocale = "nl_BE";
      break;
    case "fr"  :
      setCurrentLocale = "fr_BE";
      break;
    default : 
      setCurrentLocale = "en";
      break;
  }
  return setCurrentLocale;
};

kony.apps.coe.ess.locale.getLocaleInformation = function(){
  var _localeInformation=kony.store.getItem("localeToBeSet");
  if (_localeInformation!==null) {
    var localInfo=_localeInformation;
    kony.i18n.setCurrentLocaleAsync(localInfo, function(){
    kony.print("Success in setting locale");}, function(){kony.print("Error in setting locale");}, null);
    return localInfo;
  }
  else{ 
    return kony.apps.coe.ess.locale.setLocaleInformation(kony.i18n.getCurrentDeviceLocale());
  }
};
kony.apps.coe.ess.locale.setLanguageServiceLocale= function(){
  var sqlquery = "select * from languageConfiguration where okta_user_id = '" + kony.apps.coe.ess.frmLogin.username.toUpperCase() + "'";
  kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
    if (data.length > 0 && data !== undefined && data[0].language !== undefined) {
      kony.print("update locale"+kony.i18n.getCurrentLocale().substring(0, 2));
      var date1= new Date();
      var timestamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());
      com.kony.NotificationsLanguageService.languageConfiguration.update("WHERE okta_user_id = \'" + kony.apps.coe.ess.frmLogin.username.toUpperCase() + "\' ", {
        "language": "" + kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase(),
        "lastmodifiedts":timestamp
      },
                                                                         function(res) {
        kony.print("------------  in update success response of notification language service :" + JSON.stringify(res));
      },
                                                                         function(err) {
        kony.print("------------  in update failure response of notification language service :" + JSON.stringify(err));
      },true);
    }else{
      var date1= new Date();
      var timestamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());
      var languageData={"okta_user_id":kony.apps.coe.ess.frmLogin.username.toUpperCase(),"language":kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase(),"lastmodifiedts":timestamp};
      kony.apps.coe.ess.MVVM.createRecord("NotificationsLanguageService", "languageConfiguration", languageData, function(res) {
        kony.print("------------ in create success response  of notification language service:" + JSON.stringify(res));
      }, function(err) {
        kony.print("------------  in create failure response  of notification language service:" + JSON.stringify(err));
      },true);
    }
  }, function(err) {
    handleError(err);
  }, false);
};

kony.apps.coe.ess.locale.notificationLanguageServiceLocale=function(){
  var objSvc = kony.sdk.getCurrentInstance().getObjectService("NotificationsLanguageService", {"access":"online"});
  var dataObject = new kony.sdk.dto.DataObject("languageConfiguration");
  var odataUrl = "$filter=okta_user_id eq "+kony.apps.coe.ess.frmLogin.username.toUpperCase();
  dataObject.odataUrl = odataUrl;
  var options = {"dataObject":dataObject};

  objSvc.fetch(options,
               function(res){kony.print("record::" + JSON.stringify(res["records"]));
                             var date1= new Date();
                             var timestamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());
                             if(res["records"].length > 0){
                               kony.print("soumya lan"+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase());
                               var updateService = kony.sdk.getCurrentInstance().getObjectService("NotificationsLanguageService", {"access":"online"});
                               var dataObjectUpdate = new kony.sdk.dto.DataObject("languageConfiguration");
                               dataObjectUpdate.addField("language",kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase());
                               dataObjectUpdate.addField("lastmodifiedts",timestamp);
                               dataObjectUpdate.addField("okta_user_id",kony.apps.coe.ess.frmLogin.username.toUpperCase());
                               var optionsUpdate = {"dataObject":dataObjectUpdate};

                               updateService.update(optionsUpdate,
                                                    function(res){kony.print("Record updated");},
                                                    function(err){kony.print("Error in record update"+JSON.stringify(err));}
                                                   );
                             }else{
                               kony.print("soumya lan 1111 "+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase());
                               var createService = kony.sdk.getCurrentInstance().getObjectService("NotificationsLanguageService", {"access":"online"});
                               var dataObjectCreate = new kony.sdk.dto.DataObject("languageConfiguration");
                               dataObjectCreate.addField("language",kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase());
                               dataObjectCreate.addField("lastmodifiedts",timestamp);
                               dataObjectCreate.addField("okta_user_id",kony.apps.coe.ess.frmLogin.username.toUpperCase());
                               var optionsCreate = {"dataObject":dataObjectCreate};

                               createService.create(optionsCreate,
                                                    function(res){kony.print("Record created");},
                                                    function(err){kony.print("Error in record creation"+JSON.stringify(err));
													 alert("unable to set the language in notification service");
													}
                                                   );
                             }
                            },
               function(err){kony.print("Failed to fetch : " + JSON.stringify(err));}
              );

}

function getTimeHourswithZero(data){
  if(parseInt(data) < 10){
    return "0"+data;
  }else{
    return data;
  }
} 