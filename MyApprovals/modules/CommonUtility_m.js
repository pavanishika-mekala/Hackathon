/*** @Author Sumeet.bartha@kony.com
 * @category UI data Binding
 * @desc  RequestedList class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Validation = kony.apps.coe.ess.Validation || {};
// %Region - Methods in Validations

kony.apps.coe.ess.Validation.checkForNull = function(stringtochk) {
    if (stringtochk === null || stringtochk === "" || stringtochk === undefined) {
        return false;
    } else
        return true;
};

/**

@Function WidgetPropertyBinding
@Param Widget,propertyJson
@Desc add the properties of the json to the widget such as skin etc
 */

kony.apps.coe.ess.WidgetPropertyBinding = function(Widget, propertyJson) {
    if (Widget && propertyJson) {
        for (var key in propertyJson) {
            if (Widget) {
                Widget[key] = propertyJson[key];
            }


        }
    }
};
/**
@Class Date
@Function GetMonthName
@Param Lang
@Desc returns monthname
 */
Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names[this.getMonth()];
};
/**
@Class Date
@Function getMonthNameShort
@Param Lang
@Desc returns month shortname
 */
Date.prototype.getMonthNameShort = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getMonth()];
};

Date.locale = {
    en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }

};
/**
@Class Date
@Function GetMonthName
@Param {string} fomatNeeded - dd - for day in 2 digit / mm - month in number format / mmm - month in short format / mmmm- full month name / yy - for year in 2 digit / yyyy - full year E.g : "ddmmm yyyy" returns 22May 1970
@Desc Adding few new methods to Date object
 */
Date.prototype.getDateInFormat = function(formatNeed) {
    var count_d = formatNeed.indexOf("d") > -1 ? formatNeed.match(/d/g).length : 0;
    var count_m = formatNeed.indexOf("m") > -1 ? formatNeed.match(/m/g).length : 0;
    var count_y = formatNeed.indexOf("y") > -1 ? formatNeed.match(/y/g).length : 0;
    var count_h = formatNeed.indexOf("h") > -1 ? formatNeed.match(/h/g).length : 0;
    var count_M = 2;
    var count_s = 2;
    var ampm = formatNeed.indexOf("am/pm");

    function pad2(n) { // always returns a string
        return (n < 10 ? '0' : '') + n;
    }
    // formatting dat
    if (count_d == 2) {
        formatNeed = formatNeed.replace("dd", pad2(this.getDate()));
    }
    //format month
    if (count_m == 2) {
        formatNeed = formatNeed.replace("mm", pad2(this.getMonth() + 1));
    } else if (count_m == 3) {
        formatNeed = formatNeed.replace("mmm", this.getMonthNameShort('en'));
    } else if (count_m == 4) {
        formatNeed = formatNeed.replace("mmmm", this.getMonthName('en'));
    }
    //format year
    if (count_y == 2) {
        formatNeed = formatNeed.replace("yy", this.getFullYear().toString().slice(2, 4));
    } else if (count_y == 4) {
        formatNeed = formatNeed.replace("yyyy", this.getFullYear());
    }
    if (ampm == -1) {
        //format Hours
        if (count_h == 2) {
            formatNeed = formatNeed.replace("hh", pad2(this.getHours()));
        }
        //format Minutes
        if (count_M == 2) {
            formatNeed = formatNeed.replace("MM", pad2(this.getMinutes()));
        }
        //format Seconds
        if (count_s == 2) {
            formatNeed = formatNeed.replace("ss", pad2(this.getSeconds()));
        }
    } else {
        if (count_h == 2) {
            var h = Number(this.getHours().toFixed()) % 12 || 12;
            formatNeed = formatNeed.replace("hh", pad2(h.toFixed()));
        }
        //format Minutes
        if (count_M == 2) {
            formatNeed = formatNeed.replace("MM", pad2(this.getMinutes()));
        }
        //format Seconds
        if (count_s == 2) {
            formatNeed = formatNeed.replace("ss", pad2(this.getSeconds()));
        }
        formatNeed = formatNeed.replace("am/pm", Number(this.getHours()).toFixed() < 12 ? "AM" : "PM");
    }
    return formatNeed;
};

/*
@Class Date
@Function days_between
@Param date -{Date} param should be instance of Date
@Desc Adding few new methods to Date objecy
@Throws Exception - if date param is wrong
 */
