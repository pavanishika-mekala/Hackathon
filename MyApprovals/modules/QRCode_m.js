/*** @Author Nakul.Gupta
 * @category Business Logic
 * @desc  QRCode class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
// %Region - Methods in QRCode
/**
 * @member of  QRCode
 * @return {void} - none.
 */
kony.apps.coe.ess.QRCode = function() {
    this.isSetupManuallyOn = false;
};
/**
 * @member of  QRCode
 * @return {form} - frmStartup/frmLogin.
 * @desc returns the startup form on launching the app
 */
kony.apps.coe.ess.QRCode.prototype.loadStartupForm = function() {
    if (kony.store.getItem("isMyApprovalsFirstTimeLaunch") !== false && kony.apps.coe.ess.appconfig.isDemo === true) {
        return frmStartUp;
    } else {
        return frmLogin;
    }
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc calls the barcode reader FFI
 */
kony.apps.coe.ess.QRCode.prototype.onClickQRCode = function() {
    //#ifdef android
    this.BarcodeAndroid();
    //#endif
    //#ifdef iphone
    this.BarcodeIphone();
    //#endif
    //#ifdef ipad
    this.BarcodeIphone();
     //#endif
     //#ifdef tabrcandroid
     this.BarcodeAndroid();
     //#endif
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @desc success callback for barcode reader FFI android
 */
kony.apps.coe.ess.QRCode.prototype.BarcodeAndroid = function() {
    var barcodeCaptureCallback = function(barcodeDataDummmy, barcodeData) {
        try {
            var response = JSON.parse(barcodeData);
            if (response.MyApprovals) {
                if (!kony.apps.coe.ess.appconfig.isSingleQrCode) {
                    kony.apps.coe.ess.frmLogin.username = response.MyApprovals.Username;
                    kony.apps.coe.ess.frmLogin.password = response.MyApprovals.Password;
                    kony.apps.coe.ess.appconfig.appkey = response.MyApprovals.AppKey;
                    kony.apps.coe.ess.appconfig.appsecret = response.MyApprovals.AppSecret;
                    kony.apps.coe.ess.appconfig.serviceurl = response.MyApprovals.ServiceURL.replace(/\\/g, "");
                    konysyncClientSyncConfig.Version = response.MyApprovals.SyncVersion;
                } else {
                    kony.apps.coe.ess.frmLogin.username = response.Username;
                    kony.apps.coe.ess.frmLogin.password = response.Password;
                    kony.apps.coe.ess.appconfig.appkey = response.MyApprovals.Key;
                    kony.apps.coe.ess.appconfig.appsecret = response.MyApprovals.Secret;
                    kony.apps.coe.ess.appconfig.serviceurl = response.Url.replace(/\\/g, "");
                    konysyncClientSyncConfig.Version = response.MyApprovals.SyncVersion;
                }
                kony.store.setItem("appKeyMyApprovals", kony.apps.coe.ess.appconfig.appkey);
                kony.store.setItem("appSecretMyApprovals", kony.apps.coe.ess.appconfig.appsecret);
                kony.store.setItem("serviceURLMyApprovals", kony.apps.coe.ess.appconfig.serviceurl);
                kony.store.setItem("appVersionMyApprovals", konysyncClientSyncConfig.Version);

                kony.apps.coe.ess.QRCode.navigatingThroughQRCode = true;
                this.NavigateToLoginForm();
            } else {
                popupErrorAlert.lblMessage.text = "Invalid QR code scanned. Please rescan correct QR code";
                popupErrorAlert.show();
            }
        } catch (e) {
            popupErrorAlert.lblMessage.text = "Invalid QR code scanned. Please rescan correct QR code";
            popupErrorAlert.show();
        }
    };
    try {
        Barcode.captureBarcode(barcodeCaptureCallback.bind(this));
    } catch (e) {
        handleError(e);
    }
};

/**
 * @member of  QRCode
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @desc success callback for barcode reader FFI iPhone
 */
kony.apps.coe.ess.QRCode.prototype.BarcodeIphone = function() {
    var barcodeCaptureCallback = function(barcodeData, barcodeDataDummmy) {
        try {
            var response = JSON.parse(barcodeData.barcodestring);
            if (response.MyApprovals) {
               if (!kony.apps.coe.ess.appconfig.isSingleQrCode) {
                  kony.apps.coe.ess.frmLogin.username = response.MyApprovals.Username;
                  kony.apps.coe.ess.frmLogin.password = response.MyApprovals.Password;
                  kony.apps.coe.ess.appconfig.appkey = response.MyApprovals.AppKey;
                  kony.apps.coe.ess.appconfig.appsecret = response.MyApprovals.AppSecret;
                  kony.apps.coe.ess.appconfig.serviceurl = response.MyApprovals.ServiceURL.replace(/\\/g, "");
                  konysyncClientSyncConfig.Version = response.MyApprovals.SyncVersion;
                } else
                {
                  kony.apps.coe.ess.appconfig.appkey = response.MyApprovals.Key;
                  kony.apps.coe.ess.frmLogin.username = response.Username;
                  kony.apps.coe.ess.frmLogin.password = response.Password;
                  kony.apps.coe.ess.appconfig.appsecret = response.MyApprovals.Secret;
                  kony.print("ipad service url before"+response.Url);
                  kony.apps.coe.ess.appconfig.serviceurl =response.Url.replace(/\\/g, "");
                  kony.print("ipad service url after"+kony.apps.coe.ess.appconfig.serviceurl);
                  konysyncClientSyncConfig.Version = response.MyApprovals.SyncVersion;
                }
                kony.store.setItem("appKeyMyApprovals", kony.apps.coe.ess.appconfig.appkey);
                kony.store.setItem("appSecretMyApprovals", kony.apps.coe.ess.appconfig.appsecret);
                kony.store.setItem("serviceURLMyApprovals", kony.apps.coe.ess.appconfig.serviceurl);
                kony.store.setItem("appVersionMyApprovals", konysyncClientSyncConfig.Version);

                kony.apps.coe.ess.QRCode.navigatingThroughQRCode = true;
                this.NavigateToLoginForm();
            } else {
                popupErrorAlert.lblMessage.text = "Invalid QR code scanned. Please rescan correct QR code";
                popupErrorAlert.show();
            }
        } catch (e) {
            popupErrorAlert.lblMessage.text = "Invalid QR code scanned. Please rescan correct QR code";
            popupErrorAlert.show();
        }
    };
    try {

        Barcode.captureBarcode(barcodeCaptureCallback.bind(this));

    } catch (e) {
        handleError(e);
    }
};
/* @member of  QRCode
 * @return {void} - none.
 * @desc navigates to login form
 */
kony.apps.coe.ess.QRCode.prototype.NavigateToLoginForm = function() {
    if (kony.application.getPreviousForm() === null) {
        kony.apps.coe.ess.QRCode.isReconfiguredClicked = false;
    } else {
        kony.apps.coe.ess.QRCode.isReconfiguredClicked = true;
    }
    frmLogin.show();
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc called on click of QR Code image and label
 */
kony.apps.coe.ess.QRCode.prototype.QrCodeOnClickAction = function() {
    if ((parseFloat(frmStartUp.flxLabelQrCode.top) + "") === "72.5") {
        (new kony.apps.coe.ess.QRCode()).onClickQRCode();
    } else {
        this.isSetupManuallyOn = false;
        (new kony.apps.coe.ess.NavigationAnimations()).onClickflxQr();
    }
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc called on click of setup manually label
 */
kony.apps.coe.ess.QRCode.prototype.SetupManuallyOnClickAction = function() {
    if (this.isSetupManuallyOn === true) {

    } else {
        this.getStoredAppConfig();
        this.setStoredConfigDataToForm();
        new kony.apps.coe.ess.NavigationAnimations().onClickSetManually();
        this.isSetupManuallyOn = true;
    }
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc gets the app configuration stored on the device
 */
kony.apps.coe.ess.QRCode.prototype.getStoredAppConfig = function() {
    if (kony.store.getItem("appKeyMyApprovals") !== null && kony.store.getItem("appSecretMyApprovals") !== null && kony.store.getItem("serviceURLMyApprovals") !== null && kony.store.getItem("appVersionMyApprovals") !== null) {
        kony.apps.coe.ess.appconfig.appkey = kony.store.getItem("appKeyMyApprovals");
        kony.apps.coe.ess.appconfig.appsecret = kony.store.getItem("appSecretMyApprovals");
        kony.apps.coe.ess.appconfig.serviceurl = kony.store.getItem("serviceURLMyApprovals");
        konysyncClientSyncConfig.Version = kony.store.getItem("appVersionMyApprovals");
    }
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc sets the app conif values in setup manually
 */
kony.apps.coe.ess.QRCode.prototype.setStoredConfigDataToForm = function() {
    if (kony.store.getItem("appKeyMyApprovals") !== null && kony.store.getItem("appSecretMyApprovals") !== null && kony.store.getItem("serviceURLMyApprovals") !== null && kony.store.getItem("appVersionMyApprovals") !== null) {
        frmStartUp.txtAppKey.text = kony.apps.coe.ess.appconfig.appkey;
        frmStartUp.txtAppSecret.text = kony.apps.coe.ess.appconfig.appsecret;
        frmStartUp.txtServiceUrl.text = kony.apps.coe.ess.appconfig.serviceurl;
        frmStartUp.txtVersion.text = konysyncClientSyncConfig.Version;
    }
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc stores  the newapp config on the device
 */
kony.apps.coe.ess.QRCode.prototype.StoreConfigData = function() {
    kony.apps.coe.ess.appconfig.appkey = frmStartUp.txtAppKey.text;
    kony.apps.coe.ess.appconfig.appsecret = frmStartUp.txtAppSecret.text;
    kony.apps.coe.ess.appconfig.serviceurl = frmStartUp.txtServiceUrl.text;
    konysyncClientSyncConfig.Version = frmStartUp.txtVersion.text;
    kony.store.setItem("appKeyMyApprovals", kony.apps.coe.ess.appconfig.appkey);
    kony.store.setItem("appSecretMyApprovals", kony.apps.coe.ess.appconfig.appsecret);
    kony.store.setItem("serviceURLMyApprovals", kony.apps.coe.ess.appconfig.serviceurl);
    kony.store.setItem("appVersionMyApprovals", konysyncClientSyncConfig.Version);
    this.NavigateToLoginForm();
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc checks if the details are valid or not
 */
kony.apps.coe.ess.QRCode.prototype.verifyAppDetails = function() {
    var appkey = frmStartUp.txtAppKey.text;
    var appsecret = frmStartUp.txtAppSecret.text;
    var serviceurl = frmStartUp.txtServiceUrl.text;
    var version = frmStartUp.txtVersion.text;
    if (!appkey) {
        popupErrorAlert.lblMessage.text = "Invalid details entered!";
        popupErrorAlert.show();
        return;
    }
    if (!appsecret) {
        popupErrorAlert.lblMessage.text = "Invalid details entered!";
        popupErrorAlert.show();
        return;
    }
    if (!serviceurl) {
        popupErrorAlert.lblMessage.text = "Invalid details entered!";
        popupErrorAlert.show();
        return;
    } else {
        var urlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if (!urlRegex.test(serviceurl)) {
            popupErrorAlert.lblMessage.text = "Invalid details entered!";
            popupErrorAlert.show();
            return;
        }
    }
    if (!version) {
        popupErrorAlert.lblMessage.text = "Invalid details entered!";
        popupErrorAlert.show();
        return;
    }
    this.StoreConfigData();
};
/**
 * @member of  QRCode
 * @return {void} - none.
 * @desc calls functions on postshow of login
 */
kony.apps.coe.ess.QRCode.prototype.onPostShowOfLogin = function() {
    if (kony.store.getItem("useTouchID") !== true) {
        if (kony.apps.coe.ess.QRCode.navigatingThroughQRCode === true) {
           // initMbaasApp(function() {
                kony.sdk.mvvm.LoginAction();
                kony.store.setItem("isMyApprovalsFirstTimeLaunch", false);
           // });
        } else {
            (new kony.apps.coe.ess.QRCode()).getStoredAppConfig();
           // initMbaasApp(function() {
                kony.store.setItem("isMyApprovalsFirstTimeLaunch", false);
           // });
        }
    }
};
