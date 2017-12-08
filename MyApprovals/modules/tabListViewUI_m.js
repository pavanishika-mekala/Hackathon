kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myExpense = kony.apps.coe.ess.myExpense || {};

// Region - Class / object constructor. 
/**
 * @class reportListUI
 * this class for frmTabDashboardReport
 * this class for UI operations in the frmTabDashboardReport
 */

kony.apps.coe.ess.myExpense.tabListViewUI = function() {
    // kony.apps.coe.ess.myExpense.tabListViewUI.report_id = kony.apps.coe.ess.myExpense.reportListUI.tempData;
};

kony.apps.coe.ess.myExpense.tabListViewUI.prototype.ApplyGestureandSwipeAnimation = function() {
    var swipeOnCard = {
        fingers: 1,
        swipedistance: 50,
        swipeVelocity: 60
    };
    flxTemp.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, swipeOnCard, this.swipeCallback.bind(this));
    kony.print("-- End applyGestureForTaxStmtSegment --");
};

/*
 *@function
 *@class	:	reportListUI
 * @param    :  {Array} data - Data to be set to segment.
 *@returns	:	None
 *@desc		:	shifts the skin of the selected button
 */
kony.apps.coe.ess.myExpense.tabListViewUI.prototype.swipeCallback = function(commonWidget, gestureInfo) {
    kony.print("-- Start segmentRowSwipeCallBack --");
    var swipedDirection = gestureInfo.swipeDirection;

    if (swipedDirection === 1) {
        this.swipeanimation(commonWidget, 70);
    }
    else if (swipedDirection === 2) {
        this.swipeanimation(commonWidget, 100);
    }
    kony.print("-- End segmentRowSwipeCallBack --");
};

/*
 *@function
 *@class	:	reportListUI
 * @param    :  {Array} data - Data to be set to segment.
 *@returns	:	None
 *@desc		:	shifts the skin of the selected button
 */
