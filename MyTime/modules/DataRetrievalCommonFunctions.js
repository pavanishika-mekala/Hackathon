kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions = function() {
    
};

kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions.getInstance = function() {
    try {
        if(kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions.singletonObj !== undefined) {
            return kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions.singletonObj;
        }
        kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions.singletonObj = new kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions();
        return kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions.singletonObj;
    } catch(err) {
        handleError(err);
    }
};

kony.apps.coe.ess.myTime.DataRetrievalCommonFunctions.prototype.getWeekEndsDatesBetweenTwoDates = function(startDateObj, endDateObj, successCallback, errorCallback) {
    try {
        if(startDateObj === null || startDateObj === undefined || !startDateObj instanceof Date) {
            throw kony.i18n.getLocalizedString("i18n.ess.throwExceptionStartDateObj");
        }
        if(endDateObj === null || endDateObj === undefined || !endDateObj instanceof Date) {
            throw kony.i18n.getLocalizedString("i18n.ess.throwExceptionEndDateObj");
        }
        var query="select h.Holiday_Date as date from Holiday h where h.Type = '3' AND Holiday_Date between " + startDateObj.toYYYYMMDD("") + " AND " + endDateObj.toYYYYMMDD("") + "";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, successCallback, errorCallback);
    } catch(err) {
        handleError(err);
    }
};