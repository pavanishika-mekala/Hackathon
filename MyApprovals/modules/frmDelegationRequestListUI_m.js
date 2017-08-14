/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc       Code is related to UI of frmDelegationRequestList form
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};

kony.apps.coe.ess.Approvals.DelegationRequestList = kony.apps.coe.ess.Approvals.DelegationRequestList || {};

/**
 * @param          none.
 * @return         none.
 * @description    This is a constructor for class kony.apps.coe.ess.Approvals.DelegationRequestList.UI.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.UI = function() {
    kony.print("--Start constructor: kony.apps.coe.ess.Approvals.DelegationRequestList.UI--");
    this.isSentByMeClicked = true;
    kony.print("--End constructor: kony.apps.coe.ess.Approvals.DelegationRequestList.UI--");
};

/**
 * @param          none.
 * @return         {kony.apps.coe.ess.Approvals.DelegationRequestList.UI}.
 * @description    This method will return instance of kony.apps.coe.ess.Approvals.DelegationRequestList.UI.
 *                 Instance will be created once; next time; will be returned same.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.UI.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.UI.getInstance--");
    try{
        if(kony.apps.coe.ess.Approvals.DelegationRequestList.UI.singletonObj !== undefined) {
            return kony.apps.coe.ess.Approvals.DelegationRequestList.UI.singletonObj;
        }
        kony.apps.coe.ess.Approvals.DelegationRequestList.UI.singletonObj = new kony.apps.coe.ess.Approvals.DelegationRequestList.UI();
        return kony.apps.coe.ess.Approvals.DelegationRequestList.UI.singletonObj;
    } catch(err) {
      handleError(err);
    }
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestList.UI.getInstance--");
};

/**
 * @param          none.
 * @return         {function} callback - This will be called at the end of all tasks in this method.
 * @description    Navigation to sent by me list will be done with animation.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.UI.prototype.
selectSentByMe = function (callback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.UI.prototype.selectSentByMe--");
	try {
		frmDelegationRequestList.flxSlider.animate(
			kony.ui.createAnimation({
				100: {
					left: "17%",
					width: "25.1%"
				}
			}), {
			fillMode: kony.anim.FILL_MODE_FORWARDS,
			duration: 0.5
		});
		frmDelegationRequestList.segRequestsListSentByMe.animate(
			kony.ui.createAnimation({
				100: {
					left: "0%",
				}
			}), {
			fillMode: kony.anim.FILL_MODE_FORWARDS,
			duration: 0.5
		});
		frmDelegationRequestList.btnSentByMe.skin = "sknBtn0OFFFFFFFs32px";
		frmDelegationRequestList.btnReceived.skin = "sknBtnMobFS005540100O32px";
	} catch (err) {
		handleError(err);
	}
	this.isSentByMeClicked = true;
	if (callback !== null && callback !== undefined && typeof(callback) === "function") {
		callback();
	} else {
		kony.print("callback paramter is null || undefined || not of function type.");
	}
    kony.print("--End: kony.apps.coe.ess.Approvals.DelegationRequestList.UI.prototype.selectSentByMe--");
};

/**
 * @param          none.
 * @return         {function} callback - This will be called at the end of all tasks in this method.
 * @description    Navigation to received list will be done with animation.
 */
kony.apps.coe.ess.Approvals.DelegationRequestList.UI.prototype.
selectReceived = function (callback) {
    kony.print("--Start: kony.apps.coe.ess.Approvals.DelegationRequestList.UI.prototype.selectReceived--");
	try {
		frmDelegationRequestList.flxSlider.animate(
			kony.ui.createAnimation({
				100: {
					left: "62.2%",
					width: "19.7%"
				}
			}), {
			fillMode: kony.anim.FILL_MODE_FORWARDS,
			duration: 0.5
		});
		frmDelegationRequestList.segRequestsListSentByMe.animate(
			kony.ui.createAnimation({
				100: {
					left: "-100%",
				}
			}), {
			fillMode: kony.anim.FILL_MODE_FORWARDS,
			duration: 0.5
		});
		frmDelegationRequestList.btnReceived.skin = "sknBtn0OFFFFFFFs32px";
		frmDelegationRequestList.btnSentByMe.skin = "sknBtnMobFS005540100O32px";
	} catch (err) {
		handleError(err);
	}
	this.isSentByMeClicked = false;
	if (callback !== null && callback !== undefined && typeof(callback) === "function") {
		callback();
	} else {
		kony.print("callback paramter is null || undefined || not of function type.");
	}
    kony.print("-End: kony.apps.coe.ess.Approvals.DelegationRequestList.UI.prototype.selectReceived--");
};