kony.apps.coe.ess.myExpense.tabListViewUI.prototype.swipeanimation = function(widget, leftValue) {
    widget.flxMenu.animate(
        kony.ui.createAnimation({
            "100": {
                "left": leftValue + "%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.3
        }, {
            "animationEnd": function() {}
        });

};

/*
 *@function
 *@class	:	reportListUI
 *@param    :   None
 *@returns	:	None
 *@desc		:	code executed on click of overView Button
 */
kony.apps.coe.ess.myExpense.tabListViewUI.prototype.flxOverViewOnClick = function(value) {
    var frmobj;
    if (value) {
    frmobj = value;
    }
    else {
        frmobj = kony.application.getCurrentForm();
        frmobj.flxOverview.skin = "sknTabFlxRoundffffff";
        frmobj.flxAttachments.skin = "slFbox";
        frmobj.flxFulldetails.skin = "slFbox";
        frmobj.flxAuditTrail.skin = "slFbox";
        frmobj.lblOverview.skin = "sknTabLblWhiteffffff";
        frmobj.lblAttachments.skin = "sknLbl074A52Roman32px";
        frmobj.lblFullDetails.skin = "sknLbl074A52Roman32px";
        frmobj.lblAuditTrail.skin = "sknLbl074A52Roman32px";
        frmobj.flxStatusTraffic.setVisibility(true);
        frmobj.lblStatusTraffic.setVisibility(true);
        frmobj.flexPdf.setVisibility(true);
        frmobj.flxAudit.setVisibility(false);
        frmobj.flxAttachment.setVisibility(false);
        frmobj.flxFullDetail.setVisibility(false);
        frmobj.flxOverViewDetail.setVisibility(true);
        frmobj.flxButtons.setVisibility(true);
        //making the footer and the comments visiblity on or off based on the status of the request
        if (kony.apps.coe.ess.Approvals.getApprovalsRequestList.StatusId == 2) {
            //status of  the request is pending
            frmobj.flxStatusTraffic.setVisibility(true);
            frmobj.lblStatusTraffic.setVisibility(true);
            frmobj.flxDecision.setVisibility(true);
            frmobj.flxButtons.setVisibility(true);

        }
        else {
            //status of the request is not pending
            frmobj.flxStatusTraffic.setVisibility(false);
            frmobj.lblStatusTraffic.setVisibility(false);
            frmobj.flxDecision.setVisibility(false);
            frmobj.flxButtons.setVisibility(false);

        }
    }
};


/*
 *@function
 *@class	:	reportListUI
 *@param    :   None
 *@returns	:	None
 *@desc		:	code executed on click of Full Details Button
 */
kony.apps.coe.ess.myExpense.tabListViewUI.prototype.flxFullDetailsOnClick = function() {
    var frmobj = kony.application.getCurrentForm();
    frmobj.flxOverview.skin = "slFbox";
    frmobj.flxAttachments.skin = "slFbox";
    frmobj.flxFulldetails.skin = "sknTabFlxRoundffffff";
    frmobj.flxAuditTrail.skin = "slFbox";
    frmobj.lblOverview.skin = "sknLbl074A52Roman32px";
    frmobj.lblAttachments.skin = "sknLbl074A52Roman32px";
    frmobj.lblFullDetails.skin = "sknTabLblWhiteffffff";
    frmobj.lblAuditTrail.skin = "sknLbl074A52Roman32px";
    frmobj.flxStatusTraffic.setVisibility(false);
    frmobj.lblStatusTraffic.setVisibility(false);
    frmobj.flexPdf.setVisibility(false);
    frmobj.flxAudit.setVisibility(false);
    frmobj.flxAttachment.setVisibility(false);
    frmobj.flxFullDetail.setVisibility(true);
    frmobj.flxOverViewDetail.setVisibility(false);
    frmobj.flxButtons.setVisibility(false);
};
/*
 *@function
 *@class	:	reportListUI
 *@param    :   None
 *@returns	:	None
 *@desc		:	code executed on click of Audit Trail Button
 */
kony.apps.coe.ess.myExpense.tabListViewUI.prototype.flxAuditTrailOnClick = function() {
    var frmobj = kony.application.getCurrentForm();
    frmobj.flxOverview.skin = "slFbox";
    frmobj.flxAttachments.skin = "slFbox";
    frmobj.flxFulldetails.skin = "slFbox";
    frmobj.flxAuditTrail.skin = "sknTabFlxRoundffffff";
    frmobj.lblOverview.skin = "sknLbl074A52Roman32px";
    frmobj.lblAttachments.skin = "sknLbl074A52Roman32px";
    frmobj.lblFullDetails.skin = "sknLbl074A52Roman32px";
    frmobj.lblAuditTrail.skin = "sknTabLblWhiteffffff";
    frmobj.flxStatusTraffic.setVisibility(false);
    frmobj.lblStatusTraffic.setVisibility(false);
    frmobj.flexPdf.setVisibility(false);
    frmobj.flxAudit.setVisibility(true);
    frmobj.flxAttachment.setVisibility(false);
    frmobj.flxFullDetail.setVisibility(false);
    frmobj.flxOverViewDetail.setVisibility(false);
    frmobj.flxButtons.setVisibility(false);
};
/*
 *@function
 *@class	:	reportListUI
 *@param    :   None
 *@returns	:	None
 *@desc		:	code executed on click of Attachments Button
 */
kony.apps.coe.ess.myExpense.tabListViewUI.prototype.flxAttachementsOnClick = function() {
    var frmobj = kony.application.getCurrentForm();
    frmobj.flxOverview.skin = "slFbox";
    frmobj.flxAttachments.skin = "sknTabFlxRoundffffff";
    frmobj.flxFulldetails.skin = "slFbox";
    frmobj.flxAuditTrail.skin = "slFbox";
    frmobj.lblOverview.skin = "sknLbl074A52Roman32px";
    frmobj.lblAttachments.skin = "sknTabLblWhiteffffff";
    frmobj.lblFullDetails.skin = "sknLbl074A52Roman32px";
    frmobj.lblAuditTrail.skin = "sknLbl074A52Roman32px";
    frmobj.flxStatusTraffic.setVisibility(false);
    frmobj.lblStatusTraffic.setVisibility(false);
    frmobj.flexPdf.setVisibility(false);
    frmobj.flxAudit.setVisibility(false);
    frmobj.flxAttachment.setVisibility(true);
    frmobj.flxFullDetail.setVisibility(false);
    frmobj.flxOverViewDetail.setVisibility(false);
    frmobj.flxButtons.setVisibility(false);
};