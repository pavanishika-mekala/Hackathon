/**
 * @module errorHandling
 *
 * @author Kiran.Chava
 * @ModifiedBy Sumeet.bartha
 * @category errorHandling
 * @description Error Handling module. All User Defined Exceptions goes here
 * 		All the helpful error handling functions goes here.
 * © 2016 Kony Inc.
 */
/**
 * @function appException
 * @description Global function. A custom Exception.
 *
 */
function appException(message) {
    this.message = message;
    this.name = "AppException_ess";
}

/**
 * Call this function to handle error. Input must be an exception object.
 * @memberof global
 * @param {Object} anException -  Exception to be handled.
 * @returns {void} - None.
 */
function handleError(anException) {
    if (anException === undefined || anException === null) {
        kony.print("handleError is called but input anException is either null or undefined");
        handleErrorViaAlert("unknown");
        return;
    }
    // If error occurs at login ensure that SSO token is not stored
    if (kony.application.getCurrentForm().id === "frmLogin") {
      kony.sdk.util.deleteSSOToken();
    }
    if (typeof anException === 'string') {
     handleErrorViaAlert(anException);
     return;
 }
    var messageToShow = " ";
    if (anException.name !== undefined) {
        kony.print("handlingError: name::" + anException.name);
        this.messageToShow = anException.name;
    }
    if (anException.message !== undefined) {
        kony.print("handlingError: message::" + anException.message);
        this.messageToShow += ": " + anException.message;
    }
  	if(kony.apps.coe.ess.globalVariables.loginFailedWithUnauthoraized == 1){
      messageToShow=kony.i18n.getLocalizedString("i18n.ess.myApproval.unauthorizeduser.text");
    }
    handleErrorViaAlert(messageToShow);

}
/**
 * handleError will call this function. Do not call this directly.
 * If appconfig enables showing exact error, shows exact error, otherwise generic error.
 * @memberof global
 * @param {Object} anException -  Exception to be handled.
 * @returns {void} - None.
 */
function handleErrorViaAlert(messageToShow) {
    // TODO: Implement send email feature ....
    // TODO: Add APM inserts for all errors.
  	  // Send APM Data.
  	try {
        var metricsData = [{
            "errorMessage": messageToShow
        }];
        KNYMetricsService.sendCustomMetrics("handleError", metricsData);
    } catch (m) {
        // Ignore metrics exception.
        kony.print("Unable to send metrics of error message: " + m.message);
    }

    var genericMessage = kony.i18n.getLocalizedString("i18n.ess.myApproval.genericErrorMsg.text");
    var message = genericMessage;
    if (messageToShow !== undefined &&
        kony.apps.coe.ess.appconfig.showErrorDetailsOnAlert) {
        message = "" + genericMessage +" "+ messageToShow;
    }
    popupErrorAlert.lblMessage.text=message;
    popupErrorAlert.show();
kony.application.dismissLoadingScreen();
}