Date.prototype.days_between = function(date) {
    try {
        if (date === undefined || !(date instanceof Date)) {
            throw "Wrong date param";
        }
        var ONE_DAY = 1000 * 60 * 60 * 24;
        // Convert both dates to milliseconds
        var date1_ms = this.getTime();
        var date2_ms = date.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms);

        // Convert back to days and return
        kony.print("--------------EXITING - kony.apps.coe.ess.Approvals.RequestedListBackendlogic.prototype.days_between");
        return Math.round(difference_ms / ONE_DAY).toFixed();
    } catch (err) {
        alert(err);
    }
};

/*
 * @Function isEmprt
 * @Param [ANY] Variable Name
 * @Desc Function For Null Check
 */
function isEmpty(variableName) {
    var rv = true;
    if (variableName && variableName != "" && variableName.toString().toLowerCase() != "null" && variableName.toString().toLowerCase() != "nan") {
        rv = false;
    }
    return rv;
}

/*
 * @Function isEmprt
 * @Param [ANY] Variable Name
 * @Desc Function For Null Check
 */
function isEmptyOrNull(variableName) {
    return isEmpty(variableName);
}



/*
 * @Function currencyFormartting
 * @Param [Float] currencyValue 
 * @Desc returns the formatted value to displayed in the application
 */
function currencyFormartting(currencyValue) {
  kony.print("--Start currencyFormartting --");
   currencyValue=parseFloat(currencyValue);
  //input validation
  if(isEmpty(currencyValue)){
    kony.print("-- input validation failed in the currencyFormartting ");
    return;
  }
   kony.print("--End currencyFormartting --");
  return currencyValue.toFixed(2);
}

/*
 * @Function refreshCureentFormbypassingAsysncParams
 * @Param  
 * @Desc this is used to refresh the current form and update if some changes are made to the local storage database
 */
function refreshCureentFormbypassingAsysncParams(refreshType) {
	kony.print("--Start refreshCureentFormbypassingAsysnc --");  
	var cuurentForm = kony.application.getCurrentForm().id;
	if (refreshType != kony.apps.coe.ess.globalVariables.RefreshType.DataOperation) {
		//refreshing the total form because there might be some additional backend data
		var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(cuurentForm);
		formController.loadDataAndShowForm({
			"message": "Async"
		});
		return;
	}
	switch (cuurentForm) {
	case "frmApprovalHome":
		kony.apps.coe.ess.Approvals.ApprovalsHome.refreshISlaterSegment();
        kony.apps.coe.ess.Approvals.ApprovalsHome.refreshNowCount();
		break;
	default:        
		var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(cuurentForm);
		formController.loadDataAndShowForm({
			"message": "Async"
		});
	}
  	kony.print("--End refreshCureentFormbypassingAsysnc --");
}

/*
 * @Function jsonAttribtuesTOArray
 * @Param
 * @Desc this is return all the attributes available in the jsob object as a Array of key value json
 */
function jsonAttribtuesTOArray(JsonObject) {
	kony.print("-- Start jsonAttribtuesTOArray -- ");
	//Input Validation
	if (isEmpty(JsonObject)) {	
		return ;
	}
	var jsonArray = [];

	for (var key in JsonObject) {
		var attributeJson = {
			"key": key,
			"value": JsonObject[key]
		};
		jsonArray.push(attributeJson);
	}	
	kony.print("-- End jsonAttribtuesTOArray -- ");
  	return jsonArray;
}


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
/*
 * @Function isEmprt
 * @Param [ANY] Variable Name
 * @Desc Function For Null Check
 */
function isEmptyOrNull(variableName) {
    return isEmpty(variableName);
}



/*
 * @Function currencyFormartting
 * @Param [Float] currencyValue 
 * @Desc returns the formatted value to displayed in the application
 */
function currencyFormartting(currencyValue) {
  kony.print("--Start currencyFormartting --");
   currencyValue=parseFloat(currencyValue);
  //input validation
  if(isEmpty(currencyValue)){
    kony.print("-- input validation failed in the currencyFormartting ");
    return;
  }
   kony.print("--End currencyFormartting --");
  return currencyValue.toFixed(2);
}

/*
 * @Function refreshCureentFormbypassingAsysncParams
 * @Param  
 * @Desc this is used to refresh the current form and update if some changes are made to the local storage database
 */
function refreshCureentFormbypassingAsysncParams() {
  kony.print("--Start refreshCureentFormbypassingAsysnc --");
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
  formController.loadDataAndShowForm({"message":"Async"}) ;
  kony.print("--End refreshCureentFormbypassingAsysnc --");  
}
