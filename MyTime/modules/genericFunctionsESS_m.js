/*** @Author saipavan.jamboju@kony.com
 * @category Business Logic / Action
 * @desc genericFunctions
 * @ © 2016 kony Inc. */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.genericFunctions = function() {};

/**
 * @function getCurrencySymbol
 * Sets currency symbol of current location to input label
 * Params : widgetname (Formname.widgetname)
 * Return type : None
 */
kony.apps.coe.ess.genericFunctions.prototype.getCurrencySymbol = function() {
    var codeToSymbol={"NZ":"$","CK":"$","NU":"$","PN":"$","TK":"$","AU":"$","CX":"$","CC":"$","HM":"$","KI":"$","NR":"$","NF":"$","TV":"$","AS":"€","AD":"€","AT":"€","BE":"€","FI":"€","FR":"€","GF":"€","TF":"€","DE":"€","GR":"€","GP":"€","IE":"€","IT":"€","LU":"€","MQ":"€","YT":"€","MC":"€","NL":"€","PT":"€","RE":"€","WS":"€","SM":"€","SI":"€","ES":"€","VA":"€","GS":"£","GB":"£","JE":"£","IO":"$","GU":"$","MH":"$","FM":"$","MP":"$","PW":"$","PR":"$","TC":"$","US":"$","UM":"$","VG":"$","VI":"$","HK":"HK$","CA":"$","JP":"¥","AF":"؋","AL":"lek","DZ":"جد","AI":"EC$","AG":"EC$","DM":"EC$","GD":"EC$","MS":"EC$","KN":"EC$","LC":"EC$","VC":"EC$","AR":"$","AM":"֏","AW":"ƒ","AN":"ƒ","AZ":"ман","BS":"B$","BH":".د.ب","BD":"Tk","BB":"$","BY":"р","BZ":"BZ$","BJ":"CFA","BF":"CFA","GW":"CFA","CI":"CFA","ML":"CFA","NE":"CFA","SN":"CFA","TG":"CFA","BM":"$","BT":"₹","IN":"₹","BO":"$b","BW":"P","BV":"kr","NO":"kr","SJ":"kr","BR":"R$","BN":"$","BG":"лв","BI":"FBu","KH":"៛","CM":"CFA","CF":"CFA","TD":"CFA","CG":"CFA","GQ":"CFA","GA":"CFA","CV":"$","KY":"$","CL":"$","CN":"¥","CO":"$","KM":"CF","CD":"FC","CR":"₡","HR":"kn","CU":"₱","CY":"€","CZ":"Kč","DK":"kr","FO":"kr","GL":"kr","DJ":"fdj","DO":"$","TP":"Rp","ID":"Rp","EC":"S/.","EG":"E£","SV":"₡","ER":"ብር","ET":"ብር","EE":"ብር","FK":"£F","FJ":"$","PF":"₣","NC":"₣","WF":"₣","GM":"D","GE":"ლ","GI":"£","GT":"Q","GN":"Fr","GY":"GY$","HT":"G","HN":"L","HU":"Ft","IS":"Íkr","IR":"﷼","IQ":"ع.د","IL":"₪","JM":"$","JO":"ينار","KZ":"₸","KE":"/=","KP":"₩","KR":"₩","KW":"د.ك","KG":"som","LA":"₭","LV":"Ls","LB":"ل.ل","LS":"L","LR":"L$","LY":"ل.د","LI":"Fr","CH":"Fr","LT":"Lt","MO":"MOP$","MK":"ден","MG":"Ar","MW":"MK","MY":"Rm","MV":"Rf","MT":"₤","MR":"UM","MU":"₨","MX":"Mex$","MD":"MDL","MN":"₮","MA":"MAD","EH":"MAD","MZ":"MT","MM":"K","NA":"$","NP":"₹","NI":"C$","NG":"₦","OM":"ر.ع.","PK":"Rp","PA":"B/.","PG":"K","PY":"₲","PE":"S/","PH":"₱","PL":"zł","QA":"ر.ق","RO":"lei","RU":"₽","RW":"FRw","ST":"STD","SA":"﷼","SC":"SRe","SL":"Le","SG":"S$","SK":"Sk","SB":"SI$","SO":"Sh.So","ZA":"R","LK":"රු","SD":"ج.س","SR":"$","SZ":"L","SE":"kr","SY":"SYP","TW":"NT$","TJ":"TJS","TZ":"TSh","TH":"฿","TO":"T$","TT":"TT$","TN":"د.ت","TR":"₺","TM":"T","UG":"USh","UA":"₴","AE":"\tد.إ","UY":"$U","UZ":"лв","VU":"VT","VE":"Bs.F","VN":"₫","YE":"﷼","ZM":"ZK","ZW":"$","AX":"€","AO":"Kz","AQ":"A$","BA":"pf","GH":"GH₵","GG":"£","IM":"£","ME":"€","PS":"JOD","BL":"€","SH":"£","MF":"ƒ","PM":"€","RS":"РСД","USAF":"$"};
    var symbol = "";
    try {
        var locale = kony.i18n.getCurrentDeviceLocale();
        if (typeof(locale) === "object") {
            symbol = codeToSymbol[locale.country];
        } else if (typeof(locale) === "string") {
            symbol = codeToSymbol[locale.substr(locale.length - 2)];
        }
    } catch (i18nerr) {
        handleError(i18nerr);
    }
    return symbol;
};

