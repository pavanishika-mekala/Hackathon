/** 
 *  @author     Karthik.Cherukuri
 *  @category   UI design.	
 *  @desc       
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.
ViewTimeSheet = function() {
    kony.print("-- Start ViewTimeSheet --");
    kony.print("-- End ViewTimeSheet --");
};


/**
 * @function - showViewTimeSheetForm
 * @params	-none
 * @returns	-none.
 * @desc	-This function is used to get the data from backend by executing query
 */


kony.apps.coe.ess.myTime.ViewTimeSheet.PreviousForm = {
    previousForm : null,
    set : function(form) {
        if(form !== frmAuditTrail) {
            this.previousForm = form;
        }
    },
    show : function() {
        if(this.previousForm !== null && this.previousForm !== undefined) {
            this.previousForm.show();
        }
    }
};

kony.apps.coe.ess.myTime.ViewTimeSheet.prototype.
showViewTimeSheetForm = function() {
    kony.print("-- Start showViewTimeSheetForm --");
    var navObj = new kony.sdk.mvvm.NavigationObject();
    var qp = {
        "timesheetId": kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId
    };
    navObj.setQueryParams("groupTimeEntry", qp);
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmViewTimeSheet");
    formController.loadDataAndShowForm(navObj);
    kony.print("-- End showViewTimeSheetForm --");
};