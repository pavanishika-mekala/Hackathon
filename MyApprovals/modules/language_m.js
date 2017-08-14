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
  var deviceInfo = kony.os.deviceInfo();
  if(deviceInfo.name == "android"){
    if(currentLocale["language"].length > 1){
      return kony.apps.coe.ess.locale.getCurrentLocale(currentLocale["language"]);
    }
  }
  if(deviceInfo.name == "iphone" ||deviceInfo.name == "ipad"){
    if(currentLocale.length > 1){
      currentLocale = currentLocale.split("-");
      return kony.apps.coe.ess.locale.getCurrentLocale(currentLocale[0]);
    }
  }
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
  kony.print("_localeInformation : "+_localeInformation+typeof(_localeInformation));
  if (_localeInformation!==null) {
    var localInfo=_localeInformation;
    kony.print("localInfo: "+localInfo+typeof(localInfo));
    kony.i18n.setCurrentLocaleAsync(localInfo, function(){
      kony.print("Success in setting locale");}, function(){kony.print("Error in setting locale");}, null);
    return localInfo;
  }
  else{ 
    return kony.apps.coe.ess.locale.setLocaleInformation(kony.i18n.getCurrentDeviceLocale());
  }
};