/**
 * @function maskString
 * Avoids masking of characters from the startindex to numberofchars specified
 * Params : inputString,startindex (0 for beginning,-1 for ending),numberOfCharsToNotMask
 * Return type : String(Masked)
 */
kony.apps.coe.ess.genericFunctions.prototype.maskString = function(inputString, startIndex, numberOfCharsNotToMask) {
    var endIndex = startIndex + numberOfCharsNotToMask - 1;
    var strlen = inputString.length;
    if (numberOfCharsNotToMask <= 0) {
        return inputString;
    }
    if (startIndex >= 0 && startIndex < strlen) {

        for (i = 0; i < strlen; i++) {
            if (inputString[i] === ' ' && i < startIndex - 1) {
                startIndex++;
                endIndex++;
                continue;
            }
            if (i >= startIndex && i <= endIndex) {
                if (inputString[i] === ' ') {
                    endIndex++;
                }
            } else {
                if (inputString[i] === ' ') {
                    continue;
                }
                inputString = inputString.replaceAt(i, 'X');
            }

        }
    } else if (startIndex < 0 && numberOfCharsNotToMask > 1) {
        endIndex = strlen + startIndex;
        startIndex = endIndex - numberOfCharsNotToMask + 1;
        for (i = strlen - 1; i >= 0; i--) {
            if (inputString[i] === ' ' && i > endIndex) {
                startIndex--;
                endIndex--;
                continue;
            }
            if (i >= startIndex && i <= endIndex) {
                if (inputString[i] === ' ') {
                    startIndex--;
                }
            } else {
                if (inputString[i] === ' ') {
                    continue;
                }
                inputString = inputString.replaceAt(i, 'X');
            }
        }
    }
    return inputString;
};

/* 
 * @function formatPhoneNumber
 * Formats phone number by splitting it
 * Params : phoneNumber
 * Return type : String
 ****Set phoneNumber split String (Ex : phoneNumber :"3,3,4,0" or "3,10" in appconfig)
 */
kony.apps.coe.ess.genericFunctions.prototype.formatPhoneNumber = function(phoneNumber) {
    var split = kony.apps.coe.ess.appconfig.phoneNumber.split(","); //set phoneNumber Split string in appconfig
    if (split.some(isNaN)) {
        alert("Enter correct split string");
        return "";
    }
    var newPhoneNumber = "";
    var counter = 0;
    var remainingNumber = 0;
    phoneNumber = phoneNumber.replace(/ /g, '');
    var strlen = phoneNumber.length;
    for (var loopCounter = 0; loopCounter < split.length; loopCounter++) {
        split[loopCounter] = parseInt(split[loopCounter], 10);
    }
    for (var loopCounter = 0; loopCounter < strlen && split.length <= 4; loopCounter++) {
        if ((loopCounter === remainingNumber + split[counter] - 1)) {
            newPhoneNumber = newPhoneNumber + phoneNumber.substring(remainingNumber, loopCounter + 1) + " ";
            remainingNumber = loopCounter + 1;
            counter++;
        }
    }
    if (remainingNumber - 1 < strlen) {
        newPhoneNumber = newPhoneNumber + phoneNumber.substring(remainingNumber, strlen);
    }
    return (newPhoneNumber.trim());
};

/*
 * @function replaceAt
 * Replaces character at given index
 * Params : index,character
 * Return type : String
 */
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

/*
 * @function titleCase
 * Converts string to Title Case
 * Params : none
 * Return type : String
 */
String.prototype.titleCase = function() {
    var str = this
    var newstr = str.split(" ");
    for(i=0;i<newstr.length;i++){
        if(newstr[i] == "") continue;
        var copy = newstr[i].substring(1).toLowerCase();
        newstr[i] = newstr[i][0].toUpperCase() + copy;
    }
    newstr = newstr.join(" ");
    return newstr;
}