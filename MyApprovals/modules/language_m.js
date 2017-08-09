/*** @Author Sumeet.bartha
 * @category Business Logic / Action
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.locale = kony.apps.coe.ess.locale || {};

kony.apps.coe.ess.locale.setLocaleInformation = function(currentLocale,successCallback,failureCallback){
  var setLocale = "";
  var deviceInfo = kony.os.deviceInfo();
  if(deviceInfo.name == "android"){
    if(currentLocale["language"].length > 1){
      //setLocale = currentLocale["language"]+"_"+currentLocale["country"];
      setLocale = kony.apps.coe.ess.locale.getCurrentLocale(currentLocale["language"]);
    }
  }
  if(deviceInfo.name == "iphone" ||deviceInfo.name == "ipad"){
    if(currentLocale.length > 1){
      currentLocale = currentLocale.split("-");
      //setLocale = currentLocale[0]+"_"+currentLocale[1];
      setLocale = kony.apps.coe.ess.locale.getCurrentLocale(currentLocale[0]);	
    }
  }
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
      setCurrentLocale = "fr_FR";
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
    kony.i18n.setCurrentLocaleAsync(localInfo, function(){kony.print("Success in setting locale");}, function(){kony.print("Error in setting locale");}, null);
    return localInfo;
  }
  else{ 
    return kony.apps.coe.ess.locale.setLocaleInformation(kony.i18n.getCurrentDeviceLocale());
  }
};