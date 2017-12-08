/*** @Author Sumeet.bartha
 * @category UI 
 * @desc  Common Validation Class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Validation = kony.apps.coe.ess.Validation || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
// %Region - Methods in Validations
/**
 * @member of  frmleaveCalendarUI
 * @param {String} checkForSpecialChar - callbackfunction of buttons.
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called to create th ebuttons for setting the calendar
 */
kony.apps.coe.ess.Validation.checkForNull = function(stringtochk) {
    if (stringtochk === null || stringtochk === "" || stringtochk === undefined) {
        return false;
    } else
        return true;
};

kony.apps.coe.ess.myTime.dbDateStringToDateObj = function (dateString) {
		return new Date(dateString.substring(0, 4), parseInt(dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
};


/**
 * @Desc - This method is used to set channel type (like rc or thin client)
 */
kony.apps.coe.ess.Validation.setChannel = function (){
  	
	kony.print("Validation : setChannel : start ");
  	
  	kony.apps.coe.ess.Validation.isNativeChannel = false;
  	kony.apps.coe.ess.Validation.isTablet = false;
  
 	var devInfo =  kony.os.deviceInfo()	;
  	if (devInfo.name === "thinclient" ){
      	kony.apps.coe.ess.Validation.isNativeChannel = false;
    }else{
      
		//#ifdef ipad
        	kony.apps.coe.ess.Validation.isTablet = true;
        //#endif
		//#ifdef windows8
        	kony.apps.coe.ess.Validation.isTablet = true;
        //#endif
        //#ifdef tabrcandroid
        	kony.apps.coe.ess.Validation.isTablet = true;
        //#endif
      
      	kony.apps.coe.ess.Validation.isNativeChannel = true;
     
    }

  	kony.print("Validation : setChannel : end ");
  
}
