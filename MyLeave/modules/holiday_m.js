//-----------------------------------File Header -------------------------------------------------
/**
 * @module Holiday
 * @Author Waseem Ahmed
 * @category non UI
 * @desc HolidayUI class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.
Holiday = function() {
    kony.print("-- Start Holiday --");
    kony.print("-- End Holiday --");
};

/**
 * @function showHolidayForm
 * @member of HolidayUI#
 * @return - {void}
 * @description - code that initiates the service call to get the data required for the holidayList form
 */
kony.apps.coe.ess.myLeave.
Holiday.showHolidaysForm =
    function() {
        kony.print("-- Start showHolidaysForm --");
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmHolidays");
        formController.loadDataAndShowForm();
        kony.print("-- End showHolidaysForm --");
    };